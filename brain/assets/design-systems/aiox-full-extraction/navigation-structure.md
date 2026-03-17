# AIOX — Complete Navigation Structure
Last updated: 2026-03-16
Source: https://brand.aioxsquad.ai/

## Header Navigation (Fixed, z-100)

### Layout
- Fixed position at top
- Full-width with border-bottom (--bb-border)
- Background: --bb-surface with opacity/blur
- Height: ~60px estimated
- Z-index: --layer-nav (100)

### Contents
```
[AIOX Logo] ← links to /brandbook
[Guidelines] [Movimento] [Pitch] [Workspace]
[Brandbook ▾] [Design System ▾] [Showcase ▾]
[Theme Toggle: LimeGold]
```

### Primary Links (Always Visible)
| Label | URL | Notes |
|-------|-----|-------|
| AIOX (logo) | /brandbook | Home/index |
| Guidelines | /brandbook/guidelines | Brand guidelines |
| Movimento | /brandbook/movimento | Strategic brandbook |
| Pitch | /pitch-deck/pitch-overview | Investor data room |
| Workspace | /workspace | Business tool |

### Dropdown: Brandbook
```
Pitch Deck        → /pitch-deck/pitch-overview
Foundations        → /brandbook/foundations
Logo              → /brandbook/logo
Icons             → /brandbook/icons
Moodboard         → /brandbook/moodboard
Brand Strategy    → /brandbook/aiox
```

### Dropdown: Design System
```
Tokens
  ├── Foundations       → /brandbook/foundations
  ├── Spacing Scale     → /brandbook/spacing-scale
  ├── Surfaces & Borders → /brandbook/surfaces
  ├── Layering          → /brandbook/layering
  ├── Semantic Tokens   → /brandbook/semantic-tokens
  └── Token Export      → /brandbook/token-export

Visual
  ├── Effects           → /brandbook/effects
  ├── Patterns          → /brandbook/patterns
  ├── Motion            → /brandbook/motion
  └── VFX               → /brandbook/vfx

Components
  ├── Components        → /brandbook/components
  ├── Buttons           → /brandbook/buttons
  ├── Cards             → /brandbook/cards
  ├── Forms             → /brandbook/forms
  ├── Feedback          → /brandbook/feedback
  ├── States            → /brandbook/states
  ├── Tables            → /brandbook/tables
  ├── Lists             → /brandbook/lists
  ├── Charts            → /brandbook/charts
  ├── Sections          → /brandbook/sections
  ├── LP Sections       → /brandbook/lp-sections
  └── Advanced          → /brandbook/advanced

Meta
  ├── Templates         → /brandbook/templates
  └── SEO               → /brandbook/seo
```

### Dropdown: Showcase
```
Editorial         → /brandbook/editorial
Mockups           → /brandbook/showcase/mockups
Apparel           → /brandbook/showcase/apparel
Outfits           → /brandbook/showcase/outfits
Jackets           → /brandbook/showcase/jackets
Sneakers          → /brandbook/showcase/sneakers
Calc Squad        → /brandbook/showcase/calc-squad
```

### Theme Toggle
- Position: Top right of header
- Options: "Lime" (default) / "Gold"
- Switches CSS custom properties between lime and gold theme values

## Footer Navigation

### Layout
- Full-width with border-top (--bb-border)
- Background: --bb-surface (or --bb-dark)
- Multi-column grid layout
- AIOX logo at top

### Footer Columns
```
[brandbook]                    [design system]
0.0 Guidelines                 0.0 Components
1.0 Movimento                  1.0 Buttons
2.0 Foundations                 2.0 Cards
3.0 Logo                       3.0 Forms
4.0 Icons                      4.0 Feedback
5.0 Moodboard                  5.0 States
6.0 Brand Strategy             6.0 Tables
                               7.0 Lists
                               8.0 Charts
                               9.0 Sections
                               10.0 Advanced
                               11.0 Effects
                               12.0 Patterns
                               13.0 Templates
                               14.0 Motion
                               15.0 SEO
                               16.0 VFX

[showcase]                     [socials]
0.0 Index                      1.0 X / Twitter
1.0 Editorial                  1.1 TikTok
                               1.2 Instagram
                               1.3 YouTube
                               1.4 LinkedIn
                               1.5 GitHub
```

### Footer Meta
```
© 2026 AIOX Squad. All rights reserved.
Built with AIOX PRO in Florianopolis
```

## Sidebar Navigation (Movimento Page)

### Structure
Used only on the /brandbook/movimento page for section jumping.

```
Fundamentos
  ├── 01 Manifesto
  ├── 02 Proposito
  └── 03 Arquetipo

Estrategia
  ├── 04 Posicionamento
  ├── 05 BrandScript
  └── 06 Truelines

Identidade Verbal
  ├── 07 Naming
  └── 08 Vocabulario

Jornada & Prova
  ├── 09 Jornada
  └── 10 Depoimentos

Identidade Visual
  └── 11 Marcas & Cores

Compromisso
  ├── 12 Contrato
  └── 13 Fundadores
```

## Page Header Pattern (Token/Component Pages)

Most design system pages follow this header pattern:
```html
<header class="border-b" style="border-color: var(--bb-border); background: var(--bb-surface)">
  <div class="flex flex-col md:flex-row justify-between">
    <span>AIOX SQUAD</span>
    <span>[PAGE NAME]</span>
    <span>V2.0 // DARK COCKPIT EDITION</span>
  </div>
</header>
```

## Routing Pattern
- **Framework**: Next.js App Router with parallel routes
- **Route segments**: `/(brandbook)/brandbook/[slug]`
- **Showcase routes**: `/(brandbook)/brandbook/showcase/[slug]`
- **Pitch routes**: `/pitch-deck/[slug]`
- **Root routes**: `/workspace`, `/`

## Mobile Navigation
- Header collapses to hamburger menu on mobile
- Dropdown menus become full-screen overlay or accordion
- Body scroll lock when menu open: `document.body.style.overflow = menuOpen ? "hidden" : ""`

## Active State Styling
- Current page highlighted in navigation
- Likely uses lime accent color for active state
- Route matching via Next.js usePathname()

## Breadcrumb Pattern
No explicit breadcrumbs found. Navigation context provided by:
1. Header nav position
2. Page header metadata ("AIOX SQUAD | [SECTION] | V2.0 // DARK COCKPIT EDITION")
3. Footer sitemap for discovery
