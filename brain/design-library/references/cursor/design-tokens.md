# Cursor — Design Tokens

Source: https://cursor.com
Harvested: 2026-04-15 (html.html, 693 KB)

## Color System

Cursor's dark palette is unusual in the Top 10 because it pivots mid-page: the hero uses warmer near-blacks with subtle brown tints (`#14120B`, `#26251E`, `#3C3935`, `#4A443B`), then switches to cooler blue-family tones in the technical sections (`#206595`, `#2D629E`, `#427986`, `#3B82F6`, `#87C3FF`). This warm-to-cool pivot is Cursor's signature and it's what gives the page its "poetic-to-technical" shift.

### Warm hero near-blacks
- `#141414` / `#14120B` — base warm black
- `#26251E` — warm elevated surface
- `#3C3935` / `#4A443B` — warm mid tones

### Cool technical-section blues
- `#206595`, `#2D629E`, `#427986` — muted technical blues
- `#3B82F6` — Tailwind blue (accent)
- `#87C3FF` — soft light blue (highlights)
- `#6049B3` — purple accent (used sparingly)

### Warm secondary
- `#34785C`, `#1F8A65` — muted greens (editor accents)
- `#82D2CE`, `#83D6C5` — teals

### REIS [IA] mapping
Cursor's warm-to-cool pivot is a **composition technique**, not a palette to copy. The lesson: you can tonally shift an entire page through a gradient of temperature (warm hero → cool method) to create an emotional arc. For REIS this would translate to a subtler version — warm-tinted near-black in the hero for gravity, cool-tinted near-black in the method sections for precision. All still dark, all still single-accent blue, but the tonal temperature shifts.

## Typography

- **Serif + sans hybrid**: Cursor uses a custom serif (`--font-serif`) for the hero headline — confirmed in the HTML (`Iowan Old Style, Palatino Linotype, URW Palladio L, P052, ui-serif, Georgia, Cambria, Times New Roman` fallback stack)
- **Custom icon font**: `CursorIcons16` — proprietary icon-as-font system
- System sans for body, monospace for code
- The serif/sans pivot mirrors the warm/cool pivot: serif in the poetic hero, sans in the technical sections

## Spacing

- Section padding varies by register: generous in the hero (160px+), denser in the technical sections (80–100px)
- 12-column grid

## Implementation

- Next.js (`_next/`)
