-- ============================================================
-- Castelo dos Lagos — Chat Platform
-- Supabase Migration
-- Run in Supabase SQL Editor
-- ============================================================

-- Contacts table
CREATE TABLE IF NOT EXISTS castelo_contacts (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  instance_id             text NOT NULL DEFAULT 'castelo1',
  phone                   text NOT NULL,
  name                    text,
  push_name               text,
  photo_url               text,
  is_group                boolean DEFAULT false,
  last_message_at         timestamptz,
  last_message_direction  text,
  last_message_preview    text,
  unread_count            integer DEFAULT 0,
  created_at              timestamptz DEFAULT now(),
  metadata                jsonb,
  UNIQUE(instance_id, phone)
);

CREATE INDEX IF NOT EXISTS idx_castelo_contacts_last_msg
  ON castelo_contacts(last_message_at DESC NULLS LAST);

-- Messages table
CREATE TABLE IF NOT EXISTS castelo_messages (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id      uuid NOT NULL REFERENCES castelo_contacts(id) ON DELETE CASCADE,
  instance_id     text NOT NULL DEFAULT 'castelo1',
  direction       text NOT NULL CHECK (direction IN ('inbound','outbound')),
  content_type    text NOT NULL DEFAULT 'text',
  body            text,
  status          text DEFAULT 'sent',
  media_url       text,
  media_mime      text,
  wa_message_id   text UNIQUE,
  created_at      timestamptz DEFAULT now(),
  metadata        jsonb
);

CREATE INDEX IF NOT EXISTS idx_castelo_messages_contact
  ON castelo_messages(contact_id, created_at ASC);

CREATE INDEX IF NOT EXISTS idx_castelo_messages_wa_id
  ON castelo_messages(wa_message_id);

-- Templates table
CREATE TABLE IF NOT EXISTS castelo_templates (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  shortcut    text,
  category    text DEFAULT 'geral',
  body        text NOT NULL,
  created_at  timestamptz DEFAULT now()
);

-- Helper function to increment unread count
CREATE OR REPLACE FUNCTION increment_unread(contact_uuid uuid)
RETURNS void AS $$
  UPDATE castelo_contacts
  SET unread_count = unread_count + 1
  WHERE id = contact_uuid;
$$ LANGUAGE sql;

-- Seed default templates
INSERT INTO castelo_templates (name, shortcut, category, body) VALUES
(
  'Boas-vindas',
  '/ola',
  'atendimento',
  'Olá! Obrigado pelo contato com o Castelo dos Lagos. Como posso ajudá-lo?'
),
(
  'Como chegar',
  '/endereco',
  'info',
  'Estamos localizados na Rua Bonfim, 754 — Jardim Planteucal, Ribeirão Pires — SP. Saída 42 da Rodovia Índio Tibiriçá (SP-31). Coordenadas: https://maps.google.com/?q=Rua+Bonfim+754+Ribeirao+Pires'
),
(
  'Agendar visita',
  '/visita',
  'agendamento',
  'Ficamos felizes com seu interesse! Para agendar uma visita ao Castelo, por favor nos informe: a data preferida, o tipo de evento e o número aproximado de convidados.'
),
(
  'Capacidade',
  '/capacidade',
  'info',
  'O Castelo dos Lagos comporta até 300 convidados no salão principal e 240 pessoas sentadas no cerimonial (60 bancos de madeira). Temos estacionamento para 90 veículos.'
),
(
  'Não disponível',
  '/indisponivel',
  'atendimento',
  'Infelizmente essa data já está reservada. Gostaria de verificar outras datas disponíveis?'
)
ON CONFLICT DO NOTHING;

-- Storage bucket (run this separately if needed via Supabase dashboard or API)
-- INSERT INTO storage.buckets (id, name, public)
--   VALUES ('castelo-media', 'castelo-media', true)
--   ON CONFLICT DO NOTHING;
