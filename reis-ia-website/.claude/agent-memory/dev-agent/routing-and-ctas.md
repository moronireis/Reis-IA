---
name: Routing and CTA destinations
description: Canonical page routes, CTA mapping, and form infrastructure for the Reis IA site
type: project
---

## Page Routes (all confirmed built)

- `/` — Home (index.astro)
- `/builder` — Builder sales page
- `/systems` — Systems service page
- `/agendar` — Booking page (created Phase 3 P0)
- `/aplicar` — Application form page (created Phase 3 P0)

## CTA Destination Rules

- "Book a call" / "Agende" / "Diagnóstico de Revenue" → `/agendar`
- "Apply" / "Candidatar-se" / "Builder program" → `/aplicar`
- "Learn about Builder" → `/builder`
- "Learn about Systems" → `/systems`
- Nav CTA "Agende uma Conversa" → `/agendar`

## Forms Infrastructure

- Newsletter lead capture forms (Home, Builder, Systems): Formspree POST to `https://formspree.io/f/PLACEHOLDER_FORM_ID`
  - Each has a hidden `_source` field identifying the page: `newsletter-home`, `newsletter-builder`, `newsletter-systems`
- Application form (/aplicar): Formspree POST with `_next` redirect to `/aplicar?enviado=true`
  - Success state shown via JS reading `?enviado=true` URL param
- Cal.com booking embed on /agendar: commented out placeholder, WhatsApp fallback active
  - WhatsApp URL uses placeholder number `XXXXXXXXXXX` — must be replaced before launch

## Dead Anchor Rules

- NEVER use `href="#apply"`, `href="#audit"`, `href="#booking"` — all replaced with real page routes
- Only valid same-page anchor: `href="#pillars"` on Home (matching `id="pillars"` on the Ecosystem section)
- `id="booking"` exists on Home page section 9 but is no longer linked from buttons

## SEO Meta Tags

MainLayout.astro now supports: `title`, `description`, `ogImage` props.
OG tags (og:title, og:description, og:type, og:locale, og:site_name) and Twitter card meta are rendered for every page.
