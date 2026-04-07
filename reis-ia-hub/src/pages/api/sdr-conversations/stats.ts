import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const GET: APIRoute = async () => {
  const supabase = createServerClient();

  const categories = ['marketing', 'systems', 'mentoria'];
  const stats: Record<string, any> = {};

  for (const cat of categories) {
    const { count: outbound } = await supabase
      .from('sdr_conversations')
      .select('*', { count: 'exact', head: true })
      .eq('category', cat)
      .eq('direction', 'outbound');

    const { count: inbound } = await supabase
      .from('sdr_conversations')
      .select('*', { count: 'exact', head: true })
      .eq('category', cat)
      .eq('direction', 'inbound');

    const { count: qualified } = await supabase
      .from('sdr_conversations')
      .select('*', { count: 'exact', head: true })
      .eq('category', cat)
      .eq('conversation_state', 'qualified');

    const { count: meetings } = await supabase
      .from('sdr_conversations')
      .select('*', { count: 'exact', head: true })
      .eq('category', cat)
      .eq('conversation_state', 'meeting_booked');

    stats[cat] = {
      outbound: outbound || 0,
      inbound: inbound || 0,
      qualified: qualified || 0,
      meetings_booked: meetings || 0,
    };
  }

  return new Response(JSON.stringify(stats), { status: 200 });
};
