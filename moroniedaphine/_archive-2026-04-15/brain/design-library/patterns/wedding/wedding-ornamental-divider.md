# Pattern: wedding-ornamental-divider
Category: wedding / ornament
Source: Withjoy demo hero (1px fading rule between couple name and date)
Why premium: a single 1px rule, gradient-faded at both ends, is the most restrained ornamental device in editorial design. Used by The New Yorker, Kinfolk, Cereal magazine. Anti-template.

## When to use
- Between hero couple-names and the date line.
- Between every major section heading and its body text.
- Footer copyright separator.
- Replacing any place a designer might be tempted to use a floral SVG.

## Variants

### V1 — Pure rule (Withjoy-style)
```css
.divider {
  width: 120px;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #C9A77A 50%, transparent 100%);
  margin: 40px auto;
  border: 0;
}
```

### V2 — Rule with centered diamond (couture invitation-style)
```css
.divider--diamond {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin: 48px auto;
}
.divider--diamond::before,
.divider--diamond::after {
  content: "";
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #C9A77A);
}
.divider--diamond::after {
  background: linear-gradient(90deg, #C9A77A, transparent);
}
.divider--diamond__mark {
  width: 6px; height: 6px;
  background: #C9A77A;
  transform: rotate(45deg);
}
```

### V3 — Rule with serif ampersand ornament
```html
<div class="divider--amp">
  <span class="divider--amp__glyph">&amp;</span>
</div>
```
```css
.divider--amp {
  display: flex; align-items: center; gap: 24px;
  margin: 56px auto; max-width: 320px;
}
.divider--amp::before, .divider--amp::after {
  content: ""; flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,167,122,0.6), transparent);
}
.divider--amp__glyph {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 28px;
  color: #C9A77A;
}
```

## Animation (optional)
```js
gsap.from('.divider', {
  scaleX: 0, duration: 1.4, ease: 'power2.inOut',
  transformOrigin: 'center',
  scrollTrigger: { trigger: '.divider', start: 'top 85%' }
});
```

## Why it feels premium
- **Gradient fade at both ends** — hard 1px lines read as HTML default; faded lines read as ink bleeding into cream paper.
- **Rose-gold color** — never pure white, never solid gold. Always in the #C9A77A to #D4B38A range.
- **Restraint**. You can use this 15+ times on a page without feeling repetitive — because it never shouts.
