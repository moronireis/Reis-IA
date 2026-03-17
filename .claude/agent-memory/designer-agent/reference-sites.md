---
name: Design System References
description: Summary of extracted reference design systems and key patterns worth adopting
type: project
---

## Extracted References

### 1. Stripe (stripe.com)
- File: `brain/assets/design-systems/reference-stripe.md`
- Preview: `reis-ia-website/design-previews/stripe-preview.html`
- Key patterns: Asymmetric pill buttons (3px top / 6px bottom), 1.018x card scale hover, knockout gradient text, alternating section backgrounds, rainbow nav line
- Light mode focused -- requires significant adaptation for Reis IA dark mode

### 2. Agencia Lendaria (agencialendaria.ai)
- File: `brain/assets/design-systems/reference-agencia-lendaria.md`
- Preview: `reis-ia-website/design-previews/agencialendaria-preview.html`
- Key patterns: Ambient light pool radial gradients, 8-tier dark background depth, warm-tinted dark gradients on buttons/cards, section gradient masks
- Gold accent is #c3b68d (muted brass) vs Reis IA #C9A84C (saturated)
- Built on Framer, flexbox-only layout
- Same market vertical (Brazilian AI agency, dark mode, premium positioning)

### 3. Vercel (vercel.com)
- File: `brain/assets/design-systems/reference-vercel.md`
- Snippets: `brain/assets/design-systems/snippets-vercel.md`
- Preview: `reis-ia-website/design-previews/vercel-preview.html`
- Key patterns: Pure black (#000) canvas, elevation via bg-value shifts (not shadows), saturated backdrop blur (saturate(180%) blur(20px)), 200ms default transition, Geist type system with variable tracking
- Dark mode native -- most directly applicable reference for Reis IA
- Elevation system: Flat (#000) > Raised (#0A0A0A + border) > Floating (#1A1A1A + shadow) > Modal
- Token system: --ds-gray-100 through --ds-gray-1000 scale
- Uses Tailwind CSS (matches our stack)

### 4. Academia Lendaria (academialendaria.ai)
- File: `brain/assets/design-systems/reference-academia-lendaria.md`
- Snippets: `brain/assets/design-systems/snippets-academia-lendaria.md`
- Preview: `reis-ia-website/design-previews/academialendaria-preview.html`
- Key patterns: Rotating conic gradient borders (6.4s @property animation), 3D perspective scroll entrance (translateY+rotateX with 1.2s cubic-bezier), text shimmer (13s background-clip gradient), shadow-free depth via layered backgrounds, glassmorphism with saturate(180%)
- Gold accent is #ffd44a (bright, playful) vs Reis IA #C9A84C (muted, sophisticated)
- Inter font family (matches our stack), clamp() responsive typography
- Brazilian AI education ecosystem, dark mode, Next.js build
- Body text uses white at 70% opacity (#ffffffb3) instead of gray hex -- more consistent on dark backgrounds

### 5. Morningside AI (morningside.ai)
- File: `brain/assets/design-systems/reference-morningside.md`
- Snippets: `brain/assets/design-systems/snippets-morningside.md`
- Preview: `reis-ia-website/design-previews/morningside-preview.html`
- Key patterns: Grain texture overlay (grainy.png), gradient borders via background-clip technique, green glow shadow (0 0 50px rgba), glassmorphic nav on scroll, pill-shaped CTAs
- Single accent color (#0CC481 green) on dark backgrounds (#050808, #111413)
- AI consultancy (closest competitor-type reference) -- same business model, similar page structure
- Conservative animations: 0.3s ease universal, translateX(5px) hover arrows
- No proprietary iconography (competitive gap vs Reis IA's hourglass/chess)
- Webflow-hosted, flexbox layout

### 6. Linear (linear.app)
- File: `brain/assets/design-systems/reference-linear.md`
- Snippets: `brain/assets/design-systems/snippets-linear.md`
- Preview: `reis-ia-website/design-previews/linear-preview.html`
- Key patterns: Opacity-based text hierarchy (5 levels of white: 100%/70%/50%/48%/35%), binary grid dot animation (steps(1,end) timing), near-black bg (#08090a not #000), "structure felt not seen" philosophy (borders at 5-8% opacity), spacer components instead of visual dividers, warm gray shift
- Inter Variable font (single file, continuous weight), 9-level title scale + 6 text levels
- No section background alternation -- empty space only for section breaks
- Card hover: translateY(-2px) + border brighten (not scale like Stripe)
- Entrance: 800ms ease-out, 400ms base delay, 200ms stagger per element, 30px translateY
- text-wrap: balance on headings, text-wrap: pretty on body (modern CSS)
- Gradient text fills with 3s linear infinite loop (adapted as gold shimmer for Reis IA)

### 7. Apple (apple.com)
- File: `brain/assets/design-systems/reference-apple.md`
- Snippets: `brain/assets/design-systems/snippets-apple.md`
- Preview: `reis-ia-website/design-previews/apple-preview.html`
- Key patterns: Scroll-triggered fade-up choreography (opacity 0 + translateY 20px, 0.8s), glassmorphism nav (saturate(180%) blur(20px)), 0.5px hairline borders, pill buttons (radius 980px), two-up card grid (12px gap, 28px radius), background color sectioning (no dividers)
- Typography: sizes up to 96px, line-height 1.0-1.1, negative letter-spacing (-0.015em)
- Light mode primary -- requires dark inversion for Reis IA
- Extreme whitespace: 100-200px section padding, content < 40% of viewport
- No shadows on homepage -- depth via background color steps
- Dual CTA: "Learn more >" text + "Buy >" pill, 24px gap
- Three breakpoints: compact (< 735px), medium (735-1068px), large (> 1068px)
- Containers: 980px main, 680px body copy, 780px headlines

**Why:** These references provide concrete implementation patterns. Linear, Vercel, Agencia Lendaria, and Academia Lendaria are the most relevant for dark-mode execution. Stripe provides premium craft patterns that need light-to-dark adaptation. Morningside validates single-accent discipline and provides gradient border + grain texture techniques. Linear's opacity-based hierarchy and restrained philosophy are closest to the Reis IA target aesthetic.
**How to apply:** When designing new components or sections, check these references for proven dark-mode techniques. Adopt Vercel's elevation system (bg shifts, not shadows). Use the saturated backdrop blur on nav. Default to 200-300ms transitions. Adopt Morningside's gradient border (background-clip) and grain texture patterns. Consider Academia Lendaria's rotating border and text shimmer for feature highlights. Use white-at-opacity for body text (Linear's approach) rather than gray hex values. Apply Linear's entrance timing (800ms + 200ms stagger + 400ms base delay) as the default reveal pattern.
