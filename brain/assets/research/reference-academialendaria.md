# Reference Analysis: Academia Lendária (academialendaria.ai)

Last updated: March 2026

---

## Overview

Academia Lendária is a Next.js-rendered educational platform focused on AI/generative intelligence training in Brazil. It presents itself as an "ecosystem and movement" rather than a course platform. The site is a strong premium dark-mode reference with exceptional animation polish, CSS module architecture, and a clear visual system based on black backgrounds, white typography, and a gold/amber accent (#ffd44a).

---

## Layout and Structure

### Page Section Order (top to bottom)

1. Sticky navigation header
2. Hero section (full-bleed image with dark overlay, rounded card style)
3. Trust logo marquee bar (partner companies)
4. Philosophy section — "Mais que Educação, Um Movimento" (intro/quem somos)
5. Programs section (2-column card grid)
6. Success cases section
7. Silicon Valley event section
8. Community member circle (rotating orbit animation)
9. Founder profile section (3-column grid)
10. Newsletter/lead capture section (video background)
11. Footer (multi-column links)

### Max Content Width

All containers use `max-width: 1280px` with `margin: 0 auto` and `padding: 0 24px`.

### Section Padding (vertical rhythm)

- Hero section: `padding: 42px 8px 0` (wrapper), with inner container at `height: 648px`
- Trust logos: `padding: 48px 0 64px`
- Philosophy/Intro section: `padding: 64px 0`
- Programs section: `padding: 128px 0 64px` (desktop), `64px 0` (tablet), `24px 0` (mobile)
- Founder section: `padding: 120px 0 64px` (desktop variable via CSS custom property)
- Ecosystem/Community: `padding: 64px 0`
- Newsletter: `padding: 64px 24px 120px`
- Section header `margin-bottom: 64px` before content grids

### Full-Width vs Contained

- Background always full-width `background-color: #000`
- Content constrained at 1280px
- Hero and Newsletter use an inner "card" container (rounded, 8px offset from viewport edges): `max-width: calc(100% - 16px)`, `border-radius: 16px`
- This creates a premium "floating card" effect for hero and newsletter sections

---

## Key UX Patterns

### 1. Auto-Scrolling Logo Marquee (TrustLogos)

**Implementation:** Pure CSS animation, no JavaScript.

```
Container: overflow: hidden, position: relative
Track: display: flex, gap: 80px (60px mobile), width: max-content
Animation: animation: 40s linear infinite marquee (keyframe: translate(0) to translate(-50%))
Hover: animation-play-state: paused
```

**Logo treatment:**
- `opacity: 0.5`
- `filter: grayscale() brightness(0) invert()` — logos rendered as white silhouettes
- On hover: `opacity: 1` (individual logo brightens)

**Fade edges:** Pseudo-elements `::before` and `::after` on the container create fade-out gradients:
- Left: `background: linear-gradient(90deg, #000 0%, transparent 100%)`, `width: 100px`
- Right: `background: linear-gradient(270deg, #000 0%, transparent 100%)`, `width: 100px`
- Mobile: width reduced to 50px

**Label above logos:** `font-size: 10px`, `letter-spacing: 0.1em`, `color: #ffffff3d`, `text-transform: uppercase`

**Logo duplication:** The track content is duplicated exactly once — when the animation reaches `-50%` translateX, it seamlessly loops. This is the standard infinite marquee technique.

**Companies shown:** Globo, RedBull, BTG, Amazon, Meta, Caixa, Banco do Brasil, AllFluence (8 logos × 2 duplicates = 16 items).

---

### 2. Program Cards (ProgramsSection)

**Grid layout:**
- Desktop: `grid-template-columns: repeat(2, 1fr)`, `gap: 64px`
- Mobile (≤768px): `grid-template-columns: 1fr`, `gap: 48px`

**Card structure:**
- No border, no background card box — the card is an open layout (no explicit card background)
- `background: #000` (inherits page background)
- `overflow: hidden`

**Card image:**
- Container: `aspect-ratio: 16/9`, `border-radius: 16px`, `width: 100%`
- Image: `object-fit: cover`
- On hover of sibling card: `filter: grayscale()` applied to non-hovered cards' images

**Card content (below image):**
- `margin-top: 32px`, flex column, `gap: 16px`
- Icon wrapper: 48×48px, `background: #ffffff0d`, `border-radius: 8px`

**Program title:**
- `font-size: 32px`, `font-weight: 600`, `letter-spacing: -0.01em`, `line-height: 1.2`
- Mobile: `font-size: 24px`
- On sibling hover: `color: #ffffff52` (dimmed)

**Description:**
- `font-size: 16px`, `font-weight: 600`, `line-height: 1.75`, `color: #b8b8b8`
- On sibling hover: `color: #ffffff52`

**CTA (Learn More button):**
- Borderless button with inline SVG arrow icon
- Icon: 32×32px square, `background: #ffd44a` (gold), `border-radius: 8px`, `padding: 8px`
- Label: `font-size: 16px`, `font-weight: 600`, `color: #fff`
- On hover: icon background changes to `#ffcc00`, arrow animates in a loop (translateX + translateY out, then back in)
- Animated underline: `::after` pseudo-element with animated gradient line (gold sweep from right to left)

**Group hover effect (premium detail):**
When any card is hovered, all other cards simultaneously scale down to `scale(0.98)` and dim. The hovered card lifts to `translateY(-4px) scale(1)`. This creates a spotlight-on-focused-card effect.

**Section entry animation:**
Container starts at `opacity: 0; transform: translateY(60px)`. When `.visible` class added (IntersectionObserver), transitions to `opacity: 1; transform: translateY(0)` with `transition: 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`.

---

### 3. Founder/Leader Section (FounderSection)

**Layout:** 3-column CSS grid on desktop.
- `grid-template-columns: repeat(3, minmax(0, 1fr))`, `gap: 60px`
- Column 1: Founder name + role + credential tags (flex column, `justify-content: space-between`)
- Column 2: Vertical video (9:16 aspect ratio)
- Column 3: Description card with animated border + media logo marquee

**Column 1 — Founder info:**
- Name: `font-size: 40px`, `font-weight: 600`, `letter-spacing: -0.02em`
- Role: `font-size: 14px`, `font-weight: 500`, `color: #b8b8b8`
- Tags list: each tag `font-size: 16px`, `font-weight: 500`, separated by `border-bottom: 1px solid #ffffff29`, `padding: 16px 0`

**Column 2 — Video:**
- `aspect-ratio: 9/16` (portrait/vertical video — mobile-style)
- `background: #161616`, `border-radius: 16px`
- Video element: `object-fit: cover`, `cursor: pointer`, fills 100% width and height

**Column 3 — Description card:**
- `border-radius: 16px`, `padding: 48px`
- Animated border: CSS `@property --border-angle-founder` with `conic-gradient` rotating from `#242424` through `#646464` at 80%–94% arc, creating a subtle sweeping highlight
- Animation: `6.4s linear infinite rotateBorderFounder`
- Background: `linear-gradient(#161616, #161616) padding-box` + conic-gradient `border-box`
- Description text: `font-size: 14px`, `line-height: 1.6`, `color: #b8b8b8`
- Highlighted text: `color: #fff`, `font-weight: 500`

**Media logo marquee (inside Column 3):**
- Same marquee pattern as trust logos but inside a card
- Animation: `40s linear infinite`
- Logos: G1, Exame, Estadão, Terra, Diário de Notícias, IstoÉ
- Logo height: 20px, `filter: grayscale() brightness(0) invert()`, `opacity: 0.4`
- Fade edges use `#161616` as the fade color (matches card background)
- Label above: `font-size: 10px`, `text-transform: uppercase`, `letter-spacing: 0.1em`, `color: #ffffff3d`

**Section entry animation:**
3D flip-in: starts at `translateY(150px) rotateX(15deg)` with `perspective: 1200px`, transitions to `translateY(0) rotateX(0)`. Very dramatic premium entrance.

**Responsive:**
- Tablet: 2-column grid, founder info spans full row
- Mobile: single column, video order 2, description order 3

---

### 4. Community Member Grid (EcosystemSection)

**Pattern:** NOT a standard grid — members orbit in a circle using CSS transforms.

**Container:** `width: 700px, height: 700px` (desktop), centered with `position: relative`

**Orbit mechanism:**
- Each photo positioned at center with `position: absolute; top: 50%; left: 50%`
- CSS custom property `--angle: calc(var(--index) * (360deg / 13))` distributes 13 members evenly
- Each photo rotates to its angle position, translates outward by `--radius: 320px`, then counter-rotates to stay upright
- Counter-rotation keyframe: the photo element rotates outward while the inner content rotates back
- Full orbit completes in `80s linear infinite`

**Photo styling:**
- 80×80px circles (`border-radius: 50%`)
- `border: 1px solid #242424`
- `background: #161616`
- On hover of the orbit container: all photos become `filter: grayscale()`
- On hover of individual photo (after animation complete): `transform: scale(1.16)`, `border: 1px solid #ffcc00!important`, grayscale removed

**Entry animation:**
Photos start `opacity: 0; filter: blur(20px); transform: scale(3)` then transition to `opacity: 1; filter: blur(0); transform: scale(1)` with staggered delays (0.1s to 0.8s per member).

**Center text:**
- `font-size: 28px`, `font-weight: 600`, `line-height: 1.2`
- Gray/white color split: "gray text" is `color: #b8b8b8`
- CTA button centered below the text in the circle

**Vertical scan lines (background decoration):**
- 17–20 thin `background: #ffffff14; width: 1px` lines spanning full section height
- Selected lines (3rd, 7th, 10th, 13th, 17th) have a `::after` pseudo-element that animates a bright streak from top to bottom
- Animation: `opacity: 0 → 1 → 0`, `top: -30% → 100%`, durations 7–10s, staggered delays

**Responsive:**
- Tablet: orbit radius `240px`, avatar size `60×60px`, container `540×540px`
- Mobile: orbit radius `160px`, avatar size `44×44px`, container `360×360px`

---

### 5. Newsletter / Lead Capture Section (NewsletterSection)

**Container approach:**
- Outer section: `background: #000`, `padding: 64px 24px 120px`
- Inner video container: `border: 1px solid #242424`, `border-radius: 16px`, `max-width: 1232px`, `min-height: 500px`
- Video background: `object-fit: cover`, `filter: grayscale()` — a grayscale video fills the background

**Overlay gradient:**
`background: linear-gradient(#16161600 0%, #1616164d 8%, #16161699 16%, #161616cc 24%, #161616f5 32% 96%, #161616 100%)`
This creates a top-transparent to bottom-opaque fade so the video shows at top but is mostly covered at bottom where the form lives.

**Content layout:** Centered, max-width 720px
- Title: `font-size: 48px`, `font-weight: 600`, `line-height: 1.2`
- Description: `font-size: 18px`, `font-weight: 500`, `color: #ffffffcc`, `line-height: 1.4`

**Form structure:**
- `display: flex; flex-wrap: wrap; gap: 16px`
- Each input container: `flex: calc(50% - 8px)` — two inputs per row
- Button also: `flex: calc(50% - 8px)` — fills second row with a half-row input
- Fields: Nome, E-mail (required), WhatsApp (required)
- Button text: "Cadastrar"

**Input styling:**
- `background: #ffffff14`, `border: 1px solid #ffffff0a`, `border-radius: 8px`
- `padding: 20px`, `font-size: 16px`, `color: #fff`
- Backdrop-filter: `blur(8px) saturate(180%)`
- Focus: `border-color: #ffffff14` (subtle change)
- Floating label: absolute positioned, transitions from center to top-left corner on focus/filled

**Button:**
- `background: #ffd44a`, `border: 1px solid #ffd44a`, `border-radius: 8px`
- `color: #000`, `font-size: 16px`, `font-weight: 500`, `padding: 18px 24px`
- Hover: `background: #ffc107`, `border-color: #ffcc00`, `translateY(-4px)`
- Animated text: each letter has a staggered translateY-out effect on hover (text "slides up" revealing a duplicate below)

**Section entry animation:**
`opacity: 0; transform: translateY(60px)` → `opacity: 1; transform: translateY(0)`, transition `0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`, triggered by IntersectionObserver.

---

### 6. Sticky Navigation (Header)

**Dimensions and positioning:**
- `position: fixed; top: 0; left: 0; width: 100%`
- `padding: 4px 0`
- `z-index: 1000`

**Background:**
- Default: `background: #000000cc` (80% opaque black)
- With dropdown open: `background: #161616f2` (near-opaque dark gray)
- `border-bottom: 1px solid #ffffff0a` (very subtle separator)

**Blur effect:**
- `-webkit-backdrop-filter: blur(8px) saturate(180%)`
- `backdrop-filter: blur(8px) saturate(180%)`

**Container:**
- `max-width: 1280px`, `margin: 0 auto`, `padding: 0 24px`
- `display: flex; justify-content: space-between; align-items: center`

**Logo:**
- `width: 24px; height: 24px` (compact icon only, no wordmark in nav)

**Navigation links:**
- `display: flex; gap: 32px` (24px on tablet)
- `font-size: 12px; font-weight: 500; font-family: Inter`
- Default color: `#b8b8b8`
- Active/hover: `color: #fff; transition: color 0.8s`
- Links: Home, Programas, Eventos, Hubs, Parcerias, Conteúdos, Depoimentos

**Login CTA button (right side):**
- `border: 1px solid #ffffff14`, `border-radius: 200px` (pill)
- `background: transparent`, `padding: 8px 8px 8px 12px`
- `display: flex; gap: 4px; align-items: center`
- Text: `font-size: 12px; font-weight: 500; color: #fff`
- Hover: `background: #ffffff0a; border-color: #ffffff33`
- Contains text + icon (chevron/arrow, 14px)

**Transition:** `background: 0.3s; all: 0.8s`

**Dropdown mega-menu:**
- Animated height expansion: `max-height: 0 → 400px`, `opacity: 0 → 1`
- Transition: `max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)`, `opacity 0.4s`
- Items animate in with `translateY(20px) → translateY(0)` with staggered delays (0.3s, 0.35s, 0.4s, 0.45s)
- Dropdown link: `font-size: 24px; font-weight: 600; color: #b8b8b8`
- Hover: `color: #fff`
- Non-hovered siblings: `color: #323232` (dimmed — same group hover as program cards)

**Mobile hamburger:**
- 32×32px button with 2 lines (`width: 16px; height: 2px; background: #fff`)
- Lines animate with `cubic-bezier(0.4, 0, 0.2, 1)` to form X when menu opens
- Mobile menu: full-screen `position: fixed`, `background: #000000fa`, backdrop-filter blur

---

### 7. Hero Section

**Wrapper:** `background-color: #000`, `padding: 42px 8px 0`

**Inner container:**
- `border-radius: 16px`, `width: 1888px`, `max-width: calc(100% - 16px)`, `height: 648px`
- The `width: 1888px` with `max-width: calc(100% - 16px)` creates a "card with margin" effect

**Background:**
- Full-bleed image with `object-fit: cover`
- Dark overlay: `background: #24242466` (approximately 40% opacity dark overlay on top of image)

**Content (centered absolutely):**
- `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)`
- `text-align: center`

**Headline:**
- `font-size: 48px` desktop, `40px` tablet, `24px` mobile
- `font-weight: 600`, `line-height: 1.4em`
- Two-tone text: gray (`#b8b8b8`) and white (`#fff`)
- Hover effect: gray words turn white on hover of the title container

**Two CTA buttons side by side:**

Button 1 — "Explorar" (secondary/ghost):
- `background: #ffffff1f` (12% white glass)
- `border: 1px solid #ffffff14`
- `border-radius: 8px`, `padding: 19px 24px`
- `backdrop-filter: blur(24px) saturate(220%)`
- `color: #fff`, `font-size: 16px`, `font-weight: 500`
- Hover: `translateY(-4px)`, letters slide up with staggered delay animation
- SVG icon rotates `45deg` on hover

Button 2 — "Ver Programas" (primary/gold):
- `background: #ffd44a`, `border: 1px solid #ffd44a`
- `border-radius: 8px`, `padding: 18px 24px`
- `color: #000`, `font-size: 16px`, `font-weight: 500`
- Hover: `background: #ffc107`, `border-color: #ffcc00`, `translateY(-4px)`
- Letters slide animation with staggered delays (50ms increments up to 0.45s)

**Button gap:** `gap: 16px`, `margin-top: 40px`

---

### 8. CTA Distribution Map

| Location | CTA Text | Style | Type |
|---|---|---|---|
| Header (always visible) | "Login" | Ghost pill (border: #ffffff14) | Secondary |
| Hero | "Explorar" | Glassmorphism button | Secondary |
| Hero | "Ver Programas" | Gold fill (#ffd44a) | Primary |
| Programs card 1 | "Saiba Mais" | Text + animated gold arrow icon | Soft |
| Programs card 2 | "Lista de Espera" | Text + animated gold arrow icon | Soft |
| Programs card 3 | "Lista de Espera" | Text + animated gold arrow icon | Soft |
| Community circle | "Junte-se a nós" | Glassmorphism pill + gold arrow icon | Secondary |
| Event section | "Saiba Mais" | Context-dependent | Soft |
| Newsletter | "Cadastrar" | Gold fill (#ffd44a) | Primary |

**CTA density:** Approximately 9 CTAs across the page. Primary gold CTAs appear in Hero and Newsletter (top and bottom of page). Mid-page CTAs use subtler "learn more" soft style. The header Login CTA is always visible due to sticky nav.

**Primary color:** `#ffd44a` (gold/amber) used exclusively for primary CTAs.

---

## Visual Design System

### Color Palette

| Role | Hex | Usage |
|---|---|---|
| Page background | `#000000` | All section backgrounds |
| Surface / card background | `#161616` | Cards, description boxes, mobile menu |
| Surface 2 | `#242424` | Borders, icon backgrounds |
| Text primary | `#ffffff` | Headlines, active states |
| Text secondary | `#b8b8b8` | Body copy, nav links, roles |
| Text muted | `#ffffff52` | Dimmed states (hover sibling effect) |
| Text faint | `#ffffffb3` | Descriptions (70% opacity) |
| Text disabled label | `#ffffff3d` | Section labels, marquee labels |
| Accent primary | `#ffd44a` | All primary CTAs, borders, required fields |
| Accent hover | `#ffc107` / `#ffcc00` | CTA hover states |
| Border default | `#ffffff0a` | Subtle card borders |
| Border visible | `#242424` | More visible card borders |
| Dark overlay | `#24242466` | Hero image overlay |
| Glass background | `#ffffff14` | Input fields, glass buttons |
| Glass background faint | `#ffffff0d` | Very subtle glass surfaces |

### Typography

**Font family:** Inter, sans-serif (all weights)

**Size scale observed:**

| Element | Size | Weight | Line Height |
|---|---|---|---|
| Section title (large) | 64px | 600 | 1.1 |
| Hero headline | 48px desktop / 24px mobile | 600 | 1.4em |
| Founder name | 40px | 600 | — |
| Newsletter title | 48px | 600 | 1.2 |
| Program title | 32px | 600 | 1.2 |
| Dropdown links | 24px | 600 | — |
| Body / description | 16–18px | 400–600 | 1.6 |
| Description muted | 14px | 400–500 | 1.6 |
| Nav links | 12px | 500 | normal |
| Labels / caps | 10px | 500 | — |

**Letter spacing:**
- Large headlines: `-0.02em` to `-0.04em` (tight)
- Labels: `0.1em` (wide for uppercase labels)
- Buttons: `0` to `-0.01em`

**Gradient text effect (headline shimmer):**
```
background: linear-gradient(110deg, #fff 0% 40%, #b8b8b8 50%, #fff 60% 100%) 0 0/200% 100%
-webkit-background-clip: text
animation: 13s ease-in-out infinite shimmer
keyframe: background-position 200% → -200% → 200%
```

### Card Design System

**Standard card:**
- `background: #161616`, `border-radius: 16px`, `border: 1px solid #ffffff0a`
- Padding varies: 48px (info cards), 32px (compact)

**Animated border card (premium detail):**
Uses CSS `@property --border-angle` + `conic-gradient`:
```css
background: linear-gradient(#161616, #161616) padding-box,
  conic-gradient(from var(--border-angle),
    #242424 80%, #646464 86%, #646464 90%, #646464 94%, #242424)
  border-box;
border: 1px solid transparent;
animation: 6.4s linear infinite rotateBorder
```
This creates a slowly rotating highlight that sweeps around the card border.

**Glass cards:**
- `background: #ffffff14` (or `#ffffff0a`), `backdrop-filter: blur(16–20px) saturate(180%)`
- `border: 1px solid #ffffff0a` or `#ffffff1a`
- `border-radius: 8px–16px`

### Shadows and Glows

- Primary CTA hover shadow: `box-shadow: 0 10px 30px #ffd44a33` (gold glow)
- Hero button shadow: `box-shadow: 0 4px 24px #00000040`
- CTA wrapper hover: `box-shadow: 0 10px 30px #ffd44a33; transform: translateY(-4px)`
- No heavy drop shadows elsewhere — elevation is achieved through color/opacity contrast

### Image Treatment

- Program card images: `aspect-ratio: 16/9`, `border-radius: 16px`, `object-fit: cover`
- Founder video: `aspect-ratio: 9/16` (portrait), `border-radius: 16px`, `object-fit: cover`
- Community avatars: 80×80px circles (`border-radius: 50%`)
- Logo images: `filter: grayscale() brightness(0) invert()`, `opacity: 0.5`, `object-fit: contain`
- Newsletter background: video with `filter: grayscale()` and gradient overlay

### Gradient / Glow Details

- Background glow (some sections): `filter: blur(120px); opacity: 0.3; background: #63e6e2` — large teal circle (`600×400px`) positioned above center with `translateX(-50%)`. Creates ambient colored ceiling glow.
- Gradient text: `linear-gradient(#fff 0%, #ffffffb3 100%)` for large titles
- Logo fade gradients: `linear-gradient(90deg, #000 0%, transparent 100%)` on marquee edges

---

## What Makes It Feel Premium

### 1. The "Floating Card" Hero
The hero is not truly full-bleed — it has `8px` padding on sides and `42px` on top. This creates a "card floating inside the page" aesthetic that signals intentionality, like the design is refined rather than just filling space.

### 2. Group Hover Dimming
When hovering a program card, siblings dim and scale slightly (`scale: 0.98`). This focus mechanic communicates that each option deserves attention. It's used in both cards and dropdown nav links.

### 3. Animated Border Cards
The rotating conic-gradient border on the description card and intro section adds motion without being distracting. It creates a premium "alive" quality to static cards. Duration: 6.4s.

### 4. Letter-by-Letter Text Animation on CTAs
Button text characters have individual transition delays (50ms increments). On hover, text slides up revealing a duplicate set from below. This is a premium micro-interaction that most sites skip.

### 5. 3D Section Entrance
Sections enter with `translateY(150px) rotateX(15deg)` → `translateY(0) rotateX(0)` with `perspective: 1200px`. This creates a subtle page-flip 3D effect as sections scroll into view.

### 6. Orbiting Community Members
The circular orbit is dramatically more memorable than a typical grid. It visually communicates the word "ecosystem" and creates a sense of movement and community energy. 80-second orbit at smooth linear pace.

### 7. Shimmer Headline Animation
The section title uses a looping background-position shimmer creating a subtle light sweep across the text. Duration 13s, very slow and elegant. Not distracting but adds life.

### 8. Consistent Timing Curves
All transitions use `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (standard ease-out) or `cubic-bezier(0.4, 0, 0.2, 1)` (material design standard) consistently. This makes the entire site feel cohesive.

### 9. Typography Color Splitting
Headlines often split words between white and `#b8b8b8` gray. This creates visual weight hierarchy without needing different font sizes, and adds design intentionality to the copy layout.

### 10. Near-Zero-Color Design
The entire page is monochromatic black/white/gray with a single gold accent (`#ffd44a`). Every CTA, hover state, required field, and active element uses this exact gold. Color discipline creates premium feel.

---

## Technical Implementation Notes

### Framework
- Next.js with React Server Components (streaming HTML)
- CSS Modules (class names follow pattern: `ComponentName-module__hash__className`)
- Font optimization: WOFF2 served via Next.js font system

### CSS Architecture
- All styles in external chunks loaded as separate CSS files
- CSS custom properties (`@property`) used for animatable border angles
- `clamp()` used for fluid type: `font-size: clamp(32px, 5vw, 56px)`
- Extensive CSS-only animations — minimal JavaScript for animation triggers

### Animation Patterns
- IntersectionObserver adds `.visible` class to trigger CSS transitions (no GSAP or Framer Motion visible in static CSS)
- Entry animations: `opacity: 0 + transform` → `opacity: 1 + transform: none`
- All keyframe animations defined in CSS modules alongside component styles

### Responsive Breakpoints
- `max-width: 1024px` — tablet: layout changes (1 column grids, reduced padding)
- `max-width: 768px` — mobile: single column, reduced font sizes, touch targets enlarged

### Grid and Flexbox Usage
- `display: grid` for multi-column layouts (programs: 2-col, founder: 3-col)
- `display: flex` for single-axis layouts (nav, card content, form inputs)
- Form inputs use `flex: calc(50% - 8px)` to achieve 2-column form grid via flexbox (not CSS grid)

### Scroll Behavior
- No JavaScript-heavy scroll libraries visible
- CSS `position: fixed` for sticky header
- `overflow: hidden` on marquee containers prevents horizontal scroll

### JavaScript Interactivity
- GTM-TMZVDFS6 tag manager present
- Form submission likely handled by server action or API route
- `window.cfields` for UTM tracking in newsletter form
- Video play/pause for founder video (cursor: pointer on video element)

---

## Analysis Confidence Level

**High.** All data extracted directly from live production CSS module files and rendered HTML. Values are verbatim from source, not estimated. The only gaps are minor: exact video source URLs and UTM/tracking integration details (irrelevant to design replication).

---

## Key Takeaways for Design Agent

1. Use `calc(100% - 16px)` + `border-radius: 16px` for floating-card hero sections instead of true full-bleed
2. Implement marquee with pure CSS `transform: translateX(-50%)` loop — duplicate content once
3. Logo treatment: `filter: grayscale() brightness(0) invert()` + `opacity: 0.5` for trust logos
4. Group hover dimming on card grids: use CSS `:has()` selector to target siblings
5. Animated rotating border: `@property` + `conic-gradient` on `border-box`
6. All primary CTAs: `background: #ffd44a; color: #000; border-radius: 8px`
7. Section entrance: always `opacity: 0 + translateY(40-150px)` → visible state, triggered by IntersectionObserver
8. Typography uses Inter exclusively, tight letter-spacing on headlines (`-0.02em`)
9. Gold glow on CTA hover: `box-shadow: 0 10px 30px #ffd44a33`
10. Newsletter uses a video with `filter: grayscale()` + gradient overlay for premium background texture
