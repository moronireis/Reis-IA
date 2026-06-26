import { useState, useEffect } from 'react';
import type { ConnectionStatus } from '../../lib/types';
import { NumberCard } from './NumberCard';

export function ConnectionPage() {
  const [instances, setInstances] = useState<ConnectionStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/connection/status');
      if (res.ok) {
        const data = await res.json() as { instances?: ConnectionStatus[] };
        setInstances(data.instances || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.6rem', fontWeight: 300, color: '#C9A96E',
        }}>
          Conexão WhatsApp
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'rgba(244,239,230,0.6)', marginTop: '0.3rem', letterSpacing: '0.05em' }}>
          Gerencie a conexão dos números WhatsApp do Castelo dos Lagos
        </p>
      </div>

      {loading ? (
        <div style={{ color: 'rgba(244,239,230,0.6)', fontSize: '0.85rem' }}>
          Verificando status...
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {instances.map(inst => (
            <NumberCard key={inst.id} instance={inst} onStatusChange={fetchStatus} />
          ))}
        </div>
      )}

      <div style={{
        marginTop: '2rem', padding: '1rem',
        background: 'rgba(201,169,110,0.06)',
        border: '1px solid rgba(201,169,110,0.25)',
        fontSize: '0.78rem', color: 'rgba(244,239,230,0.6)', lineHeight: 1.8,
      }}>
        <strong style={{ color: '#C9A96E', display: 'block', marginBottom: '0.5rem' }}>
          Como conectar
        </strong>
        1. Clique em "Conectar" no número desejado<br />
        2. Aguarde o QR code aparecer<br />
        3. Abra o WhatsApp no celular &rarr; Menu &rarr; Aparelhos conectados &rarr; Conectar aparelho<br />
        4. Escaneie o QR code<br />
        5. Aguarde confirmação &mdash; o status mudará para "Conectado"
      </div>
    </div>
  );
}
