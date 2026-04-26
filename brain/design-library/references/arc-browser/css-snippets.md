# Arc — CSS Snippets

> **Status**: [NEEDS PLAYWRIGHT] — Arc is Next.js with CSS-in-JS (styled-components or emotion). Class names are hashed; source requires computed-style inspection.

## Inferred tokens

### Color (Arc's actual palette — bright/pastel)
```css
/* Arc uses pastels. REIS [IA] CANNOT copy these. The TECHNIQUE is transferable. */
--arc-cream:   #FFF7E8;
--arc-peach:   #FFE4D6;
--arc-lilac:   #E8DDFF;
--arc-sky:     #D4ECFF;
--arc-mint:    #D9F5E8;
```

### REIS [IA] adaptation (brand-safe color transitions)
```css
:root {
  --stage-1: #000000;
  --stage-2: #04060C;
  --stage-3: #080F1E;
  --stage-4: #0A1630;
  --stage-5: #000000;
}

body {
  background: var(--stage-current, var(--stage-1));
  transition: background 1200ms cubic-bezier(0.4, 0, 0.2, 1);
}
/* JS updates --stage-current based on IntersectionObserver for each section */
```

### Typography
```css
/* Arc uses "Inter" publicly */
--type-hero:     clamp(56px, 7vw, 104px);
--type-display:  clamp(36px, 4vw, 64px);
--type-pull-quote: clamp(28px, 3vw, 44px);  /* editorial pull-quotes */
--type-body:     18px;

--weight-hero:   600;
--weight-pull:   400;   /* pull-quotes stay regular — italic optional */
--tracking-hero: -0.018em;

/* Pull-quote styling */
.pull-quote {
  font-size: var(--type-pull-quote);
  font-weight: 400;
  line-height: 1.3;
  max-width: 18ch;   /* narrow — forces editorial rhythm */
  margin-inline: auto;
  text-align: center;
}
.pull-quote::before { content: '"'; }
.pull-quote::after { content: '"'; }
```

### 3D product frame
```css
.product-frame {
  transform-style: preserve-3d;
  perspective: 1500px;
  transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
  transition: transform 200ms linear;
  /* JS updates --tilt-x, --tilt-y from scroll progress */
}
```

## To retrieve with Playwright
- Arc's actual font-face declarations
- Whether color transitions use CSS variables or stacked absolute-positioned sections
- The 3D frame's rotation range and scroll-linking math
- Whether Lenis is used for scroll smoothing (likely yes)
