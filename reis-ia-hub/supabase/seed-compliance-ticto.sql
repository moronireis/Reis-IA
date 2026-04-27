-- ==========================================================================
-- REIS IA [HUB] — Compliance Test User for Ticto
-- ==========================================================================
-- Run this AFTER:
--   1. migration-agentes-ia.sql is applied
--   2. The user 'compliance-ticto@moronireis.com.br' has been registered via
--      the public registration page at /register on the deployed Hub.
--      (Supabase auth.users cannot be created from a SQL editor without the
--      service-role HTTP API.)
--
-- This script grants that user the 'agentes_ia' entitlement so the Ticto
-- compliance team can log in, navigate to /agentes-ia and /academy, watch
-- the lessons, and verify the integration meets their approval criteria.
--
-- Idempotent: safe to re-run.
-- ==========================================================================

-- 1. Grant the 'agentes_ia' entitlement to the compliance test user
insert into public.entitlements (user_id, product_code, source, external_order_id, status, metadata)
select
  p.id,
  'agentes_ia',
  'manual',
  'compliance-ticto-test',
  'active',
  jsonb_build_object(
    'purpose', 'ticto-compliance-review',
    'created_for', 'Ticto compliance team verification',
    'created_at', now()::text
  )
from public.profiles p
where p.email = 'compliance-ticto@moronireis.com.br'
on conflict (user_id, product_code, external_order_id) do update
  set status = 'active', revoked_at = null, updated_at = now();

-- 2. Verify the entitlement was created
select
  p.email,
  e.product_code,
  e.status,
  e.source,
  e.external_order_id,
  e.granted_at,
  e.metadata
from public.entitlements e
join public.profiles p on p.id = e.user_id
where p.email = 'compliance-ticto@moronireis.com.br'
  and e.product_code = 'agentes_ia';

-- ─── Optional: revoke after Ticto approves the product ─────────────────
-- update public.entitlements
-- set status = 'expired', revoked_at = now()
-- where external_order_id = 'compliance-ticto-test';

-- ─── Optional: also delete the test auth user entirely ────────────────
-- (run this from Supabase Dashboard → Authentication → Users → Delete)
