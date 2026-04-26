# ZNITH Design System — Foundation Tokens

**Version:** 1.0  
**Last updated:** April 2026  
**Brand:** ZNITH — Expansão Comercial com IA  
**Founder:** Leilaine Campioto  
**Tagline:** Direção. Consciência. Legado.  
**Mode:** Dark-first  

---

## Overview

This document defines the complete foundation token layer for the ZNITH design system. All visual decisions — color, typography, spacing, elevation, motion — derive from these tokens. Components and layouts must reference tokens only; hardcoded values are not permitted.

Token naming convention: `--znith-{category}-{name}-{variant}`

Visual references: Apple, Stripe, Linear, Vercel, Porsche, McKinsey.

---

## 1. Color System

### 1.1 Navy Scale (Core Background)

The deep navy is ZNITH's foundation. It communicates authority, depth, and institutional weight.

| Token Name | CSS Custom Property | Hex | Usage |
|---|---|---|---|
| Navy 50 | `--znith-color-navy-50` | `#E8ECF4` | Light backgrounds, inverted contexts |
| Navy 100 | `--znith-color-navy-100` | `#C5CEDE` | Borders on light surfaces |
| Navy 200 | `--znith-color-navy-200` | `#8E9EBE` | Muted text on light |
| Navy 300 | `--znith-color-navy-300` | `#5E74A0` | Secondary text on mid surfaces |
| Navy 400 | `--znith-color-navy-400` | `#3A5080` | Subtle UI elements |
| Navy 500 | `--znith-color-navy-500` | `#2A3A5A` | Border default |
| Navy 600 | `--znith-color-navy-600` | `#1C2A4A` | Elevated surface |
| Navy 700 | `--znith-color-navy-700` | `#14203A` | Header / Surface |
| Navy 800 | `--znith-color-navy-800` | `#0D1828` | Deep surface |
| Navy 900 | `--znith-color-navy-900` | `#091022` | Background base |
| Navy 950 | `--znith-color-navy-950` | `#050B17` | Darkest, modal scrim base |
| White | `--znith-color-white` | `#FFFFFF` | Primary text, pure contrast |

---

### 1.2 Accent Gold Scale

Gold is ZNITH's primary accent. It signals achievement, authority, and premium positioning. Use with restraint — gold draws the eye; oversaturation dilutes power.

| Token Name | CSS Custom Property | Hex | Usage |
|---|---|---|---|
| Gold Light | `--znith-color-gold-light` | `#FFD161` | Highlights, hover states, thin decorative lines |
| Gold 300 | `--znith-color-gold-300` | `#F0B85A` | Secondary accent, icon fills |
| Gold 400 | `--znith-color-gold-400` | `#E8A847` | Supporting gold, gradient endpoint |
| Gold 500 | `--znith-color-gold-500` | `#DF9F3E` | Primary brand accent — CTAs, headings, key icons |
| Gold Deep | `--znith-color-gold-deep` | `#C07A20` | Pressed states, gold shadows |

**Gold usage rule:** Maximum 15% of any surface area. Never as a background fill on large blocks.

---

### 1.3 Neutral Scale (Text and UI)

| Token Name | CSS Custom Property | Hex | Usage |
|---|---|---|---|
| Neutral 0 | `--znith-color-neutral-0` | `#FFFFFF` | Primary text, headings |
| Neutral 100 | `--znith-color-neutral-100` | `#F5F5F5` | Light secondary text (inverted) |
| Neutral 200 | `--znith-color-neutral-200` | `#DDDDDD` | Secondary text on dark |
| Neutral 300 | `--znith-color-neutral-300` | `#BBBBBB` | Supporting text, captions |
| Neutral 400 | `--znith-color-neutral-400` | `#999999` | Placeholder text |
| Neutral 500 | `--znith-color-neutral-500` | `#7A7A7A` | Disabled text, metadata |
| Neutral 600 | `--znith-color-neutral-600` | `#555555` | Dividers on light |
| Neutral 700 | `--znith-color-neutral-700` | `#333333` | Dark text |
| Neutral 800 | `--znith-color-neutral-800` | `#1A1A1A` | Near-black |
| Neutral 900 | `--znith-color-neutral-900` | `#0A0A0A` | True dark |

---

### 1.4 Semantic Colors

Muted, premium tones — never neon or saturated. Semantic colors appear sparingly in feedback states only.

| Role | Token Name | CSS Custom Property | Hex | Usage |
|---|---|---|---|---|
| Success | Success Default | `--znith-color-success` | `#2A6B4A` | Confirmation states |
| Success | Success Light | `--znith-color-success-light` | `#3A8A60` | Success text |
| Success | Success Subtle | `--znith-color-success-subtle` | `rgba(42, 107, 74, 0.15)` | Success surface tint |
| Warning | Warning Default | `--znith-color-warning` | `#7A5A20` | Warning states |
| Warning | Warning Light | `--znith-color-warning-light` | `#A07030` | Warning text |
| Warning | Warning Subtle | `--znith-color-warning-subtle` | `rgba(122, 90, 32, 0.15)` | Warning surface tint |
| Error | Error Default | `--znith-color-error` | `#7A2A2A` | Error states |
| Error | Error Light | `--znith-color-error-light` | `#A03A3A` | Error text |
| Error | Error Subtle | `--znith-color-error-subtle` | `rgba(122, 42, 42, 0.15)` | Error surface tint |
| Info | Info Default | `--znith-color-info` | `#1E3A6A` | Informational states |
| Info | Info Light | `--znith-color-info-light` | `#2A5090` | Info text |
| Info | Info Subtle | `--znith-color-info-subtle` | `rgba(30, 58, 106, 0.15)` | Info surface tint |

---

### 1.5 Surface System

Five-tier surface hierarchy creates depth perception in dark mode.

| Tier | Token Name | CSS Custom Property | Value | Description |
|---|---|---|---|---|
| 0 — Background | `--znith-surface-background` | `--znith-surface-background` | `#091022` | Page base, root background |
| 1 — Surface | `--znith-surface-default` | `--znith-surface-default` | `#14203A` | Cards, panels, navbars |
| 2 — Elevated | `--znith-surface-elevated` | `--znith-surface-elevated` | `#1C2A4A` | Dropdowns, popovers, raised cards |
| 3 — Overlay | `--znith-surface-overlay` | `--znith-surface-overlay` | `rgba(20, 32, 58, 0.92)` | Modal backdrops, tooltips |
| 4 — Border | `--znith-surface-border` | `--znith-surface-border` | `#2A3A5A` | Dividers, card borders, input borders |

**Border with gold accent:** `--znith-surface-border-accent` → `rgba(223, 159, 62, 0.35)` — use on hover states and featured cards.

---

### 1.6 Brand Layers

Each ZNITH product line has a distinct accent expression built on the same navy foundation.

#### ZNITH Corp
Primary commercial consultancy offering. Authority and institutional weight.

| Token | CSS Custom Property | Value |
|---|---|---|
| Primary | `--znith-corp-primary` | `#DF9F3E` |
| Primary Light | `--znith-corp-primary-light` | `#FFD161` |
| Primary Deep | `--znith-corp-primary-deep` | `#C07A20` |
| Surface Tint | `--znith-corp-surface-tint` | `rgba(223, 159, 62, 0.08)` |
| Border | `--znith-corp-border` | `rgba(223, 159, 62, 0.25)` |

#### ZNITH.AI OS
AI-powered operating system layer. Gold + subtle tech blue signals intelligence.

| Token | CSS Custom Property | Value |
|---|---|---|
| Primary | `--znith-ai-primary` | `#DF9F3E` |
| Tech Accent | `--znith-ai-tech` | `#2A5090` |
| Tech Light | `--znith-ai-tech-light` | `#4A78C8` |
| Gradient Start | `--znith-ai-gradient-start` | `#DF9F3E` |
| Gradient End | `--znith-ai-gradient-end` | `#2A5090` |
| Surface Tint | `--znith-ai-surface-tint` | `rgba(42, 80, 144, 0.08)` |

#### Leilaine (Personal Brand)
Founder's personal expression. Gold + deep navy, warmer and more personal.

| Token | CSS Custom Property | Value |
|---|---|---|
| Primary | `--znith-leilaine-primary` | `#E8A847` |
| Warm Gold | `--znith-leilaine-warm` | `#F0C070` |
| Navy Deep | `--znith-leilaine-navy` | `#0D1828` |
| Surface Tint | `--znith-leilaine-surface-tint` | `rgba(232, 168, 71, 0.06)` |
| Border | `--znith-leilaine-border` | `rgba(232, 168, 71, 0.20)` |

#### Líderes Leões (Program)
High-intensity leadership program. Intense gold, darker base, maximum authority.

| Token | CSS Custom Property | Value |
|---|---|---|
| Primary | `--znith-lideres-primary` | `#FFD161` |
| Intense | `--znith-lideres-intense` | `#DF9F3E` |
| Dark Base | `--znith-lideres-base` | `#050B17` |
| Surface Tint | `--znith-lideres-surface-tint` | `rgba(255, 209, 97, 0.10)` |
| Border | `--znith-lideres-border` | `rgba(255, 209, 97, 0.30)` |
| Lion Gold | `--znith-lideres-lion` | `#C07A20` |

---

## 2. Typography System

### 2.1 Font Families

| Role | Family | CSS Custom Property | Fallback Stack |
|---|---|---|---|
| Display / Headings | Cinzel | `--znith-font-display` | `'Cinzel', 'Palatino Linotype', 'Book Antiqua', Georgia, serif` |
| Body / UI | Montserrat | `--znith-font-body` | `'Montserrat', 'Helvetica Neue', Arial, sans-serif` |
| System Fallback | Roboto | `--znith-font-system` | `'Roboto', 'Segoe UI', system-ui, sans-serif` |
| Mono (code/data) | JetBrains Mono | `--znith-font-mono` | `'JetBrains Mono', 'Fira Code', 'Courier New', monospace` |

**Cinzel** (serif, Roman-inspired): Used exclusively for headings, brand name, section titles, and high-authority CTAs. Never use for body text or UI labels at small sizes.

**Montserrat** (geometric sans): Used for all body copy, UI labels, navigation, captions, form elements. The workhorse of the system.

---

### 2.2 Type Scale

Base: 16px (1rem). Scale factor: 1.25 (Major Third).

| Name | Token | CSS Custom Property | px | rem | Line Height | Letter Spacing |
|---|---|---|---|---|---|---|
| xs | `--znith-text-xs` | `--znith-text-xs` | 12px | 0.75rem | 1.5 (18px) | 0.02em |
| sm | `--znith-text-sm` | `--znith-text-sm` | 14px | 0.875rem | 1.5 (21px) | 0.01em |
| base | `--znith-text-base` | `--znith-text-base` | 16px | 1rem | 1.6 (25.6px) | 0 |
| md | `--znith-text-md` | `--znith-text-md` | 18px | 1.125rem | 1.6 (28.8px) | -0.01em |
| lg | `--znith-text-lg` | `--znith-text-lg` | 20px | 1.25rem | 1.5 (30px) | -0.01em |
| xl | `--znith-text-xl` | `--znith-text-xl` | 24px | 1.5rem | 1.4 (33.6px) | -0.02em |
| 2xl | `--znith-text-2xl` | `--znith-text-2xl` | 30px | 1.875rem | 1.3 (39px) | -0.02em |
| 3xl | `--znith-text-3xl` | `--znith-text-3xl` | 36px | 2.25rem | 1.25 (45px) | -0.03em |
| 4xl | `--znith-text-4xl` | `--znith-text-4xl` | 48px | 3rem | 1.2 (57.6px) | -0.03em |
| 5xl | `--znith-text-5xl` | `--znith-text-5xl` | 60px | 3.75rem | 1.15 (69px) | -0.04em |
| 6xl | `--znith-text-6xl` | `--znith-text-6xl` | 72px | 4.5rem | 1.1 (79.2px) | -0.04em |
| 7xl | `--znith-text-7xl` | `--znith-text-7xl` | 96px | 6rem | 1.05 (100.8px) | -0.05em |

---

### 2.3 Font Weights

| Weight Name | Value | CSS Custom Property | Used With |
|---|---|---|---|
| Light | 300 | `--znith-weight-light` | Body secondary, captions |
| Regular | 400 | `--znith-weight-regular` | Body default, UI labels |
| Medium | 500 | `--znith-weight-medium` | Navigation, sub-headings, buttons |
| Semibold | 600 | `--znith-weight-semibold` | Section titles, emphasized body |
| Bold | 700 | `--znith-weight-bold` | Headings (Montserrat), strong emphasis |
| Extrabold | 800 | `--znith-weight-extrabold` | Large display headings (Montserrat) |

**Note on Cinzel:** This font reads heavier than equivalent numerical weights. Use weight 400 (Regular) for most Cinzel headings. Use 700 only for very short, large-scale display use.

---

### 2.4 Recommended Pairings

| Role | Font | Size | Weight | Letter Spacing | Color |
|---|---|---|---|---|---|
| Hero H1 | Cinzel | 7xl / 6xl | 400 | -0.05em | White or Gold 500 |
| Hero H1 Accent | Cinzel | 7xl / 6xl | 700 | -0.05em | Gold 500 |
| Page H1 | Cinzel | 4xl / 5xl | 400 | -0.03em | White |
| Section H2 | Cinzel | 3xl / 4xl | 400 | -0.03em | White |
| Subsection H3 | Montserrat | 2xl | 600 | -0.02em | White |
| Card Title | Montserrat | xl | 600 | -0.02em | White |
| Body Large | Montserrat | lg / md | 400 | 0 | Neutral 300 |
| Body Default | Montserrat | base | 400 | 0 | Neutral 300 |
| Body Small | Montserrat | sm | 400 | 0.01em | Neutral 400 |
| Caption | Montserrat | xs | 400 | 0.02em | Neutral 500 |
| Button Primary | Montserrat | sm / base | 600 | 0.08em | White or Navy 900 |
| Button CTA (Cinzel) | Cinzel | sm | 400 | 0.10em | White |
| Label / Tag | Montserrat | xs | 500 | 0.06em | Neutral 300 |
| Nav Item | Montserrat | sm | 500 | 0.04em | Neutral 200 |
| Tagline | Cinzel | xl / 2xl | 400 | 0.15em | Gold 500 |

**Letter spacing note:** CTAs and labels use wider tracking (0.06–0.15em) to signal premium intent and improve legibility at small sizes.

---

## 3. Spacing System

### 3.1 Base Scale

Base unit: **4px**. All spacing values are multiples of 4px.

| Token | CSS Custom Property | px | rem | Usage |
|---|---|---|---|---|
| 0 | `--znith-space-0` | 0px | 0 | Reset, flush |
| 1 | `--znith-space-1` | 4px | 0.25rem | Micro gaps: icon-text, inline badge |
| 2 | `--znith-space-2` | 8px | 0.5rem | Tight: list item gaps, input padding (vertical) |
| 3 | `--znith-space-3` | 12px | 0.75rem | Small: button padding (vertical), tag gap |
| 4 | `--znith-space-4` | 16px | 1rem | Default: card inner padding, input padding |
| 5 | `--znith-space-5` | 20px | 1.25rem | Medium: form field gap, nav item padding |
| 6 | `--znith-space-6` | 24px | 1.5rem | Standard: card gap, section element gap |
| 8 | `--znith-space-8` | 32px | 2rem | Large: card padding, between content blocks |
| 10 | `--znith-space-10` | 40px | 2.5rem | Component spacing |
| 12 | `--znith-space-12` | 48px | 3rem | Section sub-elements spacing |
| 16 | `--znith-space-16` | 64px | 4rem | Section padding (mobile) |
| 20 | `--znith-space-20` | 80px | 5rem | Section padding (tablet) |
| 24 | `--znith-space-24` | 96px | 6rem | Section padding (desktop) |
| 32 | `--znith-space-32` | 128px | 8rem | Macro spacing, hero padding |

---

### 3.2 Section Padding Recommendations

| Breakpoint | Vertical Section Padding | Horizontal Container Padding |
|---|---|---|
| Mobile (sm) | 64px (space-16) | 20px (space-5) |
| Tablet (md) | 80px (space-20) | 32px (space-8) |
| Desktop (lg) | 96px (space-24) | 48px (space-12) |
| Wide (xl+) | 96–128px | auto (contained by max-width) |

---

### 3.3 Component Spacing Guidelines

| Component | Internal Padding | Gap Between Elements |
|---|---|---|
| Button (sm) | 8px × 16px | — |
| Button (default) | 12px × 24px | — |
| Button (lg) | 16px × 32px | — |
| Card (compact) | 24px | 16px between elements |
| Card (default) | 32px | 20px between elements |
| Card (spacious) | 48px | 24px between elements |
| Form field | 12px × 16px | 8px label-to-input |
| Form group | — | 24px between fields |
| Navigation item | 8px × 16px | — |
| Section inner elements | — | 48px between major blocks |
| Icon + label | — | 8px (space-2) |

---

## 4. Grid System

### 4.1 Core Grid

| Property | Value | CSS Custom Property |
|---|---|---|
| Columns | 12 | `--znith-grid-columns: 12` |
| Max Width | 1200px | `--znith-grid-max-width: 1200px` |
| Gutter (desktop) | 24px | `--znith-grid-gutter-desktop: 24px` |
| Gutter (mobile) | 16px | `--znith-grid-gutter-mobile: 16px` |

---

### 4.2 Breakpoints

| Name | CSS Custom Property | Width | Target Device |
|---|---|---|---|
| sm | `--znith-bp-sm` | 375px | Small mobile |
| md | `--znith-bp-md` | 768px | Tablet |
| lg | `--znith-bp-lg` | 1024px | Small desktop / laptop |
| xl | `--znith-bp-xl` | 1440px | Standard desktop |
| 2xl | `--znith-bp-2xl` | 1920px | Wide / ultra-wide |

---

### 4.3 Container Padding per Breakpoint

| Breakpoint | Container Padding (horizontal) | Max Width Applied |
|---|---|---|
| < sm (375px) | 16px | 100% |
| sm (375px+) | 20px | 100% |
| md (768px+) | 32px | 100% |
| lg (1024px+) | 48px | 1200px |
| xl (1440px+) | auto | 1200px |
| 2xl (1920px+) | auto | 1200px |

**Usage note:** At lg and above, the container is horizontally centered with `max-width: 1200px; margin: 0 auto; padding: 0 48px;`. Padding protects content from viewport edge on smaller desktops.

---

### 4.4 Common Layout Patterns

| Layout | Column Span | Notes |
|---|---|---|
| Full width | 12/12 | Hero sections, full-bleed media |
| Content centered | 8/12 offset 2 | Long-form copy, body text |
| Two column (50/50) | 6/12 + 6/12 | Feature splits, comparisons |
| Two column (60/40) | 7/12 + 5/12 | Text + visual pairings |
| Three column | 4/12 × 3 | Feature cards, icon grids |
| Four column | 3/12 × 4 | Stat blocks, small cards |
| Sidebar layout | 8/12 + 4/12 | Article + aside |

---

## 5. Elevation System

### 5.1 Elevation Levels

Five levels create a clear visual hierarchy. In dark mode, elevation is expressed through surface color lightening AND optional gold glow — not white shadows.

| Level | Name | CSS Custom Property | Description |
|---|---|---|---|
| 0 | Flat | `--znith-elevation-flat` | Background surface, no distinction |
| 1 | Raised | `--znith-elevation-raised` | Cards, panels resting on background |
| 2 | Floating | `--znith-elevation-floating` | Dropdowns, tooltips, popovers |
| 3 | Overlay | `--znith-elevation-overlay` | Modals, drawers, sidesheets |
| 4 | Modal | `--znith-elevation-modal` | Highest layer, dialogs, alerts |

---

### 5.2 Box Shadow Values (Dark Mode)

| Level | CSS Custom Property | Shadow Value |
|---|---|---|
| Flat | `--znith-shadow-flat` | `none` |
| Raised | `--znith-shadow-raised` | `0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.6)` |
| Floating | `--znith-shadow-floating` | `0 4px 16px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4)` |
| Overlay | `--znith-shadow-overlay` | `0 8px 32px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(0, 0, 0, 0.4)` |
| Modal | `--znith-shadow-modal` | `0 24px 64px rgba(0, 0, 0, 0.7), 0 8px 32px rgba(0, 0, 0, 0.5)` |

**Gold glow variants** — use on featured or CTA elements only:

| Variant | CSS Custom Property | Shadow Value |
|---|---|---|
| Gold Glow Subtle | `--znith-shadow-gold-subtle` | `0 0 16px rgba(223, 159, 62, 0.15)` |
| Gold Glow Default | `--znith-shadow-gold` | `0 0 24px rgba(223, 159, 62, 0.25), 0 4px 16px rgba(0, 0, 0, 0.4)` |
| Gold Glow Strong | `--znith-shadow-gold-strong` | `0 0 40px rgba(223, 159, 62, 0.35), 0 8px 32px rgba(0, 0, 0, 0.5)` |
| Gold Glow CTA | `--znith-shadow-gold-cta` | `0 0 32px rgba(223, 159, 62, 0.45), 0 4px 24px rgba(0, 0, 0, 0.5)` |

---

### 5.3 Z-Index Scale

| Layer | CSS Custom Property | Value | Usage |
|---|---|---|---|
| Base | `--znith-z-base` | 0 | Default document flow |
| Raised | `--znith-z-raised` | 10 | Raised cards, sticky elements |
| Dropdown | `--znith-z-dropdown` | 100 | Menus, select options |
| Sticky | `--znith-z-sticky` | 200 | Sticky headers, floating bars |
| Overlay | `--znith-z-overlay` | 300 | Backdrop for modals |
| Modal | `--znith-z-modal` | 400 | Modal dialogs |
| Popover | `--znith-z-popover` | 500 | Tooltips, popovers above modals |
| Toast | `--znith-z-toast` | 600 | Notification toasts, always on top |

---

## 6. Border Radius

### 6.1 Radius Scale

| Token | CSS Custom Property | Value | Recommended Usage |
|---|---|---|---|
| None | `--znith-radius-none` | 0px | Sharp geometric elements, dividers, full-bleed sections |
| sm | `--znith-radius-sm` | 4px | Input fields, tags, badges, tight UI elements |
| md | `--znith-radius-md` | 8px | Buttons, small cards, dropdowns |
| lg | `--znith-radius-lg` | 12px | Standard cards, panels, modals (inner) |
| xl | `--znith-radius-xl` | 16px | Large cards, feature sections, content blocks |
| 2xl | `--znith-radius-2xl` | 24px | Hero cards, showcase panels, image wrappers |
| full | `--znith-radius-full` | 9999px | Pills, avatars, toggle switches, icon buttons |

---

### 6.2 Radius per Component Type

| Component | Recommended Radius | Notes |
|---|---|---|
| Primary CTA Button | `md` (8px) | Clean, modern — not too sharp, not too rounded |
| Secondary Button | `md` (8px) | Consistent with primary |
| Text Input / Textarea | `sm` (4px) | Subtle, professional |
| Select Dropdown | `sm` (4px) | Consistent with inputs |
| Card (standard) | `lg` (12px) | Warm but architectural |
| Card (featured/hero) | `xl` (16px) | Slightly more presence |
| Modal | `xl` (16px) | Outer container |
| Toast / Alert | `md` (8px) | Compact feedback |
| Tag / Badge | `full` (9999px) | Pill shape |
| Avatar | `full` (9999px) | Circular |
| Icon Button | `full` (9999px) | Circular icon action |
| Tooltip | `sm` (4px) | Small, contained |
| Progress Bar | `full` (9999px) | Pill fill |
| Divider | `none` (0px) | Geometric precision |
| Image (decorative) | `lg` (12px) | Softened but grounded |
| Section Container | `none` or `lg` | Based on context |

---

## 7. Motion / Animation

### 7.1 Duration Scale

| Token | CSS Custom Property | Value | Usage |
|---|---|---|---|
| Instant | `--znith-duration-instant` | 0ms | Immediate state switches, no visual transition |
| Fast | `--znith-duration-fast` | 100ms | Micro-interactions: button press, checkbox |
| Normal | `--znith-duration-normal` | 200ms | Default hover transitions, color changes |
| Smooth | `--znith-duration-smooth` | 300ms | Panel reveals, dropdown open, card hover |
| Slow | `--znith-duration-slow` | 500ms | Page element entrance, slide-in animations |
| Slower | `--znith-duration-slower` | 700ms | Hero animations, dramatic reveals |
| Crawl | `--znith-duration-crawl` | 1500ms | Gold pulse, ambient animations |

---

### 7.2 Easing Functions

| Token | CSS Custom Property | Value | Usage |
|---|---|---|---|
| Ease Out | `--znith-ease-out` | `cubic-bezier(0.0, 0.0, 0.2, 1.0)` | Primary — elements entering the screen |
| Ease In | `--znith-ease-in` | `cubic-bezier(0.4, 0.0, 1.0, 1.0)` | Elements leaving the screen |
| Ease In Out | `--znith-ease-in-out` | `cubic-bezier(0.4, 0.0, 0.2, 1.0)` | Transitions between states |
| Linear | `--znith-ease-linear` | `linear` | Progress bars, loaders, continuous motion |
| Spring | `--znith-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1.0)` | Playful reveals (use sparingly — brand is serious) |
| Sharp | `--znith-ease-sharp` | `cubic-bezier(0.4, 0.0, 0.6, 1.0)` | Quick, precise UI snaps |

---

### 7.3 Gold Pulse Animation (CTA)

Used on primary gold CTA buttons and key accent elements to draw attention without distraction.

```css
@keyframes znith-gold-pulse {
  0%   { box-shadow: 0 0 16px rgba(223, 159, 62, 0.40); opacity: 0.90; }
  50%  { box-shadow: 0 0 32px rgba(223, 159, 62, 0.60); opacity: 1.00; }
  100% { box-shadow: 0 0 16px rgba(223, 159, 62, 0.40); opacity: 0.90; }
}

/* Usage */
.znith-cta-primary {
  animation: znith-gold-pulse 1500ms var(--znith-ease-in-out) infinite;
}
```

**CSS Custom Properties for pulse:**

| Token | CSS Custom Property | Value |
|---|---|---|
| Pulse opacity min | `--znith-pulse-opacity-min` | `0.7` |
| Pulse opacity max | `--znith-pulse-opacity-max` | `1.0` |
| Pulse duration | `--znith-pulse-duration` | `1500ms` |
| Pulse glow min | `--znith-pulse-glow-min` | `rgba(223, 159, 62, 0.35)` |
| Pulse glow max | `--znith-pulse-glow-max` | `rgba(223, 159, 62, 0.60)` |

**Usage rule:** Apply only to the single most important CTA on any given view. Never pulse multiple elements simultaneously.

---

### 7.4 Standard Hover Transitions

| Property | Default Transition | Value |
|---|---|---|
| Color / Background | `--znith-transition-color` | `color 200ms var(--znith-ease-out), background-color 200ms var(--znith-ease-out)` |
| Transform (scale) | `--znith-transition-scale` | `transform 200ms var(--znith-ease-out)` |
| Shadow | `--znith-transition-shadow` | `box-shadow 300ms var(--znith-ease-out)` |
| Opacity | `--znith-transition-opacity` | `opacity 200ms var(--znith-ease-out)` |
| All (default) | `--znith-transition-default` | `all 200ms var(--znith-ease-out)` |
| Border | `--znith-transition-border` | `border-color 200ms var(--znith-ease-out)` |

**Hover scale values:**

| State | Scale Value | CSS Custom Property |
|---|---|---|
| Default | 1.0 | — |
| Card hover | 1.02 | `--znith-scale-hover-card` |
| Button hover | 1.03 | `--znith-scale-hover-button` |
| Icon hover | 1.10 | `--znith-scale-hover-icon` |
| Active / pressed | 0.98 | `--znith-scale-active` |

---

### 7.5 Page Transitions

| Transition | Duration | Easing | Properties |
|---|---|---|---|
| Page enter | 300ms | ease-out | `opacity: 0 → 1`, `transform: translateY(8px) → translateY(0)` |
| Page exit | 200ms | ease-in | `opacity: 1 → 0` |
| Section reveal | 500ms | ease-out | `opacity: 0 → 1`, `transform: translateY(24px) → translateY(0)` |
| Stagger delay | 80ms | — | Per-item delay for lists and card grids |

```css
/* Section reveal — apply via IntersectionObserver */
@keyframes znith-reveal {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.znith-reveal {
  animation: znith-reveal 500ms var(--znith-ease-out) both;
}

/* Stagger: each child delayed by 80ms */
.znith-reveal-stagger > *:nth-child(n) {
  animation-delay: calc(n * 80ms);
}
```

---

## 8. Opacity

### 8.1 Opacity Scale

| Token | CSS Custom Property | Value | Usage |
|---|---|---|---|
| 0 | `--znith-opacity-0` | 0 | Fully transparent, hidden |
| 5 | `--znith-opacity-5` | 0.05 | Near-invisible surface tints |
| 8 | `--znith-opacity-8` | 0.08 | Brand layer surface tints |
| 10 | `--znith-opacity-10` | 0.10 | Subtle overlay, watermark base |
| 15 | `--znith-opacity-15` | 0.15 | Semantic color surfaces |
| 20 | `--znith-opacity-20` | 0.20 | Disabled states, ghosted elements |
| 25 | `--znith-opacity-25` | 0.25 | Border accents, divider gold |
| 30 | `--znith-opacity-30` | 0.30 | Muted icons, de-emphasized content |
| 35 | `--znith-opacity-35` | 0.35 | Gold border accents on hover |
| 40 | `--znith-opacity-40` | 0.40 | Placeholder text |
| 50 | `--znith-opacity-50` | 0.50 | Mid-disabled, overlaid decorative elements |
| 60 | `--znith-opacity-60` | 0.60 | Secondary icon states |
| 70 | `--znith-opacity-70` | 0.70 | Gold pulse animation minimum |
| 75 | `--znith-opacity-75` | 0.75 | Overlay backdrops |
| 80 | `--znith-opacity-80` | 0.80 | Semi-transparent surfaces |
| 85 | `--znith-opacity-85` | 0.85 | Frosted glass effects |
| 90 | `--znith-opacity-90` | 0.90 | Near-opaque overlays |
| 92 | `--znith-opacity-92` | 0.92 | Modal / overlay backdrop default |
| 95 | `--znith-opacity-95` | 0.95 | Almost opaque, subtle transparency |
| 100 | `--znith-opacity-100` | 1.0 | Fully opaque, default solid state |

---

## 9. Complete CSS Custom Properties Reference

The block below consolidates all tokens into a single `:root` declaration, ready for inclusion in a global stylesheet.

```css
:root {
  /* ──────────────────────────────────────────
     COLOR — NAVY
  ────────────────────────────────────────── */
  --znith-color-navy-50:  #E8ECF4;
  --znith-color-navy-100: #C5CEDE;
  --znith-color-navy-200: #8E9EBE;
  --znith-color-navy-300: #5E74A0;
  --znith-color-navy-400: #3A5080;
  --znith-color-navy-500: #2A3A5A;
  --znith-color-navy-600: #1C2A4A;
  --znith-color-navy-700: #14203A;
  --znith-color-navy-800: #0D1828;
  --znith-color-navy-900: #091022;
  --znith-color-navy-950: #050B17;
  --znith-color-white:    #FFFFFF;

  /* ──────────────────────────────────────────
     COLOR — GOLD
  ────────────────────────────────────────── */
  --znith-color-gold-light: #FFD161;
  --znith-color-gold-300:   #F0B85A;
  --znith-color-gold-400:   #E8A847;
  --znith-color-gold-500:   #DF9F3E;
  --znith-color-gold-deep:  #C07A20;

  /* ──────────────────────────────────────────
     COLOR — NEUTRAL
  ────────────────────────────────────────── */
  --znith-color-neutral-0:   #FFFFFF;
  --znith-color-neutral-100: #F5F5F5;
  --znith-color-neutral-200: #DDDDDD;
  --znith-color-neutral-300: #BBBBBB;
  --znith-color-neutral-400: #999999;
  --znith-color-neutral-500: #7A7A7A;
  --znith-color-neutral-600: #555555;
  --znith-color-neutral-700: #333333;
  --znith-color-neutral-800: #1A1A1A;
  --znith-color-neutral-900: #0A0A0A;

  /* ──────────────────────────────────────────
     COLOR — SEMANTIC
  ────────────────────────────────────────── */
  --znith-color-success:        #2A6B4A;
  --znith-color-success-light:  #3A8A60;
  --znith-color-success-subtle: rgba(42, 107, 74, 0.15);
  --znith-color-warning:        #7A5A20;
  --znith-color-warning-light:  #A07030;
  --znith-color-warning-subtle: rgba(122, 90, 32, 0.15);
  --znith-color-error:          #7A2A2A;
  --znith-color-error-light:    #A03A3A;
  --znith-color-error-subtle:   rgba(122, 42, 42, 0.15);
  --znith-color-info:           #1E3A6A;
  --znith-color-info-light:     #2A5090;
  --znith-color-info-subtle:    rgba(30, 58, 106, 0.15);

  /* ──────────────────────────────────────────
     SURFACE SYSTEM
  ────────────────────────────────────────── */
  --znith-surface-background:    #091022;
  --znith-surface-default:       #14203A;
  --znith-surface-elevated:      #1C2A4A;
  --znith-surface-overlay:       rgba(20, 32, 58, 0.92);
  --znith-surface-border:        #2A3A5A;
  --znith-surface-border-accent: rgba(223, 159, 62, 0.35);

  /* ──────────────────────────────────────────
     BRAND LAYERS
  ────────────────────────────────────────── */
  /* ZNITH Corp */
  --znith-corp-primary:       #DF9F3E;
  --znith-corp-primary-light: #FFD161;
  --znith-corp-primary-deep:  #C07A20;
  --znith-corp-surface-tint:  rgba(223, 159, 62, 0.08);
  --znith-corp-border:        rgba(223, 159, 62, 0.25);

  /* ZNITH.AI OS */
  --znith-ai-primary:        #DF9F3E;
  --znith-ai-tech:           #2A5090;
  --znith-ai-tech-light:     #4A78C8;
  --znith-ai-gradient-start: #DF9F3E;
  --znith-ai-gradient-end:   #2A5090;
  --znith-ai-surface-tint:   rgba(42, 80, 144, 0.08);

  /* Leilaine */
  --znith-leilaine-primary:      #E8A847;
  --znith-leilaine-warm:         #F0C070;
  --znith-leilaine-navy:         #0D1828;
  --znith-leilaine-surface-tint: rgba(232, 168, 71, 0.06);
  --znith-leilaine-border:       rgba(232, 168, 71, 0.20);

  /* Líderes Leões */
  --znith-lideres-primary:      #FFD161;
  --znith-lideres-intense:      #DF9F3E;
  --znith-lideres-base:         #050B17;
  --znith-lideres-surface-tint: rgba(255, 209, 97, 0.10);
  --znith-lideres-border:       rgba(255, 209, 97, 0.30);
  --znith-lideres-lion:         #C07A20;

  /* ──────────────────────────────────────────
     TYPOGRAPHY
  ────────────────────────────────────────── */
  --znith-font-display: 'Cinzel', 'Palatino Linotype', 'Book Antiqua', Georgia, serif;
  --znith-font-body:    'Montserrat', 'Helvetica Neue', Arial, sans-serif;
  --znith-font-system:  'Roboto', 'Segoe UI', system-ui, sans-serif;
  --znith-font-mono:    'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

  --znith-text-xs:   0.75rem;
  --znith-text-sm:   0.875rem;
  --znith-text-base: 1rem;
  --znith-text-md:   1.125rem;
  --znith-text-lg:   1.25rem;
  --znith-text-xl:   1.5rem;
  --znith-text-2xl:  1.875rem;
  --znith-text-3xl:  2.25rem;
  --znith-text-4xl:  3rem;
  --znith-text-5xl:  3.75rem;
  --znith-text-6xl:  4.5rem;
  --znith-text-7xl:  6rem;

  --znith-weight-light:     300;
  --znith-weight-regular:   400;
  --znith-weight-medium:    500;
  --znith-weight-semibold:  600;
  --znith-weight-bold:      700;
  --znith-weight-extrabold: 800;

  /* ──────────────────────────────────────────
     SPACING
  ────────────────────────────────────────── */
  --znith-space-0:  0px;
  --znith-space-1:  4px;
  --znith-space-2:  8px;
  --znith-space-3:  12px;
  --znith-space-4:  16px;
  --znith-space-5:  20px;
  --znith-space-6:  24px;
  --znith-space-8:  32px;
  --znith-space-10: 40px;
  --znith-space-12: 48px;
  --znith-space-16: 64px;
  --znith-space-20: 80px;
  --znith-space-24: 96px;
  --znith-space-32: 128px;

  /* ──────────────────────────────────────────
     GRID
  ────────────────────────────────────────── */
  --znith-grid-columns:        12;
  --znith-grid-max-width:      1200px;
  --znith-grid-gutter-desktop: 24px;
  --znith-grid-gutter-mobile:  16px;

  --znith-bp-sm:  375px;
  --znith-bp-md:  768px;
  --znith-bp-lg:  1024px;
  --znith-bp-xl:  1440px;
  --znith-bp-2xl: 1920px;

  /* ──────────────────────────────────────────
     ELEVATION / SHADOW
  ────────────────────────────────────────── */
  --znith-shadow-flat:     none;
  --znith-shadow-raised:   0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.6);
  --znith-shadow-floating: 0 4px 16px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4);
  --znith-shadow-overlay:  0 8px 32px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4);
  --znith-shadow-modal:    0 24px 64px rgba(0,0,0,0.7), 0 8px 32px rgba(0,0,0,0.5);

  --znith-shadow-gold-subtle: 0 0 16px rgba(223,159,62,0.15);
  --znith-shadow-gold:        0 0 24px rgba(223,159,62,0.25), 0 4px 16px rgba(0,0,0,0.4);
  --znith-shadow-gold-strong: 0 0 40px rgba(223,159,62,0.35), 0 8px 32px rgba(0,0,0,0.5);
  --znith-shadow-gold-cta:    0 0 32px rgba(223,159,62,0.45), 0 4px 24px rgba(0,0,0,0.5);

  --znith-z-base:     0;
  --znith-z-raised:   10;
  --znith-z-dropdown: 100;
  --znith-z-sticky:   200;
  --znith-z-overlay:  300;
  --znith-z-modal:    400;
  --znith-z-popover:  500;
  --znith-z-toast:    600;

  /* ──────────────────────────────────────────
     BORDER RADIUS
  ────────────────────────────────────────── */
  --znith-radius-none: 0px;
  --znith-radius-sm:   4px;
  --znith-radius-md:   8px;
  --znith-radius-lg:   12px;
  --znith-radius-xl:   16px;
  --znith-radius-2xl:  24px;
  --znith-radius-full: 9999px;

  /* ──────────────────────────────────────────
     MOTION
  ────────────────────────────────────────── */
  --znith-duration-instant: 0ms;
  --znith-duration-fast:    100ms;
  --znith-duration-normal:  200ms;
  --znith-duration-smooth:  300ms;
  --znith-duration-slow:    500ms;
  --znith-duration-slower:  700ms;
  --znith-duration-crawl:   1500ms;

  --znith-ease-out:     cubic-bezier(0.0, 0.0, 0.2, 1.0);
  --znith-ease-in:      cubic-bezier(0.4, 0.0, 1.0, 1.0);
  --znith-ease-in-out:  cubic-bezier(0.4, 0.0, 0.2, 1.0);
  --znith-ease-linear:  linear;
  --znith-ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1.0);
  --znith-ease-sharp:   cubic-bezier(0.4, 0.0, 0.6, 1.0);

  --znith-transition-color:   color 200ms var(--znith-ease-out), background-color 200ms var(--znith-ease-out);
  --znith-transition-scale:   transform 200ms var(--znith-ease-out);
  --znith-transition-shadow:  box-shadow 300ms var(--znith-ease-out);
  --znith-transition-opacity: opacity 200ms var(--znith-ease-out);
  --znith-transition-border:  border-color 200ms var(--znith-ease-out);
  --znith-transition-default: all 200ms var(--znith-ease-out);

  --znith-scale-hover-card:   1.02;
  --znith-scale-hover-button: 1.03;
  --znith-scale-hover-icon:   1.10;
  --znith-scale-active:       0.98;

  --znith-pulse-opacity-min: 0.7;
  --znith-pulse-opacity-max: 1.0;
  --znith-pulse-duration:    1500ms;
  --znith-pulse-glow-min:    rgba(223, 159, 62, 0.35);
  --znith-pulse-glow-max:    rgba(223, 159, 62, 0.60);

  /* ──────────────────────────────────────────
     OPACITY
  ────────────────────────────────────────── */
  --znith-opacity-0:   0;
  --znith-opacity-5:   0.05;
  --znith-opacity-8:   0.08;
  --znith-opacity-10:  0.10;
  --znith-opacity-15:  0.15;
  --znith-opacity-20:  0.20;
  --znith-opacity-25:  0.25;
  --znith-opacity-30:  0.30;
  --znith-opacity-35:  0.35;
  --znith-opacity-40:  0.40;
  --znith-opacity-50:  0.50;
  --znith-opacity-60:  0.60;
  --znith-opacity-70:  0.70;
  --znith-opacity-75:  0.75;
  --znith-opacity-80:  0.80;
  --znith-opacity-85:  0.85;
  --znith-opacity-90:  0.90;
  --znith-opacity-92:  0.92;
  --znith-opacity-95:  0.95;
  --znith-opacity-100: 1.0;
}
```

---

## 10. Usage Principles

### Gold Restraint Rule
Gold is power. The more it appears, the less power it has. Treat gold like a signature: it appears where it matters most — the primary CTA, the main headline accent, key icon fills. Never as a background fill on large areas.

### Navy Depth Principle
Use the surface tier system to create visual depth. Background (#091022) recedes. Surface (#14203A) sits at eye level. Elevated (#1C2A4A) comes forward. This creates natural hierarchy without borders or heavy shadows.

### Typography Authority Principle
Cinzel speaks once per section — the headline. Montserrat carries everything else. Never mix them in the same text block at similar sizes. The contrast between Cinzel's authority and Montserrat's clarity is a core brand signal.

### Motion Restraint Principle
Animations signal premium when they are subtle and purposeful. The gold pulse is reserved for one element per view. Section reveals use vertical drift (24px), not horizontal or dramatic movement. Speed defaults to 200ms: fast enough to feel responsive, slow enough to feel intentional.

### Semantic Color Discipline
Semantic colors (success, warning, error, info) are status signals only. They never appear for decorative use. Keep them muted — never saturated or bright. A ZNITH error state reads as premium, not alarming.

---

*This document is the single source of truth for all ZNITH visual tokens. Components, pages, and all downstream design artifacts must reference these tokens exclusively.*
