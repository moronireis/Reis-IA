import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const profile = locals.profile;
  if (!profile?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', profile.id)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
};

export const PATCH: APIRoute = async ({ request, locals }) => {
  const profile = locals.profile;
  if (!profile?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const body = await request.json();
  const supabase = createServerClient();

  if (body.read_all === true) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', profile.id)
      .eq('read', false);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  if (body.ids && Array.isArray(body.ids)) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .in('id', body.ids)
      .eq('user_id', profile.id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
};
