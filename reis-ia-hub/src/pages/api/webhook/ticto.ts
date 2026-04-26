/**
 * POST /api/webhook/ticto
 *
 * Receives Ticto purchase events for AGENTES [IA] (and any other Ticto product).
 * Idempotent: same external_order_id processed once thanks to webhook_events
 * unique index + provision_ticto_purchase ON CONFLICT.
 *
 * Auth (one of):
 *   - Header `X-Webhook-Token` matching env TICTO_WEBHOOK_TOKEN, OR
 *   - Header `X-Ticto-Signature` HMAC-SHA256 of raw body using TICTO_WEBHOOK_SECRET
 *     (use whichever Ticto exposes; both supported).
 *
 * Events handled:
 *   purchase.approved  → grants entitlement, creates Supabase auth user (if new),
 *                         dispatches welcome magic-link email.
 *   purchase.refunded  → revokes entitlement.
 *   purchase.chargeback → revokes entitlement (chargeback status).
 *   purchase.canceled  → revokes entitlement (canceled status).
 *
 * Product mapping: Ticto product_id → internal product_code (env-configurable).
 * Default mapping: any unknown product_id falls back to 'agentes_ia'.
 */

import type { APIRoute } from 'astro';
import crypto from 'node:crypto';
import { createServerClient } from '../../../lib/supabase-server';
import { sendAgentesIaWelcomeEmail } from '../../../lib/email-agentes-ia';

// ─── Type definitions ─────────────────────────────────────────
interface TictoCustomer {
  name?: string;
  email?: string;
  document?: string;
}

interface TictoItem {
  product_id?: string | number;
  product_name?: string;
  amount?: number;
}

interface TictoPayload {
  event?: string;                    // e.g. "purchase.approved"
  status?: string;                   // alt source of event
  order_id?: string | number;
  transaction_hash?: string;         // alt order id used by some Ticto webhooks
  customer?: TictoCustomer;
  items?: TictoItem[];
  product?: TictoItem;               // single-item alt schema
  payment_method?: string;
  total?: number;
  // some Ticto setups send these flat
  buyer_email?: string;
  buyer_name?: string;
  product_id?: string | number;
  refund_reason?: string;
  [k: string]: unknown;
}

// ─── Helpers ──────────────────────────────────────────────────
function pickEvent(payload: TictoPayload): string {
  const raw = (payload.event || payload.status || '').toString().toLowerCase().trim();
  if (!raw) return '';
  // Normalize common Ticto variants → canonical event names
  if (['authorized', 'approved', 'purchase.approved', 'order.approved', 'paid'].includes(raw)) return 'purchase.approved';
  if (['refunded', 'purchase.refunded', 'order.refunded'].includes(raw)) return 'purchase.refunded';
  if (['chargeback', 'purchase.chargeback'].includes(raw)) return 'purchase.chargeback';
  if (['canceled', 'cancelled', 'purchase.canceled', 'purchase.cancelled'].includes(raw)) return 'purchase.canceled';
  return raw;
}

function pickOrderId(payload: TictoPayload): string {
  return String(
    payload.order_id ?? payload.transaction_hash ?? payload['hash'] ?? payload['id'] ?? ''
  ).trim();
}

function pickEmail(payload: TictoPayload): string {
  return (payload.customer?.email ?? payload.buyer_email ?? '').toString().trim().toLowerCase();
}

function pickName(payload: TictoPayload): string {
  return (payload.customer?.name ?? payload.buyer_name ?? '').toString().trim();
}

function pickProductId(payload: TictoPayload): string {
  const item = payload.items?.[0] ?? payload.product;
  return String(item?.product_id ?? payload.product_id ?? '').trim();
}

function resolveProductCode(productId: string): string {
  // Map Ticto product IDs to internal product_codes via env.
  // TICTO_PRODUCT_MAP format: "12345=agentes_ia,67890=comunidade_497"
  const raw = (import.meta.env.TICTO_PRODUCT_MAP as string | undefined) || '';
  const map: Record<string, string> = {};
  for (const pair of raw.split(',')) {
    const [k, v] = pair.split('=').map((s) => s?.trim());
    if (k && v) map[k] = v;
  }
  return map[productId] || 'agentes_ia'; // fallback for the only product live today
}

function verifyHmac(rawBody: string, signature: string | null, secret: string | undefined): boolean {
  if (!secret || !signature) return false;
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  // Accept both raw hex and "sha256=<hex>" formats
  const provided = signature.replace(/^sha256=/i, '');
  if (expected.length !== provided.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(provided, 'hex'));
  } catch {
    return false;
  }
}

const jsonHeaders = { 'Content-Type': 'application/json' } as const;
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

// ─── Route handler ────────────────────────────────────────────
export const POST: APIRoute = async ({ request }) => {
  const rawBody = await request.text();

  // 1) AUTH — accept token OR HMAC signature
  const tokenHeader = request.headers.get('x-webhook-token') || request.headers.get('x-ticto-token');
  const signatureHeader = request.headers.get('x-ticto-signature') || request.headers.get('x-hub-signature-256');
  const tokenEnv = import.meta.env.TICTO_WEBHOOK_TOKEN as string | undefined;
  const secretEnv = import.meta.env.TICTO_WEBHOOK_SECRET as string | undefined;

  const tokenOk = !!tokenEnv && tokenHeader === tokenEnv;
  const sigOk = verifyHmac(rawBody, signatureHeader, secretEnv);

  if (!tokenOk && !sigOk) {
    return json({ error: 'Unauthorized webhook' }, 401);
  }

  // 2) PARSE
  let payload: TictoPayload;
  try {
    payload = JSON.parse(rawBody) as TictoPayload;
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const event = pickEvent(payload);
  const orderId = pickOrderId(payload);
  const email = pickEmail(payload);
  const name = pickName(payload) || (email ? email.split('@')[0] : 'Aluno(a)');
  const productId = pickProductId(payload);
  const productCode = resolveProductCode(productId);

  if (!event || !orderId) {
    return json({ error: 'Missing event or order_id', event, orderId }, 400);
  }

  const supabase = createServerClient();

  // 3) AUDIT — record the inbound event (idempotent on source+external_id)
  const { data: existing } = await supabase
    .from('webhook_events')
    .select('id, status')
    .eq('source', 'ticto')
    .eq('external_id', orderId)
    .eq('event_type', event)
    .maybeSingle();

  if (existing && existing.status === 'processed') {
    return json({ ok: true, deduplicated: true, event, order_id: orderId });
  }

  const { data: eventRow, error: eventError } = await supabase
    .from('webhook_events')
    .insert({
      source: 'ticto',
      event_type: event,
      external_id: orderId,
      signature_valid: sigOk || tokenOk,
      status: 'received',
      payload,
    })
    .select('id')
    .single();

  if (eventError) {
    // Non-fatal — keep going so we still respond to Ticto
    console.error('[ticto webhook] event log failed', eventError);
  }

  const eventId = eventRow?.id as string | undefined;

  async function markEvent(status: 'processed' | 'failed' | 'ignored', error?: string) {
    if (!eventId) return;
    await supabase
      .from('webhook_events')
      .update({ status, error: error ?? null, processed_at: new Date().toISOString() })
      .eq('id', eventId);
  }

  // 4) HANDLE
  try {
    if (event === 'purchase.approved') {
      if (!email) {
        await markEvent('failed', 'missing buyer email');
        return json({ error: 'Missing buyer email' }, 400);
      }

      // Provision: ensure user, grant entitlement (idempotent inside the function)
      const { data: provData, error: provError } = await supabase.rpc('provision_ticto_purchase', {
        p_email: email,
        p_full_name: name,
        p_product_code: productCode,
        p_external_order_id: orderId,
        p_metadata: {
          payment_method: payload.payment_method,
          total: payload.total,
          ticto_product_id: productId,
          ticto_product_name: payload.items?.[0]?.product_name ?? payload.product?.product_name,
        },
      });

      if (provError) {
        await markEvent('failed', provError.message);
        return json({ error: 'Provisioning failed', details: provError.message }, 500);
      }

      // Ensure Supabase auth user exists (creates a passwordless one if missing)
      // This lets the magic link work the first time.
      let authUserId: string | undefined;
      try {
        const { data: existingUser } = await supabase.auth.admin.getUserById(
          (provData as { user_id?: string } | null)?.user_id ?? ''
        );
        authUserId = existingUser?.user?.id;
      } catch {
        // ignore
      }

      if (!authUserId) {
        const { data: created, error: createErr } = await supabase.auth.admin.createUser({
          email,
          email_confirm: true,
          user_metadata: { full_name: name, source: 'ticto', product_code: productCode },
        });
        if (createErr && !/already.*registered|exists/i.test(createErr.message)) {
          await markEvent('failed', `auth.createUser: ${createErr.message}`);
          return json({ error: 'Auth user create failed', details: createErr.message }, 500);
        }
        authUserId = created?.user?.id;
      }

      // Generate a magic link (1-click sign-in) and email it via Resend
      const redirectBase =
        (import.meta.env.AGENTES_IA_AREA_URL as string | undefined) ||
        'https://area.agentesia.moronireis.com.br';
      const { data: linkData, error: linkErr } = await supabase.auth.admin.generateLink({
        type: 'magiclink',
        email,
        options: { redirectTo: `${redirectBase}/academy/agentes-ia?welcome=1` },
      });
      if (linkErr) {
        await markEvent('failed', `generateLink: ${linkErr.message}`);
        return json({ error: 'Magic link failed', details: linkErr.message }, 500);
      }
      const actionLink = (linkData as { properties?: { action_link?: string } }).properties?.action_link;

      // Welcome email (branded AGENTES [IA])
      try {
        await sendAgentesIaWelcomeEmail({
          to: email,
          name,
          magicLink: actionLink || `${redirectBase}/login`,
          orderId,
        });
      } catch (e) {
        console.error('[ticto webhook] welcome email failed', e);
        // Do not fail the webhook for email issues — entitlement is granted.
      }

      await markEvent('processed');
      return json({
        ok: true,
        event,
        order_id: orderId,
        product_code: productCode,
        provisioned: provData,
      });
    }

    if (event === 'purchase.refunded' || event === 'purchase.chargeback' || event === 'purchase.canceled') {
      const reason = event === 'purchase.chargeback' ? 'chargeback' : event === 'purchase.canceled' ? 'cancel' : 'refund';
      const { data: revData, error: revError } = await supabase.rpc('revoke_ticto_purchase', {
        p_external_order_id: orderId,
        p_reason: reason,
      });
      if (revError) {
        await markEvent('failed', revError.message);
        return json({ error: 'Revoke failed', details: revError.message }, 500);
      }
      await markEvent('processed');
      return json({ ok: true, event, order_id: orderId, revoked: revData });
    }

    // Anything else → log and ignore (do not 4xx; Ticto retries forever)
    await markEvent('ignored', `unhandled event: ${event}`);
    return json({ ok: true, ignored: true, event, order_id: orderId });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await markEvent('failed', msg);
    return json({ error: 'Webhook handler crashed', details: msg }, 500);
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Webhook-Token, X-Ticto-Signature, X-Ticto-Token',
    },
  });
};

// Block GET — Ticto sends POST only
export const GET: APIRoute = async () => json({ error: 'Method not allowed. Use POST.' }, 405);
