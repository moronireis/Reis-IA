import type { APIRoute } from 'astro';
import { requireAuth } from '../../../../lib/api-auth';
import { createServerClient } from '../../../../lib/supabase-server';
import { normalizePhone } from '../../../../lib/whatsapp/send';
import { kickWorker } from '../../../../lib/campaign-worker';
import { resolveAudience, type SegmentFilter } from '../../../../lib/campaign-audience';

export const prerender = false;

type SB = ReturnType<typeof createServerClient>;

// POST /api/campaigns/[id]/send
// Prepara a fila de disparo e aciona o worker (/process). O envio real
// acontece em lotes curtos no worker — sobrevive ao limite de tempo do
// serverless e é retomável após qualquer interrupção.
// Aceita campanhas em draft, error e cancelled (error/cancelled = retomada).
export const POST: APIRoute = async ({ locals, params, url }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const { id } = params;
  if (!id) return json({ error: 'id obrigatório' }, 400);

  const sb = createServerClient();

  // 1. Campanha
  const { data: campaign, error: campErr } = await sb
    .from('az_campaigns')
    .select('id, name, status, started_at, template_id, custom_body, segment_filter, instance_id, custom_media_url, custom_media_type, custom_media, created_by, az_templates(id, name, body)')
    .eq('id', id)
    .single();

  if (campErr || !campaign) return json({ error: 'Campanha não encontrada' }, 404);

  if (campaign.status === 'sending') {
    return json({ error: 'Campanha já está sendo disparada' }, 409);
  }
  if (campaign.status === 'completed') {
    return json({ error: 'Campanha já foi concluída' }, 409);
  }

  // 2. Mensagem
  const templateBody: string | null =
    (campaign as any).az_templates?.body || campaign.custom_body || null;

  if (!templateBody) {
    return json({ error: 'Campanha sem mensagem — defina um template ou mensagem personalizada' }, 400);
  }

  // 3/4/5. Audiência resolvida pela MESMA lib do preview do wizard — a lista
  //      que a Tati revisou (com inclusões/remoções manuais e dedup por
  //      telefone) é exatamente o que entra na fila.
  const filter = (campaign.segment_filter || {}) as SegmentFilter;
  const { audience, error: resolveErr } = await resolveAudience(sb, filter);
  if (resolveErr || !audience) return json({ error: resolveErr || 'Falha ao resolver contatos' }, 500);
  if (!audience.contacts.length) {
    return json({ error: 'Nenhum contato na lista de disparo — ajuste os filtros ou adicione contatos' }, 400);
  }

  // F1 (Checkpoint 10/07): disparo dividido por vendedor — cada partição vira
  // uma campanha-filha na instância do vendedor. Reusa o worker inteiro
  // (canário/janela/cap continuam por instância, sem mudança).
  if (filter.split_por_vendedor && campaign.status === 'draft') {
    return await splitSendByVendedor(sb, campaign as any, filter, audience, url.origin);
  }

  // Instância — status ao vivo no UazapiGO (o status do banco pode estar velho)
  const instErr = await checkInstanceLive(sb, (campaign as any).instance_id);
  if (instErr) return json({ error: instErr }, 400);

  // error_message: null mantém o mesmo conjunto de chaves das linhas skipped
  // — PostgREST rejeita bulk insert com chaves divergentes (PGRST102)
  const rows: any[] = [
    ...audience.contacts.map(c => ({
      campaign_id: id,
      contact_id: c.id,
      phone: normalizePhone(c.phone_primary),
      contact_name: c.nome_fantasia || c.razao_social || null,
      status: 'pending',
      error_message: null,
    })),
    ...audience.duplicates.map(({ contact: c, dupOf }) => ({
      campaign_id: id,
      contact_id: c.id,
      phone: normalizePhone(c.phone_primary),
      contact_name: c.nome_fantasia || c.razao_social || null,
      status: 'skipped',
      error_message: `Número repetido (mesmo telefone de "${dupOf}")`,
    })),
  ];

  // 6. Grava a fila em chunks. ignoreDuplicates: linhas já existentes
  //    (retomada) ficam intactas — quem já recebeu não recebe de novo.
  for (let i = 0; i < rows.length; i += 500) {
    const { error: upErr } = await sb
      .from('az_campaign_recipients')
      .upsert(rows.slice(i, i + 500), { onConflict: 'campaign_id,contact_id', ignoreDuplicates: true });
    if (upErr) return json({ error: `Falha ao gravar destinatários: ${upErr.message}` }, 500);
  }

  // 7. Retomada após erro/cancelamento: falhas voltam para a fila
  if (campaign.status === 'error' || campaign.status === 'cancelled') {
    await sb.from('az_campaign_recipients')
      .update({ status: 'pending', error_message: null, claimed_at: null })
      .eq('campaign_id', id)
      .eq('status', 'failed');
  }

  // 8. Contadores a partir da fonte de verdade (recipients)
  const total  = await countRecipients(sb, id, null);
  const sent   = await countRecipients(sb, id, 'sent');
  const failed = await countRecipients(sb, id, 'failed');

  await sb.from('az_campaigns').update({
    status: 'sending',
    total_count: total,
    sent_count: sent,
    failed_count: failed,
    started_at: campaign.started_at || new Date().toISOString(),
    processing_until: null,
    last_error: null,
  }).eq('id', id);

  // 9. Aciona o worker — o frontend também "bombeia" via polling como backup
  await kickWorker(url.origin, id);

  return json({ ok: true, total, campaignId: id });
};

// ─── F1: disparo dividido por vendedor ───────────────────────────────────────
// Particiona a audiência por vendedor_efetivo (vendedor da carteira da(s)
// representada(s) selecionada(s), fallback vendedor_principal) e cria 1
// campanha-filha por vendedor com instância vinculada (a primeira reusa a
// campanha original — zero linha órfã). Contatos sem vendedor/sem número
// ficam de fora (o preview do wizard mostra isso antes). Cria TODAS as
// filhas + filas primeiro e só depois inicia — falha no meio não perde
// partição. Filha com número desconectado nasce em 'error' com a fila
// pronta — conectar e usar Retomar.
async function splitSendByVendedor(
  sb: SB, campaign: any, filter: SegmentFilter,
  audience: { contacts: any[] }, origin: string
) {
  const { data: insts } = await sb
    .from('az_whatsapp_instances')
    .select('id, display_name, uazapi_name, status, vendedor_nome')
    .not('vendedor_nome', 'is', null)
    .is('deleted_at', null)
    .neq('is_active', false);
  const instByVendedor = new Map<string, any>((insts || []).map((i: any) => [i.vendedor_nome, i]));

  const parts = new Map<string, any[]>();
  let excluded = 0;
  for (const c of audience.contacts) {
    const v = c.vendedor_efetivo;
    if (!v || !instByVendedor.has(v)) { excluded++; continue; }
    if (!parts.has(v)) parts.set(v, []);
    parts.get(v)!.push(c);
  }
  if (parts.size === 0) {
    return json({ error: 'Nenhum contato da lista tem vendedor com número vinculado. Vincule os vendedores em Configurações ou use o modo Número único.' }, 400);
  }

  // Live-check das instâncias em paralelo (uma a uma estouraria o orçamento)
  const uniqueInstIds = [...new Set([...parts.keys()].map(v => instByVendedor.get(v)!.id))];
  const liveResults = await Promise.all(uniqueInstIds.map(async (iid) => ({ iid, err: await checkInstanceLive(sb, iid) })));
  const liveErr = new Map(liveResults.map(r => [r.iid, r.err]));

  const entries = [...parts.entries()].sort((a, b) => b[1].length - a[1].length);
  const groupId = campaign.id;

  // Fase 1: cria/atualiza as filhas e grava as filas — tudo ainda em draft
  const prepared: { childId: string; vendedor: string; inst: any; count: number }[] = [];
  let first = true;
  for (const [vendedor, contacts] of entries) {
    const inst = instByVendedor.get(vendedor)!;
    const childFilter = { manual_only: true, include_ids: contacts.map((c: any) => c.id), tags: filter.tags || [], split_child: true };
    const childName = `${campaign.name} — ${vendedor}`;
    let childId: string;

    if (first) {
      const { error } = await sb.from('az_campaigns')
        .update({ name: childName, instance_id: inst.id, group_id: groupId, segment_filter: childFilter })
        .eq('id', campaign.id);
      if (error) return json({ error: `Falha ao preparar campanha de ${vendedor}: ${error.message}` }, 500);
      childId = campaign.id;
      first = false;
    } else {
      const { data: created, error } = await sb.from('az_campaigns').insert({
        name: childName,
        template_id: campaign.template_id,
        custom_body: campaign.custom_body,
        custom_media_url: campaign.custom_media_url,
        custom_media_type: campaign.custom_media_type,
        custom_media: campaign.custom_media,
        segment_filter: childFilter,
        status: 'draft',
        instance_id: inst.id,
        group_id: groupId,
        created_by: campaign.created_by,
      }).select('id').single();
      if (error || !created) return json({ error: `Falha ao criar campanha de ${vendedor}: ${error?.message}` }, 500);
      childId = created.id;
    }

    const rows = contacts.map((c: any) => ({
      campaign_id: childId,
      contact_id: c.id,
      phone: normalizePhone(c.phone_primary),
      contact_name: c.nome_fantasia || c.razao_social || null,
      status: 'pending',
      error_message: null,
    }));
    for (let i = 0; i < rows.length; i += 500) {
      const { error: upErr } = await sb
        .from('az_campaign_recipients')
        .upsert(rows.slice(i, i + 500), { onConflict: 'campaign_id,contact_id', ignoreDuplicates: true });
      if (upErr) return json({ error: `Falha ao gravar destinatários (${vendedor}): ${upErr.message}` }, 500);
    }

    prepared.push({ childId, vendedor, inst, count: contacts.length });
  }

  // Fase 2: inicia cada filha (número desconectado → 'error' retomável)
  const children: any[] = [];
  for (const { childId, vendedor, inst, count } of prepared) {
    const err = liveErr.get(inst.id);
    if (err) {
      await sb.from('az_campaigns').update({
        status: 'error',
        total_count: count,
        last_error: `Número de ${vendedor} (${inst.display_name || inst.uazapi_name}) não está conectado — conecte em Configurações e use Retomar.`,
      }).eq('id', childId);
      children.push({ id: childId, vendedor, count, started: false });
    } else {
      await sb.from('az_campaigns').update({
        status: 'sending',
        total_count: count,
        sent_count: 0,
        failed_count: 0,
        started_at: new Date().toISOString(),
        processing_until: null,
        last_error: null,
      }).eq('id', childId);
      await kickWorker(origin, childId);
      children.push({ id: childId, vendedor, count, started: true });
    }
  }

  return json({ ok: true, split: true, children, excluded, groupId });
}

async function countRecipients(sb: SB, campaignId: string, status: string | null): Promise<number> {
  let q = sb.from('az_campaign_recipients')
    .select('id', { count: 'exact', head: true })
    .eq('campaign_id', campaignId);
  q = status ? q.eq('status', status) : q.neq('status', 'skipped');
  const { count } = await q;
  return count || 0;
}

// Confere ao vivo se o número está conectado; sincroniza status/fone no banco.
async function checkInstanceLive(sb: SB, instanceId: string | null): Promise<string | null> {
  const UAZAPI_URL = import.meta.env.UAZAPI_URL;
  let token: string | undefined = import.meta.env.UAZAPI_TOKEN;

  if (instanceId) {
    const { data: inst } = await sb
      .from('az_whatsapp_instances')
      .select('id, token')
      .eq('id', instanceId)
      .single();
    if (!inst) return 'Número de envio não encontrado';
    token = inst.token;
  }

  if (!UAZAPI_URL || !token) return 'WhatsApp não configurado (UAZAPI_URL / token ausente)';

  try {
    const res = await fetch(`${UAZAPI_URL}/instance/status`, {
      headers: { token },
      signal: AbortSignal.timeout(10_000),
    });
    const body = await res.json().catch(() => ({}));
    const instData = body?.instance ?? body;
    const liveStatus = instData?.status === 'connected' ? 'connected' : 'disconnected';

    if (instanceId) {
      await sb.from('az_whatsapp_instances').update({
        status: liveStatus,
        phone_number: instData?.phoneNumber ?? instData?.phone ?? undefined,
        updated_at: new Date().toISOString(),
      }).eq('id', instanceId);
    }

    if (liveStatus !== 'connected') {
      return 'O número selecionado não está conectado ao WhatsApp — reconecte em Configurações';
    }
    return null;
  } catch {
    return 'Não foi possível verificar o status do número no UazapiGO';
  }
}

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
