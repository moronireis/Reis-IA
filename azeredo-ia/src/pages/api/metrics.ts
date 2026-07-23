import type { APIRoute } from 'astro';
import { requireRole } from '../../lib/api-auth';
import { createServerClient } from '../../lib/supabase-server';

export const prerender = false;

type SB = ReturnType<typeof createServerClient>;
type Agg = { sent: number; delivered: number; read: number; replied: number; failed: number };

/**
 * GET /api/metrics?range=today|7d|30d  (or ?from=ISO&to=ISO)
 *
 * Painel de Métricas (v2). Agrega envios/entregas/leituras/respostas/falhas:
 *  - totais do período + período anterior de mesmo tamanho (para variação %)
 *  - série diária (RPC az_metrics_series) para o gráfico
 *  - quebras por campanha / número / vendedor / template
 * Contagens vêm de RPCs server-side (az_metrics_by_campaign) para não bater no
 * teto de linhas do PostgREST; os metadados (nomes) são juntados aqui.
 */
export const GET: APIRoute = async ({ locals, url }) => {
  const profile = requireRole(locals as any, ['gerencia']);
  if (profile instanceof Response) return profile;

  const sb = createServerClient();
  const { from, to, prevFrom, prevTo, label } = resolveRange(url.searchParams);

  const [seriesRes, curRes, prevRes] = await Promise.all([
    sb.rpc('az_metrics_series', { p_from: from, p_to: to }),
    sb.rpc('az_metrics_by_campaign', { p_from: from, p_to: to }),
    sb.rpc('az_metrics_by_campaign', { p_from: prevFrom, p_to: prevTo }),
  ]);

  if (curRes.error) return json({ error: curRes.error.message }, 500);

  const curRows = (curRes.data || []).map(normalizeRow);
  const prevRows = (prevRes.data || []).map(normalizeRow);

  // Metadados das campanhas presentes no período
  const campaignIds = curRows.map((r: any) => r.campaign_id).filter(Boolean);
  let meta: Record<string, any> = {};
  let profilesById: Record<string, string> = {};
  if (campaignIds.length > 0) {
    const [{ data: camps }, { data: profs }] = await Promise.all([
      sb.from('az_campaigns')
        .select('id, name, instance_id, template_id, custom_media_type, az_whatsapp_instances(id, display_name, uazapi_name, owner_profile_id), az_templates(name)')
        .in('id', campaignIds),
      sb.from('az_profiles').select('id, full_name'),
    ]);
    for (const p of profs || []) profilesById[p.id] = p.full_name || '—';
    for (const c of camps || []) meta[c.id] = c;
  }

  // ── Totais + taxas ────────────────────────────────────────────────────────
  const totals = sumAgg(curRows);
  const prevTotals = sumAgg(prevRows);

  // ── Quebra por campanha ───────────────────────────────────────────────────
  const byCampaign = curRows.map((r: any) => {
    const m = meta[r.campaign_id] || {};
    const inst = m.az_whatsapp_instances || {};
    return {
      id: r.campaign_id,
      name: m.name || 'Campanha removida',
      instance: inst.display_name || inst.uazapi_name || '—',
      vendedor: inst.owner_profile_id ? (profilesById[inst.owner_profile_id] || '—') : '—',
      template: m.az_templates?.name || (m.custom_media_type ? 'Mídia' : 'Texto livre'),
      hasMedia: !!m.custom_media_type,
      ...aggWithRates(r),
    };
  }).sort((a: any, b: any) => b.sent - a.sent);

  // ── Roll-ups em memória (dezenas de campanhas — trivial) ───────────────────
  const byInstance = rollup(byCampaign, c => c.instance, (k) => ({ name: k }));
  const byVendedor = rollup(byCampaign, c => c.vendedor, (k) => ({ name: k }));
  const byTemplate = rollup(byCampaign, c => c.template, (k) => ({ name: k }));

  return json({
    range: { from, to, label },
    totals: aggWithRates(totals),
    prev: prevTotals,
    delta: {
      sent: pctChange(totals.sent, prevTotals.sent),
      delivered: pctChange(totals.delivered, prevTotals.delivered),
      replied: pctChange(totals.replied, prevTotals.replied),
      failed: pctChange(totals.failed, prevTotals.failed),
    },
    series: (seriesRes.data || []).map((d: any) => ({
      day: d.day,
      sent: Number(d.sent) || 0,
      delivered: Number(d.delivered) || 0,
      read: Number(d.read_ct) || 0,
      replied: Number(d.replied) || 0,
      failed: Number(d.failed) || 0,
    })),
    byCampaign,
    byInstance,
    byVendedor,
    byTemplate,
  });
};

// ── helpers ──────────────────────────────────────────────────────────────────

function normalizeRow(r: any): Agg & { campaign_id: string } {
  return {
    campaign_id: r.campaign_id,
    sent: Number(r.sent) || 0,
    delivered: Number(r.delivered) || 0,
    read: Number(r.read_ct) || 0,
    replied: Number(r.replied) || 0,
    failed: Number(r.failed) || 0,
  };
}

function sumAgg(rows: Agg[]): Agg {
  return rows.reduce((a, r) => ({
    sent: a.sent + r.sent,
    delivered: a.delivered + r.delivered,
    read: a.read + r.read,
    replied: a.replied + r.replied,
    failed: a.failed + r.failed,
  }), { sent: 0, delivered: 0, read: 0, replied: 0, failed: 0 });
}

function aggWithRates(a: Agg) {
  const attempts = a.sent + a.failed;
  return {
    ...a,
    deliveryRate: a.sent ? a.delivered / a.sent : 0,
    readRate: a.delivered ? a.read / a.delivered : 0,
    replyRate: a.delivered ? a.replied / a.delivered : 0,
    failRate: attempts ? a.failed / attempts : 0,
  };
}

function rollup(
  items: Array<Agg & Record<string, any>>,
  keyOf: (c: any) => string,
  seed: (k: string) => Record<string, any>,
) {
  const map: Record<string, Agg & Record<string, any>> = {};
  for (const it of items) {
    const k = keyOf(it) || '—';
    if (!map[k]) map[k] = { ...seed(k), sent: 0, delivered: 0, read: 0, replied: 0, failed: 0 };
    map[k].sent += it.sent; map[k].delivered += it.delivered; map[k].read += it.read;
    map[k].replied += it.replied; map[k].failed += it.failed;
  }
  return Object.values(map).map(v => ({ ...v, ...aggWithRates(v as Agg) })).sort((a, b) => b.sent - a.sent);
}

function pctChange(cur: number, prev: number): number | null {
  if (!prev) return cur ? null : 0; // null = "novo" (sem base de comparação)
  return (cur - prev) / prev;
}

function resolveRange(params: URLSearchParams) {
  const now = Date.now();
  const fromParam = params.get('from');
  const toParam = params.get('to');
  if (fromParam && toParam) {
    const from = new Date(fromParam), to = new Date(toParam);
    const span = to.getTime() - from.getTime();
    return {
      from: from.toISOString(), to: to.toISOString(),
      prevFrom: new Date(from.getTime() - span).toISOString(),
      prevTo: from.toISOString(),
      label: 'Período personalizado',
    };
  }
  const range = params.get('range') || '30d';
  let spanMs: number, label: string;
  if (range === 'today') {
    const todayBRT = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
    const from = new Date(`${todayBRT}T00:00:00-03:00`);
    spanMs = now - from.getTime();
    return {
      from: from.toISOString(), to: new Date(now).toISOString(),
      prevFrom: new Date(from.getTime() - 24 * 3600_000).toISOString(),
      prevTo: from.toISOString(),
      label: 'Hoje',
    };
  }
  if (range === '7d') { spanMs = 7 * 24 * 3600_000; label = 'Últimos 7 dias'; }
  else { spanMs = 30 * 24 * 3600_000; label = 'Últimos 30 dias'; }
  const from = new Date(now - spanMs);
  return {
    from: from.toISOString(), to: new Date(now).toISOString(),
    prevFrom: new Date(now - 2 * spanMs).toISOString(),
    prevTo: from.toISOString(),
    label,
  };
}

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
