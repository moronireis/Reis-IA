---
name: Brand Applications Showcase (Step B)
description: Step B completed — 12 real-world application mockups + 6 misuse examples in a self-contained HTML preview with sidebar nav and scroll tracking.
type: project
---

Brand applications showcase (Step B) completed 2026-03-17. Self-contained HTML file at `reis-ia-website/design-previews/brand-applications-preview.html`.

## Applications Built (12 total)

1. **Navigation Header** — opt-24 in accent blue, desktop (72px) + mobile (64px) with glassmorphism backdrop-filter
2. **Hero Section** — opt-128 at 128px with radial blue ambient glow, display typography, CTA
3. **Favicon / Browser Tab** — opt-16 in dark browser chrome mockup with address bar
4. **Watermark** — opt-128 at 200px, 3% opacity, white + blue variants side by side
5. **Section Divider** — opt-32 at 32px, 18% opacity, centered with gradient lines
6. **Loading State** — 3 animation variants: pulse (2s), draw-on (2.5s staggered stroke), scanner (1.8s rotating ring)
7. **Social Media Avatar** — circle (LinkedIn 110px, Instagram 150px, X 48px) + square variant, blue + white
8. **Email Signature** — opt-32 header + opt-16 wordmark pair, dark card, accent divider gradient
9. **Business Card** — front (opt-64 + wordmark) + back (contact + QR placeholder), #0A0A0A
10. **Document Header** — opt-32 + wordmark, dark + light variants, accent divider
11. **App Icon** — iOS rounded-square at 512/256/128/64px with inner ambient glow, blue + white alts
12. **Certification Badge** — "Powered by Reis IA" in pill outline, pill filled, rect outline, rect filled, circular seal

## Misuse Examples (6)
1. Stretched/distorted (broken aspect ratio)
2. Unauthorized colors (orange shown as example)
3. Below minimum size (sub-16px)
4. Complex background (checkerboard pattern)
5. Rotated (45-degree example)
6. Distorting effects (drop shadow + glow)

## Technical Details
- Self-contained HTML with inline CSS + JS
- Sidebar navigation with scroll tracking (IntersectionObserver-style manual)
- All design system tokens as CSS custom properties
- Inter font from Google Fonts
- Responsive (sidebar hides below 1024px)
- SVG symbols defined once, referenced via `<use>` throughout

**Why:** Step B follows Step A's mark refinement to show how the approved mark works in real contexts, establishing clear usage rules before dev implementation.

**How to apply:** Reference this file for correct variant selection, sizing, and color usage when implementing brand elements in the website.
