# Vercel — Suggested Patterns

Source: https://vercel.com
Harvested: 2026-04-15

## Pattern 1 — `patterns/dark-editorial/continuous-tonal-gradient-body.md`

- **Category**: dark-editorial
- **Rationale**: Instead of giving each section its own background color, paint the entire `<body>` with a single vertical `linear-gradient` that shifts across ~4 near-black stops over the full page height. Sections inherit transparent backgrounds. The result: no dividers, atmospheric pressure shifts automatically, premium feel. This is Vercel's most transferable move and it is trivially portable to REIS [IA].
- **File/line hints**: Inspect Vercel's `<body>` inline style or the root wrapper — the gradient spans from `#0A0A0A` top to `#000000` bottom with intermediate stops.

## Pattern 2 — `patterns/surfaces/glass-outline-border.md`

- **Category**: surfaces
- **Rationale**: Codify `border: 1px solid rgba(255, 255, 255, 0.08)` as the REIS dark-mode border token for cards, buttons, and input fields. Paired with a subtle inset highlight at `rgba(255, 255, 255, 0.04)`, this produces the "glass outline" feel that makes dark surfaces look like objects and not holes.
- **File/line hints**: Vercel card components use this exact pattern throughout the harvested HTML.

## Pattern 3 — `patterns/typography/mono-companion-for-metadata.md`

- **Category**: typography
- **Rationale**: Add a monospace companion font (Geist Mono, JetBrains Mono, or Berkeley Mono) to the REIS type system, used exclusively for metadata, pillar labels, case-study dates, and code spans. The monospace creates editorial punctuation that breaks up the Inter-heavy rhythm and signals "this is a real document, not marketing copy".
- **File/line hints**: `--font-mono` CSS var in harvested HTML, applied to small labels and metadata rows.
