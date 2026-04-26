import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const GET: APIRoute = async () => {
  const { data, error } = await supabase
    .from('fh_projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ projects: data }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { name, mode, target_url, niche, keywords, references } = body;

  if (!name || !mode) {
    return new Response(JSON.stringify({ error: 'name and mode are required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('fh_projects')
    .insert({
      name,
      mode,
      target_url: target_url || null,
      niche: niche || null,
      keywords: keywords || null,
      status: 'pending',
    })
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  // If references provided, insert as competitors
  if (references && Array.isArray(references) && references.length > 0) {
    const competitors = references.map((ref: string) => ({
      project_id: data.id,
      name: ref,
      url: ref.startsWith('http') ? ref : null,
      status: 'discovered',
    }));

    await supabase.from('fh_competitors').insert(competitors);
  }

  return new Response(JSON.stringify({ project: data }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
