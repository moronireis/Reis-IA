import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: import.meta.env.ANTHROPIC_API_KEY });

export async function analyzeWithAI(prompt: string, systemPrompt?: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: systemPrompt || 'You are an expert funnel analyst and competitive intelligence specialist. Respond in Portuguese (PT-BR). Be specific, data-driven, and actionable.',
    messages: [{ role: 'user', content: prompt }],
  });

  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

export async function classifyPageType(html: string, url: string): Promise<{
  pageType: string;
  funnelStage: string;
  confidence: number;
}> {
  const truncatedHtml = html.slice(0, 8000);
  const result = await analyzeWithAI(
    `Analyze this page and classify it.

URL: ${url}
HTML (truncated): ${truncatedHtml}

Respond ONLY with valid JSON:
{
  "pageType": "landing" | "sales" | "checkout" | "thankyou" | "upsell" | "downsell" | "webinar" | "optin" | "video_series" | "blog" | "other",
  "funnelStage": "entrada" | "core" | "upsell" | "ascensao" | "backend",
  "confidence": 0.0-1.0
}`,
    'You are a funnel classification engine. Respond ONLY with valid JSON, no explanations.'
  );

  try {
    return JSON.parse(result);
  } catch {
    return { pageType: 'other', funnelStage: 'entrada', confidence: 0 };
  }
}

export async function analyzeCopy(text: string, url: string): Promise<{
  hookType: string;
  framework: string;
  headlineScore: number;
  ctaAnalysis: string;
  swipeWorthy: string[];
  patterns: string[];
  pricingStrategy: string;
  summary: string;
}> {
  const result = await analyzeWithAI(
    `Analyze the copy/text from this funnel page.

URL: ${url}
Copy text:
${text.slice(0, 6000)}

Respond ONLY with valid JSON:
{
  "hookType": "curiosidade | dor | prova_social | urgencia | drama | medo | ganancia | historia",
  "framework": "Hormozi | PAS | AIDA | Story-based | Direct | Hybrid",
  "headlineScore": 1-10,
  "ctaAnalysis": "brief analysis of CTAs found",
  "swipeWorthy": ["best copy snippets worth saving"],
  "patterns": ["recurring patterns identified"],
  "pricingStrategy": "how price is presented: anchoring, installments, guarantees",
  "summary": "2-3 sentence strategic summary in PT-BR"
}`,
    'You are a direct-response copywriter and funnel analyst. Respond ONLY with valid JSON in PT-BR.'
  );

  try {
    return JSON.parse(result);
  } catch {
    return {
      hookType: 'unknown',
      framework: 'unknown',
      headlineScore: 0,
      ctaAnalysis: '',
      swipeWorthy: [],
      patterns: [],
      pricingStrategy: '',
      summary: 'Analysis failed',
    };
  }
}

export async function generateInsights(projectData: {
  pages: Array<{ url: string; pageType: string; copyAnalysis?: any }>;
  techStack: Array<{ techName: string; techType: string }>;
  companyIntel?: any;
}): Promise<Array<{
  category: string;
  title: string;
  content: string;
  priority: string;
}>> {
  const result = await analyzeWithAI(
    `Based on the following funnel data, generate strategic insights.

Pages found: ${JSON.stringify(projectData.pages.map(p => ({ url: p.url, type: p.pageType })))}
Tech stack: ${JSON.stringify(projectData.techStack)}
Company: ${JSON.stringify(projectData.companyIntel || 'unknown')}

Generate insights in 3 categories. Respond ONLY with valid JSON array:
[
  {
    "category": "intelligence" | "opportunity" | "breach",
    "title": "short title in PT-BR",
    "content": "detailed insight in PT-BR (2-4 sentences)",
    "priority": "high" | "medium" | "low"
  }
]

- intelligence: what makes this funnel smart/mature
- opportunity: where they're leaving money on the table
- breach: how to outperform this competitor`,
    'You are a strategic funnel consultant. Respond ONLY with valid JSON array in PT-BR.'
  );

  try {
    return JSON.parse(result);
  } catch {
    return [];
  }
}
