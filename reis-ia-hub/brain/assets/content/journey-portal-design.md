# Journey Portal — Comprehensive Design Document

Last updated: April 2026

---

## 1. Executive Summary

The Journey Portal is the central learning experience within REIS IA HUB. It provides mentees and Founders Beta participants with a structured, interactive path through implementation phases — from onboarding through advanced AI revenue strategies. This document synthesizes perspectives from UX design, frontend architecture, data modeling, and educational strategy into a unified design specification for the Journey Portal's next evolution.

### Current State

The portal already includes:
- **6-table Supabase schema**: Templates, template phases, template nodes, student journeys, student journey phases, student journey nodes.
- **Admin Builder** (`JourneyAdminBuilder.tsx`): Create/edit templates with phases and nodes, assign to students, publish/archive lifecycle.
- **Student Experience** (`JourneyExperience.tsx`): Constellation-style phase map with ambient particles, phase circles, node grid, content overlay with markdown rendering.
- **Dashboard** (`JourneyDashboard.tsx`): Overview of all assigned journeys with progress bars.
- **Content Overlay** (`ContentOverlay.tsx`): Full node detail view with status actions, submissions, and mentor feedback.
- **Graph Animations** (`graphAnimations.ts`): Pulse, ring, particle, ripple, and glow keyframe animations.
- **API Routes**: Template CRUD, student journey CRUD, assignment endpoint.
- **Dedicated Layout** (`JourneyLayout.astro`): Separate layout for immersive journey view.

### Design Goals for Next Phase

1. **Deepen engagement**: Move from a functional task-completion tool to an experience that creates momentum and emotional investment.
2. **Support diverse content types**: The 5 node types (task, material, presentation, checkpoint, quiz) need differentiated experiences, not just different labels.
3. **Enable mentor-student dialogue**: Checkpoints and submissions need proper feedback loops, not just a text field.
4. **Surface progress meaningfully**: XP and percentages are a start, but the portal needs streaks, milestones, and narrative progression.
5. **Scale to multiple programs**: The template system supports this, but the UX assumes a single journey per student today.

---

## 2. Information Architecture

### 2.1 Navigation Model

```
/journey                    → Journey Dashboard (list of active journeys)
/journey/[id]               → Journey Experience (phase map + node interaction)
/journey/[id]/checkpoint/[nodeId]  → Checkpoint submission view (new)
/admin/journeys             → Template builder + assignment management
/admin/journeys/analytics   → Journey-level analytics (new)
```

### 2.2 Content Hierarchy

```
Journey (title, status, XP, dates)
  └─ Phase (title, description, status, unlock rules)
       └─ Node (title, type, content, XP, status)
            └─ Submission (URL, note, timestamp) — for task/checkpoint
            └─ Mentor Feedback (text, timestamp) — for checkpoint
            └─ Quiz Response (answers, score) — for quiz (new)
```

### 2.3 User Roles & Permissions

| Action | Student | Admin/Mentor |
|--------|---------|-------------|
| View own journeys | Yes | Yes (all students) |
| Start/complete nodes | Yes (own journey) | Yes (any journey) |
| Submit task deliverables | Yes | Yes |
| View mentor feedback | Yes (own) | Yes (all) |
| Provide feedback on checkpoints | No | Yes |
| Unlock phases manually | No | Yes |
| Create/edit templates | No | Yes |
| Assign journeys | No | Yes |
| View analytics | No | Yes |

---

## 3. UX Design Specification

### 3.1 Phase Map — Visual Language

The current constellation metaphor is strong and brand-aligned. Refinements:

**Phase Circle States:**

| State | Visual | Interaction |
|-------|--------|-------------|
| Locked | Dark (#0A0A0A), dim border, 40% opacity | Non-interactive, tooltip explains prerequisite |
| Available | Soft blue glow, pulsing border (rgba(74,144,255,0.25)) | Click to expand phase, gentle pulse animation |
| In Progress | Active blue (#4A90FF), stronger glow, ring animation | Click to expand, shows node progress inside circle |
| Completed | Green (#22C55E), solid border, check icon | Click to review, no pulse |

**Connectors between phases:**
- Completed-to-next: Animated gradient line (#4A90FF) with flowing particle effect.
- Locked-to-locked: Dim dotted line (rgba(255,255,255,0.06)).
- Active-to-locked: Pulsing endpoint indicating "almost there."

**New: Mini progress ring** — Each phase circle shows a thin circular progress indicator (arc) representing node completion within that phase. Replaces the need to click to see progress.

### 3.2 Node Grid — Differentiated by Type

When a phase is expanded, nodes render in a responsive grid. Each content type gets a distinct visual treatment:

**Task** (blue #4A90FF):
- Card with checklist icon.
- Shows estimated time.
- "Entregar" (submit) CTA when in progress.
- Displays submission status after completion.

**Material** (green #22C55E):
- Card with document/book icon.
- "Ler" or "Assistir" CTA depending on content_url type.
- Auto-completes on open (mark as read after 30s on page).

**Presentation** (purple #8B5CF6):
- Card with slides icon.
- Opens content in a wider overlay or full-screen modal.
- Supports embedded iframes (Google Slides, Loom).

**Checkpoint** (amber #F59E0B):
- Visually distinct — larger card, border accent.
- Two-part flow: student submits, then waits for mentor review.
- Status states: awaiting submission → submitted → reviewed (approved/revision needed).
- Mentor feedback displayed inline with timestamp.

**Quiz** (pink #EC4899):
- Card with question-mark icon.
- Opens dedicated quiz overlay with multiple-choice or short-answer.
- Shows score after completion. Retry allowed if score < threshold.

### 3.3 Content Overlay Enhancements

The existing `ContentOverlay.tsx` handles basic node detail. Enhancements:

1. **Type-aware layouts**: Material nodes show full-width reading view. Task nodes show split: instructions left, submission form right. Quiz nodes render question-by-question.

2. **Submission workflow** (Task/Checkpoint):
   - Text field for notes.
   - URL field for deliverable links.
   - File upload placeholder (future — V2 with Supabase Storage).
   - Submission history (if resubmission is allowed).

3. **Mentor feedback panel** (Checkpoint):
   - Admin sees a feedback form when reviewing a checkpoint submission.
   - Approve / Request Revision buttons.
   - Feedback text with rich formatting.
   - Student sees feedback inline with status badge (Approved / Revisar).

4. **Navigation within overlay**:
   - Previous / Next node buttons.
   - Keyboard shortcuts: left/right arrows, Escape to close.

### 3.4 Progress & Motivation System

**XP Display:**
- Total XP in journey header (current).
- New: XP gained per session shown as a brief toast notification.
- New: XP breakdown per phase visible in expanded phase view.

**Streak System (new):**
- Track consecutive days with at least one node completed.
- Display streak counter in journey header.
- Visual celebration at streak milestones (7, 14, 30 days).
- No penalty messaging for broken streaks — just positive reinforcement.

**Milestone Moments (new):**
- Phase completion triggers a full-screen brief celebration animation.
- Journey completion triggers a distinct "graduation" animation with total stats.
- First submission, first checkpoint approval — small celebrations.

**Progress Narrative:**
- Replace generic "X% complete" with contextual messages:
  - 0-10%: "Comecando a jornada"
  - 11-30%: "Ganhando ritmo"
  - 31-50%: "Na metade do caminho"
  - 51-75%: "Reta final se aproximando"
  - 76-99%: "Quase la"
  - 100%: "Jornada concluida"

### 3.5 Mobile Experience

Current implementation already detects mobile via viewport width. Refinements:

- Phase map: Vertical linear layout (no zigzag) with swipe gestures between phases.
- Node grid: Single column, stacked cards.
- Content overlay: Full-screen bottom sheet (slide up from bottom) instead of centered modal.
- Reduce ambient particles on mobile for performance.
- Touch-friendly: Minimum 44px tap targets on all interactive elements.

---

## 4. Frontend Architecture

### 4.1 Component Structure

```
src/
  components/
    journey/
      JourneyExperience.tsx      — Root component (existing, enhanced)
      PhaseMap.tsx                — Phase constellation view (extract from JourneyExperience)
      PhaseDetail.tsx             — Expanded phase with node grid (new)
      NodeCard.tsx                — Individual node card by type (new)
      ContentOverlay.tsx          — Node detail overlay (existing, enhanced)
      CheckpointFlow.tsx          — Checkpoint submission + review flow (new)
      QuizEngine.tsx              — Quiz question rendering + scoring (new)
      ProgressBar.tsx             — Shared progress components (new)
      CelebrationOverlay.tsx      — Milestone animations (new)
      MarkdownRenderer.tsx        — Markdown content rendering (existing)
      graphAnimations.ts          — CSS keyframes (existing)
    JourneyDashboard.tsx         — Journey list view (existing)
    JourneyAdminBuilder.tsx      — Template CRUD (existing)
    JourneyMap.tsx               — Legacy map component (deprecate, merge into JourneyExperience)
```

### 4.2 State Management

Current approach uses React `useState` within each component. For the enhanced version:

**Local state (keep in components):**
- UI state: selected phase, overlay open/closed, animation triggers.
- Form state: submission inputs, quiz answers.

**Lifted state (pass via props from JourneyExperience):**
- Journey data (phases, nodes, statuses).
- Node update handler (optimistic updates + API call).
- Admin/student mode.

**No global state library needed** — the journey is self-contained, loaded fresh on each page visit. Prop drilling through 2-3 levels is acceptable for this scope.

### 4.3 API Integration Pattern

All mutations follow the existing pattern:
```typescript
// Optimistic update → API call → rollback on failure
const handleNodeUpdate = async (nodeId: string, updates: Partial<JourneyNode>) => {
  const prev = { ...currentNode };
  setNode({ ...currentNode, ...updates }); // optimistic
  
  const res = await fetch(`/api/journeys/student/${journeyId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ node_id: nodeId, ...updates }),
  });
  
  if (!res.ok) {
    setNode(prev); // rollback
  }
};
```

### 4.4 New API Endpoints Needed

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/journeys/student/[id]/submit` | POST | Submit task/checkpoint deliverable |
| `/api/journeys/student/[id]/feedback` | POST | Admin: provide checkpoint feedback |
| `/api/journeys/student/[id]/quiz` | POST | Submit quiz answers, return score |
| `/api/journeys/student/[id]/streak` | GET | Get student's current streak data |
| `/api/journeys/analytics` | GET | Admin: journey completion analytics |

### 4.5 Performance Considerations

- **Lazy load content_body**: Only fetch markdown content when overlay opens, not on page load.
- **Virtualize long node lists**: If a phase has 20+ nodes, use intersection observer for render.
- **Reduce animation on low-power**: Respect `prefers-reduced-motion` media query — disable particles, pulse, and celebration animations.
- **Image optimization**: Any embedded images in content_body should use responsive loading.

---

## 5. Data Model Extensions

### 5.1 New Tables

**journey_submissions** — Separates submission history from the node itself, enabling resubmissions:

```sql
create table public.journey_submissions (
  id uuid primary key default gen_random_uuid(),
  node_id uuid not null references public.student_journey_nodes(id) on delete cascade,
  student_id uuid not null references public.profiles(id),
  submission_url text,
  submission_note text,
  file_url text,           -- future: Supabase Storage
  status text not null default 'submitted' 
    check (status in ('submitted', 'approved', 'revision_needed')),
  mentor_feedback text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
```

**journey_quiz_responses** — Structured quiz data:

```sql
create table public.journey_quiz_responses (
  id uuid primary key default gen_random_uuid(),
  node_id uuid not null references public.student_journey_nodes(id) on delete cascade,
  student_id uuid not null references public.profiles(id),
  answers jsonb not null default '[]',
  score int,
  max_score int,
  passed boolean not null default false,
  attempt_number int not null default 1,
  created_at timestamptz not null default now()
);
```

**student_streaks** — Streak tracking:

```sql
create table public.student_streaks (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id),
  journey_id uuid not null references public.student_journeys(id) on delete cascade,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  last_activity_date date,
  updated_at timestamptz not null default now(),
  unique(student_id, journey_id)
);
```

### 5.2 Schema Modifications to Existing Tables

**journey_template_nodes** — Add quiz configuration:

```sql
alter table public.journey_template_nodes 
  add column quiz_config jsonb;
-- quiz_config structure:
-- {
--   "questions": [
--     {
--       "id": "q1",
--       "text": "...",
--       "type": "multiple_choice" | "short_answer",
--       "options": ["A", "B", "C", "D"],
--       "correct_answer": "B",
--       "points": 10
--     }
--   ],
--   "pass_threshold": 70,
--   "max_attempts": 3
-- }
```

**student_journey_nodes** — Add checkpoint review status:

```sql
alter table public.student_journey_nodes
  add column review_status text check (review_status in ('pending', 'approved', 'revision_needed'));
```

### 5.3 New Database Functions

**update_streak** — Called on each node completion:

```sql
create or replace function public.update_student_streak(
  p_student_id uuid,
  p_journey_id uuid
) returns void as $$
declare
  v_last_date date;
  v_today date := current_date;
begin
  select last_activity_date into v_last_date
  from public.student_streaks
  where student_id = p_student_id and journey_id = p_journey_id;

  if v_last_date is null then
    insert into public.student_streaks (student_id, journey_id, current_streak, longest_streak, last_activity_date)
    values (p_student_id, p_journey_id, 1, 1, v_today);
  elsif v_last_date = v_today then
    -- Already logged today, no change
    null;
  elsif v_last_date = v_today - 1 then
    -- Consecutive day
    update public.student_streaks
    set current_streak = current_streak + 1,
        longest_streak = greatest(longest_streak, current_streak + 1),
        last_activity_date = v_today,
        updated_at = now()
    where student_id = p_student_id and journey_id = p_journey_id;
  else
    -- Streak broken, reset to 1
    update public.student_streaks
    set current_streak = 1,
        last_activity_date = v_today,
        updated_at = now()
    where student_id = p_student_id and journey_id = p_journey_id;
  end if;
end;
$$ language plpgsql security definer;
```

### 5.4 RLS Policies for New Tables

```sql
-- journey_submissions
alter table public.journey_submissions enable row level security;
create policy js_all_admin on public.journey_submissions for all using (is_admin());
create policy js_select_own on public.journey_submissions for select using (student_id = auth.uid());
create policy js_insert_own on public.journey_submissions for insert with check (student_id = auth.uid());

-- journey_quiz_responses
alter table public.journey_quiz_responses enable row level security;
create policy jqr_all_admin on public.journey_quiz_responses for all using (is_admin());
create policy jqr_select_own on public.journey_quiz_responses for select using (student_id = auth.uid());
create policy jqr_insert_own on public.journey_quiz_responses for insert with check (student_id = auth.uid());

-- student_streaks
alter table public.student_streaks enable row level security;
create policy ss_all_admin on public.student_streaks for all using (is_admin());
create policy ss_select_own on public.student_streaks for select using (student_id = auth.uid());
```

---

## 6. Educational Strategy

### 6.1 Content Type Guidelines

Each node type serves a specific pedagogical purpose:

| Type | Purpose | Completion Criteria | Mentor Involvement |
|------|---------|--------------------|--------------------|
| Material | Knowledge transfer | Auto-complete on view (30s threshold) | None |
| Presentation | Structured learning | Auto-complete on view | None |
| Task | Applied practice | Student submits deliverable | Optional review |
| Checkpoint | Validated milestone | Requires mentor approval | Required |
| Quiz | Knowledge verification | Score >= pass threshold | None (automated) |

### 6.2 Recommended Phase Structure

Each journey phase should follow this pattern:

1. **Material/Presentation nodes first** — Provide context and knowledge.
2. **Task nodes in the middle** — Apply what was learned.
3. **Quiz node (optional)** — Verify retention.
4. **Checkpoint as final node** — Validate with mentor before progressing.

### 6.3 XP Distribution Guidelines

| Node Type | Suggested XP Range | Rationale |
|-----------|-------------------|-----------|
| Material | 5-10 XP | Low effort, consumption only |
| Presentation | 5-10 XP | Same as material |
| Task | 15-30 XP | Requires active work |
| Quiz | 10-20 XP | Mental effort, can retry |
| Checkpoint | 30-50 XP | Highest value, mentor-validated |

### 6.4 Unlock Rules Strategy

- **Phase 1** (Onboarding): Always available.
- **Phase 2**: `all_previous` — Must complete everything in Phase 1.
- **Phase 3+**: `percent_previous` at 80% — Allows skipping optional nodes.
- **Final Phase**: `all_previous` — Ensures comprehensive completion.
- **Bonus phases**: `manual` — Admin unlocks for high-performers.

---

## 7. Admin Experience

### 7.1 Template Builder Enhancements

The existing `JourneyAdminBuilder.tsx` supports basic CRUD. Additions:

1. **Quiz builder**: Inline form within node editing to define questions, options, correct answers, and pass threshold. Stored in `quiz_config` JSONB.

2. **Content preview**: Preview button on each node that renders content_body markdown or loads content_url in a mini preview.

3. **Template duplication**: One-click duplicate of an entire template (with all phases and nodes) for creating variants.

4. **Bulk node operations**: Multi-select nodes for batch status change, reorder, or delete.

### 7.2 Student Progress Dashboard (Admin)

New view at `/admin/journeys/analytics`:

- **Overview metrics**: Total active journeys, average completion %, average time-to-complete.
- **Student table**: Each student with their journey, current phase, % complete, last activity, streak.
- **Bottleneck detection**: Highlight nodes where students commonly stall (time between start and complete > 2x estimated_minutes).
- **Checkpoint queue**: List of pending checkpoint submissions awaiting review, sorted by oldest first.

### 7.3 Mentor Feedback Workflow

When a student submits a checkpoint:
1. Admin receives notification (via `NotificationBell` component).
2. Admin navigates to the checkpoint from the analytics dashboard or notification.
3. Admin sees student's submission alongside the original node instructions.
4. Admin writes feedback and selects Approve or Request Revision.
5. If approved: Node marked complete, XP awarded, phase unlock check triggered.
6. If revision needed: Node status reverts to `in_progress`, student sees feedback.

---

## 8. Implementation Roadmap

### Phase 1: Component Extraction & Cleanup (1-2 days)

- Extract `PhaseMap` and `PhaseDetail` from `JourneyExperience.tsx`.
- Create `NodeCard.tsx` with type-differentiated rendering.
- Deprecate `JourneyMap.tsx` (legacy component).
- Add `prefers-reduced-motion` support to all animations.

### Phase 2: Submission & Feedback System (2-3 days)

- Create `journey_submissions` table + migration.
- Add `review_status` column to `student_journey_nodes`.
- Build `/api/journeys/student/[id]/submit` and `/api/journeys/student/[id]/feedback` endpoints.
- Build `CheckpointFlow.tsx` component.
- Enhance `ContentOverlay.tsx` for task submission.
- Add mentor feedback panel in admin view.

### Phase 3: Quiz Engine (2-3 days)

- Add `quiz_config` JSONB to `journey_template_nodes`.
- Create `journey_quiz_responses` table + migration.
- Build `QuizEngine.tsx` component.
- Build quiz builder UI in `JourneyAdminBuilder.tsx`.
- Build `/api/journeys/student/[id]/quiz` endpoint.

### Phase 4: Progress & Motivation (1-2 days)

- Create `student_streaks` table + `update_student_streak` function.
- Build streak display in journey header.
- Build `CelebrationOverlay.tsx` for milestone moments.
- Add contextual progress messages.
- Add XP toast notifications.

### Phase 5: Admin Analytics (1-2 days)

- Build `/admin/journeys/analytics` page.
- Create analytics API endpoint.
- Build checkpoint review queue.
- Add notification integration for pending reviews.

### Phase 6: Mobile Polish (1 day)

- Bottom-sheet overlay for mobile content view.
- Swipe gestures on phase map.
- Performance audit on mobile (particle reduction, lazy loading).
- 44px minimum tap target audit.

**Total estimated effort: 8-13 days**

---

## 9. Technical Constraints & Decisions

### 9.1 Decisions Made

| Decision | Rationale |
|----------|-----------|
| No global state library | Journey is self-contained, 2-3 levels of prop drilling is manageable |
| JSONB for quiz_config | Flexible schema for quiz questions without additional tables |
| Separate submissions table | Enables resubmission history, cleaner than storing in node |
| Streak in dedicated table | Avoids recalculating from node completion timestamps |
| CSS keyframe animations (no library) | Current pattern works, no need for Framer Motion dependency |
| Inline styles (current pattern) | Consistent with existing codebase; Tailwind used at layout level only |

### 9.2 Constraints

| Constraint | Impact |
|------------|--------|
| No file upload (V1) | Submissions are URL-based only. File upload deferred to V2 with Supabase Storage. |
| No real-time updates | Student must refresh to see mentor feedback. WebSocket/Supabase Realtime deferred. |
| No email notifications | Checkpoint submissions don't trigger email. Rely on in-app notification bell. |
| Single journey view | Dashboard lists journeys, but no cross-journey analytics for students yet. |

### 9.3 Future Considerations (V2+)

- **Supabase Storage** for file uploads on task/checkpoint submissions.
- **Supabase Realtime** for live feedback notifications.
- **Peer review** nodes where students review each other's submissions.
- **Branching journeys** where phase unlock depends on quiz score (high score = advanced path, low score = reinforcement path).
- **AI-assisted feedback** where the system provides preliminary feedback on submissions before mentor review.
- **Certificate generation** on journey completion.
- **Journey marketplace** for sharing templates across programs.

---

## 10. Design Tokens Reference

All Journey Portal components must use these values for visual consistency:

```
// Colors
--journey-blue:          #4A90FF
--journey-green:         #22C55E
--journey-purple:        #8B5CF6
--journey-amber:         #F59E0B
--journey-pink:          #EC4899
--journey-bg:            #000000
--journey-surface:       #0A0A0A
--journey-border:        rgba(255,255,255,0.06)
--journey-text-primary:  rgba(255,255,255,0.90)
--journey-text-secondary: rgba(255,255,255,0.50)
--journey-text-muted:    rgba(255,255,255,0.25)

// Spacing
--journey-radius-sm:     8px
--journey-radius-md:     12px
--journey-radius-lg:     16px

// Animation
--journey-transition:    200ms ease
--journey-pulse-duration: 2.5s
--journey-particle-count: 16 (desktop), 0 (mobile)

// Typography (Inter)
--journey-font-size-xs:  11px
--journey-font-size-sm:  13px
--journey-font-size-md:  15px
--journey-font-size-lg:  20px
--journey-font-size-xl:  28px
```

---

## Changelog

- [ADDED -- 2026-04-05] Initial comprehensive design document created, synthesizing UX, architecture, data model, and educational strategy perspectives.
