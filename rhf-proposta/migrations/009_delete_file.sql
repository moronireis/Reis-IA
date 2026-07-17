-- 009 — Fase 2 (#10): excluir de verdade na fila de entrega
-- Persiste o id do arquivo no módulo Arquivos do ChatGuru para permitir
-- a exclusão remota (antes o id era retornado pelo prepare-file mas descartado).

ALTER TABLE generated_cvs
  ADD COLUMN IF NOT EXISTS chatguru_attachment_id text;

COMMENT ON COLUMN generated_cvs.chatguru_attachment_id IS
  'ObjectId do arquivo no módulo Arquivos do ChatGuru (painel s18). Null = nunca subiu ou já excluído.';
