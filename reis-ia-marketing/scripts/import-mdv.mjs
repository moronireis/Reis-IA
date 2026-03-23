#!/usr/bin/env node
/**
 * Reis Marketing IA — MDV Lead Import Script
 * Reads leads from ~/Downloads/novos leads/ and imports as mdv-* type.
 *
 * Usage:
 *   node scripts/import-mdv.mjs [--dry-run] [--api-url=http://localhost:3000]
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { execSync } from 'child_process';

const LEADS_DIR = join(homedir(), 'Downloads', 'novos leads');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const API_URL = (args.find(a => a.startsWith('--api-url=')) || '').split('=')[1] || 'https://marketing.moronireis.com.br';

// ---------- CSV PARSER ----------
function parseCSV(text, delimiter = ',') {
  const rows = [];
  let current = '';
  let inQuotes = false;

  for (const rawLine of text.split('\n')) {
    if (inQuotes) {
      current += '\n' + rawLine;
    } else {
      current = rawLine;
    }
    inQuotes = (current.match(/"/g) || []).length % 2 !== 0;
    if (!inQuotes) {
      rows.push(parseCSVRow(current.trim(), delimiter));
      current = '';
    }
  }
  return rows.filter(r => r.length > 0 && r.some(cell => cell.trim()));
}

function parseCSVRow(line, delimiter) {
  const cells = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { current += '"'; i++; }
      else if (ch === '"') inQuotes = false;
      else current += ch;
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === delimiter) { cells.push(current.trim()); current = ''; }
      else current += ch;
    }
  }
  cells.push(current.trim());
  return cells;
}

function normalizeEmail(e) {
  return (e || '').toLowerCase().trim().replace(/^="?(.*?)"?$/, '$1');
}

function normalizePhone(p) {
  return (p || '').replace(/[^\d+]/g, '').replace(/^(\d{2})(\d+)/, '+$1$2');
}

function findColumn(headers, ...patterns) {
  for (const pattern of patterns) {
    const idx = headers.findIndex(h =>
      h.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .includes(pattern.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    );
    if (idx !== -1) return idx;
  }
  return -1;
}

// ---------- PARSE HOTPAY/HOTMART SALES CSV (semicolon-delimited) ----------
function parseHotpaySales(text) {
  const rows = parseCSV(text, ';');
  if (rows.length < 2) return [];

  const headers = rows[0];
  const nameIdx = findColumn(headers, 'nome', 'nome do cliente');
  const emailIdx = findColumn(headers, 'email');
  const phoneIdx = findColumn(headers, 'telefone');
  const dddIdx = findColumn(headers, 'ddd');
  const dateIdx = findColumn(headers, 'data de venda', 'data da venda');
  const statusIdx = findColumn(headers, 'status');
  const productIdx = findColumn(headers, 'nome do produto');
  const valueIdx = findColumn(headers, 'preco do produto', 'valor pago', 'preco total');
  const instaIdx = findColumn(headers, 'instagram');
  const docIdx = findColumn(headers, 'documento');

  // Only keep items that are NOT the header row and have a name
  // Find the actual "Nome" column for buyer name (different from "Nome do Produto")
  // In this format: column index 19 = "Nome" (buyer), 20 = "Documento", 21 = "Email"
  let buyerNameIdx = -1;
  let buyerDocIdx = -1;
  let buyerEmailIdx = -1;
  let buyerDDDIdx = -1;
  let buyerPhoneIdx = -1;

  // The buyer fields come after status in Hotpay exports
  for (let i = 0; i < headers.length; i++) {
    const h = headers[i].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (h === 'nome' && i > 10) buyerNameIdx = i; // buyer name is later in the row
    if (h === 'documento' && i > 10) buyerDocIdx = i;
    if (h === 'email' && i > 10) buyerEmailIdx = i;
    if (h === 'ddd' && i > 10) buyerDDDIdx = i;
    if (h === 'telefone' && i > 10) buyerPhoneIdx = i;
  }

  // Fallback
  if (buyerNameIdx === -1) buyerNameIdx = nameIdx;
  if (buyerEmailIdx === -1) buyerEmailIdx = emailIdx;

  return rows.slice(1).map(row => {
    const status = (row[statusIdx] || '').trim();
    const name = (row[buyerNameIdx] || '').trim();
    const email = normalizeEmail(row[buyerEmailIdx] || '');
    const ddd = (row[buyerDDDIdx] || '').trim();
    const phone = normalizePhone(ddd + (row[buyerPhoneIdx] || ''));
    const instagram = (row[instaIdx] !== undefined ? row[instaIdx] : '').replace(/^@/, '').trim();

    return {
      source: 'mdv-compradores',
      source_label: 'MDV - Compradores',
      name,
      email,
      phone,
      instagram,
      created_at: row[dateIdx] || '',
      data: {
        produto: row[productIdx] || '',
        status_compra: status,
        valor_pago: row[valueIdx] || '',
        tipo_lista: 'comprador-mdv'
      },
      tags: ['comprador', 'mdv']
    };
  }).filter(l => (l.name || l.email) && l.data.status_compra === 'Aprovado');
}

// ---------- PARSE TALLY XLSX (converted to CSV by xlsx-cli) ----------
function parseTallyOnboarding(text) {
  const rows = parseCSV(text, ',');
  if (rows.length < 2) return [];

  const headers = rows[0];
  const nameIdx = findColumn(headers, 'nome');
  const emailIdx = findColumn(headers, 'email', 'e-mail');
  const phoneIdx = findColumn(headers, 'whatsapp', 'telefone');
  const instaIdx = findColumn(headers, 'instagram');
  const dateIdx = findColumn(headers, 'submitted at');

  return rows.slice(1).map(row => {
    const extraData = {};
    headers.forEach((h, i) => {
      if (![nameIdx, emailIdx, phoneIdx, instaIdx, dateIdx].includes(i) && i > 2 && row[i]) {
        const key = h.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/[?!.,:;]/g, '').trim().replace(/\s+/g, '_').toLowerCase().substring(0, 80);
        if (key && row[i].trim()) extraData[key] = row[i].trim();
      }
    });

    return {
      source: 'mdv-onboarding',
      source_label: 'MDV - Onboarding',
      name: row[nameIdx] || '',
      email: normalizeEmail(row[emailIdx] || ''),
      phone: normalizePhone(row[phoneIdx] || ''),
      instagram: (row[instaIdx] || '').replace(/^@/, '').trim(),
      created_at: row[dateIdx] || '',
      data: { ...extraData, tipo_lista: 'onboarding-mdv' },
      tags: ['mdv']
    };
  }).filter(l => l.name || l.email);
}

// ---------- DUPLICATE DETECTION ----------
function detectDuplicates(leads) {
  const emailMap = new Map();
  const phoneMap = new Map();
  let dupCount = 0;

  leads.forEach((lead, idx) => {
    if (lead.email) {
      if (!emailMap.has(lead.email)) emailMap.set(lead.email, []);
      emailMap.get(lead.email).push(idx);
    }
    if (lead.phone && lead.phone.length > 8) {
      if (!phoneMap.has(lead.phone)) phoneMap.set(lead.phone, []);
      phoneMap.get(lead.phone).push(idx);
    }
  });

  for (const [, indices] of emailMap) {
    if (indices.length > 1) {
      indices.slice(1).forEach(idx => {
        if (!leads[idx].tags.includes('duplicado')) {
          leads[idx].tags.push('duplicado');
          dupCount++;
        }
      });
    }
  }
  for (const [, indices] of phoneMap) {
    if (indices.length > 1) {
      indices.slice(1).forEach(idx => {
        if (!leads[idx].tags.includes('duplicado')) {
          leads[idx].tags.push('duplicado');
          dupCount++;
        }
      });
    }
  }
  return dupCount;
}

// ---------- MAIN ----------
async function main() {
  console.log('=== Reis IA — MDV Lead Import ===\n');
  console.log(`Source: ${LEADS_DIR}`);
  console.log(`API: ${API_URL}`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE IMPORT'}\n`);

  let allLeads = [];

  // 1. Parse sales CSV (semicolon-delimited Hotpay)
  const csvFiles = readdirSync(LEADS_DIR).filter(f => f.endsWith('.csv'));
  for (const file of csvFiles) {
    const text = readFileSync(join(LEADS_DIR, file), 'utf-8').replace(/^\uFEFF/, '');
    const leads = parseHotpaySales(text);
    console.log(`  ${file}`);
    console.log(`    Format: hotpay-sales | Leads: ${leads.length} (aprovados)`);
    allLeads = allLeads.concat(leads);
  }

  // 2. Parse XLSX (convert via xlsx-cli, then parse as Tally CSV)
  const xlsxFiles = readdirSync(LEADS_DIR).filter(f => f.endsWith('.xlsx'));
  for (const file of xlsxFiles) {
    try {
      const csvText = execSync(`npx -y xlsx-cli "${join(LEADS_DIR, file)}"`, { encoding: 'utf-8', timeout: 15000 });
      const leads = parseTallyOnboarding(csvText);
      console.log(`  ${file}`);
      console.log(`    Format: tally-xlsx | Leads: ${leads.length}`);
      allLeads = allLeads.concat(leads);
    } catch (err) {
      console.error(`  ERROR parsing ${file}:`, err.message);
    }
  }

  console.log(`\nTotal MDV leads: ${allLeads.length}`);

  const dupCount = detectDuplicates(allLeads);
  console.log(`Duplicates within MDV: ${dupCount}`);

  const bySource = {};
  allLeads.forEach(l => { bySource[l.source_label] = (bySource[l.source_label] || 0) + 1; });
  console.log('\n--- By Source ---');
  Object.entries(bySource).forEach(([s, c]) => console.log(`  ${s}: ${c}`));

  if (DRY_RUN) {
    console.log('\n[DRY RUN] No data sent.');
    console.log('\nSample lead:');
    console.log(JSON.stringify(allLeads[0], null, 2));
    return;
  }

  // Send to API
  console.log(`\nImporting ${allLeads.length} MDV leads...`);
  const response = await fetch(`${API_URL}/api/import-leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ leads: allLeads })
  });
  const result = await response.json();
  console.log('\nResult:', JSON.stringify(result, null, 2));
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
