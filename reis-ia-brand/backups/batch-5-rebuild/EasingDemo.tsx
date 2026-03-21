import { useState, useRef, useCallback, useEffect } from 'react';

interface EasingDemoProps {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

/**
 * EasingDemo — React island with animated ball AND visual bezier curve.
 * Click to replay. Shows CSS cubic-bezier value with copy button.
 */
export default function EasingDemo({ name, cssVar, value, description }: EasingDemoProps) {
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parse cubic-bezier values
  const match = value.match(/cubic-bezier\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/);
  const [x1, y1, x2, y2] = match ? [parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]), parseFloat(match[4])] : [0.25, 0.1, 0.25, 1];

  // Draw bezier curve
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 80;
    const h = 80;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const pos = (i / 4) * w;
      ctx.beginPath(); ctx.moveTo(pos, 0); ctx.lineTo(pos, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, pos); ctx.lineTo(w, pos); ctx.stroke();
    }

    // Diagonal reference (linear)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(w, 0);
    ctx.stroke();
    ctx.setLineDash([]);

    // Control point lines
    ctx.strokeStyle = 'rgba(74, 144, 255, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(x1 * w, (1 - y1) * h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w, 0);
    ctx.lineTo(x2 * w, (1 - y2) * h);
    ctx.stroke();

    // Control points
    ctx.fillStyle = 'rgba(74, 144, 255, 0.5)';
    ctx.beginPath(); ctx.arc(x1 * w, (1 - y1) * h, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x2 * w, (1 - y2) * h, 3, 0, Math.PI * 2); ctx.fill();

    // Bezier curve
    ctx.strokeStyle = 'var(--accent-blue, #4A90FF)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.bezierCurveTo(x1 * w, (1 - y1) * h, x2 * w, (1 - y2) * h, w, 0);
    ctx.stroke();
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
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [value]);

  return (
    <div
      onClick={play}
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border-default)',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 200ms',
        position: 'relative',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-visible)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } }}
      aria-label={`Play ${name} easing animation`}
    >
      {/* Top section: curve + animation */}
      <div style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        {/* Bezier curve canvas */}
        <canvas ref={canvasRef} style={{ flexShrink: 0 }} />

        {/* Animation track (vertical) */}
        <div style={{ flex: 1 }}>
          {/* Horizontal track */}
          <div style={{ height: '4px', background: 'var(--surface-3)', borderRadius: '2px', position: 'relative', overflow: 'visible' }}>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: playing ? 'calc(100% - 14px)' : '0',
                transform: 'translateY(-50%)',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: 'var(--accent-blue)',
                boxShadow: '0 0 12px rgba(74, 144, 255, 0.4)',
                transition: playing ? `left 1200ms ${value}` : 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom section: metadata */}
      <div style={{ padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' as const,
              letterSpacing: '0.04em', color: 'var(--accent-blue)',
            }}>
              {name}
            </span>
            <span style={{
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: '10px', color: 'var(--text-muted)',
            }}>
              {cssVar}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleCopy(); }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
              borderRadius: '4px', fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: '10px',
              color: copied ? 'var(--color-success)' : 'var(--text-quaternary)',
              transition: 'color 200ms',
            }}
            title={`Copy: ${value}`}
          >
            {copied ? 'copied' : 'copy'}
          </button>
        </div>
        <div style={{
          fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          fontSize: '10px', color: 'var(--text-quaternary)', wordBreak: 'break-all',
        }}>
          {value}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
          {description}
        </div>
      </div>

      {/* Replay label */}
      <div style={{
        position: 'absolute', bottom: '8px', right: '12px',
        fontFamily: 'ui-monospace, SFMono-Regular, monospace',
        fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' as const,
        letterSpacing: '0.1em',
      }}>
        click to replay
      </div>
    </div>
  );
}
