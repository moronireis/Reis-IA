# AIOX — Guidelines Page
URL: https://brand.aioxsquad.ai/brandbook/guidelines

## Page Purpose
Brand guidelines bento grid dashboard. Entry point for the brandbook section showcasing brand identity elements in a visual dashboard format.

## Content Structure
1. **Header** — "AIOX SQUAD | DESIGN FOUNDATIONS | V2.0 // LIME + GOLD EDITIONS"
2. **Identity System 2026** — Brand system intro text
3. **Typography showcase** — "Hello, I'm Geist" primary typeface introduction
4. **Core Belief/Manifesto** — "EU NAO PRECISO SER PROGRAMADOR PARA CRIAR. A IA E A SETA. O X E MEU."
5. **Symbols** — Delta (triangle/transformation) and Joystick (control)
6. **Naming Concept** — A→I→O→X semantic breakdown
7. **Positioning** — Enemy (complexity), Target (creators), Category (AI Orchestration Experience)
8. **Archetypes** — Magician 60%, Sage 25%, Explorer 15%
9. **Evidence/Proof** — R$500K/year, 6 days MVP, R$8K/client, R$100K savings
10. **Testimonials** — Key quotes from users
11. **Brand Vocabulary** — Allowed and banned word lists
12. **Personality** — "Morpheus: digital, profundo, direto"
13. **Dual Voice** — AIOX (Digital Morpheus) vs Alan (Human Morpheus)

## HTML Structure
- Bento grid dashboard layout
- `<header>` with border-b, var(--bb-border) border-color, var(--bb-surface) background
- Flexbox row layout for header metadata
- Grid-based content sections

## CSS Patterns
- Background: var(--bb-surface)
- Border color: var(--bb-border)
- Accent: var(--lime) = #D1FF00 (Kinetic Limon)
- Font display: TASA Orbiter 800
- Font mono: Roboto Mono 500
- Color palette: Kinetic Limon #D1FF00 (RGB 209,255,0 / CMYK 20,0,100,0)

## JavaScript Interactions
- Minimal — React Server Components
- No explicit scroll triggers or animations

## Components Used
- BrandbookSiteNav (navigation)
- BrandbookThemeRoot (theme provider)
- BrandbookTracking (analytics)
- IconMark (logo component)

## Navigation Context
- Sidebar position: First item under Brandbook section (0.0 Guidelines)
- Links from: Home page CTA, sidebar nav
- Links to: All other brandbook pages

## Key Design Decisions
- Bento grid dashboard approach for brand overview
- Portuguese content mixed with English (bilingual brand)
- Matrix/Morpheus metaphor as brand personality anchor
- Color: single accent (lime #D1FF00) on dark backgrounds
- Archetype blend: Magician-dominant with Sage and Explorer
- Dual voice system for brand vs founder communication
