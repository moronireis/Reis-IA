import type { APIRoute } from 'astro';
import { createServerSupabase } from '../../../lib/supabase-server';
import { decryptWhatsAppMedia, getMediaExtension } from '../../../lib/crypto';
import { normalizePhone } from '../../../lib/uazapi';
import { sendToChatwoot } from '../../../lib/chatwoot';

export const POST: APIRoute = async ({ request, params }) => {
  try {
  const instanceId = params.instance || 'castelo1';

  let rawText = '';
  let body: unknown;
  try {
    rawText = await request.text();
    body = JSON.parse(rawText);
  } catch {
    console.error('[webhook] Failed to parse body:', rawText?.slice(0, 200));
    return new Response('ok', { status: 200 });
  }

  // UazapiGO may wrap in { event, data } or { event, data: [...] }
  // Unwrap if present
  if (body && typeof body === 'object' && !Array.isArray(body)) {
    const b = body as Record<string, unknown>;
    if (b.data !== undefined && !b.chatid && !b.from && !b.id) {
      body = b.data;
    }
  }

  const messages = Array.isArray(body) ? body : [body];
  const supabase = createServerSupabase();

  // Debug: log raw payload structure — awaited so it completes before function exits
  const debugSnippet = rawText.slice(0, 4000);
  await supabase.from('castelo_webhook_log').insert({
    instance_id: instanceId,
    raw: debugSnippet,
  }).then(() => {}, () => {});

  for (const msg of messages) {
    try {
      await processMessage(supabase, instanceId, msg as Record<string, unknown>);
    } catch (err) {
      console.error('[webhook] Error processing message:', err);
    }
  }

  return new Response('ok', { status: 200 });
  } catch (topErr: unknown) {
    const msg = topErr instanceof Error ? topErr.message + '\n' + topErr.stack : String(topErr);
    return new Response(JSON.stringify({ error: msg }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
};

type SupabaseClient = ReturnType<typeof createServerSupabase>;

async function processMessage(
  supabase: SupabaseClient,
  instanceId: string,
  msg: Record<string, unknown>
) {
  const chatid = ((msg.chatid || msg.from || '') as string);
  if (!chatid) return;

  const fromMe = Boolean(msg.fromMe || msg.from_me);
  const messageId = ((msg.id || msg.messageId || '') as string);
  const messageType = ((msg.type || 'text') as string);
  const content = ((msg.content || {}) as Record<string, unknown>);

  const isGroup = chatid.includes('@g.us');
  const phone = normalizePhone(chatid);
  const pushName = ((msg.pushName || msg.notifyName || '') as string);
  const participantRaw = ((msg.participant || '') as string);
  const senderName = isGroup && participantRaw
    ? normalizePhone(participantRaw)
    : pushName;

  // Determine content type
  const mediaType = (msg.mediaType || '').toString().toLowerCase();
  let contentType: string;

  if (
    messageType === 'media' ||
    messageType === 'image' ||
    messageType === 'audio' ||
    messageType === 'video' ||
    messageType === 'document' ||
    messageType === 'sticker' ||
    messageType === 'ptt'
  ) {
    const mt = mediaType || messageType;
    contentType = ['image', 'sticker'].includes(mt) ? 'image'
      : ['audio', 'ptt'].includes(mt) ? 'audio'
      : mt === 'video' ? 'video'
      : mt === 'document' ? 'document'
      : 'document';
  } else {
    contentType = 'text';
  }

  // Find or create contact
  const { data: existingContact } = await supabase
    .from('castelo_contacts')
    .select('id')
    .eq('instance_id', instanceId)
    .eq('phone', phone)
    .single();

  let contactId: string;
  if (existingContact) {
    contactId = existingContact.id as string;
  } else {
    const { data: newContact, error: insertErr } = await supabase
      .from('castelo_contacts')
      .insert({
        instance_id: instanceId,
        phone,
        push_name: pushName || null,
        name: pushName || null,
        is_group: isGroup,
      })
      .select('id')
      .single();
    if (insertErr || !newContact) return;
    contactId = newContact.id as string;
  }

  // Dedup check
  if (messageId) {
    const { data: existing } = await supabase
      .from('castelo_messages')
      .select('id')
      .eq('wa_message_id', messageId)
      .single();
    if (existing) return;
  }

  let bodyText = ((msg.text || msg.body || content.text || '') as string);
  let finalMediaUrl: string | null = null;
  let finalMime: string | null = null;

  // Handle media
  if (contentType !== 'text') {
    const cdnUrl = ((content.URL || content.url || msg.url || '') as string);
    const mediaKeyB64 = ((content.mediaKey || '') as string);
    const rawMime = ((content.mimetype || content.mimeType || '') as string);
    // CRITICAL FIX: strip parameters from mime type before Supabase upload
    const cleanMime = rawMime ? rawMime.split(';')[0].trim() : null;
    const captionText = ((content.caption || '') as string);
    if (captionText) bodyText = captionText;

    if (cdnUrl) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 18000);
        const mediaRes = await fetch(cdnUrl, { signal: controller.signal });
        clearTimeout(timeout);

        if (mediaRes.ok) {
          let mediaBytes = Buffer.from(await mediaRes.arrayBuffer());

          // Decrypt if mediaKey present
          if (mediaKeyB64) {
            try {
              const mt = (mediaType || contentType).toLowerCase();
              mediaBytes = decryptWhatsAppMedia(mediaBytes, mediaKeyB64, mt);
            } catch (e) {
              console.error('[webhook] Decrypt error:', e);
            }
          }

          const ext = getMediaExtension(mediaType || contentType, cleanMime || '');
          const storageKey = `${contactId}/${messageId || Date.now()}.${ext}`;
          const mimeToUpload = cleanMime || 'application/octet-stream';

          const { error: uploadErr } = await supabase.storage
            .from('castelo-media')
            .upload(storageKey, mediaBytes, {
              contentType: mimeToUpload,
              upsert: true,
            });

          if (!uploadErr) {
            const { data: publicData } = supabase.storage
              .from('castelo-media')
              .getPublicUrl(storageKey);
            finalMediaUrl = publicData.publicUrl;
            finalMime = mimeToUpload;
          }
        }
      } catch (err) {
        console.error('[webhook] Media fetch error:', err);
      }
    }
  }

  // Insert message
  const metadataObj: Record<string, unknown> = {};
  if (senderName) metadataObj.sender_name = senderName;
  if (isGroup && participantRaw) metadataObj.participant = participantRaw;

  await supabase.from('castelo_messages').insert({
    contact_id: contactId,
    instance_id: instanceId,
    direction: fromMe ? 'outbound' : 'inbound',
    content_type: contentType,
    body: bodyText || null,
    status: fromMe ? 'sent' : 'received',
    media_url: finalMediaUrl,
    media_mime: finalMime,
    wa_message_id: messageId || null,
    metadata: Object.keys(metadataObj).length > 0 ? metadataObj : null,
  });

  // Update contact last message + photo if available
  const profilePicUrl = (msg.profilePicUrl || (content as Record<string, unknown>).profilePicUrl || '') as string;
  const contactUpdate: Record<string, unknown> = {
    last_message_at: new Date().toISOString(),
    last_message_direction: fromMe ? 'outbound' : 'inbound',
    last_message_preview: (bodyText || `[${contentType}]`).slice(0, 100),
  };
  if (pushName) {
    contactUpdate.push_name = pushName;
    contactUpdate.name = pushName;
  }
  if (profilePicUrl && profilePicUrl.startsWith('http')) {
    contactUpdate.photo_url = profilePicUrl;
  }
  await supabase.from('castelo_contacts').update(contactUpdate).eq('id', contactId);

  // Increment unread separately for inbound messages
  if (!fromMe) {
    await supabase.rpc('increment_unread', { contact_uuid: contactId });
  }

  // Forward to Chatwoot (non-blocking)
  sendToChatwoot({
    phone,
    name: pushName || phone,
    text: bodyText || '',
    mediaUrl: finalMediaUrl,
    contentType,
    fromMe,
  }).catch((err) => console.error('[webhook] Chatwoot forward error:', err));
}
