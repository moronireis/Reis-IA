import React, { useState, useEffect, useRef, useCallback } from 'react';

// ── Interfaces ────────────────────────────────────────────────────────────────

interface JourneyNode {
  id: string;
  phase_id: string;
  title: string;
  description: string | null;
  content_type: 'task' | 'material' | 'presentation' | 'checkpoint' | 'quiz';
  content_url: string | null;
  content_body: string | null;
  estimated_minutes: number | null;
  sort_order: number;
  is_required: boolean;
  xp_reward: number;
  icon: string | null;
  status: 'locked' | 'available' | 'in_progress' | 'completed' | 'skipped';
  completed_at: string | null;
  started_at: string | null;
  submission_url: string | null;
  submission_note: string | null;
  mentor_feedback: string | null;
}

interface JourneyPhase {
  id: string;
  journey_id: string;
  title: string;
  description: string | null;
  sort_order: number;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  icon: string | null;
  color: string | null;
  unlocked_at: string | null;
  completed_at: string | null;
  nodes: JourneyNode[];
}

interface StudentJourney {
  id: string;
  student_id: string;
  template_id: string | null;
  title: string;
  status: 'active' | 'paused' | 'completed' | 'archived';
  started_at: string;
  completed_at: string | null;
  total_xp: number;
  phases: JourneyPhase[];
}

interface JourneyMapProps {
  journey: StudentJourney;
  isAdmin: boolean;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const CONTENT_TYPE_CONFIG = {
  task:         { label: 'Tarefa',        color: '#4A90FF' },
  material:     { label: 'Material',      color: '#22C55E' },
  presentation: { label: 'Apresentação',  color: '#8B5CF6' },
  checkpoint:   { label: 'Checkpoint',    color: '#F59E0B' },
  quiz:         { label: 'Quiz',          color: '#EC4899' },
};

const CENTER_X = 300;
const PHASE_SPACING = 280;
const PHASE_OFFSET = 80;
// SVG path X positions alternate left/right of center in the 600-wide viewBox
// getPhaseX returns values in the range [220, 380]; subtract 100 to center in 600px viewBox
const SVG_X_ADJUST = 100;

// ── SVG Path Helpers ──────────────────────────────────────────────────────────

function getPhaseX(index: number, isMobile: boolean): number {
  if (isMobile) return CENTER_X;
  return index % 2 === 0 ? CENTER_X - PHASE_OFFSET : CENTER_X + PHASE_OFFSET;
}

function getPhaseY(index: number): number {
  return 100 + index * PHASE_SPACING;
}

// ── Sub-components ────────────────────────────────────────────────────────────

// Lock icon SVG
const LockIcon = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
    <rect x="1.5" y="5" width="7" height="6.5" rx="1" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
    <path d="M3 5V3.5a2 2 0 1 1 4 0V5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
  </svg>
);

// Checkmark icon SVG
const CheckIcon = ({ color = '#22C55E', size = 12 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M2 6.5L4.5 9L10 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Star dot for XP
const StarDot = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
    <circle cx="4" cy="4" r="3" fill="#4A90FF" opacity="0.9" />
    <circle cx="4" cy="4" r="1.5" fill="#fff" opacity="0.6" />
  </svg>
);

// Close icon
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 3L13 13M13 3L3 13" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Progress Computation ──────────────────────────────────────────────────────

function computeProgress(journey: StudentJourney): number {
  let total = 0;
  let done = 0;
  for (const phase of journey.phases) {
    for (const node of phase.nodes) {
      if (node.is_required) {
        total++;
        if (node.status === 'completed') done++;
      }
    }
  }
  if (total === 0) return 0;
  return Math.round((done / total) * 100);
}

// ── Phase Station Component ───────────────────────────────────────────────────

interface PhaseStationProps {
  phase: JourneyPhase;
  index: number;
  isAdmin: boolean;
  onUnlock: (phaseId: string) => void;
}

const PhaseStation: React.FC<PhaseStationProps> = ({ phase, index, isAdmin, onUnlock }) => {
  const isLocked = phase.status === 'locked';
  const isInProgress = phase.status === 'in_progress';
  const isCompleted = phase.status === 'completed';

  const stationStyle: React.CSSProperties = {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexShrink: 0,
    transition: 'all 0.3s ease',
    ...(isLocked ? {
      background: '#161616',
      border: '2px solid rgba(255,255,255,0.08)',
      opacity: 0.4,
    } : isCompleted ? {
      background: 'rgba(34,197,94,0.10)',
      border: '2px solid #22C55E',
    } : isInProgress ? {
      background: 'rgba(74,144,255,0.10)',
      border: '2px solid #4A90FF',
      animation: 'phasePulse 2s ease-in-out infinite',
    } : {
      // available
      background: '#111111',
      border: '2px solid rgba(255,255,255,0.12)',
    }),
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 600,
    color: isCompleted ? '#22C55E' : isInProgress ? '#4A90FF' : isLocked ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.7)',
    lineHeight: 1,
    fontFamily: 'Inter, sans-serif',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <div style={stationStyle}>
        {isCompleted ? (
          <CheckIcon color="#22C55E" size={18} />
        ) : isLocked ? (
          <LockIcon />
        ) : (
          <span style={labelStyle}>{index + 1}</span>
        )}
      </div>
      {isAdmin && isLocked && (
        <button
          onClick={() => onUnlock(phase.id)}
          style={{
            marginTop: '4px',
            fontSize: '9px',
            padding: '2px 6px',
            background: 'rgba(74,144,255,0.10)',
            border: '1px solid rgba(74,144,255,0.30)',
            borderRadius: '4px',
            color: '#4A90FF',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            whiteSpace: 'nowrap',
          }}
        >
          Desbloquear
        </button>
      )}
    </div>
  );
};

// ── Node Card Component ───────────────────────────────────────────────────────

interface NodeCardProps {
  node: JourneyNode;
  isAdmin: boolean;
  onClick: (node: JourneyNode) => void;
}

const NodeCard: React.FC<NodeCardProps> = ({ node, isAdmin, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const cfg = CONTENT_TYPE_CONFIG[node.content_type];
  const isLocked = node.status === 'locked';
  const isCompleted = node.status === 'completed';
  const isInProgress = node.status === 'in_progress';
  const isSkipped = node.status === 'skipped';

  const cardStyle: React.CSSProperties = {
    width: '170px',
    minHeight: '96px',
    padding: '12px 14px',
    borderRadius: '12px',
    background: '#111111',
    border: isInProgress
      ? '1px solid #4A90FF'
      : isCompleted
        ? '1px solid #22C55E'
        : hovered && !isLocked
          ? '1px solid rgba(255,255,255,0.12)'
          : '1px solid rgba(255,255,255,0.06)',
    cursor: isLocked ? 'default' : 'pointer',
    opacity: isLocked ? 0.35 : isSkipped ? 0.5 : 1,
    transform: hovered && !isLocked ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'all 0.2s ease',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flexShrink: 0,
  };

  const topRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  };

  const dotStyle: React.CSSProperties = {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: cfg.color,
    flexShrink: 0,
  };

  const typeLabel: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 500,
    color: cfg.color,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    fontFamily: 'Inter, sans-serif',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 500,
    color: '#FFFFFF',
    lineHeight: 1.4,
    fontFamily: 'Inter, sans-serif',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
    textDecoration: isSkipped ? 'line-through' : 'none',
    textDecorationColor: 'rgba(255,255,255,0.4)',
  };

  const bottomRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: 'auto',
    paddingTop: '2px',
  };

  const xpBadgeStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 600,
    color: '#4A90FF',
    background: 'rgba(74,144,255,0.10)',
    borderRadius: '4px',
    padding: '1px 5px',
    fontFamily: 'Inter, sans-serif',
  };

  const timeStyle: React.CSSProperties = {
    fontSize: '10px',
    color: 'rgba(255,255,255,0.35)',
    fontFamily: 'Inter, sans-serif',
  };

  const requiredDotStyle: React.CSSProperties = {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: '#EF4444',
    flexShrink: 0,
    marginLeft: 'auto',
  };

  // Top-right corner indicator
  const cornerStyle: React.CSSProperties = {
    position: 'absolute',
    top: '8px',
    right: '8px',
  };

  return (
    <div
      style={cardStyle}
      onClick={() => !isLocked && onClick(node)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role={isLocked ? 'presentation' : 'button'}
      tabIndex={isLocked ? -1 : 0}
      onKeyDown={(e) => { if (!isLocked && (e.key === 'Enter' || e.key === ' ')) onClick(node); }}
      aria-label={isLocked ? undefined : `${cfg.label}: ${node.title}`}
    >
      {/* Corner status indicator */}
      {isCompleted && (
        <span style={cornerStyle}><CheckIcon color="#22C55E" size={11} /></span>
      )}
      {isLocked && (
        <span style={cornerStyle}><LockIcon /></span>
      )}
      {isInProgress && (
        <span style={{ ...cornerStyle }}>
          <span style={{
            display: 'block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#4A90FF',
            animation: 'phasePulse 1.5s ease-in-out infinite',
          }} />
        </span>
      )}

      {/* Type row */}
      <div style={topRowStyle}>
        <span style={dotStyle} />
        <span style={typeLabel}>{cfg.label}</span>
      </div>

      {/* Title */}
      <div style={titleStyle}>{node.title}</div>

      {/* Bottom metadata */}
      <div style={bottomRowStyle}>
        {node.estimated_minutes && (
          <span style={timeStyle}>{node.estimated_minutes}min</span>
        )}
        <span style={xpBadgeStyle}>{node.xp_reward} XP</span>
        {node.is_required && <span style={requiredDotStyle} title="Obrigatório" />}
      </div>

      {/* Admin feedback button */}
      {isAdmin && !isLocked && (
        <button
          onClick={(e) => { e.stopPropagation(); onClick(node); }}
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            fontSize: '9px',
            padding: '2px 5px',
            background: 'rgba(74,144,255,0.08)',
            border: '1px solid rgba(74,144,255,0.20)',
            borderRadius: '4px',
            color: '#4A90FF',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Feedback
        </button>
      )}
    </div>
  );
};

// ── Node Detail Panel ─────────────────────────────────────────────────────────

interface NodePanelProps {
  node: JourneyNode | null;
  isOpen: boolean;
  isAdmin: boolean;
  journeyId: string;
  isMobile: boolean;
  onClose: () => void;
  onNodeUpdate: (updatedNode: JourneyNode) => void;
}

const NodePanel: React.FC<NodePanelProps> = ({ node, isOpen, isAdmin, journeyId, isMobile, onClose, onNodeUpdate }) => {
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submissionNote, setSubmissionNote] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (node) {
      setSubmissionUrl(node.submission_url || '');
      setSubmissionNote(node.submission_note || '');
      setFeedbackText(node.mentor_feedback || '');
    }
  }, [node]);

  const handleComplete = useCallback(async (extraStatus?: string) => {
    if (!node) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/journeys/student/${journeyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_node',
          node_id: node.id,
          status: extraStatus || 'completed',
          submission_url: submissionUrl || undefined,
          submission_note: submissionNote || undefined,
        }),
      });
      if (res.ok) {
        const updated = { ...node, status: (extraStatus || 'completed') as JourneyNode['status'], submission_url: submissionUrl, submission_note: submissionNote };
        onNodeUpdate(updated);
      }
    } finally {
      setLoading(false);
    }
  }, [node, journeyId, submissionUrl, submissionNote, onNodeUpdate]);

  const handleSaveFeedback = useCallback(async () => {
    if (!node || !isAdmin) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/journeys/student/${journeyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_node',
          node_id: node.id,
          mentor_feedback: feedbackText,
        }),
      });
      if (res.ok) {
        const updated = { ...node, mentor_feedback: feedbackText };
        onNodeUpdate(updated);
      }
    } finally {
      setLoading(false);
    }
  }, [node, isAdmin, journeyId, feedbackText, onNodeUpdate]);

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: isMobile ? '100vw' : '480px',
    maxWidth: '100vw',
    height: '100vh',
    background: '#0A0A0A',
    borderLeft: '1px solid rgba(255,255,255,0.08)',
    zIndex: 100,
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease',
    overflowY: 'auto',
    padding: '32px 28px',
    boxSizing: 'border-box',
  };

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 99,
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
    transition: 'opacity 0.3s ease',
  };

  const cfg = node ? CONTENT_TYPE_CONFIG[node.content_type] : null;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#161616',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px',
    color: '#FFFFFF',
    padding: '10px 12px',
    fontSize: '13px',
    fontFamily: 'Inter, sans-serif',
    resize: 'vertical' as const,
    boxSizing: 'border-box',
    outline: 'none',
  };

  const btnPrimaryStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '10px 20px',
    borderRadius: '8px',
    background: '#4A90FF',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: 'Inter, sans-serif',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.6 : 1,
    transition: 'opacity 0.15s ease',
    width: '100%',
  };

  const linkBtnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '9px 16px',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.10)',
    color: '#FFFFFF',
    fontSize: '13px',
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
    textDecoration: 'none',
    width: '100%',
    boxSizing: 'border-box',
    justifyContent: 'center',
  };

  const mentorBoxStyle: React.CSSProperties = {
    background: 'rgba(74,144,255,0.05)',
    border: '1px solid rgba(74,144,255,0.15)',
    borderRadius: '8px',
    padding: '14px',
    marginTop: '16px',
  };

  const sectionLabel: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.40)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    fontFamily: 'Inter, sans-serif',
    marginBottom: '8px',
    display: 'block',
  };

  const renderContent = () => {
    if (!node || !cfg) return null;

    const isCompleted = node.status === 'completed';
    const canComplete = !isCompleted && node.status !== 'locked';

    return (
      <>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '20px',
            background: `${cfg.color}1a`,
            border: `1px solid ${cfg.color}33`,
            marginBottom: '14px',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: cfg.color, display: 'block' }} />
            <span style={{ fontSize: '11px', fontWeight: 500, color: cfg.color, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {cfg.label}
            </span>
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.3, margin: '0 0 10px', fontFamily: 'Inter, sans-serif' }}>
            {node.title}
          </h2>

          {node.description && (
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.60)', lineHeight: 1.6, margin: 0, fontFamily: 'Inter, sans-serif' }}>
              {node.description}
            </p>
          )}

          {/* Meta row */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '14px', flexWrap: 'wrap' as const }}>
            {node.estimated_minutes && (
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.40)', fontFamily: 'Inter, sans-serif' }}>
                {node.estimated_minutes} min
              </span>
            )}
            <span style={{ fontSize: '12px', color: '#4A90FF', fontFamily: 'Inter, sans-serif' }}>
              {node.xp_reward} XP
            </span>
            {node.is_required && (
              <span style={{ fontSize: '12px', color: '#EF4444', fontFamily: 'Inter, sans-serif' }}>
                Obrigatório
              </span>
            )}
            {isCompleted && (
              <span style={{ fontSize: '12px', color: '#22C55E', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckIcon color="#22C55E" size={11} /> Concluído
              </span>
            )}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* TASK */}
          {node.content_type === 'task' && (
            <>
              {node.content_body && (
                <div>
                  <span style={sectionLabel}>Descrição da Tarefa</span>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.60)', lineHeight: 1.65, margin: 0, fontFamily: 'Inter, sans-serif', whiteSpace: 'pre-wrap' }}>
                    {node.content_body}
                  </p>
                </div>
              )}
              {node.content_url && (
                <a href={node.content_url} target="_blank" rel="noopener noreferrer" style={linkBtnStyle}>
                  Abrir Recurso
                </a>
              )}
              {canComplete && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={sectionLabel}>Submissão</span>
                  <input
                    type="url"
                    placeholder="URL de entrega (opcional)"
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                    style={{ ...inputStyle, height: '38px', resize: 'none' as const }}
                  />
                  <textarea
                    placeholder="Nota sobre a entrega (opcional)"
                    value={submissionNote}
                    onChange={(e) => setSubmissionNote(e.target.value)}
                    rows={3}
                    style={inputStyle}
                  />
                  <button onClick={() => handleComplete()} disabled={loading} style={btnPrimaryStyle}>
                    {loading ? '...' : 'Marcar como Completo'}
                  </button>
                </div>
              )}
            </>
          )}

          {/* MATERIAL */}
          {node.content_type === 'material' && (
            <>
              {node.content_body && (
                <div>
                  <span style={sectionLabel}>Conteúdo</span>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.60)', lineHeight: 1.65, margin: 0, fontFamily: 'Inter, sans-serif', whiteSpace: 'pre-wrap' }}>
                    {node.content_body}
                  </p>
                </div>
              )}
              {node.content_url && (
                <a href={node.content_url} target="_blank" rel="noopener noreferrer" style={linkBtnStyle}>
                  Abrir Material
                </a>
              )}
              {canComplete && (
                <button onClick={() => handleComplete()} disabled={loading} style={btnPrimaryStyle}>
                  {loading ? '...' : 'Marcar como Visto'}
                </button>
              )}
            </>
          )}

          {/* PRESENTATION */}
          {node.content_type === 'presentation' && (
            <>
              {node.content_url && (
                <>
                  <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: '8px', overflow: 'hidden', background: '#161616' }}>
                    <iframe
                      src={node.content_url}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                      allowFullScreen
                      title={node.title}
                    />
                  </div>
                </>
              )}
              {!node.content_url && node.content_body && (
                <div>
                  <span style={sectionLabel}>Conteúdo</span>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.60)', lineHeight: 1.65, margin: 0, fontFamily: 'Inter, sans-serif', whiteSpace: 'pre-wrap' }}>
                    {node.content_body}
                  </p>
                </div>
              )}
              {canComplete && (
                <button onClick={() => handleComplete()} disabled={loading} style={btnPrimaryStyle}>
                  {loading ? '...' : 'Marcar como Visto'}
                </button>
              )}
            </>
          )}

          {/* CHECKPOINT */}
          {node.content_type === 'checkpoint' && (
            <>
              {node.content_body && (
                <div>
                  <span style={sectionLabel}>Detalhes do Checkpoint</span>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.60)', lineHeight: 1.65, margin: 0, fontFamily: 'Inter, sans-serif', whiteSpace: 'pre-wrap' }}>
                    {node.content_body}
                  </p>
                </div>
              )}
              <div style={{
                background: 'rgba(245,158,11,0.05)',
                border: '1px solid rgba(245,158,11,0.15)',
                borderRadius: '8px',
                padding: '14px',
              }}>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.60)', margin: 0, fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>
                  Este checkpoint será validado pelo mentor. Aguarde a aprovação para avançar.
                </p>
              </div>
              {isAdmin && canComplete && (
                <button onClick={() => handleComplete()} disabled={loading} style={{ ...btnPrimaryStyle, background: '#F59E0B' }}>
                  {loading ? '...' : 'Aprovar Checkpoint'}
                </button>
              )}
            </>
          )}

          {/* QUIZ */}
          {node.content_type === 'quiz' && (
            <>
              {node.content_body && (
                <div>
                  <span style={sectionLabel}>Instruções</span>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.60)', lineHeight: 1.65, margin: 0, fontFamily: 'Inter, sans-serif', whiteSpace: 'pre-wrap' }}>
                    {node.content_body}
                  </p>
                </div>
              )}
              {node.content_url && (
                <a href={node.content_url} target="_blank" rel="noopener noreferrer" style={linkBtnStyle}>
                  Iniciar Quiz
                </a>
              )}
              {canComplete && (
                <button onClick={() => handleComplete()} disabled={loading} style={{ ...btnPrimaryStyle, background: '#EC4899' }}>
                  {loading ? '...' : 'Marcar como Concluído'}
                </button>
              )}
            </>
          )}

          {/* Mentor feedback display */}
          {node.mentor_feedback && (
            <div style={mentorBoxStyle}>
              <span style={{ ...sectionLabel, color: 'rgba(74,144,255,0.70)', marginBottom: '6px' }}>Feedback do Mentor</span>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.70)', margin: 0, fontFamily: 'Inter, sans-serif', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {node.mentor_feedback}
              </p>
            </div>
          )}

          {/* Admin: feedback form */}
          {isAdmin && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ ...sectionLabel, color: 'rgba(74,144,255,0.70)' }}>Feedback do Mentor (Admin)</span>
              <textarea
                placeholder="Escreva feedback para o estudante..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={4}
                style={inputStyle}
              />
              <button onClick={handleSaveFeedback} disabled={loading} style={{ ...btnPrimaryStyle, background: 'rgba(74,144,255,0.15)', border: '1px solid rgba(74,144,255,0.30)', color: '#4A90FF' }}>
                {loading ? '...' : 'Salvar Feedback'}
              </button>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <div style={backdropStyle} onClick={onClose} aria-hidden="true" />
      <aside
        style={panelStyle}
        role="complementary"
        aria-label="Detalhes do nó"
        aria-hidden={!isOpen}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          aria-label="Fechar painel"
        >
          <CloseIcon />
        </button>

        {node && renderContent()}
      </aside>
    </>
  );
};

// ── Phase Row Component ───────────────────────────────────────────────────────

interface PhaseRowProps {
  phase: JourneyPhase;
  index: number;
  isAdmin: boolean;
  isMobile: boolean;
  onNodeClick: (node: JourneyNode) => void;
  onUnlock: (phaseId: string) => void;
}

const PhaseRow: React.FC<PhaseRowProps> = ({ phase, index, isAdmin, isMobile, onNodeClick, onUnlock }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isLeft = !isMobile && index % 2 === 0;

  // Phase header label
  const phaseHeaderStyle: React.CSSProperties = {
    marginBottom: '12px',
  };

  const phaseTitleStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 600,
    color: phase.status === 'locked' ? 'rgba(255,255,255,0.25)' : phase.status === 'completed' ? '#22C55E' : phase.status === 'in_progress' ? '#4A90FF' : 'rgba(255,255,255,0.70)',
    fontFamily: 'Inter, sans-serif',
    margin: 0,
    lineHeight: 1.3,
  };

  const phaseDescStyle: React.CSSProperties = {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.35)',
    fontFamily: 'Inter, sans-serif',
    margin: '3px 0 0',
  };

  const nodesContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '10px',
    flexWrap: 'nowrap' as const,
    overflowX: isMobile ? 'hidden' : 'auto',
    paddingBottom: '4px',
  };

  // Main row layout
  const rowStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : isLeft ? 'row' : 'row-reverse',
    alignItems: isMobile ? 'stretch' : 'flex-start',
    gap: isMobile ? '12px' : '20px',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
    transitionDelay: `${index * 0.08}s`,
  };

  // Content side (nodes area)
  const contentSideStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  return (
    <div ref={rowRef} style={rowStyle}>
      {/* Phase station */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PhaseStation phase={phase} index={index} isAdmin={isAdmin} onUnlock={onUnlock} />
      </div>

      {/* Phase content */}
      <div style={contentSideStyle}>
        <div style={phaseHeaderStyle}>
          <p style={phaseTitleStyle}>{phase.title}</p>
          {phase.description && <p style={phaseDescStyle}>{phase.description}</p>}
        </div>
        <div style={nodesContainerStyle}>
          {phase.nodes
            .slice()
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isAdmin={isAdmin}
                onClick={onNodeClick}
              />
            ))}
          {phase.nodes.length === 0 && (
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif' }}>
              Nenhum nó nesta fase.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main JourneyMap Component ─────────────────────────────────────────────────

const JourneyMap: React.FC<JourneyMapProps> = ({ journey: initialJourney, isAdmin }) => {
  const [journey, setJourney] = useState<StudentJourney>(initialJourney);
  const [selectedNode, setSelectedNode] = useState<JourneyNode | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const progress = computeProgress(journey);
  const sortedPhases = journey.phases.slice().sort((a, b) => a.sort_order - b.sort_order);
  const totalHeight = 100 + sortedPhases.length * PHASE_SPACING + 100;

  const handleNodeClick = useCallback((node: JourneyNode) => {
    setSelectedNode(node);
    setPanelOpen(true);
  }, []);

  const handlePanelClose = useCallback(() => {
    setPanelOpen(false);
    setTimeout(() => setSelectedNode(null), 320);
  }, []);

  const handleNodeUpdate = useCallback((updatedNode: JourneyNode) => {
    setJourney((prev) => ({
      ...prev,
      phases: prev.phases.map((phase) => ({
        ...phase,
        nodes: phase.nodes.map((n) => n.id === updatedNode.id ? updatedNode : n),
      })),
    }));
    // Re-fetch journey to get phase unlock updates
    fetch(`/api/journeys/student/${journey.id}`)
      .then((r) => r.json())
      .then((data: StudentJourney) => setJourney(data))
      .catch(() => {/* silent — keep optimistic update */});
  }, [journey.id]);

  const handleUnlockPhase = useCallback(async (phaseId: string) => {
    if (!isAdmin) return;
    try {
      const res = await fetch(`/api/journeys/student/${journey.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'unlock_phase', phase_id: phaseId }),
      });
      if (res.ok) {
        const data: StudentJourney = await res.json();
        setJourney(data);
      }
    } catch { /* silent */ }
  }, [isAdmin, journey.id]);

  // ── Styles ──────────────────────────────────────────────────────────────────

  const wrapperStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: '#000000',
    fontFamily: 'Inter, sans-serif',
    position: 'relative',
  };

  // Sticky header
  const headerStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    justifyContent: 'space-between',
  };

  const journeyTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? '14px' : '16px',
    fontWeight: 600,
    color: '#FFFFFF',
    margin: 0,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: isMobile ? '120px' : '220px',
    fontFamily: 'Inter, sans-serif',
  };

  const progressBarWrapStyle: React.CSSProperties = {
    flex: isMobile ? 1 : 'none',
    width: isMobile ? undefined : '200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    alignItems: 'center',
  };

  const progressTrackStyle: React.CSSProperties = {
    width: '100%',
    height: '4px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '2px',
    overflow: 'hidden',
  };

  const progressFillStyle: React.CSSProperties = {
    height: '100%',
    width: `${progress}%`,
    background: progress >= 100 ? '#22C55E' : '#4A90FF',
    borderRadius: '2px',
    transition: 'width 0.6s ease',
  };

  const progressLabelStyle: React.CSSProperties = {
    fontSize: '10px',
    color: 'rgba(255,255,255,0.40)',
    fontFamily: 'Inter, sans-serif',
  };

  const xpStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    whiteSpace: 'nowrap' as const,
  };

  const xpTextStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: '#4A90FF',
    fontFamily: 'Inter, sans-serif',
  };

  // Main content area
  const contentStyle: React.CSSProperties = {
    position: 'relative',
    maxWidth: isMobile ? '100%' : '760px',
    margin: '0 auto',
    padding: isMobile ? '24px 16px' : '40px 24px',
  };

  // SVG path overlay container
  const svgContainerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: `${totalHeight}px`,
    pointerEvents: 'none',
    overflow: 'visible',
  };

  // Phases list
  const phasesListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: isMobile ? '40px' : '64px',
    position: 'relative',
    zIndex: 1,
    paddingTop: '16px',
  };

  // Empty state
  if (sortedPhases.length === 0) {
    return (
      <div style={wrapperStyle}>
        <style>{`
          @keyframes phasePulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(74,144,255,0.4); }
            50% { box-shadow: 0 0 0 12px rgba(74,144,255,0); }
          }
        `}</style>
        <div style={headerStyle}>
          <h1 style={journeyTitleStyle}>{journey.title}</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 61px)' }}>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif' }}>
            Nenhuma fase configurada ainda.
          </p>
        </div>
      </div>
    );
  }

  // Build SVG path segments
  const buildPathSegments = () => {
    if (sortedPhases.length < 2) return null;
    const segments: React.ReactNode[] = [];

    for (let i = 0; i < sortedPhases.length - 1; i++) {
      const phase = sortedPhases[i];
      const nextPhase = sortedPhases[i + 1];
      const x1 = getPhaseX(i, isMobile) - SVG_X_ADJUST;
      const y1 = getPhaseY(i);
      const x2 = getPhaseX(i + 1, isMobile) - SVG_X_ADJUST;
      const y2 = getPhaseY(i + 1);
      const cy = (y1 + y2) / 2;

      const isCompleted = phase.status === 'completed' && nextPhase.status !== 'locked';
      const pathD = `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;

      segments.push(
        <path
          key={`seg-${i}`}
          d={pathD}
          fill="none"
          stroke={isCompleted ? '#4A90FF' : 'rgba(255,255,255,0.08)'}
          strokeWidth={isCompleted ? '2' : '1.5'}
          strokeDasharray={isCompleted ? undefined : '8 4'}
          filter={isCompleted ? 'url(#blueglow)' : undefined}
          strokeLinecap="round"
        />
      );
    }
    return segments;
  };

  return (
    <div style={wrapperStyle}>
      {/* CSS Animations */}
      <style>{`
        @keyframes phasePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,144,255,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(74,144,255,0); }
        }
        .journey-node-scrollbar::-webkit-scrollbar { height: 4px; }
        .journey-node-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
        .journey-node-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.10); border-radius: 2px; }
      `}</style>

      {/* Sticky header */}
      <header style={headerStyle}>
        <h1 style={journeyTitleStyle} title={journey.title}>{journey.title}</h1>

        <div style={progressBarWrapStyle}>
          <div style={progressTrackStyle}>
            <div style={progressFillStyle} />
          </div>
          <span style={progressLabelStyle}>{progress}% completo</span>
        </div>

        <div style={xpStyle}>
          <StarDot />
          <span style={xpTextStyle}>{journey.total_xp.toLocaleString('pt-BR')} XP</span>
        </div>
      </header>

      {/* Main content */}
      <main style={contentStyle}>
        {/* SVG decorative path — behind content */}
        {!isMobile && (
          <svg
            style={svgContainerStyle}
            viewBox={`0 0 600 ${totalHeight}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter id="blueglow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {buildPathSegments()}
          </svg>
        )}

        {isMobile && (
          <svg
            style={{ ...svgContainerStyle, height: `${sortedPhases.length * 280 + 200}px` }}
            viewBox={`0 0 40 ${sortedPhases.length * 280 + 200}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="20" y1="0"
              x2="20" y2={sortedPhases.length * 280 + 200}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
          </svg>
        )}

        {/* Phases list */}
        <div style={phasesListStyle}>
          {sortedPhases.map((phase, index) => (
            <PhaseRow
              key={phase.id}
              phase={phase}
              index={index}
              isAdmin={isAdmin}
              isMobile={isMobile}
              onNodeClick={handleNodeClick}
              onUnlock={handleUnlockPhase}
            />
          ))}
        </div>
      </main>

      {/* Node detail panel */}
      <NodePanel
        node={selectedNode}
        isOpen={panelOpen}
        isAdmin={isAdmin}
        journeyId={journey.id}
        isMobile={isMobile}
        onClose={handlePanelClose}
        onNodeUpdate={handleNodeUpdate}
      />
    </div>
  );
};

export default JourneyMap;
