/**
 * GradientFlow.tsx
 *
 * Full-screen nebula shader background using React Three Fiber.
 * Animated fBm noise-based gradient — blue nebula clouds in dark space.
 * 3 color stops: deep black, accent blue, subtle cyan.
 * Grain/noise overlay baked into the shader for cinematic texture.
 *
 * Usage:
 *   <div className="relative">
 *     <GradientFlow />
 *     <div className="relative z-10">Your content here</div>
 *   </div>
 */

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ─── Nebula shader material ───────────────────────────────────────────────────

const NebulaShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    precision highp float;

    uniform float uTime;
    uniform vec2  uResolution;
    varying vec2  vUv;

    // ── Noise primitives ──────────────────────────────────────────────────────
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    // ── fBm — 6 octaves, slow drift ───────────────────────────────────────────
    float fbm(vec2 p, float t) {
      float v = 0.0;
      float a = 0.52;
      mat2 rot = mat2(cos(0.4), sin(0.4), -sin(0.4), cos(0.4));
      for (int i = 0; i < 6; i++) {
        v += a * noise(p);
        p  = rot * p * 2.1 + vec2(t * 0.07, t * 0.05);
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv;
      float aspect = uResolution.x / uResolution.y;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

      float t = uTime * 0.12;

      // Two warp passes for organic cloudlike shapes
      vec2 q = vec2(fbm(p * 1.8 + t * 0.5, t), fbm(p * 1.8 + vec2(5.2, 1.3), t));
      vec2 r = vec2(fbm(p * 1.4 + 4.0 * q + t * 0.3, t), fbm(p * 1.4 + 4.0 * q + vec2(1.7, 9.2), t));
      float cloud = fbm(p + 4.8 * r, t);

      // ── Deep-space color palette ──────────────────────────────────────────
      // stop 0: pure space black
      vec3 black  = vec3(0.01, 0.02, 0.05);
      // stop 1: deep nebula blue
      vec3 blue   = vec3(0.10, 0.28, 0.72);
      // stop 2: accent blue
      vec3 accent = vec3(0.29, 0.56, 1.00);
      // stop 3: cyan edge
      vec3 cyan   = vec3(0.00, 0.70, 1.00);

      // Map noise to color
      vec3 col = black;
      col = mix(col, blue,   smoothstep(0.30, 0.55, cloud));
      col = mix(col, accent, smoothstep(0.52, 0.70, cloud));
      col = mix(col, cyan,   smoothstep(0.66, 0.80, cloud) * 0.5);

      // ── Bright nebula core — subtle inner bloom ───────────────────────────
      float core = smoothstep(0.72, 0.90, cloud);
      col = mix(col, vec3(0.6, 0.8, 1.0), core * 0.4);

      // ── Deep vignette ─────────────────────────────────────────────────────
      float vig = 1.0 - smoothstep(0.25, 1.1, length(uv - 0.5) * 1.9);
      col *= vig * 0.95 + 0.05;

      // ── Grain overlay ─────────────────────────────────────────────────────
      float grain = (fract(sin(dot(uv + t * 0.02, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.022;
      col = clamp(col + grain, 0.0, 1.0);

      // ── Gamma-ish tone correction ─────────────────────────────────────────
      col = pow(col, vec3(0.95));

      gl_FragColor = vec4(col, 1.0);
    }
  `
);

extend({ NebulaShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      nebulaShaderMaterial: any;
    }
  }
}

// ─── Scene ────────────────────────────────────────────────────────────────────

function NebulaPlane() {
  const matRef = useRef<any>(null);
  const { size } = useThree();

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uTime = state.clock.elapsedTime;
    matRef.current.uResolution.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <nebulaShaderMaterial ref={matRef} />
    </mesh>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

interface GradientFlowProps {
  className?: string;
}

export default function GradientFlow({ className = '' }: GradientFlowProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const fallback = (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse 70% 50% at 40% 50%, #1a3a7a 0%, #050510 70%)',
      }}
    />
  );

  if (!mounted || reducedMotion) {
    return (
      <div
        className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
        aria-hidden="true"
      >
        {fallback}
      </div>
    );
  }

  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    >
      <Suspense fallback={fallback}>
        <Canvas
          dpr={[1, 1.5]}
          orthographic
          camera={{ near: -1, far: 1, zoom: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          gl={{ alpha: false, antialias: false, powerPreference: 'high-performance' }}
          frameloop="always"
        >
          <NebulaPlane />
        </Canvas>
      </Suspense>
    </div>
  );
}
