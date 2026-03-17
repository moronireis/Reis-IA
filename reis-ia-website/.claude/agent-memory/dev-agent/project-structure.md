---
name: Project structure and key file paths
description: Astro project layout, component list, build commands, and conventions for reis-ia-website
type: project
---

**Project root:** `/Users/moronireis/Projetos vscode/reis-ia-website/`

**Why:** Astro static-first project with React islands for interactivity (FaqAccordion). Tailwind CSS for styling, Inter font from Google Fonts.

**How to apply:** Always use absolute paths. Run `npm run build` to verify changes. Dev server: `npm run dev`.

## Key files
- `src/layouts/MainLayout.astro` — root HTML layout, lang attribute, default meta description
- `src/components/Nav.astro` — global navigation with mobile menu (JS in same file)
- `src/components/Footer.astro` — global footer with ecosystem/resources/connect links
- `src/components/FaqAccordion.tsx` — React island, receives items via props (no hardcoded text)
- `src/pages/index.astro` — Home page
- `src/pages/builder.astro` — Builder sales page
- `src/pages/systems.astro` — Systems service page

## Component text pattern
Badge.astro, Button.astro, StatBlock.astro, SectionLabel.astro, TestimonialBlock.astro, HourglassIcon.astro, ChessKnightIcon.astro — all receive text via props. No user-facing hardcoded text inside the component files themselves.

## Brand motifs (mandatory on every page)
- HourglassIcon — represents TIME, used near Systems/efficiency content
- ChessKnightIcon — represents STRATEGY, used near Builder/Partners content

## Placeholder convention
Placeholders rendered with class `placeholder-content`. Text inside brackets like `[PLACEHOLDER: ...]`, `[METRIC]`, `[DATA]`, `[DEPOIMENTO]`.

## Hero card pattern (floating card — all 3 pages)
The hero on all pages uses `.hero-card-outer` + `.hero-card` (defined in global.css). The outer section has `background-color: #080808; padding: 48px 8px 0;`. The inner `.hero-card` has `padding: 80px 0 72px; min-height: 560px;`. After the hero: LogoMarquee inside `max-w-[1200px]` wrapper, then a `.divider-gold` line.

## Page anatomy pattern (Builder, Systems)
1. Hero (hero-card-outer)  2. LogoMarquee  3. divider-gold  4. Problem sections alternating surface-0/surface-1  5. HighlightBanner component  6. More sections  7. Compact Authority bar (surface-0 or surface-1)  8. Lead capture section (.lead-capture-section)  9. Final CTA with gold glow

## Card upgrade pattern
Cards use `.card-interactive` (from global.css) + `.card-grid-hover` on the grid parent for sibling dimming. Gradient card headers use a `div` with `background: linear-gradient(135deg, rgba(201,168,76,0.12) 0%, ...)` and `border-bottom: 1px solid rgba(255,255,255,0.06)`. Process step cards use large number (`font-size: 56px; font-weight: 200`) + icon in the header area.

## Compact Authority section
A `padding: 40px 0` section with `border-top/bottom: 1px solid rgba(255,255,255,0.06)`. Contains horizontal flex layout: brand name | gold credential pills | positioning statement. Pills use `background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.2); color: rgba(201,168,76,0.85)`.

## HighlightBanner placement
Placed strategically in the middle-lower portion of each page (not at the very end). Builder: after "Who it's for" section. Systems: before pricing section.
