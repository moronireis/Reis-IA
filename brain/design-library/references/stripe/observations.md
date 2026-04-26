# Stripe — Observations

Source: https://stripe.com
Harvested: 2026-04-15
Harvest status: COMPLETE (629 KB HTML)
Cluster: Consulting Authority Minimal
Priority in mood report: #2

## What makes this premium

Stripe's home is the canonical example of "the grid is the argument". The composition refuses decoration — every pixel is column-aligned, every type size is defensible against a modular scale, every CTA is underplayed to the point that it reads as guidance rather than persuasion. Where lesser sites shout, Stripe whispers and somehow lands harder. The restraint is not austerity; it is confidence. When Stripe does deploy motion, it is confined almost exclusively to the WebGL gradient hero — the rest of the page sits still and lets the grid carry the authority. This is exactly the posture REIS [IA] needs when presenting method.

## What to steal (for REIS [IA])

1. **Disciplined 12-column grid, never broken** — method and case-study sections should honor column alignment even when a single-column block would "look fine"; the alignment is what reads as authority.
2. **Motion budget concentrated on one moment** — spend all scroll-motion budget on the hero; keep the middle of the page still. This matches REIS's "no noise" intent.
3. **Type scale discipline** — pick one modular scale (1.25 or 1.333) and enforce it globally with no off-ladder exceptions.
4. **Tonal-shift sectioning on dark** — alternate `#010202` / `#171D27` / `#031323` / `#012939` as sectional backgrounds instead of dividers.

## What to leave behind

- The blue-family (4+ shades of blue). REIS stays on a single accent (`#4A90FF`) — Linear-style single-accent is a better match for our brand lock.
- The industry strips / logo walls — these are SaaS credibility anchors; REIS uses case studies instead.
- Anything that reads as "product launch"

## REIS [IA] brand lock check

- Dark mode default: partial — Stripe is hybrid; we take only the dark sections as reference
- Accent restraint: aligned
- Inter typography: compatible (Stripe's Sohne is Inter-adjacent in visual register)
- Minimal geometric architectural: aligned
- No SaaS pricing patterns: Stripe has pricing pages; we ignore them

## Extraction limitations

The WebGL gradient shader logic lives inside obfuscated JS chunks we did not fetch. If orchestrator wants to replicate the gradient hero, the open-source "Stripe gradient" fork is the better reference.
