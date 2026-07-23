/**
 * GET/PUT /api/bot/ai-config — #9: IA conversacional de primeiro atendimento.
 * Substitui o chatbot de menu (#7, removido a pedido do Tiago em 22/07).
 *
 * Guarda em az_settings key 'ai_config':
 *   { prompt, knowledge, handoff_hours, model }
 * Prompt e base de conhecimento são UNIVERSAIS (valem para todos os números);
 * o liga/desliga é por número (bot_enabled em az_whatsapp_instances).
 * Leitura: qualquer logado. Escrita: admin.
 *
 * GET ?probe=1 (admin): valida a chave OpenAI com uma completion mínima —
 * usado no smoke test sem tocar em conversas reais.
 */
import type { APIRoute } from 'astro';
import { requireAuth, requireAdmin } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

export const AI_MODELS = ['gpt-4o-mini', 'gpt-4o'];

export const GET: APIRoute = async ({ locals, url }) => {
  if (url.searchParams.get('probe') === '1') {
    const profile = requireAdmin(locals as any);
    if (profile instanceof Response) return profile;
    const apiKey = (import.meta.env.OPENAI_API_KEY || '').trim();
    if (!apiKey) return json({ ok: false, error: 'OPENAI_API_KEY não configurada' }, 500);
    try {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_tokens: 5,
          messages: [{ role: 'user', content: 'Responda apenas: ok' }],
        }),
        signal: AbortSignal.timeout(20_000),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) return json({ ok: false, error: `OpenAI HTTP ${r.status}: ${d?.error?.message || ''}` }, 502);
      return json({ ok: true, reply: d?.choices?.[0]?.message?.content || '' });
    } catch (e: any) {
      return json({ ok: false, error: e?.message || 'timeout' }, 502);
    }
  }

  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const sb = createServerClient();
  const { data } = await sb.from('az_settings').select('value').eq('key', 'ai_config').maybeSingle();
  return json({ config: data?.value || null });
};

export const PUT: APIRoute = async ({ locals, request }) => {
  const profile = requireAdmin(locals as any);
  if (profile instanceof Response) return profile;

  let body: any;
  try { body = await request.json(); } catch {
    return json({ error: 'JSON inválido' }, 400);
  }

  const prompt    = String(body.prompt || '').trim().slice(0, 4000);
  const knowledge = String(body.knowledge || '').trim().slice(0, 24000);
  const handoff_hours = Math.min(72, Math.max(1, Number(body.handoff_hours) || 24));
  const model = AI_MODELS.includes(body.model) ? body.model : 'gpt-4o-mini';

  if (!prompt) return json({ error: 'O prompt de comportamento é obrigatório' }, 400);

  const sb = createServerClient();
  const { error } = await sb.from('az_settings').upsert({
    key: 'ai_config',
    value: { prompt, knowledge, handoff_hours, model } as any,
    updated_at: new Date().toISOString(),
  });
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true, config: { prompt, knowledge, handoff_hours, model } });
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
