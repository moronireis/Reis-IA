import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';
import { scanReplies, type ReplyScanRow } from '../../../lib/reply-scan';

export const prerender = false;

type SB = ReturnType<typeof createServerClient>;

/**
 * GET /api/campaigns/dashboard[?scan=1]
 * Visão agregada em tempo real (Fase 2 do backlog): cards hoje/7 dias,
 * campanhas ativas com progresso, campanhas recentes e feed de respostas.
 *
 * scan=1 (enviado pelo polling da aba Dashboard): roda uma varredura curta
 * de respostas via /message/find antes de agregar — é o que dá o "tempo
 * real" sem webhook. Cursor = reply_checked_at (menos conferido primeiro).
 */
export const GET: APIRoute = async ({ locals, url }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const sb = createServerClient();
  const UAZAPI_URL = (import.meta.env.UAZAPI_URL || '').trim();
  const fallbackToken = (import.meta.env.UAZAPI_TOKEN || '').trim();

  // Varredura de respostas (time-boxed: nunca segura o polling por muito tempo)
  let scanInfo: { scanned: number; replies: number } | null = null;
  if (url.searchParams.get('scan') === '1' && UAZAPI_URL) {
    scanInfo = await runGlobalReplyScan(sb, UAZAPI_URL, fallbackToken, 10, Date.now() + 6_000);
  }

  const todayBRT = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
  const dayStart = new Date(`${todayBRT}T00:00:00-03:00`).toISOString();
  const weekStart = new Date(Date.now() - 7 * 24 * 3600_000).toISOString();

  const [today, week, active, recent, feed] = await Promise.all([
    periodStats(sb, dayStart),
    periodStats(sb, weekStart),
    sb.from('az_campaigns')
      .select('id, name, status, total_count, sent_count, delivered_count, failed_count, started_at, last_error, az_whatsapp_instances(display_name, uazapi_name)')
      .eq('status', 'sending')
      .order('started_at', { ascending: false }),
    sb.from('az_campaigns')
      .select('id, name, status, total_count, sent_count, delivered_count, failed_count, started_at, completed_at, last_error, az_whatsapp_instances(display_name, uazapi_name)')
      .in('status', ['completed', 'error', 'cancelled'])
      .gte('created_at', weekStart)
      .order('created_at', { ascending: false })
      .limit(10),
    sb.from('az_messages')
      .select('id, phone, body, created_at, campaign_id, az_contacts(nome_fantasia, razao_social), az_campaigns(name)')
      .eq('direction', 'inbound')
      .order('created_at', { ascending: false })
      .limit(20),
  ]);

  // Respostas por campanha (uma query só, contagem em memória)
  const campaignIds = [
    ...(active.data || []).map((c: any) => c.id),
    ...(recent.data || []).map((c: any) => c.id),
  ];
  const repliesByCampaign: Record<string, number> = {};
  if (campaignIds.length > 0) {
    const { data: replyRows } = await sb
      .from('az_campaign_recipients')
      .select('campaign_id')
      .in('campaign_id', campaignIds)
      .not('replied_at', 'is', null);
    for (const r of replyRows || []) {
      repliesByCampaign[r.campaign_id] = (repliesByCampaign[r.campaign_id] || 0) + 1;
    }
  }

  const attachReplies = (c: any) => ({ ...c, replied_count: repliesByCampaign[c.id] || 0 });

  return json({
    today: today,
    week: week,
    active: (active.data || []).map(attachReplies),
    recent: (recent.data || []).map(attachReplies),
    replies_feed: (feed.data || []).map((m: any) => ({
      id: m.id,
      phone: m.phone,
      body: m.body,
      created_at: m.created_at,
      contact_name: m.az_contacts?.nome_fantasia || m.az_contacts?.razao_social || null,
      campaign_name: m.az_campaigns?.name || null,
    })),
    scan: scanInfo,
  });
};

async function periodStats(sb: SB, sinceIso: string) {
  const count = async (build: (q: any) => any): Promise<number> => {
    const q = build(sb.from('az_campaign_recipients').select('id', { count: 'exact', head: true }));
    const { count: n } = await q;
    return n || 0;
  };
  const [sent, delivered, failed, replies] = await Promise.all([
    count(q => q.in('status', ['sent', 'delivered', 'read']).gte('sent_at', sinceIso)),
    count(q => q.in('status', ['delivered', 'read']).gte('sent_at', sinceIso)),
    count(q => q.eq('status', 'failed').gte('created_at', sinceIso)),
    count(q => q.gte('replied_at', sinceIso)),
  ]);
  return { sent, delivered, failed, replies };
}

// Varredura global: recipients enviados nos últimos 7 dias, ainda sem
// resposta, menos recentemente conferidos primeiro (round-robin natural).
async function runGlobalReplyScan(
  sb: SB, uazUrl: string, fallbackToken: string, maxRows: number, deadlineMs: number
) {
  const weekAgo = new Date(Date.now() - 7 * 24 * 3600_000).toISOString();
  const { data: rows } = await sb
    .from('az_campaign_recipients')
    .select('id, phone, sent_at, contact_id, campaign_id, az_campaigns(instance_id, az_whatsapp_instances(token))')
    .in('status', ['sent', 'delivered', 'read'])
    .is('replied_at', null)
    .gte('sent_at', weekAgo)
    .order('reply_checked_at', { ascending: true, nullsFirst: true })
    .limit(maxRows);

  if (!rows?.length) return { scanned: 0, replies: 0 };

  const scanRows: ReplyScanRow[] = rows.map((r: any) => ({
    id: r.id,
    phone: r.phone,
    sent_at: r.sent_at,
    contact_id: r.contact_id,
    campaign_id: r.campaign_id,
    instance_id: r.az_campaigns?.instance_id || null,
    token: r.az_campaigns?.az_whatsapp_instances?.token || null,
  }));

  return scanReplies(sb, uazUrl, fallbackToken, scanRows, deadlineMs);
}

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
