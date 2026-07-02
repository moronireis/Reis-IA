import type { APIRoute } from 'astro';
import { createServerSupabase } from '../../../lib/supabase-server';

const BUDGET_MID: Record<string, number> = {
  '< R$ 50k': 35000,
  'R$ 50k – 100k': 75000,
  'R$ 100k – 200k': 150000,
  'R$ 200k+': 250000,
};

const STAGE_SCORE: Record<string, number> = {
  fechado: 3, negociacao: 2, visita_realizada: 2, visita_agendada: 2,
  proposta_enviada: 1, contato_feito: 1, novo: 0, perdido: 0,
};

function computeLeadScore(
  contact: Record<string, unknown>,
  inboundCount: number
): number {
  let score = 0;

  // Budget (0–4)
  const budget = String(contact.budget_range || '');
  if (budget.includes('200k+')) score += 4;
  else if (budget.includes('100k')) score += 3;
  else if (budget.includes('50k')) score += 2;
  else if (budget) score += 1;

  // Stage (0–3)
  score += STAGE_SCORE[String(contact.lead_stage || 'novo')] || 0;

  // Has event date (0–1)
  if (contact.event_date) score += 1;

  // Active in last 3 days (0–1)
  if (contact.last_message_at) {
    const days = (Date.now() - new Date(String(contact.last_message_at)).getTime()) / 86400000;
    if (days < 3) score += 1;
  }

  // Engagement: 5+ inbound msgs (0–1)
  if (inboundCount >= 5) score += 1;

  return Math.min(score, 10);
}

export const GET: APIRoute = async () => {
  const supabase = createServerSupabase();

  // Fetch all non-group contacts
  const { data: contacts, error } = await supabase
    .from('castelo_contacts')
    .select('*')
    .eq('is_group', false)
    .order('last_message_at', { ascending: false, nullsFirst: false });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  if (!contacts?.length) return new Response(JSON.stringify([]), { headers: { 'Content-Type': 'application/json' } });

  const contactIds = contacts.map((c) => c.id);

  // Fetch message stats per contact in one query
  const { data: msgs } = await supabase
    .from('castelo_messages')
    .select('contact_id, direction, created_at')
    .in('contact_id', contactIds);

  // Aggregate per contact
  const msgMap: Record<string, { total: number; inbound: number; outbound: number; first_at: string | null }> = {};
  for (const m of msgs || []) {
    const cid = m.contact_id;
    if (!msgMap[cid]) msgMap[cid] = { total: 0, inbound: 0, outbound: 0, first_at: null };
    msgMap[cid].total++;
    if (m.direction === 'inbound') msgMap[cid].inbound++;
    else msgMap[cid].outbound++;
    if (!msgMap[cid].first_at || m.created_at < msgMap[cid].first_at!) {
      msgMap[cid].first_at = m.created_at;
    }
  }

  const now = Date.now();

  const enriched = contacts.map((c) => {
    const stats = msgMap[c.id] || { total: 0, inbound: 0, outbound: 0, first_at: null };
    const lastMsgAt = c.last_message_at ? new Date(c.last_message_at).getTime() : null;
    const firstMsgAt = stats.first_at ? new Date(stats.first_at).getTime() : null;

    const days_since_last = lastMsgAt ? Math.floor((now - lastMsgAt) / 86400000) : null;
    const days_since_first = firstMsgAt ? Math.floor((now - firstMsgAt) / 86400000) : null;

    const needs_followup =
      c.last_message_direction === 'inbound' &&
      lastMsgAt != null &&
      now - lastMsgAt > 2 * 3600 * 1000 &&
      c.lead_stage !== 'fechado' &&
      c.lead_stage !== 'perdido';

    const lead_score = computeLeadScore(c, stats.inbound);
    const stars = Math.max(1, Math.ceil(lead_score / 2));

    const budget_value = BUDGET_MID[String(c.budget_range || '')] ?? 0;

    return {
      ...c,
      message_count: stats.total,
      inbound_count: stats.inbound,
      outbound_count: stats.outbound,
      first_message_at: stats.first_at,
      days_since_last,
      days_since_first,
      needs_followup,
      lead_score,
      stars,
      budget_value,
    };
  });

  return new Response(JSON.stringify(enriched), {
    headers: { 'Content-Type': 'application/json' },
  });
};
