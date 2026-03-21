2026-03-17 -- Batch 5 Rebuild: Visual pages (effects, patterns, motion, vfx)

## What changes

Complete rebuild of 4 visual pages with AIOX-level interactive demos:
- effects.astro: Sapphire Scanner speed slider, ambient pool toggles, grain opacity slider, correct H1-B SVG watermark
- patterns.astro: Hairline grid organized demos, all card variants live, working forms, CTA patterns
- motion.astro: FLAGSHIP page -- bezier canvas, animated tracks, stagger sliders, scroll container demos
- vfx.astro: Aurora orb controls, mesh gradient, text reveal, counter, magnetic hover, gradient border glow

New/rebuilt React components:
- EffectsDemo.tsx (Sapphire Scanner with speed slider)
- GrainInteractiveDemo.tsx (grain with opacity slider)
- WatermarkDemo.tsx (correct H1-B SVG with opacity slider)
- MotionEasingGrid.tsx (hairline grid of easing curves with canvas + animated track)
- MotionDurationGrid.tsx (hairline grid of duration bars with click-to-replay)
- EntranceAnimGrid.tsx (hairline grid of 4 entrance types with click-to-replay)
- StaggerConfigDemo.tsx (configurable delay/duration sliders)
- ScrollRevealContainer.tsx (simulated scroll container with reveal items)
- CardHoverDemo.tsx (3-tier card hover live demo)
- VfxAuroraDemo.tsx (3-orb with orb count/speed toggle)
- GradientBorderGlowDemo.tsx (Morningside-style in blue)

## Files that will be modified

- src/pages/brandbook/effects.astro
- src/pages/brandbook/patterns.astro
- src/pages/brandbook/motion.astro
- src/pages/brandbook/vfx.astro

## Files backed up

- effects.astro
- patterns.astro
- motion.astro
- vfx.astro
- All existing demo components (RotatingBorderDemo.tsx, AmbientPoolDemo.tsx, GrainDemo.tsx, EasingDemo.tsx, DurationDemo.tsx, ScrollRevealDemo.tsx, StaggerGridDemo.tsx, AuroraDemo.tsx, MeshGradientDemo.tsx, ParallaxDemo.tsx, SectionTransitionDemo.tsx, TextRevealDemo.tsx, CounterDemo.tsx, MagneticDemo.tsx)
