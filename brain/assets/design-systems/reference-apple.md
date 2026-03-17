# Apple Design System Reference

Last updated: 2026-03-17

Extracted from apple.com homepage, /iphone, /macbook-air, and /apple-intelligence pages. This is a **reference document** for studying premium editorial web design -- not a template to copy. Apple is a consumer hardware brand; Reis IA is a high-ticket AI consultancy. Adapt visual restraint, typography mastery, and spatial elegance -- not product showcase patterns.

---

## 1. Color System

### Core Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Black | `#000000` | Primary background (dark sections), text on light |
| Near-black | `#1d1d1f` | Primary body text on light backgrounds |
| White | `#ffffff` | Primary background (light sections), text on dark |
| Off-white | `#f5f5f7` | Secondary background, alternating sections |
| Light gray | `#fbfbfd` | Tertiary background, subtle surface lift |
| Link blue | `#0071e3` | Primary interactive color, text links, CTAs |
| Link blue (hover) | `#0077ed` | Hover state for blue links |
| Dark blue | `#06c` | Alternate link blue (compact views) |

### Neutral Scale

| Token | Hex | Usage |
|-------|-----|-------|
| Text primary (light bg) | `#1d1d1f` | Headlines, body text |
| Text secondary | `#86868b` | Descriptions, supplementary copy |
| Text tertiary | `#6e6e73` | Captions, footnotes |
| Text quaternary | `#a1a1a6` | Disabled, placeholder |
| Text on dark | `#f5f5f7` | Body text on dark backgrounds |
| Text muted on dark | `#a1a1a6` | Secondary text on dark |
| Border light | `#d2d2d7` | Dividers, card borders on light bg |
| Border dark | `#424245` | Dividers on dark backgrounds |
| Border subtle | `#e8e8ed` | Very light borders, input borders |
| Separator | `rgba(0, 0, 0, 0.1)` | Hairline separators on light |
| Separator dark | `rgba(255, 255, 255, 0.15)` | Hairline separators on dark |

### Dark Theme Palette

| Token | Value | Usage |
|-------|-------|-------|
| Background (primary) | `#000000` | Page background, hero sections |
| Background (elevated) | `#1c1c1e` | Cards, elevated surfaces |
| Background (secondary) | `#2c2c2e` | Secondary cards, form fields |
| Background (tertiary) | `#3a3a3c` | Tertiary surfaces |
| Fill (primary) | `rgba(120, 120, 128, 0.36)` | Toggle fills, switches |
| Fill (secondary) | `rgba(120, 120, 128, 0.32)` | Secondary fills |

### Product Accent Colors (Seasonal)

| Purpose | Value | Notes |
|---------|-------|-------|
| iPhone 16 Pro Gold | `#c9a76c` | Titanium Desert color |
| iPhone Blue | `#2997ff` | Product feature highlight |
| Green (environmental) | `#30d158` | Sustainability content |
| Orange | `#ff9f0a` | Warnings, limited-time offers |
| Red | `#ff3b30` | Urgency, Product RED |
| Purple | `#bf5af2` | Entertainment, creativity |

### Gradient Definitions

```css
/* Hero fade overlay -- text readability on images */
background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);

/* Section transition -- light to dark */
background: linear-gradient(180deg, #fbfbfd 0%, #f5f5f7 100%);

/* Dark section depth */
background: linear-gradient(180deg, #000000 0%, #1d1d1f 100%);

/* Radial glow behind product images */
background: radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%);

/* iPhone product gradient shimmer */
background: linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.05) 50%, transparent 80%);
```

---

## 2. Typography System

### Font Family

```css
/* Apple's system font stack */
font-family: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;

/* Text-heavy content */
font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;

/* Fallback for non-Apple platforms */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Type Scale

| Level | Size (Desktop) | Size (Tablet) | Size (Mobile) | Weight | Line-Height | Letter-Spacing |
|-------|---------------|---------------|---------------|--------|-------------|----------------|
| Display (hero) | 96px | 80px | 48px | 700 | 1.0 (96px) | -0.015em |
| Display (secondary) | 80px | 64px | 40px | 700 | 1.0 | -0.015em |
| Headline 1 | 64px | 48px | 32px | 700 | 1.0625 (68px) | -0.009em |
| Headline 2 | 48px | 40px | 28px | 600 | 1.0833 (52px) | -0.003em |
| Headline 3 | 40px | 32px | 24px | 600 | 1.1 (44px) | 0 |
| Headline 4 | 32px | 28px | 21px | 600 | 1.125 (36px) | 0.004em |
| Headline 5 | 24px | 21px | 19px | 600 | 1.1667 (28px) | 0.007em |
| Eyebrow / Label | 24px | 21px | 19px | 600 | 1.1667 | 0.007em |
| Body (large) | 21px | 21px | 19px | 400 | 1.381 (29px) | 0.011em |
| Body | 17px | 17px | 17px | 400 | 1.4706 (25px) | -0.022em |
| Body (small) | 14px | 14px | 14px | 400 | 1.4286 (20px) | -0.016em |
| Caption | 12px | 12px | 12px | 400 | 1.3333 (16px) | -0.01em |
| Footnote | 12px | 12px | 12px | 400 | 1.3333 | 0 |
| CTA text | 21px | 19px | 17px | 400 | 1.381 | 0.011em |
| Nav item | 12px | 12px | 17px | 400 | 1.3333 | 0 |

### Weight System

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, descriptions, nav items |
| Medium | 500 | Links, emphasized body text |
| Semibold | 600 | H2-H5, eyebrows, subheadings, buttons |
| Bold | 700 | Display, H1, hero headlines |

### Typography Rules

1. **Headlines are extremely tight** -- line-height rarely exceeds 1.1 for display text
2. **Negative letter-spacing on large text** -- larger sizes get tighter tracking
3. **Positive letter-spacing on small text** -- 12-14px text gets slight positive tracking for readability
4. **No uppercase** except for very specific UI elements (nav badges, small labels)
5. **Text maxes out at ~680px width** for body copy (optimal reading line length)
6. **Headlines are always centered** on product pages
7. **Color changes with hierarchy** -- H1 is `#1d1d1f`, body is `#1d1d1f` or `#86868b`

---

## 3. Spacing System

### Base Unit

Apple uses an **8px base unit** with a 4px sub-grid for fine adjustments.

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| 4xs | 4px | Icon padding, inline spacing |
| 3xs | 8px | Tight element gaps, tag padding |
| 2xs | 12px | Small gaps, button side padding |
| xs | 16px | Default element spacing |
| sm | 20px | Section sub-spacing |
| md | 24px | Card padding, component gaps |
| lg | 32px | Content block gaps |
| xl | 40px | Section sub-sections |
| 2xl | 48px | Desktop content padding |
| 3xl | 64px | Major section breaks |
| 4xl | 80px | Section padding (mobile) |
| 5xl | 100px | Section padding (tablet) |
| 6xl | 120px | Section padding (desktop) |

### Section Padding (Vertical)

| Breakpoint | Top/Bottom Padding | Notes |
|------------|-------------------|-------|
| Mobile (< 735px) | 48px - 80px | Compact sections |
| Tablet (735px - 1068px) | 80px - 100px | Medium spacing |
| Desktop (> 1068px) | 100px - 120px | Generous breathing room |
| Hero sections | 140px - 200px | Extra vertical emphasis |

### Container Widths

| Breakpoint | Max Width | Side Padding |
|------------|-----------|--------------|
| Mobile | 100% | 20px |
| Compact (< 735px) | 100% | 22px |
| Tablet (735px - 1068px) | 692px | auto margins |
| Desktop (1069px - 1440px) | 980px | auto margins |
| Wide (> 1440px) | 980px | auto margins |
| Full-bleed sections | 100vw | 0 |

### Content Max-Widths

| Content Type | Max Width |
|-------------|-----------|
| Body copy paragraphs | 680px |
| Feature descriptions | 500px |
| Centered headlines | 780px |
| Card grids | 980px |
| Full-width imagery | 100vw |
| Navigation bar | 980px (content), 100% (bar) |

---

## 4. Layout System

### Grid

Apple does NOT use a traditional 12-column grid. Instead, it uses a **content-width centered layout** with flexible internal arrangements:

```
Section structure:
[Full-width background]
  [Centered container: max-width 980px]
    [Content blocks: flex/grid as needed]
```

### Common Layout Patterns

**1. Hero (Full-bleed)**
```
Width: 100vw
Content: centered, max-width 780px (text), 100% (image)
Text alignment: center
Image: below text or background
Vertical padding: 140-200px top, 80-120px bottom
```

**2. Two-up (Side by Side)**
```
Container: 980px
Columns: 2 equal (50/50) or weighted (40/60)
Gap: 12px-20px
Card min-height: 580px (desktop), 500px (tablet)
Card border-radius: 18px-28px
```

**3. Feature Section (Text + Image)**
```
Container: 980px
Text: centered, max-width 680px
Image: centered below text, max-width varies
Vertical padding: 100-120px
```

**4. Gallery / Carousel**
```
Width: 100vw (overflow hidden)
Item width: 280px-400px
Gap: 12px-20px
Scroll: horizontal, snap-to-item
Navigation: dots (pagination indicators)
```

### Breakpoints

| Name | Value | Description |
|------|-------|-------------|
| Compact | < 735px | Phone (portrait) |
| Medium | 735px - 1068px | Tablet / phone (landscape) |
| Large | > 1068px | Desktop |
| XL | > 1440px | Large desktop (no layout change, same max-width) |

Apple uses **3 breakpoints** with `@media only screen and (max-width: ...)` and `(min-width: ...)`.

---

## 5. Animation & Transitions

### Scroll-Triggered Animations

Apple's signature animation approach: elements animate INTO view as the user scrolls. This is their most distinctive web design characteristic.

**Entrance Pattern:**
```css
/* Initial state (before scroll trigger) */
opacity: 0;
transform: translateY(20px);

/* Animated state (after scroll trigger) */
opacity: 1;
transform: translateY(0);
transition: opacity 0.8s ease, transform 0.8s ease;
```

**Staggered Entrance:**
```css
/* Each child element delays slightly */
.item:nth-child(1) { transition-delay: 0s; }
.item:nth-child(2) { transition-delay: 0.1s; }
.item:nth-child(3) { transition-delay: 0.2s; }
.item:nth-child(4) { transition-delay: 0.3s; }
```

### Scroll-Linked Animations

Apple uses scroll position to drive animations (parallax, reveal, scale):

```css
/* Parallax: image moves slower than scroll */
transform: translateY(calc(var(--scroll-position) * 0.3));

/* Scale on scroll: product image grows */
transform: scale(calc(0.8 + var(--scroll-progress) * 0.2));

/* Opacity linked to scroll */
opacity: var(--scroll-progress);
```

### Hover Transitions

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Text links | color | 0.3s | ease |
| CTA buttons | background-color | 0.3s | ease |
| Cards | transform (scale) | 0.3s | ease |
| Nav items | opacity | 0.3s | ease |
| Images | transform (scale) | 0.4s | ease |

### Easing Functions

| Name | Value | Usage |
|------|-------|-------|
| Default ease | `ease` | Most transitions |
| Smooth out | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Standard ease-out |
| Apple ease | `cubic-bezier(0.42, 0, 0.58, 1)` | Scroll animations |
| Dramatic | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero entrances, large reveals |
| Spring-like | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy micro-interactions |

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| Instant | 0.1s | Hover color changes |
| Fast | 0.2s | Button state changes |
| Normal | 0.3s | Standard transitions |
| Moderate | 0.5s | Section reveals |
| Slow | 0.8s | Scroll-triggered entrances |
| Dramatic | 1.2s | Hero animations |
| Cinematic | 1.5s - 2s | Page-load hero sequences |

### Keyframe Animations

```css
/* Fade up -- most common entrance */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale reveal -- product images */
@keyframes scaleReveal {
  from {
    opacity: 0;
    transform: scale(0.94);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Fade in -- simple opacity */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide from left -- feature text */
@keyframes slideFromLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

---

## 6. Interactive Elements

### Buttons

**Primary CTA (Buy / Shop)**
```css
background-color: #0071e3;
color: #ffffff;
font-size: 17px;
font-weight: 400;
line-height: 1.17648;
letter-spacing: -0.022em;
padding: 8px 22px;
border-radius: 980px; /* Pill shape */
border: none;
cursor: pointer;
display: inline-block;
text-align: center;
white-space: nowrap;
min-width: 28px;
```

**Primary CTA Hover:**
```css
background-color: #0077ed;
```

**Secondary CTA (Learn more)**
```css
color: #0071e3;
font-size: 21px;
font-weight: 400;
line-height: 1.381;
letter-spacing: 0.011em;
background: none;
border: none;
cursor: pointer;
/* Followed by > arrow character */
```

**Secondary CTA Hover:**
```css
color: #0077ed;
text-decoration: underline;
```

**Film CTA (Watch the film)**
```css
color: #0071e3;
font-size: 17px;
/* Play icon before text */
```

**CTA Arrow Treatment:**
Apple uses a right-pointing arrow `>` character after "Learn more" links. On hover, the arrow moves right slightly:
```css
.cta-arrow {
  display: inline-block;
  transition: transform 0.3s ease;
}
.cta:hover .cta-arrow {
  transform: translateX(4px);
}
```

### Text Links

```css
color: #0071e3;
text-decoration: none;
font-weight: 400;
transition: color 0.3s ease;
```

```css
/* Hover */
color: #0077ed;
text-decoration: underline;
```

### Focus States

```css
outline: 4px solid rgba(0, 125, 250, 0.6);
outline-offset: 1px;
border-radius: inherit;
```

---

## 7. Effects System

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| None | `none` | Default -- Apple rarely uses shadows |
| Card subtle | `0 4px 16px rgba(0, 0, 0, 0.12)` | Elevated cards on light backgrounds |
| Card medium | `0 8px 36px rgba(0, 0, 0, 0.16)` | Floating product cards |
| Card heavy | `0 12px 48px rgba(0, 0, 0, 0.2)` | Modal overlays |
| Navigation | `0 1px 0 rgba(0, 0, 0, 0.1)` | Bottom border-like shadow on nav |

**Key insight: Apple almost never uses box-shadow on the homepage.** Depth is created through background color layering, not shadows.

### Backdrop / Glassmorphism

```css
/* Global navigation bar */
backdrop-filter: saturate(180%) blur(20px);
-webkit-backdrop-filter: saturate(180%) blur(20px);
background-color: rgba(255, 255, 255, 0.72); /* Light mode */
background-color: rgba(29, 29, 31, 0.72); /* Dark mode */
```

### Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| None | 0 | Full-bleed sections |
| Small | 4px | Tags, small badges |
| Medium | 8px | Input fields |
| Large | 12px | Small cards, thumbnails |
| XL | 18px | Standard cards, product tiles |
| 2XL | 28px | Large hero cards |
| Pill | 980px | Buttons, CTAs |
| Circle | 50% | Avatars, dot indicators |

### Border Treatments

```css
/* Light mode separator */
border-top: 1px solid #d2d2d7;

/* Dark mode separator */
border-top: 1px solid #424245;

/* Card border (subtle) */
border: 0.5px solid rgba(0, 0, 0, 0.08);

/* Card border (dark bg) */
border: 0.5px solid rgba(255, 255, 255, 0.08);
```

**Key insight: Apple uses 0.5px borders (hairline) on retina displays.** This is a signature Apple detail.

### Overlays

```css
/* Image overlay for text readability */
background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%);

/* Full dark overlay */
background-color: rgba(0, 0, 0, 0.48);

/* Light overlay (light mode modals) */
background-color: rgba(255, 255, 255, 0.72);
```

---

## 8. Component Patterns

### Navigation (Global Header)

```
Structure:
- Fixed to top, full width
- Height: 44px (desktop), 48px (mobile)
- Background: glassmorphism (backdrop-filter blur)
- z-index: 9997
- Content: Apple logo (left) | Nav links (center) | Search + Bag (right)
- Links: 12px, weight 400, #1d1d1f (light) / #f5f5f7 (dark)
- Divider: 1px solid bottom (hairline)
```

**Mobile navigation:**
- Hamburger icon (right side)
- Full-screen overlay menu
- Links expand vertically with animation
- 48px touch targets

### Hero Section

```
Pattern: Full-bleed, centered text, optional image below
- Background: image or solid color (100vw)
- Text container: centered, max-width 780px
- Headline: Display size (48-96px), weight 700, centered
- Subtitle: Body large (19-21px), weight 400, color #86868b, centered
- CTA row: flex, centered, gap 24px
  - "Learn more >" (text link, blue)
  - "Buy >" (pill button, blue bg)
- Product image: centered below, may overlap next section
- Padding: 140px top, 80px bottom (desktop)
```

### Product Card (Two-up Grid)

```
Structure:
- Width: calc(50% - 6px) on desktop, 100% on mobile
- Border-radius: 18px-28px
- Background: solid color or image
- Padding: 48px top (text area)
- Min-height: 580px
- Text: centered
  - Eyebrow: 24px, weight 600, color varies
  - Headline: 40-48px, weight 700
  - Subtitle: 17-21px, weight 400, color #86868b
  - CTA: "Learn more >" + "Buy >"
- Image: positioned bottom, centered
```

### Gallery / Carousel

```
Structure:
- Container: 100vw, overflow-x hidden
- Track: flex, gap 12px, scroll-snap-type: x mandatory
- Items: min-width 280px, scroll-snap-align: start
- Item border-radius: 12px-18px
- Navigation: dot indicators below
  - Active dot: 8px, filled
  - Inactive dot: 6px, border only
- Grab cursor on hover
```

### Footer

```
Structure:
- Background: #f5f5f7
- Padding: 20px top, 20px bottom
- Max-width: 980px (centered)
- Font-size: 12px, color #6e6e73, line-height 1.3333
- Sections:
  1. Footnotes (small legal text)
  2. Hairline separator
  3. Link columns (5-6 columns, flex wrap)
     - Column headers: 12px, weight 600, color #1d1d1f
     - Column links: 12px, weight 400, color #424245
  4. Hairline separator
  5. Bottom bar: "Copyright" (left) | "Privacy | Terms" (right)
```

### Section Transitions

Apple uses three methods for visual section transitions:

1. **Color change**: Section backgrounds alternate (#fff → #f5f5f7 → #fff → #000)
2. **Full-bleed image break**: A full-width image/video separates text sections
3. **Seamless gradient**: Linear gradient from one section bg to the next

---

## 9. Responsive Design

### Approach

Apple uses a **desktop-first** approach with `max-width` media queries scaling down:

```css
@media only screen and (max-width: 1068px) { /* Tablet */ }
@media only screen and (max-width: 734px) { /* Mobile */ }
```

### Responsive Typography Scaling

| Level | Desktop | Tablet | Mobile | Scale Factor |
|-------|---------|--------|--------|-------------|
| Display | 96px | 80px | 48px | 0.5x |
| H1 | 64px | 48px | 32px | 0.5x |
| H2 | 48px | 40px | 28px | 0.58x |
| H3 | 40px | 32px | 24px | 0.6x |
| Body large | 21px | 21px | 19px | 0.9x |
| Body | 17px | 17px | 17px | 1x |

### Responsive Layout Changes

| Component | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Two-up grid | 2 columns | 2 columns (tighter) | 1 column stacked |
| Product cards | 50% width | 50% width | 100% width |
| Gallery | Horizontal scroll | Horizontal scroll | Horizontal scroll |
| Nav | Full links | Hamburger | Hamburger |
| Section padding | 100-120px | 80-100px | 48-80px |
| Container | 980px | 692px | 100% - 44px |
| Hero headline | 96px | 80px | 48px |

### Touch Targets

- Minimum: 44px x 44px
- Nav items on mobile: full-width, 48px height
- Buttons: min-height 44px, min-width 88px

---

## 10. Signature Elements -- What Makes Apple Feel Like Apple

### 1. Radical Minimalism Through Whitespace

Apple's pages have an extraordinary amount of vertical whitespace. Sections breathe with 100-200px padding. Headlines float in space. There is zero visual clutter. The whitespace IS the design.

**Measurement:** Content typically occupies < 40% of the viewport at any given scroll position. The remaining 60%+ is breathing room.

### 2. Typography-Driven Design

The page is fundamentally built from two things: enormous headlines and full-bleed images. There are almost no icons, no decorative elements, no illustrative graphics, no badges, no trust indicators, no social proof widgets. The type IS the visual hierarchy.

**Key detail:** Apple uses SF Pro Display above ~20px and SF Pro Text below -- optimized for their respective size ranges. Headlines are very bold (700) with extremely tight line-heights (1.0-1.1), creating dense, impactful text blocks.

### 3. Scroll-Triggered Choreography

Every element on an Apple product page animates into view as you scroll. This creates a cinematic, editorial feeling -- like the page is being revealed to you in a curated sequence rather than simply loaded.

**Implementation:** IntersectionObserver or scroll-position-linked transforms. Elements start with `opacity: 0; transform: translateY(20px)` and transition to visible state. Staggered delays (100ms increments) create wave-like entrance effects.

### 4. Centered Everything

Almost all content on Apple product pages is center-aligned. Headlines centered. Body text centered. CTA buttons centered. This creates a calm, balanced visual rhythm and draws the eye down the center axis of the page.

### 5. The "Learn More / Buy" Dual CTA

Every product section has exactly two CTAs side by side: "Learn more >" (text link in blue) and "Buy >" (pill button in blue or text link). This is remarkably consistent and creates a rhythm the user learns to expect.

### 6. Hairline Precision

Apple uses 0.5px borders (hairlines visible on retina displays), rgba colors with very low opacity for separators, and pixel-perfect alignment. The precision is forensic. Nothing is approximate.

### 7. Glassmorphism Navigation

The fixed navigation bar uses `backdrop-filter: saturate(180%) blur(20px)` with a semi-transparent background. This is now widely copied but Apple pioneered it on the web. It creates depth without shadow.

### 8. Full-Bleed Product Photography

Product images extend to the edges of their containers or the viewport. They are never contained in bordered boxes. They sit directly on the background, creating an artifact-on-paper museum quality.

### 9. Background Color Sectioning

Instead of dividers or borders between sections, Apple changes the background color. Sections alternate between `#ffffff`, `#f5f5f7`, and `#000000`. This creates clear visual separation without any decorative elements.

### 10. Progressive Disclosure Through Scroll

Apple.com is essentially a vertical slideshow. Each section is designed to be a "slide" -- a self-contained visual moment. The scroll becomes a presentation tool, not just a navigation mechanism.

---

## 11. Anti-Patterns -- What Apple Does NOT Do

Understanding what Apple avoids is as important as what it uses:

1. **No gradients on buttons** -- buttons are flat solid colors
2. **No box-shadows on cards** (on homepage) -- depth via background color only
3. **No decorative borders** -- only hairline functional separators
4. **No icons in navigation** -- text only (except Apple logo)
5. **No social proof badges** -- no "trusted by X companies"
6. **No complex layouts** -- rarely more than 2 columns
7. **No hover scale effects on cards** -- images may scale slightly, cards do not lift
8. **No busy backgrounds** -- solid colors or photography only
9. **No testimonials or quotes** on product pages
10. **No numbered lists or bullet points** in hero content
11. **No gradient text** effects
12. **No floating action buttons** or sticky CTAs (except nav)

---

## Reis IA Adaptation Notes

### What to Adopt

1. **Extreme vertical whitespace** -- let sections breathe with 80-120px padding
2. **Typography-first hierarchy** -- rely on type scale and weight, not decoration
3. **Scroll-triggered entrances** -- fade-up animations as content enters viewport
4. **Background color sectioning** -- alternate between #000000 and #0A0A0A
5. **Centered text for hero sections** -- especially on service/pillar pages
6. **Hairline borders** -- 0.5px or 1px with very low opacity
7. **Pill-shaped CTA buttons** -- high border-radius for primary actions
8. **Glassmorphism navigation** -- backdrop-filter blur on fixed header
9. **Dual CTA pattern** -- "Learn more" + "Book call" side by side
10. **Progressive scroll reveal** -- each section as a self-contained moment

### What to Adapt Differently

1. **Dark mode default** (Apple is light-mode) -- invert the color hierarchy
2. **Add accent color** -- Apple is achromatic + blue links; Reis IA uses warm gold (#C9A84C)
3. **Add brand motifs** -- hourglass and chess icons (Apple has no decorative iconography)
4. **Add social proof** -- case studies and metrics (Apple doesn't need proof, Reis IA does)
5. **More aggressive CTAs** -- Apple sells products; Reis IA sells high-ticket services requiring urgency
6. **Left-aligned text for service descriptions** -- centered works for product showcases but service/strategy content reads better left-aligned
7. **Card-based layouts for pillars** -- Apple avoids cards; Reis IA needs them for ecosystem presentation

### What to Avoid

1. Do NOT replicate Apple's light-mode color scheme
2. Do NOT use SF Pro -- use Inter (the brand font)
3. Do NOT center ALL text -- use centered for headlines, left-aligned for body
4. Do NOT skip social proof -- the consultancy needs credibility signals
5. Do NOT use blue as accent -- use warm gold for brand differentiation

---

## [ADDED -- 2026-03-17] Source Code Extraction: Scroll Animation Architecture

### Scroll-Linked Image Sequence (Apple's Signature Technique)

Canvas-based frame-by-frame rendering driven by scroll position. Used on AirPods Pro, MacBook Pro, iPhone product pages.

#### HTML Structure
```html
<section class="scroll-sequence-section">
  <div class="scroll-sequence-sticky">
    <canvas id="hero-sequence"></canvas>
  </div>
</section>
```

#### CSS (Sticky + Scroll Room)
```css
.scroll-sequence-section {
  height: 500vh;  /* 5x viewport = long scroll range */
  position: relative;
}

.scroll-sequence-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#hero-sequence {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100vh;
  max-width: 100vw;
  will-change: contents;
}
```

#### JavaScript (Full-Page Version)
```javascript
const canvas = document.getElementById('hero-sequence');
const context = canvas.getContext('2d');
const frameCount = 148;

canvas.width = 1920;
canvas.height = 1080;

const currentFrame = (index) => {
  return `/media/sequence/large/${index.toString().padStart(4, '0')}.jpg`;
};

const images = [];
const preloadImages = () => {
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i + 1);
    images.push(img);
  }
};

const updateImage = (index) => {
  if (images[index] && images[index].complete) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[index], 0, 0);
  }
};

const handleScroll = () => {
  const html = document.documentElement;
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  requestAnimationFrame(() => updateImage(frameIndex));
};

preloadImages();
window.addEventListener('scroll', handleScroll, { passive: true });

images[0].onload = () => {
  context.drawImage(images[0], 0, 0);
};
```

#### JavaScript (Section-Scoped Advanced Version)
```javascript
class ScrollSequenceAnimation {
  constructor(canvas, section, frameCount, framePath) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.section = section;
    this.frameCount = frameCount;
    this.framePath = framePath;
    this.images = [];
    this.currentFrame = 0;
    this.isReady = false;
    this.init();
  }

  init() {
    this.canvas.width = 1920;
    this.canvas.height = 1080;

    let loaded = 0;
    for (let i = 0; i < this.frameCount; i++) {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded === this.frameCount) {
          this.isReady = true;
          this.render(0);
        }
      };
      img.src = this.framePath(i);
      this.images.push(img);
    }

    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
  }

  onScroll() {
    if (!this.isReady) return;
    const rect = this.section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -sectionTop / sectionHeight));
    const frameIndex = Math.round(progress * (this.frameCount - 1));

    if (frameIndex !== this.currentFrame) {
      this.currentFrame = frameIndex;
      requestAnimationFrame(() => this.render(frameIndex));
    }
  }

  render(frameIndex) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.images[frameIndex], 0, 0);
  }
}

// Usage
new ScrollSequenceAnimation(
  canvas, section, 148,
  (i) => `/media/sequence/${(i + 1).toString().padStart(4, '0')}.jpg`
);
```

### Sticky Section Scroll Pattern

#### CSS
```css
.sticky-section {
  height: 300vh;
  position: relative;
}

.sticky-content {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.sticky-content .text-block {
  opacity: 0;
  transform: translateY(40px);
  transition: none; /* Controlled by JS, not CSS transitions */
  will-change: opacity, transform;
}

.sticky-content .text-block.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.sticky-content .hero-image {
  transform: scale(1.2);
  will-change: transform;
  transition: none;
}
```

#### JavaScript (Scroll Progress Controller)
```javascript
class StickyScrollSection {
  constructor(element) {
    this.element = element;
    this.content = element.querySelector('.sticky-content');
    this.textBlocks = element.querySelectorAll('.text-block');
    this.heroImage = element.querySelector('.hero-image');
    this.bindScroll();
  }

  getScrollProgress() {
    const rect = this.element.getBoundingClientRect();
    const sectionTop = rect.top;
    const scrollableHeight = rect.height - window.innerHeight;
    return Math.max(0, Math.min(1, -sectionTop / scrollableHeight));
  }

  update() {
    const progress = this.getScrollProgress();

    this.textBlocks.forEach((block, index) => {
      const blockStart = index * 0.25;
      const blockEnd = blockStart + 0.2;
      const blockProgress = Math.max(0, Math.min(1,
        (progress - blockStart) / (blockEnd - blockStart)
      ));

      block.style.opacity = blockProgress;
      block.style.transform = `translateY(${40 * (1 - blockProgress)}px)`;
    });

    if (this.heroImage) {
      const scale = 1.2 - (0.2 * progress);
      this.heroImage.style.transform = `scale(${scale})`;
    }
  }

  bindScroll() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.update();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
}

document.querySelectorAll('.sticky-section').forEach(section => {
  new StickyScrollSection(section);
});
```

### Parallax Techniques

#### CSS-Only Parallax
```css
.parallax-container {
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.parallax-layer-back {
  transform: translateZ(-1px) scale(2);
}

.parallax-layer-front {
  transform: translateZ(0);
}
```

#### JavaScript Parallax (Apple-Style)
```javascript
class ParallaxElement {
  constructor(element, speed = 0.5) {
    this.element = element;
    this.speed = speed;
    this.offset = 0;
    this.element.style.willChange = 'transform';
    this.bindScroll();
  }

  update() {
    const rect = this.element.parentElement.getBoundingClientRect();
    const windowCenter = window.innerHeight / 2;
    const elementCenter = rect.top + rect.height / 2;
    const distanceFromCenter = elementCenter - windowCenter;
    this.offset = distanceFromCenter * this.speed * -1;
    this.element.style.transform = `translate3d(0, ${this.offset}px, 0)`;
  }

  bindScroll() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.update();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    this.update();
  }
}

// Usage with depth layers
new ParallaxElement(document.querySelector('.bg-image'), 0.3);
new ParallaxElement(document.querySelector('.mid-image'), 0.5);
new ParallaxElement(document.querySelector('.fg-text'), 0.8);
```

### Word-by-Word Text Reveal

#### Basic (IntersectionObserver-Triggered)
```javascript
class WordByWordReveal {
  constructor(element) {
    this.element = element;
    this.originalText = element.textContent;
    this.words = this.originalText.split(' ');

    element.innerHTML = this.words.map((word, i) =>
      `<span class="reveal-word" style="
        opacity: 0.15;
        transition: opacity 0.4s ease ${i * 0.05}s;
      ">${word}</span>`
    ).join(' ');

    this.spans = element.querySelectorAll('.reveal-word');
    this.setupObserver();
  }

  setupObserver() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.reveal();
          observer.unobserve(this.element);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(this.element);
  }

  reveal() {
    this.spans.forEach(span => {
      span.style.opacity = '1';
    });
  }
}
```

#### Progressive "Read Along" Effect (Scroll-Linked)
```javascript
class ScrollProgressReveal {
  constructor(element) {
    this.element = element;
    this.words = element.textContent.split(' ');

    element.innerHTML = this.words.map(word =>
      `<span class="progress-word" style="opacity: 0.15;">${word}</span>`
    ).join(' ');

    this.spans = [...element.querySelectorAll('.progress-word')];
    window.addEventListener('scroll', () => this.update(), { passive: true });
  }

  update() {
    const rect = this.element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const progress = 1 - (rect.top / (viewportHeight * 0.8));
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const visibleCount = Math.floor(clampedProgress * this.spans.length);

    this.spans.forEach((span, i) => {
      if (i < visibleCount) {
        span.style.opacity = '1';
      } else if (i === visibleCount) {
        const wordProgress = (clampedProgress * this.spans.length) % 1;
        span.style.opacity = `${0.15 + (wordProgress * 0.85)}`;
      } else {
        span.style.opacity = '0.15';
      }
    });
  }
}
```

### Section Crossfade (Sticky)

#### CSS
```css
.crossfade-section {
  height: 200vh;
  position: relative;
}

.crossfade-panel {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: opacity;
}

.crossfade-panel:nth-child(1) { z-index: 1; }
.crossfade-panel:nth-child(2) { z-index: 2; opacity: 0; }
```

#### JavaScript
```javascript
class CrossfadeSection {
  constructor(container) {
    this.container = container;
    this.panels = container.querySelectorAll('.crossfade-panel');

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => this.update());
    }, { passive: true });
  }

  update() {
    const rect = this.container.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1,
      -rect.top / (rect.height - window.innerHeight)
    ));

    if (this.panels[0]) this.panels[0].style.opacity = 1 - progress;
    if (this.panels[1]) this.panels[1].style.opacity = progress;
  }
}
```

### Zoom Scroll Effect

#### CSS
```css
.zoom-section {
  height: 300vh;
  position: relative;
}

.zoom-content {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoom-element {
  transform: scale(0.8);
  opacity: 0;
  border-radius: 24px;
  overflow: hidden;
  will-change: transform, opacity, border-radius;
}
```

#### JavaScript
```javascript
class ZoomScrollSection {
  constructor(container) {
    this.container = container;
    this.element = container.querySelector('.zoom-element');

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => this.update());
    }, { passive: true });
  }

  update() {
    const rect = this.container.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1,
      -rect.top / (rect.height - window.innerHeight)
    ));

    const scale = 0.8 + (0.2 * this.easeOutCubic(progress));
    const opacity = this.easeOutCubic(progress);
    const borderRadius = 24 * (1 - progress);

    this.element.style.transform = `scale(${scale})`;
    this.element.style.opacity = opacity;
    this.element.style.borderRadius = `${borderRadius}px`;
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
}
```

### Video Scroll Playback

```javascript
class ScrollVideo {
  constructor(video, section) {
    this.video = video;
    this.section = section;

    this.video.pause();
    this.video.preload = 'auto';

    this.video.addEventListener('loadedmetadata', () => {
      this.duration = this.video.duration;
      this.isReady = true;
    });

    window.addEventListener('scroll', () => {
      if (this.isReady) {
        requestAnimationFrame(() => this.update());
      }
    }, { passive: true });
  }

  update() {
    const rect = this.section.getBoundingClientRect();
    const sectionHeight = rect.height - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
    const targetTime = progress * this.duration;

    if (Math.abs(this.video.currentTime - targetTime) > 0.05) {
      this.video.currentTime = targetTime;
    }
  }
}
```

```html
<section class="video-scroll-section" style="height: 400vh;">
  <div style="position: sticky; top: 0; height: 100vh;">
    <video id="scroll-video" muted playsinline preload="auto"
      style="width: 100%; height: 100%; object-fit: cover;">
      <source src="/video/product-reveal.mp4" type="video/mp4">
    </video>
  </div>
</section>
```

### IntersectionObserver Patterns

#### Standard Reveal Observer (with Stagger)
```javascript
const createRevealObserver = (options = {}) => {
  const defaults = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px',
    once: true,
  };
  const config = { ...defaults, ...options };

  return new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          const children = entry.target.querySelectorAll('[data-reveal-child]');
          children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 100}ms`;
            child.classList.add('is-visible');
          });

          if (config.once) {
            observer.unobserve(entry.target);
          }
        } else if (!config.once) {
          entry.target.classList.remove('is-visible');
        }
      });
    },
    {
      threshold: config.threshold,
      rootMargin: config.rootMargin,
    }
  );
};

const observer = createRevealObserver();
document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

#### Corresponding CSS
```css
[data-reveal] {
  opacity: 0;
  transform: translateY(30px);
}

[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

[data-reveal-child] {
  opacity: 0;
  transform: translateY(20px);
}

[data-reveal-child].is-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### Frosted Glass Navigation (from Source)

```css
.globalnav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: 44px;
  background-color: rgba(22, 22, 23, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}

.globalnav-content {
  max-width: 980px;
  margin: 0 auto;
  padding: 0 22px;
}

.globalnav-link {
  font-size: 12px;
  letter-spacing: -0.01em;
  line-height: 44px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.globalnav-link:hover {
  color: #ffffff;
}
```

### Performance Optimization Patterns (from Source)

```css
/* GPU acceleration for animated elements */
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Contain paint for complex sections */
.paint-contained {
  contain: paint;
}

/* Reduce motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```javascript
// Passive scroll listeners (Apple always uses passive: true)
window.addEventListener('scroll', handler, { passive: true });

// requestAnimationFrame throttle pattern
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      // Do work here
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
```

### Scroll-Triggered Text Reveal CSS
```css
.scroll-reveal-text {
  opacity: 0;
  transform: translateY(20px);
  will-change: opacity, transform;
}

.scroll-reveal-text.is-revealed {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Staggered reveal for multiple lines */
.scroll-reveal-text:nth-child(1) { transition-delay: 0ms; }
.scroll-reveal-text:nth-child(2) { transition-delay: 100ms; }
.scroll-reveal-text:nth-child(3) { transition-delay: 200ms; }
.scroll-reveal-text:nth-child(4) { transition-delay: 300ms; }
```

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-16 | Initial reference document created |
| 2026-03-17 | Added source code extraction: scroll-linked image sequence (canvas + JS, full-page and section-scoped), sticky section scroll pattern (CSS + JS), parallax techniques (CSS-only and JS), word-by-word text reveal (basic and scroll-linked), section crossfade, zoom scroll, video scroll playback, IntersectionObserver patterns with stagger, frosted glass nav, performance optimization patterns, scroll-triggered text reveal CSS |
