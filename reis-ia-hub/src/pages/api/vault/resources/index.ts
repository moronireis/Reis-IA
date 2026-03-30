import type { APIRoute } from 'astro';
import { createServerClient } from '../../../../lib/supabase-server';

export const GET: APIRoute = async ({ url, locals }) => {
  const supabase = createServerClient();
  const profile = locals.profile;
  const isAdmin = profile?.role === 'admin';

  const categoryId = url.searchParams.get('category_id');
  const type = url.searchParams.get('type');

  let query = supabase
    .from('vault_resources')
    .select('*')
    .order('created_at', { ascending: false });

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  if (type) {
    query = query.eq('type', type);
  }

  // Filter by access_level if not admin
  if (!isAdmin) {
    if (profile?.role === 'builders') {
      query = query.in('access_level', ['all', 'builders']);
    } else if (profile?.role === 'systems') {
      query = query.in('access_level', ['all', 'systems']);
    } else {
      query = query.eq('access_level', 'all');
    }
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
    .from('vault_resources')
    .insert(body)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 201 });
};
