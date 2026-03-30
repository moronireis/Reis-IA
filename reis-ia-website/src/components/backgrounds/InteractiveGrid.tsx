/**
 * InteractiveGrid.tsx
 *
 * Mouse-reactive dot grid background.
 * 2px dots on 48px spacing. Base opacity 0.08.
 * Dots within 200px of cursor increase opacity + scale smoothly.
 * A soft cursor spotlight glows at mouse position.
 * Pure Canvas 2D, requestAnimationFrame, no dependencies.
 *
 * Usage:
 *   <div className="relative">
 *     <InteractiveGrid />
 *     <div className="relative z-10">Your content here</div>
 *   </div>
 */

import { useRef, useEffect, useState } from 'react';

interface InteractiveGridProps {
  color?: string;
  spacing?: number;
  dotRadius?: number;
  reactRadius?: number;
  className?: string;
}

interface GridDot {
  x: number;
  y: number;
  currentOpacity: number;
  currentRadius: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const int = parseInt(clean, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

export default function InteractiveGrid({
  color = '#4A90FF',
  spacing = 48,
  dotRadius = 1.5,
  reactRadius = 200,
  className = '',
}: InteractiveGridProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const [r, g, b] = hexToRgb(color);

    let width  = 0;
    let height = 0;
    let rafId  = 0;
    let dots: GridDot[] = [];
    const mouse = { x: -9999, y: -9999 };

    // Lerp helper
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // ── Build dot grid ────────────────────────────────────────────────────────
    function buildGrid() {
      dots = [];
      const cols = Math.ceil(width  / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const offX = (width  % spacing) / 2;
      const offY = (height % spacing) / 2;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({
            x: offX + col * spacing,
            y: offY + row * spacing,
            currentOpacity: 0.08,
            currentRadius:  dotRadius,
          });
        }
      }
    }

    // ── Resize ────────────────────────────────────────────────────────────────
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
    }

    resize();

    // ── Mouse tracking ────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    // ── Resize observer ───────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => resize());
    ro.observe(container);

    // ── Draw loop ─────────────────────────────────────────────────────────────
    function draw() {
      ctx!.clearRect(0, 0, width, height);

      const hasMouse = mouse.x > -1000;

      for (const dot of dots) {
        let targetOpacity = 0.08;
        let targetRadius  = dotRadius;

        if (hasMouse) {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < reactRadius) {
            const proximity = 1 - dist / reactRadius;
            // Smooth falloff
            const eased = proximity * proximity * (3 - 2 * proximity);
            targetOpacity = 0.08 + eased * 0.72;
            targetRadius  = dotRadius + eased * 3.0;
          }
        }

        // Ease toward target (smooth animation)
        dot.currentOpacity = lerp(dot.currentOpacity, targetOpacity, 0.08);
        dot.currentRadius  = lerp(dot.currentRadius,  targetRadius,  0.08);

        // Draw dot
        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r},${g},${b},${dot.currentOpacity})`;
        ctx!.fill();
      }

      // Spotlight glow at cursor
      if (hasMouse) {
        const spot = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, reactRadius * 0.8);
        spot.addColorStop(0,   `rgba(${r},${g},${b},0.06)`);
        spot.addColorStop(0.5, `rgba(${r},${g},${b},0.02)`);
        spot.addColorStop(1,   'transparent');
        ctx!.fillStyle = spot;
        ctx!.fillRect(0, 0, width, height);
      }

      rafId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      ro.disconnect();
    };
  }, [mounted, reducedMotion, color, spacing, dotRadius, reactRadius]);

  if (!mounted || reducedMotion) {
    return (
      <div
        className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(74,144,255,0.08) 1px, transparent 1px)`,
          backgroundSize: `${spacing}px ${spacing}px`,
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', pointerEvents: 'none' }}
      />
    </div>
  );
}
