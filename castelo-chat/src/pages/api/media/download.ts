import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../../lib/auth';
import { createServerSupabase } from '../../../lib/supabase-server';

export const GET: APIRoute = async ({ request, url }) => {
  if (!isAuthenticated(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const msgId = url.searchParams.get('msgid');
  if (!msgId) {
    return new Response('Missing msgid', { status: 400 });
  }

  const supabase = createServerSupabase();
  const { data } = await supabase
    .from('castelo_messages')
    .select('media_url')
    .eq('id', msgId)
    .single();

  if (data?.media_url) {
    return new Response(null, {
      status: 302,
      headers: { Location: data.media_url as string },
    });
  }
  return new Response('Not found', { status: 404 });
};
