/**
 * GET /api/conversations/live-messages?instance_id=UUID&jid=5551...@s.whatsapp.net&limit=50
 * Fetches messages live from UazapiGO for a specific chat.
 * Uses POST /message/find — the correct UazapiGO endpoint.
 */
import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

const UAZAPI_URL = import.meta.env.UAZAPI_URL || 'https://u4digital.uazapi.com';

export const GET: APIRoute = async ({ locals, url }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const instance_id = url.searchParams.get('instance_id');
  const jid         = url.searchParams.get('jid');
  const limit       = Math.min(100, parseInt(url.searchParams.get('limit') || '50'));

  if (!instance_id || !jid) return json({ error: 'instance_id and jid required' }, 400);

  const sb = createServerClient();
  const { data: inst } = await sb
    .from('az_whatsapp_instances')
    .select('token, status')
    .eq('id', instance_id)
    .single();

  if (!inst) return json({ error: 'Instance not found' }, 404);
  if (inst.status !== 'connected') return json({ error: 'Instance not connected' }, 400);

  try {
    // UazapiGO: POST /message/find — returns messages for a specific chat
    const resp = await fetch(`${UAZAPI_URL}/message/find`, {
      method: 'POST',
      headers: { token: inst.token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId: jid, count: limit }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return json({ error: `UazapiGO error: ${resp.status}`, detail: text.slice(0, 200) }, 502);
    }

    const raw = await resp.json();
    const msgs = Array.isArray(raw) ? raw : raw?.messages ?? raw?.data ?? [];

    const normalized = msgs.map((m: any) => {
      const fromMe      = m.fromMe ?? false;
      const body        = m.text ?? m.body ?? m.caption ?? '';
      const ts          = m.messageTimestamp ?? m.timestamp ?? 0;
      // Timestamps can be ms (13 digits) or s (10 digits)
      const tsMs        = ts > 1e12 ? ts : ts * 1000;
      const msgType     = m.messageType ?? m.type ?? 'ExtendedTextMessage';

      let content_type = 'text';
      if (msgType.toLowerCase().includes('image') || msgType.toLowerCase().includes('sticker')) {
        content_type = 'image';
      } else if (msgType.toLowerCase().includes('audio') || msgType.toLowerCase().includes('ptt')) {
        content_type = 'audio';
      } else if (msgType.toLowerCase().includes('video')) {
        content_type = 'video';
      } else if (msgType.toLowerCase().includes('document')) {
        content_type = 'document';
      }

      const media_url  = m.fileURL ?? m.content?.URL ?? m.content?.url ?? null;
      const mimetype   = m.content?.mimetype ?? null;

      return {
        id:           m.id ?? m.messageid ?? String(tsMs),
        body:         body || null,
        content_type,
        media_url,
        media_mime:   mimetype ? mimetype.split(';')[0].trim() : null,
        direction:    fromMe ? 'outbound' : 'inbound',
        sent_at:      ts ? new Date(tsMs).toISOString() : new Date().toISOString(),
        metadata:     { sender: m.senderName ?? null },
      };
    });

    // Sort ascending (oldest first)
    normalized.sort((a: any, b: any) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime());

    return json(normalized);
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
