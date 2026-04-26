import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { crawlFunnel } from '../../lib/crawler';
import { lookupDomain, detectHostingProvider } from '../../lib/whois';
import { classifyPageType, analyzeCopy, generateInsights } from '../../lib/ai';

/**
 * POST /api/crawl
 * Full funnel crawl: discovers all pages, classifies them, analyzes copy, maps the funnel.
 */
export const POST: APIRoute = async ({ request }) => {
  const { projectId, url, maxPages } = await request.json();

  if (!projectId || !url) {
    return new Response(JSON.stringify({ error: 'projectId and url required' }), { status: 400 });
  }

  try {
    // Update project status
    await supabase.from('fh_projects').update({ status: 'analyzing' }).eq('id', projectId);

    // 1. Crawl the funnel
    const crawlResult = await crawlFunnel(url, { maxPages: maxPages || 15 });

    // 2. WHOIS lookup (once for the domain)
    const whoisData = await lookupDomain(url);
    const hostingProvider = detectHostingProvider(whoisData.nameServers);

    await supabase.from('fh_company_intel').upsert({
      project_id: projectId,
      domain: whoisData.domain,
      whois_data: whoisData,
      company_name: whoisData.registrant,
      hosting_provider: hostingProvider,
    }, { onConflict: 'project_id' });

    // 3. Process each crawled page
    const pageRecords: Array<{ id: string; url: string; title: string; pageType: string; techCount: number }> = [];
    const allTechNames = new Set<string>();
    const allCopyAnalyses: any[] = [];

    for (const page of crawlResult.pages) {
      // Screenshots as base64 data URLs
      const desktopDataUrl = page.screenshotDesktop.length > 0
        ? `data:image/png;base64,${page.screenshotDesktop.toString('base64')}`
        : null;
      const mobileDataUrl = page.screenshotMobile.length > 0
        ? `data:image/png;base64,${page.screenshotMobile.toString('base64')}`
        : null;

      // AI classification
      const classification = await classifyPageType(page.html, page.finalUrl);

      // AI copy analysis (only for pages with substantial text)
      let copyAnalysis = null;
      if (page.textContent.length > 100) {
        try {
          copyAnalysis = await analyzeCopy(page.textContent, page.finalUrl);
          allCopyAnalyses.push({ url: page.finalUrl, ...copyAnalysis });
        } catch {
          // Non-critical, continue
        }
      }

      // Save page to DB
      const { data: pageData } = await supabase.from('fh_pages').insert({
        project_id: projectId,
        url: page.url,
        final_url: page.finalUrl,
        title: page.title,
        page_type: classification.pageType,
        funnel_stage: classification.funnelStage,
        screenshot_desktop: desktopDataUrl,
        screenshot_mobile: mobileDataUrl,
        html_snapshot: page.html.slice(0, 50000),
        text_content: page.textContent.slice(0, 10000),
        copy_analysis: copyAnalysis,
        tech_detected: page.techStack,
        status_code: page.statusCode,
        redirect_chain: page.redirectChain,
      }).select().single();

      if (pageData) {
        pageRecords.push({
          id: pageData.id,
          url: page.finalUrl,
          title: page.title,
          pageType: classification.pageType,
          techCount: page.techStack.length,
        });
      }

      // Save tech stack (deduplicated)
      for (const tech of page.techStack) {
        const key = `${tech.name}::${tech.identifier || ''}`;
        if (!allTechNames.has(key)) {
          allTechNames.add(key);
          await supabase.from('fh_techstack').insert({
            project_id: projectId,
            tech_name: tech.name,
            tech_type: tech.type,
            identifier: tech.identifier,
            detected_on: pageData ? [pageData.id] : [],
          });
        }
      }
    }

    // 4. Create funnel nodes and edges
    for (const record of pageRecords) {
      await supabase.from('fh_funnel_nodes').insert({
        project_id: projectId,
        page_id: record.id,
        label: record.title || new URL(record.url).pathname,
        node_type: record.pageType || 'other',
        position_x: 0,
        position_y: 0,
        metadata: { url: record.url, techCount: record.techCount },
      });
    }

    // Fetch the created nodes to get their IDs for edge creation
    const { data: dbNodes } = await supabase
      .from('fh_funnel_nodes')
      .select('id, page_id, metadata')
      .eq('project_id', projectId);

    if (dbNodes) {
      const nodeByUrl = new Map<string, string>();
      for (const node of dbNodes) {
        const url = (node.metadata as any)?.url;
        if (url) nodeByUrl.set(url, node.id);
      }

      for (const edge of crawlResult.edges) {
        const fromNodeId = nodeByUrl.get(edge.from);
        const toNodeId = nodeByUrl.get(edge.to);
        if (fromNodeId && toNodeId && fromNodeId !== toNodeId) {
          await supabase.from('fh_funnel_edges').insert({
            project_id: projectId,
            from_node: fromNodeId,
            to_node: toNodeId,
            label: edge.label,
            edge_type: edge.type,
          });
        }
      }
    }

    // 5. Generate cross-page AI insights
    const { data: allTech } = await supabase
      .from('fh_techstack')
      .select('tech_name, tech_type')
      .eq('project_id', projectId);

    const insightsData = await generateInsights({
      pages: pageRecords.map((p) => ({
        url: p.url,
        pageType: p.pageType,
        copyAnalysis: allCopyAnalyses.find((c) => c.url === p.url),
      })),
      techStack: (allTech || []).map((t) => ({ name: t.tech_name, type: t.tech_type })),
      companyIntel: whoisData,
    });

    if (insightsData.length > 0) {
      await supabase.from('fh_insights').insert(
        insightsData.map((i) => ({
          project_id: projectId,
          category: i.category,
          title: i.title,
          content: i.content,
          source: 'ai',
          priority: i.priority,
        }))
      );
    }

    // 6. Update project status
    await supabase.from('fh_projects').update({
      status: 'complete',
      competitor_count: pageRecords.length,
      updated_at: new Date().toISOString(),
    }).eq('id', projectId);

    return new Response(JSON.stringify({
      success: true,
      pagesScanned: pageRecords.length,
      edgesFound: crawlResult.edges.length,
      crawlTime: crawlResult.totalTime,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Crawl error:', error);
    await supabase.from('fh_projects').update({ status: 'error' }).eq('id', projectId);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
