/**
 * ParticleField.tsx
 *
 * Premium Canvas 2D particle constellation system.
 * 90 particles with per-particle glow halos, constellation links,
 * cursor-reactive connections, and pulsing large-particle effects.
 * Pure requestAnimationFrame — no external library, full visual control.
 *
 * Usage:
 *   <div className="relative">
 *     <ParticleField />
 *     <div className="relative z-10">Your content here</div>
 *   </div>
 */

import { useRef, useEffect, useState } from 'react';

interface ParticleFieldProps {
  particleCount?: number;
  color?: string;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  phase: number;        // for pulsing
  phaseSpeed: number;
}

// Parse a hex color into [r, g, b]
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const int = parseInt(clean, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

export default function ParticleField({
  particleCount = 90,
  color = '#4A90FF',
  className = '',
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const [r, g, b] = hexToRgb(color);
    const LINK_DIST   = 150;
    const CURSOR_DIST = 250;
    const AMBIENT_GLOW_RADIUS = 0.35; // fraction of canvas width

    let width  = container.offsetWidth;
    let height = container.offsetHeight;
    let rafId  = 0;
    let mouse  = { x: -9999, y: -9999 };

    // ── Resize ──────────────────────────────────────────────────────────────
    function resize() {
      width  = container!.offsetWidth;
      height = container!.offsetHeight;
      canvas!.width  = width  * devicePixelRatio;
      canvas!.height = height * devicePixelRatio;
      canvas!.style.width  = width  + 'px';
      canvas!.style.height = height + 'px';
      ctx!.scale(devicePixelRatio, devicePixelRatio);
    }

    // ── Spawn particles ──────────────────────────────────────────────────────
    function spawnParticles(): Particle[] {
      return Array.from({ length: particleCount }, () => ({
        x:          Math.random() * width,
        y:          Math.random() * height,
        vx:         (Math.random() - 0.5) * 0.35,
        vy:         (Math.random() - 0.5) * 0.35,
        radius:     0.5 + Math.random() * 3.5,
        opacity:    0.3 + Math.random() * 0.7,
        phase:      Math.random() * Math.PI * 2,
        phaseSpeed: 0.005 + Math.random() * 0.012,
      }));
    }

    resize();
    let particles = spawnParticles();

    // ── Mouse tracking ───────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', onMouseLeave);

    // ── Resize observer ──────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      resize();
      particles = spawnParticles();
    });
    ro.observe(container);

    // ── Draw loop ─────────────────────────────────────────────────────────────
    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Ambient center glow
      const cx = width  * 0.5;
      const cy = height * 0.5;
      const ambientR = width * AMBIENT_GLOW_RADIUS;
      const ambient = ctx!.createRadialGradient(cx, cy, 0, cx, cy, ambientR);
      ambient.addColorStop(0,   `rgba(${r},${g},${b},0.04)`);
      ambient.addColorStop(1,   'transparent');
      ctx!.fillStyle = ambient;
      ctx!.fillRect(0, 0, width, height);

      // Update + draw particles
      for (const p of particles) {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulsing phase
        p.phase += p.phaseSpeed;
        const pulse = 0.7 + 0.3 * Math.sin(p.phase);

        const baseAlpha = p.opacity * pulse;

        // Glow halo (always present, stronger for larger particles)
        const glowR = p.radius * (p.radius > 2 ? 10 : 6);
        const glow  = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        const glowAlpha = (p.radius > 2 ? 0.25 : 0.12) * baseAlpha;
        glow.addColorStop(0,   `rgba(${r},${g},${b},${glowAlpha})`);
        glow.addColorStop(1,   'transparent');
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx!.fill();

        // Core dot
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r},${g},${b},${baseAlpha})`;
        ctx!.fill();
      }

      // Links between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b_ = particles[j];
          const dx = a.x - b_.x;
          const dy = a.y - b_.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.18;
            ctx!.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b_.x, b_.y);
            ctx!.stroke();
          }
        }
      }

      // Cursor connections
      if (mouse.x > -1000) {
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_DIST) {
            const alpha = (1 - dist / CURSOR_DIST) * 0.45;
            const lineGrad = ctx!.createLinearGradient(mouse.x, mouse.y, p.x, p.y);
            lineGrad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
            lineGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
            ctx!.strokeStyle = lineGrad;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(mouse.x, mouse.y);
            ctx!.lineTo(p.x, p.y);
            ctx!.stroke();
          }
        }

        // Cursor glow dot
        const cursorGlow = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 60);
        cursorGlow.addColorStop(0, `rgba(${r},${g},${b},0.12)`);
        cursorGlow.addColorStop(1, 'transparent');
        ctx!.fillStyle = cursorGlow;
        ctx!.beginPath();
        ctx!.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
        ctx!.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      ro.disconnect();
    };
  }, [mounted, reducedMotion, particleCount, color]);

  if (!mounted || reducedMotion) {
    return (
      <div
        className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
        aria-hidden="true"
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
