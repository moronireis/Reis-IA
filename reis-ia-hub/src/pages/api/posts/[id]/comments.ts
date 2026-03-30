import type { APIRoute } from 'astro';
import { createServerClient } from '../../../../lib/supabase-server';

export const GET: APIRoute = async ({ params }) => {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      author:profiles!comments_author_id_fkey(id, full_name, role)
    `)
    .eq('post_id', params.id)
    .order('created_at', { ascending: true });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};

export const POST: APIRoute = async ({ params, request, locals }) => {
  const supabase = createServerClient();
  const profile = locals.profile;

  if (!profile?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const body = await request.json();
  const { content, parent_id } = body;

  if (!content) {
    return new Response(JSON.stringify({ error: 'content required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('comments')
    .insert({
      post_id: params.id,
      author_id: profile.id,
      content,
      parent_id: parent_id || null,
    })
    .select(`
      *,
      author:profiles!comments_author_id_fkey(id, full_name, role)
    `)
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  // Increment comments_count on post
  const { data: post } = await supabase
    .from('posts')
    .select('comments_count')
    .eq('id', params.id)
    .single();

  if (post) {
    await supabase
      .from('posts')
      .update({ comments_count: (post.comments_count ?? 0) + 1 })
      .eq('id', params.id);
  }

  return new Response(JSON.stringify(data), { status: 201 });
};
