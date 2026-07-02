/**
 * POST /api/webhook/whatsapp?token=INSTANCE_TOKEN
 *
 * UazapiGO (formato CRM: { BaseUrl, EventType, chat, message, owner, token })
 * entrega todos os eventos aqui. Eventos configurados por instância:
 *   - messages.upsert   → EventType "messages" / "messages_groups" (mensagem nova)
 *   - messages.update   → EventType com "update" (ACKs: entregue / lido)
 *   - connection.update → status da instância (connected / disconnected)
 * Formato legado { type, data } aceito como fallback.
 *
 * Pipeline de mensagem nova (per Protocolo Chat WPP):
 *   identificar instância → extrair campos → dedup por wa_message_id →
 *   find-or-create conversa → mídia: CDN → decrypt → Storage → insert
 *   az_messages → atualizar az_conversations.
 *
 * Pipeline de ACK (relatório de entrega dos disparos):
 *   wa_message_id → az_messages.status + az_campaign_recipients.status
 *   (upgrade-only: sent → delivered → read) → az_campaigns.delivered_count.
 */

import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';
import { detectContentType } from '../../../lib/whatsapp/decrypt';
import { downloadAndStoreMedia } from '../../../lib/whatsapp/media';

export const prerender = false;

type SB = ReturnType<typeof createServerClient>;

const ACK_RANK: Record<string, number> = { pending: 0, processing: 1, sent: 2, failed: 2, delivered: 3, read: 4 };

export const GET: APIRoute = async () =>
  new Response(JSON.stringify({ status: 'webhook active' }), {
    status: 200, headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request, url }) => {
  const token = url.searchParams.get('token');

  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return new Response('Bad JSON', { status: 400 });
  }

  const sb = createServerClient();

  // ── 1. Identifica a instância (query token; fallback: token no payload) ──
  const instToken = token || payload?.token || null;
  let instanceId: string | null = null;
  if (instToken) {
    const { data: inst } = await sb
      .from('az_whatsapp_instances')
      .select('id')
      .eq('token', instToken)
      .single();
    instanceId = inst?.id ?? null;
  }

  // ── 2. Roteia por tipo de evento ─────────────────────────────────────
  const eventType = String(payload?.EventType || payload?.event || '').toLowerCase();

  // Log persistente (vercel logs não retém runtime logs). AWAIT obrigatório:
  // o Vercel congela a função assim que a resposta sai.
  try {
    await sb.from('az_webhook_log').insert({
      event_type: eventType || '(sem EventType)',
      instance_id: instanceId,
      payload,
    });
    // Poda oportunista: mantém ~7 dias
    if (Math.random() < 0.01) {
      await sb.from('az_webhook_log')
        .delete()
        .lt('created_at', new Date(Date.now() - 7 * 86_400_000).toISOString());
    }
  } catch { /* log nunca derruba o webhook */ }

  if (eventType.includes('connection')) {
    return handleConnectionUpdate(sb, instanceId, payload);
  }
  if (eventType.includes('update')) {
    return handleMessageAck(sb, payload);
  }
  // "messages", "messages_groups", legado sem EventType → mensagem nova
  return handleNewMessage(sb, instanceId, payload);
};

// ─── Connection update → sincroniza status da instância ────────────────────
async function handleConnectionUpdate(sb: SB, instanceId: string | null, payload: any) {
  console.log('[webhook][connection]', JSON.stringify(payload).slice(0, 800));
  if (!instanceId) return ok();

  const src = payload?.instance ?? payload?.data ?? payload?.message ?? payload;
  const raw = String(src?.status ?? src?.state ?? src?.connection ?? '').toLowerCase();
  if (!raw) return ok();

  let status: string | null = null;
  if (raw.includes('open') || raw.includes('connected')) status = 'connected';
  else if (raw.includes('qr') || raw.includes('pair'))    status = 'waiting_qr';
  else if (raw.includes('clos') || raw.includes('disconnect') || raw.includes('logout') || raw.includes('logged')) status = 'disconnected';

  if (status) {
    await sb.from('az_whatsapp_instances').update({
      status,
      updated_at: new Date().toISOString(),
    }).eq('id', instanceId);
  }
  return ok();
}

// ─── ACK (messages.update) → relatório de entrega ──────────────────────────
function normalizeAck(v: any): 'sent' | 'delivered' | 'read' | null {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number') {
    if (v >= 4) return 'read';       // 4 READ / 5 PLAYED (Baileys)
    if (v === 3) return 'delivered'; // DELIVERY_ACK
    if (v === 2) return 'sent';      // SERVER_ACK
    return null;
  }
  const s = String(v).toLowerCase();
  if (s.includes('read') || s.includes('seen') || s.includes('played')) return 'read';
  if (s.includes('deliver')) return 'delivered';
  if (s.includes('sent') || s.includes('server')) return 'sent';
  return null;
}

async function handleMessageAck(sb: SB, payload: any) {
  // Log truncado: valida empiricamente o shape real via `vercel logs`
  console.log('[webhook][ack]', JSON.stringify(payload).slice(0, 1200));

  const src = payload?.message ?? payload?.data ?? payload;
  const items: any[] = Array.isArray(src) ? src : [src];

  for (const it of items) {
    if (!it) continue;
    const rawId = it.messageid || it.key?.id || it.id || '';
    // id pode vir como "555532251126:3EB0..." — o wa_message_id é a parte final
    const waId = String(rawId).includes(':') ? String(rawId).split(':').pop()! : String(rawId);
    const ack = normalizeAck(it.status ?? it.ack ?? it.update?.status ?? it.update?.ack);
    if (!waId || !ack) continue;

    await applyAck(sb, waId, ack);
  }
  return ok();
}

async function applyAck(sb: SB, waMessageId: string, ack: 'sent' | 'delivered' | 'read') {
  // az_messages (histórico)
  const { data: msg } = await sb
    .from('az_messages')
    .select('id, status')
    .eq('wa_message_id', waMessageId)
    .maybeSingle();

  if (msg && (ACK_RANK[ack] ?? 0) > (ACK_RANK[msg.status] ?? 0)) {
    await sb.from('az_messages').update({ status: ack }).eq('id', msg.id);
  }

  // az_campaign_recipients (relatório de entrega do disparo)
  const { data: recip } = await sb
    .from('az_campaign_recipients')
    .select('id, status, campaign_id')
    .eq('wa_message_id', waMessageId)
    .maybeSingle();

  if (!recip) return;
  if ((ACK_RANK[ack] ?? 0) <= (ACK_RANK[recip.status] ?? 0)) return;

  await sb.from('az_campaign_recipients').update({ status: ack }).eq('id', recip.id);

  if (recip.campaign_id) {
    const { count } = await sb
      .from('az_campaign_recipients')
      .select('id', { count: 'exact', head: true })
      .eq('campaign_id', recip.campaign_id)
      .in('status', ['delivered', 'read']);
    await sb.from('az_campaigns')
      .update({ delivered_count: count || 0 })
      .eq('id', recip.campaign_id);
  }
}

// ─── Mensagem nova (inbound) ────────────────────────────────────────────────
async function handleNewMessage(sb: SB, instanceId: string | null, payload: any) {
  // Formato CRM: payload.message; legado: payload.data ou o próprio payload
  const msg  = payload?.message ?? payload?.data ?? payload;
  const chat = payload?.chat ?? {};

  const fromMe: boolean   = msg?.fromMe ?? msg?.key?.fromMe ?? payload?.fromMe ?? false;
  const remoteJid: string = msg?.chatid ?? chat?.wa_chatid ?? msg?.key?.remoteJid ?? payload?.chatid ?? '';
  const pushName: string  = msg?.pushName ?? msg?.notify ?? chat?.name ?? payload?.pushName ?? '';
  const rawMsgId: string  = msg?.messageid ?? msg?.id ?? msg?.key?.id ?? payload?.messageid ?? '';
  const waMessageId: string = String(rawMsgId).includes(':')
    ? String(rawMsgId).split(':').pop()!
    : String(rawMsgId);

  const msgType: string   = msg?.type ?? msg?.messageType ?? 'text';   // 'text' | 'media' | 'chat'
  const mediaType: string = msg?.mediaType ?? '';                       // 'image'|'audio'|'ptt'|'video'|'document'|'sticker'
  const content: any      = msg?.content ?? {};
  const bodyText: string  = msg?.text ?? content?.text ?? msg?.body ?? msg?.caption ?? content?.caption ?? '';
  const cdnUrl: string    = content?.URL ?? content?.url ?? '';
  const mediaKey: string  = content?.mediaKey ?? '';
  const rawMime: string   = content?.mimetype ?? content?.mimeType ?? '';

  // Ignora outbound (já gravadas no envio) e JIDs vazios
  if (!remoteJid) return ok();
  if (fromMe) return ok();

  const isMedia = (msgType === 'media' || !!mediaType) && !!cdnUrl;
  const contentType = isMedia ? detectContentType(mediaType || msgType) : 'text';
  if (!isMedia && !bodyText) return ok();

  // Dedup por wa_message_id
  if (waMessageId) {
    const { data: existing } = await sb
      .from('az_messages')
      .select('id')
      .eq('wa_message_id', waMessageId)
      .maybeSingle();
    if (existing) return ok();
  }

  // Find-or-create conversa
  let conversation: any = null;
  const { data: existingConv } = await sb
    .from('az_conversations')
    .select('id, unread_count')
    .eq('remote_jid', remoteJid)
    .eq('instance_id', instanceId ?? '')
    .maybeSingle();

  if (existingConv) {
    conversation = existingConv;
  } else if (instanceId) {
    const { data: newConv } = await sb
      .from('az_conversations')
      .insert({
        instance_id: instanceId,
        remote_jid: remoteJid,
        remote_name: pushName || null,
        status: 'open',
        last_direction: 'inbound',
        unread_count: 0,
      })
      .select('id, unread_count')
      .single();
    conversation = newConv;
  }

  // Mídia: download CDN (expira!) → decrypt → Storage
  let mediaUrl: string | null = null;
  let finalMime: string | null = null;

  if (isMedia && cdnUrl) {
    const contactRef = conversation?.id ?? waMessageId;
    const msgRef = waMessageId || Date.now().toString();
    try {
      const result = await downloadAndStoreMedia(
        cdnUrl,
        mediaKey || null,
        rawMime || 'application/octet-stream',
        mediaType || msgType,
        contactRef,
        msgRef,
      );
      mediaUrl  = result.url;
      finalMime = result.mime;
    } catch (e: any) {
      console.error('[webhook] media pipeline error:', e.message);
      // Continua — salvar sem media_url é melhor que perder a mensagem
    }
  }

  const messageBody = isMedia ? (bodyText || mediaType || contentType) : bodyText;

  await sb.from('az_messages').insert({
    conversation_id: conversation?.id ?? null,
    instance_id: instanceId,
    remote_jid: remoteJid,
    phone: remoteJid.replace(/@.*$/, ''),
    direction: 'inbound',
    body: messageBody,
    content_type: contentType,
    media_url: mediaUrl,
    media_mime: finalMime,
    wa_message_id: waMessageId || null,
    status: 'received',
    sent_at: new Date().toISOString(),
    metadata: {
      push_name: pushName,
      media_type: mediaType,
      raw_mime: rawMime,
      event_type: payload?.EventType ?? null,
    },
  });

  if (conversation?.id) {
    await sb.from('az_conversations').update({
      last_message: isMedia ? `[${contentType}]` : messageBody,
      last_message_at: new Date().toISOString(),
      last_direction: 'inbound',
      remote_name: pushName || undefined,
      unread_count: (conversation.unread_count ?? 0) + 1,
      updated_at: new Date().toISOString(),
    }).eq('id', conversation.id);
  }

  return ok();
}

function ok() {
  return new Response('OK', { status: 200 });
}
