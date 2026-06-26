import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../../lib/auth';
import { createServerSupabase } from '../../../lib/supabase-server';

export const GET: APIRoute = async ({ request, url }) => {
  if (!isAuthenticated(request)) return new Response('Unauthorized', { status: 401 });

  const supabase = createServerSupabase();
  const mode = url.searchParams.get('mode') || 'conversations';
  const limit = Math.min(Number(url.searchParams.get('limit') || 50), 200);
  const offset = Number(url.searchParams.get('offset') || 0);

  if (mode === 'conversations') {
    // Only contacts with messages, ordered by last activity
    const { data, error } = await supabase
      .from('castelo_contacts')
      .select('*')
      .not('last_message_at', 'is', null)
      .order('last_message_at', { ascending: false });

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  }

  // mode=all — paginated, ordered by name
  const { data, error } = await supabase
    .from('castelo_contacts')
    .select('*')
    .order('name', { ascending: true, nullsFirst: false })
    .range(offset, offset + limit - 1);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
};
