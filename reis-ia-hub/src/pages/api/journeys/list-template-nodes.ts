import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

/** Temporary debug endpoint to list template nodes for content population. */
export const GET: APIRoute = async ({ locals }) => {
  const profile = locals.profile;
  if (!profile?.id || profile.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const supabase = createServerClient();
  const { data: templates } = await supabase
    .from('journey_templates')
    .select(`
      id, title,
      phases:journey_template_phases(
        id, title, sort_order,
        nodes:journey_template_nodes(id, title, content_type, sort_order, content_body, content_url)
      )
    `)
    .order('created_at', { ascending: false });

  if (templates) {
    templates.forEach((t: any) => {
      t.phases?.sort((a: any, b: any) => a.sort_order - b.sort_order);
      t.phases?.forEach((p: any) => {
        p.nodes?.sort((a: any, b: any) => a.sort_order - b.sort_order);
        p.nodes?.forEach((n: any) => {
          n.has_content = !!n.content_body;
          n.content_preview = n.content_body?.substring(0, 80) || null;
          delete n.content_body;
        });
      });
    });
  }

  return new Response(JSON.stringify(templates, null, 2), { status: 200 });
};
