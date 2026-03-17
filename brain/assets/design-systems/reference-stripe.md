# Stripe Design System Reference

Last updated: 2026-03-17

Extracted from stripe.com homepage, /payments, /enterprise, and /startups pages. This is a **reference document** for studying premium web design craft -- not a template to copy. Stripe is a SaaS product; Reis IA is a high-ticket consultancy. Adapt visual quality and craft, not product patterns.

---

## 1. Color System

### Core Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Navy (dark) | `#0a2540` | Primary text color on light backgrounds |
| Navy (darker) | `#061b31` | Deep text, high-contrast headings |
| Navy (darkest) | `#031323` | Button backgrounds, maximum contrast |
| Purple (primary accent) | `#635bff` | CTAs, links, interactive elements |
| Purple (alt) | `#533afd` | Alternate accent, gradient endpoints |
| Purple (light) | `#96f` | Gradient highlights, navigation accents |
| White | `#ffffff` | Backgrounds, text on dark |

### Neutral Scale (Light Mode)

| Token | Hex | Usage |
|-------|-----|-------|
| Background (primary) | `#ffffff` | Page background |
| Background (secondary) | `#f6f9fc` | Alternating section backgrounds |
| Background (tertiary) | `#f8fafd` | Aside panels, subtle cards |
| Background (menu) | `#eff3f9` | Dropdown menus, mobile nav |
| Border (primary) | `#e5edf5` | Card borders, dividers |
| Border (secondary) | `#e7ecf1` | Light borders |
| Text (secondary) | `#3c4f69` | Body copy, descriptions |
| Text (tertiary) | `#667691` | Captions, metadata |
| Text (quaternary) | `#727f96` | Disabled, placeholder |
| Text (muted) | `#aab4c1` | Timestamps, light metadata |
| Text (disabled) | `#b2bcc7` | Logo fallback, disabled states |

### Dark Backgrounds

| Token | Hex / Value | Usage |
|-------|-------------|-------|
| Hero gradient start | `#24264d` | Enterprise hero background |
| Hero gradient end | `#13172b` | Enterprise hero gradient terminus |
| Enterprise gradient | `linear-gradient(145deg, #24264d, #13172b 75%)` | Full hero treatment |

### Accent Colors

| Purpose | Value |
|---------|-------|
| Success / Positive | `#15be53` |
| Orange accent | `#ff6118` |
| Pink accent | `#ff5996` |
| Pink-purple | `#fb76fa` |
| Orange gradient | `linear-gradient(90deg, #e18638, #e17a38)` |
| Navigation rainbow | `linear-gradient(90deg, #533afd, #533afd 20%, #fb76fa 40%, #ff6118 60%, #ff6118)` |

### Shadow Colors

| Purpose | Value |
|---------|-------|
| Shadow (primary) | `rgba(50, 50, 93, 0.25)` |
| Shadow (secondary) | `rgba(0, 0, 0, 0.1)` |
| Shadow (subtle) | `rgba(0, 0, 0, 0.03)` |
| Shadow (large) | `rgba(50, 50, 93, 0.18)` |
| Focus ring | `rgba(50, 151, 211, 0.3)` |
| Glassmorphism bg | `hsla(0, 0%, 100%, 0.2)` |
| Gradient fade | `rgba(236, 239, 241, 0.8)` |

---

## 2. Typography System

### Font Family

```css
font-family: var(--fontFamily); /* System font stack - appears to be a custom sans-serif similar to Inter/system-ui */
```

Stripe uses a proprietary font stack loaded via CSS variables. The visual result is a geometric sans-serif similar to Inter or SF Pro.

### Type Scale

| Level | Size (Desktop) | Size (Mobile) | Weight | Line-Height | Letter-Spacing |
|-------|---------------|---------------|--------|-------------|----------------|
| Display / Hero | 76px | 48px | Bold (700) | 1.1 (68px mobile, ~84px desktop) | -0.96px / -0.02em |
| H1 | 56px | 48px | Bold | 68px / 56px | -0.64px |
| H2 | 48px | 34px | Semibold (600) | 56px / 40px | -0.02em |
| H3 | 38px | 28px | Semibold | 1.2 | -0.1px |
| H4 | 34px | 26px | Semibold | 40px | 0 |
| H5 | 24px | 24px | Semibold | 32px | 0 |
| Body (large) | 18px | 18px | Normal (300-400) | 28px / 1.556 | 0 |
| Body | 16px | 16px | Normal | 1.5 | 0 |
| Caption / Detail | 15px | 15px | Semibold (600) | 24px / 1.6 | 0.2px |
| Button | 14-15px | 14px | Semibold | 1.6 | 0.2px |
| Small / Meta | 13px | 13px | Normal (400) | 18px / 1.4 | 0 |

### Weight System

| Token | Value | Usage |
|-------|-------|-------|
| Light | 300 | Body text (some contexts) |
| Normal/Regular | 400 | Body text, descriptions |
| Medium | 500 | Emphasis, some labels |
| Semibold | 600 | Subheadings, captions, buttons, cards |
| Bold | 700 | Headlines, hero text |

### Key Typography Patterns

- **Headline letter-spacing tightens as size increases**: Display (-0.96px), H1 (-0.64px), H2 (-0.02em), body (0)
- **Line-height decreases as size increases**: Body (1.5-1.6), H3 (1.2), Display (1.1)
- **Semibold (600) is the workhorse weight**: Used for everything between body and headlines
- **Caption text uses positive letter-spacing** (+0.2px) for readability at small sizes

---

## 3. Spacing System

### Section Padding (Vertical)

```css
--sectionPaddingMin: 72px;   /* Mobile minimum */
--sectionPaddingMax: 128px;  /* Desktop maximum */
```

Padding scales fluidly between 375px and 1112px viewport widths. Common values:

| Context | Mobile | Desktop |
|---------|--------|---------|
| Section padding (standard) | 72px | 96-128px |
| Section padding (hub/landing) | 96px | 128px |
| Hero padding-top | 214px | 182px |
| Hero padding-bottom | 32px | 0px |

### Column/Container Padding

```css
--columnPaddingNormal: 24px;   /* Standard horizontal padding */
--columnPaddingMedium: 32px;   /* Medium screens */
--columnPaddingXLarge: 48px;   /* Large screens */
```

### Gap Scale

| Size | Value | Usage |
|------|-------|-------|
| XS | 8px | Grid gap mobile, tight element spacing |
| SM | 12px | Icon-to-text, compact groupings |
| MD | 16px | CTA group gap, standard element spacing |
| LG | 24px | Grid gap desktop, card padding |
| XL | 32px | Section sub-spacing, large card padding |
| 2XL | 40px | Row gap large, major element spacing |
| 3XL | 48px | Column gap large |
| 4XL | 64px | Row gap desktop, major section splits |
| 5XL | 96px | Section padding minimum |
| 6XL | 128px | Section padding maximum |

### CTA Group Spacing

```css
--ctaGroupGapNormal: 16px;
```

---

## 4. Layout System

### Container Widths

| Context | Max-Width |
|---------|-----------|
| Content (standard) | 1080px |
| Content (with padding) | calc(1080px + var(--columnPaddingNormal) * 2) |
| Content (narrow) | 752px |
| Navigation | 1264px |

### Grid System

```css
/* Responsive columns */
Mobile (< 600px):   4 columns, 8px gap
Tablet (600-899px): 8 columns, 24px gap
Desktop (900+):     12 columns, 24px gap
```

### Column Layout Patterns

```css
[data-columns="1,1"]   -> repeat(2, 1fr)
[data-columns="1,1,1"] -> repeat(3, 1fr)
[data-columns="2,1"]   -> 2fr 1fr
[data-columns="3,1"]   -> 3fr 1fr
[data-columns="1,2"]   -> 1fr 2fr
```

### Breakpoints (Observed)

| Name | Width |
|------|-------|
| Mobile | < 600px |
| Tablet | 600-899px |
| Desktop | 900-1111px |
| Large | 1112px+ |

---

## 5. Component Specifications

### Buttons

**Primary Button**
```css
background-color: #635bff;   /* or #031323 for dark variant */
color: #ffffff;
padding: 3px 16px 6px;       /* Asymmetric vertical padding */
border-radius: 16.5px;       /* Pill shape */
font-size: 14-15px;
font-weight: 600 (semibold);
line-height: 1.6;
letter-spacing: 0.2px;
transition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
```

**Primary Button Hover**
```css
opacity: 0.6;   /* Simple opacity reduction */
```

**Link Button**
```css
background: transparent;
color: #635bff;
font-weight: 600;
display: inline-flex;
align-items: center;
gap: 8px;  /* For arrow icon */
```

**Key Pattern**: Stripe uses a pill-shaped button (border-radius: 16.5px) with asymmetric vertical padding (more padding on bottom). The hover state is a simple opacity reduction rather than a color shift.

### Cards

**Standard Card**
```css
background: #ffffff;
border-radius: 8px;
border: 1px solid #e5edf5;   /* Optional */
```

**Shadow Tiers**

| Tier | Value |
|------|-------|
| XSmall | `0 1px 1.5px 0 rgba(0,0,0,.03), 0 2px 4px 0 rgba(0,0,0,.03)` |
| Small | `0 18px 36px -18px rgba(0,0,0,.1), 0 30px 45px -30px rgba(50,50,93,.25)` |
| Medium | `0 20px 60px rgba(50,50,93,.18)` |
| Large | `0 30px 60px -10px rgba(50,50,93,.25)` |
| XLarge | `0 50px 100px -20px rgba(0,0,0,.25)` |

**Accented Card (with top border)**
```css
border-radius: 8px;
min-height: 72px;
padding: 30px 20px 16px;
top-border-height: 8px;     /* Colored accent stripe at top */
top-border-color: var(--accentColor);
transition: transform 500ms cubic-bezier(0.7, 0, 0, 1);
```

**Card Hover**
```css
transform: scale(1.018);
box-shadow: 0 100px 60px -40px rgba(0,0,0,.06),
            0 60px 100px 0 rgba(50,50,93,.15);
transition: transform 500ms cubic-bezier(0.7, 0, 0, 1);
```

**Key Pattern**: Cards scale up very slightly on hover (1.018x) with a shadow depth increase. The transition is slow (500ms) with a custom easing that feels weighty.

### Navigation

**Site Header**
```css
position: fixed;             /* At 900px+ */
z-index: 100;
min-height: 68px;
padding: 12px 24px;          /* Desktop */
padding: 32px 24px 12px;     /* Mobile */
background: #ffffff;         /* Opaque state */
transition: 0.25s cubic-bezier(0.61, 1, 0.88, 1);
```

**Sticky Behavior**: Header starts transparent, becomes opaque with shadow on scroll. Class toggle: `SiteHeader--opaque`.

**Navigation Dropdown**
```css
max-width: 1264px;
width: calc(100vw - 48px - scrollbar-width);
border-radius: 8px;
box-shadow: 0 30px 60px -50px rgba(0,0,0,.1),
            0 30px 60px -10px rgba(50,50,93,.25);
```

**Mobile Menu**
```css
header-height: 60px;
body: auto height with overflow scroll;
footer-height: 64px;
background: #f6f9fb;
padding: 4px;
transition: visibility 240ms, opacity 240ms;
transform: translateY(0 or -100%);
```

### Footer

- 2-column layout desktop, stacked mobile
- Typography: 15px / 1.6 line-height
- Multi-column link lists using `grid: auto / repeat(var(--columnCount), 1fr)`

---

## 6. Animation & Motion System

### Timing Functions (Easing Library)

| Name | Value | Usage |
|------|-------|-------|
| easeOutCubic | `cubic-bezier(0.215, 0.61, 0.355, 1)` | Button transitions, micro-interactions |
| easeOutSine | `cubic-bezier(0.61, 1, 0.88, 1)` | Header opacity, smooth exits |
| Standard | `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | General purpose |
| Material | `cubic-bezier(0.4, 0, 0.2, 1)` | Menu transitions |
| Bouncy | `cubic-bezier(0.25, 1, 0.5, 1)` | Playful interactions |
| Card Scale | `cubic-bezier(0.7, 0, 0, 1)` | Card hover, weighty feel |
| Linear | `linear` | Opacity fades, marquee |

### Duration Scale

| Duration | Usage |
|----------|-------|
| 100ms | Micro-interactions, opacity hints |
| 150ms | Button hover, icon shifts |
| 240ms | Menu visibility, mobile nav |
| 250ms | Menu transitions, header |
| 300ms | Opacity fades, link hover |
| 500ms | Card hover scale + shadow |
| 850ms | Card entrance animations |
| 1000ms | Hero knockout text reveal |
| 5000ms | Knockout text gradient loop |
| 30000ms | Logo marquee scroll |
| 45000ms | Stats carousel |

### Entrance Animations

**Card entrance**
```css
animation-duration: 0.85s;
animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
transform: translateY(20px) -> translateY(0);  /* inferred */
opacity: 0 -> 1;
```

**Knockout Text Reveal**
```css
mask-position: -20% -> 50%;
animation-duration: 1s;
animation-timing-function: ease-out;
```

**Knockout Text Loop**
```css
animation: knockoutText 5s linear infinite;
background: linear-gradient(45deg, ...);
background-size: 1000%;
background-clip: text;
-webkit-text-fill-color: transparent;
```

### Hover Micro-Interactions

**Arrow icon on link hover**
```css
transform: translateX(3px);
transition: 150ms;
```

**CTA arrow swap (card footers)**
```css
/* Dual-arrow animation where one slides out and another slides in */
transform: translateY(100%);  /* swap animation */
```

### Scroll-Triggered Patterns

- Hero section uses fixed positioning with parallax-style card fan perspective
- Stats carousel with 45s continuous animation
- Section entrances triggered on scroll (opacity + translateY)
- Logo marquee: 30s linear infinite, slows to 60s on hover

---

## 7. Effects & Visual Treatments

### Glassmorphism

```css
background: hsla(0, 0%, 100%, 0.2);
backdrop-filter: blur(7px);
```

Alternative lighter version:
```css
backdrop-filter: blur(5px);
/* or */
backdrop-filter: blur(3.5px);
```

### Gradient Treatments

**Hero background gradient**
```css
background: linear-gradient(145deg, #24264d, #13172b 75%);
```

**Navigation accent line**
```css
background: linear-gradient(90deg, #533afd, #533afd 20%, #fb76fa 40%, #ff6118 60%, #ff6118);
background-size: 0 100%, 100% 100%;
transition: background-size 0.3s ease-out;
```

**Content fade overlay**
```css
background: linear-gradient(transparent, rgba(236, 239, 241, 0.8));
```

**Marquee edge fade**
```css
-webkit-mask-image: linear-gradient(to right, transparent 5%, black 15%, black 85%, transparent 95%);
```

### Knockout / Gradient Text

```css
background: linear-gradient(45deg, ...);
background-size: 1000%;
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

Animated via `mask-position` shift from -20% to 50% over 1s ease-out.

### Skewed Sections

```css
transform: skewY(-6deg);    /* Section angle */
/* Negative margin to compensate for skew gap */
```

### Wave / Mesh Backgrounds

```css
position: absolute;
z-index: -1;
top: -120px;     /* Extends beyond section bounds */
bottom: -120px;
left: -20px;
right: -20px;
/* Background image: wave-fallback-desktop.png */
```

### Border Radius Scale

| Size | Value | Usage |
|------|-------|-------|
| XS | 2px | Inline code, tiny elements |
| SM | 4px | Small badges, tags |
| MD | 6px | Input fields, small cards |
| LG | 8px | Cards, nav dropdowns |
| Pill | 12.5px | Badges, chips |
| Full Pill | 16.5px | Buttons |

---

## 8. Unique Signature Elements

### 1. The Gradient Mesh / Wave Background

Stripe's most recognizable visual element. A flowing, organic gradient mesh that appears behind hero sections. Characteristics:
- Multi-color gradient with purple, blue, teal, green flowing together
- Positioned absolutely behind content
- Extends beyond section bounds (-120px overshoot)
- Uses actual image assets (`wave-fallback-desktop.png`) as fallback for WebGL/canvas-rendered versions
- Creates depth without competing with content
- Never sharp-edged -- always organic, flowing forms

**Reis IA adaptation note**: This specific treatment is too strongly associated with Stripe. For Reis IA, consider: subtle geometric grid patterns at 3-5% opacity, or minimal gradient washes using the gold/amber accent.

### 2. Knockout Gradient Text

Hero headlines rendered with gradient fills behind text using `background-clip: text`. The gradient animates on load:
- Initial state: gradient positioned off-screen (-20%)
- Reveals to center (50%) over 1s ease-out
- Then loops continuously (5s linear infinite) for a living, breathing headline
- Background-size set to 1000% to allow smooth animation across the text

**Reis IA adaptation note**: Could work for a single accent word in hero headlines. Use gold-to-white gradient instead of rainbow. Keep it subtle -- a slow shimmer, not a party.

### 3. The Asymmetric Pill Button

Button padding is intentionally asymmetric: `3px 16px 6px` (more bottom padding). Combined with `border-radius: 16.5px` (not a round number), this creates a refined, optically-centered feel. The hover is just opacity reduction -- no color shift, no scale, no shadow change.

**Reis IA adaptation note**: The asymmetric padding trick is universally applicable. The opacity-only hover is elegant for primary CTAs.

### 4. Card Hover: Scale + Shadow Depth

Cards scale to exactly 1.018x on hover (not 1.02, not 1.05) with shadow transitioning from flat to deep over 500ms with a heavy easing curve. This makes cards feel like physical objects lifting off the surface.

**Reis IA adaptation note**: Directly applicable. Use 1.015-1.02x scale with shadow depth increase. The 500ms duration with `cubic-bezier(0.7, 0, 0, 1)` is the key -- it feels premium because it's slow and weighted.

### 5. Section Background Alternation

Stripe alternates between pure white and `#f6f9fc` (a barely-perceptible blue-gray). This creates visual rhythm and section separation without borders or heavy dividers.

**Reis IA adaptation note**: Apply the same principle in dark mode. Alternate between `#000000` (pure black) and `#0A0A0A` (near-black). The contrast is even more subtle in dark mode, which fits the premium feel.

---

## 9. Responsive Design Patterns

### Fluid Scaling

Stripe uses `clamp()`-style fluid scaling between breakpoints rather than discrete jumps. Section padding scales between `--sectionPaddingMin` and `--sectionPaddingMax` across the 375px-1112px range.

### Typography Responsive Jumps

| Level | Mobile | Desktop | Reduction |
|-------|--------|---------|-----------|
| Display | 48px | 76px | 37% smaller |
| H1 | 48px | 56px | 14% smaller |
| H2 | 34px | 48px | 29% smaller |
| H3 | 28px | 38px | 26% smaller |
| Body | 18px | 18px | No change |
| Caption | 15px | 15px | No change |

**Pattern**: Headlines shrink significantly on mobile; body text stays the same. Body text is already optimized for mobile reading.

### Grid Collapse

- Desktop: 12 columns, 24px gap
- Tablet: 8 columns, 24px gap
- Mobile: 4 columns, 8px gap

Multi-column layouts collapse to single column on mobile. 2-column layouts with `2fr 1fr` become stacked.

### Mobile-Specific Treatments

- Hero padding-top increases on mobile (214px vs 182px desktop) to account for different header behavior
- Navigation transforms to slide-up fullscreen menu with `translateY(-100%)` transition
- Cards lose hover effects (no hover on touch)
- Logo marquee speed does not change on touch devices

---

## 10. Design Quality Patterns (What Makes Stripe Feel Premium)

### Restraint in Color
- Only ONE accent color (`#635bff`) dominates. Other colors appear only in specific product graphics.
- No gradients on UI elements (buttons, cards, inputs). Gradients reserved for background art.

### Generous Whitespace
- 96-128px between sections. Most sites use 48-64px.
- Hero sections have 182-214px top padding. Content breathes.

### Optical Adjustments
- Button padding is asymmetric (3px top, 6px bottom) for optical centering
- Letter-spacing tightens as font size increases (professional typesetting rule)
- Border-radius values are not round numbers (16.5px, 12.5px) -- these are optically tuned

### Animation Philosophy
- Slow and weighted (500ms for cards, 850ms for entrances)
- Custom easing curves for every context -- never default `ease` or `ease-in-out`
- Hover effects are subtle (opacity change, 3px icon shift, 1.018x scale)
- Nothing bounces, nothing overshoots. Everything decelerates smoothly.

### Shadow Layering
- Shadows use TWO values stacked: one for ambient occlusion (spread, lighter), one for directional shadow (offset, darker)
- Shadow color is tinted (`rgba(50,50,93,...)`) not pure black -- this adds warmth

### Typography Confidence
- Large hero text (48-76px) with very tight letter-spacing (-0.96px)
- Body text is light weight (300-400) creating contrast with semibold subheads
- No ALL CAPS except for small labels/badges

---

## Appendix: CSS Custom Properties Reference

```css
/* Layout */
--layoutWidth: (calculated);
--columnPaddingNormal: 24px;
--columnPaddingMedium: 32px;
--columnPaddingXLarge: 48px;
--gridColumnCount: 4 | 8 | 12;
--gridColumnGap: 8px | 24px;

/* Spacing */
--sectionPaddingMin: 72px | 96px;
--sectionPaddingMax: 128px;
--sectionPaddingTopMax: var(--sectionPaddingMax);
--sectionPaddingBottomMax: var(--sectionPaddingMax);
--rowGapLarge: 64px;
--ctaGroupGapNormal: 16px;

/* Colors */
--accentColor: #635bff;
--linkHoverColor: (accent at reduced opacity);

/* Typography */
--fontFamily: (proprietary stack);
--fontWeightNormal: 400;
--fontWeightSemibold: 600;
--fontWeightBold: 700;

/* Shadows */
--cardShadowXSmall: 0 1px 1.5px 0 rgba(0,0,0,.03), 0 2px 4px 0 rgba(0,0,0,.03);
--cardShadowSmall: 0 18px 36px -18px rgba(0,0,0,.1), 0 30px 45px -30px rgba(50,50,93,.25);
--cardShadowMedium: 0 20px 60px rgba(50,50,93,.18);
--cardShadowLarge: 0 30px 60px -10px rgba(50,50,93,.25);
--cardShadowXLarge: 0 50px 100px -20px rgba(0,0,0,.25);

/* Focus */
--focusBoxShadow: 0 0 0 1px rgba(50,151,211,.3);

/* Transitions */
--hoverTransition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
```

---

## [ADDED -- 2026-03-17] Source Code Extraction: Animation Architecture

### Complete Easing Curve Library (8 Named Curves)

Extracted from stripe.com production CSS. These are the actual cubic-bezier values used across the site:

```css
/* 1. easeOutCubic — link hovers, micro-interactions */
cubic-bezier(0.215, 0.61, 0.355, 1)

/* 2. Dramatic ease — hero animations, large section transforms */
cubic-bezier(0.7, 0, 0, 1)

/* 3. easeInOutCubic — section transitions */
cubic-bezier(0.65, 0, 0.35, 1)

/* 4. easeInOutSine — nav height changes */
cubic-bezier(0.45, 0.05, 0.55, 0.95)

/* 5. easeOutBack-ish — arrow animations */
cubic-bezier(0.25, 1, 0.5, 1)

/* 6. Material ease — menu section slides */
cubic-bezier(0.4, 0, 0.2, 1)

/* 7. Custom ease — enterprise transitions */
cubic-bezier(0.22, 1, 0.36, 1)

/* 8. Custom ease — mobile menu button */
cubic-bezier(0, 0.09, 0.4, 1)
```

### Micro-Interaction Timing Pattern (150ms / 250ms / 850ms)

```css
/* Tier 1: Micro-interactions (150ms) */
--hoverTransition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
/* Used for: button hovers, color changes, icon shifts, link opacity */

/* Tier 2: Standard UI (200-250ms) */
--siteMenuTransition: 250ms;
/* Used for: nav menu height, slider knob, mobile open/close */

/* Tier 3: Large animations (850ms) */
/* Used for: card entrance animations, section transforms */
animation-duration: 0.85s;
animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);

/* Full duration catalog from source */
150ms  /* micro-interactions (hovers, color changes) */
200ms  /* small UI changes (slider knob, menu height) */
240ms  /* mobile menu open/close */
250ms  /* navigation menu transitions */
300ms  /* gradient line reveals, arrow animations */
350ms  /* medium transitions */
500ms  /* section transforms */
600ms  /* spinner rotation */
850ms  /* large section animations */
1000ms /* gradient canvas fade-in initial */
1800ms /* gradient canvas full opacity */
```

### Keyframe Animations (Complete Catalog)

#### Navigation Hover Arrow (Bi-directional)
```css
@keyframes refreshed-nav-hover-arrow-in {
  0% {
    opacity: 0;
    transform: translateX(-3px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes refreshed-nav-hover-arrow-out {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Usage pattern — visibility + animation combo */
.RefreshedHoverArrow {
  visibility: hidden;
  transition: visibility 0ms linear 0.3s;
  animation-name: refreshed-nav-hover-arrow-out;
  animation-duration: 0.15s;
  animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
  animation-fill-mode: forwards;
}

a:hover .RefreshedHoverArrow,
button:hover .RefreshedHoverArrow {
  animation-name: refreshed-nav-hover-arrow-in;
  animation-duration: 0.3s;
  visibility: visible;
  transition-delay: 0ms;
}
```

#### Knockout Text (Enterprise Hero)
```css
@keyframes knockoutText {
  0% {
    background-position-y: 0;
  }
  to {
    background-position-y: 100%;
  }
}
```

#### Billing Statistics Animations
```css
@keyframes bucketListingStatBackgroundAnimation {
  0% { background-position-y: 0; }
  to { background-position-y: 400000%; }
}

@keyframes bucketListingStatArrowAnimation {
  0% { opacity: 0.25; }
  50% { opacity: 1; }
  to { opacity: 0.25; }
}
```

#### Payment Hero Spinner
```css
@keyframes PaymentsHeroAnimationLinkSpinnerAnimation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.PaymentsHeroAnimationLink__spinner {
  animation: PaymentsHeroAnimationLinkSpinnerAnimation 0.6s linear infinite;
}
```

#### Portal Tooltip Fade
```css
@keyframes PortalTooltipItemFadeIn {
  0% { opacity: 0; }
}
```

### Payment Demo Interaction Patterns

#### Multi-Tab Payment Flow (HTML Structure)
```html
<div class="PaymentsHeroAnimationPaymentElements">
  <div class="PaymentsHeroAnimationPaymentElements__header">
    <!-- Tab buttons: Card, Bank, Wallet -->
  </div>
  <div class="PaymentsHeroAnimationPaymentElements__paymentDashboard">
    <div class="PaymentsHeroAnimationPaymentElements__radioGroup">
      <div class="PaymentsHeroAnimationPaymentElements__radioItem">
        <!-- Animated radio with background fill + ring glow -->
        <div class="PaymentsHeroAnimationPaymentElements__radioBackground"></div>
        <div class="PaymentsHeroAnimationPaymentElements__radioRing"></div>
      </div>
    </div>
  </div>
</div>
```

#### Step Flow Animation (Klarna)
```html
<div class="PaymentsHeroAnimationKlarna">
  <div class="PaymentsHeroAnimationKlarna__header">
    <div class="PaymentsHeroAnimationKlarna__headerStepList">
      <!-- Step indicators with progress animation -->
    </div>
  </div>
  <div class="PaymentsHeroAnimationKlarna__payment">
    <div class="PaymentsHeroAnimationKlarna__shippingInput">
      <div class="PaymentsHeroAnimationKlarna__shippingInputValue">
        <!-- Text appears with opacity transition -->
      </div>
    </div>
  </div>
</div>
```

#### Email Verification with OTP Animation
```html
<div class="PaymentsHeroAnimationLink">
  <div class="PaymentsHeroAnimationLink__shippingEmailValue">
    <div class="PaymentsHeroAnimationLink__shippingEmailValueBackground">
      <!-- Highlight sweep animation -->
    </div>
    <div class="PaymentsHeroAnimationLink__spinner">
      <!-- Rotates at 0.6s linear infinite -->
    </div>
  </div>
  <div class="PaymentsHeroAnimationLink__verification">
    <div class="PaymentsHeroAnimationLink__verificationCode">
      <!-- OTP code input boxes with blinking cursor -->
      <div class="PaymentsHeroAnimationLink__verificationCodeInput">
        <!-- :after pseudo-element blinks opacity 0->1 -->
      </div>
    </div>
  </div>
</div>
```

#### Billing Interactive Pricing Slider
```html
<div class="BillingHeroAnimation">
  <div class="BillingHeroAnimation__planBox">
    <!-- 3 plan cards: Starter, Professional, Enterprise -->
  </div>
  <div class="BillingHeroAnimation__sliderBox">
    <div class="BillingHeroAnimation__activeSliderTrack">
      <!-- transform: translateX(-100%) to translateX(0) based on value -->
    </div>
    <div class="BillingHeroAnimation__sliderNob">
      <!-- Draggable knob with cardShadowXSmall -->
      <!-- transition: transform 0.2s ease-out -->
    </div>
  </div>
</div>
```

#### Enterprise Hero Card Hover
```css
.EnterpriseHubHeroCard:hover .EnterpriseHubHeroCard__footerIconArrow--a {
  transform: translateY(100%);
}
.EnterpriseHubHeroCard:hover .EnterpriseHubHeroCard__footerIconArrow--b {
  transform: translateY(0);
}

/* Ticker speed change on hover */
.EnterpriseHubTicker:hover {
  --animationDuration: 90000;
}
```

### Gradient Definitions (Complete from Source)

#### Product Suite Navigation Gradient Line (Mouse-Direction-Aware)
```css
.RefreshedGradientLine:after {
  background: linear-gradient(
    90deg,
    var(--gradient-color),
    var(--gradient-color) 20%,
    var(--stop-color) 40%,
    var(--suite-color) 60%,
    var(--suite-color)
  ), #e5edf5;
  border-radius: 1px;
}

/* Mouse direction-aware reveal */
@media (hover: hover) {
  .RefreshedGradientLine:after {
    background-size: 0 100%, 100% 100%;
    background-position: var(--mouse-in-dir, right), 0;
    background-repeat: no-repeat, no-repeat;
    transition: background-size 0.3s ease-out;
  }

  .SiteProductsNav__group:hover .RefreshedGradientLine:after {
    background-position: var(--mouse-out-dir, left), 0;
    background-size: 100% 100%, 100% 100%;
  }
}
```

#### Enterprise Rainbow Gradient (Knockout Text)
```css
background: linear-gradient(
  90deg,
  #96f,
  #bf70ff,
  #e67aff,
  #ff89dc,
  #ffa176,
  #ffb90f
);
-webkit-mask-image: linear-gradient(
  45deg,
  transparent,
  #000 20%,
  #000 60%,
  transparent 80%
);
-webkit-mask-position: -20%;
-webkit-mask-size: 1000%;
```

#### Navigation CTA Gradient
```css
.NavCtaGradient .CtaButton .NavCta__label {
  background: linear-gradient(90deg, #e18638, #e17a38);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background 0.3s linear;
}
```

#### Modal Overlay Gradient
```css
.SiteHeader__overlay {
  background: linear-gradient(transparent, rgba(236, 239, 241, 0.8));
}
```

#### Fade Edge Masks
```css
-webkit-mask-image: linear-gradient(
  90deg,
  transparent,
  #000 5%,
  #000 95%,
  transparent
);

background-image: linear-gradient(transparent, #fff 5px);
```

### Scroll Patterns (from Source)

#### Scroll Snap Configuration
```css
.scroll-container {
  scroll-snap-type: x mandatory;
  scroll-snap-align: center;
  scroll-padding-left: var(--overflowMargin);
  scroll-padding-right: var(--overflowMargin);
  scrollbar-width: none;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
}

.scroll-item {
  scroll-snap-align: start;
}
```

#### Sticky Header State Machine
```javascript
// Stripe's sticky header uses class toggling:
// .SiteHeader--isStuck    -> header has left initial position
// .SiteHeader--isSticky   -> header is pinned
// .SiteHeader--opaque     -> header has solid background

// Transition sequence:
// 1. Initial: transparent nav, colored text
// 2. On scroll: solid white bg, dark text, shadow appears
// 3. Shadow slides in via transform: translateY(-100%) -> translateY(0)

// Fixed nav anchor offset:
scroll-margin-top: var(--fixedNavScrollMargin);
```

#### Sticky Header CSS Transitions
```css
.SiteHeader--isSticky .SiteHeader__stickyShadow {
  transform: translateY(-100%);
  transition: opacity 0.25s var(--easeOutSine);
  opacity: 0;
}

.SiteHeader--isSticky.SiteHeader--opaque .SiteHeader__stickyShadow {
  transform: translateY(0);
}

.SiteHeader--isSticky.SiteHeader--opaque .SiteHeader__container {
  transition-property: opacity, border-radius;
  transition-duration: 0.24s, 0ms;
  transition-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95), linear;
}
```

### Transition Patterns (Extended Catalog from Source)

#### Navigation Menu Section Slide + Fade
```css
.RefreshedMenu {
  transition: height 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  will-change: height;
}

.RefreshedMenu__section {
  opacity: 1;
  transform: translateX(-50%) translateX(var(--siteMenuSectionOffset));
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.25s, 0.5s;
}

.RefreshedMenu__section[aria-hidden=true] {
  opacity: 0;
  --siteMenuSectionOffset: -20%;
  pointer-events: none;
}
```

#### Mobile Menu Open/Close
```css
.SiteHeader__mobileMenu {
  opacity: 0;
  transform: translateY(100%);
  transition: visibility step-end 240ms,
              transform ease-out 240ms,
              opacity ease-out 240ms;
}

.SiteHeader--mobileMenuVisible .SiteHeader__mobileMenu {
  transform: translateY(0);
  opacity: 1;
  transition: visibility step-start 240ms,
              transform ease-out 240ms,
              opacity ease-out 240ms;
}
```

#### Hamburger Icon X Animation
```css
.RefreshedMenuButton {
  transition: background-color 0.2s cubic-bezier(0, 0.09, 0.4, 1),
              opacity 0.25s ease-in-out,
              visibility 0.25s ease-in-out;
}

.RefreshedMenuButton rect {
  opacity: 1;
  transform-origin: center;
  transition: 0.25s ease-in-out;
}

.SiteHeader--mobileMenuVisible .RefreshedMenuButton rect:nth-child(2) {
  transform: rotate(45deg);
}

.SiteHeader--mobileMenuVisible .RefreshedMenuButton rect:nth-child(3) {
  transform: rotate(-45deg);
}
```

#### Gradient Canvas (Hero Background)
```css
.Gradient:after {
  transition: transform 1s 1s;
  transform: translateX(-50%) scaleY(0.995);
}

.Gradient__canvas {
  opacity: 0;
  transition: opacity 1.8s ease-in 50ms;
}

.Gradient__canvas.isLoaded {
  opacity: 1;
}
```

### Backdrop & Filter Effects (from Source)

```css
/* Mobile menu footer */
.MobileMenu__footer {
  background: radial-gradient(
    66.35% 66.35% at 50% 50%,
    hsla(0, 0%, 100%, 0.9) 0,
    hsla(0, 0%, 100%, 0) 100%
  ), hsla(0, 0%, 100%, 0.8);
  -webkit-backdrop-filter: blur(3.5px);
  backdrop-filter: blur(3.5px);
}

/* Header overlay */
.SiteHeader__overlay {
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}

/* Enterprise backdrop */
.enterprise-backdrop {
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
}
```

### Transform Catalog (from Source)

```css
/* Navigation transforms */
transform: translateX(-50%) translateX(var(--siteMenuSectionOffset));
transform: translateY(-100%);  /* hidden above viewport */
transform: translateY(100%);   /* hidden below viewport */
transform: translateY(0);      /* visible position */

/* Enterprise section skew */
transform: skewY(var(--sectionAngle));
transform: skewY(6deg);
transform: scaleY(1.51);

/* Interactive elements */
transform: scale(0);           /* hidden state */
transform: scale(1.3);         /* emphasized state */
transform: translateX(3px);    /* hover arrow nudge */
transform: translateX(calc(var(--progressIndicatorIndex) * 28px));

/* 3D performance hints */
transform: translateZ(0);
transform-origin: top center;
transform-origin: top left;
transform-origin: bottom center;
```

### Clip-Path & Mask Techniques (from Source)

```css
/* Progressive reveal via clip-path */
clip-path: inset(0 100% 0 0);   /* fully hidden */
clip-path: inset(0 0 0 0);      /* fully visible */

/* Gradient mask for text knockout */
-webkit-background-clip: text;
background-clip: text;

/* Directional fade mask */
-webkit-mask-image: linear-gradient(
  45deg,
  transparent,
  #000 20%,
  #000 60%,
  transparent 80%
);
-webkit-mask-position: -20%;
-webkit-mask-size: 1000%;

/* Edge fade for horizontal scroll */
-webkit-mask-image: linear-gradient(
  90deg,
  transparent,
  #000 5%,
  #000 95%,
  transparent
);
```

### JavaScript Patterns (from Source)

#### Mouse Direction Detection for Gradient Lines
```javascript
// Stripe tracks mouse entry/exit direction for gradient line animations
// Sets CSS custom properties --mouse-in-dir and --mouse-out-dir
// Values: "left" or "right"
// Gradient fill animates from the direction the mouse enters
// and reverses from the direction the mouse exits

// CSS usage:
// background-position: var(--mouse-in-dir, right), 0;
// On hover: background-position: var(--mouse-out-dir, left), 0;
```

#### Lazy Style Loading
```javascript
new MutationObserver(e => {
  for (const d of e)
    if (d.addedNodes)
      for (const e of d.addedNodes)
        if (e instanceof HTMLLinkElement && void 0 !== e.dataset.jsLazyStyle)
          e.addEventListener("load", function() { this.media = "all"; });
}).observe(document.head, { childList: true });

document.addEventListener("DOMContentLoaded", () => {
  for (const e of document.querySelectorAll("link[data-js-lazy-style]"))
    if ("all" !== e.media) e.media = "all";
});
```

### Design Token Deep-Dive (from Source CSS)

#### Complete Color Tokens
```css
:root {
  --accentColor: #96f;
  --backgroundColor: #fff;
  --navColor: #0a2540;
  --navHoverColor: #0a2540;
  --linkColor: #0a2540;
  --buttonColor: #635bff;
  --menuBgColor: #eff3f9;
  --knockoutColor: #fff;
  --cardBackground: #fff;
  --cardBorderColor: #cbd6e0;

  /* Enterprise dark theme */
  --backgroundColor-enterprise: linear-gradient(145deg, #24264d, #13172b 75%);

  /* Billing hero tokens */
  --billingHeroAnimationSliderColor: #edf1f5;
  --billingHeroAnimationProfessionalColor: #15be53;
  --billingHeroAnimationStarterColor: #fab000;
  --billingHeroAnimationEnterpriseColor: #09cbcb;

  /* Product suite gradient tokens */
  --suite-color-payments: #ff6118;
  --stop-color-payments: #fb76fa;
  --gradient-color-payments: #533afd;

  --suite-color-billing: #fc5;
  --stop-color-billing: #fb76fa;
  --gradient-color-billing: #533afd;

  --suite-color-connect: #f44bcc;
  --stop-color-connect: #ec8fff;
  --gradient-color-connect: #533afd;

  --suite-color-tax: #ea2261;
  --stop-color-tax: #da56ed;
  --gradient-color-tax: #533afd;
}
```

#### Complete Shadow Tokens (from Source)
```css
:root {
  --cardShadowXSmall: 0 0 60px rgba(50, 50, 93, 0.18);
  --cardShadowSmall: 0 20px 60px rgba(50, 50, 93, 0.18);
  --cardShadowMedium: 0 30px 60px rgba(50, 50, 93, 0.25);
  --cardShadowLarge: 0 41px 60px -40px rgba(0, 0, 0, 0.1),
                     0 40px 100px rgba(50, 50, 93, 0.15);
  --refreshedNavShadow: 0 30px 60px -50px rgba(0, 0, 0, 0.102),
                        0 30px 60px -10px rgba(50, 50, 93, 0.251);
  --refreshedMenuShadow: 0 18px 36px -18px rgba(0, 0, 0, 0.1),
                         0 30px 45px -30px rgba(50, 50, 93, 0.25);
}

/* Enterprise deep shadows */
.enterprise-card {
  box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
              0 30px 60px -30px rgba(0, 0, 0, 0.3),
              inset 0 -2px 6px 0 rgba(10, 37, 64, 0.35);
}
```

#### Form System Tokens (from Source)
```css
:root {
  --formContentMaxWidth: 384px;
  --formPadding: 24px 16px;
  --formFieldFontSize: 12px;
  --formFieldInputHeight: 38px;
  --formFieldBorderColor: #e6ebf1;
  --formFieldBorderRadius: 6px;
  --formFieldBackground: #fff;
  --formFieldLabelFontSize: 13px;
  --formFieldTextColor: #425466;
  --formFieldPlaceholderColor: #8f9cb2;
  --formFieldRadioSelectedBorderColor: #6d7e94;
  --formButtonBackground: #0a2540;
}

/* Focus glow effect */
.GraphicFormFieldInput--focused {
  box-shadow: 0 0 0 1px rgba(50, 151, 211, 0.3),
              0 1px 1px 0 rgba(0, 0, 0, 0.07),
              0 0 0 4px rgba(50, 151, 211, 0.3);
}
```

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-16 | Initial reference document created |
| 2026-03-17 | Added source code extraction: animation architecture (8 easing curves), keyframe animations (5 named), payment demo interaction patterns (4 flows), gradient definitions (5 types), micro-interaction timing catalog, scroll patterns, transition patterns, backdrop effects, transform catalog, clip-path techniques, JS patterns, complete design tokens |
