import { useState, useEffect, useRef } from 'react';

interface LogEntry {
  time: string;
  service: string;
  serviceColor: string;
  message: string;
  status: 'ok' | 'alert' | 'info';
}

const LOG_POOL: LogEntry[] = [
  { time: '14:32', service: 'SUPORTE', serviceColor: '#22c55e', message: 'Ticket #847 resolvido em 4 min', status: 'ok' },
  { time: '14:31', service: 'BACKUP', serviceColor: '#60a5fa', message: 'Snapshot #12 concluído — 150TB', status: 'ok' },
  { time: '14:30', service: 'REDE', serviceColor: '#22c55e', message: 'WiFi cobertura 100% — 0 quedas', status: 'ok' },
  { time: '14:29', service: 'CAMERA', serviceColor: '#e63946', message: 'Câm-02 pessoa detectada — IA confirmou', status: 'alert' },
  { time: '14:28', service: 'FIREWALL', serviceColor: '#22c55e', message: '1.247 ameaças bloqueadas hoje', status: 'ok' },
  { time: '14:27', service: 'SUPORTE', serviceColor: '#60a5fa', message: 'Técnico em campo — cliente #23', status: 'info' },
  { time: '14:26', service: 'REDE', serviceColor: '#22c55e', message: '47 dispositivos online — 0 offline', status: 'ok' },
  { time: '14:25', service: 'BACKUP', serviceColor: '#22c55e', message: 'Verificação integridade OK', status: 'ok' },
  { time: '14:24', service: 'CAMERA', serviceColor: '#22c55e', message: '12 câmeras online — IA ativa', status: 'ok' },
  { time: '14:23', service: 'FIREWALL', serviceColor: '#e63946', message: 'Tentativa bloqueada — phishing.cn', status: 'alert' },
  { time: '14:22', service: 'SUPORTE', serviceColor: '#22c55e', message: 'Ticket #846 resolvido em 2 min', status: 'ok' },
  { time: '14:21', service: 'REDE', serviceColor: '#60a5fa', message: 'Scan de vulnerabilidade iniciado', status: 'info' },
];

const STATUS_METRICS = [
  { label: 'uptime', value: '99.97%', color: '#22c55e' },
  { label: 'devices', value: '47', color: '#a0a0a0' },
  { label: 'sla', value: '98.7%', color: '#22c55e' },
  { label: 'threats', value: '0', color: '#22c55e' },
];

export default function HeroDashboard() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const maxVisible = isMobile ? 5 : 8;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    if (visibleLines < maxVisible) {
      const timer = setTimeout(
        () => setVisibleLines(v => v + 1),
        visibleLines === 0 ? 600 : 280 + Math.random() * 200
      );
      return () => clearTimeout(timer);
    }

    const cycle = setInterval(() => {
      setVisibleLines(v => v + 1);
    }, 3000);
    return () => clearInterval(cycle);
  }, [visibleLines]);

  const displayLogs = LOG_POOL.slice(0, Math.min(visibleLines, LOG_POOL.length));
  const visibleLogs = displayLogs.slice(-maxVisible);

  return (
    <div className="relative" style={{ animation: 'float 6s ease-in-out infinite' }}>
      <div style={{
        background: 'linear-gradient(180deg, #0a0a10 0%, #08080e 100%)',
        border: '1px solid rgba(230,57,70,0.1)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 80px rgba(230,57,70,0.03)',
        maxWidth: '480px',
        width: '100%',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(0,0,0,0.4)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#e63946', opacity: 0.8 }} />
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#f59e0b', opacity: 0.6 }} />
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#22c55e', opacity: 0.6 }} />
            </div>
            <span style={{
              fontSize: '0.6rem',
              color: '#555',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.06em',
            }}>
              cyberact-ops
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{
              width: 5, height: 5, borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 6px rgba(34,197,94,0.5)',
            }} />
            <span style={{ fontSize: '0.5rem', color: '#22c55e', fontFamily: "'JetBrains Mono', monospace" }}>
              CONNECTED
            </span>
          </div>
        </div>

        <div style={{ padding: '12px 14px', fontFamily: "'JetBrains Mono', monospace" }}>
          <div style={{
            fontSize: '0.6rem',
            color: '#555',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{ color: '#e63946' }}>$</span>
            <span style={{ color: '#888' }}>status --all --live</span>
            <span style={{
              opacity: visibleLines < maxVisible && cursorVisible ? 1 : 0,
              color: '#e63946',
              transition: 'opacity 0.1s',
            }}>▊</span>
          </div>

          <div ref={scrollRef} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            minHeight: `${maxVisible * 28}px`,
          }}>
            {visibleLogs.map((log, i) => (
              <div
                key={`${log.time}-${log.service}-${i}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.02)',
                  fontSize: '0.58rem',
                  animation: 'fadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }}
              >
                <span style={{
                  color: '#333',
                  width: '32px',
                  flexShrink: 0,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {log.time}
                </span>

                <span style={{
                  width: '56px',
                  flexShrink: 0,
                  fontSize: '0.5rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: log.serviceColor,
                  opacity: 0.8,
                }}>
                  {log.service}
                </span>

                <span style={{
                  flex: 1,
                  color: log.status === 'alert' ? '#e63946' : '#666',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {log.message}
                </span>

                <span style={{
                  width: 5, height: 5,
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: log.status === 'alert' ? '#e63946'
                    : log.status === 'info' ? '#60a5fa'
                    : '#22c55e',
                  opacity: 0.7,
                }} />
              </div>
            ))}
          </div>

          {visibleLines >= maxVisible && (
            <div style={{
              marginTop: '8px',
              fontSize: '0.55rem',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span style={{ color: '#e63946' }}>$</span>
              <span style={{
                opacity: cursorVisible ? 0.6 : 0,
                color: '#e63946',
                transition: 'opacity 0.1s',
              }}>▊</span>
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 14px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(0,0,0,0.3)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.5rem',
        }}>
          {STATUS_METRICS.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#333' }}>{m.label}:</span>
              <span style={{ color: m.color, fontWeight: 600 }}>{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden sm:flex" style={{
        position: 'absolute',
        top: '-8px',
        right: '-16px',
        background: 'rgba(10, 10, 14, 0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(34,197,94,0.15)',
        padding: '6px 12px',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        animation: 'float 5s ease-in-out infinite',
        animationDelay: '1.5s',
        zIndex: 10,
      }}>
        <div style={{
          width: 24, height: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(34,197,94,0.1)',
          border: '1px solid rgba(34,197,94,0.2)',
          borderRadius: '4px',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: '0.55rem', fontWeight: 600, color: '#22c55e', fontFamily: "'JetBrains Mono', monospace" }}>
            SLA cumprido
          </div>
          <div style={{ fontSize: '0.45rem', color: '#444', fontFamily: "'JetBrains Mono', monospace" }}>
            98.7% este mês
          </div>
        </div>
      </div>

      <div className="hidden sm:flex" style={{
        position: 'absolute',
        bottom: '24px',
        left: '-20px',
        background: 'rgba(10, 10, 14, 0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(230,57,70,0.12)',
        padding: '6px 12px',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        animation: 'float 6s ease-in-out infinite',
        animationDelay: '3s',
        zIndex: 10,
      }}>
        <div style={{
          fontSize: '1rem',
          fontWeight: 800,
          color: '#fff',
          fontFamily: "'JetBrains Mono', monospace",
          lineHeight: 1,
        }}>
          12
        </div>
        <div>
          <div style={{ fontSize: '0.5rem', fontWeight: 600, color: '#a0a0a0', fontFamily: "'JetBrains Mono', monospace" }}>
            tickets resolvidos
          </div>
          <div style={{ fontSize: '0.45rem', color: '#444', fontFamily: "'JetBrains Mono', monospace" }}>
            hoje · média 4min
          </div>
        </div>
      </div>
    </div>
  );
}
