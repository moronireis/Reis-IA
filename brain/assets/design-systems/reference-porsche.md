# Porsche Design System Reference

Last updated: 2026-03-17

**Source**: porsche.com (international homepage, models pages, Taycan model page, Porsche Design System v3.33.0 documentation)

**Purpose**: Reference extraction for Reis IA brand design system. Porsche represents the gold standard in automotive luxury web design -- precision engineering applied to digital experiences.

---

## 1. Color System

### Dark Theme (Primary Reference for Reis IA)

| Token | Value | Usage |
|-------|-------|-------|
| Background Base | `#0e0e12` | Page background, primary dark surface |
| Background Surface | Slightly elevated from base | Card surfaces, elevated containers |
| Background Shading | Semi-transparent overlay | Overlays, dimming layers |
| Background Frosted | Translucent with backdrop-blur | Glassmorphism panels, nav overlays |
| Primary | `#fbfcff` | Primary text, key UI elements |
| Contrast Low | `#404044` | Subtle borders, disabled states, dividers |
| Contrast Medium | `#88898c` | Secondary text, captions, metadata |
| Contrast High | `#afb0b3` | Tertiary text, supplementary info |
| Hover State | `#1a1a24` | Interactive element hover backgrounds |
| White Full | `#ffffff` | Borders, high-emphasis text, CTAs |
| White 60% | `hsla(0, 0%, 100%, 0.6)` | Panel borders, dividers |
| White 50% | `hsla(0, 0%, 100%, 0.5)` | Secondary borders |
| White 30% | `hsla(0, 0%, 100%, 0.3)` | Scrollbar tracks, subtle UI |
| Link Hover Overlay | `#9495992e` | Semi-transparent link hover state |

### Light Theme (Secondary Reference)

| Token | Value | Usage |
|-------|-------|-------|
| Background Base | `#EEEFF2` | Page background |
| Primary Text | `#010205` | Primary text, near-black |
| Contrast Low | `#d8d8db` | Borders, dividers |
| Contrast Medium | `#6b6d70` | Secondary text |
| Contrast High | `#535457` | Tertiary text |

### Notification / Status Colors

| State | Value | Usage |
|-------|-------|-------|
| Error | `#cc1922` | Error states, destructive actions |
| Info | `#2762ec` | Informational states |
| Success | `#197e10` | Success confirmations |
| Warning | `#f3be00` | Warning states |
| Focus Ring | `#1a44ea` | Keyboard focus indicator |

### Key Observations for Reis IA

- Porsche uses `#0e0e12` (blue-tinted near-black), not pure `#000000`. This gives depth without flatness.
- Their dark theme relies on a narrow grayscale range (`#404044` to `#afb0b3`) for hierarchy -- subtle but sufficient.
- White is used at multiple alpha levels (30%, 50%, 60%, 100%) to create layered depth without introducing new colors.
- Status colors are saturated and distinct -- no ambiguity in state communication.
- **No accent/brand color in the digital palette** -- the Porsche identity comes from typography, layout, and precision, not from an accent hue. This is a key luxury pattern: restraint as identity.

---

## 2. Typography System

### Font Stack

```
'Porsche Next', 'Arial Narrow', Arial, 'Heiti SC', SimHei, sans-serif
```

Porsche uses a proprietary typeface. The fallback stack shows preference for narrow/condensed forms.

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, captions, metadata |
| Semi-Bold | 600 | Subheadings, emphasis within body |
| Bold | 700 | Headlines, CTAs, primary actions |

Note: No thin (100-300), no extra-bold (800-900), no italic. This restraint is deliberate -- a luxury brand narrows the typographic palette.

### Type Scale (Fluid with `clamp()`)

| Token | Min (Mobile) | Preferred | Max (Desktop) | Approx px Range |
|-------|-------------|-----------|---------------|-----------------|
| xx-small | 0.75rem | -- | 0.75rem | 12px |
| x-small | 0.81rem | 0.23vw + 0.77rem | 0.88rem | 13-14px |
| small | 1rem | -- | 1rem | 16px |
| medium | 1.13rem | 0.21vw + 1.08rem | 1.33rem | 18-21px |
| large | 1.27rem | 0.51vw + 1.16rem | 1.78rem | 20-28px |
| x-large | 1.42rem | 0.94vw + 1.23rem | 2.37rem | 23-38px |
| xx-large | 1.6rem | 1.56vw + 1.29rem | 3.16rem | 26-51px |

### Display Scale (Headlines)

| Token | Usage |
|-------|-------|
| display-large | Hero headlines, major section openers |
| display-medium | Section titles |
| display-small | Subsection titles |

### Heading Scale

| Token | Usage |
|-------|-------|
| heading-xx-large | Page-level titles |
| heading-x-large | Major section headers |
| heading-large | Subsection headers |
| heading-medium | Component headers |
| heading-small | Minor headers, card titles |

### Text Scale

| Token | Usage |
|-------|-------|
| text-x-large | Featured body text, pull quotes |
| text-large | Lead paragraphs |
| text-medium | Standard body text |
| text-small | Default body (recommended) |
| text-x-small | Captions, labels |
| text-xx-small | Legal disclaimers only |

### Line Height

```css
line-height: calc(6px + 2.125ex);
```

This is a sophisticated formula: `6px` provides a fixed minimum spacing, while `2.125ex` scales proportionally to the x-height of the current font size. Result: consistent optical spacing across all sizes. Approximate ratios:
- Small text (~12-16px): ~1.65-1.75 line-height ratio
- Medium text (~18-24px): ~1.45-1.55 line-height ratio
- Large text (~28-50px): ~1.3-1.4 line-height ratio

### Letter Spacing

- Standard: `normal`
- Specific emphasis: `0.05em` (used sparingly for labels/overlines)

### Font Rendering

```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
-webkit-text-size-adjust: none;
```

### Key Observations for Reis IA

- Fluid typography via `clamp()` is the modern luxury standard. No media-query-based font size jumps.
- The line-height formula is genius: single rule for all sizes, scales naturally.
- Only 3 font weights. Luxury = restraint.
- No uppercase transforms in the type system -- differentiation comes from size and weight, not decoration.
- The type scale has tight ratios (roughly 1.12-1.33x between steps) creating subtle, refined hierarchy rather than dramatic jumps.

---

## 3. Spacing System

### Fluid Spacing Tokens

All spacing uses `clamp()` for fluid scaling between viewport sizes.

| Token | Min | Preferred | Max | Approx Range |
|-------|-----|-----------|-----|--------------|
| x-small | 4px | 0.25vw + 3px | 8px | 4-8px |
| small | 8px | 0.5vw + 6px | 16px | 8-16px |
| medium | 16px | 1.25vw + 12px | 36px | 16-36px |
| large | 32px | 2.75vw + 23px | 76px | 32-76px |
| x-large | 48px | 3vw + 38px | 96px | 48-96px |
| xx-large | 80px | 7.5vw + 56px | 200px | 80-200px |

### Spacing Scale Analysis

```
x-small:  4-8px    (micro: icon gaps, inline spacing)
small:    8-16px   (tight: label padding, list spacing)
medium:   16-36px  (standard: component padding, card gaps, grid gutters)
large:    32-76px  (generous: section padding, major component gaps)
x-large:  48-96px  (section: between major content blocks)
xx-large: 80-200px (dramatic: hero padding, page-level breathing room)
```

### Grid System

| Property | Value |
|----------|-------|
| Columns | 6 (mobile) / 12 (desktop, 760px+) |
| Max Width | 2560px |
| Min Width | 320px |
| Grid Gap | `clamp(16px, 1.25vw + 12px, 36px)` (same as medium spacing) |
| Safe Zone (Padding) | `max(22px, 10.625vw - 12px)` |
| Safe Zone (1920px+) | `min(50vw - 880px, 400px)` |

### Key Observations for Reis IA

- 6 spacing tokens, not 10+. Simplicity prevents visual inconsistency.
- The ratios between tokens are roughly 2x-2.5x, creating clear visual hierarchy.
- Grid gap equals the medium spacing token -- content spacing is systematic, not arbitrary.
- Safe zone (side padding) scales dramatically: ~22px on small screens to ~400px on ultrawide. Content never feels cramped or lost.
- `xx-large` reaches 200px on large screens -- that is substantial breathing room that creates the feeling of premium spaciousness.

---

## 4. Animation & Motion System

### Duration Tokens

| Token | Value | Usage |
|-------|-------|-------|
| short | 0.25s | Micro-interactions: hover states, toggles, focus rings |
| moderate | 0.4s | Standard transitions: panels, accordions, tabs |
| long | 0.6s | Major transitions: page sections, modals, reveals |
| very-long | 1.2s | Dramatic transitions: hero entrances, full-page reveals |

### Easing Functions

| Token | Value | Usage |
|-------|-------|-------|
| base | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Default for most transitions. Slightly modified ease -- starts with subtle acceleration, decelerates smoothly. |
| in | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering view. Near-linear start, gentle deceleration at end. |
| out | `cubic-bezier(0.4, 0, 0.5, 1)` | Elements exiting view. Quick acceleration, gentle landing. |

### Interaction Animations

| Element | Effect | Values |
|---------|--------|--------|
| Image Hover | Scale up | `transform: scale3d(1.05, 1.05, 1.05)` |
| Sidebar Toggle | Fade | `opacity` transition, `0.3s ease` |
| Button Hover | Shadow appear | `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16)` |
| Links | Background tint | `background-color: #9495992e` on hover |

### Key Observations for Reis IA

- Only 4 duration tiers. Each is roughly 1.5-2x the previous, creating proportional timing.
- The `base` easing is not standard CSS `ease`. It is custom-tuned: `cubic-bezier(0.25, 0.1, 0.25, 1)` -- very slightly different from default `ease` (0.25, 0.1, 0.25, 1.0), almost imperceptible but intentional.
- Image hover uses `scale3d` (not `scale`) to force GPU acceleration. The 1.05 factor is subtle -- luxury animation is felt, not seen.
- No bounce, no elastic, no spring physics. Porsche motion is mechanical precision, not playful.
- Button hover adds shadow rather than changing color -- elevation change signals interactivity without visual disruption.

---

## 5. Interactive Elements

### Buttons

| Property | Value |
|----------|-------|
| Padding (standard) | `15px 28px` |
| Padding (compact) | `6px 10px` |
| Border Radius | `4px` (models page) / `8px` (homepage) |
| Background (dark theme) | `#0e0e12` |
| Border | `1px solid #ffffff` |
| Hover Background | `#1a1a24` |
| Hover Shadow | `0 4px 16px rgba(0, 0, 0, 0.16)` |
| Focus Ring | `2px solid #1a44ea`, offset `2px` |
| Transition | Duration moderate (0.4s), base easing |

### Link Styles

| Property | Value |
|----------|-------|
| Padding | `2px` |
| Margin | `-2px` (compensates for padding) |
| Border Radius | `4px` |
| Hover Background | `#9495992e` |

### Scrollbar Customization

```css
scrollbar-width: thin;
scrollbar-color: hsla(0, 0%, 100%, 0.3) transparent;
```

### Key Observations for Reis IA

- Button border-radius is very small (4-8px). Not rounded pills, not sharp corners. Subtly softened.
- Buttons use border + background, not fill-only. The outline style is more refined than solid fill.
- Focus ring uses a distinct blue (`#1a44ea`) separate from the brand palette -- accessibility is functional, not decorative.
- Link hover uses a semi-transparent tint overlay rather than an underline or color change.

---

## 6. Effects & Visual Treatments

### Glassmorphism

```css
backdrop-filter: blur(32px);
-webkit-backdrop-filter: blur(32px);
```

Used for the "frosted" background surfaces -- navigation overlays, floating panels.

### Shadows

| Context | Value |
|---------|-------|
| Elevated elements | `0 4px 16px rgba(0, 0, 0, 0.16)` |
| Button hover | `0 4px 16px rgba(0, 0, 0, 0.16)` |

Note: Porsche uses very few shadows. The dark theme naturally creates depth through background color layering rather than shadow casting.

### Borders

| Context | Value |
|---------|-------|
| Standard UI | `1px solid #ffffff` |
| Header divider | `1px solid #eeeff2` |
| Panel borders | `1px solid hsla(0, 0%, 100%, 0.6)` |
| Subtle borders | `1px solid hsla(0, 0%, 100%, 0.5)` |

### Z-Index Scale

| Layer | Value |
|-------|-------|
| Header | 9 |
| Toggles/Modals | 1000 |
| Dev Tools | 9999 |

### Key Observations for Reis IA

- Single shadow value (`0 4px 16px`) used everywhere. Consistency over variety.
- Glassmorphism blur is aggressive at 32px -- creates strong frosted effect, not subtle.
- Borders use white at various opacity levels to create layered depth without introducing new colors.
- Z-index uses a simple 3-tier system, not a complex scale.

---

## 7. Component Patterns

### Header / Navigation

| Property | Value |
|----------|-------|
| Height (mobile) | 4.125rem (66px) |
| Height (480px) | 5rem (80px) |
| Height (760px) | 4.5625rem (73px) |
| Height (1000px) | 4.75rem (76px) |
| Height (1300px+) | 5.125rem (82px) |
| Position | Relative (not sticky by default) |
| Border Bottom | `1px solid #eeeff2` |
| Z-index | 9 |

Note: Header height is NOT monotonically increasing. It goes up at tablet, slightly down at desktop, then back up at large. This suggests different layout modes at different breakpoints.

### Sidebar Navigation

| Property | Value |
|----------|-------|
| Width | 230px |
| Transition | `opacity 0.3s ease` |
| Scrollbar | `thin`, custom color |
| Max Content Height | `calc(100vh - 240px)` |

### Footer

- Margin-top uses the `large` spacing token
- Typically contains a multi-column grid of links

### Key Observations for Reis IA

- The variable header height pattern is interesting -- it adapts to the most common device in each range rather than linearly scaling.
- Navigation is minimal. No mega-menus visible in the CSS. Simplicity is the luxury signal.
- Sidebar at 230px is narrower than typical (250-300px) -- more room for content.

---

## 8. Responsive Breakpoints

| Name | Value | Columns | Notes |
|------|-------|---------|-------|
| Base/Mobile | 0-479px | 6 | Min width 320px |
| Small Tablet | 480px | 6 | Header height increases |
| Tablet/Desktop | 760px | 12 | Grid doubles, major layout shift |
| Large Desktop | 1000px | 12 | Spacing and type continue scaling |
| XL Desktop | 1300px | 12 | Final header height adjustment |
| Ultra/TV | 1920px | 12 | Safe zone caps at `min(50vw - 880px, 400px)` |
| Max | 2560px | 12 | Content max-width cap |

### Key Observations for Reis IA

- 6 breakpoints is more than most -- Porsche fine-tunes at each device class.
- The 760px breakpoint is the major shift (6 to 12 columns). Not 768px (iPad). Their own research likely showed this is the optimal point.
- 2560px max-width handles ultrawide monitors. Content never stretches infinitely.

---

## 9. Signature Design Elements

### What Makes Porsche Feel Premium on the Web

**1. Systematic Fluidity**
Everything scales fluidly via `clamp()` -- typography, spacing, grid gaps, safe zones. There are no jarring breakpoint jumps. The experience flows from mobile to ultrawide as a continuous transformation, like the sweep of a car's body line.

**2. Extreme Restraint**
- 3 font weights
- 1 shadow value
- No accent color
- No gradients in the UI
- No decorative elements
- No rounded pill buttons
- Narrow grayscale palette
The design system says "no" far more than it says "yes." What is absent defines the brand as much as what is present.

**3. Precision Over Personality**
The `calc(6px + 2.125ex)` line-height formula, the custom easing curves, the non-standard breakpoint at 760px -- these are not defaults. Every value is engineered, tested, and intentional. The design system feels like it was spec'd by engineers, not decorated by designers.

**4. Dark as Default**
The dark theme (`#0e0e12`) is not an afterthought or an option -- it is the primary experience. This positions the brand as modern, premium, and nighttime-native (when people dream about cars).

**5. Typographic Authority**
With a proprietary typeface and no italic, the typography alone carries the brand. Headlines do not need effects, animations, or decorations. The type is confident enough to stand alone.

---

## 10. Adaptation Notes for Reis IA

### Direct Parallels

| Porsche Pattern | Reis IA Adaptation |
|----------------|-------------------|
| `#0e0e12` blue-black background | Use `#0A0A0A` warm-black (our established palette) |
| Fluid `clamp()` spacing | Adopt the 6-token fluid spacing system |
| 3 font weights (400, 600, 700) | Match exactly with Inter |
| `calc(6px + 2.125ex)` line-height | Test with Inter, may need adjustment to `calc(6px + 2.0ex)` |
| Custom easing `cubic-bezier(0.25, 0.1, 0.25, 1)` | Adopt directly |
| 4 duration tiers (0.25s, 0.4s, 0.6s, 1.2s) | Adopt directly |
| `backdrop-filter: blur(32px)` | Use for navigation overlay, modals |
| `scale3d(1.05, 1.05, 1.05)` image hover | Use for case study cards, portfolio images |
| Small border-radius (4-8px) | Use 4px for buttons, 8px for cards |
| Single shadow (`0 4px 16px`) | Adopt as primary shadow |

### Key Differences

| Porsche | Reis IA |
|---------|---------|
| No accent color | Muted gold (#C9A84C) as accent -- used sparingly |
| No brand motifs in web design | Hourglass + Chess as recurring visual elements |
| Proprietary typeface | Inter (free, excellent quality) |
| Automotive product imagery | Abstract geometry, data visualization aesthetic |
| No uppercase/label treatments | May use sparingly for section labels/badges |

### What to Avoid

- Do not copy the blue-tinted black (`#0e0e12`). Our warm-black identity is established.
- Do not adopt the light theme palette. Reis IA is dark-mode only.
- Do not use the Porsche notification colors. Our status colors should align with the warm palette.
- Do not replicate the non-sticky header. High-ticket consultancy pages need persistent navigation for conversion.

---

## Summary Metrics

| Category | Count | Notable |
|----------|-------|---------|
| Colors (dark theme) | 14 values | Narrow range, alpha-based layering |
| Font weights | 3 | 400, 600, 700 |
| Type scale steps | 7 | xx-small through xx-large |
| Spacing tokens | 6 | x-small through xx-large |
| Duration tokens | 4 | 0.25s to 1.2s |
| Easing curves | 3 | base, in, out |
| Breakpoints | 6 | 480, 760, 1000, 1300, 1920, 2560 |
| Shadow values | 1 | `0 4px 16px` |
| Border-radius values | 2 | 4px, 8px |

---

## [ADDED -- 2026-03-17] Source Code Extraction: Complete Token System & Interactive Patterns

### Full CSS Token System: 6-Tier Fluid Spacing (with clamp values)

```css
:root {
  --pcom-spacing-x-small: clamp(4px, 0.25vw + 3px, 8px);
  --pcom-spacing-small: clamp(8px, 0.5vw + 6px, 16px);
  --pcom-spacing-medium: clamp(16px, 1.25vw + 12px, 36px);
  --pcom-spacing-large: clamp(32px, 2.75vw + 23px, 76px);
  --pcom-spacing-x-large: clamp(48px, 3vw + 38px, 96px);
  --pcom-spacing-xx-large: clamp(80px, 7.5vw + 56px, 200px);
}
```

Usage patterns:
```css
.section {
  padding-top: var(--pcom-spacing-x-large);
  padding-bottom: var(--pcom-spacing-x-large);
}
.card {
  padding: var(--pcom-spacing-medium);
  gap: var(--pcom-spacing-small);
}
.hero {
  padding-top: var(--pcom-spacing-xx-large);
  padding-bottom: var(--pcom-spacing-xx-large);
}
```

### 4-Tier Motion Duration System

```css
:root {
  --pcom-motion-duration-short: 0.25s;      /* Micro-interactions: hovers, toggles */
  --pcom-motion-duration-moderate: 0.4s;    /* Standard transitions: dropdowns, tooltips */
  --pcom-motion-duration-long: 0.6s;        /* Major transitions: modals, page elements */
  --pcom-motion-duration-very-long: 1.2s;   /* Dramatic entrances: hero reveals, page loads */
}
```

### 3 Easing Curves (Complete)

```css
:root {
  /* Base — all-purpose smooth curve */
  --pcom-motion-easing-base: cubic-bezier(0.25, 0.1, 0.25, 1);
  /*   Fast start -> even deceleration -> smooth settle
       Similar to CSS ease but with slightly more initial velocity */

  /* Ease-in — for elements leaving/collapsing */
  --pcom-motion-easing-in: cubic-bezier(0, 0, 0.2, 1);
  /*   Linear start -> gradual acceleration -> sharp stop */

  /* Ease-out — for elements entering/expanding */
  --pcom-motion-easing-out: cubic-bezier(0.4, 0, 0.5, 1);
  /*   Gentle start -> steady acceleration -> controlled arrival */
}
```

### Complete Light Theme Color System (80+ tokens)

```css
/* Primary */
--pds-color-primary: #010205;
--pds-color-primary-darken: #000000;

/* Backgrounds */
--pds-color-background: #FFFFFF;
--pds-color-background-darken: #E0E0E0;
--pds-color-background-lighten: #FFFFFF;
--pds-color-background-surface: #EEEFF2;
--pds-color-background-surface-darken: #CBCED7;
--pds-color-background-surface-lighten: #FFFFFF;
--pds-color-background-shading: rgba(1, 2, 5, 0.67);
--pds-color-background-frosted: hsl(240 4% 85% / 35%);

/* Contrast Scale */
--pds-color-contrast-low: #D8D8DB;
--pds-color-contrast-medium: #6B6D70;
--pds-color-contrast-high: #535457;
--pds-color-contrast-high-darken: #353638;
--pds-color-contrast-high-lighten: #717276;

/* Interactive */
--pds-color-hover: rgba(148, 149, 152, 0.18);
--pds-color-hover-darken: #75767A;
--pds-color-active: rgba(148, 149, 152, 0.20);
--pds-color-focus: #1A44EA;
--pds-color-disabled: #949598;

/* Semantic States */
--pds-color-error: #CC1922;
--pds-color-error-darken: #951219;
--pds-color-error-soft: #FFE2E4;
--pds-color-error-soft-darken: #F4CED1;
--pds-color-success: #197E10;
--pds-color-success-darken: #0E4809;
--pds-color-success-soft: #E4FFEC;
--pds-color-success-soft-darken: #D0F4DB;
--pds-color-warning: #F3BE00;
--pds-color-warning-soft: #FFF4D2;
--pds-color-warning-soft-darken: #F1E5C1;
--pds-color-info: #2762EC;
--pds-color-info-soft: #D3E1FF;
--pds-color-info-soft-darken: #C2D1F1;
```

### Complete Dark Theme Color System

```css
/* Primary */
--pds-color-primary: #FBFCFF;
--pds-color-primary-darken: #BECEFF;

/* Backgrounds */
--pds-color-background: #0E0E12;
--pds-color-background-darken: #000000;
--pds-color-background-lighten: #292934;
--pds-color-background-surface: #212225;
--pds-color-background-surface-darken: #040405;
--pds-color-background-surface-lighten: #3E4045;
--pds-color-background-shading: rgba(38, 38, 41, 0.67);
--pds-color-background-frosted: hsl(240 3% 26% / 35%);

/* Contrast Scale */
--pds-color-contrast-low: #404044;
--pds-color-contrast-medium: #88898C;
--pds-color-contrast-high: #AFB0B3;
--pds-color-contrast-high-darken: #909195;
--pds-color-contrast-high-lighten: #CECFD1;

/* Interactive */
--pds-color-hover: rgba(148, 149, 152, 0.18);
--pds-color-hover-darken: #75767A;
--pds-color-active: rgba(126, 127, 130, 0.20);
--pds-color-focus: #1A44EA;
--pds-color-disabled: #7E7F82;

/* Semantic States (Dark) */
--pds-color-error: #FC4040;
--pds-color-error-darken: #FB0404;
--pds-color-error-soft: #3A0F0F;
--pds-color-success: #09D087;
--pds-color-success-darken: #069561;
--pds-color-success-soft: #003320;
--pds-color-warning: #F7CB47;
--pds-color-warning-soft: #362B0A;
--pds-color-info: #178BFF;
--pds-color-info-soft: #04294E;
```

### High Contrast Mode Colors
```css
--pds-color-canvas: Canvas;
--pds-color-canvas-text: CanvasText;
--pds-color-highlight: Highlight;
--pds-color-link: LinkText;
--pds-color-disabled: GrayText;
--pds-color-focus: Highlight;
```

### FloatingCTA Component (Complete CSS + JS)

#### CSS Implementation
```css
/* Base state — hidden, scaled down, positioned at bottom */
.FloatingCta__button {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(40%) scale(0.9);
  transform-origin: center bottom;
  opacity: 0;
  pointer-events: none;

  font-family: 'Porsche Next', 'Arial Narrow', Arial, sans-serif;
  font-weight: 600;
  white-space: nowrap;

  border-radius: 980px;  /* Pill shape */
  padding: 12px 32px;
  cursor: pointer;

  transition:
    opacity var(--pcom-motion-duration-moderate) ease-in-out 0s,
    transform var(--pcom-motion-duration-long) ease-in-out 0s,
    background-color 0.25s ease 0s,
    border-color 0.25s ease 0s,
    color 0.25s ease 0s;
}

/* Active state — visible, full size */
.FloatingCta__isActive .FloatingCta__button {
  opacity: 1;
  transform: translateX(-50%) translateY(0) scale(1);
  pointer-events: auto;
}

/* Light theme */
.FloatingCta__button--light {
  background-color: #010205;
  color: #FBFCFF;
}

@media (hover: hover) {
  .FloatingCta__button--light:hover {
    background-color: #535457;
  }
}

/* Dark theme */
.FloatingCta__button--dark {
  background-color: #FBFCFF;
  color: #010205;
}

@media (hover: hover) {
  .FloatingCta__button--dark:hover {
    background-color: #AFB0B3;
  }
}

/* Stuck state — frosted glass when scrolled near bottom */
.FloatingCta__isStuck .FloatingCta__button {
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  background-color: hsl(from hsla(240, 3%, 26%, 0.35) h s l / 0.5);
  color: #FBFCFF;
}

@media (hover: hover) {
  .FloatingCta__isStuck .FloatingCta__button:hover {
    background-color: hsl(from hsla(240, 3%, 26%, 0.35) h s calc(l - 15));
  }
}

/* Shadow pseudo-element */
.FloatingCta__button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
  opacity: 0;
  transition: opacity var(--pcom-motion-duration-moderate) ease-in-out 0s;
  pointer-events: none;
}

.FloatingCta__isActive .FloatingCta__button::before {
  opacity: 1;
}

/* Focus ring */
.FloatingCta__button:focus {
  outline: 2px solid #1A44EA;
  outline-offset: 2px;
}

.FloatingCta__button:focus:not(:focus-visible) {
  outline-color: transparent;
}
```

#### JavaScript Controller
```javascript
class FloatingCta {
  constructor(element, options = {}) {
    this.element = element;
    this.button = element.querySelector('.FloatingCta__button');
    this.triggerTop = options.triggerTop || 300;
    this.triggerBottom = options.triggerBottom || 200;
    this.isActive = false;
    this.isStuck = false;
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.show();
        } else {
          this.hide();
        }
      },
      {
        rootMargin: `-${this.triggerTop}px 0px -${this.triggerBottom}px 0px`
      }
    );

    const mainContent = document.querySelector('main');
    if (mainContent) {
      this.observer.observe(mainContent);
    }

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      if (scrollY > docHeight - winHeight - 300) {
        this.setStuck(true);
      } else {
        this.setStuck(false);
      }
    }, { passive: true });
  }

  show() {
    this.isActive = true;
    this.element.classList.add('FloatingCta__isActive');
  }

  hide() {
    this.isActive = false;
    this.element.classList.remove('FloatingCta__isActive');
  }

  setStuck(stuck) {
    if (stuck !== this.isStuck) {
      this.isStuck = stuck;
      this.element.classList.toggle('FloatingCta__isStuck', stuck);
    }
  }
}
```

### Image Hover scale3d Effect

```css
:root {
  --pcom-image-hover-scale: scale3d(1.05, 1.05, 1.05);
}

.image-container {
  overflow: hidden;
  border-radius: 0;
}

.image-container img {
  transition: transform var(--pcom-motion-duration-long)
              var(--pcom-motion-easing-base);
  will-change: transform;
}

@media (hover: hover) {
  .image-container:hover img {
    transform: var(--pcom-image-hover-scale);
    /* Resolves to: scale3d(1.05, 1.05, 1.05) */
  }
}
```

### Backdrop Blur / Frosted Glass Patterns

```css
/* Light theme frosted */
.frosted-light {
  background-color: hsl(240 4% 85% / 35%);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
}

/* Dark theme frosted */
.frosted-dark {
  background-color: hsl(240 3% 26% / 35%);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
}

/* Header navigation */
.header-frosted {
  background-color: rgba(14, 14, 18, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

/* Dynamic hover adjustment using relative color syntax */
@media (hover: hover) {
  .frosted-dark:hover {
    background-color: hsl(from hsla(240, 3%, 26%, 0.35) h s calc(l - 15));
  }
}
```

### 16-Column Grid System

```css
/* Core grid — 6-column mobile / 16-column desktop */
.grid {
  display: grid;
  max-width: var(--pds-internal-grid-width-max);  /* 2560px */
  min-width: var(--pds-internal-grid-width-min);  /* 320px */
  margin: 0 auto;
  gap: var(--pcom-spacing-medium);  /* clamp(16px, 1.25vw + 12px, 36px) */
}

/* Mobile: 6 columns */
.grid {
  grid-template-columns: repeat(6, 1fr);
  padding: 0 var(--pcom-spacing-medium);
}

/* Desktop (760px+): 16 columns */
@media (min-width: 760px) {
  .grid {
    grid-template-columns: repeat(16, 1fr);
    padding: 0 var(--pcom-spacing-large);
  }
}

/* Safe zones for edge content */
.grid-with-safe-zone {
  grid-template-columns:
    var(--pds-internal-grid-outer-column)
    repeat(16, 1fr)
    var(--pds-internal-grid-outer-column);
}
```

Grid tokens:
```css
:root {
  --pds-internal-grid-margin: 0;
  --pds-internal-grid-outer-column: calc(var(--pds-internal-grid-safe-zone));
  --pds-internal-grid-width-max: 2560px;
  --pds-internal-grid-width-min: 320px;
}
```

### Shadow System

```css
/* Primary shadow — for floating elements */
.shadow-float {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
}

/* Elevated shadow — for modals, dropdowns */
.shadow-elevated {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

/* Shadow via pseudo-element with transition (Porsche pattern) */
.element::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 4px 16px #00000029;  /* rgba(0,0,0,0.16) */
  opacity: 0;
  transition: opacity var(--pcom-motion-duration-moderate) ease-in-out;
  pointer-events: none;
}

.element:hover::before,
.element.is-active::before {
  opacity: 1;
}
```

### Responsive Header Height

```css
:root {
  --phn-header-height: calc(4.125rem);  /* 66px — mobile default */
}

@media (min-width: 480px) {
  :root { --phn-header-height: calc(5rem); }      /* 80px */
}

@media (min-width: 760px) {
  :root { --phn-header-height: calc(4.5625rem); }  /* 73px */
}

@media (min-width: 1000px) {
  :root { --phn-header-height: calc(4.75rem); }    /* 76px */
}

@media (min-width: 1300px) {
  :root { --phn-header-height: calc(5.125rem); }   /* 82px */
}
```

### Composite Transitions (from Source)

```css
/* Floating CTA — multi-property orchestrated transition */
.floating-cta-button {
  transition:
    opacity var(--pcom-motion-duration-moderate) ease-in-out 0s,
    transform var(--pcom-motion-duration-long) ease-in-out 0s,
    background-color 0.25s ease 0s,
    border-color 0.25s ease 0s,
    color 0.25s ease 0s;
}

/* Text link hover */
.text-link {
  transition: background var(--p-transition-duration, 0.25s) ease;
  border-radius: 4px;
  margin: -2px;
  padding: 2px;
}

@media (hover: hover) {
  .text-link:hover {
    background: #9495992e;  /* rgba(148, 149, 153, 0.18) */
  }
}
```

### Text Color Semantic System (with Dark Theme Variants)

```css
/* Primary — main headings, body text */
.text-primary { color: #010205; }
.text-primary.theme-dark { color: #FBFCFF; }

/* Contrast hierarchy */
.text-contrast-low { color: #D8D8DB; }
.text-contrast-medium { color: #6B6D70; }
.text-contrast-high { color: #535457; }

/* Notifications */
.text-error { color: #CC1922; }
.text-success { color: #197E10; }
.text-warning { color: #F3BE00; }

/* Dark theme variants */
.theme-dark .text-contrast-low { color: #404044; }
.theme-dark .text-contrast-medium { color: #88898C; }
.theme-dark .text-contrast-high { color: #AFB0B3; }
.theme-dark .text-error { color: #FC4040; }
.theme-dark .text-success { color: #09D087; }
.theme-dark .text-warning { color: #F7CB47; }
.theme-dark .text-info { color: #178BFF; }
```

### Focus & Accessibility (from Source)

```css
:focus {
  outline: 2px solid #1A44EA;
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline-color: transparent;
}

:focus-visible {
  outline: 2px solid #1A44EA;
  outline-offset: 2px;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: hsla(0, 0%, 100%, 0.3);
  border-radius: 4px;
}
```

### Astro Island Hydration Pattern (from Source)

```javascript
class AstroIsland extends HTMLElement {
  connectedCallback() {
    if (!this.hasAttribute('await-children') ||
        document.readyState === 'interactive' ||
        document.readyState === 'complete') {
      this.childrenConnectedCallback();
    } else {
      document.addEventListener('DOMContentLoaded',
        () => this.childrenConnectedCallback(), { once: true });
    }
  }

  async childrenConnectedCallback() {
    const client = this.getAttribute('client');
    if (client === 'visible') {
      this.setupVisibleHydration();
    } else if (client === 'idle') {
      this.setupIdleHydration();
    } else if (client === 'load') {
      this.hydrate();
    }
  }

  setupVisibleHydration() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          this.hydrate();
        }
      },
      { rootMargin: '200px' }  // Pre-hydrate 200px before visible
    );
    observer.observe(this);
  }

  setupIdleHydration() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => this.hydrate(), { timeout: 200 });
    } else {
      setTimeout(() => this.hydrate(), 200);
    }
  }

  async hydrate() {
    const opts = JSON.parse(this.getAttribute('opts') || '{}');
    const props = this.parseProps();
    const Component = await this.loadComponent();
    this.renderComponent(Component, props, opts);
    this.dispatchEvent(new CustomEvent('astro:hydrate'));
  }

  parseProps() {
    const raw = this.getAttribute('props');
    if (!raw) return {};
    return JSON.parse(raw, (key, value) => {
      if (Array.isArray(value) && value.length === 2) {
        const [type, val] = value;
        switch (type) {
          case 0: return val;
          case 1: return new Date(val);
          case 2: return new Set(val);
          case 3: return new Map(val);
          default: return val;
        }
      }
      return value;
    });
  }
}

customElements.define('astro-island', AstroIsland);
```

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-16 | Initial reference document created |
| 2026-03-17 | Added source code extraction: full CSS token system (6-tier fluid spacing with clamp values, 4-tier motion duration, 3 easing curves with descriptions), complete light/dark theme color systems (80+ tokens including semantic states), high contrast mode, FloatingCTA component (complete CSS + JS), image hover scale3d, backdrop blur patterns (light/dark/header/dynamic hover), 16-column grid system, shadow system (float + elevated + pseudo-element pattern), responsive header height, composite transitions, text color semantic system, focus/accessibility, Astro island hydration pattern |
