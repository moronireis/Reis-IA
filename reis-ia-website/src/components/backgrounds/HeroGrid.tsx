import { useRef, useEffect, useState } from 'react';

export default function HeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, rafId = 0;
    const mouse = { x: -9999, y: -9999 };
    const SP = 52, BR = 1, REPEL = 160;
    let dots: { x: number; y: number; offX: number; offY: number }[] = [];

    function resize() {
      w = container!.offsetWidth;
      h = container!.offsetHeight;
      const dpr = Math.min(devicePixelRatio, 2);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + 'px';
      canvas!.style.height = h + 'px';
      ctx!.scale(dpr, dpr);
      dots = [];
      for (let y = SP / 2; y < h; y += SP)
        for (let x = SP / 2; x < w; x += SP)
          dots.push({ x, y, offX: 0, offY: 0 });
    }

    resize();

    const onMove = (e: MouseEvent) => {
      const r = container!.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener('mousemove', onMove, { passive: true });
    container.addEventListener('mouseleave', onLeave);

    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(container);

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const hm = mouse.x > -1000;
      for (const d of dots) {
        let tox = 0, toy = 0;
        if (hm) {
          const dx = d.x - mouse.x, dy = d.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL && dist > 0) {
            const f = 1 - dist / REPEL;
            const e = f * f;
            tox = (dx / dist) * e * 25;
            toy = (dy / dist) * e * 25;
          }
        }
        d.offX += (tox - d.offX) * 0.06;
        d.offY += (toy - d.offY) * 0.06;
        ctx!.fillStyle = 'rgba(74,144,255,0.07)';
        ctx!.beginPath();
        ctx!.arc(d.x + d.offX, d.y + d.offY, BR, 0, Math.PI * 2);
        ctx!.fill();
      }
      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      ro.disconnect();
    };
  }, [mounted]);

  if (!mounted) return <div style={{ position: 'absolute', inset: 0 }} />;

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} aria-hidden="true">
      <canvas ref={canvasRef} style={{ display: 'block' }} />
      {/* Center glow */}
      <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 500, background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(74,144,255,0.05) 0%, transparent 60%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
    </div>
  );
}
