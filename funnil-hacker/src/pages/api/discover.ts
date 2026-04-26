import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { analyzeWithAI } from '../../lib/ai';

/**
 * POST /api/discover
 * Competitor Discovery: given a niche + keywords, find competitors.
 * Uses AI to generate search strategies and analyze results.
 * When Brave Search API key is available, uses web search too.
 */
export const POST: APIRoute = async ({ request }) => {
  const { projectId, niche, keywords, references } = await request.json();

  if (!projectId || !niche) {
    return new Response(JSON.stringify({ error: 'projectId and niche required' }), { status: 400 });
  }

  try {
    await supabase.from('fh_projects').update({ status: 'discovering' }).eq('id', projectId);

    const competitors: Array<{
      name: string;
      url: string | null;
      description: string;
      scaleEstimate: string;
    }> = [];

    // 1. Try Brave Search API if key available
    const braveKey = import.meta.env.BRAVE_SEARCH_API_KEY;
    if (braveKey) {
      const searchQueries = [
        `${niche} curso online`,
        `${niche} mentoria`,
        `${niche} infoproduto`,
        ...(keywords || []).map((k: string) => `${k} venda online`),
      ];

      for (const query of searchQueries.slice(0, 5)) {
        try {
          const res = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=10`, {
            headers: { 'X-Subscription-Token': braveKey, Accept: 'application/json' },
          });

          if (res.ok) {
            const data = await res.json();
            for (const result of data.web?.results || []) {
              const domain = new URL(result.url).hostname;
              if (!competitors.some((c) => c.url?.includes(domain))) {
                competitors.push({
                  name: result.title,
                  url: result.url,
                  description: result.description || '',
                  scaleEstimate: 'unknown',
                });
              }
            }
          }
        } catch {
          // Continue with other queries
        }
      }
    }

    // 2. Use AI to discover competitors based on niche knowledge
    try {
      const refsText = references?.length
        ? `\nConcorrentes de referencia ja conhecidos: ${references.join(', ')}`
        : '';

      const aiResult = await analyzeWithAI(
        `Voce e um especialista em inteligencia de mercado digital brasileiro.

Nicho: ${niche}
Keywords: ${(keywords || []).join(', ')}${refsText}

Liste entre 15 e 30 concorrentes reais e ativos nesse nicho no mercado brasileiro de infoprodutos/servicos digitais.

Para cada um, forneça:
- name: nome do negocio ou pessoa
- url: URL principal (se conhecida, senao null)
- description: breve descricao do que fazem
- scaleEstimate: "high" (muito escalado, muitos ads), "medium" (ativo), "low" (menor)

Responda SOMENTE com JSON array valido. Nao invente URLs — se nao tem certeza, coloque null.`,
        'You are a Brazilian digital market intelligence expert. Respond ONLY with a valid JSON array.'
      );

      const parsed = JSON.parse(aiResult);
      if (Array.isArray(parsed)) {
        for (const c of parsed) {
          if (c.name && !competitors.some((existing) => existing.name === c.name)) {
            competitors.push({
              name: c.name,
              url: c.url || null,
              description: c.description || '',
              scaleEstimate: c.scaleEstimate || 'unknown',
            });
          }
        }
      }
    } catch (aiErr) {
      console.warn('AI discovery skipped:', (aiErr as Error).message?.slice(0, 80));
    }

    // 3. Save competitors to DB
    if (competitors.length > 0) {
      const rows = competitors.map((c) => ({
        project_id: projectId,
        name: c.name,
        url: c.url,
        niche,
        scale_score: c.scaleEstimate === 'high' ? 8 : c.scaleEstimate === 'medium' ? 5 : 3,
        status: 'discovered',
        overview: { description: c.description, scaleEstimate: c.scaleEstimate },
      }));

      await supabase.from('fh_competitors').insert(rows);
    }

    // 4. Update project
    await supabase.from('fh_projects').update({
      status: 'complete',
      competitor_count: competitors.length,
      updated_at: new Date().toISOString(),
    }).eq('id', projectId);

    return new Response(JSON.stringify({
      success: true,
      competitorsFound: competitors.length,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Discovery error:', error);
    await supabase.from('fh_projects').update({ status: 'error' }).eq('id', projectId);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
