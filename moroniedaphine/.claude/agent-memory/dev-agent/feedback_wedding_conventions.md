---
name: feedback_wedding_conventions
description: Confirmed conventions for the moroniedaphine wedding site — CSS architecture, section patterns, accessibility approach.
type: feedback
---

Global tokens in `src/styles/global.css`, page-specific styles in scoped `<style>` blocks within each `.astro` file. Shared utilities (photo-placeholder, btn-ghost, sr-only, gold-rule, container, content-narrow) live in global.css.

**Why:** Phase 1 restructure (2026-04-15) introduced Nav + Footer components and 3 new pages — shared tokens extracted to global.css to avoid duplication.
**How to apply:** Add new shared utilities to global.css. Keep section layout/visual styles scoped to their page file.

CSS custom properties pattern — define all tokens in `:root`:
- Color tokens: `--burgundy`, `--white`, `--gold` + opacity aliases like `--burgundy-55`, `--gold-40`
- Type scale: `--display` (clamp), `--h2`, `--body`, `--label`, `--micro`, `--nano`
- Spacing: `--section-v-desktop`, `--section-v-mobile`, `--content-max`, `--site-max`, `--site-gutter`

Typography class naming convention:
- `f-display`, `f-h2`, `f-h2-italic`, `f-body`, `f-body-italic` — Fraunces variants
- `i-label`, `i-micro`, `i-nano` — Inter variants (uppercase metadata)

Accessibility pattern: visually-hidden headings for section landmarks that have no visible heading. Use inline style `position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)` — no utility class needed at this scale.

Gold hairline divider: `width:80px; height:1px; background: var(--gold); opacity:0.45;` — the `.gold-rule` pattern.

Vertical rule divider: `width:1px; height:56px; background:var(--burgundy); opacity:0.30;` — the `.gold-rule--vertical` pattern.

Button pattern (sharp corners, no border-radius): `border: 1px solid var(--burgundy)`, hover fills to burgundy bg + white text, `transition: 600ms ease`.

Section on burgundy background: white text at 0.82-0.88 opacity for body, 0.5 for metadata — never pure white on burgundy (too harsh).
