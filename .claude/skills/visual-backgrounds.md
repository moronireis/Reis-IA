# Skill: Visual Backgrounds & Interactive Effects

**When to use:** Whenever an animated background, section visual effect, particles, animated gradients, organic textures, or any decorative page element is requested.

**Rules:**
1. NEVER use simple CSS gradient animation with basic keyframes. That is the minimum -- we want Framer/Stripe level.
2. Every background must be an isolated React component (e.g., `<HeroBackground />`, `<SectionGlow />`, `<ParticleField />`) with `position: absolute; inset: 0; z-index: 0; pointer-events: none;` by default.
3. Section content sits ABOVE with `position: relative; z-index: 1;`.

**Available stack and when to use each:**

| Desired Effect | Library | Approach |
|---|---|---|
| Fluid gradients, aurora, mesh gradient, organic blobs | `@react-three/fiber` + `@react-three/drei` | Use `<Canvas>` with `<MeshDistortMaterial>` or custom GLSL shaders |
| Animated gradients Stripe/Linear style | `shadergradient` | `<ShaderGradientCanvas>` component -- plug-and-play with visual editor |
| Particles, constellations, links, snow, trails | `@tsparticles/react` + `@tsparticles/slim` | `<Particles>` component with presets or custom config |
| Parallax, scroll-driven animations | `framer-motion` | `useScroll()`, `useTransform()`, `useMotionValue()` |
| Complex timelines, scroll-triggered reveals | `gsap` + `ScrollTrigger` | `gsap.to()` with `ScrollTrigger.create()` |
| Organic noise/grain textures | `simplex-noise` | Generate procedural noise on canvas 2D or pass to shaders |

**Project default palette:**
- Primary blue: `#4A90FF` (Reis IA master brand)
- Soft blue: `#6AADFF` (Moroni Reis personal brand)
- Base background: `#0A0F1C` or `#000000`
- Accents: blue variations with opacity

**Component template (base pattern):**
```tsx
// src/components/backgrounds/HeroBackground.tsx
import { useRef } from 'react';

interface BackgroundProps {
  variant?: 'shader' | 'particles' | 'gradient';
  intensity?: number;
  className?: string;
}

export default function HeroBackground({
  variant = 'shader',
  intensity = 0.5,
  className = ''
}: BackgroundProps) {
  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Implement variant here */}
    </div>
  );
}
```

**Performance:**
- Always use `will-change: transform` on animated containers
- Respect `prefers-reduced-motion` -- disable heavy animations
- WebGL shaders: limit to 30fps when possible, pause when out of viewport
- tsParticles: use `@tsparticles/slim` (not full) for smaller bundle
- Lazy load R3F components with `React.lazy()` + `Suspense`

**What NOT to do:**
- Simple CSS gradient animation with basic keyframes -- that is generic
- Divs with border-radius: 50% and blur as "blob" -- that is placeholder
- Backgrounds that compete with content -- always subtle, serving the brand
- Effects without fallback for mobile/low-end devices
