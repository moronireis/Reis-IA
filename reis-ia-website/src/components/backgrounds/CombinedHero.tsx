/**
 * CombinedHero.tsx
 *
 * The ultimate layered hero background — three visual layers in perfect harmony:
 *
 * Layer 1 (bottom): GradientFlow nebula shader — deep space base
 * Layer 2 (middle): InteractiveGrid — mouse-reactive dot constellation overlay
 * Layer 3 (top):    Minimal particle floaters — 25 glowing particles with halos
 *
 * All layers blend for maximum depth and premium feel.
 * Mouse cursor affects both Layer 2 (grid) and Layer 3 (particles).
 *
 * Usage:
 *   <div className="relative">
 *     <CombinedHero />
 *     <div className="relative z-10">Your content here</div>
 *   </div>
 */

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ─── Re-use the nebula shader inline (avoids import coupling) ─────────────────

const CombinedNebulaShader = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
  },
  /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  /* glsl */`
    precision highp float;
    uniform float uTime;
    uniform vec2  uResolution;
    varying vec2  vUv;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p); vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
    }
    float fbm(vec2 p, float t) {
      float v = 0.0; float a = 0.52;
      mat2 rot = mat2(cos(0.4),sin(0.4),-sin(0.4),cos(0.4));
      for (int i = 0; i < 6; i++) {
        v += a * noise(p); p = rot*p*2.1 + vec2(t*0.07,t*0.05); a *= 0.5;
      }
      return v;
    }
    void main() {
      vec2 uv = vUv;
      float aspect = uResolution.x / uResolution.y;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
      float t = uTime * 0.12;
      vec2 q = vec2(fbm(p*1.8+t*0.5,t), fbm(p*1.8+vec2(5.2,1.3),t));
      vec2 r = vec2(fbm(p*1.4+4.0*q+t*0.3,t), fbm(p*1.4+4.0*q+vec2(1.7,9.2),t));
      float cloud = fbm(p + 4.8*r, t);
      vec3 black  = vec3(0.01,0.02,0.05);
      vec3 blue   = vec3(0.10,0.28,0.72);
      vec3 accent = vec3(0.29,0.56,1.00);
      vec3 cyan   = vec3(0.00,0.70,1.00);
      vec3 col = black;
      col = mix(col, blue,   smoothstep(0.30, 0.55, cloud));
      col = mix(col, accent, smoothstep(0.52, 0.70, cloud));
      col = mix(col, cyan,   smoothstep(0.66, 0.80, cloud) * 0.5);
      col = mix(col, vec3(0.6,0.8,1.0), smoothstep(0.72,0.90,cloud) * 0.4);
      float vig = 1.0 - smoothstep(0.25, 1.1, length(uv - 0.5) * 1.9);
      col *= vig * 0.95 + 0.05;
      float grain = (fract(sin(dot(uv + t*0.02, vec2(12.9898,78.233)))*43758.5453)-0.5)*0.022;
      col = clamp(col + grain, 0.0, 1.0);
      col = pow(col, vec3(0.95));
      gl_FragColor = vec4(col, 1.0);
    }
  `
);

extend({ CombinedNebulaShader });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      combinedNebulaShader: any;
    }
  }
}

function BackgroundPlane() {
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
      <combinedNebulaShader ref={matRef} />
    </mesh>
  );
}

// ─── Canvas 2D overlay: grid + floater particles ──────────────────────────────

interface Floater {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  opacity: number;
  phase: number;
  phaseSpeed: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const int = parseInt(clean, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

interface OverlayCanvasProps {
  color?: string;
}

function OverlayCanvas({ color = '#4A90FF' }: OverlayCanvasProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const [r, g, b] = hexToRgb(color);
    const GRID_SPACING  = 48;
    const DOT_RADIUS    = 1.5;
    const REACT_RADIUS  = 200;
    const FLOATER_COUNT = 25;

    let width = 0, height = 0, rafId = 0;
    const mouse = { x: -9999, y: -9999 };

    interface GridDot { x: number; y: number; co: number; cr: number; }
    let dots: GridDot[] = [];
    let floaters: Floater[] = [];

    const lerp = (a: number, _b: number, t: number) => a + (_b - a) * t;

    function buildGrid() {
      dots = [];
      const offX = (width  % GRID_SPACING) / 2;
      const offY = (height % GRID_SPACING) / 2;
      const cols = Math.ceil(width  / GRID_SPACING) + 1;
      const rows = Math.ceil(height / GRID_SPACING) + 1;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({ x: offX + col * GRID_SPACING, y: offY + row * GRID_SPACING, co: 0.06, cr: DOT_RADIUS });
        }
      }
    }

    function spawnFloaters() {
      floaters = Array.from({ length: FLOATER_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 0.8 + Math.random() * 2.8,
        opacity: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.006 + Math.random() * 0.01,
      }));
    }

    function resize() {
      width  = container!.offsetWidth;
      height = container!.offsetHeight;
      const dpr = devicePixelRatio;
      canvas!.width  = width  * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width  = width  + 'px';
      canvas!.style.height = height + 'px';
      ctx!.scale(dpr, dpr);
      buildGrid();
      spawnFloaters();
    }

    resize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const ro = new ResizeObserver(() => resize());
    ro.observe(container);

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const hasMouse = mouse.x > -1000;

      // ── Grid layer ──────────────────────────────────────────────────────
      for (const dot of dots) {
        let tOp = 0.06, tRad = DOT_RADIUS;
        if (hasMouse) {
          const dx = dot.x - mouse.x, dy = dot.y - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < REACT_RADIUS) {
            const ease = 1 - dist / REACT_RADIUS;
            const e2   = ease * ease * (3 - 2*ease);
            tOp  = 0.06 + e2 * 0.60;
            tRad = DOT_RADIUS + e2 * 2.5;
          }
        }
        dot.co = lerp(dot.co, tOp,  0.08);
        dot.cr = lerp(dot.cr, tRad, 0.08);
        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, dot.cr, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r},${g},${b},${dot.co})`;
        ctx!.fill();
      }

      // Grid spotlight
      if (hasMouse) {
        const spot = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, REACT_RADIUS);
        spot.addColorStop(0,   `rgba(${r},${g},${b},0.05)`);
        spot.addColorStop(1,   'transparent');
        ctx!.fillStyle = spot;
        ctx!.fillRect(0, 0, width, height);
      }

      // ── Floater particles ───────────────────────────────────────────────
      for (const p of floaters) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width)  p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        p.phase += p.phaseSpeed;
        const pulse = 0.7 + 0.3 * Math.sin(p.phase);
        const alpha = p.opacity * pulse;
        // Glow
        const glowR = p.radius * 9;
        const glow  = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        glow.addColorStop(0,   `rgba(${r},${g},${b},${0.18*alpha})`);
        glow.addColorStop(1,   'transparent');
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx!.fill();
        // Core
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx!.fill();
      }

      // Cursor connections to floaters
      if (hasMouse) {
        for (const p of floaters) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 220) {
            const alpha = (1 - dist/220) * 0.35;
            ctx!.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx!.lineWidth = 0.7;
            ctx!.beginPath();
            ctx!.moveTo(mouse.x, mouse.y);
            ctx!.lineTo(p.x, p.y);
            ctx!.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
    };
  }, [color]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', pointerEvents: 'none' }}
      />
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

interface CombinedHeroProps {
  className?: string;
}

export default function CombinedHero({ className = '' }: CombinedHeroProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
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
      {/* Layer 1: Nebula shader (WebGL) */}
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
            zIndex: 1,
          }}
          gl={{ alpha: false, antialias: false, powerPreference: 'high-performance' }}
          frameloop="always"
        >
          <BackgroundPlane />
        </Canvas>
      </Suspense>

      {/* Layer 2+3: Grid + floater particles (Canvas 2D) */}
      <OverlayCanvas color="#4A90FF" />
    </div>
  );
}
