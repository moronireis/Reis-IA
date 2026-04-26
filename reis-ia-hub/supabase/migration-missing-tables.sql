-- ==========================================================================
-- REIS IA [HUB] — Missing Tables Migration
-- Tables used in code but previously without migration scripts.
-- Run in Supabase SQL Editor.
-- Created: 2026-04-08
-- ==========================================================================

-- ============================================================
-- 1. COURSES (Academy catalog)
-- ============================================================
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  thumbnail_url text,
  instructor text,
  category text, -- 'builders', 'systems', 'marketing'
  level text default 'beginner' check (level in ('beginner', 'intermediate', 'advanced')),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  access_level text not null default 'all', -- role required to access
  total_lessons integer not null default 0,
  estimated_hours numeric(5,1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_courses_status on public.courses(status);
create index if not exists idx_courses_sort on public.courses(sort_order);

-- ============================================================
-- 2. LESSONS (individual lessons within a course)
-- ============================================================
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  content text, -- markdown or HTML body
  video_url text,
  duration_minutes integer,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  type text default 'video' check (type in ('video', 'text', 'quiz', 'exercise')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_lessons_course on public.lessons(course_id);
create index if not exists idx_lessons_sort on public.lessons(sort_order);

-- ============================================================
-- 3. USER_PROGRESS (tracks lesson completion per user)
-- ============================================================
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

create index if not exists idx_progress_user on public.user_progress(user_id);
create index if not exists idx_progress_course on public.user_progress(course_id);

-- ============================================================
-- 4. POSTS (Community feed)
-- ============================================================
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  space_id text not null default 'general',
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  content text not null,
  pinned boolean not null default false,
  likes_count integer not null default 0,
  comments_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_posts_space on public.posts(space_id);
create index if not exists idx_posts_author on public.posts(author_id);
create index if not exists idx_posts_pinned on public.posts(pinned desc, created_at desc);

-- ============================================================
-- 5. POST_LIKES (like tracking for posts)
-- ============================================================
create table if not exists public.post_likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(post_id, user_id)
);

create index if not exists idx_post_likes_post on public.post_likes(post_id);
create index if not exists idx_post_likes_user on public.post_likes(user_id);

-- ============================================================
-- 6. COMMENTS (used for both posts and lesson comments)
-- ============================================================
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null, -- references posts.id OR lessons.id
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  parent_id uuid references public.comments(id) on delete cascade, -- threaded replies
  created_at timestamptz not null default now()
);

create index if not exists idx_comments_post on public.comments(post_id);
create index if not exists idx_comments_author on public.comments(author_id);
create index if not exists idx_comments_parent on public.comments(parent_id);

-- ============================================================
-- 7. NOTIFICATIONS (in-app notification system)
-- ============================================================
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null default 'system', -- 'system', 'comment', 'mentoria', 'journey', etc.
  title text not null,
  body text,
  link text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_notifications_user on public.notifications(user_id);
create index if not exists idx_notifications_read on public.notifications(user_id, read);
create index if not exists idx_notifications_created on public.notifications(created_at desc);

-- ============================================================
-- 8. MENTORSHIPS (mentor-mentee relationships)
-- ============================================================
create table if not exists public.mentorships (
  id uuid primary key default gen_random_uuid(),
  mentor_id uuid not null references public.profiles(id) on delete cascade,
  mentee_id uuid not null references public.profiles(id) on delete cascade,
  program text not null default 'Builders',
  goals text,
  start_date date,
  end_date date,
  status text not null default 'active' check (status in ('active', 'paused', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_mentorships_mentor on public.mentorships(mentor_id);
create index if not exists idx_mentorships_mentee on public.mentorships(mentee_id);
create index if not exists idx_mentorships_status on public.mentorships(status);

-- ============================================================
-- 9. MENTORSHIP_SESSIONS (scheduled/completed sessions)
-- ============================================================
create table if not exists public.mentorship_sessions (
  id uuid primary key default gen_random_uuid(),
  mentorship_id uuid not null references public.mentorships(id) on delete cascade,
  date timestamptz not null,
  duration_minutes integer not null default 60,
  summary text,
  notes text,
  action_items text,
  status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled', 'no_show')),
  created_at timestamptz not null default now()
);

create index if not exists idx_msessions_mentorship on public.mentorship_sessions(mentorship_id);
create index if not exists idx_msessions_date on public.mentorship_sessions(date desc);

-- ============================================================
-- 10. MENTORSHIP_TASKS (tasks assigned within mentorship)
-- ============================================================
create table if not exists public.mentorship_tasks (
  id uuid primary key default gen_random_uuid(),
  mentorship_id uuid not null references public.mentorships(id) on delete cascade,
  title text not null,
  description text,
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'done')),
  category text default 'builders' check (category in ('systems', 'marketing', 'builders')),
  assigned_to text not null default 'mentee' check (assigned_to in ('mentor', 'mentee')),
  due_date date,
  link text,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_mtasks_mentorship on public.mentorship_tasks(mentorship_id);
create index if not exists idx_mtasks_status on public.mentorship_tasks(status);
create index if not exists idx_mtasks_assigned on public.mentorship_tasks(assigned_to);

-- ============================================================
-- 11. VAULT_CATEGORIES (resource library categories)
-- ============================================================
create table if not exists public.vault_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text, -- SVG icon name or path
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_vault_cats_sort on public.vault_categories(sort_order);

-- ============================================================
-- 12. VAULT_RESOURCES (downloadable resources)
-- ============================================================
create table if not exists public.vault_resources (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.vault_categories(id) on delete set null,
  title text not null,
  description text,
  type text not null default 'document' check (type in ('document', 'template', 'video', 'tool', 'link', 'framework')),
  url text, -- download or external URL
  file_size text,
  access_level text not null default 'all', -- 'all', 'builders', 'systems', 'mentoria'
  downloads integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_vault_res_category on public.vault_resources(category_id);
create index if not exists idx_vault_res_type on public.vault_resources(type);
create index if not exists idx_vault_res_access on public.vault_resources(access_level);

-- ============================================================
-- 13. BRANDING_FORMS (questionnaire responses)
-- ============================================================
create table if not exists public.branding_forms (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  mentorship_id uuid references public.mentorships(id) on delete set null,
  form_type text not null check (form_type in ('personal-branding', 'company-branding', 'product-branding', 'movement-branding')),
  data jsonb not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'submitted', 'reviewed', 'approved')),
  review_notes text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_bforms_user on public.branding_forms(user_id);
create index if not exists idx_bforms_type on public.branding_forms(form_type);
create index if not exists idx_bforms_status on public.branding_forms(status);

-- ============================================================
-- 14. LEADS (inbound leads from website/typebot)
-- ============================================================
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  external_id text,
  crm_ref text,
  name text,
  whatsapp text,
  email text,
  company text,
  segment text,
  role text,
  revenue text,
  employees text,
  booking_date text,
  booking_time text,
  source text default 'website',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'converted', 'lost')),
  raw_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_leads_source on public.leads(source);
create index if not exists idx_leads_created on public.leads(created_at desc);

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- Courses: everyone can read published, admin manages all
alter table public.courses enable row level security;
create policy "Anyone can view published courses" on public.courses for select using (status = 'published');
create policy "Admins can manage courses" on public.courses for all using (is_admin());

-- Lessons: everyone can read published, admin manages all
alter table public.lessons enable row level security;
create policy "Anyone can view published lessons" on public.lessons for select
  using (exists (select 1 from public.courses where id = course_id and status = 'published'));
create policy "Admins can manage lessons" on public.lessons for all using (is_admin());

-- User progress: own data only
alter table public.user_progress enable row level security;
create policy "Users can view own progress" on public.user_progress for select using (user_id = auth.uid());
create policy "Users can insert own progress" on public.user_progress for insert with check (user_id = auth.uid());
create policy "Admins can manage progress" on public.user_progress for all using (is_admin());

-- Posts: everyone can read, own can write
alter table public.posts enable row level security;
create policy "Anyone can read posts" on public.posts for select using (true);
create policy "Users can create posts" on public.posts for insert with check (author_id = auth.uid());
create policy "Users can update own posts" on public.posts for update using (author_id = auth.uid());
create policy "Users can delete own posts" on public.posts for delete using (author_id = auth.uid());
create policy "Admins can manage posts" on public.posts for all using (is_admin());

-- Post likes: own likes only
alter table public.post_likes enable row level security;
create policy "Anyone can read likes" on public.post_likes for select using (true);
create policy "Users can insert own likes" on public.post_likes for insert with check (user_id = auth.uid());
create policy "Users can delete own likes" on public.post_likes for delete using (user_id = auth.uid());
create policy "Admins can manage likes" on public.post_likes for all using (is_admin());

-- Comments: everyone can read, own can write
alter table public.comments enable row level security;
create policy "Anyone can read comments" on public.comments for select using (true);
create policy "Users can create comments" on public.comments for insert with check (author_id = auth.uid());
create policy "Users can delete own comments" on public.comments for delete using (author_id = auth.uid());
create policy "Admins can manage comments" on public.comments for all using (is_admin());

-- Notifications: own only
alter table public.notifications enable row level security;
create policy "Users can view own notifications" on public.notifications for select using (user_id = auth.uid());
create policy "Users can update own notifications" on public.notifications for update using (user_id = auth.uid());
create policy "Admins can manage notifications" on public.notifications for all using (is_admin());
-- Allow service role inserts (for server-side notify functions)

-- Mentorships: participants and admins
alter table public.mentorships enable row level security;
create policy "Participants can view own mentorships" on public.mentorships for select
  using (mentor_id = auth.uid() or mentee_id = auth.uid());
create policy "Admins can manage mentorships" on public.mentorships for all using (is_admin());

-- Mentorship sessions: via mentorship access
alter table public.mentorship_sessions enable row level security;
create policy "Participants can view sessions" on public.mentorship_sessions for select
  using (exists (
    select 1 from public.mentorships
    where id = mentorship_id
    and (mentor_id = auth.uid() or mentee_id = auth.uid())
  ));
create policy "Admins can manage sessions" on public.mentorship_sessions for all using (is_admin());

-- Mentorship tasks: via mentorship access
alter table public.mentorship_tasks enable row level security;
create policy "Participants can view tasks" on public.mentorship_tasks for select
  using (exists (
    select 1 from public.mentorships
    where id = mentorship_id
    and (mentor_id = auth.uid() or mentee_id = auth.uid())
  ));
create policy "Participants can update task status" on public.mentorship_tasks for update
  using (exists (
    select 1 from public.mentorships
    where id = mentorship_id
    and (mentor_id = auth.uid() or mentee_id = auth.uid())
  ));
create policy "Admins can manage tasks" on public.mentorship_tasks for all using (is_admin());

-- Vault categories: everyone reads, admin manages
alter table public.vault_categories enable row level security;
create policy "Anyone can read vault categories" on public.vault_categories for select using (true);
create policy "Admins can manage vault categories" on public.vault_categories for all using (is_admin());

-- Vault resources: everyone reads (filtered by access_level in code), admin manages
alter table public.vault_resources enable row level security;
create policy "Anyone can read vault resources" on public.vault_resources for select using (true);
create policy "Admins can manage vault resources" on public.vault_resources for all using (is_admin());

-- Branding forms: own data, admin manages
alter table public.branding_forms enable row level security;
create policy "Users can view own forms" on public.branding_forms for select using (user_id = auth.uid());
create policy "Users can create own forms" on public.branding_forms for insert with check (user_id = auth.uid());
create policy "Users can update own forms" on public.branding_forms for update using (user_id = auth.uid());
create policy "Users can delete own forms" on public.branding_forms for delete using (user_id = auth.uid());
create policy "Admins can manage forms" on public.branding_forms for all using (is_admin());

-- Leads: admin only
alter table public.leads enable row level security;
create policy "Admins can manage leads" on public.leads for all using (is_admin());

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================
create trigger update_courses_updated_at before update on public.courses for each row execute procedure public.update_updated_at();
create trigger update_lessons_updated_at before update on public.lessons for each row execute procedure public.update_updated_at();
create trigger update_posts_updated_at before update on public.posts for each row execute procedure public.update_updated_at();
create trigger update_mentorships_updated_at before update on public.mentorships for each row execute procedure public.update_updated_at();
create trigger update_vault_resources_updated_at before update on public.vault_resources for each row execute procedure public.update_updated_at();
create trigger update_branding_forms_updated_at before update on public.branding_forms for each row execute procedure public.update_updated_at();
