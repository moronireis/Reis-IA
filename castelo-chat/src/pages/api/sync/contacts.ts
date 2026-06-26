import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../../lib/auth';
import { createServerSupabase } from '../../../lib/supabase-server';

export const POST: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) return new Response('Unauthorized', { status: 401 });

  const instanceId = 'castelo1';
  const url = process.env.UAZAPI_URL_1 || '';
  const token = process.env.UAZAPI_TOKEN_1 || '';

  if (!url || !token) {
    return new Response(JSON.stringify({ error: 'Instance not configured' }), { status: 500 });
  }

  try {
    const res = await fetch(`${url}/contacts?token=${token}`);
    if (!res.ok) throw new Error(`UazapiGO returned ${res.status}`);

    const contacts = await res.json() as Array<{
      contact_name?: string;
      contact_FirstName?: string;
      jid?: string;
    }>;

    // Filter: only individual (not group) contacts with a valid phone
    const individuals = contacts.filter(c =>
      c.jid &&
      c.jid.includes('@s.whatsapp.net') &&
      !c.jid.includes('@g.us')
    );

    const supabase = createServerSupabase();

    // Upsert in batches of 200
    const BATCH = 200;
    let imported = 0;

    for (let i = 0; i < individuals.length; i += BATCH) {
      const batch = individuals.slice(i, i + BATCH).map(c => ({
        instance_id: instanceId,
        phone: c.jid!.replace('@s.whatsapp.net', ''),
        name: c.contact_name || c.contact_FirstName || null,
        push_name: c.contact_name || null,
        is_group: false,
      }));

      const { error } = await supabase
        .from('castelo_contacts')
        .upsert(batch, { onConflict: 'instance_id,phone', ignoreDuplicates: true });

      if (!error) imported += batch.length;
    }

    return new Response(JSON.stringify({
      ok: true,
      total: contacts.length,
      imported,
      skipped: contacts.length - individuals.length,
    }), { headers: { 'Content-Type': 'application/json' } });

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
};
