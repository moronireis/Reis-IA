/**
 * POST /api/instances/test-delivery — #11: teste manual de entrega (canário).
 *
 * Envia uma mensagem de teste pelo número informado e acompanha o status no
 * UazapiGO até confirmar Delivered/Read. Serve para revalidar um número com
 * badge "Restrita" depois de reaquecer/reconectar/trocar o chip — na primeira
 * entrega confirmada o badge é limpo (mesma regra do canário automático).
 *
 * Body: { id: instância, phone: número de controle que VAI RECEBER o teste }
 * Admin e Operacional. Espera até ~40s pela confirmação (serverless 60s).
 */
import type { APIRoute } from 'astro';
import { requireRole } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';
import { normalizePhone } from '../../../lib/whatsapp/send';

export const prerender = false;

const UAZAPI_URL = (import.meta.env.UAZAPI_URL || 'https://u4digital.uazapi.com').trim();

export const POST: APIRoute = async ({ locals, request }) => {
  const profile = requireRole(locals as any, ['operacional']);
  if (profile instanceof Response) return profile;

  let body: any;
  try { body = await request.json(); } catch {
    return json({ error: 'JSON inválido' }, 400);
  }
  const { id, phone } = body || {};
  if (!id || !phone) return json({ error: 'id e phone são obrigatórios' }, 400);

  const sb = createServerClient();
  const { data: inst } = await sb
    .from('az_whatsapp_instances')
    .select('id, token, display_name, uazapi_name, restricted_at')
    .eq('id', id)
    .maybeSingle();
  if (!inst) return json({ error: 'Instância não encontrada' }, 404);

  const to = normalizePhone(String(phone));
  if (to.length < 12) return json({ error: 'Número de controle inválido — use DDD + número' }, 400);

  const stamp = new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' });
  const text = `Teste de entrega AZEREDO IA (${inst.display_name || inst.uazapi_name}) — ${stamp}. Pode ignorar esta mensagem.`;

  // Envia
  let messageid: string | null = null;
  try {
    const r = await fetch(`${UAZAPI_URL}/send/text`, {
      method: 'POST',
      headers: { token: inst.token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: to, text }),
      signal: AbortSignal.timeout(20_000),
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) return json({ error: `Envio recusado: ${d?.message || d?.error || `HTTP ${r.status}`}` }, 502);
    messageid = d?.messageid || null;
  } catch (e: any) {
    return json({ error: `Falha no envio: ${e?.message || 'timeout'}` }, 502);
  }

  // Acompanha até Delivered/Read (fix #2: /message/find só aceita `chatid`
  // minúsculo — chatId devolve a instância inteira)
  const chatid = `${to}@s.whatsapp.net`;
  const deadline = Date.now() + 40_000;
  let lastStatus = 'Sent';
  while (Date.now() < deadline) {
    await new Promise(res => setTimeout(res, 5_000));
    try {
      const r = await fetch(`${UAZAPI_URL}/message/find`, {
        method: 'POST',
        headers: { token: inst.token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatid, limit: 20 }),
        signal: AbortSignal.timeout(8_000),
      });
      const raw = await r.json();
      const msgs = Array.isArray(raw) ? raw : raw?.messages ?? raw?.data ?? [];
      const mine = messageid
        ? msgs.find((m: any) => (m.messageid ?? m.id ?? m.key?.id) === messageid)
        : msgs.filter((m: any) => m.fromMe ?? m.key?.fromMe).slice(-1)[0];
      const st = String(mine?.status ?? mine?.messageStatus ?? '').toLowerCase();
      if (st) lastStatus = st.charAt(0).toUpperCase() + st.slice(1);
      if (st === 'delivered' || st === 'read' || st === 'played') {
        // Entrega confirmada → limpa o badge Restrita (regra do canário)
        if (inst.restricted_at) {
          await sb.from('az_whatsapp_instances')
            .update({ restricted_at: null, restricted_reason: null, updated_at: new Date().toISOString() })
            .eq('id', inst.id);
        }
        return json({ ok: true, delivered: true, status: lastStatus, cleared_restriction: !!inst.restricted_at });
      }
    } catch { /* tenta de novo até o deadline */ }
  }

  return json({
    ok: true,
    delivered: false,
    status: lastStatus,
    note: 'O servidor aceitou o envio mas a entrega não foi confirmada em 40s — padrão de número restrito. Confira se o número de controle está com o WhatsApp aberto e tente de novo; persistindo, reaqueça ou troque o chip.',
  });
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
