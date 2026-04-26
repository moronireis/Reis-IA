import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  const [projectRes, pagesRes, companyRes, techRes, insightsRes, nodesRes, edgesRes, adsRes] = await Promise.all([
    supabase.from('fh_projects').select('*').eq('id', id).single(),
    supabase.from('fh_pages').select('*').eq('project_id', id).order('created_at'),
    supabase.from('fh_company_intel').select('*').eq('project_id', id).single(),
    supabase.from('fh_techstack').select('*').eq('project_id', id),
    supabase.from('fh_insights').select('*').eq('project_id', id).order('priority'),
    supabase.from('fh_funnel_nodes').select('*').eq('project_id', id),
    supabase.from('fh_funnel_edges').select('*').eq('project_id', id),
    supabase.from('fh_ads').select('*').eq('project_id', id).order('created_at'),
  ]);

  if (projectRes.error) {
    return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });
  }

  return new Response(JSON.stringify({
    project: projectRes.data,
    pages: pagesRes.data || [],
    company: companyRes.data || null,
    techStack: techRes.data || [],
    insights: insightsRes.data || [],
    funnelNodes: nodesRes.data || [],
    funnelEdges: edgesRes.data || [],
    ads: adsRes.data || [],
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
