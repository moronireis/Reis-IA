# Linear Design System Reference

Last updated: 2026-03-17

Extracted from linear.app homepage, /features, /method, /readme, /customers, /changelog, and /blog pages. This is a **reference document** for studying premium dark-mode web design craft -- not a template to copy. Linear is a SaaS product; Reis IA is a high-ticket consultancy. Adapt visual quality and craft, not product patterns.

---

## 1. Color System

### Core Dark Palette

| Token | Hex / Value | Usage |
|-------|-------------|-------|
| Background (primary) | `#08090a` | Page background, body, theme-color meta |
| Background (elevated) | `~#0e0f11` | Cards, elevated surfaces (inferred from layering) |
| Background (tertiary) | `~#141517` | Hover states, input backgrounds |
| Text (primary) | `#ffffff` | Headlines, primary content |
| Text (secondary) | `rgba(255, 255, 255, 0.70)` | Body text, descriptions |
| Text (tertiary) | `rgba(255, 255, 255, 0.50)` | Labels, captions, metadata |
| Text (quaternary) | `rgba(255, 255, 255, 0.35)` | Decorative underlines, disabled text |
| Text (dimmed) | `rgba(255, 255, 255, 0.48)` | De-emphasized content |
| Border (primary) | `rgba(255, 255, 255, 0.08)` | Card borders, dividers |
| Border (secondary) | `rgba(255, 255, 255, 0.05)` | Subtle separators |

### Semantic Colors (from Customer Logos / SVGs)

| Token | Hex | Context |
|-------|-----|---------|
| White | `#ffffff` | Default icon/logo fills |
| Yellow | `#e4f222` | Accent, highlight |
| Orange | `#ff5900` | Brand color (partner logos) |
| Light blue | `#8cc3f2` | Informational |
| Lavender | `#dee2ff` | Soft accent |
| Green | `#01c646` / `rgba(1, 198, 70, 1)` | Success, positive |
| Pink | `#ffc8d0` | Soft accent |
| Red | `red` (keyword) | Badges, alerts |

### Gradient Definitions

| Name | Value | Usage |
|------|-------|-------|
| Purple-pink shimmer | `linear-gradient(120deg, #db91cb 0%, #9a5eff 50%, #db91cb 100%)` | Accent gradients, highlights |
| Deep purple | `linear-gradient(92.88deg, #455eb5 9.16%, #5643cc 43.89%, #673fd7 64.72%)` | Feature accents |
| Teal-blue | `linear-gradient(124.31deg, #46e3b7 0.18%, #2f7ad0 89.82%)` | Integration highlights |
| Pink-gold | `linear-gradient(285.49deg, #f537f9 -14.61%, #f7c12b 106.06%)` | Warm accents |

### Theme System

Linear supports three themes: `"light"`, `"dark"`, and `"glass"`. The marketing site defaults to `"dark"`. Colors are managed through CSS custom properties with semantic naming:
- `--color-text-primary` through `--color-text-quaternary`
- `--color-bg-primary`, `--color-bg-tertiary`
- `--color-brand-bg`
- `--color-link-primary`
- `--color-selection-dim`

This token-based architecture means the entire color system can be swapped by changing a data attribute on the HTML element.

---

## 2. Typography System

### Font Families

| Token | Family | Usage |
|-------|--------|-------|
| Primary (sans) | `Inter Variable` | Body text, UI, most headings |
| Display (serif) | `EB Garamond` | Editorial headlines (README page) |
| Monospace | `var(--font-monospace)` | Code, technical labels |

Inter Variable is loaded from `https://static.linear.app/fonts/InterVariable.woff2?v=4.1` as a variable font supporting continuous weight adjustment.

### Type Scale

Linear uses a 9-level title scale plus 6 text sizes. Exact pixel values are managed through CSS variables. Based on observed rendering and the README page (which uses explicit `em` values):

| Level | Desktop Size | Mobile Size | Weight | Line-Height | Letter-Spacing |
|-------|-------------|-------------|--------|-------------|----------------|
| Title 1 (Display) | ~72px / 4.5em | ~48px | 700 (Bold) | 1.0 | -0.03em |
| Title 2 | ~64px / 4em | ~42px | 700 | 1.0 | -0.025em |
| Title 3 | ~48px | ~32px | 600 (Semibold) | 1.1 | -0.02em |
| Title 4 | ~40px | ~28px | 600 | 1.15 | -0.015em |
| Title 5 | ~32px | ~24px | 600 | 1.2 | -0.01em |
| Title 6 | ~28px | ~22px | 600 | 1.25 | -0.01em |
| Title 7 | ~24px | ~20px | 600 | 1.3 | -0.005em |
| Title 8 | ~20px | ~18px | 500 (Medium) | 1.35 | 0 |
| Title 9 | ~18px | ~16px | 500 | 1.4 | 0 |
| Text Large | ~18px | ~16px | 400 (Normal) | 1.6 | 0 |
| Text Regular | ~16px | ~15px | 400 | 1.6-1.75 | 0 |
| Text Small | ~14px | ~14px | 400-500 | 1.5 | 0 |
| Text Mini | ~13px | ~12px | 500 | 1.4 | 0.01em |
| Text Micro | ~12px | ~11px | 500 | 1.35 | 0.02em |
| Text Tiny | ~11px | ~10px | 400 | 1.3 | 0.02em |

### Weight System

| Token | Value | Usage |
|-------|-------|-------|
| Light | 300 / `--font-weight-light` | Rarely used, specific editorial contexts |
| Normal | 400 / `--font-weight-normal` | Body text, descriptions |
| Medium | 500 / `--font-weight-medium` | Labels, mini text, emphasis |
| Semibold | 600 / `--font-weight-semibold` | Subheadings, title 3-8 |

Note: Linear does NOT use `700` (Bold) in its variable names -- it uses Semibold (600) as its heaviest standard weight. Bold (700) appears only in the serif display (EB Garamond) contexts.

### Key Typography Patterns

- **`text-wrap: balance`** on headlines -- distributes words evenly across lines
- **`text-wrap: pretty`** on body text -- prevents orphans/widows
- **`font-variant-numeric: tabular-nums`** on data/metrics -- aligns numbers in columns
- **`font-feature-settings: "ss01"`** on specific text -- Stylistic Set 1 of Inter (alternate glyphs)
- **`-webkit-line-clamp: 2`** on descriptions -- truncates to 2 lines with ellipsis
- **Variable font** allows continuous weight and width adjustment without loading multiple files
- **Letter-spacing tightens as size increases** (same principle as Stripe, universal typographic rule)

---

## 3. Spacing System

### Vertical Spacers (Observed Component Heights)

| Size | Value | Usage |
|------|-------|-------|
| XS | 12px | Tight element groups |
| SM | 16px | Between related elements |
| MD | 20px | Subsection spacing |
| LG | 24px | Between content blocks |
| XL | 30px | Medium sections |
| 2XL | 32px | Hero sub-gaps, flex gaps |
| 3XL | 48px | Between major blocks |
| 4XL | 56px | Section transitions (mobile) |
| 5XL | 64px | Section transitions (desktop header) |
| 6XL | 80px | Major section breaks |
| 7XL | 96px | Large section padding |
| 8XL | 128px | Maximum section separation |
| 9XL | 164px | Hero-scale separation |

### Flex Gap Values (Observed)

| Value | Usage |
|-------|-------|
| 4px | Tight inline groups |
| 12px | Icon + label pairs |
| 16px | Form elements, small card grids |
| 24px | Card grids, medium layouts |
| 32px | Hero section flex gap |
| 48px | Major layout gaps |

### Section Padding

| Context | Value |
|---------|-------|
| Page padding (desktop) | `120px 24px` |
| Page padding (mobile) | `48px 24px` |
| Homepage padding inset | `var(--homepage-padding-inset)` (responsive) |
| Standard section vertical | 80-128px |
| Mobile section vertical | 48-64px |

### Container Widths

The content width is managed through `--homepage-padding-inset` rather than a fixed max-width, suggesting a fluid approach. Based on observed layouts:
- Content max-width: ~1200px (inferred from grid areas)
- Narrow content: ~800px
- Text column: ~640px / ~410px (method page)
- Full-bleed sections exist for visual impact

### Border Radius Scale

| Size | Value | Usage |
|------|-------|-------|
| SM | 4px | Buttons, small controls |
| MD | 5px | Cards, changelog entries |
| LG | 7px | Screens, device frames |
| Full | 50% | Circular avatars, icons |

---

## 4. Layout System

### Responsive Grid

Linear uses a CSS Grid system with named grid areas:
- `--grid-areas-default` (desktop)
- `--grid-areas-tablet`
- `--grid-areas-mobile`

### Breakpoints

| Name | Width | Behavior |
|------|-------|----------|
| Mobile | < 640px | Single column, reduced spacing |
| Tablet | 640-767px | 2-column where applicable |
| Laptop | 768-1023px | Transitional layouts |
| Desktop | 1024-1279px | Full grid |
| Wide | 1280px+ | Maximum content width |

### Visibility Classes

```
hide-mobile    / show-mobile
hide-tablet    / show-tablet
hide-laptop    / show-laptop
```

### Flexbox Patterns

- **Icon containers**: `display: flex; align-items: center; justify-content: center` with `14px` square dimension and `aspect-ratio: 1/1`
- **Text truncation**: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis`
- **Multi-line clamping**: `-webkit-box-orient: vertical; -webkit-line-clamp: 2`

---

## 5. Animation & Motion System

### Timing Functions (Easing Library)

| Name | Value | Usage |
|------|-------|-------|
| Step end | `steps(1, end)` | Grid dot animations (discrete opacity jumps) |
| Ease | `ease` | General grid fade-in (800ms) |
| Linear | `linear` | Gradient loops (3s infinite), continuous animations |
| Ease-out | `ease-out` | Entry reveals (mask-position shift) |

### Duration Scale

| Duration | Usage |
|----------|-------|
| 200ms | Entry stagger delay between elements |
| 400ms | Initial delay before animations begin |
| 800ms | Entry animations (opacity + translateY), grid fade-in |
| 1000ms / 1s | Major reveals, rotation transforms, glitch effects |
| 1800ms | Computed compound delay (7 x 200ms + 400ms) |
| 2800ms | Grid dot animation cycle (secondary) |
| 3000ms / 3s | Gradient animation loop |
| 3200ms | Grid dot animation cycle (primary) |

### Entrance Animations

**Staggered reveal pattern** (from README page):
```css
animation-duration: 800ms;
animation-delay: calc(var(--index) * 200ms + 400ms);
transform: translateY(30px) -> translateY(0);
opacity: 0 -> 1;
```

Elements enter from below with staggered delays. The base delay is 400ms (page settles first), then each subsequent element adds 200ms.

### Grid Dot Animation (Signature)

Linear's homepage features a distinctive 5x5 grid of dots that animate with discrete opacity steps:

```css
@keyframes grid-dot-0-0-agent {
  /* Alternates between opacity: 0.3 and opacity: 1 */
  /* Using steps(1, end) for instant transitions */
}
animation: grid-dot-0-0-agent 3200ms steps(1, end) infinite;
```

- 25 individual keyframe definitions (grid-dot-0-0 through grid-dot-4-4)
- Two animation families: `agent` (3200ms) and `upDown` (2800ms)
- Creates a scanning/pulsing effect across the grid
- Purely opacity-based (0.3 to 1.0) with no position changes
- `steps(1, end)` creates digital/binary appearance -- dots snap between states

### Special Animations

**Gradient text loop**:
```css
animation: gradient 3s linear infinite;
background-size: 1000%;
background-clip: text;
```

**Glitch effect**:
```css
animation: glitch 1s linear infinite;
```

**Computer reveal** (README page):
```css
animation-delay: calc(7 * 200ms + 400ms); /* 1800ms -- enters after all text */
```

### Text Shadow Glow

```css
text-shadow: rgba(246, 193, 43, 0.7) 0 0 20px;
```

Used in "dream mode" -- a warm gold glow effect on text. Notable for using a warm color temperature on an otherwise cool dark interface.

---

## 6. Interactive Elements

### Button Variants

| Variant | Visual Description |
|---------|-------------------|
| Primary | Solid fill, brand color background, white text |
| Secondary | Outlined or subtle background, reduced emphasis |
| Invert | Inverted color scheme (light bg on dark page) |
| Ghost | Transparent background, text-only appearance |
| Glass | Translucent/frosted appearance |
| Dimmed | Reduced opacity, low-contrast styling |

### Button Specifications

```css
padding: 6px;
border-radius: 4px;
font-weight: 500 (medium);
font-size: var(--text-mini-size);  /* ~13px */
```

Sizes: `small` and `standard`

### Hover Patterns

**Dual-element hover** (card footers, links):
```css
.hide-hover { opacity: 1; }
.show-hover { opacity: 0; }

:hover .hide-hover { opacity: 0; }
:hover .show-hover { opacity: 1; }
```

This swaps elements on hover -- typically replacing static text with an arrow icon or replacing a label with an action.

**Link underlines**:
```css
text-decoration: underline;
text-decoration-thickness: 1.5px;
text-underline-offset: 2.5px;
text-decoration-color: var(--color-text-quaternary);
```

Underlines use the quaternary (lightest) color, making them decorative rather than dominant. The 2.5px offset provides breathing room.

### Tooltip / Keyboard Shortcut Display

Uses `KBD` components to show keyboard shortcuts inline with tooltips.

### User Interaction Controls

```css
-webkit-user-select: none;  /* Applied to labels and interactive elements */
pointer-events: none;       /* Applied to decorative overlays */
```

---

## 7. Effects & Visual Treatments

### Blur Effects

| Context | Value |
|---------|-------|
| Gradient decoration blur | `filter: blur(50px)` |
| Sticky section mask | Gradient mask at 128px height (64px mobile) |

### Radial Gradient Backgrounds

```css
/* Large ambient glow behind content */
width: 1100px;  /* desktop */
width: 800px;   /* mobile */
/* Radial gradient creating a soft circular glow */
```

### Grid Background Pattern

```css
/* Dual-layer grid */
grid-size: 24px;
half-size: 12px;
/* Layer 1: Grid lines at very low opacity */
/* Layer 2: Radial gradient blur overlay */
```

### Sticky Shadow Masks

```css
/* Top and bottom gradient masks for scrollable areas */
height: 128px;     /* desktop */
height: 64px;      /* mobile */
background: linear-gradient(to bottom, var(--color-bg-primary), transparent);
```

### Text Selection

```css
::selection {
  background: var(--color-selection-dim);
}
```

### Isolation

```css
html {
  isolation: isolate;
  background: inherit;
}
```

This creates a new stacking context at the root level, preventing z-index conflicts.

### Decorative Fades

Page sections use decorative fade elements (`.page_rightBottomFade`) that create soft vignette effects at section edges, preventing hard content cutoffs.

---

## 8. Component Patterns

### Hero Section

- **Layout**: Centered text, flex column with 32px gap
- **Headline**: Title 8 size (responsive, scales up on desktop)
- **Subtext**: Text regular or large, secondary color
- **CTA**: Below subtext, button group with 12px gap
- **Spacing**: 128-164px top padding, 80px bottom spacer
- **Text alignment**: Center on all breakpoints
- **`text-wrap: balance`** on headlines for even line distribution

### Feature Cards

- **Grid**: Responsive with named areas (`--grid-areas-default/tablet/mobile`)
- **Image**: Leading, with 16:9 aspect ratio, `object-fit: cover`
- **Content order**: Image -> metadata -> heading -> description
- **Description clamping**: 2-line max with `-webkit-line-clamp: 2`
- **Border radius**: 5px

### Navigation

- **Behavior**: Fixed position header
- **Structure**: Logo left, nav center, CTA right
- **Responsive**: Collapses to hamburger below tablet breakpoint
- **Logo sizes**: `56x56` (standard), smaller on mobile

### Footer

- **Multi-column link lists** with consistent typography
- **Minimal decoration** -- no heavy separators
- **Color**: Text tertiary for links, quaternary for less important items

### Changelog Entries

- **Card-based**: Image (16:9) + metadata + title + description
- **Typography**: Title 4 for post titles, text small for dates
- **Border radius**: 5px on cards

### Section Dividers

Linear uses Spacer components rather than visible dividers:
- 80-128px blank space between major sections
- No horizontal rules or border dividers between content sections
- Background color stays consistent (no alternation like Stripe)

---

## 9. Unique Signature Elements

### 1. The Grid Dot Animation

Linear's most distinctive visual element. A 5x5 matrix of dots that animate with discrete opacity steps, creating a scanning/pulsing pattern reminiscent of a circuit board or AI processing visualization.

**Key characteristics**:
- Dots exist at only two states: dim (0.3 opacity) and bright (1.0 opacity)
- `steps(1, end)` timing creates instant transitions -- no fading, purely binary
- Two independent cycles (3200ms and 2800ms) create complex, non-repeating patterns
- 25 individually-timed keyframe sequences mean no two dots share the same pattern
- The effect is mathematical and precise -- it feels computed, not designed

**Reis IA adaptation note**: This precise, algorithmic animation style fits well with the "AI systems" positioning. Consider a similar binary-state animation applied to the hourglass motif (sand particles that snap between positions) or chess grid (squares that pulse in strategic patterns). Keep the `steps(1, end)` approach -- it reads as "machine intelligence" rather than organic motion.

### 2. Monochromatic Depth Through Opacity

Linear achieves visual hierarchy almost entirely through opacity rather than different colors. The text system has 5+ opacity levels of white on dark:
- Primary: 100%
- Secondary: ~70%
- Tertiary: ~50%
- Quaternary: ~35%
- Dimmed: ~48%

This creates depth without introducing new hue information. The interface feels unified and calm because every text element is the same color at different transparencies.

**Reis IA adaptation note**: Directly applicable. Use white at varying opacities for text hierarchy on the dark background. Reserve the gold accent for interactive elements and brand moments only -- it becomes more powerful through scarcity.

### 3. The Warmer Gray Shift

Linear deliberately shifted from cool blue-toned grays to warmer grays in their design refresh. The reasoning: warm grays feel more approachable and less clinical. On a near-black background (#08090a vs pure #000000), this warmth is barely perceptible but subconsciously registers as more inviting.

**Reis IA adaptation note**: Consider #0A0A0A or #0B0B0D (with a whisper of warm tone) rather than pure #000000 for the primary background. The Reis IA gold accent will harmonize better with warm neutrals than with cool blacks.

### 4. Structure Felt Not Seen

Linear's design refresh philosophy: "Structure should be felt, not seen." Borders and separators are softened, rounded, and reduced in contrast. Navigation elements are intentionally dimmed. The principle: don't compete for attention you haven't earned.

This manifests as:
- Very low-contrast borders (`rgba(255,255,255,0.05-0.08)`)
- No heavy divider lines between sections
- Spacer components (empty space) instead of visual separators
- Sidebar/navigation dimmed below content contrast level
- Icons smaller and fewer than typical SaaS interfaces

**Reis IA adaptation note**: This philosophy aligns perfectly with the "restraint over decoration" principle. For the consultancy site, this means: use generous whitespace as section dividers, keep borders nearly invisible, and ensure the hero headline and CTA are the loudest elements on any page.

### 5. Variable Font as Design System Foundation

Linear uses Inter as a Variable Font, not as discrete weight files. This enables:
- Continuous weight adjustment (not just 400/500/600/700 but any value)
- Reduced network payload (single file vs multiple weight files)
- Precise optical weight tuning per context
- Smooth weight transitions in animations (if desired)

**Reis IA adaptation note**: Load Inter as a variable font. This gives access to fine-tuned weights like 450 or 550 that create subtle emphasis without jumping to a full weight level. Particularly useful for the body-to-label transition range.

---

## 10. Design Quality Patterns (What Makes Linear Feel Premium)

### Restraint in Decoration

- No gradient backgrounds on the marketing site body
- No pattern textures or noise overlays
- Gradients appear only as accent treatments (text fills, small decorative elements)
- The dark background (#08090a) does almost all the visual work

### Typography as Architecture

- 9-level heading scale is unusually deep (most sites use 4-5 levels)
- `text-wrap: balance` and `text-wrap: pretty` show attention to line-break quality
- `font-variant-numeric: tabular-nums` for data alignment
- OpenType features (`ss01`) are activated selectively
- The type scale does 90% of the information hierarchy work

### Dark Mode Mastery

- Background is NOT pure black -- it's #08090a (slightly warm, less harsh)
- Text hierarchy through opacity of a single color (white at 35-100%)
- Borders at 5-8% opacity -- barely visible, felt not seen
- No dramatic contrast shifts between sections
- Elevated surfaces are only slightly lighter (2-3% luminance increase)

### Animation Philosophy

- Discrete/binary animations (steps timing) feel computational and precise
- Entrance animations are slow (800ms) with generous delays (400ms base + 200ms stagger)
- No bounce, no overshoot, no spring physics
- Everything either snaps (grid dots) or decelerates smoothly (entrances)
- Animation serves information architecture -- it reveals content in reading order

### Content-First Hierarchy

- Navigation is intentionally dimmed below content
- Hero headlines dominate the viewport
- CTAs are clearly distinguishable but not gaudy
- Empty space is the primary sectioning mechanism

---

## Appendix: CSS Custom Properties Reference

```css
/* Typography */
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-monospace: /* system monospace stack */;
--font-serif-display: 'EB Garamond', serif;

/* Title Scale (9 levels, each with -size, -line-height, -letter-spacing) */
--title-1-size through --title-9-size
--title-1-line-height through --title-9-line-height
--title-1-letter-spacing through --title-9-letter-spacing

/* Text Scale (6 levels) */
--text-large-size, --text-regular-size, --text-small-size
--text-mini-size, --text-micro-size, --text-tiny-size
/* Each with corresponding -line-height and -letter-spacing */

/* Colors */
--color-text-primary
--color-text-secondary
--color-text-tertiary
--color-text-quaternary
--color-bg-primary
--color-bg-tertiary
--color-brand-bg
--color-link-primary
--color-selection-dim
--color-red
--color-green

/* Layout */
--homepage-padding-inset
--grid-areas-default
--grid-areas-tablet
--grid-areas-mobile
--header-height

/* Animation */
/* Grid dot keyframes: grid-dot-{row}-{col}-{agent|upDown} */
/* 25 keyframe sets for the 5x5 grid */
```

---

## Appendix: Linear vs Stripe Comparison

| Aspect | Linear | Stripe |
|--------|--------|--------|
| Mode | Dark-first (#08090a) | Light-first (#ffffff) |
| Accent strategy | No single accent -- gradients are multi-color | Single accent (#635bff purple) |
| Type scale depth | 9 title + 6 text = 15 levels | ~7 levels |
| Heading weight | Semibold (600) max | Bold (700) for display |
| Section separation | Empty space only | Background color alternation |
| Border approach | Ultra-low opacity (5-8%) | Visible but subtle (solid hex) |
| Animation style | Discrete steps + slow reveals | Weighted easing + scroll triggers |
| Button philosophy | Multiple semantic variants | Single pill shape, opacity hover |
| Signature element | Grid dot animation | Gradient mesh background |
| Font loading | Variable font (single file) | Multiple weight files |
| Color management | CSS custom properties (token-based) | Mix of tokens + hardcoded |

**For Reis IA**: Linear's approach is closer to the target aesthetic. The dark-first design, opacity-based hierarchy, and restraint-heavy philosophy map directly to the brand guidelines. The key adaptations:
1. Use Linear's opacity-based text hierarchy approach
2. Apply the "structure felt not seen" border philosophy
3. Adopt the slow, deliberate animation timing (800ms entrances, 400ms base delay)
4. Consider the warm gray shift for backgrounds
5. Keep Stripe's shadow layering technique (Linear uses fewer shadows)
6. The gold accent replaces Linear's multi-color gradient accents as the single brand color moment

---

## [ADDED -- 2026-03-17] Source Code Extraction: Animation & Visual System

### Stagger System (Complete Token Architecture)

The orchestrated entrance system from Linear's /method page, expressed as CSS custom properties:

```css
:root {
  --entry-duration: 800ms;
  --entry-stagger: 200ms;
  --entry-delay: 400ms;
  --entry-offset: 30px;
  --computer-delay: calc(7 * var(--entry-stagger) + var(--entry-delay));
  /* = 7 * 200ms + 400ms = 1800ms total delay for last element */
}
```

Stagger calculation pattern:
```
Element 1: delay = --entry-delay (400ms)
Element 2: delay = --entry-delay + --entry-stagger (600ms)
Element 3: delay = --entry-delay + 2 * --entry-stagger (800ms)
...
Element 7: delay = --entry-delay + 6 * --entry-stagger (1600ms)
Computer element: --computer-delay = 1800ms (enters after all text)
```

Method page layout variables:
```css
--computer-width: 350px;
--size-large: 1100px;
--size-medium: 800px;
--size-small: 600px;
--shadow-size-large: 128px;
--shadow-size-small: 64px;
--overflow-space: 200px;
--click-padding: -10px;
```

### Hardware-Adaptive Rendering Pattern

Linear checks hardware capabilities at page load to enable or disable enhanced animations:

```javascript
(() => {
  let documentElement = document.documentElement;
  let navigator = window.navigator;

  try {
    let cores = 8;
    if (navigator && "hardwareConcurrency" in navigator) {
      cores = navigator.hardwareConcurrency;
    }
    // Only enable enhanced animations on machines with >4 cores
    documentElement.classList.toggle("enhanced", cores > 4);
  } catch (e) {}

  try {
    if (document.cookie && document.cookie.indexOf("loggedIn=1") > -1) {
      documentElement.classList.add("logged-in");
    }
  } catch (e) {}

  documentElement.classList.add("js");
})();
```

Auth-aware UI via data attributes:
```html
<button data-hide="logged-in">Sign up</button>
<button data-show="logged-in">Open Linear</button>
```

### Keyframe Animations (12+ Complete Definitions)

#### Entrance Animations (Orchestrated Sequence)

```css
/* Left-side element entrance: slide from left + up, then settle */
@keyframes entrance-left {
  from {
    opacity: 0;
    transform: translateX(-64px) translateY(var(--entry-offset));
  }
  50% {
    transform: translateX(-64px) translateY(0);
  }
  75% {
    opacity: 1;
  }
  to {
    opacity: 1;
    transform: none;
  }
}
/* Duration: 4s, Delay: var(--entry-delay) = 400ms */

/* Simple vertical entrance */
@keyframes entrance-up {
  from {
    opacity: 0;
    transform: translateY(var(--entry-offset));
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* Right-side entrance: slides from center-right + up */
@keyframes entrance-right {
  from {
    opacity: 0;
    transform: translateX(calc((var(--page-max-width) / 2) - 50% - 64px))
               translateY(calc(-1 * var(--entry-offset)));
  }
  50% {
    transform: translateX(calc((var(--page-max-width) / 2) - 50% - 64px));
  }
  75% {
    opacity: 1;
  }
  to {
    opacity: 1;
    transform: none;
  }
}
/* Duration: 4s */

/* Top entrance (reverse of up) */
@keyframes entrance-down {
  from {
    opacity: 0;
    transform: translateY(calc(-1 * var(--entry-offset)));
  }
  to {
    opacity: 1;
    transform: none;
  }
}
/* Duration: 2s */

/* Simple fade */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### SVG Stroke Draw Animation
```css
@keyframes stroke-draw {
  from {
    stroke-dashoffset: 506;
  }
  30%, 100% {
    stroke-dashoffset: 0;
  }
}
/* Duration: 8s */
/* Technique: SVG path with stroke-dasharray matching path length */
/* will-change: stroke-dashoffset */
```

#### Clip-Path Reveal (Stepped)
```css
@keyframes clip-reveal {
  from {
    clip-path: polygon(0 0, 100% 0, 100% 0%, 0 0%);
  }
  50%, 100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}
/* Duration: 8s, Steps: 8 */
/* will-change: clip-path */
```

#### Glitch Text Effect
```css
@keyframes glitch {
  2%, 60%, 63%, 78%, 81% {
    transform: none;
    opacity: 1;
  }
  62% {
    transform: translate(-2px, 0) skew(21deg);
  }
  80% {
    opacity: 0.4;
    transform: translate(2px, 0) skew(-15deg);
  }
}
/* Duration: 1s */
/* Creates digital glitch / distortion effect */
```

#### Scale Pulse
```css
@keyframes scale-pulse {
  0% { transform: scale(0); }
  50% { transform: scale(1); }
  100% { transform: scale(0); }
}
/* Duration: 700ms */
```

#### Rotation
```css
@keyframes rotate-180 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(180deg); }
}
/* Duration: 1000ms */
```

#### Shimmer / Loading
```css
@keyframes shimmer {
  to {
    background-position: -200%;
  }
}
/* Duration: 3s */
/* Used with background-size: 200% auto */
```

#### Blink
```css
@keyframes blink {
  50% {
    opacity: 0;
  }
}
/* Duration: 1.2s or 2s depending on context */
```

### Grid Dot Matrix Animation

5x5 grid of dots with unique keyframes per dot. Two animation families create complex, non-repeating patterns:

```css
/* Agent variant: 3200ms duration, stepped timing */
@keyframes grid-dot-0-0-agent {
  0% { opacity: 0.3; }
  /* ... stepped opacity changes ... */
  100% { opacity: 0.3; }
}

/* Up/Down variant: 2800ms duration, stepped timing */
@keyframes grid-dot-0-0-upDown {
  0% { opacity: 0.3; }
  /* ... different stepped opacity pattern ... */
  100% { opacity: 0.3; }
}

/* Total: 25 dots (grid-dot-0-0 through grid-dot-4-4) */
/* Each with two animation variants */
/* The grid creates a "wave" or "pulse" visual effect */
/* by staggering the opacity peaks across the 5x5 grid */
```

### Gradient Definitions (from Source)

#### Method Page Gradient Colors
```css
:root {
  /* Grid theme colors */
  --grid-color-purple: #746cf3;
  --grid-color-lavender: #a9a1ff;
  --grid-color-green: #46e3b7;
  --grid-color-gold: #f3bd6c;

  /* Gradient opacities */
  --gradient-opacity-low: 0.3;
  --gradient-opacity-high: 0.6;

  /* Named gradients */
  --gradient-purple-pink: linear-gradient(120deg, #db91cb 0%, #9a5eff 50%, #db91cb 100%);
  --gradient-blue-purple: linear-gradient(92.88deg, #455eb5 9.16%, #5643cc 43.89%, #673fd7 64.72%);
  --gradient-teal-blue: linear-gradient(124.31deg, #46e3b7 0.18%, #2f7ad0 89.82%);
  --gradient-pink-gold: linear-gradient(285.49deg, #f537f9 -14.61%, #f7c12b 106.06%);

  /* Glitch effect colors */
  --a-pink: #db91cb;
  --a-gray: #999;
  --a-blush: #ffb1bf;
  --b-purple: #9a5eff;
  --b-gray: #555;
}
```

#### Gradient Text
```css
.gradient-text {
  background: linear-gradient(120deg, #db91cb 0%, #9a5eff 50%, #db91cb 100%);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

#### Radial Background Fade
```css
.radial-fade {
  background: radial-gradient(var(--transparent) 0%, var(--color-bg-primary) 60%);
}
```

#### Directional Fade Overlays
```css
.fade-top {
  background: linear-gradient(180deg, var(--color-bg-primary) 0%, transparent 100%);
}
.fade-bottom {
  background: linear-gradient(0deg, var(--color-bg-primary) 0%, transparent 100%);
}
```

### Theme System (from Source JS)

```javascript
// Theme initialization with dark default and 3 theme options
((attr, storageKey, defaultTheme, initialTheme, themes, mapping, system, persist) => {
  let root = document.documentElement;
  let themeOptions = ["light", "dark"];

  function applyTheme(theme) {
    let classArray = Array.isArray(attr) ? attr : [attr];
    classArray.forEach(a => {
      let isClass = a === "class";
      let classNames = isClass && mapping ? themes.map(t => mapping[t] || t) : themes;
      if (isClass) {
        root.classList.remove(...classNames);
        root.classList.add(mapping && mapping[theme] ? mapping[theme] : theme);
      } else {
        root.setAttribute(a, theme);
      }
    });

    if (persist && themeOptions.includes(theme)) {
      root.style.colorScheme = theme;
    }
  }

  if (initialTheme) {
    applyTheme(initialTheme);
  } else {
    try {
      let stored = localStorage.getItem(storageKey) || defaultTheme;
      let resolved = system && stored === "system"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : stored;
      applyTheme(resolved);
    } catch (e) {}
  }
})("data-theme", "website-theme", "dark", "dark", ["dark", "light", "glass"], null, true, true);
```

### Additional Visual Patterns (from Source)

#### Blur Filter
```css
.blur-bg {
  filter: blur(50px);
}
```

#### Grid Background
```css
.grid-bg {
  --grid-size: 24px;
  --grid-size-half: 12px;
  /* Grid lines created with repeating-linear-gradient or SVG pattern */
}
```

#### Sticky Scroll Section
```css
.sticky-section {
  position: sticky;
  top: calc(50vh - 128px - 24px - var(--header-height));
}
```

#### Z-Index Layer System
```css
--layer-grid-bg: 0;
--layer-radial-bg: 2;
--layer-image: 2;
--layer-screen: 3;
--layer-text: 2;
```

#### Easing Token
```css
:root {
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

#### Hamburger Menu Transition
```css
svg rect:nth-child(1) {
  transform-origin: center;
  transition: 160ms var(--ease-out-quad);
  transform: translateY(-3.5px);
}
svg rect:nth-child(2) {
  transform-origin: center;
  transition: 160ms var(--ease-out-quad);
  transform: translateY(3.5px);
}
/* Open state: bars rotate to form X */
/* rect:nth-child(1) -> translateY(0) rotate(45deg) */
/* rect:nth-child(2) -> translateY(0) rotate(-45deg) */
```

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-16 | Initial reference document created |
| 2026-03-17 | Added source code extraction: stagger system (--entry-duration/stagger/delay values), hardware-adaptive rendering pattern, 12+ keyframe animations (entrance-left/right/up/down, stroke-draw, clip-reveal, glitch, scale-pulse, rotate-180, shimmer, blink, fade-in), glitch text effect, dot grid matrix, gradient definitions (6 named + gradient text + radial fade + directional overlays), theme system JS, z-index layers, easing token, hamburger transition |
