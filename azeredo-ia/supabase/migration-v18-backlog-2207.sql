-- Migração v18 — Backlog 22/07 (issues #9, #14, #15, #18)
-- #14: foto/nome de perfil do WhatsApp persistidos (antes só viviam em memória)
alter table az_whatsapp_instances add column if not exists profile_name text;
alter table az_whatsapp_instances add column if not exists profile_pic_url text;

-- #15: remoção lógica de número (histórico de campanhas/mensagens preservado)
alter table az_whatsapp_instances add column if not exists deleted_at timestamptz;

-- #9: IA conversacional — contador de respostas seguidas do bot por conversa
-- (anti-loop: acima do teto entra em handoff automático)
alter table az_bot_state add column if not exists bot_msg_count integer not null default 0;

-- #18: perfis de acesso — admin | operacional | vendedor | gerencia
alter table az_profiles drop constraint if exists az_profiles_role_check;
update az_profiles set role = 'vendedor' where role = 'operador';
alter table az_profiles add constraint az_profiles_role_check
  check (role in ('admin', 'operacional', 'vendedor', 'gerencia'));
