import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const profile = locals.profile;
  if (!profile?.id || profile.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const supabase = createServerClient();
  const body = await request.json();
  const { template_id, student_id, mentorship_id } = body;

  if (!template_id || !student_id) {
    return new Response(JSON.stringify({ error: 'template_id and student_id are required' }), { status: 400 });
  }

  const { data, error } = await supabase.rpc('assign_journey_to_student', {
    p_template_id: template_id,
    p_student_id: student_id,
    p_mentorship_id: mentorship_id || null,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ journey_id: data }), { status: 201 });
};
