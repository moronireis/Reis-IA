import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

export const PATCH: APIRoute = async ({ params, locals }) => {
  const profile = locals.profile;
  if (!profile?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });
  }

  const supabase = createServerClient();
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', id)
    .eq('user_id', profile.id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
