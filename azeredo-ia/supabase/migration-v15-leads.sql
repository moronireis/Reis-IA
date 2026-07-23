-- ===========================================
-- AZEREDO IA — Migration v15
-- Fase 6 do Checkpoint 10/07 (atualizado 14/07): Módulo Leads (F7)
-- Funil kanban com estágios personalizáveis; lead multi-segmento.
-- ===========================================

create table if not exists az_lead_stages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text not null default '#25D366',
  position integer not null default 0,
  is_won boolean not null default false,
  is_lost boolean not null default false,
  created_at timestamptz default now()
);
alter table az_lead_stages enable row level security;
create policy "Authenticated read lead_stages" on az_lead_stages for select using (auth.uid() is not null);
create policy "Authenticated write lead_stages" on az_lead_stages for all using (auth.uid() is not null);

create table if not exists az_leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  contato text,
  telefone text,
  cnpj text,
  cidade text,
  segmentos text[] not null default '{}',
  stage_id uuid references az_lead_stages(id) on delete set null,
  position integer not null default 0,
  notas text,
  contact_id uuid references az_contacts(id),  -- preenchido quando o lead vira cliente
  created_by uuid references az_profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table az_leads enable row level security;
create policy "Authenticated read leads" on az_leads for select using (auth.uid() is not null);
create policy "Authenticated write leads" on az_leads for all using (auth.uid() is not null);
create index if not exists idx_az_leads_stage on az_leads(stage_id, position);

-- ==== STATEMENT ====

-- Seed: estágios padrão (personalizáveis na UI — validar nomes com a Tati)
insert into az_lead_stages (name, color, position, is_won, is_lost)
select v.name, v.color, v.position, v.is_won, v.is_lost
from (values
  ('Novo',          '#4A90FF', 0, false, false),
  ('Contato feito', '#f59e0b', 1, false, false),
  ('Negociação',    '#25D366', 2, false, false),
  ('Cliente',       '#22c55e', 3, true,  false),
  ('Perdido',       '#6b7280', 4, false, true)
) as v(name, color, position, is_won, is_lost)
where not exists (select 1 from az_lead_stages);
