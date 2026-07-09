-- ===========================================
-- AZEREDO IA — Migration v9
-- Fase 2 (dashboard tempo real + respostas) + M2 (mídia em campanha)
-- + M1 (instância por vendedor) — Backlog Checkpoint 04/07/2026
-- ===========================================

-- Fase 2: rastreio de respostas (inbound via reconciliação /message/find,
-- já que o servidor UazapiGO não entrega webhooks)
alter table az_campaign_recipients add column if not exists replied_at timestamptz;
alter table az_campaign_recipients add column if not exists reply_checked_at timestamptz;
create index if not exists idx_az_recipients_reply_scan
  on az_campaign_recipients(reply_checked_at)
  where status in ('sent','delivered','read') and replied_at is null;
create index if not exists idx_az_messages_direction_created
  on az_messages(direction, created_at desc);

-- M2: mídia em template e override por campanha
alter table az_templates add column if not exists media_url text;
alter table az_templates add column if not exists media_type text
  check (media_type is null or media_type in ('image','video'));
alter table az_campaigns add column if not exists custom_media_url text;
alter table az_campaigns add column if not exists custom_media_type text
  check (custom_media_type is null or custom_media_type in ('image','video'));

-- M1: vendedor dono da instância (conversas filtradas por operador)
alter table az_whatsapp_instances add column if not exists owner_profile_id uuid
  references az_profiles(id) on delete set null;
