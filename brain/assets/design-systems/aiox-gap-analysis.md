# AIOX -> Reis IA Design System Gap Analysis

Last updated: 2026-03-17

> **Owner**: analysis-agent
> **Status**: Complete -- Initial Analysis
> **Consumed by**: designer-agent, dev-agent, orchestrator
> **Input sources**: reis-ia-design-system.md, reis-ia-implementation-guide.md, reference-aiox.md, snippets-aiox.md, components-aiox.md, aiox-full-extraction/ (45 files)

---

## Executive Summary

The Reis IA Design System v1.0 is architecturally strong but has meaningful gaps compared to the AIOX extraction in 6 areas: (1) it lacks a fine-grained numeric spacing scale, (2) it has no accent opacity ladder, (3) it has no border radius token scale, (4) it uses an irregular z-index system, (5) it has no shadcn/ui token bridge, and (6) its component catalog is significantly smaller. In 4 areas Reis IA is equal or superior: typography fluid scaling, easing curve library, shadow system, and container/layout system. The remaining areas (motion keyframes, VFX patterns, section labeling, hairline grid) represent AIOX patterns that should be selectively adopted after brand adaptation.

---

## Category-by-Category Analysis

### 1. Spacing Scale

**Reis IA current** (8 named fluid tokens):
```
--space-xs:  4px (static)
--space-sm:  8px (static)
--space-md:  16px (static)
--space-lg:  clamp(24px, 1vw + 20px, 32px)
--space-xl:  clamp(32px, 2vw + 24px, 48px)
--space-2xl: clamp(48px, 4vw + 32px, 80px)
--space-3xl: clamp(64px, 7vw + 36px, 120px)
--space-4xl: clamp(80px, 10vw + 40px, 160px)
```

**AIOX reference** (5 named + 14-step numeric):

Named scale:
```
--spacing-xs: 0.5rem  (8px)
--spacing-sm: 1rem    (16px)
--spacing-md: 2rem    (32px)
--spacing-lg: 3rem    (48px)
--spacing-xl: 4rem    (64px)
```

14-step numeric scale:
```
--space-0:  0px       --space-7:  40px
--space-1:  4px       --space-8:  60px
--space-2:  8px       --space-9:  80px
--space-3:  12px      --space-10: 90px
--space-4:  15px      --space-11: 120px
--space-5:  20px      --space-12: 150px
--space-6:  30px      --space-13: 180px
```

Also: `--bb-gutter: clamp(1rem, 3vw, 2rem)` for responsive horizontal padding.

**Gap**: Reis IA has strong fluid tokens for section-level spacing but lacks fine-grained steps for component internals. There is no 12px, 15px, 20px, 30px, or 40px token -- component padding must use arbitrary values or Tailwind defaults. Reis IA also lacks a 0px token (useful for conditionally removing spacing).

**Recommendation**: Add a numeric supplement scale alongside the existing named tokens. Keep the existing fluid `--space-*` tokens for section-level spacing and add a `--gap-*` numeric scale for component internals:

```css
/* Component-level spacing (static, non-fluid) */
--gap-0:  0px;
--gap-1:  4px;    /* = --space-xs */
--gap-2:  8px;    /* = --space-sm */
--gap-3:  12px;
--gap-4:  16px;   /* = --space-md */
--gap-5:  20px;
--gap-6:  24px;
--gap-7:  32px;
--gap-8:  40px;
--gap-9:  48px;
--gap-10: 64px;
```

This is a 10-step scale (cleaner than AIOX's 14) using 4px/8px base increments. It covers the micro-interaction gaps that the existing fluid tokens skip. Do NOT replace the existing `--space-*` tokens -- both systems coexist: `--space-*` for section/layout, `--gap-*` for components.

---

### 2. Accent Opacity Ladder

**Reis IA current**: No accent opacity ladder exists. The only accent opacity values are:
- `rgba(74, 144, 255, 0.10)` -- badge background (inline, not tokenized)
- `rgba(74, 144, 255, 0.20)` -- badge border (inline, not tokenized)
- `rgba(74, 144, 255, 0.30)` -- `--border-accent`, selection background (tokenized)
- `rgba(74, 144, 255, 0.06)` -- ambient gradient (inline in gradient definitions)
- `rgba(74, 144, 255, 0.12)` -- `--shadow-blue-glow` (baked into shadow value)
- `rgba(74, 144, 255, 0.08)` -- `blue-glow-sm` shadow (inline)

These values are scattered, some tokenized, some inline magic numbers.

**AIOX reference** (15-step graduated ladder):
```css
--bb-accent-02: rgba(209, 255, 0, 0.02);
--bb-accent-05: rgba(209, 255, 0, 0.05);
--bb-accent-08: rgba(209, 255, 0, 0.08);
--bb-accent-10: rgba(209, 255, 0, 0.10);
--bb-accent-15: rgba(209, 255, 0, 0.15);
--bb-accent-20: rgba(209, 255, 0, 0.20);
--bb-accent-25: rgba(209, 255, 0, 0.25);
--bb-accent-30: rgba(209, 255, 0, 0.30);
--bb-accent-40: rgba(209, 255, 0, 0.40);
--bb-accent-50: rgba(209, 255, 0, 0.50);
--bb-accent-60: rgba(209, 255, 0, 0.60);
--bb-accent-70: rgba(209, 255, 0, 0.70);
--bb-accent-80: rgba(209, 255, 0, 0.80);
--bb-accent-90: rgba(209, 255, 0, 0.90);
```

These are used for: row hover (`02`), badge bg (`10`), card hover inset shadow (`15`, `20`), glow effects (`25`, `40`), border accents (`20`, `30`), and solid fills at high opacity.

**Gap**: This is one of the most significant gaps. Reis IA uses scattered inline rgba values for blue opacity where AIOX has a systematic ladder. Adding a ladder would eliminate magic numbers and make the accent system composable.

**Recommendation**: Create a 12-step blue accent opacity ladder (fewer than AIOX's 15 -- Reis IA doesn't need the aggressive high-opacity steps since it uses blue more sparingly):

```css
/* Blue Accent Opacity Ladder */
--blue-02: rgba(74, 144, 255, 0.02);   /* Row/cell hover tint */
--blue-04: rgba(74, 144, 255, 0.04);   /* Ambient light pools */
--blue-06: rgba(74, 144, 255, 0.06);   /* Section ambient glow */
--blue-08: rgba(74, 144, 255, 0.08);   /* Subtle glow shadow */
--blue-10: rgba(74, 144, 255, 0.10);   /* Badge/tag background */
--blue-12: rgba(74, 144, 255, 0.12);   /* Blue glow shadow */
--blue-15: rgba(74, 144, 255, 0.15);   /* Card hover inset */
--blue-20: rgba(74, 144, 255, 0.20);   /* Badge border, accent border */
--blue-30: rgba(74, 144, 255, 0.30);   /* Border accent (= existing --border-accent) */
--blue-40: rgba(74, 144, 255, 0.40);   /* Strong accent fill */
--blue-50: rgba(74, 144, 255, 0.50);   /* Rotating border highlight peak */
--blue-80: rgba(74, 144, 255, 0.80);   /* Near-solid accent */
```

Then refactor existing inline values to use these tokens. For example:
- Badge background: `var(--blue-10)` instead of `rgba(74, 144, 255, 0.10)`
- `--shadow-blue-glow`: `0 0 50px var(--blue-12)` instead of `0 0 50px rgba(74, 144, 255, 0.12)`
- `--border-accent`: becomes an alias for `var(--blue-30)`

---

### 3. Border Radius Scale

**Reis IA current** (6 semantic tokens, no numbered scale):
```css
border-radius: {
  'card': '12px',
  'card-lg': '16px',
  'button': '8px',
  'button-lg': '10px',
  'badge': '6px',
  'input': '8px',
}
```
No generic radius scale. No `--radius-full` for pills. No `0px` token.

**AIOX reference** (7 values, numbered scale):
```css
--radius:      0.5rem  (8px -- default)
--radius-sm:   4px
--radius-md:   8px
--radius-lg:   12px
--radius-xl:   16px
--radius-2xl:  24px
--radius-full: 9999px
```

**Gap**: Reis IA uses component-specific names (`card`, `button`, `badge`) but has no generic scale. This means new components must pick from existing names or create new ones. Missing: a `0px` (sharp corners) token, a `9999px` (pill) token, and a `4px` small token.

**Recommendation**: Add a generic radius scale AND keep the semantic aliases:

```css
/* Generic Radius Scale */
--radius-none: 0px;
--radius-sm:   4px;
--radius-md:   6px;
--radius:      8px;      /* default */
--radius-lg:   10px;
--radius-xl:   12px;
--radius-2xl:  16px;
--radius-full: 9999px;

/* Semantic Aliases (existing, now pointing to scale) */
/* card = --radius-xl (12px) */
/* card-lg = --radius-2xl (16px) */
/* button = --radius (8px) */
/* button-lg = --radius-lg (10px) */
/* badge = --radius-md (6px) */
/* input = --radius (8px) */
```

Note: Reis IA's actual values are slightly different from AIOX's -- AIOX uses `--radius-lg: 12px` where Reis IA would use it for cards. The semantic aliases should remain for clarity in Tailwind usage (`rounded-card`), but the generic scale enables new components without naming debates.

---

### 4. Z-Index Layer System

**Reis IA current** (8 values, irregular increments):
```css
--z-bg:            -1
--z-base:           0
--z-raised:        10
--z-nav:           50
--z-dropdown:      60
--z-modal-overlay: 90
--z-modal:        100
--z-toast:        200
```

**AIOX reference** (5 values, clean 100-increments):
```css
--layer-nav:      100
--layer-dropdown:  200
--layer-overlay:   300
--layer-modal:     400
--layer-toast:     500
```

**Gap**: Reis IA's system is functional but the increments are irregular (10, 50, 60, 90, 100, 200), leaving little room between layers. The gap between `dropdown` (60) and `modal-overlay` (90) is only 30 -- a new layer type would be hard to insert. AIOX's 100-increment system gives 99 slots between each layer.

**Recommendation**: Keep Reis IA's current system -- it works and is already implemented. The irregular gaps are a minor concern for a marketing site that won't have complex UI layering. If a redesign is ever warranted, the AIOX pattern (100-increment) is cleaner, but migration cost outweighs the benefit now.

One small addition: consider adding `--z-grain: 9999` for the noise overlay that currently uses the magic number `9999` in the `.grain-overlay` CSS.

---

### 5. shadcn/ui Token Bridge

**Reis IA current**: No shadcn/ui mapping exists. The implementation guide defines CSS custom properties and Tailwind config but does not export tokens in the shadcn/ui variable format (`--background`, `--foreground`, `--primary`, `--card`, etc.).

**AIOX reference** (complete bridge, export-ready):
```css
:root {
  --background: #050505;
  --foreground: #F4F4E8;
  --primary: #D1FF00;
  --primary-foreground: #050505;
  --card: #0F0F11;
  --card-foreground: #F4F4E8;
  --popover: #0F0F11;
  --secondary: #1C1E19;
  --muted: #111113;
  --muted-foreground: rgba(245, 244, 231, 0.4);
  --accent: rgba(209, 255, 0, 0.1);
  --accent-foreground: #D1FF00;
  --destructive: #EF4444;
  --destructive-foreground: #FFFFFF;
  --border: rgba(156, 156, 156, 0.15);
  --input: rgba(156, 156, 156, 0.2);
  --ring: rgba(209, 255, 0, 0.4);
  --radius: 0.5rem;
  /* + surface, dim, blue, flare, error, warning, font-sans, font-mono, easing */
}
```

AIOX also provides a Token Export page with one-click copy for Tailwind + shadcn/ui projects, compatible with Tailwind CSS v3 + v4.

**Gap**: If Reis IA ever adopts shadcn/ui components (or any Tailwind-UI-like library that uses the `--background`/`--foreground`/`--primary` convention), there is no mapping. Components would render with default colors.

**Recommendation**: Create a Reis IA shadcn/ui bridge mapping (low priority until shadcn components are actually adopted):

```css
/* shadcn/ui Token Bridge -- Reis IA */
:root {
  --background: #000000;               /* --surface-0 */
  --foreground: #FFFFFF;               /* --text-primary */
  --primary: #4A90FF;                  /* --accent-blue */
  --primary-foreground: #FFFFFF;
  --card: #111111;                     /* --surface-2 */
  --card-foreground: #FFFFFF;
  --popover: #1A1A1A;                  /* --surface-4 */
  --popover-foreground: #FFFFFF;
  --secondary: #0A0A0A;               /* --surface-1 */
  --secondary-foreground: rgba(255, 255, 255, 0.70);
  --muted: #161616;                    /* --surface-3 */
  --muted-foreground: rgba(255, 255, 255, 0.50);
  --accent: rgba(74, 144, 255, 0.10); /* blue-10 */
  --accent-foreground: #4A90FF;
  --destructive: #EF4444;
  --destructive-foreground: #FFFFFF;
  --border: rgba(255, 255, 255, 0.08); /* --border-default */
  --input: rgba(255, 255, 255, 0.08);  /* --border-default */
  --ring: rgba(74, 144, 255, 0.40);    /* blue-40 */
  --radius: 0.5rem;                    /* 8px */
}
```

---

### 6. Motion System

**Reis IA current** (5 easing curves + 7 durations):

Easing:
```
--ease-base:     cubic-bezier(0.25, 0.1, 0.25, 1)   -- general purpose
--ease-out:      cubic-bezier(0.16, 1, 0.3, 1)       -- elements entering
--ease-in:       cubic-bezier(0.4, 0, 0.5, 1)        -- elements exiting
--ease-dramatic:  cubic-bezier(0.65, 0, 0.35, 1)      -- hero reveals
--ease-card:     cubic-bezier(0.7, 0, 0, 1)           -- card hover
```

Durations:
```
--duration-instant:  100ms
--duration-fast:     200ms
--duration-normal:   300ms
--duration-moderate: 500ms
--duration-slow:     800ms
--duration-dramatic: 1200ms
--duration-ambient:  13000ms
```

**AIOX reference** (4 easing curves + 3 durations + 1 extra curve):

Easing:
```
--bb-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)  -- bouncy overshoot
--bb-ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1)    -- natural default
--bb-ease-decel:  cubic-bezier(0, 0, 0.2, 1)           -- soft landing
--bb-ease-accel:  cubic-bezier(0.4, 0, 1, 1)           -- quick start
+ motion-easing-spring: cubic-bezier(0.16, 1, 0.3, 1)  -- scroll reveals
```

Durations:
```
--bb-dur-fast:   0.2s
--bb-dur-medium: 0.4s
--bb-dur-slow:   0.7s
```

**Gap**: Reis IA's motion system is MORE comprehensive than AIOX's. Reis IA has 5 easing curves (vs 4) and 7 duration tokens (vs 3). However, Reis IA is missing a **spring/bouncy easing** -- `cubic-bezier(0.34, 1.56, 0.64, 1)` which AIOX uses for elastic micro-interactions (toggles, checkboxes, spring-back effects).

**Recommendation**: Add one spring easing to the existing library:

```css
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Bouncy overshoot for toggles, checkboxes */
```

This brings Reis IA to 6 easing curves. Use sparingly -- the spring feel is appropriate for small UI interactions (switches, option selections) but not for section reveals or card hovers which should maintain the current weighted feel.

---

### 7. Section Numbered Label Pattern

**Reis IA current**: The design system specifies a `Label` token (`12px, weight 600, letter-spacing 0.05em, uppercase`) used for badges, section labels, and column headers. However, there is no formalized numbered section label pattern like `[01] SECTION TITLE`.

**AIOX reference**: Every design system page and LP section uses a numbered label pattern:
```html
<div class="font-mono text-[10px] font-bold uppercase tracking-[-0.05em]">
  <span class="text-bb-cream">[02]</span>
  <span class="text-bb-lime">Section Title</span>
</div>
```
Characteristics:
- Monospace font (Roboto Mono)
- 10-11px size
- Bold weight
- Uppercase
- Tight negative tracking (-0.05em)
- Number in brackets, neutral color
- Title in accent color
- Used on all landing page sections and design system pages

**Gap**: Reis IA has no equivalent numbered section label convention. Sections rely on H2/H3 headings and `Label` tokens for category names, but there is no systematic numbering scheme.

**Recommendation**: Adapt the pattern for Reis IA's single-font system (Inter, not monospace):

```css
.section-label {
  font-family: 'Inter Variable', sans-serif;
  font-size: 12px;                    /* --text-label */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;             /* Reis IA uses positive tracking, not negative */
  color: var(--text-tertiary);        /* 50% white for number */
}
.section-label__title {
  color: var(--accent-blue);          /* Blue for title */
}
```

Usage: `<span class="section-label">[01] <span class="section-label__title">Our Methodology</span></span>`

This is optional and page-spec dependent. Not all Reis IA pages need numbered sections -- it works best for methodology/process pages and the pillar breakdown.

---

### 8. Hairline Grid Technique

**Reis IA current**: No hairline grid technique. Cards use standard `border: 1px solid var(--border-default)` on each card individually. Grid gaps use `var(--space-lg)` spacing.

**AIOX reference**: Uses a 1px-gap grid technique extensively:
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1px;
  background: var(--border);  /* Gap color = border color */
}
.cell {
  background: var(--dark);    /* Cell bg covers the gap */
}
```

This creates seamless hairline dividers between grid cells without explicit borders on each item. The parent's background color shows through the 1px gap as dividers. Used on: home page stats, token pages, LP sections, component grids.

**Gap**: Reis IA relies on individual card borders + spacing gaps. The hairline grid technique produces a tighter, more architectural grid aesthetic where cells share borders rather than each having their own. It eliminates the 2px visual border where two cards' 1px borders touch.

**Recommendation**: Add the hairline grid as an optional layout pattern (do NOT replace existing card grids -- some sections benefit from the spaced card approach):

```css
.grid-hairline {
  display: grid;
  gap: 1px;
  background: var(--border-default);  /* rgba(255, 255, 255, 0.08) */
  border: 1px solid var(--border-default);
}
.grid-hairline > * {
  background: var(--surface-0);  /* or --surface-1 depending on section */
}
```

Best suited for: stats/KPI grids, pillar card layouts, feature comparison grids. NOT suited for: testimonial cards, case study cards, or anything that needs spacing for breathing room.

---

### 9. Component Patterns

**Reis IA current components** (documented in design system):
- Buttons: Primary (blue CTA), Primary Hero variant, Secondary (outline), Ghost (text+arrow), Link (inline)
- Cards: Standard, Accented (blue top border), Glass
- Navigation: Desktop (glassmorphism), Mobile (overlay)
- Badge/Label: Single variant (blue)
- FAQ Accordion
- Process Steps (numbered, vertical connector)
- Stats Block
- Testimonial Block
- Logo Marquee / Trust Strip
- Footer
- Section Transitions (gradient fade divider)

**AIOX component catalog** (~90 components/variants):
- Buttons: 4 variants (Primary, Secondary, Ghost, Destructive) + 3 sizes + Loading/Disabled states
- Cards: 3 variants (Default, Elevated, Outlined) + KPI Card
- Inputs: Text, Textarea, Select + Field wrapper + SegmentedControl + Toggle
- Badges: 5 color variants (Lime, Surface, Error, Blue, Solid)
- Alerts: 4 semantic variants (Default, Success, Error, Warning)
- Toasts: 4 types (Success, Error, Warning, Info)
- Modal dialog
- Tables: 2 variants (Standard, Compact Metrics)
- Charts: 9 types (Bar, Donut, Line, Area, Pie, Radar, Rings, Animated Number, Tooltip)
- Progress Bars: 3 color variants
- Spinners: 3 sizes
- Tabs, Accordion, Stepper (horizontal + vertical)
- Empty States: 4 scenarios
- Loading Overlay
- Confirm Sheet: 3 action types
- Notification Center
- Navigation: Site nav + Dropdown + Mobile nav
- Layout: Specimen Grid, Component Grid, Dashboard Grid (Bento 4-col), Content Grid
- Patterns: 7 grid patterns, 8 HUD frames, 4 hazard patterns, 2 circuit traces, 5 textures, 4 dividers, 3 decorative
- Section templates: 14+ marketing sections

**Gap**: Reis IA has ~15 documented components. AIOX has ~90. The biggest missing categories:

| Missing Component | Priority for Reis IA | Reasoning |
|---|---|---|
| KPI Card | HIGH | Needed for case study metrics and results sections |
| Form Inputs (full spec) | HIGH | Contact/booking forms need proper input specs |
| Alerts (semantic variants) | MEDIUM | Useful for form validation feedback |
| Tables | MEDIUM | For comparison data, case study details |
| Loading states (button, overlay) | MEDIUM | Forms need loading feedback |
| Toast notifications | LOW | Marketing site has minimal interactive feedback needs |
| Charts | LOW | Not needed unless data visualization is added |
| Tabs | MEDIUM | Useful for pillar comparison or service details |
| Progress indicators | LOW | Not a core marketing site need |
| Multi-variant badges | MEDIUM | Currently only blue; may need neutral/success variants |

**Recommendation**: Prioritize adding KPI Card and Form Input specs (HIGH). These are immediately needed for the booking flow and case study pages. Adapt from AIOX patterns but translate to Reis IA's visual language:

KPI Card (Reis IA adaptation):
```
Container: --surface-2 bg, --border-default border, 24px padding, 12px radius
Label: --text-label (12px, 600, uppercase, 0.05em), --text-tertiary color
Value: Display or H2 size, weight 700, --text-primary or --accent-blue color
Trend: 13px, --accent-blue (positive) or #EF4444 (negative)
```

---

### 10. Effects / VFX / Motion Patterns

**Reis IA current effects**:
- Rotating Blue Border (conic gradient, 8s cycle, featured cards)
- Cool Ambient Pools (radial gradients at section corners)
- Brand Motif Watermarks (hourglass at 3-5% opacity)
- Surface Depth Harmony (5-tier layering)
- Grain/Noise Texture (SVG fractalNoise, 3% opacity)
- Glassmorphism (nav, cards, overlays)
- Aurora Background (20s animation cycle)
- Magnetic Hover (JS, 8px max offset)
- Scroll-Linked Parallax
- Gradient Text Reveal
- Mesh Gradient Background
- Counter Animation (scroll-triggered stats)
- Staggered Grid Reveal

**AIOX effects**:
- Film Grain: 4 opacity levels (5%, 10%, 15%, 25%)
- Blend Modes: 6 types (multiply, screen, overlay, soft-light, color-dodge, difference)
- Blur Effects: 4 backdrop-filter levels (0, 4px, 8px, 16px)
- Glow Effects: Neon Glow, Soft Glow, Ring Glow (all lime-based)
- Overlay Composites: Scanlines, CRT Effect, Vignette, Edge Fade
- Ticker/Marquee (infinite scroll)
- 8 Framer Motion animations (Orchestration Pulse, Speed Lines, Particle Orbit, Logo Dissolve, Morphing Square, Glitch Reveal, Stagger Letters, Brand Reveal)
- Pattern Library: 31 CSS-only patterns (dots, crosshairs, wireframe, hazard, circuits, etc.)

**Gap**: Both systems have rich effects libraries but with different philosophies. Reis IA's effects are restrained and blue-tinted. AIOX's are bold and lime/neon-tinted.

Missing from Reis IA that could add value:
1. **Formalized blur scale** -- Reis IA uses various blur values inline (blur(16px), blur(20px), blur(24px)) but no tokenized scale
2. **Dot grid background pattern** -- subtle version could work for empty states or decorative sections
3. **Scanline overlay** -- subtle CRT scanlines (at very low opacity) could complement the grain texture
4. **Ticker/marquee** -- Reis IA already has logo marquee but not a generic text ticker component

Missing from Reis IA that should NOT be adopted:
- HUD frames, hazard stripes, circuit traces -- too aggressive for premium consultancy
- Neon glow effects -- Reis IA uses restrained blue glow, not neon
- Data rain, industrial textures -- incompatible with Apple-level minimal aesthetic

**Recommendation**: Add a formalized blur token set:
```css
--blur-none: 0px;
--blur-sm:   4px;
--blur-md:   8px;
--blur-lg:   16px;
--blur-xl:   20px;
--blur-2xl:  24px;
```

Optionally add a minimal dot grid pattern adapted for Reis IA:
```css
.pattern-dot-grid {
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 24px 24px;
}
```
Use at 3-4% opacity as a subtle texture alternative to grain. Blue-tinted version:
```css
.pattern-dot-grid-blue {
  background-image: radial-gradient(circle, rgba(74, 144, 255, 0.04) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

---

### 11. Typography Scale

**Reis IA current** (12 tokens, all fluid clamp()):
```
Display:   40px -> 72px   (700, 1.05, -0.03em)
H1:        36px -> 56px   (700, 1.08, -0.025em)
H2:        30px -> 48px   (600, 1.10, -0.02em)
H3:        26px -> 36px   (600, 1.15, -0.015em)
H4:        22px -> 28px   (600, 1.20, -0.01em)
H5:        20px -> 24px   (600, 1.25, -0.005em)
Body Large: 18px -> 20px  (400, 1.60, 0)
Body:      16px           (400, 1.65, 0)
Body Small: 14px          (400, 1.55, 0)
Caption:   12px -> 13px   (500, 1.45, 0.01em)
Micro:     11px           (500, 1.35, 0.02em)
Label:     12px           (600, 1.40, 0.05em)
```

**AIOX reference** (7 fixed tokens + 9 clamp formulas):

Fixed scale:
```
Display: 4rem (64px)
H1:      2.5rem (40px)
H2:      1.5rem (24px)
Body:    1rem (16px)
Small:   0.8rem (12.8px)
Label:   0.65rem (10.4px)
Micro:   0.6rem (9.6px)
```

Fluid clamp values (used across site):
```
clamp(2rem, 8vw, 6.5rem)       -- hero headlines (32px to 104px)
clamp(2.5rem, 5vw, 4rem)       -- section headlines
clamp(0.9rem, 1.5vw, 1.25rem)  -- body/descriptions
clamp(3rem, 8vw, 7rem)         -- large stat numbers
clamp(4rem, 10vw, 8rem)        -- manifesto text
clamp(2.2rem, 7vw, 6.5rem)     -- LP section headings
clamp(2.4rem, 7vw, 6rem)       -- pitch headings
clamp(1.4rem, 2vw, 2rem)       -- sub-headings
clamp(1.5rem, 4vw, 2.5rem)     -- medium headings
```

**Gap**: Reis IA's type system is SUPERIOR. It has more steps (12 vs 7), consistent fluid scaling with explicit clamp formulas for every level, and documented line-height + letter-spacing + weight for each token. AIOX has a smaller fixed scale supplemented by scattered clamp() values that are page-specific rather than tokenized. Reis IA also has better typographic rules (text-wrap: balance/pretty, tabular-nums, max line length).

No gap to close. AIOX's type system is not a model to follow in this area.

**Recommendation**: No changes needed. Reis IA's 12-token fluid type scale is the more complete system.

---

### 12. Color System

**Reis IA current**:
- 4 accent blue variants (primary, hover, muted, bright)
- 5-tier surface system (#000000 to #1A1A1A)
- 5-tier text opacity (100%, 70%, 50%, 35%, 20%)
- 5-tier border opacity (5%, 8%, 12%, 20%, + blue 30%)
- 11 gradient definitions
- 5-tier shadow palette
- No gray neutral scale
- No semantic aliases (bg-void, bg-base, etc.)
- No signal/semantic colors (error, warning, info)

**AIOX current**:
- 1 primary accent (lime #D1FF00) + blue, flare, error, warning signal colors
- 8-tier surface system (dark, surface, surface-alt, surface-panel, surface-console, surface-deep, surface-overlay, surface-hover-strong)
- 4-tier text opacity (100%, 70%, 55%, 40%) -- using warm cream, not white
- 5-tier border system (soft, default, strong, hover, input) -- using gray rgba, not white rgba
- 15-step accent opacity ladder
- 4 neutral grays (charcoal, dim, muted, silver)
- Semantic aliases (--color-bg-void, --color-bg-base, --color-text-base, etc.)
- Glow/neon token set (5 tokens)
- Chart color palette (6 colors)
- Interactive state tokens (focus, selection, warning)

**Gap**:
1. **No signal/semantic colors**: Reis IA has no `--error`, `--warning`, `--success`, `--info` tokens. Any form validation or status indicator would need inline values.
2. **No neutral gray scale**: Reis IA achieves all grays through white-at-opacity (which is elegant) but has no distinct gray tokens for specific use cases like disabled states on non-black backgrounds.
3. **No semantic aliases**: Surface tokens are named by tier number (--surface-0 through --surface-4), not by semantic role (--bg-void, --bg-base). This is fine but less self-documenting.
4. **No chart/data viz colors**: If data visualization is ever needed, there are no chart-specific color tokens.
5. **No interactive state tokens**: Focus rings, selection colors, and warning backgrounds are defined inline.

**Recommendation**: Add signal colors and interactive states (HIGH priority -- needed for forms):

```css
/* Signal Colors */
--color-error:   #EF4444;
--color-warning: #F59E0B;
--color-success: #22C55E;
--color-info:    var(--accent-blue);  /* Blue doubles as info */

/* Interactive States */
--focus-ring: rgba(74, 144, 255, 0.40);
--selection-bg: rgba(74, 144, 255, 0.30);  /* already exists in ::selection */
--selection-fg: #FFFFFF;
```

Neutral gray scale is NOT recommended -- the white-at-opacity approach is a deliberate design decision that creates better visual unity.

---

### 13. Shadow System

**Reis IA current** (5 tokens):
```css
--shadow-subtle:    0 1px 2px rgba(0, 0, 0, 0.3)
--shadow-default:   0 4px 16px rgba(0, 0, 0, 0.25)
--shadow-elevated:  0 8px 30px rgba(0, 0, 0, 0.4)
--shadow-dramatic:  0 16px 70px rgba(0, 0, 0, 0.5)
--shadow-blue-glow: 0 0 50px rgba(74, 144, 255, 0.12)
```
Plus Tailwind extension: `blue-glow-sm: 0 0 30px rgba(74, 144, 255, 0.08)`

**AIOX reference**: Minimal shadow system -- AIOX relies on glow effects instead of traditional shadows:
```css
/* Primary button hover */  box-shadow: 0 0 20px var(--lime-glow)
/* Card hover */            box-shadow: inset 0 0 0 1px var(--bb-accent-15)
/* Cell hover */            box-shadow: inset 0 0 0 1px var(--bb-accent-20)
/* Pulse dot */             box-shadow: 0 0 8px var(--bb-accent-40)
/* Destructive hover */     box-shadow: 0 0 20px rgba(239, 68, 68, 0.3)
```
No formalized shadow token scale. Shadows are ad-hoc glow effects.

**Gap**: Reis IA's shadow system is MORE formalized and complete than AIOX's. AIOX uses ad-hoc glow box-shadows. Reis IA has a proper 4-tier depth scale plus a brand glow.

One pattern worth noting from AIOX: the **inset box-shadow for card hover** (`inset 0 0 0 1px var(--bb-accent-15)`) is a cleaner hover technique than changing `border-color` because it avoids potential layout shift and doesn't require box-sizing considerations. Reis IA currently changes border-color on hover.

**Recommendation**: No changes to the shadow scale. Optionally adopt the inset-shadow hover technique for cards:

```css
/* Alternative card hover (avoids border-color change) */
.card:hover {
  box-shadow: inset 0 0 0 1px var(--blue-15);  /* uses new opacity ladder */
}
```

---

### 14. Container / Layout System

**Reis IA current**:
- 5 container widths: Wide (1280px), Standard (1200px), Narrow (800px), Text (680px), Headline (900px)
- Fluid container padding: `clamp(20px, 5vw, 48px)`
- 12-column grid (desktop) / 8-column (tablet) / 4-column (mobile)
- 5 breakpoints: 0, 768px, 1024px, 1280px, 1536px
- Common column patterns documented (two-up, three-up, four-up, content+aside)

**AIOX reference**:
- 8 max-width values: 1440px, 1280px, 1200px, 1000px, 800px, 600px, 400px, 340px (min card)
- Responsive gutter: `--bb-gutter: clamp(1rem, 3vw, 2rem)`
- Multiple grid systems: 12-col bento, auto-fit with minmax, fixed-column token tables
- 3 CSS breakpoints (767, 768, 1200) + 4 Tailwind breakpoints (640, 768, 1024, 1200)
- Hairline grid (1px gap) technique (covered in Category 8)

**Gap**: Both systems are comprehensive. Reis IA has more breakpoints (5 vs 3) and better column pattern documentation. AIOX has more max-width variants and the hairline grid technique. Minor gaps:

1. Reis IA lacks smaller max-widths for constrained content blocks (e.g., 400px for compact text, 600px for body paragraphs). The `--container-text: 680px` covers paragraph width but there's no token for tighter constraints.
2. Reis IA lacks a responsive gutter token -- the container padding `clamp(20px, 5vw, 48px)` serves this role but is specific to containers, not reusable as a grid gutter.

**Recommendation**: Add two optional container tokens:
```css
--container-compact: 600px;   /* Body paragraphs, form descriptions */
--container-micro:   400px;   /* Short text blocks, form inputs */
```

These are low priority -- Tailwind's `max-w-xl` (576px) and `max-w-sm` (384px) can serve the same purpose inline.

---

### 15. Icon System

**Reis IA current**: No formalized icon system in the design system. The design system references:
- Hourglass brand motif (custom SVG, 200-300px watermark, specific usage rules)
- Chess motif (mentioned in CLAUDE.md brand identity)
- Arrow suffix on ghost buttons
- Plus/X icon on FAQ accordion
- Hamburger/close icons on mobile nav
- No icon library choice documented
- No icon sizing scale
- No icon color variants

**AIOX reference** (formalized system):
- 12 icons: Check, Close, Plus, Minus, Chevron R/L/D, Arrow R, Search, Sun, Grid, Moon
- 4 sizes: Inline (16px), Default (24px), Card (32px), Hero (48px)
- 6 rules: 2px stroke, round caps/joins, 24px viewBox, stroke only (no fills), currentColor, 44px touch target
- 6 color variants: Cream (default), Lime (brand), Dim (muted), Error, Info/Blue, Warning/Flare

**Gap**: Reis IA has no formalized icon system. When the dev-agent needs to implement icons, there are no specs for size, stroke width, color inheritance, or library choice. This is a significant gap for implementation.

**Recommendation**: Define an icon system adapted for Reis IA:

```
Library: Lucide Icons (open source, MIT, 24x24 viewBox, 2px stroke, round joins)
         -- consistent with Astro ecosystem, similar approach to AIOX's stroke-only system

Sizes:
  --icon-xs:  16px   (inline with text)
  --icon-sm:  20px   (buttons, badges)
  --icon-md:  24px   (default UI)
  --icon-lg:  32px   (cards, features)
  --icon-xl:  48px   (hero elements)

Rules:
  1. Stroke width: 2px at all sizes (Lucide default)
  2. Round caps and round joins
  3. Color: currentColor (inherits from parent)
  4. Minimum touch target: 44x44px (container, not icon)
  5. Preferred rendering: inline SVG (not icon font)

Color variants:
  Default:  var(--text-secondary)   (70% white)
  Primary:  var(--text-primary)     (#FFFFFF)
  Accent:   var(--accent-blue)      (#4A90FF)
  Muted:    var(--text-quaternary)   (35% white)
  Error:    var(--color-error)       (#EF4444)
```

---

## Summary Table

| # | Category | Reis IA Status | Action Needed | Priority |
|---|----------|---------------|---------------|----------|
| 1 | Spacing Scale | Partial (8 fluid tokens) | Add 10-step numeric `--gap-*` scale for component internals | MEDIUM |
| 2 | Accent Opacity Ladder | Missing (scattered inline values) | Add 12-step `--blue-*` opacity ladder | HIGH |
| 3 | Border Radius Scale | Partial (6 semantic, no generic) | Add 8-step generic `--radius-*` scale | MEDIUM |
| 4 | Z-Index Layer System | Complete (8 values, irregular) | Add `--z-grain: 9999` only; keep current system | LOW |
| 5 | shadcn/ui Token Bridge | Missing | Create bridge mapping (defer until shadcn adoption) | LOW |
| 6 | Motion System | Strong (5 curves + 7 durations) | Add `--ease-spring` for bouncy interactions | LOW |
| 7 | Section Numbered Labels | Missing | Add optional `.section-label` pattern | LOW |
| 8 | Hairline Grid Technique | Missing | Add `.grid-hairline` utility class | MEDIUM |
| 9 | Component Patterns | Partial (~15 components) | Add KPI Card and Form Input specs | HIGH |
| 10 | Effects / VFX | Strong (14 effects) | Add blur token scale and optional dot grid | LOW |
| 11 | Typography Scale | Complete (12 fluid tokens) | No changes needed -- superior to AIOX | NONE |
| 12 | Color System | Partial (no signal/semantic colors) | Add error/warning/success tokens | HIGH |
| 13 | Shadow System | Complete (5 tokens) | Optional: adopt inset-shadow hover pattern | LOW |
| 14 | Container / Layout | Complete (5 widths, 12-col grid) | Optional: add compact/micro container widths | LOW |
| 15 | Icon System | Missing | Define Lucide-based icon system with 5 sizes | HIGH |

---

## What We're Intentionally NOT Adopting

| AIOX Pattern | Reason for Rejection |
|---|---|
| **Lime/neon accent (#D1FF00)** | Reis IA brand is blue (#4A90FF). Fundamentally different identity. |
| **TASA Orbiter Display font** | Reis IA is a single-font system (Inter Variable). Adding a display font contradicts the "restraint is the design" principle. |
| **Geist sans-serif font** | Inter is the Reis IA font. Geist would be redundant. |
| **Roboto Mono / monospace labels** | AIOX uses mono for labels/nav/metadata. Reis IA uses Inter at weight 600 with tracking. Mono would conflict with single-font discipline. |
| **Cream/warm text tones** | Reis IA uses pure white (#FFFFFF), not warm cream (#F4F4E8). Different visual temperature. |
| **HUD frames (bracket, tech, notch)** | Sci-fi/cockpit aesthetic conflicts with Apple-level minimal. Too aggressive for premium consultancy. |
| **Hazard stripes** | Industrial warning patterns are inappropriate for consultancy positioning. |
| **Circuit traces / PCB patterns** | Tech-board decoratives are specific to AIOX's "cockpit" identity. |
| **Data rain pattern** | Matrix-style visual is too niche and conflicts with restraint principle. |
| **Industrial texture** | Brushed metal gradient has no place in minimal black aesthetic. |
| **Pricing tables / SaaS patterns** | Reis IA is NOT SaaS. All CTAs lead to /agendar or /aplicar. (Per project feedback_no_saas_patterns.md) |
| **OKLCH color space** | Reis IA uses hex/rgba for broader compatibility and developer familiarity. OKLCH is future-proof but not necessary. |
| **Dual theme system (Lime/Gold)** | Reis IA has a single visual identity. Theme switching adds complexity without brand value. |
| **3 breakpoints (767/768/1200)** | Reis IA uses 5 breakpoints (0/768/1024/1280/1536) for finer responsive control. AIOX's 3 are insufficient. |
| **Dark/light section alternation** | AIOX alternates between dark and cream backgrounds. Reis IA uses dark-only with Surface-0/Surface-1 alternation. Adding cream/light sections would break the dark mode mastery principle. |
| **Framer Motion dependency** | Reis IA uses CSS-based animations with IntersectionObserver. Adding Framer Motion increases bundle size for effects achievable in CSS. |

---

## Changelog

- 2026-03-16: Initial gap analysis created by analysis-agent
- 2026-03-17: Removed Blue Shimmer Text reference from effects list (Azure Whisper permanently discarded)
