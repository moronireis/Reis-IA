import type { APIRoute } from 'astro';
import { createServerClient } from '../../../../lib/supabase-server';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const profile = locals.profile;
  if (!profile?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const supabase = createServerClient();
  const isAdmin = profile.role === 'admin';

  let query = supabase
    .from('journey_templates')
    .select(`
      *,
      phases:journey_template_phases(
        *,
        nodes:journey_template_nodes(*)
      )
    `)
    .order('created_at', { ascending: false });

  if (!isAdmin) {
    query = query.eq('status', 'published');
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const profile = locals.profile;
  if (!profile?.id || profile.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const supabase = createServerClient();
  const body = await request.json();
  const { title, description, program, estimated_weeks } = body;

  if (!title) {
    return new Response(JSON.stringify({ error: 'title is required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('journey_templates')
    .insert({
      title,
      description: description || null,
      program: program || 'founders_beta',
      estimated_weeks: estimated_weeks || null,
    })
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 201 });
};
