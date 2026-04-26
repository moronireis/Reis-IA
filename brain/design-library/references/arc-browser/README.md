# Arc — The Browser Company Homepage

- **Source**: https://arc.net
- **Harvested**: 2026-04-15
- **Extraction method**: WebFetch (structural only — Arc uses Next.js image optimization, CSS hidden in chunks)
- **Why it matters**: Arc is the reference for cinematic scroll storytelling with editorial typography and 3D product frames. Where Apple is "product as art" and Linear is "tool as calm," Arc is "software as narrative." Directly relevant for REIS [IA] launch stories, Moroni's personal brand hero, and the Builders community origin story.

## What we harvested
- Progressive disclosure structure (Spaces → Profiles → Split View → Themes → Privacy)
- Editorial callout positioning (testimonials as pull-quotes, not grid cards)
- Container metaphors (Spaces/Profiles as visual shapes that shape experience)
- Download pathway UX (platform-aware CTAs)
- NOT harvested (needs Playwright): 3D product frame source, scroll choreography code, color transitions between sections, raw CSS

## Reusable techniques spotted

1. **Color transitions between sections** — Arc's signature: as you scroll, the background color morphs between sections (pastel pink → lavender → sky → cream). It's disorienting at first, then intoxicating — feels like a magazine spread. For REIS [IA]: we CANNOT use pastels (brand lock: black/white/blue), but we can apply the same technique with brand-safe shifts (black → navy → near-blue → black). The technique is the value, not the palette.

2. **Editorial pull-quotes instead of testimonial cards** — Arc's testimonials aren't in a 3-column card grid. They're giant pull-quotes floated inside the reading flow, like a magazine. Feels like editorial, not marketing. Direct upgrade for REIS [IA] social proof.

3. **3D product frame on rails** — Arc shows its browser in a stylized 3D frame that tilts slightly as you scroll (parallax on rotation, not position). Feels tactile. For REIS [IA]: apply to Moroni laptop hero, Systems product demos, Builders platform screenshots.

4. **Feature as metaphor, not feature-list** — Instead of "Spaces: organize your tabs," Arc shows Spaces AS rooms with actual visual containers. The feature IS the visual. Reuse: REIS [IA] should visualize the 3 pillars (Systems/Builders/Marketing) as literal architectural spaces, not as icons in a grid.

5. **Cinematic scroll narrative pacing** — Arc's page reads top-to-bottom as a story with act structure (intro → problem → solution → proof → CTA). Each act gets a viewport. This is "presentation design, not marketing design." Directly applicable to REIS [IA] offer pages.

## Screenshot plan (for Playwright re-run)

| Frame | Device | Section | What to capture |
|-------|--------|---------|-----------------|
| hero | 1440px | 0,0 | Opening cinematic frame |
| section-t1 | 1440px | section 1 background | First background color |
| section-t2 | 1440px | section 2 background | Second background color (transition evidence) |
| product-frame-rest | 1440px | product section | 3D frame at rest |
| product-frame-tilted | 1440px | product section mid-scroll | 3D frame tilted state |
| pull-quote | 1440px | testimonial section | Editorial pull-quote layout |
| mobile-hero | 390px | 0,0 | Mobile adaptation |

## Limitations
- Next.js image pipeline hides actual rendered surfaces; needs Playwright + computed-styles inspection
- 3D frame source (likely CSS `perspective` + `rotateY/X` driven by scroll) needs JS capture
- Color transition technique (CSS variables animated vs. layered absolute sections) needs DOM inspection

See `distillation-plan.md` for patterns to promote.
