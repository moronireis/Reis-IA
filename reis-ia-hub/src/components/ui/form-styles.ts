import type { CSSProperties } from 'react';

export const inputStyle: CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: '8px',
  background: '#161616',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#fff',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box',
};

export const labelStyle: CSSProperties = {
  fontSize: '12px',
  color: 'rgba(255,255,255,0.5)',
  marginBottom: '4px',
  display: 'block',
};

export const selectStyle: CSSProperties = {
  ...inputStyle,
  cursor: 'pointer',
  appearance: 'none',
};

export const fieldGroupStyle: CSSProperties = {
  marginBottom: '14px',
};

export const textareaStyle: CSSProperties = {
  ...inputStyle,
  minHeight: '80px',
  resize: 'vertical',
};

export const errorBannerStyle: CSSProperties = {
  marginBottom: '16px',
  padding: '12px 16px',
  borderRadius: '8px',
  background: 'rgba(239,68,68,0.1)',
  border: '1px solid rgba(239,68,68,0.25)',
  color: '#EF4444',
  fontSize: '13px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const modalOverlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: '60px',
  zIndex: 50,
};

export const modalContentStyle: CSSProperties = {
  background: '#111',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '520px',
  maxHeight: 'calc(100vh - 120px)',
  overflow: 'auto',
  padding: '28px',
};

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('pt-BR');
}
