---
name: Project — Moroni & Daphine Wedding Invitation
description: Key locked decisions, design spec state, and aesthetic direction for the M&D digital wedding invitation redesign
type: project
---

## Project facts

Wedding date: 2026-06-12 (Friday, 21h00, arrival 20h20)
Venue: Castelo dos Lagos — R. Bonfim, 754, Jd. Planteucal, Ribeirão Pires — SP
File: moroniedaphine/src/pages/convite.astro
Design spec: moroniedaphine/design-spec-convite.md (fully detailed, read before any visual work)

## Locked palette — DO NOT CHANGE

| Token | Value |
|-------|-------|
| --burgundy | #4A1619 |
| --gold | #D4AF37 |
| Page background | #E5DFD6 (warm linen) |
| Card gradient | linear-gradient(180deg, #FFFEFB → #FDF9F2 → #FFFEFB → #FAF6EE) |
| Film filter | sepia(.12) saturate(.82) contrast(.90) brightness(1.03) |

## Locked type system — DO NOT CHANGE

Display font: Fraunces variable, weight 200, "opsz" 144 "SOFT" 50 (italic for all display)
Body serif: Fraunces, weight 300, "opsz" 14 (italic for body paragraphs)
Sans labels: Inter, weight 300, uppercase, letter-spacing 0.45em, font-size 9px

**Why:** Project memory record `project_moroni_daphine_locked.md` confirms Fraunces + burgundy/white/gold is permanently locked. Zero SVG custom was previously a rule but botanical SVGs are now approved (see design spec Section 3, 5, 7, 10, 12).

## Aesthetic direction — LOCKED

Primary intent: romantic-opulence
Secondary: candlelight-warmth, cinematic-entry, hold-and-release

NOT: editorial fine-art, earthy-garden, minimal-architectural. Those were the wrong direction (archived in casamento-moroni-daphine/_archived-wrong-direction-wedding-editorial-premium.md). Daphine's Pinterest board is burgundy + gold + cream — this is the correct direction.

## Mood reports produced

1. `brain/design-library/mood-reports/casamento-moroni-daphine/wedding-romantic-burgundy.md` — editorial/print sources, luxury fashion brand references (Valentino, Dior, RL, Pichon Baron). 15 refs.
2. `brain/design-library/mood-reports/wedding-invitation-v2.md` — digital invitation platforms + award-winning wedding sites + functional craft techniques specific to the convite redesign. 27 refs. Created 2026-04-23.

## Design spec current state (as of 2026-04-23)

The convite.astro redesign spec is COMPLETE and detailed in design-spec-convite.md. It covers:
- Part 1: Cover (fullscreen photo + ghost button + fade transition)
- Part 2: Invitation card (15 sections, full CSS specs, full JS)

Key decisions already made in spec:
- Envelope animation REMOVED — replaced with photo cover + fade
- Botanical SVG dividers REPLACE generic hr gradient lines
- Botanical corner ornaments at 7% opacity on card body
- All images/videos use unified film filter
- Scroll reveal: .rv class, opacity 0→1 + translateY 10px→0, 800ms ease

## Open improvement opportunities (from V2 mood report)

1. Photo grid 2:1:1 — Section 9 currently 1:1:1. Change grid-template-columns to 2fr 1fr 1fr.
2. Burgundy-ground section — add one full burgundy (#4A1619) background section (candidate: venue + dress code, Section 6) with cream text for visual chapter-break rhythm.
3. Post-RSVP confirmation enhancement — add botanical divider + couple quote to the #ok element.
4. Venue video close-then-wide sequence — reorder Section 8 videos: detail close first, wide aerial second.
5. Countdown scroll magnet — ensure the top edge of the countdown (Section 11) is visible at the bottom of a 812px viewport (iPhone 14) to create scroll pull.

## Harvest recommendations (pending design-system-extractor)

1. https://adovasio.it — Awwwards SOTD Mar 2026. Typography scale + countdown-in-hero placement.
2. https://boutiqueweddings.cz — Awwwards HM May 2025. Section spacing tokens + video hero.
3. https://www.blissandbone.com — Dark template layout patterns + RSVP form field styling.
