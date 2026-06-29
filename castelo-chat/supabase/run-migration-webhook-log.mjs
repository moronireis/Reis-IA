import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const sql = readFileSync(join(__dir, 'migration-webhook-log.sql'), 'utf8')
  .split('\n').filter(l => l.trim() && !l.trim().startsWith('--')).join('\n');

const SUPABASE_URL = 'https://weirdpigeon-supabase.cloudfy.live';
const SERVICE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3NzM3Njg1MTYsImV4cCI6MTgwNTMwNDUxNn0.Hziwx8ocWnFVLHvt5DhT8nTkL2XVMa58ofjL-0hCMxw';

const res = await fetch(`${SUPABASE_URL}/pg/query`, {
  method: 'POST',
  headers: { 'apikey': SERVICE_KEY, 'Authorization': `Bearer ${SERVICE_KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: sql }),
});
const text = await res.text();
if (res.ok) { console.log('Migration applied.'); }
else { console.error('Failed:', res.status, text); process.exit(1); }
