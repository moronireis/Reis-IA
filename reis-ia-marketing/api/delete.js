/**
 * Reis Marketing IA — Delete Submission API
 * DELETE /api/delete?id=uuid — deletes a single submission
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed' });

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/form_submissions?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Prefer': 'return=minimal'
      }
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Supabase delete error:', err);
      return res.status(500).json({ error: 'Failed to delete' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
