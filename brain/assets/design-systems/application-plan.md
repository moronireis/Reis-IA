# Reis IA Design System -- Application Plan

Last updated: 2026-03-17

> **Owner**: designer-agent
> **Status**: Stage 3 -- Awaiting approval
> **Purpose**: Map every design system element to every page section

---

## Executive Summary

### Current State

The Reis IA website has 5 pages (index, builder, systems, agendar, aplicar), 1 layout (MainLayout), and approximately 15 custom components. The site was built on an older visual identity using **gold/amber (#C9A84C)** as the accent color with a warm dark aesthetic. It has basic scroll-reveal animations, counter animations, card hover effects, and a floating hero card pattern. The code uses inline styles extensively and relies on a Tailwind v4 setup with a limited CSS custom properties set.

### Target State

The approved design system introduces a complete visual overhaul centered on a **blue accent (#4A90FF)**, a rigorous 5-tier surface system (starting at #000000, not #080808), a full fluid typography scale using CSS custom properties, 4 signature elements (Sapphire Scanner, Cool Ambient Pools, H1-B Hourglass Watermarks, Surface Depth), 8 advanced effects, and a comprehensive motion library with 5 named easing curves and 7 duration tokens.

### Key Gaps

1. **Color system overhaul**: Gold accent (#C9A84C) must be replaced with Blue accent (#4A90FF) across all files. Surface values differ (current: #080808/#111113/#1c1c1e vs target: #000000/#0A0A0A/#111111/#161616/#1A1A1A).
2. **Missing CSS custom properties**: The global CSS lacks the design system's custom properties for typography, spacing, easing, duration, gradients, shadows, z-index, and containers.
3. **No signature elements**: None of the 4 signature elements exist in any page. Sapphire Scanner rotating border (blue version), Cool Ambient Pools, H1-B Hourglass watermarks, and Surface Depth layering are all absent.
4. **No advanced effects**: None of the 8 advanced effects (aurora bg, mesh gradient, text reveal, magnetic hover, staggered grid, counter animation with blue accent, parallax layers, section transitions) are implemented in their design-system-specified form.
5. **Typography not using design system variables**: All font sizes are inline `clamp()` values instead of referencing `var(--text-display)`, `var(--text-h1)`, etc.
6. **Button component uses gold**: All buttons (primary, hero, secondary, ghost) use gold accent; must switch to blue accent with white text.
7. **CTA routing**: All CTAs currently route correctly to `/agendar`, `/aplicar`, `/builder`, or `/systems`. No SaaS patterns detected. This is compliant.
8. **H1-B Hourglass watermarks**: The HourglassIcon component exists but is used functionally, never as a watermark at 3-4% opacity in section backgrounds.
9. **Accessibility gaps**: Missing `::selection` styling, missing skip-to-content link, some contrast ratios may fail with current text opacity values.

### Effort Estimate

- **P1 (Critical Foundation)**: ~3-4 days -- CSS custom properties, color migration, typography variables, button overhaul, signature elements
- **P2 (Full Compliance)**: ~2-3 days -- Advanced effects, animation map, component refinements, accessibility
- **P3 (Polish)**: ~1-2 days -- Fine-tuning, responsive audit, motion polish
- **Total estimate**: ~6-9 development days

---

## Page-by-Page Audit & Plan

### Page 1: Home (index.astro)

**Current state**: 9 sections (Hero, Logo Marquee, Manifesto, Ecosystem Pillars, Results/Stats, Community Avatars, Founder Story, Offer Paths, Newsletter, Footer CTA). Uses gold accent throughout, floating hero card pattern, scroll-reveal animations, counter animations, rotating gold border on founder photo.
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/pages/index.astro`

#### Section-by-section changes:

| Section | Current State | Target State | Priority | Changes Needed |
|---------|--------------|--------------|----------|----------------|
| Hero | Gold radial glow, gold badge, gold buttons, inline font sizes | Blue ambient glow (radial-gradient with #4A90FF at 6%), blue primary CTA, fluid type vars | P1 | Replace gold glow with `--gradient-blue-ambient`, swap Button variant colors to blue, use `var(--text-display)` for H1, use `var(--text-body-lg)` for subhead |
| Logo Marquee | Background #080808, text-only logos | Background `var(--surface-0)` (#000000), maintain grayscale treatment | P2 | Update background color to Surface-0, update edge fade gradients to use `var(--surface-0)` |
| Manifesto | Background #111113, inline typography | Background `var(--surface-1)` (#0A0A0A), design system typography vars, Cool Ambient Pool in bottom-right corner | P1 | Change bg to Surface-1, add ambient pool (blue radial, 4% opacity, bottom-right), use `var(--text-h2)` for headline |
| Ecosystem Pillars | Background #080808, gold card accents, gold icon hovers, 4-column grid | Background Surface-0, blue accent borders/hovers, Sapphire Scanner on featured card (Builder or Systems), blue icon accents | P1 | Replace all `rgba(201,168,76,...)` with `rgba(74,144,255,...)`, add Sapphire Scanner rotating border to Builder card, blue card-cta-link underlines |
| Results/Stats | Background #111113, gold accent on StatBlock values, gold divider lines | Background Surface-1, blue accent on stat values, counter animation with blue color | P1 | Change StatBlock accent to blue, update gold gradient lines to blue gradient lines |
| Community Avatars | Background #080808, gold hover borders | Background Surface-0, blue hover borders on avatar circles | P2 | Replace `rgba(201,168,76,0.4)` hover with `rgba(74,144,255,0.3)` |
| Founder Story | Background #111113, gold rotating border on photo, gold credential badges | Background Surface-1, Sapphire Scanner (blue rotating border) on photo, blue credential badges, H1-B Hourglass watermark at 4% opacity in section background | P1 | Replace gold conic-gradient with blue conic-gradient, add hourglass SVG watermark (200px, 4% opacity) positioned bottom-right of section |
| Offer Paths | Background #080808, gold gradient headers, gold bottom borders | Background Surface-0, blue gradient headers, blue bottom borders (border-accent), mesh gradient background on one card | P2 | Replace gold gradients with blue gradients, use `--border-accent` for bottom borders |
| Highlight Banner | Gold-tinted background, gold badge/CTA | Blue-tinted background, blue badge/CTA | P1 | Full color swap on HighlightBanner component |
| Newsletter | Gold glow background, gold submit button | Blue ambient glow, blue submit button with white text | P1 | Replace gold submit styling with blue, update glow gradient |
| Footer CTA | Gold radial glow, gold gradient orb, gold CTA | Blue radial glow, blue gradient orb, blue hero CTA | P1 | Replace all gold refs with blue accent values |

#### Signature elements for this page:
- **Sapphire Scanner**: Ecosystem Pillars featured card (Builder card) -- rotating blue conic-gradient border, 8s rotation
- **Cool Ambient Pools**: Manifesto section (bottom-right), Footer CTA section (centered) -- `radial-gradient(circle, rgba(74,144,255,0.04-0.06), transparent)`, blur 60px, subtle float animation
- **Hourglass Watermark**: Founder Story section (bottom-right, 200px, 4% opacity), Results section (top-left, 120px, 3% opacity)
- **Surface Depth**: All sections alternate between Surface-0 and Surface-1 per design system rule

#### Advanced effects for this page:
- **Aurora Background**: Hero section -- 3 blurred blue orbs with slow drift animation (20s/25s/18s cycles)
- **Counter Animation**: Results/Stats section -- existing implementation, needs blue accent color
- **Staggered Grid**: Ecosystem Pillars 4-card grid -- cards enter with 80ms stagger delay on scroll
- **Section Transitions**: Gradient fade overlays between sections (Surface Fade gradient, 80px height)
- **Text Reveal**: Manifesto headline -- words fade from 20% to 100% opacity on scroll

#### Animations for this page:
- Hero entrance: Existing staggered fade-in (0.1s-0.7s delays), update easing to `var(--ease-out)` (cubic-bezier(0.16,1,0.3,1))
- Scroll reveal: Existing IntersectionObserver pattern, update duration to `var(--duration-moderate)` (500ms)
- Card hover: Update `cubic-bezier(0.34,1.56,0.64,1)` to `var(--ease-card)` (cubic-bezier(0.7,0,0,1)), lift to translateY(-3px)
- Counter animation: Existing, update easing to ease-out cubic, keep 1500ms duration
- Avatar stagger: Existing, update easing to `var(--ease-out)`
- Marquee: Existing 40s linear infinite, keep as-is (ambient motion)

---

### Page 2: Builder (builder.astro)

**Current state**: Long-form sales page with ~15 sections (Hero, Logo Marquee, Problem, Turning Point, Solution Reveal, 4 Pillars, Transformation Grid, Ideal Fit, Investment, Testimonials, About Moroni, Urgency CTA, FAQ, Final CTA). Uses gold accent, extensive inline styles.
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/pages/builder.astro`

#### Section-by-section changes:

| Section | Current State | Target State | Priority | Changes Needed |
|---------|--------------|--------------|----------|----------------|
| Hero | Gold glow, gold badge, gold buttons | Blue Aurora Background, blue CTAs | P1 | Aurora BG with 3 orbs, blue buttons |
| Logo Marquee | Same as Home | Same as Home (shared component) | P2 | Component-level fix propagates |
| Problem/Agitation | Gold chess icon, gold accents | Blue chess icon accent, blue accent text | P1 | Color swap on all gold refs |
| Turning Point | Gold styled strong text | Blue accent strong text | P2 | Change inline color refs |
| Solution Reveal | Gold badge, gold icon backgrounds | Blue badge, blue icon backgrounds | P1 | Color swap |
| 4 Pillars | Gold card accents, gold icons | Blue card accents, Sapphire Scanner on primary pillar card, Cool Ambient Pool | P1 | Color swap, add rotating border to key card |
| Transformation Grid | Gold check icons, gold accents | Blue check icons, blue accents, staggered grid entrance | P1 | Color swap, add stagger animation |
| Ideal Fit / Not For | Gold accent dashes | Blue accent dashes | P2 | Color swap |
| Investment | Gold border-bottom, gold pricing text | Blue accent borders, blue pricing emphasis | P1 | Color swap, ensure no SaaS pricing table patterns |
| Testimonials | Gold left border | Blue left border (border-accent) | P2 | Update TestimonialBlock component |
| About Moroni | Gold rotating border, gold credentials | Blue Sapphire Scanner border, blue credentials | P1 | Update rotating border colors |
| Urgency CTA | Gold glow, gold CTA | Blue ambient glow, blue CTA | P1 | Color swap |
| FAQ | Gold chevron accent | Blue chevron accent on FaqAccordion | P2 | Update FaqAccordion component |
| Final CTA | Gold radial, gold button | Blue radial, blue hero button | P1 | Color swap |

#### Signature elements for this page:
- **Sapphire Scanner**: Featured pillar card (Pillar 1: Posicione), Investment section card
- **Cool Ambient Pools**: Problem section (top-left), Solution Reveal section (bottom-right)
- **Hourglass Watermark**: Transformation Grid section (center, 300px, 3% opacity)
- **Surface Depth**: Full section alternation Surface-0/Surface-1

#### Advanced effects for this page:
- **Aurora Background**: Hero section
- **Staggered Grid**: Transformation Grid, 4 Pillars grid
- **Text Reveal**: Problem section opening statement
- **Parallax Layers**: Founder photo and credential badges
- **Section Transitions**: Between all major sections

#### Animations for this page:
- Same hero entrance pattern as Home
- Scroll reveals on all sections
- Card hover with `var(--ease-card)`
- FAQ accordion: update to `var(--ease-out)`, `var(--duration-normal)`

---

### Page 3: Systems (systems.astro)

**Current state**: Long-form sales page with ~14 sections (Hero, Logo Marquee, Problem, Revenue-First Framework, What We Build, Use Cases, Process, Investment, Guarantee, Testimonials, FAQ, Final CTA, Highlight Banner). Uses gold accent throughout.
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/pages/systems.astro`

#### Section-by-section changes:

| Section | Current State | Target State | Priority | Changes Needed |
|---------|--------------|--------------|----------|----------------|
| Hero | Gold glow, gold badge, hourglass icon in gold | Blue Aurora BG, blue badge, hourglass in blue | P1 | Full color swap, aurora effect |
| Logo Marquee | Same as Home | Same as Home | P2 | Component-level fix |
| Problem | Gold accents | Blue accents, text reveal on key statement | P1 | Color swap, text reveal effect |
| Revenue-First Framework | Gold numbered steps, gold borders | Blue numbered steps, blue borders, mesh gradient background | P1 | Color swap, add mesh gradient |
| What We Build | Gold icon backgrounds, gold card accents | Blue icon backgrounds, blue card accents, staggered grid | P1 | Color swap, stagger entrance |
| Use Cases | Gold check icons | Blue check icons | P2 | Color swap |
| Process (4-step) | Gold step numbers, gold connecting lines | Blue step numbers, blue connecting lines, counter animation on step numbers | P1 | Color swap, counter-style entrance |
| Investment/Pricing | Gold accent borders | Blue accent borders, no pricing table (must stay consultation-style) | P1 | Verify no SaaS patterns; color swap |
| Guarantee | Gold shield icon, gold border | Blue shield icon, blue border, Sapphire Scanner border | P1 | Color swap, add rotating border |
| Stats/Results | Gold stat values | Blue stat values, counter animation | P1 | Color swap |
| Testimonials | Gold left border | Blue left border | P2 | Component-level fix |
| FAQ | Gold chevron | Blue chevron | P2 | Component-level fix |
| Final CTA | Gold glow, gold button | Blue glow, blue button | P1 | Color swap |
| Highlight Banner | Gold | Blue | P1 | Component-level fix |

#### Signature elements for this page:
- **Sapphire Scanner**: Guarantee card, featured use case card
- **Cool Ambient Pools**: Problem section (top-left), Process section (center-bottom)
- **Hourglass Watermark**: What We Build section (bottom-right, 250px, 3% opacity) -- hourglass motif ties to the Systems "time savings" narrative
- **Surface Depth**: Full section alternation

#### Advanced effects for this page:
- **Aurora Background**: Hero section
- **Mesh Gradient**: Revenue-First Framework section background
- **Staggered Grid**: What We Build cards, Use Cases grid
- **Counter Animation**: Stats section, Process step numbers
- **Text Reveal**: Problem opening statement
- **Section Transitions**: Between all sections

#### Animations for this page:
- Hero entrance stagger
- Scroll reveals
- Card hover with `var(--ease-card)`
- FAQ accordion motion
- Counter animations (blue accent)

---

### Page 4: Agendar (agendar.astro)

**Current state**: Booking page with header and 2-column layout (what to expect + Cal.com placeholder). Uses gold accent. WhatsApp fallback CTA in green.
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/pages/agendar.astro`

#### Section-by-section changes:

| Section | Current State | Target State | Priority | Changes Needed |
|---------|--------------|--------------|----------|----------------|
| Page Header | Gold badge, gold radial glow, background #080808 | Blue badge, blue radial glow, background Surface-0 | P1 | Color swap |
| What to Expect | Gold icon backgrounds (rgba(201,168,76,...)), gold session badges | Blue icon backgrounds (rgba(74,144,255,...)), blue session badges | P1 | Color swap on all icon containers |
| Cal.com Embed | Gold dashed border placeholder | Blue dashed border placeholder (border-accent) | P2 | Update border colors |
| WhatsApp Fallback | Green (#25D366) CTA -- correct for WhatsApp brand | Keep green for WhatsApp (brand compliance) | -- | No change needed |
| Trust Signals | White/neutral badges | Keep neutral, add subtle blue border on hover | P3 | Minor refinement |

#### Signature elements for this page:
- **Sapphire Scanner**: Cal.com embed container -- rotating blue border signals premium/special
- **Cool Ambient Pools**: Page header area (subtle, top-center)
- **Hourglass Watermark**: Not needed on this page (keep focused)
- **Surface Depth**: Header on Surface-0, content continues on Surface-0 (single-bg page)

#### Advanced effects for this page:
- None required (conversion page -- keep minimal and fast-loading)

#### Animations for this page:
- Hero entrance stagger (existing, update easing)
- Scroll reveal on What to Expect items
- No advanced animations (speed and clarity prioritized)

---

### Page 5: Aplicar (aplicar.astro)

**Current state**: Application form page with 2-column layout (form + what happens next). Uses gold accent. Form uses glass-morphism inputs.
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/pages/aplicar.astro`

#### Section-by-section changes:

| Section | Current State | Target State | Priority | Changes Needed |
|---------|--------------|--------------|----------|----------------|
| Page Header | Gold badge, gold glow | Blue badge, blue glow | P1 | Color swap |
| Application Form | Gold submit button, gold focus borders on inputs, gold required asterisks | Blue submit button (white text), blue focus borders, blue required asterisks | P1 | Update `.glass-input:focus` border to `rgba(74,144,255,0.5)`, update submit button to `#4A90FF` bg with `#FFFFFF` text |
| Success Message | Gold-tinted background, gold checkmark, gold link | Blue-tinted background, blue checkmark, blue link | P1 | Color swap |
| What Happens Next | Gold chess icon, gold step numbers, gold trust badges | Blue chess icon, blue step numbers, blue trust section | P1 | Color swap |

#### Signature elements for this page:
- **Sapphire Scanner**: Not needed
- **Cool Ambient Pools**: Page header (subtle)
- **Hourglass Watermark**: Not needed
- **Surface Depth**: Surface-0 throughout

#### Advanced effects for this page:
- None (conversion page)

#### Animations for this page:
- Hero entrance stagger
- Scroll reveal on form and sidebar
- Form input focus transitions (update to `var(--ease-base)`, `var(--duration-fast)`)

---

## Shared Components Audit & Plan

### Layout: MainLayout.astro
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/layouts/MainLayout.astro`

| Issue | Current | Target | Priority |
|-------|---------|--------|----------|
| Body background | `#080808` | `var(--surface-0)` / `#000000` | P1 |
| Body text color | `rgba(255,255,255,0.75)` | `var(--text-secondary)` / `rgba(255,255,255,0.70)` | P1 |
| Missing skip-to-content | None | Add `<a href="#main-content" class="sr-only focus:not-sr-only">` | P2 |
| Missing `::selection` | None | Add `::selection { background: rgba(74,144,255,0.30); color: white; }` | P2 |
| Missing `text-rendering` | None | Add `text-rendering: optimizeLegibility;` | P3 |
| Missing `isolation: isolate` | None | Add to `<html>` | P3 |

### Component: Nav.astro
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/components/Nav.astro`

| Issue | Current | Target | Priority |
|-------|---------|--------|----------|
| Nav background | `rgba(8,8,8,0.75)` | `rgba(0,0,0,0.75)` (Surface-0 based) | P1 |
| CTA button color | `#C9A84C` (gold) | `#4A90FF` (blue), text white | P1 |
| CTA hover glow | Gold glow shadows | Blue glow: `0 0 16px rgba(74,144,255,0.25)` | P1 |
| Active page indicator | `border-accent` (gold) | `border-accent` (blue after CSS var update) | P1 |
| Scroll border | `rgba(255,255,255,0.08)` | Keep (matches `--border-default`) | -- |
| Mobile menu background | `rgba(8,8,8,0.97)` | `rgba(0,0,0,0.97)` | P2 |
| Mobile CTA | Gold | Blue | P1 |

### Component: Footer.astro
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/components/Footer.astro`

| Issue | Current | Target | Priority |
|-------|---------|--------|----------|
| Background | `#111113` | `var(--surface-1)` / `#0A0A0A` | P1 |
| Border top | `rgba(255,255,255,0.06)` | `var(--border-default)` / `rgba(255,255,255,0.08)` | P2 |
| Divider accent | Gold gradient | Blue gradient | P1 |

### Component: Button.astro
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/components/Button.astro`

| Issue | Current | Target | Priority |
|-------|---------|--------|----------|
| Primary bg | `#C9A84C` (gold) | `#4A90FF` (blue) | P1 |
| Primary text | `text-black` | `text-white` | P1 |
| Primary hover bg | `#D4B85E` | `#6AADFF` | P1 |
| Primary hover glow | Gold glow | `0 8px 24px rgba(74,144,255,0.3)` | P1 |
| Hero variant | Same as primary (gold) | Same as primary (blue), larger | P1 |
| Secondary border | `rgba(255,255,255,0.15)` | `var(--border-strong)` / `rgba(255,255,255,0.20)` | P2 |
| Ghost text | `rgba(255,255,255,0.5)` | `var(--text-tertiary)` | P2 |

### Component: Badge.astro
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/components/Badge.astro`

| Issue | Current | Target | Priority |
|-------|---------|--------|----------|
| Accent variant bg | `bg-accent/10` (gold) | `bg-accent/10` (blue after CSS var) | P1 |
| Accent variant border | `border-accent/20` (gold) | `border-accent/20` (blue after CSS var) | P1 |
| Accent variant text | `text-accent` (gold) | `text-accent` (blue after CSS var) | P1 |

### Component: SectionLabel.astro
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/components/SectionLabel.astro`

| Issue | Current | Target | Priority |
|-------|---------|--------|----------|
| Color | `rgba(255,255,255,0.4)` | `var(--accent-blue)` / `#4A90FF` (labels are blue in design system) | P1 |

### Component: StatBlock.astro
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/components/StatBlock.astro`

| Issue | Current | Target | Priority |
|-------|---------|--------|----------|
| Accent value color | `text-accent` (gold) | `text-accent` (blue after CSS var) | P1 |
| Gold divider line | `rgba(201,168,76,0.5)` | `rgba(74,144,255,0.5)` | P1 |
| Font weight 300 | Too thin | Update to 700 per design system counter spec | P2 |

### Component: HighlightBanner.astro
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/components/HighlightBanner.astro`

| Issue | Current | Target | Priority |
|-------|---------|--------|----------|
| Background gradient | Gold-warm tints (#0f0e0a) | Blue-cool tints (#0a0a10) | P1 |
| Border top/bottom | `rgba(201,168,76,0.15)` | `rgba(74,144,255,0.15)` | P1 |
| Badge color | `#C9A84C` | `#4A90FF` | P1 |
| CTA button | Gold bg, black text | Blue bg, white text | P1 |
| CTA hover | Gold hover | Blue hover with blue glow | P1 |
| Background glow | Gold radial | Blue radial | P1 |

### Component: TestimonialBlock.astro
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/components/TestimonialBlock.astro`

| Issue | Current | Target | Priority |
|-------|---------|--------|----------|
| Left border | `border-accent` (gold) | `border-accent` (blue after CSS var) | P1 |

### Component: FaqAccordion.tsx
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/components/FaqAccordion.tsx`

| Issue | Current | Target | Priority |
|-------|---------|--------|----------|
| Open chevron color | `var(--color-accent, #C9A84C)` | `var(--color-accent, #4A90FF)` | P1 |
| Easing curve | `cubic-bezier(0.16,1,0.3,1)` | Keep (matches `--ease-out`) | -- |

### Component: LogoMarquee.astro
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/components/LogoMarquee.astro`

| Issue | Current | Target | Priority |
|-------|---------|--------|----------|
| Edge fade color | `#080808` | `#000000` / `var(--surface-0)` | P1 |

### Components: HourglassIcon.astro & ChessKnightIcon.astro

| Issue | Current | Target | Priority |
|-------|---------|--------|----------|
| Usage as brand motifs | Used with gold accent color | Will automatically update when accent CSS var changes to blue | P1 (via CSS var) |
| Watermark usage | Not used as watermarks | Add watermark variant (large, 3-4% opacity, decorative) | P1 |

---

## Global CSS Overhaul (global.css)

**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/styles/global.css`

| Issue | Current | Target | Priority |
|-------|---------|--------|----------|
| Accent color | `--color-accent: #C9A84C` | `--color-accent: #4A90FF` | P1 |
| Accent hover | `--color-accent-hover: #D4B85E` | `--color-accent-hover: #6AADFF` | P1 |
| Accent muted | `--color-accent-muted: #A68B3C` | `--color-accent-muted: #3570CC` | P1 |
| Accent bright | `--color-accent-bright: #E4C46A` | `--color-accent-bright: #8DC4FF` | P1 |
| Surface-0 | `#080808` | `#000000` | P1 |
| Surface-1 | `#111113` | `#0A0A0A` | P1 |
| Surface-2 | `#1c1c1e` | `#111111` | P1 |
| Surface-3 | `#242427` | `#161616` | P1 |
| Missing Surface-4 | -- | Add `--color-surface-4: #1A1A1A` | P1 |
| Text Secondary | `0.75` | `0.70` | P1 |
| Text Tertiary | `0.45` | `0.50` | P1 |
| Text Quaternary | `0.25` | `0.35` | P1 |
| Missing Text Muted | -- | Add `--color-text-muted: rgba(255,255,255,0.20)` | P1 |
| Border Subtle | `0.06` | `0.05` | P2 |
| Border Default | `0.10` | `0.08` | P2 |
| Border Strong | `0.18` | `0.20` | P2 |
| Missing Border Accent | -- | Add `--color-border-accent: rgba(74,144,255,0.30)` | P1 |
| Missing typography vars | -- | Add all `--text-display` through `--text-label` CSS vars | P1 |
| Missing spacing vars | -- | Add `--space-xs` through `--space-4xl` | P1 |
| Missing easing vars | -- | Add `--ease-base`, `--ease-out`, `--ease-in`, `--ease-dramatic`, `--ease-card` | P1 |
| Missing duration vars | -- | Add `--duration-instant` through `--duration-ambient` | P1 |
| Missing shadow vars | -- | Add `--shadow-subtle` through `--shadow-blue-glow` | P2 |
| Missing container vars | -- | Add `--container-wide` through `--container-padding` | P2 |
| Missing z-index vars | -- | Add `--z-bg` through `--z-toast` | P2 |
| Missing gradient vars | -- | Add `--gradient-blue-ambient`, `--gradient-blue-sweep`, etc. | P1 |
| Card hover border | Gold `rgba(201,168,76,0.18)` | Blue `rgba(74,144,255,0.18)` | P1 |
| Card hover shadow | Gold `rgba(201,168,76,0.08)` | Blue `rgba(74,144,255,0.08)` | P1 |
| Gradient orb gold | `rgba(201,168,76,0.06)` | Remove or replace with blue version | P1 |
| Rotating border | Gold conic gradient | Blue conic gradient per design system | P1 |
| Founder photo border | Gold conic gradient | Blue conic gradient (Sapphire Scanner) | P1 |
| Accent glow utilities | Gold glow values | Blue glow values | P1 |
| Divider accent | Gold gradient | Blue gradient | P1 |
| Card CTA link | Gold gradient underline | Blue gradient underline | P1 |
| Glass input focus | Gold border `rgba(201,168,76,0.35)` | Blue border `rgba(74,144,255,0.50)` | P1 |
| Lead capture section | Gold-warm gradient (#0c0b09) | Blue-cool gradient or neutral (#050508) | P1 |
| Missing `::selection` | -- | Add `::selection { background: rgba(74,144,255,0.30); color: white; }` | P2 |
| Missing Sapphire Scanner class | -- | Add `.sapphire-scanner` rotating border class | P1 |
| Missing ambient pool classes | -- | Add `.ambient-pool` with float keyframes | P1 |
| Missing hourglass watermark class | -- | Add `.watermark-hourglass` at 3-4% opacity | P1 |

---

## New Components Needed

| Component | Description | Used On | Design System Ref | Priority |
|-----------|-------------|---------|-------------------|----------|
| SapphireScanner.astro | Card/container wrapper with rotating blue conic-gradient border | Home (featured card, founder photo), Builder (pillar card), Systems (guarantee card) | Section 9B (Signature Elements) | P1 |
| AmbientPool.astro | Positioned radial gradient blur circle with float animation | Multiple sections across all narrative pages | Section 9C (Signature Elements) | P1 |
| HourglassWatermark.astro | Large hourglass SVG rendered at 3-4% opacity as section background decoration | Home (Founder, Results), Builder (Transformation), Systems (What We Build) | Section 9D (Signature Elements) | P1 |
| AuroraBackground.astro | 3-orb slow-moving blurred background effect for hero sections | Home Hero, Builder Hero, Systems Hero | Section 8.1 (Effects Library) | P2 |
| MeshGradient.astro | Multi-point radial gradient background | Systems (Revenue-First Framework section) | Section 8.2 (Effects Library) | P2 |
| SectionTransition.astro | Gradient overlay div for smooth section-to-section fades | All pages between sections | Section 8.8 (Effects Library) | P3 |
| SkipToContent.astro | Accessibility skip link (sr-only, visible on focus) | MainLayout | Section 11 (Accessibility) | P2 |

---

## Signature Element Map

| Element | Home | Builder | Systems | Agendar | Aplicar |
|---------|------|---------|---------|---------|---------|
| Sapphire Scanner | Pillars featured card, Founder photo | Featured pillar card, Investment card | Guarantee card, Featured use case | Cal.com container | -- |
| Cool Ambient Pools | Manifesto (BR), Footer CTA (C) | Problem (TL), Solution (BR) | Problem (TL), Process (CB) | Header (TC) | Header (TC) |
| Hourglass Watermark | Founder (BR, 200px), Results (TL, 120px) | Transformation (C, 300px) | What We Build (BR, 250px) | -- | -- |
| Surface Depth | All sections alt S0/S1 | All sections alt S0/S1 | All sections alt S0/S1 | Single S0 | Single S0 |

*Key: TL=top-left, TR=top-right, BR=bottom-right, BL=bottom-left, C=center, TC=top-center, CB=center-bottom*

---

## Animation & Motion Map

### Easing Curves (from Design System Section 6)

| Curve Name | Value | Used For |
|------------|-------|----------|
| `--ease-base` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Default transitions (borders, colors, opacity) |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrance animations, scroll reveals, accordion open |
| `--ease-in` | `cubic-bezier(0.4, 0, 0.5, 1)` | Exit animations, element removal |
| `--ease-dramatic` | `cubic-bezier(0.65, 0, 0.35, 1)` | Page transitions, section entrances |
| `--ease-card` | `cubic-bezier(0.7, 0, 0, 1)` | Card hover lift, card entrance |

### Duration Tokens

| Token | Value | Used For |
|-------|-------|----------|
| `--duration-instant` | 100ms | Color/opacity micro-transitions |
| `--duration-fast` | 200ms | Button hover, link hover, focus rings |
| `--duration-normal` | 300ms | Card hover, border transitions |
| `--duration-moderate` | 500ms | Scroll reveal, section entrance |
| `--duration-slow` | 800ms | Text reveal, staggered entrance |
| `--duration-dramatic` | 1200ms | Page-level transitions, hero entrance |
| `--duration-ambient` | 13000ms | Continuous ambient effects, ambient float |

### Animation Application Map

| Animation | Pages | Sections | Easing | Duration |
|-----------|-------|----------|--------|----------|
| Hero stagger entrance | All 5 | Hero | `--ease-out` | 700ms, delays 100-700ms |
| Scroll reveal (fade up) | All 5 | All non-hero sections | `--ease-out` | `--duration-moderate` (500ms) |
| Card hover lift | Home, Builder, Systems | Card grids | `--ease-card` | `--duration-normal` (300ms) |
| Counter animation | Home, Systems | Stats sections | ease-out cubic | 1500ms |
| Sapphire Scanner rotation | Home, Builder, Systems | Featured cards | linear | 8s infinite |
| Ambient Pool float | Home, Builder, Systems | Various sections | ease-in-out | 10-15s infinite |
| Staggered grid entrance | Home, Builder, Systems | Card grids | `--ease-out` | 500ms, 80ms stagger |
| Avatar stagger | Home | Community | `--ease-out` | 500ms, 60ms stagger |
| Marquee scroll | Home, Builder, Systems | Logo marquee | linear | 40s infinite |
| FAQ accordion | Builder, Systems | FAQ sections | `--ease-out` | 350ms |
| Form input focus | Agendar, Aplicar | Form fields | `--ease-base` | `--duration-fast` (200ms) |

---

## Priority Matrix

### P1 -- High Impact, Must Have (Foundation + Signature Identity)

1. **Global CSS custom properties overhaul** -- Replace all color values, add all missing design system tokens (typography, spacing, easing, duration, gradients, shadows). This is the foundation everything else depends on.
2. **Accent color migration (gold to blue)** -- Every component, every inline style, every CSS class that references gold (#C9A84C, rgba(201,168,76,...)) must switch to blue (#4A90FF, rgba(74,144,255,...)).
3. **Surface values correction** -- Update Surface-0 from #080808 to #000000, Surface-1 from #111113 to #0A0A0A, etc.
4. **Text opacity scale correction** -- Update secondary from 0.75 to 0.70, tertiary from 0.45 to 0.50, quaternary from 0.25 to 0.35.
5. **Button component overhaul** -- Blue background, white text, blue glow hover.
6. **Sapphire Scanner implementation** -- Create rotating blue conic-gradient border component, apply to featured cards and founder photo.
7. **Cool Ambient Pools implementation** -- Create floating blue radial gradient component, place in key sections.
8. **H1-B Hourglass Watermark implementation** -- Create watermark component, place in narrative sections at 3-4% opacity.
9. **Nav and Footer color migration** -- Blue CTA, blue accents, correct surface values.

### P2 -- Important, Should Have (Full Compliance)

1. **Typography migration to CSS variables** -- Replace all inline `clamp()` values with `var(--text-display)`, `var(--text-h1)`, etc.
2. **Spacing migration to CSS variables** -- Replace hardcoded padding/margin values with `var(--space-*)` tokens.
3. **Advanced effects: Aurora Background** -- Add to hero sections for visual depth.
4. **Advanced effects: Staggered Grid** -- Enhance card grid entrances.
5. **Accessibility: Skip-to-content link** -- Add to MainLayout.
6. **Accessibility: ::selection styling** -- Blue selection highlight.
7. **Shadow system implementation** -- Apply design system shadow tokens.
8. **Border opacity corrections** -- Subtle 0.05, Default 0.08, Strong 0.20.
9. **SectionLabel component** -- Change from neutral text to blue accent text.
10. **Max 2 blue accent elements per viewport** -- Audit and enforce.

### P3 -- Nice to Have (Polish)

1. **Advanced effects: Mesh Gradient** -- Apply to select sections.
2. **Advanced effects: Text Reveal** -- Apply to manifesto/problem sections.
3. **Advanced effects: Parallax Layers** -- Subtle parallax on founder sections.
4. **Section Transitions** -- Gradient fade overlays between sections.
5. **Magnetic hover** -- On CTA buttons (subtle pull toward cursor).
6. **Responsive fine-tuning** -- Verify all mobile rules (max 2 surface tiers on mobile, simplified animations).
7. **Noise texture refinement** -- Verify grain overlay opacity and rendering.
8. **Container variable usage** -- Replace hardcoded `max-w-[1200px]` with `var(--container-standard)`.
9. **Z-index system** -- Replace hardcoded z-index values with CSS variable tokens.

---

## Implementation Order

### Phase 1: Foundation (Days 1-2)

1. **Create `src/styles/design-system.css`** with all CSS custom properties from the implementation guide. Import it in `global.css` or `MainLayout.astro` before all other styles.
2. **Update `global.css` @theme block** -- Replace all color values with design system values (blue accent, correct surfaces, correct text opacities).
3. **Update all gold-to-blue references in `global.css`** -- card-interactive hover, rotating borders, dividers, gradient orbs, glass input focus, accent glow utilities.
4. **Add new utility classes to `global.css`** -- `.sapphire-scanner`, `.ambient-pool`, `.watermark-hourglass`, `.bg-surface-*` with correct values.
5. **Update `Button.astro`** -- Blue bg, white text, blue glow.
6. **Update `Nav.astro`** -- Blue CTA, correct surface background.
7. **Update `Footer.astro`** -- Correct surface, blue divider.

### Phase 2: Signature Elements (Days 3-4)

8. **Create `SapphireScanner.astro` component** and apply to featured cards, founder photos, guarantee cards.
9. **Create `AmbientPool.astro` component** and place in designated sections across Home, Builder, Systems.
10. **Create `HourglassWatermark.astro` component** and place in Founder Story, Results, Transformation Grid, What We Build sections.
11. **Update all inline styles in page files** -- Replace hardcoded gold colors with blue, replace hardcoded backgrounds with surface vars.
12. **Update `Badge.astro`, `SectionLabel.astro`, `StatBlock.astro`, `HighlightBanner.astro`, `TestimonialBlock.astro`** -- All accent references auto-resolve via CSS var change, but verify and fix any hardcoded values.

### Phase 3: Effects & Motion (Days 5-6)

13. **Create `AuroraBackground.astro`** and add to all hero sections.
14. **Implement staggered grid entrances** on card grids across all three narrative pages.
15. **Update all animation easing values** to use CSS variable references.
16. **Update all animation durations** to use CSS variable references.
17. **Add section transition gradients** between sections.
18. **Implement text reveal effect** on manifesto/problem sections.

### Phase 4: Accessibility & Polish (Days 7-8)

19. **Add skip-to-content link** in MainLayout.
20. **Add `::selection` styling**.
21. **Run contrast ratio audit** on all text/surface combinations.
22. **Verify `prefers-reduced-motion`** covers all new animations.
23. **Verify max 2 blue accent elements per viewport** rule across all pages.
24. **Responsive audit** -- test all pages at 375px, 768px, 1024px, 1280px, 1440px.
25. **Replace hardcoded `max-w-[1200px]`** with container variable usage.
26. **Final visual QA** against design system preview HTML.

### Dependencies

```
Phase 1 (Foundation) ──┐
                       ├── Phase 2 (Signature Elements)
                       │         │
                       │         ├── Phase 3 (Effects & Motion)
                       │         │         │
                       │         │         └── Phase 4 (Polish)
                       │         │
                       └─────────┘
```

Phase 1 must complete first. Phases 2 and 3 can partially overlap. Phase 4 requires all prior phases.

---

## Critical Rules Checklist

- [ ] Every CTA routes to `/agendar` or `/aplicar` (NO pricing tables, NO SaaS signup flows)
- [ ] H1-B Hourglass is the ONLY brand mark (used as watermarks in appropriate sections)
- [ ] Dark mode is default -- all pages start on Surface-0 (`#000000`)
- [ ] Max 2 blue accent elements per viewport at any scroll position
- [ ] Agent sunglasses icon is NOT a brand mark (just a misc UI icon)
- [ ] No gold/amber accent colors remain in the final implementation
- [ ] All animations respect `prefers-reduced-motion: reduce`
- [ ] All interactive elements have visible focus states
- [ ] All images/icons have appropriate `aria-hidden` or `alt` text
- [ ] Surface tiers on mobile limited to max 2 (Surface-0 and Surface-2)

---

## Changelog

- 2026-03-16: Initial application plan created (Stage 3, Phase 3)
- 2026-03-17: Removed Azure Whisper / Blue Shimmer Text effect (permanently discarded). Updated signature element counts from 5 to 4, removed all Azure Whisper references from page audits, signature element maps, animation maps, priority matrix, and implementation order.
