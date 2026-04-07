import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

/**
 * Batch update content_body for journey template nodes.
 * Admin only. Used to populate rich content (slides, markdown) into journey nodes.
 *
 * POST body: { updates: [{ node_id, content_body, content_url? }] }
 * Also propagates to existing student journey nodes that were cloned from these templates.
 */
export const POST: APIRoute = async ({ request, locals }) => {
  const profile = locals.profile;
  if (!profile?.id || profile.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const { updates } = await request.json();
  if (!Array.isArray(updates) || updates.length === 0) {
    return new Response(JSON.stringify({ error: 'updates array required' }), { status: 400 });
  }

  const supabase = createServerClient();
  let updated = 0;
  let propagated = 0;

  for (const u of updates) {
    if (!u.node_id) continue;

    const patch: Record<string, unknown> = {};
    if (u.content_body !== undefined) patch.content_body = u.content_body;
    if (u.content_url !== undefined) patch.content_url = u.content_url;
    if (u.description !== undefined) patch.description = u.description;

    if (Object.keys(patch).length === 0) continue;

    // Update template node
    const { error } = await supabase
      .from('journey_template_nodes')
      .update(patch)
      .eq('id', u.node_id);

    if (!error) {
      updated++;

      // Propagate to student nodes cloned from this template node
      const { count } = await supabase
        .from('student_journey_nodes')
        .update(patch)
        .eq('template_node_id', u.node_id);

      propagated += count || 0;
    }
  }

  return new Response(JSON.stringify({ updated, propagated }), { status: 200 });
};
