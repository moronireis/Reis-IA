# Arc Browser — Suggested Patterns

Source: https://arc.net
Harvested: 2026-04-15

## Pattern 1 — `patterns/layout/chaptered-scroll-composition.md`

- **Category**: layout
- **Rationale**: Compose a long-form marketing page as explicit "chapters" (4–6 major narrative units) instead of a continuous section flow. Each chapter has its own atmospheric pressure, its own background register, its own pacing, and is introduced with a chapter-mark element (could be a number, a label, or just a generous margin). Film-edit cadence applied to scroll. Directly applicable to the REIS [IA] home and to methodology deep-dives.
- **File/line hints**: Arc's home structure visible in the harvested HTML as a sequence of large `<section>` containers each with its own background token and distinct vertical rhythm.

## Pattern 2 — `patterns/tokens/named-font-role-system.md`

- **Category**: tokens
- **Rationale**: Formalize the REIS typography system around named font-role CSS custom properties: `--font-display`, `--font-body`, `--font-metadata`, `--font-mono`, `--font-prose`. Each role maps to a specific font + weight + letter-spacing + line-height. Makes the hierarchy explicit at the token level and prevents ad-hoc font-size usage throughout the codebase. Arc's `--fonts-exposure` / `--fonts-body` / `--fonts-mono` is the direct inspiration.
- **File/line hints**: Arc CSS custom properties visible in the harvested HTML root style block.

## Pattern 3 — `patterns/motion/chapter-transition-tonal-shift.md`

- **Category**: motion
- **Rationale**: A scroll-linked background color transition between chapter boundaries, implemented via IntersectionObserver updating a root CSS custom property. Each chapter declares its "register" (warm/cool/neutral) and the page background interpolates between them as the user scrolls. This is essentially the Cursor `scroll-linked-tonal-temperature` pattern applied at chapter granularity — the two should be cross-referenced or consolidated.
- **File/line hints**: Arc's chapter boundaries show background color shifts in the rendered page; the transition logic is in client JS.
