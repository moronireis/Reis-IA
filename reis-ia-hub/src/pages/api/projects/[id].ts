import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';
import { requireAuth, requireAdmin } from '../../../lib/api-auth';

export const GET: APIRoute = async ({ params, locals }) => {
  const profile = requireAuth(locals);
  if (profile instanceof Response) return profile;

  const supabase = createServerClient();

  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single();

  if (projectError || !project) {
    return new Response(JSON.stringify({ error: 'Projeto nao encontrado' }), { status: 404 });
  }

  const { data: phases } = await supabase
    .from('project_phases')
    .select('*')
    .eq('project_id', params.id)
    .order('sort_order', { ascending: true });

  const { data: clientActions } = await supabase
    .from('client_actions')
    .select('*')
    .eq('project_id', params.id)
    .order('created_at', { ascending: true });

  return new Response(JSON.stringify({
    ...project,
    phases: phases || [],
    clientActions: clientActions || [],
  }), { status: 200 });
};

export const PATCH: APIRoute = async ({ params, request, locals }) => {
  const auth = requireAdmin(locals);
  if (auth instanceof Response) return auth;

  const supabase = createServerClient();
  const body = await request.json();
  const { data, error } = await supabase
    .from('projects')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', params.id)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const auth = requireAdmin(locals);
  if (auth instanceof Response) return auth;

  const supabase = createServerClient();
  const { error } = await supabase.from('projects').delete().eq('id', params.id);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(null, { status: 204 });
};
