import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const GET: APIRoute = async ({ url }) => {
  const supabase = createServerClient();

  const q = url.searchParams.get('q') || '';
  const tag = url.searchParams.get('tag') || '';
  const faturamento = url.searchParams.get('faturamento') || '';
  const cargo = url.searchParams.get('cargo') || '';
  const hasPhone = url.searchParams.get('has_phone') || '';
  const hasIg = url.searchParams.get('has_ig') || '';
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = parseInt(url.searchParams.get('limit') || '50', 10);
  const offset = (page - 1) * limit;

  // New params for Opportunities view
  const sortParam = url.searchParams.get('sort') || 'created_at';
  const orderParam = url.searchParams.get('order') || 'desc';
  const productParam = url.searchParams.get('product') || '';
  const minScoreParam = url.searchParams.get('min_score') || '';

  const validSortColumns = ['opportunity_score', 'created_at', 'name'];
  const sortColumn = validSortColumns.includes(sortParam) ? sortParam : 'created_at';
  const ascending = orderParam === 'asc';

  let query = supabase
    .from('contacts')
    .select('*', { count: 'exact' })
    .order(sortColumn, { ascending })
    .range(offset, offset + limit - 1);

  if (q) {
    query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`);
  }

  if (tag) {
    query = query.contains('tags', [tag]);
  }

  if (faturamento) {
    query = query.eq('faturamento', faturamento);
  }

  if (cargo) {
    query = query.ilike('cargo', `%${cargo}%`);
  }

  if (hasPhone === 'true') {
    query = query.neq('phone', '').not('phone', 'is', null);
  }

  if (hasIg === 'true') {
    query = query.neq('instagram', '').not('instagram', 'is', null);
  }

  if (productParam) {
    query = query.eq('best_fit_product', productParam);
  }

  if (minScoreParam) {
    const minScore = parseInt(minScoreParam, 10);
    if (!isNaN(minScore)) {
      query = query.gte('opportunity_score', minScore);
    }
  }

  const { data, error, count } = await query;

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ data, total: count }), { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  const supabase = createServerClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from('contacts')
    .insert(body)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 201 });
};
