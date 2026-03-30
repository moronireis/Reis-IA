import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const GET: APIRoute = async ({ url, locals }) => {
  const supabase = createServerClient();
  const userId = url.searchParams.get('user_id');
  const courseId = url.searchParams.get('course_id');

  if (!userId) {
    return new Response(JSON.stringify({ error: 'user_id required' }), { status: 400 });
  }

  let query = supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);

  if (courseId) {
    query = query.eq('course_id', courseId);
  }

  const { data, error } = await query;
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const supabase = createServerClient();
  const profile = locals.profile;

  if (!profile?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const body = await request.json();
  const { lesson_id, course_id } = body;

  if (!lesson_id || !course_id) {
    return new Response(JSON.stringify({ error: 'lesson_id and course_id required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: profile.id,
      lesson_id,
      course_id,
      completed: true,
      completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,lesson_id' })
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};
