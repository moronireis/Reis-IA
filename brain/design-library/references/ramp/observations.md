# Ramp — Observations

Source: https://ramp.com/expense-management (subpage — homepage was thin SPA shell)
Harvested: 2026-04-15
Harvest status: COMPLETE (1.5 MB HTML on subpage)
Cluster: Consulting Authority Minimal
Priority in mood report: #5

## What makes this premium

Ramp achieves what almost no B2B finance site achieves: it looks like a business publication, not like a SaaS marketing site. Proof elements — charts, tables, financial metrics — are framed as editorial figures with captions, aligned to a grid, rendered in tabular figures, and surrounded by the generous whitespace of a Financial Times feature. The accent blue (`#0066FF`) is held in reserve for maybe one moment per viewport. Lottie is deployed strategically (and almost invisibly) to animate chart reveals and counting numbers, which gives proof elements kinetic gravity without turning the page into a demo. This is the single best reference for how REIS [IA] should present case-study outcomes.

## What to steal (for REIS [IA])

1. **Publication-grade chart framing** — every chart gets a figure number, a caption, a source line, and disciplined grid alignment. This is how proof stops looking like a pitch deck and starts looking like evidence.
2. **Tabular figures for financial data** — `font-feature-settings: 'tnum' 1;` on any numeric display. This is the single detail that makes numbers look "professional" vs "marketing".
3. **Lottie for number ticker on IntersectionObserver** — counting up revenue metrics in a case study section is a near-perfect fit for REIS's R$-focused proof.
4. **Accent restraint at publication level** — Ramp can go two full viewports without any blue. REIS should hold itself to the same discipline.

## What to leave behind

- The highlight yellow (`#f6fab2`) — unique to Ramp's chart semantics, violates REIS brand lock
- Any fintech-product-specific dashboard mocks
- The competitor comparison grid patterns (not a REIS move)

## REIS [IA] brand lock check

- Dark mode default: aligned (Ramp's dark variant is the reference)
- Single blue accent: aligned
- Inter compatibility: compatible — Ramp's proprietary font is Inter-adjacent
- Minimal geometric architectural: aligned
- No SaaS pricing patterns: Ramp does have pricing pages but the content pages harvested here are editorial, not funnel

## Extraction limitations

Homepage returned ~15 KB — SPA shell with client-rendered hero. Used `/expense-management` subpage as the harvest target per the task brief's fallback instructions. Lottie usage is confirmed in HTML but the specific JSON animation files were not downloaded.
