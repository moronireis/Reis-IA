'use client';
import { useRef, useEffect, useState } from 'react';

interface Props {
  className?: string;
}

export default function CyberGridHero({ className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.4 }); // normalized 0-1
  const targetRef = useRef({ x: 0.5, y: 0.4 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const hasMouse = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio, 2);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Mouse tracking
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      targetRef.current.x = (e.clientX - rect.left) / rect.width;
      targetRef.current.y = (e.clientY - rect.top) / rect.height;
      hasMouse.current = true;
    }

    function onMouseLeave() {
      // Drift back to center
      targetRef.current.x = 0.5;
      targetRef.current.y = 0.4;
    }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    // Make canvas receive events even though it's pointer-events: none
    // We'll attach to the parent section instead
    const section = canvas.closest('section');
    if (section) {
      section.addEventListener('mousemove', onMouseMove as EventListener);
      section.addEventListener('mouseleave', onMouseLeave);
    }

    // ── Hex grid (static, drawn once per resize) ──
    let hexGridImage: ImageData | null = null;

    function buildHexGrid() {
      const offscreen = document.createElement('canvas');
      offscreen.width = width * dpr;
      offscreen.height = height * dpr;
      const octx = offscreen.getContext('2d')!;
      octx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const hexSize = 40;
      const hexH = hexSize * Math.sqrt(3);
      const cols = Math.ceil(width / (hexSize * 1.5)) + 2;
      const rows = Math.ceil(height / hexH) + 2;

      octx.strokeStyle = 'rgba(230, 57, 70, 0.022)';
      octx.lineWidth = 0.5;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const cx = col * hexSize * 1.5;
          const cy = row * hexH + (col % 2 ? hexH / 2 : 0);
          const r = hexSize * 0.55;
          octx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const px = cx + r * Math.cos(angle);
            const py = cy + r * Math.sin(angle);
            if (i === 0) octx.moveTo(px, py);
            else octx.lineTo(px, py);
          }
          octx.closePath();
          octx.stroke();
        }
      }

      hexGridImage = octx.getImageData(0, 0, offscreen.width, offscreen.height);
    }

    // ── Spotlight ──
    function drawSpotlight() {
      // Lerp mouse position (smooth follow)
      const lerp = 0.06;
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * lerp;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * lerp;

      const mx = mouseRef.current.x * width;
      const my = mouseRef.current.y * height;

      // Primary spotlight (red, large, soft)
      const r1 = Math.max(width, height) * 0.4;
      const g1 = ctx!.createRadialGradient(mx, my, 0, mx, my, r1);
      g1.addColorStop(0, 'rgba(230, 57, 70, 0.07)');
      g1.addColorStop(0.3, 'rgba(230, 57, 70, 0.035)');
      g1.addColorStop(0.6, 'rgba(42, 90, 143, 0.015)');
      g1.addColorStop(1, 'transparent');
      ctx!.fillStyle = g1;
      ctx!.fillRect(0, 0, width, height);

      // Inner spotlight (tighter, brighter)
      const r2 = Math.max(width, height) * 0.15;
      const g2 = ctx!.createRadialGradient(mx, my, 0, mx, my, r2);
      g2.addColorStop(0, 'rgba(230, 57, 70, 0.06)');
      g2.addColorStop(1, 'transparent');
      ctx!.fillStyle = g2;
      ctx!.fillRect(0, 0, width, height);
    }

    // ── Ambient base glow (always present, gives depth even without mouse) ──
    function drawAmbient(time: number) {
      // Slow breathing center glow
      const breath = Math.sin(time * 0.0004) * 0.015 + 0.04;
      const cx = width * 0.45;
      const cy = height * 0.35;
      const r = Math.max(width, height) * 0.45;
      const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `rgba(230, 57, 70, ${breath})`);
      g.addColorStop(0.5, 'rgba(42, 90, 143, 0.015)');
      g.addColorStop(1, 'transparent');
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, width, height);
    }

    // ── Vignette ──
    function drawVignette() {
      const g = ctx!.createRadialGradient(
        width * 0.5, height * 0.4,
        Math.min(width, height) * 0.2,
        width * 0.5, height * 0.5,
        Math.max(width, height) * 0.75
      );
      g.addColorStop(0, 'transparent');
      g.addColorStop(1, 'rgba(6, 6, 8, 0.5)');
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, width, height);
    }

    // ── Mobile: gentle pulse instead of mouse follow ──
    function mobilePulse(time: number) {
      if (hasMouse.current) return;
      // Slow orbital drift
      targetRef.current.x = 0.5 + Math.sin(time * 0.0002) * 0.1;
      targetRef.current.y = 0.38 + Math.cos(time * 0.00015) * 0.06;
    }

    function animate(time: number) {
      ctx!.clearRect(0, 0, width, height);

      // Mobile fallback
      mobilePulse(time);

      // Layer 1: Ambient base
      drawAmbient(time);

      // Layer 2: Static hex grid
      if (hexGridImage) {
        ctx!.putImageData(hexGridImage, 0, 0);
      }

      // Layer 3: Mouse-follow spotlight
      drawSpotlight();

      // Layer 4: Vignette
      drawVignette();

      animId = requestAnimationFrame(animate);
    }

    resize();
    buildHexGrid();
    animId = requestAnimationFrame(animate);

    const ro = new ResizeObserver(() => {
      resize();
      buildHexGrid();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      if (section) {
        section.removeEventListener('mousemove', onMouseMove as EventListener);
        section.removeEventListener('mouseleave', onMouseLeave);
      }
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div
        className={`absolute inset-0 z-0 pointer-events-none ${className}`}
        style={{
          background: `
            radial-gradient(ellipse at 45% 35%, rgba(230,57,70,0.05), transparent 50%),
            radial-gradient(ellipse at 55% 55%, rgba(42,90,143,0.03), transparent 50%)
          `,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 ${className}`}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
}
