/**
 * GET /api/conversations/live-media?instance_id=UUID&id=MSGID&type=image|audio|video|document|sticker
 *
 * Proxy de mídia do chat live (#3, backlog GitHub 17/07). A mídia do WhatsApp
 * fica num CDN criptografado (AES-256-CBC) com URL que expira — não dá para
 * usar direto no <img>/<audio>. Este endpoint:
 *   1. Cache: se já baixamos essa mensagem, redireciona ao bucket az-media.
 *   2. Busca a mensagem no UazapiGO (POST /message/find { id }) para obter
 *      content.URL + mediaKey + mimetype FRESCOS.
 *   3. Baixa, decripta (lib whatsapp/media já usada pelo webhook) e sobe no
 *      bucket público az-media em live/{msgid}.{ext}.
 *   4. Redireciona (302) para a URL pública.
 */
import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';
import { downloadAndStoreMedia } from '../../../lib/whatsapp/media';

export const prerender = false;

const UAZAPI_URL = import.meta.env.UAZAPI_URL || 'https://u4digital.uazapi.com';
const BUCKET = 'az-media';

export const GET: APIRoute = async ({ locals, url, redirect }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const instance_id = url.searchParams.get('instance_id');
  const msgId       = url.searchParams.get('id');
  const type        = url.searchParams.get('type') || 'image';
  if (!instance_id || !msgId) return json({ error: 'instance_id e id são obrigatórios' }, 400);

  const sb = createServerClient();

  // 1. Cache no bucket — o nome do arquivo é determinístico por mensagem
  const safeId = msgId.replace(/[^A-Za-z0-9_-]/g, '_');
  const { data: cached } = await sb.storage.from(BUCKET).list('live', { search: safeId, limit: 1 });
  if (cached && cached.length > 0) {
    const { data: pub } = sb.storage.from(BUCKET).getPublicUrl(`live/${cached[0].name}`);
    if (pub?.publicUrl) return redirect(pub.publicUrl, 302);
  }

  // 2. Token da instância
  const { data: inst } = await sb
    .from('az_whatsapp_instances')
    .select('token, status')
    .eq('id', instance_id)
    .single();
  if (!inst?.token) return json({ error: 'Instância não encontrada' }, 404);

  try {
    // 3. Busca a mensagem para obter URL do CDN + mediaKey frescos
    const resp = await fetch(`${UAZAPI_URL}/message/find`, {
      method: 'POST',
      headers: { token: inst.token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: msgId }),
      signal: AbortSignal.timeout(10_000),
    });
    const raw = await resp.json().catch(() => null);
    const list = Array.isArray(raw) ? raw : raw?.messages ?? raw?.data ?? [];
    const m = list.find((x: any) => (x.messageid ?? x.id) === msgId) || list[0];
    if (!m) return json({ error: 'Mensagem não encontrada no UazapiGO' }, 404);

    const cdnUrl   = m.fileURL ?? m.content?.URL ?? m.content?.url ?? null;
    const mediaKey = m.content?.mediaKey ?? m.mediaKey ?? null;
    const rawMime  = m.content?.mimetype ?? m.mimetype
      ?? (type === 'audio' ? 'audio/ogg' : type === 'video' ? 'video/mp4' : type === 'document' ? 'application/octet-stream' : 'image/jpeg');
    if (!cdnUrl) return json({ error: 'Mensagem sem URL de mídia' }, 404);

    const mediaType = String(m.mediaType || type).toLowerCase();

    // 4. Baixa + decripta + sobe no bucket (pasta live/, cacheado p/ sempre)
    const { url: publicUrl } = await downloadAndStoreMedia(
      cdnUrl, mediaKey, rawMime, mediaType, 'live', safeId
    );

    return redirect(publicUrl, 302);
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
