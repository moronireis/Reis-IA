---
name: Design System v1.1 Technique Enrichment
description: Tracks which reference techniques were adopted vs skipped in the 2026-03-17 enrichment pass, and why.
type: project
---

Design system updated to v1.1 on 2026-03-17 with 8 techniques from master catalog.

**Why:** Phase 3 design system refinement required evaluating all 87 techniques from 9 references (Stripe, Linear, Apple, Porsche, Morningside, AIOX, Vercel, Academia Lendaria, Agencia Lendaria) against current design system.

**Adopted (Sections 23-30 in design-system.md, Section 9 in implementation-guide.md):**
1. Sticky Section Scroll (Apple) -- for methodology sections
2. Word-by-Word Text Reveal (Apple) -- for hero taglines
3. Floating CTA with frosted glass (Porsche) -- for sales pages
4. FAQ Exclusive-Open Behavior (Morningside) -- enhances existing accordion
5. Stagger System with CSS tokens (Linear) -- replaces hardcoded nth-child delays
6. Hardware-Adaptive Rendering (Linear) -- 3-tier performance degradation
7. Micro-Interaction Timing / --duration-micro 150ms (Stripe) -- fills gap between instant and fast
8. Tab Sliding Indicator (Morningside) -- enhances existing tabs

**Skipped with reasoning:**
- 8 named easing curves (Stripe) -- 5 curves sufficient, more creates decision fatigue
- Gradient stroke animation (Stripe) -- too product-UI for consultancy
- SVG stroke-draw animation (Linear) -- needs specific SVG assets we don't have
- Glitch text effect (Linear) -- too playful, not premium
- CSS perspective parallax (Apple) -- already have JS parallax, z-index complexity
- Image hover scale3d (Porsche) -- marginal improvement over existing scale(1.03)

**How to apply:** When building new pages, check Sections 23-30 for applicable patterns. The floating CTA is mandatory on /builder and /systems sales pages. The stagger system should be used for all new grid entrances instead of .animate-stagger.
