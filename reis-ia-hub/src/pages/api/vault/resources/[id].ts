import type { APIRoute } from 'astro';
import { createServerClient } from '../../../../lib/supabase-server';

export const PATCH: APIRoute = async ({ params, request, locals }) => {
  const profile = locals.profile;
  if (profile?.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const supabase = createServerClient();
  const body = await request.json();

  // Handle download increment action
  if (body.action === 'download') {
    const { data: resource } = await supabase
      .from('vault_resources')
      .select('downloads')
      .eq('id', params.id)
      .single();

    const { data, error } = await supabase
      .from('vault_resources')
      .update({ downloads: (resource?.downloads ?? 0) + 1 })
      .eq('id', params.id)
      .select()
      .single();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }

  const { data, error } = await supabase
    .from('vault_resources')
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
    .from('vault_resources')
    .delete()
    .eq('id', params.id);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(null, { status: 204 });
};

export const POST: APIRoute = async ({ params, request, locals }) => {
  const supabase = createServerClient();
  const profile = locals.profile;

  if (!profile?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const body = await request.json();

  if (body.action === 'download') {
    const { data: resource } = await supabase
      .from('vault_resources')
      .select('downloads')
      .eq('id', params.id)
      .single();

    await supabase
      .from('vault_resources')
      .update({ downloads: (resource?.downloads ?? 0) + 1 })
      .eq('id', params.id);

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 });
};
