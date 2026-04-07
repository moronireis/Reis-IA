-- ==========================================================================
-- REIS IA [HUB] — Journey Map Tables
-- Interactive learning journey for Founders Beta program
-- Run this in Supabase SQL Editor
-- ==========================================================================

-- ============================================================
-- 1. JOURNEY TEMPLATES (reusable blueprints created by admin)
-- ============================================================
create table public.journey_templates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  program text not null default 'founders_beta',
  thumbnail_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  total_phases int not null default 0,
  estimated_weeks int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 2. JOURNEY TEMPLATE PHASES
-- ============================================================
create table public.journey_template_phases (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references public.journey_templates(id) on delete cascade,
  title text not null,
  description text,
  sort_order int not null default 0,
  unlock_rule text not null default 'all_previous' check (unlock_rule in ('all_previous', 'percent_previous', 'manual')),
  unlock_threshold int default 100,
  icon text,
  color text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 3. JOURNEY TEMPLATE NODES
-- ============================================================
create table public.journey_template_nodes (
  id uuid primary key default gen_random_uuid(),
  phase_id uuid not null references public.journey_template_phases(id) on delete cascade,
  title text not null,
  description text,
  content_type text not null check (content_type in ('task', 'material', 'presentation', 'checkpoint', 'quiz')),
  content_url text,
  content_body text,
  estimated_minutes int,
  sort_order int not null default 0,
  is_required boolean not null default true,
  xp_reward int not null default 10,
  icon text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 4. STUDENT JOURNEYS (personalized instances)
-- ============================================================
create table public.student_journeys (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id),
  template_id uuid references public.journey_templates(id),
  mentorship_id uuid references public.mentorships(id),
  title text not null,
  status text not null default 'active' check (status in ('active', 'paused', 'completed', 'archived')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  total_xp int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(student_id, template_id)
);

-- ============================================================
-- 5. STUDENT JOURNEY PHASES (copy of template, customizable)
-- ============================================================
create table public.student_journey_phases (
  id uuid primary key default gen_random_uuid(),
  journey_id uuid not null references public.student_journeys(id) on delete cascade,
  template_phase_id uuid references public.journey_template_phases(id),
  title text not null,
  description text,
  sort_order int not null default 0,
  status text not null default 'locked' check (status in ('locked', 'available', 'in_progress', 'completed')),
  unlock_rule text not null default 'all_previous',
  unlock_threshold int default 100,
  icon text,
  color text,
  unlocked_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 6. STUDENT JOURNEY NODES (copy of template + progress)
-- ============================================================
create table public.student_journey_nodes (
  id uuid primary key default gen_random_uuid(),
  phase_id uuid not null references public.student_journey_phases(id) on delete cascade,
  template_node_id uuid references public.journey_template_nodes(id),
  title text not null,
  description text,
  content_type text not null check (content_type in ('task', 'material', 'presentation', 'checkpoint', 'quiz')),
  content_url text,
  content_body text,
  estimated_minutes int,
  sort_order int not null default 0,
  is_required boolean not null default true,
  xp_reward int not null default 10,
  icon text,
  status text not null default 'locked' check (status in ('locked', 'available', 'in_progress', 'completed', 'skipped')),
  completed_at timestamptz,
  started_at timestamptz,
  submission_url text,
  submission_note text,
  mentor_feedback text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================
create trigger update_journey_templates_updated_at before update on public.journey_templates for each row execute procedure public.update_updated_at();
create trigger update_student_journeys_updated_at before update on public.student_journeys for each row execute procedure public.update_updated_at();
create trigger update_student_journey_nodes_updated_at before update on public.student_journey_nodes for each row execute procedure public.update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.journey_templates enable row level security;
alter table public.journey_template_phases enable row level security;
alter table public.journey_template_nodes enable row level security;
alter table public.student_journeys enable row level security;
alter table public.student_journey_phases enable row level security;
alter table public.student_journey_nodes enable row level security;

-- Templates: admin full, authenticated read published
create policy jt_all_admin on public.journey_templates for all using (is_admin());
create policy jt_select_published on public.journey_templates for select using (status = 'published');

create policy jtp_all_admin on public.journey_template_phases for all using (is_admin());
create policy jtp_select_published on public.journey_template_phases for select
  using (exists (select 1 from public.journey_templates where id = template_id and status = 'published'));

create policy jtn_all_admin on public.journey_template_nodes for all using (is_admin());
create policy jtn_select_published on public.journey_template_nodes for select
  using (exists (
    select 1 from public.journey_template_phases p
    join public.journey_templates t on t.id = p.template_id
    where p.id = phase_id and t.status = 'published'
  ));

-- Student journeys: admin full, students own
create policy sj_all_admin on public.student_journeys for all using (is_admin());
create policy sj_select_own on public.student_journeys for select using (student_id = auth.uid());
create policy sj_update_own on public.student_journeys for update using (student_id = auth.uid());

create policy sjp_all_admin on public.student_journey_phases for all using (is_admin());
create policy sjp_select_own on public.student_journey_phases for select
  using (exists (select 1 from public.student_journeys where id = journey_id and student_id = auth.uid()));

create policy sjn_all_admin on public.student_journey_nodes for all using (is_admin());
create policy sjn_select_own on public.student_journey_nodes for select
  using (exists (
    select 1 from public.student_journey_phases p
    join public.student_journeys j on j.id = p.journey_id
    where p.id = phase_id and j.student_id = auth.uid()
  ));
create policy sjn_update_own on public.student_journey_nodes for update
  using (exists (
    select 1 from public.student_journey_phases p
    join public.student_journeys j on j.id = p.journey_id
    where p.id = phase_id and j.student_id = auth.uid()
  ));

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_jtp_template on public.journey_template_phases(template_id);
create index idx_jtn_phase on public.journey_template_nodes(phase_id);
create index idx_sj_student on public.student_journeys(student_id);
create index idx_sj_template on public.student_journeys(template_id);
create index idx_sjp_journey on public.student_journey_phases(journey_id);
create index idx_sjn_phase on public.student_journey_nodes(phase_id);

-- ============================================================
-- FUNCTION: assign_journey_to_student
-- Copies a template into personalized student journey
-- ============================================================
create or replace function public.assign_journey_to_student(
  p_template_id uuid,
  p_student_id uuid,
  p_mentorship_id uuid default null
)
returns uuid as $$
declare
  v_journey_id uuid;
  v_template_title text;
  v_phase_record record;
  v_new_phase_id uuid;
  v_first_phase boolean := true;
begin
  -- Get template title
  select title into v_template_title
  from public.journey_templates
  where id = p_template_id and status = 'published';

  if v_template_title is null then
    raise exception 'Template not found or not published';
  end if;

  -- Create student journey
  insert into public.student_journeys (student_id, template_id, mentorship_id, title, status)
  values (p_student_id, p_template_id, p_mentorship_id, v_template_title, 'active')
  returning id into v_journey_id;

  -- Copy phases
  for v_phase_record in
    select * from public.journey_template_phases
    where template_id = p_template_id
    order by sort_order asc
  loop
    insert into public.student_journey_phases (
      journey_id, template_phase_id, title, description, sort_order,
      status, unlock_rule, unlock_threshold, icon, color, unlocked_at
    ) values (
      v_journey_id, v_phase_record.id, v_phase_record.title, v_phase_record.description,
      v_phase_record.sort_order,
      case when v_first_phase then 'available' else 'locked' end,
      v_phase_record.unlock_rule, v_phase_record.unlock_threshold,
      v_phase_record.icon, v_phase_record.color,
      case when v_first_phase then now() else null end
    ) returning id into v_new_phase_id;

    -- Copy nodes for this phase
    insert into public.student_journey_nodes (
      phase_id, template_node_id, title, description, content_type,
      content_url, content_body, estimated_minutes, sort_order,
      is_required, xp_reward, icon, status
    )
    select
      v_new_phase_id, id, title, description, content_type,
      content_url, content_body, estimated_minutes, sort_order,
      is_required, xp_reward, icon,
      case when v_first_phase then 'available' else 'locked' end
    from public.journey_template_nodes
    where phase_id = v_phase_record.id
    order by sort_order asc;

    v_first_phase := false;
  end loop;

  return v_journey_id;
end;
$$ language plpgsql security definer;

-- ============================================================
-- FUNCTION: check_phase_unlock
-- Checks if next phases should be unlocked based on completion
-- ============================================================
create or replace function public.check_phase_unlock(p_journey_id uuid)
returns void as $$
declare
  v_phase record;
  v_prev_phase record;
  v_required_count int;
  v_completed_count int;
  v_completion_pct int;
begin
  v_prev_phase := null;

  for v_phase in
    select * from public.student_journey_phases
    where journey_id = p_journey_id
    order by sort_order asc
  loop
    -- Skip if already available or completed
    if v_phase.status in ('available', 'in_progress', 'completed') then
      v_prev_phase := v_phase;

      -- Check if in_progress phase should be marked completed
      if v_phase.status in ('available', 'in_progress') then
        select count(*), count(*) filter (where status = 'completed')
        into v_required_count, v_completed_count
        from public.student_journey_nodes
        where phase_id = v_phase.id and is_required = true;

        if v_required_count > 0 and v_completed_count = v_required_count then
          update public.student_journey_phases
          set status = 'completed', completed_at = now()
          where id = v_phase.id;
          v_prev_phase.status := 'completed';
        elsif v_completed_count > 0 then
          update public.student_journey_phases
          set status = 'in_progress'
          where id = v_phase.id and status = 'available';
        end if;
      end if;

      continue;
    end if;

    -- Phase is locked — check if it should unlock
    if v_prev_phase is null then
      -- First phase should always be available
      update public.student_journey_phases
      set status = 'available', unlocked_at = now()
      where id = v_phase.id;

      update public.student_journey_nodes
      set status = 'available'
      where phase_id = v_phase.id and status = 'locked';

      v_prev_phase := v_phase;
      v_prev_phase.status := 'available';
      continue;
    end if;

    -- Check previous phase based on unlock rule
    if v_phase.unlock_rule = 'manual' then
      -- Manual unlock only — skip
      v_prev_phase := v_phase;
      continue;
    end if;

    -- Count required nodes in previous phase
    select count(*), count(*) filter (where status = 'completed')
    into v_required_count, v_completed_count
    from public.student_journey_nodes
    where phase_id = v_prev_phase.id and is_required = true;

    if v_required_count = 0 then
      v_completion_pct := 100;
    else
      v_completion_pct := (v_completed_count * 100) / v_required_count;
    end if;

    if v_phase.unlock_rule = 'all_previous' and v_completion_pct = 100 then
      -- Unlock
      update public.student_journey_phases
      set status = 'available', unlocked_at = now()
      where id = v_phase.id;

      update public.student_journey_nodes
      set status = 'available'
      where phase_id = v_phase.id and status = 'locked';
    elsif v_phase.unlock_rule = 'percent_previous' and v_completion_pct >= coalesce(v_phase.unlock_threshold, 100) then
      -- Unlock
      update public.student_journey_phases
      set status = 'available', unlocked_at = now()
      where id = v_phase.id;

      update public.student_journey_nodes
      set status = 'available'
      where phase_id = v_phase.id and status = 'locked';
    end if;

    v_prev_phase := v_phase;
  end loop;
end;
$$ language plpgsql security definer;
