-- Migration 007: entradas manuais do Pandapé (sem API)
-- Backlog 09/07/2026 — origem dos dados + nº do processo Pandapé nas vagas
-- Apply with: node scripts/apply-migration.js migrations/007_pandape_manual.sql

-- candidates: origem do registro (pandape-sheet | pandape-pdf | manual | webhook)
ALTER TABLE candidates ADD COLUMN IF NOT EXISTS source text;

-- vacancies: número do processo no Pandapé + origem
ALTER TABLE vacancies ADD COLUMN IF NOT EXISTS processo_numero text;
ALTER TABLE vacancies ADD COLUMN IF NOT EXISTS source text;
