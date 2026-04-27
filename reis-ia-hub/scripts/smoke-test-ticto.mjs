#!/usr/bin/env node
/**
 * Ticto integration smoke test — runs end-to-end against a deployed Hub.
 *
 * Tests:
 *   1. Healthcheck       — GET  /api/health/agentes-ia
 *   2. Webhook 401       — POST /api/webhook/ticto with bad token  (expect 401)
 *   3. Webhook approve   — POST purchase.approved (expect 200, entitlement created)
 *   4. Webhook idempotent — repeat #3 (expect deduplicated:true)
 *   5. Webhook refund    — POST purchase.refunded (expect 200, entitlement revoked)
 *   6. Cleanup hint      — prints the SQL to delete the test artifacts
 *
 * Usage:
 *   HUB_URL=https://reis-ia-hub.vercel.app \
 *   TICTO_WEBHOOK_TOKEN=<your-token> \
 *   TEST_EMAIL=moroni+smoke@moronireis.com.br \
 *     node scripts/smoke-test-ticto.mjs
 *
 * Or via npm:
 *   npm run smoke-test:ticto
 */

const HUB_URL = (process.env.HUB_URL || 'https://reis-ia-hub.vercel.app').replace(/\/$/, '');
const TOKEN = process.env.TICTO_WEBHOOK_TOKEN || '';
const TEST_EMAIL = process.env.TEST_EMAIL || `smoke+${Date.now()}@moronireis.com.br`;
const TEST_ORDER_ID = process.env.TEST_ORDER_ID || `smoke-${Date.now()}`;
const PRODUCT_ID = process.env.TEST_PRODUCT_ID || 'agentes-ia-smoke';

const c = {
  reset: '\x1b[0m', dim: '\x1b[2m', bold: '\x1b[1m',
  red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', cyan: '\x1b[36m',
};

let passed = 0;
let failed = 0;
const results = [];

function log(label, status, detail = '') {
  const icon = status === 'pass' ? `${c.green}✓${c.reset}` : status === 'fail' ? `${c.red}✗${c.reset}` : `${c.yellow}…${c.reset}`;
  console.log(`  ${icon} ${label}${detail ? `  ${c.dim}${detail}${c.reset}` : ''}`);
  if (status === 'pass') passed++;
  if (status === 'fail') failed++;
  results.push({ label, status, detail });
}

function header(text) {
  console.log(`\n${c.bold}${c.cyan}── ${text} ──${c.reset}`);
}

async function fetchJson(method, path, { headers = {}, body, expectJson = true } = {}) {
  const res = await fetch(`${HUB_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = null;
  if (expectJson) {
    try { data = await res.json(); } catch { /* not json */ }
  }
  return { status: res.status, data };
}

console.log(`\n${c.bold}REIS [IA] · AGENTES [IA] — Smoke Test${c.reset}`);
console.log(`${c.dim}Target: ${HUB_URL}${c.reset}`);
console.log(`${c.dim}Test email: ${TEST_EMAIL}${c.reset}`);
console.log(`${c.dim}Test order: ${TEST_ORDER_ID}${c.reset}`);

if (!TOKEN) {
  console.log(`${c.red}\nFATAL: TICTO_WEBHOOK_TOKEN env var is required.${c.reset}`);
  process.exit(2);
}

(async () => {
  // ─── 1. Healthcheck ───
  header('1. Healthcheck');
  try {
    const { status, data } = await fetchJson('GET', '/api/health/agentes-ia');
    if (status === 200 && data?.ok === true) {
      log('endpoint reachable', 'pass', `HTTP ${status}`);
      log(`  supabase: ${data.checks.supabase}`, data.checks.supabase === 'ok' ? 'pass' : 'fail');
      log(`  course_seeded: ${data.checks.course_seeded}`, data.checks.course_seeded ? 'pass' : 'fail');
      log(`  space_seeded: ${data.checks.space_seeded}`, data.checks.space_seeded ? 'pass' : 'fail');
      log(`  webhook_configured: ${data.checks.webhook_configured}`, data.checks.webhook_configured ? 'pass' : 'fail');
      log(`  resend_configured: ${data.checks.resend_configured}`, data.checks.resend_configured ? 'pass' : 'fail');
    } else {
      log('endpoint reachable', 'fail', `HTTP ${status} | body: ${JSON.stringify(data)}`);
    }
  } catch (e) {
    log('endpoint reachable', 'fail', e.message);
  }

  // ─── 2. Webhook auth — bad token must 401 ───
  header('2. Webhook rejects bad token (401)');
  try {
    const { status } = await fetchJson('POST', '/api/webhook/ticto', {
      body: { token: 'WRONG-TOKEN', status: 'approved', order_id: 'unauth-test', customer: { email: 'x@x.com' } },
    });
    if (status === 401) log('returns 401 with bad token', 'pass');
    else log('returns 401 with bad token', 'fail', `expected 401, got ${status}`);
  } catch (e) {
    log('returns 401 with bad token', 'fail', e.message);
  }

  // ─── 3. Webhook purchase.approved ───
  header('3. Webhook handles purchase.approved');
  try {
    const { status, data } = await fetchJson('POST', '/api/webhook/ticto', {
      body: {
        token: TOKEN,
        status: 'approved',
        order_id: TEST_ORDER_ID,
        customer: { name: 'Smoke Test', email: TEST_EMAIL },
        items: [{ product_id: PRODUCT_ID, product_name: 'AGENTES [IA] (smoke)' }],
        payment_method: 'pix',
        total: 47.00,
      },
    });
    if (status === 200 && data?.ok === true && data?.event === 'purchase.approved') {
      log('200 + ok=true', 'pass', `event=${data.event}`);
      log('product_code resolved', data?.product_code === 'agentes_ia' ? 'pass' : 'fail', `code=${data?.product_code}`);
      log('entitlement provisioned', data?.provisioned?.entitlement_id ? 'pass' : 'fail');
    } else {
      log('200 + ok=true', 'fail', `HTTP ${status} | body: ${JSON.stringify(data).slice(0, 200)}`);
    }
  } catch (e) {
    log('webhook approve', 'fail', e.message);
  }

  // ─── 4. Idempotency ───
  header('4. Webhook is idempotent (replay safe)');
  try {
    const { status, data } = await fetchJson('POST', '/api/webhook/ticto', {
      body: {
        token: TOKEN,
        status: 'approved',
        order_id: TEST_ORDER_ID,
        customer: { name: 'Smoke Test', email: TEST_EMAIL },
        items: [{ product_id: PRODUCT_ID, product_name: 'AGENTES [IA] (smoke)' }],
        payment_method: 'pix',
        total: 47.00,
      },
    });
    if (status === 200 && data?.deduplicated === true) {
      log('replay returns deduplicated:true', 'pass');
    } else {
      log('replay returns deduplicated:true', 'fail', `body: ${JSON.stringify(data).slice(0, 200)}`);
    }
  } catch (e) {
    log('idempotency', 'fail', e.message);
  }

  // ─── 5. Refund ───
  header('5. Webhook handles purchase.refunded');
  try {
    const { status, data } = await fetchJson('POST', '/api/webhook/ticto', {
      body: { token: TOKEN, status: 'refunded', order_id: TEST_ORDER_ID },
    });
    if (status === 200 && data?.ok === true && data?.event === 'purchase.refunded') {
      log('200 + entitlement revoked', 'pass', `revoked_count=${data?.revoked?.revoked_count}`);
    } else {
      log('refund handler', 'fail', `HTTP ${status} | body: ${JSON.stringify(data).slice(0, 200)}`);
    }
  } catch (e) {
    log('refund', 'fail', e.message);
  }

  // ─── Summary ───
  const total = passed + failed;
  console.log(`\n${c.bold}── Summary ──${c.reset}`);
  console.log(`  ${c.green}passed: ${passed}${c.reset}  ${failed > 0 ? c.red : c.dim}failed: ${failed}${c.reset}  total: ${total}`);

  if (failed === 0) {
    console.log(`\n${c.green}${c.bold}✓ All smoke tests passed.${c.reset}`);
    console.log(`\n${c.dim}Cleanup the test artifacts in Supabase SQL Editor:${c.reset}`);
    console.log(`${c.cyan}delete from public.webhook_events where external_id = '${TEST_ORDER_ID}';${c.reset}`);
    console.log(`${c.cyan}delete from public.entitlements where external_order_id = '${TEST_ORDER_ID}';${c.reset}`);
    console.log(`${c.cyan}delete from auth.users where email = '${TEST_EMAIL}';${c.reset}\n`);
  } else {
    console.log(`\n${c.red}${c.bold}✗ Smoke test failed. See details above.${c.reset}\n`);
  }

  process.exit(failed === 0 ? 0 : 1);
})().catch((err) => {
  console.error(`${c.red}Unhandled error:${c.reset}`, err);
  process.exit(2);
});
