-- ===========================================
-- AZEREDO IA — Migration v16
-- Backlog GitHub 17/07: #4 Leads com busca de CNPJ (campos de endereço)
-- + #8 formato de mídia da campanha (álbum sequencial × carrossel interativo)
-- ===========================================

-- #4: campos preenchidos pela consulta de CNPJ (BrasilAPI/Receita).
-- cidade já existia; estado e endereço completam o auto-preenchimento.
alter table az_leads add column if not exists estado text;
alter table az_leads add column if not exists endereco text;
-- situação cadastral na Receita no momento da consulta (ATIVA, BAIXADA, ...)
alter table az_leads add column if not exists situacao_receita text;

-- ==== STATEMENT ====

-- #8: como enviar quando a campanha tem 2+ imagens.
--   'album'    — comportamento atual: N mensagens de imagem em sequência
--   'carousel' — mensagem interativa única com cards (POST /send/carousel)
alter table az_campaigns add column if not exists media_format text not null default 'album'
  check (media_format in ('album', 'carousel'));
