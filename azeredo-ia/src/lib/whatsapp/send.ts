import { createServerClient } from '../supabase-server';

export interface SendResult {
  ok: boolean;
  messageid?: string;
  error?: string;
}

/**
 * Normalize a phone number to the format UazapiGO expects: digits only,
 * with Brazilian country code prefix (55) when absent.
 *
 * Logic:
 *   1. Strip every non-digit character.
 *   2. If 10 digits (DDD + 8-digit landline), prepend "55".
 *   3. If 11 digits (DDD + 9-digit mobile), prepend "55".
 *   4. If already 12 or 13 digits, assume country code is present.
 *   5. Anything else: return stripped digits; UazapiGO will surface the error.
 */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  if (digits.length === 12 || digits.length === 13) return digits;
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;

  return digits;
}

export async function sendWhatsAppText(
  phone: string,
  text: string,
  contactId?: string,
  campaignId?: string,
  instanceToken?: string,  // when provided, overrides UAZAPI_TOKEN env var
  instanceId?: string      // logged in az_messages (per-instance daily cap)
): Promise<SendResult> {
  const UAZAPI_URL = import.meta.env.UAZAPI_URL;
  const UAZAPI_TOKEN = instanceToken || import.meta.env.UAZAPI_TOKEN;

  if (!UAZAPI_URL || !UAZAPI_TOKEN) {
    return { ok: false, error: 'WhatsApp not configured' };
  }

  const normalizedPhone = normalizePhone(phone);

  try {
    const res = await fetch(`${UAZAPI_URL}/send/text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: UAZAPI_TOKEN },
      body: JSON.stringify({ number: normalizedPhone, text }),
      // Sem timeout, uma request pendurada trava o worker de disparo inteiro
      signal: AbortSignal.timeout(15_000),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { ok: false, error: data.message || `HTTP ${res.status}` };
    }

    if (contactId) {
      const sb = createServerClient();
      await sb.from('az_messages').insert({
        contact_id: contactId,
        campaign_id: campaignId || null,
        instance_id: instanceId || null,
        phone: normalizedPhone,
        wa_message_id: data.messageid || null,
        direction: 'outbound',
        body: text,
        status: 'sent',
      });
    }

    return { ok: true, messageid: data.messageid };
  } catch (e: any) {
    return { ok: false, error: e.message };
  }
}

/**
 * #8 (backlog GitHub 17/07): carrossel interativo — mensagem única com cards
 * (imagem + texto) via POST /send/carousel. Diferente do álbum (N mensagens
 * sequenciais), chega como um carrossel navegável estilo Instagram.
 */
export async function sendWhatsAppCarousel(
  phone: string,
  text: string,
  cards: { image: string; text?: string | null }[],
  contactId?: string,
  campaignId?: string,
  instanceToken?: string,
  instanceId?: string
): Promise<SendResult> {
  const UAZAPI_URL = import.meta.env.UAZAPI_URL;
  const UAZAPI_TOKEN = instanceToken || import.meta.env.UAZAPI_TOKEN;

  if (!UAZAPI_URL || !UAZAPI_TOKEN) {
    return { ok: false, error: 'WhatsApp not configured' };
  }

  const normalizedPhone = normalizePhone(phone);

  try {
    const res = await fetch(`${UAZAPI_URL}/send/carousel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: UAZAPI_TOKEN },
      body: JSON.stringify({
        number: normalizedPhone,
        text,
        carousel: cards.map(c => ({
          image: c.image,
          // o WhatsApp exige texto no card — cai para um espaço quando vazio
          text: (c.text || '').trim() || ' ',
        })),
      }),
      // Carrossel envolve download de N imagens no servidor UazapiGO
      signal: AbortSignal.timeout(60_000),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { ok: false, error: data.message || `HTTP ${res.status}` };
    }

    if (contactId) {
      const sb = createServerClient();
      await sb.from('az_messages').insert({
        contact_id: contactId,
        campaign_id: campaignId || null,
        instance_id: instanceId || null,
        phone: normalizedPhone,
        wa_message_id: data.messageid || null,
        direction: 'outbound',
        body: text,
        content_type: 'image',
        media_url: cards[0]?.image || null,
        status: 'sent',
      });
    }

    return { ok: true, messageid: data.messageid };
  } catch (e: any) {
    return { ok: false, error: e.message };
  }
}

/**
 * Envia mídia (imagem/vídeo) com legenda via POST /send/media do UazapiGO.
 * `file` é uma URL pública (bucket az-media) — o servidor UazapiGO precisa
 * alcançá-la para baixar e reenviar.
 */
export async function sendWhatsAppMedia(
  phone: string,
  mediaUrl: string,
  mediaType: 'image' | 'video',
  caption: string,
  contactId?: string,
  campaignId?: string,
  instanceToken?: string,
  instanceId?: string
): Promise<SendResult> {
  const UAZAPI_URL = import.meta.env.UAZAPI_URL;
  const UAZAPI_TOKEN = instanceToken || import.meta.env.UAZAPI_TOKEN;

  if (!UAZAPI_URL || !UAZAPI_TOKEN) {
    return { ok: false, error: 'WhatsApp not configured' };
  }

  const normalizedPhone = normalizePhone(phone);

  try {
    const res = await fetch(`${UAZAPI_URL}/send/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: UAZAPI_TOKEN },
      body: JSON.stringify({
        number: normalizedPhone,
        type: mediaType,
        file: mediaUrl,
        text: caption || undefined,
      }),
      // Mídia envolve download+upload no servidor UazapiGO — mais folga que texto
      signal: AbortSignal.timeout(45_000),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { ok: false, error: data.message || `HTTP ${res.status}` };
    }

    if (contactId) {
      const sb = createServerClient();
      await sb.from('az_messages').insert({
        contact_id: contactId,
        campaign_id: campaignId || null,
        instance_id: instanceId || null,
        phone: normalizedPhone,
        wa_message_id: data.messageid || null,
        direction: 'outbound',
        body: caption || null,
        content_type: mediaType,
        media_url: mediaUrl,
        status: 'sent',
      });
    }

    return { ok: true, messageid: data.messageid };
  } catch (e: any) {
    return { ok: false, error: e.message };
  }
}
