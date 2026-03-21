import { useState, useCallback } from 'react';

interface SurfaceInteractiveDemoProps {
  className?: string;
}

const surfaces = [
  { tier: 0, name: 'Void', hex: '#000000', cssVar: '--surface-0', usage: 'Page background' },
  { tier: 1, name: 'Base', hex: '#0A0A0A', cssVar: '--surface-1', usage: 'Section alternation' },
  { tier: 2, name: 'Raised', hex: '#111111', cssVar: '--surface-2', usage: 'Card backgrounds' },
  { tier: 3, name: 'Elevated', hex: '#161616', cssVar: '--surface-3', usage: 'Card hover, inputs' },
  { tier: 4, name: 'Float', hex: '#1A1A1A', cssVar: '--surface-4', usage: 'Dropdowns, tooltips' },
];

/**
 * SurfaceInteractiveDemo — Click on surface tiers to highlight them.
 * Shows the nested depth stack with interactive highlighting.
 */
export default function SurfaceInteractiveDemo({ className }: SurfaceInteractiveDemoProps) {
  const [activeTier, setActiveTier] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

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

  const isActive = (tier: number) => activeTier === tier;
  const borderFor = (tier: number) =>
    isActive(tier) ? 'var(--accent-blue)' : 'var(--border-default)';
  const shadowFor = (tier: number) =>
    isActive(tier) ? '0 0 20px rgba(74, 144, 255, 0.15)' : 'none';

  return (
    <div className={className}>
      {/* Control bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        {surfaces.map((s) => (
          <button
            key={s.tier}
            onClick={() => setActiveTier(activeTier === s.tier ? null : s.tier)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: `1px solid ${isActive(s.tier) ? 'var(--accent-blue)' : 'var(--border-default)'}`,
              background: isActive(s.tier) ? 'var(--blue-10)' : 'var(--surface-2)',
              color: isActive(s.tier) ? 'var(--accent-blue)' : 'var(--text-secondary)',
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms',
              textTransform: 'uppercase' as const,
              letterSpacing: '0.04em',
            }}
          >
            S-{s.tier} {s.name}
          </button>
        ))}
        {activeTier !== null && (
          <button
            onClick={() => setActiveTier(null)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              background: 'transparent',
              color: 'var(--text-quaternary)',
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: '11px',
              cursor: 'pointer',
              transition: 'all 200ms',
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Nested depth demo */}
      <div
        style={{
          padding: '32px',
          borderRadius: '12px',
          border: `1px solid ${borderFor(0)}`,
          background: 'var(--surface-0)',
          boxShadow: shadowFor(0),
          transition: 'border-color 300ms, box-shadow 300ms',
          cursor: 'pointer',
        }}
        onClick={() => setActiveTier(0)}
      >
        <TierLabel tier={0} surface={surfaces[0]} isActive={isActive(0)} onCopy={handleCopy} copied={copied} />

        <div
          style={{
            padding: '24px',
            borderRadius: '12px',
            border: `1px solid ${borderFor(1)}`,
            background: 'var(--surface-1)',
            boxShadow: shadowFor(1),
            transition: 'border-color 300ms, box-shadow 300ms',
            cursor: 'pointer',
            marginTop: '16px',
          }}
          onClick={(e) => { e.stopPropagation(); setActiveTier(1); }}
        >
          <TierLabel tier={1} surface={surfaces[1]} isActive={isActive(1)} onCopy={handleCopy} copied={copied} />

          <div
            style={{
              padding: '24px',
              borderRadius: '12px',
              border: `1px solid ${borderFor(2)}`,
              background: 'var(--surface-2)',
              boxShadow: shadowFor(2),
              transition: 'border-color 300ms, box-shadow 300ms',
              cursor: 'pointer',
              marginTop: '16px',
            }}
            onClick={(e) => { e.stopPropagation(); setActiveTier(2); }}
          >
            <TierLabel tier={2} surface={surfaces[2]} isActive={isActive(2)} onCopy={handleCopy} copied={copied} />

            <div
              style={{
                padding: '20px',
                borderRadius: '10px',
                border: `1px solid ${borderFor(3)}`,
                background: 'var(--surface-3)',
                boxShadow: shadowFor(3),
                transition: 'border-color 300ms, box-shadow 300ms',
                cursor: 'pointer',
                marginTop: '16px',
              }}
              onClick={(e) => { e.stopPropagation(); setActiveTier(3); }}
            >
              <TierLabel tier={3} surface={surfaces[3]} isActive={isActive(3)} onCopy={handleCopy} copied={copied} />

              <div
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  border: `1px solid ${borderFor(4)}`,
                  background: 'var(--surface-4)',
                  boxShadow: activeTier === 4 ? '0 0 20px rgba(74, 144, 255, 0.15), var(--shadow-default)' : 'var(--shadow-default)',
                  transition: 'border-color 300ms, box-shadow 300ms',
                  cursor: 'pointer',
                  marginTop: '16px',
                  display: 'inline-block',
                }}
                onClick={(e) => { e.stopPropagation(); setActiveTier(4); }}
              >
                <TierLabel tier={4} surface={surfaces[4]} isActive={isActive(4)} onCopy={handleCopy} copied={copied} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info panel */}
      {activeTier !== null && (
        <div
          style={{
            marginTop: '16px',
            padding: '16px 20px',
            borderRadius: '10px',
            border: '1px solid var(--border-accent)',
            background: 'var(--blue-04)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            alignItems: 'center',
            animation: 'tab-fade-in 200ms ease',
          }}
        >
          <div>
            <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--text-quaternary)', textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: '4px' }}>
              Active Surface
            </div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Surface {activeTier} -- {surfaces[activeTier].name}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--text-quaternary)', textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: '4px' }}>
              Hex Value
            </div>
            <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '14px', color: 'var(--accent-blue)' }}>
              {surfaces[activeTier].hex}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--text-quaternary)', textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: '4px' }}>
              CSS Variable
            </div>
            <button
              onClick={() => handleCopy(`var(${surfaces[activeTier].cssVar})`)}
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                fontSize: '14px',
                color: copied === `var(${surfaces[activeTier].cssVar})` ? 'var(--color-success)' : 'var(--text-secondary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 200ms',
              }}
            >
              var({surfaces[activeTier].cssVar}) {copied === `var(${surfaces[activeTier].cssVar})` ? '(copied)' : '(click to copy)'}
            </button>
          </div>
          <div>
            <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--text-quaternary)', textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: '4px' }}>
              Usage
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              {surfaces[activeTier].usage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TierLabel({ tier, surface, isActive, onCopy, copied }: {
  tier: number;
  surface: typeof surfaces[0];
  isActive: boolean;
  onCopy: (text: string) => void;
  copied: string | null;
}) {
  const varText = `var(${surface.cssVar})`;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <span
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.08em',
          color: isActive ? 'var(--accent-blue)' : 'var(--text-quaternary)',
          transition: 'color 300ms',
        }}
      >
        S-{tier} {surface.name}
      </span>
      <span
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          fontSize: '10px',
          color: 'var(--text-muted)',
        }}
      >
        {surface.hex}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); onCopy(varText); }}
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          fontSize: '10px',
          color: copied === varText ? 'var(--color-success)' : 'var(--text-muted)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '2px 6px',
          borderRadius: '4px',
          transition: 'color 200ms',
        }}
        title={`Copy: ${varText}`}
      >
        {copied === varText ? 'copied' : 'copy'}
      </button>
    </div>
  );
}
