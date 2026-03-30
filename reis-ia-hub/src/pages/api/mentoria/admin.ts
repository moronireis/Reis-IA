import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const profile = locals.profile;
  if (profile?.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('mentorships')
    .select(`
      *,
      mentor:profiles!mentorships_mentor_id_fkey(id, full_name, avatar_url, role),
      mentee:profiles!mentorships_mentee_id_fkey(id, full_name, avatar_url, role, company)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const profile = locals.profile;
  if (profile?.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const body = await request.json();
  const { mentee_id, mentor_id, program, goals, start_date } = body;

  if (!mentee_id || !mentor_id) {
    return new Response(JSON.stringify({ error: 'mentee_id and mentor_id are required' }), { status: 400 });
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('mentorships')
    .insert({
      mentee_id,
      mentor_id,
      program: program || 'Builders',
      goals: goals || null,
      start_date: start_date || new Date().toISOString().split('T')[0],
      status: 'active',
    })
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 201 });
};
