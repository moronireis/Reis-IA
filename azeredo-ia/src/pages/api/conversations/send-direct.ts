/**
 * POST /api/conversations/send-direct
 * Body: { instance_id, jid, text }
 * Sends a message directly via UazapiGO without requiring a stored conversation_id.
 */
import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

const UAZAPI_URL = import.meta.env.UAZAPI_URL || 'https://u4digital.uazapi.com';

export const POST: APIRoute = async ({ locals, request }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const { instance_id, jid, text } = await request.json();
  if (!instance_id || !jid || !text?.trim()) {
    return json({ error: 'instance_id, jid e text são obrigatórios' }, 400);
  }

  const sb = createServerClient();
  const { data: inst } = await sb
    .from('az_whatsapp_instances')
    .select('token, status, uazapi_name')
    .eq('id', instance_id)
    .single();

  if (!inst) return json({ error: 'Instance not found' }, 404);
  if (inst.status !== 'connected') return json({ error: 'Instance not connected' }, 400);

  try {
    const resp = await fetch(`${UAZAPI_URL}/send/text`, {
      method: 'POST',
      headers: { token: inst.token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: jid, text: text.trim() }),
    });

    const body = await resp.json();
    if (!resp.ok) return json({ error: 'Send failed', detail: body }, 502);

    return json({
      id:           body?.key?.id ?? body?.id ?? String(Date.now()),
      body:         text.trim(),
      content_type: 'text',
      media_url:    null,
      media_mime:   null,
      direction:    'outbound',
      sent_at:      new Date().toISOString(),
    }, 201);
  } catch (e: any) {
    return json({ error: e.message }, 500);
  }
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
