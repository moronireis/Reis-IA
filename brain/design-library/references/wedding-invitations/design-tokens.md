# Wedding Invitation Design Tokens — Premium Pattern Report
## Last updated: 2026-04-23
## Sources: withjoy.com, zola.com, minted.com, paperlesspost.com, awwwards.com/wedding
## Purpose: Actionable CSS values and design rules to elevate the Moroni & Daphine digital invitation

---

## 1. WHAT MAKES INVITATIONS FEEL PREMIUM VS CHEAP

### The 6 Premium Signals (ranked by impact)

1. **Generous white space** — Premium invitations use 2-3x more padding than you think necessary. The card should breathe. Content occupies ~55-60% of card area; the rest is negative space.
2. **Restrained opacity layers** — Gold and decorative elements at 15-30% opacity, never full saturation. The accent whispers, never shouts.
3. **Extreme typographic hierarchy** — The ratio between the largest element (names or date number) and the smallest (labels) should be at least 6:1. Premium is closer to 10:1.
4. **Hairline borders, not thick frames** — 1px max, at 10-20% opacity. The border suggests structure without demanding attention.
5. **Botanical elements as negative-space fillers** — Florals occupy corners and edges, never competing with text. They fill the margins the eye would otherwise find empty.
6. **Monogram as architectural centerpiece** — Not just initials in a circle. A monogram should be a composition element that establishes the card's visual axis.

### The 5 "Cheap" Tells to Eliminate

1. Decorative elements at full opacity (anything above 40% for non-text ornaments)
2. Too many competing focal points (more than 2 things demanding equal attention)
3. Uniform spacing (every gap the same size reads as template, not designed)
4. Botanicals that look clip-art-ish (low detail, uniform stroke weight, symmetrical)
5. Monogram that reads as afterthought (small, generic circle, no integration with overall composition)

---

## 2. TYPOGRAPHY TOKENS — Premium Invitation Hierarchy

### Current State Analysis (convite.astro)

The current implementation is solid but can be improved in these areas:

| Element | Current | Premium Target | Issue |
|---------|---------|---------------|-------|
| Names | clamp(28px, 6vw, 44px) | clamp(32px, 7vw, 52px) | Slightly undersized; names should dominate more |
| Ampersand | clamp(16px, 3vw, 22px) | clamp(18px, 3.5vw, 26px) | Good ratio but could be slightly larger for elegance |
| Date number | clamp(64px, 14vw, 96px) | Keep as is | This is the strongest element; correct |
| Section titles | 10px micro | 10px | Correct — these should be the smallest |
| Eyebrow | 9px nano | 9px | Correct |

### Recommended Typography Scale for Invitation Cards

```css
/* INVITATION-SPECIFIC TYPE SCALE */
--inv-names:        clamp(32px, 7vw, 52px);    /* Couple names — the stars */
--inv-amp:          clamp(18px, 3.5vw, 26px);  /* Ampersand — decorative connector */
--inv-date-hero:    clamp(64px, 14vw, 96px);   /* Big date number — anchor */
--inv-date-text:    13px;                        /* Month/year labels */
--inv-section:      10px;                        /* Section headers (DETALHES, O LOCAL) */
--inv-body:         15px;                        /* Body text, detail values */
--inv-body-italic:  15px;                        /* Italic body (messages, notes) */
--inv-eyebrow:      9px;                         /* Top invitation line */
--inv-footer:       9px;                         /* Bottom date in roman numerals */
--inv-rsvp-title:   clamp(24px, 5.5vw, 34px);  /* RSVP heading — slightly larger than current */
--inv-countdown:    clamp(36px, 8vw, 52px);     /* Countdown numbers — slightly larger */
```

### Font Settings for Maximum Premium Feel

```css
/* Names — the signature element */
.card__name {
  font-family: 'Fraunces', serif;
  font-weight: 200;                              /* Lightest available — maximum elegance */
  font-style: italic;
  font-variation-settings: "opsz" 144, "SOFT" 50;
  font-size: var(--inv-names);
  letter-spacing: 0.04em;                        /* INCREASE from 0.03em — more air between letters */
  line-height: 1.12;                             /* TIGHTEN slightly from 1.15 */
}

/* Ampersand — decorative, should feel like calligraphy */
.card__amp {
  font-family: 'Fraunces', serif;
  font-weight: 200;                              /* Match names weight, not 300 */
  font-style: italic;
  font-variation-settings: "opsz" 144, "SOFT" 100; /* MAX SOFT for ampersand — rounder, more ornamental */
  font-size: var(--inv-amp);
  color: var(--gold);
  opacity: 0.55;                                 /* REDUCE from 0.65 — more subtle */
  line-height: 1;
  margin: 6px 0;                                 /* INCREASE from 4px — more breathing room */
}

/* Label text (Inter) — the invisible structure */
.i-label, .i-micro, .i-nano {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  /* KEY INSIGHT: letter-spacing is the premium lever for labels */
  /* 0.30em minimum, 0.40em for tiny text, 0.50em for hero labels */
}
```

### Typography Rules from Premium References

1. **Fraunces opsz 144 for display, opsz 14 for body** — already correct in your system
2. **SOFT axis**: use 50 for names/dates (structured elegance), 100 for ampersand/decorative (organic warmth)
3. **Weight 200 for everything display** — never go above 300 on the invitation card; heavier weights read as corporate
4. **Inter at weight 300 only** — weight 400 is too heavy for label text on invitations
5. **Letter-spacing progression**: 0.02-0.04em for Fraunces display, 0.30-0.50em for Inter labels (this contrast signals craft)

---

## 3. COLOR TOKENS — Opacity is Everything

### Current Palette (correct, keep as-is)

```css
--burgundy:   #4A1619;
--white:       #FFFFFF;
--gold:        #D4AF37;
```

### The Opacity System — What Premium Sites Teach

Premium wedding sites use a strict opacity ladder. The key insight: **no element uses raw color except the couple's names and the primary CTA button**. Everything else is layered through opacity.

```css
/* BURGUNDY OPACITY LADDER (on white background) */
--inv-text-primary:     rgba(74, 22, 25, 1.00);   /* Names ONLY */
--inv-text-strong:      rgba(74, 22, 25, 0.85);   /* Date number, RSVP title */
--inv-text-body:        rgba(74, 22, 25, 0.70);   /* Body text, detail values, messages */
--inv-text-secondary:   rgba(74, 22, 25, 0.55);   /* Year, time, detail notes */
--inv-text-label:       rgba(74, 22, 25, 0.40);   /* Section titles, form labels */
--inv-text-ghost:       rgba(74, 22, 25, 0.30);   /* Footer, placeholder text */
--inv-text-whisper:     rgba(74, 22, 25, 0.18);   /* Barely-there decorative text */

/* GOLD OPACITY LADDER */
--inv-gold-accent:      rgba(212, 175, 55, 0.55);  /* Ampersand, icon fills */
--inv-gold-rule:        rgba(212, 175, 55, 0.40);  /* Hairline rules */
--inv-gold-border:      rgba(212, 175, 55, 0.20);  /* Card inner border */
--inv-gold-hint:        rgba(212, 175, 55, 0.12);  /* Photo/video borders */
--inv-gold-ghost:       rgba(212, 175, 55, 0.08);  /* Barely visible structural lines */

/* BURGUNDY STRUCTURAL (borders, dividers, backgrounds) */
--inv-border-soft:      rgba(74, 22, 25, 0.06);   /* Section dividers, link borders */
--inv-border-medium:    rgba(74, 22, 25, 0.12);   /* Detail cards, form inputs */
--inv-bg-hover:         rgba(74, 22, 25, 0.02);   /* Link hover states */
--inv-bg-tint:          rgba(74, 22, 25, 0.04);   /* Alternating section backgrounds */
```

### Color Usage Rules

1. **Names at 100% opacity** — the only element allowed full saturation burgundy
2. **Date number at 85-100%** — second strongest element
3. **Body text never above 70%** — creates the "printed on fine paper" feel
4. **Labels at 40%** — they guide the eye without competing
5. **Gold accents at 20-55%** — never full saturation gold; it reads as cheap/gaudy
6. **Borders at 6-20%** — they should be felt, not seen
7. **Background page color #F5F0EB** — correct warm off-white; reads as linen/cotton paper

---

## 4. LAYOUT TOKENS — Card Proportions & Spacing

### Card Dimensions

```css
/* Standard invitation card proportions */
--inv-card-max-width:     620px;   /* Current — correct for mobile-first digital */
--inv-card-padding-v:     clamp(48px, 10vw, 88px);  /* INCREASE from clamp(40px, 8vw, 80px) */
--inv-card-padding-h:     clamp(32px, 7vw, 64px);   /* INCREASE from clamp(28px, 6vw, 60px) */

/* The key ratio: vertical padding should be ~1.3x horizontal padding */
/* This creates the tall, elegant proportion of physical invitations */
```

### Spacing Rhythm

Premium invitations use a rhythmic spacing system, not uniform gaps. The pattern:

```css
/* SPACING SCALE — alternating tight/generous creates rhythm */
--inv-gap-xs:    4px;    /* Between name and ampersand */
--inv-gap-sm:    8px;    /* Between date rule and month/year */
--inv-gap-md:    16px;   /* Between form fields, countdown label to grid */
--inv-gap-lg:    24px;   /* Between eyebrow and monogram, section title to content */
--inv-gap-xl:    32px;   /* Between monogram and names, names and divider */
--inv-gap-2xl:   40px;   /* Between major sections (photo, details, venue, countdown) */
--inv-gap-3xl:   48px;   /* Before/after RSVP, countdown bottom margin */
--inv-gap-4xl:   56px;   /* Between the card and next major section on long-scroll */
```

### Spacing Rules

1. **Section-to-section: 40px minimum** — current implementation is correct
2. **Title-to-content: 24px** — current is correct
3. **Related elements: 4-8px** — tight coupling (name/ampersand, month/rule/year)
4. **Between decorative dividers: 8px top, 28px bottom** — asymmetric; the space after a divider is larger because it introduces new content

### Card Shadow (Premium vs Current)

```css
/* Current (good but can be refined) */
box-shadow:
  0 2px 8px rgba(74, 22, 25, 0.06),
  0 12px 48px rgba(74, 22, 25, 0.08);

/* Premium upgrade — add a third ultra-soft layer for depth */
box-shadow:
  0 1px 3px rgba(74, 22, 25, 0.04),     /* Tight contact shadow */
  0 8px 24px rgba(74, 22, 25, 0.06),     /* Mid-range ambient */
  0 24px 64px rgba(74, 22, 25, 0.08);    /* Wide atmospheric glow */
```

---

## 5. DECORATIVE ELEMENT TOKENS

### Botanical Corner Ornament Rules

```css
/* Corner ornaments — the framing system */
.card__corner {
  width: clamp(70px, 16vw, 120px);  /* INCREASE from clamp(60px, 14vw, 100px) */
  opacity: 0.12;                     /* REDUCE from 0.18 — more ghostly = more premium */
  /* Position: overflow the card edge slightly (-10px to -12px) */
  /* This creates the illusion that botanicals extend beyond the card boundary */
}
```

### Botanical Placement Rules from Premium References

1. **Corners: symmetrical, low opacity (10-15%)** — they are architectural, not illustrative
2. **Dividers: centered, medium opacity (20-25%)** — they separate sections with grace
3. **Footer rose: smallest, lowest opacity (12-15%)** — a whispered signature
4. **RSVP tulip: medium size, low opacity (15-18%)** — introduces the section gently
5. **Envelope rose: larger, medium opacity (50-55%)** — this is the first thing seen, can be bolder

### The Golden Rule of Botanical Elements

**Scale inversely with proximity to text.** Botanicals near text (dividers, RSVP tulip) should be smaller and more transparent than botanicals in empty space (corners, footer). This prevents competition with readable content.

```css
/* Size/opacity matrix for botanical elements */
/* Near text:     width 48-80px,    opacity 0.15-0.20 */
/* Edge/corner:   width 80-120px,   opacity 0.10-0.15 */
/* Standalone:    width 120-200px,  opacity 0.20-0.30 */
/* Envelope:      width 60-100px,   opacity 0.45-0.60 (darker bg) */
```

### Inner Border

```css
.card__border {
  inset: 14px;                                    /* INCREASE from 12px — slightly more inset */
  border: 1px solid rgba(212, 175, 55, 0.16);    /* REDUCE from 0.20 — even more subtle */
  /* Premium option: use a double border */
  /* outer at inset 14px, inner at inset 22px, both at 0.12-0.16 opacity */
}

/* DOUBLE BORDER — premium technique from Minted/letterpress designs */
.card__border-outer {
  position: absolute;
  inset: 12px;
  border: 1px solid rgba(212, 175, 55, 0.14);
}
.card__border-inner {
  position: absolute;
  inset: 20px;
  border: 1px solid rgba(212, 175, 55, 0.08);
}
```

---

## 6. MONOGRAM TOKENS

### Current Issue

The monogram is loaded as an SVG image at `min(280px, 60vw)`. Without seeing the SVG, the key rules for making monograms feel premium:

### Premium Monogram Rules

```css
/* SIZE: monogram should be 35-45% of card content width */
/* On a 620px card with 64px horizontal padding, content width is ~492px */
/* So monogram should be 170-220px — current 280px may be too large */
.card__monogram {
  width: min(200px, 45vw);    /* REDUCE from min(280px, 60vw) */
  margin-bottom: 28px;        /* REDUCE from 32px — tighter to names */
}

/* MONOGRAM COMPOSITION RULES (for the SVG itself): */
/* 1. Initials should be 60-70% of the frame height */
/* 2. Botanical frame should have asymmetry — not perfectly circular */
/* 3. Stroke weight: 0.5-1px for frame, 1-1.5px for letters */
/* 4. The ampersand or connecting element between letters should be */
/*    distinctly smaller (40-50% of initial height) */
/* 5. Color: monochrome burgundy, NOT multi-color */
/* 6. Frame botanicals should be looser/organic, not geometric */
```

### Monogram Opacity Pattern

```css
/* Monogram on white card: burgundy at 85-100% */
/* Monogram on envelope (burgundy bg): white at 55-65% or gold at 45-55% */
/* Monogram should NEVER have a visible container/background */
/* The SVG should be just strokes/paths, no filled background shapes */
```

---

## 7. MOTION TOKENS — Invitation-Specific

### Current (mostly correct)

The implementation already uses good easing and timing. Refinements:

```css
/* ENVELOPE OPEN — increase drama */
--inv-envelope-duration:    900ms;    /* INCREASE from 800ms — slower = more ceremonial */
--inv-envelope-easing:      cubic-bezier(0.22, 1, 0.36, 1);  /* Keep */
--inv-envelope-scale:       1.05;     /* REDUCE from 1.08 — subtler exit */

/* CARD ENTRANCE */
--inv-card-delay:           500ms;    /* INCREASE from 400ms — let envelope fully fade */
--inv-card-duration:        1400ms;   /* INCREASE from 1200ms — grand entrance */
--inv-card-lift:            32px;     /* REDUCE from 40px — less aggressive */

/* SCROLL REVEALS — slow, stately */
--inv-reveal-duration:      1000ms;   /* INCREASE from 900ms */
--inv-reveal-lift:          16px;     /* REDUCE from 20px — gentler entrance */
--inv-reveal-stagger:       120ms;    /* INCREASE from 80ms — more deliberate cascade */
--inv-reveal-easing:        cubic-bezier(0.22, 1, 0.36, 1);  /* Keep */

/* ENVELOPE FLOAT — the rose animation */
--inv-float-duration:       5s;       /* INCREASE from 4s — slower = more serene */
--inv-float-distance:       4px;      /* REDUCE from 6px — barely perceptible */

/* COUNTDOWN — tabular numeral transitions */
/* Add a subtle fade when numbers change */
--inv-countdown-transition: opacity 300ms ease;
```

### Motion Philosophy for Wedding Invitations

1. **Everything slower than you think** — invitation animations should feel like unfolding a letter, not loading a webpage
2. **Smaller movements** — 16-24px translateY max; large movements feel digital/app-like
3. **Longer durations** — 900-1400ms for reveals; fast animations feel cheap
4. **No bounce or elastic easing** — only ease-out curves; cubic-bezier(0.22, 1, 0.36, 1) is perfect
5. **Stagger at 100-150ms** — fast enough to feel connected, slow enough to feel intentional

---

## 8. FORM TOKENS — RSVP Premium Treatment

### Input Styling

```css
.card__field input,
.card__field select,
.card__field textarea {
  padding: 14px 16px;                             /* INCREASE from 12px 14px — more generous */
  border: 1px solid rgba(74, 22, 25, 0.10);       /* REDUCE from 0.12 */
  border-radius: 0;                                /* CHANGE from 2px — sharp corners are more premium/editorial */
  font-family: 'Fraunces', serif;
  font-weight: 300;
  font-size: 15px;
  color: var(--burgundy);
  background: transparent;                         /* CHANGE from var(--white) — let card bg show through */
  letter-spacing: 0.02em;                          /* ADD — slight tracking for elegance */
  transition: border-color 400ms ease;             /* SLOWER from 300ms */
}

/* Focus: gold border, not just brighter */
.card__field input:focus,
.card__field select:focus,
.card__field textarea:focus {
  border-color: rgba(212, 175, 55, 0.45);         /* REDUCE from 0.50 */
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.06); /* ADD — ultra-subtle gold glow */
}
```

### Submit Button

```css
.card__rsvp-btn {
  padding: 16px;                                   /* INCREASE from 14px */
  background: var(--burgundy);
  color: var(--white);
  border: none;
  border-radius: 0;                                /* Sharp corners */
  letter-spacing: 0.35em;                          /* ADD — wide tracking like other labels */
  font-size: 10px;                                 /* Smaller, more refined */
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity 400ms ease, background 400ms ease;
}

.card__rsvp-btn:hover {
  opacity: 0.92;                                   /* INCREASE from 0.88 — subtler hover */
}
```

---

## 9. RESPONSIVE TOKENS

### Breakpoint Strategy

```css
/* Wedding invitation responsive approach: */
/* Mobile (< 400px):  single column everything, reduce padding aggressively */
/* Phablet (400-540px): default mobile, slight padding increase */
/* Tablet (540-768px): comfortable reading width, max visual impact */
/* Desktop (768+): card floats in center of page with generous margins */

@media (min-width: 540px) {
  /* Card padding increases — more white space on larger screens */
  .card { padding: 64px 48px; }
}

@media (min-width: 768px) {
  /* Peak presentation — card at ideal reading width */
  .card { padding: 80px 64px; }
  /* Page background visible around card — this is where the card "floats" */
  .card-wrapper { padding: 48px 24px; }
}
```

---

## 10. SPECIFIC IMPROVEMENTS FOR MORONI & DAPHINE

### Priority 1 — Immediate CSS Changes (highest impact, easiest to apply)

1. **Increase card padding** — `clamp(48px, 10vw, 88px)` vertical, `clamp(32px, 7vw, 64px)` horizontal
2. **Reduce corner ornament opacity** — from 0.18 to 0.12
3. **Increase corner ornament size** — from `clamp(60px, 14vw, 100px)` to `clamp(70px, 16vw, 120px)`
4. **Slow down all reveal animations** — duration to 1000ms, lift to 16px, stagger to 120ms
5. **Make card shadow deeper** — add third layer (0 24px 64px rgba(74,22,25,0.08))
6. **Increase name letter-spacing** — from 0.03em to 0.04em
7. **Reduce ampersand opacity** — from 0.65 to 0.55
8. **Sharp corners on form inputs** — border-radius: 0 instead of 2px

### Priority 2 — Structural Improvements

1. **Reduce monogram size** — from min(280px, 60vw) to min(200px, 45vw) if it currently overwhelms the card
2. **Add double inner border** — outer at inset 12px, inner at inset 20px (both gold, very low opacity)
3. **Increase RSVP title size** — clamp(24px, 5.5vw, 34px)
4. **Increase countdown number size** — clamp(36px, 8vw, 52px)
5. **Add ultra-subtle gold glow on focus** — box-shadow: 0 0 0 3px rgba(212,175,55,0.06)

### Priority 3 — SVG/Asset Improvements

1. **Monogram SVG** — needs asymmetric botanical frame (not geometric circle), thinner strokes (0.5-1px), initials at 65% of frame height
2. **Corner ornaments** — should have varied stroke weights (thicker stems, thinner leaves/petals), organic asymmetry
3. **Divider SVGs** — horizontal, max 70vw width, organic not geometric, varied opacity in different parts of the element
4. **All botanicals** — monochrome burgundy (not multi-color), line art style (not filled shapes), organic variation in stroke weight

---

## 11. REFERENCE CSS CUSTOM PROPERTIES — COMPLETE SYSTEM

```css
/* Copy this block into global.css or convite.astro <style> */

:root {
  /* ── Core palette (unchanged) ── */
  --burgundy:     #4A1619;
  --white:        #FFFFFF;
  --gold:         #D4AF37;
  --paper:        #F5F0EB;

  /* ── Text opacity ladder ── */
  --inv-text-100:   rgba(74, 22, 25, 1.00);
  --inv-text-85:    rgba(74, 22, 25, 0.85);
  --inv-text-70:    rgba(74, 22, 25, 0.70);
  --inv-text-55:    rgba(74, 22, 25, 0.55);
  --inv-text-40:    rgba(74, 22, 25, 0.40);
  --inv-text-30:    rgba(74, 22, 25, 0.30);
  --inv-text-18:    rgba(74, 22, 25, 0.18);

  /* ── Gold opacity ladder ── */
  --inv-gold-55:    rgba(212, 175, 55, 0.55);
  --inv-gold-40:    rgba(212, 175, 55, 0.40);
  --inv-gold-20:    rgba(212, 175, 55, 0.20);
  --inv-gold-14:    rgba(212, 175, 55, 0.14);
  --inv-gold-08:    rgba(212, 175, 55, 0.08);

  /* ── Structural opacity ── */
  --inv-border-06:  rgba(74, 22, 25, 0.06);
  --inv-border-10:  rgba(74, 22, 25, 0.10);
  --inv-border-12:  rgba(74, 22, 25, 0.12);

  /* ── Invitation type scale ── */
  --inv-names:       clamp(32px, 7vw, 52px);
  --inv-amp:         clamp(18px, 3.5vw, 26px);
  --inv-date-hero:   clamp(64px, 14vw, 96px);
  --inv-date-label:  13px;
  --inv-section:     10px;
  --inv-body:        15px;
  --inv-eyebrow:     9px;
  --inv-rsvp-title:  clamp(24px, 5.5vw, 34px);
  --inv-countdown:   clamp(36px, 8vw, 52px);

  /* ── Card layout ── */
  --inv-card-max:    620px;
  --inv-card-pad-v:  clamp(48px, 10vw, 88px);
  --inv-card-pad-h:  clamp(32px, 7vw, 64px);
  --inv-border-inset-outer: 12px;
  --inv-border-inset-inner: 20px;

  /* ── Spacing scale ── */
  --inv-gap-xs:   4px;
  --inv-gap-sm:   8px;
  --inv-gap-md:   16px;
  --inv-gap-lg:   24px;
  --inv-gap-xl:   32px;
  --inv-gap-2xl:  40px;
  --inv-gap-3xl:  48px;

  /* ── Motion ── */
  --inv-ease:              cubic-bezier(0.22, 1, 0.36, 1);
  --inv-envelope-dur:      900ms;
  --inv-card-dur:          1400ms;
  --inv-card-delay:        500ms;
  --inv-reveal-dur:        1000ms;
  --inv-reveal-lift:       16px;
  --inv-reveal-stagger:    120ms;
  --inv-float-dur:         5s;

  /* ── Botanical element sizing ── */
  --inv-corner-size:       clamp(70px, 16vw, 120px);
  --inv-corner-opacity:    0.12;
  --inv-divider-width:     min(320px, 70vw);
  --inv-divider-opacity:   0.22;
  --inv-monogram-size:     min(200px, 45vw);
  --inv-leaf-width:        min(200px, 50vw);
  --inv-leaf-opacity:      0.18;
  --inv-tulip-size:        48px;
  --inv-tulip-opacity:     0.16;
  --inv-footer-rose-size:  56px;
  --inv-footer-opacity:    0.13;

  /* ── Card shadow ── */
  --inv-shadow:
    0 1px 3px rgba(74, 22, 25, 0.04),
    0 8px 24px rgba(74, 22, 25, 0.06),
    0 24px 64px rgba(74, 22, 25, 0.08);
}
```

---

## 12. CROSS-REFERENCE: MORONI & DAPHINE VS REIS [IA]

This invitation exists in a different design universe from the REIS [IA] ecosystem:

| Aspect | Moroni & Daphine | REIS [IA] |
|--------|-----------------|-----------|
| Mode | Light (warm white) | Dark (black) |
| Primary font | Fraunces (serif, variable) | Inter (sans-serif) |
| Palette | Burgundy + Gold + White | Black + White + #4A90FF |
| Aesthetic | Organic, botanical, editorial | Geometric, minimal, tech |
| Motion | Slow, ceremonial (900-1400ms) | Snappy, editorial (600-900ms) |
| Borders | 1px gold hairlines | 1px white/blue hairlines |

No cross-contamination risk. The wedding project is a standalone Astro site at `/moroniedaphine/` with its own design tokens. The only shared pattern is the use of cubic-bezier(0.22, 1, 0.36, 1) for easing, which is a universal premium curve.
