import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const GET: APIRoute = async () => {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('vault_categories')
    .select(`
      *,
      resource_count:vault_resources(count)
    `)
    .order('sort_order', { ascending: true });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};
