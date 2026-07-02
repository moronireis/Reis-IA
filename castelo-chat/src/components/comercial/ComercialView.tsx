import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { ContactDetail } from '../chat/ContactDetail';
import type { Contact } from '../../lib/types';

// ── Types ─────────────────────────────────────────────────────────────────────

type LeadStage =
  | 'novo' | 'contato_feito' | 'proposta_enviada'
  | 'visita_agendada' | 'visita_realizada' | 'negociacao'
  | 'fechado' | 'perdido';

interface Lead {
  id: string;
  phone: string;
  name: string | null;
  push_name: string | null;
  photo_url: string | null;
  lead_stage: LeadStage | null;
  event_type: string | null;
  event_date: string | null;
  guest_count: number | null;
  budget_range: string | null;
  source: string | null;
  last_message_at: string | null;
  last_message_direction: string | null;
  last_message_preview: string | null;
  created_at: string;
  message_count: number;
  inbound_count: number;
  outbound_count: number;
  days_since_last: number | null;
  needs_followup: boolean;
  lead_score: number;
  stars: number;
  budget_value: number;
}

interface PipelineData {
  stage_data: Record<string, { count: number; value: number }>;
  no_stage: number;
  source_counts: Record<string, number>;
  event_counts: Record<string, number>;
  needs_followup: number;
  upcoming_events: Array<{ id: string; event_date: string; event_type: string; lead_stage: string }>;
  avg_response_minutes: number | null;
  pipeline_value: number;
  closed_value: number;
  total_contacts: number;
}

interface LiveEvent {
  id: string;
  ts: Date;
  name: string;
  preview: string;
  direction: 'inbound' | 'outbound';
}

type ViewMode = 'kanban' | 'list' | 'table';
type SortKey = 'last_message_at' | 'event_date' | 'lead_score' | 'budget_value';

// ── Constants ─────────────────────────────────────────────────────────────────

const STAGES: { key: LeadStage; label: string; color: string; short: string }[] = [
  { key: 'novo',             label: 'Novo',         color: '#6B8F7A', short: 'Novo' },
  { key: 'contato_feito',    label: 'Contato',      color: '#7EA88E', short: 'Contato' },
  { key: 'proposta_enviada', label: 'Proposta',     color: '#C9A96E', short: 'Proposta' },
  { key: 'visita_agendada',  label: 'Visita Ag.',   color: '#A8C5B5', short: 'V.Agend.' },
  { key: 'visita_realizada', label: 'Visita Real.', color: '#8AB4A2', short: 'V.Real.' },
  { key: 'negociacao',       label: 'Negociação',   color: '#E8C87A', short: 'Negoc.' },
  { key: 'fechado',          label: 'Fechado',      color: '#4CAF80', short: 'Fechado' },
  { key: 'perdido',          label: 'Perdido',      color: '#F87171', short: 'Perdido' },
];

const EVENT_LABELS: Record<string, string> = {
  casamento: 'Casamento', debutante: 'Debutante',
  corporativo: 'Corporativo', confraternizacao: 'Confraternização', outro: 'Outro',
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtBRL(n: number) {
  if (n >= 1000000) return 'R$ ' + (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return 'R$ ' + (n / 1000).toFixed(0) + 'K';
  return 'R$ ' + n.toLocaleString('pt-BR');
}

function fmtDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

function fmtTime(d: Date) {
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function timeAgo(iso: string | null): string {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'agora';
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

function displayName(lead: Lead) {
  return lead.name || lead.push_name || lead.phone;
}

function Stars({ n }: { n: number }) {
  return (
    <span style={{ letterSpacing: 1, fontSize: 11 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= n ? '#C9A96E' : 'rgba(201,169,110,0.18)' }}>★</span>
      ))}
    </span>
  );
}

function Avatar({ lead, size = 28 }: { lead: Lead; size?: number }) {
  return lead.photo_url ? (
    <img
      src={lead.photo_url} alt=""
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover',
        flexShrink: 0, border: '1px solid rgba(201,169,110,0.2)' }}
    />
  ) : (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: 'rgba(201,169,110,0.1)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: size * 0.4, color: '#C9A96E', fontWeight: 500,
    }}>
      {(displayName(lead)[0] || '?').toUpperCase()}
    </div>
  );
}

function StageBadge({ stage }: { stage: LeadStage | null }) {
  const s = STAGES.find(x => x.key === stage);
  if (!s) return <span style={{ color: 'rgba(244,239,230,0.25)', fontSize: 11 }}>—</span>;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '2px 7px',
      borderRadius: 2, fontSize: 11, fontWeight: 500, whiteSpace: 'nowrap',
      background: `${s.color}18`, border: `1px solid ${s.color}40`, color: s.color,
    }}>{s.label}</span>
  );
}

// ── Stage update ──────────────────────────────────────────────────────────────

async function patchStage(id: string, stage: LeadStage): Promise<boolean> {
  try {
    const res = await fetch(`/api/contacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lead_stage: stage }),
    });
    return res.ok;
  } catch { return false; }
}

// ── Pipeline Bar ──────────────────────────────────────────────────────────────

function PipelineBar({
  data, activeStage, onStageClick,
}: {
  data: PipelineData | null;
  activeStage: string;
  onStageClick: (key: string) => void;
}) {
  if (!data) return (
    <div style={{ height: 64, background: '#192820', borderRadius: 4,
      border: '1px solid rgba(201,169,110,0.12)', display: 'flex',
      alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: 'rgba(244,239,230,0.2)', fontSize: 13 }}>Carregando...</span>
    </div>
  );

  return (
    <div style={{ background: '#192820', borderRadius: 4,
      border: '1px solid rgba(201,169,110,0.15)', padding: '10px 18px',
      display: 'flex', alignItems: 'center', gap: 0 }}>

      {/* KPIs */}
      <div style={{ display: 'flex', gap: 24, marginRight: 24, flexShrink: 0 }}>
        {[
          { label: 'Total', value: String(data.total_contacts), color: '#F4EFE6' },
          { label: 'Pipeline', value: fmtBRL(data.pipeline_value), color: '#C9A96E' },
          { label: 'Fechado', value: fmtBRL(data.closed_value), color: '#4CAF80' },
          ...(data.avg_response_minutes != null ? [{
            label: 'T. resposta',
            value: data.avg_response_minutes < 60 ? `${data.avg_response_minutes}m` : `${Math.round(data.avg_response_minutes / 60)}h`,
            color: data.avg_response_minutes > 60 ? '#F87171' : '#F4EFE6',
          }] : []),
        ].map(k => (
          <div key={k.label}>
            <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(201,169,110,0.4)', marginBottom: 1 }}>{k.label}</div>
            <div style={{ fontSize: 17, fontWeight: 400, color: k.color, lineHeight: 1 }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={{ width: 1, height: 36, background: 'rgba(201,169,110,0.12)', marginRight: 20, flexShrink: 0 }} />

      {/* Stage pills — clickable */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1, overflowX: 'auto' }}>
        {STAGES.map((s, i) => {
          const d = data.stage_data[s.key] || { count: 0, value: 0 };
          const isActive = activeStage === s.key;
          const isLast = i === STAGES.length - 1;
          return (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <button
                onClick={() => onStageClick(isActive ? '' : s.key)}
                style={{
                  background: isActive ? `${s.color}22` : d.count > 0 ? `${s.color}0D` : 'transparent',
                  border: `1px solid ${isActive ? s.color : d.count > 0 ? `${s.color}45` : `${s.color}20`}`,
                  borderRadius: 2, padding: '4px 10px', textAlign: 'center',
                  cursor: 'pointer', transition: 'all 0.18s',
                  opacity: d.count === 0 ? 0.38 : 1,
                  outline: 'none',
                  boxShadow: isActive ? `0 0 8px ${s.color}30` : 'none',
                }}
              >
                <div style={{ fontSize: 9, color: s.color, letterSpacing: '0.05em', marginBottom: 1, whiteSpace: 'nowrap' }}>{s.short}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: '#F4EFE6', lineHeight: 1 }}>{d.count}</div>
              </button>
              {!isLast && (
                <svg width="7" height="11" viewBox="0 0 7 11" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M1 1l5 4.5-5 4.5" stroke="rgba(244,239,230,0.1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {data.needs_followup > 0 && (
        <div style={{ marginLeft: 16, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5,
          background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)',
          borderRadius: 2, padding: '4px 10px' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F87171' }} />
          <span style={{ fontSize: 11, color: '#F87171', whiteSpace: 'nowrap' }}>{data.needs_followup} sem resposta</span>
        </div>
      )}
    </div>
  );
}

// ── Kanban card ───────────────────────────────────────────────────────────────

function KanbanCard({
  lead, isDragging, onDragStart, onOpenChat,
}: {
  lead: Lead;
  isDragging: boolean;
  onDragStart: () => void;
  onOpenChat: () => void;
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onOpenChat}
      style={{
        background: isDragging ? 'rgba(201,169,110,0.08)' : '#1E2E24',
        border: `1px solid ${lead.needs_followup ? 'rgba(248,113,113,0.35)' : 'rgba(201,169,110,0.12)'}`,
        borderRadius: 3, padding: '10px 11px', cursor: 'grab', marginBottom: 6,
        opacity: isDragging ? 0.5 : 1, transition: 'opacity 0.15s, border-color 0.15s',
        userSelect: 'none',
      }}
    >
      {/* Name + followup dot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
        <Avatar lead={lead} size={24} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#F4EFE6', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {displayName(lead)}
          </div>
        </div>
        {lead.needs_followup && (
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F87171', flexShrink: 0, boxShadow: '0 0 5px #F87171' }} title="Sem resposta" />
        )}
      </div>

      {/* Event + date */}
      {(lead.event_type || lead.event_date) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 11 }}>
          <span style={{ color: 'rgba(244,239,230,0.45)' }}>
            {lead.event_type ? EVENT_LABELS[lead.event_type] || lead.event_type : ''}
          </span>
          {lead.event_date && (
            <span style={{ color: '#C9A96E', fontWeight: 500 }}>{fmtDate(lead.event_date)}</span>
          )}
        </div>
      )}

      {/* Budget */}
      {lead.budget_range && (
        <div style={{ fontSize: 11, color: lead.budget_value >= 150000 ? '#4CAF80' : lead.budget_value >= 75000 ? '#C9A96E' : 'rgba(244,239,230,0.4)', marginBottom: 5 }}>
          {lead.budget_range}
        </div>
      )}

      {/* Footer: score + last contact */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <Stars n={lead.stars} />
        <span style={{ fontSize: 10, color: lead.needs_followup ? '#F87171' : 'rgba(244,239,230,0.25)' }}>
          {timeAgo(lead.last_message_at)}
        </span>
      </div>
    </div>
  );
}

// ── Kanban column ─────────────────────────────────────────────────────────────

function KanbanColumn({
  stage, leads, isDragOver, activeFilter,
  onDragOver, onDragLeave, onDrop, onDragStart, onOpenChat,
}: {
  stage: typeof STAGES[0];
  leads: Lead[];
  isDragOver: boolean;
  activeFilter: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onDragStart: (leadId: string) => void;
  onOpenChat: (phone: string) => void;
}) {
  const colValue = leads.reduce((s, l) => s + l.budget_value, 0);

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{
        width: 210, flexShrink: 0, display: 'flex', flexDirection: 'column',
        background: isDragOver ? `${stage.color}08` : activeFilter ? `${stage.color}05` : 'transparent',
        border: `1px solid ${isDragOver ? stage.color + '60' : activeFilter ? stage.color + '35' : 'rgba(201,169,110,0.1)'}`,
        borderRadius: 4, transition: 'all 0.18s', overflow: 'hidden',
      }}
    >
      {/* Column header */}
      <div style={{
        padding: '9px 11px', borderBottom: `1px solid ${stage.color}25`,
        background: `${stage.color}0F`, flexShrink: 0,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: stage.color, letterSpacing: '0.06em' }}>
            {stage.label.toUpperCase()}
          </span>
          <span style={{
            fontSize: 12, fontWeight: 600, color: '#F4EFE6',
            background: `${stage.color}20`, padding: '1px 7px', borderRadius: 10,
          }}>{leads.length}</span>
        </div>
        {colValue > 0 && (
          <div style={{ fontSize: 10, color: `${stage.color}90`, marginTop: 2 }}>{fmtBRL(colValue)}</div>
        )}
      </div>

      {/* Cards */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px 4px' }}>
        {leads.length === 0 ? (
          <div style={{
            height: 48, border: `1px dashed ${stage.color}20`, borderRadius: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: `${stage.color}40`,
          }}>arraste aqui</div>
        ) : leads.map(lead => (
          <KanbanCard
            key={lead.id}
            lead={lead}
            isDragging={false}
            onDragStart={() => onDragStart(lead.id)}
            onOpenChat={() => onOpenChat(lead.phone)}
          />
        ))}
      </div>
    </div>
  );
}

// ── Kanban board ──────────────────────────────────────────────────────────────

function KanbanBoard({
  leads, activeStage, onUpdateStage, onOpenChat,
}: {
  leads: Lead[];
  activeStage: string;
  onUpdateStage: (id: string, stage: LeadStage) => void;
  onOpenChat: (phone: string) => void;
}) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);

  const byStage: Record<string, Lead[]> = {};
  for (const s of STAGES) byStage[s.key] = [];
  for (const l of leads) {
    const key = l.lead_stage || 'novo';
    if (byStage[key]) byStage[key].push(l);
    else byStage['novo'].push(l);
  }
  // Sort each column: needs_followup first, then by score desc
  for (const key of Object.keys(byStage)) {
    byStage[key].sort((a, b) => {
      if (a.needs_followup && !b.needs_followup) return -1;
      if (!a.needs_followup && b.needs_followup) return 1;
      return b.lead_score - a.lead_score;
    });
  }

  // If a stage filter is active, show only that column prominently but keep all visible
  const visibleStages = activeStage
    ? [...STAGES.filter(s => s.key === activeStage), ...STAGES.filter(s => s.key !== activeStage)]
    : STAGES;

  return (
    <div style={{ display: 'flex', gap: 8, height: '100%', overflowX: 'auto', paddingBottom: 6 }}>
      {visibleStages.map(stage => (
        <KanbanColumn
          key={stage.key}
          stage={stage}
          leads={byStage[stage.key] || []}
          isDragOver={dragOverStage === stage.key}
          activeFilter={activeStage === stage.key}
          onDragOver={(e) => { e.preventDefault(); setDragOverStage(stage.key); }}
          onDragLeave={() => setDragOverStage(null)}
          onDrop={(e) => {
            e.preventDefault();
            if (draggingId && draggingId !== stage.key) {
              onUpdateStage(draggingId, stage.key as LeadStage);
            }
            setDraggingId(null);
            setDragOverStage(null);
          }}
          onDragStart={(id) => setDraggingId(id)}
          onOpenChat={onOpenChat}
        />
      ))}
    </div>
  );
}

// ── Live Feed ─────────────────────────────────────────────────────────────────

function LiveFeed({ events }: { events: LiveEvent[] }) {
  return (
    <div style={{ background: '#192820', border: '1px solid rgba(201,169,110,0.12)', borderRadius: 4, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ padding: '9px 12px', borderBottom: '1px solid rgba(201,169,110,0.08)', display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4CAF80', boxShadow: '0 0 6px #4CAF80', animation: 'rpulse 2s infinite' }} />
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.5)' }}>
          Ao vivo
        </span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {events.length === 0 ? (
          <div style={{ padding: '16px 12px', textAlign: 'center', color: 'rgba(244,239,230,0.18)', fontSize: 12 }}>Aguardando mensagens...</div>
        ) : events.map(e => (
          <div key={e.id} style={{
            padding: '7px 12px', borderBottom: '1px solid rgba(201,169,110,0.05)',
            background: e.direction === 'inbound' ? 'transparent' : 'rgba(201,169,110,0.025)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: e.direction === 'inbound' ? '#F4EFE6' : 'rgba(201,169,110,0.75)' }}>
                {e.direction === 'inbound' ? '↙' : '↗'} {e.name}
              </span>
              <span style={{ fontSize: 10, color: 'rgba(244,239,230,0.22)' }}>{fmtTime(e.ts)}</span>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(244,239,230,0.35)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {e.preview || '—'}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes rpulse { 0%,100%{opacity:1}50%{opacity:.35} }
      `}</style>
    </div>
  );
}

// ── Right panel ───────────────────────────────────────────────────────────────

function SidePanel({ data, events }: { data: PipelineData | null; events: LiveEvent[] }) {
  if (!data) return null;
  const sourceEntries = Object.entries(data.source_counts).sort((a, b) => b[1] - a[1]);
  const eventEntries = Object.entries(data.event_counts).sort((a, b) => b[1] - a[1]);
  const maxSrc = Math.max(...sourceEntries.map(e => e[1]), 1);
  const maxEvt = Math.max(...eventEntries.map(e => e[1]), 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', height: '100%' }}>
      <div style={{ flex: '0 0 240px' }}><LiveFeed events={events} /></div>

      {data.upcoming_events.length > 0 && (
        <div style={{ background: '#192820', border: '1px solid rgba(201,169,110,0.12)', borderRadius: 4, padding: '9px 12px', flexShrink: 0 }}>
          <div style={sectionHead}>Próximos eventos</div>
          {data.upcoming_events.slice(0, 4).map(ev => (
            <div key={ev.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 11 }}>
              <span style={{ color: 'rgba(244,239,230,0.55)' }}>{EVENT_LABELS[ev.event_type] || ev.event_type}</span>
              <span style={{ color: '#C9A96E', fontWeight: 500 }}>{fmtDate(ev.event_date)}</span>
            </div>
          ))}
        </div>
      )}

      {sourceEntries.length > 0 && (
        <div style={{ background: '#192820', border: '1px solid rgba(201,169,110,0.12)', borderRadius: 4, padding: '9px 12px', flexShrink: 0 }}>
          <div style={sectionHead}>Origem</div>
          {sourceEntries.map(([src, cnt]) => (
            <div key={src} style={{ marginBottom: 5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(244,239,230,0.55)', marginBottom: 2 }}>
                <span>{src}</span><span style={{ color: '#C9A96E' }}>{cnt}</span>
              </div>
              <div style={{ height: 3, background: 'rgba(244,239,230,0.06)', borderRadius: 2 }}>
                <div style={{ height: '100%', width: `${(cnt / maxSrc) * 100}%`, background: '#C9A96E', borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {eventEntries.length > 0 && (
        <div style={{ background: '#192820', border: '1px solid rgba(201,169,110,0.12)', borderRadius: 4, padding: '9px 12px', flexShrink: 0 }}>
          <div style={sectionHead}>Tipo de evento</div>
          {eventEntries.map(([type, cnt]) => (
            <div key={type} style={{ marginBottom: 5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(244,239,230,0.55)', marginBottom: 2 }}>
                <span>{EVENT_LABELS[type] || type}</span><span style={{ color: '#A8C5B5' }}>{cnt}</span>
              </div>
              <div style={{ height: 3, background: 'rgba(244,239,230,0.06)', borderRadius: 2 }}>
                <div style={{ height: '100%', width: `${(cnt / maxEvt) * 100}%`, background: '#A8C5B5', borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const sectionHead: React.CSSProperties = {
  fontSize: 10, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase',
  color: 'rgba(201,169,110,0.45)', marginBottom: 8, paddingBottom: 5,
  borderBottom: '1px solid rgba(201,169,110,0.08)',
};

// ── Table view ────────────────────────────────────────────────────────────────

// ── Leads List view ───────────────────────────────────────────────────────────

function LeadsList({
  leads, loading, activeStage, onStageClick, onOpenChat,
}: {
  leads: Lead[];
  loading: boolean;
  activeStage: string;
  onStageClick: (key: string) => void;
  onOpenChat: (phone: string) => void;
}) {
  const [sort, setSort] = useState<{ key: SortKey; asc: boolean }>({ key: 'last_message_at', asc: false });
  const [followupOnly, setFollowupOnly] = useState(false);
  const [eventFilter, setEventFilter] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = leads.filter(l => {
    if (activeStage && l.lead_stage !== activeStage) return false;
    if (followupOnly && !l.needs_followup) return false;
    if (eventFilter && l.event_type !== eventFilter) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const v = (x: Lead) => {
      if (sort.key === 'last_message_at') return x.last_message_at ? new Date(x.last_message_at).getTime() : 0;
      if (sort.key === 'event_date') return x.event_date ? new Date(x.event_date).getTime() : 0;
      if (sort.key === 'lead_score') return x.lead_score;
      return x.budget_value;
    };
    return sort.asc ? v(a) - v(b) : v(b) - v(a);
  });

  const sel = selectStyle;
  const budgetColor = (v: number) => v >= 150000 ? '#4CAF80' : v >= 75000 ? '#C9A96E' : 'rgba(244,239,230,0.45)';

  return (
    <div style={{ background: '#192820', border: '1px solid rgba(201,169,110,0.12)', borderRadius: 4, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Filter + sort bar */}
      <div style={{ padding: '8px 14px', borderBottom: '1px solid rgba(201,169,110,0.08)', display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.5)', marginRight: 2 }}>
          {sorted.length} leads
        </span>
        <select value={activeStage} onChange={e => onStageClick(e.target.value)} style={sel}>
          <option value="">Todos os estágios</option>
          {STAGES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
        <select value={eventFilter} onChange={e => setEventFilter(e.target.value)} style={sel}>
          <option value="">Todos eventos</option>
          {Object.entries(EVENT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={`${sort.key}:${sort.asc ? 'asc' : 'desc'}`} onChange={e => {
          const [key, dir] = e.target.value.split(':');
          setSort({ key: key as SortKey, asc: dir === 'asc' });
        }} style={sel}>
          <option value="last_message_at:desc">Mais recentes</option>
          <option value="last_message_at:asc">Mais antigos</option>
          <option value="lead_score:desc">Maior score</option>
          <option value="event_date:asc">Data evento ↑</option>
          <option value="budget_value:desc">Maior orçamento</option>
        </select>
        <button onClick={() => setFollowupOnly(f => !f)} style={{
          ...sel, cursor: 'pointer',
          background: followupOnly ? 'rgba(248,113,113,0.12)' : sel.background,
          border: followupOnly ? '1px solid rgba(248,113,113,0.4)' : sel.border,
          color: followupOnly ? '#F87171' : sel.color,
        }}>⚠ Sem resposta</button>
        {(activeStage || followupOnly || eventFilter) && (
          <button onClick={() => { onStageClick(''); setFollowupOnly(false); setEventFilter(''); }}
            style={{ ...sel, cursor: 'pointer', color: 'rgba(244,239,230,0.3)' }}>Limpar</button>
        )}
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {loading ? (
          <div style={{ padding: 32, textAlign: 'center', color: 'rgba(244,239,230,0.2)', fontSize: 13 }}>Carregando...</div>
        ) : sorted.length === 0 ? (
          <div style={{ padding: 32, textAlign: 'center', color: 'rgba(244,239,230,0.2)', fontSize: 13 }}>Nenhum lead</div>
        ) : sorted.map(lead => {
          const isHov = hovered === lead.id;
          const stageInfo = STAGES.find(s => s.key === lead.lead_stage);
          const daysUntilEvent = lead.event_date
            ? Math.ceil((new Date(lead.event_date + 'T12:00:00').getTime() - Date.now()) / 86400000)
            : null;

          return (
            <div
              key={lead.id}
              onMouseEnter={() => setHovered(lead.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onOpenChat(lead.phone)}
              style={{
                display: 'grid',
                gridTemplateColumns: '44px 1fr auto',
                alignItems: 'center',
                gap: 14,
                padding: '12px 16px',
                borderBottom: '1px solid rgba(201,169,110,0.06)',
                background: isHov ? 'rgba(201,169,110,0.04)' : 'transparent',
                cursor: 'pointer',
                transition: 'background 0.12s',
              }}
            >
              {/* Avatar */}
              <div style={{ position: 'relative' }}>
                <Avatar lead={lead} size={40} />
                {lead.needs_followup && (
                  <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: 9, height: 9, borderRadius: '50%',
                    background: '#F87171', border: '1.5px solid #192820',
                    boxShadow: '0 0 5px #F87171',
                  }} />
                )}
              </div>

              {/* Main info */}
              <div style={{ minWidth: 0 }}>
                {/* Row 1: name + stage */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#F4EFE6', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>
                    {displayName(lead)}
                  </span>
                  {stageInfo && (
                    <span style={{
                      fontSize: 10, padding: '1px 6px', borderRadius: 2, whiteSpace: 'nowrap', flexShrink: 0,
                      background: `${stageInfo.color}18`, border: `1px solid ${stageInfo.color}40`, color: stageInfo.color,
                    }}>{stageInfo.label}</span>
                  )}
                  <Stars n={lead.stars} />
                </div>

                {/* Row 2: event + budget + phone */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  {lead.event_type && (
                    <span style={{ fontSize: 11, color: 'rgba(244,239,230,0.5)' }}>
                      {EVENT_LABELS[lead.event_type] || lead.event_type}
                    </span>
                  )}
                  {lead.event_date && (
                    <span style={{
                      fontSize: 11,
                      color: daysUntilEvent != null && daysUntilEvent <= 30
                        ? daysUntilEvent <= 7 ? '#F87171' : '#C9A96E'
                        : 'rgba(244,239,230,0.4)',
                    }}>
                      {fmtDate(lead.event_date)}
                      {daysUntilEvent != null && daysUntilEvent >= 0 && daysUntilEvent <= 60 &&
                        <span style={{ opacity: 0.6 }}> ({daysUntilEvent}d)</span>}
                    </span>
                  )}
                  {lead.guest_count && (
                    <span style={{ fontSize: 11, color: 'rgba(244,239,230,0.35)' }}>{lead.guest_count} convidados</span>
                  )}
                  {lead.budget_range && (
                    <span style={{ fontSize: 11, color: budgetColor(lead.budget_value), fontWeight: 500 }}>
                      {lead.budget_range}
                    </span>
                  )}
                  <span style={{ fontSize: 10, color: 'rgba(244,239,230,0.22)' }}>{lead.phone}</span>
                </div>
              </div>

              {/* Right side: msgs + time */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
                <span style={{
                  fontSize: 11,
                  color: lead.needs_followup ? '#F87171' : 'rgba(244,239,230,0.35)',
                  whiteSpace: 'nowrap',
                }}>
                  {timeAgo(lead.last_message_at)}
                </span>
                <div style={{ display: 'flex', gap: 6, fontSize: 11 }}>
                  <span style={{ color: 'rgba(76,175,128,0.6)' }}>↙{lead.inbound_count}</span>
                  <span style={{ color: 'rgba(201,169,110,0.45)' }}>↗{lead.outbound_count}</span>
                </div>
                {lead.source && (
                  <span style={{ fontSize: 9, color: 'rgba(244,239,230,0.22)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {lead.source}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Leads Table ────────────────────────────────────────────────────────────────

function LeadsTable({
  leads, loading, activeStage, onStageClick, onOpenChat,
}: {
  leads: Lead[];
  loading: boolean;
  activeStage: string;
  onStageClick: (key: string) => void;
  onOpenChat: (phone: string) => void;
}) {
  const [sort, setSort] = useState<{ key: SortKey; asc: boolean }>({ key: 'last_message_at', asc: false });
  const [hovered, setHovered] = useState<string | null>(null);
  const [followupOnly, setFollowupOnly] = useState(false);
  const [eventFilter, setEventFilter] = useState('');

  const filtered = leads.filter(l => {
    if (activeStage && l.lead_stage !== activeStage) return false;
    if (followupOnly && !l.needs_followup) return false;
    if (eventFilter && l.event_type !== eventFilter) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const v = (x: Lead) => {
      if (sort.key === 'last_message_at') return x.last_message_at ? new Date(x.last_message_at).getTime() : 0;
      if (sort.key === 'event_date') return x.event_date ? new Date(x.event_date).getTime() : 0;
      if (sort.key === 'lead_score') return x.lead_score;
      return x.budget_value;
    };
    return sort.asc ? v(a) - v(b) : v(b) - v(a);
  });

  function toggleSort(key: SortKey) {
    setSort(s => s.key === key ? { key, asc: !s.asc } : { key, asc: false });
  }

  const sel = selectStyle;

  return (
    <div style={{ background: '#192820', border: '1px solid rgba(201,169,110,0.12)', borderRadius: 4, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Filter bar */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(201,169,110,0.08)', display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.5)', marginRight: 2 }}>
          {sorted.length} leads
        </span>

        <select value={activeStage} onChange={e => onStageClick(e.target.value)} style={sel}>
          <option value="">Todos os estágios</option>
          {STAGES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>

        <select value={eventFilter} onChange={e => setEventFilter(e.target.value)} style={sel}>
          <option value="">Todos eventos</option>
          {Object.entries(EVENT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>

        <button onClick={() => setFollowupOnly(f => !f)} style={{
          ...sel, cursor: 'pointer',
          background: followupOnly ? 'rgba(248,113,113,0.12)' : sel.background,
          border: followupOnly ? '1px solid rgba(248,113,113,0.4)' : sel.border,
          color: followupOnly ? '#F87171' : sel.color,
        }}>⚠ Sem resposta</button>

        {(activeStage || followupOnly || eventFilter) && (
          <button onClick={() => { onStageClick(''); setFollowupOnly(false); setEventFilter(''); }}
            style={{ ...sel, cursor: 'pointer', color: 'rgba(244,239,230,0.3)' }}>
            Limpar
          </button>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {loading ? (
          <div style={{ padding: 24, textAlign: 'center', color: 'rgba(244,239,230,0.2)', fontSize: 13 }}>Carregando...</div>
        ) : sorted.length === 0 ? (
          <div style={{ padding: 24, textAlign: 'center', color: 'rgba(244,239,230,0.2)', fontSize: 13 }}>Nenhum lead</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead style={{ position: 'sticky', top: 0, background: '#192820', zIndex: 2 }}>
              <tr style={{ borderBottom: '1px solid rgba(201,169,110,0.1)' }}>
                {[
                  { label: 'Lead', align: 'left' as const, key: null },
                  { label: 'Estágio', align: 'left' as const, key: null },
                  { label: 'Evento', align: 'left' as const, key: null },
                  { label: 'Data', align: 'right' as const, key: 'event_date' as SortKey },
                  { label: 'Orçamento', align: 'right' as const, key: 'budget_value' as SortKey },
                  { label: 'Msgs', align: 'center' as const, key: null },
                  { label: 'Score', align: 'right' as const, key: 'lead_score' as SortKey },
                  { label: 'Último', align: 'right' as const, key: 'last_message_at' as SortKey },
                ].map(h => (
                  <th key={h.label} onClick={h.key ? () => toggleSort(h.key!) : undefined}
                    style={{
                      padding: '8px 11px', textAlign: h.align, fontSize: 10, fontWeight: 600,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: h.key && sort.key === h.key ? '#C9A96E' : 'rgba(201,169,110,0.38)',
                      cursor: h.key ? 'pointer' : 'default', whiteSpace: 'nowrap', userSelect: 'none',
                    }}>
                    {h.label}{h.key && sort.key === h.key ? (sort.asc ? ' ↑' : ' ↓') : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((lead, i) => {
                const isHov = hovered === lead.id;
                return (
                  <tr key={lead.id}
                    onMouseEnter={() => setHovered(lead.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => onOpenChat(lead.phone)}
                    style={{
                      borderBottom: '1px solid rgba(201,169,110,0.05)',
                      background: isHov ? 'rgba(201,169,110,0.05)' : i % 2 === 1 ? 'rgba(255,255,255,0.01)' : 'transparent',
                      cursor: 'pointer', transition: 'background 0.12s',
                    }}>
                    <td style={{ padding: '9px 11px', maxWidth: 180 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <Avatar lead={lead} size={26} />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 500, color: '#F4EFE6', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>
                            {displayName(lead)}
                          </div>
                          <div style={{ fontSize: 10, color: 'rgba(244,239,230,0.28)' }}>{lead.phone}</div>
                        </div>
                        {lead.needs_followup && (
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F87171', flexShrink: 0, boxShadow: '0 0 4px #F87171' }} />
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '9px 11px' }}><StageBadge stage={lead.lead_stage} /></td>
                    <td style={{ padding: '9px 11px', color: 'rgba(244,239,230,0.5)', fontSize: 11, whiteSpace: 'nowrap' }}>
                      {lead.event_type ? EVENT_LABELS[lead.event_type] || lead.event_type : '—'}
                    </td>
                    <td style={{ padding: '9px 11px', textAlign: 'right', color: lead.event_date ? '#C9A96E' : 'rgba(244,239,230,0.2)', fontSize: 11, whiteSpace: 'nowrap' }}>
                      {lead.event_date ? fmtDate(lead.event_date) : '—'}
                    </td>
                    <td style={{ padding: '9px 11px', textAlign: 'right', fontSize: 11, whiteSpace: 'nowrap' }}>
                      {lead.budget_range
                        ? <span style={{ color: lead.budget_value >= 150000 ? '#4CAF80' : lead.budget_value >= 75000 ? '#C9A96E' : 'rgba(244,239,230,0.45)' }}>{lead.budget_range}</span>
                        : <span style={{ color: 'rgba(244,239,230,0.18)' }}>—</span>}
                    </td>
                    <td style={{ padding: '9px 11px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: 3, justifyContent: 'center', fontSize: 10 }}>
                        <span style={{ color: '#A8C5B5' }}>↙{lead.inbound_count}</span>
                        <span style={{ color: 'rgba(201,169,110,0.55)' }}>↗{lead.outbound_count}</span>
                      </div>
                    </td>
                    <td style={{ padding: '9px 11px', textAlign: 'right' }}><Stars n={lead.stars} /></td>
                    <td style={{ padding: '9px 11px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <span style={{ fontSize: 11, color: lead.needs_followup ? '#F87171' : lead.days_since_last != null && lead.days_since_last > 7 ? 'rgba(244,239,230,0.22)' : 'rgba(244,239,230,0.5)' }}>
                        {timeAgo(lead.last_message_at)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  background: 'rgba(244,239,230,0.04)', border: '1px solid rgba(244,239,230,0.1)',
  color: 'rgba(244,239,230,0.5)', borderRadius: 2, padding: '4px 8px',
  fontSize: 11, outline: 'none',
};

// ── Main ──────────────────────────────────────────────────────────────────────

export function ComercialView() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pipeline, setPipeline] = useState<PipelineData | null>(null);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<ViewMode>('kanban');
  const [activeStage, setActiveStage] = useState('');
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [drawerLead, setDrawerLead] = useState<Lead | null>(null);
  const liveRef = useRef<LiveEvent[]>([]);

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch('/api/comercial/leads');
      if (res.ok) setLeads(await res.json());
    } catch { /* silent */ }
  }, []);

  const fetchPipeline = useCallback(async () => {
    try {
      const res = await fetch('/api/comercial/pipeline');
      if (res.ok) setPipeline(await res.json());
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchLeads(), fetchPipeline()]).then(() => {
      setLoading(false);
      setLastRefresh(new Date());
    });
  }, [fetchLeads, fetchPipeline]);

  // Polling every 2 min
  useEffect(() => {
    const id = setInterval(() => {
      fetchLeads(); fetchPipeline(); setLastRefresh(new Date());
    }, 120_000);
    return () => clearInterval(id);
  }, [fetchLeads, fetchPipeline]);

  // Supabase Realtime
  useEffect(() => {
    const channel = supabase
      .channel('comercial-rt')
      .on('postgres_changes' as any, { event: 'INSERT', schema: 'public', table: 'castelo_messages' }, (payload: any) => {
        const msg = payload.new;
        const lead = leads.find(l => l.id === msg.contact_id);
        const name = lead ? displayName(lead) : (msg.metadata?.sender_name as string) || '?';
        const event: LiveEvent = {
          id: msg.id || String(Date.now()),
          ts: new Date(msg.created_at || Date.now()),
          name,
          preview: msg.body?.slice(0, 55) || (msg.content_type !== 'text' ? `[${msg.content_type}]` : ''),
          direction: msg.direction,
        };
        liveRef.current = [event, ...liveRef.current].slice(0, 50);
        setLiveEvents([...liveRef.current]);
        setTimeout(() => { fetchLeads(); fetchPipeline(); setLastRefresh(new Date()); }, 600);
      })
      .on('postgres_changes' as any, { event: 'UPDATE', schema: 'public', table: 'castelo_contacts' }, () => {
        fetchLeads(); fetchPipeline(); setLastRefresh(new Date());
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [leads, fetchLeads, fetchPipeline]);

  // Optimistic stage update (kanban drag)
  async function handleUpdateStage(id: string, stage: LeadStage) {
    // Optimistic
    setLeads(prev => prev.map(l => l.id === id ? { ...l, lead_stage: stage } : l));
    const ok = await patchStage(id, stage);
    if (!ok) {
      // Rollback
      fetchLeads();
    } else {
      fetchPipeline();
    }
  }

  // Open drawer for a lead (by phone — find in loaded leads)
  function openDrawer(phone: string) {
    const lead = leads.find(l => l.phone === phone);
    if (lead) setDrawerLead(lead);
  }

  function handleDrawerUpdate(updated: Contact) {
    // Merge updated CRM fields back into leads array
    setLeads(prev => prev.map(l =>
      l.id === updated.id
        ? { ...l, ...updated, lead_stage: updated.lead_stage as LeadStage | null }
        : l
    ));
    setDrawerLead(prev => prev ? { ...prev, ...updated, lead_stage: updated.lead_stage as LeadStage | null } : prev);
    fetchPipeline();
  }

  function handleStageClick(key: string) {
    setActiveStage(key);
    if (view === 'table') return; // table uses it as filter
    // kanban: just sets active (column highlights + reorders)
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#1E2E24', color: '#F4EFE6', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 14 }}>

      {/* Header */}
      <div style={{ padding: '10px 18px', borderBottom: '1px solid rgba(201,169,110,0.15)', background: '#192820', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 14, color: '#C9A96E', letterSpacing: '0.08em' }}>Comercial</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* View toggle */}
          <div style={{ display: 'flex', border: '1px solid rgba(201,169,110,0.2)', borderRadius: 2, overflow: 'hidden' }}>
            {([
              { v: 'kanban', icon: '⊞', label: 'Kanban' },
              { v: 'list',   icon: '▤', label: 'Lista' },
              { v: 'table',  icon: '☰', label: 'Tabela' },
            ] as { v: ViewMode; icon: string; label: string }[]).map(({ v, icon, label }, i, arr) => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '4px 12px', fontSize: 11, fontWeight: 500, cursor: 'pointer',
                background: view === v ? 'rgba(201,169,110,0.18)' : 'transparent',
                color: view === v ? '#C9A96E' : 'rgba(244,239,230,0.38)',
                border: 'none',
                borderRight: i < arr.length - 1 ? '1px solid rgba(201,169,110,0.2)' : 'none',
                letterSpacing: '0.05em',
              }}>{icon} {label}</button>
            ))}
          </div>
          {lastRefresh && <span style={{ fontSize: 10, color: 'rgba(244,239,230,0.22)' }}>{lastRefresh.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>}
          <button onClick={() => { fetchLeads(); fetchPipeline(); setLastRefresh(new Date()); }}
            style={{ background: 'transparent', border: '1px solid rgba(201,169,110,0.18)', color: 'rgba(201,169,110,0.5)', borderRadius: 2, padding: '4px 9px', cursor: 'pointer', fontSize: 12 }}>↻</button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, padding: '12px 16px', overflow: 'hidden' }}>

        {/* Pipeline bar */}
        <div style={{ flexShrink: 0 }}>
          <PipelineBar data={pipeline} activeStage={activeStage} onStageClick={handleStageClick} />
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>

          {/* Kanban or Table */}
          <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
            {view === 'kanban' ? (
              loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'rgba(244,239,230,0.2)', fontSize: 13 }}>Carregando Kanban...</div>
              ) : (
                <KanbanBoard
                  leads={leads}
                  activeStage={activeStage}
                  onUpdateStage={handleUpdateStage}
                  onOpenChat={openDrawer}
                />
              )
            ) : view === 'list' ? (
              <LeadsList
                leads={leads}
                loading={loading}
                activeStage={activeStage}
                onStageClick={handleStageClick}
                onOpenChat={openDrawer}
              />
            ) : (
              <LeadsTable
                leads={leads}
                loading={loading}
                activeStage={activeStage}
                onStageClick={handleStageClick}
                onOpenChat={openDrawer}
              />
            )}
          </div>

          {/* Right panel */}
          <div style={{ width: 248, flexShrink: 0 }}>
            <SidePanel data={pipeline} events={liveEvents} />
          </div>
        </div>
      </div>

      {/* ── Lead detail drawer ── */}
      {drawerLead && (
        <>
          <div onClick={() => setDrawerLead(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40, backdropFilter: 'blur(1px)' }} />
          <div style={{
            position: 'fixed', top: 0, right: 0, bottom: 0, width: 320,
            background: '#162019', borderLeft: '1px solid rgba(201,169,110,0.2)',
            zIndex: 50, display: 'flex', flexDirection: 'column',
            boxShadow: '-10px 0 40px rgba(0,0,0,0.5)',
            animation: 'slideIn 0.2s ease',
          }}>
            {/* Drawer header */}
            <div style={{ padding: '11px 14px', borderBottom: '1px solid rgba(201,169,110,0.15)', background: '#0E1A13', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                {drawerLead.photo_url
                  ? <img src={drawerLead.photo_url} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(201,169,110,0.25)' }} />
                  : <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(201,169,110,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#C9A96E', fontWeight: 500 }}>
                      {(displayName(drawerLead)[0] || '?').toUpperCase()}
                    </div>
                }
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#F4EFE6', lineHeight: 1.2 }}>{displayName(drawerLead)}</div>
                  <div style={{ fontSize: 10, color: 'rgba(244,239,230,0.3)' }}>{drawerLead.phone}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                <button
                  onClick={() => { window.location.href = `/chat?highlight=${encodeURIComponent(drawerLead.phone)}`; }}
                  style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.28)', color: '#C9A96E', borderRadius: 2, padding: '3px 9px', fontSize: 11, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                >Chat →</button>
                <button onClick={() => setDrawerLead(null)} style={{ background: 'transparent', border: '1px solid rgba(244,239,230,0.1)', color: 'rgba(244,239,230,0.4)', borderRadius: 2, padding: '3px 7px', fontSize: 14, cursor: 'pointer', lineHeight: 1 }}>×</button>
              </div>
            </div>

            {/* Stats strip */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(201,169,110,0.08)', background: '#111D14', flexShrink: 0 }}>
              {[
                { label: 'Total', value: drawerLead.message_count },
                { label: '↙ Recv', value: drawerLead.inbound_count },
                { label: '↗ Env', value: drawerLead.outbound_count },
                { label: 'Score', value: `${drawerLead.lead_score}/10` },
              ].map((s, i) => (
                <div key={s.label} style={{ flex: 1, padding: '7px 0', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(201,169,110,0.06)' : 'none' }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#F4EFE6' }}>{s.value}</div>
                  <div style={{ fontSize: 9, color: 'rgba(244,239,230,0.28)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* ContactDetail — full editable form */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <ContactDetail contact={drawerLead as unknown as Contact} onUpdate={handleDrawerUpdate} />
            </div>
          </div>
          <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
        </>
      )}
    </div>
  );
}
