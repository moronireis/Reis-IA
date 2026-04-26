# Withjoy Demo — Hero Harvested
Source: https://withjoy.com/demo/

## Simplified HTML structure (reverse-engineered from SSR)
```html
<section class="hero">
  <div class="hero__photo">
    <!-- full-bleed background photo, object-fit: cover -->
    <img src="couple-photo.jpg" alt="" />
    <div class="hero__overlay"></div>
  </div>

  <nav class="hero__nav">
    <ul>
      <li><a>HOME</a></li>
      <li><a>OUR STORY</a></li>
      <li><a>EVENTS</a></li>
      <li><a>TRAVEL</a></li>
      <li><a>REGISTRY</a></li>
      <li><a>RSVP</a></li>
    </ul>
  </nav>

  <div class="hero__lockup">
    <p class="hero__eyebrow">We're getting married</p>
    <h1 class="hero__names">
      <span>Daphine</span>
      <span class="amp">&amp;</span>
      <span>Moroni</span>
    </h1>
    <div class="hero__rule"></div>
    <p class="hero__date">NOVEMBER 15, 2026 · BRASÍLIA, BRAZIL</p>
  </div>

  <div class="hero__scroll-hint">SCROLL</div>
</section>
```

## Essential CSS (adapted to our tokens)
```css
.hero {
  position: relative;
  height: 100vh;
  min-height: 720px;
  overflow: hidden;
  background: #0F0A08; /* velvet black fallback */
}
.hero__photo img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  filter: saturate(0.92) contrast(1.05);
}
.hero__overlay {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at center, transparent 0%, rgba(15,10,8,0.55) 70%, rgba(15,10,8,0.85) 100%),
    linear-gradient(180deg, rgba(15,10,8,0.35) 0%, transparent 30%, rgba(15,10,8,0.55) 100%);
}
.hero__nav {
  position: absolute; top: 32px; left: 0; right: 0;
  display: flex; justify-content: center;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #F5E6D3;
}
.hero__nav a { opacity: 0.85; padding: 0 18px; transition: opacity .3s; }
.hero__nav a:hover { opacity: 1; color: #C9A77A; }

.hero__lockup {
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #F5E6D3;
  max-width: 90vw;
}
.hero__eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  letter-spacing: 0.38em;
  text-transform: uppercase;
  opacity: 0.75;
  margin-bottom: 28px;
}
.hero__names {
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-weight: 400;
  font-size: clamp(64px, 11vw, 148px);
  line-height: 0.95;
  letter-spacing: -0.01em;
  color: #FFFBF5;
}
.hero__names .amp {
  font-style: italic;
  color: #C9A77A; /* rose gold */
  font-weight: 300;
  display: block;
  font-size: 0.72em;
  margin: -0.1em 0;
}
.hero__rule {
  width: 120px; height: 1px;
  background: linear-gradient(90deg, transparent, #C9A77A, transparent);
  margin: 40px auto 28px;
}
.hero__date {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  opacity: 0.82;
}
```

## Motion config (upgrade beyond Withjoy — they only do a basic fade)
```js
// GSAP + ScrollTrigger (we add this; Withjoy lacks it)
gsap.from('.hero__eyebrow', { y: 20, opacity: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' });
gsap.from('.hero__names span', {
  y: 80, opacity: 0, duration: 1.6,
  stagger: 0.18, delay: 0.55,
  ease: 'expo.out'
});
gsap.from('.hero__rule', { scaleX: 0, duration: 1.4, delay: 1.2, ease: 'power2.inOut', transformOrigin: 'center' });
gsap.from('.hero__date', { y: 14, opacity: 0, duration: 1, delay: 1.5, ease: 'power2.out' });

// Parallax on the photo as user scrolls away from hero
gsap.to('.hero__photo img', {
  yPercent: 18, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});
```

## Key structural takeaways
1. Hero is **one** centered lockup, not a split layout. No illustrations flanking the names.
2. The ampersand `&` is the only decorative touch — set in italic, colored in the accent, and vertically tucked between the names.
3. A thin horizontal rule (1px, gradient-faded at ends) separates names from date. No floral SVGs. No wax-seal icons. Restraint is what makes it premium.
4. Nav is set in tiny tracked uppercase Inter at 11px — it reads like a magazine masthead, not a website menu.
5. Photo is desaturated slightly (`saturate(0.92)`) — gives the cinematic film look instantly.
