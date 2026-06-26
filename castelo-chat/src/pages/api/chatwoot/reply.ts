/**
 * Chatwoot → WhatsApp outbound bridge
 * Chatwoot calls this endpoint (callback_webhook_url) when an agent sends a reply.
 * We forward the message to UazapiGO so it reaches the customer's WhatsApp.
 */
import type { APIRoute } from 'astro';
import { sendTextMessage } from '../../../lib/uazapi';

const INSTANCE_ID = 'castelo1';

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response('ok', { status: 200 });
  }

  // Chatwoot sends event type in message_type or event
  const messageType = (body.message_type as string) || '';
  const event = (body.event as string) || '';

  // Only handle outgoing messages from agents (not incoming from WhatsApp)
  if (event !== 'message_created' && event !== 'message_updated') {
    return new Response('ok', { status: 200 });
  }
  if (messageType !== 'outgoing') {
    return new Response('ok', { status: 200 });
  }

  const content = (body.content as string) || '';
  if (!content.trim()) return new Response('ok', { status: 200 });

  // Extract phone from conversation meta → contact
  const meta = (body.meta as Record<string, unknown>) || {};
  const sender = (meta.sender as Record<string, unknown>) || {};
  const conversation = (body.conversation as Record<string, unknown>) || {};
  const contact = (conversation.meta as Record<string, unknown>)?.sender as Record<string, unknown> | undefined;

  const phoneRaw =
    (sender.phone_number as string) ||
    (contact?.phone_number as string) ||
    '';

  if (!phoneRaw) {
    console.error('[chatwoot/reply] No phone number in payload:', JSON.stringify(body).slice(0, 300));
    return new Response('ok', { status: 200 });
  }

  // Normalize: strip non-digits, ensure country code
  const phone = phoneRaw.replace(/\D/g, '');
  if (!phone) return new Response('ok', { status: 200 });

  try {
    await sendTextMessage(INSTANCE_ID, phone, content);
  } catch (err) {
    console.error('[chatwoot/reply] UazapiGO send error:', err);
  }

  return new Response('ok', { status: 200 });
};
