/**
 * POST /api/conversations/send-direct
 * Body: { instance_id, jid, text?, media_url?, media_type?, doc_name? }
 * Sends a message directly via UazapiGO without requiring a stored conversation_id.
 *
 * #3 (backlog GitHub 17/07): além de texto, envia mídia pelo chat —
 *   media_type: image | video | document | audio | ptt (áudio gravado = ptt,
 *   chega como mensagem de voz). media_url deve ser URL pública (bucket
 *   az-media via /api/media/upload) — o UazapiGO baixa e reenvia.
 */
import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

const UAZAPI_URL = import.meta.env.UAZAPI_URL || 'https://u4digital.uazapi.com';
const MEDIA_TYPES = ['image', 'video', 'document', 'audio', 'ptt'] as const;

export const POST: APIRoute = async ({ locals, request }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const { instance_id, jid, text, media_url, media_type, doc_name } = await request.json();
  const hasMedia = !!media_url && MEDIA_TYPES.includes(media_type);
  if (!instance_id || !jid || (!text?.trim() && !hasMedia)) {
    return json({ error: 'instance_id, jid e text (ou mídia) são obrigatórios' }, 400);
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
    let resp: Response;
    if (hasMedia) {
      resp = await fetch(`${UAZAPI_URL}/send/media`, {
        method: 'POST',
        headers: { token: inst.token, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: jid,
          type: media_type,
          file: media_url,
          text: text?.trim() || undefined,
          docName: media_type === 'document' ? (doc_name || 'documento.pdf') : undefined,
        }),
        signal: AbortSignal.timeout(45_000),
      });
    } else {
      resp = await fetch(`${UAZAPI_URL}/send/text`, {
        method: 'POST',
        headers: { token: inst.token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: jid, text: text.trim() }),
        signal: AbortSignal.timeout(15_000),
      });
    }

    const body = await resp.json();
    if (!resp.ok) return json({ error: 'Send failed', detail: body }, 502);

    return json({
      id:           body?.key?.id ?? body?.id ?? body?.messageid ?? String(Date.now()),
      body:         text?.trim() || null,
      content_type: hasMedia ? (media_type === 'ptt' ? 'audio' : media_type) : 'text',
      media_url:    hasMedia ? media_url : null,
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
