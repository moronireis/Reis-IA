import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../../lib/auth';
import { createServerSupabase } from '../../../lib/supabase-server';
import { sendTextMessage, sendMediaMessage, normalizePhone } from '../../../lib/uazapi';

export const GET: APIRoute = async ({ request, url }) => {
  if (!isAuthenticated(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const contactId = url.searchParams.get('contact_id');
  if (!contactId) {
    return new Response('Missing contact_id', { status: 400 });
  }

  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('castelo_messages')
    .select('*')
    .eq('contact_id', contactId)
    .order('created_at', { ascending: true })
    .limit(100);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Reset unread count
  await supabase
    .from('castelo_contacts')
    .update({ unread_count: 0 })
    .eq('id', contactId);

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await request.json() as {
    contact_id: string;
    text?: string;
    media_url?: string;
    media_type?: string;
  };
  const { contact_id, text, media_url, media_type } = body;

  const supabase = createServerSupabase();
  const { data: contact } = await supabase
    .from('castelo_contacts')
    .select('phone, instance_id')
    .eq('id', contact_id)
    .single();

  if (!contact) {
    return new Response('Contact not found', { status: 404 });
  }

  const phone = normalizePhone(contact.phone as string);

  try {
    if (text) {
      await sendTextMessage(contact.instance_id as string, phone, text);
    } else if (media_url && media_type) {
      await sendMediaMessage(contact.instance_id as string, phone, media_url, media_type);
    }

    const { data: msg, error } = await supabase
      .from('castelo_messages')
      .insert({
        contact_id,
        instance_id: contact.instance_id,
        direction: 'outbound',
        content_type: media_type || 'text',
        body: text || null,
        media_url: media_url || null,
        status: 'sent',
      })
      .select()
      .single();

    if (error) throw error;

    await supabase.from('castelo_contacts').update({
      last_message_at: new Date().toISOString(),
      last_message_direction: 'outbound',
      last_message_preview: (text || `[${media_type || 'media'}]`).slice(0, 100),
    }).eq('id', contact_id);

    return new Response(JSON.stringify(msg), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
