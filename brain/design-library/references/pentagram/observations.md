# Pentagram — Observations

Source: https://www.pentagram.com
Harvested: 2026-04-15
Harvest status: COMPLETE (963 KB HTML)
Cluster: Swiss / Editorial Luxe
Priority in mood report: #8

## What makes this premium

Pentagram's home is the purest surviving example of "the work is the design" — a museum-grade monograph translated to the web. The palette is four colors (black, white, two greys). The type is oversized Swiss sans, set with merciless discipline. The composition is an asymmetric grid of case-study thumbnails, each one breathing into its own column, none fighting for attention. Motion is essentially absent; the movement budget is spent entirely on the thumbnails themselves, which are often videos or animated images — the work moves, the frame holds still. This is the most disciplined reference in the Top 10 and it's the one that should haunt us most: if the REIS [IA] case-study section can approach this level of restraint, we have won the brand battle.

## What to steal (for REIS [IA])

1. **Work-as-color** — let case-study imagery and method artifacts carry the chromatic weight of the page. The chrome stays monochrome + single accent.
2. **Oversized Swiss display type for the hero** — REIS's Inter can approach this if set at the right scale (100–120px on desktop for H1, tight letter-spacing). Inter Display or Inter at weight 600–700 should do the work.
3. **Asymmetric but disciplined case-study grid** — case studies should be staggered for rhythm, not lined up in a uniform row. The asymmetry is the composition. But every element still honors a shared vertical rhythm.
4. **Near-zero motion on the chrome** — motion is reserved for the work itself (video thumbnails, animated case-study previews). The page around them holds still.

## What to leave behind

- The light mode (Pentagram is predominantly light)
- The pure-monochrome limit (REIS needs one accent — `#4A90FF` — as anchor)
- Any pattern that would make REIS look like a design agency portfolio rather than a consulting firm

## REIS [IA] brand lock check

- Dark mode default: NOT aligned (Pentagram is light). Harvest is for discipline, not visual direction.
- Single accent: very strongly aligned in spirit — Pentagram is four-color, REIS is four-color (near-black + white + grey + blue)
- Inter compatibility: aligned — Inter at display weight can approach the Swiss editorial register
- Minimal geometric architectural: aligned
- No SaaS patterns: aligned — Pentagram has no pricing, no CTAs, no funnel

## Extraction limitations

The specific display sans font is not named in the HTML payload. The case-study route transitions happen in client JS. The video-thumbnail media is lazy-loaded and not in the initial fetch.
