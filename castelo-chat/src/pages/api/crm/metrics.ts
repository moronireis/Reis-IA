import type { APIRoute } from 'astro';
import { createServerSupabase } from '../../../lib/supabase-server';

export const GET: APIRoute = async () => {
  const supabase = createServerSupabase();

  // Total conversations (contacts with at least one message)
  const { data: conversations, error: e1 } = await supabase
    .from('castelo_contacts')
    .select('id, lead_stage, source, created_at')
    .not('last_message_at', 'is', null);

  if (e1) return new Response(JSON.stringify({ error: e1.message }), { status: 500 });

  const contacts = conversations || [];

  // Stage counts
  const stageCounts: Record<string, number> = {
    novo: 0,
    contato_feito: 0,
    proposta_enviada: 0,
    visita_agendada: 0,
    visita_realizada: 0,
    negociacao: 0,
    fechado: 0,
    perdido: 0,
  };

  let noStage = 0;
  for (const c of contacts) {
    if (c.lead_stage && stageCounts[c.lead_stage] !== undefined) {
      stageCounts[c.lead_stage]++;
    } else {
      noStage++;
    }
  }

  // New contacts in last 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const recentCount = contacts.filter(c => c.created_at >= sevenDaysAgo).length;

  // Meetings booked = visita_agendada + visita_realizada
  const meetingsBooked = stageCounts.visita_agendada + stageCounts.visita_realizada;

  // Active pipeline = contato_feito + proposta_enviada + negociacao
  const activePipeline = stageCounts.contato_feito + stageCounts.proposta_enviada + stageCounts.negociacao;

  // Conversion rates
  const total = contacts.length;
  const rateConvToMeeting = total > 0 ? (meetingsBooked / total) * 100 : 0;
  const rateConvToClose = total > 0 ? (stageCounts.fechado / total) * 100 : 0;
  const rateMeetingToClose = meetingsBooked > 0 ? (stageCounts.fechado / meetingsBooked) * 100 : 0;

  return new Response(
    JSON.stringify({
      total_conversations: total,
      new_last_7d: recentCount,
      meetings_booked: meetingsBooked,
      closed: stageCounts.fechado,
      lost: stageCounts.perdido,
      active_pipeline: activePipeline,
      no_stage: noStage,
      by_stage: stageCounts,
      rates: {
        conv_to_meeting: Math.round(rateConvToMeeting * 10) / 10,
        conv_to_close: Math.round(rateConvToClose * 10) / 10,
        meeting_to_close: Math.round(rateMeetingToClose * 10) / 10,
      },
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};
