# Mercury — Observations

Source: https://mercury.com
Harvested: 2026-04-15
Harvest status: COMPLETE (820 KB HTML)
Cluster: Consulting Authority Minimal
Priority in mood report: #4

## What makes this premium

Mercury has solved the hardest problem in fintech marketing: how to look expensive without looking stiff. The answer, clearly, is the typographic pairing of a display serif for headlines against a disciplined sans for body, set against generous whitespace and narrow prose columns. The entire page reads like a private-bank prospectus translated to pixels — calm, quiet, unhurried, and welcoming only to readers who already belong. Where most fintechs reach for illustrations or gradients to signal "premium", Mercury just lets the type and the whitespace do the work. Motion is essentially absent. Nothing is trying to impress you. Which is why you are impressed.

## What to steal (for REIS [IA])

1. **Serif + sans typographic pairing for editorial gravity** — REIS is currently Inter-only. Consider adding a display serif (licensed editorial serif, not Georgia) for H1/H2 on the home to inject consulting-firm gravity. This would be a brand-lock amendment and should be escalated to the designer-agent / brand-strategist before adoption.
2. **Oversized section padding (160–200px desktop)** — more generous than any of the other Top 10. Whitespace as the primary brand asset.
3. **Narrow prose columns (~720px) inside wide containers** — for methodology and case-study prose, narrow the reading column even on desktop.
4. **Near-zero motion budget** — permission to ship a static REIS home and trust the composition.

## What to leave behind

- The light mode (Mercury is predominantly light; REIS is dark default — this is a hard brand lock)
- The private-bank color temperature (cream/lavender) — doesn't match REIS electric blue
- Any fintech-product-specific visual motifs

## REIS [IA] brand lock check

- Dark mode default: NOT aligned — Mercury is light-mode. Harvest is for philosophy only, not for visual direction.
- Single accent discipline: aligned
- Inter compatibility: partial — the serif pairing would be an addition, not a replacement
- Minimal geometric architectural: partially aligned — Mercury is more editorial/classical than geometric
- No SaaS pricing patterns: Mercury has pricing but the home page is composed as editorial, not as a funnel

## Extraction limitations

Mercury's payload was light on inline CSS (no explicit hex colors beyond `#272735` and `#535461` in the body of the HTML). Type scale and spacing are inferred from visual signature rather than extracted from tokens. The serif identification is inferred — the actual licensed font name lives in chunks we did not fetch.
