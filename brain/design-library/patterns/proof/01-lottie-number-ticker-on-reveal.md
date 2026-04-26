# Number Ticker on Reveal

**Category**: proof
**Difficulty**: basic
**Dependencies**: None. Vanilla JS + `requestAnimationFrame` + `IntersectionObserver`. No Lottie, no GSAP, no Framer Motion.

**Use when**: Any proof number that deserves a landing — revenue attributed, hours saved, cost recovered, months-to-payback, case-study metrics. Maximum 3–4 tickers per page; more and the effect evaporates.

**Note on the name**: the source reference is Ramp's Lottie-driven ticker, and the pattern was originally filed under `lottie-number-ticker-on-reveal`. We keep the filename for library continuity, but the recipe is **pure `requestAnimationFrame`** — Lottie is unnecessary weight for this effect, and we get better control over formatting (R$, %, etc.) and zero runtime dependency.

## What it is

A number element (`<span>`, `<strong>`, whatever) that starts rendered at `0` (or at a visually neutral value), and when it enters the viewport, counts up to its target over ~1000ms with an ease-out curve. It then stops and stays on the final value forever. If the viewer scrolls away and comes back, it does not re-fire — the landing has happened.

Formatting is preserved throughout the animation: `R$2.3M` starts as `R$0.0M` and lands on `R$2.3M`. `47%` starts at `0%`. `340h` starts at `0h`. The number ticks; the unit does not move.

## Why REIS-grade

- **Editorial landing, not a slot machine** — one gentle acceleration into the final value, no bouncing, no multi-pass roll-up. Consultivo premium, not a casino.
- **Frames numbers as proof, not animation** — by the time the viewer's eyes land on the figure, the number is arriving. It reads as "the proof is settling into place", not "the page is loading".
- **Tabular figures** — paired with `font-variant-numeric: tabular-nums` so the digits do not jitter horizontally as they change. Critical. Without this the ticker looks like a typewriter.
- **Respects the one-motion-per-chapter rule** — the proof chapter already runs this. Nothing else in that chapter animates.

## Dependencies

- Zero libraries. Vanilla TypeScript.
- `IntersectionObserver` for the trigger (supported everywhere REIS ships).
- `requestAnimationFrame` for the loop.
- Pairs with `patterns/motion/02-ease-out-expo-house-curve.md` for the easing function — we reimplement `ease-out-quart` in JS since CSS curves are not directly callable on values.

## Code recipe

### 1. The ticker function

```ts
// numberTicker.ts
// Pattern: brain/design-library/patterns/proof/01-lottie-number-ticker-on-reveal.md
// Source ref: brain/design-library/references/ramp/motion-config.md

type TickerOptions = {
  /** The final value, in raw number form. e.g. 2300000 for "R$2.3M". */
  to: number;
  /** Function that turns the current value into the displayed string. */
  format: (n: number) => string;
  /** Duration in ms. Defaults to 1000. */
  duration?: number;
  /** Optional starting value. Defaults to 0. */
  from?: number;
};

// ease-out-quart — matches --ease-out-quart from tokens-motion.css
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export function animateNumber(el: HTMLElement, opts: TickerOptions) {
  const { to, format, duration = 1000, from = 0 } = opts;

  // Reduced motion: jump straight to the final value.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = format(to);
    return;
  }

  const start = performance.now();
  const delta = to - from;

  const tick = (now: number) => {
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(t);
    const current = from + delta * eased;
    el.textContent = format(current);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = format(to); // guarantee exact final value
  };

  requestAnimationFrame(tick);
}
```

### 2. The reveal trigger — fires once, never again

```ts
// tickerReveal.ts
// Usage: <span data-ticker="2300000" data-ticker-format="brl-millions">R$0.0M</span>

import { animateNumber } from './numberTicker';

const FORMATTERS: Record<string, (n: number) => string> = {
  'brl-millions': (n) =>
    `R$${(n / 1_000_000).toLocaleString('pt-BR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })}M`,
  'percent': (n) => `${Math.round(n)}%`,
  'hours': (n) => `${Math.round(n).toLocaleString('pt-BR')}h`,
  'months': (n) => `${Math.round(n)} meses`,
  'integer': (n) => Math.round(n).toLocaleString('pt-BR'),
};

export function initTickers() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-ticker]');
  if (nodes.length === 0) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const to = Number(el.dataset.ticker);
        const fmtKey = el.dataset.tickerFormat ?? 'integer';
        const format = FORMATTERS[fmtKey] ?? FORMATTERS.integer;
        animateNumber(el, { to, format });
        io.unobserve(el); // fire once, never again
      });
    },
    { threshold: 0.6 }
  );

  nodes.forEach((n) => io.observe(n));
}

// Boot once on DOMContentLoaded
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTickers);
  } else {
    initTickers();
  }
}
```

### 3. Markup — the contract is pure data attributes

```html
<!-- REIS [IA] tokens only: #FFFFFF ink, #4A90FF accent, Inter -->
<figure class="proof-figure">
  <strong
    class="proof-number"
    data-ticker="2300000"
    data-ticker-format="brl-millions"
    aria-label="2,3 milhões de reais atribuídos a AI em 6 meses"
  >R$0.0M</strong>
  <figcaption class="proof-caption">
    Receita atribuída a AI, 6 meses, cliente manufatura.
  </figcaption>
</figure>
```

```css
.proof-number {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(3rem, 7vw, 6rem);
  line-height: 1;
  letter-spacing: -0.03em;
  color: #FFFFFF;
  /* critical: stops digits from jittering as they change */
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1, 'lnum' 1;
  display: inline-block;
}

.proof-number::after {
  content: '';
  display: inline-block;
  width: 0.12em;
  height: 0.12em;
  background: #4A90FF;
  border-radius: 50%;
  vertical-align: baseline;
  margin-left: 0.08em;
  /* the accent period — landed, not animated */
}
```

## Variables to tune

- **`duration`** — 800ms feels terse, 1000ms is the premium default, 1400ms is the upper bound. Beyond 1400 the viewer starts counting along and the effect dies.
- **`threshold`** on the IntersectionObserver — 0.6 means the number has to be clearly in view before it fires. Lowering to 0.3 triggers earlier but risks missing the viewer's eye.
- **Format functions** — add more to the `FORMATTERS` map as needed (USD, %, multipliers). Keep them in one place so every ticker on the site speaks the same number-formatting grammar.
- **`ease-out-quart`** — swap to `ease-out-expo` (`1 - Math.pow(1 - t, 5)`) for a sharper, faster landing. Quart is the calmer default.

## Accessibility

- **`aria-label`** on the ticker element holds the final, human-readable value. Screen readers get the real number immediately and are not dragged through the ticking animation.
- **Reduced motion** jumps directly to the final value. The ticker still fires its IntersectionObserver, still unobserves, still renders the final string — it just does so in one frame instead of sixty.
- **Initial DOM content** should be the *formatted zero* (`R$0.0M`, `0%`, `0h`), not the target. This matters if JS fails to load: the reader sees `0%`, which is honest, instead of seeing the animation-start value.
- **Tabular figures** are a screen-reader no-op, but they are critical for the *visual* accessibility of the effect — without them, the decimal point drifts left and right and the animation feels broken.

## Performance

- One `requestAnimationFrame` loop per ticker, running for ~60 frames total, then done forever. Negligible.
- `IntersectionObserver` with `unobserve` on fire means no lingering listeners.
- No Lottie runtime (~200KB gzipped) is a significant win over the original Ramp approach. The effect is indistinguishable.
- Runs on the `minimal` hardware tier without degradation. This is one of the few motion patterns that does not need a reduced variant.

## Known variants

- **From-a-non-zero start** — e.g. "from 23h to 3h/week after implementation" — pass `from: 23` and the final `to: 3`. The easing still applies; the count goes down.
- **Paired before/after** — two tickers side by side, one counting down, one counting up. Use for cost-saved-vs-revenue-gained dual proof. Trigger both from a single IntersectionObserver so they land in lockstep.
- **Scroll-scrubbed ticker** — bind the value to scroll progress via `animation-timeline: scroll()` for the one case where the number is the hero of the section (manifesto page). Do not default to this — the one-shot reveal is the right move for proof.
- **Lottie version** — if the brief *requires* a chart that animates alongside the number (bars filling, line drawing), then Lottie earns its weight. Pure number → vanilla. Number + chart → Lottie. Never import Lottie just for a number.

Pairs with:
- `patterns/proof/02-publication-grade-figure-frame.md` — the frame that holds this number.
- `patterns/motion/02-ease-out-expo-house-curve.md` — easing vocabulary this ticker inherits.

## Source references

- `brain/design-library/references/ramp/motion-config.md` — confirms Lottie-driven number tickers as Ramp's signature proof motion; we distilled the *behavior* and dropped the *runtime*.
- `brain/design-library/references/ramp/suggested-patterns.md` — Pattern 2, the distillation prompt for this file.
- `brain/design-library/references/ramp/design-tokens.md` — tabular-nums as a site-wide rule for financial data display.
- `brain/design-library/references/ramp/html.html` — figure-wrapping pattern around each data display.
