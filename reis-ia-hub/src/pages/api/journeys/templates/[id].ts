import type { APIRoute } from 'astro';
import { createServerClient } from '../../../../lib/supabase-server';

export const prerender = false;

export const GET: APIRoute = async ({ params, locals }) => {
  const profile = locals.profile;
  if (!profile?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });

  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('journey_templates')
    .select(`
      *,
      phases:journey_template_phases(
        *,
        nodes:journey_template_nodes(*)
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  // Sort phases and nodes by sort_order
  if (data?.phases) {
    data.phases.sort((a: any, b: any) => a.sort_order - b.sort_order);
    data.phases.forEach((phase: any) => {
      if (phase.nodes) {
        phase.nodes.sort((a: any, b: any) => a.sort_order - b.sort_order);
      }
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
};

export const PATCH: APIRoute = async ({ params, request, locals }) => {
  const profile = locals.profile;
  if (!profile?.id || profile.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });

  const supabase = createServerClient();
  const body = await request.json();

  // Handle phase operations
  if (body.action === 'add_phase') {
    const { title, description, sort_order, unlock_rule, unlock_threshold, icon, color } = body;
    const { data, error } = await supabase
      .from('journey_template_phases')
      .insert({
        template_id: id,
        title: title || 'Nova Fase',
        description: description || null,
        sort_order: sort_order ?? 0,
        unlock_rule: unlock_rule || 'all_previous',
        unlock_threshold: unlock_threshold ?? 100,
        icon: icon || null,
        color: color || null,
      })
      .select()
      .single();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    // Update total_phases count
    const { count } = await supabase
      .from('journey_template_phases')
      .select('id', { count: 'exact', head: true })
      .eq('template_id', id);

    await supabase
      .from('journey_templates')
      .update({ total_phases: count || 0 })
      .eq('id', id);

    return new Response(JSON.stringify(data), { status: 201 });
  }

  if (body.action === 'update_phase') {
    const { phase_id, ...updates } = body;
    delete updates.action;
    if (!phase_id) return new Response(JSON.stringify({ error: 'phase_id required' }), { status: 400 });

    const { data, error } = await supabase
      .from('journey_template_phases')
      .update(updates)
      .eq('id', phase_id)
      .eq('template_id', id)
      .select()
      .single();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }

  if (body.action === 'delete_phase') {
    const { phase_id } = body;
    if (!phase_id) return new Response(JSON.stringify({ error: 'phase_id required' }), { status: 400 });

    const { error } = await supabase
      .from('journey_template_phases')
      .delete()
      .eq('id', phase_id)
      .eq('template_id', id);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    // Update total_phases count
    const { count } = await supabase
      .from('journey_template_phases')
      .select('id', { count: 'exact', head: true })
      .eq('template_id', id);

    await supabase
      .from('journey_templates')
      .update({ total_phases: count || 0 })
      .eq('id', id);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  // Handle node operations
  if (body.action === 'add_node') {
    const { phase_id, title, description, content_type, content_url, content_body, estimated_minutes, sort_order, is_required, xp_reward, icon } = body;
    if (!phase_id) return new Response(JSON.stringify({ error: 'phase_id required' }), { status: 400 });

    const validTypes = ['task', 'material', 'presentation', 'checkpoint', 'quiz'];
    const { data, error } = await supabase
      .from('journey_template_nodes')
      .insert({
        phase_id,
        title: title || 'Novo Item',
        description: description || null,
        content_type: validTypes.includes(content_type) ? content_type : 'task',
        content_url: content_url || null,
        content_body: content_body || null,
        estimated_minutes: estimated_minutes || null,
        sort_order: sort_order ?? 0,
        is_required: is_required !== false,
        xp_reward: xp_reward ?? 10,
        icon: icon || null,
      })
      .select()
      .single();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 201 });
  }

  if (body.action === 'update_node') {
    const { node_id, ...updates } = body;
    delete updates.action;
    if (!node_id) return new Response(JSON.stringify({ error: 'node_id required' }), { status: 400 });

    const { data, error } = await supabase
      .from('journey_template_nodes')
      .update(updates)
      .eq('id', node_id)
      .select()
      .single();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }

  if (body.action === 'delete_node') {
    const { node_id } = body;
    if (!node_id) return new Response(JSON.stringify({ error: 'node_id required' }), { status: 400 });

    const { error } = await supabase
      .from('journey_template_nodes')
      .delete()
      .eq('id', node_id);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  // Default: update template metadata
  const { title, description, program, status, estimated_weeks, thumbnail_url } = body;
  const updatePayload: Record<string, unknown> = {};
  if (title !== undefined) updatePayload.title = title;
  if (description !== undefined) updatePayload.description = description;
  if (program !== undefined) updatePayload.program = program;
  if (status !== undefined) updatePayload.status = status;
  if (estimated_weeks !== undefined) updatePayload.estimated_weeks = estimated_weeks;
  if (thumbnail_url !== undefined) updatePayload.thumbnail_url = thumbnail_url;

  const { data, error } = await supabase
    .from('journey_templates')
    .update(updatePayload)
    .eq('id', id)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const profile = locals.profile;
  if (!profile?.id || profile.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });

  const supabase = createServerClient();

  const { error } = await supabase
    .from('journey_templates')
    .delete()
    .eq('id', id);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
