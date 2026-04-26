# Arc Browser — Observations

Source: https://arc.net
Harvested: 2026-04-15
Harvest status: COMPLETE (641 KB HTML)
Cluster: Dark Editorial Premium
Priority in mood report: #10 (medium risk)

## What makes this premium

Arc is the reference for what the web looks like when someone composes it like a film. The home is chaptered — not sectioned, chaptered — and each chapter has the pacing of a film edit: you finish one thought before the next asks for attention. The type is set with editorial confidence, the color palette pushes further into saturated indigo than any other Top 10 ref, and the scroll itself feels composed (probably a smooth-scroll hijack giving the reader slightly more time with each frame than native scroll would). Arc's home is the closest thing in the Top 10 to a cinematic essay, and for the REIS [IA] methodology section — where each of the pillars deserves its own breath — this chaptering is the single most actionable structural idea.

## What to steal (for REIS [IA])

1. **Chaptered scroll composition** — compose the REIS home as 4–6 explicit chapters (hero, pillars, method, proof, close) instead of a continuous section flow. Each chapter has its own atmospheric pressure and its own pace.
2. **Named font-role CSS custom properties** — `--fonts-body`, `--fonts-display`, `--fonts-mono`, `--fonts-metadata`. Sophisticated design-system move that makes the typographic hierarchy explicit at the token level. Port directly to the REIS design system.
3. **Space Mono as monospace companion** — specific, lightweight, editorial. Alternative to JetBrains Mono or Berkeley Mono for the REIS mono companion.
4. **Scroll-linked background tonal shifts between chapters** — each chapter has its own background color register, and the transition between chapters is a slow atmospheric shift, not a hard cut.

## What to leave behind

- The indigo/purple saturation (`#210784`, `#2404AA`, `#26069C`) — pushes past REIS's electric blue register
- The hero video loop — REIS has no product to film
- The creative-tool emotional tone — Arc is selling a browser to creatives; REIS is selling a method to executives

## REIS [IA] brand lock check

- Dark mode default: aligned (Arc is dark-first)
- Single blue accent: Arc uses an indigo family, which is adjacent but not identical to REIS electric blue
- Inter compatibility: compatible — Arc's display family is Inter-adjacent
- Minimal geometric architectural: partially aligned — Arc is more cinematic than architectural
- No SaaS pricing patterns: Arc is free, no pricing

## Extraction limitations

Mood report flagged Arc as medium risk due to client-side chapter rendering. The static HTML fetch at 641 KB is healthy, but some chaptered content may live in JS chunks we did not fetch. Motion behavior (chapter transitions, scroll hijack) is inferred, not confirmed.
