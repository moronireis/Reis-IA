---
name: Source Code Extraction — Apple, Porsche, Morningside AI (2026-03-17)
description: Deep source code extraction from Apple, Porsche, and Morningside AI focusing on animation patterns, scroll interactions, hover effects, and interactive techniques.
type: project
---

Completed deep source code extraction from 3 reference sites (10 pages total).

**Apple** (4 pages attempted): CSS/JS are fully externalized in versioned CDN bundles not directly fetchable via WebFetch. Extracted typography system, responsive breakpoints, and layout patterns from HIG. Reconstructed scroll-linked animation patterns from CSS-Tricks reference implementation (canvas image sequence, sticky sections, parallax, video scroll playback, IntersectionObserver triggers).

**Porsche** (3 pages): Rich extraction. Got complete design system source from GitHub repo (colors.ts). Full token system: 6-tier fluid spacing with clamp(), 4-tier motion duration, 3 custom easing curves, complete light/dark color themes (40+ colors each). Key patterns: FloatingCTA component with frosted glass stuck state, scale3d image hover, Astro island hydration, line-height formula `calc(6px + 2.125ex)`.

**Morningside AI** (2 pages): Most complete extraction — Webflow site with inline CSS/JS. Signature gradient border glow technique using background-clip (padding-box, border-box). Complete FAQ accordion, frosted glass nav, service tab navigation with indicator, card hover effects with arrow translateX. All CSS transitions use 0.3s ease.

**Why:** These extractions provide the interactive/animation building blocks for Reis IA's Phase 3 implementation.

**How to apply:** Use apple-source.md for scroll-linked animation patterns, porsche-source.md for token architecture and premium motion values, morningside-source.md for card hover effects and gradient border technique. All files in `brain/assets/design-systems/source-code-extractions/`.

Key extraction insight: Apple sites require browser DevTools or network inspection for CSS/JS — WebFetch only gets HTML shell. Porsche's GitHub repo is the best source for their design tokens. Webflow sites (like Morningside) are the richest for WebFetch extraction because CSS/JS is inline.
