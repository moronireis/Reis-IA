#!/usr/bin/env node
/**
 * Reis Marketing IA — Lead Import Script
 * Reads all CSVs from ~/Downloads/leads/, normalizes them,
 * detects duplicates, and sends to /api/import-leads endpoint.
 *
 * Usage:
 *   node scripts/import-leads.mjs [--dry-run] [--api-url=http://localhost:3000]
 */

import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { homedir } from 'os';

// ---------- CONFIG ----------
const LEADS_DIR = join(homedir(), 'Downloads', 'leads');
const DEFAULT_API_URL = 'https://marketing.moronireis.com.br';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const API_URL = (args.find(a => a.startsWith('--api-url=')) || '').split('=')[1] || DEFAULT_API_URL;

// ---------- CSV PARSER (handles quoted fields with newlines/commas) ----------
function parseCSV(text, delimiter = ',') {
  const rows = [];
  let current = '';
  let inQuotes = false;
  const lines = text.split('\n');

  for (const rawLine of lines) {
    if (inQuotes) {
      current += '\n' + rawLine;
    } else {
      current = rawLine;
    }

    const quoteCount = (current.match(/"/g) || []).length;
    inQuotes = quoteCount % 2 !== 0;

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
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === delimiter) {
        cells.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
  }
  cells.push(current.trim());
  return cells;
}

// ---------- NORMALIZERS ----------
function normalizePhone(phone) {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '').replace(/^(\d{2})(\d+)/, '+$1$2');
}

function normalizeEmail(email) {
  if (!email) return '';
  return email.toLowerCase().trim().replace(/^="?(.*?)"?$/, '$1');
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

// ---------- LIST PARSERS ----------

// Format 1: Tally-style form submissions
function parseTallyCSV(filename, text) {
  const rows = parseCSV(text);
  if (rows.length < 2) return [];

  const headers = rows[0];
  const nameIdx = findColumn(headers, 'nome');
  const emailIdx = findColumn(headers, 'email', 'e-mail');
  const phoneIdx = findColumn(headers, 'whatsapp', 'telefone', 'numero de whatsapp');
  const instaIdx = findColumn(headers, 'instagram');
  const dateIdx = findColumn(headers, 'submitted at');

  const sourceSlug = slugify(filename);
  const sourceLabel = filename.replace(/_Submissions.*/, '').replace(/\.[^.]+$/, '');

  return rows.slice(1).map(row => {
    const extraData = {};
    headers.forEach((h, i) => {
      if (![nameIdx, emailIdx, phoneIdx, instaIdx, dateIdx].includes(i) && i > 2 && row[i]) {
        const key = slugifyKey(h);
        if (key && row[i].trim()) extraData[key] = row[i].trim();
      }
    });

    return {
      source: sourceSlug,
      source_label: sourceLabel,
      name: row[nameIdx] || '',
      email: normalizeEmail(row[emailIdx] || ''),
      phone: normalizePhone(row[phoneIdx] || ''),
      instagram: (row[instaIdx] || '').replace(/^@/, '').trim(),
      created_at: row[dateIdx] || '',
      data: extraData,
      tags: []
    };
  }).filter(l => l.name || l.email || l.phone);
}

// Format 2: Hotmart/platform sales CSV
function parseHotmartCSV(filename, text) {
  const rows = parseCSV(text);
  if (rows.length < 2) return [];

  const headers = rows[0];
  const nameIdx = findColumn(headers, 'nome do cliente');
  const emailIdx = findColumn(headers, 'e-mail do cliente', 'email do cliente');
  const phoneIdx = findColumn(headers, 'telefone completo');
  const dateIdx = findColumn(headers, 'data do pedido');
  const statusIdx = findColumn(headers, 'status');
  const productIdx = findColumn(headers, 'nome do produto');
  const valueIdx = findColumn(headers, 'valor pago');

  const sourceSlug = slugify(filename);
  const sourceLabel = filename.replace(/\.[^.]+$/, '');

  return rows.slice(1).map(row => {
    return {
      source: sourceSlug,
      source_label: sourceLabel,
      name: row[nameIdx] || '',
      email: normalizeEmail(row[emailIdx] || ''),
      phone: normalizePhone(row[phoneIdx] || ''),
      instagram: '',
      created_at: row[dateIdx] || '',
      data: {
        produto: row[productIdx] || '',
        status_compra: row[statusIdx] || '',
        valor_pago: row[valueIdx] || '',
        tipo_lista: 'comprador'
      },
      tags: ['comprador']
    };
  }).filter(l => l.name || l.email);
}

// Format 3: LMS/member export (semicolon-delimited)
function parseLMSCSV(filename, text) {
  const delimiter = text.includes(';') ? ';' : ',';
  const rows = parseCSV(text, delimiter);
  if (rows.length < 2) return [];

  const headers = rows[0];
  const nameIdx = findColumn(headers, 'nome');
  const emailIdx = findColumn(headers, 'e-mail', 'email');
  const dateIdx = findColumn(headers, 'data da compra', 'primeiro acesso');
  const progressIdx = findColumn(headers, 'progresso');
  const engagementIdx = findColumn(headers, 'engajamento');
  const categoryIdx = findColumn(headers, 'categoria');
  const turmaIdx = findColumn(headers, 'turma');

  const sourceSlug = slugify(filename);
  const sourceLabel = filename.replace(/\.[^.]+$/, '');

  return rows.slice(1).map(row => {
    return {
      source: sourceSlug,
      source_label: sourceLabel,
      name: row[nameIdx] || '',
      email: normalizeEmail(row[emailIdx] || ''),
      phone: '',
      instagram: '',
      created_at: row[dateIdx] || '',
      data: {
        progresso: row[progressIdx] || '',
        engajamento: row[engagementIdx] || '',
        categoria: row[categoryIdx] || '',
        turma: row[turmaIdx] || '',
        tipo_lista: 'aluno'
      },
      tags: ['aluno']
    };
  }).filter(l => l.name || l.email);
}

// ---------- HELPERS ----------
function slugify(str) {
  return str
    .replace(/\.[^.]+$/, '')
    .replace(/_Submissions.*/, '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .substring(0, 60);
}

function slugifyKey(header) {
  return header
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[?!.,:;]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .toLowerCase()
    .substring(0, 80);
}

function detectFormat(filename, firstLine) {
  const lower = firstLine.toLowerCase();
  if (lower.includes('numero do pedido') || lower.includes('nome do produto')) return 'hotmart';
  if (firstLine.includes(';') && (lower.includes('progresso') || lower.includes('engajamento'))) return 'lms';
  return 'tally';
}

// ---------- DUPLICATE DETECTION ----------
function detectDuplicates(allLeads) {
  const emailMap = new Map();
  const phoneMap = new Map();

  allLeads.forEach((lead, idx) => {
    if (lead.email) {
      if (!emailMap.has(lead.email)) emailMap.set(lead.email, []);
      emailMap.get(lead.email).push(idx);
    }
    if (lead.phone && lead.phone.length > 8) {
      if (!phoneMap.has(lead.phone)) phoneMap.set(lead.phone, []);
      phoneMap.get(lead.phone).push(idx);
    }
  });

  // Mark duplicates
  let dupCount = 0;
  for (const [, indices] of emailMap) {
    if (indices.length > 1) {
      indices.forEach((idx, i) => {
        if (i > 0) {
          allLeads[idx].tags = [...(allLeads[idx].tags || []), 'duplicado'];
          dupCount++;
        }
      });
    }
  }
  for (const [, indices] of phoneMap) {
    if (indices.length > 1) {
      indices.forEach((idx, i) => {
        if (i > 0 && !(allLeads[idx].tags || []).includes('duplicado')) {
          allLeads[idx].tags = [...(allLeads[idx].tags || []), 'duplicado'];
          dupCount++;
        }
      });
    }
  }

  return dupCount;
}

// ---------- MAIN ----------
async function main() {
  console.log('=== Reis IA Lead Import ===\n');
  console.log(`Source: ${LEADS_DIR}`);
  console.log(`API: ${API_URL}`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE IMPORT'}\n`);

  const files = readdirSync(LEADS_DIR).filter(f => f.endsWith('.csv'));
  console.log(`Found ${files.length} CSV files\n`);

  let allLeads = [];

  for (const file of files) {
    const filePath = join(LEADS_DIR, file);
    const text = readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
    const firstLine = text.split('\n')[0];
    const format = detectFormat(file, firstLine);

    let leads;
    switch (format) {
      case 'hotmart':
        leads = parseHotmartCSV(file, text);
        break;
      case 'lms':
        leads = parseLMSCSV(file, text);
        break;
      default:
        leads = parseTallyCSV(file, text);
    }

    console.log(`  ${file}`);
    console.log(`    Format: ${format} | Leads: ${leads.length}`);

    allLeads = allLeads.concat(leads);
  }

  console.log(`\nTotal leads parsed: ${allLeads.length}`);

  // Detect duplicates
  const dupCount = detectDuplicates(allLeads);
  console.log(`Duplicates found: ${dupCount}`);

  // Summary by source
  const bySource = {};
  allLeads.forEach(l => {
    bySource[l.source_label] = (bySource[l.source_label] || 0) + 1;
  });
  console.log('\n--- Summary by Source ---');
  Object.entries(bySource).sort((a, b) => b[1] - a[1]).forEach(([source, count]) => {
    console.log(`  ${source}: ${count}`);
  });

  const tagCounts = {};
  allLeads.forEach(l => (l.tags || []).forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
  console.log('\n--- Tags ---');
  Object.entries(tagCounts).forEach(([tag, count]) => {
    console.log(`  ${tag}: ${count}`);
  });

  if (DRY_RUN) {
    console.log('\n[DRY RUN] No data sent. Remove --dry-run to import.');
    // Output sample
    console.log('\nSample lead:');
    console.log(JSON.stringify(allLeads[0], null, 2));
    return;
  }

  // Send to API
  console.log(`\nImporting ${allLeads.length} leads...`);

  const response = await fetch(`${API_URL}/api/import-leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ leads: allLeads })
  });

  const result = await response.json();
  console.log('\nResult:', JSON.stringify(result, null, 2));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
