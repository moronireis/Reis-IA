# Pattern: wedding-tracked-micro-type
Category: wedding / typography
Source: Withjoy demo nav (Inter UI 11px, tracked uppercase) + Paperless Post label conventions
Why premium: tracked-uppercase micro-type is the #1 non-font signal of editorial design. It's what separates magazine layouts from SaaS landing pages.

## When to use
- All navigation items.
- Section eyebrows ("OUR STORY", "THE CELEBRATION", "R.S.V.P.").
- Dates, locations, metadata lines.
- Button labels.
- Form field labels.
- Photo captions.
- Anywhere you'd be tempted to use 14-16px sentence-case body text for a label.

## CSS token system
```css
:root {
  /* tracked micro-type scale */
  --micro-xs: 10px;    /* photo captions */
  --micro-sm: 11px;    /* nav, metadata */
  --micro-md: 12px;    /* eyebrows, buttons */
  --micro-lg: 13px;    /* section labels */

  --track-tight:  0.12em;
  --track-normal: 0.22em;
  --track-wide:   0.32em;
  --track-xwide:  0.42em;
}

.micro {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  color: #F5E6D3;
}
.micro--nav      { font-size: var(--micro-sm); letter-spacing: var(--track-normal); }
.micro--eyebrow  { font-size: var(--micro-md); letter-spacing: var(--track-wide);  opacity: 0.75; }
.micro--date     { font-size: var(--micro-sm); letter-spacing: var(--track-xwide); }
.micro--button   { font-size: var(--micro-md); letter-spacing: var(--track-wide);  font-weight: 600; }
.micro--caption  { font-size: var(--micro-xs); letter-spacing: var(--track-normal); opacity: 0.6; }
.micro--label    { font-size: var(--micro-lg); letter-spacing: var(--track-tight); }
```

## Usage examples
```html
<nav class="micro micro--nav">
  <a>HOME</a> <a>OUR STORY</a> <a>EVENTS</a> <a>RSVP</a>
</nav>

<p class="micro micro--eyebrow">We're getting married</p>

<p class="micro micro--date">NOVEMBER · 15 · 2026 — BRASÍLIA</p>

<button class="micro micro--button">Confirm attendance</button>

<figcaption class="micro micro--caption">Photo: Our engagement, Pirenópolis 2025</figcaption>
```

## Rules (non-negotiable)
1. **Never exceed 13px** for tracked uppercase type. Larger than that, it becomes shouting.
2. **Never go below 500 weight** in Inter — tracked light weights look anemic at small sizes.
3. **Wider tracking for shorter strings**, tighter for longer. "RSVP" needs `--track-xwide`; "CONFIRME SUA PRESENÇA" needs `--track-tight`.
4. **Color always `#F5E6D3` (candlelight cream)** on dark sections, or `#5C1A24` (burgundy) on cream sections — never pure white, never pure black.
5. **Opacity 0.6-0.85 for secondary micro-type** (captions, metadata). Solid 1.0 only for primary nav and buttons.

## Why it feels premium
- Your eye reads tracked uppercase as "this was typeset by a human at a magazine", not "this was spit out by Bootstrap".
- It's the exact opposite of SaaS landing page convention (bold 16px sentence case). Just by inverting that convention, you're signaling couture.
- Inter has excellent small-cap rendering — the font was designed by Rasmus Andersson for UI clarity at these exact sizes.
