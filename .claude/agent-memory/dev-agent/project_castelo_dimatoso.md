---
name: Castelo dos Lagos + Buffet Di Matoso — Site Projects
description: Two branded-house Astro sites scaffolded 2026-04-15. Build status, stack, key decisions, paths.
type: project
---

## Paths
- `castelo-dos-lagos-site/` — workspace root `/Users/moronireis/Projetos vscode/castelo-dos-lagos-site/`
- `di-matoso-site/` — workspace root `/Users/moronireis/Projetos vscode/di-matoso-site/`

## Stack
- Astro 4.x (latest at scaffold time: 6.1.7), static output, TypeScript strict
- Zero Tailwind — pure CSS with CSS custom properties (:root tokens)
- Google Fonts runtime (single request: Cormorant Garamond + Inter) — NOT self-hosted yet (brief says self-hosted woff2 eventually, Phase 4+)
- @studio-freight/lenis for smooth scroll
- Zero GSAP, zero Framer Motion, zero React islands
- IntersectionObserver for scroll reveals (fade-in, plate-reveal, hairline-rule classes)
- Motion base: Castelo 900ms / Di Matoso 1200ms (--motion-brand token diverges per brand)

## Build Status (2026-04-15)
- castelo-dos-lagos-site: `npm run build` PASS — 1 page, 598ms
- di-matoso-site: `npm run build` PASS — 1 page, 467ms

## Key Token Divergences (Castelo vs Di Matoso)
- Background: --forest-deep #1E2E24 vs --charcoal #1A1A1A
- Accent: --gold #C9A96E vs --gold-deep #B8860B
- Secondary accent: --bronze #8A6A3E (Castelo, tertiary only — Chapter III numeral) vs --burgundy-whisper #3D1F1F (Di Matoso, one touch max)
- Border: rgba(201,169,110,0.20) vs rgba(184,134,11,0.35)
- Motion brand: 900ms vs 1200ms

## Key Implementation Decisions
- global.css imported in page frontmatter (`import '../styles/global.css'`) — Astro handles it via Vite
- Script loaded via `<script> import '../scripts/motion.js'; </script>` inline in page body — Astro bundles it as module
- Google Fonts via runtime link tag (not self-hosted) — acceptable for Phase 4 preview; self-hosting deferred
- Cinemagraph hero (Castelo): video element present with poster + WebM/MP4 sources, all pointing to /assets/ paths that don't exist yet — poster-fallback gradient div shown until real assets shot
- Plate hero (Di Matoso): static background-image div with clip-path reveal — no video, no autoplay
- Bronze numeral (Chapter III Arquitetura) applied via `bronzeNumeral` prop on ChapterSection — only place bronze appears in hero/structural role is forbidden; here it's a chapter marker color only
- CTAs route to /visita (Castelo) and /orcamento (Di Matoso) — pages not built yet, links will 404 until Phase 5
- "O tempo é rei" appears only in footer .footer__otempo — never as headline (permanent feedback rule enforced)

## What's NOT Built Yet
- Pages /visita, /orcamento (Phase 5)
- Real photo assets (photographer session pending)
- Self-hosted woff2 font files
- OG images (/og-castelo.jpg, /og-dimatoso.jpg)
- Hero video/poster for Castelo cinemagraph
