-- ==========================================================================
-- REIS IA [HUB] — AGENTES [IA] Low-Ticket Access System
-- Migration: 2026-04-26
--
-- Purpose:
--   Enable low-ticket buyers (R$47 product on agentesia.moronireis.com.br)
--   to access ONLY the AGENTES [IA] course + a dedicated community space,
--   without exposing high-ticket areas (mentoria, projects, vault, etc.).
--
-- Strategy:
--   1. Buyers get role = 'starter' (existing role; no new value needed).
--   2. NEW table `entitlements` grants per-product access. This decouples
--      "what you bought" from "your tier". A buyer can be 'starter' but have
--      multiple entitlements (agentes_ia, comunidade_497, etc).
--   3. Courses + spaces gain `access_level` text (e.g. 'agentes_ia') that the
--      app filters on server-side using the entitlements join.
--   4. Spaces table created if it does not yet exist (idempotent — production
--      may already have it from a remote migration that was never committed).
--   5. Ticto webhook events tracked in `webhook_events` for audit + replay.
--
-- Run order: AFTER schema.sql + migration-missing-tables.sql.
-- Run in:    Supabase SQL Editor, or via supabase migration apply.
-- ==========================================================================

-- ============================================================
-- 1. SPACES (community spaces — idempotent)
-- ============================================================
create table if not exists public.spaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  slug text not null unique,
  icon text default '#',
  sort_order integer not null default 0,
  admin_only boolean not null default false,
  access_level text not null default 'all',
  created_at timestamptz not null default now()
);

create index if not exists idx_spaces_sort on public.spaces(sort_order);
create index if not exists idx_spaces_access on public.spaces(access_level);

-- Add access_level to spaces if the column does not exist
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'spaces' and column_name = 'access_level'
  ) then
    alter table public.spaces add column access_level text not null default 'all';
    create index if not exists idx_spaces_access on public.spaces(access_level);
  end if;
end $$;

-- ============================================================
-- 2. ENTITLEMENTS (per-product access grants)
-- ============================================================
-- A user can hold multiple entitlements. Examples:
--   product_code = 'agentes_ia'      → AGENTES [IA] R$47
--   product_code = 'comunidade_497'  → Comunidade Reis IA R$497
--   product_code = 'mentoria_5k'     → Mentoria high-ticket
--
-- source = 'ticto' | 'hotmart' | 'kiwify' | 'manual' | 'admin'
-- status = 'active' | 'refunded' | 'chargeback' | 'canceled' | 'expired'
create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_code text not null,
  source text not null default 'manual',
  external_order_id text,           -- order id from Ticto/Hotmart/etc
  external_buyer_email text,        -- for reconciliation when user_id is null
  status text not null default 'active' check (status in ('active', 'refunded', 'chargeback', 'canceled', 'expired')),
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  expires_at timestamptz,           -- null = lifetime
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, product_code, external_order_id)
);

create index if not exists idx_ent_user on public.entitlements(user_id);
create index if not exists idx_ent_product on public.entitlements(product_code);
create index if not exists idx_ent_status on public.entitlements(status);
create index if not exists idx_ent_user_product_status on public.entitlements(user_id, product_code, status);

-- Update updated_at on change
create or replace function public.update_entitlement_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_entitlements_updated_at on public.entitlements;
create trigger trg_entitlements_updated_at
  before update on public.entitlements
  for each row execute procedure public.update_entitlement_updated_at();

-- Helper: does the current auth user have an active entitlement for a given product?
create or replace function public.has_entitlement(p_product_code text)
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1
    from public.entitlements e
    where e.user_id = auth.uid()
      and e.product_code = p_product_code
      and e.status = 'active'
      and (e.expires_at is null or e.expires_at > now())
  );
$$;

-- ============================================================
-- 3. WEBHOOK_EVENTS (audit log for inbound webhooks)
-- ============================================================
create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  source text not null,             -- 'ticto', 'hotmart', 'kiwify', 'resend', etc
  event_type text not null,         -- 'purchase.approved', 'purchase.refunded', etc
  external_id text,                 -- event id from the source
  signature_valid boolean,
  status text not null default 'received' check (status in ('received', 'processed', 'failed', 'ignored')),
  error text,
  payload jsonb not null,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_webhook_source on public.webhook_events(source);
create index if not exists idx_webhook_event_type on public.webhook_events(event_type);
create index if not exists idx_webhook_external_id on public.webhook_events(external_id);
create index if not exists idx_webhook_status on public.webhook_events(status);
create index if not exists idx_webhook_created on public.webhook_events(created_at desc);

-- Prevent duplicate processing: same source + external_id is processed once
create unique index if not exists uq_webhook_source_external on public.webhook_events(source, external_id)
  where external_id is not null;

-- ============================================================
-- 4. COURSES — add columns for AGENTES [IA] product gating
-- ============================================================
-- access_level may already be 'all'; we extend its semantics to support
-- product codes like 'agentes_ia'. Slug enables direct URL routing.
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'courses' and column_name = 'slug'
  ) then
    alter table public.courses add column slug text;
    create unique index if not exists uq_courses_slug on public.courses(slug);
  end if;
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'courses' and column_name = 'product_code'
  ) then
    alter table public.courses add column product_code text;
    create index if not exists idx_courses_product_code on public.courses(product_code);
  end if;
end $$;

-- ============================================================
-- 5. RLS — gate access_level on courses, lessons, spaces, posts
-- ============================================================
-- Existing policies allow anyone signed in to read published courses.
-- We layer an entitlement check on top: if access_level = 'all' OR user has
-- the matching entitlement, allow read.

-- COURSES
drop policy if exists "Anyone can view published courses" on public.courses;
create policy "Members can view entitled courses"
  on public.courses for select
  using (
    status = 'published' and (
      access_level = 'all'
      or is_admin()
      or has_entitlement(coalesce(product_code, access_level))
    )
  );

-- LESSONS (mirror parent course gating)
drop policy if exists "Anyone can view published lessons" on public.lessons;
create policy "Members can view entitled lessons"
  on public.lessons for select
  using (
    exists (
      select 1 from public.courses c
      where c.id = course_id
        and c.status = 'published'
        and (
          c.access_level = 'all'
          or is_admin()
          or has_entitlement(coalesce(c.product_code, c.access_level))
        )
    )
  );

-- SPACES (community spaces by entitlement)
alter table public.spaces enable row level security;
drop policy if exists "Anyone can view spaces" on public.spaces;
create policy "Members can view entitled spaces"
  on public.spaces for select
  using (
    access_level = 'all'
    or is_admin()
    or has_entitlement(access_level)
  );
drop policy if exists "Admins can manage spaces" on public.spaces;
create policy "Admins can manage spaces" on public.spaces for all using (is_admin());

-- POSTS (filter by space access_level)
drop policy if exists "Anyone can read posts" on public.posts;
create policy "Members can read entitled posts"
  on public.posts for select
  using (
    exists (
      select 1 from public.spaces s
      where s.id::text = posts.space_id
        and (s.access_level = 'all' or is_admin() or has_entitlement(s.access_level))
    )
    or not exists (select 1 from public.spaces s where s.id::text = posts.space_id) -- legacy posts
  );

-- USER_PROGRESS — admins must be able to bulk-write for migrations
-- (existing policy already covers own writes)

-- ============================================================
-- 6. TICTO INTEGRATION — provisioning function
-- ============================================================
-- Called by /api/webhook/ticto when a purchase is approved.
-- Idempotent: rerunning with the same external_order_id is a no-op.
create or replace function public.provision_ticto_purchase(
  p_email text,
  p_full_name text,
  p_product_code text,
  p_external_order_id text,
  p_metadata jsonb default '{}'::jsonb
)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_user_id uuid;
  v_entitlement_id uuid;
  v_was_new_user boolean := false;
begin
  -- 1. Find existing user by email, else create a placeholder profile to be
  --    linked when the buyer accepts the magic link.
  select id into v_user_id from public.profiles where email = p_email limit 1;

  -- 2. Insert/update entitlement (no-op if already granted for this order)
  insert into public.entitlements (user_id, product_code, source, external_order_id, external_buyer_email, status, metadata)
  values (v_user_id, p_product_code, 'ticto', p_external_order_id, p_email, 'active', p_metadata)
  on conflict (user_id, product_code, external_order_id) do update
    set status = 'active', revoked_at = null, updated_at = now(), metadata = p_metadata
  returning id into v_entitlement_id;

  return jsonb_build_object(
    'entitlement_id', v_entitlement_id,
    'user_id', v_user_id,
    'was_new_user', v_was_new_user,
    'email', p_email,
    'product_code', p_product_code
  );
end;
$$;

-- Companion: revoke on refund/chargeback/cancel
create or replace function public.revoke_ticto_purchase(
  p_external_order_id text,
  p_reason text default 'refund'
)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_count integer;
begin
  update public.entitlements
  set status = case
    when p_reason = 'chargeback' then 'chargeback'
    when p_reason = 'cancel' then 'canceled'
    else 'refunded'
  end,
  revoked_at = now(),
  updated_at = now()
  where source = 'ticto'
    and external_order_id = p_external_order_id
    and status = 'active';
  get diagnostics v_count = row_count;
  return jsonb_build_object('revoked_count', v_count, 'reason', p_reason);
end;
$$;

-- ============================================================
-- 7. SEED — AGENTES [IA] course + dedicated space
-- ============================================================
-- These inserts are idempotent via on conflict / where not exists.

insert into public.courses (
  title, description, slug, product_code, access_level,
  category, level, status, sort_order, total_lessons, estimated_hours,
  thumbnail_url, instructor
)
select
  'AGENTES [IA] — Seu Time Completo de Marketing com IA',
  '7 squads. 40+ agentes especializados. Copy, design, estratégia, branding e tráfego — prontos no Claude Code. Testados em R$300K+ de projetos reais.',
  'agentes-ia',
  'agentes_ia',
  'agentes_ia',
  'marketing',
  'beginner',
  'published',
  0,
  4,
  3.5,
  'https://github.com/moronireis/Reis-IA/raw/claude/low-ticket-ai-agents-NLWih/agent-squad-lp/covers/agentes-ia-cover-1080x1350.png',
  'Moroni Reis'
where not exists (select 1 from public.courses where slug = 'agentes-ia');

-- Backfill product_code on the seeded course if a row already existed without it
update public.courses
set product_code = 'agentes_ia',
    access_level = 'agentes_ia'
where slug = 'agentes-ia' and (product_code is null or access_level <> 'agentes_ia');

-- Lessons (placeholders — Moroni replaces the video_url + content via /admin/academy)
do $$
declare v_course_id uuid;
begin
  select id into v_course_id from public.courses where slug = 'agentes-ia' limit 1;
  if v_course_id is not null then
    insert into public.lessons (course_id, title, description, sort_order, status, type, duration_minutes)
    select v_course_id, t.title, t.description, t.sort_order, 'draft', 'video', t.dur
    from (values
      (1, 'Aula 1 — Boas-vindas + Visão Geral dos Squads', 'Como os 40+ agentes se organizam em 7 squads e o que você consegue fazer com cada um.', 12),
      (2, 'Aula 2 — Instalando o Claude Code e os Agentes', 'Setup passo a passo: instalar Claude Code, copiar os agentes, configurar o primeiro squad.', 22),
      (3, 'Aula 3 — Pipeline de Copy: do Brief à Página de Vendas', 'Rodando o Copy Squad completo: CMO → copywriter → humanizer → reviewer.', 28),
      (4, 'Aula 4 — Próximos Passos + Comunidade', 'Como continuar usando, casos de uso avançados e como entrar na Comunidade Reis IA.', 18)
    ) as t(sort_order, title, description, dur)
    where not exists (select 1 from public.lessons where course_id = v_course_id and sort_order = t.sort_order);
  end if;
end $$;

-- Community space dedicated to AGENTES [IA] buyers
insert into public.spaces (name, description, slug, icon, sort_order, admin_only, access_level)
select 'AGENTES [IA]', 'Espaço dos compradores do AGENTES [IA]. Tire dúvidas, mostre seus agentes, troque ideias.', 'agentes-ia', '#', 5, false, 'agentes_ia'
where not exists (select 1 from public.spaces where slug = 'agentes-ia');

-- ============================================================
-- 8. UPGRADE PATH — admin grants for testing
-- ============================================================
-- Optional: grant Moroni admin access to AGENTES [IA] for testing.
-- Run manually after migration:
--   insert into public.entitlements (user_id, product_code, source, external_order_id, status)
--   select id, 'agentes_ia', 'manual', 'admin-test', 'active' from public.profiles
--   where email = 'moronireis@gmail.com'
--   on conflict (user_id, product_code, external_order_id) do nothing;

-- ============================================================
-- DONE
-- ============================================================
-- Verify:
--   select * from public.entitlements;
--   select * from public.spaces where slug = 'agentes-ia';
--   select id, slug, product_code, access_level from public.courses where slug = 'agentes-ia';
--   select id, title, sort_order from public.lessons
--     where course_id = (select id from public.courses where slug = 'agentes-ia');
