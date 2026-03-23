/**
 * Reis Marketing IA — Bulk Lead Import API
 * POST /api/import-leads — imports an array of normalized leads into Supabase
 * Each lead: { source, name, email, phone, instagram, data, tags, created_at }
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { leads } = req.body;

    if (!Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({ error: 'Missing or empty leads array' });
    }

    // Map leads to form_submissions rows
    const rows = leads.map(lead => ({
      form_type: lead.source.startsWith('mdv-') ? lead.source : `lista-${lead.source}`,
      name: lead.name || '',
      data: {
        email: lead.email || '',
        phone: lead.phone || '',
        instagram: lead.instagram || '',
        source_list: lead.source_label || lead.source,
        imported_at: new Date().toISOString(),
        original_date: lead.created_at || '',
        tags: lead.tags || [],
        ...lead.data
      }
    }));

    // Insert in batches of 50
    const BATCH_SIZE = 50;
    let inserted = 0;
    let errors = [];

    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
      const batch = rows.slice(i, i + BATCH_SIZE);

      const response = await fetch(`${SUPABASE_URL}/rest/v1/form_submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(batch)
      });

      if (response.ok) {
        inserted += batch.length;
      } else {
        const err = await response.text();
        console.error(`Batch ${i}-${i + batch.length} error:`, err);
        errors.push({ batch: i, error: err });
      }
    }

    return res.status(200).json({
      ok: true,
      total: leads.length,
      inserted,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Import error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
