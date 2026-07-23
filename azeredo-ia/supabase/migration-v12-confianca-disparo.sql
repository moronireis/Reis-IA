-- ===========================================
-- AZEREDO IA — Migration v12
-- Fase 1 do Checkpoint 10/07: confiança no disparo
--   (B1: fallback de telefone no pré-check + instância restrita visível)
-- ===========================================

-- 1. Fallback de telefone: quando o fone principal reprova no /chat/check,
--    o worker tenta os demais fones do contato e envia para o que tiver
--    WhatsApp. `phone` passa a ser o fone efetivamente usado (reconciliação,
--    respostas e dedup continuam funcionando sem mudança); o original fica
--    preservado aqui para a UI mostrar "enviado no fone alternativo".
alter table az_campaign_recipients add column if not exists fallback_from text;

-- 2. Instância restrita (aceita envio, não entrega — casos azeredo-2/9).
--    Marcada pelo canário quando reprova; limpa automaticamente na primeira
--    entrega confirmada da instância (chip trocado/reaquecido).
alter table az_whatsapp_instances add column if not exists restricted_at timestamptz;
alter table az_whatsapp_instances add column if not exists restricted_reason text;

-- ==== STATEMENT ====

-- 3. Backfill: azeredo-2 (Tatiane) e azeredo-9 (Bianca) estão comprovadamente
--    restritas em produção (02/07 e 10/07): envios aceitos, nenhum entregue.
update az_whatsapp_instances
   set restricted_at = now(),
       restricted_reason = 'Envios aceitos pelo WhatsApp mas nenhum entregue (detectado pelo canário em produção). Reaquecer, reconectar ou trocar o chip.'
 where uazapi_name in ('azeredo-2', 'azeredo-9')
   and restricted_at is null;
