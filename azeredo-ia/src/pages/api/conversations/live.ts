/**
 * GET /api/conversations/live?instance_id=UUID[&base_only=1][&campaign_only=1]
 * Fetches chat list live from UazapiGO for a specific connected instance.
 * Uses POST /chat/find — the correct UazapiGO endpoint for listing chats.
 *
 * M1 (backlog): base_only=1 mostra só chats cujo número está na base de
 * contatos; campaign_only=1 restringe a números que já receberam campanha.
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

export const GET: APIRoute = async ({ locals, url }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const instance_id = url.searchParams.get('instance_id');
  if (!instance_id) return json({ error: 'instance_id required' }, 400);

  const sb = createServerClient();
  const { data: inst } = await sb
    .from('az_whatsapp_instances')
    .select('id, token, uazapi_name, display_name, phone_number, status')
    .eq('id', instance_id)
    .single();

  if (!inst) return json({ error: 'Instance not found' }, 404);
  if (inst.status !== 'connected') return json({ error: 'Instance not connected', status: inst.status }, 400);

  try {
    // UazapiGO: POST /chat/find — returns all chats with pagination
    const resp = await fetch(`${UAZAPI_URL}/chat/find`, {
      method: 'POST',
      headers: { token: inst.token, 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return json({ error: `UazapiGO error: ${resp.status}`, detail: text.slice(0, 200) }, 502);
    }

    const raw = await resp.json();
    const rawChats = Array.isArray(raw) ? raw : raw?.chats ?? raw?.data ?? [];

    // Normalize to consistent shape
    const chats = rawChats
      .filter((c: any) => {
        const jid = c.wa_chatid ?? c.jid ?? '';
        // Only include individual chats and groups (skip broadcast lists)
        return jid.includes('@s.whatsapp.net') || jid.includes('@g.us');
      })
      .map((c: any) => {
        const jid     = c.wa_chatid ?? c.jid ?? '';
        const name    = c.name || c.wa_name || c.wa_contactName || c.phone || jid;
        const ts      = c.wa_lastMsgTimestamp ?? 0;
        // Timestamps can be ms or s depending on UazapiGO version
        const tsMs    = ts > 1e12 ? ts : ts * 1000;

        return {
          jid,
          name,
          phone:           c.phone ?? null,
          last_message:    null,
          last_message_at: ts ? new Date(tsMs).toISOString() : null,
          unread_count:    c.wa_unreadCount ?? 0,
          is_group:        c.wa_isGroup ?? jid.includes('@g.us'),
          last_direction:  null,
        };
      });

    // Sort by last message time desc
    chats.sort((a: any, b: any) => {
      if (!a.last_message_at) return 1;
      if (!b.last_message_at) return -1;
      return new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime();
    });

    // M1: filtros de pertinência (só contatos da base / só interação de campanha)
    let filtered = chats;
    const chatPhone = (jid: string) => jid.split('@')[0].replace(/\D/g, '');

    if (url.searchParams.get('base_only') === '1') {
      const known = new Set<string>();
      const { data: contacts } = await sb.from('az_contacts').select('phone_primary, phones');
      for (const c of contacts || []) {
        for (const p of [c.phone_primary, ...((c.phones as string[]) || [])]) {
          if (p) phoneVariants(p).forEach(v => known.add(v));
        }
      }
      filtered = filtered.filter((c: any) => !c.is_group && known.has(chatPhone(c.jid)));
    }

    if (url.searchParams.get('campaign_only') === '1') {
      const { data: msgs } = await sb
        .from('az_messages')
        .select('phone')
        .eq('direction', 'outbound')
        .not('campaign_id', 'is', null);
      const campaignPhones = new Set<string>();
      for (const m of msgs || []) phoneVariants(m.phone).forEach(v => campaignPhones.add(v));
      filtered = filtered.filter((c: any) => !c.is_group && campaignPhones.has(chatPhone(c.jid)));
    }

    return json({ chats: filtered, total_unfiltered: chats.length, instance: { id: inst.id, display_name: inst.display_name, phone_number: inst.phone_number } });
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
