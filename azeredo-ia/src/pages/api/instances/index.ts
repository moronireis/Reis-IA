import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

// GET /api/instances[?live=1]
// live=1: consulta o status real de cada instância no UazapiGO em paralelo e
// sincroniza no banco antes de responder (o status do banco fica podre — já
// houve instância "connected" com sessão morta).
export const GET: APIRoute = async ({ locals, url }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const sb = createServerClient();
  const { data, error } = await sb
    .from('az_whatsapp_instances')
    .select('*')
    .order('slot_number');

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  if (url.searchParams.get('live') === '1' && data?.length) {
    const UAZAPI_URL = (import.meta.env.UAZAPI_URL || 'https://u4digital.uazapi.com').trim();

    await Promise.allSettled(data.map(async (inst: any) => {
      try {
        const resp = await fetch(`${UAZAPI_URL}/instance/status`, {
          headers: { token: inst.token },
          signal: AbortSignal.timeout(8_000),
        });
        const body = await resp.json();
        const live = body?.instance ?? body;
        const status = live?.status === 'connected' ? 'connected' : 'disconnected';
        const phone = live?.phoneNumber ?? live?.phone ?? (live?.owner || '').split('@')[0] ?? null;

        inst.status = status;
        if (phone) inst.phone_number = phone;

        await sb.from('az_whatsapp_instances').update({
          status,
          phone_number: phone || inst.phone_number,
          updated_at: new Date().toISOString(),
        }).eq('id', inst.id);
      } catch {
        // Sem resposta do UazapiGO: mantém o valor do banco
      }
    }));
  }

  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
};

export const PATCH: APIRoute = async ({ locals, request }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;
  if ((profile as any).role !== 'admin')
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });

  const sb = createServerClient();
  const { id, display_name } = await request.json();
  if (!id) return new Response(JSON.stringify({ error: 'id required' }), { status: 400 });

  const { data, error } = await sb
    .from('az_whatsapp_instances')
    .update({ display_name, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
};
