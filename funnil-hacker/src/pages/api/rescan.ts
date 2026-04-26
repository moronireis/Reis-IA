import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { scanUrl } from '../../lib/scanner';
import { detectTechStack } from '../../lib/techstack';

/**
 * POST /api/rescan
 * Re-scan a project's main URL and detect changes since last scan.
 */
export const POST: APIRoute = async ({ request }) => {
  const { projectId } = await request.json();

  if (!projectId) {
    return new Response(JSON.stringify({ error: 'projectId required' }), { status: 400 });
  }

  try {
    // Get project and its previous pages
    const { data: project } = await supabase
      .from('fh_projects').select('*').eq('id', projectId).single();

    if (!project?.target_url) {
      return new Response(JSON.stringify({ error: 'No target URL for this project' }), { status: 400 });
    }

    const { data: previousPages } = await supabase
      .from('fh_pages').select('url, title, page_type, tech_detected, text_content')
      .eq('project_id', projectId);

    const { data: previousTech } = await supabase
      .from('fh_techstack').select('tech_name, identifier')
      .eq('project_id', projectId);

    // Re-scan the main URL
    const scan = await scanUrl(project.target_url);

    // Compare changes
    const changes: Array<{ type: string; description: string }> = [];

    const prevMain = previousPages?.find((p) => p.url === project.target_url);

    if (prevMain) {
      // Title changed?
      if (prevMain.title !== scan.title) {
        changes.push({
          type: 'title_changed',
          description: `Titulo mudou: "${prevMain.title}" → "${scan.title}"`,
        });
      }

      // Tech stack changed?
      const prevTechNames = new Set((previousTech || []).map((t) => t.tech_name));
      const newTechNames = new Set(scan.techStack.map((t) => t.name));

      for (const tech of scan.techStack) {
        if (!prevTechNames.has(tech.name)) {
          changes.push({
            type: 'tech_added',
            description: `Nova tecnologia detectada: ${tech.name}${tech.identifier ? ` (${tech.identifier})` : ''}`,
          });
        }
      }

      for (const tech of previousTech || []) {
        if (!newTechNames.has(tech.tech_name)) {
          changes.push({
            type: 'tech_removed',
            description: `Tecnologia removida: ${tech.tech_name}`,
          });
        }
      }

      // Content length changed significantly (>20%)?
      const prevLen = prevMain.text_content?.length || 0;
      const newLen = scan.textContent.length;
      if (prevLen > 0 && Math.abs(newLen - prevLen) / prevLen > 0.2) {
        const direction = newLen > prevLen ? 'aumentou' : 'diminuiu';
        changes.push({
          type: 'content_changed',
          description: `Conteudo ${direction}: ${prevLen} → ${newLen} caracteres (${Math.round(((newLen - prevLen) / prevLen) * 100)}%)`,
        });
      }
    } else {
      changes.push({ type: 'first_scan', description: 'Primeira varredura — sem dados anteriores para comparar.' });
    }

    // Save changes as insights
    if (changes.length > 0) {
      await supabase.from('fh_insights').insert(
        changes.map((c) => ({
          project_id: projectId,
          category: 'intelligence',
          title: `Re-scan: ${c.type.replace(/_/g, ' ')}`,
          content: c.description,
          source: 'rescan',
          priority: c.type.includes('added') || c.type.includes('removed') ? 'high' : 'medium',
        }))
      );
    }

    // Update project timestamp
    await supabase.from('fh_projects').update({
      updated_at: new Date().toISOString(),
    }).eq('id', projectId);

    return new Response(JSON.stringify({
      success: true,
      changes,
      changesCount: changes.length,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Rescan error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
