import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const PATCH: APIRoute = async ({ params, request, locals }) => {
  const supabase = createServerClient();
  const profile = locals.profile;

  if (!profile?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  // Check ownership or admin
  const { data: post } = await supabase
    .from('posts')
    .select('author_id')
    .eq('id', params.id)
    .single();

  if (!post) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }

  if (post.author_id !== profile.id && profile.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const body = await request.json();
  const { data, error } = await supabase
    .from('posts')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', params.id)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const supabase = createServerClient();
  const profile = locals.profile;

  if (!profile?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  // Check ownership or admin
  const { data: post } = await supabase
    .from('posts')
    .select('author_id')
    .eq('id', params.id)
    .single();

  if (!post) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }

  if (post.author_id !== profile.id && profile.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', params.id);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(null, { status: 204 });
};
