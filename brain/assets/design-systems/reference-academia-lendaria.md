# Academia Lendaria Design System Reference

Last updated: 2026-03-17

Extracted from academialendaria.ai homepage. This is a **reference document** for studying dark-mode web design craft in the Brazilian AI education market -- not a template to copy. Academia Lendaria is an AI education ecosystem; Reis IA is a high-ticket AI consultancy. Adapt visual quality, dark theme execution, and Portuguese market patterns, not education/SaaS product patterns.

---

## 1. Color System

### Core Palette

| Token | Hex / Value | Usage |
|-------|-------------|-------|
| Background (primary) | `#000000` | Page background, hero background, all sections |
| Background (card surface) | `#111111` | Card backgrounds, elevated surfaces |
| Background (surface dark) | `#161616` | Card gradient start, content panels |
| Background (surface mid) | `#1a1a1a` | Card gradient midpoint |
| Background (surface elevated) | `#141414cc` | Glassmorphism stats overlays (80% opacity) |
| Foreground (primary) | `#ffffff` | Headlines, primary text, strong elements |
| Foreground (secondary) | `#ffffffb3` | Body copy, paragraph text (70% white) |
| Foreground (muted) | `#ffffff80` | Tertiary text, placeholders (50% white) |
| Foreground (faint) | `#ffffff3d` | Labels, micro-text (24% white) |
| Accent (gold primary) | `#ffd44a` | Primary CTA buttons, highlights, pricing emphasis |
| Accent (gold hover) | `#ffcc00` / `#fc0` | Button hover states, active gold |
| Accent (blue primary) | `#0055ff` / `#05f` | Links, secondary CTAs, hub buttons |
| Accent (blue hover) | `#0044cc` / `#04c` | Blue button hover states |
| Accent (green) | `#30d158` | Success states, positive indicators |
| Accent (red) | `#ff3b3b` | Error states, negative indicators, discount badges |
| Accent (purple) | `#5e5ce6` | Feature highlights, category badges |
| Border (primary) | `#242424` | Card borders, dividers, scrollbar thumb |
| Border (subtle) | `#ffffff1a` | Separator lines (10% white) |
| Border (faint) | `#ffffff14` | Glass card borders (8% white) |
| Border (ghost) | `#ffffff0d` | Ultra-subtle borders (5% white) |
| Overlay (dark) | `#24242466` | Hero image overlays (40% opacity) |
| Overlay (input bg) | `#ffffff0d` | Form input backgrounds |

### Gradient Definitions

| Name | CSS Value | Usage |
|------|-----------|-------|
| Gold accent | `linear-gradient(135deg, gold 0%, orange 100%)` | Feature highlights, premium elements |
| Card surface | `linear-gradient(45deg, #161616, #1a1a1a 50%, #161616)` | Card backgrounds (padding-box) |
| Card surface dark | `linear-gradient(45deg, #000, #0a0a0a 50%, #000)` | Visual card backgrounds |
| Rotating border | `conic-gradient(from var(--border-angle), #242424 80%, #646464 86%, #646464 90%, #646464 94%, #242424)` | Animated card borders |
| Text shimmer | `linear-gradient(110deg, #fff 0% 40%, #b8b8b8 50%, #fff 60% 100%)` | Headline shimmer animation |
| Marquee fade left | `linear-gradient(90deg, #000 0%, transparent 100%)` | Logo carousel edge fade |
| Marquee fade right | `linear-gradient(270deg, #000 0%, transparent 100%)` | Logo carousel edge fade |
| Hero overlay | `linear-gradient(to top, #000 0%, transparent 60%)` | Hero background image fade |

### Glass System

```css
--glass-bg: rgba(255, 255, 255, 0.08);       /* #ffffff14 */
--glass-border: rgba(255, 255, 255, 0.08);    /* #ffffff14 */
--glass-blur: blur(12px);
```

Glass cards use `backdrop-filter: blur(12px) saturate(180%)` with semi-transparent white backgrounds. This creates depth without losing the dark theme.

---

## 2. Typography System

### Font Family

```css
font-family: Inter, sans-serif;
```

Fallback fonts: Geist (loaded via @font-face with weight range 100-900) and Geist Mono for code/monospace. Inter is the primary visual font loaded via Google Fonts.

### Type Scale

| Level | Size | Weight | Line-Height | Letter-Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| Hero Display | `72px` | 800 | 1.1 | `-0.04em` | Hero section main headline |
| H1 | `clamp(40px, 5vw, 64px)` | 600 | 1.1 | `-0.02em` | Section titles |
| H2 | `clamp(32px, 4vw, 48px)` | 600 | 1.2 | `-0.02em` | Subsection titles |
| H3 | `24px-30px` | 600 | 1.2 | — | Card titles, feature headers |
| Stat Large | `40px` | 600 | 1.1 | — | Large metric numbers |
| Body Large | `18px` | 500 | 1.6 | — | Featured paragraphs, intros |
| Body | `16px` | 400-500 | 1.6 | — | Standard paragraph text |
| Button | `16px` | 600 | 1 | — | CTA buttons |
| Small | `13px` | 500 | 1.4 | — | Card meta, small buttons |
| Caption | `12px` | 500 | 1.4 | — | Labels, metadata |
| Micro | `10px` | 500 | 1 | `0.1em` | Trust section labels, fine print |

### Text Color Application

- Headlines: `#fff` (full white)
- Body copy: `#ffffffb3` (70% white) -- this is a key pattern: body text is never full white
- Strong within body: `#fff` with `font-weight: 600` -- creates emphasis within muted text
- Labels/micro: `#ffffff3d` (24% white) with uppercase and wide letter-spacing
- Links: inherit color, no decoration

### Font Smoothing

```css
-webkit-font-smoothing: antialiased;
```

---

## 3. Spacing System

### Section Padding

| Context | Desktop | Tablet (1024px) | Mobile (768px) |
|---------|---------|-----------------|----------------|
| Primary section | `100px 0` | `80px 0` | `64px 0` |
| Trust logos section | `48px 0 64px` | `48px 0 32px` | `48px 0 24px` |
| Intro section | `64px 0` | `64px 0` | `24px 0` |

### Container

```css
max-width: 1280px;
margin: 0 auto;
padding: 0 24px;
```

At tablet (1024px): `max-width: 100%; padding: 0 48px`
At mobile (768px): `max-width: 100%; padding: 0 24px`

### Internal Spacing

| Token | Value | Usage |
|-------|-------|-------|
| Card padding (lg) | `48px` | Content cards, feature panels |
| Card padding (md) | `40px` | Tablet card padding |
| Card padding (sm) | `32px 24px` | Mobile card padding |
| Stats card padding | `32px` | Overlay stats panels |
| Grid gap (lg) | `64px` | Content grid gaps |
| Grid gap (md) | `40px` | Tablet grid gaps |
| Grid gap (sm) | `24px` | Mobile grid gaps |
| Marquee gap | `80px` (desktop), `60px` (mobile) | Logo carousel spacing |
| Section title margin | `64px` bottom (desktop), `24px` (mobile) | Below section headings |
| Element gap | `32px` | Between card content blocks |
| Stat row spacing | `24px` gap + `24px` padding-bottom | Stats row internal |
| Button padding (primary) | `24px 48px` | Large CTA buttons |
| Button padding (standard) | `16px 24px` | Standard buttons |
| Button padding (small) | `12px` | Mobile/compact buttons |

### Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| Card (large) | `24px` | Feature cards, pricing panels |
| Card (medium) | `20px` | Glass cards, content panels |
| Card (standard) | `16px` | Hero containers, visual cards |
| Stats/input | `8px` | Stats cards, form inputs, standard buttons |
| Button (pill) | `100px` / `200px` | Pill-shaped CTAs |
| Scrollbar | `20px` | Custom scrollbar thumb |

---

## 4. Layout System

### Grid Configuration

**Desktop (1280px+ container)**:
- Primary content grid: `grid-template-columns: 1fr 1fr` (two equal columns)
- Card grids: 2-3 column layouts depending on content
- Gap: `64px` between columns

**Tablet (1024px)**:
- Grid collapses to single column: `grid-template-columns: 1fr`
- Gap reduces to `40px`
- Container full-width with `48px` side padding

**Mobile (768px)**:
- Single column, full width
- Gap: `24px`
- Container with `24px` side padding

### Hero Layout

```
+-------------------------------------------------+
| 8px padding all sides                           |
| +---------------------------------------------+ |
| | border-radius: 16px                         | |
| | min-height: 100vh (desktop) / 648px         | |
| | background-image with dark overlay          | |
| | Centered content with max-width constraint  | |
| +---------------------------------------------+ |
+-------------------------------------------------+
```

The hero uses an inset pattern: `padding: 8px 8px 0` on the outer wrapper, then a rounded container inside. This creates a subtle "framed" effect.

### Breakpoints

| Breakpoint | Target |
|------------|--------|
| `1024px` | Tablet -- grid collapse, reduced fonts, adjusted padding |
| `768px` | Mobile -- single column, compact spacing, mobile nav |

---

## 5. Animation and Transitions

### Keyframe Animations

**1. Text Shimmer** (signature effect)
```css
@keyframes shimmer {
  0%, 100% { background-position: 200% 0; }
  30% { background-position: -200% 0; }
}
/* Duration: 13s, ease-in-out, infinite */
/* Applied via background-clip: text on gradient text */
```

**2. 3D Entrance** (scroll-triggered)
```css
/* Initial state */
opacity: 0;
transform: translateY(150px) rotateX(15deg);
transform-origin: bottom;
transform-style: preserve-3d;
perspective: 1200px; /* on parent */

/* Visible state */
opacity: 1;
transform: translateY(0) rotateX(0);

/* Transition: 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) */
```

**3. Rotating Border** (conic gradient animation)
```css
@keyframes rotateBorder {
  to { --border-angle: 360deg; }
}
/* Duration: 6.4s, linear, infinite */
/* Requires @property --border-angle declaration */
```

**4. Logo Marquee** (infinite scroll)
```css
@keyframes marquee {
  0% { transform: translate(0); }
  100% { transform: translate(-50%); }
}
/* Duration: 40s, linear, infinite */
/* Pauses on hover */
```

**5. Hero Entrance** (slideUpHero)
```css
@keyframes slideUpHero {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**6. Pulse** (radial scale)
```css
@keyframes pulse {
  /* 2s infinite -- radial scale effect */
}
```

**7. Fade In Scale**
```css
@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
/* Duration: 0.6s, cubic-bezier timing */
```

### Transition Defaults

| Element | Duration | Easing | Properties |
|---------|----------|--------|------------|
| Buttons | `0.3s` | ease | all |
| Cards / hover | `0.3s` | ease | all |
| Logo items | `0.3s` | ease | opacity, filter |
| Hub buttons | `0.2s` | ease | all |
| Form focus | `0.3s` | ease | border-color, background |
| 3D entrance | `1.2s` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | opacity, transform |
| Menu items | `0.4s-0.8s` | cubic-bezier | transform, opacity (staggered) |

### Hover Effects

| Element | Effect |
|---------|--------|
| Primary CTA | `transform: translateY(-4px)` |
| Hub buttons | `transform: translateY(-2px)`, darken background |
| Logo items | Opacity `0.5` -> `1.0` |
| Marquee track | `animation-play-state: paused` |
| Cards | Subtle lift or border glow |

---

## 6. Component Patterns

### Buttons

**Primary CTA (Gold)**
```css
background: #ffd44a;
color: #504015;  /* dark gold text for contrast */
border-radius: 100px;  /* full pill shape */
padding: 24px 48px;
font-size: 16px;
font-weight: 600;
transition: all 0.3s;
/* Hover: translateY(-4px) */
```

**Secondary CTA (Transparent)**
```css
background: rgba(255, 255, 255, 0.12);  /* #ffffff1f */
color: #fff;
border-radius: 8px;
padding: 12px-20px vertical, 16px-40px horizontal;
transition: all 0.3s;
```

**Hub/Link Button (Blue)**
```css
background: #0066ff;
color: #fff;
border-radius: 8px;
padding: 16px 24px;
font-size: 16px;
font-weight: 600;
/* Hover: background #0052cc, translateY(-2px) */
```

### Cards

**Glass Card**
```css
background: rgba(255, 255, 255, 0.08);  /* var(--glass-bg) */
border: 1px solid rgba(255, 255, 255, 0.08);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border-radius: 20px;
```

**Animated Border Card** (signature component)
```css
/* Outer: transparent border with conic gradient */
background:
  linear-gradient(45deg, #161616, #1a1a1a 50%, #161616) padding-box,
  conic-gradient(from var(--border-angle), #242424 80%, #646464 86%, #646464 90%, #646464 94%, #242424) border-box;
border: 1px solid transparent;
border-radius: 16px;
padding: 48px;
/* Animation: rotateBorder 6.4s linear infinite */
```

**Stats Overlay Card**
```css
background: rgba(20, 20, 20, 0.8);  /* #141414cc */
backdrop-filter: blur(8px);
border: 1px solid #242424;
border-radius: 8px;
padding: 32px;
position: absolute;  /* positioned over visual content */
```

### Navigation

- Fixed positioning, `z-index: 1000`
- Backdrop blur on scroll
- `padding: 0 24px` horizontal
- Links: Home, Programas, Eventos, Hubs, Parcerias, Conteudos, Depoimentos
- Login button on right side
- Mobile: hamburger menu activates at `768px`

### Trust Logos (Marquee)

- Infinite horizontal scroll at `40s` duration
- Logos rendered in white via `filter: grayscale(100%) brightness(0) invert(1)`
- Base opacity `0.5`, hover `1.0`
- Edge fade via gradient pseudo-elements (100px wide, 50px on mobile)
- Uppercase label below: `font-size: 10px`, `letter-spacing: 0.1em`, `color: #ffffff3d`

### Form Elements

**Input Fields**
```css
background: rgba(255, 255, 255, 0.05);  /* #ffffff0d */
border: 1px solid rgba(255, 255, 255, 0.08);  /* #ffffff14 */
border-radius: 8px;
/* Focus: border-color #ffd44a (gold accent) */
/* Floating labels with scale transitions */
```

---

## 7. Effects and Visual Treatments

### Backdrop Filters

| Level | Value | Usage |
|-------|-------|-------|
| Light | `blur(8px)` | Stats overlay cards |
| Standard | `blur(12px) saturate(180%)` | Glass cards, nav |
| Heavy | `blur(20px)` | Full-screen overlays |
| Maximum | `blur(24px) saturate(220%)` | Special emphasis panels |

### Shadows

The site uses minimal box-shadows. Depth is primarily achieved through:
1. Background color layering (#000 -> #111 -> #161616 -> #1a1a1a)
2. Border treatments (subtle white-alpha borders)
3. Backdrop blur for floating elements
4. Gradient overlays for image treatments

### Scrollbar Customization

```css
scrollbar-width: thin;
scrollbar-color: #242424 #000;

::-webkit-scrollbar { width: 12px; }
::-webkit-scrollbar-track { background: #000; width: 4px; }
::-webkit-scrollbar-thumb {
  background-color: #242424;
  border: 4px solid #000;
  border-radius: 20px;
}
```

### Text Treatments

**Shimmer Text** (signature effect)
```css
background: linear-gradient(110deg, #fff 0% 40%, #b8b8b8 50%, #fff 60% 100%);
background-size: 200% 100%;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
animation: shimmer 13s ease-in-out infinite;
```

**3D Perspective Entrance**
```css
perspective: 1200px;  /* on parent */
transform-origin: bottom;
transform-style: preserve-3d;
/* Elements enter from below with rotateX tilt */
```

---

## 8. Responsive Strategy

### Desktop (1280px+)
- Full two-column grids
- Large type scale (64-72px headlines)
- `100px` section padding
- `48px` card padding
- `64px` grid gaps
- Full marquee width with `80px` logo gaps

### Tablet (max-width: 1024px)
- Single column layouts
- Reduced headlines (`48px`)
- `48px` horizontal container padding
- `40px` card padding, `40px` grid gaps
- Visual content adjusts to `min-height: 500px`

### Mobile (max-width: 768px)
- Fully stacked layout
- Headlines at `32px`
- `24px` container padding
- `24px 32px` card padding, `24px` grid gaps
- Stat numbers shrink (`40px` -> `20px`)
- Buttons compact (`12px` padding, `13px` font)
- Logo carousel gaps `60px`, logos `20px` height
- Marquee edge fades reduce to `50px`

---

## 9. Signature Elements -- What Makes This Site Distinctive

### 1. Rotating Conic Gradient Borders

The most distinctive visual element. Cards have animated borders created by layering:
- A solid dark gradient as the card background (via `padding-box`)
- A conic gradient rotating around the border (via `border-box`)
- The border itself is set to `transparent`, letting the conic gradient show through

The rotation uses CSS `@property` for the angle, animating over `6.4s`. This creates a premium, tech-forward feel without being flashy. The gradient shows a subtle bright spot that rotates around the card edge.

**Reis IA Adaptation:** This could work for the pricing cards or the "How It Works" process section. The gold accent (`#C9A84C`) could replace the gray gradient tones for a warmer, more branded feel.

### 2. 3D Perspective Scroll Entrance

Content sections enter the viewport with a combined `translateY(150px) + rotateX(15deg)` transform, creating a "cards flipping up from a table" effect. The perspective is set at `1200px` on the parent. The transition uses a refined easing curve (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`) over `1.2s`.

This is more sophisticated than standard fade-up animations. It adds depth and weight to sections as they appear.

**Reis IA Adaptation:** Use selectively (hero and one key section). Over-use would feel gimmicky. The slow `1.2s` timing contributes to premium feel -- do not speed it up.

### 3. Text Shimmer on Gradient Headlines

Headlines use a `background-clip: text` technique with a gradient that shifts from `#fff` to `#b8b8b8` and back. The gradient is `200%` wide and animates its position over `13s`. The slow speed is important -- it creates an almost imperceptible shimmer that draws the eye without being distracting.

**Reis IA Adaptation:** This could work on the hero headline. Use white-to-gray shimmer for general text, or white-to-gold for brand emphasis. Keep the long duration (10-15s) for subtlety.

### 4. Glassmorphism Stats Overlay

Stats cards sit absolutely positioned over visual content (globe image) with:
- Semi-transparent dark background (`#141414cc`)
- `backdrop-filter: blur(8px)`
- Subtle border (`#242424`)

This creates a layered, depth-rich composition where data floats over imagery.

**Reis IA Adaptation:** Could work for the case study stats blocks or the "Revenue-First Framework" visualization.

### 5. Monochrome Logo Parade with Hover Reveal

Trust logos are rendered entirely in white (via CSS filters: `grayscale() brightness(0) invert()`) at `50%` opacity. On hover, opacity goes to `100%`. The marquee pauses on hover. Edge fades use matching `#000` gradients.

**Reis IA Adaptation:** Direct fit for the social proof section. The monochrome treatment keeps logos from competing with brand colors.

---

## 10. Key Takeaways for Reis IA

### What to Adopt
1. **The layered dark color system** -- `#000` > `#0a0a0a` > `#111` > `#141414` > `#161616` > `#1a1a1a` creates depth without lightening the page
2. **70% white body text** (`#ffffffb3`) -- more readable than full white on black, reduces eye strain
3. **The animated border technique** -- rotating conic gradients are distinctive and technically impressive
4. **Slow, weighted animations** -- `1.2s` entrance, `13s` shimmer. Nothing fast or bouncy.
5. **Glass card system** -- `blur(12px) + saturate(180%)` for floating elements
6. **Pill-shaped CTAs** (`border-radius: 100px`) for primary actions
7. **`clamp()` typography** -- fluid type that scales properly without separate media queries
8. **Custom scrollbar** -- small detail that reinforces dark theme consistency

### What to Adapt Differently
1. **Accent color**: Replace `#ffd44a` gold with Reis IA's muted gold (`#C9A84C`). Their gold is bright/playful; ours should be warm/sophisticated.
2. **Blue accent**: Replace `#0055ff` with a more muted or neutral secondary. Reis IA does not need a blue system.
3. **Hero pattern**: Their inset-rounded-container hero is interesting but branded to them. Reis IA should use full-bleed sections.
4. **Font weights**: Their hero at `800` weight is bold for an education platform. Reis IA should cap at `700` for consultancy restraint.
5. **Type scale**: Their `72px` hero is appropriate. Consider `clamp(40px, 5vw, 72px)` for Reis IA hero headlines.
6. **Glass vs. solid**: Use glass effects more sparingly than they do. Reis IA should favor solid dark surfaces with selective glass accents.

### What to Avoid
1. Their `#05f` blue as an accent color -- not part of Reis IA brand
2. The education ecosystem messaging patterns (cohorts, waitlists)
3. Over-use of 3D perspective animations
4. The bright gold `#ffd44a` -- too saturated for Reis IA's premium positioning
5. The Geist font family -- stick with Inter exclusively

---

[ADDED -- 2026-03-17]

## Source Code Extraction Findings

Extracted from academialendaria.ai (Next.js RSC). Source file: `source-code-extractions/academialendaria-source.md`.

### A. Rotating Conic Gradient Border (Complete Implementation)

```css
/* Step 1: Register the custom property for animation */
@property --border-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

/* Step 2: Keyframes to rotate the angle */
@keyframes rotateBorder {
  to { --border-angle: 360deg; }
}

/* Step 3: The animated border card */
.animated-border-card {
  background:
    linear-gradient(45deg, #161616, #1a1a1a 50%, #161616) padding-box,
    conic-gradient(from var(--border-angle), #242424 80%, #646464 86%, #646464 90%, #646464 94%, #242424) border-box;
  border: 1px solid transparent;
  border-radius: 16px;
  padding: 48px;
  animation: rotateBorder 6.4s linear infinite;
}
```

**How it works:** The `padding-box` layer fills the card interior with a dark gradient. The `border-box` layer applies a conic gradient visible only in the 1px transparent border gap. The `@property` declaration enables smooth angle animation via CSS Houdini. Duration: **6.4s**, timing: **linear**, loop: **infinite**.

**Reis IA adaptation:**
```css
/* Replace #646464 with gold tones */
.reis-animated-border-card {
  background:
    linear-gradient(45deg, #0a0a0a, #111111 50%, #0a0a0a) padding-box,
    conic-gradient(from var(--border-angle), #242424 80%, #C9A84C 86%, #C9A84C 90%, #C9A84C 94%, #242424) border-box;
  border: 1px solid transparent;
  border-radius: 16px;
  padding: 48px;
  animation: rotateBorder 6.4s linear infinite;
}
```

### B. 3D Perspective Entrance (Complete Implementation)

```css
/* Parent element needs perspective */
.perspective-parent {
  perspective: 1200px;
}

/* Initial state (before scroll trigger) */
.perspective-entrance {
  opacity: 0;
  transform: translateY(150px) rotateX(15deg);
  transform-origin: bottom;
  transform-style: preserve-3d;
}

/* Visible state (after scroll trigger) */
.perspective-entrance.visible {
  opacity: 1;
  transform: translateY(0) rotateX(0);
  transition:
    opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

**Key values:**
- `perspective: 1200px` on parent
- `translateY(150px)` starting offset
- `rotateX(15deg)` tilt angle
- `transform-origin: bottom` pivot point
- `1.2s` duration with `cubic-bezier(0.25, 0.46, 0.45, 0.94)` easing

**Reis IA adaptation:** Use selectively on hero + 1 key section. Do NOT speed up -- the slow 1.2s timing is essential to premium feel.

### C. Glass Stats Overlay Card

```css
.glass-stats-card {
  background: rgba(20, 20, 20, 0.8);  /* #141414cc */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid #242424;
  border-radius: 8px;
  padding: 32px;
  position: absolute;  /* positioned over visual content */
}
```

**Context:** Stats cards float absolutely positioned over visual imagery (globe image), creating layered depth. Background at 80% opacity allows underlying content to subtly show through.

**Reis IA adaptation:** Use for case study metrics floating over visuals, or "Revenue-First Framework" visualization.

### D. Text Shimmer Effect (Complete)

```css
@keyframes shimmer {
  0%, 100% { background-position: 200% 0; }
  30% { background-position: -200% 0; }
}

.shimmer-text {
  background: linear-gradient(110deg, #fff 0% 40%, #b8b8b8 50%, #fff 60% 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 13s ease-in-out infinite;
}
```

**Key insight:** The 13s duration is intentional -- creates an almost imperceptible shimmer that draws the eye without being distracting. The gradient goes from white to #b8b8b8 (light gray) and back.

### E. Additional Animation Patterns Found

**Hero entrance:**
```css
@keyframes slideUpHero {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Fade in scale:**
```css
@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
/* Duration: 0.6s, cubic-bezier timing */
```

**Logo marquee:**
```css
@keyframes marquee {
  0% { transform: translate(0); }
  100% { transform: translate(-50%); }
}
/* Duration: 40s, linear, infinite. Pauses on hover: animation-play-state: paused */
```

### F. Monochrome Logo Parade Implementation

```css
.logo-item {
  filter: grayscale(100%) brightness(0) invert(1);
  opacity: 0.5;
  transition: opacity 0.3s ease, filter 0.3s ease;
}
.logo-item:hover {
  opacity: 1.0;
}

/* Edge fades */
.marquee::before {
  background: linear-gradient(90deg, #000 0%, transparent 100%);
  width: 100px;  /* 50px on mobile */
}
.marquee::after {
  background: linear-gradient(270deg, #000 0%, transparent 100%);
  width: 100px;
}

/* Trust label */
.trust-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ffffff3d;
}
```

### G. Backdrop Filter Scale

```css
/* Light */    backdrop-filter: blur(8px);
/* Standard */ backdrop-filter: blur(12px) saturate(180%);
/* Heavy */    backdrop-filter: blur(20px);
/* Maximum */  backdrop-filter: blur(24px) saturate(220%);
```

### H. Custom Scrollbar

```css
scrollbar-width: thin;
scrollbar-color: #242424 #000;

::-webkit-scrollbar { width: 12px; }
::-webkit-scrollbar-track { background: #000; width: 4px; }
::-webkit-scrollbar-thumb {
  background-color: #242424;
  border: 4px solid #000;
  border-radius: 20px;
}
```

### I. Site Architecture Details

- **Framework:** Next.js with React Server Components
- **Font system:** Geist (variable) + Geist Mono (variable) via Next.js font optimization; Inter as primary visual font
- **Deployment:** Vercel (`dpl=dpl_*` query params on assets)
- **Analytics:** Google Tag Manager (`GTM-TMZVDFS6`)
- **CRM:** ConvertKit for newsletter/lead capture with UTM parameter mapping
- **Domain:** academialendaria.ai (active); academialendaria.com redirects to /lander which returns 403

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-16 | Initial reference document created |
| 2026-03-17 | Appended source code extraction: rotating conic gradient border (6.4s, full @property + keyframe + card CSS), 3D perspective entrance (1.2s, rotateX 15deg, perspective 1200px), glass stats overlay card, text shimmer, hero/fadeInScale/marquee animations, monochrome logo parade, backdrop filter scale, custom scrollbar, site architecture details |
