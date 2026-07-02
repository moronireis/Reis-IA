-- ===========================================
-- AZEREDO IA — Migration v5
-- Mass-send queue hardening + inbound webhook fix
-- ===========================================

-- 1. Recipients: allow 'processing' status (worker claim state)
alter table az_campaign_recipients drop constraint if exists az_campaign_recipients_status_check;
alter table az_campaign_recipients add constraint az_campaign_recipients_status_check
  check (status in ('pending','processing','sent','delivered','read','failed','skipped'));

-- 2. Recipients: worker claim timestamp (stale-claim recovery)
alter table az_campaign_recipients add column if not exists claimed_at timestamptz;

-- 3. Recipients: one row per campaign+contact (idempotent upsert, safe resend)
create unique index if not exists az_recipients_campaign_contact_unique
  on az_campaign_recipients(campaign_id, contact_id);

-- 4. Campaigns: worker lease — guarantees a single active worker per campaign
alter table az_campaigns add column if not exists processing_until timestamptz;

-- 5. Fast pending-queue lookup
create index if not exists idx_az_recipients_pending
  on az_campaign_recipients(campaign_id) where status = 'pending';

-- 6. Inbound webhook fix: the webhook writes sent_at but the column never existed
alter table az_messages add column if not exists sent_at timestamptz;
