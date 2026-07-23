#!/usr/bin/env node
/**
 * Applies supabase/migration-v11-metrics.sql to the Cloudfy Supabase via the
 * /pg/query convenience endpoint. Splits on the "-- ==== STATEMENT ====" sentinel
 * so dollar-quoted function bodies are sent whole (never split on ';').
 *
 * Usage: node scripts/run-migration-v11.mjs
 * Creds: reads PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from .env.local
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// ── env ──────────────────────────────────────────────────────────────────────
const env = {};
for (const line of readFileSync(join(ROOT, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) {
    // Values may be quoted and carry a stray literal "\n" escape before the
    // closing quote (dotenv expands it at runtime; here we strip it).
    env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '').replace(/\\[rn]/g, '').trim();
  }
}
const URL = (env.PUBLIC_SUPABASE_URL || '').replace(/\/$/, '');
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) { console.error('Missing PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local'); process.exit(1); }

const sql = readFileSync(join(ROOT, 'supabase', 'migration-v11-metrics.sql'), 'utf8');
const chunks = sql.split(/^--\s*={2,}\s*STATEMENT\s*={2,}.*$/m)
  .map(s => s.trim())
  .filter(Boolean);

console.log(`Applying migration-v11-metrics.sql → ${URL} (${chunks.length} statements)\n`);

let failed = false;
for (let i = 0; i < chunks.length; i++) {
  const label = chunks[i].split('\n').find(l => l.trim() && !l.trim().startsWith('--'))?.slice(0, 64) || `stmt ${i + 1}`;
  const res = await fetch(`${URL}/pg/query`, {
    method: 'POST',
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: chunks[i] }),
  });
  const text = await res.text();
  if (res.ok) {
    console.log(`  [OK]   #${i + 1}  ${label}`);
  } else {
    failed = true;
    console.error(`  [FAIL] #${i + 1}  ${label}\n         ${res.status} ${text.slice(0, 300)}`);
  }
}

console.log(failed ? '\nMigration finished WITH ERRORS.' : '\nMigration applied successfully.');
process.exit(failed ? 1 : 0);
