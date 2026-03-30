-- ==========================================================================
-- REIS IA [HUB] — RLS Policies
-- Paste this into the Supabase SQL Editor at:
-- https://weirdpigeon-supabase.cloudfy.live (Dashboard > SQL Editor)
-- ==========================================================================

-- PROFILES
create policy profiles_select_own on public.profiles for select using (auth.uid() = id);
create policy profiles_select_admin on public.profiles for select using (is_admin());
create policy profiles_update_own on public.profiles for update using (auth.uid() = id);
create policy profiles_update_admin on public.profiles for update using (is_admin());

-- PROJECTS
create policy projects_select_client on public.projects for select using (client_id = auth.uid());
create policy projects_all_admin on public.projects for all using (is_admin());

-- PROJECT PHASES
create policy phases_select_client on public.project_phases for select using (exists (select 1 from public.projects where id = project_id and client_id = auth.uid()));
create policy phases_all_admin on public.project_phases for all using (is_admin());

-- CLIENT ACTIONS
create policy actions_select_client on public.client_actions for select using (exists (select 1 from public.projects where id = project_id and client_id = auth.uid()));
create policy actions_update_client on public.client_actions for update using (exists (select 1 from public.projects where id = project_id and client_id = auth.uid()));
create policy actions_all_admin on public.client_actions for all using (is_admin());

-- TASKS (admin only)
create policy tasks_all_admin on public.tasks for all using (is_admin());

-- CONTACTS (admin only)
create policy contacts_all_admin on public.contacts for all using (is_admin());

-- DEALS (admin only)
create policy deals_all_admin on public.deals for all using (is_admin());

-- DEAL ACTIVITIES (admin only)
create policy activities_all_admin on public.deal_activities for all using (is_admin());

-- MESSAGES
create policy messages_select_participant on public.messages for select using (sender_id = auth.uid() or exists (select 1 from public.projects where id = project_id and client_id = auth.uid()));
create policy messages_insert_sender on public.messages for insert with check (sender_id = auth.uid());
create policy messages_all_admin on public.messages for all using (is_admin());
