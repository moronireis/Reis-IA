import { useState, useRef, useEffect, useCallback } from 'react';

interface SpacingRulerProps {
  items: Array<{
    name: string;
    cssVar: string;
    value: string;
    description?: string;
  }>;
  showPixels?: boolean;
}

/**
 * SpacingRuler — React island that shows spacing bars with JS-computed pixel widths.
 * Updates on resize. Copy-on-click for each token.
 */
export default function SpacingRuler({ items, showPixels = true }: SpacingRulerProps) {
  const [pixelWidths, setPixelWidths] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      if (!measureRef.current) return;
      const widths: Record<string, number> = {};
      items.forEach((item) => {
        const el = measureRef.current?.querySelector(`[data-token="${item.cssVar}"]`) as HTMLElement;
        if (el) {
          widths[item.cssVar] = Math.round(el.getBoundingClientRect().width);
        }
      });
      setPixelWidths(widths);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [items]);

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  return (
    <div ref={measureRef} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {items.map((item) => {
        const varText = `var(${item.cssVar})`;
        const isCopied = copied === varText;
        return (
          <div
            key={item.cssVar}
            onClick={() => handleCopy(varText)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 150ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--blue-02)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            title={`Click to copy: ${varText}`}
          >
            {/* Token name */}
            <div style={{ width: '72px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{
                fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)',
              }}>
                {item.name}
              </span>
            </div>

            {/* Visual bar */}
            <div style={{ flex: 1, position: 'relative' }}>
              <div
                data-token={item.cssVar}
                style={{
                  height: '28px',
                  width: `var(${item.cssVar})`,
                  minWidth: '4px',
                  maxWidth: '100%',
                  background: 'linear-gradient(90deg, var(--blue-15), var(--blue-08))',
                  border: '1px solid var(--blue-20)',
                  borderRadius: '4px',
                  transition: 'width 300ms ease',
                  position: 'relative',
                }}
              >
                {/* Pixel label inside bar if wide enough */}
                {showPixels && pixelWidths[item.cssVar] && pixelWidths[item.cssVar] > 40 && (
                  <span style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: 'var(--accent-blue)',
                    opacity: 0.8,
                  }}>
                    {pixelWidths[item.cssVar]}px
                  </span>
                )}
              </div>
            </div>

            {/* Value + copy indicator */}
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px', minWidth: '120px' }}>
              <span style={{
                fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                fontSize: '11px', color: 'var(--text-quaternary)',
              }}>
                {item.value}
              </span>
              <span style={{
                fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                fontSize: '9px',
                color: isCopied ? 'var(--color-success)' : 'var(--text-muted)',
                transition: 'color 200ms',
              }}>
                {isCopied ? 'copied' : ''}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
