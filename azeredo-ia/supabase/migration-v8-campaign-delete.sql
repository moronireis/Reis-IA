-- ===========================================
-- AZEREDO IA — Migration v8
-- Excluir campanha com histórico: az_messages guarda o log (campaign_id
-- vira NULL) em vez de bloquear o DELETE por FK.
-- ===========================================

alter table az_messages drop constraint if exists az_messages_campaign_id_fkey;
alter table az_messages add constraint az_messages_campaign_id_fkey
  foreign key (campaign_id) references az_campaigns(id) on delete set null;
