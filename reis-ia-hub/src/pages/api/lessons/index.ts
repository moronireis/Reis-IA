import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const POST: APIRoute = async ({ request, locals }) => {
  const profile = locals.profile;
  if (profile?.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const supabase = createServerClient();
  const body = await request.json();
  const { data, error } = await supabase
    .from('lessons')
    .insert(body)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 201 });
};
