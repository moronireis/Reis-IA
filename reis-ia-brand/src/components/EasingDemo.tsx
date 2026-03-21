import { useState, useRef, useCallback, useEffect } from 'react';

interface EasingDemoProps {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

/**
 * EasingDemo — Hairline grid cell with canvas bezier curve + animated ball on track.
 * Click to replay. AIOX-style metadata layout with copy.
 */
export default function EasingDemo({ name, cssVar, value, description }: EasingDemoProps) {
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parse cubic-bezier values
  const match = value.match(/cubic-bezier\(([\d.]+),\s*([\d.-]+),\s*([\d.]+),\s*([\d.-]+)\)/);
  const [x1, y1, x2, y2] = match ? [parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]), parseFloat(match[4])] : [0.25, 0.1, 0.25, 1];

  // Draw bezier curve on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 100;
    const h = 100;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const pos = (i / 4) * w;
      ctx.beginPath(); ctx.moveTo(pos, 0); ctx.lineTo(pos, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, pos); ctx.lineTo(w, pos); ctx.stroke();
    }

    // Linear reference (diagonal)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(w, 0); ctx.stroke();
    ctx.setLineDash([]);

    // Control point handles
    ctx.strokeStyle = 'rgba(74, 144, 255, 0.20)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(x1 * w, (1 - y1) * h); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w, 0); ctx.lineTo(x2 * w, (1 - y2) * h); ctx.stroke();

    // Control points
    ctx.fillStyle = 'rgba(74, 144, 255, 0.6)';
    ctx.beginPath(); ctx.arc(x1 * w, (1 - y1) * h, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x2 * w, (1 - y2) * h, 3.5, 0, Math.PI * 2); ctx.fill();

    // Bezier curve
    ctx.strokeStyle = '#4A90FF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.bezierCurveTo(x1 * w, (1 - y1) * h, x2 * w, (1 - y2) * h, w, 0);
    ctx.stroke();

    // Start/end dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath(); ctx.arc(0, h, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(w, 0, 2, 0, Math.PI * 2); ctx.fill();
  }, [x1, y1, x2, y2]);

  const play = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPlaying(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPlaying(true);
        timeoutRef.current = setTimeout(() => setPlaying(false), 1500);
      });
    });
  }, []);

  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(value); } catch {
      const ta = document.createElement('textarea'); ta.value = value;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [value]);

  return (
    <div
      onClick={play}
      style={{
        background: 'var(--surface-0)',
        cursor: 'pointer',
        position: 'relative',
        padding: '20px',
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } }}
      aria-label={`Play ${name} easing animation`}
    >
      {/* Top metadata */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <span style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '12px', fontWeight: 700,
            color: 'var(--accent-blue)', textTransform: 'uppercase' as const, letterSpacing: '0.04em',
          }}>{name}</span>
          <span style={{
            display: 'block', fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px',
          }}>{cssVar}</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); handleCopy(); }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '2px 8px',
            borderRadius: '4px', fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '10px', color: copied ? 'var(--color-success)' : 'var(--text-quaternary)',
            transition: 'color 200ms',
          }}
          title={`Copy: ${value}`}
        >{copied ? 'copied' : 'copy'}</button>
      </div>

      {/* Canvas + animated track */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flex: 1 }}>
        <canvas ref={canvasRef} style={{ flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '12px' }}>
          {/* Horizontal track */}
          <div style={{ height: '4px', background: 'var(--surface-3)', borderRadius: '2px', position: 'relative', overflow: 'visible' }}>
            <div style={{
              position: 'absolute', top: '50%', left: playing ? 'calc(100% - 14px)' : '0',
              transform: 'translateY(-50%)', width: '14px', height: '14px', borderRadius: '50%',
              background: 'var(--accent-blue)', boxShadow: '0 0 12px rgba(74, 144, 255, 0.4)',
              transition: playing ? `left 1200ms ${value}` : 'none',
            }} />
          </div>
          {/* Value display */}
          <div style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '9px',
            color: 'var(--text-quaternary)', wordBreak: 'break-all',
          }}>{value}</div>
        </div>
      </div>

      {/* Description */}
      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '12px', lineHeight: 1.4 }}>
        {description}
      </div>

      {/* Replay label */}
      <span style={{
        position: 'absolute', bottom: '8px', right: '12px',
        fontFamily: 'ui-monospace, SFMono-Regular, monospace',
        fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.1em',
        opacity: 0.6,
      }}>click to replay</span>
    </div>
  );
}
