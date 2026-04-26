import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { scanUrl } from '../../lib/scanner';
import { lookupDomain, detectHostingProvider } from '../../lib/whois';
import { classifyPageType, analyzeCopy, generateInsights } from '../../lib/ai';

export const POST: APIRoute = async ({ request }) => {
  const { projectId, url } = await request.json();

  if (!projectId || !url) {
    return new Response(JSON.stringify({ error: 'projectId and url required' }), { status: 400 });
  }

  try {
    // Update project status
    await supabase.from('fh_projects').update({ status: 'analyzing' }).eq('id', projectId);

    // 1. Scan the URL
    const scan = await scanUrl(url);

    // 2. Upload screenshots to Supabase Storage (base64 data URLs for now)
    const desktopDataUrl = `data:image/png;base64,${scan.screenshotDesktop.toString('base64')}`;
    const mobileDataUrl = `data:image/png;base64,${scan.screenshotMobile.toString('base64')}`;

    // 3. Classify page type with AI (graceful fallback if API unavailable)
    let classification = { pageType: 'other', funnelStage: 'entrada', confidence: 0 };
    try {
      classification = await classifyPageType(scan.html, scan.finalUrl);
    } catch (aiErr) {
      console.warn('AI classification skipped:', (aiErr as Error).message?.slice(0, 80));
    }

    // 4. Analyze copy with AI (graceful fallback)
    let copyAnalysis = null;
    if (scan.textContent.length > 50) {
      try {
        copyAnalysis = await analyzeCopy(scan.textContent, scan.finalUrl);
      } catch (aiErr) {
        console.warn('AI copy analysis skipped:', (aiErr as Error).message?.slice(0, 80));
      }
    }

    // 5. Save page
    const { data: pageData } = await supabase.from('fh_pages').insert({
      project_id: projectId,
      url: scan.url,
      final_url: scan.finalUrl,
      title: scan.title,
      page_type: classification.pageType,
      funnel_stage: classification.funnelStage,
      screenshot_desktop: desktopDataUrl,
      screenshot_mobile: mobileDataUrl,
      html_snapshot: scan.html.slice(0, 50000),
      text_content: scan.textContent.slice(0, 10000),
      copy_analysis: copyAnalysis,
      tech_detected: scan.techStack,
      status_code: scan.statusCode,
      redirect_chain: scan.redirectChain,
    }).select().single();

    // 6. Save tech stack
    if (scan.techStack.length > 0) {
      const techRows = scan.techStack.map((t) => ({
        project_id: projectId,
        tech_name: t.name,
        tech_type: t.type,
        identifier: t.identifier,
        detected_on: pageData ? [pageData.id] : [],
      }));

      // Upsert — avoid duplicates
      for (const row of techRows) {
        const { data: existing } = await supabase
          .from('fh_techstack')
          .select('id')
          .eq('project_id', projectId)
          .eq('tech_name', row.tech_name)
          .single();

        if (!existing) {
          await supabase.from('fh_techstack').insert(row);
        }
      }
    }

    // 7. WHOIS lookup (graceful fallback)
    let whoisData: any = { domain: new URL(url).hostname, nameServers: [] };
    let hostingProvider: string | null = null;
    try {
      whoisData = await lookupDomain(url);
      hostingProvider = detectHostingProvider(whoisData.nameServers);
    } catch (whoisErr) {
      console.warn('WHOIS lookup skipped:', (whoisErr as Error).message?.slice(0, 80));
    }

    // Check if company intel already exists for this project
    const { data: existingIntel } = await supabase
      .from('fh_company_intel').select('id').eq('project_id', projectId).single();

    if (existingIntel) {
      await supabase.from('fh_company_intel').update({
        domain: whoisData.domain,
        whois_data: whoisData,
        company_name: whoisData.registrant,
        hosting_provider: hostingProvider,
      }).eq('id', existingIntel.id);
    } else {
      await supabase.from('fh_company_intel').insert({
        project_id: projectId,
        domain: whoisData.domain,
        whois_data: whoisData,
        company_name: whoisData.registrant,
        hosting_provider: hostingProvider,
      });
    }

    // 8. Generate AI insights (graceful fallback)
    try {
      const insightsData = await generateInsights({
        pages: [{
          url: scan.finalUrl,
          pageType: classification.pageType,
          copyAnalysis,
        }],
        techStack: scan.techStack,
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
    } catch (aiErr) {
      console.warn('AI insights skipped:', (aiErr as Error).message?.slice(0, 80));
    }

    // 9. Update project status
    await supabase.from('fh_projects').update({
      status: 'complete',
      updated_at: new Date().toISOString(),
    }).eq('id', projectId);

    return new Response(JSON.stringify({ success: true, pagesScanned: 1 }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Scan error:', error);

    await supabase.from('fh_projects').update({ status: 'error' }).eq('id', projectId);

    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
