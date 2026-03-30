---
name: reis-ia-hub Supabase Integration Pattern
description: Auth flow, server client, API routes, and data fetch patterns used in reis-ia-hub
type: project
---

Full Supabase integration completed 2026-03-25. Key patterns:

**Auth flow:**
- Login page calls `supabase.auth.signInWithPassword()` client-side, then POSTs tokens to `/api/auth/callback`
- `/api/auth/callback` sets `sb-access-token` (1h) and `sb-refresh-token` (7d) as httpOnly cookies
- Middleware (`src/middleware.ts`) reads cookies, verifies with `supabase.auth.getUser()`, refreshes if expired
- Logout: POST to `/api/auth/logout` clears both cookies, redirect to `/login`

**Two Supabase clients:**
- `src/lib/supabase.ts` — anon key, for client-side (auth only)
- `src/lib/supabase-server.ts` — service_role key via `createServerClient()`, for server-side only (API routes, .astro frontmatter, middleware)
- NEVER expose service_role key to client

**Middleware guards:**
- Public paths: `/`, `/login`, `/register`, `/api/auth/*`
- Admin routes (`/admin/*`, `/api/tasks`, `/api/deals`, `/api/projects`) blocked for non-admin roles
- `/api/profile` is open to any authenticated user
- `context.locals.user` and `context.locals.profile` set by middleware

**Page pattern (SSR pages):**
- All dynamic pages must have `export const prerender = false`
- AppLayout.astro has `export const prerender = false` at the top
- Fetch data server-side in frontmatter using `createServerClient()`
- Pass data as props to React islands: `<TaskBoard client:load initialTasks={tasks || []} />`

**React island pattern:**
- Accept `initialTasks` / `initialDeals` as props (server-fetched)
- All mutations go through API routes (`/api/tasks`, `/api/deals`, `/api/projects`)
- Use optimistic updates: update local state first, revert on API error
- Show error banner on failure, clear with × button

**API routes structure:**
- `/api/tasks/index.ts` — GET all, POST create
- `/api/tasks/[id].ts` — PATCH update, DELETE
- `/api/deals/index.ts` — GET all, POST create
- `/api/deals/[id].ts` — PATCH update, DELETE
- `/api/projects/index.ts` — GET all, POST create
- `/api/projects/[id].ts` — GET single (with phases + clientActions), PATCH, DELETE
- `/api/profile.ts` — PATCH (updates full_name, company, phone only)

**Database column naming:**
- Supabase uses snake_case: `contact_name`, `project_name`, `assignee_name`, `last_activity`, `created_at`
- React components use these exact field names (not camelCase)

**Why:** Confirmed working via clean `npm run build` with zero errors/warnings.
**How to apply:** Follow this exact pattern for any new pages or components that need Supabase data.
