---
name: Background shader patterns
description: Confirmed working R3F shader material pattern for full-screen GLSL backgrounds in Astro
type: project
---

Confirmed working architecture for full-screen GLSL shader backgrounds in this Astro + R3F project.

**Key pattern: orthographic camera + clip-space quad**

Use `orthographic` camera with `near: -1, far: 1, zoom: 1` and a `<planeGeometry args={[2, 2]} />` to fill the exact viewport without any camera math. Do NOT use a perspective camera for full-screen shaders — the plane won't fill the viewport.

```tsx
<Canvas
  orthographic
  camera={{ near: -1, far: 1, zoom: 1 }}
  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
  gl={{ alpha: false, antialias: false, powerPreference: 'high-performance' }}
  frameloop="always"
>
  <mesh>
    <planeGeometry args={[2, 2]} />
    <myShaderMaterial ref={matRef} />
  </mesh>
</Canvas>
```

**Custom shader material with shaderMaterial + extend:**

```tsx
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const MyMaterial = shaderMaterial({ uTime: 0, uResolution: new THREE.Vector2() }, vertGlsl, fragGlsl);
extend({ MyMaterial });

// Then declare in JSX namespace:
declare global {
  namespace JSX {
    interface IntrinsicElements {
      myMaterial: any;
    }
  }
}
```

**SSR guard:** Always gate WebGL canvas behind `mounted` state (useEffect sets to true). The fallback during SSR/hydration is a CSS gradient div with matching colors.

**Canvas 2D pattern for particle/grid effects:**
- Use `useRef<HTMLCanvasElement>` + `useRef<HTMLDivElement>` for the container
- Set canvas dimensions via `container.offsetWidth * devicePixelRatio` and call `ctx.scale(dpr, dpr)` after resize
- Use `ResizeObserver` to rebuild grid/particles on container resize
- Track mouse via `window.addEventListener('mousemove')` with `canvas.getBoundingClientRect()` for local coords

**Why:** The shader approach avoids shadergradient library loading issues (confirmed in GradientFlow.tsx v1). The clip-space quad pattern is simpler and more reliable than trying to match a perspective camera frustum to viewport.
