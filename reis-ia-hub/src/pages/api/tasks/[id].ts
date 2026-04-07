import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const PATCH: APIRoute = async ({ params, request }) => {
  const supabase = createServerClient();
  const body = await request.json();

  const patch: Record<string, unknown> = {
    ...body,
    updated_at: new Date().toISOString(),
  };

  // When status changes to done, stamp completed_at
  if (body.status === 'done' && !body.completed_at) {
    patch.completed_at = new Date().toISOString();
  }

  // When status changes away from done, clear completed_at
  if (body.status && body.status !== 'done' && body.completed_at === undefined) {
    patch.completed_at = null;
  }

  const { data, error } = await supabase
    .from('tasks')
    .update(patch)
    .eq('id', params.id)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};

export const DELETE: APIRoute = async ({ params }) => {
  const supabase = createServerClient();
  const { error } = await supabase.from('tasks').delete().eq('id', params.id);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(null, { status: 204 });
};
