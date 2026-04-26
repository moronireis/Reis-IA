# Pattern: wedding-serif-name-treatment
Category: wedding / typography
Source: Withjoy demo hero lockup (https://withjoy.com/demo/)
Why premium: the italic ampersand between two upright serif names is the single most recognizable signal of editorial couture invitations (Dempsey & Carroll, Crane, Bering's all use this exact device).

## When to use
- Hero couple-name lockup.
- Invitation preview card.
- Save-the-date PDF header.
- Footer wordmark.

## HTML
```html
<h1 class="couple-lockup">
  <span class="couple-lockup__name">Daphine</span>
  <span class="couple-lockup__amp">&amp;</span>
  <span class="couple-lockup__name">Moroni</span>
</h1>
```

## CSS
```css
.couple-lockup {
  font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
  font-weight: 400;
  font-size: clamp(64px, 11vw, 148px);
  line-height: 0.95;
  letter-spacing: -0.01em;
  color: #FFFBF5;
  text-align: center;
  text-shadow: 0 2px 24px rgba(0,0,0,0.4);
}
.couple-lockup__name {
  display: block;
}
.couple-lockup__amp {
  display: block;
  font-style: italic;
  font-weight: 300;
  font-size: 0.72em;
  color: #C9A77A; /* rose gold */
  margin: -0.12em 0;
  /* optical negative margin pulls names toward the ampersand */
}
@media (min-width: 768px) {
  .couple-lockup {
    font-size: clamp(96px, 9vw, 180px);
  }
}
```

## Why it feels premium
- **Italic ampersand, accent color** — one typographic gesture carries all the romance. No flourishes needed.
- **Negative margin on the amp** pulls the three lines into a tight vertical rhythm — makes it read as one monogram, not three stacked words.
- **Cormorant Garamond at 400 weight** has narrow counters and high contrast — it's the open-source font closest to Didot/Bodoni couture lineage without the licensing fee.
- **Drop shadow 0 2px 24px rgba(0,0,0,0.4)** lifts the names off any background photo without looking like a PowerPoint shadow.
