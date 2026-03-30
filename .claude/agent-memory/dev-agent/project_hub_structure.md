---
name: REIS IA HUB project structure
description: Astro server-side app at reis-ia-hub/ — auth, sidebar layout, project portal, Supabase
type: project
---

reis-ia-hub/ is a separate Astro project (output: server) with @astrojs/node adapter.

**Why:** Client portal for REIS IA — authenticated app with project tracking, academy, community, vault.

**How to apply:** When working on HUB, use `npm run dev` from `reis-ia-hub/` directory. Deploy adapter is @astrojs/node for dev; will swap to @astrojs/vercel for production.

Key paths:
- `src/layouts/AppLayout.astro` — sidebar + topbar layout for authenticated pages
- `src/layouts/AuthLayout.astro` — centered layout for login/register
- `src/lib/supabase.ts` — Supabase client (requires PUBLIC_SUPABASE_URL + PUBLIC_SUPABASE_ANON_KEY in .env)
- `src/styles/design-system.css` — full REIS IA token set + HUB-specific sidebar vars
- `src/styles/global.css` — Tailwind v4 import + global resets

Active pages: /login, /register, /dashboard, /projects, /projects/[id], /academy, /community, /vault, /settings
Dynamic route [id].astro requires `export const prerender = false`.
