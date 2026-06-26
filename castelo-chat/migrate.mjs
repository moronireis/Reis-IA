/**
 * Castelo Chat — Supabase Migration Script
 * Run: node migrate.mjs
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing env vars. Source .env first.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function sql(query) {
  const res = await fetch(`${SUPABASE_URL}/pg/query`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

async function run() {
  console.log('Running castelo-chat migration...\n');

  console.log('1/5 castelo_contacts...');
  await sql(`
    CREATE TABLE IF NOT EXISTS castelo_contacts (
      id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      instance_id     text NOT NULL DEFAULT 'castelo1',
      phone           text NOT NULL,
      name            text,
      push_name       text,
      photo_url       text,
      is_group        boolean DEFAULT false,
      last_message_at timestamptz,
      last_message_direction text,
      last_message_preview text,
      unread_count    integer DEFAULT 0,
      created_at      timestamptz DEFAULT now(),
      metadata        jsonb,
      UNIQUE(instance_id, phone)
    )
  `);
  await sql(`CREATE INDEX IF NOT EXISTS idx_castelo_contacts_last_msg ON castelo_contacts(last_message_at DESC NULLS LAST)`);
  console.log('   OK');

  console.log('2/5 castelo_messages...');
  await sql(`
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
    )
  `);
  await sql(`CREATE INDEX IF NOT EXISTS idx_castelo_messages_contact ON castelo_messages(contact_id, created_at ASC)`);
  await sql(`CREATE INDEX IF NOT EXISTS idx_castelo_messages_wa_id ON castelo_messages(wa_message_id)`);
  console.log('   OK');

  console.log('3/5 castelo_templates...');
  await sql(`
    CREATE TABLE IF NOT EXISTS castelo_templates (
      id        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name      text NOT NULL,
      shortcut  text,
      category  text DEFAULT 'geral',
      body      text NOT NULL,
      created_at timestamptz DEFAULT now()
    )
  `);
  console.log('   OK');

  console.log('4/5 Seed templates...');
  await sql(`
    INSERT INTO castelo_templates (name, shortcut, category, body) VALUES
    ('Boas-vindas',   '/ola',          'atendimento', 'Olá! Obrigado pelo contato com o Castelo dos Lagos. Como posso ajudá-lo?'),
    ('Como chegar',   '/endereco',     'info',         'Estamos na Rua Bonfim, 754 — Jardim Planteucal, Ribeirão Pires — SP. Saída 42 da Rodovia Índio Tibiriçá (SP-31).'),
    ('Agendar visita','/visita',        'agendamento',  'Ficamos felizes com seu interesse! Para agendar uma visita, nos informe: data preferida, tipo de evento e número de convidados.'),
    ('Capacidade',    '/capacidade',   'info',         'O Castelo comporta até 300 convidados no salão e 240 sentados no cerimonial (60 bancos). Estacionamento para 90 veículos.'),
    ('Indisponível',  '/indisponivel', 'atendimento',  'Infelizmente essa data já está reservada. Gostaria de verificar outras datas disponíveis?')
    ON CONFLICT DO NOTHING
  `);
  console.log('   OK');

  console.log('5/6 increment_unread RPC...');
  await sql(`
    CREATE OR REPLACE FUNCTION increment_unread(contact_uuid uuid)
    RETURNS void LANGUAGE plpgsql AS $$
    BEGIN
      UPDATE castelo_contacts
      SET unread_count = COALESCE(unread_count, 0) + 1
      WHERE id = contact_uuid;
    END;
    $$
  `);
  console.log('   OK');

  console.log('6/6 Storage bucket castelo-media...');
  const { error: bucketError } = await supabase.storage.createBucket('castelo-media', {
    public: true,
    fileSizeLimit: 52428800,
    allowedMimeTypes: [
      'image/jpeg','image/png','image/webp','image/gif',
      'audio/ogg','audio/mpeg','audio/mp4','audio/m4a',
      'video/mp4','video/quicktime',
      'application/pdf','application/octet-stream',
    ],
  });
  if (bucketError && !bucketError.message.includes('already exists')) {
    console.warn('   Bucket warning:', bucketError.message);
  } else {
    console.log('   OK');
  }

  console.log('\nMigration complete! (6 steps)');
}

run().catch(err => { console.error(err); process.exit(1); });
