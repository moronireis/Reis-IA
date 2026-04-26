# Apple — iPhone Product Page

- **Source**: https://www.apple.com/iphone-16-pro/
- **Harvested**: 2026-04-15
- **Extraction method**: WebFetch (HTML surface only — raw CSS/JS not retrievable without Playwright)
- **Why it matters**: Apple's product pages are the global benchmark for cinematic hero + scroll-triggered storytelling + typography-as-hero + ruthless negative space. This is the reference every "premium dark site" is secretly trying to match. For REIS [IA] sub-brand pages (Systems, Builders, Marketing, Moroni) this is the north star for pacing and type discipline.

## What we harvested
- HTML surface (copy hierarchy, modal reveal structure, chapter-nav sections)
- Section rhythm (stacked image → headline → copy pattern, modal-on-interaction reveals)
- Component inventory (chapternav, modal overlays, product carousel, testimonial/carrier grid)
- NOT harvested (needs Playwright): raw CSS tokens, keyframes, motion library detection, computed styles, image sequence frames

## Reusable techniques spotted

1. **Typography-as-hero** — Apple commits to single-headline hero frames. One sentence. Massive type. Near-black surface. No CTA competing for attention above the fold. For REIS [IA]: when the headline is the argument, don't dilute it with button clusters.

2. **Chapter-nav scroll scaffolding** — The page is structured as discrete "chapters" (model tiers, feature groups) each with its own micro-hero. On scroll, the nav updates to reflect the active chapter. This is the opposite of a single endless scroll — it's an editorial table of contents.

3. **Modal-on-interaction feature reveal** — Deep-dives (e.g., "Getting Started", "Apple Intelligence") live behind modal overlays triggered by click, not scroll. The scroll path stays lean; curiosity pulls the reader into the deep-dive. Prevents the hero page from becoming an everything-page.

4. **Alternating image-left / image-right cadence** — Feature sections alternate sides. Visual pacing tool: reader's eye never settles into a pattern, each section feels "fresh."

5. **Image-sequence hero (video-frame swap on scroll)** — Apple's signature: pre-rendered 200-frame image sequence played back via scroll position. Looks like 3D, is actually `<img>` swapping. Massive perceived quality for low runtime cost. [NEEDS PLAYWRIGHT to confirm frames + sequence logic]

## Screenshot plan (for Playwright re-run)

| Frame | Device | Coordinates | What to capture |
|-------|--------|-------------|-----------------|
| hero-fullbleed | 1440px | 0,0 → full viewport | Opening cinematic frame |
| hero-sequence-start | 1440px | scroll 0% | First frame of image sequence |
| hero-sequence-mid | 1440px | scroll 30% | Mid-rotation |
| hero-sequence-end | 1440px | scroll 60% | Final sequence frame |
| chapter-nav-active | 1440px | any chapter section | Sticky chapter indicator |
| feature-alternating | 1440px | image-right section | Layout rhythm evidence |
| modal-overlay | 1440px | after click | Modal reveal composition |
| mobile-hero | 390px | 0,0 | Mobile cinematic adaptation |

## Limitations
- WebFetch strips script/style tags; no raw CSS or motion config captured.
- Needs Playwright to: fetch stylesheet URLs, extract CSS custom properties, detect motion libraries (likely custom Apple framework, not public GSAP), and confirm image-sequence frame count.

See `distillation-plan.md` for the 3 patterns this reference should spawn.
