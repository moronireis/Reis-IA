import type { APIRoute } from 'astro';
import { createServerSupabase } from '../../../lib/supabase-server';

const BUDGET_MID: Record<string, number> = {
  '< R$ 50k': 35000,
  'R$ 50k – 100k': 75000,
  'R$ 100k – 200k': 150000,
  'R$ 200k+': 250000,
};

export const GET: APIRoute = async () => {
  const supabase = createServerSupabase();

  const { data: contacts } = await supabase
    .from('castelo_contacts')
    .select('id, lead_stage, event_type, source, budget_range, event_date, last_message_at, last_message_direction, created_at')
    .eq('is_group', false);

  const list = contacts || [];
  const now = Date.now();

  // Stage distribution + value
  const stages = ['novo', 'contato_feito', 'proposta_enviada', 'visita_agendada', 'visita_realizada', 'negociacao', 'fechado', 'perdido'];
  const stage_data: Record<string, { count: number; value: number }> = {};
  for (const s of stages) stage_data[s] = { count: 0, value: 0 };

  let no_stage = 0;

  for (const c of list) {
    const stage = c.lead_stage || null;
    const val = BUDGET_MID[String(c.budget_range || '')] ?? 0;
    if (stage && stage_data[stage]) {
      stage_data[stage].count++;
      stage_data[stage].value += val;
    } else {
      no_stage++;
    }
  }

  // Source distribution
  const source_counts: Record<string, number> = {};
  for (const c of list) {
    const src = c.source || 'Desconhecido';
    source_counts[src] = (source_counts[src] || 0) + 1;
  }

  // Event type distribution
  const event_counts: Record<string, number> = {};
  for (const c of list) {
    if (c.event_type) {
      event_counts[c.event_type] = (event_counts[c.event_type] || 0) + 1;
    }
  }

  // Needs followup (last msg inbound > 2h ago, not closed/lost)
  const needs_followup = list.filter(c =>
    c.last_message_direction === 'inbound' &&
    c.last_message_at &&
    now - new Date(c.last_message_at).getTime() > 2 * 3600 * 1000 &&
    c.lead_stage !== 'fechado' &&
    c.lead_stage !== 'perdido'
  ).length;

  // Upcoming events in next 30 days
  const in30 = new Date(now + 30 * 86400000).toISOString().split('T')[0];
  const today = new Date(now).toISOString().split('T')[0];
  const upcoming_events = list
    .filter(c => c.event_date && c.event_date >= today && c.event_date <= in30)
    .sort((a, b) => (a.event_date || '').localeCompare(b.event_date || ''))
    .slice(0, 10)
    .map(c => ({ id: c.id, event_date: c.event_date, event_type: c.event_type, lead_stage: c.lead_stage }));

  // Avg response time — fetch pairs of (inbound, next outbound) for messages in last 30 days
  const thirtyDaysAgo = new Date(now - 30 * 86400000).toISOString();
  const { data: recentMsgs } = await supabase
    .from('castelo_messages')
    .select('contact_id, direction, created_at')
    .gte('created_at', thirtyDaysAgo)
    .order('created_at', { ascending: true });

  let totalResponseMs = 0;
  let responseCount = 0;

  if (recentMsgs?.length) {
    // Group by contact, then walk message pairs
    const byContact: Record<string, Array<{ direction: string; ts: number }>> = {};
    for (const m of recentMsgs) {
      if (!byContact[m.contact_id]) byContact[m.contact_id] = [];
      byContact[m.contact_id].push({ direction: m.direction, ts: new Date(m.created_at).getTime() });
    }
    for (const msgs of Object.values(byContact)) {
      for (let i = 0; i < msgs.length - 1; i++) {
        if (msgs[i].direction === 'inbound' && msgs[i + 1].direction === 'outbound') {
          const diff = msgs[i + 1].ts - msgs[i].ts;
          if (diff > 0 && diff < 24 * 3600 * 1000) { // ignore > 24h gaps
            totalResponseMs += diff;
            responseCount++;
          }
        }
      }
    }
  }

  const avg_response_minutes = responseCount > 0 ? Math.round(totalResponseMs / responseCount / 60000) : null;

  // Total active pipeline value
  const active_stages = ['contato_feito', 'proposta_enviada', 'visita_agendada', 'visita_realizada', 'negociacao'];
  const pipeline_value = active_stages.reduce((sum, s) => sum + stage_data[s].value, 0);
  const closed_value = stage_data['fechado'].value;
  const total_contacts = list.length;

  return new Response(
    JSON.stringify({
      stage_data,
      no_stage,
      source_counts,
      event_counts,
      needs_followup,
      upcoming_events,
      avg_response_minutes,
      pipeline_value,
      closed_value,
      total_contacts,
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};
