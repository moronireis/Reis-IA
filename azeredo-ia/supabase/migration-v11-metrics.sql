-- ===========================================
-- AZEREDO IA — Migration v11
-- Metrics dashboard (v2): delivery/read timestamps + aggregation RPCs
-- ===========================================
-- Statements are split by the "-- ==== STATEMENT ====" sentinel so the
-- runner (scripts/run-migration-v11.mjs) can POST each chunk to /pg/query
-- independently (dollar-quoted function bodies survive intact).

-- 1. Delivery/read timestamps on recipients (unlock time-series of delivery
--    & read, not just current status). Backfill best-effort from sent_at so
--    historical campaigns still populate the funnel.
alter table az_campaign_recipients add column if not exists delivered_at timestamptz;
alter table az_campaign_recipients add column if not exists read_at timestamptz;

create index if not exists idx_az_recipients_sent_at on az_campaign_recipients(sent_at);

update az_campaign_recipients
  set delivered_at = coalesce(delivered_at, sent_at)
  where status in ('delivered','read') and delivered_at is null and sent_at is not null;

update az_campaign_recipients
  set read_at = coalesce(read_at, sent_at)
  where status = 'read' and read_at is null and sent_at is not null;

-- ==== STATEMENT ====

-- 2. Daily series (cohort by send day, BRT). Sends/delivered/read/replied/failed
--    per day for the chart. Bucketed by coalesce(sent_at, created_at) so failed
--    rows (which may lack sent_at) still land on a day.
create or replace function az_metrics_series(p_from timestamptz, p_to timestamptz)
returns table(day date, sent bigint, delivered bigint, read_ct bigint, replied bigint, failed bigint)
language sql
stable
as $func$
  select
    (coalesce(r.sent_at, r.created_at) at time zone 'America/Sao_Paulo')::date as day,
    count(*) filter (where r.status in ('sent','delivered','read')) as sent,
    count(*) filter (where r.status in ('delivered','read'))        as delivered,
    count(*) filter (where r.status = 'read')                       as read_ct,
    count(*) filter (where r.replied_at is not null)                as replied,
    count(*) filter (where r.status = 'failed')                     as failed
  from az_campaign_recipients r
  where coalesce(r.sent_at, r.created_at) >= p_from
    and coalesce(r.sent_at, r.created_at) <  p_to
  group by 1
  order by 1;
$func$;

grant execute on function az_metrics_series(timestamptz, timestamptz) to anon, authenticated, service_role;

-- ==== STATEMENT ====

-- 3. Per-campaign aggregates (accurate, server-side — avoids PostgREST row
--    caps). The API joins these with campaign metadata and rolls up to
--    instance / vendedor / template in memory (tens of campaigns).
create or replace function az_metrics_by_campaign(p_from timestamptz, p_to timestamptz)
returns table(campaign_id uuid, sent bigint, delivered bigint, read_ct bigint, replied bigint, failed bigint)
language sql
stable
as $func$
  select
    r.campaign_id,
    count(*) filter (where r.status in ('sent','delivered','read')) as sent,
    count(*) filter (where r.status in ('delivered','read'))        as delivered,
    count(*) filter (where r.status = 'read')                       as read_ct,
    count(*) filter (where r.replied_at is not null)                as replied,
    count(*) filter (where r.status = 'failed')                     as failed
  from az_campaign_recipients r
  where coalesce(r.sent_at, r.created_at) >= p_from
    and coalesce(r.sent_at, r.created_at) <  p_to
  group by r.campaign_id;
$func$;

grant execute on function az_metrics_by_campaign(timestamptz, timestamptz) to anon, authenticated, service_role;
