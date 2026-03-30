import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const GET: APIRoute = async ({ params, locals }) => {
  const supabase = createServerClient();
  const profile = locals.profile;
  const isAdmin = profile?.role === 'admin';

  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('id', params.id)
    .single();

  if (courseError) return new Response(JSON.stringify({ error: courseError.message }), { status: 404 });

  // Non-admins can only see published courses
  if (!isAdmin && course.status !== 'published') {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }

  let lessonsQuery = supabase
    .from('lessons')
    .select('*')
    .eq('course_id', params.id)
    .order('sort_order', { ascending: true });

  if (!isAdmin) {
    lessonsQuery = lessonsQuery.eq('status', 'published');
  }

  const { data: lessons, error: lessonsError } = await lessonsQuery;
  if (lessonsError) return new Response(JSON.stringify({ error: lessonsError.message }), { status: 500 });

  return new Response(JSON.stringify({ ...course, lessons: lessons || [] }), { status: 200 });
};

export const PATCH: APIRoute = async ({ params, request, locals }) => {
  const profile = locals.profile;
  if (profile?.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const supabase = createServerClient();
  const body = await request.json();
  const { data, error } = await supabase
    .from('courses')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', params.id)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const profile = locals.profile;
  if (profile?.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const supabase = createServerClient();
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', params.id);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(null, { status: 204 });
};
