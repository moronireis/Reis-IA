---
name: Routing and CTA destinations
description: Canonical page routes, CTA mapping, and form infrastructure for the Reis IA site
type: project
---

## Page Routes (all confirmed built)

- `/` — Home (index.astro) — static
- `/builder` — Builder sales page — static
- `/systems` — Systems service page — static
- `/marketing` — Marketing page — static
- `/agendar` — Typebot qualification + booking (v4.0, Phase 6) — SSR (`prerender = false`)
- `/aplicar` — Redirects to `/agendar?source=builders` (302) — SSR (`prerender = false`)
- `/api/leads` — Lead capture API endpoint — SSR (`prerender = false`)

## CTA Destination Rules

- "Book a call" / "Agende" / "Diagnóstico de Revenue" → `/agendar`
- "Apply" / "Candidatar-se" / "Builder program" → `/aplicar` (redirects to `/agendar?source=builders`)
- "Learn about Builder" → `/builder`
- "Learn about Systems" → `/systems`
- Nav CTA "Agende uma Conversa" → `/agendar`

## Lead Capture System (Phase 6)

- `/api/leads` POST endpoint writes to `/data/leads.json` (interim lead DB)
- Lead schema: id, createdAt, name, whatsapp, email, company, segment, role, revenue, employees, booking {date, time}|null, source, status, crmRef
- `crmRef` format: `REIS-LEAD-{ID}` — reserved for future CRM integration. DB name: `reis-ia-leads`
- `source` field values: `typebot-agendar` (default) | `typebot-aplicar` (when ?source=builders)
- LeadTypebot component (`src/components/LeadTypebot.tsx`) — 8-step qualification + BookingCalendar inline
- BookingCalendar component (`src/components/BookingCalendar.tsx`) — next 14 weekdays, 6 time slots

## SSR / Adapter Setup

- Astro v6 + `@astrojs/node` adapter. `output: 'static'` with per-page `prerender = false` for SSR routes.
- NO `hybrid` mode (deprecated in Astro v5+). Use `export const prerender = false` per-file.
- `/data/leads.json` lives at project root `data/` — created at install time, NOT inside `src/`.

## Dead Anchor Rules

- NEVER use `href="#apply"`, `href="#audit"`, `href="#booking"` — all replaced with real page routes
- Only valid same-page anchor: `href="#pillars"` on Home (matching `id="pillars"` on the Ecosystem section)
- `id="booking"` exists on Home page section 9 but is no longer linked from buttons

## SEO Meta Tags

MainLayout.astro now supports: `title`, `description`, `ogImage` props.
OG tags (og:title, og:description, og:type, og:locale, og:site_name) and Twitter card meta are rendered for every page.
