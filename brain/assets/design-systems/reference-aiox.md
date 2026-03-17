# AIOX Squad Design System Reference

Last updated: 2026-03-17
Source: https://brand.aioxsquad.ai/
Pages analyzed: 26
Tokens extracted: 180+
Components documented: 60+

---

## TABLE OF CONTENTS

1. [Brand Identity](#1-brand-identity)
2. [Color System](#2-color-system)
3. [Typography System](#3-typography-system)
4. [Spacing System](#4-spacing-system)
5. [Border & Radius System](#5-border--radius-system)
6. [Shadow & Glow System](#6-shadow--glow-system)
7. [Motion & Animation System](#7-motion--animation-system)
8. [Layout System](#8-layout-system)
9. [Component Library](#9-component-library)
10. [Pattern Library](#10-pattern-library)
11. [Visual Effects (VFX)](#11-visual-effects-vfx)
12. [Icon System](#12-icon-system)
13. [Section Templates](#13-section-templates)
14. [Page Templates](#14-page-templates)
15. [SEO & Metadata](#15-seo--metadata)
16. [Editorial Guidelines](#16-editorial-guidelines)
17. [Reis IA Cross-Reference](#17-reis-ia-cross-reference)

---

## 1. BRAND IDENTITY

### 1A. Core Identity

- **Brand Name**: AIOX Squad
- **Category**: AI Automation Agency / AI Orchestration Experience
- **Tagline**: "A IA e a seta. O X e seu." (The AI is the arrow. The X is yours.)
- **Mission**: Build custom AI systems that handle repetitive work, so humans can focus on what matters.
- **Vision**: A world where every company operates at 10x efficiency through intelligent automation.
- **Design Edition**: "Dark Cockpit Edition" -- dark-first, HUD-inspired, performance-focused

### 1B. Brand Archetypes

| Archetype | Weight | Role |
|-----------|--------|------|
| Magician | 60% | Transformational essence, revealing creative power |
| Sage | 25% | Revelatory wisdom, clarity, codified methodology |
| Explorer | 15% | Autonomy, rabbit-hole invitation, navigation |

**Personality Descriptor**: "Morpheus" -- digital, profound, direct; reveals rather than executes.

### 1C. Brand Values

1. Results Over Process
2. Radical Transparency
3. Speed Without Shortcuts
4. Human-First Automation
5. Compounding Knowledge
6. Skin in the Game

### 1D. Visual Symbols

| Symbol | Meaning | Usage |
|--------|---------|-------|
| Triangle/Delta | Transformation arc | Journey from A to X |
| Arrow/Seta | AI as propulsion | Directional motor |
| Circle | Orchestration | Cyclical process |
| X/Cross | Destination/Agency | Creator's power |

### 1E. Dual Voice System

**AIOX Digital Voice (Morpheus)**:
- Cold, implacable, minimalist, wise
- Does not convince; provides tools
- Brutalista design with sober colors and neon accents
- Institutional premium tone

**Alan Founder Voice (Human Morpheus)**:
- Warm, passionate, provocateur, vulnerable
- Sells vision; destroys old mindset
- Socially expressive with high energy
- Calls to action against "the Matrix"

### 1F. Logo System

- **Primary format**: AIOX-White.svg (dark backgrounds), AIOX-Black.svg (light backgrounds)
- **Variants**: Horizontal (H-AIOX-Squad), Compact, Favicon
- **Clear space**: Minimum 1x height of "X" on all sides
- **Color contexts**: White on Black (#000), White on Surface (#0F0F11), Black on Cream, Black on Lime
- **Prohibited**: Non-brand colors, rotation, distortion

### 1G. Moodboard Aesthetic

- **Primary references**: HUD/cockpit dashboards, cyberpunk UIs, terminal interfaces
- **Grid precision**: 1px gaps, borders as dividers
- **Data-dense**: Optimized for metrics, KPIs, rankings
- **Texture**: Scanlines, grain, crosshair grids, circuit traces
- **Color dominance**: Neon lime (#D1FF00) on near-black (#050505)

---

## 2. COLOR SYSTEM

### 2A. Lime Theme (Primary)

**Accent & Signal Colors:**

| Token | Value | Usage |
|-------|-------|-------|
| `--bb-lime` | `oklch(0.934 0.2264 121.95)` / approx `#D1FF00` | Primary accent |
| `--bb-blue` | `oklch(0.669 0.1837 248.81)` / approx `#0099FF` | Info accent |
| `--bb-flare` | `oklch(0.631 0.2116 36.21)` / approx `#ED4609` | Warm counter-accent |
| `--bb-error` | `oklch(0.6368 0.2078 25.33)` / approx `#EF4444` | Destructive state |
| `--bb-warning` | `#f59e0b` | Warning state |

**Surface System:**

| Token | Value | Usage |
|-------|-------|-------|
| `--bb-canvas` | `var(--bb-dark)` | Page background alias |
| `--bb-dark` | `oklch(0.1149 0 0)` / approx `#050505` | Deepest surface |
| `--bb-surface` | `oklch(0.1693 0.0041 285.95)` / approx `#0F0F11` | Primary surface |
| `--bb-surface-alt` | `oklch(0.231 0.0099 124.97)` / approx `#1C1E19` | Alternate surface |
| `--bb-surface-panel` | `oklch(0.1785 0.0041 285.98)` | Panel background |
| `--bb-surface-console` | `oklch(0.184 0.0081 118.61)` | Console/terminal bg |
| `--bb-surface-hover-strong` | `oklch(0.1971 0.006 285.84)` | Strong hover state |

**Text Colors:**

| Token | Value | Usage |
|-------|-------|-------|
| `--bb-cream` | `oklch(0.9639 0.0158 106.69)` / approx `rgb(244, 244, 232)` | Primary reading text |
| `--bb-cream-alt` | `oklch(0.9644 0.0172 103.15)` / approx `rgb(245, 244, 231)` | Alt cream |
| `--bb-warm-white` | `oklch(0.9952 0.0235 106.82)` / approx `#FFFFED` | Maximum white |
| `--bb-dim` | `rgba(245, 244, 231, 0.4)` | Muted/disabled text |
| `--bb-muted` | `oklch(0.7952 0 0)` | Secondary text |
| `--bb-meta` | `oklch(0.6927 0 0)` | Metadata text |

**Neutral Grays:**

| Token | Value |
|-------|-------|
| `--bb-gray-charcoal` | `oklch(0.36 0 0)` / approx `#3D3D3D` |
| `--bb-gray-dim` | `oklch(0.5208 0 0)` / approx `#696969` |
| `--bb-gray-muted` | `oklch(0.683 0 0)` / approx `#999999` |
| `--bb-gray-silver` | `oklch(0.7984 0 0)` / approx `#BDBDBD` |

**Border System:**

| Token | Value |
|-------|-------|
| `--bb-border` | `rgba(156, 156, 156, 0.15)` |
| `--bb-border-soft` | `rgba(156, 156, 156, 0.10)` |
| `--bb-border-strong` | `rgba(156, 156, 156, 0.25)` |
| `--bb-border-hover` | `rgba(156, 156, 156, 0.24)` |
| `--bb-border-input` | `rgba(156, 156, 156, 0.2)` |

**Accent Opacity Ladder:**

`--bb-accent-02` through `--bb-accent-90`: `rgba(209, 255, 0, 0.02)` to `rgba(209, 255, 0, 0.9)` in graduated steps.

### 2B. Gold Theme (Alternate)

**Primary Accent:**
- `--bb-lime`: `#DDD1BB` (warm gold replaces neon lime)
- `--bb-flare`: `#C4B7A2`

**Surfaces (Hex):**

| Token | Value |
|-------|-------|
| `--bb-canvas` | `#09090A` |
| `--bb-dark` | `#121213` |
| `--bb-surface` | `#151517` |
| `--bb-surface-alt` | `#1D1D20` |
| `--bb-surface-panel` | `#18181B` |
| `--bb-surface-console` | `#222225` |
| `--bb-surface-hover-strong` | `#28282C` |

**Text (Gold Edition):**

| Token | Value |
|-------|-------|
| `--bb-cream` | `#F4F4F4` |
| `--bb-cream-alt` | `#E8E8E8` |
| `--bb-warm-white` | `#FFFFFF` |
| `--bb-dim` | `rgba(244, 244, 244, 0.52)` |
| `--bb-muted` | `#DDDDDD` |
| `--bb-meta` | `#AFAFAF` |

**Borders (Gold Edition):**

| Token | Value |
|-------|-------|
| `--bb-border` | `rgba(255, 255, 255, 0.09)` |
| `--bb-border-soft` | `rgba(255, 255, 255, 0.05)` |
| `--bb-border-strong` | `rgba(255, 255, 255, 0.15)` |
| `--bb-border-hover` | `rgba(255, 255, 255, 0.18)` |
| `--bb-border-input` | `rgba(255, 255, 255, 0.12)` |

### 2C. Semantic Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-void` | `#000000` | Absolute black |
| `--color-bg-base` | `#050505` | Page background |
| `--color-bg-surface` | `#0F0F11` | Card/panel surface |
| `--color-bg-surface-alt` | `#1C1E19` | Alternate surface |
| `--color-bg-elevated` | `#1C1E19` | Elevated panels |
| `--color-bg-overlay` | `rgba(61, 61, 61, 0.5)` | Modal overlay |
| `--color-text-base` | `rgb(244, 244, 232)` | Primary text |
| `--color-text-secondary` | `rgba(244, 244, 232, 0.7)` | Secondary text |
| `--color-text-tertiary` | `rgba(244, 244, 232, 0.55)` | Tertiary text |
| `--color-text-muted` | `rgba(245, 244, 231, 0.4)` | Muted text |

### 2D. Neon/Glow Tokens

| Token | Value |
|-------|-------|
| `--neon` | `#D1FF00` |
| `--neon-dim` | `rgba(209, 255, 0, 0.15)` |
| `--neon-glow` | `rgba(209, 255, 0, 0.4)` |
| `--lime-glow` | `rgba(209, 255, 0, 0.25)` |
| `--lime-glow-soft` | `rgba(209, 255, 0, 0.1)` |

### 2E. Chart Colors

| Token | Value |
|-------|-------|
| `--bb-chart-1` | `#D1FF00` (lime) |
| `--bb-chart-2` | `#0099FF` (blue) |
| `--bb-chart-3` | `#EF4444` (red) |
| `--bb-chart-4` | `#f59e0b` (amber) |
| `--bb-chart-5` | `#8B5CF6` (purple) |
| `--bb-chart-6` | `#06B6D4` (cyan) |

### 2F. Interactive State Tokens

| Token | Value |
|-------|-------|
| `--focus-brand` | `#D1FF00` |
| `--focus-neutral` | `#BDBDBD` |
| `--selection-bg` | `#050505` |
| `--selection-fg` | `#D1FF00` |
| `--warning-bg` | `rgba(245, 158, 11, 0.05)` |
| `--warning-border` | `rgba(245, 158, 11, 0.2)` |

### 2G. shadcn/ui Mapping

| Token | Value |
|-------|-------|
| `--background` | `#050505` |
| `--foreground` | `rgb(244, 244, 232)` |
| `--card` | `#0F0F11` |
| `--primary` | `#D1FF00` |
| `--accent` | `#D1FF00` |
| `--muted` | `#3D3D3D` |
| `--destructive` | `#EF4444` |
| `--ring` | `#D1FF00` |
| `--radius` | `0.5rem` |

---

## 3. TYPOGRAPHY SYSTEM

### 3A. Font Families

| Role | Font | Weight Range | CSS Variable |
|------|------|-------------|-------------|
| Display | TASA Orbiter Display | 800 (Black) | `--font-bb-display` / `--font-display` |
| Primary/Sans | Geist | 100-900 (variable) | `--font-bb-sans` / `--font-sans` / `--font-geist-sans` |
| Monospace | Roboto Mono / Geist Mono | 400-500 | `--font-bb-mono` / `--font-mono` / `--font-geist-mono` |

**Font stacks:**
- Display: `"TASAOrbiterDisplay", system-ui, sans-serif`
- Sans: `"Geist", system-ui, sans-serif`
- Mono: `"GeistMono", ui-monospace, SFMono-Regular, Roboto Mono, Menlo, Monaco, Liberation Mono, DejaVu Sans Mono, Courier New, monospace`

### 3B. Type Scale

| Token | Size | Usage |
|-------|------|-------|
| Display | `4rem` (64px) | Hero headlines |
| H1 | `2.5rem` (40px) | Page titles |
| H2 | `1.5rem` (24px) | Section titles |
| Body | `1rem` (16px) | Primary reading |
| Small | `0.8rem` (12.8px) | Supporting text |
| Label | `0.65rem` (10.4px) | Labels, metadata |
| Micro | `0.6rem` (9.6px) | Smallest text |

**Fluid headings**: `clamp(2rem, 8vw, 6.5rem)` for hero; `clamp(3rem, 8vw, 7rem)` for metrics.

### 3C. Font Weights

| Token | Value |
|-------|-------|
| `--font-weight-thin` | 300 |
| `--font-weight-regular` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 700 |
| `--font-weight-extrabold` | 800 |
| `--font-weight-black` | 900 |

### 3D. Typography Conventions

- Monospace font used for: labels, badges, navigation, metadata, buttons
- Display font used for: section titles, KPI values, hero headlines
- All labels/nav: `text-transform: uppercase; letter-spacing: 0.08em`
- Section labels: `font-size: 0.6rem; font-weight: 500`
- Card titles: `font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.02em`

---

## 4. SPACING SYSTEM

### 4A. Named Scale

| Token | Value | Px |
|-------|-------|----|
| `--spacing-xs` | `0.5rem` | 8px |
| `--spacing-sm` | `1rem` | 16px |
| `--spacing-md` | `2rem` | 32px |
| `--spacing-lg` | `3rem` | 48px |
| `--spacing-xl` | `4rem` | 64px |

### 4B. Numeric 14-Step Scale

| Token | Value |
|-------|-------|
| `--space-0` | 0px |
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 15px |
| `--space-5` | 20px |
| `--space-6` | 30px |
| `--space-7` | 40px |
| `--space-8` | 60px |
| `--space-9` | 80px |
| `--space-10` | 90px |
| `--space-11` | 120px |
| `--space-12` | 150px |
| `--space-13` | 180px |

---

## 5. BORDER & RADIUS SYSTEM

### 5A. Border Radius Scale

| Token | Value |
|-------|-------|
| `--radius` | `0.5rem` (8px) |
| `--radius-sm` | 4px |
| `--radius-md` | 8px |
| `--radius-lg` | 12px |
| `--radius-xl` | 16px |
| `--radius-2xl` | 24px |
| `--radius-full` | 9999px |

### 5B. Glass/Blur

| Token | Value |
|-------|-------|
| `--glass-blur` | `blur(10px)` |
| `--glass-blur-soft` | `blur(5px)` |

---

## 6. SHADOW & GLOW SYSTEM

Shadows are minimal in the dark cockpit aesthetic. Glow effects replace traditional shadows.

**Glow Effects (from CSS):**

| Effect | CSS Value |
|--------|-----------|
| Primary button hover | `box-shadow: 0 0 20px var(--lime-glow)` |
| Destructive button hover | `box-shadow: 0 0 20px rgba(239, 68, 68, 0.3)` |
| Neon glow | `box-shadow: 0 0 8px rgba(209, 255, 0, 0.4), 0 0 24px rgba(209, 255, 0, ...)` |
| Card hover | `box-shadow: inset 0 0 0 1px var(--bb-accent-15)` |
| Cell hover | `box-shadow: inset 0 0 0 1px var(--bb-accent-20)` |
| Pulse dot | `box-shadow: 0 0 8px var(--bb-accent-40)` |

---

## 7. MOTION & ANIMATION SYSTEM

### 7A. Easing Curves

| Token | Value | Usage |
|-------|-------|-------|
| `--bb-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy/elastic interactions |
| `--bb-ease-smooth` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Standard smooth transitions |
| `--bb-ease-decel` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering/appearing |
| `--bb-ease-accel` | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting |
| `--motion-easing-spring` | `cubic-bezier(0.16, 1, 0.3, 1)` | Primary entrance easing (scroll reveals) |

### 7B. Durations

| Token | Value |
|-------|-------|
| `--bb-dur-fast` | `0.2s` |
| `--bb-dur-medium` | `0.4s` |
| `--bb-dur-slow` | `0.7s` |

### 7C. Scroll-Triggered Animations

The system uses CSS class-based scroll animations with IntersectionObserver:

| Class | Initial State | Visible State | Transition |
|-------|--------------|---------------|------------|
| `.anim` | `opacity: 0; translateY(30px)` | `opacity: 1; translateY(0)` | `0.7s cubic-bezier(0.16, 1, 0.3, 1)` |
| `.anim-left` | `opacity: 0; translateX(-30px)` | `opacity: 1; translateX(0)` | `0.7s cubic-bezier(0.16, 1, 0.3, 1)` |
| `.anim-right` | `opacity: 0; translateX(30px)` | `opacity: 1; translateX(0)` | `0.7s cubic-bezier(0.16, 1, 0.3, 1)` |
| `.anim-scale` | `opacity: 0; scale(0.92)` | `opacity: 1; scale(1)` | `0.7s cubic-bezier(0.16, 1, 0.3, 1)` |

**Stagger delays**: `.delay-1` through `.delay-5` (0.1s to 0.5s increments).

### 7D. Keyframe Animations

| Keyframe | Duration | Usage |
|----------|----------|-------|
| `bb-spin` | continuous | Spinner rotation (1 turn) |
| `bb-shimmer` | continuous | Shimmer sweep effect |
| `bb-pulse` | continuous | Opacity pulse (1 to 0.5) |
| `bb-ticker-scroll` | continuous | Marquee/ticker horizontal scroll |
| `bb-barGrow` | once | Bar chart growth from 0 width |
| `bb-drawLine` | once | Horizontal line draw (scaleX 0 to 1) |
| `bb-drawLineV` | once | Vertical line draw (scaleY 0 to 1) |
| `bb-content-in` | once | Content entrance (opacity + translateY) |
| `bb-blinds-open` | once | Blind reveal effect |
| `bb-letter-in` | once | Individual letter entrance |
| `bb-x-tick` | continuous | X rotation clock (0/90/180/270/360 deg) |
| `bb-progress-fill` | once | Progress bar fill (staged: 0/40/70/90/100%) |
| `bb-easing-run` | continuous | Easing demo runner |
| `bb-duration-fill` | once | Duration fill animation |
| `bb-pulse-glow` | continuous | Glow pulse (opacity 0.3 to 0.8) |
| `bb-scanline-sweep` | continuous | CRT scanline vertical sweep |

### 7E. Framer Motion Animations (8 Named)

1. **Orchestration Pulse** (3.5s) -- Hero/splash: seed dot + staggered letters + neon speed lines + pulsating glow ring
2. **Speed Lines** (2s) -- Emphasis: cream logo slides with neon speed lines drawing with stagger
3. **Particle Orbit** (loop) -- Agents visualization: central X with spring physics + 4 floating orbital particles
4. **Logo Dissolve** (3s) -- Exit/fade: solid text to individual flickering letters dissolving
5. **Morphing Square** (3.5s cycle) -- Loop: square to rounded to circle to square
6. **Glitch Reveal** (2s) -- Tech/hacker: scanlines + noise + skew + hue-rotate with smooth settle
7. **Stagger Letters** (1.5s) -- Navbar/footer: letters rise with spring + rotateX 3D + neon underline
8. **Brand Reveal** (3s) -- Landing hero: black blinds slide open revealing AIOX with scale, glow, decorative lines

---

## 8. LAYOUT SYSTEM

### 8A. Breakpoints

| Token | Value | Usage |
|-------|-------|-------|
| `--bp-mobile` | 767px | Mobile max-width |
| `--bp-tablet` | 768px | Tablet min-width |
| `--bp-desktop` | 1200px | Desktop min-width |

### 8B. Z-Index Layers

| Token | Value |
|-------|-------|
| `--layer-nav` | 100 |
| `--layer-dropdown` | 200 |
| `--layer-overlay` | 300 |
| `--layer-modal` | 400 |
| `--layer-toast` | 500 |

### 8C. Grid Systems

**Specimen Grid**: `grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1px; background: var(--border)`

**Component Grid**: `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1px; background: var(--border)`

**Dashboard Grid (Bento)**: `grid-template-columns: repeat(4, 1fr)` with span-2 and span-3 cells

**Content Grid (Auto-fit)**: `grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))`

### 8D. Container & Section Widths

- Section max-width: `1400px` with `margin-inline: auto`
- Component sections: `padding: 2rem 0`
- Navigation: sticky top, min-height 48px, z-index 100

---

## 9. COMPONENT LIBRARY

### 9A. Buttons

**Variants:**

| Variant | Background | Color | Border | Hover |
|---------|------------|-------|--------|-------|
| Primary | `var(--lime)` | `var(--dark)` | none | `box-shadow: 0 0 20px var(--lime-glow)` |
| Secondary | `transparent` | `var(--cream)` | `1px solid var(--border)` | `border-color: var(--lime); color: var(--lime)` |
| Ghost | `transparent` | `var(--dim)` | none | `color: var(--cream)` |
| Destructive | `var(--error)` | `white` | none | `box-shadow: 0 0 20px rgba(239, 68, 68, 0.3)` |

**Sizes:**

| Size | Padding | Font Size |
|------|---------|-----------|
| Small (`.btn-sm`) | `0.4rem 1rem` | `0.55rem` |
| Default | `0.65rem 1.5rem` | `0.65rem` |
| Large (`.btn-lg`) | `0.85rem 2rem` | `0.7rem` |

**States:**
- Disabled: `opacity: 0.4; cursor: not-allowed; pointer-events: none`
- Loading: `color: transparent; pointer-events: none` + spinning pseudo-element (14px circle, 2px border, 0.6s spin)

**Base styles**: `font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.08em; transition: all 0.2s ease`

### 9B. Cards

**Variants:**
- **Default**: `background: var(--surface); border: 1px solid var(--border)` -- hover: `inset 0 0 0 1px var(--bb-accent-15)`
- **Elevated**: Additional shadow for emphasis
- **Outlined**: Transparent background with border

**Structure:**
- `.card-body`: `padding: 1.5rem`
- `.card-title`: `font-family: var(--font-display); font-size: 0.85rem; font-weight: 800; text-transform: uppercase`
- `.card-text`: `font-size: 0.72rem; color: var(--dim); line-height: 1.5`
- `.card-footer`: `padding: 0.75rem 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between`

**Superellipse support**: `@supports (corner-shape: superellipse) { corner-shape: superellipse }`

### 9C. Form Components

**Text Input (`.input`):**
- `padding: 0.65rem 1rem`
- `background: var(--surface); border: 1px solid var(--border); color: var(--cream)`
- `font-family: var(--font-mono); font-size: 0.7rem`
- Focus: `border-color: var(--focus-brand); box-shadow: 0 0 0 1px var(--focus-brand)`
- Error: `border-color: var(--error)` + error box-shadow
- Disabled: `opacity: 0.4; cursor: not-allowed`
- Placeholder: `color: var(--dim)`

**Textarea (`.textarea`):**
- Same styling as input + `resize: vertical; min-height: 80px`

**Labels (`.input-label`):**
- `font-family: var(--font-mono); font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.08em`

**Hints/Errors:**
- Hint: `font-size: 0.5rem; color: var(--dim)`
- Error: `font-size: 0.5rem; color: var(--error)`

**Additional form components**: Field (canonical wrapper), FieldLabel, SegmentedControl (pill selector), Toggles

### 9D. Badges

| Variant | Background | Color | Border |
|---------|------------|-------|--------|
| Lime | `var(--bb-accent-10)` | `var(--lime)` | `1px solid var(--bb-accent-20)` |
| Surface | `var(--surface)` | `var(--dim)` | `1px solid var(--border)` |
| Error | `rgba(239, 68, 68, 0.1)` | `var(--error)` | `1px solid rgba(239, 68, 68, 0.2)` |
| Blue | `rgba(0, 153, 255, 0.1)` | `var(--blue)` | `1px solid rgba(0, 153, 255, 0.2)` |
| Solid | `var(--lime)` | `var(--dark)` | none |

**Base**: `padding: 0.25rem 0.75rem; font-family: var(--font-mono); font-size: 0.5rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em`

### 9E. Alerts

| Variant | Background | Border | Color |
|---------|------------|--------|-------|
| Default | `var(--surface)` | `1px solid var(--border)` | `var(--cream)` |
| Success | `var(--bb-accent-05)` | `1px solid var(--bb-accent-20)` | `var(--lime)` |
| Error | `rgba(239, 68, 68, 0.05)` | `1px solid rgba(239, 68, 68, 0.2)` | `var(--error)` |
| Info | `rgba(0, 153, 255, 0.05)` | `1px solid rgba(0, 153, 255, 0.2)` | `var(--blue)` |
| Warning | `var(--warning-bg)` | `1px solid var(--warning-border)` | `var(--warning)` |

**Base**: `padding: 1rem 1.25rem; display: flex; align-items: flex-start; gap: 0.75rem; font-family: var(--font-mono); font-size: 0.65rem`

### 9F. Tables

- Header: `font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.55rem; color: var(--dim); background: var(--surface)`
- Cell: `padding: 0.75rem 1.25rem; border-bottom: 1px solid var(--border); white-space: nowrap; color: var(--cream)`
- Row hover: `background: var(--bb-accent-02)`
- Numeric alignment: `text-align: right; font-variant-numeric: tabular-nums`

### 9G. KPI Cards

- Container: `background: var(--surface); border: 1px solid var(--border); padding: 1.25rem`
- Label: `font-family: var(--font-mono); font-size: 0.55rem; color: var(--dim); text-transform: uppercase; letter-spacing: 0.08em`
- Value: `font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em`
- Trend up: `color: var(--lime)`
- Trend down: `color: var(--error)`

### 9H. Progress & Spinners

**Progress bar**: `height: 6px; background: var(--surface); border: 1px solid var(--border)` -- fill: `var(--lime)` with `transition: width 0.5s ease`

**Spinner**: `width: 24px; height: 24px; border: 2px solid var(--border); border-top-color: var(--lime); border-radius: 50%; animation: bb-spin 0.7s linear infinite`
- Small: 16px
- Large: 36px

### 9I. Feedback Components

- **Toasts**: Success, Error, Warning, Info -- dismissible notifications
- **Modal**: Dialog with open state
- **Notification Center**: Bell icon with unread count
- **Empty States**: Default, Search, Error, Permissions
- **Loading Overlay**: Spinner with size variants (SM, MD, LG)
- **Confirm Sheet**: Default, Destructive, Loading actions

### 9J. Advanced Components

- **Tabs**: Project overview with metrics dashboard
- **Accordion**: Expandable FAQ sections
- **Stepper (Horizontal)**: Workflow stages (Discovery > Architecture > Implementation > QA > Deploy)
- **Stepper (Vertical)**: Process steps (Onboarding > Data Integration > Training > Go Live)

### 9K. Charts

9 chart types available:
1. Bar Chart (SVG) -- monthly + quarterly
2. Donut Chart (SVG) -- categorized data
3. Line Chart -- single/multi-line with grid
4. Area Chart -- monotone, multi-area, linear
5. Pie Chart -- standard, donut, labeled
6. Radar Chart -- single/multi-series
7. Rings Chart -- circular progress (Automacao 85%, Integracao 62%, Adocao 45%)
8. Animated Number -- integer, percentage, currency (R$), compact (K)
9. Chart Tooltip -- multi-item with formatters

---

## 10. PATTERN LIBRARY

### 10A. Grid Patterns (Background Textures)

| Pattern | Class | Spec |
|---------|-------|------|
| Dot Grid | `.pattern-dot-grid` | `radial-gradient(circle, lime 1px, transparent 1px)` at 16px spacing |
| Dot Grid Dense | `.pattern-dot-grid--dense` | 0.8px dots at 8px spacing |
| Dot Grid Sparse | `.pattern-dot-grid--sparse` | 1.2px dots at 32px spacing |
| Crosshair Grid | `.pattern-crosshair-grid` | Lines + dots at 80px spacing |
| Crosshair Tight | `.pattern-crosshair-grid--tight` | 40px spacing |
| Wireframe Perspective | `.pattern-wireframe-perspective` | 60px grid with radial gradient |
| Symbol Grid | `.pattern-symbol-grid` | SVG X-marks at 32px |
| Plus Grid | `.pattern-plus-grid` | SVG plus-signs at 32px |

### 10B. HUD Frames

| Element | Class | Spec |
|---------|-------|------|
| Frame Bracket | `.frame-bracket` | Corner brackets (TL + BR) via pseudo-elements, 24px, 2px lime |
| Frame Bracket Full | `.frame-bracket--full` | All 4 corners |
| Frame Tech | `.frame-tech` | `clip-path` with 12px clipped corners, 1px lime border |
| Frame Tech Small | `.frame-tech--sm` | 8px corner clips |
| Frame Tech Large | `.frame-tech--lg` | 20px corner clips |
| Frame Notch TR | `.frame-notch-tr` | 16px top-right notch via clip-path |
| Frame Notch BL | `.frame-notch-bl` | 16px bottom-left notch |
| Frame Notch Both | `.frame-notch-both` | Dual diagonal notches |

### 10C. Hazard/Warning Patterns

| Pattern | Class | Spec |
|---------|-------|------|
| Hazard Stripes | `.pattern-hazard` | 10px repeating diagonal stripes (lime on dark) |
| Hazard Thin | `.pattern-hazard--thin` | 5px bands |
| Hazard Subtle | `.pattern-hazard--subtle` | 15% opacity translucent stripes |
| Warning Bar | `.bar-warning` | Solid lime bar with monospace text + stripe accent |

### 10D. Circuit Traces

| Pattern | Class | Spec |
|---------|-------|------|
| Circuit Trace H | `.pattern-circuit-h` | SVG path with solder points, 20px height |
| Circuit Board | `.pattern-circuit-board` | 80px tiling SVG, vertical + horizontal traces |

### 10E. Textures

| Texture | Class | Spec |
|---------|-------|------|
| Scanlines | `.pattern-scanlines` | 2px lines, 15% opacity |
| Scanlines Heavy | `.pattern-scanlines--heavy` | 1px lines, 25% opacity |
| Noise Texture | `.pattern-noise` | SVG fractalNoise, 4% opacity, overlay blend |
| Data Rain | `.pattern-data-rain` | 40px columns with neon gradient |
| Industrial Surface | `.pattern-industrial` | Multi-stop gradient, inset effects |

### 10F. Dividers

| Divider | Class | Spec |
|---------|-------|------|
| Tech Divider | `.divider-tech` | Centered gradient (transparent to lime from both sides) |
| Arrow Divider | `.divider-arrow` | Left line with right-facing arrow |
| Dashed Divider | `.divider-dashed` | 8px dashes, 50% opacity |
| Double Divider | `.divider-double` | Two parallel lines, 5px apart |

---

## 11. VISUAL EFFECTS (VFX)

### 11A. Film Grain

Opacity variants: 5%, 10%, 15%, 25% using SVG fractalNoise overlay with `mix-blend-mode: overlay`.

### 11B. Blend Modes

Available: multiply, screen, overlay, soft-light, color-dodge, difference

### 11C. Blur Effects

Backdrop filter levels: 0px, 4px, 8px, 16px

### 11D. Glow Effects

- **Neon Glow**: `box-shadow: 0 0 8px rgba(209, 255, 0, 0.4), 0 0 24px rgba(209, 255, 0, ...)`
- **Soft Glow**: Subdued version
- **Ring Glow**: Circular glow ring

### 11E. Overlay Composites

- Scanlines (CRT effect)
- CRT Effect (combined)
- Vignette
- Edge Fade

### 11F. Ticker/Marquee

Infinite horizontal scroll using `@keyframes bb-ticker-scroll` with `translateX(-50%)`.

---

## 12. ICON SYSTEM

### 12A. Specifications

- **Stroke width**: Always 2px at all sizes
- **Stroke caps/joins**: Round (`stroke-linecap: round; stroke-linejoin: round`)
- **Base viewBox**: 24x24 (canonical)
- **Fill approach**: Stroke only, no fills
- **Color inheritance**: `currentColor`
- **Minimum touch target**: 44x44px

### 12B. Sizes

| Size | Pixels | Usage |
|------|--------|-------|
| Inline | 16px | Tight spaces |
| Default | 24px | Standard UI |
| Card | 32px | Cards, emphasis |
| Hero | 48px | Hero elements, features |

### 12C. Color Variants

| Variant | Token |
|---------|-------|
| Default/Cream | `var(--cream)` |
| Brand/Lime | `var(--lime)` |
| Muted/Dim | `var(--dim)` |
| Error/Destructive | `var(--error)` |
| Info/Blue | `var(--blue)` |
| Warning/Flare | `var(--flare)` |

### 12D. Available Icons

Check, Close, Plus, Minus, Chevron R/L/D, Arrow R, Search, Sun, Grid, Moon

---

## 13. SECTION TEMPLATES

19 marketing section types documented:

| # | Section | Status |
|---|---------|--------|
| 1 | Hero | REBUILD |
| 2 | Stats (KPI cards) | REBUILD |
| 3 | Problem/Solution Gallery | REBUILD |
| 4 | Services (6-column) | REBUILD |
| 5 | How It Works (6-phase timeline) | REBUILD |
| 6 | Featured Case Study | REBUILD |
| 7 | Testimonials (3-card) | REBUILD |
| 8 | Pricing Table (3-tier) | REBUILD |
| 9 | FAQ (6 expandable) | REBUILD |
| 10 | Book Call (lead gen form) | REBUILD |
| 11 | Contact Form | CREATE |
| 12 | ROI Calculator (interactive) | CREATE |
| 13 | Newsletter Signup | CREATE |
| 14 | Device Mockups (tabbed) | CREATE |
| 15 | Careers & Locations | CREATE |
| 16 | Grain Overlay | CREATE |
| 17 | Footer | ENHANCE |

---

## 14. PAGE TEMPLATES

### 14A. Page Shell

Standard structure: `sticky nav > page header > section dividers > footer`

```html
<nav class="site-nav">
<header class="page-header">
<div class="section-divider">
<footer class="page-footer">
```

### 14B. Dashboard Grid (Bento 4-Col)

Asymmetric grid: `grid-template-columns: repeat(4, 1fr)` with span-2 and span-3 cells.

### 14C. Content Grid (Auto-fit)

Responsive: `grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))`

---

## 15. SEO & METADATA

### 15A. Meta Tags

- **Title**: Max 60 chars. Format: "AIOX Squad -- [descriptor]"
- **Description**: Max 155 chars
- **Robots**: `index, follow`
- **Canonical**: `https://aiox.ai/`

### 15B. Open Graph

```html
<meta property="og:title" content="AIOX Squad — AI Automation" />
<meta property="og:description" content="Scale operations 10x without hiring 100 people." />
<meta property="og:type" content="website" />
<meta property="og:image" content="/referencias/outras/aiox_grid_final.webp" />
<meta property="og:url" content="https://aiox.ai" />
```

### 15C. Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@aioxsquad" />
<meta name="twitter:title" content="AIOX Squad — AI Automation" />
<meta name="twitter:image" content="[1200x600 recommended]" />
```

### 15D. Structured Data

Schema.org Organization JSON-LD with name, URL, logo, description, social profiles.

---

## 16. EDITORIAL GUIDELINES

### 16A. Voice Traits

- Empowering, Direct, Rebellious, Clear, Passionate, Courageous
- "We say what we mean. No jargon, no fluff, no wasted words."

### 16B. Mandatory Phrases

- "Agora o controle e seu" (Now control is yours)
- "A IA nao e o heroi. Voce e." (AI isn't the hero. You are.)
- "Terminal nao e o fim"
- "X marks the spot"

### 16C. Writing Rules

- Clarity over complexity -- cut noise, reveal truth
- Real results, no hype -- use evidence and testimonials
- Brevity: max 125 chars for key quotes
- Empowerment language: never "do it for you," always "reveal the path"
- No em dashes

### 16D. Banned Words

Magico/Magia, Revolucionario, Disruptivo, Facil/Simples, Game-changer

---

## 17. REIS IA CROSS-REFERENCE

### 17A. Aligned Patterns (Can Adopt)

| AIOX Pattern | Reis IA Equivalent | Compatibility |
|-------------|-------------------|---------------|
| Dark-first surfaces | Surface system #000-#1A1A1A | HIGH -- both use layered dark surfaces |
| Opacity-based text hierarchy | Text opacity scale (100/70/50/35/20) | HIGH -- similar approach |
| Monospace for labels/meta | Label token (uppercase, tracked) | MEDIUM -- Reis IA uses Inter for everything |
| CSS class-based scroll animations | Scroll reveal system | HIGH -- identical approach |
| Accent opacity ladder | Border/text opacity scales | HIGH -- could adopt graduated accent opacity |
| 1px gap grid with border backgrounds | Not present | NEW -- interesting grid technique |
| Inset box-shadow for card hover | Card hover uses shadow | MEDIUM -- different hover technique |
| Pattern library (dots, crosshair, noise) | Grain texture only | NEW -- could expand texture library |
| KPI card component | Not formalized | NEW -- useful for case study metrics |
| `corner-shape: superellipse` progressive enhancement | Not present | NEW -- future-proof CSS |

### 17B. Conflicting Patterns (Do Not Adopt)

| AIOX Pattern | Reis IA Conflict | Reason |
|-------------|-----------------|--------|
| Lime/Neon accent (#D1FF00) | Blue accent (#4A90FF) | Different brand identity |
| Cream/warm text tones | Pure white text | Reis IA uses white, not cream |
| TASA Orbiter Display font | Inter only | Reis IA is single-font system |
| HUD/cockpit aesthetic | Minimal geometric, Apple-level | Different visual language |
| Hazard stripes, circuit traces | No industrial patterns | Too aggressive for consultancy |
| Pricing tables, SaaS patterns | No pricing, CTAs to /agendar | Reis IA is NOT SaaS |
| 3 breakpoints (767/768/1200) | 5 breakpoints (0/768/1024/1280/1536) | Reis IA needs finer control |

### 17C. Patterns Worth Considering for Reis IA

1. **Accent opacity ladder** -- AIOX's graduated accent opacity (02-90) is more systematic than Reis IA's current approach. Consider creating `--blue-02` through `--blue-90` tokens for the blue accent.

2. **1px-gap grid technique** -- Using `gap: 1px; background: var(--border)` creates elegant grid dividers without explicit border styling. Could work for pillar cards and feature grids.

3. **Inset border hover** -- `box-shadow: inset 0 0 0 1px` for card hover is cleaner than changing border-color because it avoids layout shift.

4. **Pattern noise overlay** -- The SVG fractalNoise technique at 4% opacity with overlay blend adds analog dimension. Reis IA already has grain but could refine the implementation.

5. **KPI card pattern** -- Formalized KPI display with label/value/trend structure would serve case study and results sections well.

6. **Superellipse progressive enhancement** -- `@supports (corner-shape: superellipse)` for cards and buttons is forward-looking CSS.

7. **shadcn/ui token mapping** -- If Reis IA ever adopts shadcn components, AIOX's mapping structure is a useful reference.

8. **Dual theme system** -- AIOX's lime/gold theme switching via CSS variables demonstrates how to architect a theme-switchable system. Reis IA could consider a secondary theme variation.

9. **Section labeling convention** -- AIOX uses monospace, uppercase, 0.6rem labels with 0.08em tracking for section headers. Reis IA's Label token already does this but could be more consistently applied.

10. **Chart color palette** -- The 6-color chart palette is well-balanced. Reis IA should define chart-specific colors for any data visualization needs.

---

## EXTRACTION NOTES

- **Framework**: Next.js with React Server Components, Tailwind CSS v4.2.1
- **CSS Architecture**: `@layer brandbook-bridge` for custom styles, Tailwind utilities for layout
- **Theme system**: CSS custom properties with lime/gold theme variants
- **Font hosting**: CDN-hosted Geist (variable), TASA Orbiter Display (CDN from cdnfonts), Roboto Mono
- **Limitation**: Some page content was heavily minified/serialized React component data, limiting extraction of interactive behavior details. The CSS files provided the most reliable source of exact values.

---

[ADDED -- 2026-03-17]

## Source Code Extraction Findings (Phase 1 -- 5 Files Merged)

Sources:
- `source-code-extractions/aiox-motion-source.md` -- Motion system
- `source-code-extractions/aiox-effects-source.md` -- Effects library
- `source-code-extractions/aiox-vfx-source.md` -- VFX system
- `source-code-extractions/aiox-components-source.md` -- Component source code
- `source-code-extractions/aiox-interactive-patterns.md` -- Interactive patterns

---

### A. MOTION SYSTEM

#### A1. 3 Core Easing Curves

```css
:root {
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);   /* Bouncy overshoot -- buttons, modals, toasts */
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);     /* General purpose -- page transitions, fades */
  --ease-decel:  cubic-bezier(0, 0, 0.2, 1);            /* Deceleration -- entrance reveals, scroll-triggered */
}
```

Additional easing from LP sections:
```css
--motion-easing-spring: cubic-bezier(0.16, 1, 0.3, 1); /* Primary entrance easing (scroll reveals) */
```

#### A2. 8 Logo Animations (Framer Motion)

**01 -- Orchestration Pulse** (3.5s, hero/splash):
```tsx
// Seed dot appears first
const seedDot = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
};

// Letters stagger in
const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
  })
};

// Glow ring pulse (continuous)
const glowRing = {
  animate: {
    boxShadow: [
      "0 0 8px rgba(209,255,0,0.4), 0 0 24px rgba(209,255,0,0.2)",
      "0 0 16px rgba(209,255,0,0.6), 0 0 48px rgba(209,255,0,0.3)",
      "0 0 8px rgba(209,255,0,0.4), 0 0 24px rgba(209,255,0,0.2)"
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
};
```

**04 -- Logo Dissolve** (3s, exit/fade):
```tsx
const letterDissolve = (i: number) => ({
  animate: {
    opacity: [1, 0.8, 1, 0.5, 0.9, 0.2, 0],
    filter: ["blur(0px)", "blur(0px)", "blur(1px)", "blur(2px)", "blur(1px)", "blur(3px)", "blur(8px)"]
  },
  transition: {
    duration: 2 + Math.random() * 1,
    delay: i * 0.2 + Math.random() * 0.3,
    ease: "easeIn"
  }
});
```

**07 -- Stagger Letters** (1.5s, navbar/footer):
```tsx
const letterStagger = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: i * 0.06, type: "spring", stiffness: 150, damping: 12 }
  })
};

// Neon underline expands after letters settle
const underline = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { delay: 0.8, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
  }
};
```

**08 -- Brand Reveal** (3s, landing hero):
```tsx
// Two blind panels slide away from center
const blindLeft = {
  initial: { x: "0%" },
  animate: { x: "-100%" },
  transition: { duration: 1.2, ease: [0, 0, 0.2, 1], delay: 0.3 }
};

// Logo reveals with scale + glow
const logoReveal = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, textShadow: "0 0 40px rgba(209,255,0,0.6)" },
  transition: { delay: 1.0, duration: 1.0, ease: [0.34, 1.56, 0.64, 1] }
};
```

#### A3. Stagger System

```tsx
// Parent container with staggerChildren
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } }
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
    />
  ))}
</motion.div>
```

**Stagger values:**
- `0.04` for tight lists (table rows, tags)
- `0.08` for card grids
- `0.1` for larger section elements

#### A4. Ticker / Marquee

```css
@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes ticker-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
```

Duplication pattern for seamless loop:
```tsx
const tickerItems = [...logos, ...logos, ...logos]; // 3x for seamless
```

---

### B. EFFECTS LIBRARY

#### B1. Glow System (3 Types)

```css
/* Neon Glow -- primary brand effect */
.glow-neon {
  box-shadow:
    0 0 8px rgba(209, 255, 0, 0.4),
    0 0 24px rgba(209, 255, 0, 0.2);
}

/* Soft Glow -- subtle emphasis */
.glow-soft {
  box-shadow: 0 0 16px rgba(209, 255, 0, 0.15);
}

/* Ring Glow -- focus rings, selected states */
.glow-ring {
  box-shadow:
    0 0 0 2px rgba(209, 255, 0, 0.3),
    0 0 16px rgba(209, 255, 0, 0.15);
}

/* Pulsating neon */
@keyframes neon-pulse {
  0%, 100% {
    box-shadow: 0 0 8px rgba(209, 255, 0, 0.4), 0 0 24px rgba(209, 255, 0, 0.2);
  }
  50% {
    box-shadow: 0 0 16px rgba(209, 255, 0, 0.6), 0 0 48px rgba(209, 255, 0, 0.3);
  }
}

/* Text glow */
.text-glow {
  text-shadow: 0 0 8px rgba(209, 255, 0, 0.4), 0 0 24px rgba(209, 255, 0, 0.2);
}
```

#### B2. Grid Patterns

```css
/* Dot Grid -- 16px spacing */
.pattern-dot-grid {
  background-image: radial-gradient(circle, rgba(209,255,0,0.3) 1px, transparent 1px);
  background-size: 16px 16px;
}

/* Crosshair Grid -- 80px */
.pattern-crosshair-grid {
  background-image:
    linear-gradient(rgba(209,255,0,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(209,255,0,0.1) 1px, transparent 1px),
    radial-gradient(circle, rgba(209,255,0,0.3) 2px, transparent 2px);
  background-size: 80px 80px, 80px 80px, 80px 80px;
}

/* Wireframe Perspective */
.pattern-wireframe-perspective {
  background-image:
    linear-gradient(rgba(209,255,0,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(209,255,0,0.08) 1px, transparent 1px),
    radial-gradient(ellipse at center, rgba(209,255,0,0.15) 0%, transparent 60%);
  background-size: 60px 60px, 60px 60px, 100% 100%;
}
```

#### B3. HUD Frames

```css
/* Frame Bracket -- corner brackets (TL + BR) */
.frame-bracket::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 24px; height: 24px;
  border-top: 1px solid #D1FF00;
  border-left: 1px solid #D1FF00;
}
.frame-bracket::after {
  content: "";
  position: absolute;
  bottom: 0; right: 0;
  width: 24px; height: 24px;
  border-bottom: 1px solid #D1FF00;
  border-right: 1px solid #D1FF00;
}

/* Frame Tech -- clip-path polygon with clipped corners */
.frame-tech {
  clip-path: polygon(
    12px 0%, calc(100% - 12px) 0%,
    100% 12px, 100% calc(100% - 12px),
    calc(100% - 12px) 100%, 12px 100%,
    0% calc(100% - 12px), 0% 12px
  );
  border: 1px solid #D1FF00;
}
```

#### B4. Textures & Dividers

```css
/* Scanlines */
.pattern-scanlines {
  background: repeating-linear-gradient(
    0deg, transparent, transparent 2px,
    rgba(209,255,0,0.15) 2px, rgba(209,255,0,0.15) 4px
  );
}

/* Tech Divider */
.divider-tech {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(209,255,0,0.5), transparent);
}

/* Arrow Divider */
.divider-arrow::before {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #D1FF00);
}
.divider-arrow::after {
  content: "";
  width: 0; height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 8px solid #D1FF00;
}

/* Dashed Divider */
.divider-dashed {
  height: 1px;
  background: repeating-linear-gradient(
    90deg, rgba(209,255,0,0.5), rgba(209,255,0,0.5) 8px,
    transparent 8px, transparent 16px
  );
}
```

---

### C. VFX SYSTEM

#### C1. Film Grain SVG (4 Intensities)

```css
.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 1;
}

.grain-5::after  { opacity: 0.05; }  /* Subtle -- background texture, hero */
.grain-10::after { opacity: 0.10; }  /* Light */
.grain-15::after { opacity: 0.15; }  /* Medium */
.grain-25::after { opacity: 0.25; }  /* Heavy -- dramatic overlays */
```

**React component:**
```tsx
const GrainOverlay = ({ opacity = 0.05, className }) => (
  <div
    className={cn("pointer-events-none absolute inset-0 z-10", className)}
    style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,...")`,
      mixBlendMode: "overlay"
    }}
  />
);
```

#### C2. Blend Modes (6 Documented)

```css
.blend-multiply    { mix-blend-mode: multiply; }
.blend-screen      { mix-blend-mode: screen; }
.blend-overlay     { mix-blend-mode: overlay; }
.blend-soft-light  { mix-blend-mode: soft-light; }
.blend-color-dodge { mix-blend-mode: color-dodge; }
.blend-difference  { mix-blend-mode: difference; }
```

#### C3. Backdrop Blur Scale

```css
.blur-none   { backdrop-filter: blur(0px); }
.blur-subtle { backdrop-filter: blur(4px); }
.blur-medium { backdrop-filter: blur(8px); }
.blur-heavy  { backdrop-filter: blur(16px); }

/* Glass panel implementation */
.glass-panel {
  backdrop-filter: var(--glass-blur);  /* blur(10px) */
  -webkit-backdrop-filter: var(--glass-blur);
  background: rgba(15, 15, 17, 0.92);
  border: 1px solid rgba(156, 156, 156, 0.15);
}
```

#### C4. Overlay Composites

```css
/* Vignette */
.overlay-vignette::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.5) 100%);
  pointer-events: none;
}

/* Edge Fade (vertical) */
.overlay-edge-fade::after {
  background: linear-gradient(
    to bottom,
    rgba(5, 5, 5, 0.8) 0%, transparent 15%,
    transparent 85%, rgba(5, 5, 5, 0.8) 100%
  );
}

/* Edge Fade (horizontal) */
.overlay-edge-fade-h::after {
  background: linear-gradient(
    to right,
    rgba(5, 5, 5, 0.8) 0%, transparent 15%,
    transparent 85%, rgba(5, 5, 5, 0.8) 100%
  );
}
```

---

### D. COMPONENT SOURCE CODE

#### D1. Token System (Complete Lime/Gold Themes)

```css
/* === LIME THEME === */
:root {
  --bb-lime: oklch(0.934 0.2264 121.95);  /* #D1FF00 */
  --bb-dark: oklch(0.1149 0 0);            /* #050505 */
  --bb-surface: oklch(0.1693 0.0041 285.95); /* #0F0F11 */
  --bb-cream: oklch(0.9639 0.0158 106.69);  /* #F4F4E8 */
}

/* === GOLD THEME === */
[data-theme="gold"] {
  --bb-lime: #DDD1BB;
  --bb-dark: #121213;
  --bb-surface: #151517;
  --bb-cream: #F4F4F4;
  --bb-border: rgba(255, 255, 255, 0.09);
}
```

#### D2. 14-Step Accent Opacity Ladder

```css
:root {
  --bb-accent-02: rgba(209, 255, 0, 0.02);
  --bb-accent-04: rgba(209, 255, 0, 0.04);
  --bb-accent-05: rgba(209, 255, 0, 0.05);
  --bb-accent-06: rgba(209, 255, 0, 0.06);
  --bb-accent-08: rgba(209, 255, 0, 0.08);
  --bb-accent-10: rgba(209, 255, 0, 0.10);
  --bb-accent-12: rgba(209, 255, 0, 0.12);
  --bb-accent-15: rgba(209, 255, 0, 0.15);
  --bb-accent-20: rgba(209, 255, 0, 0.20);
  --bb-accent-25: rgba(209, 255, 0, 0.25);
  --bb-accent-40: rgba(209, 255, 0, 0.40);
  --bb-accent-50: rgba(209, 255, 0, 0.50);
  --bb-accent-75: rgba(209, 255, 0, 0.75);
  --bb-accent-90: rgba(209, 255, 0, 0.90);
}

/* Gold theme equivalent */
[data-theme="gold"] {
  --bb-accent-02: rgba(221, 209, 187, 0.02);
  /* ... through ... */
  --bb-accent-90: rgba(221, 209, 187, 0.90);
}
```

#### D3. shadcn/ui Mapping

```css
:root {
  --background: var(--bb-canvas);          /* #050505 */
  --foreground: var(--bb-cream);           /* #F4F4E8 */
  --primary: var(--bb-lime);               /* #D1FF00 */
  --primary-foreground: var(--bb-dark);    /* #050505 */
  --secondary: var(--bb-surface-alt);
  --muted: var(--bb-surface-panel);
  --muted-foreground: var(--bb-dim);
  --accent: var(--bb-accent-10);
  --accent-foreground: var(--bb-lime);
  --destructive: var(--bb-error);          /* #EF4444 */
  --border: var(--bb-border);
  --input: var(--bb-border-input);
  --ring: var(--bb-accent-40);
  --card: var(--bb-surface);               /* #0F0F11 */
  --card-foreground: var(--bb-cream);
  --radius: 0.5rem;
}
```

#### D4. AccentButton with Arrow Glyph

```tsx
const AccentButton = ({ variant = "lime", arrow = true, href, children }) => (
  <a
    href={href}
    className={cn(
      "inline-flex items-center gap-2",
      "px-5 py-3.5 min-w-[200px]",
      "text-[11px] font-bold uppercase tracking-[0.15em]",
      "transition-all duration-200",
      variant === "lime" && "bg-[#D1FF00] text-[#050505] hover:bg-[#D1FF00]/90",
      variant === "dark" && "bg-[#050505] text-[#F4F4E8] border border-white/15 hover:bg-white/5",
      variant === "ghost" && "bg-transparent text-[#F4F4E8] hover:bg-white/5"
    )}
  >
    {children}
    {arrow && <span>&#8599;</span>} {/* Arrow glyph */}
  </a>
);
```

#### D5. Accordion with AnimatePresence

```tsx
const Accordion = ({ items, defaultOpen = "01" }) => {
  const [openId, setOpenId] = useState(defaultOpen);

  return (
    <div className="divide-y divide-[var(--bb-border)]">
      {items.map((item) => (
        <div key={item.id} className={cn(
          "transition-colors",
          openId === item.id && "bg-[var(--bb-accent-04)]"
        )}>
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full flex items-center justify-between p-4"
          >
            <div className="flex items-center gap-3">
              <span className="h-6 w-6 rounded-full bg-[var(--bb-lime)] text-[var(--bb-dark)] flex items-center justify-center text-[10px] font-bold">
                {item.id}
              </span>
              <span className="text-sm font-medium text-[var(--bb-cream)]">{item.title}</span>
            </div>
            <Plus className={cn(
              "w-4 h-4 text-[var(--bb-dim)] transition-transform duration-200",
              openId === item.id && "rotate-45"
            )} />
          </button>
          <AnimatePresence>
            {openId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 text-sm text-[var(--bb-dim)]">{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
```

#### D6. Skeleton Loading

```css
.skeleton-text {
  height: 12px;
  border-radius: var(--radius);
  background: linear-gradient(
    90deg,
    var(--bb-surface-alt) 25%,
    var(--bb-surface-hover-strong) 50%,
    var(--bb-surface-alt) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

### E. INTERACTIVE PATTERNS

#### E1. Click-to-Replay

```tsx
const ReplayableDemo = ({ children, label }) => {
  const [key, setKey] = useState(0);

  return (
    <div onClick={() => setKey(prev => prev + 1)} className="relative cursor-pointer group">
      <motion.div key={key}>
        {children}
      </motion.div>
      <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/30 group-hover:text-white/50 transition-colors">
        click to replay
      </span>
    </div>
  );
};
```

#### E2. Hairline Grid (gap-px Technique)

```html
<!-- gap-px + colored parent = hairline grid lines -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-lg overflow-hidden">
  <div class="bg-[var(--bb-dark)] p-6 min-h-[200px]">...</div>
  <div class="bg-[var(--bb-dark)] p-6 min-h-[200px]">...</div>
  <div class="bg-[var(--bb-dark)] p-6 min-h-[200px]">...</div>
  <div class="bg-[var(--bb-dark)] p-6 min-h-[200px]">...</div>
</div>
```

**How it works:** The parent has `gap: 1px` and a semi-transparent background. Children have opaque backgrounds. The 1px gaps reveal the parent's background as hairline grid dividers.

#### E3. SectionShell Architecture

```tsx
interface SectionShellProps {
  variant: "dark" | "light";
  fullBleed?: boolean;
  id?: string;
  children: React.ReactNode;
}

const SectionShell = ({ variant = "light", fullBleed = false, id, children }) => (
  <section
    id={id}
    className={cn(
      "py-24 md:py-32",
      variant === "dark" ? "bg-[#050505] text-[#F4F4E8]" : "bg-[#F5F4E7] text-[#050505]",
      !fullBleed && "mx-auto max-w-[1400px] px-6 md:px-10"
    )}
  >
    {children}
  </section>
);
```

**SectionHeader (numbered label):**
```tsx
const SectionHeader = ({ number, label }) => (
  <div className="mb-14 flex items-center gap-2">
    <span className="font-mono text-[11px] tracking-[0.2em] text-[#D1FF00]">[{number}]</span>
    <span className="font-mono text-[11px] tracking-[0.2em] text-white/40 uppercase">{label}_</span>
  </div>
);
```

#### E4. Interactive Staircase (HowItWorks)

```tsx
const [hovered, setHovered] = useState(0);

{steps.map((step, i) => (
  <div
    key={i}
    style={{ marginTop: isMobile ? '24px' : `${i * 50 + 24}px` }}
    onMouseEnter={() => setHovered(i)}
  >
    {/* step content */}
  </div>
))}

// Progress bar tracks hovered step
<div
  className="h-1 bg-aiox-lime transition-all duration-300"
  style={{ width: `${((hovered + 1) / steps.length) * 100}%` }}
/>

// 48-column tick marks
{Array.from({ length: 48 }).map((_, i) => (
  <div key={i} className="flex-1 border-l border-black/15 h-3" />
))}
```

#### E5. Theme Toggle System

```tsx
const ThemeToggle = () => {
  const [theme, setTheme] = useState("lime");

  return (
    <div className="flex gap-1 p-1 rounded-full border border-[var(--bb-border)]">
      <button
        onClick={() => setTheme("lime")}
        className={cn(
          "px-3 py-1 text-[9px] font-mono uppercase rounded-full transition-colors",
          theme === "lime" ? "bg-[#D1FF00] text-[#050505]" : "text-[var(--bb-dim)]"
        )}
      >Lime</button>
      <button
        onClick={() => setTheme("gold")}
        className={cn(
          "px-3 py-1 text-[9px] font-mono uppercase rounded-full transition-colors",
          theme === "gold" ? "bg-[#DDD1BB] text-[#050505]" : "text-[var(--bb-dim)]"
        )}
      >Gold</button>
    </div>
  );
};
```

CSS switches via `[data-theme="gold"]` attribute on root, overriding all `--bb-*` custom properties.

#### E6. Dark/Light Section Alternation Pattern

```
Navbar        -> dark/95 (fixed, transparent)
Hero          -> dark
WhoWeAre      -> light
PainPoints    -> dark -> light (dual)
Services      -> dark
HowItWorks    -> light
CustomerStory -> dark
Testimonials  -> light
TechStack     -> dark (fullBleed)
Pricing       -> dark
FAQ           -> cream
Articles      -> dark
Contact       -> light
Footer        -> dark
```

---

### F. COMPLETE VFX TOKEN SUMMARY

```css
:root {
  /* Grain */
  --grain-subtle:  0.05;
  --grain-light:   0.10;
  --grain-medium:  0.15;
  --grain-heavy:   0.25;

  /* Blur */
  --blur-subtle:   4px;
  --blur-medium:   8px;
  --blur-heavy:    16px;
  --glass-blur:    10px;
  --glass-soft:    5px;

  /* Glow */
  --glow-neon:     0 0 8px rgba(209,255,0,0.4), 0 0 24px rgba(209,255,0,0.2);
  --glow-soft:     0 0 16px rgba(209,255,0,0.15);
  --glow-ring:     0 0 0 2px rgba(209,255,0,0.3), 0 0 16px rgba(209,255,0,0.15);

  /* Surface overlay */
  --surface-overlay: rgba(15, 15, 17, 0.92);

  /* Neon */
  --neon:            #D1FF00;
  --neon-dim:        rgba(209, 255, 0, 0.15);
  --neon-glow:       rgba(209, 255, 0, 0.4);
  --lime-glow:       rgba(209, 255, 0, 0.25);
  --lime-glow-soft:  rgba(209, 255, 0, 0.1);
}
```

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-16 | Initial reference document created (180+ tokens, 60+ components from 26 pages) |
| 2026-03-17 | Appended Phase 1 source code extractions (5 files merged): motion system (8 logo animations, 3 easing curves, stagger system, ticker/marquee), effects library (glow system with 3 types + pulsating, grid patterns, HUD frames, textures, dividers), VFX system (film grain SVG at 4 intensities, blend modes, backdrop blur scale, glass panels, overlay composites), component source code (complete lime/gold theme tokens, 14-step accent opacity ladder, shadcn/ui mapping, AccentButton, accordion with AnimatePresence, skeleton loading), interactive patterns (click-to-replay, hairline grid gap-px technique, SectionShell architecture, staircase layout, theme toggle, dark/light alternation pattern) |
