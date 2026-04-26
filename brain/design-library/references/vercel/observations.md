# Vercel — Observations

Source: https://vercel.com
Harvested: 2026-04-15
Harvest status: COMPLETE (596 KB HTML)
Cluster: Dark Editorial Premium
Priority in mood report: #3

## What makes this premium

Vercel's home achieves the closest thing to "editorial dark mode" in the B2B category. The continuous tonal gradient across the page is the central move — there are no section dividers anywhere, because the background itself shifts tone/hue imperceptibly as you scroll, and each section inherits a slightly different atmospheric pressure. Type is set with the Geist family at generous line-heights, the accent colors (primarily `#0096FF`) appear as punctuation rather than decoration, and motion is almost entirely invisible until you look for it. The composure is engineered calm — the kind of page that makes a technical buyer feel that the company behind it is also engineered.

## What to steal (for REIS [IA])

1. **Continuous tonal gradient as the full-page background** — replace discrete section backgrounds with a single vertical gradient that subtly shifts. This eliminates dividers and creates atmospheric pressure changes automatically.
2. **Geist-style display sans with `--font-mono` companion** — REIS already uses Inter which is in the same register. Add a monospace companion for editorial punctuation (code spans, metadata, pillar labels).
3. **`rgba(255,255,255,0.08)` glass outlines** — use translucent white borders on cards/buttons in dark mode instead of solid grey borders. This is the detail that makes dark mode feel considered.
4. **Tonal background instead of drop shadow for elevation** — zero drop shadows on dark surfaces; elevation is pure background tonal shift.

## What to leave behind

- Framework co-branding (Nuxt green, Svelte orange) — these are irrelevant to REIS and would violate the brand lock
- Product-launch density in lower sections (Vercel ships constantly; REIS doesn't)
- Any developer-centric UI screenshots

## REIS [IA] brand lock check

- Dark mode default: aligned
- Single accent register: `#0096FF` vs REIS `#4A90FF` — both in the electric blue family
- Inter compatibility: very high (Geist is Inter-adjacent)
- Minimal geometric architectural: aligned
- No SaaS pricing patterns on the home (pricing exists on subpages only)

## Extraction limitations

Motion behavior is JS-driven inside Next chunks we did not fetch — the hero dot grid animation and any Framer Motion usage are inferred from visual signature, not confirmed in code.
