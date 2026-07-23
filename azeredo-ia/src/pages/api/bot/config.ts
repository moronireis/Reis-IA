/**
 * GET/PUT /api/bot/config — configuração do Chatbot de 1º atendimento (#7).
 * Guarda em az_settings key 'bot_config': { greeting, options[{label,reply}],
 * handoff_hours }. Leitura: qualquer logado. Escrita: admin.
 */
import type { APIRoute } from 'astro';
import { requireAuth, requireAdmin } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const sb = createServerClient();
  const { data } = await sb.from('az_settings').select('value').eq('key', 'bot_config').maybeSingle();
  return json({ config: data?.value || null });
};

export const PUT: APIRoute = async ({ locals, request }) => {
  const profile = requireAdmin(locals as any);
  if (profile instanceof Response) return profile;

  let body: any;
  try { body = await request.json(); } catch {
    return json({ error: 'JSON inválido' }, 400);
  }

  const greeting = String(body.greeting || '').trim();
  const options = (Array.isArray(body.options) ? body.options : [])
    .map((o: any) => ({ label: String(o.label || '').trim().slice(0, 60), reply: String(o.reply || '').trim().slice(0, 1000) }))
    .filter((o: any) => o.label && o.reply)
    .slice(0, 6);
  const handoff_hours = Math.min(72, Math.max(1, Number(body.handoff_hours) || 24));

  if (!greeting) return json({ error: 'A saudação é obrigatória' }, 400);
  if (options.length === 0) return json({ error: 'Configure pelo menos 1 opção do menu' }, 400);

  const sb = createServerClient();
  const { error } = await sb.from('az_settings').upsert({
    key: 'bot_config',
    value: { greeting, options, handoff_hours } as any,
    updated_at: new Date().toISOString(),
  });
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true, config: { greeting, options, handoff_hours } });
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
