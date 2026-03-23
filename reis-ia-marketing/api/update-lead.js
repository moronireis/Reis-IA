/**
 * Reis Marketing IA — Update Lead API
 * PATCH /api/update-lead — updates a submission's data field
 * Body: { id: "uuid", data: { ...updated data } }
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed' });

  const { id, data } = req.body;
  if (!id || !data) return res.status(400).json({ error: 'Missing id or data' });

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/form_submissions?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ data })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Supabase update error:', err);
      return res.status(500).json({ error: 'Failed to update' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
