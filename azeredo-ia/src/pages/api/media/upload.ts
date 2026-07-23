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
// #3 (backlog GitHub 17/07): anexos do chat — áudio gravado e documento
const AUDIO_MIMES = ['audio/webm', 'audio/ogg', 'audio/mp4', 'audio/mpeg', 'audio/m4a', 'audio/aac', 'audio/wav'];
const DOC_MIMES   = ['application/pdf'];
const MAX_IMAGE = 5 * 1024 * 1024;
const MAX_VIDEO = 16 * 1024 * 1024;
const MAX_AUDIO = 16 * 1024 * 1024;
const MAX_DOC   = 10 * 1024 * 1024;

const EXT: Record<string, string> = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp',
  'video/mp4': 'mp4', 'video/quicktime': 'mov',
  'audio/webm': 'webm', 'audio/ogg': 'ogg', 'audio/mp4': 'm4a',
  'audio/mpeg': 'mp3', 'audio/m4a': 'm4a', 'audio/aac': 'aac', 'audio/wav': 'wav',
  'application/pdf': 'pdf',
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

  // MIME pode vir com codec params (MediaRecorder: "audio/webm;codecs=opus")
  const mime = (file.type || '').split(';')[0].trim();
  const isImage = IMAGE_MIMES.includes(mime);
  const isVideo = VIDEO_MIMES.includes(mime);
  const isAudio = AUDIO_MIMES.includes(mime);
  const isDoc   = DOC_MIMES.includes(mime);
  if (!isImage && !isVideo && !isAudio && !isDoc) {
    return json({ error: 'Formato não suportado — imagem (JPG/PNG/WebP), vídeo (MP4/MOV), áudio ou PDF' }, 400);
  }
  if (isImage && file.size > MAX_IMAGE) return json({ error: 'Imagem acima de 5MB — o WhatsApp não aceita' }, 400);
  if (isVideo && file.size > MAX_VIDEO) return json({ error: 'Vídeo acima de 16MB — o WhatsApp não aceita' }, 400);
  if (isAudio && file.size > MAX_AUDIO) return json({ error: 'Áudio acima de 16MB' }, 400);
  if (isDoc && file.size > MAX_DOC)     return json({ error: 'PDF acima de 10MB' }, 400);

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
    media_type: isImage ? 'image' : isVideo ? 'video' : isAudio ? 'audio' : 'document',
    mime,
    size: file.size,
    name: file.name || null,
  });
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
