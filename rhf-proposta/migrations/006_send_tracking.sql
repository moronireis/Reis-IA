-- Migration 006: send/presentation tracking + recruiter attribution
-- Backlog 04/07/2026 — Fase 1 (envio de arquivo ChatGuru) + base das métricas da Fase 2
-- Apply with: node scripts/apply-migration.js migrations/006_send_tracking.sql

-- generated_cvs: recruiter display name (created_by uuid already exists)
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS created_by_name text;

-- generated_cvs: send lifecycle (rascunho | email | chatguru_texto | chatguru_arquivo | apresentado)
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS sent_status text DEFAULT 'rascunho';
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS sent_at timestamptz;
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS sent_file_url text;

-- generated_cvs: presentation cycle (base do SLA de resposta do cliente — Fase 2)
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS presented_at timestamptz;
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS client_response_at timestamptz;
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS client_company text;

-- generated_cvs: reliable join to internal vacancies (vacancy_id bigint is the Pandapé id)
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS vacancy_ref uuid REFERENCES vacancies(id);

-- vacancies: última atualização por processo
ALTER TABLE vacancies ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

CREATE INDEX IF NOT EXISTS idx_generated_cvs_sent ON generated_cvs (sent_status, sent_at DESC);
