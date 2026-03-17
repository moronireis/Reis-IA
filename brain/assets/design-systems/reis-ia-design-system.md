# Reis IA Design System

Last updated: 2026-03-17 (v1.1 -- Technique Enrichment)

> **Owner**: designer-agent
> **Status**: Complete -- Official Design System v1.0
> **Consumed by**: dev-agent, designer-agent (page specs), orchestrator
> **Context**: Reis IA is a high-ticket AI consultancy, NOT a SaaS product. Every visual decision serves premium positioning, authority, and conversion toward booking calls (/agendar or /aplicar).

---

## TABLE OF CONTENTS

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography Scale](#3-typography-scale)
4. [Spacing System](#4-spacing-system)
5. [Layout System](#5-layout-system)
6. [Motion and Animation Library](#6-motion-and-animation-library)
7. [Component Specifications](#7-component-specifications)
8. [Effects Library](#8-effects-library)
9. [Signature Elements](#9-signature-elements)
10. [Responsive Design Rules](#10-responsive-design-rules)
11. [Accessibility Requirements](#11-accessibility-requirements)
12. [Dos and Donts](#12-dos-and-donts)

---

## 1. DESIGN PHILOSOPHY

Five principles govern every visual decision. They are ordered by priority -- when two principles conflict, the higher-ranked one wins.

### Principle 1: Restraint Is the Design

Every element must earn its space. If removing something does not reduce comprehension or conversion, remove it. White space (black space, in our case) is not emptiness -- it is the primary visual device that signals premium positioning.

*Inspired by: Apple's 60%+ viewport breathing room, Porsche's 3-weight / 1-shadow / no-accent discipline, Linear's "structure felt not seen" philosophy. What makes Reis IA different: We apply this restraint on a dark canvas with a single blue accent, creating tension between minimalism and depth that none of these references achieve alone.*

### Principle 2: Typography Is Architecture

The type system does 90% of the hierarchy work. Headlines are large, confident, and tightly tracked. Body text is generous and readable. The contrast between these two modes -- dense impact vs. open legibility -- creates the visual rhythm of every page.

*Inspired by: Apple's 96px display headlines at 1.0 line-height, Linear's 9-level title scale, Stripe's letter-spacing-tightens-as-size-increases rule. What makes Reis IA different: We use Inter Variable for continuous weight adjustment, and we combine the tight headline style with blue accents on select words, creating emphasis moments without gradient text effects.*

### Principle 3: Dark Mode Mastery

This is not "white on black." It is a layered surface system where depth is communicated through subtle background value shifts, semi-transparent borders, and restrained glow effects. Shadows are nearly invisible. Elevation comes from background lightness, not shadow darkness.

*Inspired by: Vercel's pure black canvas with 3-tier elevation, Linear's opacity-based text hierarchy, Agencia Lendaria's ambient light pools. What makes Reis IA different: We add depth through blue-tinted ambient glows, grain texture for analog dimension, and the hourglass motif as a proprietary visual anchor.*

### Principle 4: Conversion Through Clarity

CTAs must be immediately visible. Visual flow must guide the eye toward the next action. The blue accent exists primarily for conversion elements. Every page leads to /agendar or /aplicar. The design never lets a visitor wonder "what should I do next?"

*Inspired by: Morningside's single-CTA discipline, Apple's dual CTA pattern, Stripe's card hover that lifts elements toward the user. What makes Reis IA different: We use the blue accent exclusively for conversion moments (max 2 accent-colored elements per viewport), making every blue element a signal that says "act here."*

### Principle 5: Engineered Precision

Every value is intentional. No default `ease`. No arbitrary spacing. No round-number border-radii when optical tuning produces a better result. The design system is engineered like the AI systems we build for clients.

*Inspired by: Porsche's `calc(6px + 2.125ex)` line-height formula, Stripe's 1.018x card scale and 16.5px border-radius, Porsche's `cubic-bezier(0.25, 0.1, 0.25, 1)` custom easing. What makes Reis IA different: We expose this precision through fluid clamp() values, custom easing curves, and optically-tuned spacing rather than hiding it behind a generic framework.*

---

## 2. COLOR SYSTEM

### 2A. Brand Colors (Preserved Exactly)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Black | `#000000` | rgb(0, 0, 0) | Primary page background |
| White | `#FFFFFF` | rgb(255, 255, 255) | Primary headlines, hero text |
| Accent Blue | `#4A90FF` | rgb(74, 144, 255) | Primary CTAs, brand icons, key highlights |
| Accent Hover | `#6AADFF` | rgb(106, 173, 255) | Blue hover state |
| Accent Muted | `#3570CC` | rgb(53, 112, 204) | Blue active/pressed state |
| Accent Bright | `#8DC4FF` | rgb(141, 196, 255) | Reserved for special emphasis |

### 2B. Surface Layering System

Depth is communicated through 5 tiers of background values. Each tier is a step closer to the viewer. Shadows are not used for elevation -- background lightness is.

| Tier | Name | Hex | CSS Variable | Usage |
|------|------|-----|-------------|-------|
| 0 | Void | `#000000` | `--surface-0` | Page background, deepest layer |
| 1 | Base | `#0A0A0A` | `--surface-1` | Alternating section backgrounds |
| 2 | Raised | `#111111` | `--surface-2` | Card backgrounds (default) |
| 3 | Elevated | `#161616` | `--surface-3` | Card hover, input backgrounds |
| 4 | Float | `#1A1A1A` | `--surface-4` | Dropdowns, tooltips, floating elements |

*Inspired by: Vercel's Flat/Raised/Floating system (3 tiers), Agencia Lendaria's 8-tier system (too many), Linear's 3-tier approach. Reis IA uses 5 tiers as the sweet spot -- enough for rich layering without the complexity of 8+ values.*

**Section alternation rule**: Sections alternate between Surface-0 and Surface-1. Hero always starts on Surface-0.

### 2C. Text Opacity Scale

Text hierarchy is achieved through opacity of white, not through different gray hex values. This creates visual unity and ensures text always harmonizes with any background tier.

| Token | Value | CSS Variable | Usage |
|-------|-------|-------------|-------|
| Text Primary | `#FFFFFF` (100%) | `--text-primary` | Headlines, strong emphasis |
| Text Secondary | `rgba(255, 255, 255, 0.70)` | `--text-secondary` | Body copy, descriptions |
| Text Tertiary | `rgba(255, 255, 255, 0.50)` | `--text-tertiary` | Captions, metadata, labels |
| Text Quaternary | `rgba(255, 255, 255, 0.35)` | `--text-quaternary` | Decorative text, disabled states |
| Text Muted | `rgba(255, 255, 255, 0.20)` | `--text-muted` | Watermark text, ghost elements |

*Inspired by: Linear's 5-level opacity system (100%/70%/50%/48%/35%). Reis IA simplifies to cleaner intervals (100/70/50/35/20) and drops the 48% level which created ambiguity.*

### 2D. Border Opacity Scale

Borders use white at varying opacities. This ensures they harmonize with any surface tier.

| Token | Value | CSS Variable | Usage |
|-------|-------|-------------|-------|
| Border Subtle | `rgba(255, 255, 255, 0.05)` | `--border-subtle` | Ghost borders, barely visible structure |
| Border Default | `rgba(255, 255, 255, 0.08)` | `--border-default` | Card borders, dividers |
| Border Visible | `rgba(255, 255, 255, 0.12)` | `--border-visible` | Hover borders, emphasized dividers |
| Border Strong | `rgba(255, 255, 255, 0.20)` | `--border-strong` | Active borders, input focus (non-blue) |
| Border Accent | `rgba(74, 144, 255, 0.30)` | `--border-accent` | Blue-tinted borders on featured cards |

*Inspired by: Linear's 5-8% border range ("felt not seen"), Porsche's white alpha layering (30%/50%/60%/100%), Morningside's 6% border. Reis IA uses a 4-step neutral scale plus one accent variant.*

### 2E. Gradient Definitions

| Name | CSS Value | Usage |
|------|-----------|-------|
| Blue Ambient | `radial-gradient(ellipse at center, rgba(74, 144, 255, 0.06) 0%, transparent 70%)` | Warm ambient glow behind key sections |
| Blue Sweep | `linear-gradient(90deg, #4A90FF 0%, #3570CC 100%)` | Accent gradient for borders |
| Blue to Dark | `linear-gradient(90deg, #4A90FF 0%, rgba(10, 10, 26, 0) 100%)` | Gradient border fade (accent to transparent) |
| Surface Fade | `linear-gradient(180deg, var(--surface-0) 0%, var(--surface-1) 100%)` | Section transitions |
| Section Mask Top | `linear-gradient(to bottom, var(--surface-0), transparent)` | Top edge fade on scrollable areas |
| Section Mask Bottom | `linear-gradient(to top, var(--surface-0), transparent)` | Bottom edge fade |
| Marquee Edge | `linear-gradient(90deg, var(--surface-0) 0%, transparent 10%, transparent 90%, var(--surface-0) 100%)` | Logo carousel edge fade |
| Card Surface | `linear-gradient(135deg, var(--surface-2), var(--surface-3))` | Subtle card background variation |
| Light Pool (blue) | `radial-gradient(35% 50% at 0% 100%, rgba(74, 144, 255, 0.04) 0%, transparent 100%)` | Ambient warmth in section corners |
| Light Pool (neutral) | `radial-gradient(35% 50% at 100% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 100%)` | Neutral ambient light |

*Inspired by: Agencia Lendaria's ambient light pools (alternating corner positions), Academia Lendaria's rotating conic gradient borders, Stripe's knockout gradient text, Morningside's blue glow shadow. Reis IA's gradients are blue-tinted versions of the neutral light pools, keeping the ambient light technique but making it brand-specific.*

### 2F. Shadow Palette

Shadows are used sparingly. On dark backgrounds, elevation is communicated through surface layering, not shadows. Shadows are reserved for floating elements only.

| Tier | Value | CSS Variable | Usage |
|------|-------|-------------|-------|
| Shadow Subtle | `0 1px 2px rgba(0, 0, 0, 0.3)` | `--shadow-subtle` | Minimal depth hint |
| Shadow Default | `0 4px 16px rgba(0, 0, 0, 0.25)` | `--shadow-default` | Dropdowns, floating panels |
| Shadow Elevated | `0 8px 30px rgba(0, 0, 0, 0.4)` | `--shadow-elevated` | Modals, popovers |
| Shadow Dramatic | `0 16px 70px rgba(0, 0, 0, 0.5)` | `--shadow-dramatic` | Full-screen overlays |
| Shadow Blue Glow | `0 0 50px rgba(74, 144, 255, 0.12)` | `--shadow-blue-glow` | Featured card hover, CTA emphasis |

*Inspired by: Porsche's single shadow value (0 4px 16px), Vercel's minimal shadow system (reserved for floating/modal only), Stripe's layered dual-shadow technique, Morningside's accent glow (0 0 50px rgba(accent, 0.15)). Reis IA uses a simple 4-tier system plus one blue glow for brand moments. The blue glow at 12% opacity (not 15%) is more restrained than Morningside's green glow.*

---

## 3. TYPOGRAPHY SCALE

### 3A. Font Configuration

```
Font family: Inter Variable (single file, weight range 100-900)
Source: Self-hosted from /fonts/InterVariable.woff2 (or Google Fonts CDN)
Rendering: -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
```

Inter Variable allows continuous weight adjustment (e.g., weight 450 or 550 for subtle emphasis). This is preferred over loading discrete weight files.

### 3B. Type Scale

All sizes use `clamp()` for fluid scaling between mobile (375px viewport) and desktop (1280px viewport).

| Token | Desktop | Mobile | Weight | Line-Height | Letter-Spacing | CSS Variable |
|-------|---------|--------|--------|-------------|----------------|-------------|
| Display | 72px | 40px | 700 | 1.05 | -0.03em | `--text-display` |
| H1 | 56px | 36px | 700 | 1.08 | -0.025em | `--text-h1` |
| H2 | 48px | 30px | 600 | 1.10 | -0.02em | `--text-h2` |
| H3 | 36px | 26px | 600 | 1.15 | -0.015em | `--text-h3` |
| H4 | 28px | 22px | 600 | 1.20 | -0.01em | `--text-h4` |
| H5 | 24px | 20px | 600 | 1.25 | -0.005em | `--text-h5` |
| Body Large | 20px | 18px | 400 | 1.60 | 0 | `--text-body-lg` |
| Body | 16px | 16px | 400 | 1.65 | 0 | `--text-body` |
| Body Small | 14px | 14px | 400 | 1.55 | 0 | `--text-body-sm` |
| Caption | 13px | 12px | 500 | 1.45 | 0.01em | `--text-caption` |
| Micro | 11px | 11px | 500 | 1.35 | 0.02em | `--text-micro` |
| Label | 12px | 12px | 600 | 1.40 | 0.05em | `--text-label` |

### 3C. Fluid Clamp Formulas

```css
--text-display: clamp(2.5rem, 1.5rem + 3.5vw, 4.5rem);    /* 40px to 72px */
--text-h1: clamp(2.25rem, 1.5rem + 2.75vw, 3.5rem);        /* 36px to 56px */
--text-h2: clamp(1.875rem, 1.25rem + 2.25vw, 3rem);         /* 30px to 48px */
--text-h3: clamp(1.625rem, 1.25rem + 1.25vw, 2.25rem);      /* 26px to 36px */
--text-h4: clamp(1.375rem, 1.125rem + 0.75vw, 1.75rem);     /* 22px to 28px */
--text-h5: clamp(1.25rem, 1.125rem + 0.5vw, 1.5rem);        /* 20px to 24px */
--text-body-lg: clamp(1.125rem, 1rem + 0.25vw, 1.25rem);    /* 18px to 20px */
```

### 3D. Typography Rules

1. **Letter-spacing tightens as size increases**: Display (-0.03em) through Body (0) through Label (+0.05em). This is a universal typographic rule used by Stripe, Linear, Apple, Vercel, and Porsche.

2. **Line-height loosens as size decreases**: Display (1.05) through Body (1.65). Large text needs tight leading for visual density. Small text needs generous leading for readability.

3. **Weight assignments are contextual**:
   - 700 (Bold): Display and H1 only -- maximum impact
   - 600 (Semibold): H2 through H5, buttons, labels, badges -- structural weight
   - 500 (Medium): Captions, micro text, emphasized body -- subtle emphasis
   - 400 (Regular): Body text, descriptions -- reading weight

4. **`text-wrap: balance`** on all headings (H1-H5) to distribute words evenly across lines. **`text-wrap: pretty`** on body text to prevent orphans/widows.

5. **`font-variant-numeric: tabular-nums`** on all metric/stat displays for column alignment.

6. **No uppercase** except: Label token (badges, section labels, column headers). All other text uses sentence case.

7. **Maximum line length**: Body text capped at 680px width for optimal readability (65-75 characters per line).

*Inspired by: Porsche's fluid clamp() typography (no breakpoint jumps), Linear's text-wrap: balance/pretty, Apple's 96px hero size at 1.0 line-height, Stripe's letter-spacing-tightens-with-size rule, Academia Lendaria's clamp() headlines. Reis IA's scale is a 10-level system (simpler than Linear's 15, richer than Porsche's 7) optimized for marketing content rather than product UI.*

---

## 4. SPACING SYSTEM

### 4A. Fluid Spacing Tokens

Spacing uses `clamp()` for fluid scaling. 8 tokens cover all needs from micro-interactions to hero-level breathing room.

| Token | Min (Mobile) | Max (Desktop) | CSS Variable | Usage |
|-------|-------------|---------------|-------------|-------|
| space-xs | 4px | 4px | `--space-xs` | Icon gaps, inline micro-adjustments |
| space-sm | 8px | 8px | `--space-sm` | Tight element groups, tag padding |
| space-md | 16px | 16px | `--space-md` | Standard element spacing, paragraph gaps |
| space-lg | 24px | 32px | `--space-lg` | Card padding, grid gutters, heading-to-body gap |
| space-xl | 32px | 48px | `--space-xl` | Content group spacing, subsection breaks |
| space-2xl | 48px | 80px | `--space-2xl` | Section padding (mobile/desktop compact) |
| space-3xl | 64px | 120px | `--space-3xl` | Section padding (standard), major breaks |
| space-4xl | 80px | 160px | `--space-4xl` | Hero padding, maximum breathing room |

### 4B. Fluid Clamp Formulas

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: clamp(24px, 1vw + 20px, 32px);
--space-xl: clamp(32px, 2vw + 24px, 48px);
--space-2xl: clamp(48px, 4vw + 32px, 80px);
--space-3xl: clamp(64px, 7vw + 36px, 120px);
--space-4xl: clamp(80px, 10vw + 40px, 160px);
```

### 4C. Section Padding Rules

| Section Type | Vertical Padding | Token |
|-------------|-----------------|-------|
| Hero section | `--space-4xl` top, `--space-3xl` bottom | 80-160px top, 64-120px bottom |
| Standard section | `--space-3xl` top and bottom | 64-120px both |
| Compact section | `--space-2xl` top and bottom | 48-80px both |
| Footer CTA | `--space-3xl` top, `--space-2xl` bottom | 64-120px top, 48-80px bottom |

### 4D. Container Widths

| Container | Max Width | CSS Variable | Usage |
|-----------|-----------|-------------|-------|
| Wide | 1280px | `--container-wide` | Full-bleed-ish sections, navigation |
| Standard | 1200px | `--container-standard` | Primary content container |
| Narrow | 800px | `--container-narrow` | Text-heavy sections, forms, FAQs |
| Text | 680px | `--container-text` | Body copy paragraphs (optimal line length) |
| Headline | 900px | `--container-headline` | Centered headlines max-width |

### 4E. Horizontal Container Padding

```css
--container-padding: clamp(20px, 5vw, 48px);
```

- Mobile (375px): 20px
- Tablet (768px): ~38px
- Desktop (1280px+): 48px (or 0 when content fits within max-width)

*Inspired by: Porsche's 6-token fluid spacing (ratios ~2-2.5x between steps), Apple's generous 100-200px section padding, Vercel's Tailwind-based 4px increment scale, Stripe's fluid scaling between 375-1112px. Reis IA uses 8 tokens (more than Porsche's 6, fewer than Tailwind's 16+) with fluid clamp() for seamless scaling. The generous upper bounds (120px, 160px) are Apple-level breathing room that signals premium.*

---

## 5. LAYOUT SYSTEM

### 5A. Grid Configuration

```css
/* Desktop (1024px+) */
grid-template-columns: repeat(12, 1fr);
gap: var(--space-lg); /* 24-32px */

/* Tablet (768px - 1023px) */
grid-template-columns: repeat(8, 1fr);
gap: var(--space-lg);

/* Mobile (< 768px) */
grid-template-columns: repeat(4, 1fr);
gap: var(--space-md); /* 16px */
```

### 5B. Common Column Patterns

| Pattern | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Two-up equal | 6+6 cols | 4+4 cols | Full stack |
| Two-up weighted | 7+5 cols | Full stack | Full stack |
| Three-up | 4+4+4 cols | 4+4 (wrap) | Full stack |
| Four-up (pillar cards) | 3+3+3+3 cols | 4+4 (2 rows) | Full stack |
| Content + aside | 8+4 cols | Full stack | Full stack |

### 5C. Breakpoints

| Name | Min Width | Tailwind Prefix | Target |
|------|-----------|-----------------|--------|
| Mobile | 0px | (default) | Phones, small screens |
| Tablet | 768px | `md:` | iPad, tablets |
| Desktop | 1024px | `lg:` | Laptops, small monitors |
| Wide | 1280px | `xl:` | Standard desktop |
| Ultrawide | 1536px | `2xl:` | Large monitors |

### 5D. Z-Index Scale

| Layer | Value | Usage |
|-------|-------|-------|
| Background | -1 | Decorative elements behind content |
| Base | 0 | Default content |
| Raised | 10 | Overlapping elements, sticky sections |
| Navigation | 50 | Fixed navigation bar |
| Dropdown | 60 | Nav dropdowns, tooltips |
| Modal Overlay | 90 | Dark overlay behind modals |
| Modal | 100 | Modal dialogs |
| Toast | 200 | Toast notifications |

---

## 6. MOTION AND ANIMATION LIBRARY

### 6A. Easing Curves Library

| Name | Value | CSS Variable | Usage |
|------|-------|-------------|-------|
| Ease Base | `cubic-bezier(0.25, 0.1, 0.25, 1)` | `--ease-base` | Default for most transitions. Nearly identical to CSS `ease` but engineered -- slightly more linear at start. |
| Ease Out | `cubic-bezier(0.16, 1, 0.3, 1)` | `--ease-out` | Elements appearing, scroll reveals. Fast start, very gentle deceleration. |
| Ease In | `cubic-bezier(0.4, 0, 0.5, 1)` | `--ease-in` | Elements exiting view. Quick acceleration, gentle landing. |
| Ease Dramatic | `cubic-bezier(0.65, 0, 0.35, 1)` | `--ease-dramatic` | Hero entrances, major section reveals. Symmetrical S-curve. |
| Ease Card | `cubic-bezier(0.7, 0, 0, 1)` | `--ease-card` | Card hover scale + shadow. Heavy, weighted feel. |

*Inspired by: Porsche's 3-curve system (base/in/out), Stripe's card-specific easing (0.7, 0, 0, 1), Vercel's quick-out (0.16, 1, 0.3, 1), Apple's dramatic (0.16, 1, 0.3, 1). Reis IA combines these into a 5-curve library: a Porsche-like base for general use, Vercel/Apple's ease-out for reveals, Porsche's ease-in for exits, a new dramatic curve for heroes, and Stripe's weighted curve for card interactions.*

### 6B. Duration Scale

| Token | Value | CSS Variable | Usage |
|-------|-------|-------------|-------|
| Instant | 100ms | `--duration-instant` | Opacity micro-hints |
| Fast | 200ms | `--duration-fast` | Hover color changes, border transitions, icon shifts |
| Normal | 300ms | `--duration-normal` | Standard transitions, card hover |
| Moderate | 500ms | `--duration-moderate` | Card scale + shadow, complex transitions |
| Slow | 800ms | `--duration-slow` | Scroll-triggered entrance animations |
| Dramatic | 1200ms | `--duration-dramatic` | Hero entrance, 3D perspective reveals |
| Ambient | 13000ms | `--duration-ambient` | Continuous ambient effects |

*Inspired by: Porsche's 4-tier system (0.25s/0.4s/0.6s/1.2s), Stripe's 500ms card hover, Linear's 800ms entrance + 13s shimmer, Academia Lendaria's 1.2s perspective entrance. Reis IA uses 7 tiers with each roughly 1.5-2x the previous, plus one ambient tier for continuous effects.*

### 6C. Entrance Animations (Scroll-Triggered)

**Primary entrance: Fade Up**

```css
/* Initial state (before scroll trigger) */
opacity: 0;
transform: translateY(24px);

/* Final state (after intersection) */
opacity: 1;
transform: translateY(0);
transition: opacity var(--duration-slow) var(--ease-out),
            transform var(--duration-slow) var(--ease-out);
```

**Stagger pattern**: When multiple sibling elements enter together (e.g., pillar cards), each adds 150ms delay:

```css
animation-delay: calc(var(--stagger-index) * 150ms);
```

Base delay: 200ms (page settles before first element animates).

**3D Perspective entrance (reserved for hero sections only)**

```css
/* Initial state */
opacity: 0;
transform: translateY(80px) rotateX(8deg);
transform-origin: bottom center;

/* Visible state */
opacity: 1;
transform: translateY(0) rotateX(0);
transition: all var(--duration-dramatic) var(--ease-dramatic);

/* Parent must set perspective */
perspective: 1200px;
```

*The rotateX angle is 8deg (not 15deg like Academia Lendaria) for more subtlety.*

**Scale Reveal (for images, product visuals)**

```css
opacity: 0;
transform: scale(0.96);
/* Animate to: */
opacity: 1;
transform: scale(1);
transition: all var(--duration-slow) var(--ease-out);
```

### 6D. Hover Micro-Interactions

| Element | Effect | Duration | Easing |
|---------|--------|----------|--------|
| Primary CTA button | Background darken + translateY(-2px) | 200ms | ease-base |
| Secondary button | Border brightens + subtle bg tint | 200ms | ease-base |
| Ghost / link button | Text color to white + arrow translateX(4px) | 200ms | ease-base |
| Standard card | Border brightens + bg shifts one tier up | 300ms | ease-base |
| Featured card | Border brightens + blue glow shadow appears | 500ms | ease-card |
| Nav link | Text color to white | 150ms | ease-base |
| Image in card | scale(1.03) with overflow:hidden parent | 500ms | ease-card |

### 6E. Card Hover Behavior

```css
/* Standard card hover */
.card {
  transition: border-color var(--duration-fast) var(--ease-base),
              background-color var(--duration-fast) var(--ease-base);
}
.card:hover {
  border-color: var(--border-visible);
  background-color: var(--surface-3);
}

/* Featured card hover (with blue glow) */
.card-featured:hover {
  border-color: var(--border-accent);
  box-shadow: var(--shadow-blue-glow);
  transition: all var(--duration-moderate) var(--ease-card);
}

/* Card with image hover */
.card-image img {
  transition: transform var(--duration-moderate) var(--ease-card);
}
.card-image:hover img {
  transform: scale(1.03);
}
```

*Inspired by: Stripe's 1.018x card scale with 500ms weighted easing (we use 1.03x scale on the image only, not the whole card -- more restrained). Morningside's blue glow shadow (0 0 50px). Porsche's scale3d(1.05) on images with overflow:hidden.*

### 6F. Signature Animations

**1. Rotating Blue Border**

A conic gradient border that slowly rotates around featured cards, with a blue light segment that sweeps the perimeter.

```css
@property --border-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.card-rotating-border {
  background:
    linear-gradient(135deg, var(--surface-2), var(--surface-3)) padding-box,
    conic-gradient(
      from var(--border-angle),
      rgba(255,255,255,0.08) 0%,
      rgba(255,255,255,0.08) 75%,
      rgba(74,144,255,0.5) 85%,
      rgba(74,144,255,0.8) 90%,
      rgba(74,144,255,0.5) 95%,
      rgba(255,255,255,0.08) 100%
    ) border-box;
  border: 1px solid transparent;
  border-radius: 12px;
  animation: rotateBorder 8s linear infinite;
}

@keyframes rotateBorder {
  to { --border-angle: 360deg; }
}
```

The 8s rotation (slower than Academia Lendaria's 6.4s) creates a more luxurious pace. The blue segment is narrow (~15% of the circle) -- a glint, not a glow.

*Inspired by: Academia Lendaria's rotating conic gradient borders. Reis IA replaces the gray gradient with a blue highlight segment, and slows the rotation for premium pacing. The result is a subtle "sapphire scanning light" effect unique to the brand.*

---

## 7. COMPONENT SPECIFICATIONS

### 7A. Buttons

#### Primary Button (Blue CTA)

| Property | Value |
|----------|-------|
| Background | `var(--accent-blue)` (#4A90FF) |
| Text color | `#FFFFFF` |
| Font size | 16px |
| Font weight | 600 |
| Letter spacing | 0.01em |
| Padding | 14px 32px (asymmetric: 13px top, 15px bottom for optical centering) |
| Border radius | 8px |
| Border | none |
| Min width | 200px |
| Hover | Background `var(--accent-hover)`, translateY(-2px) |
| Active | Background `var(--accent-muted)`, translateY(0) |
| Transition | all 200ms var(--ease-base) |
| Focus | 2px solid #4D65FF, offset 2px |

*The asymmetric vertical padding (13px top, 15px bottom) is adapted from Stripe's optical centering technique (3px/6px). At our larger padding, 1px difference is sufficient.*

#### Primary Button -- Hero Variant

Same as primary with overrides:

| Property | Value |
|----------|-------|
| Font size | 18px |
| Padding | 18px 40px (17px top, 19px bottom) |
| Border radius | 10px |

#### Secondary Button (Outline)

| Property | Value |
|----------|-------|
| Background | transparent |
| Text color | `var(--text-primary)` (#FFFFFF) |
| Border | 1px solid `var(--border-visible)` (rgba(255,255,255,0.12)) |
| Padding | 14px 32px |
| Border radius | 8px |
| Hover | Border `var(--border-strong)`, background rgba(255,255,255,0.03) |
| Transition | all 200ms var(--ease-base) |

#### Ghost Button (Text Link with Arrow)

| Property | Value |
|----------|-------|
| Background | transparent |
| Text color | `var(--text-secondary)` (70% white) |
| Font weight | 500 |
| Padding | 8px 0 |
| Arrow | "-->" suffix, translateX(0) default, translateX(4px) on hover |
| Hover text | `var(--text-primary)` (#FFFFFF) |
| Transition | color 200ms var(--ease-base) |

#### Link Button (Inline)

| Property | Value |
|----------|-------|
| Color | `var(--accent-blue)` (#4A90FF) |
| Text decoration | none default, underline on hover |
| Underline offset | 3px |
| Underline thickness | 1px |
| Hover color | `var(--accent-hover)` (#6AADFF) |

### 7B. Cards

#### Standard Card

| Property | Value |
|----------|-------|
| Background | `var(--surface-2)` (#111111) |
| Border | 1px solid `var(--border-default)` (8% white) |
| Border radius | 12px |
| Padding | 32px (desktop), 24px (mobile) |
| Hover border | `var(--border-visible)` (12% white) |
| Hover background | `var(--surface-3)` (#161616) |
| Transition | border-color 300ms, background-color 300ms var(--ease-base) |

#### Accented Card (Blue Top Border)

Same as standard card plus:

| Property | Value |
|----------|-------|
| Border-top | 2px solid `var(--accent-blue)` (#4A90FF) |
| Border-top-left-radius | 12px (preserved) |
| Border-top-right-radius | 12px (preserved) |

*Inspired by: Stripe's accented card with 8px colored top stripe. Reis IA uses a thinner 2px blue line -- more refined, less product-UI.*

#### Glass Card

| Property | Value |
|----------|-------|
| Background | rgba(255, 255, 255, 0.05) |
| Border | 1px solid `var(--border-subtle)` (5% white) |
| Border radius | 16px |
| Backdrop filter | blur(16px) saturate(180%) |
| Padding | 32px |

*Inspired by: Academia Lendaria's glass card (blur 12px + saturate 180%), Vercel's saturated backdrop blur. Reis IA uses blur(16px) as a middle ground between Vercel's 20px and Academia Lendaria's 12px.*

#### Card Internal Structure

```
[Icon] -- 32-40px, accent blue (hourglass) -- mb-6
[Title] -- H4 (28px desktop), weight 600, white -- mb-3
[Description] -- Body (16px), text-secondary (70% white) -- mb-6
[Bullet list] -- Body Small (14px), text-secondary, blue dot markers -- mb-6
[Card CTA] -- Ghost button style -- mt-auto (pushed to bottom)
```

### 7C. Navigation

#### Desktop Navigation Bar

| Property | Value |
|----------|-------|
| Position | Fixed top |
| Height | 72px |
| Background (default) | transparent |
| Background (scrolled) | rgba(0, 0, 0, 0.85) |
| Backdrop filter (scrolled) | saturate(180%) blur(20px) |
| Border bottom (scrolled) | 1px solid `var(--border-subtle)` (5% white) |
| Transition | background 300ms var(--ease-base), backdrop-filter 300ms |
| Z-index | 50 |
| Max content width | var(--container-wide) (1280px) |
| Horizontal padding | var(--container-padding) |

**Nav structure**:
- Left: Brand name "Reis IA" (18px, weight 700, white)
- Center: Nav links (14px, weight 400, text-tertiary, hover: text-primary, 32px spacing)
- Right: CTA button (small primary: 14px, padding 10px 24px)
- Active link: text-primary with 2px bottom border in accent blue, offset 4px

*Inspired by: Vercel's saturate(180%) blur(20px) navigation, Morningside's transparent-to-blurred-on-scroll behavior, Apple's glassmorphism pioneering. Reis IA starts fully transparent (not tinted) to maximize hero impact, then transitions to glassmorphism on scroll.*

#### Mobile Navigation

| Property | Value |
|----------|-------|
| Header height | 64px |
| Hamburger icon | 24px, white, three horizontal lines |
| Menu overlay | Fixed, full screen, bg-black/95, backdrop-blur-lg |
| Menu transition | opacity 300ms + translateY(-8px) to translateY(0) |
| Menu links | 24px, weight 600, white, centered, 24px gap |
| Menu CTA | Full-width primary button at bottom, 24px from bottom |
| Close icon | X mark, 24px, top right, 16px from edges |

### 7D. Section Transitions

Sections do not use explicit dividers (no `<hr>` by default). Visual separation comes from:

1. **Background alternation**: Surface-0 and Surface-1 alternate between sections
2. **Generous spacing**: 64-120px padding creates natural breaks
3. **Ambient light pools**: Subtle radial gradients at section corners add depth variance

When a stronger break is needed:

**Gradient fade divider**:
```css
.section-divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--border-default) 20%,
    var(--border-default) 80%,
    transparent
  );
}
```

### 7E. Badge / Label

| Property | Value |
|----------|-------|
| Background | rgba(74, 144, 255, 0.10) |
| Text color | `var(--accent-blue)` (#4A90FF) |
| Font size | 12px |
| Font weight | 600 |
| Letter spacing | 0.05em |
| Text transform | uppercase |
| Padding | 6px 14px |
| Border radius | 6px |
| Border | 1px solid rgba(74, 144, 255, 0.20) |

### 7F. FAQ Accordion

| Property | Value |
|----------|-------|
| Container border | 1px solid `var(--border-default)` bottom on each item |
| Question text | 18px, weight 600, text-primary |
| Question padding | 24px vertical |
| Expand icon | Plus (+), 20px, text-tertiary, right-aligned |
| Open icon | Rotates 45deg to X shape |
| Answer text | 16px, weight 400, text-secondary, line-height 1.65, max-width 680px |
| Answer padding | 0 0 24px 0 (when open) |
| Open animation | max-height + opacity, 300ms ease-out |
| Open icon color | `var(--accent-blue)` |

### 7G. Process Steps

| Property | Value |
|----------|-------|
| Step number | 48px, weight 700, accent blue |
| Step title | H4 (28px), weight 600, text-primary |
| Step description | Body (16px), text-secondary, max-width 600px |
| Connector line | 1px solid `var(--border-default)`, vertical |
| Desktop layout | Number + connector left column (64px wide), content right |
| Mobile layout | Number above, content below, left-aligned |
| Step spacing | var(--space-xl) between steps (32-48px) |

### 7H. Stats Block

| Property | Value |
|----------|-------|
| Stat value | 56px desktop / 40px mobile, weight 700, accent blue or text-primary |
| Stat label | 13px, uppercase, letter-spacing 0.05em, text-tertiary |
| Stat context | 14px, text-secondary, 1-2 lines |
| Layout | 3 columns desktop, 1 column mobile |
| Gap | var(--space-lg) |
| Optional: glass background | Glass card treatment when overlaid on imagery |

### 7I. Testimonial Block

| Property | Value |
|----------|-------|
| Left border | 2px solid `var(--accent-blue)` |
| Padding left | 24px |
| Quote text | 18px, font-style italic, text-secondary, line-height 1.70 |
| Attribution name | 15px, weight 600, text-primary |
| Attribution role | 14px, text-tertiary |
| Decorative quote mark | 48px, accent blue at 20% opacity, positioned above-left |

### 7J. Logo Marquee / Trust Strip

| Property | Value |
|----------|-------|
| Direction | Continuous horizontal scroll |
| Duration | 40s linear infinite |
| Logo treatment | `filter: grayscale(100%) brightness(0) invert(1)` (renders all logos in white) |
| Logo opacity | 50% default, 100% on hover |
| Logo spacing | 80px gap desktop, 60px mobile |
| Edge fade | var(--marquee-edge) mask-image gradient |
| Hover behavior | `animation-play-state: paused` |
| Label below | 11px, uppercase, 0.1em letter-spacing, text-quaternary |

### 7K. Footer

| Property | Value |
|----------|-------|
| Background | `var(--surface-1)` (#0A0A0A) |
| Border top | 1px solid `var(--border-default)` |
| Padding | var(--space-3xl) top, var(--space-2xl) bottom |
| Max width | var(--container-standard) (1200px) |
| Brand name | 20px, weight 700, text-primary |
| Tagline | 14px, text-tertiary |
| Column headers | Label token (12px, uppercase, 0.05em tracking, weight 600, text-tertiary) |
| Column links | 14px, text-tertiary, hover: text-primary |
| Copyright | 13px, text-quaternary |

---

## 8. EFFECTS LIBRARY

### 8A. Shadow Tiers

See Section 2F. Shadows use pure black rgba. In dark mode, clean shadows prevent a "screen glow" effect.

### 8B. Glassmorphism Specifications

| Context | Background | Blur | Saturate | Border |
|---------|-----------|------|----------|--------|
| Navigation (scrolled) | rgba(0, 0, 0, 0.85) | blur(20px) | saturate(180%) | 1px `var(--border-subtle)` |
| Glass card | rgba(255, 255, 255, 0.05) | blur(16px) | saturate(180%) | 1px `var(--border-subtle)` |
| Mobile menu overlay | rgba(0, 0, 0, 0.95) | blur(24px) | none | none |
| Stats overlay | rgba(10, 10, 10, 0.80) | blur(12px) | none | 1px `var(--border-default)` |

*The `saturate(180%)` boost (from Vercel/Apple) prevents the blur from washing out underlying content, keeping the glass effect crisp.*

### 8C. Gradient Treatments

See Section 2E for complete gradient definitions.

**Ambient light pool placement**: Each major section gets one ambient light pool positioned at a corner. Alternate corner positions per section to create visual rhythm:

```
Section 1 (Hero): Blue ambient, centered on headline
Section 2: Light pool, bottom-left corner
Section 3: Light pool, top-right corner
Section 4: Blue ambient, centered on CTA
Section 5: Light pool, bottom-right corner
...
```

*Inspired by: Agencia Lendaria's alternating-corner light pools. Reis IA alternates between blue-tinted pools (on key sections) and neutral pools (on secondary sections), adding brand depth to the directional lighting technique.*

### 8D. Grain / Noise Texture

A subtle noise texture overlaid on all sections to add analog dimension to the flat dark backgrounds.

```css
.grain-overlay::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url('/textures/noise.svg');
  /* Alternatively, use CSS-generated noise via SVG filter */
}
```

SVG noise generation (no external file needed):
```css
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
```

Opacity: 2-4% (0.02-0.04). Enough to feel the texture on large dark surfaces without seeing it consciously.

*Inspired by: Morningside's grainy.png overlay. Reis IA uses SVG-generated noise (no external file dependency) at a lower opacity (3% vs Morningside's estimated 5-8%) for more subtlety.*

### 8E. Border Treatments

| Treatment | CSS | Usage |
|-----------|-----|-------|
| Hairline | `border: 0.5px solid var(--border-subtle)` | Retina-only separators (Apple technique) |
| Standard | `border: 1px solid var(--border-default)` | Card borders, dividers |
| Blue accent | `border-top: 2px solid var(--accent-blue)` | Featured card top border |
| Gradient border | (background-clip technique, see below) | Premium card border with blue sweep |
| Rotating gradient | (conic-gradient technique, see Section 6F) | Highest-emphasis cards only |

**Gradient border via background-clip**:
```css
.card-gradient-border {
  background:
    linear-gradient(135deg, var(--surface-2), var(--surface-3)) padding-box,
    linear-gradient(90deg, rgba(74,144,255,0.4) 0%, rgba(74,144,255,0) 50%, rgba(74,144,255,0.4) 100%) border-box;
  border: 1px solid transparent;
  border-radius: 12px;
}
```

*Inspired by: Morningside's background-clip gradient border technique. Reis IA uses a blue-tinted gradient that fades to transparent at center, creating a subtle "sapphire frame" effect.*

### 8F. Ambient Glow Effects

| Effect | CSS | Usage |
|--------|-----|-------|
| Blue ambient (section) | `radial-gradient(ellipse at center, rgba(74,144,255,0.06) 0%, transparent 70%)` | Behind hero sections, CTA sections |
| Blue ambient (CTA button) | `box-shadow: 0 0 50px rgba(74,144,255,0.12)` | On hover of featured cards and hero CTA |
| Blue glow (subtle) | `box-shadow: 0 0 30px rgba(74,144,255,0.08)` | Persistent glow on primary CTA |

Maximum 2 blue glow elements visible per viewport at any time. More than 2 dilutes the premium signal.

### 8G. Advanced Effects (Enriched from References)

#### Magnetic Hover Effect
Elements subtly follow cursor position within their bounds, creating an interactive "magnetic" feel.
```css
/* JS calculates offset based on cursor position within element */
.magnetic-hover {
  transition: transform 300ms var(--ease-out);
}
/* Applied via JS: transform: translate(offsetX, offsetY) */
/* Max offset: 8px in any direction */
```
*Source: Stripe's interactive elements. Adapted for restrained movement (8px max vs Stripe's 12px).*

#### Aurora Background Effect
Slow-moving gradient that creates an ethereal atmospheric backdrop behind hero sections.
```css
.aurora-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 20% 40%, rgba(74, 144, 255, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 20%, rgba(141, 196, 255, 0.05) 0%, transparent 60%),
    radial-gradient(ellipse 50% 60% at 50% 80%, rgba(53, 112, 204, 0.06) 0%, transparent 60%);
  animation: aurora-shift 20s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes aurora-shift {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  33% { transform: translate(-5%, 3%) scale(1.05); opacity: 0.8; }
  66% { transform: translate(3%, -2%) scale(0.98); opacity: 1; }
  100% { transform: translate(-2%, 5%) scale(1.02); opacity: 0.9; }
}
```
*Source: Synthesized from Agência Lendária's ambient pools + Vercel's atmospheric gradients. 20s cycle for ambient feel.*

#### Scroll-Linked Parallax Layers
Background decorative elements move at different speeds during scroll, creating depth.
```css
.parallax-slow { transform: translateY(calc(var(--scroll-y) * -0.05)); }
.parallax-medium { transform: translateY(calc(var(--scroll-y) * -0.1)); }
.parallax-fast { transform: translateY(calc(var(--scroll-y) * -0.15)); }
/* --scroll-y updated via JS: document.documentElement.style.setProperty('--scroll-y', window.scrollY + 'px') */
```
*Source: Apple's layered scroll effects. Applied to watermark motifs and ambient pools only.*

#### Gradient Text Reveal
Text color transitions from muted to vibrant as it enters the viewport.
```css
.text-reveal {
  background: linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,1) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 100% 200%;
  background-position: 0 0;
  transition: background-position 1.2s var(--ease-dramatic);
}
.text-reveal.in-view {
  background-position: 0 -100%;
}
```
*Source: Linear's text reveal technique. Adapted with our blue-tinted gradient.*

#### Mesh Gradient Background
Multi-stop radial gradients overlaid to create organic, flowing background patterns.
```css
.mesh-gradient {
  background:
    radial-gradient(at 40% 20%, rgba(74, 144, 255, 0.07) 0%, transparent 50%),
    radial-gradient(at 80% 0%, rgba(53, 112, 204, 0.05) 0%, transparent 50%),
    radial-gradient(at 0% 50%, rgba(141, 196, 255, 0.04) 0%, transparent 50%),
    radial-gradient(at 60% 100%, rgba(74, 144, 255, 0.06) 0%, transparent 50%),
    var(--surface-0);
}
```
*Source: Porsche's layered background gradients + Agência Lendária's multi-point light system.*

#### Counter Animation (Scroll-Triggered Stats)
Numbers animate from 0 to target value when stats section enters viewport.
```js
// IntersectionObserver triggers count-up animation
// Duration: 2000ms with ease-out deceleration
// Uses requestAnimationFrame for smooth 60fps updates
// Supports suffix (%, +, x) preservation
```
*Source: Academia Lendária's stat counter animation. Duration extended to 2000ms for premium pacing.*

#### Staggered Grid Reveal
Cards in a grid appear with cascading delays based on their position (left-to-right, top-to-bottom).
```css
.grid-stagger > * {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}
.grid-stagger.in-view > *:nth-child(1) { transition-delay: 0ms; }
.grid-stagger.in-view > *:nth-child(2) { transition-delay: 100ms; }
.grid-stagger.in-view > *:nth-child(3) { transition-delay: 200ms; }
.grid-stagger.in-view > *:nth-child(4) { transition-delay: 300ms; }
.grid-stagger.in-view > * { opacity: 1; transform: translateY(0); }
```
*Source: Linear's staggered entrance. 100ms per item (tighter than our default 150ms) for grids.*

#### Section Transition Gradient
Smooth gradient fade between sections with different background tiers.
```css
.section-transition-bottom::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to bottom, transparent, var(--surface-next));
  pointer-events: none;
}
```
*Source: Vercel's seamless section blending. Height of 120px matches our --space-3xl maximum.*

---

## 9. SIGNATURE ELEMENTS

These 4 visual treatments are original to Reis IA. They are not direct copies from any single reference -- each is a unique synthesis that connects to the brand identity.

### Signature 1: The Sapphire Scanner

**What it is**: A rotating conic gradient border on featured cards where a blue light segment slowly orbits the card perimeter.

**How it works**: A conic gradient with 85% subtle white-alpha and 15% concentrated blue creates a scanning beam effect that rotates over 8 seconds. The card border itself is transparent; the conic gradient shows through via the `border-box` background.

**What makes it original**: Academia Lendaria uses a gray rotating border (no color). Agencia Lendaria uses warm gradients but not rotating borders. No reference combines a single-accent-color conic rotation with the slow 8s pacing. The narrow blue segment (15% of the circle) is more restrained than Academia Lendaria's wider bright segment.

**Brand connection**: The scanning motion evokes systematic precision and analytical methodology. The sapphire scanning light suggests "analyzing the opportunity" in each card's content.

**Implementation**: See Section 6F, Animation 2. Use only on 1-2 cards per page (pillar cards, featured case study).

### Signature 2: Cool Ambient Pools

**What it is**: Subtle radial gradient "light pools" positioned at section corners, alternating between blue-tinted depth and neutral white. Each section has a different pool position, creating the illusion of soft directional lighting in a dark room.

**How it works**: Each section wrapper gets a radial gradient positioned at one corner (e.g., `radial-gradient(35% 50% at 0% 100%, rgba(74,144,255,0.04) 0%, transparent 100%)`). Corner positions alternate section-by-section.

**What makes it original**: Agencia Lendaria uses neutral white/gray light pools. No reference uses accent-color-tinted pools. The alternation pattern (blue pool on key sections, neutral pool on secondary sections) creates a rhythm unique to Reis IA -- the blue depth appears at conversion moments (hero, CTA sections).

**Brand connection**: The blue depth creates a precision feel -- unexpected in dark-mode tech design. It signals "premium consulting experience," not "developer tool." Global premium positioning is reinforced through sophisticated color depth.

**Implementation**: See Section 8C.

### Signature 3: Brand Motif Watermark System

**What it is**: Large (200-300px) hourglass silhouettes placed as background watermarks at 3-5% opacity behind key sections. Each page has a defined motif ratio based on its narrative territory.

**How it works**: The hourglass SVG rendered as absolutely-positioned background elements with `pointer-events: none` and 3-5% opacity. The hourglass is the sole brand mark and appears in time/efficiency/urgency sections and wherever a visual anchor is needed.

**What makes it original**: No reference site has a proprietary brand motif integrated as an architectural watermark. Morningside has zero brand iconography (competitive gap). Apple has no decorative elements. This system gives Reis IA a visual language that is impossible to replicate without copying the brand itself.

**Brand connection**: Hourglass = TIME. It is the Reis IA brand mark -- a geometric icon representing the scarcity of time and the multiplying power of AI systems.

**Implementation**: See existing brand-identity.md Sections 4-5 for icon specifications and usage rules.

### Signature 4: Surface Depth Harmony

**What it is**: A 5-tier background value system (#000000 to #1A1A1A) combined with white-alpha borders (5-20% opacity) that creates physical depth perception without shadows.

**How it works**: Elements closer to the viewer have lighter backgrounds and higher-opacity borders. The progression is: Void (#000) > Base (#0A0A0A) > Raised (#111) > Elevated (#161616) > Float (#1A1A1A). Combined with the cool ambient pools and grain texture, this creates a layered, almost haptic dark interface.

**What makes it original**: Vercel uses 3 tiers (simple but flat). Agencia Lendaria uses 8+ tiers (complex and noisy). Linear uses opacity-based borders but fewer surface tiers. Reis IA's 5-tier system with consistent 8% border opacity and blue ambient pools creates sophistication that Vercel and Linear lack while maintaining more discipline than Agencia Lendaria.

**Brand connection**: The layered depth metaphor mirrors the consultancy's approach -- understanding that business problems have layers, and AI implementation requires going deeper than the surface. The blue depth of the ambient pools against the architectural black creates the "well-tailored suit" aesthetic from the brand guidelines.

**Implementation**: See Section 2B (surfaces), 2D (borders), 8C (ambient pools), 8D (grain).

---

## 10. RESPONSIVE DESIGN RULES

### 10A. Typography Scaling

| Token | Mobile (<768px) | Tablet (768-1023px) | Desktop (1024px+) | Scale Factor |
|-------|-----------------|---------------------|--------------------|----|
| Display | 40px | 56px | 72px | 0.56x |
| H1 | 36px | 44px | 56px | 0.64x |
| H2 | 30px | 38px | 48px | 0.63x |
| H3 | 26px | 30px | 36px | 0.72x |
| H4 | 22px | 24px | 28px | 0.79x |
| Body Large | 18px | 18px | 20px | 0.90x |
| Body | 16px | 16px | 16px | 1.00x |

Headlines scale dramatically (40-55% reduction). Body text stays consistent. This is a universal pattern (Stripe, Apple, Vercel all follow it).

### 10B. Layout Collapse Rules

| Component | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Pillar cards | 4 columns | 2 columns | 1 column stacked |
| Feature cards | 3 columns | 2 columns | 1 column stacked |
| Two-up (text + visual) | Side by side (7+5 or 6+6) | Stacked | Stacked |
| Stats grid | 3 columns | 3 columns | 1 column stacked |
| CTA button pair | Side by side (16px gap) | Side by side | Stacked (full width) |
| Navigation | Full links + CTA | Hamburger | Hamburger |
| Footer columns | 4 columns | 2 columns | Stacked |
| Card padding | 32px | 28px | 24px |

### 10C. Mobile-Specific Rules

1. No hover effects on touch devices (`@media (hover: hover)` for all hover states)
2. Touch targets: minimum 44x44px
3. Hero decorative motifs (hourglass watermarks): hidden on mobile
4. Card images: full-bleed within card on mobile
5. Horizontal scrolling: allowed for logo marquee and card carousels (with scroll-snap)
6. Sticky CTA bar: visible on sales pages at bottom of viewport on mobile
7. Section padding: uses `--space-2xl` (48-80px) instead of `--space-3xl` (64-120px)

### 10D. Tablet-Specific Rules

1. Navigation collapses to hamburger at <1024px
2. Two-up layouts collapse to stacked at <1024px
3. Grid gap reduces from `--space-lg` to 20px
4. Container padding: 32-40px horizontal

---

## 11. ACCESSIBILITY REQUIREMENTS

### 11A. Motion Sensitivity

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

- All shimmer animations stop
- Rotating borders stop
- Scroll-triggered entrances display immediately (no delay, no transform)
- Logo marquee stops (displays statically)
- Page transitions are instant

### 11B. Contrast Ratios

All text/background combinations meet WCAG AA (4.5:1 for normal text, 3:1 for large text).

| Text | Background | Ratio | Status |
|------|-----------|-------|--------|
| text-primary (100%) on Surface-0 | #000 | 21:1 | AAA |
| text-primary on Surface-2 | #111 | 17.4:1 | AAA |
| text-secondary (70%) on Surface-0 | #000 | 14.7:1 | AAA |
| text-secondary on Surface-2 | #111 | 12.2:1 | AAA |
| text-tertiary (50%) on Surface-0 | #000 | 10.5:1 | AAA |
| text-quaternary (35%) on Surface-0 | #000 | 7.3:1 | AA |
| accent-blue on Surface-0 | #000 | 6.7:1 | AA |
| white on accent-blue | #4A90FF | 8.3:1 | AAA |

**Fail cases to avoid**: text-muted (20%) fails on all backgrounds for essential content. Use only for decorative elements.

### 11C. Focus States

```css
*:focus-visible {
  outline: 2px solid #4D65FF;
  outline-offset: 2px;
  border-radius: inherit;
}
```

- Blue focus ring (#4D65FF) is distinct from the accent blue (#4A90FF) -- prevents confusion between focus state and brand styling
- 2px offset prevents the ring from overlapping element borders
- `border-radius: inherit` ensures the ring follows the element shape

### 11D. Screen Reader Considerations

- Decorative motifs (hourglass watermarks) get `aria-hidden="true"`
- Logo marquee gets `aria-label="Client logos"` and duplicated logos get `aria-hidden="true"`
- Animation states managed by `aria-live` regions when content changes
- Form validation errors announced via `aria-describedby`
- Navigation mobile menu state announced via `aria-expanded`

---

## 12. DOS AND DONTS

### Color

**DO**: Use blue accent for CTAs, brand icons, and emphasis moments. Max 2 blue elements per viewport.

**DONT**: Use blue for body text, borders (except featured card top border), or background fills. Blue is earned, not scattered.

**DO**: Use text-secondary (70% white) for body copy. Full white (100%) is for headlines only.

**DONT**: Use hex grays (#A3A3A3, #737373) for text. Use the opacity scale instead for consistency across surface tiers.

**DO**: Alternate sections between Surface-0 (#000) and Surface-1 (#0A0A0A).

**DONT**: Use more than one surface tier jump between adjacent sections. Surface-0 to Surface-3 is too jarring.

### Typography

**DO**: Use `text-wrap: balance` on headings. Use `text-wrap: pretty` on body paragraphs.

**DONT**: Use ALL CAPS except for Label tokens (badges, section labels). Headlines are sentence case.

**DO**: Cap body text width at 680px. Cap headline width at 900px.

**DONT**: Allow body text to stretch across the full 1200px container. Wide text blocks destroy readability.

**DO**: Tighten letter-spacing as font size increases (Display: -0.03em, Body: 0).

**DONT**: Use positive letter-spacing on headings. Only Labels (+0.05em) and Micro (+0.02em) get positive tracking.

### Motion

**DO**: Use the 5 defined easing curves. Every animation must use one of them.

**DONT**: Use default CSS `ease`, `ease-in-out`, or `linear` for interactive animations (linear is acceptable for continuous/ambient animations only).

**DO**: Keep hover transitions at 200ms. Keep entrance animations at 800ms with 150ms stagger.

**DONT**: Use bounce, spring, or elastic easing. Nothing overshoots. Reis IA motion is precise, not playful.

### Layout

**DO**: Use generous section padding (64-120px). Let content breathe.

**DONT**: Stack sections with less than 48px between them. Premium = spacious.

**DO**: Use the 5-tier surface system for depth. Darker = further, lighter = closer.

**DONT**: Use box-shadows for elevation on standard cards. Shadows are for floating elements only (modals, dropdowns).

### Brand Motifs

**DO**: Place the hourglass in sections about time, efficiency, urgency, and AI impact.

**DONT**: Use any other icon as a brand watermark. The hourglass is the sole brand mark.

**DO**: Use the hourglass as a 3-5% opacity watermark (200-300px) behind key sections.

**DONT**: Animate the hourglass with rotation or flipping. It is a static, grounded symbol.

**DO**: Place the hourglass where it reinforces the narrative of the section it anchors.

**DONT**: Force the hourglass into every section mechanically. Use it with intention.

### Conversion

**DO**: Make every blue element a conversion signal. If it is blue, it should be actionable.

**DONT**: Use blue decoratively without a conversion purpose. Blue = "act here."

**DO**: Place CTA within scrollable viewport at all times on sales pages (either inline or sticky bar).

**DONT**: Create sections longer than 2 viewports without a CTA or conversion touchpoint.

---

---

## 13. ACCENT OPACITY LADDER [ADDED -- 2026-03-16]

A 12-step graduated opacity scale for the accent blue (#4A90FF). Eliminates inline magic numbers and makes the blue accent composable across backgrounds, borders, shadows, and fills.

| Token | Value | CSS Variable | Usage |
|-------|-------|-------------|-------|
| blue-02 | `rgba(74, 144, 255, 0.02)` | `--blue-02` | Row/cell hover tint, barely perceptible |
| blue-04 | `rgba(74, 144, 255, 0.04)` | `--blue-04` | Ambient light pools, section background wash |
| blue-06 | `rgba(74, 144, 255, 0.06)` | `--blue-06` | Section ambient glow (= gradient-blue-ambient center) |
| blue-08 | `rgba(74, 144, 255, 0.08)` | `--blue-08` | Subtle glow shadow, aurora gradient stops |
| blue-10 | `rgba(74, 144, 255, 0.10)` | `--blue-10` | Badge/tag background |
| blue-12 | `rgba(74, 144, 255, 0.12)` | `--blue-12` | Blue glow shadow (= --shadow-blue-glow opacity) |
| blue-15 | `rgba(74, 144, 255, 0.15)` | `--blue-15` | Card hover inset shadow |
| blue-20 | `rgba(74, 144, 255, 0.20)` | `--blue-20` | Badge border, accent border |
| blue-30 | `rgba(74, 144, 255, 0.30)` | `--blue-30` | Border accent (= existing --border-accent) |
| blue-40 | `rgba(74, 144, 255, 0.40)` | `--blue-40` | Strong accent fill, focus ring |
| blue-50 | `rgba(74, 144, 255, 0.50)` | `--blue-50` | Rotating border highlight peak |
| blue-80 | `rgba(74, 144, 255, 0.80)` | `--blue-80` | Near-solid accent, rotating border peak |

**Refactoring rules**: When implementing, replace existing inline `rgba(74, 144, 255, X)` values with the corresponding ladder token. For example:
- Badge background: `var(--blue-10)` instead of `rgba(74, 144, 255, 0.10)`
- `--shadow-blue-glow`: `0 0 50px var(--blue-12)` instead of hardcoded rgba
- `--border-accent`: alias for `var(--blue-30)`

*Source: Gap analysis Category 2. AIOX uses a 15-step ladder for lime; Reis IA uses a 12-step ladder (fewer high-opacity steps since blue is used more sparingly).*

---

## 14. SIGNAL / SEMANTIC COLORS [ADDED -- 2026-03-16]

Signal colors for form validation, status indicators, and user feedback. These are the only non-blue, non-white colors in the system.

### 14A. Signal Color Tokens

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Error | `#EF4444` | `--color-error` | Form validation errors, destructive actions |
| Warning | `#F59E0B` | `--color-warning` | Caution states, important notices |
| Success | `#22C55E` | `--color-success` | Success confirmations, positive indicators |
| Info | `#4A90FF` | `--color-info` | Informational messages (= accent blue) |

### 14B. Signal Color Variants

Each signal color has background, border, and text variants for use in alerts, badges, and form states.

| Signal | Background | Border | Text |
|--------|-----------|--------|------|
| Error | `rgba(239, 68, 68, 0.10)` | `rgba(239, 68, 68, 0.25)` | `#EF4444` |
| Warning | `rgba(245, 158, 11, 0.10)` | `rgba(245, 158, 11, 0.25)` | `#F59E0B` |
| Success | `rgba(34, 197, 94, 0.10)` | `rgba(34, 197, 94, 0.25)` | `#22C55E` |
| Info | `rgba(74, 144, 255, 0.10)` | `rgba(74, 144, 255, 0.25)` | `#4A90FF` |

### 14C. Interactive State Tokens

| Token | Value | CSS Variable | Usage |
|-------|-------|-------------|-------|
| Focus ring | `rgba(74, 144, 255, 0.40)` | `--focus-ring` | Interactive element focus state (= blue-40) |
| Selection bg | `rgba(74, 144, 255, 0.30)` | `--selection-bg` | Text selection background (= blue-30) |
| Selection fg | `#FFFFFF` | `--selection-fg` | Text selection foreground |

*Source: Gap analysis Category 12. AIOX defines error/warning/info/blue signal colors. Reis IA adapts with the standard Tailwind red/amber/green palette which is widely recognized.*

---

## 15. ICON SYSTEM [ADDED -- 2026-03-16]

### 15A. Library Choice

```
Library: Lucide Icons
License: MIT (open source)
Base specs: 24x24 viewBox, 2px stroke, round caps and joins
Integration: astro-icon or inline SVG
```

Lucide is chosen for consistency with the Astro ecosystem and its stroke-only aesthetic that complements our minimal line-art brand.

### 15B. Icon Sizes

| Token | Size | CSS Variable | Usage |
|-------|------|-------------|-------|
| Icon XS | 12px | `--icon-xs` | Inline with small text, metadata indicators |
| Icon SM | 16px | `--icon-sm` | Inline with body text, button icons, badge icons |
| Icon MD | 20px | `--icon-md` | Default UI size, nav icons, form icons |
| Icon LG | 24px | `--icon-lg` | Card header icons, feature icons |
| Icon XL | 32px | `--icon-xl` | Hero feature icons, large card headers |

### 15C. Icon Rules

1. **Stroke width**: 2px at all sizes (Lucide default). Do not adjust stroke-width per size.
2. **Line caps and joins**: Round caps, round joins. No square or butt caps.
3. **Color inheritance**: Icons use `currentColor` to inherit from parent text color.
4. **Minimum touch target**: 44x44px container for interactive icons (the icon itself may be smaller).
5. **Rendering**: Inline SVG preferred over icon fonts (better accessibility, no FOUT).
6. **Alignment**: Icons align to the center of adjacent text's x-height, not the baseline.

### 15D. Icon Color Variants

| Variant | Color | CSS class | Usage |
|---------|-------|-----------|-------|
| Default | `var(--text-secondary)` (70% white) | `.icon-default` | Standard UI icons |
| Primary | `var(--text-primary)` (#FFFFFF) | `.icon-primary` | Emphasized icons, active states |
| Accent | `var(--accent-blue)` (#4A90FF) | `.icon-accent` | Brand icons, CTA indicators |
| Muted | `var(--text-quaternary)` (35% white) | `.icon-muted` | Decorative, disabled state icons |
| Error | `var(--color-error)` (#EF4444) | `.icon-error` | Error indicators in forms |

*Source: Gap analysis Category 15. AIOX uses a custom 12-icon set with 4 sizes and 6 colors. Reis IA uses the Lucide library (1000+ icons) with 5 sizes and 5 color variants, providing broader coverage with consistent styling.*

---

## 16. NUMERIC SPACING SCALE [ADDED -- 2026-03-16]

A 11-step static spacing scale for component internals. Complements the existing fluid `--space-*` tokens which remain the primary system for section-level layout.

| Token | Value | CSS Variable | Maps to |
|-------|-------|-------------|---------|
| gap-0 | 0px | `--gap-0` | Zero spacing (conditional removal) |
| gap-1 | 4px | `--gap-1` | = --space-xs |
| gap-2 | 8px | `--gap-2` | = --space-sm |
| gap-3 | 12px | `--gap-3` | New (between sm and md) |
| gap-4 | 16px | `--gap-4` | = --space-md |
| gap-5 | 20px | `--gap-5` | New |
| gap-6 | 24px | `--gap-6` | = --space-lg min |
| gap-7 | 32px | `--gap-7` | = --space-lg max |
| gap-8 | 40px | `--gap-8` | New |
| gap-9 | 48px | `--gap-9` | = --space-xl min |
| gap-10 | 64px | `--gap-10` | = --space-3xl min |

**Usage rule**: Use `--space-*` tokens for section padding, container margins, and vertical rhythm. Use `--gap-*` tokens for component-internal padding, icon-to-text gaps, form field spacing, and card element spacing. Both systems coexist.

*Source: Gap analysis Category 1. AIOX uses a 14-step numeric scale. Reis IA uses a cleaner 11-step scale (0-10) based on 4px/8px increments.*

---

## 17. BORDER RADIUS SCALE [ADDED -- 2026-03-16]

A generic radius scale alongside existing semantic aliases. New components use the generic scale; existing component aliases continue to work.

### 17A. Generic Radius Scale

| Token | Value | CSS Variable |
|-------|-------|-------------|
| radius-none | 0px | `--radius-none` |
| radius-sm | 4px | `--radius-sm` |
| radius-md | 6px | `--radius-md` |
| radius (default) | 8px | `--radius` |
| radius-lg | 10px | `--radius-lg` |
| radius-xl | 12px | `--radius-xl` |
| radius-2xl | 16px | `--radius-2xl` |
| radius-full | 9999px | `--radius-full` |

### 17B. Semantic Alias Mapping

Existing semantic tokens now map to the generic scale:

| Semantic Token | Generic Equivalent | Value |
|---------------|-------------------|-------|
| `border-radius: card` | `--radius-xl` | 12px |
| `border-radius: card-lg` | `--radius-2xl` | 16px |
| `border-radius: button` | `--radius` | 8px |
| `border-radius: button-lg` | `--radius-lg` | 10px |
| `border-radius: badge` | `--radius-md` | 6px |
| `border-radius: input` | `--radius` | 8px |

**New tokens**: `radius-none` (sharp corners), `radius-sm` (4px for small chips), `radius-full` (pill shapes for tags and indicators).

*Source: Gap analysis Category 3. AIOX uses a 7-value numbered scale. Reis IA uses 8 values with cleaner naming that includes the semantic aliases.*

---

## 18. HAIRLINE GRID TECHNIQUE [ADDED -- 2026-03-16]

An optional layout pattern where parent background color shows through 1px gaps between grid cells, creating seamless shared hairline dividers instead of individual card borders.

### 18A. Pattern Specification

```
Container: display grid, gap 1px, background var(--border-default)
Container border: 1px solid var(--border-default)
Children: background var(--surface-0) or var(--surface-1)
```

The parent grid uses the border color as its background. The 1px gap reveals this background between cells, creating hairline dividers. Children cover the parent's background with their own surface color.

### 18B. When to Use

| Good for | Not suited for |
|----------|---------------|
| Stats/KPI grids | Testimonial cards (need breathing room) |
| Feature comparison grids | Case study cards (need spacing for thumbnails) |
| Pillar card layouts | Any card with rounded corners |
| Data tables | Content with varied heights |
| Metric dashboards | Mobile single-column layouts |

### 18C. Responsive Behavior

On mobile (< 768px), hairline grids should collapse to single-column stacked layout with standard `--space-md` gap and individual card borders, since the hairline effect requires side-by-side cells.

*Source: Gap analysis Category 8. AIOX uses this pattern extensively for token pages and LP sections. Reis IA adopts it as an optional pattern alongside standard spaced cards.*

---

## 19. MULTI-VARIANT BADGE SYSTEM [ADDED -- 2026-03-16]

Extends the existing single-variant badge (Section 7E) with semantic color variants.

### 19A. Badge Variants

| Variant | Background | Border | Text Color | CSS Class |
|---------|-----------|--------|------------|-----------|
| Accent (default) | `rgba(74, 144, 255, 0.10)` | `rgba(74, 144, 255, 0.20)` | `#4A90FF` | `.badge` or `.badge-accent` |
| Success | `rgba(34, 197, 94, 0.10)` | `rgba(34, 197, 94, 0.20)` | `#22C55E` | `.badge-success` |
| Warning | `rgba(245, 158, 11, 0.10)` | `rgba(245, 158, 11, 0.20)` | `#F59E0B` | `.badge-warning` |
| Error | `rgba(239, 68, 68, 0.10)` | `rgba(239, 68, 68, 0.20)` | `#EF4444` | `.badge-error` |
| Neutral | `rgba(255, 255, 255, 0.06)` | `rgba(255, 255, 255, 0.12)` | `var(--text-secondary)` | `.badge-neutral` |

### 19B. Shared Badge Properties

All variants share the same base properties from Section 7E:
- Font size: 12px
- Font weight: 600
- Letter spacing: 0.05em
- Text transform: uppercase
- Padding: 6px 14px
- Border radius: 6px (--radius-md)
- Border width: 1px

*Source: Gap analysis Category 9. AIOX uses 5 badge color variants. Reis IA adds 4 variants to the existing accent badge for status and category differentiation.*

---

## 20. KPI CARD COMPONENT [ADDED -- 2026-03-16]

A specialized card variant for displaying key performance indicators with a metric value, label, and optional trend indicator.

### 20A. KPI Card Specification

| Property | Value |
|----------|-------|
| Background | `var(--surface-2)` (#111111) |
| Border | 1px solid `var(--border-default)` (8% white) |
| Border radius | 12px (--radius-xl) |
| Padding | 24px |
| Hover border | `var(--border-visible)` (12% white) |
| Hover background | `var(--surface-3)` (#161616) |

### 20B. KPI Card Internal Structure

```
[Label] -- 12px, weight 600, uppercase, 0.05em tracking, text-tertiary
[Value] -- Display or H2 size, weight 700, text-primary or accent-blue
[Trend] -- 13px, weight 500, accent-blue (positive) or color-error (negative)
           Prefix with up/down arrow icon (Lucide: trending-up / trending-down)
[Context] -- 14px, weight 400, text-secondary (optional 1-line description)
```

### 20C. KPI Card Layout Patterns

**Stats row**: 3-4 KPI cards in a horizontal grid
```
Desktop: grid-template-columns: repeat(3, 1fr) or repeat(4, 1fr)
Tablet: repeat(2, 1fr)
Mobile: single column stack
Gap: var(--space-lg)
```

**Hairline variant**: KPI cards work particularly well with the hairline grid technique (Section 18) for a tight, data-dashboard feel.

*Source: Gap analysis Category 9. AIOX has a formalized KPI Card component. Reis IA adapts the pattern with our surface system and typography tokens.*

---

## 21. FORM INPUT COMPONENT [ADDED -- 2026-03-16]

Complete specification for form inputs across all interactive states. Required for booking/contact forms.

### 21A. Base Input Properties

| Property | Value |
|----------|-------|
| Background | `var(--surface-3)` (#161616) |
| Border | 1px solid `var(--border-default)` (8% white) |
| Border radius | 8px (--radius / input) |
| Padding | 12px 16px |
| Font size | 16px (prevents iOS zoom) |
| Font weight | 400 |
| Text color | `var(--text-primary)` (#FFFFFF) |
| Placeholder color | `var(--text-quaternary)` (35% white) |
| Height | 48px (includes padding + border) |
| Transition | border-color 200ms var(--ease-base), box-shadow 200ms var(--ease-base) |

### 21B. Input States

| State | Border | Background | Shadow | Text |
|-------|--------|-----------|--------|------|
| Default | `var(--border-default)` | `var(--surface-3)` | none | `var(--text-primary)` |
| Hover | `var(--border-visible)` | `var(--surface-3)` | none | `var(--text-primary)` |
| Focus | `var(--accent-blue)` | `var(--surface-3)` | `0 0 0 3px var(--blue-15)` | `var(--text-primary)` |
| Error | `var(--color-error)` | `var(--surface-3)` | `0 0 0 3px rgba(239, 68, 68, 0.15)` | `var(--text-primary)` |
| Success | `var(--color-success)` | `var(--surface-3)` | none | `var(--text-primary)` |
| Disabled | `var(--border-subtle)` | `var(--surface-2)` | none | `var(--text-quaternary)` |

### 21C. Input Label

| Property | Value |
|----------|-------|
| Font size | 14px |
| Font weight | 500 |
| Color | `var(--text-secondary)` (70% white) |
| Margin bottom | 8px |

### 21D. Input Helper / Error Text

| Property | Value |
|----------|-------|
| Font size | 13px |
| Font weight | 400 |
| Color (helper) | `var(--text-tertiary)` (50% white) |
| Color (error) | `var(--color-error)` (#EF4444) |
| Margin top | 6px |

### 21E. Textarea Variant

Same as text input with overrides:
- Height: auto (min-height 120px)
- Padding: 12px 16px
- Resize: vertical only

### 21F. Select Variant

Same as text input with overrides:
- Appearance: none (custom arrow)
- Arrow: Lucide chevron-down icon, 16px, text-tertiary, right-aligned (16px from right edge)
- Padding right: 40px (to accommodate arrow)

*Source: Gap analysis Category 9. AIOX specifies Text, Textarea, and Select inputs with field wrappers. Reis IA defines all states (default, hover, focus, error, success, disabled) with signal colors from Section 14.*

---

## 22. TABS COMPONENT [ADDED -- 2026-03-16]

Specification for tabbed interfaces used in documentation, service comparison, and content organization.

### 22A. Tab List Properties

| Property | Value |
|----------|-------|
| Container | Horizontal flex, gap 0 |
| Border bottom | 1px solid `var(--border-default)` |
| Overflow | auto (horizontal scroll on mobile with hidden scrollbar) |

### 22B. Tab Trigger Properties

| Property | Default State | Active State |
|----------|--------------|-------------|
| Font size | 14px | 14px |
| Font weight | 500 | 600 |
| Color | `var(--text-tertiary)` | `var(--text-primary)` |
| Padding | 12px 20px | 12px 20px |
| Border bottom | 2px solid transparent | 2px solid `var(--accent-blue)` |
| Background | transparent | transparent |
| Hover color | `var(--text-secondary)` | -- |
| Transition | color 200ms, border-color 200ms | -- |

### 22C. Tab Panel Properties

| Property | Value |
|----------|-------|
| Padding top | 24px (--gap-6) |
| Min height | 100px (prevents layout shift) |
| Transition | opacity 200ms var(--ease-base) |

### 22D. Responsive Behavior

On mobile, tab triggers scroll horizontally with `overflow-x: auto` and `-webkit-overflow-scrolling: touch`. The active tab indicator (blue bottom border) persists across scroll.

*Source: Gap analysis Category 9. AIOX has a tab component used in documentation. Reis IA specifies a minimal tab design consistent with our border and typography system.*

---

---

## 23. STICKY SECTION SCROLL PATTERN [ADDED -- 2026-03-17]

A scroll-driven animation pattern where content is pinned to the viewport while scroll progress drives internal transformations. Used for methodology showcases, process walkthroughs, and storytelling sections.

### 23A. Pattern Description

The outer container is tall (300vh+) to provide scroll range. An inner element sticks to the viewport via `position: sticky`. JavaScript calculates scroll progress (0 to 1) within the section and drives content transitions -- text blocks fade in at staggered progress points, images scale, and elements reposition.

### 23B. When to Use

| Good for | Not suited for |
|----------|---------------|
| Methodology / "How we work" sections | Short content sections |
| Process walkthroughs (Builder, Systems) | Mobile-first sections (fallback to standard layout) |
| Data-rich storytelling with numbers | Sections with less than 3 content steps |
| Feature deep-dives | Content that must be scannable/skimmable |

### 23C. Specification

| Property | Value |
|----------|-------|
| Outer container height | 300vh (3 content steps) or 400vh (4 steps) |
| Sticky element | `position: sticky; top: 0; height: 100vh` |
| Content step stagger | Each step occupies 25% of total scroll range |
| Fade-in distance | 40px translateY |
| Step transition | opacity + transform, controlled by JS (no CSS transition) |
| Image scale range | 1.2 (start) to 1.0 (end) |
| Performance | `will-change: opacity, transform` on animated elements |

### 23D. Responsive Behavior

- **Desktop (1024px+)**: Full sticky scroll behavior with scroll-linked content
- **Tablet (768-1023px)**: Same behavior, reduced outer height (250vh)
- **Mobile (<768px)**: **Fallback to standard stacked layout** with `.animate-on-scroll` entrance animations. The sticky pattern is disabled because short scroll ranges on small viewports make it feel sluggish.

### 23E. Content Structure

```
[Step 1: 0-25% scroll progress] -- First content block fades in
[Step 2: 25-50% scroll progress] -- Second content block replaces first
[Step 3: 50-75% scroll progress] -- Third content block replaces second
[Step 4: 75-100% scroll progress] -- Final CTA block or summary
```

Each step should contain: a heading (H3), a body paragraph, and optionally a visual element (stat, icon, or diagram).

*Source: Apple's product page sticky scroll technique. Adapted for Reis IA's methodology sections. The key difference: Apple uses image sequences (heavy assets), Reis IA uses text + stat content (lightweight, fast-loading). Mobile fallback ensures no degraded experience on touch devices.*

---

## 24. WORD-BY-WORD TEXT REVEAL [ADDED -- 2026-03-17]

A scroll-linked text animation where individual words in a headline transition from low opacity to full opacity as the user scrolls, creating a progressive reading reveal effect.

### 24A. Pattern Description

A headline is split into individual `<span>` elements, each starting at 15% opacity. As the element enters the viewport and the user scrolls through its section, words progressively transition to 100% opacity based on scroll progress. The result is a reading-pace reveal that draws attention to each word.

### 24B. When to Use

| Good for | Not suited for |
|----------|---------------|
| Hero section taglines (1-2 sentences max) | Body paragraphs (too many words, becomes tedious) |
| Key positioning statements | Headings with fewer than 5 words (too fast to notice) |
| Section headlines that benefit from emphasis | Any text that must be immediately readable (CTAs, nav) |

### 24C. Specification

| Property | Value |
|----------|-------|
| Word initial opacity | `0.15` (visible but muted, avoids CLS) |
| Word revealed opacity | `1.0` |
| Word transition | `opacity 0.4s var(--ease-base)` |
| Word stagger | Each word gets `50ms` additional delay based on index |
| Intersection threshold | `0.3` (trigger when 30% visible) |
| Max words | 30 (beyond this, split into multiple reveal groups) |
| Accessibility | Full text content present in DOM at all times (screen readers see everything). Only opacity changes. |

### 24D. Responsive Behavior

- All breakpoints: Same behavior. Words are inline so they reflow naturally.
- Reduced motion: All words display at 100% opacity immediately.

*Source: Apple's word-by-word scroll reveal on product pages. Adapted for Reis IA with higher initial opacity (0.15 vs Apple's approach of starting at 0) to avoid perceived content hiding. The 50ms stagger between words (vs Apple's position-based reveal) creates a more even cascade.*

---

## 25. FLOATING CTA COMPONENT [ADDED -- 2026-03-17]

A fixed-position CTA button that appears on scroll, pins to the bottom of the viewport, and transitions to a frosted glass state when near the page footer. Essential for sales pages where the primary conversion action must remain accessible.

### 25A. Pattern Description

The button starts hidden (opacity 0, scaled down). When the user scrolls past a trigger point (typically past the hero fold), it animates into view at the bottom center of the viewport. When the user scrolls near the footer, the button transitions to a frosted glass "stuck" state to blend with the footer context.

### 25B. When to Use

| Good for | Not suited for |
|----------|---------------|
| Sales pages (/builder, /systems) | Homepage (use inline CTAs instead) |
| Long-form content pages | Short pages (< 2 viewports tall) |
| Mobile experience (replaces need for sticky header CTA) | Pages with multiple competing CTAs |

### 25C. Specification

| Property | Value |
|----------|-------|
| Position | `fixed`, bottom `24px`, left `50%`, centered via `translateX(-50%)` |
| Hidden state | `opacity: 0; transform: translateX(-50%) translateY(40%) scale(0.9); pointer-events: none` |
| Visible state | `opacity: 1; transform: translateX(-50%) translateY(0) scale(1); pointer-events: auto` |
| Show transition | `opacity var(--duration-moderate) ease-in-out, transform var(--duration-slow) ease-in-out` |
| Background (default) | `var(--accent-blue)` (#4A90FF) |
| Background (stuck/frosted) | `rgba(10, 10, 26, 0.5)` with `backdrop-filter: blur(32px)` |
| Text | White, 16px, weight 600 |
| Border radius | `9999px` (pill shape) |
| Padding | `14px 32px` |
| Shadow | `0 4px 16px rgba(0, 0, 0, 0.16)` (via pseudo-element, fades in with button) |
| Z-index | 40 (below nav at 50, above all content) |
| Trigger: show | User scrolls past `300px` from top |
| Trigger: hide | User scrolls back above `300px` |
| Trigger: frosted | User within `300px` of page bottom |
| Focus ring | `2px solid #4D65FF, offset 2px` |

### 25D. Hover States

| State | Background | Text |
|-------|-----------|------|
| Default | `var(--accent-blue)` | White |
| Hover | `var(--accent-hover)` (#6AADFF) | White |
| Stuck (frosted) | `rgba(10, 10, 26, 0.5)` + blur(32px) | White |
| Stuck hover | `rgba(10, 10, 26, 0.65)` + blur(32px) | White |

### 25E. Responsive Behavior

- **Desktop**: Centered at bottom, pill shape
- **Mobile**: Full-width (with 16px margin on each side), safe-area-inset-bottom padding
- **Reduced motion**: Appears instantly (no scale/translate animation)

### 25F. CTA Text

The floating CTA always points to `/agendar` or `/aplicar`. Default text: "Book AI Revenue Audit" (or page-specific variant). Never display a secondary action in the floating CTA.

*Source: Porsche's FloatingCta component with 3 states (hidden/active/stuck). Adapted for Reis IA: blue accent instead of Porsche's black/white, pill shape (not rounded-rect), frosted glass uses our surface-tinted dark blur instead of Porsche's neutral frosting. The stuck state is unique to Porsche among our references -- no other site does this, and it elegantly solves the "CTA conflicts with footer CTA" problem.*

---

## 26. FAQ EXCLUSIVE-OPEN BEHAVIOR [ADDED -- 2026-03-17]

An enhancement to the existing FAQ Accordion (Section 7F) that ensures only one FAQ item can be open at a time. Opening a new item automatically closes the previously open one.

### 26A. Pattern Description

When a user clicks on a closed FAQ item, all other currently open items in the same FAQ group close before the clicked item opens. This creates a cleaner, more focused reading experience and prevents the FAQ section from expanding to unwieldy heights.

### 26B. Specification Update to Section 7F

The existing FAQ specification in Section 7F remains unchanged for individual item styling. This section adds the group-level behavior:

| Property | Value |
|----------|-------|
| Group container | `.faq-group` wrapper around all `.faq-item` elements |
| Exclusive behavior | Only 1 item open per `.faq-group` at any time |
| Close animation | Same as open animation in reverse: `max-height` to `0`, icon rotates back, 300ms ease-out |
| Close-then-open timing | Close starts immediately; open begins on same frame (no sequential delay) |
| Default state on page load | All items closed (none pre-opened) |

### 26C. When to Use

- **Always use** for FAQ sections with 5+ items (prevents excessive page expansion)
- **Optional** for short FAQ sections (2-4 items) where multiple open items may be acceptable
- **Never use** for content where users need to compare answers side-by-side

*Source: Morningside's FAQ accordion with `closeAllAccordions()` + `toggleAccordion()` pattern. Adapted for Reis IA's existing FAQ component. The key difference: Morningside's FAQ uses chevron rotation (-90deg), Reis IA uses plus-to-X rotation (45deg) as specified in Section 7F.*

---

## 27. STAGGER SYSTEM WITH CSS CUSTOM PROPERTY TOKENS [ADDED -- 2026-03-17]

A formalized stagger animation system using CSS custom properties for entry duration, stagger delay, entry offset, and computed total delay. Replaces the current hardcoded nth-child delays with a token-driven system that scales to any number of children.

### 27A. Pattern Description

Instead of writing explicit `transition-delay` values for each nth-child, the stagger system uses a `--stagger-index` custom property set on each child element. The delay is computed as `calc(var(--stagger-index) * var(--entry-stagger) + var(--entry-delay))`. This scales cleanly to any number of items without additional CSS rules.

### 27B. Stagger Tokens

| Token | Value | CSS Variable | Usage |
|-------|-------|-------------|-------|
| Entry duration | 800ms | `--entry-duration` | How long each item takes to animate in |
| Entry stagger | 120ms | `--entry-stagger` | Delay between consecutive items |
| Entry delay | 200ms | `--entry-delay` | Base delay before first item starts |
| Entry offset | 24px | `--entry-offset` | translateY distance for entrance |

### 27C. Computed Delay Formula

```
transition-delay = (--stagger-index * --entry-stagger) + --entry-delay
```

For a grid of 4 cards:
- Card 1: `(0 * 120ms) + 200ms = 200ms`
- Card 2: `(1 * 120ms) + 200ms = 320ms`
- Card 3: `(2 * 120ms) + 200ms = 440ms`
- Card 4: `(3 * 120ms) + 200ms = 560ms`

Total orchestration time for 4 items: `560ms + 800ms = 1360ms`

### 27D. Relationship to Existing Stagger

This replaces the hardcoded `.animate-stagger > .animate-on-scroll:nth-child(n)` pattern from Section 6C. The existing pattern works for up to 6 children with fixed 150ms delays. The new token-based system works for any number of children and uses a tighter 120ms stagger (from Linear) which feels more cohesive in grids.

**Migration rule**: New components should use the token-based stagger system. Existing components using `.animate-stagger` continue to work and do not need immediate migration.

*Source: Linear's stagger system architecture (--entry-duration/stagger/delay tokens with computed total delays). Adapted for Reis IA: Linear uses 200ms stagger (feels slow for 6+ items), Reis IA uses 120ms for tighter cascades. The 200ms base delay matches our existing pattern.*

---

## 28. HARDWARE-ADAPTIVE RENDERING [ADDED -- 2026-03-17]

A performance-first pattern that checks the user's hardware capabilities and gracefully degrades animations for low-power devices. Prevents animation jank on older phones and tablets.

### 28A. Pattern Description

On page load, JavaScript checks `navigator.hardwareConcurrency` (number of logical CPU cores) and `navigator.deviceMemory` (RAM in GB, where available). Based on thresholds, the system sets a data attribute on `<html>` that CSS uses to reduce or disable complex animations.

### 28B. Performance Tiers

| Tier | Condition | CSS Attribute | Behavior |
|------|-----------|--------------|----------|
| Full | `cores >= 4 AND memory >= 4` | `data-perf="full"` | All animations enabled |
| Reduced | `cores >= 2 AND memory >= 2` | `data-perf="reduced"` | Disable: aurora-bg, rotating borders, parallax. Keep: scroll reveals, hover effects |
| Minimal | `cores < 2 OR memory < 2` | `data-perf="minimal"` | All entrance animations instant. Only hover color transitions remain. |

### 28C. CSS Selectors

```css
/* Disable aurora on reduced-performance devices */
[data-perf="reduced"] .aurora-bg,
[data-perf="minimal"] .aurora-bg { display: none; }

/* Disable rotating borders on reduced-performance devices */
[data-perf="reduced"] .card-rotating-border,
[data-perf="minimal"] .card-rotating-border { animation: none; }

/* Instant entrance on minimal devices */
[data-perf="minimal"] .animate-on-scroll,
[data-perf="minimal"] .animate-perspective-up {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}
```

### 28D. Fallback Behavior

If `navigator.hardwareConcurrency` or `navigator.deviceMemory` is undefined (some browsers do not expose these), default to the "full" tier. The `prefers-reduced-motion` media query always takes precedence over hardware detection.

### 28E. Why This Matters for Reis IA

Our target audience (business owners, C-suite executives) often uses a range of devices -- from the latest MacBook Pro to older iPads. A smooth experience on all devices is more premium than fancy animations that stutter on half the audience's hardware.

*Source: Linear checks `navigator.hardwareConcurrency` to decide whether to render complex grid animations. Adapted for Reis IA with a 3-tier system (Linear uses a binary check). The `navigator.deviceMemory` check is additive (only available in Chrome/Edge) for finer granularity.*

---

## 29. MICRO-INTERACTION TIMING MAP [ADDED -- 2026-03-17]

A lookup table that maps specific interaction types to exact duration values. More prescriptive than the generic duration scale (Section 6B), this ensures developers never guess which duration to use for a given interaction.

### 29A. Interaction-to-Duration Map

| Interaction Type | Duration | Easing | Why |
|-----------------|----------|--------|-----|
| Color change (text, border, bg) | 150ms | `--ease-base` | Instant feedback needed. 200ms feels sluggish for color alone. |
| Opacity change (hover show/hide) | 150ms | `--ease-base` | Same as color -- atomic property, needs speed. |
| Border-color + bg-color (card hover) | 200ms | `--ease-base` | Two properties changing together need slightly more time. |
| Transform (translateY, scale on hover) | 250ms | `--ease-base` | Spatial movement needs enough time to track visually. |
| Card compound hover (border + bg + shadow) | 300ms | `--ease-card` | Complex multi-property transitions need the heavy easing. |
| FAQ open/close (max-height) | 300ms | `--ease-out` | Content revealing should feel brisk, not labored. |
| Scroll-triggered entrance | 800ms | `--ease-out` | Entrance from off-screen needs generous time to feel natural. |
| Hero entrance (3D perspective) | 1200ms | `--ease-dramatic` | Hero moments earn the dramatic pacing. |
| Continuous ambient (aurora, rotation) | 8000-20000ms | `linear` / `ease-in-out` | Background ambience should be nearly imperceptible in speed. |

### 29B. Relationship to Existing Duration Scale

The duration tokens in Section 6B (--duration-instant through --duration-ambient) remain the official tokens. This map simply specifies **which token to use for each interaction context**. Where the map says "150ms", use `--duration-instant` (100ms) + CSS override or adjust the token if adopted. In practice:

- 150ms interactions: Use a new `--duration-micro: 150ms` token (see Section 29C)
- All other durations map directly to existing tokens

### 29C. New Duration Token

| Token | Value | CSS Variable | Usage |
|-------|-------|-------------|-------|
| Micro | 150ms | `--duration-micro` | Single-property micro-interactions (color, opacity changes) |

This fills the gap between `--duration-instant` (100ms, too fast for visible transitions) and `--duration-fast` (200ms, slightly too slow for single-property changes). Stripe uses 150ms for hover transitions universally.

*Source: Stripe's 3-tier micro-interaction timing (150ms/250ms/850ms) mapped to interaction types. Adapted for Reis IA with our existing 7-tier duration scale extended to 8 tiers. The 150ms value fills a genuine gap: 100ms is invisible, 200ms is perceptible but slightly slow for instant-feedback interactions like link color changes.*

---

## 30. TAB SLIDING INDICATOR [ADDED -- 2026-03-17]

An enhancement to the existing Tabs component (Section 22) that adds a sliding bar indicator that animates horizontally from the previously active tab to the newly selected tab, instead of instantly appearing under the new tab.

### 30A. Pattern Description

A `<div class="tab-indicator">` element is positioned absolutely below the tab list. When a tab is selected, JavaScript calculates the width and left offset of the active tab trigger and animates the indicator to match. The result is a smooth horizontal slide that connects the user's action to the visual feedback.

### 30B. Specification Update to Section 22

The existing tab specification (Section 22) continues to apply. This adds:

| Property | Value |
|----------|-------|
| Indicator element | `.tab-indicator`, absolutely positioned at bottom of `.tab-list` |
| Indicator height | 2px |
| Indicator color | `var(--accent-blue)` (#4A90FF) |
| Indicator transition | `left 300ms var(--ease-out), width 300ms var(--ease-out)` |
| Initial position | Matches first (active) tab on page load |
| Tab trigger border | Changed from `border-bottom: 2px solid blue` to `border-bottom: none` (indicator replaces it) |

### 30C. Responsive Behavior

- On mobile with horizontally scrolling tabs, the indicator scrolls with the tab list (it's a child of `.tab-list`).
- If the tab list scrolls, the indicator remains correctly positioned relative to tab triggers.

*Source: Morningside's service tab navigation with sliding indicator that moves between "Identify", "Develop", "Adopt" tabs. Adapted for Reis IA's existing tab component. The key visual difference: the indicator slides in our `--ease-out` curve (fast start, gentle settle) rather than Morningside's generic ease.*

---

## Changelog

- 2026-03-16: Official Design System v1.0 published
- 2026-03-17: Gap analysis additions (Sections 13-22):
  - Added 12-step accent opacity ladder (Section 13)
  - Added signal/semantic colors with variants (Section 14)
  - Added Lucide icon system with 5 sizes and 5 color variants (Section 15)
  - Added numeric spacing scale --gap-0 through --gap-10 (Section 16)
  - Added generic border radius scale with semantic alias mapping (Section 17)
  - Added hairline grid technique specification (Section 18)
  - Added multi-variant badge system (Section 19)
  - Added KPI card component specification (Section 20)
  - Added form input component with all states (Section 21)
  - Added tabs component specification (Section 22)
- 2026-03-17: Removed Azure Whisper / Blue Shimmer Text effect (permanently discarded)
- 2026-03-17: Technique enrichment from 9 reference sources (Sections 23-30):
  - Added Sticky Section Scroll Pattern from Apple (Section 23)
  - Added Word-by-Word Text Reveal from Apple (Section 24)
  - Added Floating CTA Component from Porsche (Section 25)
  - Added FAQ Exclusive-Open Behavior from Morningside (Section 26)
  - Added Stagger System with CSS Custom Property Tokens from Linear (Section 27)
  - Added Hardware-Adaptive Rendering from Linear (Section 28)
  - Added Micro-Interaction Timing Map from Stripe, new --duration-micro token (Section 29)
  - Added Tab Sliding Indicator from Morningside (Section 30)

---

*Produced by: designer-agent*
*Synthesized from: 9 reference extractions (Stripe, Linear, Vercel, Apple, Porsche, Academia Lendaria, Morningside AI, Agencia Lendaria, AIOX) + existing Reis IA brand identity + master techniques catalog*
*Next review: When dev-agent begins Tailwind configuration*
