-- ===========================================
-- AZEREDO IA — Migration v7
-- Log de webhooks (observabilidade — vercel logs não retém runtime logs)
-- ===========================================

create table if not exists az_webhook_log (
  id uuid primary key default gen_random_uuid(),
  event_type text,
  instance_id uuid,
  payload jsonb,
  created_at timestamptz default now()
);
alter table az_webhook_log enable row level security;
create policy "Auth read webhook log" on az_webhook_log for select using (auth.uid() is not null);
create index if not exists idx_az_webhook_log_created on az_webhook_log(created_at desc);
