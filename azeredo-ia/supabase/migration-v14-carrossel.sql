-- ===========================================
-- AZEREDO IA — Migration v14
-- Fase 3 do Checkpoint 10/07: carrossel/álbum de imagens (F2)
-- ===========================================

-- Múltiplas mídias por campanha: array [{url, type}]. Compat: campanha com
-- 1 mídia continua usando custom_media_url/custom_media_type; o worker lê
-- custom_media (array) primeiro e cai no single se ausente.
alter table az_campaigns add column if not exists custom_media jsonb;
