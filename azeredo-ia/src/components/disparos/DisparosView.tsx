'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { isLikelyLandline } from '../../lib/phone';
import { Toast, useToast } from '../ui/Toast';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'sending' | 'completed' | 'cancelled' | 'error';
  total_count: number | null;
  sent_count: number | null;
  delivered_count: number | null;
  failed_count: number | null;
  last_error?: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  group_id?: string | null;   // F1: campanhas-filhas do disparo por vendedor
  az_templates: { name: string } | null;
  az_whatsapp_instances: { display_name: string | null; uazapi_name: string; phone_number: string | null } | null;
}

interface Template { id: string; name: string; body: string; media_url?: string | null; media_type?: 'image' | 'video' | null; }
interface Brand    { id: string; name: string; }
interface Instance {
  id: string;
  display_name: string | null;
  uazapi_name: string;
  phone_number: string | null;
  status: string;
  restricted_at?: string | null;     // B1: canário reprovado (aceita, não entrega)
  restricted_reason?: string | null;
}

interface SegmentFilter {
  brand_ids?: string[];
  cidade?: string;
  estado?: string;
  segmento?: string;
  status?: string;          // legado: rascunhos antigos salvaram single-select
  status_in?: string[];     // multi-select de status do cliente
  vendedor?: string;        // legado: single-select (M3 fase 1)
  vendedor_in?: string[];   // multi-select de vendedores (F1 checkpoint 10/07)
  split_por_vendedor?: boolean; // dispara pela instância do vendedor de cada contato
  split_child?: boolean;    // campanha-filha gerada pelo split
  tags?: string[];
  include_ids?: string[];   // contatos adicionados manualmente à lista
  exclude_ids?: string[];   // contatos removidos manualmente da lista
  manual_only?: boolean;    // lista montada do zero: só include_ids
}

interface PreviewContact {
  id: string;
  name: string;
  phone: string;
  cidade: string | null;
  estado?: string | null;
  contato?: string | null;
  segmento?: string | null;
  manual: boolean;
}

interface PreviewResult {
  count: number;
  duplicates: number;
  contacts: PreviewContact[];
  // F1: partição por vendedor quando split_por_vendedor está ativo
  por_vendedor?: {
    vendedor: string | null;
    count: number;
    instance: { id: string; name: string; connected: boolean; restricted: boolean } | null;
  }[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PREVIEW_PAGE = 100;

const ESTADO_OPTIONS = [
  'RS', 'SC', 'PR', 'SP', 'MG', 'RJ', 'ES', 'MS', 'MT', 'GO', 'DF',
  'BA', 'PE', 'CE', 'MA', 'PI', 'RN', 'PB', 'SE', 'AL', 'AM', 'PA',
  'AC', 'RO', 'RR', 'AP', 'TO',
];

const STATUS_OPTIONS = [
  { value: 'ativo', label: 'Ativos' },
  { value: 'inativo_recente', label: 'Inativo recente' },
  { value: 'inativo_antigo', label: 'Inativo antigo' },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  draft:     { bg: 'rgba(107,114,128,0.12)', color: 'var(--text-muted)', label: 'Rascunho' },
  sending:   { bg: 'rgba(37,211,102,0.12)',  color: 'var(--accent)', label: 'Enviando' },
  completed: { bg: 'rgba(34,197,94,0.12)',   color: 'var(--green)', label: 'Concluído' },
  cancelled: { bg: 'rgba(245,158,11,0.12)',  color: 'var(--amber)', label: 'Cancelado' },
  error:     { bg: 'rgba(239,68,68,0.12)',   color: 'var(--red)', label: 'Erro' },
};

const RECIPIENT_LABEL: Record<string, { color: string; label: string }> = {
  pending:    { color: 'var(--text-muted)', label: 'Aguardando' },
  processing: { color: 'var(--accent)', label: 'Enviando…' },
  sent:       { color: 'var(--green)', label: 'Enviado' },
  delivered:  { color: 'var(--green)', label: 'Entregue' },
  read:       { color: 'var(--green)', label: 'Lido' },
  failed:     { color: 'var(--red)', label: 'Falhou' },
  skipped:    { color: 'var(--text-muted)', label: 'Ignorado' },
};

// Dispara o worker da fila — idempotente (o lease no servidor impede
// processamento duplicado), então pode ser chamado a cada polling.
function pumpCampaign(id: string) {
  fetch(`/api/campaigns/${id}/process`, { method: 'POST' }).catch(() => {});
}

// B1 (Checkpoint 10/07): agrupa falhas por motivo — resumo legível
function failureBreakdown(recipients: any[]): { reason: string; count: number }[] {
  const map: Record<string, number> = {};
  for (const r of recipients) {
    if (r.status !== 'failed') continue;
    const reason = r.error_message || 'Motivo não registrado';
    map[reason] = (map[reason] || 0) + 1;
  }
  return Object.entries(map)
    .map(([reason, count]) => ({ reason, count }))
    .sort((a, b) => b.count - a.count);
}

function FailureSummary({ recipients }: { recipients: any[] }) {
  const breakdown = failureBreakdown(recipients);
  if (breakdown.length === 0) return null;
  return (
    <div style={{
      background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)',
      borderRadius: 6, padding: '8px 12px', marginBottom: 10,
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
        Motivos das falhas
      </div>
      {breakdown.map(b => (
        <div key={b.reason} style={{ fontSize: 12, color: '#e8b4b4', lineHeight: 1.7 }}>
          <span style={{ fontWeight: 700, color: 'var(--red)' }}>{b.count}×</span> {b.reason}
        </div>
      ))}
    </div>
  );
}

// ─── Utilities ───────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}
function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
function estimatedMinutes(total: number) {
  const mins = Math.ceil((total * 3) / 60); // ~3s por mensagem (2s + jitter)
  return mins <= 1 ? '~1 minuto' : `~${mins} minutos`;
}
function instanceLabel(inst: Campaign['az_whatsapp_instances']): string {
  if (!inst) return '';
  return inst.display_name || inst.uazapi_name;
}
// Espelho client-side do resolveVariables do servidor — para a prévia da
// mensagem final no passo Confirmar (renderizada com um contato real)
function renderMessage(template: string, c?: PreviewContact | null): string {
  const nome = c?.name || 'Papelaria Exemplo';
  const primeiro = nome.split(' ')[0] || nome;
  const hour = new Date().getHours();
  const periodo = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  return template
    .replace(/\{\{nome\}\}/gi, nome)
    .replace(/\{\{nome_fantasia\}\}/gi, nome)
    .replace(/\{\{primeiro_nome\}\}/gi, primeiro)
    .replace(/\{\{cidade\}\}/gi, c?.cidade || 'Santa Maria')
    .replace(/\{\{estado\}\}/gi, c?.estado || 'RS')
    .replace(/\{\{contato\}\}/gi, c?.contato || '')
    .replace(/\{\{segmento\}\}/gi, c?.segmento || '')
    .replace(/\{\{periodo_dia\}\}/gi, periodo);
}

function fmtPhone(p: string | null): string {
  const d = (p || '').replace(/\D/g, '');
  if (d.length === 13) return `+${d.slice(0,2)} (${d.slice(2,4)}) ${d.slice(4,9)}-${d.slice(9)}`;
  if (d.length === 12) return `+${d.slice(0,2)} (${d.slice(2,4)}) ${d.slice(4,8)}-${d.slice(8)}`;
  if (d.length === 11) return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return p || '';
}

// ─── Shared style atoms ───────────────────────────────────────────────────────

const inp: React.CSSProperties = {
  width: '100%', padding: '9px 12px',
  background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)',
  borderRadius: 8, color: 'var(--text-primary)',
  fontSize: 13, outline: 'none',
  fontFamily: 'inherit', boxSizing: 'border-box',
};

const btn = (variant: 'primary' | 'ghost' | 'danger' = 'ghost'): React.CSSProperties => ({
  padding: '9px 18px', borderRadius: 8, cursor: 'pointer',
  fontFamily: 'inherit', fontWeight: 500, fontSize: 13,
  border: variant === 'ghost' ? '1px solid var(--border)' : 'none',
  background: variant === 'primary' ? 'var(--accent)'
            : variant === 'danger'  ? 'var(--red)'
            : 'transparent',
  color: variant === 'ghost' ? 'var(--text-secondary)' : '#fff',
  transition: 'opacity 0.12s',
});

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: 'var(--text-muted)',
  textTransform: 'uppercase', letterSpacing: '0.06em',
  marginBottom: 6, display: 'block',
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.draft;
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: '2px 8px',
      borderRadius: 100, background: s.bg, color: s.color,
      display: 'inline-flex', alignItems: 'center', gap: 4,
    }}>
      {status === 'sending' && (
        <span style={{
          width: 5, height: 5, borderRadius: '50%', background: s.color,
          animation: 'pulse-dot 1s ease-in-out infinite', display: 'inline-block',
        }} />
      )}
      {s.label}
    </span>
  );
}

function ProgressBar({ sent, failed, total, compact = false }: { sent: number; failed: number; total: number; compact?: boolean }) {
  const pct     = total > 0 ? Math.round((sent / total) * 100) : 0;
  const failPct = total > 0 ? Math.round((failed / total) * 100) : 0;

  return (
    <div style={{ marginTop: compact ? 0 : 8 }}>
      <div style={{
        height: compact ? 4 : 5, background: 'var(--border)',
        borderRadius: 3, overflow: 'hidden',
        marginTop: compact ? 0 : 8,
        display: 'flex',
      }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: 'var(--accent)', borderRadius: '3px 0 0 3px',
          transition: 'width 0.4s ease',
        }} />
        <div style={{
          height: '100%', width: `${failPct}%`,
          background: 'var(--red)',
          transition: 'width 0.4s ease',
        }} />
      </div>
      {!compact && (
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4, display: 'flex', gap: 12 }}>
          <span><span style={{ color: 'var(--accent)' }}>{sent}</span> enviados</span>
          {failed > 0 && <span><span style={{ color: 'var(--red)' }}>{failed}</span> falhos</span>}
          <span style={{ marginLeft: 'auto' }}>{pct}% de {total}</span>
        </div>
      )}
    </div>
  );
}

// ─── Instance Card ────────────────────────────────────────────────────────────

function InstanceCard({
  inst, selected, onClick,
}: { inst: Instance; selected: boolean; onClick: () => void }) {
  const connected = inst.status === 'connected';
  return (
    <div
      onClick={connected ? onClick : undefined}
      style={{
        border: selected
          ? '1.5px solid var(--accent)'
          : `1px solid ${connected ? 'var(--border)' : 'var(--border)'}`,
        borderRadius: 10,
        padding: '12px 14px',
        background: selected ? 'rgba(37,211,102,0.07)' : 'var(--bg-secondary)',
        cursor: connected ? 'pointer' : 'not-allowed',
        opacity: connected ? 1 : 0.45,
        transition: 'all 0.12s',
        display: 'flex', alignItems: 'center', gap: 12,
        userSelect: 'none',
      }}
    >
      {/* Status dot */}
      <div style={{
        width: 9, height: 9, borderRadius: '50%', flexShrink: 0,
        background: connected ? 'var(--accent)' : 'var(--text-muted)',
        boxShadow: connected ? '0 0 6px rgba(37,211,102,0.6)' : 'none',
        animation: connected ? 'pulse-dot 2s ease-in-out infinite' : 'none',
      }} />

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: selected ? 'var(--text-primary)' : '#c4d4c8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {inst.display_name || inst.uazapi_name}
        </div>
        {inst.phone_number && (
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{inst.phone_number}</div>
        )}
      </div>

      {/* Selected check */}
      {selected && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}

      {/* B1: número restrito (canário) — aceita envio mas não entrega */}
      {connected && inst.restricted_at && (
        <span title={inst.restricted_reason || 'Envios aceitos mas não entregues — número possivelmente restrito.'} style={{
          fontSize: 10, fontWeight: 700, color: 'var(--red)',
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
          padding: '2px 7px', borderRadius: 100, flexShrink: 0,
        }}>
          Restrita
        </span>
      )}

      {/* Not connected badge */}
      {!connected && (
        <span style={{ fontSize: 10, color: 'var(--text-muted)', background: 'rgba(107,114,128,0.12)', padding: '2px 7px', borderRadius: 100 }}>
          Desconectado
        </span>
      )}
    </div>
  );
}

// ─── Vendedor Picker ──────────────────────────────────────────────────────────
// Seletor de números do disparo por vendedor: cada linha é um vendedor da
// lista atual (partição vem do preview, ANTES do corte — desmarcar não some a
// linha). Marcar/desmarcar = incluir/excluir os clientes dele no disparo.

function VendedorPicker({
  rows, vendedorIn, onToggle, loading,
}: {
  rows: PreviewResult['por_vendedor'];
  vendedorIn: string[] | undefined;
  onToggle: (vendedor: string) => void;
  loading: boolean;
}) {
  if (loading && (!rows || rows.length === 0)) {
    return (
      <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 2px' }}>
        <div style={{ width: 14, height: 14, border: '2px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
        Montando a partição por vendedor...
      </div>
    );
  }
  if (!rows || rows.length === 0) {
    return (
      <div style={{ fontSize: 12, color: 'var(--text-muted)', padding: '8px 2px' }}>
        A partição por vendedor aparece aqui quando a lista tiver contatos.
      </div>
    );
  }
  const isChecked = (v: string) =>
    !vendedorIn || vendedorIn.length === 0 ? true : vendedorIn.includes(v);
  return (
    <div style={{ border: '1px solid var(--hairline)', borderRadius: 10, overflow: 'hidden' }}>
      {rows.map((p, i) => {
        const selectable = !!(p.vendedor && p.instance);
        const on = selectable && isChecked(p.vendedor!);
        return (
          <div
            key={p.vendedor || '__sem__'}
            onClick={selectable ? () => onToggle(p.vendedor!) : undefined}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
              borderTop: i > 0 ? '1px solid var(--bg-secondary)' : 'none', fontSize: 12,
              background: on ? 'rgba(37,211,102,0.06)' : 'var(--bg-card-translucent)',
              cursor: selectable ? 'pointer' : 'default',
              opacity: selectable ? 1 : 0.65,
              userSelect: 'none', transition: 'background 0.12s',
            }}
          >
            <div style={{
              width: 16, height: 16, borderRadius: 4, flexShrink: 0,
              border: on ? 'none' : '1px solid #2a3a30',
              background: on ? 'var(--accent)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {on && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              )}
              {!selectable && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
              )}
            </div>
            <span style={{ flex: 1, color: p.vendedor ? (on ? 'var(--text-primary)' : 'var(--text-secondary)') : 'var(--amber)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {p.vendedor || 'Sem vendedor na carteira'}
            </span>
            <span style={{ color: 'var(--text-secondary)', flexShrink: 0 }}>{p.count} cliente{p.count !== 1 ? 's' : ''}</span>
            {p.instance ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>via {p.instance.name}</span>
                {!p.instance.connected && (
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--text-muted)', background: 'rgba(107,114,128,0.15)', borderRadius: 100, padding: '1px 6px' }}>desconectado</span>
                )}
                {p.instance.restricted && (
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--red)', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 100, padding: '1px 6px' }}>restrita</span>
                )}
              </span>
            ) : (
              <span style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--amber)', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 100, padding: '1px 6px', flexShrink: 0 }}>
                fica de fora — sem número
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Campaign Card ────────────────────────────────────────────────────────────

function CampaignCard({
  campaign, onExpand, expanded, onDelete, onChanged, onEdit,
}: {
  campaign: Campaign;
  onExpand: (id: string) => void;
  expanded: boolean;
  onDelete: (id: string) => void;
  onChanged: () => void;
  onEdit: (id: string) => void;
}) {
  const [recipients, setRecipients] = useState<any[]>([]);
  const [loadingRec, setLoadingRec] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [acting, setActing] = useState(false);

  async function cancelCampaign() {
    if (!confirm(`Cancelar o disparo de "${campaign.name}"? Os pendentes ficam na fila para retomada.`)) return;
    setActing(true);
    try {
      await fetch(`/api/campaigns/${campaign.id}/cancel`, { method: 'POST' });
      onChanged();
    } finally { setActing(false); }
  }

  async function resumeCampaign() {
    if (!confirm(`Retomar o disparo de "${campaign.name}"? Quem já recebeu não recebe de novo.`)) return;
    setActing(true);
    try {
      const r = await fetch(`/api/campaigns/${campaign.id}/send`, { method: 'POST' });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        alert(d.error || 'Erro ao retomar o disparo');
      }
      onChanged();
    } finally { setActing(false); }
  }

  const loadRecipients = useCallback(async () => {
    if (recipients.length > 0) return;
    setLoadingRec(true);
    try {
      const res = await fetch(`/api/campaigns/${campaign.id}`);
      const d = await res.json();
      setRecipients(d.recipients || []);
    } finally { setLoadingRec(false); }
  }, [campaign.id, recipients.length]);

  useEffect(() => {
    if (expanded) loadRecipients();
  }, [expanded, loadRecipients]);

  return (
    <div style={{
      background: 'linear-gradient(180deg, var(--card-grad-top), var(--card-grad-bot))', border: '1px solid var(--hairline)',
      borderRadius: 10, marginBottom: 10, overflow: 'hidden',
    }}>
      {/* Card header */}
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{campaign.name}</span>
            <StatusBadge status={campaign.status} />
            {campaign.az_templates?.name && (
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {campaign.az_templates.name}
              </span>
            )}
            {campaign.az_whatsapp_instances && (
              <span style={{
                fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 100,
                background: 'rgba(37,211,102,0.1)', color: 'var(--accent-light)',
              }}>
                via {instanceLabel(campaign.az_whatsapp_instances)}
              </span>
            )}
            {campaign.group_id && (
              <span title="Parte de um disparo dividido por vendedor" style={{
                fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 100,
                background: 'rgba(74,144,255,0.1)', color: '#6AADFF', border: '1px solid rgba(74,144,255,0.25)',
              }}>
                multi-vendedor
              </span>
            )}
          </div>

          {/* Metrics */}
          {(campaign.total_count || 0) > 0 && (
            <>
              <div style={{ display: 'flex', gap: 16, fontSize: 12, marginBottom: 4, flexWrap: 'wrap' }}>
                <span><span style={{ color: 'var(--text-muted)' }}>Total </span><span style={{ fontWeight: 600 }}>{campaign.total_count ?? 0}</span></span>
                <span><span style={{ color: 'var(--text-muted)' }}>Enviados </span><span style={{ color: 'var(--green)', fontWeight: 600 }}>{campaign.sent_count ?? 0}</span></span>
                <span><span style={{ color: 'var(--text-muted)' }}>Entregues </span><span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>{campaign.delivered_count ?? 0}</span></span>
                <span><span style={{ color: 'var(--text-muted)' }}>Falhos </span><span style={{ color: 'var(--red)', fontWeight: 600 }}>{campaign.failed_count ?? 0}</span></span>
              </div>
              {campaign.status === 'sending' && (
                <ProgressBar
                  sent={campaign.sent_count ?? 0}
                  failed={campaign.failed_count ?? 0}
                  total={campaign.total_count ?? 0}
                  compact
                />
              )}
            </>
          )}

          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
            {fmtDate(campaign.created_at)}
            {campaign.started_at && ` · Iniciado ${fmtTime(campaign.started_at)}`}
            {campaign.completed_at && ` · Concluído ${fmtTime(campaign.completed_at)}`}
          </div>

          {campaign.status === 'error' && campaign.last_error && (
            <div style={{
              fontSize: 11, color: 'var(--red)', marginTop: 6, lineHeight: 1.5,
              background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)',
              borderRadius: 6, padding: '6px 10px',
            }}>
              {campaign.last_error}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 6, flexShrink: 0, alignItems: 'center' }}>
          {campaign.status === 'draft' && (
            <button
              onClick={() => onEdit(campaign.id)}
              style={{
                background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.25)',
                borderRadius: 7, padding: '6px 12px', cursor: 'pointer',
                color: 'var(--accent)', fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
              }}
            >
              Editar
            </button>
          )}
          {campaign.status === 'sending' && (
            <button
              disabled={acting}
              onClick={cancelCampaign}
              style={{
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: 7, padding: '6px 12px', cursor: acting ? 'not-allowed' : 'pointer',
                color: 'var(--red)', fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
                opacity: acting ? 0.5 : 1,
              }}
            >
              {acting ? 'Cancelando...' : 'Cancelar'}
            </button>
          )}
          {(campaign.status === 'error' || campaign.status === 'cancelled') && (
            <button
              disabled={acting}
              onClick={resumeCampaign}
              style={{
                background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.25)',
                borderRadius: 7, padding: '6px 12px', cursor: acting ? 'not-allowed' : 'pointer',
                color: 'var(--accent)', fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
                opacity: acting ? 0.5 : 1,
              }}
            >
              {acting ? 'Retomando...' : 'Retomar'}
            </button>
          )}
          {campaign.status !== 'sending' && (
            <button
              disabled={deleting}
              onClick={async () => {
                if (!confirm(`Excluir "${campaign.name}"?`)) return;
                setDeleting(true);
                try {
                  const r = await fetch(`/api/campaigns/${campaign.id}`, { method: 'DELETE' });
                  if (r.ok) {
                    onDelete(campaign.id);
                  } else {
                    const d = await r.json().catch(() => ({}));
                    alert(d.error || 'Erro ao excluir a campanha');
                  }
                } finally { setDeleting(false); }
              }}
              title="Excluir"
              style={{
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)',
                borderRadius: 7, padding: '5px 8px', cursor: deleting ? 'not-allowed' : 'pointer',
                color: 'var(--red)', display: 'flex', alignItems: 'center', opacity: deleting ? 0.5 : 1,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
            </button>
          )}
          <button
            onClick={() => onExpand(campaign.id)}
            style={{ ...btn('ghost'), fontSize: 12, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
            {expanded ? 'Fechar' : 'Detalhes'}
          </button>
        </div>
      </div>

      {/* Recipients panel */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--hairline)', padding: '12px 16px' }}>
          {loadingRec ? (
            <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>Carregando destinatários...</div>
          ) : recipients.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>Nenhum destinatário registrado.</div>
          ) : (
            <>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>
                {recipients.length} destinatário{recipients.length !== 1 ? 's' : ''}
              </div>
              <FailureSummary recipients={recipients} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, maxHeight: 300, overflowY: 'auto' }}>
                {recipients.map((r: any) => {
                  const contact = r.az_contacts;
                  const name = contact?.nome_fantasia || contact?.razao_social || r.contact_name || '—';
                  const rl = RECIPIENT_LABEL[r.status] || RECIPIENT_LABEL.pending;
                  return (
                    <div key={r.id} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '5px 10px', borderRadius: 6,
                      background: 'var(--bg-card-translucent)', fontSize: 12,
                      opacity: r.status === 'skipped' ? 0.55 : 1,
                    }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                        background: rl.color,
                      }} />
                      <span style={{ fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 0, maxWidth: '40%' }}>{name}</span>
                      {/* B1: motivo da falha visível (era um "!" com tooltip) */}
                      <span style={{ flex: 1, color: r.error_message ? 'var(--red)' : 'transparent', fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.error_message || undefined}>
                        {r.error_message || '.'}
                      </span>
                      {r.fallback_from && (
                        <span title={`Fone do cadastro (${r.fallback_from}) sem WhatsApp — enviado para ${r.phone}`} style={{
                          fontSize: 10, fontWeight: 700, flexShrink: 0, color: 'var(--amber)',
                          background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
                          borderRadius: 4, padding: '1px 6px',
                        }}>
                          fone alternativo
                        </span>
                      )}
                      {contact?.cidade && <span style={{ color: 'var(--text-muted)', fontSize: 11, flexShrink: 0 }}>{contact.cidade}</span>}
                      <span style={{ color: rl.color, fontSize: 11, flexShrink: 0 }}>
                        {rl.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Campaign List ────────────────────────────────────────────────────────────

function CampaignList({ campaigns, loading, onRefresh, onDelete, onEdit }: {
  campaigns: Campaign[];
  loading: boolean;
  onRefresh: () => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            height: 72, background: 'linear-gradient(180deg, var(--card-grad-top), var(--card-grad-bot))', border: '1px solid var(--hairline)',
            borderRadius: 10, marginBottom: 10,
            animation: 'skeleton-pulse 1.4s ease-in-out infinite',
          }} />
        ))}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: 60, color: 'var(--text-muted)', gap: 8,
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        <div style={{ fontSize: 13 }}>Nenhuma campanha ainda.</div>
        <div style={{ fontSize: 12 }}>Crie uma na aba "+ Nova Campanha".</div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      {campaigns.map(c => (
        <CampaignCard
          key={c.id}
          campaign={c}
          onExpand={id => setExpanded(prev => prev === id ? null : id)}
          expanded={expanded === c.id}
          onDelete={onDelete}
          onChanged={onRefresh}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

// ─── Live Dispatch Monitor (Step 4) ──────────────────────────────────────────

function DispatchMonitor({
  campaignId, campaignName, total,
  onViewList,
}: {
  campaignId: string;
  campaignName: string;
  total: number;
  onViewList: () => void;
}) {
  const [sent, setSent] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [failed, setFailed] = useState(0);
  const [replied, setReplied] = useState(0);
  const [status, setStatus] = useState<Campaign['status']>('sending');
  const [lastError, setLastError] = useState<string | null>(null);
  const [recipients, setRecipients] = useState<any[]>([]);
  const [cancelling, setCancelling] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pumpRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const poll = useCallback(async () => {
    try {
      const res  = await fetch(`/api/campaigns/${campaignId}`);
      const data = await res.json();
      if (data.campaign) {
        setSent(data.campaign.sent_count ?? 0);
        setDelivered(data.campaign.delivered_count ?? 0);
        setFailed(data.campaign.failed_count ?? 0);
        setStatus(data.campaign.status ?? 'sending');
        setLastError(data.campaign.last_error ?? null);
      }
      if (data.recipients) {
        setRecipients(data.recipients);
      }
      if (typeof data.replied_count === 'number') setReplied(data.replied_count);
    } catch {}
  }, [campaignId]);

  useEffect(() => {
    poll();
    pollRef.current = setInterval(poll, 2000);
    // Pump: retoma o worker se a cadeia serverless morrer (idempotente)
    pumpCampaign(campaignId);
    pumpRef.current = setInterval(() => pumpCampaign(campaignId), 10000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (pumpRef.current) clearInterval(pumpRef.current);
    };
  }, [poll, campaignId]);

  // Stop polling when done
  useEffect(() => {
    if (status !== 'sending') {
      if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
      if (pumpRef.current) { clearInterval(pumpRef.current); pumpRef.current = null; }
    }
  }, [status]);

  async function cancelDispatch() {
    if (!confirm('Cancelar o disparo? Os pendentes ficam na fila e você pode retomar depois.')) return;
    setCancelling(true);
    try {
      await fetch(`/api/campaigns/${campaignId}/cancel`, { method: 'POST' });
      await poll();
    } finally { setCancelling(false); }
  }

  const pct      = total > 0 ? Math.round((sent / total) * 100) : 0;
  const pending  = Math.max(0, total - sent - failed);
  const isDone   = status !== 'sending';

  return (
    <div style={{ padding: 24, maxWidth: 640 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        {!isDone ? (
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            border: '2.5px solid var(--accent)', borderTopColor: 'transparent',
            animation: 'spin 0.8s linear infinite',
          }} />
        ) : status === 'completed' ? (
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
        ) : status === 'cancelled' ? (
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2.5" strokeLinecap="round"><rect x="6" y="6" width="12" height="12" rx="1"/></svg>
          </div>
        ) : (
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
            {isDone
              ? status === 'completed' ? 'Disparo concluído'
              : status === 'cancelled' ? 'Disparo cancelado'
              : 'Disparo com erro'
              : 'Disparando mensagens...'}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{campaignName}</div>
        </div>
        {!isDone && (
          <button
            onClick={cancelDispatch}
            disabled={cancelling}
            style={{
              padding: '7px 14px', borderRadius: 8, cursor: cancelling ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', fontWeight: 600, fontSize: 12,
              border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)',
              color: 'var(--red)', opacity: cancelling ? 0.5 : 1, flexShrink: 0,
            }}
          >
            {cancelling ? 'Cancelando...' : 'Cancelar disparo'}
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div style={{
        background: 'linear-gradient(180deg, var(--card-grad-top), var(--card-grad-bot))', border: '1px solid var(--hairline)',
        borderRadius: 10, padding: 18, marginBottom: 16,
      }}>
        <ProgressBar sent={sent} failed={failed} total={total} />

        {/* Stats grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5,1fr)',
          gap: 10, marginTop: 16,
        }}>
          {[
            { label: 'Total', value: total, color: 'var(--text-primary)' },
            { label: 'Enviados', value: sent, color: 'var(--green)' },
            { label: 'Entregues', value: delivered, color: delivered > 0 ? 'var(--accent-light)' : 'var(--text-muted)' },
            { label: 'Respostas', value: replied, color: replied > 0 ? '#6AADFF' : 'var(--text-muted)' },
            { label: 'Falhos', value: failed, color: failed > 0 ? 'var(--red)' : 'var(--text-muted)' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              background: 'var(--bg-card-translucent)', borderRadius: 8, padding: '10px 12px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, color }}>{value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        {!isDone && sent > 0 && delivered === 0 && (
          <div style={{
            fontSize: 11, color: 'var(--amber)', marginTop: 12, textAlign: 'center', lineHeight: 1.5,
            background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)',
            borderRadius: 6, padding: '7px 10px',
          }}>
            Proteção canário: aguardando a confirmação de entrega do 1º envio antes de liberar o volume total.
          </div>
        )}

        {status === 'error' && lastError && (
          <div style={{
            fontSize: 12, color: 'var(--red)', marginTop: 12, lineHeight: 1.5,
            background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)',
            borderRadius: 6, padding: '8px 12px',
          }}>
            {lastError}
          </div>
        )}

        {!isDone && pending > 0 && (
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 12, textAlign: 'center' }}>
            {pending} mensagens pendentes · {estimatedMinutes(pending)} restantes
          </div>
        )}
      </div>

      {/* Recipient list */}
      <div style={{
        background: 'linear-gradient(180deg, var(--card-grad-top), var(--card-grad-bot))', border: '1px solid var(--hairline)',
        borderRadius: 10, overflow: 'hidden',
      }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--hairline)', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Destinatários
        </div>
        {failed > 0 && (
          <div style={{ padding: '10px 14px 0' }}>
            <FailureSummary recipients={recipients} />
          </div>
        )}
        <div style={{ maxHeight: 320, overflowY: 'auto' }}>
          {recipients.length === 0 ? (
            <div style={{ padding: '20px 14px', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
              Carregando lista...
            </div>
          ) : (
            recipients.map((r: any) => {
              const contact = r.az_contacts;
              const name = contact?.nome_fantasia || contact?.razao_social || r.contact_name || '—';
              const rl = RECIPIENT_LABEL[r.status] || RECIPIENT_LABEL.pending;
              return (
                <div key={r.id} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '7px 14px', borderBottom: '1px solid var(--bg-secondary)',
                  fontSize: 12, opacity: r.status === 'skipped' ? 0.55 : 1,
                }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                    background: rl.color,
                    animation: (r.status === 'pending' || r.status === 'processing') ? 'pulse-dot 1.5s ease-in-out infinite' : 'none',
                  }} />
                  <span style={{ color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 0, maxWidth: '38%' }}>{name}</span>
                  {/* B1: motivo da falha visível na linha */}
                  <span style={{ flex: 1, color: r.error_message ? 'var(--red)' : 'transparent', fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.error_message || undefined}>
                    {r.error_message || '.'}
                  </span>
                  {r.fallback_from && (
                    <span title={`Fone do cadastro (${r.fallback_from}) sem WhatsApp — enviado para ${r.phone}`} style={{
                      fontSize: 10, fontWeight: 700, flexShrink: 0, color: 'var(--amber)',
                      background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
                      borderRadius: 4, padding: '1px 6px',
                    }}>
                      fone alternativo
                    </span>
                  )}
                  {r.replied_at && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, flexShrink: 0, color: '#6AADFF',
                      background: 'rgba(106,173,255,0.1)', border: '1px solid rgba(106,173,255,0.25)',
                      borderRadius: 4, padding: '1px 6px',
                    }}>
                      Respondeu
                    </span>
                  )}
                  {contact?.cidade && <span style={{ color: 'var(--text-muted)', fontSize: 11, flexShrink: 0 }}>{contact.cidade}</span>}
                  <span style={{ fontSize: 11, flexShrink: 0, color: rl.color }}>
                    {rl.label}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ marginTop: 16 }}>
        <button onClick={onViewList} style={{ ...btn('ghost'), width: '100%' }}>
          Ver lista de campanhas
        </button>
      </div>
    </div>
  );
}

// ─── Wizard ───────────────────────────────────────────────────────────────────

// `existing` = campanha em rascunho aberta pelo botão Editar: o wizard nasce
// pré-carregado e salva via PATCH em vez de criar uma nova.
function NewCampaignWizard({
  onSuccess,
  toast,
  existing,
}: {
  onSuccess: (campaignId: string) => void;
  toast: ReturnType<typeof useToast>;
  existing?: any | null;
}) {
  const [step, setStep] = useState(1);

  // Step 1 fields
  const [name, setName]               = useState(existing?.name || '');
  const [useTemplate, setUseTemplate] = useState(existing ? !!existing.template_id : true);
  const [templateId, setTemplateId]   = useState(existing?.template_id || '');
  const [customBody, setCustomBody]   = useState(existing?.custom_body || '');
  const [templates, setTemplates]     = useState<Template[]>([]);
  const [loadingTpl, setLoadingTpl]   = useState(true);
  const [instances, setInstances]     = useState<Instance[]>([]);
  const [instanceId, setInstanceId]   = useState(existing?.instance_id || '');

  // M2: mídia específica da campanha (tem precedência sobre a mídia do template)
  const [customMediaUrl, setCustomMediaUrl]   = useState<string | null>(existing?.custom_media_url || null);
  const [customMediaType, setCustomMediaType] = useState<'image' | 'video' | null>(existing?.custom_media_type || null);
  // F2: imagens extras do álbum (a principal é customMediaUrl)
  const [extraMedia, setExtraMedia] = useState<{ url: string; type: 'image' | 'video'; text?: string }[]>(
    () => (Array.isArray(existing?.custom_media) ? existing.custom_media.slice(1) : [])
  );
  // #17 (backlog 22/07): formato explícito da mensagem no passo 1 —
  // Simples | Foto ou vídeo (com extras = álbum) | Carrossel interativo.
  const [msgFormat, setMsgFormat] = useState<'text' | 'media' | 'carousel'>(() => {
    if (existing?.media_format === 'carousel' && Array.isArray(existing?.custom_media) && existing.custom_media.length > 1) return 'carousel';
    if (existing?.custom_media_url) return 'media';
    return 'text';
  });
  const mediaFormat: 'album' | 'carousel' = msgFormat === 'carousel' ? 'carousel' : 'album';
  const [mainCardText, setMainCardText] = useState<string>(existing?.custom_media?.[0]?.text || '');
  const extraInputRef = useRef<HTMLInputElement>(null);
  const [uploadingMedia, setUploadingMedia]   = useState(false);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  async function uploadCampaignMedia(file: File) {
    setUploadingMedia(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/media/upload', { method: 'POST', body: fd });
      const d = await res.json();
      if (!res.ok) { toast.error(d.error || 'Falha no upload'); return; }
      if (msgFormat === 'carousel' && d.media_type !== 'image') { toast.error('O carrossel aceita apenas imagens'); return; }
      setCustomMediaUrl(d.url);
      setCustomMediaType(d.media_type);
    } catch {
      toast.error('Erro de conexão no upload');
    } finally {
      setUploadingMedia(false);
    }
  }

  // F2 (carrossel): imagens extras além da principal — enviadas em sequência,
  // o WhatsApp agrupa como álbum no aparelho. Máx. 5 no total, só imagem.
  const MAX_ALBUM = 5;
  async function uploadExtraMedia(file: File) {
    if (1 + extraMedia.length >= MAX_ALBUM) { toast.error(`Máximo de ${MAX_ALBUM} imagens por campanha`); return; }
    setUploadingMedia(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/media/upload', { method: 'POST', body: fd });
      const d = await res.json();
      if (!res.ok) { toast.error(d.error || 'Falha no upload'); return; }
      if (d.media_type !== 'image') { toast.error('O carrossel aceita apenas imagens extras'); return; }
      setExtraMedia(prev => [...prev, { url: d.url, type: 'image' }]);
    } catch {
      toast.error('Erro de conexão no upload');
    } finally {
      setUploadingMedia(false);
    }
  }

  // Step 2 fields
  const [brands, setBrands]             = useState<Brand[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [brandSearch, setBrandSearch]   = useState('');
  const [segmentos, setSegmentos]       = useState<{ segmento: string; count: number }[]>([]);
  const [semSegmento, setSemSegmento]   = useState(0);
  const [statusCounts, setStatusCounts] = useState<Record<string, number> | null>(null);
  const [vendedores, setVendedores]     = useState<{ vendedor: string; count: number }[]>([]);
  const [filter, setFilter]             = useState<SegmentFilter>(() => {
    // Campanha nova: disparo pelo número de cada vendedor é o padrão
    // (fluxo Tiago 15/07: Mensagem → Representada → vendedores → Disparo)
    if (!existing) return { split_por_vendedor: true };
    // Rascunhos antigos salvaram status single-select — migra para status_in
    // e descarta o campo legado (senão ele continuaria filtrando no servidor).
    const f: SegmentFilter = { ...(existing.segment_filter || {}) };
    if (f.status && !f.status_in) f.status_in = [f.status];
    delete f.status;
    // Vendedor single (M3 fase 1) → multi-select (F1)
    if (f.vendedor && !f.vendedor_in) f.vendedor_in = [f.vendedor];
    delete f.vendedor;
    return f;
  });
  const [preview, setPreview]           = useState<PreviewResult | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [loadingMore, setLoadingMore]   = useState(false);
  const [campaignId, setCampaignId]     = useState<string | null>(existing?.id || null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Sequência + abort: só o preview mais recente pode escrever na tela
  // (antes, cliques rápidos nos filtros intercalavam PATCH→GET e a contagem
  // ficava velha — era preciso "desmarcar de novo" para atualizar).
  const previewSeqRef   = useRef(0);
  const previewAbortRef = useRef<AbortController | null>(null);

  // Busca para adicionar contatos manualmente à lista
  const [addQuery, setAddQuery]     = useState('');
  const [addResults, setAddResults] = useState<any[]>([]);
  const addDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Step 4 fields (dispatch monitor)
  const [dispatchTotal, setDispatchTotal] = useState(0);
  const [dispatchName, setDispatchName]   = useState('');
  const [sending, setSending]             = useState(false);

  // Load data on mount
  useEffect(() => {
    fetch('/api/templates')
      .then(r => r.json())
      .then(d => { setTemplates(d.templates || []); setLoadingTpl(false); })
      .catch(() => setLoadingTpl(false));

    fetch('/api/brands')
      .then(r => r.json())
      .then(d => { setBrands(d.brands || []); setLoadingBrands(false); })
      .catch(() => setLoadingBrands(false));

    // Segmentos e status reais da base (as opções fixas antigas não batiam com os dados)
    fetch('/api/contacts/segmentos')
      .then(r => r.json())
      .then(d => {
        setSegmentos(d.segmentos || []);
        setSemSegmento(d.sem_segmento || 0);
        setStatusCounts(d.status_counts || null);
        setVendedores(d.vendedores || []);
      })
      .catch(() => {});

    fetch('/api/instances?live=1')
      .then(r => r.json())
      .then(d => {
        // #15: número desativado não aparece para disparo
        const list: Instance[] = (Array.isArray(d) ? d : []).filter((i: any) => i.is_active !== false);
        setInstances(list);
        // Auto-select first connected instance (só quando nada selecionado —
        // em modo edição preserva o número salvo na campanha).
        // B1: prefere número saudável — restrito (aceita e não entrega) só
        // se não houver outro conectado.
        const first = list.find(i => i.status === 'connected' && !i.restricted_at)
          || list.find(i => i.status === 'connected');
        if (first) setInstanceId((prev: string) => prev || first.id);
      })
      .catch(() => {});
  }, []);

  const selectedTemplate = templates.find(t => t.id === templateId);
  const messageBody      = useTemplate ? (selectedTemplate?.body || '') : customBody;
  const connectedInstances = instances.filter(i => i.status === 'connected');

  // Auto-trigger preview after filter changes (500ms debounce)
  useEffect(() => {
    if (!campaignId) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(loadPreview, 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [filter, campaignId]); // eslint-disable-line

  // Step 1 → 2 (cria a campanha, ou salva via PATCH quando está editando)
  // O número de envio agora é escolhido no passo 2 (fluxo: Mensagem →
  // Representada → vendedores/número → Disparo).
  async function goToStep2() {
    if (!name.trim()) { toast.error('Nome da campanha é obrigatório'); return; }
    if (useTemplate && !templateId) { toast.error('Selecione um template'); return; }
    if (!useTemplate && !customBody.trim()) { toast.error('Escreva a mensagem'); return; }
    // #17: carrossel exige 2+ imagens (1 card só não renderiza como carrossel)
    if (msgFormat === 'carousel') {
      if (!customMediaUrl || customMediaType !== 'image') { toast.error('Adicione a 1ª imagem do carrossel'); return; }
      if (extraMedia.length < 1) { toast.error('O carrossel precisa de pelo menos 2 imagens — adicione mais uma'); return; }
    }

    const payload = {
      name: name.trim(),
      template_id: useTemplate ? templateId : null,
      custom_body: !useTemplate ? customBody.trim() : null,
      custom_media_url: customMediaUrl,
      custom_media_type: customMediaUrl ? customMediaType : null,
      // F2: álbum — principal + extras (null quando não há mídia própria).
      // #8: no formato carrossel cada item leva a legenda do card (text).
      custom_media: customMediaUrl
        ? [{ url: customMediaUrl, type: customMediaType || 'image', text: mainCardText || undefined }, ...extraMedia]
        : null,
      media_format: mediaFormat,
    };

    try {
      const res = campaignId
        ? await fetch(`/api/campaigns/${campaignId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        : await fetch('/api/campaigns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...payload, segment_filter: filter }),
          });
      const d = await res.json();
      if (!res.ok) { toast.error(d.error || 'Erro ao salvar campanha'); return; }
      if (!campaignId) setCampaignId(d.campaign.id);
      setStep(2);
    } catch {
      toast.error('Erro de conexão');
    }
  }

  async function loadPreview() {
    if (!campaignId) return;
    const seq = ++previewSeqRef.current;
    previewAbortRef.current?.abort();
    const ctrl = new AbortController();
    previewAbortRef.current = ctrl;
    setPreviewLoading(true);
    try {
      // POST único: resolve E persiste o filtro na mesma chamada
      const res = await fetch(`/api/campaigns/${campaignId}/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ segment_filter: filter, offset: 0, limit: PREVIEW_PAGE }),
        signal: ctrl.signal,
      });
      const d = await res.json();
      if (seq !== previewSeqRef.current) return; // já existe um preview mais novo
      if (res.ok) setPreview({ count: d.count, duplicates: d.duplicates || 0, contacts: d.contacts || [], por_vendedor: d.por_vendedor || [] });
      else { setPreview(null); toast.error(d.error || 'Erro ao montar a lista'); }
    } catch (e: any) {
      if (e?.name === 'AbortError') return; // substituído por um preview mais novo
      if (seq === previewSeqRef.current) toast.error('Erro de conexão');
    } finally {
      if (seq === previewSeqRef.current) setPreviewLoading(false);
    }
  }

  async function loadMore() {
    if (!campaignId || !preview) return;
    setLoadingMore(true);
    try {
      const res = await fetch(`/api/campaigns/${campaignId}/preview?offset=${preview.contacts.length}&limit=${PREVIEW_PAGE}`);
      const d = await res.json();
      if (res.ok) {
        setPreview(p => p ? { ...p, count: d.count, contacts: [...p.contacts, ...(d.contacts || [])] } : p);
      }
    } finally {
      setLoadingMore(false);
    }
  }

  // Remover da lista: contato do filtro vai para exclude_ids;
  // contato manual sai de include_ids
  function removeContact(c: PreviewContact) {
    setFilter(f => c.manual
      ? { ...f, include_ids: (f.include_ids || []).filter(id => id !== c.id) }
      : { ...f, exclude_ids: [...(f.exclude_ids || []), c.id] });
  }

  function restoreExcluded() {
    setFilter(f => ({ ...f, exclude_ids: [] }));
  }

  function addContact(c: any) {
    if (!c.phone_primary) return;
    setFilter(f => ({
      ...f,
      include_ids: (f.include_ids || []).includes(c.id)
        ? f.include_ids
        : [...(f.include_ids || []), c.id],
      exclude_ids: (f.exclude_ids || []).filter(id => id !== c.id),
    }));
    setAddQuery('');
    setAddResults([]);
  }

  // Busca de contatos para adicionar (debounce 400ms)
  useEffect(() => {
    if (addDebounceRef.current) clearTimeout(addDebounceRef.current);
    if (!addQuery.trim()) { setAddResults([]); return; }
    addDebounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/contacts?q=${encodeURIComponent(addQuery.trim())}&limit=8`);
        const d = await res.json();
        setAddResults(d.contacts || []);
      } catch { setAddResults([]); }
    }, 400);
    return () => { if (addDebounceRef.current) clearTimeout(addDebounceRef.current); };
  }, [addQuery]);

  // Step 2 → 3
  async function goToStep3() {
    if (!preview) { await loadPreview(); return; }
    if (preview.count === 0) {
      toast.error(
        splitMode
          ? 'Nenhum cliente com vendedor roteável na lista — vincule os números aos vendedores em Configurações ou use "Número único"'
          : filter.manual_only ? 'A lista está vazia — adicione contatos' : 'Nenhum contato corresponde ao filtro'
      );
      return;
    }
    if (!splitMode && !instanceId) { toast.error('Selecione um número de envio'); return; }
    // Persist final síncrono: garante que o disparo usa exatamente o filtro
    // que está na tela (o save do preview é debounced e pode estar em voo).
    // No modo vendedor a instância fica nula — cada filha recebe a sua no send.
    try {
      await fetch(`/api/campaigns/${campaignId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ segment_filter: filter, instance_id: splitMode ? null : (instanceId || null) }),
      });
    } catch {
      toast.error('Erro ao salvar o filtro — tente novamente');
      return;
    }
    setStep(3);
  }

  // Step 3 → fire
  async function fireDisparo() {
    if (!campaignId) return;
    setSending(true);
    try {
      const res = await fetch(`/api/campaigns/${campaignId}/send`, { method: 'POST' });
      const d = await res.json();
      if (!res.ok) { toast.error(d.error || 'Erro ao disparar'); setSending(false); return; }
      // F1: disparo dividido por vendedor → volta pra lista (N campanhas-filhas)
      if (d.split) {
        const started = (d.children || []).filter((c: any) => c.started).length;
        const held = (d.children || []).length - started;
        toast.success(
          `Disparo dividido em ${d.children.length} campanha${d.children.length !== 1 ? 's' : ''} por vendedor` +
          (held > 0 ? ` — ${held} aguardando conexão do número` : '') +
          (d.excluded > 0 ? ` · ${d.excluded} contato${d.excluded !== 1 ? 's' : ''} sem vendedor/número ficaram de fora` : '')
        );
        onSuccess(campaignId);
        return;
      }
      setDispatchTotal(d.total);
      setDispatchName(name);
      setStep(4); // Go to live monitor
    } catch {
      toast.error('Erro de conexão');
      setSending(false);
    }
  }

  function toggleBrand(id: string) {
    setFilter(f => {
      const ids = f.brand_ids || [];
      return { ...f, brand_ids: ids.includes(id) ? ids.filter(b => b !== id) : [...ids, id] };
    });
  }

  function toggleStatus(value: string) {
    setFilter(f => {
      const cur = f.status_in || [];
      const next = cur.includes(value) ? cur.filter(s => s !== value) : [...cur, value];
      return { ...f, status_in: next.length > 0 ? next : undefined };
    });
  }

  function toggleVendedor(value: string) {
    setFilter(f => {
      const cur = f.vendedor_in || [];
      const next = cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value];
      return { ...f, vendedor_in: next.length > 0 ? next : undefined };
    });
  }

  // Lista manual: mantém os demais campos no estado (voltar ao modo filtro
  // restaura tudo) — o servidor ignora filtros quando manual_only está ativo.
  const manualMode = !!filter.manual_only;
  function setManualMode(on: boolean) {
    setFilter(f => ({ ...f, manual_only: on || undefined }));
  }

  // Modo de envio: pelo número de cada vendedor (split) × número único
  const splitMode = !!filter.split_por_vendedor;
  function setSplitMode(on: boolean) {
    setFilter(f => ({ ...f, split_por_vendedor: on || undefined }));
  }

  // Seletor de números (modo vendedor): marcar/desmarcar = incluir/excluir os
  // clientes daquele vendedor. vendedor_in vazio/ausente = todos marcados.
  function toggleVendedorNumero(v: string) {
    const routable = (preview?.por_vendedor || [])
      .filter(p => p.vendedor && p.instance)
      .map(p => p.vendedor as string);
    const cur = (filter.vendedor_in && filter.vendedor_in.length > 0) ? filter.vendedor_in : routable;
    const next = cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v];
    if (next.filter(x => routable.includes(x)).length === 0) {
      toast.error('Pelo menos um vendedor precisa ficar marcado — ou troque para "Número único"');
      return;
    }
    const allChecked = routable.every(r => next.includes(r));
    setFilter(f => ({ ...f, vendedor_in: allChecked ? undefined : next }));
  }

  // Partição do split: linhas participantes (para o resumo do passo 3 e a
  // estimativa) e total que fica de fora por não ter vendedor com número.
  const splitRows = (preview?.por_vendedor || []).filter(p =>
    p.vendedor && p.instance &&
    (!filter.vendedor_in || filter.vendedor_in.length === 0 || filter.vendedor_in.includes(p.vendedor))
  );
  const foraDoSplit = splitMode
    ? (preview?.por_vendedor || []).filter(p => !(p.vendedor && p.instance)).reduce((s, p) => s + p.count, 0)
    : 0;

  function toggleAllBrands() {
    const allSelected = (filter.brand_ids || []).length === brands.length && brands.length > 0;
    setFilter(f => ({ ...f, brand_ids: allSelected ? [] : brands.map(b => b.id) }));
  }

  const filteredBrands = brands.filter(b =>
    !brandSearch || b.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  // ── Render ──

  // Step 4: dispatch monitor
  if (step === 4 && campaignId) {
    return (
      <DispatchMonitor
        campaignId={campaignId}
        campaignName={dispatchName}
        total={dispatchTotal}
        onViewList={() => onSuccess(campaignId)}
      />
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 660 }}>
      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 28 }}>
        {['Mensagem', 'Lista', 'Confirmar'].map((label, i) => {
          const n = i + 1;
          const active = step === n;
          const done   = step > n;
          return (
            <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: done ? 'var(--accent)' : active ? 'var(--accent)' : 'var(--border)',
                  color: (done || active) ? '#fff' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>
                  {done ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : n}
                </div>
                <span style={{ fontSize: 12, fontWeight: active ? 600 : 400, color: active ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {label}
                </span>
              </div>
              {i < 2 && <div style={{ width: 28, height: 1, background: 'var(--border)', margin: '0 8px' }} />}
            </div>
          );
        })}
      </div>

      {/* ── Step 1: Mensagem + Número ── */}
      {step === 1 && (
        <div>
          {/* Campaign name */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Nome da campanha</label>
            <input
              style={inp}
              placeholder="Ex: Lançamento Outubro — Papelaria"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          {/* Message type toggle */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Mensagem</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {[{ id: true, label: 'Usar template' }, { id: false, label: 'Personalizada' }].map(opt => (
                <button
                  key={String(opt.id)}
                  onClick={() => setUseTemplate(opt.id)}
                  style={{ ...btn(useTemplate === opt.id ? 'primary' : 'ghost'), fontSize: 12, padding: '6px 14px' }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {useTemplate ? (
              loadingTpl ? (
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Carregando templates...</div>
              ) : (
                <select
                  style={inp}
                  value={templateId}
                  onChange={e => setTemplateId(e.target.value)}
                >
                  <option value="">Selecione um template...</option>
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              )
            ) : (
              <div>
                <textarea
                  style={{ ...inp, minHeight: 110, resize: 'vertical', lineHeight: 1.5 }}
                  placeholder="Olá {{nome_fantasia}}, temos novidades para você em {{cidade}}..."
                  value={customBody}
                  onChange={e => setCustomBody(e.target.value)}
                />
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, textAlign: 'right' }}>
                  {customBody.length} caracteres
                </div>
              </div>
            )}
          </div>

          {/* #17: formato da mensagem — Simples | Foto ou vídeo | Carrossel */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Formato da mensagem</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              {([
                ['text', 'Mensagem simples', 'Só texto'],
                ['media', 'Foto ou vídeo', 'Texto vira legenda'],
                ['carousel', 'Carrossel de imagens', `Até ${MAX_ALBUM} cards navegáveis`],
              ] as const).map(([v, label, sub]) => {
                const active = msgFormat === v;
                return (
                  <button
                    key={v}
                    onClick={() => {
                      if (v === 'text') {
                        setCustomMediaUrl(null); setCustomMediaType(null); setExtraMedia([]); setMainCardText('');
                      }
                      if (v === 'carousel' && customMediaType === 'video') {
                        setCustomMediaUrl(null); setCustomMediaType(null);
                      }
                      setMsgFormat(v);
                    }}
                    style={{
                      flex: '1 1 150px', textAlign: 'left', padding: '9px 12px', borderRadius: 10,
                      fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.12s',
                      border: active ? '1px solid var(--accent)' : '1px solid var(--border)',
                      background: active ? 'rgba(37,211,102,0.10)' : 'transparent',
                    }}
                  >
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: active ? 'var(--accent)' : 'var(--text-primary)' }}>{label}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 1 }}>{sub}</div>
                  </button>
                );
              })}
            </div>

            {msgFormat === 'text' && useTemplate && selectedTemplate?.media_url && (
              <div style={{ fontSize: 11, color: 'var(--amber)', marginBottom: 4 }}>
                O template selecionado tem mídia própria — ela continua indo junto. Para enviar só texto, use um template sem mídia ou mensagem personalizada.
              </div>
            )}

            {msgFormat !== 'text' && (() => {
              const tplMedia = useTemplate ? selectedTemplate?.media_url : null;
              const effUrl  = customMediaUrl || (msgFormat === 'media' ? tplMedia : null) || null;
              const effType = customMediaUrl ? customMediaType : (selectedTemplate?.media_type || 'image');
              return (
                <div style={{ background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 8, padding: 12 }}>
                  {effUrl ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {effType === 'video' ? (
                        <video src={effUrl} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--hairline)' }} muted />
                      ) : (
                        <img src={effUrl} alt="" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--hairline)' }} />
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: 'var(--accent-light)', fontWeight: 600 }}>
                          {customMediaUrl
                            ? `${effType === 'video' ? 'Vídeo' : 'Imagem'} desta campanha`
                            : `${effType === 'video' ? 'Vídeo' : 'Imagem'} do template`}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                          A mensagem vai como legenda. Envio de mídia usa intervalo maior entre mensagens (4–6s).
                        </div>
                      </div>
                      {customMediaUrl ? (
                        <button
                          onClick={() => { setCustomMediaUrl(null); setCustomMediaType(null); setExtraMedia([]); }}
                          style={{ ...btn('ghost'), fontSize: 11, padding: '5px 10px', color: 'var(--red)', borderColor: 'rgba(239,68,68,0.3)' }}
                        >
                          Remover
                        </button>
                      ) : (
                        <button
                          onClick={() => mediaInputRef.current?.click()}
                          disabled={uploadingMedia}
                          style={{ ...btn('ghost'), fontSize: 11, padding: '5px 10px' }}
                        >
                          {uploadingMedia ? 'Enviando…' : 'Substituir nesta campanha'}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button
                        onClick={() => mediaInputRef.current?.click()}
                        disabled={uploadingMedia}
                        style={{ ...btn('ghost'), fontSize: 12, padding: '7px 14px' }}
                      >
                        {uploadingMedia ? 'Enviando…' : msgFormat === 'carousel' ? '+ Adicionar 1ª imagem do carrossel' : '+ Anexar imagem/vídeo'}
                      </button>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {msgFormat === 'carousel' ? 'JPG/PNG/WebP até 5MB · só imagens' : 'JPG/PNG/WebP até 5MB · MP4/MOV até 16MB'}
                      </span>
                    </div>
                  )}
                  <input
                    ref={mediaInputRef} type="file"
                    accept={msgFormat === 'carousel' ? 'image/jpeg,image/png,image/webp' : 'image/jpeg,image/png,image/webp,video/mp4,video/quicktime'}
                    style={{ display: 'none' }}
                    onChange={e => { const f = e.target.files?.[0]; if (f) uploadCampaignMedia(f); e.target.value = ''; }}
                  />

                  {/* F2: carrossel — imagens extras (só quando a principal é imagem própria) */}
                  {customMediaUrl && customMediaType === 'image' && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--hairline)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        {extraMedia.map((m, i) => (
                          <div key={i} style={{ position: 'relative' }}>
                            <img src={m.url} alt="" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--hairline)', display: 'block' }} />
                            <button
                              onClick={() => setExtraMedia(prev => prev.filter((_, j) => j !== i))}
                              title="Remover imagem"
                              style={{
                                position: 'absolute', top: -6, right: -6, width: 18, height: 18,
                                borderRadius: '50%', border: 'none', cursor: 'pointer',
                                background: 'var(--red)', color: '#fff', fontSize: 11, lineHeight: 1,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}
                            >
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                          </div>
                        ))}
                        {1 + extraMedia.length < MAX_ALBUM && (
                          <button
                            onClick={() => extraInputRef.current?.click()}
                            disabled={uploadingMedia}
                            style={{
                              width: 56, height: 56, borderRadius: 8, cursor: 'pointer',
                              border: '1px dashed var(--border)', background: 'transparent',
                              color: 'var(--text-muted)', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                            title="Adicionar imagem ao carrossel"
                          >
                            +
                          </button>
                        )}
                      </div>
                      {/* #17: no carrossel cada card tem legenda própria */}
                      {msgFormat === 'carousel' && (
                        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                            Legenda de cada card (opcional — ex.: nome do produto):
                          </div>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <img src={customMediaUrl!} alt="" style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                            <input
                              style={{ ...inp, padding: '6px 10px', fontSize: 12 }}
                              placeholder="Card 1 — legenda"
                              value={mainCardText}
                              onChange={e => setMainCardText(e.target.value)}
                            />
                          </div>
                          {extraMedia.map((m, i) => (
                            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                              <img src={m.url} alt="" style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                              <input
                                style={{ ...inp, padding: '6px 10px', fontSize: 12 }}
                                placeholder={`Card ${i + 2} — legenda`}
                                value={m.text || ''}
                                onChange={e => setExtraMedia(prev => prev.map((x, j) => j === i ? { ...x, text: e.target.value } : x))}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                        {msgFormat === 'carousel'
                          ? `Carrossel: 1 mensagem única com 2 a ${MAX_ALBUM} cards navegáveis (estilo Instagram). A mensagem principal vai como texto do carrossel. Se o WhatsApp do cliente não suportar, o sistema reenvia como álbum automaticamente.`
                          : `Até ${MAX_ALBUM} imagens por campanha — chegam agrupadas como álbum. A 1ª leva a mensagem como legenda. Envio fica mais espaçado (anti-bloqueio).`}
                      </div>
                      <input
                        ref={extraInputRef} type="file" accept="image/jpeg,image/png,image/webp"
                        style={{ display: 'none' }}
                        onChange={e => { const f = e.target.files?.[0]; if (f) uploadExtraMedia(f); e.target.value = ''; }}
                      />
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Message preview */}
          {messageBody && (
            <div style={{
              background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)',
              borderRadius: 8, padding: 14, marginBottom: 18,
            }}>
              <div style={labelStyle}>Preview</div>
              {(customMediaUrl || (useTemplate && selectedTemplate?.media_url)) && (
                <div style={{ marginBottom: 8 }}>
                  {(customMediaUrl ? customMediaType : selectedTemplate?.media_type) === 'video' ? (
                    <video src={customMediaUrl || selectedTemplate?.media_url || ''} style={{ maxWidth: 220, borderRadius: 8, border: '1px solid var(--hairline)' }} muted controls />
                  ) : (
                    <img src={customMediaUrl || selectedTemplate?.media_url || ''} alt="" style={{ maxWidth: 220, borderRadius: 8, border: '1px solid var(--hairline)' }} />
                  )}
                </div>
              )}
              <div style={{ fontSize: 13, color: 'var(--text-primary)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {messageBody
                  .replace(/\{\{nome_fantasia\}\}/gi, 'Papelaria Exemplo')
                  .replace(/\{\{nome\}\}/gi, 'Papelaria Exemplo')
                  .replace(/\{\{primeiro_nome\}\}/gi, 'Papelaria')
                  .replace(/\{\{cidade\}\}/gi, 'Santa Maria')
                  .replace(/\{\{estado\}\}/gi, 'RS')
                  .replace(/\{\{contato\}\}/gi, 'João')
                  .replace(/\{\{segmento\}\}/gi, 'Papelaria')
                  .replace(/\{\{periodo_dia\}\}/gi, 'Bom dia')}
              </div>
            </div>
          )}

          <button onClick={goToStep2} style={btn('primary')}>
            Próximo — Lista →
          </button>
        </div>
      )}

      {/* ── Step 2: Destinatários ── */}
      {step === 2 && (
        <div>
          {/* Origem da lista: filtrar a base × montar do zero */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Como montar a lista</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {[
                { on: false, label: 'Filtrar a base' },
                { on: true,  label: 'Lista manual' },
              ].map(m => {
                const active = manualMode === m.on;
                return (
                  <button
                    key={String(m.on)}
                    onClick={() => setManualMode(m.on)}
                    style={{
                      padding: '6px 16px', borderRadius: 8, fontSize: 12,
                      fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
                      border: active ? '1px solid var(--accent)' : '1px solid var(--border)',
                      background: active ? 'rgba(37,211,102,0.12)' : 'transparent',
                      color: active ? 'var(--accent)' : 'var(--text-secondary)', transition: 'all 0.1s',
                    }}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
            {manualMode && (
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                A lista começa vazia — busque e adicione os contatos um a um. Os filtros ficam desativados.
              </div>
            )}
          </div>

          {/* Representada — primeiro passo do fluxo: dela saem os clientes e
              a partição por vendedor */}
          {!manualMode && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>
                Representada
                {(filter.brand_ids || []).length > 0 && (
                  <span style={{ color: 'var(--accent)', marginLeft: 6, textTransform: 'none', fontWeight: 500 }}>
                    {(filter.brand_ids || []).length} selecionadas
                  </span>
                )}
              </label>
              <button
                onClick={toggleAllBrands}
                style={{
                  fontSize: 11, padding: '3px 10px', borderRadius: 20,
                  border: '1px solid var(--hairline)', background: 'transparent',
                  color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                {(filter.brand_ids || []).length === brands.length && brands.length > 0 ? 'Desmarcar todas' : 'Selecionar todas'}
              </button>
            </div>

            {/* Brand search */}
            {brands.length > 10 && (
              <input
                style={{ ...inp, marginBottom: 8, padding: '7px 12px' }}
                placeholder="Buscar representada..."
                value={brandSearch}
                onChange={e => setBrandSearch(e.target.value)}
              />
            )}

            {loadingBrands ? (
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Carregando marcas...</div>
            ) : (
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 6,
                maxHeight: brands.length > 15 ? 160 : 'none',
                overflowY: brands.length > 15 ? 'auto' : 'visible',
                padding: brands.length > 15 ? '4px 2px' : 0,
              }}>
                {filteredBrands.map(b => {
                  const active = (filter.brand_ids || []).includes(b.id);
                  return (
                    <button
                      key={b.id}
                      onClick={() => toggleBrand(b.id)}
                      style={{
                        padding: '4px 12px', borderRadius: 20, fontSize: 12,
                        fontFamily: 'inherit', cursor: 'pointer', fontWeight: 500,
                        border: active ? 'none' : '1px solid var(--border)',
                        background: active ? 'var(--accent)' : 'transparent',
                        color: active ? '#fff' : 'var(--text-secondary)', transition: 'all 0.1s',
                      }}
                    >
                      {b.name}
                    </button>
                  );
                })}
              </div>
            )}
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
              {(filter.brand_ids?.length || 0) === 0
                ? 'Sem filtro de representada — inclui todos os contatos com telefone'
                : `Somente clientes vinculados à(s) ${filter.brand_ids!.length} representada(s) selecionada(s)`}
            </div>
          </div>
          )}

          {/* Números de envio — depois da representada, antes dos refinos.
              Modo vendedor: cada cliente recebe do número do vendedor
              responsável por ele (carteira). Modo único: um número para tudo. */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>
              Números de envio
              {connectedInstances.length === 0 && instances.length > 0 && (
                <span style={{ color: 'var(--amber)', marginLeft: 6, textTransform: 'none', fontSize: 11 }}>
                  Nenhum número conectado
                </span>
              )}
            </label>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              {[
                { split: true,  label: 'Pelo vendedor de cada cliente' },
                { split: false, label: 'Número único' },
              ].map(m => {
                const active = splitMode === m.split;
                return (
                  <button
                    key={String(m.split)}
                    onClick={() => setSplitMode(m.split)}
                    style={{
                      padding: '6px 16px', borderRadius: 8, fontSize: 12,
                      fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
                      border: active ? '1px solid var(--accent)' : '1px solid var(--border)',
                      background: active ? 'rgba(37,211,102,0.12)' : 'transparent',
                      color: active ? 'var(--accent)' : 'var(--text-secondary)', transition: 'all 0.1s',
                    }}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>

            {splitMode ? (
              <>
                <VendedorPicker
                  rows={preview?.por_vendedor}
                  vendedorIn={filter.vendedor_in}
                  onToggle={toggleVendedorNumero}
                  loading={previewLoading}
                />
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                  Cada cliente recebe do número do vendedor responsável por ele na carteira da
                  representada selecionada. Marcar/desmarcar um vendedor inclui/exclui os clientes
                  dele no disparo. O envio sai em paralelo, uma campanha por vendedor.
                </div>
              </>
            ) : (
              <>
                {instances.length === 0 ? (
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Carregando instâncias...</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {instances.map(inst => (
                      <InstanceCard
                        key={inst.id}
                        inst={inst}
                        selected={instanceId === inst.id}
                        onClick={() => setInstanceId(inst.id)}
                      />
                    ))}
                  </div>
                )}
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                  Toda a lista sai por este único número.
                </div>
              </>
            )}
          </div>

          {!manualMode && (<>
          {/* Linha 1: Cidade + Estado */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Cidade</label>
              <input
                style={inp}
                placeholder="Ex: Santa Maria"
                value={filter.cidade || ''}
                onChange={e => setFilter(f => ({ ...f, cidade: e.target.value || undefined }))}
              />
            </div>
            <div>
              <label style={labelStyle}>Estado</label>
              <select
                style={inp}
                value={filter.estado || ''}
                onChange={e => setFilter(f => ({ ...f, estado: e.target.value || undefined }))}
              >
                <option value="">Todos</option>
                {ESTADO_OPTIONS.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Segmento — opções reais da base, com contagem */}
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Segmento</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[
                { value: '', label: 'Todos', count: null as number | null },
                ...segmentos.map(s => ({ value: s.segmento, label: s.segmento, count: s.count as number | null })),
                ...(semSegmento > 0 ? [{ value: '__sem__', label: 'Sem segmento', count: semSegmento as number | null }] : []),
              ].map(o => {
                const active = (filter.segmento || '') === o.value;
                return (
                  <button
                    key={o.value}
                    onClick={() => setFilter(f => ({ ...f, segmento: o.value || undefined }))}
                    style={{
                      padding: '4px 12px', borderRadius: 20, fontSize: 12,
                      fontFamily: 'inherit', cursor: 'pointer', fontWeight: 500,
                      border: active ? 'none' : '1px solid var(--border)',
                      background: active ? 'var(--accent)' : 'transparent',
                      color: active ? '#fff' : 'var(--text-secondary)', transition: 'all 0.1s',
                    }}
                  >
                    {o.label}
                    {o.count !== null && (
                      <span style={{ opacity: 0.65, marginLeft: 5, fontSize: 10 }}>{o.count}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status — multi-select com contagem real da base */}
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Status do cliente</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(() => {
                const selected = filter.status_in || [];
                const chipStyle = (active: boolean) => ({
                  padding: '4px 12px', borderRadius: 20, fontSize: 12,
                  fontFamily: 'inherit', cursor: 'pointer', fontWeight: 500,
                  border: active ? 'none' : '1px solid var(--border)',
                  background: active ? 'var(--accent)' : 'transparent',
                  color: active ? '#fff' : 'var(--text-secondary)', transition: 'all 0.1s',
                } as const);
                return (
                  <>
                    <button
                      key="__todos__"
                      onClick={() => setFilter(f => ({ ...f, status_in: undefined }))}
                      style={chipStyle(selected.length === 0)}
                    >
                      Todos
                    </button>
                    {STATUS_OPTIONS.map(o => {
                      const active = selected.includes(o.value);
                      const count = statusCounts ? (statusCounts[o.value] || 0) : null;
                      return (
                        <button key={o.value} onClick={() => toggleStatus(o.value)} style={chipStyle(active)}>
                          {o.label}
                          {count !== null && (
                            <span style={{ opacity: 0.65, marginLeft: 5, fontSize: 10 }}>{count}</span>
                          )}
                        </button>
                      );
                    })}
                  </>
                );
              })()}
            </div>
            {(filter.status_in || []).some(s => statusCounts && !statusCounts[s]) && (
              <div style={{ fontSize: 11, color: 'var(--amber)', marginTop: 6 }}>
                A base ainda não tem contatos com esse status — a inatividade será
                calculada quando a planilha de última compra for importada.
              </div>
            )}
          </div>

          {/* Vendedor — filtro simples do modo Número único (no modo "Pelo
              vendedor de cada cliente" a seleção acontece em Números de envio) */}
          {!splitMode && vendedores.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Vendedor (marque um ou mais)</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {(() => {
                  const chipStyle = (active: boolean) => ({
                    padding: '4px 12px', borderRadius: 20, fontSize: 12,
                    fontFamily: 'inherit', cursor: 'pointer', fontWeight: 500,
                    border: active ? 'none' : '1px solid var(--border)',
                    background: active ? 'var(--accent)' : 'transparent',
                    color: active ? '#fff' : 'var(--text-secondary)', transition: 'all 0.1s',
                  } as const);
                  const selected = filter.vendedor_in || [];
                  return (
                    <>
                      <button
                        key="__todos__"
                        onClick={() => setFilter(f => ({ ...f, vendedor_in: undefined }))}
                        style={chipStyle(selected.length === 0)}
                      >
                        Todos
                      </button>
                      {vendedores.map(v => (
                        <button
                          key={v.vendedor}
                          onClick={() => toggleVendedor(v.vendedor)}
                          style={chipStyle(selected.includes(v.vendedor))}
                        >
                          {v.vendedor}
                          <span style={{ opacity: 0.65, marginLeft: 5, fontSize: 10 }}>{v.count}</span>
                        </button>
                      ))}
                    </>
                  );
                })()}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                Vendedor do cliente na carteira da representada selecionada (sem
                representada, vale o do pedido mais recente — Mercos).
              </div>
            </div>
          )}

          {/* Teste interno */}
          <div style={{
            marginBottom: 18, padding: '10px 14px', borderRadius: 8,
            background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--amber)' }}>Teste — equipe u4digital</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8 }}>Dispara só para o time interno</span>
            </div>
            <button
              onClick={() => {
                const hasTag = (filter.tags || []).includes('u4digital');
                setFilter(f => ({
                  ...f,
                  tags: hasTag ? [] : ['u4digital'],
                  brand_ids: hasTag ? f.brand_ids : [],
                  cidade: hasTag ? f.cidade : undefined,
                  segmento: hasTag ? f.segmento : undefined,
                  status_in: hasTag ? f.status_in : undefined,
                  vendedor_in: hasTag ? f.vendedor_in : undefined,
                  split_por_vendedor: hasTag ? f.split_por_vendedor : undefined,
                  manual_only: hasTag ? f.manual_only : undefined,
                  include_ids: hasTag ? f.include_ids : [],
                  exclude_ids: hasTag ? f.exclude_ids : [],
                }));
              }}
              style={{
                padding: '5px 14px', borderRadius: 20, fontSize: 12,
                fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
                border: 'none', transition: 'all 0.12s',
                background: (filter.tags || []).includes('u4digital') ? 'var(--amber)' : 'rgba(251,191,36,0.15)',
                color: (filter.tags || []).includes('u4digital') ? '#000' : 'var(--amber)',
              }}
            >
              {(filter.tags || []).includes('u4digital') ? '✓ Ativo' : 'Ativar'}
            </button>
          </div>
          </>)}

          {/* Adicionar contato manualmente */}
          <div style={{ marginBottom: 14, position: 'relative' }}>
            <label style={labelStyle}>Adicionar contato à lista</label>
            <input
              style={inp}
              placeholder="Buscar por nome, razão social, CNPJ ou contato..."
              value={addQuery}
              onChange={e => setAddQuery(e.target.value)}
            />
            {addResults.length > 0 && (
              <div style={{
                position: 'absolute', left: 0, right: 0, zIndex: 20,
                background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)',
                borderRadius: 8, marginTop: 4, overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}>
                {addResults.map((c: any) => {
                  const inList = (filter.include_ids || []).includes(c.id);
                  const noPhone = !c.phone_primary;
                  return (
                    <div
                      key={c.id}
                      onClick={() => !noPhone && !inList && addContact(c)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '8px 12px', fontSize: 12,
                        cursor: (noPhone || inList) ? 'not-allowed' : 'pointer',
                        opacity: noPhone ? 0.45 : 1,
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      <span style={{ flex: 1, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.nome_fantasia || c.razao_social}
                      </span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>
                        {noPhone ? 'sem telefone' : fmtPhone(c.phone_primary)}
                      </span>
                      <span style={{ color: inList ? 'var(--text-muted)' : 'var(--accent)', fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
                        {inList ? 'na lista' : '+ Adicionar'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Lista de disparo — exatamente o que será enviado */}
          <div style={{
            background: 'linear-gradient(180deg, var(--card-grad-top), var(--card-grad-bot))', border: '1px solid var(--hairline)',
            borderRadius: 10, marginBottom: 20, overflow: 'hidden',
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--hairline)' }}>
              {previewLoading && !preview ? (
                <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 14, height: 14, border: '2px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Montando a lista de disparo...
                </div>
              ) : preview ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 26, fontWeight: 800, color: preview.count > 0 ? 'var(--accent)' : 'var(--red)' }}>
                      {preview.count}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                      {preview.count === 1 ? 'contato na lista de disparo' : 'contatos na lista de disparo'}
                    </span>
                    {previewLoading && (
                      <div style={{ width: 12, height: 12, border: '2px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                    )}
                    {preview.count > 0 && (
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>
                        {estimatedMinutes(preview.count)}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 14, marginTop: 4, flexWrap: 'wrap' }}>
                    {preview.duplicates > 0 && (
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {preview.duplicates} com número repetido (recebem 1 vez)
                      </span>
                    )}
                    {splitMode && foraDoSplit > 0 && (
                      <span style={{ fontSize: 11, color: 'var(--amber)' }}>
                        {foraDoSplit} sem vendedor com número — ficam de fora
                      </span>
                    )}
                    {(filter.include_ids?.length || 0) > 0 && (
                      <span style={{ fontSize: 11, color: 'var(--amber)' }}>
                        {filter.include_ids!.length} adicionado{filter.include_ids!.length > 1 ? 's' : ''} manualmente
                      </span>
                    )}
                    {(filter.exclude_ids?.length || 0) > 0 && (
                      <span style={{ fontSize: 11, color: 'var(--red)' }}>
                        {filter.exclude_ids!.length} removido{filter.exclude_ids!.length > 1 ? 's' : ''}
                        {' · '}
                        <span onClick={restoreExcluded} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                          restaurar
                        </span>
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {manualMode
                    ? 'Busque e adicione contatos acima para montar a lista'
                    : 'Ajuste os filtros acima para montar a lista de destinatários'}
                </div>
              )}
            </div>

            {preview && preview.contacts.length > 0 && (
              <div style={{ maxHeight: 340, overflowY: 'auto' }}>
                {preview.contacts.map(c => (
                  <div key={c.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '7px 14px', borderBottom: '1px solid var(--bg-secondary)', fontSize: 12,
                  }}>
                    <span style={{ flex: 1, color: 'var(--text-primary)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.name}
                      {c.manual && !manualMode && (
                        <span style={{
                          fontSize: 9, fontWeight: 700, color: 'var(--amber)',
                          background: 'rgba(251,191,36,0.1)', borderRadius: 100,
                          padding: '1px 6px', marginLeft: 7, verticalAlign: 'middle',
                        }}>
                          MANUAL
                        </span>
                      )}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 11, flexShrink: 0 }}>{fmtPhone(c.phone)}</span>
                    {/* B1: fixo cadastrado como principal → avisa antes do disparo */}
                    {isLikelyLandline(c.phone) && (
                      <span title="Número com cara de telefone fixo — provavelmente sem WhatsApp. O disparo tenta os outros fones do contato automaticamente." style={{
                        fontSize: 9, fontWeight: 700, color: 'var(--amber)', flexShrink: 0,
                        background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
                        borderRadius: 100, padding: '1px 6px',
                      }}>
                        FIXO
                      </span>
                    )}
                    {c.cidade && <span style={{ color: 'var(--text-muted)', fontSize: 11, maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.cidade}</span>}
                    <button
                      onClick={() => removeContact(c)}
                      title="Remover da lista de disparo"
                      style={{
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        color: 'var(--text-muted)', padding: '2px 4px', display: 'flex', flexShrink: 0,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--red)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                ))}
                {preview.contacts.length < preview.count && (
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    style={{
                      width: '100%', padding: '9px 0', border: 'none',
                      background: 'var(--bg-card-translucent)', color: 'var(--text-secondary)', fontSize: 12,
                      cursor: loadingMore ? 'wait' : 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    {loadingMore
                      ? 'Carregando...'
                      : `Carregar mais (${preview.contacts.length} de ${preview.count})`}
                  </button>
                )}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setStep(1)} style={btn('ghost')}>← Voltar</button>
            <button
              onClick={loadPreview}
              disabled={previewLoading}
              style={{ ...btn('ghost'), opacity: previewLoading ? 0.5 : 1 }}
            >
              {previewLoading ? 'Calculando...' : 'Atualizar lista'}
            </button>
            <button
              onClick={goToStep3}
              disabled={!preview || preview.count === 0}
              style={{ ...btn('primary'), opacity: (!preview || preview.count === 0) ? 0.45 : 1 }}
            >
              Próximo →
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Confirmar e Disparar ── */}
      {step === 3 && (
        <div>
          {/* Summary card */}
          <div style={{
            background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)',
            borderRadius: 10, padding: 20, marginBottom: 18,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>
              Resumo do disparo
            </div>

            {/* Números de envio: partição por vendedor (split) ou número único */}
            {splitMode ? (
              <div style={{ marginBottom: 14 }}>
                <div style={{ border: '1px solid rgba(37,211,102,0.18)', background: 'rgba(37,211,102,0.05)', borderRadius: 8, overflow: 'hidden' }}>
                  {splitRows.map((p, i) => (
                    <div key={p.vendedor} style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                      borderTop: i > 0 ? '1px solid rgba(37,211,102,0.1)' : 'none', fontSize: 12,
                    }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0, background: p.instance!.connected ? 'var(--accent)' : 'var(--text-muted)' }} />
                      <span style={{ flex: 1, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.vendedor}</span>
                      <span style={{ color: 'var(--text-secondary)', flexShrink: 0 }}>{p.count} cliente{p.count !== 1 ? 's' : ''}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: 11, flexShrink: 0 }}>via {p.instance!.name}</span>
                      {!p.instance!.connected && (
                        <span style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--text-muted)', background: 'rgba(107,114,128,0.15)', borderRadius: 100, padding: '1px 6px', flexShrink: 0 }}>desconectado</span>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                  O disparo será dividido em {splitRows.length} campanha{splitRows.length !== 1 ? 's' : ''} — uma
                  por vendedor, em paralelo. Número desconectado fica aguardando com a fila pronta (Retomar).
                  {foraDoSplit > 0 && (
                    <span style={{ color: 'var(--amber)' }}> {foraDoSplit} cliente{foraDoSplit !== 1 ? 's' : ''} sem vendedor com número fica{foraDoSplit !== 1 ? 'm' : ''} de fora.</span>
                  )}
                </div>
              </div>
            ) : (() => {
              const inst = instances.find(i => i.id === instanceId);
              return inst ? (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                  background: 'rgba(37,211,102,0.07)', border: '1px solid rgba(37,211,102,0.18)',
                  borderRadius: 8, marginBottom: 14,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                      {inst.display_name || inst.uazapi_name}
                    </span>
                    {inst.phone_number && (
                      <span style={{ fontSize: 11, color: 'var(--accent)', marginLeft: 8 }}>{inst.phone_number}</span>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--accent)' }}>Conectado</span>
                </div>
              ) : null;
            })()}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Campanha', value: name },
                {
                  label: 'Mensagem',
                  value: useTemplate ? (selectedTemplate?.name || '—') : 'Personalizada',
                },
                {
                  label: 'Mídia',
                  value: customMediaUrl
                    ? (customMediaType === 'video' ? 'Vídeo da campanha' : (extraMedia.length > 0 ? (mediaFormat === 'carousel' ? `Carrossel interativo — ${1 + extraMedia.length} cards` : `Álbum — ${1 + extraMedia.length} imagens`) : 'Imagem da campanha'))
                    : (useTemplate && selectedTemplate?.media_url)
                    ? (selectedTemplate.media_type === 'video' ? 'Vídeo do template' : 'Imagem do template')
                    : 'Sem mídia (só texto)',
                  muted: !customMediaUrl && !(useTemplate && selectedTemplate?.media_url),
                },
                { label: 'Destinatários', value: `${preview?.count ?? 0} contatos`, green: true },
                {
                  label: 'Estimativa',
                  value: splitMode
                    ? `${estimatedMinutes(splitRows.reduce((m, p) => Math.max(m, p.count), 0))} (maior lote — números em paralelo)`
                    : estimatedMinutes(preview?.count ?? 0),
                  muted: true,
                },
              ].map(({ label, value, green, muted }) => (
                <div key={label} style={{ display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 100, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: green ? 'var(--accent)' : muted ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Prévia da mensagem final — renderizada com o 1º contato real */}
          <div style={{
            background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)',
            borderRadius: 10, padding: 16, marginBottom: 14,
          }}>
            <div style={labelStyle}>Prévia da mensagem</div>
            <div style={{
              background: '#0b3d2e', border: '1px solid rgba(37,211,102,0.2)',
              borderRadius: '10px 10px 10px 2px', padding: '10px 14px',
              fontSize: 13, color: 'var(--text-primary)', whiteSpace: 'pre-wrap',
              lineHeight: 1.6, maxWidth: 480,
            }}>
              {(() => {
                const mUrl  = customMediaUrl || (useTemplate ? selectedTemplate?.media_url : null);
                const mType = customMediaUrl ? customMediaType : selectedTemplate?.media_type;
                return mUrl ? (
                  <div style={{ marginBottom: 8 }}>
                    {mType === 'video'
                      ? <video src={mUrl} style={{ maxWidth: '100%', borderRadius: 8 }} muted controls />
                      : <img src={mUrl} alt="" style={{ maxWidth: '100%', borderRadius: 8 }} />}
                  </div>
                ) : null;
              })()}
              {renderMessage(messageBody, preview?.contacts[0])}
            </div>
            {preview?.contacts[0] && (
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
                Exemplo real: assim a mensagem chega para {preview.contacts[0].name}
                {' '}({fmtPhone(preview.contacts[0].phone)}). As variáveis são preenchidas
                contato a contato.
              </div>
            )}
          </div>

          {/* Destinatários — confirmação final */}
          <div style={{
            background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)',
            borderRadius: 10, marginBottom: 18, overflow: 'hidden',
          }}>
            <div style={{
              padding: '10px 16px', borderBottom: '1px solid var(--hairline)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ ...labelStyle, marginBottom: 0 }}>
                Destinatários ({preview?.count ?? 0})
              </span>
              <button
                onClick={() => setStep(2)}
                style={{
                  fontSize: 11, padding: '3px 10px', borderRadius: 20,
                  border: '1px solid var(--hairline)', background: 'transparent',
                  color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                Ajustar lista
              </button>
            </div>
            <div style={{ maxHeight: 220, overflowY: 'auto' }}>
              {(preview?.contacts || []).map(c => (
                <div key={c.id} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '6px 16px', borderBottom: '1px solid var(--border)', fontSize: 12,
                }}>
                  <span style={{ flex: 1, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.name}
                    {c.manual && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, color: 'var(--amber)',
                        background: 'rgba(251,191,36,0.1)', borderRadius: 100,
                        padding: '1px 6px', marginLeft: 7, verticalAlign: 'middle',
                      }}>
                        MANUAL
                      </span>
                    )}
                  </span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 11, flexShrink: 0 }}>{fmtPhone(c.phone)}</span>
                </div>
              ))}
              {(preview?.count ?? 0) > (preview?.contacts.length ?? 0) && (
                <div style={{ padding: '8px 16px', fontSize: 11, color: 'var(--text-muted)' }}>
                  + {(preview!.count - preview!.contacts.length)} outros contatos (lista completa no passo anterior)
                </div>
              )}
            </div>
          </div>

          {/* Warning */}
          <div style={{
            background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: 8, padding: '10px 14px', marginBottom: 20,
            display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 12, color: 'var(--amber)', lineHeight: 1.5,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            As mensagens serão enviadas com intervalo de 2 a 4 segundos entre cada uma. Números repetidos recebem uma única vez. Você pode acompanhar o progresso em tempo real e cancelar a qualquer momento.
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={() => setStep(2)} style={btn('ghost')} disabled={sending}>← Voltar</button>
            <button
              onClick={fireDisparo}
              disabled={sending}
              style={{
                ...btn('danger'),
                padding: '11px 28px', fontSize: 14, fontWeight: 700,
                opacity: sending ? 0.7 : 1,
                display: 'flex', alignItems: 'center', gap: 8,
                flex: 1, justifyContent: 'center',
              }}
            >
              {sending ? (
                <>
                  <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Iniciando disparo...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Iniciar Disparo
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

// ─── Dashboard (Fase 2 do backlog) ────────────────────────────────────────────
// Visão agregada em tempo real: polling 5s com scan=1 (varredura de respostas
// no servidor via /message/find — o "tempo real" possível sem webhook).

interface DashStats { sent: number; delivered: number; failed: number; replies: number; }
interface DashCampaign {
  id: string; name: string; status: string;
  total_count: number | null; sent_count: number | null; delivered_count: number | null;
  failed_count: number | null; replied_count: number; started_at: string | null;
  completed_at?: string | null; last_error?: string | null;
  az_whatsapp_instances: { display_name: string | null; uazapi_name: string } | null;
}
interface DashReply {
  id: string; phone: string; body: string | null; created_at: string;
  contact_name: string | null; campaign_name: string | null;
}

function DashboardPanel() {
  const [today, setToday]     = useState<DashStats | null>(null);
  const [week, setWeek]       = useState<DashStats | null>(null);
  const [active, setActive]   = useState<DashCampaign[]>([]);
  const [recent, setRecent]   = useState<DashCampaign[]>([]);
  const [replies, setReplies] = useState<DashReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inFlightRef = useRef(false);

  const load = useCallback(async () => {
    if (inFlightRef.current) return; // scan no servidor pode passar de 5s — não empilha
    inFlightRef.current = true;
    try {
      const res = await fetch('/api/campaigns/dashboard?scan=1');
      if (!res.ok) return;
      const d = await res.json();
      setToday(d.today || null);
      setWeek(d.week || null);
      setActive(d.active || []);
      setRecent(d.recent || []);
      setReplies(d.replies_feed || []);
      setLastUpdate(new Date());
      // Pump: mantém campanhas ativas andando mesmo se a cadeia do worker morrer
      (d.active || []).forEach((c: DashCampaign) => pumpCampaign(c.id));
      // #7: pump do chatbot — com a plataforma aberta o bot responde em
      // segundos (o servidor faz throttle de 20s; fora daqui roda o cron)
      fetch('/api/bot/tick', { method: 'POST' }).catch(() => {});
    } catch {
    } finally {
      inFlightRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    pollRef.current = setInterval(load, 5000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [load]);

  const statCard = (label: string, value: number, color: string, sub?: string) => (
    <div key={label} style={{ background: 'linear-gradient(180deg, var(--card-grad-top), var(--card-grad-bot))', border: '1px solid var(--hairline)', borderRadius: 10, padding: '16px 18px' }}>
      <div style={{ fontSize: 26, fontWeight: 700, color }}>{value.toLocaleString('pt-BR')}</div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>}
    </div>
  );

  const campRow = (c: DashCampaign, live: boolean) => {
    const total = c.total_count || 0;
    const sent = c.sent_count || 0;
    const inst = c.az_whatsapp_instances;
    return (
      <div key={c.id} style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          {live && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse-dot 1s ease-in-out infinite', flexShrink: 0 }} />}
          <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
          <StatusBadge status={c.status} />
        </div>
        <ProgressBar sent={sent} failed={c.failed_count || 0} total={total} compact />
        <div style={{ display: 'flex', gap: 14, marginTop: 6, fontSize: 11, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--green)' }}>{sent}/{total} enviadas</span>
          <span style={{ color: (c.delivered_count || 0) > 0 ? 'var(--accent-light)' : 'var(--text-muted)' }}>{c.delivered_count || 0} entregues</span>
          <span style={{ color: c.replied_count > 0 ? '#6AADFF' : 'var(--text-muted)' }}>{c.replied_count} respostas</span>
          {(c.failed_count || 0) > 0 && <span style={{ color: 'var(--red)' }}>{c.failed_count} falhas</span>}
          {inst && <span>via {inst.display_name || inst.uazapi_name}</span>}
          {c.started_at && <span>{fmtDate(c.started_at)} {fmtTime(c.started_at)}</span>}
        </div>
        {c.last_error && c.status === 'error' && (
          <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 6 }}>{c.last_error}</div>
        )}
      </div>
    );
  };

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>Carregando dashboard...</div>;
  }

  return (
    <div style={{ padding: 24, maxWidth: 1080 }}>
      {/* Cards Hoje */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Hoje</span>
        {lastUpdate && (
          <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>
            atualizado {lastUpdate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} · a cada 5s
          </span>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
        {statCard('Enviadas', today?.sent ?? 0, 'var(--green)')}
        {statCard('Entregues', today?.delivered ?? 0, (today?.delivered ?? 0) > 0 ? 'var(--accent-light)' : 'var(--text-muted)')}
        {statCard('Respostas', today?.replies ?? 0, (today?.replies ?? 0) > 0 ? '#6AADFF' : 'var(--text-muted)')}
        {statCard('Falhas', today?.failed ?? 0, (today?.failed ?? 0) > 0 ? 'var(--red)' : 'var(--text-muted)')}
      </div>

      {/* Cards 7 dias */}
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>Últimos 7 dias</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 22 }}>
        {statCard('Enviadas', week?.sent ?? 0, 'var(--text-secondary)')}
        {statCard('Entregues', week?.delivered ?? 0, 'var(--text-secondary)')}
        {statCard('Respostas', week?.replies ?? 0, (week?.replies ?? 0) > 0 ? '#6AADFF' : 'var(--text-secondary)')}
        {statCard('Falhas', week?.failed ?? 0, (week?.failed ?? 0) > 0 ? 'var(--red)' : 'var(--text-secondary)')}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16, alignItems: 'start' }}>
        <div>
          {/* Campanhas ativas */}
          <div style={{ background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--hairline)', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Disparos em andamento {active.length > 0 && <span style={{ color: 'var(--accent)' }}>({active.length})</span>}
            </div>
            {active.length === 0 ? (
              <div style={{ padding: '18px 14px', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>Nenhum disparo em andamento agora</div>
            ) : active.map(c => campRow(c, true))}
          </div>

          {/* Recentes */}
          <div style={{ background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--hairline)', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Campanhas dos últimos 7 dias
            </div>
            {recent.length === 0 ? (
              <div style={{ padding: '18px 14px', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>Nenhuma campanha na última semana</div>
            ) : recent.map(c => campRow(c, false))}
          </div>
        </div>

        {/* Feed de respostas */}
        <div style={{ background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--hairline)', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Últimas respostas
          </div>
          {replies.length === 0 ? (
            <div style={{ padding: '18px 14px', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6 }}>
              Nenhuma resposta registrada ainda.<br />
              <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>As respostas dos clientes aparecem aqui minutos após chegarem (varredura ativa — o servidor WhatsApp não envia notificações).</span>
            </div>
          ) : (
            <div style={{ maxHeight: 520, overflowY: 'auto' }}>
              {replies.map(r => (
                <div key={r.id} style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#6AADFF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.contact_name || fmtPhone(r.phone)}
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', flexShrink: 0 }}>
                      {fmtDate(r.created_at)} {fmtTime(r.created_at)}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const }}>
                    {r.body || '[mensagem]'}
                  </div>
                  {r.campaign_name && (
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>← {r.campaign_name}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DisparosView() {
  const [tab, setTab] = useState<'dashboard' | 'list' | 'new'>('list');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<any | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const toast = useToast();

  // Botão Editar de um rascunho: carrega a campanha completa e abre o wizard
  async function openEdit(id: string) {
    try {
      const res = await fetch(`/api/campaigns/${id}`);
      const d = await res.json();
      if (!res.ok || !d.campaign) { toast.error(d.error || 'Erro ao abrir campanha'); return; }
      setEditData(d.campaign);
      setTab('new');
    } catch {
      toast.error('Erro de conexão');
    }
  }

  const loadCampaigns = useCallback(async () => {
    try {
      const res = await fetch('/api/campaigns?limit=50');
      const d = await res.json();
      const list: Campaign[] = d.campaigns || [];
      setCampaigns(list);
      setLoading(false);
      // Pump: garante que campanhas "Enviando" continuem avançando mesmo
      // que a cadeia do worker tenha morrido (lease evita duplicação)
      list.filter(c => c.status === 'sending').forEach(c => pumpCampaign(c.id));
    } catch {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadCampaigns(); }, [loadCampaigns]);

  // Poll every 3s if any campaign is sending
  useEffect(() => {
    const hasSending = campaigns.some(c => c.status === 'sending');
    if (hasSending) {
      if (!pollRef.current) pollRef.current = setInterval(loadCampaigns, 3000);
    } else {
      if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
    }
    return () => { if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; } };
  }, [campaigns, loadCampaigns]);

  function onWizardSuccess(campaignId: string) {
    setEditData(null);
    setTab('list');
    setLoading(true);
    loadCampaigns();
  }

  const sendingCount = campaigns.filter(c => c.status === 'sending').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{
        height: 56, borderBottom: '1px solid var(--hairline)', background: 'transparent',
        display: 'flex', alignItems: 'center', padding: '0 24px', gap: 4, flexShrink: 0,
      }}>
        <span style={{ fontSize: 16, fontWeight: 600, marginRight: 12 }}>Disparos</span>

        {(['dashboard', 'list', 'new'] as const).map(t => (
          <button
            key={t}
            onClick={() => {
              // Clicar em "+ Nova Campanha" sempre abre o wizard limpo;
              // edição entra pelo botão Editar do card
              if (t === 'new') setEditData(null);
              setTab(t);
            }}
            style={{
              padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'inherit', fontWeight: 500, fontSize: 13, border: 'none',
              background: tab === t ? 'rgba(37,211,102,0.1)' : 'transparent',
              color: tab === t ? 'var(--accent)' : 'var(--text-muted)', transition: 'all 0.12s',
            }}
          >
            {t === 'dashboard' ? 'Dashboard' : t === 'list' ? 'Campanhas' : (tab === 'new' && editData) ? 'Editando: ' + (editData.name || '').slice(0, 24) : '+ Nova Campanha'}
          </button>
        ))}

        {tab === 'list' && !loading && (
          <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 4 }}>
            {campaigns.length} {campaigns.length === 1 ? 'campanha' : 'campanhas'}
          </span>
        )}

        {sendingCount > 0 && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--accent)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse-dot 1s ease-in-out infinite', display: 'inline-block' }} />
            {sendingCount === 1 ? 'Disparando...' : `${sendingCount} disparos ativos`}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 'dashboard' ? (
          <DashboardPanel />
        ) : tab === 'list' ? (
          <CampaignList
            campaigns={campaigns}
            loading={loading}
            onRefresh={loadCampaigns}
            onDelete={id => setCampaigns(prev => prev.filter(c => c.id !== id))}
            onEdit={openEdit}
          />
        ) : (
          <NewCampaignWizard
            key={editData?.id || 'nova'}
            existing={editData}
            onSuccess={onWizardSuccess}
            toast={toast}
          />
        )}
      </div>

      <Toast toasts={toast.toasts} onDismiss={toast.dismiss} />

      <style>{`
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes skeleton-pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }
      `}</style>
    </div>
  );
}
