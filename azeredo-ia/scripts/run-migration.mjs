#!/usr/bin/env node
/**
 * Runner genérico de migrações — aplica um arquivo de supabase/ no Cloudfy
 * via endpoint /pg/query. Divide no sentinel "-- ==== STATEMENT ====" para
 * corpos dollar-quoted de function sobreviverem inteiros (nunca divide em ';').
 *
 * Uso: node scripts/run-migration.mjs migration-v12-confianca-disparo.sql
 * Creds: PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY do .env.local
 * (generalização do run-migration-v11.mjs — mantido como histórico)
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, basename } from 'path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const file = process.argv[2];
if (!file) { console.error('Uso: node scripts/run-migration.mjs <arquivo em supabase/>'); process.exit(1); }

// ── env (valores podem vir com aspas e um "\n" literal do vercel pull) ───────
const env = {};
for (const line of readFileSync(join(ROOT, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '').replace(/\\[rn]/g, '').trim();
}
const URL = (env.PUBLIC_SUPABASE_URL || '').replace(/\/$/, '');
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) { console.error('Faltam PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY no .env.local'); process.exit(1); }

const sql = readFileSync(join(ROOT, 'supabase', basename(file)), 'utf8');
const chunks = sql.split(/^--\s*={2,}\s*STATEMENT\s*={2,}.*$/m)
  .map(s => s.trim())
  .filter(Boolean);

console.log(`Aplicando ${basename(file)} → ${URL} (${chunks.length} statements)\n`);

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

console.log(failed ? '\nMigração terminou COM ERROS.' : '\nMigração aplicada com sucesso.');
process.exit(failed ? 1 : 0);
