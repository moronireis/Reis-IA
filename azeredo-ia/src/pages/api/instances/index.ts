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
    .is('deleted_at', null)
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
        // #14: foto/nome de perfil persistidos — antes só viviam em memória e
        // sumiam ao sair e voltar da tela
        const profileName = live?.profileName ?? null;
        const profilePic  = live?.profilePicUrl ?? null;

        inst.status = status;
        if (phone) inst.phone_number = phone;
        if (profileName) inst.profile_name = profileName;
        if (profilePic) inst.profile_pic_url = profilePic;

        await sb.from('az_whatsapp_instances').update({
          status,
          phone_number: phone || inst.phone_number,
          profile_name: profileName || undefined,
          profile_pic_url: profilePic || undefined,
          updated_at: new Date().toISOString(),
        }).eq('id', inst.id);
      } catch {
        // Sem resposta do UazapiGO: mantém o valor do banco
      }
    }));
  }

  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
};

// POST /api/instances — cria uma instância nova no UazapiGO e registra no
// banco (#5, backlog GitHub 17/07: novos números Gabriela/Simone).
// Admin only. Body: { name, display_name? }. A instância nasce desconectada —
// conectar via QR no fluxo normal de Configurações.
export const POST: APIRoute = async ({ locals, request }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;
  if ((profile as any).role !== 'admin')
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });

  let body: any;
  try { body = await request.json(); } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido' }), { status: 400 });
  }
  const name = String(body.name || '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
  if (!name) return new Response(JSON.stringify({ error: 'Informe o nome da instância (ex.: azeredo-10)' }), { status: 400 });

  const UAZAPI_URL = (import.meta.env.UAZAPI_URL || 'https://u4digital.uazapi.com').trim();
  // O admintoken do servidor é uma credencial própria (rotacionada em 07/2026 —
  // o valor antigo de UAZAPI_TOKEN era o token da instância "azeredo-ia" e
  // deixou de valer como admin). Fallback mantém compatibilidade local.
  const ADMIN_TOKEN = (import.meta.env.UAZAPI_ADMIN_TOKEN || import.meta.env.UAZAPI_TOKEN || '').trim();
  if (!ADMIN_TOKEN) return new Response(JSON.stringify({ error: 'UAZAPI_ADMIN_TOKEN não configurado' }), { status: 500 });

  const sb = createServerClient();

  // Nome não pode colidir com instância já registrada
  const { data: existing } = await sb
    .from('az_whatsapp_instances')
    .select('id')
    .eq('uazapi_name', name)
    .maybeSingle();
  if (existing) return new Response(JSON.stringify({ error: `Já existe uma instância "${name}"` }), { status: 409 });

  try {
    const resp = await fetch(`${UAZAPI_URL}/instance/create`, {
      method: 'POST',
      headers: { admintoken: ADMIN_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
      signal: AbortSignal.timeout(20_000),
    });
    const d = await resp.json().catch(() => ({}));
    const token = d?.token || d?.instance?.token;
    if (!resp.ok || !token) {
      return new Response(JSON.stringify({
        error: `UazapiGO recusou a criação (${resp.status}): ${d?.message || d?.error || 'sem detalhe'} — confira o limite de instâncias do servidor com a u4digital`,
      }), { status: 502 });
    }

    const { data: slotRow } = await sb
      .from('az_whatsapp_instances')
      .select('slot_number')
      .order('slot_number', { ascending: false })
      .limit(1)
      .maybeSingle();
    const slot = (slotRow?.slot_number || 0) + 1;

    const { data: created, error } = await sb
      .from('az_whatsapp_instances')
      .insert({
        uazapi_name: name,
        display_name: body.display_name?.trim() || null,
        token,
        slot_number: slot,
        status: 'disconnected',
        is_active: true,
      })
      .select()
      .single();
    if (error) return new Response(JSON.stringify({ error: `Instância criada no UazapiGO mas falhou ao registrar no banco: ${error.message}` }), { status: 500 });

    return new Response(JSON.stringify(created), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

export const PATCH: APIRoute = async ({ locals, request }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;
  if ((profile as any).role !== 'admin')
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });

  const sb = createServerClient();
  const body = await request.json();
  const { id } = body;
  if (!id) return new Response(JSON.stringify({ error: 'id required' }), { status: 400 });

  // M1: owner_profile_id vincula a instância ao vendedor (conversas filtradas)
  // F1: vendedor_nome casa com az_contacts.vendedor_principal (disparo dividido)
  // #7: bot_enabled liga o chatbot de 1º atendimento neste número
  const updates: Record<string, any> = { updated_at: new Date().toISOString() };
  if (body.display_name !== undefined)     updates.display_name = body.display_name;
  if (body.owner_profile_id !== undefined) updates.owner_profile_id = body.owner_profile_id || null;
  if (body.vendedor_nome !== undefined)    updates.vendedor_nome = body.vendedor_nome || null;
  if (body.bot_enabled !== undefined)      updates.bot_enabled = !!body.bot_enabled;
  // #15: desativar/reativar — número desativado some do wizard e das listas,
  // mas mantém sessão e histórico (diferente de Remover)
  if (body.is_active !== undefined)        updates.is_active = !!body.is_active;

  const { data, error } = await sb
    .from('az_whatsapp_instances')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
};

// DELETE /api/instances — #15: remove o número de vez (admin only).
// Apaga a instância no servidor UazapiGO (quando ainda existir lá) e faz
// remoção LÓGICA no banco (deleted_at) — campanhas e mensagens antigas seguem
// referenciando a linha. Body: { id }.
export const DELETE: APIRoute = async ({ locals, request }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;
  if ((profile as any).role !== 'admin')
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });

  let body: any;
  try { body = await request.json(); } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido' }), { status: 400 });
  }
  const { id } = body || {};
  if (!id) return new Response(JSON.stringify({ error: 'id required' }), { status: 400 });

  const sb = createServerClient();
  const { data: inst } = await sb
    .from('az_whatsapp_instances')
    .select('id, uazapi_name, token, deleted_at')
    .eq('id', id)
    .maybeSingle();
  if (!inst) return new Response(JSON.stringify({ error: 'Instância não encontrada' }), { status: 404 });

  const UAZAPI_URL = (import.meta.env.UAZAPI_URL || 'https://u4digital.uazapi.com').trim();
  let serverRemoved = false;
  let serverNote = '';
  try {
    // Confere se a instância ainda existe no servidor antes de tentar apagar
    const st = await fetch(`${UAZAPI_URL}/instance/status`, {
      headers: { token: inst.token },
      signal: AbortSignal.timeout(8_000),
    });
    if (st.status === 401 || st.status === 404) {
      serverRemoved = true; // já não existe no servidor (órfã)
      serverNote = 'instância já não existia no servidor';
    } else {
      const del = await fetch(`${UAZAPI_URL}/instance`, {
        method: 'DELETE',
        headers: { token: inst.token },
        signal: AbortSignal.timeout(15_000),
      });
      if (del.ok) { serverRemoved = true; serverNote = 'apagada no servidor UazapiGO'; }
      else {
        const d = await del.json().catch(() => ({}));
        serverNote = `servidor recusou (${del.status}): ${d?.message || d?.error || 'sem detalhe'}`;
      }
    }
  } catch (e: any) {
    serverNote = `sem resposta do servidor (${e?.message || 'timeout'})`;
  }

  if (!serverRemoved) {
    return new Response(JSON.stringify({ error: `Não foi possível remover no UazapiGO — ${serverNote}. Nada foi alterado.` }), { status: 502 });
  }

  const { error } = await sb
    .from('az_whatsapp_instances')
    .update({ deleted_at: new Date().toISOString(), is_active: false, status: 'disconnected', bot_enabled: false, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify({ ok: true, note: serverNote }), { headers: { 'Content-Type': 'application/json' } });
};
