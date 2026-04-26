# Image-First / Text-After Stagger

**Category**: motion / composition rule
**Difficulty**: foundational
**Dependencies**: The fade-up pattern. No extra JS.
**Source refs**:
- `brain/assets/branding/art-direction-brief-castelo-dimatoso.md` §3.3
- `brain/design-library/patterns/motion/fade-up-intersection-observer.md`

## Intent

When a section contains both a photograph and typography, the **image fades up first** and the **text follows 200ms later**. The viewer's eye lands on the visual anchor, then on the words. Reversing this order makes the text arrive over emptiness — cheap, reactive.

This is a composition rule expressed in motion. It applies everywhere photo + type coexist.

## When to use

- Every editorial section with a photograph + heading + body paragraph.
- Gallery rows with caption.
- Pull-quote sections with background image.
- ALWAYS in both Castelo and Di Matoso.

## Rule

```
IMAGE fade-up: delay 0ms
TEXT  fade-up: delay 200ms
```

The 200ms offset is the magic number. Below 150ms feels simultaneous (rule lost). Above 300ms feels like two separate events (rule noticed).

## CSS

```css
/* Pattern: brain/design-library/patterns/motion/image-first-text-after.md */

/* Default fade-up applies to both */
.fade-in { /* see fade-up-intersection-observer.md */ }

/* Text inside a photo section lands 200ms after the image */
.fade-in--text-after {
  transition-delay: var(--stagger-image-text, 200ms);
}
```

## HTML example

```html
<section>
  <figure class="fade-in">
    <img src="/lakes.jpg" alt="" />
  </figure>
  <div class="fade-in fade-in--text-after">
    <h2>II. Os Lagos</h2>
    <p>Os lagos mudam duas vezes por dia. O castelo, nunca.</p>
  </div>
</section>
```

## Key rules

- **200ms offset, always.** Do not tune per section.
- **Image first** — always. Never "text first then image."
- If there are multiple text elements (heading + body + caption), all three share the 200ms delay. Do NOT cascade 200/400/600ms — that becomes a different pattern (sequential stagger) and reads as over-choreographed.
- If a section has no photograph, the rule does not apply. Use plain `.fade-in`.

## Brand usage

- **Castelo dos Lagos**: all chapter sections with lake/estate photography.
- **Buffet Di Matoso**: all plate hero sections, menu-as-essay paragraphs over food macro shots.

## Common mistakes

- Staggering multiple text blocks (over-choreographed)
- Reversing the order (text-first)
- Using this on text-only sections (no effect, confusion)
- Tuning the offset per section (breaks rhythm across the page)
