/**
 * Migration runner — applies a versioned SQL file from migrations/ to Supabase.
 * Usage: node scripts/apply-migration.js migrations/002_generated_cvs.sql
 *
 * Reads SUPABASE_URL + SUPABASE_SERVICE_KEY from env (or .env.local fallback).
 * Only accepts files inside the migrations/ directory — no ad-hoc SQL.
 */
import { readFileSync, existsSync } from 'fs';
import { resolve, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ── Load env (fallback to .env.local) ──────────────────────────────
function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const idx = line.indexOf('=');
    if (idx <= 0 || line.trim().startsWith('#')) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '').replace(/\\n$/g, '').trim();
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnvFile(resolve(root, '.env.local'));

const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_KEY in env.');
  process.exit(1);
}

// ── Validate argument: must be a file inside migrations/ ───────────
const arg = process.argv[2];
if (!arg) {
  console.error('Usage: node scripts/apply-migration.js migrations/<file>.sql');
  process.exit(1);
}
const migPath = resolve(root, arg);
if (!migPath.startsWith(resolve(root, 'migrations')) || !migPath.endsWith('.sql')) {
  console.error('Refused: only .sql files inside migrations/ are allowed.');
  process.exit(1);
}
if (!existsSync(migPath)) {
  console.error(`File not found: ${migPath}`);
  process.exit(1);
}

const sql = readFileSync(migPath, 'utf8');

// ── Execute via Supabase pg/query endpoint ──────────────────────────
const res = await fetch(`${SUPABASE_URL}/pg/query`, {
  method: 'POST',
  headers: {
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: sql }),
});

const body = await res.text();
console.log(`[migration] ${basename(migPath)} → HTTP ${res.status}`);
console.log(body.slice(0, 500));
process.exit(res.ok ? 0 : 1);
