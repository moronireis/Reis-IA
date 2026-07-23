-- ===========================================
-- AZEREDO IA — Migration v17
-- Backlog GitHub 17/07: #7 Chatbot de primeiro atendimento
-- Toggle por número + estado por conversa. Menu configurável fica em
-- az_settings (key 'bot_config'). Sem webhook: o bot roda por polling
-- (POST /api/bot/tick — pump do dashboard + cron GitHub Actions).
-- ===========================================

-- Toggle por número (default DESLIGADO — ninguém é surpreendido)
alter table az_whatsapp_instances add column if not exists bot_enabled boolean not null default false;

-- ==== STATEMENT ====

-- Estado do bot por conversa: quando saudou, quando o humano assumiu (handoff)
create table if not exists az_bot_state (
  instance_id uuid not null references az_whatsapp_instances(id) on delete cascade,
  chatid text not null,
  greeted_at timestamptz,
  last_bot_at timestamptz,
  last_option text,
  handoff_until timestamptz,
  updated_at timestamptz default now(),
  primary key (instance_id, chatid)
);
alter table az_bot_state enable row level security;
create policy "Authenticated read bot_state" on az_bot_state for select using (auth.uid() is not null);
create policy "Authenticated write bot_state" on az_bot_state for all using (auth.uid() is not null);

-- ==== STATEMENT ====

-- Config global do menu (editável em Configurações)
insert into az_settings (key, value) values ('bot_config', '{
  "greeting": "Olá! Aqui é o atendimento automático da Azeredo Representações. Como podemos ajudar? Escolha uma opção:",
  "options": [
    { "label": "Falar com meu vendedor", "reply": "Perfeito! Já avisei seu vendedor — ele te responde por aqui em instantes." },
    { "label": "Fazer um pedido", "reply": "Ótimo! Me diga quais produtos você precisa que o vendedor monta o pedido e te retorna." },
    { "label": "Tabelas e catálogos", "reply": "Certo! Vou pedir para o vendedor enviar a tabela/catálogo atualizado da representada que você trabalha." },
    { "label": "Outro assunto", "reply": "Sem problema! Escreva aqui o que precisa que a nossa equipe já te responde." }
  ],
  "handoff_hours": 24
}'::jsonb)
on conflict (key) do nothing;
