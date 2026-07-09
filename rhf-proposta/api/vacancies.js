/**
 * Vacancies — Smart Job Opening (Vercel Serverless Function)
 *
 * POST /api/vacancies?action=create      → { title, client_name?, city?, contract_type?, salary_range?, requirements?, processo_numero? }
 *                                           Generates job description + WhatsApp divulgation script (template-based)
 * GET  /api/vacancies?action=list        → list vacancies (newest first)
 * POST /api/vacancies?action=status      → { id, status } — aberta | fechada
 * POST /api/vacancies?action=import-bulk → { rows: [{title, client_name?, city?, contract_type?, salary_range?, requirements?, processo_numero?, status?}], source? }
 *                                           Planilha de vagas do Pandapé. Dedupe por nº do processo ou título+empresa.
 * POST /api/vacancies?action=import-text → { text } — texto da vaga colado do Pandapé → campos estruturados
 *                                           (OpenAI, NÃO cria a vaga — o front pré-preenche o modal para revisão)
 */

import { select, insert, update } from '../lib/supabase.js';

const MAX_ROWS = 200;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query.action;
  if (action === 'create' && req.method === 'POST') return handleCreate(req, res);
  if (action === 'list' && req.method === 'GET') return handleList(req, res);
  if (action === 'status' && req.method === 'POST') return handleStatus(req, res);
  if (action === 'import-bulk' && req.method === 'POST') return handleImportBulk(req, res);
  if (action === 'import-text' && req.method === 'POST') return handleImportText(req, res);

  return res.status(400).json({ error: 'Use action=create (POST) | list (GET) | status (POST) | import-bulk (POST) | import-text (POST)' });
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
    const { title, client_name, city, contract_type, salary_range, requirements, processo_numero, source } = req.body || {};
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
      processo_numero: processo_numero?.trim() || null,
      source: source?.trim() || 'manual',
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

// ─── Bulk import (planilha de vagas do Pandapé) ──────────────────────────────

function normalizeVagaStatus(v) {
  const s = String(v || '').toLowerCase();
  if (/fechad|encerrad|conclu|cancelad|finalizad/.test(s)) return 'fechada';
  return 'aberta';
}

async function handleImportBulk(req, res) {
  try {
    const { rows, source } = req.body || {};
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ status: 'error', message: 'rows (array) é obrigatório.' });
    }
    if (rows.length > MAX_ROWS) {
      return res.status(400).json({ status: 'error', message: `Máximo de ${MAX_ROWS} linhas por importação.` });
    }
    const src = String(source || 'pandape-sheet').trim().slice(0, 40);

    const existing = await select('vacancies', 'select=id,title,client_name,processo_numero&limit=1000');
    const byProcesso = new Map();
    const byTitleClient = new Map();
    for (const v of existing) {
      if (v.processo_numero) byProcesso.set(String(v.processo_numero).trim().toLowerCase(), v);
      byTitleClient.set(`${String(v.title || '').trim().toLowerCase()}|${String(v.client_name || '').trim().toLowerCase()}`, v);
    }

    const toInsert = [];
    const invalid = [];
    let skipped = 0;
    const seen = new Set();

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i] || {};
      const title = String(r.title || '').trim().slice(0, 200);
      if (!title) { invalid.push({ line: i + 1, reason: 'sem título' }); continue; }
      const processo = String(r.processo_numero || '').trim().slice(0, 60);
      const client = String(r.client_name || '').trim().slice(0, 160);

      const dupKey = processo ? `p:${processo.toLowerCase()}` : `t:${title.toLowerCase()}|${client.toLowerCase()}`;
      if (seen.has(dupKey)) { skipped++; continue; }
      seen.add(dupKey);

      const match = (processo && byProcesso.get(processo.toLowerCase()))
        || byTitleClient.get(`${title.toLowerCase()}|${client.toLowerCase()}`);
      if (match) { skipped++; continue; } // vaga já cadastrada — não sobrescreve

      const data = {
        title,
        client_name: client || null,
        city: String(r.city || '').trim().slice(0, 120) || null,
        contract_type: String(r.contract_type || '').trim().slice(0, 80) || null,
        salary_range: String(r.salary_range || '').trim().slice(0, 120) || null,
        requirements: String(r.requirements || '').trim().slice(0, 2000) || null,
        processo_numero: processo || null,
        status: normalizeVagaStatus(r.status),
        source: src,
      };
      data.description = buildDescription(data);
      data.whatsapp_script = buildWhatsAppScript(data);
      toInsert.push(data);
    }

    let inserted = 0;
    for (let i = 0; i < toInsert.length; i += 50) {
      const chunk = toInsert.slice(i, i + 50);
      const ins = await insert('vacancies', chunk);
      inserted += Array.isArray(ins) ? ins.length : chunk.length;
    }

    return res.status(200).json({
      status: 'ok',
      inserted,
      skipped,
      invalid,
      total: rows.length,
      message: `${inserted} vaga(s) nova(s), ${skipped} já existia(m)${invalid.length ? `, ${invalid.length} linha(s) inválida(s)` : ''}.`,
    });
  } catch (error) {
    console.error('[vacancies import-bulk] error:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

// ─── Import from pasted text (OpenAI) ────────────────────────────────────────
//
// O Rodrigo copia o texto da vaga no Pandapé e cola na plataforma. A IA
// estrutura nos campos do modal Nova Vaga — NÃO cria a vaga direto: o front
// pré-preenche o formulário e ele revisa antes de salvar.

const VAGA_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'client_name', 'city', 'contract_type', 'salary_range', 'requirements', 'processo_numero'],
  properties: {
    title: { type: 'string', description: 'Título/cargo da vaga' },
    client_name: { type: 'string', description: 'Empresa cliente. Vazio se confidencial/ausente.' },
    city: { type: 'string', description: 'Cidade/UF, ex.: Novo Hamburgo/RS. Vazio se ausente.' },
    contract_type: { type: 'string', description: 'CLT, PJ, Temporária, Estágio... Vazio se ausente.' },
    salary_range: { type: 'string', description: 'Ex.: "R$ 2.200 a R$ 2.800" ou "R$ 2.500,00". Vazio se ausente.' },
    requirements: { type: 'string', description: 'Requisitos, UM POR LINHA (separados por \\n), sem bullets. Vazio se ausente.' },
    processo_numero: { type: 'string', description: 'Número do processo/vaga no Pandapé, se constar. Somente o identificador.' },
  },
};

async function handleImportText(req, res) {
  try {
    const text = String((req.body || {}).text || '').trim();
    if (text.length < 30) {
      return res.status(400).json({ status: 'error', message: 'Cole o texto completo da vaga (mínimo 30 caracteres).' });
    }
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ status: 'error', message: 'OPENAI_API_KEY não configurada no ambiente.' });

    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.OPENAI_IMPORT_MODEL || 'gpt-4o-mini',
        max_tokens: 1024,
        temperature: 0,
        response_format: { type: 'json_schema', json_schema: { name: 'pandape_vaga', strict: true, schema: VAGA_SCHEMA } },
        messages: [
          { role: 'system', content: 'Você extrai os campos de uma vaga de emprego a partir de texto copiado do ATS Pandapé. Extraia SOMENTE o que está no texto — nunca invente. Campos ausentes ficam como string vazia. Acentuação correta em português.' },
          { role: 'user', content: text.slice(0, 20000) },
        ],
      }),
    });

    const aiData = await aiRes.json();
    if (!aiRes.ok) {
      console.error('[vacancies import-text] OpenAI error:', JSON.stringify(aiData).slice(0, 400));
      return res.status(502).json({ status: 'error', message: aiData?.error?.message || 'Falha na extração com IA.' });
    }

    let parsed;
    try { parsed = JSON.parse(aiData.choices?.[0]?.message?.content || ''); }
    catch { return res.status(502).json({ status: 'error', message: 'IA retornou resposta não estruturada.' }); }

    return res.status(200).json({ status: 'ok', parsed, usage: aiData.usage || null });
  } catch (error) {
    console.error('[vacancies import-text] error:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}
