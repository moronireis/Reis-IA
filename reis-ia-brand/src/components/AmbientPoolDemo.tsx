import { useState } from 'react';

/**
 * AmbientPoolDemo — Interactive demo with toggle for pool type and position.
 * Shows blue vs neutral pools at alternating corners.
 */
export default function AmbientPoolDemo() {
  const [poolType, setPoolType] = useState<'blue' | 'neutral'>('blue');
  const [corner, setCorner] = useState<'tl' | 'tr' | 'bl' | 'br'>('tl');

  const cornerPositions: Record<string, React.CSSProperties> = {
    tl: { top: '-20%', left: '-10%' },
    tr: { top: '-20%', right: '-10%' },
    bl: { bottom: '-20%', left: '-10%' },
    br: { bottom: '-20%', right: '-10%' },
  };

  const poolGradient = poolType === 'blue'
    ? 'radial-gradient(ellipse at center, rgba(74, 144, 255, 0.06) 0%, transparent 70%)'
    : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%)';

  return (
    <div>
      {/* Controls */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap',
        padding: '12px 16px', borderRadius: '8px', background: 'var(--surface-2)',
        border: '1px solid var(--border-default)',
      }}>
        <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em' }}>Type</span>
        {(['blue', 'neutral'] as const).map(t => (
          <button key={t} onClick={() => setPoolType(t)} style={{
            padding: '4px 12px', borderRadius: '6px', border: '1px solid',
            borderColor: poolType === t ? 'var(--accent-blue)' : 'var(--border-default)',
            background: poolType === t ? 'var(--blue-10)' : 'transparent',
            color: poolType === t ? 'var(--accent-blue)' : 'var(--text-quaternary)',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', cursor: 'pointer',
          }}>{t}</button>
        ))}
        <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginLeft: '8px' }}>Corner</span>
        {(['tl', 'tr', 'bl', 'br'] as const).map(c => (
          <button key={c} onClick={() => setCorner(c)} style={{
            padding: '4px 10px', borderRadius: '6px', border: '1px solid',
            borderColor: corner === c ? 'var(--accent-blue)' : 'var(--border-default)',
            background: corner === c ? 'var(--blue-10)' : 'transparent',
            color: corner === c ? 'var(--accent-blue)' : 'var(--text-quaternary)',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', cursor: 'pointer',
          }}>{c.toUpperCase()}</button>
        ))}
      </div>

      {/* Demo area: two sections stacked */}
      <div style={{
        borderRadius: '12px', border: '1px solid var(--border-default)', overflow: 'hidden',
      }}>
        {/* Section with pool */}
        <div style={{
          position: 'relative', padding: '48px 32px', background: 'var(--surface-0)', minHeight: '200px', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', ...cornerPositions[corner], width: '60%', height: '140%',
            background: poolGradient, pointerEvents: 'none', transition: 'all 500ms ease',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: 'var(--accent-blue)' }}>
              {poolType === 'blue' ? 'Blue Pool' : 'Neutral Pool'} -- {corner.toUpperCase()} Corner
            </span>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: 1.6, maxWidth: '500px' }}>
              {poolType === 'blue'
                ? 'Blue-tinted pools at rgba(74, 144, 255, 0.06) appear on key sections (hero, CTA). The blue depth creates a precision feel.'
                : 'Neutral pools at rgba(255, 255, 255, 0.03) appear on secondary sections. Subtle directional lighting adds dimension.'}
            </p>
          </div>
        </div>

        {/* Alternating section */}
        <div style={{ height: '1px', background: 'var(--border-subtle)' }} />
        <div style={{
          position: 'relative', padding: '48px 32px', background: 'var(--surface-1)', minHeight: '160px', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            ...(corner === 'tl' ? { bottom: '-20%', right: '-10%' } :
              corner === 'tr' ? { bottom: '-20%', left: '-10%' } :
              corner === 'bl' ? { top: '-20%', right: '-10%' } :
              { top: '-20%', left: '-10%' }),
            width: '50%', height: '140%',
            background: poolType === 'blue'
              ? 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(74, 144, 255, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none', transition: 'all 500ms ease',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: 'var(--text-quaternary)' }}>
              Alternating section -- opposite corner, opposite type
            </span>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: 1.6 }}>
              Corner positions alternate section-by-section to create visual rhythm across the page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
