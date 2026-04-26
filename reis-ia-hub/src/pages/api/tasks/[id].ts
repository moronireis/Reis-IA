import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';
import { requireAdmin } from '../../../lib/api-auth';

export const PATCH: APIRoute = async ({ params, request, locals }) => {
  const auth = requireAdmin(locals);
  if (auth instanceof Response) return auth;

  const supabase = createServerClient();
  const body = await request.json();

  // Base columns (always exist in schema)
  const baseFields = ['title', 'description', 'status', 'priority', 'assignee_id', 'assignee_name', 'project_id', 'project_name', 'due_date'];
  // Extended columns (may not exist yet — added via migration)
  const extFields = ['category', 'tags', 'notes', 'due_time'];

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const key of [...baseFields, ...extFields]) {
    if (key in body) {
      patch[key] = body[key];
    }
  }

  // When status changes to done, stamp completed_at
  if (body.status === 'done') {
    patch.completed_at = new Date().toISOString();
  } else if (body.status && body.status !== 'done') {
    patch.completed_at = null;
  }

  // Try full update first
  let { data, error } = await supabase
    .from('tasks')
    .update(patch)
    .eq('id', params.id)
    .select()
    .single();

  // If it fails (possibly due to missing columns), retry with base fields only
  if (error) {
    const basePatch: Record<string, unknown> = { updated_at: new Date().toISOString() };
    for (const key of baseFields) {
      if (key in body) {
        basePatch[key] = body[key];
      }
    }
    if (body.status === 'done') {
      basePatch.completed_at = new Date().toISOString();
    } else if (body.status && body.status !== 'done') {
      basePatch.completed_at = null;
    }

    const retry = await supabase
      .from('tasks')
      .update(basePatch)
      .eq('id', params.id)
      .select()
      .single();

    if (retry.error) {
      return new Response(JSON.stringify({ error: retry.error.message }), { status: 500 });
    }
    data = retry.data;
  }

  return new Response(JSON.stringify(data), { status: 200 });
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const auth = requireAdmin(locals);
  if (auth instanceof Response) return auth;

  const supabase = createServerClient();
  const { error } = await supabase.from('tasks').delete().eq('id', params.id);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(null, { status: 204 });
};
