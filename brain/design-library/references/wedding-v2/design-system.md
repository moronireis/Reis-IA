# Moroni & Daphine — Wedding Invitation Design System v2
## Last updated: 2026-04-23
## Sources: blahaus.co (blocked — analysis from naming/concept), withjoy.com, paperlesspost.com, minted.com, zola.com, existing convite.astro + global.css
## Purpose: Complete CSS reference for the dark-scroll mobile invitation (convite.astro)

---

## EXTRACTION NOTES

- **blahaus.co** — Connection refused on all attempts (main domain, www prefix, /the-crimson-atelier path). Site may be down or region-blocked. Analysis below uses the "Crimson Atelier" concept (dark burgundy, botanical, editorial luxury) as a design direction rather than a literal extraction.
- **withjoy.com** — Catalog page fetched. Limited CSS extraction (server-rendered with external stylesheets). Template categories and pricing visible.
- **paperlesspost.com** — 404 on elegant category. Design philosophy captured from available content: "ornate metallic embellishments," "stately typography," "crisp borders."
- **minted.com** — Product grid fetched. Hover state `#f5f5f5`, padding `0.75rem`, foil-press/letterpress terminology captured.
- **Primary source**: The existing `convite.astro` and `global.css` in this repo — these ARE the live implementation and contain exact CSS values already in production.

---

## 1. COLOR SYSTEM — Dark Burgundy Scroll

### Core Palette

```css
/* The 3 pillars — unchanged, locked */
--burgundy:    #4A1619;   /* Primary — text on light, bg on dark */
--white:       #FFFFFF;   /* Pure white — used sparingly */
--gold:        #D4AF37;   /* Tertiary accent — always through opacity */
```

### Dark Scroll Background

```css
/* convite.astro body — the "Crimson Atelier" dark canvas */
background: #3A1013;
/* This is NOT the same as --burgundy (#4A1619). It's 2 stops darker:
   #3A1013 = rgb(58, 16, 19) — a near-black crimson that reads as
   "dark room with wine-colored walls" vs burgundy which reads as
   "printed invitation on cotton paper" */
```

### White/Cream Opacity Ladder (on dark #3A1013 background)

These are the EXACT values used in convite.astro:

```css
/* Content text — cream-shifted white */
--inv-dark-cream:       #FFFEFB;                        /* Base white (warm) */

/* Text hierarchy on dark */
--inv-dark-text-names:  #FFFEFB;                        /* 100% — couple names ONLY */
--inv-dark-text-date:   rgba(255, 254, 251, 0.75);     /* Date number */
--inv-dark-text-detail: rgba(255, 254, 251, 0.70);     /* Detail values (venue name, dress code) */
--inv-dark-text-body:   rgba(255, 254, 251, 0.50);     /* Body italic text, labels */
--inv-dark-text-sub:    rgba(255, 254, 251, 0.30);     /* Sub-details (address, notes) */
--inv-dark-text-dim:    rgba(255, 254, 251, 0.28);     /* Form labels, footer text */
--inv-dark-text-ghost:  rgba(255, 254, 251, 0.15);     /* Placeholder text in inputs */

/* Structural elements on dark */
--inv-dark-border:      rgba(255, 254, 251, 0.12);     /* Swatch borders, frame edges */
--inv-dark-input-bg:    rgba(255, 255, 255, 0.04);     /* Form input background */
--inv-dark-input-border:rgba(255, 254, 251, 0.08);     /* Form input border */
--inv-dark-divider:     rgba(255, 254, 251, 0.10);     /* Link dots separator */
```

### Gold Opacity Ladder (on dark #3A1013 background)

```css
/* Gold accents on dark — all through opacity, NEVER raw #D4AF37 */
--inv-dark-gold-label:  rgba(212, 175, 55, 0.55);      /* Section labels ("Local", "Traje", "Faltam") */
--inv-dark-gold-amp:    rgba(212, 175, 55, 0.50);      /* Ampersand between names */
--inv-dark-gold-frame:  rgba(212, 175, 55, 0.30);      /* Frame corner ornaments */
--inv-dark-gold-rule:   rgba(212, 175, 55, 0.25);      /* Gold hairline rules */
--inv-dark-gold-border: rgba(212, 175, 55, 0.20);      /* Frame borders, submit btn border */
--inv-dark-gold-sep:    rgba(212, 175, 55, 0.15);      /* Detail separator gradient */
--inv-dark-gold-hint:   rgba(212, 175, 55, 0.12);      /* Photo borders, submit btn bg */
--inv-dark-gold-glow:   rgba(212, 175, 55, 0.04);      /* Focus ring, frame bg tint */

/* CRITICAL RULE: Gold on dark backgrounds stays in 0.12-0.55 range.
   Below 0.12 it vanishes. Above 0.55 it reads as gaudy/cheap. */
```

### Cover Overlay Gradient

```css
/* Full-screen photo cover — graduated dark overlay */
background: linear-gradient(to bottom,
  rgba(58, 16, 19, 0.40) 0%,      /* Light overlay at top — photo shows */
  rgba(58, 16, 19, 0.20) 25%,     /* Minimal overlay — hero area */
  rgba(58, 16, 19, 0.25) 50%,     /* Slight increase — midpoint */
  rgba(58, 16, 19, 0.55) 75%,     /* Darkening for CTA area */
  rgba(58, 16, 19, 0.75) 100%);   /* Heavy overlay at bottom — text area */
```

### Detail Separator Gradient

```css
/* Vertical separator between detail columns */
background: linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.15), transparent);
/* Horizontal separator (mobile fallback) */
background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.15), transparent);
```

### Dress Code Palette (guest guidance)

```css
/* Color swatches shown to guests */
#1a1a1a    /* Preto (near-black) */
#4A1619    /* Burgundy (wedding color) */
#1a2744    /* Azul marinho (navy) */
#c4a882    /* Nude / Neutro */
#3d3d3d    /* Chumbo (charcoal) */
```

---

## 2. TYPOGRAPHY SYSTEM — Mobile-First

### Font Stack

```css
/* Primary — display and body */
font-family: 'Fraunces', Georgia, serif;
/* Fraunces is a variable font with 3 axes:
   - opsz (optical size): 9-144
   - wght (weight): 100-900
   - SOFT (softness): 0-100
*/

/* Secondary — labels and UI */
font-family: 'Inter', sans-serif;

/* Google Fonts load string: */
/* Fraunces:ital,opsz,wght@0,9..144,200;0,9..144,300;0,9..144,400;1,9..144,200;1,9..144,300;1,9..144,400 */
/* Inter:wght@300;400 */
```

### Invitation Type Scale (convite.astro — exact values)

| Element | Font | Weight | Style | opsz | SOFT | Size | Line-height | Letter-spacing | Color (on dark) |
|---------|------|--------|-------|------|------|------|-------------|----------------|-----------------|
| Couple names | Fraunces | 200 | italic | 144 | 50 | `clamp(28px, 7vw, 44px)` | 1.1 | 0.03em | #FFFEFB |
| Ampersand | Fraunces | 200 | italic | 144 | 50 | `clamp(14px, 3vw, 20px)` | — | — | rgba(212,175,55,.50) |
| Date number | Fraunces | 200 | normal | 144 | 50 | `clamp(56px, 13vw, 80px)` | 1 | — | rgba(255,254,251,.75) |
| RSVP heading | Fraunces | 200 | italic | 144 | 50 | `clamp(20px, 4.5vw, 28px)` | — | — | #FFFEFB |
| Success heading | Fraunces | 200 | italic | 144 | 50 | 26px | — | — | #FFFEFB |
| Detail name | Fraunces | 300 | normal | 14 | — | 15px | — | — | rgba(255,254,251,.70) |
| Body italic | Fraunces | 300 | italic | 14 | — | 15px | 1.85 | — | rgba(255,254,251,.50) |
| Zigzag caption | Fraunces | 300 | italic | 14 | — | 14px | 1.85 | — | rgba(255,254,251,.50) |
| Form inputs | Fraunces | 300 | normal | — | — | 14px | — | — | #FFFEFB |
| Countdown number | Fraunces | 200 | normal | 144 | 50 | `clamp(28px, 6vw, 38px)` | 1 | — | rgba(255,254,251,.65) |
| Gold label | Inter | 300 | normal | — | — | 9px | — | 0.45em | rgba(212,175,55,.55) |
| Cream label | Inter | 300 | normal | — | — | 9px | — | 0.45em | rgba(255,254,251,.50) |
| Dim label | Inter | 300 | normal | — | — | 9px | — | 0.45em | rgba(255,254,251,.28) |
| Detail sub | Inter | 300 | normal | — | — | 11px | 1.85 | — | rgba(255,254,251,.30) |
| Tiny notes | Inter | 300 | normal | — | — | 8px | — | 0.30em | rgba(255,254,251,.28) |
| Cover button | Inter | 300 | normal | — | — | 9px | — | 0.45em | rgba(255,255,255,.55) |
| Submit button | Inter | 300 | normal | — | — | 9px | — | 0.35em | rgba(255,254,251,.60) |

### Key Typography Rules

1. **All uppercase text uses Inter** — never Fraunces for labels/caps
2. **Inter is ALWAYS weight 300** on the invitation — weight 400 is too heavy
3. **Letter-spacing on Inter labels: 0.30em-0.45em** — this extreme tracking is the premium signal
4. **Fraunces weight 200 for display, 300 for body** — never heavier on the invitation
5. **opsz 144 for display** (names, dates, headings) — **opsz 14 for body** (paragraphs, details)
6. **SOFT 50 on display** — balanced elegance; SOFT 100 would be too round
7. **`font-variant-numeric: tabular-nums`** on countdown numbers — prevents layout shift

### Global Type Scale (global.css — for site pages, not invitation card)

```css
--display-xl:   clamp(72px, 10vw, 160px);
--display:      clamp(40px, 7vw, 96px);
--h2:           clamp(32px, 4vw, 56px);
--h3:           clamp(22px, 2.5vw, 32px);
--body:         clamp(16px, 1.4vw, 18px);
--small:        14px;
--label:        11px;
--micro:        10px;
--nano:         9px;
```

---

## 3. LAYOUT SYSTEM — Mobile-First Vertical Scroll

### Page Container

```css
/* Invitation scroll container */
.page {
  max-width: 520px;          /* Narrower than site pages (site uses 1200px) */
  margin: 0 auto;
  padding: 60px 0 48px;      /* Top/bottom spacing */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;                  /* Uniform section gap */
}

/* Desktop bump */
@media (min-width: 640px) {
  .page { padding: 80px 16px 64px; }
}
```

### Section Pattern

```css
/* Every section is centered, full-width within container */
.sec {
  text-align: center;
  width: 100%;
  padding: 0 24px;            /* Horizontal gutter on mobile */
}
```

### Content Flow Architecture (top to bottom)

```
COVER (fixed, fullscreen)
  |-- photo (object-fit: cover, object-position: center 30%)
  |-- dark gradient overlay
  |-- monogram SVG (clamp 200px-320px)
  |-- "Abrir convite" button
  |
  v (fade transition, 1200ms)
  
INVITATION SCROLL (flex column, gap 32px, max-width 520px)
  |
  |-- [botanical leaf accent, 60px, opacity .12]
  |-- Names section (Fraunces 200 italic)
  |-- [botanical divider, 35% width, opacity .08]
  |-- Date section (large number + month/year layout)
  |-- [botanical divider]
  |-- Message section (italic body, max-width 360px)
  |-- [botanical divider]
  |-- Details section (2-column flex, responsive)
  |-- Dress code swatches (flex row, 28px circles)
  |-- [botanical divider]
  |-- Castle section (video frames with gold ornaments)
  |-- [botanical divider]
  |-- Photo zigzag section (alternating grid layout)
  |-- [botanical divider]
  |-- Closing message
  |-- [botanical divider]
  |-- Countdown (4-column grid)
  |-- [botanical divider]
  |-- RSVP form
  |-- Navigation links
  |-- Footer rose + roman numeral date
```

### Key Layout Values

```css
/* Invitation card constraints */
max-width: 520px;                           /* Card width */
padding-horizontal: 24px;                   /* Mobile gutter */
gap-between-sections: 32px;                 /* Flex gap */

/* Body text constraint */
max-width: 360px;                           /* Body italic paragraphs */

/* Detail columns */
display: flex; gap: 24px; flex-wrap: wrap;
min-width: 140px;                           /* Per detail column */
@media (max-width: 440px) { flex-direction: column; gap: 20px; }

/* Photo pair grid */
display: grid; grid-template-columns: 1fr 1fr; gap: 8px;

/* Zigzag photo layout */
grid-template-columns: 1.2fr 1fr;          /* Photo slightly wider */
/* Reverse: */ grid-template-columns: 1fr 1.2fr;
gap: 16px;
@media (max-width: 400px) { grid-template-columns: 1fr; } /* Stack on tiny */

/* Countdown grid */
grid-template-columns: repeat(4, 1fr); gap: 6px; max-width: 280px;

/* Form row */
grid-template-columns: 1fr 1fr; gap: 12px;
@media (max-width: 400px) { grid-template-columns: 1fr; }
```

### Breakpoints

```css
400px   /* Tiny mobile — zigzag stacks, form row stacks, details stack */
440px   /* Small mobile — details column threshold */
640px   /* Phablet — page padding increases, body line-height bumps to 1.78 */
768px   /* Tablet — site pages adjust, not heavily used on invitation */
```

---

## 4. DECORATIVE ELEMENTS

### Botanical SVGs

```css
/* Leaf accent (top of names section) */
.bot-accent {
  width: 60px;
  opacity: 0.12;
  filter: brightness(3) sepia(0.2);    /* Shifts dark SVG to light on dark bg */
  margin-bottom: 12px;
}
.bot-accent--top { transform: rotate(180deg); }

/* Section dividers */
.divider {
  width: min(140px, 35%);
  opacity: 0.08;
  filter: brightness(3) sepia(0.2);
}

/* Footer rose spray */
.bot-footer {
  width: 80px;
  opacity: 0.10;
  filter: brightness(3) sepia(0.2);
}
```

### SVG Filter Technique

The botanical SVGs are dark/burgundy-colored source files. On the dark background, `brightness(3) sepia(0.2)` is applied to make them appear as light cream/warm-toned ghostly ornaments. This is a key technique — ONE set of SVGs works on both light and dark backgrounds by toggling the filter.

### Gold Hairline Rules

```css
.gold-line {
  display: block;
  width: 26px;
  height: 1px;
  background: #D4AF37;
  opacity: 0.25;
}

/* Global gold rule (used on site pages) */
.gold-rule {
  width: 40px;
  height: 1px;
  background: var(--gold);
  opacity: 0.45;
}
```

### Frame Ornaments (Gold Corner Brackets)

```css
/* Frame container */
.frame {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(212, 175, 55, 0.20);
  background: rgba(212, 175, 55, 0.04);
  transition: border-color 500ms;
}
.frame:hover { border-color: rgba(212, 175, 55, 0.35); }

/* Corner L-brackets — 4 per frame */
.frame-ornament {
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: rgba(212, 175, 55, 0.30);
  border-style: solid;
  border-width: 0;
  pointer-events: none;
  z-index: 2;
}
/* Each corner selectively enables 2 border sides: */
.frame-ornament--tl { top: 6px; left: 6px; border-top-width: 1px; border-left-width: 1px; }
.frame-ornament--tr { top: 6px; right: 6px; border-top-width: 1px; border-right-width: 1px; }
.frame-ornament--bl { bottom: 6px; left: 6px; border-bottom-width: 1px; border-left-width: 1px; }
.frame-ornament--br { bottom: 6px; right: 6px; border-bottom-width: 1px; border-right-width: 1px; }

/* Shimmer/shine overlay — diagonal light sweep */
.frame-shine {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background: linear-gradient(105deg,
    transparent 42%,
    rgba(255, 255, 255, 0.04) 48%,
    rgba(212, 175, 55, 0.03) 50%,
    rgba(255, 255, 255, 0.04) 52%,
    transparent 58%);
  animation: shim 8s 3s ease-in-out infinite;
}
@keyframes shim {
  0%, 100% { transform: translateX(-120%); }
  50%      { transform: translateX(220%); }
}
```

### Monogram

```css
.cover-monogram {
  width: clamp(200px, 50vw, 320px);
  color: rgba(255, 254, 251, 0.80);
  filter: drop-shadow(0 2px 30px rgba(0, 0, 0, 0.40));
}
```

---

## 5. PHOTO & VIDEO TREATMENT

### Consistent Filter Applied to All Media

```css
/* Applied to cover photo, frame videos, and zigzag photos */
filter: sepia(0.12) saturate(0.82) contrast(0.90) brightness(1.03);

/* What this does:
   - sepia(0.12): warm tint without yellow cast
   - saturate(0.82): desaturates slightly — editorial/film look
   - contrast(0.90): softens blacks/whites — no harsh edges
   - brightness(1.03): slight lift to prevent muddy darks
   
   Combined effect: "shot on medium format film, printed on matte paper"
*/
```

### Photo Aspect Ratios

```css
/* Cover photo */
object-fit: cover;
object-position: center 30%;      /* Crop from top — faces usually in upper third */

/* Frame videos (castle section) */
.frame--lg video { aspect-ratio: 16/9; }
.frame--sm video { aspect-ratio: 16/10; }

/* Zigzag photos */
aspect-ratio: 3/4;                /* Portrait crop — classic invitation format */
object-fit: cover;

/* Photo borders */
border: 1px solid rgba(212, 175, 55, 0.12);   /* Gold whisper border on photos */
```

### Photo Placeholder System (for site pages, not invitation)

```css
/* Warm gradient that reads as "intentional negative space" */
background: linear-gradient(135deg,
  rgba(74, 22, 25, 0.08) 0%,
  rgba(74, 22, 25, 0.03) 40%,
  rgba(74, 22, 25, 0.06) 100%);

/* Inner frame — 1px hairline inset 16px */
inset: 16px;
border: 1px solid rgba(74, 22, 25, 0.12);

/* On-dark variant */
background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.08) 0%,
  rgba(255, 255, 255, 0.02) 50%,
  rgba(255, 255, 255, 0.05) 100%);

/* Hero variant — radial, heavier */
background: radial-gradient(ellipse at center,
  rgba(74, 22, 25, 0.12) 0%,
  rgba(74, 22, 25, 0.35) 60%,
  rgba(74, 22, 25, 0.55) 100%);
```

---

## 6. ANIMATION & MOTION SYSTEM

### Core Easing Curve

```css
/* THE easing — used everywhere */
cubic-bezier(0.22, 1, 0.36, 1)
/* This is a custom ease-out with:
   - Fast start (0.22 control point)
   - Strong overshoot potential (1.0 y)
   - Smooth landing (0.36, 1)
   - Feels like "setting a letter down on a table"
*/
```

### Cover Open Transition

```css
/* Cover fade out */
.cover {
  transition: opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1);
}
.cover.out { opacity: 0; pointer-events: none; }

/* Photo push-back on exit */
.cover-photo img {
  transform: scale(1.02);                  /* Initial slight zoom */
  transition: transform 1200ms cubic-bezier(0.22, 1, 0.36, 1);
}
.cover.out .cover-photo img {
  transform: scale(1.06);                  /* Pushes back further — parallax feel */
}

/* Page entrance (after cover fades) */
.page {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1000ms 200ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 1000ms 200ms cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}
.page.show { opacity: 1; transform: none; pointer-events: all; }

/* JS timing:
   click → cover.classList.add('out')
   400ms → page.classList.add('show')
   2000ms → cover.remove()
*/
```

### Scroll Reveal Pattern

```css
/* Section reveals (invitation card) */
.rv {
  opacity: 0;
  transform: translateY(12px);             /* SUBTLE — only 12px lift */
  transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
}
.rv.show { opacity: 1; transform: none; }

/* Global reveals (site pages) — slightly more dramatic */
.reveal {
  opacity: 0;
  transform: translateY(24px);             /* 24px lift — double the invitation */
  transition:
    opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 1200ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}
.reveal.is-visible { opacity: 1; transform: none; }

/* Staggered children */
.reveal-stagger > * {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 900ms, transform 900ms;
  /* JS adds .is-visible with 150ms delay per child */
}
```

### IntersectionObserver Configuration

```javascript
// Invitation card reveals
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

// Site page reveals
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    // Stagger children if group
    if (entry.target.classList.contains('reveal-group')) {
      const kids = entry.target.querySelectorAll('.reveal-stagger > *');
      kids.forEach((kid, i) => {
        setTimeout(() => kid.classList.add('is-visible'), i * 150);
      });
    }
    io.unobserve(entry.target);
  });
}, {
  threshold: 0.25,
  rootMargin: '0px 0px -10% 0px',
});
```

### Hero Entrance Sequence (site pages)

```css
.hero .hero__eyebrow {
  opacity: 0; transform: translateY(20px);
  transition: opacity 800ms 200ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 800ms 200ms cubic-bezier(0.22, 1, 0.36, 1);
}

.hero .hero__wordmark {
  opacity: 0; transform: translateY(32px);
  transition: opacity 1400ms 600ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 1400ms 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.hero.is-ready .hero__eyebrow,
.hero.is-ready .hero__wordmark {
  opacity: 1; transform: none;
}

/* Desktop-only slow zoom on hero photo */
@media (hover: hover) and (pointer: fine) {
  @keyframes hero-zoom {
    from { transform: scale(1); }
    to   { transform: scale(1.04); }
  }
  .hero__photo {
    animation: hero-zoom 14s ease-in-out 1200ms infinite alternate;
  }
}
```

### Micro-Interactions

```css
/* Button gold underline draw-in */
.btn-ghost::after {
  /* ... positioned underline ... */
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}
.btn-ghost:hover::after { transform: scaleX(1); }

/* Nav link underline */
.site-nav__link::after {
  /* ... positioned underline ... */
  transform: scaleX(0);
  transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
}
.site-nav__link:hover::after { transform: scaleX(1); }

/* Color swatch hover */
.color-swatch { transition: transform 300ms ease; }
.color-swatch:hover { transform: scale(1.15); }

/* FAQ number hover */
.faq-item .faq-number { transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1); }
.faq-item:hover .faq-number { transform: scale(1.08); }

/* Cover button hover */
.cover-btn { transition: border-color 600ms, color 600ms, background 600ms; }
.cover-btn:hover {
  border-color: rgba(255, 255, 255, 0.45);
  color: rgba(255, 255, 255, 0.80);
  background: rgba(255, 255, 255, 0.05);
}

/* Frame hover */
.frame { transition: border-color 500ms; }
.frame:hover { border-color: rgba(212, 175, 55, 0.35); }

/* Link hover */
.lnk a { transition: color 300ms, border-bottom-color 300ms; }
.lnk a:hover {
  color: rgba(255, 254, 251, 0.75);
  border-bottom-color: rgba(212, 175, 55, 0.20);
}
```

### Motion Duration Ladder

```
300ms  — micro-interactions (swatch scale, input focus, form transitions)
400ms  — nav scroll state, page entrance delay
500ms  — nav link underline, frame border hover
600ms  — button transitions (cover btn, ghost btn, FAQ number)
800ms  — hero eyebrow entrance
900ms  — scroll reveals (invitation sections)
1000ms — page entrance (after cover)
1200ms — cover fadeout, global reveals, hero zoom start delay
1400ms — hero wordmark entrance
8000ms — frame shine sweep (cycle)
14000s — hero photo zoom (cycle, desktop only)
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .rv { opacity: 1; transform: none; }
  .page { opacity: 1; transform: none; pointer-events: all; }
  .cover { display: none; }   /* Skip cover entirely */
}

/* Also: touch devices skip heavy motion */
@media (hover: none) and (pointer: coarse) {
  .hero__photo { animation: none !important; }
  .photo-placeholder { animation: none !important; }
}
```

---

## 7. FORM STYLING — RSVP on Dark Background

### Input Fields

```css
.f input, .f select, .f textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid rgba(255, 254, 251, 0.08);
  border-radius: 0;                /* Sharp corners — editorial, not app-like */
  font-family: 'Fraunces', serif;
  font-weight: 300;
  font-size: 14px;
  color: #FFFEFB;
  background: rgba(255, 255, 255, 0.04);
  outline: none;
  transition: border-color 300ms, box-shadow 300ms;
  -webkit-appearance: none;        /* Remove iOS default styling */
}

/* Placeholder text */
.f input::placeholder,
.f textarea::placeholder {
  color: rgba(255, 254, 251, 0.15);
}

/* Focus state — gold accent */
.f input:focus, .f select:focus, .f textarea:focus {
  border-color: rgba(212, 175, 55, 0.25);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.04);
}

/* Select dropdown */
.f select {
  color: rgba(255, 254, 251, 0.70);
}
.f select option {
  background: #3A1013;             /* Match page bg */
  color: #FFFEFB;
}

/* Textarea */
.f textarea {
  resize: vertical;
  min-height: 50px;
}

/* Form labels */
.f label {
  display: block;
  margin-bottom: 5px;
  /* Uses .lbl .lbl--dim class:
     font-family: Inter; weight: 300; size: 9px;
     text-transform: uppercase; letter-spacing: .45em;
     color: rgba(255,254,251,.28); */
}

/* Form field spacing */
.f { margin-bottom: 14px; }

/* Two-column row */
.f-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (max-width: 400px) {
  .f-row { grid-template-columns: 1fr; }
}
```

### Submit Button

```css
.submit-btn {
  width: 100%;
  padding: 14px;
  background: rgba(212, 175, 55, 0.12);
  color: rgba(255, 254, 251, 0.60);
  border: 1px solid rgba(212, 175, 55, 0.20);
  cursor: pointer;
  letter-spacing: 0.35em;
  margin-top: 6px;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 9px;
  text-transform: uppercase;
  transition: background 300ms, color 300ms, border-color 300ms;
}
.submit-btn:hover {
  background: rgba(212, 175, 55, 0.20);
  color: rgba(255, 254, 251, 0.80);
  border-color: rgba(212, 175, 55, 0.35);
}
```

### Ghost Button (site pages)

```css
.btn-ghost {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 13px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 14px 36px;
  border: 1px solid currentColor;
  background: transparent;
  transition: background 600ms ease, color 600ms ease;
}

/* Mobile tap target */
@media (max-width: 768px) {
  .btn-ghost {
    min-height: 48px;
    padding: 16px 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
```

---

## 8. SPACING SYSTEM

### Section Spacing (global.css — site pages)

```css
--section-v-desktop: 140px;
--section-v-mobile:  80px;
--content-max:       640px;
--site-max:          1200px;
--site-gutter:       clamp(24px, 6vw, 80px);
--nav-height:        72px;
```

### Invitation Spacing (convite.astro)

```css
/* Page-level */
page-padding-top:    60px (mobile), 80px (640px+)
page-padding-bottom: 48px (mobile), 64px (640px+)
page-max-width:      520px
section-gap:         32px (flex gap)
section-padding-h:   24px

/* Names section */
leaf-accent-margin-bottom:   12px
ampersand-margin:            6px 0

/* Date section */
date-row-gap:                18px
date-col-gap:                5px
date-label-margin-top:       12px
tiny-note-margin-top:        4px

/* Details section */
detail-columns-gap:          24px (desktop), 20px (mobile stacked)
detail-name-margin:          8px 0 6px
detail-separator-width:      1px (vert), 36px (horiz mobile)

/* Color swatches */
swatch-gap:                  12px
swatch-note-margin-top:      10px

/* Castle frames */
frame-pair-gap:              8px
frame-lg-margin-bottom:      8px

/* Zigzag photos */
zigzag-gap:                  28px
zigzag-item-gap:             16px
zigzag-text-padding:         0 8px

/* Countdown */
countdown-grid-gap:          6px
countdown-max-width:         280px

/* RSVP form */
field-margin-bottom:         14px
field-label-margin-bottom:   5px
field-row-gap:               12px
submit-margin-top:           6px
rsvp-heading-margin-bottom:  24px

/* Success state */
success-padding:             28px 0
success-heading-margin-bottom: 8px

/* Links */
link-row-gap:                10px

/* Footer */
footer-margin-top:           40px
footer-padding-bottom:       24px
rose-margin-bottom:          16px (implicit via margin-top on date)
```

---

## 9. NAV SYSTEM — Scroll-Responsive

```css
/* Scroll-driven state transitions */
.site-nav {
  transition:
    transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 400ms ease,
    backdrop-filter 400ms ease;
}

/* Hide on scroll down (after 120px, with 80px hysteresis) */
.site-nav.is-hidden { transform: translateY(-100%); }

/* Backdrop blur after 40px scroll */
.site-nav.is-scrolled {
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
}

/* Dark page variant (FAQ, presentes) */
body.page-dark .site-nav.is-scrolled {
  background: rgba(74, 22, 25, 0.72);
}

/* Light page variant (sobre-nos) */
.site-nav.site-nav--light.is-scrolled {
  background: rgba(255, 255, 255, 0.78);
}

/* Default (index) — burgundy tint */
body:not(.page-dark) .site-nav:not(.site-nav--light).is-scrolled {
  background: rgba(74, 22, 25, 0.72);
}

/* Mobile drawer */
body.drawer-open { overflow: hidden; touch-action: none; }
body.drawer-open::before {
  /* Full-screen backdrop */
  position: fixed;
  inset: var(--nav-height) 0 0 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
  z-index: 99;
  animation: backdrop-in 300ms ease forwards;
}
```

---

## 10. MOTION STACK DETECTED

| Library | Status | Evidence |
|---------|--------|----------|
| Lenis 1.1.13 | Present but DISABLED | CDN load in motion.ts, `initLenis()` commented out — "was causing infinite scroll feel" |
| GSAP | Not used | — |
| Three.js | Not used | — |
| Framer Motion | Not used | — |
| Custom IntersectionObserver | Active | Two separate IO implementations (convite.astro + motion.ts) |
| CSS transitions/animations | Active | All motion is pure CSS with JS class toggling |
| requestAnimationFrame | Active | Countdown animation (0-to-target ease-out cubic over 1500ms) |

**Motion philosophy**: Zero JS animation libraries. All motion is CSS transitions triggered by JS class additions via IntersectionObserver. This is intentional — "editorial calm" means the browser's compositor handles all animation, resulting in guaranteed 60fps with zero bundle cost.

---

## 11. PREMIUM PATTERNS — What to Steal from References

### From Minted / Letterpress Tradition
- **Double inner border**: outer at inset 12px, inner at inset 20px — both gold at 0.08-0.14 opacity
- **Paper texture overlay**: CSS noise grain at 2-3% opacity for tactile feel
- **Foil stamp simulation**: Gold elements with very subtle `text-shadow: 0 0 8px rgba(212,175,55,0.15)`

### From Paperless Post
- **Envelope open metaphor**: The cover-to-scroll transition already does this — could add a more literal envelope fold animation
- **Liner reveal**: After envelope opens, a brief flash of pattern (botanical or solid) before card appears

### From Premium Digital Invitations (Anouk, Blahaus concept)
- **Ambient light on photos**: Subtle radial gradient overlays on photo edges that simulate vignetting
- **Stationery suite consistency**: Same border, ornament, and monogram system across invitation/RSVP/details/registry pages
- **"Sealed" feel**: The cover photo + "Abrir convite" button IS the seal — this is already implemented correctly

### From Zola Dark Templates
- **"Dark realistic florals with bold type"**: The dark scroll (#3A1013) with Fraunces italic at weight 200 achieves this exact aesthetic
- **Navy alternative**: Could offer a `--navy: #1a2744` variant for a cooler dark mode

### Key Insight from All References
The difference between a $2 template and a $200 custom invitation is:
1. **Opacity discipline** — never raw color on accents
2. **Type scale ratio** — 10:1 between largest and smallest element
3. **Negative space** — 40%+ of visible area is breathing room
4. **Consistent filter** — ALL photos through the same sepia/desat/contrast filter
5. **One animation curve** — every motion uses the same easing, just different durations

---

## 12. ACCESSIBILITY

```css
/* Screen reader only */
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;
}

/* Focus visible styling */
.btn-ghost:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

/* Reduced motion — all motion instantly completes */
/* Touch device — heavy animations disabled */
/* Skip link on site pages */
/* aria-label, aria-hidden, aria-live attributes on key sections */
/* tabular-nums for countdown (prevents layout shift) */
/* min-height 48px on mobile buttons (touch target) */
```

---

## 13. CROSS-REFERENCE: CONVITE vs SITE PAGES

| Aspect | Convite (dark scroll) | Site Pages (light/mixed) |
|--------|----------------------|--------------------------|
| Background | #3A1013 (near-black crimson) | var(--white) / var(--burgundy) alternating |
| Text color | Cream at various opacities | Burgundy at various opacities |
| Gold accent | Labels + ornaments | Rules + CTAs |
| Max width | 520px | 1200px (site-max) |
| Section gap | 32px flex gap | 140px/80px padding |
| Reveals | .rv / .show (12px, 900ms) | .reveal / .is-visible (24px, 1200ms) |
| IO threshold | 0.1 | 0.25 with -10% rootMargin |
| Nav | Hidden (cover-based) | Visible with scroll hide/show |
| Typography | Inline <style> | global.css classes |

The invitation is a self-contained dark experience that shares the same font files and easing curve with the site pages but uses its own color system, spacing, and reveal patterns optimized for the single-column mobile scroll format.
