import type { APIRoute } from 'astro';
import { createServerClient } from '../../../../lib/supabase-server';
import { sendWhatsAppText } from '../../../../lib/whatsapp/send';
import { resolveVariables } from '../../../../lib/variables';
import { kickWorker, isWorkerRequest } from '../../../../lib/campaign-worker';

export const prerender = false;

type SB = ReturnType<typeof createServerClient>;

const BATCH_MAX       = 12;         // mensagens por invocação
const TIME_BUDGET_MS  = 40_000;     // folga sob o maxDuration de 60s
const LEASE_MS        = 90_000;     // lease da campanha (1 worker por vez)
const STALE_CLAIM_MS  = 3 * 60_000; // recipient preso em 'processing' volta à fila
const DELAY_MIN_MS    = 2_000;      // intervalo entre mensagens: 2s
const DELAY_JITTER_MS = 2_000;      // + jitter aleatório de até 2s (anti-padrão robótico)
const FAIL_DELAY_MS   = 400;        // falha não consome espaçamento anti-ban
const CANARY_MAX_SENT = 3;          // envios aceitos sem NENHUMA entrega → erro
const CANARY_POLL_MS  = 5_000;      // intervalo do poll de entrega do canário
const CANARY_WAIT_MS  = 45_000;     // espera máxima pela entrega do canário

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// POST /api/campaigns/[id]/process
// Worker da fila: envia UM lote de recipients pendentes e se re-invoca até
// esvaziar. Idempotente — pode ser chamado a qualquer momento (self-chain,
// pump do frontend): invocações concorrentes são rejeitadas pelo lease.
//
// Proteções ativas:
//   - Canário: enquanto NENHUMA mensagem da campanha tiver confirmação de
//     entrega, envia 1 por vez e espera o ACK "Delivered" (número pode estar
//     restrito — aceita mas não entrega, caso azeredo-2). 3 envios aceitos
//     sem entrega → campanha em erro com explicação.
//   - Pre-check: número sem WhatsApp falha rápido, sem tentar enviar.
//   - Janela 8h–18h BRT + cap diário por instância (az_settings). Campanhas
//     de teste interno (tag u4digital) são isentas.
// Auth: sessão de usuário OU header x-worker-key (self-chain servidor→servidor).
export const POST: APIRoute = async ({ locals, params, request, url }) => {
  const profile = (locals as any).profile;
  if (!isWorkerRequest(request) && !profile?.id) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const { id } = params;
  if (!id) return json({ error: 'id obrigatório' }, 400);

  const sb = createServerClient();
  const started = Date.now();

  // 1. Claim do lease — só um worker ativo por campanha.
  // Este PostgREST filtra a representação do UPDATE pelos valores NOVOS da
  // linha ("update + select" volta vazio), então o padrão aqui é: escrever um
  // token único e LER DE VOLTA para saber quem venceu (o Postgres serializa
  // os updates — a condição do perdedor reavalia contra o valor novo).
  const nowIso = new Date().toISOString();
  const leaseToken = new Date(Date.now() + LEASE_MS + Math.floor(Math.random() * 5000)).toISOString();

  await sb
    .from('az_campaigns')
    .update({ processing_until: leaseToken })
    .eq('id', id)
    .eq('status', 'sending')
    .or(`processing_until.is.null,processing_until.lt.${nowIso}`);

  const { data: campaign } = await sb
    .from('az_campaigns')
    .select('id, status, processing_until, instance_id, custom_body, template_id, segment_filter, az_templates(body)')
    .eq('id', id)
    .maybeSingle();

  const ownLease = !!campaign?.processing_until &&
    new Date(campaign.processing_until).getTime() === new Date(leaseToken).getTime();

  if (!campaign || campaign.status !== 'sending' || !ownLease) {
    return json({ ok: true, locked: true });
  }

  const releaseLease = () =>
    sb.from('az_campaigns')
      .update({ processing_until: new Date().toISOString() })
      .eq('id', id)
      .eq('processing_until', leaseToken);

  const templateBody: string | null =
    (campaign as any).az_templates?.body || campaign.custom_body || null;

  if (!templateBody) {
    await sb.from('az_campaigns')
      .update({ status: 'error', processing_until: null, last_error: 'Campanha sem mensagem' })
      .eq('id', id);
    return json({ error: 'Campanha sem mensagem' }, 400);
  }

  // Campanhas de teste interno ignoram janela e cap
  const isInternalTest =
    (((campaign.segment_filter || {}) as any).tags || []).includes('u4digital');

  // 2. Regras de disparo (az_settings)
  const settings = await loadSettings(sb);

  if (!isInternalTest && settings.window.enabled) {
    const hourBRT = Number(new Date().toLocaleString('en-US', {
      hour: 'numeric', hourCycle: 'h23', timeZone: 'America/Sao_Paulo',
    }));
    if (hourBRT < settings.window.start || hourBRT >= settings.window.end) {
      await releaseLease();
      return json({ ok: true, paused: 'fora_da_janela', janela: `${settings.window.start}h-${settings.window.end}h` });
    }
  }

  // Token/URL da instância (fallback: env)
  const UAZAPI_URL = (import.meta.env.UAZAPI_URL || '').trim();
  let instanceToken: string | undefined;
  if (campaign.instance_id) {
    const { data: inst } = await sb
      .from('az_whatsapp_instances')
      .select('token')
      .eq('id', campaign.instance_id)
      .single();
    instanceToken = inst?.token;
  }
  const uazToken = (instanceToken || import.meta.env.UAZAPI_TOKEN || '').trim();

  // Cap diário por instância (mensagens outbound desde 00:00 BRT)
  let capRemaining = Number.MAX_SAFE_INTEGER;
  if (!isInternalTest && settings.maxDaily > 0) {
    const usedToday = await countSentTodayBRT(sb, campaign.instance_id);
    capRemaining = settings.maxDaily - usedToday;
    if (capRemaining <= 0) {
      await releaseLease();
      return json({ ok: true, paused: 'cap_diario', cap: settings.maxDaily });
    }
  }

  // 3. Recupera recipients presos em 'processing' (worker anterior morreu)
  await sb.from('az_campaign_recipients')
    .update({ status: 'pending', claimed_at: null })
    .eq('campaign_id', id)
    .eq('status', 'processing')
    .lt('claimed_at', new Date(Date.now() - STALE_CLAIM_MS).toISOString());

  // 3b. Reconcilia entregas: este UazapiGO NÃO emite webhooks de ACK, então
  //     cada hop confere ativamente os envios recentes ainda em 'sent' e
  //     promove para delivered/read via /message/find.
  await reconcileDeliveries(sb, UAZAPI_URL, uazToken, id, 12, started);
  await refreshDelivered(sb, id);

  // 4. Canário: enquanto 0 entregas confirmadas, 1 mensagem por hop
  const deliveredSoFar = await countByStatuses(sb, id, ['delivered', 'read']);
  const canaryMode = deliveredSoFar === 0;

  if (canaryMode) {
    const acceptedNoDelivery = await countByStatuses(sb, id, ['sent']);
    if (acceptedNoDelivery >= CANARY_MAX_SENT) {
      await sb.from('az_campaigns').update({
        status: 'error',
        processing_until: null,
        last_error: `${acceptedNoDelivery} envios aceitos pelo WhatsApp mas NENHUM entregue — o número de envio pode estar restrito (aceita e não entrega). Reconecte a instância em Configurações ou dispare por outro número, depois use Retomar.`,
      }).eq('id', id);
      return json({ ok: true, canary_failed: true });
    }
  }

  const batchLimit = Math.min(canaryMode ? 1 : BATCH_MAX, capRemaining);

  // 5. Envia o lote
  const { data: batch } = await sb
    .from('az_campaign_recipients')
    .select('id, contact_id, phone, contact_name, az_contacts(nome_fantasia, razao_social, cidade, estado, contato, segmento)')
    .eq('campaign_id', id)
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .limit(batchLimit);

  let processed = 0;

  for (const r of batch || []) {
    if (Date.now() - started > TIME_BUDGET_MS) break;

    // Claim por recipient — write → read-back (mesmo padrão do lease)
    const claimToken = new Date(Date.now() + Math.floor(Math.random() * 1000)).toISOString();
    await sb
      .from('az_campaign_recipients')
      .update({ status: 'processing', claimed_at: claimToken })
      .eq('id', r.id)
      .eq('status', 'pending');

    const { data: mine } = await sb
      .from('az_campaign_recipients')
      .select('claimed_at')
      .eq('id', r.id)
      .maybeSingle();

    const ownClaim = !!mine?.claimed_at &&
      new Date(mine.claimed_at).getTime() === new Date(claimToken).getTime();
    if (!ownClaim) continue;

    // Pre-check: número existe no WhatsApp? (fail-open em erro de API)
    const onWA = await checkOnWhatsApp(UAZAPI_URL, uazToken, r.phone);
    if (onWA === false) {
      await sb.from('az_campaign_recipients').update({
        status: 'failed',
        error_message: 'Número não está no WhatsApp',
      }).eq('id', r.id);
      await refreshCounters(sb, id);
      await sleep(FAIL_DELAY_MS);
      continue;
    }

    const c = (r as any).az_contacts || {};
    const body = resolveVariables(templateBody, {
      nome_fantasia: c.nome_fantasia || r.contact_name,
      razao_social: c.razao_social,
      cidade: c.cidade,
      estado: c.estado,
      contato: c.contato,
      segmento: c.segmento,
    });

    let ok = false;
    let errMsg: string | null = null;
    let waMsgId: string | null = null;
    try {
      const result = await sendWhatsAppText(
        r.phone, body, r.contact_id || undefined, id, instanceToken, campaign.instance_id || undefined
      );
      ok = result.ok;
      waMsgId = result.messageid || null;
      errMsg = friendlySendError(result.error);
    } catch (e: any) {
      errMsg = e.message || 'Erro desconhecido';
    }

    await sb.from('az_campaign_recipients').update({
      status: ok ? 'sent' : 'failed',
      sent_at: ok ? new Date().toISOString() : null,
      error_message: ok ? null : errMsg,
      wa_message_id: waMsgId,
    }).eq('id', r.id);

    processed++;
    await refreshCounters(sb, id);

    // Canário: espera a confirmação de entrega antes de liberar o volume
    if (canaryMode && ok && waMsgId) {
      const delivered = await waitForDelivery(sb, UAZAPI_URL, uazToken, r.id, r.phone, waMsgId, started);
      if (delivered) {
        await refreshDelivered(sb, id);
      }
      break; // canário processa exatamente 1 por hop
    }

    await sleep(ok ? DELAY_MIN_MS + Math.floor(Math.random() * DELAY_JITTER_MS) : FAIL_DELAY_MS);
  }

  // 6. Fila ainda tem pendentes → libera o lease e encadeia o próximo lote
  const pending = await countByStatuses(sb, id, ['pending']);
  if (pending > 0) {
    await releaseLease();
    await kickWorker(url.origin, id);
    return json({ ok: true, processed, pending, canary: canaryMode || undefined });
  }

  // Outro worker ainda tem linhas em voo — ele fecha a campanha
  const processing = await countByStatuses(sb, id, ['processing']);
  if (processing > 0) return json({ ok: true, processed, waiting: processing });

  // 7. Fila vazia → conclui (guard em 'sending' preserva cancelamento)
  //    Varredura final de entregas antes de fechar o relatório
  await reconcileDeliveries(sb, UAZAPI_URL, uazToken, id, 30, started);
  await refreshCounters(sb, id);
  await refreshDelivered(sb, id);
  await sb.from('az_campaigns').update({
    status: 'completed',
    completed_at: new Date().toISOString(),
    processing_until: null,
    last_error: null,
  }).eq('id', id).eq('status', 'sending');

  return json({ ok: true, processed, done: true });
};

// ─── Settings ────────────────────────────────────────────────────────────────

async function loadSettings(sb: SB): Promise<{
  window: { enabled: boolean; start: number; end: number };
  maxDaily: number;
}> {
  const { data } = await sb
    .from('az_settings')
    .select('key, value')
    .in('key', ['blast_window', 'max_daily_messages']);

  const map = new Map((data || []).map((r: any) => [r.key, r.value]));
  const w = (map.get('blast_window') || {}) as any;
  return {
    window: {
      enabled: w.enabled !== false,
      start: Number(w.start_hour ?? 8),
      end: Number(w.end_hour ?? 18),
    },
    maxDaily: Number(map.get('max_daily_messages') ?? 500),
  };
}

// Mensagens outbound da instância desde 00:00 no fuso de Brasília
async function countSentTodayBRT(sb: SB, instanceId: string | null): Promise<number> {
  const todayBRT = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }); // YYYY-MM-DD
  const dayStartUTC = new Date(`${todayBRT}T00:00:00-03:00`).toISOString();

  let q = sb.from('az_messages')
    .select('id', { count: 'exact', head: true })
    .eq('direction', 'outbound')
    .gte('created_at', dayStartUTC);
  q = instanceId ? q.eq('instance_id', instanceId) : q;

  const { count } = await q;
  return count || 0;
}

// ─── UazapiGO helpers ───────────────────────────────────────────────────────

// true/false = resposta definitiva; null = indeterminado (fail-open)
async function checkOnWhatsApp(uazUrl: string, token: string, phone: string): Promise<boolean | null> {
  if (!uazUrl || !token) return null;
  try {
    const res = await fetch(`${uazUrl}/chat/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token },
      body: JSON.stringify({ numbers: [phone] }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    const item = Array.isArray(data) ? data[0] : null;
    if (!item || typeof item.isInWhatsapp !== 'boolean') return null;
    return item.isInWhatsapp;
  } catch {
    return null;
  }
}

// Reconcilia recipients 'sent' (enviados há ≥45s) contra o status real no
// UazapiGO. Time-boxed: nunca compromete o orçamento do hop.
async function reconcileDeliveries(
  sb: SB, uazUrl: string, token: string,
  campaignId: string, maxRows: number, hopStarted: number
): Promise<void> {
  if (!uazUrl || !token) return;

  const { data: rows } = await sb
    .from('az_campaign_recipients')
    .select('id, phone, wa_message_id')
    .eq('campaign_id', campaignId)
    .eq('status', 'sent')
    .not('wa_message_id', 'is', null)
    .lt('sent_at', new Date(Date.now() - 45_000).toISOString())
    .order('sent_at', { ascending: true })
    .limit(maxRows);

  for (const r of rows || []) {
    if (Date.now() - hopStarted > 12_000) break; // reserva o resto p/ envios
    try {
      const res = await fetch(`${uazUrl}/message/find`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify({ chatid: `${r.phone}@s.whatsapp.net`, limit: 20 }),
        signal: AbortSignal.timeout(6_000),
      });
      const data = await res.json().catch(() => null);
      const found = (data?.messages || []).find((m: any) => m.messageid === r.wa_message_id);
      const st = String(found?.status || '').toLowerCase();
      if (st.includes('read') || st.includes('played')) {
        await sb.from('az_campaign_recipients').update({ status: 'read' }).eq('id', r.id);
      } else if (st.includes('deliver')) {
        await sb.from('az_campaign_recipients').update({ status: 'delivered' }).eq('id', r.id);
      }
    } catch { /* tenta no próximo hop */ }
  }
}

// Poll do canário: webhook ACK (recipient no banco) OU /message/find no UazapiGO
async function waitForDelivery(
  sb: SB, uazUrl: string, token: string,
  recipientId: string, phone: string, waMsgId: string, hopStarted: number
): Promise<boolean> {
  const deadline = Math.min(Date.now() + CANARY_WAIT_MS, hopStarted + TIME_BUDGET_MS + 10_000);

  while (Date.now() < deadline) {
    await sleep(CANARY_POLL_MS);

    // 1. Webhook pode já ter marcado
    const { data: recip } = await sb
      .from('az_campaign_recipients')
      .select('status')
      .eq('id', recipientId)
      .maybeSingle();
    if (recip && (recip.status === 'delivered' || recip.status === 'read')) return true;

    // 2. Consulta ativa no UazapiGO
    try {
      const res = await fetch(`${uazUrl}/message/find`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify({ chatid: `${phone}@s.whatsapp.net`, limit: 10 }),
        signal: AbortSignal.timeout(8_000),
      });
      const data = await res.json().catch(() => null);
      const found = (data?.messages || []).find((m: any) => m.messageid === waMsgId);
      const st = String(found?.status || '').toLowerCase();
      if (st.includes('deliver') || st.includes('read') || st.includes('played')) {
        await sb.from('az_campaign_recipients')
          .update({ status: st.includes('deliver') ? 'delivered' : 'read' })
          .eq('id', recipientId);
        return true;
      }
    } catch { /* tenta de novo no próximo ciclo */ }
  }
  return false;
}

function friendlySendError(err: string | undefined | null): string | null {
  if (!err) return null;
  if (err === 'HTTP 500') return 'Número inexistente no WhatsApp ou inválido (erro do UazapiGO)';
  return err;
}

// ─── Contadores ─────────────────────────────────────────────────────────────

async function countByStatuses(sb: SB, campaignId: string, statuses: string[]): Promise<number> {
  const { count } = await sb
    .from('az_campaign_recipients')
    .select('id', { count: 'exact', head: true })
    .eq('campaign_id', campaignId)
    .in('status', statuses);
  return count || 0;
}

// Contadores sempre recalculados da fonte de verdade — sobrevive a retomadas.
// "Enviados" inclui delivered/read (entrega é um upgrade de sent).
async function refreshCounters(sb: SB, campaignId: string): Promise<void> {
  const sent = await countByStatuses(sb, campaignId, ['sent', 'delivered', 'read']);
  const failed = await countByStatuses(sb, campaignId, ['failed']);
  await sb.from('az_campaigns')
    .update({ sent_count: sent, failed_count: failed })
    .eq('id', campaignId);
}

async function refreshDelivered(sb: SB, campaignId: string): Promise<void> {
  const delivered = await countByStatuses(sb, campaignId, ['delivered', 'read']);
  await sb.from('az_campaigns')
    .update({ delivered_count: delivered })
    .eq('id', campaignId);
}

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
