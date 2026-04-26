# Bureau Borsche — Motion Config

Source: https://bureauborsche.com
Harvested: 2026-04-15

## Libraries Detected

No motion library strings in the static HTML payload. The payload is thin (124 KB) — likely the site uses client-side rendering or CSS-heavy layouts where inline CSS is minimal.

## Signature Motion

Bureau Borsche's motion style (from visual knowledge of the studio):
- Page transitions with a strong "curtain reveal" or "cut" feel — editorial cinematic cuts between sections
- Display type reveals on scroll — large type sliding or fading in from the grid edges
- Image/video reveals as if turning magazine pages

## Easing & Duration

- Likely strong editorial curves — more abrupt "cut" timing than smooth ease-in-out
- Durations can be shorter (200–400ms) to feel like magazine-spread transitions rather than ambient motion

## Scroll Behavior

- Possibly snap-scrolling between "spreads" (magazine-page metaphor)
- Possibly a full-page section pagination

## Transferable for REIS [IA]

The Bureau Borsche lesson is that scroll itself can be reframed as "turning a page". For REIS this would translate to a section-snap scroll on desktop, where each major section (hero → method → proof → close) feels like a spread rather than a continuous flow. This is a strong move but also a risky one — it can feel gimmicky if not executed with the editorial gravity that Borsche brings.

## Extraction limitations (important)

Payload was only 124 KB and contained almost no inline CSS or JS. Most of the motion behavior lives in external chunks we did not fetch. All motion claims above are inferred from visual knowledge of the studio, not from the harvested source.
