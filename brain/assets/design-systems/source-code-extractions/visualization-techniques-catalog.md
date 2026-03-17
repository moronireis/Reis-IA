# Master Visualization Techniques Catalog
Last updated: 2026-03-17
Sources: AIOX (brand.aioxsquad.ai), Stripe, Linear, Vercel, Apple, Morningside AI
Purpose: Every visualization technique found across all references, categorized for reuse

---

## Table of Contents

1. [Token Visualization](#1-token-visualization)
2. [Component Showcase](#2-component-showcase)
3. [Animation Demo](#3-animation-demo)
4. [Effect Demo](#4-effect-demo)
5. [Interaction Pattern](#5-interaction-pattern)
6. [Layout Pattern](#6-layout-pattern)
7. [Reis IA Implementation Guide](#7-reis-ia-implementation-guide)

---

## 1. Token Visualization

Techniques for showing colors, spacing, typography, shadows, and other design tokens as interactive demos.

---

### 1.1 Color Swatch Grid with Hairline Dividers

**Source**: AIOX (brandbook/foundations)
**What it does**: Colors displayed in a grid where 1px gap reveals the parent background as divider lines. Each swatch shows name, value, and a sample block.

**Implementation approach**:
```html
<div class="token-grid" style="
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1px;
  background: rgba(156, 156, 156, 0.15);
  border: 1px solid rgba(156, 156, 156, 0.15);
">
  <div class="swatch" style="background: #000; padding: 1.5rem;">
    <div class="swatch-sample" style="
      width: 100%;
      height: 48px;
      background: var(--color);
      border-radius: 4px;
      margin-bottom: 0.75rem;
    "></div>
    <span class="swatch-name" style="
      font-family: 'Roboto Mono', monospace;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: rgba(255,255,255,0.6);
    ">--color-primary</span>
    <span class="swatch-value" style="
      font-family: 'Roboto Mono', monospace;
      font-size: 11px;
      color: rgba(255,255,255,0.9);
    ">#D4AF37</span>
  </div>
</div>
```

**Adaptation for Reis IA**: Direct fit. Use Inter mono or system monospace for token names. Gold accent for active/selected states. The hairline grid creates a premium, technical aesthetic.

---

### 1.2 Accent Opacity Ladder

**Source**: AIOX (css-tokens-complete)
**What it does**: Shows a single accent color at 15 opacity levels (2% to 90%), displayed as horizontal bars of increasing intensity.

**Implementation approach**:
```html
<div class="opacity-ladder" style="display: flex; flex-direction: column; gap: 2px;">
  <!-- Repeat for each step -->
  <div style="display: flex; align-items: center; gap: 1rem;">
    <div style="
      width: 100%;
      height: 32px;
      background: rgba(212, 175, 55, 0.05);
      border-radius: 2px;
    "></div>
    <span style="font-family: monospace; font-size: 11px; white-space: nowrap; min-width: 80px;">
      accent-05 (5%)
    </span>
  </div>
</div>
```

**Adaptation for Reis IA**: Essential for documenting the gold accent system. Shows how gold works at different opacities for backgrounds, borders, hover states, and full accent.

---

### 1.3 Typography Scale Showcase

**Source**: AIOX (brandbook/foundations), Linear (custom properties)
**What it does**: Each type size displayed with its actual rendering, plus metadata (size, weight, line-height, letter-spacing).

**AIOX approach**: Display block with sample text + mono label showing values.
```
[64px / font-black / leading-none / tracking-tight]
Display Heading

[40px / font-bold / leading-tight / tracking-normal]
H1 Heading

[24px / font-semibold / leading-snug]
H2 Heading
```

**Linear approach**: CSS custom properties for each level with responsive overrides:
```css
--title-1-size: 3.5rem;
--title-1-line-height: 1.1;
--title-1-letter-spacing: -0.03em;
```

**Combined best practice for Reis IA**:
```html
<div class="type-specimen" style="margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2rem;">
  <div style="font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.4); margin-bottom: 0.5rem;">
    Display / 4rem / 900 / 1.1 / -0.03em
  </div>
  <div style="font-family: 'Inter', sans-serif; font-size: 4rem; font-weight: 900; line-height: 1.1; letter-spacing: -0.03em; color: #fff;">
    The quick brown fox
  </div>
</div>
```

---

### 1.4 Spacing Scale Visual Ruler

**Source**: AIOX (14-step numeric scale)
**What it does**: Each spacing value shown as a colored bar at its actual pixel width, with value label.

**Implementation approach**:
```html
<div class="spacing-scale" style="display: flex; flex-direction: column; gap: 4px;">
  <div style="display: flex; align-items: center; gap: 12px;">
    <div style="
      width: 4px;
      height: 24px;
      background: rgba(212, 175, 55, 0.6);
      border-radius: 2px;
    "></div>
    <span style="font-family: monospace; font-size: 11px; color: rgba(255,255,255,0.5);">
      --space-1: 4px
    </span>
  </div>
  <!-- width increases for each step -->
  <div style="display: flex; align-items: center; gap: 12px;">
    <div style="
      width: 180px;
      height: 24px;
      background: rgba(212, 175, 55, 0.6);
      border-radius: 2px;
    "></div>
    <span style="font-family: monospace; font-size: 11px; color: rgba(255,255,255,0.5);">
      --space-13: 180px
    </span>
  </div>
</div>
```

---

### 1.5 Shadow/Glow Comparison Cards

**Source**: Stripe (multi-layer shadows), Morningside (glow effects), AIOX (neon glow tokens)
**What it does**: Cards side by side, each demonstrating a different shadow/glow level.

**Implementation approach**:
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 24px;">
  <div style="
    background: #0f0f11;
    border: 1px solid rgba(156,156,156,0.15);
    border-radius: 8px;
    padding: 24px;
    text-align: center;
  ">
    <span style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4);">No shadow</span>
  </div>
  <div style="
    background: #0f0f11;
    border: 1px solid rgba(156,156,156,0.15);
    border-radius: 8px;
    padding: 24px;
    text-align: center;
    box-shadow: 0 0 40px rgba(212, 175, 55, 0.08);
  ">
    <span style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4);">Subtle glow</span>
  </div>
  <div style="
    background: #0f0f11;
    border: 1px solid rgba(156,156,156,0.15);
    border-radius: 8px;
    padding: 24px;
    text-align: center;
    box-shadow: 0 0 60px rgba(212, 175, 55, 0.15);
  ">
    <span style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4);">Medium glow</span>
  </div>
  <div style="
    background: #0f0f11;
    border: 1px solid rgba(156,156,156,0.15);
    border-radius: 8px;
    padding: 24px;
    text-align: center;
    box-shadow: 0 0 80px rgba(212, 175, 55, 0.25);
  ">
    <span style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4);">Strong glow</span>
  </div>
</div>
```

---

### 1.6 Border Radius Scale

**Source**: AIOX (7-value radius scale)
**What it does**: Boxes demonstrating each radius value, from sharp to fully rounded.

**Implementation approach**: Grid of identically-sized boxes, each with progressively larger border-radius. Label below each with the token name and value.

---

### 1.7 Easing Curve Visualizer

**Source**: Stripe (5+ curves), AIOX (4 curves)
**What it does**: Animated dot that travels along each easing curve, with the curve drawn as an SVG path.

**Implementation approach (CSS-only)**:
```html
<div class="easing-demo" style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
  <div style="
    width: 200px;
    height: 4px;
    background: rgba(255,255,255,0.1);
    border-radius: 2px;
    position: relative;
    overflow: visible;
  ">
    <div class="dot" style="
      width: 12px;
      height: 12px;
      background: #d4af37;
      border-radius: 50%;
      position: absolute;
      top: -4px;
      left: 0;
      animation: easeDemo 2s cubic-bezier(0.25, 0.1, 0.25, 1) infinite alternate;
    "></div>
  </div>
  <span style="font-family: monospace; font-size: 11px; color: rgba(255,255,255,0.5);">
    ease-default (0.25, 0.1, 0.25, 1)
  </span>
</div>
```

```css
@keyframes easeDemo {
  from { left: 0; }
  to { left: calc(100% - 12px); }
}
```

**Adaptation for Reis IA**: Use React state to toggle animation replay on click. Each curve gets its own row. Directly shows the "feel" of each easing function.

---

## 2. Component Showcase

Techniques for presenting component variants with state toggling.

---

### 2.1 Variant Matrix Grid

**Source**: AIOX (buttons page, cards page)
**What it does**: Component variants shown in a grid — rows are variants (primary, secondary, ghost), columns are states (default, hover, focus, disabled).

**Implementation approach**:
```html
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(156,156,156,0.15);">
  <!-- Header row -->
  <div style="background: #0a0a0a; padding: 12px; font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.4);">
    Default
  </div>
  <div style="background: #0a0a0a; padding: 12px; font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.4);">
    Hover
  </div>
  <!-- ... Focus, Disabled columns -->

  <!-- Component cells -->
  <div style="background: #000; padding: 24px; display: flex; align-items: center; justify-content: center;">
    <button class="btn-primary">Button</button>
  </div>
  <!-- ... -->
</div>
```

**Adaptation for Reis IA**: Perfect for the design system preview page. Use the hairline grid pattern. Add a mono label row header for each variant name.

---

### 2.2 Interactive State Toggler (React Island)

**Source**: Conceptual (inspired by AIOX click-to-replay, Morningside accordion)
**What it does**: A React component that shows a UI component and provides buttons/tabs to toggle between states.

**Implementation approach (Astro + React)**:
```tsx
// ComponentShowcase.tsx (React island)
import { useState } from 'react';

type State = 'default' | 'hover' | 'focus' | 'active' | 'disabled';

export function ComponentShowcase({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>('default');

  return (
    <div className="showcase">
      <div className="showcase-toolbar">
        {(['default', 'hover', 'focus', 'active', 'disabled'] as State[]).map(s => (
          <button
            key={s}
            onClick={() => setState(s)}
            className={state === s ? 'active' : ''}
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              padding: '6px 12px',
              background: state === s ? 'rgba(212,175,55,0.15)' : 'transparent',
              color: state === s ? '#d4af37' : 'rgba(255,255,255,0.4)',
              border: '1px solid ' + (state === s ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.1)'),
              cursor: 'pointer',
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <div className={`showcase-preview state-${state}`}>
        {children}
      </div>
    </div>
  );
}
```

---

### 2.3 Code + Preview Split

**Source**: Common pattern (seen across AIOX design system pages, Stripe docs)
**What it does**: Left side shows the rendered component, right side shows the code.

**Implementation approach**:
```html
<div style="display: grid; grid-template-columns: 1fr 1fr; border: 1px solid rgba(156,156,156,0.15); border-radius: 8px; overflow: hidden;">
  <!-- Preview panel -->
  <div style="background: #000; padding: 48px; display: flex; align-items: center; justify-content: center;">
    <!-- Rendered component here -->
  </div>
  <!-- Code panel -->
  <div style="background: #0a0a0a; padding: 24px; border-left: 1px solid rgba(156,156,156,0.15); overflow-x: auto;">
    <pre style="font-family: monospace; font-size: 12px; color: rgba(255,255,255,0.7); margin: 0;">
      <code>/* CSS code here */</code>
    </pre>
  </div>
</div>
```

**Mobile**: Stack vertically with `grid-template-columns: 1fr` at `max-width: 768px`.

---

### 2.4 Size Comparison Row

**Source**: AIOX (button sizes, spinner sizes)
**What it does**: Same component shown at different sizes, side by side, with size labels.

**Implementation approach**:
```html
<div style="display: flex; align-items: end; gap: 24px; padding: 32px;">
  <div style="text-align: center;">
    <button class="btn-sm">Small</button>
    <div style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 8px;">SM</div>
  </div>
  <div style="text-align: center;">
    <button class="btn-md">Medium</button>
    <div style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 8px;">MD</div>
  </div>
  <div style="text-align: center;">
    <button class="btn-lg">Large</button>
    <div style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 8px;">LG</div>
  </div>
</div>
```

---

### 2.5 Section Numbered Catalog

**Source**: AIOX (design system pages — "01 // Grid Patterns", "02 // HUD Frames")
**What it does**: Each section has a numbered mono label, creating a structured, indexed catalog feel.

**Implementation approach**:
```html
<div style="margin-bottom: 2rem;">
  <div style="
    font-family: 'Roboto Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 0.5rem;
  ">
    <span style="color: rgba(255,255,255,0.6);">[01]</span>
    <span style="color: #d4af37; margin-left: 0.5rem;">Color Tokens</span>
  </div>
  <div style="height: 1px; background: linear-gradient(90deg, #d4af37, transparent);"></div>
</div>
```

---

## 3. Animation Demo

Techniques for making animations replayable and inspectable.

---

### 3.1 Click-to-Replay Animation Cards

**Source**: AIOX (motion showcase page)
**What it does**: Each animation lives in a card. Click the card to replay the animation. Metadata shows type, duration, and technique.

**Implementation approach (React island)**:
```tsx
export function AnimationCard({
  name, type, duration, technique, children
}: {
  name: string; type: string; duration: string; technique: string;
  children: React.ReactNode;
}) {
  const [key, setKey] = useState(0);

  return (
    <div
      onClick={() => setKey(k => k + 1)}
      style={{
        background: '#0f0f11',
        border: '1px solid rgba(156,156,156,0.15)',
        borderRadius: '8px',
        padding: '24px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <div key={key} className="animation-target">
        {children}
      </div>
      <div style={{ marginTop: '16px', borderTop: '1px solid rgba(156,156,156,0.1)', paddingTop: '12px' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#d4af37', fontWeight: 600 }}>
          {name}
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
          {type} / {duration} / {technique}
        </div>
      </div>
    </div>
  );
}
```

**Key detail**: The `key` prop change forces React to unmount/remount the animation target, restarting any CSS animations.

---

### 3.2 Easing Function Comparison Racetrack

**Source**: Conceptual (inspired by Stripe's multiple easing curves, AIOX's 4 curves)
**What it does**: Multiple dots race across the screen simultaneously, each using a different easing function. Visually compares timing feels.

**Implementation approach (CSS-only with JS replay trigger)**:
```html
<div class="racetrack" style="display: flex; flex-direction: column; gap: 8px;">
  <div class="track" style="display: flex; align-items: center; gap: 12px;">
    <span style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4); min-width: 120px;">
      ease-default
    </span>
    <div style="flex: 1; height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; position: relative;">
      <div class="racer" style="
        width: 12px; height: 12px; background: #d4af37; border-radius: 50%;
        position: absolute; top: -4px; left: 0;
        animation: race 2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
      "></div>
    </div>
  </div>
  <!-- Repeat for each curve with different cubic-bezier -->
</div>
```

```css
@keyframes race {
  from { left: 0; }
  to { left: calc(100% - 12px); }
}
```

---

### 3.3 Duration Scale Demo

**Source**: AIOX (3 durations: 0.2s, 0.4s, 0.7s), Stripe (multiple values)
**What it does**: Same animation played at different speeds. Shows the "feel" of each duration value.

**Implementation approach**: Cards that animate on hover, each with a different `transition-duration`:
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px;">
  <div class="dur-demo" style="
    background: #0f0f11;
    border: 1px solid rgba(156,156,156,0.15);
    border-radius: 8px;
    padding: 24px;
    text-align: center;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    cursor: pointer;
  ">
    <div style="font-size: 24px; font-weight: 700; color: #d4af37;">150ms</div>
    <div style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 4px;">fast</div>
  </div>
  <!-- Hover scales to 1.05 at 150ms -->

  <div class="dur-demo" style="/* same but transition: ... 0.5s ease; */">
    <div style="font-size: 24px; font-weight: 700; color: #d4af37;">500ms</div>
    <div style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 4px;">slow</div>
  </div>
</div>
```

---

### 3.4 Scroll-Triggered Animation Playground

**Source**: Stripe (IntersectionObserver), AIOX (Framer Motion whileInView)
**What it does**: A scrollable container with elements that animate when they enter view. User scrolls within a contained area to see entrance animations fire.

**Implementation approach (vanilla JS)**:
```html
<div class="scroll-playground" style="
  height: 400px;
  overflow-y: auto;
  border: 1px solid rgba(156,156,156,0.15);
  border-radius: 8px;
  position: relative;
">
  <div style="height: 200px;"></div> <!-- spacer -->

  <div class="reveal-target" style="
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    padding: 24px;
    margin: 16px;
    background: #0f0f11;
    border-radius: 8px;
  ">
    Fade Up Reveal
  </div>

  <div style="height: 200px;"></div> <!-- spacer -->

  <div class="reveal-target" style="
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 0.6s ease, transform 0.6s ease;
    padding: 24px;
    margin: 16px;
    background: #0f0f11;
    border-radius: 8px;
  ">
    Scale Reveal
  </div>

  <div style="height: 400px;"></div> <!-- spacer -->
</div>

<script>
const playground = document.querySelector('.scroll-playground');
const targets = playground.querySelectorAll('.reveal-target');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0) scale(1)';
    }
  });
}, { root: playground, threshold: 0.2 });

targets.forEach(t => observer.observe(t));
</script>
```

---

### 3.5 Transition Property Inspector

**Source**: Conceptual (combining techniques from all references)
**What it does**: Hover over a card and see its transition properties displayed in real-time. Shows which properties are transitioning, their duration, and easing.

**Implementation approach**: Use CSS custom properties and `::after` pseudo-element to display transition metadata.

---

## 4. Effect Demo

Techniques for showcasing visual effects with controls.

---

### 4.1 Backdrop Blur Slider

**Source**: Morningside (frosted nav), AIOX (glass-blur tokens)
**What it does**: A slider control adjusts the backdrop-filter blur value in real-time. Text/content behind a panel becomes progressively blurred.

**Implementation approach (React island)**:
```tsx
export function BlurDemo() {
  const [blur, setBlur] = useState(10);

  return (
    <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ padding: '48px', background: '#0a0a0a' }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
          Sample text content behind the blur panel. This demonstrates
          how backdrop-filter affects readability at different levels.
        </p>
      </div>
      <div style={{
        position: 'absolute',
        inset: 0,
        top: '50%',
        background: `rgba(0, 0, 0, 0.3)`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#d4af37' }}>
          blur({blur}px)
        </span>
      </div>
      <input
        type="range"
        min={0} max={24} value={blur}
        onChange={e => setBlur(Number(e.target.value))}
        style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}
      />
    </div>
  );
}
```

---

### 4.2 Gradient Border Builder

**Source**: Morningside (gradient border glow)
**What it does**: Interactive demo showing the double-background-image gradient border technique. Controls for gradient angle, colors, and glow intensity.

**Implementation approach (React island)**:
```tsx
export function GradientBorderDemo() {
  const [angle, setAngle] = useState(135);
  const [glowIntensity, setGlowIntensity] = useState(0.15);

  const style = {
    border: '1px solid transparent',
    backgroundImage: `
      linear-gradient(${angle}deg, #0a0a0a 0%, #000000 100%),
      linear-gradient(${angle}deg, #1a1400 0%, #d4af37 100%)
    `,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    boxShadow: `0 0 50px 0 rgba(212, 175, 55, ${glowIntensity})`,
    borderRadius: '8px',
    padding: '32px',
  };

  return (
    <div>
      <div style={style}>
        <p style={{ color: '#fff', fontFamily: 'Inter, sans-serif' }}>
          Gradient border with glow effect
        </p>
      </div>
      <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
        <label style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
          Angle: {angle}deg
          <input type="range" min={0} max={360} value={angle}
            onChange={e => setAngle(Number(e.target.value))} />
        </label>
        <label style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
          Glow: {glowIntensity.toFixed(2)}
          <input type="range" min={0} max={50} value={glowIntensity * 100}
            onChange={e => setGlowIntensity(Number(e.target.value) / 100)} />
        </label>
      </div>
    </div>
  );
}
```

---

### 4.3 Pattern Overlay Gallery

**Source**: AIOX (31 patterns across 6 categories)
**What it does**: Toggle different CSS patterns (dot grids, scanlines, noise, circuit traces) on top of a sample surface.

**Implementation approach**: A base card with pattern overlays toggled via buttons. Each button activates a different CSS class.

**Key AIOX patterns to showcase**:
```css
/* Dot grid */
.pattern-dot-grid {
  background-image: radial-gradient(circle, rgba(212,175,55,0.3) 1px, transparent 1px);
  background-size: 16px 16px;
}

/* Scanlines */
.pattern-scanlines {
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 1px,
    rgba(255,255,255,0.03) 1px,
    rgba(255,255,255,0.03) 2px
  );
}

/* Noise texture (SVG filter) */
.pattern-noise::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.04;
  mix-blend-mode: overlay;
  background: url("data:image/svg+xml,..."); /* SVG fractal noise */
}
```

---

### 4.4 Film Grain Intensity Controller

**Source**: AIOX (4 levels: 5%, 10%, 15%, 25%)
**What it does**: Slider adjusts the opacity of a noise overlay on a card, demonstrating how film grain affects surface texture.

---

### 4.5 HUD Frame Builder

**Source**: AIOX (8 frame patterns with clip-path)
**What it does**: Interactive selector showing different HUD/tech frame styles applied to the same content block.

**Key CSS techniques**:
```css
/* Bracket frame */
.frame-bracket::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 20px; height: 20px;
  border-top: 2px solid #d4af37;
  border-left: 2px solid #d4af37;
}

/* Tech clipped frame */
.frame-tech {
  clip-path: polygon(
    12px 0%, calc(100% - 12px) 0%,
    100% 12px, 100% calc(100% - 12px),
    calc(100% - 12px) 100%, 12px 100%,
    0% calc(100% - 12px), 0% 12px
  );
}

/* Notch clip */
.frame-notch-tr {
  clip-path: polygon(0% 0%, calc(100% - 16px) 0%, 100% 16px, 100% 100%, 0% 100%);
}
```

---

## 5. Interaction Pattern

Techniques for making documentation and demos themselves interactive.

---

### 5.1 Hover Effect Comparison Board

**Source**: Stripe (card scale + shadow), Morningside (gradient border), AIOX (glow effects)
**What it does**: Multiple cards side by side, each demonstrating a different hover effect. User hovers over each to feel the difference.

**Implementation approach**:
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
  <!-- Card 1: Scale -->
  <div style="
    background: #0f0f11;
    border: 1px solid rgba(156,156,156,0.15);
    border-radius: 8px;
    padding: 32px;
    text-align: center;
    transition: transform 0.5s cubic-bezier(0.7, 0, 0, 1);
    cursor: pointer;
  " onmouseenter="this.style.transform='scale(1.018)'"
     onmouseleave="this.style.transform='scale(1)'">
    <div style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.15em;">
      Scale (Stripe)
    </div>
  </div>

  <!-- Card 2: Gradient border -->
  <div class="gradient-border-card" style="/* Morningside pattern */">
    <div style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.15em;">
      Gradient Border
    </div>
  </div>

  <!-- Card 3: Glow -->
  <div style="
    background: #0f0f11;
    border: 1px solid rgba(156,156,156,0.15);
    border-radius: 8px;
    padding: 32px;
    text-align: center;
    transition: box-shadow 0.4s ease;
    cursor: pointer;
  " onmouseenter="this.style.boxShadow='0 0 60px rgba(212,175,55,0.15)'"
     onmouseleave="this.style.boxShadow='none'">
    <div style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.15em;">
      Glow (AIOX)
    </div>
  </div>
</div>
```

---

### 5.2 Accordion FAQ with Icon Rotation

**Source**: AIOX (advanced page), Morningside (FAQ section)
**What it does**: Click to expand content. Icon rotates to indicate open/closed state. Background shifts to gradient on hover/open.

**Morningside implementation**:
```css
.faq-item {
  border: 1px solid rgba(156, 156, 156, 0.15);
  transition: border-color 0.3s ease, background 0.3s ease;
}

.faq-item:hover,
.faq-item.is-open {
  border: 1px solid rgba(237, 236, 228, 0.06);
  background: linear-gradient(135deg, #111413 0%, #050808 100%);
}

.faq-icon {
  transition: transform 0.3s ease;
}

.faq-item.is-open .faq-icon {
  transform: rotate(-90deg);
}

.faq-item:hover .faq-icon-code,
.faq-item.is-open .faq-icon-code {
  color: var(--accent-color); /* #0cc481 for Morningside, #d4af37 for Reis IA */
}
```

**JavaScript**:
```javascript
content.style.maxHeight = content.scrollHeight + 'px'; // Open
content.style.maxHeight = '0px'; // Close
```

---

### 5.3 Ticker Strip with Hover Pause

**Source**: Stripe (45s/90s), AIOX (30s ticker, 20s marquee)
**What it does**: Infinite horizontal scroll of items. Slows or pauses on hover.

**Implementation approach**:
```css
.ticker-track {
  display: flex;
  animation: ticker 30s linear infinite;
}

.ticker-track:hover {
  animation-play-state: paused;
  /* OR: animation-duration: 90s; for slow-down instead of pause */
}

@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

**HTML structure**: Content is duplicated 2x so the seam is invisible:
```html
<div class="ticker-container" style="overflow: hidden;">
  <div class="ticker-track">
    <div class="ticker-item">Item 1</div>
    <div class="ticker-item">Item 2</div>
    <!-- ... all items -->
    <!-- DUPLICATE all items for seamless loop -->
    <div class="ticker-item">Item 1</div>
    <div class="ticker-item">Item 2</div>
  </div>
</div>
```

---

### 5.4 Interactive Stepper/Process Visualization

**Source**: AIOX (horizontal + vertical steppers)
**What it does**: Process steps with completion states. Click to advance. Shows completed (checkmark), active (highlighted), and upcoming (dimmed) states.

**Reis IA adaptation**: Use for "How we work" / methodology section. Steps: Discovery, Strategy, Implementation, Optimization. Gold accent on active step, chess knight icon as the progress indicator.

---

### 5.5 Theme Toggle with Smooth Transition

**Source**: AIOX (Lime/Gold themes), Vercel (light/dark via localStorage)
**What it does**: Toggle between theme variants with CSS custom property transitions.

**Implementation approach**:
```css
:root {
  --accent: #d4af37;
  --surface: #000;
  --text: #fff;
  transition: --accent 0.3s ease, --surface 0.3s ease;
}

[data-theme="gold"] {
  --accent: #d4af37;
}

[data-theme="silver"] {
  --accent: #c0c0c0;
}
```

**Note**: CSS `@property` registration needed for custom property transitions:
```css
@property --accent {
  syntax: '<color>';
  inherits: true;
  initial-value: #d4af37;
}
```

---

## 6. Layout Pattern

Techniques for organizing demo grids, code + preview layouts.

---

### 6.1 Bento Grid with Spanning Items

**Source**: AIOX (12-column bento), Stripe (feature grid)
**What it does**: Grid where some items span multiple columns/rows, creating a magazine-style layout.

**Implementation approach**:
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(240px, auto);
  gap: 1px;
  background: rgba(156, 156, 156, 0.15);
}

.bento-grid > * {
  background: #000;
}

/* Spanning variants */
.span-full { grid-column: span 12; }
.span-8 { grid-column: span 8; }
.span-6 { grid-column: span 6; }
.span-4 { grid-column: span 4; }
.span-3 { grid-column: span 3; }

/* Responsive */
@media (max-width: 768px) {
  .span-8, .span-6, .span-4, .span-3 {
    grid-column: span 12;
  }
}
```

---

### 6.2 Dark/Light Section Alternation

**Source**: AIOX (LP section catalog — 16 sections alternate dark/light)
**What it does**: Sections alternate between dark and light backgrounds, creating visual rhythm.

**Implementation approach**:
```css
.section[data-variant="dark"] {
  background: #000;
  color: #fff;
}

.section[data-variant="light"] {
  background: #f4f4e8;
  color: #000;
}

/* Transition between sections */
.section {
  padding: 6rem 0;
  position: relative;
}
```

**Reis IA adaptation**: Use sparingly. Primary dark mode with occasional light sections for contrast. Gold accent works on both backgrounds.

---

### 6.3 Staircase Layout

**Source**: AIOX (How It Works section)
**What it does**: Items offset progressively, creating a descending staircase visual. Each item has `margin-top: i * 50px`.

**Implementation approach**:
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
  <div style="margin-top: 0;">Step 1: Discovery</div>
  <div style="margin-top: 50px;">Step 2: Strategy</div>
  <div style="margin-top: 100px;">Step 3: Implementation</div>
  <div style="margin-top: 150px;">Step 4: Optimization</div>
</div>
```

**Dynamic approach**:
```css
.staircase-item:nth-child(n) {
  margin-top: calc((n - 1) * 50px);
}
/* Or via Tailwind: style="margin-top: calc(var(--index) * 50px)" */
```

---

### 6.4 Contained Scroll Demo Area

**Source**: Conceptual (combined from Apple product pages, AIOX motion page)
**What it does**: A fixed-height container with internal scrolling, used to demonstrate scroll-triggered effects without requiring the user to scroll the whole page.

**Implementation approach**:
```html
<div class="demo-viewport" style="
  height: 500px;
  overflow-y: auto;
  border: 1px solid rgba(156,156,156,0.15);
  border-radius: 12px;
  position: relative;
  scroll-behavior: smooth;
">
  <!-- Scroll progress indicator -->
  <div class="scroll-progress" style="
    position: sticky;
    top: 0;
    height: 2px;
    background: linear-gradient(90deg, #d4af37 var(--progress), transparent var(--progress));
    z-index: 10;
  "></div>

  <!-- Content sections that animate on scroll -->
  <div style="height: 200vh; padding: 24px;">
    <!-- Demo content here -->
  </div>
</div>
```

---

### 6.5 Auto-Fit Responsive Grid

**Source**: AIOX (token pages, card grids)
**What it does**: Grid that automatically adjusts column count based on available width, without media queries.

```css
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
```

**Variants**:
```css
/* Tight (token swatches) */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

/* Standard (cards) */
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

/* Wide (sections) */
grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
```

---

### 6.6 Feature Grid with Named Areas (Linear)

**Source**: Linear
**What it does**: CSS Grid with named template areas for semantic layout control.

```css
.feature-grid {
  display: grid;
  grid-template-areas: "a a a a b b b b";
  gap: 16px;
}

@media (max-width: 768px) {
  .feature-grid {
    grid-template-areas:
      "a a a a"
      "b b b b";
  }
}

.feature-primary { grid-area: a; }
.feature-secondary { grid-area: b; }
```

---

### 6.7 Content Width Hierarchy

**Source**: AIOX (comprehensive width system)
**What it does**: Different max-widths for different content types ensure optimal reading experience.

```css
.container-page    { max-width: 1200px; margin: 0 auto; }
.container-wide    { max-width: 1000px; }
.container-content { max-width: 800px; }
.container-text    { max-width: 600px; }
.container-narrow  { max-width: 400px; }

/* All with responsive padding */
.container-page {
  padding-left: clamp(1rem, 3vw, 2rem);
  padding-right: clamp(1rem, 3vw, 2rem);
}
```

---

## 7. Reis IA Implementation Guide

### Stack Constraints

- **Framework**: Astro (static-first, React islands for interactivity)
- **Styling**: Tailwind CSS v4 (utility-first)
- **Font**: Inter (all weights, via Google Fonts or self-hosted)
- **No external animation libraries**: No Framer Motion, no GSAP
- **Animation approach**: CSS animations + CSS transitions + vanilla JS + React state (in islands)

### Recommended Animation Stack

```
CSS Transitions     → Hover effects, state changes, micro-interactions
CSS @keyframes      → Ticker, pulse, entrance animations, gradient shifts
IntersectionObserver → Scroll-triggered reveals (vanilla JS)
React state         → Toggle states, interactive demos, click-to-replay
scroll event + rAF  → Scroll-linked parallax (use sparingly)
CSS scroll-timeline → Progressive enhancement for modern browsers
```

### CSS Custom Properties for Animation System

```css
:root {
  /* Durations */
  --dur-instant: 100ms;
  --dur-fast: 150ms;
  --dur-normal: 250ms;
  --dur-slow: 500ms;
  --dur-slower: 700ms;
  --dur-slowest: 1000ms;

  /* Easing */
  --ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-in-out: cubic-bezier(0.45, 0.05, 0.55, 0.95);
  --ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-out-expo: cubic-bezier(0.7, 0, 0, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Reveal defaults */
  --reveal-distance: 20px;
  --reveal-duration: 0.6s;
  --stagger-delay: 80ms;

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    --dur-instant: 1ms;
    --dur-fast: 1ms;
    --dur-normal: 1ms;
    --dur-slow: 1ms;
    --dur-slower: 1ms;
    --dur-slowest: 1ms;
    --reveal-distance: 0px;
  }
}
```

### Priority Implementation Order

1. **Scroll reveal system** (IntersectionObserver + CSS classes)
2. **Frosted glass nav** (scroll-aware backdrop-filter)
3. **Card hover effects** (gradient border glow with gold accent)
4. **Button micro-interactions** (fill sweep, arrow reveal)
5. **Ticker/marquee component** (partner logos, tech badges)
6. **Click-to-replay animation cards** (React island)
7. **Easing/duration demo components** (React islands)
8. **Sticky scroll section** (methodology/process showcase)

### Pattern-to-Page Mapping

| Pattern | Page Section | Source Reference |
|---------|-------------|-----------------|
| Knockout text reveal | Hero headline | Stripe Enterprise |
| Scroll fade-in | All sections (baseline) | Stripe |
| Frosted glass nav | Site header | Morningside |
| Gradient border cards | Services/Features | Morningside |
| Card scale + glow | Service pillars | Stripe + AIOX |
| Ticker strip | Technology/partner logos | Stripe + AIOX |
| Arrow slide on hover | CTA links | Stripe + Morningside |
| Sticky scroll section | Methodology | Apple |
| Staircase layout | Process steps | AIOX |
| Bento grid | Dashboard/stats | AIOX |
| Section alternation | Full page rhythm | AIOX |
| Accordion FAQ | FAQ section | Morningside + AIOX |
| Dot grid background | Subtle hero/section bg | AIOX patterns |
| HUD bracket frames | Feature cards | AIOX patterns |
