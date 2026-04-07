import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const GET: APIRoute = async ({ url }) => {
  const supabase = createServerClient();

  const contactId = url.searchParams.get('contact_id') || '';
  const category = url.searchParams.get('category') || '';
  const direction = url.searchParams.get('direction') || '';
  const state = url.searchParams.get('state') || '';
  const phone = url.searchParams.get('phone') || '';
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = parseInt(url.searchParams.get('limit') || '50', 10);
  const offset = (page - 1) * limit;

  let query = supabase
    .from('sdr_conversations')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (contactId) query = query.eq('contact_id', contactId);
  if (category) query = query.eq('category', category);
  if (direction) query = query.eq('direction', direction);
  if (state) query = query.eq('conversation_state', state);
  if (phone) query = query.ilike('contact_phone', `%${phone}%`);

  const { data, error, count } = await query;

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ data, total: count }), { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  const supabase = createServerClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from('sdr_conversations')
    .insert(body)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 201 });
};
