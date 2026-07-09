import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

/**
 * POST /api/media/upload — multipart/form-data { file }
 * Sobe imagem/vídeo para o bucket público az-media (criado na migração v3)
 * e devolve { url, media_type, mime }. Usado por templates e campanhas (M2).
 *
 * Limites do WhatsApp: imagem ~5MB, vídeo ~16MB (o UazapiGO baixa da URL e
 * reenvia — arquivos acima disso falham no envio, então barramos aqui).
 */

const IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/webp'];
const VIDEO_MIMES = ['video/mp4', 'video/quicktime'];
const MAX_IMAGE = 5 * 1024 * 1024;
const MAX_VIDEO = 16 * 1024 * 1024;

const EXT: Record<string, string> = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp',
  'video/mp4': 'mp4', 'video/quicktime': 'mov',
};

export const POST: APIRoute = async ({ request, locals }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  let form: FormData;
  try { form = await request.formData(); } catch {
    return json({ error: 'Envie multipart/form-data com o campo "file"' }, 400);
  }

  const file = form.get('file');
  if (!(file instanceof File)) return json({ error: 'Campo "file" ausente' }, 400);

  const mime = file.type;
  const isImage = IMAGE_MIMES.includes(mime);
  const isVideo = VIDEO_MIMES.includes(mime);
  if (!isImage && !isVideo) {
    return json({ error: 'Formato não suportado — use JPG, PNG, WebP (imagem) ou MP4, MOV (vídeo)' }, 400);
  }
  if (isImage && file.size > MAX_IMAGE) return json({ error: 'Imagem acima de 5MB — o WhatsApp não aceita' }, 400);
  if (isVideo && file.size > MAX_VIDEO) return json({ error: 'Vídeo acima de 16MB — o WhatsApp não aceita' }, 400);

  const sb = createServerClient();
  const path = `campanhas/${crypto.randomUUID()}.${EXT[mime]}`;
  const buf = await file.arrayBuffer();

  const { error } = await sb.storage.from('az-media').upload(path, buf, {
    contentType: mime,
    upsert: false,
  });
  if (error) return json({ error: `Falha no upload: ${error.message}` }, 500);

  const { data: pub } = sb.storage.from('az-media').getPublicUrl(path);

  return json({
    url: pub.publicUrl,
    media_type: isImage ? 'image' : 'video',
    mime,
    size: file.size,
  });
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
