/**
 * Reis Marketing IA — Read Submissions API
 * GET /api/submissions — returns all form submissions from Supabase
 * GET /api/submissions?type=empresa — filter by form type
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    let url = `${SUPABASE_URL}/rest/v1/form_submissions?select=*&order=created_at.desc`;

    const { type } = req.query;
    if (type && type !== 'all') {
      url += `&form_type=eq.${type}`;
    }

    const response = await fetch(url, {
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
      }
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Supabase read error:', err);
      return res.status(500).json({ error: 'Failed to read submissions' });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Submissions error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
