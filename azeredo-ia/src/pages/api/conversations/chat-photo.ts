/**
 * GET /api/conversations/chat-photo?instance_id=UUID&number=5551...
 * Foto de perfil do contato (#3, backlog GitHub 17/07) via POST /chat/details
 * do UazapiGO. Retorna { image } (URL) ou { image: null }.
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
  const number      = url.searchParams.get('number');
  if (!instance_id || !number) return json({ error: 'instance_id e number são obrigatórios' }, 400);

  const sb = createServerClient();
  const { data: inst } = await sb
    .from('az_whatsapp_instances')
    .select('token, status')
    .eq('id', instance_id)
    .single();
  if (!inst?.token) return json({ error: 'Instância não encontrada' }, 404);

  try {
    const resp = await fetch(`${UAZAPI_URL}/chat/details`, {
      method: 'POST',
      headers: { token: inst.token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ number, preview: true }),
      signal: AbortSignal.timeout(8_000),
    });
    const d = await resp.json().catch(() => ({}));
    const chat = d?.chat ?? d;
    const image = chat?.image ?? chat?.imagePreview ?? chat?.profilePicUrl ?? null;
    return new Response(JSON.stringify({ image, name: chat?.wa_name ?? chat?.name ?? null }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, max-age=3600' },
    });
  } catch {
    return json({ image: null });
  }
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
