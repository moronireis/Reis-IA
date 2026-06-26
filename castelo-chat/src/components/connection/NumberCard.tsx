import { useState, useEffect, useRef } from 'react';
import type { ConnectionStatus } from '../../lib/types';

interface NumberCardProps {
  instance: ConnectionStatus;
  onStatusChange: () => void;
}

export function NumberCard({ instance, onStatusChange }: NumberCardProps) {
  const [localStatus, setLocalStatus] = useState<ConnectionStatus>(instance);
  const [qrcode, setQrcode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalStatus(instance);
  }, [instance]);

  const clearTimers = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const startConnect = async () => {
    setLoading(true);
    setLocalStatus(prev => ({ ...prev, status: 'connecting' }));

    const res = await fetch(`/api/connection/qr?instance=${instance.id}`);
    const data = await res.json() as { qrcode?: string; status?: string };
    setQrcode(data.qrcode || null);
    setLoading(false);

    // Poll every 5s for connection
    pollRef.current = setInterval(async () => {
      const r = await fetch('/api/connection/status');
      const d = await r.json() as { instances?: ConnectionStatus[] };
      const updated = d.instances?.find(i => i.id === instance.id);
      if (updated?.connected) {
        setLocalStatus(updated);
        setQrcode(null);
        clearTimers();
        onStatusChange();
      } else {
        // Refresh QR
        const qrRes = await fetch(`/api/connection/qr?instance=${instance.id}`);
        const qrData = await qrRes.json() as { qrcode?: string };
        if (qrData.qrcode) setQrcode(qrData.qrcode);
      }
    }, 5000);

    // Timeout after 45s
    timeoutRef.current = setTimeout(() => {
      clearTimers();
      setLocalStatus(prev => ({ ...prev, status: 'disconnected' }));
      setQrcode(null);
    }, 45000);
  };

  const disconnect = async () => {
    setLoading(true);
    await fetch('/api/connection/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ instance: instance.id, action: 'disconnect' }),
    });
    setLocalStatus(prev => ({ ...prev, connected: false, status: 'disconnected', phone: undefined, name: undefined }));
    setLoading(false);
    onStatusChange();
  };

  const cancelConnect = () => {
    clearTimers();
    setLocalStatus(prev => ({ ...prev, status: 'disconnected' }));
    setQrcode(null);
  };

  useEffect(() => () => clearTimers(), []);

  const statusColor = localStatus.connected
    ? '#4ADE80'
    : localStatus.status === 'connecting'
    ? '#C9A96E'
    : '#F87171';

  const statusLabel = localStatus.connected
    ? 'Conectado'
    : localStatus.status === 'connecting'
    ? 'Aguardando scan...'
    : 'Desconectado';

  return (
    <div style={{
      background: '#2F4A3A',
      border: '1px solid rgba(201,169,110,0.25)',
      padding: '1.5rem',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      minHeight: 280,
      minWidth: 260,
    }}>
      <div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#C9A96E', fontWeight: 300 }}>
          {instance.label}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'rgba(244,239,230,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>
          Número {instance.id === 'castelo1' ? '1' : '2'}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: statusColor }} />
        <span style={{ fontSize: '0.8rem', color: statusColor }}>{statusLabel}</span>
      </div>

      {localStatus.connected && localStatus.name && (
        <div style={{ fontSize: '0.8rem', color: 'rgba(244,239,230,0.6)' }}>
          Perfil: {localStatus.name}
        </div>
      )}

      {qrcode && (
        <div style={{ textAlign: 'center' }}>
          <img
            src={qrcode}
            alt="QR Code WhatsApp"
            style={{ width: 180, height: 180, display: 'block', margin: '0 auto', border: '4px solid white' }}
          />
          <p style={{ fontSize: '0.72rem', color: 'rgba(244,239,230,0.6)', marginTop: '0.5rem' }}>
            Abra o WhatsApp &rarr; Aparelhos conectados &rarr; Conectar aparelho
          </p>
        </div>
      )}

      {loading && (
        <div style={{ fontSize: '0.8rem', color: 'rgba(244,239,230,0.6)' }}>Carregando...</div>
      )}

      <div style={{ marginTop: 'auto' }}>
        {!localStatus.connected && localStatus.status !== 'connecting' && (
          <button
            onClick={startConnect}
            disabled={loading}
            style={{
              background: '#C9A96E', border: 'none', color: '#1E2E24',
              padding: '0.6rem 1.25rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}
          >
            Conectar
          </button>
        )}
        {localStatus.connected && (
          <button
            onClick={disconnect}
            disabled={loading}
            style={{
              background: 'transparent', border: '1px solid #F87171', color: '#F87171',
              padding: '0.6rem 1.25rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}
          >
            Desconectar
          </button>
        )}
        {localStatus.status === 'connecting' && !localStatus.connected && (
          <button
            onClick={cancelConnect}
            style={{
              background: 'transparent', border: '1px solid rgba(201,169,110,0.25)', color: 'rgba(244,239,230,0.6)',
              padding: '0.6rem 1.25rem', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}
