import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const GET: APIRoute = async ({ url }) => {
  const lessonId = url.searchParams.get('lesson_id');
  if (!lessonId) {
    return new Response(JSON.stringify({ error: 'lesson_id required' }), { status: 400 });
  }

  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('comments')
    .select('*, author:profiles!comments_author_id_fkey(id, full_name, role)')
    .eq('post_id', lessonId)
    .order('created_at', { ascending: true });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data || []), { status: 200 });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const supabase = createServerClient();
  const profile = locals.profile;

  if (!profile?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const body = await request.json();
  const { lesson_id, content, parent_id } = body;

  if (!lesson_id || !content) {
    return new Response(JSON.stringify({ error: 'lesson_id and content required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('comments')
    .insert({
      post_id: lesson_id,
      author_id: profile.id,
      content,
      parent_id: parent_id || null,
    })
    .select('*, author:profiles!comments_author_id_fkey(id, full_name, role)')
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 201 });
};
