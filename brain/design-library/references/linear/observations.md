# Linear — Observations

Source: https://linear.app
Harvested: 2026-04-15
Harvest status: COMPLETE (2.24 MB HTML)
Cluster: Dark Editorial Premium
Priority in mood report: #1

## What makes this premium

Linear is the closest living reference to the REIS [IA] ambition because its premium quality comes from restraint, not from effects. Four disciplined near-black tones carry the entire page; a single electric blue (`#0E63FF`) is deployed maybe three times per viewport and each appearance lands like punctuation. The vertical rhythm is almost musical — section padding is generous, H1 and H2 have clearly different weights of gravity, and body copy is given enough line-height to read like editorial prose rather than marketing copy. Nothing moves that doesn't need to move. The site trusts the reader, and because it does, the reader trusts the site.

## What to steal (for REIS [IA])

1. **The four-tone near-black ladder** — `#000000` / `#080808` / `#191D20` / `#0F3338` as a sectional tonal shift system. This is the single most important lesson and it maps one-to-one onto REIS dark mode.
2. **Accent restraint as a design rule** — if the accent appears more than three times per viewport, cut one. This principle is more valuable than any token.
3. **Ease-out-expo as the house curve** — `cubic-bezier(0.16, 1, 0.3, 1)` for all entrance animations. It feels inevitable rather than animated.
4. **Radial spotlight hero effect** — pointermove-driven radial-gradient on a CSS custom property. Zero dependencies, premium result.
5. **Vertical rhythm as argument** — large section padding (120–180px) is not wasted space; it is the composition.

## What to leave behind

- The product-launch density in lower sections (Linear is selling a product; REIS is presenting a method — we should be even more restrained below the fold)
- The styled-components runtime (REIS marketing is Astro + Tailwind; we replicate tokens, not implementation)
- Any "what's new" strip or product release lane — REIS has no product launches to announce on the home

## REIS [IA] brand lock check

- Dark default: yes, aligned
- `#4A90FF` accent register: yes, Linear's `#0E63FF` validates our choice sits in the right neighborhood
- Inter typography: compatible — Linear's display stack is Inter-adjacent
- Minimal geometric architectural: aligned
- Zero chess / gold / amber: aligned

## Extraction limitations

Motion behavior is JS-driven inside Next chunks that we did not fetch — motion inferences above are based on CSS transition strings in the HTML payload and visual-signature knowledge, not on deobfuscated JS.
