# Brand Identity Sheet — REIS [IA]

Last updated: March 2026

> **Owner**: designer-agent
> **Status**: Complete — v2.0 (Simplified brand architecture)
> **Consumed by**: dev-agent, direct-response-copywriter, orchestrator

---

## TABLE OF CONTENTS

1. [Color System](#1-color-system)
2. [Typography Scale](#2-typography-scale)
3. [Spacing and Grid System](#3-spacing-and-grid-system)
4. [Logo and Wordmark](#4-logo-and-wordmark)
5. [Component Styles](#5-component-styles)
6. [Sample Hero Section Layout](#6-sample-hero-section-layout)
7. [Imagery and Texture Guidelines](#7-imagery-and-texture-guidelines)
8. [Motion and Animation](#8-motion-and-animation)

---

## 1. COLOR SYSTEM

### 1A. Primary Palette

| Name | Hex | RGB | HSL | Tailwind Class | Usage |
|------|-----|-----|-----|----------------|-------|
| Black | `#000000` | rgb(0, 0, 0) | hsl(0, 0%, 0%) | `bg-black` | Page background, primary sections |
| White | `#FFFFFF` | rgb(255, 255, 255) | hsl(0, 0%, 100%) | `text-white` | Primary headlines, hero text |
| Off-White | `#F5F5F5` | rgb(245, 245, 245) | hsl(0, 0%, 96%) | `text-neutral-100` | Body text on dark backgrounds |

### 1B. Accent Color — Blue

The accent is a clean, confident blue. It communicates precision, technology, and trust without being corporate or cold.

| Variant | Hex | RGB | Tailwind Custom | Usage |
|---------|-----|-----|-----------------|-------|
| **Accent Default** | `#4A90FF` | rgb(74, 144, 255) | `text-accent` / `bg-accent` | Primary CTAs, key highlights |
| **Accent Hover** | `#6AADFF` | rgb(106, 173, 255) | `hover:bg-accent-hover` | Button hover states, active links |
| **Accent Muted** | `#3570CC` | rgb(53, 112, 204) | `text-accent-muted` | Secondary emphasis, active/pressed state |
| **Accent Bright** | `#8DC4FF` | rgb(141, 196, 255) | `text-accent-bright` | Sparingly — featured metrics, hero accent words |
| **Accent BG** | `rgba(74, 144, 255, 0.08)` | — | `bg-accent/[0.08]` | Accent background tint for cards or badges |
| **Accent Border** | `rgba(74, 144, 255, 0.20)` | — | `border-accent/20` | Accent borders on highlighted cards |

**Accent Usage Rules:**
- Never use accent as a full background fill on sections larger than a button or badge.
- Accent text should only appear on dark backgrounds (minimum contrast ratio 4.5:1).
- Maximum two accent-colored elements visible in any viewport at one time. Restraint is the rule.
- CTA buttons are the primary accent-colored element on any page.

### 1C. Neutral Gray Scale (Dark Mode)

| Name | Hex | RGB | HSL | Tailwind | Usage |
|------|-----|-----|-----|----------|-------|
| Gray 950 | `#0A0A0A` | rgb(10, 10, 10) | hsl(0, 0%, 4%) | `bg-neutral-950` | Alternate page background |
| Gray 900 | `#141414` | rgb(20, 20, 20) | hsl(0, 0%, 8%) | `bg-neutral-900` | Card backgrounds, elevated surfaces |
| Gray 850 | `#1A1A1A` | rgb(26, 26, 26) | hsl(0, 0%, 10%) | `bg-neutral-850` | Hover state on cards |
| Gray 800 | `#262626` | rgb(38, 38, 38) | hsl(0, 0%, 15%) | `border-neutral-800` | Borders, dividers, separators |
| Gray 700 | `#404040` | rgb(64, 64, 64) | hsl(0, 0%, 25%) | `border-neutral-700` | Active borders, input borders |
| Gray 500 | `#737373` | rgb(115, 115, 115) | hsl(0, 0%, 45%) | `text-neutral-500` | Tertiary text, disabled states |
| Gray 400 | `#A3A3A3` | rgb(163, 163, 163) | hsl(0, 0%, 64%) | `text-neutral-400` | Secondary body text, descriptions |
| Gray 300 | `#D4D4D4` | rgb(212, 212, 212) | hsl(0, 0%, 83%) | `text-neutral-300` | Emphasized secondary text |

### 1D. Semantic Colors

| Purpose | Hex | RGB | Tailwind | Usage |
|---------|-----|-----|----------|-------|
| Success | `#22C55E` | rgb(34, 197, 94) | `text-green-500` | Confirmation, positive metrics, checkmarks |
| Warning | `#EAB308` | rgb(234, 179, 8) | `text-yellow-500` | Alerts, urgency indicators |
| Error | `#EF4444` | rgb(239, 68, 68) | `text-red-500` | Form validation errors |
| Info | `#3B82F6` | rgb(59, 130, 246) | `text-blue-500` | Informational notes |

**Semantic usage rules:** These colors appear only in functional contexts (form feedback, status indicators). Never as decorative or brand elements.

### 1E. Dark Mode Background Layers

| Layer | Hex | Usage | Tailwind |
|-------|-----|-------|----------|
| L0 — Page | `#000000` | Base page background | `bg-black` |
| L1 — Surface | `#0A0A0A` | Alternate section backgrounds | `bg-neutral-950` |
| L2 — Card | `#141414` | Cards, modals, dropdowns | `bg-neutral-900` |
| L3 — Elevated | `#1A1A1A` | Hovered cards, active elements | `bg-neutral-850` |

**Depth rules:**
- Never stack more than 2 layers above the page background.
- Cards on L1 sections use L2. Cards on L0 sections also use L2.
- Borders (`#262626`) provide edge definition instead of box-shadows.
- Subtle box-shadow allowed only on elevated modals/dropdowns: `0 8px 32px rgba(0, 0, 0, 0.4)`.

---

## 2. TYPOGRAPHY SCALE

### 2A. Font Family

**Primary font**: Inter
**Weights loaded**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
**Fallback stack**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### 2B. Type Scale — Desktop (1280px+)

| Role | Size (px) | Weight | Line-Height | Letter-Spacing | Tailwind Classes |
|------|-----------|--------|-------------|----------------|------------------|
| Display / Hero | 72px | 700 | 1.05 | -0.03em | `text-7xl font-bold leading-none tracking-tighter` |
| H1 | 56px | 700 | 1.1 | -0.02em | `text-5xl font-bold leading-tight tracking-tight` |
| H2 | 42px | 600 | 1.2 | -0.01em | `text-4xl font-semibold leading-snug tracking-tight` |
| H3 | 30px | 600 | 1.3 | 0 | `text-3xl font-semibold leading-snug` |
| H4 | 24px | 600 | 1.35 | 0 | `text-2xl font-semibold` |
| H5 | 20px | 600 | 1.4 | 0 | `text-xl font-semibold` |
| H6 | 16px | 600 | 1.5 | 0.01em | `text-base font-semibold tracking-wide` |
| Body Large | 20px | 400 | 1.7 | 0 | `text-xl font-normal leading-relaxed` |
| Body | 17px | 400 | 1.7 | 0 | `text-[17px] font-normal leading-relaxed` |
| Body Small | 15px | 400 | 1.6 | 0 | `text-[15px] font-normal` |
| Caption | 14px | 500 | 1.5 | 0.01em | `text-sm font-medium tracking-wide` |
| Label | 13px | 600 | 1.4 | 0.05em | `text-[13px] font-semibold tracking-widest uppercase` |
| Microcopy | 12px | 400 | 1.5 | 0.01em | `text-xs font-normal` |

### 2C. Type Scale — Mobile (375px)

| Role | Size (px) | Adjustment |
|------|-----------|------------|
| Display / Hero | 40px | Reduced from 72px |
| H1 | 36px | Reduced from 56px |
| H2 | 28px | Reduced from 42px |
| H3 | 24px | Reduced from 30px |
| H4 | 20px | Reduced from 24px |
| Body | 16px | Slightly reduced |

### 2D. Weight Usage Rules

| Weight | Name | Usage |
|--------|------|-------|
| 300 | Light | Large display text, wordmark lockups. Never for body. Never below 24px. |
| 400 | Regular | Body text, descriptions, paragraphs. |
| 500 | Medium | Captions, navigation items, form labels. |
| 600 | SemiBold | Headings H2-H6, button text, card titles. |
| 700 | Bold | Display/Hero headings, H1. Maximum impact. |

### 2E. Text Color by Role

| Role | Color | Tailwind |
|------|-------|----------|
| Headline (H1-H3) | `#FFFFFF` | `text-white` |
| Headline (H4-H6) | `#F5F5F5` | `text-neutral-100` |
| Body text | `#D4D4D4` | `text-neutral-300` |
| Secondary text | `#A3A3A3` | `text-neutral-400` |
| Tertiary / Muted | `#737373` | `text-neutral-500` |
| Accent emphasis | `#4A90FF` | `text-accent` |

---

## 3. SPACING AND GRID SYSTEM

### 3A. Base Unit

Base unit: **4px**. All spacing values are multiples of 4px.

### 3B. Spacing Scale

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `space-1` | 4px | `p-1` | Micro adjustments, icon-to-text gaps |
| `space-2` | 8px | `p-2` | Tight internal padding |
| `space-3` | 12px | `p-3` | Small card internal padding |
| `space-4` | 16px | `p-4` | Standard internal padding |
| `space-6` | 24px | `p-6` | Card padding, gutter width |
| `space-8` | 32px | `p-8` | Large card padding |
| `space-12` | 48px | `p-12` | Minor section breaks |
| `space-16` | 64px | `p-16` | Major section spacing (mobile) |
| `space-20` | 80px | `p-20` | Section padding vertical (desktop min) |
| `space-24` | 96px | `p-24` | Large section padding (desktop) |
| `space-32` | 128px | `py-32` | Maximum section padding (hero) |

### 3C. Grid System

| Property | Value | Tailwind |
|----------|-------|----------|
| Columns (desktop) | 12 | `grid-cols-12` |
| Columns (tablet) | 8 | `md:grid-cols-8` |
| Columns (mobile) | 4 | `grid-cols-4` |
| Gutter | 24px (mobile), 32px (desktop) | `gap-6 lg:gap-8` |
| Max content width | 1200px | `max-w-[1200px]` |
| Content padding | 20px (mobile), 32px (tablet), 0 (desktop) | `px-5 md:px-8 lg:px-0` |

Standard content container:
```html
<div class="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-0">
```

### 3D. Breakpoints

| Name | Width | Tailwind Prefix |
|------|-------|-----------------|
| Mobile | 0 - 767px | (default) |
| Tablet | 768px - 1023px | `md:` |
| Desktop Small | 1024px - 1279px | `lg:` |
| Desktop | 1280px+ | `xl:` |
| Desktop Wide | 1536px+ | `2xl:` |

### 3E. Section Vertical Rhythm

| Section Type | Desktop Padding | Mobile Padding | Tailwind |
|-------------|----------------|----------------|----------|
| Hero | 128px top, 96px bottom | 80px top, 64px bottom | `pt-32 pb-24 md:pt-20 md:pb-16` |
| Standard | 96px | 64px | `py-24 md:py-16` |
| Compact | 64px | 48px | `py-16 md:py-12` |
| Footer CTA | 96px | 64px | `py-24 md:py-16` |
| Navigation | Fixed 72px desktop, 64px mobile | — | `h-[72px] md:h-16` |

---

## 4. LOGO AND WORDMARK

### 4A. Primary Wordmark

**REIS [IA]** — the primary brand lockup.

- "REIS" in Inter, weight 300 (Light), uppercase
- "[IA]" in Inter, weight 300 (Light), accent blue `#4A90FF`
- The brackets are part of the wordmark — they create visual containment
- Spacing between REIS and [IA]: 0.3em

### 4B. Size Variants

| Context | Size | Notes |
|---------|------|-------|
| Navigation | 20px | Weight 300, white + accent blue |
| Footer | 20px | Same as nav |
| Hero / Page header | 24-32px | Can scale up for impact |
| Favicon | Blue background `#4A90FF` + black mark, stroke-width 7 |

### 4C. Usage Rules

- Always render as text (Inter font), never as an image
- "REIS" is always white on dark backgrounds
- "[IA]" is always accent blue `#4A90FF`
- Never apply effects (glow, shadow, gradient) to the wordmark
- Minimum clear space: 1em around all sides

### 4D. Pillar Wordmarks

Each pillar follows the same pattern:

| Pillar | Rendering |
|--------|-----------|
| REIS [IA] Systems | "REIS [IA]" as above + "Systems" in weight 400, neutral-400 |
| REIS [IA] Builders | "REIS [IA]" as above + "Builders" in weight 400, neutral-400 |
| REIS [IA] Marketing | "REIS [IA]" as above + "Marketing" in weight 400, neutral-400 |

### 4E. Decorative Elements (Optional)

**Hourglass**: May be used as an optional decorative element at low opacity (3-8%) in backgrounds. It is NOT a required brand symbol. When used, render as a minimal geometric outline in white.

**"O Tempo é Rei"**: Decorative tagline/slogan. Used sparingly in subtle, secondary placements — footer, background watermarks, about sections. Never as a headline or primary copy element.

---

## 5. COMPONENT STYLES

### 5A. Buttons

#### Primary Button (CTA)

| Property | Value | Tailwind |
|----------|-------|----------|
| Background | `#4A90FF` | `bg-accent` |
| Text color | `#000000` | `text-black` |
| Font size | 16px | `text-base` |
| Font weight | 600 | `font-semibold` |
| Padding | 16px 32px | `px-8 py-4` |
| Border radius | 6px | `rounded-md` |
| Hover background | `#6AADFF` | `hover:bg-accent-hover` |
| Hover transform | translateY(-1px) | `hover:-translate-y-px` |
| Active background | `#3570CC` | `active:bg-accent-muted` |
| Transition | all 200ms ease | `transition-all duration-200` |
| Min width | 200px | `min-w-[200px]` |

#### Secondary Button

| Property | Value | Tailwind |
|----------|-------|----------|
| Background | transparent | `bg-transparent` |
| Text color | `#FFFFFF` | `text-white` |
| Border | 1px solid `#404040` | `border border-neutral-700` |
| Padding | 16px 32px | `px-8 py-4` |
| Border radius | 6px | `rounded-md` |
| Hover border | `#737373` | `hover:border-neutral-500` |
| Hover background | `rgba(255,255,255,0.03)` | `hover:bg-white/[0.03]` |

#### Ghost Button

| Property | Value | Tailwind |
|----------|-------|----------|
| Background | transparent | `bg-transparent` |
| Text color | `#A3A3A3` | `text-neutral-400` |
| Border | none | — |
| Hover text | `#FFFFFF` | `hover:text-white` |
| Arrow suffix | " →" appended | — |

### 5B. Cards

#### Standard Card

| Property | Value | Tailwind |
|----------|-------|----------|
| Background | `#141414` | `bg-neutral-900` |
| Border | 1px solid `#262626` | `border border-neutral-800` |
| Border radius | 8px | `rounded-lg` |
| Padding | 32px | `p-8` |
| Hover border | `#404040` | `hover:border-neutral-700` |
| Hover background | `#1A1A1A` | `hover:bg-neutral-850` |
| Transition | border-color 200ms | `transition-colors duration-200` |

Internal card structure:
1. **Icon** (minimal geometric SVG, 40px, accent blue) — `mb-6`
2. **Card title** (H4: 24px, semibold, white) — `mb-3`
3. **Card body** (Body: 16px, regular, neutral-400) — `mb-6`
4. **Bullet list** (14px, neutral-400, accent-colored bullets) — `mb-6`
5. **Card CTA** (Ghost button style) — bottom

#### Proof / Metric Card

| Property | Value |
|----------|-------|
| Layout | Metric on left (large, accent blue, 48px bold), story on right |
| Metric label | 13px, uppercase, neutral-500 |
| Metric value | 48px, bold, accent blue or white |
| Story text | 16px, neutral-300, 2-3 lines |

### 5C. Section Dividers

**Gradient fade divider (preferred):**
```css
.divider-fade {
  height: 1px;
  background: linear-gradient(to right, transparent, #262626 20%, #262626 80%, transparent);
}
```

**Section background alternation (primary method):**
Alternate sections between `#000000` and `#0A0A0A`.

### 5D. Navigation Bar

| Property | Value | Tailwind |
|----------|-------|----------|
| Position | Fixed top | `fixed top-0 left-0 right-0 z-50` |
| Height | 72px desktop, 64px mobile | `h-[72px] md:h-16` |
| Background | `#000000` 80% opacity, blur | `bg-black/80 backdrop-blur-md` |
| Border bottom | 1px solid `#1A1A1A` | `border-b border-neutral-850` |

**Logo area (left):** "REIS [IA]" wordmark, 20px, weight 300
**Nav links:** 14px, weight 500, `text-neutral-400`, hover: `text-white`
**Active page:** `text-white` with 2px bottom accent-blue underline
**Nav links:** Home, Systems, Builders, Marketing
**CTA button (right):** Small primary button — "Agendar" or "Aplicar"

### 5E. Footer

| Property | Value |
|----------|-------|
| Background | `#0A0A0A` |
| Border top | 1px solid `#1A1A1A` |
| Padding | 64px top, 32px bottom (desktop) |
| Max width | 1200px |

### 5F. Badge / Tag Styles

| Property | Value | Tailwind |
|----------|-------|----------|
| Background | `rgba(74, 144, 255, 0.10)` | `bg-accent/10` |
| Text | `#4A90FF` | `text-accent` |
| Font size | 12px | `text-xs` |
| Font weight | 600 | `font-semibold` |
| Letter spacing | 0.05em | `tracking-widest` |
| Text transform | uppercase | `uppercase` |
| Padding | 4px 12px | `px-3 py-1` |
| Border radius | 4px | `rounded` |
| Border | 1px solid `rgba(74, 144, 255, 0.20)` | `border border-accent/20` |

### 5G. Input Fields and Forms

| Property | Value | Tailwind |
|----------|-------|----------|
| Background | `#141414` | `bg-neutral-900` |
| Border | 1px solid `#404040` | `border border-neutral-700` |
| Border radius | 6px | `rounded-md` |
| Padding | 14px 16px | `px-4 py-3.5` |
| Text color | `#FFFFFF` | `text-white` |
| Placeholder | `#737373` | `placeholder:text-neutral-500` |
| Focus border | `#4A90FF` | `focus:border-accent` |
| Focus ring | accent blue 20% | `focus:ring-2 focus:ring-accent/20` |

---

## 6. SAMPLE HERO SECTION LAYOUT

```
[FULL WIDTH — Black background #000000]

  [Label badge] "PARA EMPREENDEDORES E EMPRESÁRIOS"

  [Display headline — 72px, bold, white]
  "Lucre com IA."
  "Reduza custos."

  [Body — 20px, neutral-300, max-w-2xl]
  Support text describing the value proposition.

  [Primary CTA button — accent blue]     [Secondary button — border]
  "Agendar Diagnóstico"                  "Conhecer os Pilares"

  [Microcopy — 12px, neutral-500]
  "Sessão gratuita de 60 minutos"
```

---

## 7. IMAGERY AND TEXTURE GUIDELINES

### 7A. Background Textures

**Grain overlay (optional):**
```css
.grain {
  background-image: url("data:image/svg+xml,..."); /* noise pattern */
  opacity: 0.03;
  pointer-events: none;
}
```
- Applied as a fixed overlay on the entire page or on specific sections.
- Opacity: 2-4%. Never higher.

### 7B. Gradient Accents

**Blue ambient glow (hero sections):**
```css
.blue-glow {
  background: radial-gradient(ellipse at 50% 0%, rgba(74, 144, 255, 0.08) 0%, transparent 60%);
}
```

**Blue border gradient (cards):**
```css
.accent-border {
  border-image: linear-gradient(to bottom, rgba(74, 144, 255, 0.3), transparent) 1;
}
```

### 7C. What Not to Use

- No photography or stock images unless specifically approved
- No 3D renders or illustrations
- No patterns that compete with content
- No gradients on text (no shimmer, no azure whisper effects)

---

## 8. MOTION AND ANIMATION

### 8A. Easing Curves

| Name | Value | Usage |
|------|-------|-------|
| Default | `cubic-bezier(0.25, 0.1, 0.25, 1)` | General transitions |
| Enter | `cubic-bezier(0, 0, 0.2, 1)` | Elements appearing |
| Exit | `cubic-bezier(0.4, 0, 1, 1)` | Elements disappearing |

### 8B. Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| Fast | 150ms | Micro-interactions (hover, focus) |
| Normal | 200ms | Button states, color changes |
| Smooth | 300ms | Card transitions, border changes |
| Slow | 500ms | Section reveals, large movements |

### 8C. Scroll Animations

Elements fade in and translate up on scroll entry:
```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 8D. Rules

- No bouncing, no elastic easing
- No rotating or flipping animations
- No auto-playing loops (except subtle ambient effects)
- All motion respects `prefers-reduced-motion`

---

## PROHIBITED ELEMENTS

The following are permanently banned from the brand:

- Gold, amber, terracotta, warm accent colors
- Chess pieces, crowns, or game metaphors
- Azure whisper / blue shimmer text effects
- Gradient text
- Emojis in UI
- Pricing tables, tier cards, or SaaS patterns
- Stock photography
- 3D renders or illustrations
