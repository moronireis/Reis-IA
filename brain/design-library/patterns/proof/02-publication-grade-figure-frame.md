# Publication-Grade Figure Frame

**Category**: proof
**Difficulty**: basic (component-level), architectural (implication — it sets the visual grammar for all proof)
**Dependencies**: None. HTML `<figure>` + CSS. No libraries.

**Use when**: Every proof element in REIS [IA]. Case-study metrics, ROI numbers, before/after comparisons, pillar statistics, charts, tables of outcomes. If it is proof, it lives in this frame.

## What it is

A `<figure>` component that treats every data display as if it were pulled from the Financial Times or a Bloomberg terminal: small mono figure number, the data itself, a caption line in editorial voice, and a source line in muted type. A hairline border at `rgba(255,255,255,0.06)`, generous internal padding, `font-variant-numeric: tabular-nums` baked in, and Inter set at editorial weights. No shadows, no glows, no SaaS card lift.

This is the **default container** for REIS proof. Number tickers, charts, comparison tables, testimonial quotes — they all go inside this frame. The frame is what makes them read as *cited evidence* instead of *marketing assets*.

## Why REIS-grade

- **Publication cadence, not dashboard cadence** — every proof element announces *this is being cited*. The figure number and source line are typographic ceremony. A reader processes this frame the way they process an FT chart: "this is meant to be believed".
- **Consistency as the signal** — the same frame wrapping every number on the site means the viewer never wonders how to read a proof block. The architecture is invisible after the first instance; the content is what lands.
- **Editorial weight through restraint** — no shadows, no glows, no hover states. Mercury-grade composure: what makes it feel expensive is the *absence* of effects other sites would reach for.
- **Tabular-nums by default** — every number in every figure is typographically stable. Decimal points align. No jitter. This is a one-line CSS rule with an outsized reputational effect.

## Dependencies

- None. Pure HTML + CSS.
- Consumes `--ease-house` tokens from `patterns/motion/02-ease-out-expo-house-curve.md` if the figure has any transition (hover border, for instance).
- Pairs with `patterns/proof/01-lottie-number-ticker-on-reveal.md` which provides the animated number this frame wraps.

## Code recipe

### 1. The base component — HTML

```html
<!-- Pattern: brain/design-library/patterns/proof/02-publication-grade-figure-frame.md -->
<!-- Source ref: brain/design-library/references/ramp/ + brain/design-library/references/mercury/ -->

<figure class="proof-fig">
  <div class="proof-fig__meta">Fig. 03</div>

  <div class="proof-fig__body">
    <strong
      class="proof-fig__number"
      data-ticker="2300000"
      data-ticker-format="brl-millions"
    >R$0.0M</strong>
    <div class="proof-fig__unit">Receita atribuída a AI</div>
  </div>

  <figcaption class="proof-fig__caption">
    Seis meses após a implementação do Revenue-First Framework em uma indústria
    de manufatura pesada com faturamento anual de R$180M.
  </figcaption>

  <div class="proof-fig__source">
    Fonte: REIS [IA], 2026 — caso AP-2025-03, validado por auditoria interna do cliente.
  </div>
</figure>
```

### 2. The styles — every token is REIS-locked

```css
/* proof-fig.css — REIS [IA] tokens only */

.proof-fig {
  /* structural */
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "meta   body"
    "meta   caption"
    "meta   source";
  gap: 16px 32px;

  /* surface */
  background: #0A0A0A;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 4px; /* editorial, not rounded-SaaS */
  padding: clamp(32px, 4vw, 56px);

  /* font */
  font-family: 'Inter', sans-serif;
  color: #FFFFFF;

  /* tabular figures for every number inside */
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1, 'lnum' 1;

  /* no shadow. no glow. no hover lift. */
}

/* Figure number — mono meta column, top-aligned */
.proof-fig__meta {
  grid-area: meta;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.32);
  /* vertical alignment with the number's cap height */
  padding-top: 18px;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  padding-right: 32px;
  white-space: nowrap;
}

/* The hero number */
.proof-fig__body {
  grid-area: body;
  display: flex;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
}

.proof-fig__number {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(2.75rem, 6vw, 5.5rem);
  line-height: 0.95;
  letter-spacing: -0.035em;
  color: #FFFFFF;
}

.proof-fig__unit {
  font-size: 14px;
  font-weight: 400;
  color: #A3A3A3;
  max-width: 28ch;
  line-height: 1.5;
}

/* The editorial caption — where the claim is stated in words */
.proof-fig__caption {
  grid-area: caption;
  font-size: 15px;
  line-height: 1.65;
  color: #A3A3A3;
  max-width: 58ch;
  margin-top: 8px;
}

/* The source line — small, muted, ceremonial */
.proof-fig__source {
  grid-area: source;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  line-height: 1.6;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.38);
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

/* Accent underline — ONE hairline in #4A90FF, under the meta column only */
.proof-fig__meta::after {
  content: '';
  display: block;
  width: 24px;
  height: 1px;
  background: #4A90FF;
  margin-top: 12px;
}

/* Mobile: collapse the meta column under the body */
@media (max-width: 720px) {
  .proof-fig {
    grid-template-columns: 1fr;
    grid-template-areas:
      "meta"
      "body"
      "caption"
      "source";
    gap: 20px;
  }
  .proof-fig__meta {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    padding: 0 0 12px 0;
  }
  .proof-fig__meta::after { margin-top: 8px; }
}
```

### 3. Variants — the same frame holds different content

```html
<!-- Variant A: before/after comparison -->
<figure class="proof-fig proof-fig--compare">
  <div class="proof-fig__meta">Fig. 07</div>
  <div class="proof-fig__body proof-fig__body--split">
    <div>
      <div class="proof-fig__label">Antes</div>
      <strong class="proof-fig__number">23h</strong>
      <div class="proof-fig__unit">por semana em reporting manual</div>
    </div>
    <div>
      <div class="proof-fig__label">Depois</div>
      <strong class="proof-fig__number">3h</strong>
      <div class="proof-fig__unit">para a mesma entrega, com auditoria automática</div>
    </div>
  </div>
  <figcaption class="proof-fig__caption">
    Diretora financeira de um grupo varejista de médio porte, 4 meses após a implantação.
  </figcaption>
  <div class="proof-fig__source">
    Fonte: REIS [IA], 2026 — caso VR-2025-11.
  </div>
</figure>

<!-- Variant B: chart container -->
<figure class="proof-fig proof-fig--chart">
  <div class="proof-fig__meta">Fig. 12</div>
  <div class="proof-fig__body">
    <!-- inline SVG chart drops in here, inherits tabular-nums from parent -->
    <svg class="proof-fig__svg" viewBox="0 0 600 240"><!-- ... --></svg>
  </div>
  <figcaption class="proof-fig__caption">
    Evolução de receita atribuída a AI por trimestre — média de 12 clientes industriais.
  </figcaption>
  <div class="proof-fig__source">
    Fonte: REIS [IA], Revenue-First Benchmark 2026.
  </div>
</figure>
```

## Variables to tune

- **`border` alpha** — `rgba(255,255,255,0.06)` is the editorial default. `0.08` reads louder, `0.04` starts disappearing. Do not exceed `0.10` or the frame starts feeling like a card.
- **`border-radius`** — 4px is editorial. 0px is newspaper. 12px is SaaS — never go above 4 for this component.
- **Meta column width** — auto-sized from the `Fig. NN` string. If figure numbers climb above 99 on a single page, switch to 3-digit alignment or drop the meta column entirely.
- **Accent underline length** — 24px is the default. Do not make it longer. It is a punctuation mark, not a rule.
- **Padding** — `clamp(32px, 4vw, 56px)` is the Mercury-grade breathing room. Below 24px the frame feels cramped; above 72px it looks like filler.

## Accessibility

- **Semantic `<figure>` + `<figcaption>`** — screen readers announce the figure and its caption as a unit. The number's `aria-label` (from the ticker pattern) holds the final readable value.
- **`proof-fig__meta`** is visual meta only — screen readers will still read "Fig. 03" which is fine and useful. No `aria-hidden` needed.
- **`proof-fig__source`** is announced after the caption. Readers get the whole citation.
- **Contrast**: body copy at `#A3A3A3` on `#0A0A0A` is 6.4:1 — above WCAG AA for normal text. Source line at `rgba(255,255,255,0.38)` on `#0A0A0A` is borderline at 4.2:1 — only acceptable because the content is explicitly supplementary. If a given source line carries load-bearing information, bump to `rgba(255,255,255,0.5)`.
- **Tabular figures** make decimal points align — a subtle but real accessibility win for low-vision readers scanning columns of numbers.

## Performance

- Pure HTML + CSS. No runtime cost.
- No shadows means no compositor layers invoked for elevation. The frame stays on the main document layer.
- Works identically on all three hardware tiers — this is structural, not motion.
- When paired with the number-ticker pattern, the combined cost is one `requestAnimationFrame` loop per figure for ~60 frames total, then permanent stillness.

## Known variants

- **FT-style chart frame** — drop an SVG or Canvas chart into the body slot; the tabular-nums and border grammar are inherited. Do not add chart-specific styles at the frame level.
- **Quote-as-figure** — swap the number for a pull-quote. Same frame, same meta column, same source line. Turns testimonials into cited evidence.
- **Stacked figures grid** — 2-column or 3-column grid of these frames. The border discipline holds; do not collapse internal borders into a shared outer border.
- **Inline figure** — drop the border and padding entirely, keep only the meta + source grammar. Used inline in long-form content (manifesto pages) where the full frame would interrupt reading.

Pairs with:
- `patterns/proof/01-lottie-number-ticker-on-reveal.md` — the number inside the frame.
- `patterns/motion/02-ease-out-expo-house-curve.md` — any transition on this frame references `--ease-house`.
- `patterns/layout/02-chaptered-scroll-composition.md` — the frame lives inside the Proof chapter, which carries its own tonal register.

## Source references

- `brain/design-library/references/ramp/suggested-patterns.md` — Pattern 1, the distillation prompt for this file.
- `brain/design-library/references/ramp/observations.md` and `ramp/html.html` — `<figure>`-wrapping pattern observed on Ramp case study pages, source lines in mono type.
- `brain/design-library/references/mercury/design-tokens.md` — oversized section padding, narrow content columns, single-accent restraint. Mercury is the color-philosophy reference; Ramp is the structural reference. This pattern fuses both.
- `brain/design-library/references/mercury/suggested-patterns.md` — generous vertical rhythm, consumed here as the internal padding token.
