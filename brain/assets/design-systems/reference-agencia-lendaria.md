# Agencia Lendaria Design System Reference

Last updated: 2026-03-16

Extracted from agencialendaria.ai homepage. This is a **reference document** for studying how a Brazilian AI agency presents premium services in dark mode. Agencia Lendaria is a Framer-built agency portfolio; Reis IA is a high-ticket AI consultancy. Study the dark-mode craft, gold accent usage, and section rhythm -- not the Framer component patterns.

**Relevance to Reis IA:** This site operates in the same market vertical (AI services, Brazilian audience, premium dark mode). Its gold accent system and dark layering approach are directly comparable to Reis IA's brand identity. Pay attention to what works and what falls short.

---

## 1. Color System

### Core Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Background (primary) | `#080808` | rgb(8, 8, 8) | Main page background |
| Background (elevated-1) | `#0d0d0d` | rgb(13, 13, 13) | Subtle section differentiation |
| Background (elevated-2) | `#0f0f0f` | rgb(15, 15, 15) | Card backgrounds (alt) |
| Background (elevated-3) | `#131313` | rgb(19, 19, 19) | Card backgrounds |
| Background (surface) | `#141414` | rgb(20, 20, 20) | Cards, elevated surfaces |
| Background (surface-2) | `#171717` | rgb(23, 23, 23) | Interactive surface hover |
| Background (surface-3) | `#1d1d1d` | rgb(29, 29, 29) | Higher elevation surfaces |
| Background (surface-4) | `#232323` | rgb(35, 35, 35) | Highest elevation |

### Accent Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Gold (primary) | `#c3b68d` | rgb(195, 182, 141) | Accent, highlights, brand |
| Gold (15% opacity) | `rgba(195, 182, 141, 0.15)` | -- | Subtle gold tints |
| Gold (10% opacity) | `rgba(195, 182, 141, 0.10)` | -- | Background gold washes |
| Orange (accent) | `rgb(252, 150, 76)` | -- | Secondary warm accent, gradient endpoints |
| Blue (links) | `#0099ff` | -- | Hyperlinks only |

### White Overlay Scale

| Opacity | Value | Usage |
|---------|-------|-------|
| 10% | `rgba(255, 255, 255, 0.10)` | Borders, subtle dividers |
| 8% | `rgba(255, 255, 255, 0.08)` | Secondary borders |
| 5% | `rgba(255, 255, 255, 0.05)` | Card borders, faint dividers |
| 4% | `rgba(255, 255, 255, 0.04)` | Ghost borders, barely visible |

### Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| Primary text | `#ffffff` | Headlines, primary content |
| Secondary text | `#999999` | Body copy, descriptions, labels |
| Muted text | `rgba(255, 255, 255, 0.5)` | Captions, metadata (implied) |

### Shadow Colors

| Token | Value | Usage |
|-------|-------|-------|
| Card shadow | `0 2px 4px #081a2b73` | Subtle depth on buttons/cards |

**Analysis:** The dark background uses 8+ distinct near-black values (compared to Reis IA's simpler 3-tier system). This creates extremely subtle depth layering. The gold accent (`#c3b68d`) is warmer and more muted than typical gold -- closer to aged brass than bright gold. Reis IA's gold (`#C9A84C`) is more saturated and confident by comparison.

---

## 2. Typography System

### Font Families

| Priority | Font | Usage |
|----------|------|-------|
| Primary | Inter | All text content |
| Secondary | Satoshi | Alternative / accent text (likely brand elements) |
| Fallback | system-ui, sans-serif | System fallback |

### Font Weights Used

| Weight | Name | Usage |
|--------|------|-------|
| 300 | Light | Decorative, large display numbers |
| 400 | Regular | Body text |
| 500 | Medium | Headlines (H2, H3), buttons, labels |
| 600 | Semibold | Body text (their body is unusually heavy), emphasized content |
| 700 | Bold | Strong emphasis |
| 900 | Black | Display, impact elements |

### Type Scale

| Level | Desktop | Tablet | Mobile | Weight | Letter-spacing | Line-height |
|-------|---------|--------|--------|--------|----------------|-------------|
| H2 (Display) | 75px | 60px | 44px | 500 | -3px (-0.04em) | 1.2em |
| H3 | 35px | 35px | 30px | 500 | -1.2px (-0.034em) | 1.4em |
| Body | 14px | 14px | 14px | 600 | -0.5px (-0.036em) | 1.3em |

**Analysis:** The 75px display size is very large -- effective for dark backgrounds where you need visual weight. Notably, they use weight 500 (medium) for headlines instead of 600-700 which creates a more elegant, less aggressive feel. The body text at 14px/600 is unusual -- most sites use 16px/400. The tight 1.3em line-height on body copy gives a compressed, editorial feel. The aggressive negative letter-spacing (-3px at 75px) is characteristic of modern premium sites.

**Reis IA comparison:** Reis IA spec calls for 48-72px display at weight 700. Consider testing weight 500-600 for large display text to achieve a similar refinement.

---

## 3. Spacing System

### Padding Values (extracted)

| Token | Value | Usage |
|-------|-------|-------|
| xs | 20px | Nav padding, small containers |
| sm | 40px | Section horizontal padding, nav |
| md | 45px | Card internal padding |
| lg | 50px | Section padding (compact) |
| xl | 75px | Section vertical padding |
| 2xl | 80px | Section horizontal padding (desktop) |
| 3xl | 100px | Large section vertical spacing |
| 4xl | 120px | Major section breaks |
| 5xl | 160px | Hero-level spacing |
| 6xl | 200px | Footer top padding, maximum spacing |

### Gap Values

| Value | Context |
|-------|---------|
| 6px | Tight element grouping (button icon + text) |
| 8px | Small element groups |
| 10px | Compact lists |
| 15px | Medium element spacing |
| 20px | Card grid gap, standard spacing |
| 25px | Content group spacing |
| 26px | Specific card content gaps |
| 34px | Section sub-groups |
| 50px | Card internal content separation |
| 64px | Section content groups |
| 100px | Hero internal spacing |

### Container Widths

| Value | Usage |
|-------|-------|
| 1024px | Narrow content width |
| 1120px | Standard content width |
| 1200px | Wide content width |
| 1280px | Maximum content width |

**Analysis:** The site uses a wide range of spacing values without a strict mathematical scale (not 4px or 8px based). The container widths vary per section -- not a single max-width like most sites. Card padding at 45px is generous and creates breathing room. The 200px footer top padding creates dramatic emptiness.

---

## 4. Layout System

### Breakpoints

| Name | Query | Description |
|------|-------|-------------|
| Desktop | `min-width: 1200px` | Full layout |
| Tablet | `min-width: 810px` and `max-width: 1199px` | Two-column collapses |
| Mobile | `max-width: 809px` | Single column |

### Grid Configurations

```css
/* Card grid */
grid-template-columns: repeat(2, minmax(50px, 1fr));
gap: 20px;

/* Flexbox (primary layout method) */
display: flex;
flex-direction: column; /* default */
gap: [varies per section];
```

### Position System

| Element | Position | Z-index | Details |
|---------|----------|---------|---------|
| Navigation | fixed | 10 | Top of page, always visible |
| Content overlays | relative | 5-7 | Section stacking |
| Background effects | absolute | 0-2 | Glows, gradients behind content |
| Masking overlays | absolute | 0 | Gradient masks at section edges |

### Border Radius Scale

| Value | Usage |
|-------|-------|
| 10px | Cards, small containers |
| 15px | Medium containers, sections |
| 20px | Buttons, large cards |
| 32px | Pill shapes, large rounded containers |

**Analysis:** The site is primarily flexbox-based, not CSS Grid (typical of Framer). The 810px tablet breakpoint is unusual (most use 768px). The z-index hierarchy is clean and intentional -- navigation at 10, everything else below 8.

---

## 5. Gradient System

### Radial Gradients (Section Backgrounds)

The site's most distinctive visual feature is its use of radial gradients to create subtle light pools on dark backgrounds. These simulate ambient lighting and create depth without any actual imagery.

```css
/* Bottom-left light pool */
radial-gradient(35% 50% at 0% 100%, rgba(128,128,128,.15) 0%, rgb(8,8,8) 100%)

/* Bottom-left white pool */
radial-gradient(25% 25% at 0% 101.4%, rgba(255,255,255,.1) 0%, rgb(8,8,8) 100%)

/* Bottom-right white pool */
radial-gradient(35% 20% at 100% 100%, rgba(255,255,255,.1) 0%, rgb(8,8,8) 100%)

/* Top-right white pool */
radial-gradient(35% 20% at 100% 0%, rgba(255,255,255,.1) 0%, rgb(8,8,8) 100%)

/* Bottom-left wide pool */
radial-gradient(50% 25% at 0% 100%, rgba(255,255,255,.1) 0%, rgb(8,8,8) 100%)

/* Top-left wide pool */
radial-gradient(50% 25% at 0% 0%, rgba(255,255,255,.1) 0%, rgb(8,8,8) 100%)

/* Center ambient glow */
radial-gradient(50% 35% at 50% 50%, #ffffff0f, #c3b68d00)
```

**Pattern:** Each section gets a different gradient positioned at a corner or edge, creating directional light that breaks up the monotony of a dark page. The light source alternates position (bottom-left, then top-right, etc.) to create visual rhythm.

### Linear Gradients

```css
/* Button background */
linear-gradient(99deg, #36332f4d, #12110d99)

/* Horizontal dark overlay */
linear-gradient(274deg, rgba(0,0,0,.5) 25%, rgba(0,0,0,.9009) 62%, rgba(0,0,0,.5) 81%)

/* Vertical fade (section transitions) */
linear-gradient(180deg, rgba(0,0,0,.1) 0%, rgb(0,0,0) 49.52%, rgba(0,0,0,.1) 100%)

/* Complex vertical mask */
linear-gradient(0deg, rgba(0,0,0,0) 4%, rgba(0,0,0,.73) 24%, rgba(0,0,0,.7) 72%, rgba(0,0,0,.01643) 100%)
```

### Text Fill Gradient

```css
/* Warm glow text effect */
radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,.5) 0%, rgb(252,150,76) 50%, rgba(13,13,13,0) 100%)
```

**Reis IA application:** The radial gradient technique for section backgrounds is directly usable. Replace the gray/white light pools with very subtle gold-tinted pools: `radial-gradient(35% 50% at 0% 100%, rgba(201,168,76,0.05) 0%, #000000 100%)`. This would add warmth without visible color.

---

## 6. Effects and Treatments

### Backdrop Blur (Glassmorphism)

```css
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
```

Used on navigation and floating elements over background content.

### Element Blur (Background Effects)

```css
filter: blur(15px);  /* Medium glow */
filter: blur(30px);  /* Large ambient glow */
```

Used on absolutely-positioned background elements to create soft light effects.

### Masks (CSS Masks)

```css
/* Gradient fade masks */
-webkit-mask: linear-gradient(...) add;
mask: linear-gradient(...) add;

/* Animated GIF mask */
-webkit-mask: url(gifanimation.gif) alpha no-repeat center / contain add;

/* Radial fade mask */
-webkit-mask: radial-gradient(50% 50% at 50% 50%, #000000 0%, rgba(0,0,0,0) 100%) add;
```

The animated GIF mask is a notable technique -- using an animated GIF as a mask source creates organic, evolving visual effects without JavaScript.

### Blend Modes

```css
mix-blend-mode: color-burn; /* Used on inner glow details */
```

### Opacity Levels

| Value | Usage |
|-------|-------|
| 0.05 | Ghost elements, watermarks |
| 0.10 | Subtle background tints |
| 0.15 | Light pools in gradients |
| 0.75 | De-emphasized content |

---

## 7. Button Styles

### Primary Button

```css
background: linear-gradient(99deg, #36332f4d, #12110d99);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 20px;
padding: 6px 18px 6px 14px;
gap: 6px;
box-shadow: 0 2px 4px #081a2b73;
user-select: none;
cursor: pointer;
```

**Analysis:** The button uses a very subtle warm-tinted gradient (dark brown tones) rather than a solid background. The border is semi-transparent white at 10% -- enough to define the shape without looking heavy. The 20px border-radius creates a rounded pill shape. The asymmetric padding (14px left, 18px right) accounts for an icon on the left side.

**Reis IA comparison:** This approach is more understated than a gold CTA. Could work well for secondary/ghost buttons in the Reis IA system. The gradient technique (warm-tinted dark gradient) is worth exploring for card backgrounds.

---

## 8. Card Patterns

### Standard Card

```css
background: #141414;
border: 1px solid rgba(255, 255, 255, 0.05);
border-radius: 10px;
padding: 45px;
gap: 50px;
```

### Grid Layout

```css
display: grid;
grid-template-columns: repeat(2, minmax(50px, 1fr));
gap: 20px;
```

**Analysis:** Cards have generous internal padding (45px) and large content gaps (50px). The border is nearly invisible at 5% white opacity -- it's felt more than seen. The 10px border-radius is relatively tight for the card size, giving a more architectural feel than rounded cards (16-24px) typical of SaaS sites.

---

## 9. Section Structure and Rhythm

### Page Flow

1. **Navigation** -- Fixed, z-index 10, dark with blur
2. **Hero** -- Full viewport height (100vh), gap: 100px between elements, gradient overlay with mask fade at bottom
3. **Content Sections** -- Alternating gradient backgrounds (light pools from different corners), padding 50-80px vertical, max-width 1200-1280px
4. **Card Grid Section** -- 2-column grid, cards with generous padding
5. **Carousel/Scroll Section** -- Horizontal scroll, 878px height (desktop), 625px (mobile), gap: 20px
6. **Footer** -- 200px top padding, full-width, radial gradient background

### Section Transition Pattern

Sections transition via gradient masks at top/bottom edges. A `linear-gradient(180deg, transparent, black, transparent)` creates fade-in/fade-out between sections, eliminating hard edges.

### Scroll Behavior

```css
scroll-margin-top: 75px; /* desktop */
scroll-margin-top: 50px; /* mobile */
```

Sticky elements positioned at `top: 125px`.

---

## 10. Unique Signature Elements

### 1. Ambient Light Pool Backgrounds

The most distinctive visual treatment. Each section has a different radial gradient positioned at a corner, creating the illusion of off-screen light sources illuminating a dark room. This eliminates the "flat black wall" problem common in dark mode designs.

**How it works:** Radial gradients with 10-15% opacity white/gray centers, sized at 25-50% of the section width, positioned at 0%/100% corners. Each section alternates the light source position.

**Reis IA adaptation:** Directly applicable. Could introduce very subtle gold tinting to the light pools. The alternating corner pattern creates natural visual rhythm.

### 2. Animated GIF Masking

Using animated GIFs as CSS mask sources creates organic, evolving visual effects. The mask reveals content through the GIF's animation frames, producing fluid, non-repeating motion without JavaScript.

```css
-webkit-mask-image: url('animation.gif');
-webkit-mask-size: contain;
-webkit-mask-repeat: no-repeat;
-webkit-mask-position: center;
```

**Reis IA adaptation:** Could be used sparingly for hero section effects or loading states. The technique is distinctive but must be used with restraint to maintain the premium feel.

### 3. Multi-Layer Dark Depth

The site uses 8+ distinct near-black values to create physical depth perception. Rather than relying on shadows (which don't work well on dark backgrounds), it uses background color differentiation: darker = further back, lighter = closer to user.

**Reis IA adaptation:** Expand the current 3-tier background system (#000000, #0A0A0A, #141414) to 5 tiers for richer depth. Add #0D0D0D and #111111 as intermediate values.

### 4. Warm-Tinted Dark Gradients

Button and card backgrounds use dark gradients with a warm brown tint rather than neutral gray. This subtly references the gold accent without being overtly gold.

```css
linear-gradient(99deg, #36332f4d, #12110d99)
/* The #36332f and #12110d are dark warm browns, not neutral blacks */
```

**Reis IA adaptation:** Directly applicable. Using `linear-gradient(99deg, rgba(201,168,76,0.05), rgba(0,0,0,0.6))` on card backgrounds would add warmth.

---

## 11. Performance and Technical Notes

- **Built with Framer** -- all layout uses Framer's component system (class names like `.framer-xxxxx`)
- **will-change: transform** used extensively for GPU-accelerated animations
- **Pointer events carefully managed** -- decorative elements have `pointer-events: none`
- **Overflow hidden** used on sections to contain gradient and blur effects
- **-webkit-overflow-scrolling: touch** for smooth iOS scrolling on carousel

---

## 12. Critical Differences from Reis IA

| Aspect | Agencia Lendaria | Reis IA (target) |
|--------|-----------------|------------------|
| Gold tone | `#c3b68d` (muted, aged brass) | `#C9A84C` (saturated, confident) |
| Headline weight | 500 (medium) | 700 (bold) -- consider testing 600 |
| Body size | 14px at weight 600 | 16-18px at weight 400 -- more readable |
| Body line-height | 1.3em (tight) | 1.6-1.7 (generous) -- better for long-form |
| Background tiers | 8+ values | 3 core values -- consider expanding to 5 |
| Brand motifs | None (generic agency) | Hourglass + Chess (proprietary visual language) |
| Layout system | Flexbox only (Framer) | CSS Grid + Flexbox (Astro/Tailwind) |
| Tablet breakpoint | 810px | 768px |
| Max content width | 1280px | 1200px |
| Section padding | 50-200px (variable) | 80-120px (consistent) |
| CTA approach | Subtle gradient buttons | Gold accent CTAs (more visible) |

---

## 13. What to Adopt vs. Avoid

### Adopt (with adaptation)
- Radial gradient light pools for section backgrounds
- Multi-tier dark background system for depth
- Warm-tinted dark gradients on interactive surfaces
- Generous card padding (45px+)
- Gradient masks for section transitions
- Aggressive negative letter-spacing on display type

### Avoid
- 14px body text (too small for consultancy long-form content)
- Weight 600 on body text (reduces readability at length)
- 1.3em line height on paragraphs (too tight for reading)
- 8+ background tiers (excessive -- 5 is sufficient)
- Framer-specific CSS patterns (class naming, layout approach)
- The GIF mask technique at scale (performance concern, gimmicky if overused)
- Neutral gray gold (`#c3b68d`) -- Reis IA's gold should be more intentional
