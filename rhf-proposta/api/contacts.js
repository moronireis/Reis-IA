/**
 * Contacts API — Vercel Serverless Function
 *
 * GET  /api/contacts                      — list all candidates
 * GET  /api/contacts?status=new          — filter by status
 * POST /api/contacts?action=import-bulk  — { rows: [{name, phone?, email?, city?, vacancy_name?, education?, salary_expectation?, status?}], source? }
 *                                           Upsert em lote (planilha do Pandapé ou cadastro manual).
 *                                           Dedupe por telefone (dígitos) e, na falta, por e-mail.
 */

import { select, insert, update } from '../lib/supabase.js';

const MAX_ROWS = 300;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST' && req.query.action === 'import-bulk') return handleImportBulk(req, res);

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { status, limit = '50' } = req.query;
    let query = `order=created_at.desc&limit=${limit}`;
    if (status) query += `&status=eq.${status}`;

    const data = await select('candidates', query);
    return res.status(200).json({ status: 'ok', data });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

// ─── Bulk import (planilha Pandapé / cadastro manual) ────────────────────────

function cleanPhone(v) {
  let p = String(v || '').replace(/\D/g, '');
  if (!p) return '';
  // Remove zeros à esquerda de discagem (051...) antes de normalizar
  p = p.replace(/^0+/, '');
  // 10-11 dígitos = DDD + número → prefixa DDI 55
  if (p.length === 10 || p.length === 11) p = '55' + p;
  return p.length >= 12 && p.length <= 13 ? p : (p.length >= 10 ? p : '');
}

function cleanStr(v, max = 300) {
  const s = String(v ?? '').trim();
  return s ? s.slice(0, max) : '';
}

async function handleImportBulk(req, res) {
  try {
    const { rows, source } = req.body || {};
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ status: 'error', message: 'rows (array) é obrigatório.' });
    }
    if (rows.length > MAX_ROWS) {
      return res.status(400).json({ status: 'error', message: `Máximo de ${MAX_ROWS} linhas por importação. Divida a planilha.` });
    }
    const src = cleanStr(source, 40) || 'pandape-sheet';

    // Normaliza as linhas de entrada
    const cleaned = [];
    const invalid = [];
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i] || {};
      const name = cleanStr(r.name, 160);
      const phone = cleanPhone(r.phone);
      const email = cleanStr(r.email, 160).toLowerCase();
      if (!name) { invalid.push({ line: i + 1, reason: 'sem nome' }); continue; }
      const salaryNum = parseFloat(String(r.salary_expectation || '').replace(/[^\d.,]/g, '').replace(/\.(?=\d{3})/g, '').replace(',', '.'));
      cleaned.push({
        name,
        phone: phone || null,
        email: email || null,
        city: cleanStr(r.city, 120) || null,
        vacancy_name: cleanStr(r.vacancy_name, 200) || null,
        education: cleanStr(r.education, 300) || null,
        salary_expectation: !isNaN(salaryNum) && salaryNum > 0 ? salaryNum : null,
        row_status: cleanStr(r.status, 60) || null,
      });
    }

    // Base existente (tabela pequena — fetch único é mais robusto que in.())
    const existing = await select('candidates', 'select=id,name,phone,email,city,vacancy_name,education,salary_expectation&limit=3000');
    const byPhone = new Map();
    const byEmail = new Map();
    for (const c of existing) {
      if (c.phone) byPhone.set(String(c.phone).replace(/\D/g, ''), c);
      if (c.email) byEmail.set(String(c.email).toLowerCase(), c);
    }

    const toInsert = [];
    const toUpdate = [];
    let skipped = 0;

    const seen = new Set(); // dedupe dentro da própria planilha
    for (const row of cleaned) {
      const dupKey = row.phone || row.email || `${row.name}`.toLowerCase();
      if (seen.has(dupKey)) { skipped++; continue; }
      seen.add(dupKey);

      const match = (row.phone && byPhone.get(row.phone)) || (row.email && byEmail.get(row.email)) || null;
      if (!match) {
        toInsert.push({
          name: row.name,
          phone: row.phone,
          email: row.email,
          city: row.city,
          vacancy_name: row.vacancy_name,
          education: row.education,
          salary_expectation: row.salary_expectation,
          status: 'new',
          source: src,
        });
        continue;
      }
      // Existente: preenche apenas campos vazios (nunca sobrescreve dado real)
      const patch = {};
      if (!match.email && row.email) patch.email = row.email;
      if (!match.phone && row.phone) patch.phone = row.phone;
      if (!match.city && row.city) patch.city = row.city;
      if (!match.vacancy_name && row.vacancy_name) patch.vacancy_name = row.vacancy_name;
      if (!match.education && row.education) patch.education = row.education;
      if (!match.salary_expectation && row.salary_expectation) patch.salary_expectation = row.salary_expectation;
      if (Object.keys(patch).length === 0) { skipped++; continue; }
      patch.updated_at = new Date().toISOString();
      toUpdate.push({ id: match.id, patch });
    }

    // Insere em lotes de 100 (PostgREST aceita array)
    let inserted = 0;
    for (let i = 0; i < toInsert.length; i += 100) {
      const chunk = toInsert.slice(i, i + 100);
      const ins = await insert('candidates', chunk);
      inserted += Array.isArray(ins) ? ins.length : chunk.length;
    }

    // Atualiza em paralelo controlado (lotes de 10)
    let updated = 0;
    for (let i = 0; i < toUpdate.length; i += 10) {
      const chunk = toUpdate.slice(i, i + 10);
      const results = await Promise.allSettled(chunk.map(u => update('candidates', `id=eq.${u.id}`, u.patch)));
      updated += results.filter(r => r.status === 'fulfilled').length;
    }

    return res.status(200).json({
      status: 'ok',
      inserted,
      updated,
      skipped,
      invalid,
      total: rows.length,
      message: `${inserted} novo(s), ${updated} atualizado(s), ${skipped} já existia(m)${invalid.length ? `, ${invalid.length} linha(s) inválida(s)` : ''}.`,
    });
  } catch (error) {
    console.error('[contacts import-bulk] error:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}
