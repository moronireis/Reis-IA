-- ==========================================================================
-- REIS IA [HUB] — Complete Database Schema
-- Run this in Supabase SQL Editor after creating the project
-- ==========================================================================

-- ============================================================
-- 1. PROFILES (extends Supabase auth.users)
-- ============================================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  email text not null,
  avatar_url text,
  role text not null default 'member' check (role in ('admin', 'builder-member', 'systems-client', 'marketing-client', 'member')),
  company text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- 2. PROJECTS (client projects tracked in Project Portal)
-- ============================================================
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  type text not null check (type in ('systems', 'builders', 'marketing')),
  status text not null default 'active' check (status in ('active', 'paused', 'completed', 'cancelled')),
  client_id uuid references public.profiles(id),
  client_name text not null,
  client_email text,
  value numeric(12,2),
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  start_date date,
  estimated_end_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 3. PROJECT PHASES (timeline steps within a project)
-- ============================================================
create table public.project_phases (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'pending' check (status in ('pending', 'current', 'done')),
  deliverable text,
  progress integer default 0 check (progress >= 0 and progress <= 100),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 4. CLIENT ACTIONS (things the client needs to do)
-- ============================================================
create table public.client_actions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  text text not null,
  urgent boolean not null default false,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 5. TASKS (admin Kanban board — Notion-style)
-- ============================================================
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'done')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  assignee_id uuid references public.profiles(id),
  assignee_name text,
  project_id uuid references public.projects(id) on delete set null,
  project_name text,
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 6. CONTACTS (CRM contacts)
-- ============================================================
create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  company text,
  source text, -- 'website', 'whatsapp', 'linkedin', 'referral', 'event'
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 7. DEALS (CRM pipeline — HubSpot-style)
-- ============================================================
create table public.deals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  contact_id uuid references public.contacts(id) on delete set null,
  contact_name text not null,
  company text,
  value numeric(12,2) not null default 0,
  stage text not null default 'lead' check (stage in ('lead', 'qualified', 'proposal', 'negotiation', 'won', 'lost')),
  type text not null check (type in ('systems', 'builders', 'marketing')),
  notes text,
  lost_reason text,
  last_activity timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 8. DEAL ACTIVITIES (activity log for each deal)
-- ============================================================
create table public.deal_activities (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references public.deals(id) on delete cascade,
  type text not null check (type in ('note', 'stage_change', 'call', 'email', 'meeting', 'task')),
  description text not null,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

-- ============================================================
-- 9. MESSAGES (project chat between client and team)
-- ============================================================
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  content text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 10. UPDATED_AT TRIGGER (auto-update timestamps)
-- ============================================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply to all tables with updated_at
create trigger update_profiles_updated_at before update on public.profiles for each row execute procedure public.update_updated_at();
create trigger update_projects_updated_at before update on public.projects for each row execute procedure public.update_updated_at();
create trigger update_project_phases_updated_at before update on public.project_phases for each row execute procedure public.update_updated_at();
create trigger update_tasks_updated_at before update on public.tasks for each row execute procedure public.update_updated_at();
create trigger update_contacts_updated_at before update on public.contacts for each row execute procedure public.update_updated_at();
create trigger update_deals_updated_at before update on public.deals for each row execute procedure public.update_updated_at();

-- ============================================================
-- 11. ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_phases enable row level security;
alter table public.client_actions enable row level security;
alter table public.tasks enable row level security;
alter table public.contacts enable row level security;
alter table public.deals enable row level security;
alter table public.deal_activities enable row level security;
alter table public.messages enable row level security;

-- Helper: check if user is admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer;

-- PROFILES: users can read own profile, admins can read all
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Admins can view all profiles" on public.profiles for select using (is_admin());
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Admins can update all profiles" on public.profiles for update using (is_admin());

-- PROJECTS: clients see their projects, admins see all
create policy "Clients can view own projects" on public.projects for select using (client_id = auth.uid());
create policy "Admins can manage all projects" on public.projects for all using (is_admin());

-- PROJECT PHASES: visible to project client and admins
create policy "Clients can view own project phases" on public.project_phases for select
  using (exists (select 1 from public.projects where id = project_id and client_id = auth.uid()));
create policy "Admins can manage all phases" on public.project_phases for all using (is_admin());

-- CLIENT ACTIONS: visible to project client and admins
create policy "Clients can view own actions" on public.client_actions for select
  using (exists (select 1 from public.projects where id = project_id and client_id = auth.uid()));
create policy "Clients can update own actions" on public.client_actions for update
  using (exists (select 1 from public.projects where id = project_id and client_id = auth.uid()));
create policy "Admins can manage all actions" on public.client_actions for all using (is_admin());

-- TASKS: admin only
create policy "Admins can manage tasks" on public.tasks for all using (is_admin());

-- CONTACTS: admin only
create policy "Admins can manage contacts" on public.contacts for all using (is_admin());

-- DEALS: admin only
create policy "Admins can manage deals" on public.deals for all using (is_admin());

-- DEAL ACTIVITIES: admin only
create policy "Admins can manage deal activities" on public.deal_activities for all using (is_admin());

-- MESSAGES: project participants and admins
create policy "Project participants can view messages" on public.messages for select
  using (sender_id = auth.uid() or exists (select 1 from public.projects where id = project_id and client_id = auth.uid()));
create policy "Project participants can send messages" on public.messages for insert
  with check (sender_id = auth.uid());
create policy "Admins can manage all messages" on public.messages for all using (is_admin());

-- ============================================================
-- 12. INDEXES
-- ============================================================
create index idx_projects_client on public.projects(client_id);
create index idx_projects_status on public.projects(status);
create index idx_project_phases_project on public.project_phases(project_id);
create index idx_tasks_status on public.tasks(status);
create index idx_tasks_project on public.tasks(project_id);
create index idx_deals_stage on public.deals(stage);
create index idx_deals_contact on public.deals(contact_id);
create index idx_deal_activities_deal on public.deal_activities(deal_id);
create index idx_messages_project on public.messages(project_id);

-- ============================================================
-- 13. SEED DATA (demo project)
-- ============================================================

-- Note: Run this AFTER creating your admin user via the app.
-- Then update the admin user's role:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-email@example.com';
