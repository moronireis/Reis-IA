-- Migration 004: Vacancies created in-platform (Smart Job Opening)
-- Applied via: node scripts/apply-migration.js migrations/004_vacancies.sql

CREATE TABLE IF NOT EXISTS vacancies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  client_name text,
  city text,
  contract_type text,
  salary_range text,
  requirements text,
  description text,
  whatsapp_script text,
  status text DEFAULT 'aberta',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vacancies_status ON vacancies (status);
CREATE INDEX IF NOT EXISTS idx_vacancies_created ON vacancies (created_at DESC);
