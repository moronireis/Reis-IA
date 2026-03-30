/**
 * ShaderBackground.tsx
 *
 * Full-screen GLSL fragment shader — liquid light flowing through darkness.
 * A dark base with blue energy (#4A90FF, #2D7AFF) flowing organically.
 * Responds to mouse position via uniform. Multiple noise layers for depth.
 *
 * Usage:
 *   <div className="relative">
 *     <ShaderBackground />
 *     <div className="relative z-10">Your content here</div>
 *   </div>
 */

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ─── Custom shader material ───────────────────────────────────────────────────

const FlowShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex shader
  /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  // Fragment shader — liquid light
  /* glsl */`
    precision highp float;

    uniform float uTime;
    uniform vec2  uMouse;
    uniform vec2  uResolution;
    varying vec2  vUv;

    // ── Simplex-style 2D hash ─────────────────────────────────────────────────
    vec2 hash2(vec2 p) {
      p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
      return fract(sin(p) * 43758.5453123);
    }

    // ── Smooth 2D noise ───────────────────────────────────────────────────────
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      float a = dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0));
      float b = dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
      float c = dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
      float d = dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) * 0.5 + 0.5;
    }

    // ── Fractional Brownian Motion — 5 octaves ────────────────────────────────
    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      vec2  shift = vec2(100.0);
      mat2  rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p  = rot * p * 2.0 + shift;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv;

      // Aspect-correct coordinates centered at origin
      vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

      float t = uTime * 0.18;

      // ── Layer 1: Large-scale slow drift ───────────────────────────────────
      vec2 q = vec2(fbm(p + t * 0.4), fbm(p + vec2(1.7, 9.2)));
      // ── Layer 2: Mid-scale turbulence ─────────────────────────────────────
      vec2 r = vec2(
        fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.12),
        fbm(p + 4.0 * q + vec2(8.3, 2.8) + t * 0.12)
      );
      float flow = fbm(p + 4.0 * r);

      // ── Mouse highlight: soft glow that follows cursor ─────────────────────
      vec2  mouseP = (uMouse - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
      float mouseDist = length(p - mouseP);
      float mouseGlow = smoothstep(0.6, 0.0, mouseDist) * 0.35;

      // ── Color mapping: blue energy on near-black ───────────────────────────
      vec3 colorDark  = vec3(0.02, 0.03, 0.08);   // #050510 deep base
      vec3 colorMid   = vec3(0.16, 0.44, 0.95);   // #2970F2 deep blue
      vec3 colorBright = vec3(0.29, 0.56, 1.0);   // #4A90FF accent blue
      vec3 colorCyan  = vec3(0.00, 0.71, 1.0);    // #00B4FF cyan highlight

      // Three-stop blend driven by noise
      vec3 col = mix(colorDark, colorMid, smoothstep(0.0, 0.55, flow));
      col      = mix(col, colorBright,    smoothstep(0.48, 0.72, flow));
      col      = mix(col, colorCyan,      smoothstep(0.68, 0.85, flow) * 0.6);

      // Add mouse glow
      col += colorCyan * mouseGlow;

      // ── Edge vignette: fade to pure black at edges ─────────────────────────
      float vig = 1.0 - smoothstep(0.3, 1.0, length(uv - 0.5) * 1.8);
      col *= vig;

      // ── Subtle grain for cinematic texture ────────────────────────────────
      float grain = (fract(sin(dot(uv + t * 0.01, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.018;
      col = clamp(col + grain, 0.0, 1.0);

      gl_FragColor = vec4(col, 1.0);
    }
  `
);

extend({ FlowShaderMaterial });

// Augment THREE's JSX namespace for the custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      flowShaderMaterial: any;
    }
  }
}

// ─── Scene mesh ───────────────────────────────────────────────────────────────

function FlowPlane() {
  const matRef = useRef<any>(null);
  const { size } = useThree();

  // Track mouse position
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uTime = state.clock.elapsedTime;
    matRef.current.uMouse.set(mouse.current.x, mouse.current.y);
    matRef.current.uResolution.set(size.width, size.height);
  });

  return (
    <mesh>
      {/* Full-clip-space quad — covers exactly the viewport */}
      <planeGeometry args={[2, 2]} />
      <flowShaderMaterial ref={matRef} />
    </mesh>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

interface ShaderBackgroundProps {
  className?: string;
}

export default function ShaderBackground({ className = '' }: ShaderBackgroundProps) {
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
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #1a2a5e 0%, #050510 70%)',
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
          <FlowPlane />
        </Canvas>
      </Suspense>
    </div>
  );
}
