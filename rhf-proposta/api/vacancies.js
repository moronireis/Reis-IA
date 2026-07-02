/**
 * Vacancies — Smart Job Opening (Vercel Serverless Function)
 *
 * POST /api/vacancies?action=create → { title, client_name?, city?, contract_type?, salary_range?, requirements? }
 *                                      Generates job description + WhatsApp divulgation script (template-based)
 * GET  /api/vacancies?action=list   → list vacancies (newest first)
 * POST /api/vacancies?action=status → { id, status } — aberta | fechada
 */

import { select, insert, update } from '../lib/supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query.action;
  if (action === 'create' && req.method === 'POST') return handleCreate(req, res);
  if (action === 'list' && req.method === 'GET') return handleList(req, res);
  if (action === 'status' && req.method === 'POST') return handleStatus(req, res);

  return res.status(400).json({ error: 'Use action=create (POST) | list (GET) | status (POST)' });
}

// ─── Templates ────────────────────────────────────────────────────────────────

function buildDescription({ title, client_name, city, contract_type, salary_range, requirements }) {
  const lines = [];
  lines.push(`VAGA: ${title.toUpperCase()}`);
  if (city) lines.push(`Local: ${city}`);
  if (contract_type) lines.push(`Contratação: ${contract_type}`);
  if (salary_range) lines.push(`Faixa salarial: ${salary_range}`);
  lines.push('');
  lines.push('SOBRE A OPORTUNIDADE');
  lines.push(
    client_name
      ? `A RHF Talentos está conduzindo o processo seletivo de ${title} para ${client_name}${city ? `, na região de ${city}` : ''}.`
      : `A RHF Talentos está conduzindo o processo seletivo de ${title}${city ? ` na região de ${city}` : ''} para empresa cliente (confidencial).`
  );
  lines.push('');

  const reqLines = String(requirements || '')
    .split('\n')
    .map(l => l.trim().replace(/^[•\-]\s*/, ''))
    .filter(Boolean);
  if (reqLines.length > 0) {
    lines.push('REQUISITOS');
    for (const r of reqLines) lines.push(`• ${r}`);
    lines.push('');
  }

  lines.push('COMO PARTICIPAR');
  lines.push('Candidatos interessados devem enviar o currículo pelo WhatsApp 51 99936-9855 ou pelo e-mail valedosinos@rhf.com.br, informando o nome da vaga.');
  lines.push('');
  lines.push('RHF Talentos Vale dos Sinos/RS — O nosso negócio é gente!');
  return lines.join('\n');
}

function buildWhatsAppScript({ title, city, contract_type, salary_range, requirements }) {
  const lines = [];
  lines.push(`*OPORTUNIDADE: ${title.toUpperCase()}*`);
  if (city) lines.push(`_${city}_`);
  lines.push('');
  if (contract_type) lines.push(`*Contratação:* ${contract_type}`);
  if (salary_range) lines.push(`*Salário:* ${salary_range}`);

  const reqLines = String(requirements || '')
    .split('\n')
    .map(l => l.trim().replace(/^[•\-]\s*/, ''))
    .filter(Boolean)
    .slice(0, 5);
  if (reqLines.length > 0) {
    lines.push('');
    lines.push('*Requisitos:*');
    for (const r of reqLines) lines.push(`• ${r}`);
  }

  lines.push('');
  lines.push('Interessados: envie seu currículo por aqui informando o nome da vaga.');
  lines.push('');
  lines.push('_RHF Talentos Vale dos Sinos/RS_');
  return lines.join('\n');
}

// ─── Handlers ─────────────────────────────────────────────────────────────────

async function handleCreate(req, res) {
  try {
    const { title, client_name, city, contract_type, salary_range, requirements } = req.body || {};
    if (!title || !String(title).trim()) {
      return res.status(400).json({ status: 'error', message: 'title é obrigatório.' });
    }

    const data = {
      title: String(title).trim(),
      client_name: client_name?.trim() || null,
      city: city?.trim() || null,
      contract_type: contract_type?.trim() || null,
      salary_range: salary_range?.trim() || null,
      requirements: requirements?.trim() || null,
    };

    data.description = buildDescription(data);
    data.whatsapp_script = buildWhatsAppScript(data);

    const ins = await insert('vacancies', data);
    const row = Array.isArray(ins) ? ins[0] : ins;
    if (!row?.id) throw new Error('insert returned no id');

    return res.status(200).json({ status: 'ok', data: row });
  } catch (error) {
    console.error('[vacancies create] error:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

async function handleList(req, res) {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 200);
    const rows = await select('vacancies', `order=created_at.desc&limit=${limit}`);
    return res.status(200).json({ status: 'ok', count: rows.length, data: rows });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

async function handleStatus(req, res) {
  try {
    const { id, status } = req.body || {};
    if (!id || !['aberta', 'fechada'].includes(status)) {
      return res.status(400).json({ status: 'error', message: 'id e status (aberta|fechada) são obrigatórios.' });
    }
    const rows = await update('vacancies', `id=eq.${id}`, { status });
    return res.status(200).json({ status: 'ok', data: Array.isArray(rows) ? rows[0] : rows });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}
