# DESIGN SPECIFICATION: Convite Digital — Moroni & Daphine

Last updated: 2026-04-23

---

## Overview

A single-page digital wedding invitation in two acts: a fullscreen **Cover** (photo background with names and a button) and the **Invitation Card** (scroll-down content that feels like a luxury printed piece, not a website). The entire experience lives in `/src/pages/convite.astro`.

The current envelope animation is replaced with a calm, photographic cover. The current card body is tightened to feel like a physical invitation — continuous vertical flow, stronger text-over-photo legibility, and restrained gold accents.

---

## Design System Reference (LOCKED)

| Token | Value |
|-------|-------|
| `--burgundy` | `#4A1619` |
| `--white` | `#FFFFFF` |
| `--gold` | `#D4AF37` |
| Page background | `#E5DFD6` (warm linen) |
| Card gradient | `linear-gradient(180deg, #FFFEFB, #FDF9F2 40%, #FFFEFB 80%, #FAF6EE)` |
| Film filter | `sepia(.12) saturate(.82) contrast(.90) brightness(1.03)` |
| Display font | Fraunces variable, weight 200, `"opsz" 144, "SOFT" 50` |
| Body serif | Fraunces, weight 300, `"opsz" 14` |
| Sans labels | Inter, weight 300, uppercase, letter-spacing 0.45em |

---

## PART 1 — THE COVER

### Concept

A fullscreen photograph of the couple from behind, looking at the temple (`templo-costas.jpg`). Dark atmospheric overlay. Names floating in the center. A ghost button to enter. When tapped, the cover fades to the linen background color, and the card fades in from below.

### Structure

```html
<div class="cover" id="cover">
  <div class="cover-photo">
    <img src="/photos/templo-costas.jpg" alt="" />
  </div>
  <div class="cover-overlay"></div>
  <div class="cover-content">
    <p class="cover-label">12 de junho de 2026</p>
    <h1 class="cover-name">Moroni</h1>
    <p class="cover-amp">&</p>
    <h1 class="cover-name">Daphine</h1>
    <button class="cover-btn" id="cover-btn">Abrir convite</button>
  </div>
</div>
```

### Cover Photo

| Property | Value |
|----------|-------|
| Container | `position: fixed; inset: 0; z-index: 200;` |
| Image | `width: 100%; height: 100%; object-fit: cover; object-position: center 30%;` |
| Film filter | `filter: sepia(.12) saturate(.82) contrast(.90) brightness(1.03);` |
| Transform | `scale(1.02)` (slight zoom so fade-in can do a slow zoom-out) |

### Cover Overlay

A multi-stop gradient that darkens the image enough for white text to be legible at WCAG AA, while keeping the photo visible.

```css
.cover-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to bottom,
      rgba(74, 22, 25, 0.30) 0%,
      rgba(74, 22, 25, 0.15) 30%,
      rgba(74, 22, 25, 0.20) 50%,
      rgba(74, 22, 25, 0.45) 80%,
      rgba(74, 22, 25, 0.60) 100%
    );
}
```

### Cover Content

Vertically and horizontally centered using flex. Stacked vertically.

```css
.cover-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  text-align: center;
}
```

### Cover Typography

| Element | Font | Weight | Size | Color | Spacing | Other |
|---------|------|--------|------|-------|---------|-------|
| `.cover-label` | Inter | 300 | 9px | `rgba(255,255,255,0.50)` | `letter-spacing: 0.45em; text-transform: uppercase` | `margin-bottom: 24px` |
| `.cover-name` | Fraunces italic | 200 | `clamp(36px, 9vw, 64px)` | `#FFFFFF` | `letter-spacing: 0.03em; line-height: 1.05` | `font-variation-settings: "opsz" 144, "SOFT" 50;` `text-shadow: 0 2px 30px rgba(0,0,0,0.40);` |
| `.cover-amp` | Fraunces italic | 200 | `clamp(16px, 3.5vw, 24px)` | `rgba(212,175,55,0.55)` | none | `margin: 4px 0; text-shadow: none;` |

### Cover Button

A ghost button: border only, no fill. Sits 40px below the ampersand.

```css
.cover-btn {
  margin-top: 40px;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.45em;
  color: rgba(255, 255, 255, 0.60);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 14px 36px;
  cursor: pointer;
  transition: border-color 600ms ease, color 600ms ease, background 600ms ease;
}

.cover-btn:hover {
  border-color: rgba(255, 255, 255, 0.50);
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.05);
}
```

### Cover Transition (on click)

When `.cover-btn` is clicked:

1. Cover fades out: `opacity: 0` over `1200ms cubic-bezier(0.22, 1, 0.36, 1)`
2. Simultaneously, the cover photo does a slow zoom: `transform: scale(1.06)` over `1200ms`
3. After 400ms delay, the card fades in: `opacity: 0 -> 1`, `translateY(20px) -> 0` over `1000ms`
4. After 2000ms, remove the cover from DOM

```css
.cover {
  transition: opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1);
}
.cover.out {
  opacity: 0;
  pointer-events: none;
}
.cover.out .cover-photo img {
  transform: scale(1.06);
  transition: transform 1200ms cubic-bezier(0.22, 1, 0.36, 1);
}
```

**JavaScript:**
```js
document.getElementById('cover-btn').addEventListener('click', () => {
  const cover = document.getElementById('cover');
  const page = document.getElementById('page');
  cover.classList.add('out');
  setTimeout(() => page.classList.add('show'), 400);
  setTimeout(() => cover.remove(), 2000);
});
```

---

## PART 2 — THE INVITATION CARD

### Container

Same as current: max-width 560px, centered, linen background page.

```css
.page {
  max-width: 560px;
  margin: 0 auto;
  padding: 20px 10px 48px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1000ms 200ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 1000ms 200ms cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}
.page.show { opacity: 1; transform: none; pointer-events: all; }

@media (min-width: 640px) { .page { padding: 40px 16px 64px; } }
```

### Card Wrapper

```css
.inv {
  background: linear-gradient(180deg, #FFFEFB, #FDF9F2 40%, #FFFEFB 80%, #FAF6EE);
  box-shadow:
    0 1px 2px rgba(74, 22, 25, 0.04),
    0 8px 20px rgba(74, 22, 25, 0.06),
    0 24px 56px rgba(74, 22, 25, 0.09);
  overflow: hidden;
}
```

---

### Section 1: Hero Photo with Names

The hero shows the couple photo (`templo-abraco-frente.jpg`) zoomed to show their embrace. Text overlaid at the bottom with a MUCH stronger gradient overlay to guarantee legibility.

**KEY CHANGE FROM CURRENT:** The gradient overlay is now dramatically stronger in the lower 40% of the image. Additionally, the text block has a subtle backdrop panel for guaranteed readability.

#### Structure

```html
<div class="inv-hero">
  <div class="inv-hero-photo">
    <img src="/photos/templo-abraco-frente.jpg" alt="Moroni e Daphine" />
  </div>
  <div class="inv-hero-grad"></div>
  <div class="inv-hero-over">
    <p class="lbl hero-lbl">Convidam voce para celebrar</p>
    <h1 class="inv-names">Moroni Reis</h1>
    <p class="inv-amp">&</p>
    <h1 class="inv-names">Daphine Oliveira</h1>
  </div>
</div>
```

#### Hero Photo

```css
.inv-hero {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.inv-hero-photo img {
  width: 100%;
  height: auto;
  display: block;
  transform: scale(1.35);
  transform-origin: center 35%;
  filter: sepia(.12) saturate(.82) contrast(.90) brightness(1.03);
}
```

#### Hero Gradient — STRONGER OVERLAY

This is the critical fix. The current gradient is too gentle at the bottom, making white text hard to read. The new gradient creates a deep, smooth fade starting from 40% down.

```css
.inv-hero-grad {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to bottom,
      rgba(74, 22, 25, 0.05) 0%,
      rgba(74, 22, 25, 0.02) 15%,
      transparent 25%,
      rgba(74, 22, 25, 0.08) 40%,
      rgba(74, 22, 25, 0.30) 55%,
      rgba(74, 22, 25, 0.55) 70%,
      rgba(74, 22, 25, 0.75) 85%,
      rgba(74, 22, 25, 0.88) 93%,
      #FFFEFB 100%
    );
}
```

#### Hero Text Overlay

The text block is positioned at the bottom and gets a subtle backdrop blur panel behind it for guaranteed legibility, regardless of what part of the photo is behind it.

```css
.inv-hero-over {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 0 24px clamp(20px, 5vw, 44px);
  z-index: 2;
}
```

#### Hero Typography

| Element | Font | Weight | Size | Color | Other |
|---------|------|--------|------|-------|-------|
| `.hero-lbl` | Inter 300 | 300 | 9px | `rgba(255,255,255,0.45)` | `letter-spacing: 0.45em; text-transform: uppercase; margin-bottom: 16px;` |
| `.inv-names` | Fraunces italic | 200 | `clamp(26px, 6.5vw, 42px)` | `#FFFFFF` | `font-variation-settings: "opsz" 144, "SOFT" 50; letter-spacing: 0.03em; line-height: 1.15; text-shadow: 0 1px 16px rgba(74,22,25,0.50), 0 4px 40px rgba(74,22,25,0.35);` |
| `.inv-amp` | Fraunces italic | 200 | `clamp(14px, 3vw, 20px)` | `rgba(212,175,55,0.60)` | `margin: 6px 0; text-shadow: none;` |

**Text-shadow upgrade**: Dual-layer shadow. First layer is tight and dark (16px blur), second layer is wide and diffused (40px). This creates a halo effect that makes text legible against any photo region.

---

### Section 2: Date Block

The date block is the first thing after the hero fades into the card background. It acts as the anchor of the invitation.

#### Structure

```html
<div class="sec rv date-sec">
  <div class="date-row">
    <span class="date-num">12</span>
    <div class="date-col">
      <span class="lbl">Junho</span>
      <span class="gold-line"></span>
      <span class="lbl dim">2026</span>
    </div>
  </div>
  <p class="lbl date-time">Sexta-feira &middot; 21h00</p>
  <p class="lbl dim date-arrival">Chegada recomendada as 20h20</p>
</div>
```

#### Date Specs

| Element | Spec |
|---------|------|
| `.date-num` | Fraunces 200, `"opsz" 144, "SOFT" 50`, `clamp(56px, 13vw, 80px)`, color `rgba(74,22,25,0.80)`, `line-height: 1` |
| `.date-col` | `flex-direction: column; align-items: flex-start; gap: 5px;` |
| `.gold-line` | `width: 26px; height: 1px; background: #D4AF37; opacity: 0.30;` |
| `.date-time` | `margin-top: 10px;` Standard `.lbl` styling |
| `.date-arrival` | `margin-top: 4px; font-size: 8px;` |
| `.date-row` | `display: flex; align-items: center; gap: 18px; justify-content: center;` |

---

### Section 3: Botanical Divider

After the date, a botanical SVG divider at very low opacity.

```html
<img src="/brand/botanicals/botanical-divider-v1.svg" alt="" class="bot-div rv" />
```

```css
.bot-div {
  width: min(160px, 40%);
  height: auto;
  opacity: 0.12;
  /* Tint to burgundy */
  filter: sepia(1) saturate(0.5) brightness(0.4) hue-rotate(330deg);
}
```

---

### Section 4: Message Paragraph

The emotional center of the invitation. Set in Fraunces italic, generous line-height, restrained opacity.

```html
<p class="body-it rv">
  Gostaríamos de compartilhar com você um dos momentos
  mais especiais das nossas vidas. Sera uma honra ter sua
  presenca neste dia que esperamos ha tanto tempo.
</p>
```

```css
.body-it {
  font-family: 'Fraunces', serif;
  font-weight: 300;
  font-style: italic;
  font-variation-settings: "opsz" 14;
  font-size: 15px;
  line-height: 1.8;
  color: rgba(74, 22, 25, 0.50);
  text-align: center;
  max-width: 360px;
  margin: 0 auto;
}
```

---

### Section 5: Botanical Divider (repeat)

Same as Section 3. Reuse `.bot-div`.

---

### Section 6: Venue + Dress Code — Side by Side

Two columns separated by a gold vertical line. Each column is centered with a label, a name, and supporting detail.

#### Structure

```html
<div class="dets rv">
  <div class="det">
    <p class="lbl">Local</p>
    <p class="det-name">Castelo dos Lagos</p>
    <p class="det-sub">R. Bonfim, 754 — Jd. Planteucal<br/>Ribeirao Pires — SP</p>
  </div>
  <div class="det-sep"></div>
  <div class="det">
    <p class="lbl">Traje</p>
    <p class="det-name">Esporte fino</p>
    <p class="det-sub">Preto, burgundy, neutros.<br/>Evitem branco e creme.</p>
  </div>
</div>
```

#### Details Specs

| Element | Spec |
|---------|------|
| `.dets` | `display: flex; gap: 24px; width: 100%; justify-content: center;` |
| `.det` | `flex: 1; min-width: 150px; text-align: center;` |
| `.det-name` | Fraunces 300, `"opsz" 14`, `font-size: 15px`, color `rgba(74,22,25,0.72)`, `margin: 8px 0 6px` |
| `.det-sub` | Inter 300, `font-size: 11px`, `line-height: 1.85`, color `rgba(74,22,25,0.33)` |
| `.det-sep` | `width: 1px; align-self: stretch; background: linear-gradient(to bottom, transparent, rgba(212,175,55,0.18), transparent);` |

**Mobile (<440px):** Stack vertically. The separator becomes a horizontal line: `width: 36px; height: 1px; align-self: center;`

---

### Section 7: Botanical Divider (repeat)

Same `.bot-div`.

---

### Section 8: Venue Video Portraits ("Moving Portraits")

"Harry Potter" style moving portraits in gold frames with shimmer effect.

#### Structure

```html
<div class="sec rv">
  <p class="lbl" style="margin-bottom: 16px;">O Castelo</p>
  <div class="frame frame-lg">
    <video autoplay muted loop playsinline>
      <source src="/videos/vista-frente.mp4" type="video/mp4" />
    </video>
    <div class="frame-shine"></div>
  </div>
  <div class="frame-pair">
    <div class="frame frame-sm">
      <video autoplay muted loop playsinline>
        <source src="/videos/vista-cima-1.mp4" type="video/mp4" />
      </video>
      <div class="frame-shine"></div>
    </div>
    <div class="frame frame-sm">
      <video autoplay muted loop playsinline>
        <source src="/videos/vista-cima-2.mp4" type="video/mp4" />
      </video>
      <div class="frame-shine"></div>
    </div>
  </div>
</div>
```

#### Frame Specs

```css
.frame {
  position: relative;
  overflow: hidden;
  padding: 4px;
  background: linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02));
  border: 1px solid rgba(212,175,55,0.15);
  box-shadow: 0 2px 8px rgba(74,22,25,0.05);
  transition: border-color 500ms, box-shadow 500ms;
}

.frame:hover {
  border-color: rgba(212,175,55,0.28);
  box-shadow: 0 4px 16px rgba(74,22,25,0.08), 0 0 16px rgba(212,175,55,0.04);
}

.frame video, .frame img {
  width: 100%;
  display: block;
  object-fit: cover;
  filter: sepia(.10) saturate(.85) contrast(.92) brightness(1.02);
}

.frame-lg video { aspect-ratio: 16/9; }
.frame-sm video { aspect-ratio: 16/10; }
.frame-xs img   { aspect-ratio: 3/4; }

.frame-lg { margin-bottom: 8px; }
.frame-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; width: 100%; }
```

#### Shimmer Effect

```css
.frame-shine {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(
    105deg,
    transparent 42%,
    rgba(255,255,255,0.06) 48%,
    rgba(212,175,55,0.04) 50%,
    rgba(255,255,255,0.06) 52%,
    transparent 58%
  );
  animation: shim 8s 3s ease-in-out infinite;
}

@keyframes shim {
  0%, 100% { transform: translateX(-120%); }
  50% { transform: translateX(220%); }
}
```

---

### Section 9: Mini Photo Gallery

Three small portrait-oriented photos in gold frames, in a 3-column grid.

```html
<div class="photos rv">
  <div class="frame frame-xs">
    <img src="/photos/templo-costas.jpg" alt="" loading="lazy" />
  </div>
  <div class="frame frame-xs">
    <img src="/photos/noivos-braco.jpg" alt="" loading="lazy" />
  </div>
  <div class="frame frame-xs">
    <img src="/photos/sorriso-juntos.jpg" alt="" loading="lazy" />
  </div>
</div>
```

```css
.photos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
}
```

---

### Section 10: Botanical Divider + Closing Message

```html
<img src="/brand/botanicals/botanical-divider-v1.svg" alt="" class="bot-div rv" />

<p class="body-it rv" style="max-width: 300px;">
  Queremos voces presentes, mais do que presentes.
</p>
```

---

### Section 11: Countdown

Minimal countdown. Four units in a row.

#### Structure (unchanged from current)

```html
<div class="cd rv">
  <p class="lbl" style="margin-bottom: 14px;">Faltam</p>
  <div class="cd-grid">
    <div class="cd-u"><span class="cd-n" id="d">--</span><span class="lbl dim">Dias</span></div>
    <div class="cd-u"><span class="cd-n" id="h">--</span><span class="lbl dim">Horas</span></div>
    <div class="cd-u"><span class="cd-n" id="m">--</span><span class="lbl dim">Min</span></div>
    <div class="cd-u"><span class="cd-n" id="s">--</span><span class="lbl dim">Seg</span></div>
  </div>
</div>
```

#### Countdown Specs

```css
.cd {
  width: 100%;
  text-align: center;
  padding: 24px 0;
  border-top: 1px solid rgba(74,22,25,0.04);
  border-bottom: 1px solid rgba(74,22,25,0.04);
}

.cd-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  max-width: 280px;
  margin: 0 auto;
}

.cd-u {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.cd-n {
  font-family: 'Fraunces', serif;
  font-weight: 200;
  font-variation-settings: "opsz" 144, "SOFT" 50;
  font-size: clamp(28px, 6vw, 38px);
  line-height: 1;
  color: rgba(74, 22, 25, 0.68);
  font-variant-numeric: tabular-nums;
}
```

---

### Section 12: Botanical Divider

Same `.bot-div`.

---

### Section 13: RSVP Form

#### Structure

```html
<div class="sec rv">
  <h2 class="rsvp-h">Confirme sua presenca</h2>
  <form id="form" class="form">
    <div class="f">
      <label class="lbl">Nome completo</label>
      <input type="text" name="name" required placeholder="Seu nome" />
    </div>
    <div class="f-row">
      <div class="f">
        <label class="lbl">Acompanhantes</label>
        <select name="guests">
          <option value="0">Sozinho(a)</option>
          <option value="1">+1</option>
          <option value="2">+2</option>
          <option value="3">+3</option>
        </select>
      </div>
      <div class="f">
        <label class="lbl">Presenca</label>
        <select name="confirm" required>
          <option value="sim">Confirmo</option>
          <option value="talvez">Talvez</option>
          <option value="nao">Nao poderei</option>
        </select>
      </div>
    </div>
    <div class="f">
      <label class="lbl">Mensagem (opcional)</label>
      <textarea name="message" rows="2" placeholder="Uma palavra para os noivos..."></textarea>
    </div>
    <button type="submit" class="btn lbl">Enviar confirmacao</button>
  </form>
  <div id="ok" class="ok" hidden>
    <p class="ok-h">Obrigado!</p>
    <p class="body-it">Estamos ansiosos para celebrar com voce.</p>
  </div>
</div>
```

#### Form Specs

```css
.rsvp-h {
  font-family: 'Fraunces', serif;
  font-weight: 200;        /* Changed from 300 to 200 for consistency */
  font-style: italic;
  font-variation-settings: "opsz" 144, "SOFT" 50;
  font-size: clamp(20px, 4.5vw, 28px);
  color: var(--burgundy);
  margin: 0 0 24px;
}

.form { text-align: left; width: 100%; }
.f { margin-bottom: 14px; }
.f label { display: block; margin-bottom: 5px; }

.f input, .f select, .f textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid rgba(74, 22, 25, 0.07);
  border-radius: 0;
  font-family: 'Fraunces', serif;
  font-weight: 300;
  font-size: 14px;
  color: var(--burgundy);
  background: rgba(255, 255, 255, 0.40);
  outline: none;
  transition: border-color 300ms, box-shadow 300ms;
}

.f input::placeholder, .f textarea::placeholder {
  color: rgba(74, 22, 25, 0.14);
}

.f input:focus, .f select:focus, .f textarea:focus {
  border-color: rgba(212, 175, 55, 0.30);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.04);
}

.f textarea { resize: vertical; min-height: 50px; }
.f-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

@media (max-width: 400px) { .f-row { grid-template-columns: 1fr; } }

.btn {
  width: 100%;
  padding: 14px;
  background: var(--burgundy);
  color: #fff;
  border: none;
  cursor: pointer;
  letter-spacing: 0.35em;
  margin-top: 6px;
  transition: opacity 300ms;
}

.btn:hover { opacity: 0.88; }

.ok { text-align: center; padding: 28px 0; }
.ok-h {
  font-family: 'Fraunces', serif;
  font-weight: 200;
  font-style: italic;
  font-variation-settings: "opsz" 144, "SOFT" 50;
  font-size: 26px;
  color: var(--burgundy);
  margin-bottom: 8px;
}
```

---

### Section 14: Links Row

```html
<div class="lnk rv">
  <a href="/" class="lbl">Nosso site</a>
  <span>&middot;</span>
  <a href="/presentes" class="lbl">Presentes</a>
  <span>&middot;</span>
  <a href="/faq" class="lbl">FAQ</a>
</div>
```

```css
.lnk { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.lnk span { color: rgba(74, 22, 25, 0.10); }
.lnk a {
  color: rgba(74, 22, 25, 0.32);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 300ms;
}
.lnk a:hover {
  color: var(--burgundy);
  border-bottom-color: rgba(212, 175, 55, 0.25);
}
```

---

### Section 15: Footer Date

```html
<p class="lbl dim rv footer-date">doze &middot; junho &middot; mmxxvi</p>
```

```css
.footer-date { margin-top: 32px; }
```

---

## CARD BODY LAYOUT

The card body uses a flex column layout with consistent gaps.

```css
.inv-body {
  position: relative;
  padding: clamp(28px, 6vw, 48px) clamp(24px, 5vw, 44px) clamp(32px, 6vw, 52px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;          /* Increased from 24px for more breathing room */
}
```

### Gold Border Inset

A delicate gold border inset inside the card body.

```css
.inv-border {
  position: absolute;
  inset: 8px;         /* Slightly more inset than current 6px */
  border: 1px solid rgba(212, 175, 55, 0.08);
  pointer-events: none;
}
```

---

## BOTANICAL CORNER ORNAMENTS

For an extra invitation feel, add botanical corner ornaments at low opacity in the four corners of the card body.

```html
<!-- Inside .inv-body, after .inv-border -->
<img src="/brand/botanicals/botanical-corner-ornament-v1.svg" alt="" class="corner corner-tl" />
<img src="/brand/botanicals/botanical-corner-ornament-v1.svg" alt="" class="corner corner-tr" />
<img src="/brand/botanicals/botanical-corner-ornament-v1.svg" alt="" class="corner corner-bl" />
<img src="/brand/botanicals/botanical-corner-ornament-v1.svg" alt="" class="corner corner-br" />
```

```css
.corner {
  position: absolute;
  width: 56px;
  height: 56px;
  opacity: 0.07;
  pointer-events: none;
  filter: sepia(1) saturate(0.5) brightness(0.4) hue-rotate(330deg);
}

.corner-tl { top: 12px; left: 12px; }
.corner-tr { top: 12px; right: 12px; transform: scaleX(-1); }
.corner-bl { bottom: 12px; left: 12px; transform: scaleY(-1); }
.corner-br { bottom: 12px; right: 12px; transform: scale(-1, -1); }
```

---

## HELPER CLASSES

```css
.lbl {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.45em;
  color: rgba(74, 22, 25, 0.35);
  margin: 0;
}

.dim { opacity: 0.55; }

.gold-line {
  display: block;
  width: 26px;
  height: 1px;
  background: #D4AF37;
  opacity: 0.30;
}

.hr {
  width: 0;     /* REMOVED — replaced by .bot-div botanical dividers */
  height: 0;
  display: none;
}
```

**KEY CHANGE:** The generic `.hr` gradient lines are replaced by the `.bot-div` botanical SVG dividers. This makes the invitation feel more organic and less like a webpage with `<hr>` elements.

---

## SCROLL REVEAL ANIMATION

All `.rv` elements fade in as the user scrolls.

```css
.rv {
  opacity: 0;
  transform: translateY(10px);     /* Reduced from 12px for subtlety */
  transition:
    opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
}

.rv.show {
  opacity: 1;
  transform: none;
}
```

---

## ACCESSIBILITY

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .rv { opacity: 1; transform: none; }
  .page { opacity: 1; transform: none; pointer-events: all; }
  .cover { display: none; }
  /* Skip cover entirely — go straight to invitation */
}
```

---

## FULL JAVASCRIPT

```js
// Cover transition
const coverBtn = document.getElementById('cover-btn');
const cover = document.getElementById('cover');
const page = document.getElementById('page');

if (coverBtn && cover) {
  coverBtn.addEventListener('click', () => {
    cover.classList.add('out');
    setTimeout(() => page.classList.add('show'), 400);
    setTimeout(() => cover.remove(), 2000);
  });
}

// Scroll reveals
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      (e.target as HTMLElement).classList.add('show');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.rv').forEach(el => obs.observe(el));

// Countdown
const WEDDING = new Date('2026-06-12T21:00:00-03:00').getTime();
const $ = (id: string) => document.getElementById(id)!;

function tick() {
  const r = WEDDING - Date.now();
  if (r <= 0) return;
  $('d').textContent = String(Math.floor(r / 864e5));
  $('h').textContent = String(Math.floor((r % 864e5) / 36e5)).padStart(2, '0');
  $('m').textContent = String(Math.floor((r % 36e5) / 6e4)).padStart(2, '0');
  $('s').textContent = String(Math.floor((r % 6e4) / 1e3)).padStart(2, '0');
}
tick();
setInterval(tick, 1000);

// RSVP
const form = document.getElementById('form') as HTMLFormElement;
form?.addEventListener('submit', e => {
  e.preventDefault();
  const list = JSON.parse(localStorage.getItem('rsvp') || '[]');
  list.push(Object.fromEntries(new FormData(form)));
  localStorage.setItem('rsvp', JSON.stringify(list));
  form.hidden = true;
  document.getElementById('ok')!.hidden = false;
});
```

---

## COMPLETE HTML STRUCTURE (ordered)

```
<body>
  <!-- PART 1: Cover -->
  <div.cover#cover>
    <div.cover-photo> <img templo-costas.jpg /> </div>
    <div.cover-overlay />
    <div.cover-content>
      <p.cover-label>     "12 de junho de 2026"
      <h1.cover-name>     "Moroni"
      <p.cover-amp>        "&"
      <h1.cover-name>     "Daphine"
      <button.cover-btn>  "Abrir convite"
    </div>
  </div>

  <!-- PART 2: Invitation Card -->
  <main.page#page>
    <div.inv>

      <!-- Hero photo with names -->
      <div.inv-hero>
        <div.inv-hero-photo> <img templo-abraco-frente.jpg /> </div>
        <div.inv-hero-grad />
        <div.inv-hero-over>
          <p.lbl.hero-lbl>    "Convidam voce para celebrar"
          <h1.inv-names>      "Moroni Reis"
          <p.inv-amp>          "&"
          <h1.inv-names>      "Daphine Oliveira"
        </div>
      </div>

      <!-- Card body -->
      <div.inv-body>
        <div.inv-border />
        <img.corner.corner-tl />
        <img.corner.corner-tr />
        <img.corner.corner-bl />
        <img.corner.corner-br />

        <!-- Date -->
        <div.sec.rv.date-sec>
          <div.date-row>
            <span.date-num>    "12"
            <div.date-col>
              <span.lbl>       "Junho"
              <span.gold-line />
              <span.lbl.dim>   "2026"
            </div>
          </div>
          <p.lbl.date-time>    "Sexta-feira . 21h00"
          <p.lbl.dim.date-arrival> "Chegada recomendada as 20h20"
        </div>

        <img.bot-div.rv />      <!-- botanical divider -->

        <p.body-it.rv>          "Gostariamos de compartilhar..."

        <img.bot-div.rv />      <!-- botanical divider -->

        <!-- Venue + Dress code -->
        <div.dets.rv>
          <div.det> Local / Castelo dos Lagos / address </div>
          <div.det-sep />
          <div.det> Traje / Esporte fino / details </div>
        </div>

        <img.bot-div.rv />      <!-- botanical divider -->

        <!-- Moving portraits -->
        <div.sec.rv>
          <p.lbl>              "O Castelo"
          <div.frame.frame-lg> <video vista-frente.mp4 /> </div>
          <div.frame-pair>
            <div.frame.frame-sm> <video vista-cima-1.mp4 /> </div>
            <div.frame.frame-sm> <video vista-cima-2.mp4 /> </div>
          </div>
        </div>

        <!-- Mini photos -->
        <div.photos.rv>
          <div.frame.frame-xs> <img /> </div>  x3
        </div>

        <img.bot-div.rv />      <!-- botanical divider -->

        <p.body-it.rv>          "Queremos voces presentes..."

        <!-- Countdown -->
        <div.cd.rv> ... </div>

        <img.bot-div.rv />      <!-- botanical divider -->

        <!-- RSVP -->
        <div.sec.rv> <h2.rsvp-h> + <form> ... </form> </div>

        <!-- Links -->
        <div.lnk.rv> Site / Presentes / FAQ </div>

        <!-- Footer date -->
        <p.lbl.dim.rv.footer-date> "doze . junho . mmxxvi"
      </div>
    </div>
  </main>
</body>
```

---

## KEY CHANGES FROM CURRENT IMPLEMENTATION (Before/After/Why)

| Before | After | Why |
|--------|-------|-----|
| 3D envelope animation with flap, seal, letter slide-out | Fullscreen photo cover with ghost button + fade transition | The envelope was complex and felt gimmicky. A photo cover is calmer, more premium, and sets the emotional tone immediately. |
| Hero gradient: gentle fade ending at `rgba(74,22,25,0.45)` at 78% | Hero gradient: aggressive fade reaching `rgba(74,22,25,0.88)` at 93% | Text was illegible against bright photo regions. The new gradient guarantees a dark base behind all text without obscuring the photo's upper half. |
| Single text-shadow: `0 2px 24px rgba(74,22,25,0.45)` | Dual text-shadow: `0 1px 16px rgba(74,22,25,0.50), 0 4px 40px rgba(74,22,25,0.35)` | Two shadow layers — tight halo for crispness, wide diffusion for legibility on varied backgrounds. |
| `.hr` gradient line dividers | Botanical SVG dividers at 12% opacity | The gradient lines felt web-like. Botanical dividers feel like a printed invitation — organic, cohesive, unique. |
| No corner ornaments | Botanical corner ornaments at 7% opacity | Reinforces the invitation-card metaphor. At 7% opacity they whisper rather than shout. |
| `.dim { opacity: .6 }` | `.dim { opacity: .55 }` | Slightly softer secondary text for more hierarchy contrast. |
| Card body gap: 24px | Card body gap: 28px | More breathing room between sections — premium feel. |
| RSVP heading weight 300 | RSVP heading weight 200 | Consistency with all other Fraunces display uses (weight 200 per locked system). |

---

## DEVELOPER NOTES

1. **No Tailwind** — all styles are vanilla CSS in a scoped `<style>` block per the project convention.
2. **No new dependencies** — pure HTML/CSS/JS. No React islands.
3. **Fraunces weight 200** for all display text (confirmed locked). Weight 300 for body italic only.
4. **Film filter** on all `<img>` and `<video>`: `sepia(.12) saturate(.82) contrast(.90) brightness(1.03)`.
5. **Botanical tinting**: The SVGs are black line art. Use CSS `filter: sepia(1) saturate(0.5) brightness(0.4) hue-rotate(330deg)` to tint them burgundy-ish while keeping low opacity.
6. **Cover photo `object-position: center 30%`** — this shows the temple and sky above the couple, since they're in the lower portion of the frame (backs to camera looking at temple).
7. **The `.hr` class is deprecated** — keep the CSS rule zeroed out in case old references exist, but all dividers should use `.bot-div`.
8. **Form submission** — currently saves to localStorage. This is a placeholder. When Supabase RSVP is wired up, replace the `submit` handler.
9. **Prefers-reduced-motion** — the cover is skipped entirely (display: none), going straight to the invitation. All transitions are disabled.
10. **Portuguese accents** — all visible text must have correct accents and diacritics (a, e, o, etc.). The HTML structure above uses ASCII for spec readability, but the implementation MUST use proper Portuguese: "Gostariam**o**s", "presen**c**a" -> "presenca" etc.
