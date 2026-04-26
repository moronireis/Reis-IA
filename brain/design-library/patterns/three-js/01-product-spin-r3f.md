# Product Spin (R3F + Drei)

**Category**: three-js
**Difficulty**: intermediate
**Dependencies**: `three@^0.162.0`, `@react-three/fiber@^8.15.0`, `@react-three/drei@^9.96.0`

**Use when**: Showcasing a 3D product / device / logo in hero that the user can drag to rotate.

## What it does
Renders a GLTF model inside a studio-lit R3F canvas with spring-physics drag controls. The model reacts to mouse/touch with natural inertia and snaps back to a resting angle when released.

## Why REIS [IA]
Used for hero product demos of REIS IA HUB (interface mockup as 3D card), for the Z7/H1-B Hourglass mark as a floating volumetric object, or for any mentee case study with a physical product. Studio environment keeps the aesthetic clean; the tactile drag tells visitors "this page is alive." Dark background, #4A90FF rim light.

## Implementation

```tsx
// ProductSpin.tsx
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  PresentationControls,
  ContactShadows,
  useGLTF,
} from '@react-three/drei';
import type { Group } from 'three';

function Model({ url }: { url: string }) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(url);

  // gentle idle breathing while at rest
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
  });

  return <primitive ref={ref} object={scene} />;
}

export function ProductSpin({ modelUrl }: { modelUrl: string }) {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div style={{ width: '100%', height: '70vh', background: '#000' }}>
      <Canvas
        camera={{ position: [0, 0.2, 4.5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.15} />
        <spotLight
          position={[6, 8, 6]}
          intensity={1.4}
          angle={0.3}
          penumbra={1}
          castShadow
        />
        {/* REIS [IA] accent rim light */}
        <pointLight position={[-5, 2, -3]} intensity={2} color="#4A90FF" />

        <Suspense fallback={null}>
          <PresentationControls
            global
            enabled={!reduce}
            polar={[-Math.PI / 6, Math.PI / 6]}
            azimuth={[-Math.PI / 2, Math.PI / 2]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 300 }}
          >
            <Model url={modelUrl} />
          </PresentationControls>
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.5}
            scale={8}
            blur={2.4}
            far={3}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/your-product.glb');
```

## Gotchas
- Always wrap models in `<Suspense>` — GLTF loading is async and will crash the tree without it.
- `prefers-reduced-motion`: disable `PresentationControls` (via `enabled`) AND skip `useFrame` idle motion. Render a still shot.
- GLB files > 2MB should be Draco-compressed (`gltf-pipeline -i in.glb -o out.glb -d`). Budget: 500KB-1.5MB per hero.
- `dpr={[1, 2]}` caps retina overdraw on 3x displays — never use raw `window.devicePixelRatio`, it kills low-end GPUs.
- Mount the canvas only when the hero is in viewport (IntersectionObserver gate) to avoid spinning WebGL on unread pages.

## Variants
- Replace `Environment preset="studio"` with `"city"` for more dramatic reflections on metallic surfaces.
- Lock `polar` to `[0, 0]` for horizontal-only rotation (watch-faces, rings).
- Add `<EffectComposer>` + `<Bloom>` from `@react-three/postprocessing` to make the rim light glow (use sparingly — costs ~3ms/frame).

## Reference
SEED.md pattern #3. Canonical: Apple AirPods page, Stripe Press Kit, Vercel Geist 3D logo.
