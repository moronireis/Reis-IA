-- Migration: CRM fields for castelo_contacts
-- Run via Supabase SQL editor or psql

ALTER TABLE castelo_contacts
  ADD COLUMN IF NOT EXISTS lead_stage   text DEFAULT 'novo',
  ADD COLUMN IF NOT EXISTS event_type   text,
  ADD COLUMN IF NOT EXISTS event_date   date,
  ADD COLUMN IF NOT EXISTS guest_count  integer,
  ADD COLUMN IF NOT EXISTS budget_range text,
  ADD COLUMN IF NOT EXISTS email        text,
  ADD COLUMN IF NOT EXISTS notes        text,
  ADD COLUMN IF NOT EXISTS source       text;

-- Index for pipeline view (filter by stage)
CREATE INDEX IF NOT EXISTS idx_castelo_contacts_lead_stage
  ON castelo_contacts(lead_stage);

-- Valid stage values (informational constraint)
-- novo | contato_feito | proposta_enviada | visita_agendada | visita_realizada | negociacao | fechado | perdido
