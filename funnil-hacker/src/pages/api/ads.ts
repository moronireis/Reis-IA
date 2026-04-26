import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { scrapeMetaAdLibrary } from '../../lib/adLibrary';
import { analyzeWithAI } from '../../lib/ai';

/**
 * POST /api/ads
 * Scrape Meta Ad Library for a given search term and save results.
 */
export const POST: APIRoute = async ({ request }) => {
  const { projectId, searchTerm, maxAds } = await request.json();

  if (!projectId || !searchTerm) {
    return new Response(JSON.stringify({ error: 'projectId and searchTerm required' }), { status: 400 });
  }

  try {
    // 1. Scrape Meta Ad Library
    const result = await scrapeMetaAdLibrary(searchTerm, { maxAds: maxAds || 15 });

    // 2. Optionally analyze hooks/patterns with AI
    let hookAnalysis: Record<string, string> = {};
    if (result.ads.length > 0) {
      const adCopies = result.ads
        .filter((a) => a.copyText.length > 30)
        .map((a, i) => `Ad ${i + 1}: "${a.copyText.slice(0, 300)}"`)
        .join('\n\n');

      if (adCopies.length > 50) {
        try {
          const aiResult = await analyzeWithAI(
            `Analyze these Meta ads from "${searchTerm}" and identify patterns.

${adCopies}

Respond ONLY with valid JSON:
{
  "dominantHookType": "curiosidade | dor | prova_social | urgencia | drama | medo | historia",
  "commonPattern": "brief description of the recurring creative formula",
  "bestAd": "which ad number is strongest and why (1 sentence)",
  "overallStrategy": "2 sentence summary of their ad strategy"
}`,
            'You are a Meta ads analyst. Respond ONLY with valid JSON in PT-BR.'
          );
          hookAnalysis = JSON.parse(aiResult);
        } catch {
          // AI analysis optional
        }
      }
    }

    // 3. Save ads to DB
    for (const ad of result.ads) {
      await supabase.from('fh_ads').insert({
        project_id: projectId,
        platform: 'meta',
        ad_id: ad.adId,
        creative_url: ad.creativeImageUrl || ad.screenshotDataUrl,
        video_url: ad.creativeVideoUrl,
        copy_text: ad.copyText,
        hook_type: hookAnalysis.dominantHookType || null,
        started_at: ad.startedAt || null,
        status: ad.status,
        ai_analysis: Object.keys(hookAnalysis).length > 0 ? hookAnalysis : null,
      });
    }

    // 4. Save pattern insight if we got AI analysis
    if (hookAnalysis.commonPattern) {
      await supabase.from('fh_insights').insert({
        project_id: projectId,
        category: 'intelligence',
        title: `Padrao de Ads: ${hookAnalysis.dominantHookType || 'Identificado'}`,
        content: `${hookAnalysis.commonPattern}. ${hookAnalysis.overallStrategy || ''}`.trim(),
        source: 'ai',
        priority: 'high',
      });
    }

    return new Response(JSON.stringify({
      success: true,
      adsFound: result.totalFound,
      hookAnalysis,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Ads scrape error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
