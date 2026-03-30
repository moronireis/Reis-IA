import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const GET: APIRoute = async ({ locals }) => {
  const supabase = createServerClient();
  const profile = locals.profile;
  const isAdmin = profile?.role === 'admin';

  let query = supabase
    .from('courses')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (!isAdmin) {
    query = query.eq('status', 'published');
  }

  const { data, error } = await query;
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const profile = locals.profile;
  if (profile?.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const supabase = createServerClient();
  const body = await request.json();
  const { data, error } = await supabase
    .from('courses')
    .insert(body)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 201 });
};
