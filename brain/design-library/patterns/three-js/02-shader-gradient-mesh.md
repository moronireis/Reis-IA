# Shader Gradient Mesh Backdrop

**Category**: three-js
**Difficulty**: advanced
**Dependencies**: `three@^0.162.0`, `@react-three/fiber@^8.15.0`

**Use when**: You need a living, fullscreen ambient backdrop richer than CSS radial gradients — hero-behind, section dividers, or "what IS that" moments.

## What it does
Renders a full-viewport plane with a custom fragment shader that generates a slowly morphing gradient mesh using layered simplex noise. Colors are REIS [IA] dark + #4A90FF accent. Animates on a uniform time clock, costs ~1 draw call.

## Why REIS [IA]
This is the background for the home hero, the `/builders` manifesto section, or any place where flat black feels too flat. The shader version (vs. the CSS version in SEED #7) moves organically instead of looping obviously — the difference between "premium" and "signature."

## Implementation

```tsx
// GradientMeshBackdrop.tsx
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;

  // simplex-ish cheap noise
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
  }

  void main(){
    vec2 uv = vUv;
    float t = uTime * 0.08;

    float n1 = noise(uv * 2.0 + vec2(t, -t));
    float n2 = noise(uv * 3.5 + vec2(-t * 1.3, t * 0.7));
    float n  = (n1 * 0.6 + n2 * 0.4);

    vec3 base  = vec3(0.0);                        // #000000
    vec3 blue  = vec3(0.286, 0.565, 1.0);          // #4A90FF
    vec3 deep  = vec3(0.176, 0.478, 1.0);          // #2D7AFF

    float mask = smoothstep(0.35, 0.9, n);
    vec3 col = mix(base, blue, mask * 0.35);
    col = mix(col, deep, smoothstep(0.55, 0.95, n2) * 0.25);

    // vignette
    float v = smoothstep(1.2, 0.3, length(uv - 0.5));
    col *= mix(0.75, 1.0, v);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Mesh() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  useFrame((s) => {
    if (mat.current) mat.current.uniforms.uTime.value = s.clock.elapsedTime;
  });
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(1, 1) },
        }}
      />
    </mesh>
  );
}

export function GradientMeshBackdrop() {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) {
    // static CSS fallback — still on-brand
    return (
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background:
            'radial-gradient(at 30% 40%, rgba(74,144,255,.22), transparent 55%), #000',
        }}
      />
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ antialias: false, alpha: false }}
        dpr={[1, 1.5]}
      >
        <Mesh />
      </Canvas>
    </div>
  );
}
```

## Gotchas
- This shader is cheap but NOT free — never stack two of these on the same page. One ambient backdrop per view.
- `dpr={[1, 1.5]}` is deliberate — shader fill rate dominates cost, so capping DPR is the #1 perf lever.
- `prefers-reduced-motion` MUST fall back to the static CSS gradient — a still shader frame still costs a draw call per tick.
- Never animate `uTime` faster than `0.1` — it starts reading as "screensaver" instead of "ambient."
- Pointer events disabled on the container, otherwise it steals clicks from content above.

## Variants
- Swap the color stops for the Builders layer (`#2D7AFF` + `#00B4FF`) on `/builders` pages.
- Reduce `n2` octave and push `mask` threshold to 0.6 for a more restrained Systems look.
- Add a second pass with `mix-blend-mode: screen` over a noise SVG (SEED #6) for film-grain texture on top.

## Reference
Inspired by Stripe homepage gradient, Linear landing page shader, SEED.md pattern #7 (CSS version).
