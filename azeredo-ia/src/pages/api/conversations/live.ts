/**
 * GET /api/conversations/live?instance_id=UUID|all[&base_only=1][&campaign_only=1][&campaign_id=UUID]
 * Fetches chat list live from UazapiGO. Uses POST /chat/find.
 *
 * M1 (backlog): base_only=1 mostra só chats cujo número está na base de
 * contatos; campaign_only=1 restringe a números que já receberam campanha.
 *
 * #1 (backlog GitHub 17/07): instance_id=all agrega os chats de TODAS as
 * instâncias conectadas (visão do operador/admin — Tati vê todos os
 * vendedores). No modo all a guia é sempre Campanha: campaign_only é forçado
 * no servidor. Cada chat carrega instance_id/instance_name para a UI enviar
 * mensagem pelo número certo.
 *
 * #3: cada chat expõe `image` (foto de perfil) quando o UazapiGO informa.
 */
import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';

// Variantes de um número BR para casar chat ↔ contato: com e sem o 9 do
// celular (bases antigas guardam sem o 9; o WhatsApp usa com o 9 — e vice-versa)
function phoneVariants(raw: string): string[] {
  const d = String(raw || '').replace(/\D/g, '').replace(/^0+/, '');
  if (!d) return [];
  const full = (d.length === 10 || d.length === 11) ? `55${d}` : d;
  const out = new Set<string>([full]);
  if (full.startsWith('55')) {
    if (full.length === 13 && full[4] === '9') out.add(full.slice(0, 4) + full.slice(5)); // remove o 9
    if (full.length === 12) out.add(full.slice(0, 4) + '9' + full.slice(4));              // adiciona o 9
  }
  return [...out];
}

export const prerender = false;

const UAZAPI_URL = import.meta.env.UAZAPI_URL || 'https://u4digital.uazapi.com';

interface InstRow { id: string; token: string; uazapi_name: string; display_name: string | null; phone_number: string | null; status: string; }

async function fetchChatsForInstance(inst: InstRow): Promise<any[]> {
  const resp = await fetch(`${UAZAPI_URL}/chat/find`, {
    method: 'POST',
    headers: { token: inst.token, 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
    signal: AbortSignal.timeout(12_000),
  });
  if (!resp.ok) throw new Error(`UazapiGO ${resp.status}`);
  const raw = await resp.json();
  const rawChats = Array.isArray(raw) ? raw : raw?.chats ?? raw?.data ?? [];

  return rawChats
    .filter((c: any) => {
      const jid = c.wa_chatid ?? c.jid ?? '';
      // Only include individual chats and groups (skip broadcast lists)
      return jid.includes('@s.whatsapp.net') || jid.includes('@g.us');
    })
    .map((c: any) => {
      const jid  = c.wa_chatid ?? c.jid ?? '';
      const name = c.name || c.wa_name || c.wa_contactName || c.phone || jid;
      const ts   = c.wa_lastMsgTimestamp ?? 0;
      // Timestamps can be ms or s depending on UazapiGO version
      const tsMs = ts > 1e12 ? ts : ts * 1000;

      return {
        jid,
        name,
        phone:           c.phone ?? null,
        image:           c.image ?? c.imagePreview ?? c.profilePicUrl ?? null, // #3: foto de perfil
        last_message:    null,
        last_message_at: ts ? new Date(tsMs).toISOString() : null,
        unread_count:    c.wa_unreadCount ?? 0,
        is_group:        c.wa_isGroup ?? jid.includes('@g.us'),
        last_direction:  null,
        instance_id:     inst.id,
        instance_name:   inst.display_name || inst.uazapi_name,
      };
    });
}

export const GET: APIRoute = async ({ locals, url }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const instance_id = url.searchParams.get('instance_id');
  if (!instance_id) return json({ error: 'instance_id required' }, 400);

  const sb = createServerClient();
  const allMode = instance_id === 'all';

  let insts: InstRow[] = [];
  if (allMode) {
    const { data } = await sb
      .from('az_whatsapp_instances')
      .select('id, token, uazapi_name, display_name, phone_number, status')
      .eq('status', 'connected')
      .is('deleted_at', null)
      .neq('is_active', false)
      .order('slot_number');
    insts = (data || []) as InstRow[];
    if (insts.length === 0) return json({ error: 'Nenhum número conectado' }, 400);
  } else {
    const { data: inst } = await sb
      .from('az_whatsapp_instances')
      .select('id, token, uazapi_name, display_name, phone_number, status')
      .eq('id', instance_id)
      .single();
    if (!inst) return json({ error: 'Instance not found' }, 404);
    if (inst.status !== 'connected') return json({ error: 'Instance not connected', status: inst.status }, 400);
    insts = [inst as InstRow];
  }

  try {
    // Busca os chats (em paralelo no modo all) — instância que falhar não
    // derruba a visão agregada
    const results = await Promise.allSettled(insts.map(i => fetchChatsForInstance(i)));
    let chats: any[] = [];
    const failed: string[] = [];
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') chats.push(...r.value);
      else failed.push(insts[i].display_name || insts[i].uazapi_name);
    });
    if (chats.length === 0 && failed.length > 0) {
      return json({ error: `UazapiGO indisponível (${failed.join(', ')})` }, 502);
    }

    // Sort by last message time desc
    chats.sort((a: any, b: any) => {
      if (!a.last_message_at) return 1;
      if (!b.last_message_at) return -1;
      return new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime();
    });

    // M1: filtros de pertinência (só contatos da base / só interação de campanha)
    let filtered = chats;
    const chatPhone = (jid: string) => jid.split('@')[0].replace(/\D/g, '');

    if (!allMode && url.searchParams.get('base_only') === '1') {
      const known = new Set<string>();
      const { data: contacts } = await sb.from('az_contacts').select('phone_primary, phones');
      for (const c of contacts || []) {
        for (const p of [c.phone_primary, ...((c.phones as string[]) || [])]) {
          if (p) phoneVariants(p).forEach(v => known.add(v));
        }
      }
      // #18: no número do vendedor os GRUPOS entram na guia Base — "sincronizar
      // conversas, grupos etc. do seu respectivo número"
      filtered = filtered.filter((c: any) => c.is_group || known.has(chatPhone(c.jid)));
    }

    // F5 (Checkpoint 10/07): conversas de campanha — filtra E amarra cada chat
    // ao disparo que o originou (campanha mais recente que atingiu o fone).
    // campaign_id=UUID restringe a uma campanha específica.
    // #1: no modo all (visão operador/admin) a guia Campanha é a única — força.
    const campaignId = url.searchParams.get('campaign_id') || '';
    if (allMode || url.searchParams.get('campaign_only') === '1' || campaignId) {
      let q = sb
        .from('az_messages')
        .select('phone, campaign_id, created_at, az_campaigns(name)')
        .eq('direction', 'outbound')
        .not('campaign_id', 'is', null)
        .order('created_at', { ascending: false })
        .limit(5000);
      if (campaignId) q = q.eq('campaign_id', campaignId);
      const { data: msgs } = await q;

      // fone → campanha mais recente (as linhas já vêm em ordem desc)
      const originByPhone = new Map<string, { id: string; name: string }>();
      for (const m of msgs || []) {
        const origin = { id: m.campaign_id as string, name: (m as any).az_campaigns?.name || 'Campanha' };
        for (const v of phoneVariants(m.phone)) {
          if (!originByPhone.has(v)) originByPhone.set(v, origin);
        }
      }
      filtered = filtered
        .filter((c: any) => !c.is_group && originByPhone.has(chatPhone(c.jid)))
        .map((c: any) => ({ ...c, campaign: originByPhone.get(chatPhone(c.jid)) }));
    }

    return json({
      chats: filtered,
      total_unfiltered: chats.length,
      failed_instances: failed,
      instance: allMode
        ? { id: 'all', display_name: 'Todos os números', phone_number: null }
        : { id: insts[0].id, display_name: insts[0].display_name, phone_number: insts[0].phone_number },
    });
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
