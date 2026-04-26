import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';

interface Props {
  children: React.ReactNode;
  moduleName?: string;
}

export default function SafeIsland({ children, moduleName }: Props) {
  return (
    <ErrorBoundary
      fallback={
        <div style={{
          padding: '2rem',
          background: '#111',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.6)',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
        }}>
          <p style={{ fontSize: '1rem', color: '#fff' }}>
            Erro ao carregar {moduleName || 'este modulo'}.
          </p>
          <p style={{ fontSize: '0.875rem' }}>
            Tente recarregar a pagina.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem 1.5rem',
              background: '#4A90FF',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Recarregar
          </button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
