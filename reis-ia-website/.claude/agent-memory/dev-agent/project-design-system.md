---
name: Design system — surface, text, animation tokens
description: CSS custom properties, surface stack, text opacity system, animation classes established in Phase 2 polish pass
type: project
---

## Surface Stack (global.css @theme)
- `--color-surface-0: #080808` — page background (all page sections use inline `background-color: #080808`)
- `--color-surface-1: #111113` — alternating elevated sections, cards
- `--color-surface-2: #1c1c1e` — nested cards, hover state backgrounds
- `--color-surface-3: #242427` — active / highlighted elements

Pages alternate surface-0 and surface-1 sections. Applied via inline `style="background-color: #080808;"` and `style="background-color: #111113;"` to avoid Tailwind purge issues.

## Text Opacity System
Always use inline `style` for text opacity since dynamic values are not purge-safe:
- Primary (headlines): `color: #ffffff`
- Secondary (body copy): `color: rgba(255,255,255,0.65)` or `rgba(255,255,255,0.75)`
- Tertiary (supporting/meta): `color: rgba(255,255,255,0.45)` or `rgba(255,255,255,0.40)`
- Quaternary (disabled/labels): `color: rgba(255,255,255,0.25)` or `rgba(255,255,255,0.30)`
- SectionLabel: `color: rgba(255,255,255,0.4)` with `letter-spacing: 0.10em`

## CSS Classes Available

### Hero Load Animations (Task I)
- `.hero-animate` + `.hero-animate-1` through `.hero-animate-5`
- Apply to each hero element with increasing delay (0.1s steps)
- Hero section does NOT use `.reveal` — hero is above fold

### Scroll Reveal (Task E)
- `.reveal` — single element fade+slide up on scroll entry
- `.reveal-stagger > .reveal:nth-child(n)` — staggered grid reveals
- JS in MainLayout.astro initialises IntersectionObserver for `.reveal`
- Never apply `.reveal` to hero elements

### Counter Animation (Task F)
- Add `data-counter`, `data-target="91"`, `data-suffix="%"`, `data-prefix=""` to a `<span>` or `<p>`
- StatBlock.astro auto-generates these attributes from the `value` prop
- JS in MainLayout.astro observes `[data-counter]` at 0.5 threshold

### Card Hover (Task G)
- `.card-interactive` — surface-1 bg, border-subtle, lift on hover with box-shadow
- Applied to all cards replacing `bg-neutral-900 border border-neutral-800`

### Gold Glow (Task D)
- `.accent-glow` — subtle box-shadow glow for stat numbers / key elements
- `.accent-glow-strong` — stronger version for hero CTA
- Button.astro applies glow via `<style>` scoped CSS on `.btn-primary-style`

## Border Convention
- Cards: `border: 1px solid rgba(255,255,255,0.06)` (border-subtle)
- Default borders: `rgba(255,255,255,0.08)` (border-default)
- Strong borders: `rgba(255,255,255,0.18)` (border-strong)
- Accent accent cards: `border: 1px solid rgba(201,168,76,0.2)`
- Gold divider: `.divider-gold` class
- Section dividers: `.divider-fade` class

## Typography (Phase 3 — Premium Upgrade)
- Hero H1: `font-weight: 800`, `letter-spacing: -0.04em`, `line-height: 0.97`, `clamp(36px, 7vw, 80px)` ← upgraded from 30px min
- Section H2: `font-weight: 600`, `letter-spacing: -0.02em`, `clamp(28px, 4vw, 48px)` ← upgraded from 24px/42px
- Body copy: `font-size: clamp(16px, 1.5vw, 18px)` or `clamp(15px, 1.5vw, 17px)` inline
- Large stat numbers: `font-weight: 300` (light), accent color
- Module numbers: `font-weight: 300`, accent color

## Section Padding (Phase 3 — Premium Upgrade)
Major sections now use `padding: 96px 0` with `class="md:py-28 lg:py-32"` — upgraded from 80px/md:py-24.

## Hero Sections (Phase 3)
- Background: `#080808` with `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,168,76,0.10), transparent 70%)`
- Home page hero uses `.hero-card` floating card pattern: `margin: 8px`, `border-radius: 16px`, `border: 1px solid rgba(255,255,255,0.06)`
- Builder/Systems heroes: generous padding `96px 0 80px` without floating card wrapper
- Brand icons (hourglass/chess) only used as functional inline icons: inside cards, card visual areas, next to annotated content

## Card System (Phase 3)
- `.card-interactive` border-radius upgraded to `16px` (was 12px)
- `.card-interactive:hover` now uses gold-tinted border: `rgba(201,168,76,0.18)`
- `.card-grid-hover` wrapper class enables sibling dimming: non-hovered cards drop to `opacity: 0.55`
- `.card-cta-link` — text links with animated gold underline (width: 0 → 100% on hover)
- Cards can have visual header area `.card-visual-top`: 120px gradient area with icon inside

## New Components (Phase 3)
- `LogoMarquee.astro` — infinite CSS marquee of tech logos (OpenAI, n8n, Make, etc.), pure CSS, grayscale treatment, fade edges. Placed after hero on all 3 pages.
- `HighlightBanner.astro` — full-width event/offer banner with gold accent. Props: badge, title, description, ctaText, ctaHref.

## Animated Borders (Phase 3)
- `.rotating-border` — card border: conic-gradient rotating gold sweep, 6s linear infinite. Requires `@property --border-angle`.
- `.founder-photo-border` — same pattern but for the founder section photo wrapper. Uses `--angle` property.

## Community Avatars (Phase 3)
- `.avatar-circle` — 64px circle, surface-2 bg, initials inside
- `.avatar-item` — stagger entrance animation triggered by IntersectionObserver on `#avatar-grid`

## Noise Texture
- `body::after` — fixed overlay, SVG fractalNoise, `opacity: 0.015`. Adds grain warmth to dark surfaces.

## Lead Capture
- `.glass-input` — glass-morphism input: `rgba(255,255,255,0.06)` bg, `backdrop-filter: blur(8px)`, gold focus border
- `.lead-capture-section` — dark gradient bg for email capture section

**Why:** Phase 3 premium upgrade aligned to Academia Lendária reference. Goal: tighter typography contrast, more breathing room, richer card depth, animated elements that feel alive.
