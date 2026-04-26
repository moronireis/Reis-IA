const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TITLE = 'convidados-md-sync';

async function sb(path, init = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, body: text ? JSON.parse(text) : null };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!SUPABASE_URL || !SERVICE_KEY) {
    return res.status(500).json({ error: 'Missing env vars' });
  }

  try {
    if (req.method === 'GET') {
      const r = await sb(
        `hub_knowledge?title=eq.${encodeURIComponent(TITLE)}&select=content,updated_at&order=updated_at.desc&limit=1`
      );
      if (!r.ok) return res.status(r.status).json({ error: r.body });
      const row = r.body?.[0];
      return res.status(200).json({
        data: row ? JSON.parse(row.content) : null,
        updatedAt: row?.updated_at || null,
      });
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') body = JSON.parse(body);
      const content = JSON.stringify(body?.data ?? []);

      const existing = await sb(
        `hub_knowledge?title=eq.${encodeURIComponent(TITLE)}&select=id&limit=1`
      );
      const id = existing.body?.[0]?.id;

      if (id) {
        const upd = await sb(`hub_knowledge?id=eq.${id}`, {
          method: 'PATCH',
          headers: { Prefer: 'return=representation' },
          body: JSON.stringify({ content, updated_at: new Date().toISOString() }),
        });
        if (!upd.ok) return res.status(upd.status).json({ error: upd.body });
        return res.status(200).json({ ok: true, updatedAt: upd.body?.[0]?.updated_at });
      } else {
        const ins = await sb('hub_knowledge', {
          method: 'POST',
          headers: { Prefer: 'return=representation' },
          body: JSON.stringify({ category: 'general', title: TITLE, content }),
        });
        if (!ins.ok) return res.status(ins.status).json({ error: ins.body });
        return res.status(200).json({ ok: true, updatedAt: ins.body?.[0]?.updated_at });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
