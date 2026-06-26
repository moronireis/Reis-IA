import { useState, useEffect } from 'react';

const events = [
  { time: '14:32', source: 'Movimento detectado', type: 'motion' },
  { time: '14:18', source: 'Vento moveu arbusto', type: 'wind' },
  { time: '14:05', source: 'Gato no perímetro', type: 'animal' },
  { time: '13:55', source: 'Pessoa na entrada', type: 'person' },
  { time: '13:40', source: 'Sombra mudou', type: 'shadow' },
];

export default function ComparisonMockup() {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed < events.length) {
      const timer = setTimeout(() => setRevealed(r => r + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [revealed]);

  // Reset animation when component comes back into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(0); },
      { threshold: 0.3 }
    );
    const el = document.getElementById('comparison-section');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="comparison-section" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Traditional System */}
      <div style={{
        background: 'linear-gradient(135deg, #0a0a0e, #0e0e14)',
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(0,0,0,0.3)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#555' }} />
            <span style={{ fontSize: '0.6rem', color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Sistema Convencional
            </span>
          </div>
          <span style={{ fontSize: '0.55rem', color: '#ef4444', fontWeight: 600 }}>INEFICIENTE</span>
        </div>

        {/* Events */}
        <div style={{ padding: '12px' }}>
          {events.map((ev, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '8px 10px',
              borderBottom: '1px solid rgba(255,255,255,0.03)',
              opacity: i < revealed ? 1 : 0,
              transform: i < revealed ? 'translateX(0)' : 'translateX(-10px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}>
              <span style={{ fontSize: '0.6rem', color: '#444', width: '36px', fontVariantNumeric: 'tabular-nums', fontFamily: "'JetBrains Mono', monospace" }}>{ev.time}</span>
              <span style={{ flex: 1, fontSize: '0.65rem', color: '#888' }}>{ev.source}</span>
              <span style={{
                fontSize: '0.5rem', fontWeight: 700, color: '#ef4444',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                background: 'rgba(239,68,68,0.1)',
                padding: '2px 6px',
                fontFamily: "'JetBrains Mono', monospace",
              }}>ALARME</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '10px 16px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(239,68,68,0.04)',
          display: 'flex', justifyContent: 'space-between',
          fontSize: '0.6rem',
        }}>
          <span style={{ color: '#ef4444', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>5 alarmes disparados</span>
          <span style={{ color: '#888', fontFamily: "'JetBrains Mono', monospace" }}>4 falsos (80%)</span>
        </div>
      </div>

      {/* CyberAct AI System */}
      <div style={{
        background: 'linear-gradient(135deg, #0a0a0e, #0e0e14)',
        border: '1px solid rgba(230,57,70,0.15)',
        overflow: 'hidden',
        boxShadow: '0 0 40px rgba(230,57,70,0.04)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid rgba(230,57,70,0.1)',
          background: 'rgba(0,0,0,0.3)',
          borderTop: '2px solid rgba(230,57,70,0.4)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#e63946',
              boxShadow: '0 0 6px rgba(230,57,70,0.5)',
            }} />
            <span style={{ fontSize: '0.6rem', color: '#e63946', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
              CyberAct IA
            </span>
          </div>
          <span style={{ fontSize: '0.55rem', color: '#22c55e', fontWeight: 600 }}>INTELIGENTE</span>
        </div>

        {/* Events */}
        <div style={{ padding: '12px' }}>
          {events.map((ev, i) => {
            const isReal = ev.type === 'person';
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '8px 10px',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                opacity: i < revealed ? 1 : 0,
                transform: i < revealed ? 'translateX(0)' : 'translateX(10px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                background: isReal ? 'rgba(230,57,70,0.04)' : 'transparent',
              }}>
                <span style={{ fontSize: '0.6rem', color: '#444', width: '36px', fontVariantNumeric: 'tabular-nums', fontFamily: "'JetBrains Mono', monospace" }}>{ev.time}</span>
                <span style={{
                  flex: 1, fontSize: '0.65rem',
                  color: isReal ? '#fff' : '#555',
                  textDecoration: isReal ? 'none' : 'line-through',
                }}>
                  {ev.source}
                </span>
                {isReal ? (
                  <span style={{
                    fontSize: '0.5rem', fontWeight: 700, color: '#e63946',
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    background: 'rgba(230,57,70,0.15)',
                    padding: '2px 6px',
                    boxShadow: '0 0 8px rgba(230,57,70,0.1)',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>ALERTA REAL</span>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{
                      fontSize: '0.5rem', fontWeight: 500, color: '#22c55e',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                      background: 'rgba(34,197,94,0.08)',
                      padding: '2px 6px',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>IGNORADO</span>
                    <span style={{ fontSize: '0.45rem', color: '#444' }}>
                      {ev.type === 'wind' ? '98%' : ev.type === 'animal' ? '97%' : ev.type === 'shadow' ? '99%' : '96%'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          padding: '10px 16px',
          borderTop: '1px solid rgba(230,57,70,0.1)',
          background: 'rgba(34,197,94,0.03)',
          display: 'flex', justifyContent: 'space-between',
          fontSize: '0.6rem',
        }}>
          <span style={{ color: '#22c55e', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>1 alerta real</span>
          <span style={{ color: '#22c55e', fontFamily: "'JetBrains Mono', monospace" }}>0 falsos (0%)</span>
        </div>
      </div>
    </div>
  );
}
