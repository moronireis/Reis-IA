-- ===========================================
-- AZEREDO IA — Migration v13
-- Fase 2 do Checkpoint 10/07: multi-vendedor por carteira (F1)
-- ===========================================

-- 1. Vínculo instância ↔ vendedor da carteira Mercos (valores de
--    az_contacts.vendedor_principal). Editável em Configurações.
alter table az_whatsapp_instances add column if not exists vendedor_nome text;

-- 2. Agrupamento de campanhas-filhas (disparo dividido por vendedor):
--    todas as filhas compartilham o group_id (= id da campanha original).
alter table az_campaigns add column if not exists group_id uuid;
create index if not exists idx_az_campaigns_group on az_campaigns(group_id) where group_id is not null;

-- ==== STATEMENT ====

-- 3. Seed: casa instância → vendedor Mercos pelo nome (auditoria 14/07).
--    Tatiane/Letícia/Bianca são operadoras internas, não vendedoras de
--    carteira. Gabriela Valle de Moraes e Paulo Binda não têm número.
update az_whatsapp_instances set vendedor_nome = 'Rafael da Silva'   where uazapi_name = 'azeredo-ia' and vendedor_nome is null;
update az_whatsapp_instances set vendedor_nome = 'Claudio Azeredo'   where uazapi_name = 'azeredo-3'  and vendedor_nome is null;
update az_whatsapp_instances set vendedor_nome = 'Daiane Azeredo'    where uazapi_name = 'azeredo-5'  and vendedor_nome is null;
update az_whatsapp_instances set vendedor_nome = 'Luciano Goulart'   where uazapi_name = 'azeredo-6'  and vendedor_nome is null;
update az_whatsapp_instances set vendedor_nome = 'Tiago Goulart'     where uazapi_name = 'azeredo-7'  and vendedor_nome is null;
update az_whatsapp_instances set vendedor_nome = 'Cláudia Azeredo'   where uazapi_name = 'azeredo-8'  and vendedor_nome is null;
