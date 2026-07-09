/**
 * WhatsApp/ChatGuru Unified Handler — Vercel Serverless Function
 *
 * GET  /api/whatsapp?action=chats   → list conversations (from rhf_messages, fed by the ChatGuru webhook)
 * POST /api/whatsapp?action=send    → { phone, text } send a text message via ChatGuru
 *
 * Note (2026-07-08): the ChatGuru s18 API has NO read actions (chat_list /
 * chat_read / chat_info all return "ação inválida" — confirmed by probe).
 * Conversations are therefore built exclusively from the local rhf_messages
 * table, populated by /api/webhook/chatguru. The old chat UI (chat.html) was
 * removed with the Conversas module; this endpoint remains for the CV send
 * modal and for Fase 2 (resumo → grupo).
 */

import { select, insert } from '../lib/supabase.js';
import { sendMessage as chatguruSend } from '../lib/chatguru.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query.action;

  if (action === 'chats' && req.method === 'GET') return handleChats(req, res);
  if (action === 'send' && req.method === 'POST') return handleSend(req, res);

  return res.status(400).json({ error: 'Use action=chats (GET) | send (POST)' });
}

// ─── Chats (from rhf_messages) ───────────────────────────────────────────────

async function handleChats(req, res) {
  const agentId = req.query.agent_id || null;

  try {
    const messages = await select(
      'rhf_messages',
      'order=created_at.desc&limit=2000&select=phone,direction,content,message_type,created_at,raw_webhook,sent_by_user_id'
    );
    if (!Array.isArray(messages)) return res.status(200).json({ status: 'ok', count: 0, data: [] });

    const candidates = await select('candidates', 'select=phone,name&limit=500');
    const nameMap = {};
    if (Array.isArray(candidates)) candidates.forEach(c => { if (c.phone && c.name) nameMap[c.phone] = c.name; });

    const chatMap = {};
    messages.forEach(msg => {
      const phone = msg.phone;
      if (!phone) return;
      if (agentId && msg.sent_by_user_id && msg.sent_by_user_id !== agentId) return;

      let contactName = null;
      if (msg.raw_webhook && typeof msg.raw_webhook === 'object') contactName = msg.raw_webhook.contact_name;
      if (!contactName) contactName = nameMap[phone];
      if (!contactName) contactName = phone;

      if (!chatMap[phone]) {
        const raw = msg.raw_webhook || {};
        chatMap[phone] = {
          id: phone, phone, name: contactName,
          lastMessage: msg.content || '', lastMessageTimestamp: msg.created_at,
          direction: msg.direction, unreadCount: 0, isGroup: false, messageCount: 0,
          status: raw.status ?? raw.chat_status ?? null,
          processo: raw.processo ?? raw.process ?? raw.custom_fields?.processo ?? null,
          tags: raw.tags ?? raw.labels ?? [],
          agentId: raw.agent_id ?? null,
        };
      }
      chatMap[phone].messageCount++;
      if (msg.direction === 'inbound') chatMap[phone].unreadCount++;
      if (contactName && contactName !== phone && chatMap[phone].name === phone) chatMap[phone].name = contactName;
    });

    const chats = Object.values(chatMap);
    chats.sort((a, b) => new Date(b.lastMessageTimestamp || 0) - new Date(a.lastMessageTimestamp || 0));
    return res.status(200).json({ status: 'ok', source: 'supabase', count: chats.length, data: chats });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

// ─── Send ────────────────────────────────────────────────────────────────────

async function handleSend(req, res) {
  const { phone, text, user_id } = req.body || {};
  if (!phone || !text) return res.status(400).json({ status: 'error', message: 'phone e text são obrigatórios.' });

  const phoneClean = String(phone).replace(/\D/g, '');
  if (phoneClean.length < 10) return res.status(400).json({ status: 'error', message: 'Número de telefone inválido.' });

  try {
    const result = await chatguruSend(phoneClean, String(text));

    if (result?.result === 'success' || result?.result === 'ok' || result?.code === 200 || result?.code === 201 || result?.message_id) {
      try {
        await insert('rhf_messages', {
          phone: phoneClean,
          direction: 'outbound',
          content: String(text),
          message_type: 'text',
          sent_by_user_id: user_id || null,
        }, false);
      } catch (err) { console.warn('[whatsapp/send] log failed:', err.message); }

      return res.status(200).json({ status: 'ok', message: 'Mensagem enviada.', chatguru: result });
    }

    return res.status(400).json({
      status: 'error',
      message: result?.description || result?.message || 'ChatGuru não confirmou o envio.',
      chatguru: result,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}
