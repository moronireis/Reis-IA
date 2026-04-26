# Cursor — Suggested Patterns

Source: https://cursor.com
Harvested: 2026-04-15

## Pattern 1 — `patterns/dark-editorial/scroll-linked-tonal-temperature.md`

- **Category**: dark-editorial
- **Rationale**: A CSS-custom-property-driven background color that shifts from warm near-black (hero) to cool near-black (method) across the full page height. Implemented via IntersectionObserver updating a root-level custom property, or via scroll-linked CSS animations. More sophisticated than Linear's stepped tonal ladder (continuous vs stepped). This is probably the single most technically interesting pattern from the Top 10.
- **File/line hints**: Warm hex family (`#14120B`, `#26251E`) vs cool hex family (`#206595`, `#427986`) visible in the harvested HTML — inspect the body/root wrappers for custom property declarations.

## Pattern 2 — `patterns/hero-effects/fake-typing-code-panel.md`

- **Category**: hero-effects
- **Rationale**: A React component that reveals text character-by-character inside a framed code-panel mock, as if it were being typed in real time. Triggered on IntersectionObserver. Respect reduced-motion by showing final text immediately. For REIS this can reveal a roadmap, a diagnostic report, or a method artifact. High narrative value for the proof section.
- **File/line hints**: Cursor's technical section — the code panels contain what is visibly a typing animation; the logic is in client JS not in the HTML payload.

## Pattern 3 — `patterns/typography/register-matched-motion-density.md`

- **Category**: typography (or motion — borderline)
- **Rationale**: A design-system rule (not a component) stating that motion density should match type register: serif/poetic sections get generous motion (reveals, tonal shifts, atmospheric effects), sans/technical sections get near-zero motion (hover states only). Codifies the principle that motion itself is a typographic choice. Overlaps philosophically with Stripe's `single-motion-budget` — should be cross-referenced.
- **File/line hints**: N/A — philosophy pattern.
