import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';
import { requireAdmin } from '../../../lib/api-auth';

export const PATCH: APIRoute = async ({ params, request, locals }) => {
  const auth = requireAdmin(locals);
  if (auth instanceof Response) return auth;

  const supabase = createServerClient();
  const body = await request.json();
  const { data, error } = await supabase
    .from('deals')
    .update({ ...body, updated_at: new Date().toISOString(), last_activity: new Date().toISOString().split('T')[0] })
    .eq('id', params.id)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const auth = requireAdmin(locals);
  if (auth instanceof Response) return auth;

  const supabase = createServerClient();
  const { error } = await supabase.from('deals').delete().eq('id', params.id);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(null, { status: 204 });
};
