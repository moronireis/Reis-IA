-- ===========================================
-- AZEREDO IA — Migration v6
-- Delivery tracking (ACK) + last_error + janela de disparo
-- ===========================================

-- 1. Recipients: id da mensagem no WhatsApp para casar ACKs delivered/read
alter table az_campaign_recipients add column if not exists wa_message_id text;
create index if not exists idx_az_recipients_wa_id
  on az_campaign_recipients(wa_message_id)
  where wa_message_id is not null;

-- 2. Campanhas: último erro do worker, visível na UI
alter table az_campaigns add column if not exists last_error text;

-- 3. Janela de disparo (horário comercial BRT). Campanhas de teste interno
--    (tag u4digital) são isentas no worker.
insert into az_settings (key, value) values
  ('blast_window', '{"enabled": true, "start_hour": 8, "end_hour": 18}')
on conflict (key) do nothing;
