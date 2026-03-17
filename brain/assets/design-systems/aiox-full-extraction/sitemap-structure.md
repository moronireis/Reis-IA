# AIOX Brand Site — Complete Sitemap Structure
Last updated: 2026-03-16
Source: https://brand.aioxsquad.ai/
Total pages: 40

## Navigation Hierarchy

### Primary Navigation (Top Bar)
```
AIOX Logo (→ /brandbook)
├── Guidelines (→ /brandbook/guidelines)
├── Movimento (→ /brandbook/movimento)
├── Pitch (→ /pitch-deck/pitch-overview)
├── Workspace (→ /workspace)
├── Brandbook ▾ (dropdown)
├── Design System ▾ (dropdown)
└── Showcase ▾ (dropdown)
```

### Brandbook Section (8 pages)
```
/                              → Home / Index (landing page)
/brandbook/guidelines          → Brand Guidelines Dashboard (bento grid)
/brandbook/movimento           → Strategic Brandbook (13 sections, deepest content)
/brandbook/foundations         → Design Foundations (master token reference)
/brandbook/logo                → Logo System (variants, clear space, usage)
/brandbook/icons               → Icon System (grid, sizes, rules, colors)
/brandbook/moodboard           → Visual References (9 refs, 4 categories)
/brandbook/aiox                → Brand Strategy (mission, values, positioning)
```

### Pitch Deck (1 page)
```
/pitch-deck/pitch-overview     → Investor Data Room (15-section pitch)
```

### Workspace (1 page)
```
/workspace                     → Business Profile Intelligence (dashboard)
```

### Design System — Tokens (5 pages)
```
/brandbook/spacing-scale       → 14-Step Numeric Spacing Scale
/brandbook/surfaces            → Surfaces & Borders (elevation, radius, glass)
/brandbook/layering            → Z-Index Stack & Responsive Breakpoints
/brandbook/semantic-tokens     → Semantic Aliases, Glow, States, shadcn/ui Map
/brandbook/token-export        → Copy-Paste Theme Tokens (Lime + Gold CSS)
```

### Design System — Visual (4 pages)
```
/brandbook/effects             → Effects Library (ticker, badges, glow, hover)
/brandbook/patterns            → Pattern Library (31 patterns in 6 categories)
/brandbook/motion              → Motion Showcase (8 animations, Framer Motion)
/brandbook/vfx                 → VFX System (grain, blend, blur, glow, overlays)
```

### Design System — Components (12 pages)
```
/brandbook/components          → Component Catalog Index (60+ components)
/brandbook/buttons             → Button Library (4 roles, variants, sizes, states)
/brandbook/cards               → Card Library (3 variants + action cards)
/brandbook/forms               → Form Library (8 sections, inputs to composed)
/brandbook/feedback            → Feedback Library (alerts, toasts, modals, sheets)
/brandbook/states              → System States (spinners, progress, skeletons)
/brandbook/tables              → Table Library (standard + compact metrics)
/brandbook/lists               → Lists (status lists + KPI cards)
/brandbook/charts              → Chart Library (9 chart types)
/brandbook/sections            → Section Patterns (13+ marketing sections)
/brandbook/lp-sections         → LP Section Catalog (16 sections + atoms)
/brandbook/advanced            → Advanced UI (tabs, accordion, steppers)
```

### Design System — Meta (2 pages)
```
/brandbook/templates           → Page Templates (shell, bento, content grid)
/brandbook/seo                 → SEO & Digital Identity (meta, OG, schema)
```

### Showcase (7 pages)
```
/brandbook/editorial           → Editorial Spreads (26 brand layouts)
/brandbook/showcase/mockups    → Product Mockups (10 items)
/brandbook/showcase/apparel    → Apparel Collection (8 items)
/brandbook/showcase/outfits    → Outfit Compositions (12 items by gender)
/brandbook/showcase/jackets    → Jackets & Outerwear (20 items)
/brandbook/showcase/sneakers   → Custom Sneakers (13 items)
/brandbook/showcase/calc-squad → Squad Calculator (interactive tool)
```

## Section Groupings

### By Purpose
| Group | Pages | Function |
|-------|-------|----------|
| Brand Identity | 8 | Who AIOX is (guidelines, strategy, visual identity) |
| Design Tokens | 6 | How to build with AIOX (colors, spacing, motion) |
| Visual Library | 4 | Special effects and patterns |
| Component Library | 12 | UI building blocks |
| Meta/Templates | 2 | Page structure and SEO |
| Showcase | 7 | Brand applications and tools |
| Utility | 2 | Pitch deck and workspace |

### By Content Depth
| Level | Pages | Description |
|-------|-------|-------------|
| Deep (scrollable) | movimento, foundations, lp-sections, editorial | Long-form, 8+ sections |
| Medium | guidelines, patterns, sections, forms, feedback | 4-8 sections |
| Light | most component pages, showcase galleries | 1-3 sections |
| Tool | workspace, calc-squad | Interactive applications |

## Page Relationships
- **Home** links to → guidelines, foundations, components, patterns (4 pillars)
- **Foundations** is referenced by → all token pages, all component pages
- **Token Export** consumes → all token definitions from foundations, surfaces, semantic-tokens
- **LP Sections** references → buttons, cards, forms, feedback, charts (component composition)
- **Editorial** references → all brand identity pages
- **Templates** references → sections, lp-sections patterns

## Recommended Build Order for Recreation
1. **Phase 1: Shell** — Navigation, layout, theme system, footer
2. **Phase 2: Tokens** — foundations, spacing-scale, surfaces, layering, semantic-tokens, token-export
3. **Phase 3: Brand** — guidelines, movimento, logo, icons, moodboard, aiox
4. **Phase 4: Visual** — patterns, effects, motion, vfx
5. **Phase 5: Components** — components index, buttons, cards, forms, feedback, states, tables, lists, charts, advanced
6. **Phase 6: Sections** — sections, lp-sections, templates
7. **Phase 7: Meta** — seo, editorial
8. **Phase 8: Showcase** — mockups, apparel, outfits, jackets, sneakers, calc-squad
9. **Phase 9: Utility** — pitch-overview, workspace

## URL Pattern
- Brandbook pages: `/brandbook/[slug]`
- Showcase pages: `/brandbook/showcase/[slug]`
- Pitch pages: `/pitch-deck/[slug]`
- Utility pages: `/[slug]`
- Home: `/`
