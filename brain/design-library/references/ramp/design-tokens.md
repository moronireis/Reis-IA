# Ramp — Design Tokens

Source: https://ramp.com/expense-management (homepage returned thin HTML; subpage used for harvest)
Harvested: 2026-04-15 (html.html, 1.5 MB)

## Color System

Ramp's dark variant is the cleanest "publication-grade dark B2B" in the set. The palette is ruthlessly limited.

### Extracted hex
- `#0066FF` — Ramp primary blue (used as the accent anchor)
- `#FFFFFF` — foreground
- `#f6fab2` — highlight yellow (used sparingly for chart highlights — we ignore it for REIS)
- Near-black surfaces (exact hex values live in compiled CSS chunks we did not fetch; visual signature matches the `#0A0A0A`–`#181818` ladder typical of the cluster)

### REIS [IA] mapping
Ramp's `#0066FF` is slightly deeper than REIS `#4A90FF`. What matters is **how rarely it appears** — Ramp's dark pages can go several viewports without any accent color at all, and then land one chart or one CTA in blue. This is the "publication-grade" restraint we need to codify.

## Typography

- Custom display sans (Ramp has invested in proprietary type — signature is editorial, not SaaS)
- Heading hierarchy is merciless: H1 oversized, H2 at ~50% of H1, body at ~16px
- Tabular figures used for financial data — this is the signature "publication grade" detail

## Spacing

- Section vertical padding in the 120–160px range
- 12-column grid
- Data tables and charts framed as figures — captions, gutters, consistent alignment

## Shadows

- Zero drop shadows on dark
- Subtle `rgba(255,255,255,0.06)` borders on tables and cards

## Implementation

- Next.js (`_next/`)
- Lottie animation library detected in payload (one of the few Top 10 refs using Lottie — likely for a chart intro animation)
