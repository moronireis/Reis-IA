import type { APIRoute } from 'astro';
import { requireAuth } from '../../../../lib/api-auth';
import { createServerClient } from '../../../../lib/supabase-server';
import { normalizePhone } from '../../../../lib/whatsapp/send';
import { kickWorker } from '../../../../lib/campaign-worker';

export const prerender = false;

type SB = ReturnType<typeof createServerClient>;

interface SegmentFilter {
  brand_ids?: string[];
  cidade?: string;
  estado?: string;
  segmento?: string;
  status?: string;
  tags?: string[];
}

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
    .select('id, name, status, started_at, template_id, custom_body, segment_filter, instance_id, az_templates(id, name, body)')
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

  // 3. Instância — status ao vivo no UazapiGO (o status do banco pode estar velho)
  const instErr = await checkInstanceLive(sb, (campaign as any).instance_id);
  if (instErr) return json({ error: instErr }, 400);

  // 4. Contatos do segmento (paginado — uma query única trunca em 1000 linhas)
  const filter = (campaign.segment_filter || {}) as SegmentFilter;
  const { contacts, error: resolveErr } = await resolveAllContacts(sb, filter);
  if (resolveErr) return json({ error: resolveErr }, 500);
  if (!contacts.length) {
    return json({ error: 'Nenhum contato corresponde ao segmento selecionado' }, 400);
  }

  // 5. Dedup por telefone normalizado — cada número recebe uma única vez
  const seen = new Map<string, string>();
  const rows: any[] = [];
  for (const c of contacts) {
    const phone = normalizePhone(c.phone_primary);
    const name = c.nome_fantasia || c.razao_social || null;
    const firstOwner = seen.get(phone);
    if (firstOwner) {
      rows.push({
        campaign_id: id, contact_id: c.id, phone, contact_name: name,
        status: 'skipped',
        error_message: `Número repetido (mesmo telefone de "${firstOwner}")`,
      });
    } else {
      seen.set(phone, name || phone);
      // error_message: null mantém o mesmo conjunto de chaves das linhas
      // skipped — PostgREST rejeita bulk insert com chaves divergentes (PGRST102)
      rows.push({
        campaign_id: id, contact_id: c.id, phone, contact_name: name,
        status: 'pending', error_message: null,
      });
    }
  }

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

// Resolve TODOS os contatos do segment_filter, paginando de 1000 em 1000.
async function resolveAllContacts(
  sb: SB,
  filter: SegmentFilter
): Promise<{ contacts: any[]; error: string | null }> {
  const { brand_ids, cidade, estado, segmento, status, tags } = filter;
  const PAGE = 1000;

  try {
    let contactIds: string[] | null = null;

    if (brand_ids && brand_ids.length > 0) {
      const idSet = new Set<string>();
      for (let from = 0; ; from += PAGE) {
        const { data: cb, error: cbErr } = await sb
          .from('az_contact_brands')
          .select('contact_id')
          .in('brand_id', brand_ids)
          .range(from, from + PAGE - 1);
        if (cbErr) return { contacts: [], error: cbErr.message };
        (cb || []).forEach((r: any) => idSet.add(r.contact_id as string));
        if (!cb || cb.length < PAGE) break;
      }
      contactIds = [...idSet];
      if (contactIds.length === 0) return { contacts: [], error: null };
    }

    const applyFilters = (query: any) => {
      if (cidade)                  query = query.ilike('cidade', `%${cidade}%`);
      if (estado)                  query = query.ilike('estado', `%${estado}%`);
      if (segmento)                query = query.ilike('segmento', `%${segmento}%`);
      if (status)                  query = query.eq('status', status);
      if (tags && tags.length > 0) query = query.contains('tags', tags);
      return query;
    };

    const SELECT = 'id, nome_fantasia, razao_social, phone_primary, cidade, estado, contato, segmento';
    const all: any[] = [];

    if (contactIds) {
      // Filtro por marca: busca em chunks de ids (um .in() com milhares de
      // UUIDs estoura o limite de URL do PostgREST)
      const CHUNK = 200;
      for (let i = 0; i < contactIds.length; i += CHUNK) {
        const { data, error } = await applyFilters(
          sb.from('az_contacts')
            .select(SELECT)
            .not('phone_primary', 'is', null)
            .in('id', contactIds.slice(i, i + CHUNK))
        );
        if (error) return { contacts: [], error: error.message };
        all.push(...(data || []));
      }
    } else {
      for (let from = 0; ; from += PAGE) {
        const { data, error } = await applyFilters(
          sb.from('az_contacts')
            .select(SELECT)
            .not('phone_primary', 'is', null)
            .order('id', { ascending: true })
            .range(from, from + PAGE - 1)
        );
        if (error) return { contacts: [], error: error.message };
        all.push(...(data || []));
        if (!data || data.length < PAGE) break;
      }
    }

    return { contacts: all, error: null };
  } catch (e: any) {
    return { contacts: [], error: e.message };
  }
}

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
