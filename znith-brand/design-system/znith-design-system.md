# ZNITH Design System

**Version:** 2.0
**Last updated:** April 2026
**Brand:** ZNITH — Arquitetura de Crescimento Comercial com IA
**Founder:** Leilaine Campioto
**Tagline:** Direção. Consciencia. Legado.
**Mode:** Dark-first (light mode specified as secondary)

---

## Table of Contents

1. [Color System](#1-color-system)
2. [Typography System](#2-typography-system)
3. [Spacing & Layout System](#3-spacing--layout-system)
4. [Component Specifications](#4-component-specifications)
5. [Surface System](#5-surface-system)
6. [Effects & Motion](#6-effects--motion)
7. [Brand Elements & Patterns](#7-brand-elements--patterns)
8. [Voice & Tone Integration](#8-voice--tone-integration)
9. [Responsive Breakpoints](#9-responsive-breakpoints)
10. [Accessibility](#10-accessibility)
11. [CSS Custom Properties / Design Tokens](#11-css-custom-properties--design-tokens)

---

## Design Philosophy

The ZNITH design system exists at the intersection of institutional weight and digital sophistication. Every decision serves three principles:

1. **Navy governs.** The deep navy foundation creates authority and institutional presence. It is the canvas on which everything else rests.
2. **Gold signs.** Gold accents function like a signature -- appearing precisely where they matter most. Never dominant. Always intentional.
3. **White breathes.** Generous whitespace, clear typographic hierarchy, and disciplined restraint create the premium feel of a consultancy that charges R$50K-150K per engagement.

Visual references: McKinsey (institutional weight), Stripe (digital sophistication), Porsche (silent authority), Linear (clean tech aesthetic), Aesop (sober refinement), Cartier/Montblanc (legacy and signature).

NOT like: cheap SaaS, generic startup, motivational coach, AI hype brand, or pricing-tier comparison pages.

---

## 1. Color System

### 1.1 Primary Palette -- Navy Scale

The deep navy is ZNITH's governing color. It communicates authority, depth, and institutional weight. The scale progresses from near-white (for light-mode contexts) to near-black (for deepest dark surfaces and scrims).

| Token | CSS Custom Property | Hex | RGB | Usage |
|---|---|---|---|---|
| Navy 50 | `--znith-color-navy-50` | `#E8ECF4` | 232, 236, 244 | Light mode backgrounds, inverted sections |
| Navy 100 | `--znith-color-navy-100` | `#C5CEDE` | 197, 206, 222 | Light mode borders, dividers |
| Navy 200 | `--znith-color-navy-200` | `#8E9EBE` | 142, 158, 190 | Muted text on light backgrounds |
| Navy 300 | `--znith-color-navy-300` | `#5E74A0` | 94, 116, 160 | Secondary text on mid-tone surfaces |
| Navy 400 | `--znith-color-navy-400` | `#3A5080` | 58, 80, 128 | Subtle UI elements, tertiary text |
| Navy 500 | `--znith-color-navy-500` | `#2A3A5A` | 42, 58, 90 | Default borders in dark mode |
| Navy 600 | `--znith-color-navy-600` | `#1C2A4A` | 28, 42, 74 | Elevated surfaces, dropdown backgrounds |
| Navy 700 | `--znith-color-navy-700` | `#14203A` | 20, 32, 58 | Card surfaces, navigation background |
| Navy 800 | `--znith-color-navy-800` | `#0D1828` | 13, 24, 40 | Deep surfaces, sidebar backgrounds |
| Navy 900 | `--znith-color-navy-900` | `#091022` | 9, 16, 34 | Primary page background (dark mode) |
| Navy 950 | `--znith-color-navy-950` | `#050B17` | 5, 11, 23 | Deepest dark, modal scrim base |

**Navy 900 (#091022) is the primary brand dark.** All dark-mode page backgrounds default to this value. It is warmer and more sophisticated than pure black, creating a navy-tinted darkness that feels institutional rather than void.

---

### 1.2 Accent Gold Scale

Gold is ZNITH's primary accent color. It signals achievement, authority, and premium positioning. Gold functions like a signature: it appears where it matters most and loses power when oversaturated.

| Token | CSS Custom Property | Hex | RGB | Character | Usage |
|---|---|---|---|---|---|
| Champagne | `--znith-color-gold-champagne` | `#F5E6C8` | 245, 230, 200 | Subtle, warm neutral | Light backgrounds with warmth, subtle tints, light-mode accent backgrounds |
| Gold Light | `--znith-color-gold-light` | `#FFD161` | 255, 209, 97 | Bright, optimistic | Highlights, hover states, thin decorative lines, progress indicators |
| Gold 300 | `--znith-color-gold-300` | `#F0B85A` | 240, 184, 90 | Warm secondary | Secondary accent, icon fills, gradient midpoints |
| Gold 400 | `--znith-color-gold-400` | `#E8A847` | 232, 168, 71 | Balanced warm | Supporting gold, gradient endpoint, personal brand accent |
| Gold 500 | `--znith-color-gold-500` | `#DF9F3E` | 223, 159, 62 | Core brand gold | Primary CTAs, headline accents, key icons, tagline color |
| Gold Deep | `--znith-color-gold-deep` | `#C07A20` | 192, 122, 32 | Rich, dark amber | Pressed/active states, gold shadow tints, lion imagery |
| Gold Dark | `--znith-color-gold-dark` | `#8B5E1A` | 139, 94, 26 | Deep amber | Subtle dark-mode surface tints, muted gold applications |

**Gold usage rules:**
- Maximum **15%** of any composition surface area
- Never as a full background fill on blocks larger than a button
- One gold-accent CTA per viewport maximum
- Gold on navy background must maintain minimum 4.5:1 contrast ratio for text
- Gold gradient: always `#DF9F3E` to `#FFD161` (135deg default angle)

---

### 1.3 Neutral Scale

Pure neutrals for text, UI chrome, and non-branded elements. Used alongside the navy scale for text hierarchy and supporting elements.

| Token | CSS Custom Property | Hex | Usage |
|---|---|---|---|
| White | `--znith-color-neutral-0` | `#FFFFFF` | Primary headings, high-emphasis text |
| Neutral 100 | `--znith-color-neutral-100` | `#F5F5F5` | Off-white text, light-mode primary text |
| Neutral 200 | `--znith-color-neutral-200` | `#DDDDDD` | Secondary text on dark surfaces |
| Neutral 300 | `--znith-color-neutral-300` | `#BBBBBB` | Body text on dark surfaces (primary body) |
| Neutral 400 | `--znith-color-neutral-400` | `#999999` | Placeholder text, caption text |
| Neutral 500 | `--znith-color-neutral-500` | `#7A7A7A` | Disabled text, metadata, timestamps |
| Neutral 600 | `--znith-color-neutral-600` | `#555555` | Dividers on light mode, borders |
| Neutral 700 | `--znith-color-neutral-700` | `#333333` | Dark text on light backgrounds |
| Neutral 800 | `--znith-color-neutral-800` | `#1A1A1A` | Near-black, dark-mode micro-borders |
| Neutral 900 | `--znith-color-neutral-900` | `#0A0A0A` | Deepest neutral |

**Text hierarchy on dark backgrounds:**

| Level | Color | Hex | Opacity approach |
|---|---|---|---|
| Primary | White | `#FFFFFF` | 100% |
| Secondary | Light gray | `#BBBBBB` | ~73% equivalent |
| Tertiary | Mid gray | `#999999` | ~60% equivalent |
| Muted | Dark gray | `#7A7A7A` | ~48% equivalent |
| Disabled | Dim gray | `#555555` | ~33% equivalent |

---

### 1.4 Semantic Colors

Muted, premium tones -- never neon or saturated. Semantic colors appear sparingly in feedback and status states only. They must feel premium even when signaling errors.

| Role | Token | CSS Custom Property | Hex | Usage |
|---|---|---|---|---|
| Success | Default | `--znith-color-success` | `#2A6B4A` | Confirmation backgrounds |
| Success | Light | `--znith-color-success-light` | `#3A8A60` | Success text, icons |
| Success | Bright | `--znith-color-success-bright` | `#68D391` | Status dots, small indicators |
| Success | Subtle | `--znith-color-success-subtle` | `rgba(42, 107, 74, 0.15)` | Success tint on surfaces |
| Warning | Default | `--znith-color-warning` | `#7A5A20` | Warning backgrounds |
| Warning | Light | `--znith-color-warning-light` | `#A07030` | Warning text, icons |
| Warning | Bright | `--znith-color-warning-bright` | `#ECC94B` | Warning indicators |
| Warning | Subtle | `--znith-color-warning-subtle` | `rgba(122, 90, 32, 0.15)` | Warning tint on surfaces |
| Error | Default | `--znith-color-error` | `#7A2A2A` | Error backgrounds |
| Error | Light | `--znith-color-error-light` | `#A03A3A` | Error text |
| Error | Bright | `--znith-color-error-bright` | `#FC8181` | Error icons, dot indicators |
| Error | Subtle | `--znith-color-error-subtle` | `rgba(122, 42, 42, 0.15)` | Error tint on surfaces |
| Info | Default | `--znith-color-info` | `#1E3A6A` | Info backgrounds |
| Info | Light | `--znith-color-info-light` | `#2A5090` | Info text |
| Info | Bright | `--znith-color-info-bright` | `#63B3ED` | Info indicators |
| Info | Subtle | `--znith-color-info-subtle` | `rgba(30, 58, 106, 0.15)` | Info tint on surfaces |

---

### 1.5 Sub-brand Color Variations

Each ZNITH product line expresses a distinct accent identity layered on the shared navy foundation.

#### ZNITH Corp (Master Brand)
The institutional layer. Navy + gold only. Maximum restraint.

| Token | CSS Custom Property | Value | Usage |
|---|---|---|---|
| Primary | `--znith-corp-primary` | `#DF9F3E` | Core gold accent |
| Primary Light | `--znith-corp-primary-light` | `#FFD161` | Hover states, highlights |
| Primary Deep | `--znith-corp-primary-deep` | `#C07A20` | Pressed states, shadows |
| Surface Tint | `--znith-corp-surface-tint` | `rgba(223, 159, 62, 0.08)` | Featured card backgrounds |
| Border | `--znith-corp-border` | `rgba(223, 159, 62, 0.25)` | Accent borders on hover |

#### ZNITH.AI (Technology Layer)
Tech-forward. Navy base + cold electric blue replaces gold as the primary accent. Gold appears only in premium touches.

| Token | CSS Custom Property | Value | Usage |
|---|---|---|---|
| Primary | `--znith-ai-primary` | `#2A5090` | Cold electric blue -- tech accent |
| Primary Light | `--znith-ai-primary-light` | `#4A78C8` | Hover, highlights |
| Primary Bright | `--znith-ai-primary-bright` | `#6A9AF0` | Active indicators |
| Cyan Accent | `--znith-ai-cyan` | `#00B4D8` | Data visualization, tech pulsing |
| Gold Accent | `--znith-ai-gold` | `#DF9F3E` | Premium product marker only |
| Surface Tint | `--znith-ai-surface-tint` | `rgba(42, 80, 144, 0.08)` | Tech card backgrounds |
| Gradient | `--znith-ai-gradient` | `linear-gradient(135deg, #2A5090, #4A78C8)` | Tech feature accents |

#### ZNITH.AI OS (Flagship Product)
The commercial architecture system. Combines tech blue + strategic gold. System/architecture feel.

| Token | CSS Custom Property | Value | Usage |
|---|---|---|---|
| Primary | `--znith-os-primary` | `#DF9F3E` | Gold for strategic elements |
| Tech Accent | `--znith-os-tech` | `#2A5090` | Blue for tech/system elements |
| Tech Light | `--znith-os-tech-light` | `#4A78C8` | Interactive tech elements |
| Gradient | `--znith-os-gradient` | `linear-gradient(135deg, #DF9F3E, #2A5090)` | Phase transitions, hero accents |
| Surface Tint | `--znith-os-surface-tint` | `rgba(42, 80, 144, 0.08)` | Phase card backgrounds |
| Phase Gold | `--znith-os-phase-gold` | `rgba(223, 159, 62, 0.15)` | Phase badge backgrounds |

#### ZNITH Consulting (Strategic Advisory)
Classic institutional. Navy + gold at maximum restraint. No additional accent colors. Authority through absence.

| Token | CSS Custom Property | Value | Usage |
|---|---|---|---|
| Primary | `--znith-consulting-primary` | `#DF9F3E` | Minimal gold -- tagline, one accent per page |
| Surface | `--znith-consulting-surface` | `#0D1828` | Deeper navy for gravitas |
| Border | `--znith-consulting-border` | `rgba(223, 159, 62, 0.15)` | Ultra-subtle gold borders |

#### Lideres Leoes (Leadership Movement)
The one context where gold is bold and dominant. Deep navy + intense gold. Movement energy.

| Token | CSS Custom Property | Value | Usage |
|---|---|---|---|
| Primary | `--znith-lideres-primary` | `#FFD161` | Bright gold -- primary accent |
| Intense | `--znith-lideres-intense` | `#DF9F3E` | Secondary gold |
| Dark Base | `--znith-lideres-base` | `#050B17` | Deepest background |
| Lion Gold | `--znith-lideres-lion` | `#C07A20` | Lion imagery, crown accent |
| Surface Tint | `--znith-lideres-surface-tint` | `rgba(255, 209, 97, 0.10)` | Featured card tint |
| Border | `--znith-lideres-border` | `rgba(255, 209, 97, 0.30)` | Active borders |

#### Leilaine Campioto (Personal Brand)
Softer, warmer, premium feminine. Warm gold + softer navy. Refined but personal.

| Token | CSS Custom Property | Value | Usage |
|---|---|---|---|
| Primary | `--znith-leilaine-primary` | `#E8A847` | Warm gold accent |
| Warm Gold | `--znith-leilaine-warm` | `#F0C070` | Soft highlights |
| Rose Accent | `--znith-leilaine-rose` | `#D4A0A0` | Subtle feminine accent (sparingly) |
| Navy | `--znith-leilaine-navy` | `#0D1828` | Background |
| Surface Tint | `--znith-leilaine-surface-tint` | `rgba(232, 168, 71, 0.06)` | Warm card backgrounds |
| Border | `--znith-leilaine-border` | `rgba(232, 168, 71, 0.20)` | Subtle warm borders |

---

### 1.6 Light Mode Palette

Light mode is the institutional/editorial mode -- used for proposals, documents, print contexts, and formal presentations.

| Role | CSS Custom Property | Hex (Light Mode) | Usage |
|---|---|---|---|
| Background | `--znith-light-bg` | `#FFFFFF` | Page background |
| Surface | `--znith-light-surface` | `#F7F8FA` | Card, panel backgrounds |
| Surface Elevated | `--znith-light-elevated` | `#FFFFFF` | Raised cards, modals |
| Border | `--znith-light-border` | `#E2E5EB` | Dividers, card borders |
| Border Subtle | `--znith-light-border-subtle` | `#F0F1F4` | Inner dividers |
| Text Primary | `--znith-light-text` | `#091022` | Headings, primary text |
| Text Secondary | `--znith-light-text-secondary` | `#3A5080` | Body text |
| Text Muted | `--znith-light-text-muted` | `#8E9EBE` | Captions, timestamps |
| Accent Gold | `--znith-light-gold` | `#C07A20` | Gold accent (darkened for contrast on white) |
| Accent Blue | `--znith-light-blue` | `#2A5090` | Tech accent |

**Light-mode shadows use navy-tinted values, not pure black:**
- Raised: `0 1px 3px rgba(9, 16, 34, 0.08), 0 1px 2px rgba(9, 16, 34, 0.04)`
- Floating: `0 4px 16px rgba(9, 16, 34, 0.10), 0 2px 8px rgba(9, 16, 34, 0.06)`
- Modal: `0 24px 64px rgba(9, 16, 34, 0.16), 0 8px 32px rgba(9, 16, 34, 0.10)`

---

## 2. Typography System

### 2.1 Font Families

| Role | Family | Google Fonts | CSS Custom Property | Fallback Stack |
|---|---|---|---|---|
| Display / Headings | Cinzel | `Cinzel:wght@400;600;700` | `--znith-font-display` | `'Cinzel', 'Palatino Linotype', 'Book Antiqua', Georgia, serif` |
| Body / UI | Montserrat | `Montserrat:wght@300;400;500;600;700;800` | `--znith-font-body` | `'Montserrat', 'Helvetica Neue', Arial, sans-serif` |
| Mono (code/data) | JetBrains Mono | `JetBrains+Mono:wght@400;500;700` | `--znith-font-mono` | `'JetBrains Mono', 'Fira Code', 'Courier New', monospace` |

**Cinzel** is a serif typeface inspired by classical Roman inscriptions. Its high stroke contrast, open letterforms, and engraved character reinforce ZNITH's authority and legacy positioning. Cinzel naturally reads heavier than equivalent numerical weights -- use 400 for most headings, 600 for emphasis, 700 only for very short display lines.

**Montserrat** is a geometric sans-serif with clean proportions and excellent legibility across sizes. It carries the entire system beyond headings: body copy, navigation, buttons, labels, captions, and form elements.

**JetBrains Mono** is a developer-focused monospace font used strictly for data displays, code references, technical specifications, and OS-related content within the ZNITH.AI and ZNITH.AI OS contexts.

**Google Fonts import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=JetBrains+Mono:wght@400;500;700&family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

---

### 2.2 Type Scale

Base unit: 16px (1rem). Scale factor: 1.25 (Major Third).

| Name | Token | CSS Property | Desktop px | rem | Line Height | Letter Spacing | Font Weight |
|---|---|---|---|---|---|---|---|
| Display | `--znith-text-display` | `clamp(48px, 7vw, 96px)` | 72-96 | 4.5-6 | 1.05-1.1 | -0.04em to -0.05em | 400-700 |
| H1 | `--znith-text-h1` | `clamp(36px, 5vw, 60px)` | 48-60 | 3-3.75 | 1.1-1.15 | -0.03em | 400-700 |
| H2 | `--znith-text-h2` | `clamp(28px, 4vw, 48px)` | 36-48 | 2.25-3 | 1.15-1.2 | -0.02em | 400-600 |
| H3 | `--znith-text-h3` | `clamp(22px, 3vw, 36px)` | 28-36 | 1.75-2.25 | 1.2-1.25 | -0.01em | 600 |
| H4 | `--znith-text-h4` | `clamp(18px, 2.5vw, 24px)` | 20-24 | 1.25-1.5 | 1.3 | 0 | 600 |
| H5 | `--znith-text-h5` | `16px` | 16 | 1 | 1.4 | 0.05em | 600 |
| H6 | `--znith-text-h6` | `14px` | 14 | 0.875 | 1.4 | 0.05em | 500 |
| Body Large | `--znith-text-body-lg` | `18px` | 18 | 1.125 | 1.7 | 0 | 400 |
| Body | `--znith-text-body` | `16px` | 16 | 1 | 1.6 | 0 | 400 |
| Body Small | `--znith-text-body-sm` | `14px` | 14 | 0.875 | 1.5 | 0.01em | 400 |
| Caption | `--znith-text-caption` | `12px` | 12 | 0.75 | 1.4 | 0.02em | 400 |
| Overline | `--znith-text-overline` | `12px` | 12 | 0.75 | 1.0 | 0.10em | 600 |
| Label | `--znith-text-label` | `13px` | 13 | 0.8125 | 1.4 | 0.06em | 500 |
| Tagline | `--znith-text-tagline` | `clamp(14px, 1.5vw, 16px)` | 14-16 | 0.875-1 | 1.4 | 0.15em | 400-500 |

---

### 2.3 Font Weights

| Weight Name | Value | CSS Property | Used With |
|---|---|---|---|
| Light | 300 | `--znith-weight-light` | ZNITH wordmark in nav (weight 300), subtle body |
| Regular | 400 | `--znith-weight-regular` | Body default, Cinzel headings (reads bold naturally) |
| Medium | 500 | `--znith-weight-medium` | Navigation, sub-headings, buttons, tags |
| Semibold | 600 | `--znith-weight-semibold` | Section titles, emphasized body, Cinzel H2-H3 |
| Bold | 700 | `--znith-weight-bold` | Display headlines, strong emphasis, Montserrat H4 |
| Extrabold | 800 | `--znith-weight-extrabold` | Large display lines (Montserrat only -- never Cinzel) |

---

### 2.4 Recommended Typographic Pairings

| Context | Font | Size | Weight | Letter Spacing | Color (Dark Mode) |
|---|---|---|---|---|---|
| Hero Display | Cinzel | Display (clamp 48-96px) | 400 | -0.04em | `#FFFFFF` |
| Hero Display Accent Word | Cinzel | Display | 700 | -0.04em | `#DF9F3E` |
| Page H1 | Cinzel | H1 (clamp 36-60px) | 400 | -0.03em | `#FFFFFF` |
| Section H2 | Cinzel | H2 (clamp 28-48px) | 400 | -0.02em | `#FFFFFF` |
| Subsection H3 | Cinzel | H3 (clamp 22-36px) | 600 | -0.01em | `#FFFFFF` |
| Card Title | Montserrat | 20-24px | 600 | -0.01em | `#FFFFFF` |
| Body Copy | Montserrat | 16px | 400 | 0 | `#BBBBBB` |
| Body Large | Montserrat | 18px | 400 | 0 | `#BBBBBB` |
| Body Small | Montserrat | 14px | 400 | 0.01em | `#7A7A7A` |
| Caption | Montserrat | 12px | 400 | 0.02em | `#7A7A7A` |
| Overline | Montserrat | 12px | 600 | 0.10em | `#DF9F3E` |
| Tagline | Montserrat | 14-16px | 500 | 0.15em | `#DF9F3E` |
| Button Primary (Gold) | Montserrat | 14px | 600 | 0.08em | `#000000` |
| Button CTA (Premium) | Cinzel | 14px | 400 | 0.10em | `#000000` |
| Nav Item | Montserrat | 14-16px | 500 | 0.04em | `#FFFFFF` |
| Label / Tag | Montserrat | 12-13px | 500 | 0.06em | `#BBBBBB` |
| Data / Mono | JetBrains Mono | 14px | 400 | 0 | `#BBBBBB` |

**Critical rule:** Cinzel speaks once per section -- the headline. Montserrat carries everything else. Never mix them in the same text block at similar sizes. The contrast between Cinzel's authority and Montserrat's clarity is a core brand signal.

---

### 2.5 CSS Typography Definitions

```css
/* Display */
.text-display {
  font-family: var(--znith-font-display);
  font-size: clamp(48px, 7vw, 96px);
  font-weight: 400;
  color: #FFFFFF;
  line-height: 1.05;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

/* H1-H3: Cinzel */
h1, .h1 {
  font-family: var(--znith-font-display);
  font-size: clamp(36px, 5vw, 60px);
  font-weight: 400;
  color: #FFFFFF;
  line-height: 1.15;
  letter-spacing: -0.03em;
  text-wrap: balance;
}
h2, .h2 {
  font-family: var(--znith-font-display);
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 400;
  color: #FFFFFF;
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
h3, .h3 {
  font-family: var(--znith-font-display);
  font-size: clamp(22px, 3vw, 36px);
  font-weight: 600;
  color: #FFFFFF;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

/* H4-H6: Montserrat */
h4, .h4 {
  font-family: var(--znith-font-body);
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 600;
  color: #FFFFFF;
  line-height: 1.3;
}
h5, .h5 {
  font-family: var(--znith-font-body);
  font-size: 16px;
  font-weight: 600;
  color: #BBBBBB;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
h6, .h6 {
  font-family: var(--znith-font-body);
  font-size: 14px;
  font-weight: 500;
  color: #7A7A7A;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Body */
.body-lg {
  font-family: var(--znith-font-body);
  font-size: 18px;
  font-weight: 400;
  color: #BBBBBB;
  line-height: 1.7;
}
.body {
  font-family: var(--znith-font-body);
  font-size: 16px;
  font-weight: 400;
  color: #BBBBBB;
  line-height: 1.6;
  text-wrap: pretty;
}
.body-sm {
  font-family: var(--znith-font-body);
  font-size: 14px;
  font-weight: 400;
  color: #7A7A7A;
  line-height: 1.5;
}

/* Utility */
.caption {
  font-family: var(--znith-font-body);
  font-size: 12px;
  font-weight: 400;
  color: #7A7A7A;
  line-height: 1.4;
}
.overline {
  font-family: var(--znith-font-body);
  font-size: 12px;
  font-weight: 600;
  color: #DF9F3E;
  text-transform: uppercase;
  letter-spacing: 0.10em;
  line-height: 1.0;
}
.tagline {
  font-family: var(--znith-font-body);
  font-size: clamp(14px, 1.5vw, 16px);
  font-weight: 500;
  color: #DF9F3E;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
.quote {
  font-family: var(--znith-font-display);
  font-size: clamp(20px, 2.5vw, 24px);
  font-weight: 400;
  font-style: italic;
  color: #FFFFFF;
  line-height: 1.6;
  padding-left: 20px;
  border-left: 3px solid #DF9F3E;
}
```

---

## 3. Spacing & Layout System

### 3.1 Base Spacing Scale

Base unit: **4px**. All spacing values are strict multiples of 4px.

| Token | CSS Custom Property | px | rem | Usage |
|---|---|---|---|---|
| 0 | `--znith-space-0` | 0 | 0 | Reset, flush |
| 1 | `--znith-space-1` | 4px | 0.25rem | Micro gaps: icon-to-text, inline badge padding |
| 2 | `--znith-space-2` | 8px | 0.5rem | Tight: list item gaps, input padding (vertical) |
| 3 | `--znith-space-3` | 12px | 0.75rem | Small: button vertical padding, tag gaps |
| 4 | `--znith-space-4` | 16px | 1rem | Default: card inner padding, input padding |
| 5 | `--znith-space-5` | 20px | 1.25rem | Medium: form field gap, nav item padding |
| 6 | `--znith-space-6` | 24px | 1.5rem | Standard: card gap, section element gap |
| 8 | `--znith-space-8` | 32px | 2rem | Large: card padding default, content block gap |
| 10 | `--znith-space-10` | 40px | 2.5rem | Component spacing, between H2 and content |
| 12 | `--znith-space-12` | 48px | 3rem | Section sub-element spacing |
| 16 | `--znith-space-16` | 64px | 4rem | Section padding (mobile) |
| 20 | `--znith-space-20` | 80px | 5rem | Section padding (tablet) |
| 24 | `--znith-space-24` | 96px | 6rem | Section padding (desktop) |
| 32 | `--znith-space-32` | 128px | 8rem | Macro spacing, hero padding |

---

### 3.2 Container System

| Size | CSS Custom Property | Max Width | Usage |
|---|---|---|---|
| sm | `--znith-container-sm` | 640px | Body copy, narrow content |
| md | `--znith-container-md` | 768px | Testimonials, quotes, centered content |
| lg | `--znith-container-lg` | 1024px | Feature grids, process steps |
| xl | `--znith-container-xl` | 1200px | Primary content container (default) |
| 2xl | `--znith-container-2xl` | 1440px | Wide layouts, dashboard contexts |

**Default container:** `max-width: 1200px; margin: 0 auto;` with responsive horizontal padding.

---

### 3.3 Section Padding

| Breakpoint | Vertical Padding | Horizontal Container Padding |
|---|---|---|
| Mobile (< 640px) | 64px (`space-16`) | 20px (`space-5`) |
| Tablet (640-1023px) | 80px (`space-20`) | 32px (`space-8`) |
| Desktop (1024-1279px) | 96px (`space-24`) | 48px (`space-12`) |
| Large (1280px+) | 96-128px | auto (centered container) |

---

### 3.4 Component Spacing Guidelines

| Component | Internal Padding | Gap Between Elements |
|---|---|---|
| Button (sm) | 8px x 16px | -- |
| Button (md) | 12px x 24px | -- |
| Button (lg) | 16px x 32px | -- |
| Card (compact) | 24px | 16px between elements |
| Card (default) | 32px | 20px between elements |
| Card (spacious) | 48px | 24px between elements |
| Form field | 12px x 16px | 8px label-to-input |
| Form group | -- | 24px between fields |
| Navigation item | 8px x 16px | -- |
| Section inner elements | -- | 48px between major blocks |
| Icon + label | -- | 8px |

---

### 3.5 Grid System

| Property | Value | CSS Custom Property |
|---|---|---|
| Columns | 12 | `--znith-grid-columns: 12` |
| Max Width | 1200px | `--znith-grid-max-width: 1200px` |
| Gutter (desktop) | 24px | `--znith-grid-gutter-desktop: 24px` |
| Gutter (mobile) | 16px | `--znith-grid-gutter-mobile: 16px` |

**Common layout patterns:**

| Layout | Column Span | Usage |
|---|---|---|
| Full width | 12/12 | Hero sections, full-bleed media |
| Content centered | 8/12 offset 2 | Long-form copy, body text blocks |
| Two column 50/50 | 6/12 + 6/12 | Feature splits, comparisons |
| Two column 60/40 | 7/12 + 5/12 | Text + visual pairings |
| Three column | 4/12 x 3 | Feature cards, icon grids |
| Four column | 3/12 x 4 | Stat blocks, small metric cards |
| Sidebar layout | 8/12 + 4/12 | Article + aside, OS dashboard |

**Container Padding per Breakpoint:**

| Breakpoint | Container Padding | Max Width |
|---|---|---|
| < 375px | 16px | 100% |
| 375px+ | 20px | 100% |
| 768px+ | 32px | 100% |
| 1024px+ | 48px | 1200px |
| 1440px+ | auto | 1200px |
| 1920px+ | auto | 1200px |

---

## 4. Component Specifications

### 4.1 Buttons

**Sizing Scale:**

| Size | Height | Padding X | Font Size | Letter Spacing |
|---|---|---|---|---|
| sm | 32px | 12px | 13px | 0.08em |
| md | 40px | 20px | 14px | 0.08em |
| lg | 48px | 28px | 16px | 0.10em |

#### Primary Button

The main conversion action. Gold gradient background, black text. The most visually prominent interactive element on any page.

```
Background:      linear-gradient(135deg, #DF9F3E 0%, #FFD161 100%)
Color:           #000000
Font:            Montserrat, weight 600
Text-transform:  uppercase
Letter-spacing:  0.08em
Border-radius:   8px
Box-shadow:      0 0 21px rgba(255, 209, 97, 0.3)

States:
  Default  — gradient as above, shadow active
  Hover    — gradient reversed (#FFD161 to #DF9F3E), scale(1.02),
             shadow 0 0 32px rgba(255, 209, 97, 0.5)
  Active   — scale(0.98), shadow reduced to 0 0 12px rgba(255, 209, 97, 0.3)
  Focus    — outline: 2px solid #FFD161, outline-offset: 3px
  Disabled — opacity: 0.4, cursor: not-allowed
  Loading  — opacity: 0.7, spinner replaces text
```

**Tailwind (md):**
```html
<button class="h-10 px-5 bg-gradient-to-br from-[#DF9F3E] to-[#FFD161]
  text-black font-montserrat font-semibold text-sm uppercase tracking-widest
  rounded-lg shadow-[0_0_21px_rgba(255,209,97,0.3)]
  hover:from-[#FFD161] hover:to-[#DF9F3E] hover:scale-[1.02]
  hover:shadow-[0_0_32px_rgba(255,209,97,0.5)]
  active:scale-[0.98]
  focus:outline focus:outline-2 focus:outline-[#FFD161] focus:outline-offset-2
  disabled:opacity-40 disabled:cursor-not-allowed
  transition-all duration-200">
  Label
</button>
```

#### Premium CTA Button (Cinzel)

Reserved for the single most important CTA on a page. Uses Cinzel instead of Montserrat for premium authority.

```
Font:            Cinzel, weight 400
Letter-spacing:  0.10em
All other specs: identical to Primary Button
Animation:       znith-gold-pulse (1500ms ease-in-out infinite)
```

**Rule:** Only one pulsing Cinzel CTA per page. Never pulse multiple elements simultaneously.

#### Secondary Button

Ghost-style with gold border. For secondary actions alongside a primary CTA.

```
Background:      transparent
Border:          1px solid #DF9F3E
Color:           #DF9F3E
Font:            Montserrat, weight 500
Text-transform:  uppercase
Letter-spacing:  0.06em
Border-radius:   8px

States:
  Default  — transparent bg, gold border, gold text
  Hover    — background #DF9F3E, text #000000
  Active   — background #C07A20, border #C07A20, scale(0.98)
  Focus    — outline: 2px solid #FFD161, outline-offset: 3px
  Disabled — opacity: 0.4, cursor: not-allowed
```

#### Ghost Button

No border, text only. For tertiary or low-emphasis actions.

```
Background:      transparent
Border:          none
Color:           #DF9F3E
Font:            Montserrat, weight 400

States:
  Default  — gold text, no underline
  Hover    — text-decoration: underline, color #FFD161
  Active   — color #C07A20
  Focus    — outline: 2px solid #FFD161, outline-offset: 2px
  Disabled — opacity: 0.4
```

#### Danger Button

For destructive or high-risk actions only.

```
Background:      #7F1D1D
Border:          1px solid #991B1B
Color:           #FFFFFF
Font:            Montserrat, weight 500
Border-radius:   8px

States:
  Default  — bg #7F1D1D
  Hover    — bg #991B1B, scale(1.02)
  Active   — bg #6B1212, scale(0.98)
  Focus    — outline: 2px solid #FC8181, outline-offset: 3px
  Disabled — opacity: 0.4
```

#### White Button (Light Mode)

For use on dark sections when a non-gold alternative is needed.

```
Background:      #FFFFFF
Border:          none
Color:           #091022
Font:            Montserrat, weight 600

States:
  Default  — white bg, navy text
  Hover    — background #F5F5F5, scale(1.02)
  Active   — background #E8ECF4, scale(0.98)
```

---

### 4.2 Cards

#### Content Card (Default)

The base card pattern for all general content containers.

```
Background:      #14203A
Border:          1px solid #2A3A5A
Border-radius:   12px
Padding:         24px (compact) / 32px (default)
Transition:      border-color 200ms ease-out, box-shadow 300ms ease-out

Hover:
  Border-color:  #DF9F3E
  Box-shadow:    0 0 24px rgba(223, 159, 62, 0.15)
```

#### Feature Card

Showcases features, services, or capabilities with icon.

```
Structure:
  [Icon wrapper — 48x48px, bg #1C2A4A, rounded 8px, centered icon]
  [Title — Cinzel, 20px, white, margin-bottom 10px]
  [Description — Montserrat, 15px, #BBBBBB, line-height 1.6]

Background:      #14203A
Border:          1px solid #2A3A5A
Border-radius:   12px
Padding:         28px 24px
Hover:           same as Content Card
```

#### Testimonial Card

Social proof and client quotes.

```
Structure:
  [Quote icon — 24px, #DF9F3E, margin-bottom 16px]
  [Quote — Cinzel italic, 18px, white, line-height 1.7]
  [Divider — 1px #2A3A5A, margin 16px 0]
  [Author — optional 40px circle photo + name (Montserrat 15px white bold)
             + title (Montserrat 13px #7A7A7A)]

Background:      #14203A
Border:          1px solid #2A3A5A
Border-radius:   12px
Padding:         28px 24px
```

#### Service Card

Product or service listing. NOT a SaaS pricing comparison card -- this is high-ticket consultancy. Each card presents a single service with its value proposition and a consultation CTA.

```
Structure:
  [Service name — Cinzel 22px, white]
  [Descriptor — Montserrat 14px, #DF9F3E, uppercase]
  [Investment indicator — Cinzel 36px, gold (e.g., "A partir de R$50K")]
  [Divider — 1px #2A3A5A]
  [Deliverables list — Montserrat 14px, #BBBBBB, gold check icons]
  [CTA — "Agendar Diagnostico" button, full width]

Background:      #14203A
Border:          1px solid #2A3A5A
Border-radius:   12px
Padding:         32px 28px

Featured variant:
  Border:        1px solid #DF9F3E
  Box-shadow:    0 0 32px rgba(223, 159, 62, 0.2)
```

**Important:** No SaaS-style pricing tier comparisons. No "Basic / Pro / Enterprise" patterns. Each service card is a standalone value proposition that leads to a consultation booking, not a checkout.

#### Stat Card

Highlight a key metric or achievement.

```
Structure:
  [Number — Cinzel 48-56px, bold, #DF9F3E]
  [Optional unit — same font, 32px]
  [Label — Montserrat 14px, white, weight 500]
  [Optional description — Montserrat 12px, #7A7A7A]

Background:      #14203A
Border:          1px solid #2A3A5A
Border-radius:   12px
Padding:         28px 24px
Text-align:      center
```

---

### 4.3 Navigation

#### Header (Desktop)

```
Height:          72px
Background:      #14203A (solid) — transitions to backdrop-filter on scroll
Border-bottom:   1px solid #2A3A5A
Position:        fixed, top 0, left 0, right 0
Z-index:         200
Padding:         0 48px (desktop), 0 20px (mobile)

On scroll (after 80px):
  Background:    rgba(20, 32, 58, 0.85)
  Backdrop-filter: saturate(180%) blur(12px)

Logo (left):
  Font:          Cinzel, weight 300
  Treatment:     "ZNITH" white + optional "[AI]" in gold
  Size:          ~24px

Nav links (center/right):
  Font:          Montserrat, 16px, weight 500
  Color:         #FFFFFF
  Hover:         color #DF9F3E, border-bottom 2px #DF9F3E
  Gap:           32px
  Transition:    color 200ms, border 200ms

CTA (right):
  Secondary Button (sm) or Primary Button (sm)
```

#### Mobile Menu

Full-screen overlay for mobile viewports.

```
Trigger:         Hamburger — 3 lines, white, 24px wide, 2px stroke, rounded
                 On open: morphs to X (CSS transition)
Overlay:         fixed inset-0, background rgba(9, 16, 34, 0.97)
                 backdrop-filter: blur(12px)
                 z-index: 300
Layout:          flex column, centered vertically
Items:           Cinzel, 24px, white, gap 32px
Close:           top-right, 48x48px touch target minimum

Active item:     text #DF9F3E, border-bottom 2px #DF9F3E
```

#### Sidebar Navigation (Dashboard / OS context)

```
Width:           260px (expanded), 64px (collapsed)
Background:      #0D1828
Border-right:    1px solid #2A3A5A
Position:        fixed, left 0, top 72px, bottom 0

Nav items:
  Height:        44px
  Padding:       0 16px
  Font:          Montserrat, 14px, weight 500
  Color:         #BBBBBB
  Active:        color #DF9F3E, background rgba(223, 159, 62, 0.08),
                 border-left 3px #DF9F3E
  Hover:         color #FFFFFF, background rgba(255, 255, 255, 0.05)
```

#### Footer

```
Background:      #091022
Border-top:      1px solid #2A3A5A
Padding:         64px 48px 32px (desktop), 40px 20px 24px (mobile)
Grid:            4-column desktop, 2-column tablet, 1-column mobile
Column gap:      40px

Structure:
  Row 1 (grid):
    Col 1 — Logo (Cinzel weight 300) + tagline + brief (Montserrat 14px #7A7A7A)
    Col 2 — Nav group (Cinzel 12px uppercase label + Montserrat 14px links)
    Col 3 — Nav group
    Col 4 — Social icons (24px stroke SVG, #7A7A7A default, #DF9F3E hover) + contact

  Row 2 (bottom bar):
    Divider: border-top 1px #2A3A5A, margin-top 48px, padding-top 24px
    Left: Copyright (Montserrat 12px #7A7A7A)
    Right: Legal links (Montserrat 12px #DF9F3E, hover underline)
```

---

### 4.4 Forms

#### Text Input

```
Background:      #14203A
Border:          1px solid #2A3A5A
Border-radius:   8px
Padding:         12px 16px
Height:          44px
Font:            Montserrat, 14px, weight 400
Color:           #FFFFFF
Placeholder:     #7A7A7A
Caret-color:     #DF9F3E

States:
  Default   — border #2A3A5A
  Hover     — border #3A4A6A
  Focus     — border #DF9F3E, shadow 0 0 0 3px rgba(223, 159, 62, 0.15)
  Error     — border #E53E3E, shadow 0 0 0 3px rgba(229, 62, 62, 0.15)
  Disabled  — opacity 0.5, cursor not-allowed, background #0D1828
```

#### Textarea

Same visual system as Text Input. Min-height 120px. Resize: vertical.

#### Select

Same visual as Text Input with custom gold chevron arrow.

```
Appearance:      none
Background-image: SVG chevron-down in #DF9F3E
Background-position: right 16px center
Padding-right:   48px
Cursor:          pointer
```

#### Checkbox

```
Size:            18x18px
Border:          1.5px solid #2A3A5A
Border-radius:   4px
Background:      #14203A

Checked:
  Background:    #DF9F3E
  Border:        1.5px solid #DF9F3E
  Checkmark:     white SVG stroke, 11px

Focus ring:      2px rgba(223, 159, 62, 0.3)
```

#### Radio

```
Size:            18x18px
Border:          1.5px solid #2A3A5A
Border-radius:   9999px (circle)
Background:      #14203A

Checked:
  Border:        1.5px solid #DF9F3E
  Inner dot:     8px circle, #DF9F3E, centered
```

#### Toggle Switch

```
Track:
  Width:         44px
  Height:        24px
  Background:    #2A3A5A (off), #DF9F3E (on)
  Border-radius: 9999px
  Transition:    background 200ms

Thumb:
  Size:          20px circle
  Background:    #FFFFFF
  Position:      2px from left (off), 22px from left (on)
  Box-shadow:    0 1px 3px rgba(0, 0, 0, 0.3)
  Transition:    transform 200ms
```

#### Label

```
Font:            Montserrat, 13px, weight 600
Color:           #BBBBBB
Text-transform:  uppercase
Letter-spacing:  0.05em
Margin-bottom:   8px
Display:         block
```

#### Error Message

```
Font:            Montserrat, 12px, weight 400
Color:           #FC8181
Margin-top:      6px
Prefix:          warning icon (12px, #FC8181), gap 4px
```

#### Helper Text

```
Font:            Montserrat, 12px, weight 400
Color:           #7A7A7A
Margin-top:      6px
```

---

### 4.5 Badges & Tags

#### Category Tag (Pill)

```
Background:      #14203A
Border:          1px solid #2A3A5A
Border-radius:   9999px
Padding:         4px 12px
Font:            Montserrat, 12px, weight 500
Color:           #FFFFFF
```

#### Status Badge

Dot + text indicator.

| Status | Dot Color | Text |
|---|---|---|
| Active | `#DF9F3E` | Ativo |
| Complete | `#68D391` | Completo |
| Error | `#FC8181` | Erro |
| Inactive | `#7A7A7A` | Inativo |
| Pending | `#ECC94B` | Pendente |

```
Structure:       8px dot (rounded-full) + Montserrat 13px #BBBBBB, gap 8px
```

#### Phase Badge (ZNITH.AI OS)

```
Shape:           Rounded square, 28x28px
Border-radius:   8px
Font:            Cinzel, 13px, bold
Background:      rgba(223, 159, 62, 0.15) — increases per phase
Text:            #DF9F3E (phases 1-2), #FFD161 (phases 3-5)
```

#### Seal Badge (Lideres Leoes)

```
Shape:           Circle
Sizes:           80px (large), 48px (medium), 32px (small)
Border:          2px solid #DF9F3E
Background:      #091022
Font:            Cinzel, uppercase, sized to fit
Color:           #DF9F3E
```

---

### 4.6 Dividers & Separators

#### Line Divider

```
Height:          1px
Background:      #2A3A5A
Width:           100%
```

#### Gold Accent Line

Used under section headings.

```
Width:           80px
Height:          2px
Background:      #DF9F3E
Border-radius:   9999px
Margin:          8px auto 0 (centered) or 8px 0 0 (left-aligned)
```

#### Grafismo Divider

Decorative separator using the swoosh/check grafismo mark. Used sparingly between major sections.

```
Element:         SVG grafismo (swoosh or angular check)
Width:           120px (desktop), 80px (mobile)
Color:           #DF9F3E at 30% opacity (decorative) or 60% (featured)
Display:         block, centered
Margin:          48px auto
```

---

### 4.7 Modals & Dialogs

```
Backdrop:
  Background:    rgba(5, 11, 23, 0.85)
  Backdrop-filter: blur(8px)
  Z-index:       400

Container:
  Background:    #14203A
  Border:        1px solid #2A3A5A
  Border-radius: 16px
  Box-shadow:    0 24px 64px rgba(0, 0, 0, 0.7), 0 8px 32px rgba(0, 0, 0, 0.5)
  Max-width:     540px (default), 720px (large), 400px (small)
  Padding:       32px

Header:
  Title:         Cinzel, 24px, weight 400, white
  Close button:  24px X icon, #7A7A7A, hover #FFFFFF, 48px touch target
  Border-bottom: 1px solid #2A3A5A, padding-bottom 20px

Body:
  Padding-top:   20px
  Font:          Montserrat, 16px, #BBBBBB

Footer:
  Border-top:    1px solid #2A3A5A
  Padding-top:   20px
  Alignment:     right
  Button gap:    12px

Entry animation:
  From:          opacity 0, transform translateY(16px) scale(0.96)
  To:            opacity 1, transform translateY(0) scale(1)
  Duration:      300ms
  Easing:        ease-out

Exit animation:
  From:          opacity 1
  To:            opacity 0
  Duration:      200ms
  Easing:        ease-in
```

---

### 4.8 Tooltips

```
Background:      #1C2A4A
Border:          1px solid #2A3A5A
Border-radius:   4px
Box-shadow:      0 4px 16px rgba(0, 0, 0, 0.5)
Padding:         8px 12px
Font:            Montserrat, 13px, weight 400
Color:           #DDDDDD
Max-width:       280px
Z-index:         500

Arrow:           6px CSS triangle in #1C2A4A, with 1px border matching container

Positioning:     top (default), bottom, left, right — 8px gap from trigger

Entry:           opacity 0 to 1, translateY(4px) to translateY(0), 150ms ease-out
```

---

### 4.9 Avatars

```
Sizes:           24px (xs), 32px (sm), 40px (md), 48px (lg), 64px (xl), 96px (2xl)
Shape:           Circle (border-radius: 9999px)
Border:          2px solid #2A3A5A (default), 2px solid #DF9F3E (featured/active)
Background:      #1C2A4A (placeholder)
Object-fit:      cover

Placeholder (no image):
  Initials:      Montserrat, weight 600, white
  Font-size:     40% of avatar size (e.g., 16px on a 40px avatar)

Status dot:
  Size:          25% of avatar size (minimum 8px)
  Position:      bottom-right, overlapping border
  Border:        2px solid #091022 (matches page background)
  Colors:        Online #68D391, Away #ECC94B, Offline #7A7A7A
```

---

### 4.10 Icons

```
Style:           Stroke-based (not filled)
Stroke-width:    1.5px
Stroke-linecap:  round
Stroke-linejoin: round
Grid:            24x24px base
Viewbox:         0 0 24 24
Scalable to:     16, 20, 32, 48px

Colors:
  Default:       #FFFFFF (currentColor)
  Accent:        #DF9F3E
  Muted:         #7A7A7A
  Error:         #FC8181
  Success:       #68D391
```

**No emojis, ever. Geometric SVG only.**

Icon template:
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="1.5"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <!-- paths -->
</svg>
```

---

### 4.11 Loading States

#### Spinner

```
Size:            32px (default), 20px (inline), 48px (full-page)
Border:          3px solid #2A3A5A (track)
Border-top:      3px solid #DF9F3E (active)
Border-radius:   50%
Animation:       rotate 360deg, 0.8s linear infinite
```

#### Skeleton Loader

```
Background:      #14203A
Border-radius:   8px (matches content shape)
Shimmer:         linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)
                 translateX(-100% to 100%), 1.5s ease infinite
```

#### Empty State

```
Layout:          centered flex column
Icon:            40px stroke SVG, #7A7A7A
Heading:         Montserrat, 16px, weight 600, white
Description:     Montserrat, 14px, #7A7A7A, max-width 280px
CTA:             Secondary Button (optional)
Padding:         48px
```

---

## 5. Surface System

### 5.1 Dark Mode (Default) -- 5 Tier Hierarchy

Five surface tiers create depth perception. In dark mode, depth is expressed primarily through background color lightening, with shadows as reinforcement on elevated elements.

| Tier | Name | Token | Hex | Border | Shadow | Usage |
|---|---|---|---|---|---|---|
| 0 | Background | `--znith-surface-0` | `#091022` | none | none | Page base, root background, body |
| 1 | Default | `--znith-surface-1` | `#14203A` | `1px solid #2A3A5A` | `--znith-shadow-raised` | Cards, panels, navbar, sidebars |
| 2 | Elevated | `--znith-surface-2` | `#1C2A4A` | `1px solid #2A3A5A` | `--znith-shadow-floating` | Dropdowns, popovers, raised cards |
| 3 | Overlay | `--znith-surface-3` | `rgba(20, 32, 58, 0.92)` | `1px solid #2A3A5A` | `--znith-shadow-overlay` | Modal backdrops, side sheets |
| 4 | Modal | `--znith-surface-4` | `#14203A` on top of overlay | `1px solid #2A3A5A` | `--znith-shadow-modal` | Dialogs, alerts, highest layer |

**Accent border (featured elements):** `--znith-surface-border-accent` = `rgba(223, 159, 62, 0.35)` -- applied on hover or to spotlight a specific card/element.

---

### 5.2 Light Mode -- 5 Tier Hierarchy

| Tier | Name | Token | Hex | Border | Shadow | Usage |
|---|---|---|---|---|---|---|
| 0 | Background | `--znith-surface-light-0` | `#F7F8FA` | none | none | Page base |
| 1 | Default | `--znith-surface-light-1` | `#FFFFFF` | `1px solid #E2E5EB` | light raised | Cards, panels |
| 2 | Elevated | `--znith-surface-light-2` | `#FFFFFF` | `1px solid #E2E5EB` | light floating | Dropdowns, popovers |
| 3 | Overlay | `--znith-surface-light-3` | `rgba(9, 16, 34, 0.5)` | none | none | Backdrop scrim |
| 4 | Modal | `--znith-surface-light-4` | `#FFFFFF` | `1px solid #E2E5EB` | light modal | Dialogs |

---

### 5.3 Section Background Alternation

Sections alternate between Surface 0 and Surface 1 to create visual rhythm without explicit dividers.

```
Section odd:     background #091022 (Surface 0)
Section even:    background #0D1828 (between Surface 0 and 1)
Hero:            always Surface 0 (#091022)
CTA sections:    Surface 2 (#1C2A4A) or Surface 1 (#14203A)
```

---

## 6. Effects & Motion

### 6.1 Border Radius Scale

| Token | CSS Custom Property | Value | Usage |
|---|---|---|---|
| none | `--znith-radius-none` | 0px | Sharp elements, dividers, full-bleed |
| sm | `--znith-radius-sm` | 4px | Inputs, tags, badges, tooltips |
| md | `--znith-radius-md` | 8px | Buttons, small cards, dropdowns |
| lg | `--znith-radius-lg` | 12px | Standard cards, panels |
| xl | `--znith-radius-xl` | 16px | Large cards, modals, feature sections |
| 2xl | `--znith-radius-2xl` | 24px | Hero cards, showcase panels |
| full | `--znith-radius-full` | 9999px | Pills, avatars, toggle switches |

---

### 6.2 Shadow System

Shadows in dark mode are deeper and more diffuse than in light mode. Navy-tinted values create cohesion with the color system.

**Dark Mode Shadows:**

| Level | Token | Value |
|---|---|---|
| Flat | `--znith-shadow-flat` | `none` |
| Raised | `--znith-shadow-raised` | `0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.6)` |
| Floating | `--znith-shadow-floating` | `0 4px 16px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4)` |
| Overlay | `--znith-shadow-overlay` | `0 8px 32px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(0, 0, 0, 0.4)` |
| Modal | `--znith-shadow-modal` | `0 24px 64px rgba(0, 0, 0, 0.7), 0 8px 32px rgba(0, 0, 0, 0.5)` |

**Gold Glow Variants** (use on featured or CTA elements only):

| Variant | Token | Value |
|---|---|---|
| Subtle | `--znith-shadow-gold-subtle` | `0 0 16px rgba(223, 159, 62, 0.15)` |
| Default | `--znith-shadow-gold` | `0 0 24px rgba(223, 159, 62, 0.25), 0 4px 16px rgba(0, 0, 0, 0.4)` |
| Strong | `--znith-shadow-gold-strong` | `0 0 40px rgba(223, 159, 62, 0.35), 0 8px 32px rgba(0, 0, 0, 0.5)` |
| CTA | `--znith-shadow-gold-cta` | `0 0 32px rgba(223, 159, 62, 0.45), 0 4px 24px rgba(0, 0, 0, 0.5)` |

**Light Mode Shadows:**

| Level | Token | Value |
|---|---|---|
| Raised | `--znith-shadow-light-raised` | `0 1px 3px rgba(9, 16, 34, 0.08), 0 1px 2px rgba(9, 16, 34, 0.04)` |
| Floating | `--znith-shadow-light-floating` | `0 4px 16px rgba(9, 16, 34, 0.10), 0 2px 8px rgba(9, 16, 34, 0.06)` |
| Overlay | `--znith-shadow-light-overlay` | `0 8px 32px rgba(9, 16, 34, 0.14), 0 4px 16px rgba(9, 16, 34, 0.08)` |
| Modal | `--znith-shadow-light-modal` | `0 24px 64px rgba(9, 16, 34, 0.16), 0 8px 32px rgba(9, 16, 34, 0.10)` |

---

### 6.3 Duration Scale

| Token | CSS Custom Property | Value | Usage |
|---|---|---|---|
| Instant | `--znith-duration-instant` | 0ms | Immediate state switches |
| Fast | `--znith-duration-fast` | 100ms | Micro-interactions: button press, checkbox |
| Normal | `--znith-duration-normal` | 200ms | Default hover transitions, color changes |
| Smooth | `--znith-duration-smooth` | 300ms | Panel reveals, dropdown open, card hover |
| Slow | `--znith-duration-slow` | 500ms | Page element entrance, slide-in |
| Slower | `--znith-duration-slower` | 700ms | Hero animations, dramatic reveals |
| Crawl | `--znith-duration-crawl` | 1500ms | Gold pulse, ambient loops |

---

### 6.4 Easing Functions

| Token | CSS Custom Property | Value | Usage |
|---|---|---|---|
| Ease Out | `--znith-ease-out` | `cubic-bezier(0.0, 0.0, 0.2, 1.0)` | Elements entering screen (primary) |
| Ease In | `--znith-ease-in` | `cubic-bezier(0.4, 0.0, 1.0, 1.0)` | Elements leaving screen |
| Ease In Out | `--znith-ease-in-out` | `cubic-bezier(0.4, 0.0, 0.2, 1.0)` | State transitions |
| Linear | `--znith-ease-linear` | `linear` | Progress bars, continuous motion |
| Spring | `--znith-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1.0)` | Playful reveals (use very sparingly) |
| Sharp | `--znith-ease-sharp` | `cubic-bezier(0.4, 0.0, 0.6, 1.0)` | Quick, precise UI snaps |

---

### 6.5 Hover Effects

| Element | Transform | Duration | Additional |
|---|---|---|---|
| Card | `scale(1.02)` | 200ms ease-out | Border brightens to gold |
| Button | `scale(1.03)` | 200ms ease-out | Shadow increases |
| Icon | `scale(1.10)` | 200ms ease-out | Color shifts to gold |
| Active/Pressed | `scale(0.98)` | 100ms ease-out | Shadow decreases |
| Image | `scale(1.05)` | 400ms ease-out | Overflow hidden on parent |
| Link | none | 200ms ease-out | Color to #DF9F3E, optional underline |

---

### 6.6 Gold Shimmer / Pulse Effect

The signature gold pulse animation. Reserved for the single most important CTA per viewport.

```css
@keyframes znith-gold-pulse {
  0%   { box-shadow: 0 0 16px rgba(223, 159, 62, 0.40); opacity: 0.90; }
  50%  { box-shadow: 0 0 32px rgba(223, 159, 62, 0.60); opacity: 1.00; }
  100% { box-shadow: 0 0 16px rgba(223, 159, 62, 0.40); opacity: 0.90; }
}

.znith-cta-pulse {
  animation: znith-gold-pulse 1500ms var(--znith-ease-in-out) infinite;
}
```

**Usage rules:**
- Only one pulsing element per viewport at any time
- Respects `prefers-reduced-motion: reduce` (animation paused)
- Never on decorative elements -- CTA buttons only
- Pulse opacity range: 0.9 to 1.0 (subtle, not flashy)

---

### 6.7 Section Reveal Animation

Applied via IntersectionObserver as elements scroll into view.

```css
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
.znith-reveal-stagger > *:nth-child(1) { animation-delay: 0ms; }
.znith-reveal-stagger > *:nth-child(2) { animation-delay: 80ms; }
.znith-reveal-stagger > *:nth-child(3) { animation-delay: 160ms; }
.znith-reveal-stagger > *:nth-child(4) { animation-delay: 240ms; }
.znith-reveal-stagger > *:nth-child(5) { animation-delay: 320ms; }
.znith-reveal-stagger > *:nth-child(6) { animation-delay: 400ms; }
```

---

### 6.8 Page Transitions

| Transition | Duration | Easing | Properties |
|---|---|---|---|
| Page enter | 300ms | ease-out | opacity 0 to 1, translateY(8px) to 0 |
| Page exit | 200ms | ease-in | opacity 1 to 0 |
| Section reveal | 500ms | ease-out | opacity 0 to 1, translateY(24px) to 0 |
| Stagger delay | 80ms | -- | Per-item delay in lists and grids |

---

### 6.9 Lion / Crown Watermark Usage

The lion and crown are heritage symbols. They appear as ambient decorative elements -- never as primary UI or required brand marks.

```
Opacity:         3-5% (digital), 8-12% (print)
Position:        Section corners, background areas with low content density
Scale:           200-400px (desktop), 120-200px (mobile)
Color:           #DF9F3E (tinted at opacity) or #FFFFFF (neutral)
Blend mode:      screen (on dark backgrounds)
Interaction:     None -- purely decorative, pointer-events: none
```

**Rules:**
- Maximum 2 watermark instances per page
- Never behind CTAs or form elements
- Never overlap with text blocks
- Preferred positions: top-right corner of hero, bottom-left of CTA section

---

## 7. Brand Elements & Patterns

### 7.1 Logo Usage Rules

**Logo compositions (in order of preference):**

1. **Master Mark (Vertical)** -- lion + "ZNITH" wordmark + tagline. Brand introductions, proposals, website hero.
2. **Master Mark (Vertical, no tagline)** -- lion + "ZNITH". Headers, recurring applications.
3. **Horizontal** -- lion left, wordmark + tagline right. Email headers, slide headers, documents.
4. **Z Reduced Mark** -- Z with lion face. Favicon, avatar, watermark, space-constrained contexts.
5. **Wordmark only** -- "ZNITH" in Cinzel. Only after full logo has appeared elsewhere on the same surface.

**Clear space:** Minimum 1x (cap-height of "Z" in the wordmark) on all sides.

**Minimum sizes:**

| Element | Digital | Print |
|---|---|---|
| Full logo | 160px width | 40mm width |
| Wordmark alone | 80px width | 25mm width |
| Z reduced mark | 32px (favicon), 48px (UI) | 12mm |

**Prohibited:**
- Stretching, rotating, or skewing the logo
- Colors outside the brand palette
- Drop shadows, glows, or effects applied to the logo
- Placing on busy backgrounds without 60% minimum navy/black overlay
- Separating the lion from the wordmark (use Z reduced mark instead)
- Modifying the crown on the lion
- Substituting any font for Cinzel in the wordmark

---

### 7.2 Grafismo Usage

Six brand patterns extend the visual language beyond the logo.

| Grafismo | Name | Character | Usage |
|---|---|---|---|
| 1 | Swoosh / Checkmark | Dynamic, forward motion | Slide accents, section transitions, pull quote decoration |
| 2 | Crown (flat) | Authority, achievement | Section headers, certificate seals, badges |
| 3 | Z with Lion (small) | Brand recall | Alternate reduced mark, watermarks, sticker/seal |
| 4 | Wave / S-Curve Pattern | Luxury texture | Background textures (20-40% digital, 100% merchandise) |
| 5 | Diagonal Z Pattern | Monogram luxury | Packaging, gift materials, presentation folders |
| 6 | 3D Gold Crown | Ornate (use with extreme caution) | Campaign-specific only with explicit approval |

**Grafismo rules:**
- Never as a standalone brand identifier
- Never directly behind the main logo within clear space
- Digital opacity: 20-40% for background use
- Maximum 2 grafismo elements per page (not counting subtle background textures)

---

### 7.3 Photography Style

```
Mood:            Dark, moody, corporate, architectural
Lighting:        Low-key, directional lighting, deep shadows
Subjects:        Business leaders, commercial environments, architecture,
                 structured spaces (not casual, not lifestyle)
Processing:      Navy color grading (shadows pushed toward #091022)
                 Desaturated 20-30% from natural
                 Contrast increased to emphasize structure
Overlay:         Minimum 60% navy (#091022) when text is placed over photos

Prohibited:
- Stock photos of people pointing at screens or shaking hands
- Bright, saturated lifestyle imagery
- Generic office/workspace backgrounds
- Motivational imagery (sunrises, mountaintops, etc.)
```

---

### 7.4 Data Visualization Style

```
Chart colors (ordered by priority):
  1. #DF9F3E (gold -- primary data)
  2. #4A78C8 (tech blue -- secondary data)
  3. #FFFFFF (white -- tertiary)
  4. #7A7A7A (gray -- baseline/reference)
  5. #FFD161 (gold light -- highlight)
  6. #2A5090 (navy blue -- supporting)

Grid lines:      1px #2A3A5A (same as borders)
Axis labels:     Montserrat, 12px, #7A7A7A
Values:          Montserrat, 14px, #FFFFFF
Chart titles:    Cinzel, 18-20px, white
Background:      transparent (inherits section background)

Bar radius:      4px top-left, 4px top-right, 0 bottom
Line weight:     2px
Dot size:        6px (default), 8px (active/hover)
Tooltip:         standard tooltip spec (see 4.8)
```

---

## 8. Voice & Tone Integration

### 8.1 Visual Hierarchy Supporting Brand Voice

The ZNITH brand voice is consultive, strategic, direct, and structured. The design system reinforces this:

**Structure:**
- Overlines introduce sections with gold uppercase labels (consulting-style section numbering)
- Cinzel headings establish authority in a single statement per section
- Montserrat body text delivers the argument clearly with generous line-height
- Gold accent lines under headings signal completion and precision

**Restraint:**
- Maximum 2 gold accent elements per viewport
- No decorative elements that don't serve hierarchy
- Whitespace is used aggressively -- content occupies less than 60% of viewport
- No animation without purpose

**Conversion clarity:**
- CTAs are immediately identifiable (gold gradient on navy creates highest contrast)
- One primary CTA per section, never more than two visible simultaneously
- CTA copy is direct and specific: "Agendar Diagnostico", "Falar com ZNITH" -- not "Saiba Mais" or "Clique Aqui"
- All CTAs lead to consultation booking or application forms, never to checkout pages

---

### 8.2 Content Layout Patterns

**Diagnostic / Authority content:**
- Cinzel display headline (provocative statement)
- Short Montserrat paragraph (2-3 sentences maximum)
- Evidence: stat card row or single case study reference
- CTA

**Product description (ZNITH.AI OS):**
- Overline with phase number
- Cinzel heading (phase name)
- Montserrat body (what happens in this phase)
- Deliverable list with gold check icons
- Process step connector to next phase

**Testimonial / Social proof:**
- Cinzel italic quote, centered, max-width 680px
- Gold left border or quote icon
- Author attribution below
- Optional: stat card adjacent showing the result

**Movement content (Lideres Leoes):**
- More emotional, more gold
- Manifesto-style: short lines, Cinzel, centered
- Lion watermark at low opacity behind text
- CTA framed as "application" not "purchase"

---

## 9. Responsive Breakpoints

| Name | Token | Min Width | Target |
|---|---|---|---|
| Mobile | `--znith-bp-mobile` | 0px | Small phones (320-639px) |
| Tablet | `--znith-bp-tablet` | 640px | Tablets, large phones |
| Desktop | `--znith-bp-desktop` | 1024px | Laptops, desktops |
| Large | `--znith-bp-large` | 1280px | Large desktops |
| XL | `--znith-bp-xl` | 1536px | Ultra-wide, presentations |

### Responsive Behavior Rules

**Typography:**
- Display: 48px (mobile) to 96px (desktop) via clamp()
- H1: 36px (mobile) to 60px (desktop)
- Body: fixed at 16px across all breakpoints
- No breakpoint font-size jumps -- all sizes use clamp() for fluid scaling

**Layout:**
- Mobile (< 640px): single column, 20px horizontal padding
- Tablet (640-1023px): two columns where appropriate, 32px padding
- Desktop (1024+): full grid system, 48px padding, max-width 1200px centered

**Navigation:**
- Mobile: hamburger menu with full-screen overlay
- Tablet: hamburger or condensed horizontal nav
- Desktop: full horizontal nav with CTA button

**Cards:**
- Mobile: single column, full width
- Tablet: 2-column grid
- Desktop: 2, 3, or 4-column grid depending on content type

**Section padding:**
- Mobile: 64px vertical
- Tablet: 80px vertical
- Desktop: 96px vertical

**Images:**
- Mobile: full width, aspect-ratio maintained
- Desktop: constrained within grid columns

---

## 10. Accessibility

### 10.1 Color Contrast Requirements

All text must meet **WCAG AA** minimum contrast ratios.

| Context | Minimum Ratio | Status |
|---|---|---|
| White text (#FFFFFF) on Navy 900 (#091022) | 17.5:1 | Passes AAA |
| Body text (#BBBBBB) on Navy 900 (#091022) | 9.2:1 | Passes AAA |
| Muted text (#7A7A7A) on Navy 900 (#091022) | 4.1:1 | Passes AA (large text) |
| Gold text (#DF9F3E) on Navy 900 (#091022) | 5.8:1 | Passes AA |
| Gold text (#DF9F3E) on Navy 700 (#14203A) | 4.7:1 | Passes AA |
| Black text (#000000) on Gold 500 (#DF9F3E) | 6.2:1 | Passes AA |
| Navy text (#091022) on White (#FFFFFF) | 17.5:1 | Passes AAA |
| Disabled text (#555555) on Navy 900 (#091022) | 2.5:1 | Intentionally below AA (indicates disabled) |

**Light mode adjustments:** Gold accent darkened to `#C07A20` (Deep Gold) for text on white backgrounds to maintain 4.5:1 minimum.

---

### 10.2 Focus States

All interactive elements must have visible focus indicators.

```
Default focus:   outline: 2px solid #FFD161, outline-offset: 3px
                 (gold ring, offset from element)

Error context:   outline: 2px solid #FC8181, outline-offset: 3px

Focus-visible:   Apply focus styles only on keyboard navigation
                 (not on mouse click) using :focus-visible
```

---

### 10.3 Touch Targets

```
Minimum size:    44px x 44px (all interactive elements)
Minimum gap:     8px between adjacent touch targets
Icon buttons:    44px minimum, even if icon is 24px (padding fills the rest)
Mobile nav:      48px minimum height per item
```

---

### 10.4 Motion Sensitivity

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

All animations must respect this media query. The gold pulse, section reveals, and page transitions all degrade gracefully to instant state changes.

---

### 10.5 Semantic HTML

- Headings follow logical order (h1 > h2 > h3) -- never skip levels for visual styling
- All images have meaningful `alt` text
- Icon-only buttons have `aria-label`
- Decorative SVGs have `aria-hidden="true"`
- Form inputs are associated with labels via `for`/`id`
- Navigation landmarks use `<nav>`, `<main>`, `<header>`, `<footer>`

---

## 11. CSS Custom Properties / Design Tokens

The complete token set, ready for inclusion as a global stylesheet.

```css
:root {
  /* ──────────────────────────────────────────
     COLOR — NAVY SCALE
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
     COLOR — GOLD SCALE
  ────────────────────────────────────────── */
  --znith-color-gold-champagne: #F5E6C8;
  --znith-color-gold-light:     #FFD161;
  --znith-color-gold-300:       #F0B85A;
  --znith-color-gold-400:       #E8A847;
  --znith-color-gold-500:       #DF9F3E;
  --znith-color-gold-deep:      #C07A20;
  --znith-color-gold-dark:      #8B5E1A;

  /* ──────────────────────────────────────────
     COLOR — NEUTRAL SCALE
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
  --znith-color-success:         #2A6B4A;
  --znith-color-success-light:   #3A8A60;
  --znith-color-success-bright:  #68D391;
  --znith-color-success-subtle:  rgba(42, 107, 74, 0.15);

  --znith-color-warning:         #7A5A20;
  --znith-color-warning-light:   #A07030;
  --znith-color-warning-bright:  #ECC94B;
  --znith-color-warning-subtle:  rgba(122, 90, 32, 0.15);

  --znith-color-error:           #7A2A2A;
  --znith-color-error-light:     #A03A3A;
  --znith-color-error-bright:    #FC8181;
  --znith-color-error-subtle:    rgba(122, 42, 42, 0.15);

  --znith-color-info:            #1E3A6A;
  --znith-color-info-light:      #2A5090;
  --znith-color-info-bright:     #63B3ED;
  --znith-color-info-subtle:     rgba(30, 58, 106, 0.15);

  /* ──────────────────────────────────────────
     SURFACE SYSTEM — DARK MODE
  ────────────────────────────────────────── */
  --znith-surface-0:             #091022;
  --znith-surface-1:             #14203A;
  --znith-surface-2:             #1C2A4A;
  --znith-surface-3:             rgba(20, 32, 58, 0.92);
  --znith-surface-4:             #14203A;
  --znith-surface-border:        #2A3A5A;
  --znith-surface-border-accent: rgba(223, 159, 62, 0.35);
  --znith-surface-section-alt:   #0D1828;

  /* ──────────────────────────────────────────
     SURFACE SYSTEM — LIGHT MODE
  ────────────────────────────────────────── */
  --znith-surface-light-0:       #F7F8FA;
  --znith-surface-light-1:       #FFFFFF;
  --znith-surface-light-2:       #FFFFFF;
  --znith-surface-light-3:       rgba(9, 16, 34, 0.5);
  --znith-surface-light-4:       #FFFFFF;
  --znith-surface-light-border:  #E2E5EB;

  /* ──────────────────────────────────────────
     BRAND LAYERS
  ────────────────────────────────────────── */
  /* ZNITH Corp */
  --znith-corp-primary:       #DF9F3E;
  --znith-corp-primary-light: #FFD161;
  --znith-corp-primary-deep:  #C07A20;
  --znith-corp-surface-tint:  rgba(223, 159, 62, 0.08);
  --znith-corp-border:        rgba(223, 159, 62, 0.25);

  /* ZNITH.AI */
  --znith-ai-primary:        #2A5090;
  --znith-ai-primary-light:  #4A78C8;
  --znith-ai-primary-bright: #6A9AF0;
  --znith-ai-cyan:           #00B4D8;
  --znith-ai-gold:           #DF9F3E;
  --znith-ai-surface-tint:   rgba(42, 80, 144, 0.08);

  /* ZNITH.AI OS */
  --znith-os-primary:        #DF9F3E;
  --znith-os-tech:           #2A5090;
  --znith-os-tech-light:     #4A78C8;
  --znith-os-surface-tint:   rgba(42, 80, 144, 0.08);
  --znith-os-phase-gold:     rgba(223, 159, 62, 0.15);

  /* ZNITH Consulting */
  --znith-consulting-primary:  #DF9F3E;
  --znith-consulting-surface:  #0D1828;
  --znith-consulting-border:   rgba(223, 159, 62, 0.15);

  /* Lideres Leoes */
  --znith-lideres-primary:      #FFD161;
  --znith-lideres-intense:      #DF9F3E;
  --znith-lideres-base:         #050B17;
  --znith-lideres-surface-tint: rgba(255, 209, 97, 0.10);
  --znith-lideres-border:       rgba(255, 209, 97, 0.30);
  --znith-lideres-lion:         #C07A20;

  /* Leilaine Campioto */
  --znith-leilaine-primary:      #E8A847;
  --znith-leilaine-warm:         #F0C070;
  --znith-leilaine-rose:         #D4A0A0;
  --znith-leilaine-navy:         #0D1828;
  --znith-leilaine-surface-tint: rgba(232, 168, 71, 0.06);
  --znith-leilaine-border:       rgba(232, 168, 71, 0.20);

  /* ──────────────────────────────────────────
     TYPOGRAPHY
  ────────────────────────────────────────── */
  --znith-font-display: 'Cinzel', 'Palatino Linotype', 'Book Antiqua', Georgia, serif;
  --znith-font-body:    'Montserrat', 'Helvetica Neue', Arial, sans-serif;
  --znith-font-mono:    'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

  --znith-text-xs:      0.75rem;    /* 12px */
  --znith-text-sm:      0.875rem;   /* 14px */
  --znith-text-base:    1rem;       /* 16px */
  --znith-text-md:      1.125rem;   /* 18px */
  --znith-text-lg:      1.25rem;    /* 20px */
  --znith-text-xl:      1.5rem;     /* 24px */
  --znith-text-2xl:     1.875rem;   /* 30px */
  --znith-text-3xl:     2.25rem;    /* 36px */
  --znith-text-4xl:     3rem;       /* 48px */
  --znith-text-5xl:     3.75rem;    /* 60px */
  --znith-text-6xl:     4.5rem;     /* 72px */
  --znith-text-7xl:     6rem;       /* 96px */

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
     GRID & CONTAINERS
  ────────────────────────────────────────── */
  --znith-grid-columns:        12;
  --znith-grid-max-width:      1200px;
  --znith-grid-gutter-desktop: 24px;
  --znith-grid-gutter-mobile:  16px;

  --znith-container-sm:  640px;
  --znith-container-md:  768px;
  --znith-container-lg:  1024px;
  --znith-container-xl:  1200px;
  --znith-container-2xl: 1440px;

  /* ──────────────────────────────────────────
     BREAKPOINTS
  ────────────────────────────────────────── */
  --znith-bp-mobile:  0px;
  --znith-bp-tablet:  640px;
  --znith-bp-desktop: 1024px;
  --znith-bp-large:   1280px;
  --znith-bp-xl:      1536px;

  /* ──────────────────────────────────────────
     ELEVATION / SHADOWS — DARK MODE
  ────────────────────────────────────────── */
  --znith-shadow-flat:     none;
  --znith-shadow-raised:   0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.6);
  --znith-shadow-floating: 0 4px 16px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4);
  --znith-shadow-overlay:  0 8px 32px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(0, 0, 0, 0.4);
  --znith-shadow-modal:    0 24px 64px rgba(0, 0, 0, 0.7), 0 8px 32px rgba(0, 0, 0, 0.5);

  --znith-shadow-gold-subtle: 0 0 16px rgba(223, 159, 62, 0.15);
  --znith-shadow-gold:        0 0 24px rgba(223, 159, 62, 0.25), 0 4px 16px rgba(0, 0, 0, 0.4);
  --znith-shadow-gold-strong: 0 0 40px rgba(223, 159, 62, 0.35), 0 8px 32px rgba(0, 0, 0, 0.5);
  --znith-shadow-gold-cta:    0 0 32px rgba(223, 159, 62, 0.45), 0 4px 24px rgba(0, 0, 0, 0.5);

  /* ──────────────────────────────────────────
     ELEVATION / SHADOWS — LIGHT MODE
  ────────────────────────────────────────── */
  --znith-shadow-light-raised:   0 1px 3px rgba(9, 16, 34, 0.08), 0 1px 2px rgba(9, 16, 34, 0.04);
  --znith-shadow-light-floating: 0 4px 16px rgba(9, 16, 34, 0.10), 0 2px 8px rgba(9, 16, 34, 0.06);
  --znith-shadow-light-overlay:  0 8px 32px rgba(9, 16, 34, 0.14), 0 4px 16px rgba(9, 16, 34, 0.08);
  --znith-shadow-light-modal:    0 24px 64px rgba(9, 16, 34, 0.16), 0 8px 32px rgba(9, 16, 34, 0.10);

  /* ──────────────────────────────────────────
     Z-INDEX
  ────────────────────────────────────────── */
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
     MOTION — DURATIONS
  ────────────────────────────────────────── */
  --znith-duration-instant: 0ms;
  --znith-duration-fast:    100ms;
  --znith-duration-normal:  200ms;
  --znith-duration-smooth:  300ms;
  --znith-duration-slow:    500ms;
  --znith-duration-slower:  700ms;
  --znith-duration-crawl:   1500ms;

  /* ──────────────────────────────────────────
     MOTION — EASING
  ────────────────────────────────────────── */
  --znith-ease-out:     cubic-bezier(0.0, 0.0, 0.2, 1.0);
  --znith-ease-in:      cubic-bezier(0.4, 0.0, 1.0, 1.0);
  --znith-ease-in-out:  cubic-bezier(0.4, 0.0, 0.2, 1.0);
  --znith-ease-linear:  linear;
  --znith-ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1.0);
  --znith-ease-sharp:   cubic-bezier(0.4, 0.0, 0.6, 1.0);

  /* ──────────────────────────────────────────
     MOTION — TRANSITIONS
  ────────────────────────────────────────── */
  --znith-transition-color:   color 200ms var(--znith-ease-out), background-color 200ms var(--znith-ease-out);
  --znith-transition-scale:   transform 200ms var(--znith-ease-out);
  --znith-transition-shadow:  box-shadow 300ms var(--znith-ease-out);
  --znith-transition-opacity: opacity 200ms var(--znith-ease-out);
  --znith-transition-border:  border-color 200ms var(--znith-ease-out);
  --znith-transition-default: all 200ms var(--znith-ease-out);

  /* ──────────────────────────────────────────
     MOTION — HOVER SCALES
  ────────────────────────────────────────── */
  --znith-scale-hover-card:   1.02;
  --znith-scale-hover-button: 1.03;
  --znith-scale-hover-icon:   1.10;
  --znith-scale-hover-image:  1.05;
  --znith-scale-active:       0.98;

  /* ──────────────────────────────────────────
     MOTION — GOLD PULSE
  ────────────────────────────────────────── */
  --znith-pulse-opacity-min: 0.90;
  --znith-pulse-opacity-max: 1.0;
  --znith-pulse-duration:    1500ms;
  --znith-pulse-glow-min:    rgba(223, 159, 62, 0.40);
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

### Tailwind CSS Configuration Guidance

For Tailwind-based implementations, extend the config with ZNITH tokens:

```js
// tailwind.config.js (excerpt)
module.exports = {
  theme: {
    extend: {
      colors: {
        znith: {
          navy: {
            50:  '#E8ECF4',
            100: '#C5CEDE',
            200: '#8E9EBE',
            300: '#5E74A0',
            400: '#3A5080',
            500: '#2A3A5A',
            600: '#1C2A4A',
            700: '#14203A',
            800: '#0D1828',
            900: '#091022',
            950: '#050B17',
          },
          gold: {
            champagne: '#F5E6C8',
            light:     '#FFD161',
            300:       '#F0B85A',
            400:       '#E8A847',
            500:       '#DF9F3E',
            deep:      '#C07A20',
            dark:      '#8B5E1A',
          },
        },
      },
      fontFamily: {
        cinzel:     ['Cinzel', 'Palatino Linotype', 'Book Antiqua', 'Georgia', 'serif'],
        montserrat: ['Montserrat', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono:       ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      borderRadius: {
        'znith-sm':   '4px',
        'znith-md':   '8px',
        'znith-lg':   '12px',
        'znith-xl':   '16px',
        'znith-2xl':  '24px',
      },
      boxShadow: {
        'znith-raised':     '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.6)',
        'znith-floating':   '0 4px 16px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)',
        'znith-gold':       '0 0 24px rgba(223,159,62,0.25), 0 4px 16px rgba(0,0,0,0.4)',
        'znith-gold-cta':   '0 0 32px rgba(223,159,62,0.45), 0 4px 24px rgba(0,0,0,0.5)',
      },
      maxWidth: {
        'znith-sm':  '640px',
        'znith-md':  '768px',
        'znith-lg':  '1024px',
        'znith-xl':  '1200px',
        'znith-2xl': '1440px',
      },
    },
  },
}
```

---

## Appendix A -- Section Layout Patterns

### Hero Section

```
Min-height:      100vh
Background:      #091022
Texture:         subtle noise overlay at 16% opacity (optional)
Padding:         80px 48px (desktop), 64px 20px (mobile)
Layout:          flex column, centered

Anatomy:
  [Overline — Montserrat 12px, #DF9F3E, uppercase, 0.15em spacing]
  [Display heading — Cinzel, clamp(48-96px), white]
  [Subheading — Montserrat 18-20px, #BBBBBB, max-width 640px]
  [CTA row — Primary + Ghost, gap 16px]
```

### Feature Grid

```
Layout:          CSS Grid, 1 col (mobile), 2 col (tablet), 3 col (desktop)
Gap:             24px
Container:       max-width 1200px centered
Padding:         96px 48px (section)
```

### Stats Row

```
Layout:          Grid, 2 col (mobile), 4 col (desktop)
Gap:             24px
Border:          top + bottom 1px #2A3A5A (optional)
Padding:         64px 48px
```

### CTA Section

```
Background:      #1C2A4A (elevated) or #14203A
Border-radius:   16px (contained variant)
Padding:         64px 48px
Text-align:      center
Max-width:       720px text block

Anatomy:
  [Overline]
  [Cinzel heading, 32-40px]
  [Montserrat body, 16-18px, #BBBBBB, max-width 540px]
  [Primary CTA Button]
  [Supporting text, 13px #7A7A7A (optional)]
```

### Process / Steps (ZNITH.AI OS)

```
Layout:          Horizontal numbered flow (desktop), vertical (mobile)
Connector:       1px dashed #2A3A5A between steps
Step number:     Cinzel 28px, gold (active), gray (inactive)
Step label:      Montserrat 14px, white (active), #7A7A7A (inactive)
Step dot:        24px circle, border 2px (gold active / gray inactive)
Active glow:     0 0 16px rgba(223, 159, 62, 0.4)

Phases:
  1 — Diagnostico e Direcao
  2 — Arquitetura Comercial
  3 — Implantacao Operacional
  4 — Acompanhamento e Otimizacao
  5 — Governanca e Escala
```

---

## Appendix B -- Quick Token Reference

| Token | Dark Mode Value | Tailwind |
|---|---|---|
| Background | `#091022` | `bg-znith-navy-900` |
| Surface | `#14203A` | `bg-znith-navy-700` |
| Elevated | `#1C2A4A` | `bg-znith-navy-600` |
| Gold Primary | `#DF9F3E` | `text-znith-gold-500` |
| Gold Light | `#FFD161` | `text-znith-gold-light` |
| Gold Deep | `#C07A20` | `text-znith-gold-deep` |
| Text Primary | `#FFFFFF` | `text-white` |
| Text Secondary | `#BBBBBB` | `text-[#BBBBBB]` |
| Text Muted | `#7A7A7A` | `text-[#7A7A7A]` |
| Border | `#2A3A5A` | `border-znith-navy-500` |
| Radius (Card) | 12px | `rounded-xl` |
| Radius (Button) | 8px | `rounded-lg` |

---

## Appendix C -- Governance

### Gold Restraint Rule

Gold is power. The more it appears, the less power it has. Treat gold like a signature: it appears at the primary CTA, the main headline accent, and key icon fills. Never as a background fill. Maximum 15% of any surface.

### Navy Depth Principle

Background (#091022) recedes. Surface (#14203A) sits at eye level. Elevated (#1C2A4A) comes forward. This natural hierarchy works without borders or heavy shadows.

### Typography Authority Principle

Cinzel speaks once per section. Montserrat carries everything else. The contrast between Cinzel's carved authority and Montserrat's geometric clarity is the core brand signal.

### Motion Restraint Principle

The gold pulse is for one element per view. Section reveals use 24px vertical drift. Speed defaults to 200ms. Subtle and purposeful.

### Semantic Color Discipline

Semantic colors are status signals only. Never decorative. Muted tones, never saturated. A ZNITH error state reads as premium, not alarming.

### No SaaS Patterns Rule

No pricing tier comparisons. No "Basic / Pro / Enterprise" layouts. No free trial CTAs. Every CTA leads to a consultation, diagnostic, or application. This is high-ticket consulting, not software.

---

*This document is the single source of truth for all ZNITH visual decisions. Components, pages, and all downstream design artifacts must reference these tokens exclusively. For logo-specific rules, refer to `02-logo-system.md`. For component implementation details, refer to `03-components.md`. For brand architecture and voice, refer to `04-brand-architecture.md`.*

*ZNITH Design System v2.0 -- April 2026*
