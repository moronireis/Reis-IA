import { useState, useEffect } from 'react';

export default function PhoneMockup() {
  const [armed, setArmed] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setArmed(a => !a), 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto" style={{ maxWidth: '260px' }}>
      {/* Phone frame */}
      <div style={{
        background: 'linear-gradient(135deg, #111118, #0d0d14)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        padding: '12px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 60px rgba(230,57,70,0.03)',
        animation: 'float 6s ease-in-out infinite',
        animationDelay: '0.5s',
      }}>
        {/* Notch */}
        <div style={{
          width: '100px', height: '20px',
          background: '#000',
          borderRadius: '0 0 12px 12px',
          margin: '0 auto 8px',
        }} />

        {/* Screen */}
        <div style={{
          background: 'linear-gradient(180deg, #0a0a10, #080810)',
          borderRadius: '12px',
          overflow: 'hidden',
          padding: '12px',
        }}>
          {/* App header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '12px',
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#fff' }}>CyberAct CFTV</div>
              <div style={{ fontSize: '0.5rem', color: '#888' }}>Bem-vindo, Admin</div>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              background: armed ? 'rgba(230,57,70,0.1)' : 'rgba(34,197,94,0.1)',
              border: `1px solid ${armed ? 'rgba(230,57,70,0.3)' : 'rgba(34,197,94,0.3)'}`,
              padding: '3px 8px',
              borderRadius: '10px',
            }}>
              <div style={{
                width: 5, height: 5, borderRadius: '50%',
                background: armed ? '#e63946' : '#22c55e',
              }} />
              <span style={{
                fontSize: '0.5rem', fontWeight: 600,
                color: armed ? '#e63946' : '#22c55e',
                textTransform: 'uppercase',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {armed ? 'Armado' : 'Desarmado'}
              </span>
            </div>
          </div>

          {/* Camera preview */}
          <div style={{
            aspectRatio: '16/9',
            background: 'linear-gradient(135deg, #080810, #0c0c18)',
            border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: '6px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Night-vision scan lines */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)',
            }} />
            {/* Grid overlay on camera preview */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(230,57,70,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,0.03) 1px, transparent 1px)',
              backgroundSize: '10px 10px',
            }} />
            <div style={{
              position: 'absolute', bottom: '6px', left: '6px',
              fontSize: '0.5rem', color: '#666',
              fontFamily: "'JetBrains Mono', monospace",
            }}>CAM-01 · Entrada</div>
            <div style={{
              position: 'absolute', top: '6px', right: '6px',
              display: 'flex', alignItems: 'center', gap: '3px',
            }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#e63946', animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: '0.5rem', color: '#e63946' }}>REC</span>
            </div>
          </div>

          {/* Quick actions */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px',
            marginBottom: '10px',
          }}>
            {[
              { label: 'Ver todas', icon: '◉' },
              { label: 'Áudio', icon: '◈' },
              { label: 'Alertas', icon: '▣' },
            ].map((action, i) => (
              <div key={i} style={{
                background: 'rgba(230,57,70,0.05)',
                border: '1px solid rgba(230,57,70,0.1)',
                borderRadius: '6px',
                padding: '8px 4px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '0.7rem', color: '#e63946', marginBottom: '2px' }}>{action.icon}</div>
                <div style={{ fontSize: '0.5rem', color: '#888' }}>{action.label}</div>
              </div>
            ))}
          </div>

          {/* Event log */}
          <div style={{ fontSize: '0.5rem', color: '#555', marginBottom: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Últimos eventos
          </div>
          {[
            { time: '14:32', text: 'Pessoa detectada', cam: 'CAM-02', color: '#e63946' },
            { time: '14:18', text: 'Veículo — sem alerta', cam: 'CAM-01', color: '#22c55e' },
            { time: '14:05', text: 'Animal ignorado', cam: 'CAM-03', color: '#555' },
          ].map((ev, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '5px 0',
              borderBottom: '1px solid rgba(255,255,255,0.03)',
            }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: ev.color, flexShrink: 0 }} />
              <span style={{ color: '#444', width: '28px', flexShrink: 0, fontVariantNumeric: 'tabular-nums', fontFamily: "'JetBrains Mono', monospace" }}>{ev.time}</span>
              <span style={{ flex: 1, color: '#888', fontSize: '0.5rem' }}>{ev.text}</span>
              <span style={{ color: '#444', fontSize: '0.5rem', fontFamily: "'JetBrains Mono', monospace" }}>{ev.cam}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating notification — hidden on small screens to prevent overflow */}
      <div className="hidden sm:flex" style={{
        position: 'absolute',
        top: '50%',
        right: '-24px',
        background: 'rgba(13, 13, 20, 0.75)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(34,197,94,0.2)',
        padding: '6px 10px',
        alignItems: 'center',
        gap: '6px',
        animation: 'float 5s ease-in-out infinite',
        animationDelay: '1.5s',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        zIndex: 10,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
        <div>
          <div style={{ fontSize: '0.5rem', fontWeight: 600, color: '#22c55e' }}>Evento verificado</div>
          <div style={{ fontSize: '0.5rem', color: '#555', fontFamily: "'JetBrains Mono', monospace" }}>CAM-02 · IA confirmou</div>
        </div>
      </div>
    </div>
  );
}
