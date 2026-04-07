import React, { useState, useEffect } from 'react';

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface JourneyTemplate {
  id: string;
  title: string;
  description: string | null;
  program: string;
  thumbnail_url: string | null;
  status: 'draft' | 'published' | 'archived';
  total_phases: number;
  estimated_weeks: number | null;
  created_at: string;
  updated_at: string;
  phases?: TemplatePhase[];
}

interface TemplatePhase {
  id: string;
  template_id: string;
  title: string;
  description: string | null;
  sort_order: number;
  unlock_rule: 'all_previous' | 'percent_previous' | 'manual';
  unlock_threshold: number;
  icon: string | null;
  color: string | null;
  created_at: string;
  nodes?: TemplateNode[];
}

interface TemplateNode {
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
  created_at: string;
}

interface JourneyAdminBuilderProps {
  initialTemplates: JourneyTemplate[];
  students: Array<{ id: string; full_name: string; email: string }>;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<JourneyTemplate['status'], { bg: string; color: string; label: string }> = {
  published: { bg: 'rgba(34,197,94,0.1)', color: '#22C55E', label: 'Publicado' },
  draft: { bg: 'rgba(245,158,11,0.1)', color: '#F59E0B', label: 'Rascunho' },
  archived: { bg: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.35)', label: 'Arquivado' },
};

const CONTENT_TYPE_CONFIG: Record<TemplateNode['content_type'], { label: string; color: string }> = {
  task: { label: 'Tarefa', color: '#4A90FF' },
  material: { label: 'Material', color: '#22C55E' },
  presentation: { label: 'Apresentação', color: '#8B5CF6' },
  checkpoint: { label: 'Checkpoint', color: '#F59E0B' },
  quiz: { label: 'Quiz', color: '#EC4899' },
};

const UNLOCK_RULE_LABELS: Record<TemplatePhase['unlock_rule'], string> = {
  all_previous: 'Completar tudo anterior',
  percent_previous: 'Porcentagem anterior',
  manual: 'Manual (admin)',
};

const PHASE_ACCENT_COLORS = [
  '#4A90FF', '#22C55E', '#8B5CF6', '#F59E0B', '#EC4899', '#06B6D4', '#EF4444',
];

// ─── Style Helpers ─────────────────────────────────────────────────────────────

function inputStyle(extra?: React.CSSProperties): React.CSSProperties {
  return {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    background: '#161616',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box' as const,
    ...extra,
  };
}

function selectStyle(extra?: React.CSSProperties): React.CSSProperties {
  return {
    padding: '10px 14px',
    borderRadius: '8px',
    background: '#161616',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '14px',
    outline: 'none',
    ...extra,
  };
}

function btnPrimary(extra?: React.CSSProperties): React.CSSProperties {
  return {
    padding: '10px 20px',
    borderRadius: '8px',
    background: '#4A90FF',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    ...extra,
  };
}

function btnGhost(extra?: React.CSSProperties): React.CSSProperties {
  return {
    padding: '8px 16px',
    borderRadius: '8px',
    background: 'transparent',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '13px',
    border: '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    ...extra,
  };
}

function btnDanger(extra?: React.CSSProperties): React.CSSProperties {
  return {
    background: 'none',
    border: 'none',
    color: 'rgba(239,68,68,0.4)',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'color 150ms',
    ...extra,
  };
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconTrash({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

function IconChevron({ dir = 'down', size = 12 }: { dir?: 'up' | 'down'; size?: number }) {
  const rotate = dir === 'up' ? 'rotate(180deg)' : 'none';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: rotate }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconEdit({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NodeRow({
  node,
  onUpdate,
  onDelete,
}: {
  node: TemplateNode;
  onUpdate: (nodeId: string, fields: Partial<TemplateNode>) => Promise<void>;
  onDelete: (nodeId: string) => Promise<void>;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...node });
  const [saving, setSaving] = useState(false);

  const cfg = CONTENT_TYPE_CONFIG[node.content_type];

  const handleSave = async () => {
    setSaving(true);
    await onUpdate(node.id, {
      title: draft.title,
      description: draft.description,
      content_type: draft.content_type,
      content_url: draft.content_url,
      content_body: draft.content_body,
      estimated_minutes: draft.estimated_minutes,
      xp_reward: draft.xp_reward,
      is_required: draft.is_required,
    });
    setSaving(false);
    setEditing(false);
  };

  return (
    <div style={{
      borderRadius: '8px',
      background: '#0D0D0D',
      border: '1px solid rgba(255,255,255,0.05)',
      marginBottom: '6px',
      overflow: 'hidden',
    }}>
      {/* Compact row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 12px',
      }}>
        {/* Content type badge */}
        <span style={{
          fontSize: '10px',
          padding: '2px 7px',
          borderRadius: '4px',
          background: `${cfg.color}18`,
          color: cfg.color,
          fontWeight: 600,
          letterSpacing: '0.02em',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}>
          {cfg.label}
        </span>

        {/* Title */}
        <span style={{
          flex: 1,
          fontSize: '13px',
          color: '#fff',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {node.title}
        </span>

        {/* XP badge */}
        <span style={{
          fontSize: '11px',
          color: '#F59E0B',
          background: 'rgba(245,158,11,0.1)',
          padding: '2px 7px',
          borderRadius: '9999px',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}>
          +{node.xp_reward} XP
        </span>

        {/* Required badge */}
        {node.is_required && (
          <span style={{
            fontSize: '10px',
            color: '#EF4444',
            background: 'rgba(239,68,68,0.08)',
            padding: '2px 6px',
            borderRadius: '4px',
            flexShrink: 0,
          }}>
            Obrigatório
          </span>
        )}

        {/* Actions */}
        <button
          onClick={() => { setExpanded(!expanded); setEditing(!expanded ? editing : false); }}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
          title={expanded ? 'Recolher' : 'Expandir'}
        >
          <IconChevron dir={expanded ? 'up' : 'down'} />
        </button>
        <button
          onClick={() => { setExpanded(true); setEditing(true); }}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
          title="Editar"
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#4A90FF'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'}
        >
          <IconEdit />
        </button>
        <button
          onClick={() => onDelete(node.id)}
          style={btnDanger({ display: 'flex', alignItems: 'center' })}
          title="Excluir item"
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EF4444'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(239,68,68,0.4)'}
        >
          <IconTrash size={13} />
        </button>
      </div>

      {/* Expanded edit form */}
      {expanded && editing && (
        <div style={{
          padding: '12px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          <input
            placeholder="Título do item"
            value={draft.title}
            onChange={e => setDraft(p => ({ ...p, title: e.target.value }))}
            style={inputStyle({ fontSize: '13px' })}
          />
          <textarea
            placeholder="Descrição (opcional)"
            value={draft.description || ''}
            onChange={e => setDraft(p => ({ ...p, description: e.target.value || null }))}
            style={inputStyle({ resize: 'vertical', minHeight: '60px', fontSize: '13px' })}
          />
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <select
              value={draft.content_type}
              onChange={e => setDraft(p => ({ ...p, content_type: e.target.value as TemplateNode['content_type'] }))}
              style={selectStyle({ fontSize: '13px' })}
            >
              {Object.entries(CONTENT_TYPE_CONFIG).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Duração (min)"
              value={draft.estimated_minutes ?? ''}
              onChange={e => setDraft(p => ({ ...p, estimated_minutes: parseInt(e.target.value) || null }))}
              style={inputStyle({ width: '130px', flex: 'none', fontSize: '13px' })}
            />
            <input
              type="number"
              placeholder="XP"
              value={draft.xp_reward}
              onChange={e => setDraft(p => ({ ...p, xp_reward: parseInt(e.target.value) || 0 }))}
              style={inputStyle({ width: '90px', flex: 'none', fontSize: '13px' })}
            />
          </div>
          <input
            placeholder="URL do conteúdo (opcional)"
            value={draft.content_url || ''}
            onChange={e => setDraft(p => ({ ...p, content_url: e.target.value || null }))}
            style={inputStyle({ fontSize: '13px' })}
          />
          <textarea
            placeholder="Corpo do conteúdo (opcional)"
            value={draft.content_body || ''}
            onChange={e => setDraft(p => ({ ...p, content_body: e.target.value || null }))}
            style={inputStyle({ resize: 'vertical', minHeight: '72px', fontSize: '13px' })}
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
            <input
              type="checkbox"
              checked={draft.is_required}
              onChange={e => setDraft(p => ({ ...p, is_required: e.target.checked }))}
              style={{ accentColor: '#4A90FF', width: '14px', height: '14px' }}
            />
            Obrigatório para avançar de fase
          </label>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button onClick={() => { setEditing(false); setDraft({ ...node }); }} style={btnGhost({ fontSize: '12px', padding: '7px 14px' })}>
              Cancelar
            </button>
            <button onClick={handleSave} disabled={saving} style={btnPrimary({ fontSize: '12px', padding: '7px 14px', opacity: saving ? 0.6 : 1 })}>
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PhaseCard({
  phase,
  phaseIndex,
  totalPhases,
  onUpdatePhase,
  onDeletePhase,
  onMovePhase,
  onAddNode,
  onUpdateNode,
  onDeleteNode,
}: {
  phase: TemplatePhase;
  phaseIndex: number;
  totalPhases: number;
  onUpdatePhase: (phaseId: string, fields: Partial<TemplatePhase>) => Promise<void>;
  onDeletePhase: (phaseId: string) => void;
  onMovePhase: (phaseId: string, dir: 'up' | 'down') => void;
  onAddNode: (phaseId: string, nodeData: Partial<TemplateNode>) => Promise<void>;
  onUpdateNode: (nodeId: string, fields: Partial<TemplateNode>) => Promise<void>;
  onDeleteNode: (nodeId: string, phaseId: string) => Promise<void>;
}) {
  const [expanded, setExpanded] = useState(true);
  const [showAddNode, setShowAddNode] = useState(false);
  const [savingPhase, setSavingPhase] = useState(false);
  const [addingNode, setAddingNode] = useState(false);

  const [phaseDraft, setPhaseDraft] = useState({
    title: phase.title,
    description: phase.description || '',
    unlock_rule: phase.unlock_rule,
    unlock_threshold: phase.unlock_threshold,
  });

  const [newNode, setNewNode] = useState({
    title: '',
    content_type: 'task' as TemplateNode['content_type'],
    description: '',
    content_url: '',
    estimated_minutes: '' as string | number,
    xp_reward: 10,
    is_required: true,
  });

  const accentColor = PHASE_ACCENT_COLORS[phaseIndex % PHASE_ACCENT_COLORS.length];
  const nodes = phase.nodes || [];

  const handlePhaseBlur = async () => {
    if (
      phaseDraft.title === phase.title &&
      phaseDraft.description === (phase.description || '') &&
      phaseDraft.unlock_rule === phase.unlock_rule &&
      phaseDraft.unlock_threshold === phase.unlock_threshold
    ) return;
    setSavingPhase(true);
    await onUpdatePhase(phase.id, {
      title: phaseDraft.title,
      description: phaseDraft.description || null,
      unlock_rule: phaseDraft.unlock_rule,
      unlock_threshold: phaseDraft.unlock_threshold,
    });
    setSavingPhase(false);
  };

  const handleAddNode = async () => {
    if (!newNode.title.trim()) return;
    setAddingNode(true);
    await onAddNode(phase.id, {
      title: newNode.title,
      content_type: newNode.content_type,
      description: newNode.description || null,
      content_url: newNode.content_url || null,
      estimated_minutes: typeof newNode.estimated_minutes === 'string'
        ? parseInt(newNode.estimated_minutes as string) || null
        : newNode.estimated_minutes || null,
      xp_reward: newNode.xp_reward,
      is_required: newNode.is_required,
      sort_order: nodes.length,
    });
    setNewNode({ title: '', content_type: 'task', description: '', content_url: '', estimated_minutes: '', xp_reward: 10, is_required: true });
    setShowAddNode(false);
    setAddingNode(false);
  };

  return (
    <div style={{
      borderRadius: '12px',
      background: '#111111',
      border: '1px solid rgba(255,255,255,0.06)',
      overflow: 'hidden',
      marginBottom: '12px',
      borderLeft: `3px solid ${accentColor}`,
    }}>
      {/* Phase header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 16px',
        borderBottom: expanded ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}>
        {/* Phase number */}
        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          color: accentColor,
          background: `${accentColor}15`,
          padding: '2px 8px',
          borderRadius: '6px',
          flexShrink: 0,
        }}>
          F{phaseIndex + 1}
        </span>

        {/* Title inline edit */}
        <input
          value={phaseDraft.title}
          onChange={e => setPhaseDraft(p => ({ ...p, title: e.target.value }))}
          onBlur={handlePhaseBlur}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 500,
            minWidth: 0,
          }}
          placeholder="Título da fase"
        />

        {/* Saving indicator */}
        {savingPhase && (
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>
            Salvando...
          </span>
        )}

        {/* Node count */}
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>
          {nodes.length} {nodes.length === 1 ? 'item' : 'itens'}
        </span>

        {/* Move buttons */}
        <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
          <button
            onClick={() => onMovePhase(phase.id, 'up')}
            disabled={phaseIndex === 0}
            style={{ background: 'none', border: 'none', color: phaseIndex === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.35)', cursor: phaseIndex === 0 ? 'default' : 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
            title="Mover para cima"
          >
            <IconChevron dir="up" />
          </button>
          <button
            onClick={() => onMovePhase(phase.id, 'down')}
            disabled={phaseIndex === totalPhases - 1}
            style={{ background: 'none', border: 'none', color: phaseIndex === totalPhases - 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.35)', cursor: phaseIndex === totalPhases - 1 ? 'default' : 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
            title="Mover para baixo"
          >
            <IconChevron dir="down" />
          </button>
        </div>

        {/* Collapse/expand */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
        >
          <IconChevron dir={expanded ? 'up' : 'down'} size={13} />
        </button>

        {/* Delete phase */}
        <button
          onClick={() => onDeletePhase(phase.id)}
          style={btnDanger({ display: 'flex', alignItems: 'center' })}
          title="Excluir fase"
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EF4444'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(239,68,68,0.4)'}
        >
          <IconTrash size={13} />
        </button>
      </div>

      {/* Phase body */}
      {expanded && (
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Description */}
          <textarea
            placeholder="Descrição da fase (opcional)"
            value={phaseDraft.description}
            onChange={e => setPhaseDraft(p => ({ ...p, description: e.target.value }))}
            onBlur={handlePhaseBlur}
            style={inputStyle({ resize: 'vertical', minHeight: '56px', fontSize: '13px' })}
          />

          {/* Unlock rule */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <select
              value={phaseDraft.unlock_rule}
              onChange={e => setPhaseDraft(p => ({ ...p, unlock_rule: e.target.value as TemplatePhase['unlock_rule'] }))}
              onBlur={handlePhaseBlur}
              style={selectStyle({ fontSize: '13px' })}
            >
              {Object.entries(UNLOCK_RULE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            {phaseDraft.unlock_rule === 'percent_previous' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="number"
                  min={1}
                  max={100}
                  placeholder="% mínimo"
                  value={phaseDraft.unlock_threshold}
                  onChange={e => setPhaseDraft(p => ({ ...p, unlock_threshold: parseInt(e.target.value) || 0 }))}
                  onBlur={handlePhaseBlur}
                  style={inputStyle({ width: '100px', flex: 'none', fontSize: '13px' })}
                />
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>%</span>
              </div>
            )}
          </div>

          {/* Divider */}
          {nodes.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Itens da fase
              </span>
            </div>
          )}

          {/* Nodes */}
          {nodes.length === 0 && !showAddNode && (
            <div style={{ padding: '16px', textAlign: 'center', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.07)' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>Nenhum item ainda</span>
            </div>
          )}

          {nodes.map(node => (
            <NodeRow
              key={node.id}
              node={node}
              onUpdate={onUpdateNode}
              onDelete={(nodeId) => onDeleteNode(nodeId, phase.id)}
            />
          ))}

          {/* Add node form */}
          {showAddNode && (
            <div style={{
              padding: '14px',
              borderRadius: '10px',
              background: '#0D0D0D',
              border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              <input
                placeholder="Título do item"
                value={newNode.title}
                onChange={e => setNewNode(p => ({ ...p, title: e.target.value }))}
                style={inputStyle({ fontSize: '13px' })}
                autoFocus
              />
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <select
                  value={newNode.content_type}
                  onChange={e => setNewNode(p => ({ ...p, content_type: e.target.value as TemplateNode['content_type'] }))}
                  style={selectStyle({ fontSize: '13px' })}
                >
                  {Object.entries(CONTENT_TYPE_CONFIG).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Duração (min)"
                  value={newNode.estimated_minutes}
                  onChange={e => setNewNode(p => ({ ...p, estimated_minutes: e.target.value }))}
                  style={inputStyle({ width: '130px', flex: 'none', fontSize: '13px' })}
                />
                <input
                  type="number"
                  placeholder="XP"
                  value={newNode.xp_reward}
                  onChange={e => setNewNode(p => ({ ...p, xp_reward: parseInt(e.target.value) || 0 }))}
                  style={inputStyle({ width: '80px', flex: 'none', fontSize: '13px' })}
                />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                <input
                  type="checkbox"
                  checked={newNode.is_required}
                  onChange={e => setNewNode(p => ({ ...p, is_required: e.target.checked }))}
                  style={{ accentColor: '#4A90FF', width: '14px', height: '14px' }}
                />
                Obrigatório para avançar de fase
              </label>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowAddNode(false)} style={btnGhost({ fontSize: '12px', padding: '7px 14px' })}>
                  Cancelar
                </button>
                <button onClick={handleAddNode} disabled={addingNode || !newNode.title.trim()} style={btnPrimary({ fontSize: '12px', padding: '7px 14px', opacity: addingNode || !newNode.title.trim() ? 0.5 : 1 })}>
                  {addingNode ? 'Adicionando...' : 'Adicionar Item'}
                </button>
              </div>
            </div>
          )}

          {/* Add node button */}
          {!showAddNode && (
            <button
              onClick={() => setShowAddNode(true)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'transparent',
                color: 'rgba(255,255,255,0.35)',
                fontSize: '12px',
                border: '1px dashed rgba(255,255,255,0.1)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'border-color 150ms, color 150ms',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,144,255,0.4)'; (e.currentTarget as HTMLElement).style.color = '#4A90FF'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}
            >
              + Adicionar Item
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function JourneyAdminBuilder({ initialTemplates, students }: JourneyAdminBuilderProps) {
  const [templates, setTemplates] = useState<JourneyTemplate[]>(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<JourneyTemplate | null>(null);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assignStudentId, setAssignStudentId] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [assignSuccess, setAssignSuccess] = useState(false);
  const [assignedJourneys, setAssignedJourneys] = useState<any[]>([]);
  const [loadingJourneys, setLoadingJourneys] = useState(false);

  const [metaSaving, setMetaSaving] = useState(false);
  const [metaDraft, setMetaDraft] = useState<Partial<JourneyTemplate>>({});

  const [newTemplate, setNewTemplate] = useState({
    title: '',
    description: '',
    program: 'founders_beta',
    status: 'draft' as JourneyTemplate['status'],
    estimated_weeks: '' as string | number,
  });

  // ── Fetch all assigned journeys ──

  const fetchAssignedJourneys = async () => {
    setLoadingJourneys(true);
    try {
      const res = await fetch('/api/journeys/student?all=true');
      if (res.ok) {
        const data = await res.json();
        setAssignedJourneys(data);
      }
    } catch (e) { /* silent */ }
    setLoadingJourneys(false);
  };

  useEffect(() => { fetchAssignedJourneys(); }, []);

  // ── Template selection ──

  const handleSelectTemplate = async (tpl: JourneyTemplate) => {
    setLoading(true);
    setError(null);
    setAssignStudentId('');
    setAssignSuccess(false);
    try {
      const res = await fetch(`/api/journeys/templates/${tpl.id}`);
      if (!res.ok) throw new Error('Erro ao carregar template');
      const data: JourneyTemplate = await res.json();
      setSelectedTemplate(data);
      setMetaDraft({
        title: data.title,
        description: data.description,
        program: data.program,
        status: data.status,
        estimated_weeks: data.estimated_weeks,
      });
    } catch {
      setError('Erro ao carregar template');
    } finally {
      setLoading(false);
    }
  };

  // ── Create template ──

  const handleCreateTemplate = async () => {
    if (!newTemplate.title.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/journeys/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTemplate.title,
          description: newTemplate.description || null,
          program: newTemplate.program,
          status: newTemplate.status,
          estimated_weeks: typeof newTemplate.estimated_weeks === 'string'
            ? parseInt(newTemplate.estimated_weeks as string) || null
            : newTemplate.estimated_weeks || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Erro ao criar template');
        return;
      }

      const created: JourneyTemplate = await res.json();
      setTemplates(prev => [created, ...prev]);
      setNewTemplate({ title: '', description: '', program: 'founders_beta', status: 'draft', estimated_weeks: '' });
      setShowCreateTemplate(false);
      await handleSelectTemplate(created);
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  // ── Delete template ──

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Excluir este template? Esta ação é irreversível.')) return;
    try {
      const res = await fetch(`/api/journeys/templates/${templateId}`, { method: 'DELETE' });
      if (res.ok) {
        setTemplates(prev => prev.filter(t => t.id !== templateId));
        if (selectedTemplate?.id === templateId) setSelectedTemplate(null);
      }
    } catch {
      setError('Erro ao excluir template');
    }
  };

  // ── Update template metadata ──

  const handleSaveMeta = async () => {
    if (!selectedTemplate) return;
    setMetaSaving(true);
    try {
      const res = await fetch(`/api/journeys/templates/${selectedTemplate.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: metaDraft.title,
          description: metaDraft.description || null,
          program: metaDraft.program,
          status: metaDraft.status,
          estimated_weeks: metaDraft.estimated_weeks
            ? (typeof metaDraft.estimated_weeks === 'string' ? parseInt(metaDraft.estimated_weeks as string) || null : metaDraft.estimated_weeks)
            : null,
        }),
      });

      if (res.ok) {
        const updated: JourneyTemplate = await res.json();
        setTemplates(prev => prev.map(t => t.id === updated.id ? { ...t, ...updated } : t));
        setSelectedTemplate(prev => prev ? { ...prev, ...updated, phases: prev.phases } : null);
      }
    } catch {
      setError('Erro ao salvar metadados');
    } finally {
      setMetaSaving(false);
    }
  };

  // ── Add phase ──

  const handleAddPhase = async () => {
    if (!selectedTemplate) return;
    try {
      const phaseCount = (selectedTemplate.phases || []).length;
      const res = await fetch(`/api/journeys/templates/${selectedTemplate.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_phase',
          title: `Fase ${phaseCount + 1}`,
          description: null,
          sort_order: phaseCount,
          unlock_rule: 'all_previous',
          unlock_threshold: 100,
          icon: null,
          color: PHASE_ACCENT_COLORS[phaseCount % PHASE_ACCENT_COLORS.length],
        }),
      });

      if (res.ok) {
        const updated: JourneyTemplate = await res.json();
        setSelectedTemplate(updated);
        setTemplates(prev => prev.map(t => t.id === updated.id ? { ...t, total_phases: updated.total_phases } : t));
      }
    } catch {
      setError('Erro ao adicionar fase');
    }
  };

  // ── Update phase ──

  const handleUpdatePhase = async (phaseId: string, fields: Partial<TemplatePhase>) => {
    if (!selectedTemplate) return;
    try {
      const res = await fetch(`/api/journeys/templates/${selectedTemplate.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_phase', phase_id: phaseId, ...fields }),
      });

      if (res.ok) {
        const updated: JourneyTemplate = await res.json();
        setSelectedTemplate(updated);
      }
    } catch {
      setError('Erro ao atualizar fase');
    }
  };

  // ── Delete phase ──

  const handleDeletePhase = async (phaseId: string) => {
    if (!selectedTemplate) return;
    if (!confirm('Excluir esta fase e todos os seus itens?')) return;
    try {
      const res = await fetch(`/api/journeys/templates/${selectedTemplate.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_phase', phase_id: phaseId }),
      });

      if (res.ok) {
        const updated: JourneyTemplate = await res.json();
        setSelectedTemplate(updated);
        setTemplates(prev => prev.map(t => t.id === updated.id ? { ...t, total_phases: updated.total_phases } : t));
      }
    } catch {
      setError('Erro ao excluir fase');
    }
  };

  // ── Move phase ──

  const handleMovePhase = async (phaseId: string, dir: 'up' | 'down') => {
    if (!selectedTemplate?.phases) return;
    const phases = [...selectedTemplate.phases].sort((a, b) => a.sort_order - b.sort_order);
    const idx = phases.findIndex(p => p.id === phaseId);
    if (idx === -1) return;
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= phases.length) return;

    const a = phases[idx];
    const b = phases[swapIdx];

    // Optimistic update
    const reordered = phases.map(p => {
      if (p.id === a.id) return { ...p, sort_order: b.sort_order };
      if (p.id === b.id) return { ...p, sort_order: a.sort_order };
      return p;
    }).sort((x, y) => x.sort_order - y.sort_order);
    setSelectedTemplate(prev => prev ? { ...prev, phases: reordered } : null);

    try {
      // Update both phases
      await fetch(`/api/journeys/templates/${selectedTemplate.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_phase', phase_id: a.id, sort_order: b.sort_order }),
      });
      await fetch(`/api/journeys/templates/${selectedTemplate.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_phase', phase_id: b.id, sort_order: a.sort_order }),
      });
    } catch {
      setError('Erro ao reordenar fases');
      // Revert — reload from API
      await handleSelectTemplate(selectedTemplate);
    }
  };

  // ── Add node ──

  const handleAddNode = async (phaseId: string, nodeData: Partial<TemplateNode>) => {
    if (!selectedTemplate) return;
    try {
      const res = await fetch(`/api/journeys/templates/${selectedTemplate.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_node', phase_id: phaseId, ...nodeData }),
      });

      if (res.ok) {
        const updated: JourneyTemplate = await res.json();
        setSelectedTemplate(updated);
      }
    } catch {
      setError('Erro ao adicionar item');
    }
  };

  // ── Update node ──

  const handleUpdateNode = async (nodeId: string, fields: Partial<TemplateNode>) => {
    if (!selectedTemplate) return;
    try {
      const res = await fetch(`/api/journeys/templates/${selectedTemplate.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_node', node_id: nodeId, ...fields }),
      });

      if (res.ok) {
        const updated: JourneyTemplate = await res.json();
        setSelectedTemplate(updated);
      }
    } catch {
      setError('Erro ao atualizar item');
    }
  };

  // ── Delete node ──

  const handleDeleteNode = async (nodeId: string, phaseId: string) => {
    if (!selectedTemplate) return;
    if (!confirm('Excluir este item?')) return;
    try {
      const res = await fetch(`/api/journeys/templates/${selectedTemplate.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_node', node_id: nodeId }),
      });

      if (res.ok) {
        const updated: JourneyTemplate = await res.json();
        setSelectedTemplate(updated);
      }
    } catch {
      setError('Erro ao excluir item');
    }
  };

  // ── Assign to student ──

  const handleAssign = async () => {
    if (!selectedTemplate || !assignStudentId) return;
    setAssigning(true);
    setError(null);
    try {
      const res = await fetch('/api/journeys/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template_id: selectedTemplate.id, student_id: assignStudentId }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Erro ao atribuir jornada');
        return;
      }

      setAssignSuccess(true);
      setAssignStudentId('');
      fetchAssignedJourneys();
      setTimeout(() => setAssignSuccess(false), 3000);
    } catch {
      setError('Erro de conexão');
    } finally {
      setAssigning(false);
    }
  };

  // ── Derived ──

  const sortedPhases = (selectedTemplate?.phases || []).slice().sort((a, b) => a.sort_order - b.sort_order);

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Error banner */}
      {error && (
        <div style={{
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
        }}>
          <span>{error}</span>
          <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>×</button>
        </div>
      )}

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' }}>

        {/* ── Left panel: Template list ── */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>
              Templates ({templates.length})
            </h2>
            <button
              onClick={() => setShowCreateTemplate(!showCreateTemplate)}
              style={btnPrimary({ padding: '8px 14px', fontSize: '13px' })}
            >
              + Criar Template
            </button>
          </div>

          {/* Create template form */}
          {showCreateTemplate && (
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              <input
                placeholder="Título do template"
                value={newTemplate.title}
                onChange={e => setNewTemplate(p => ({ ...p, title: e.target.value }))}
                style={inputStyle()}
                autoFocus
              />
              <textarea
                placeholder="Descrição (opcional)"
                value={newTemplate.description}
                onChange={e => setNewTemplate(p => ({ ...p, description: e.target.value }))}
                style={inputStyle({ resize: 'vertical', minHeight: '64px' })}
              />
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <select
                  value={newTemplate.program}
                  onChange={e => setNewTemplate(p => ({ ...p, program: e.target.value }))}
                  style={selectStyle()}
                >
                  <option value="founders_beta">Founders Beta</option>
                </select>
                <select
                  value={newTemplate.status}
                  onChange={e => setNewTemplate(p => ({ ...p, status: e.target.value as JourneyTemplate['status'] }))}
                  style={selectStyle()}
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                </select>
                <input
                  type="number"
                  placeholder="Semanas"
                  value={newTemplate.estimated_weeks}
                  onChange={e => setNewTemplate(p => ({ ...p, estimated_weeks: e.target.value }))}
                  style={inputStyle({ width: '110px', flex: 'none' })}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowCreateTemplate(false)} style={btnGhost({ fontSize: '12px', padding: '7px 14px' })}>
                  Cancelar
                </button>
                <button onClick={handleCreateTemplate} disabled={loading || !newTemplate.title.trim()} style={btnPrimary({ fontSize: '12px', padding: '7px 14px', opacity: loading || !newTemplate.title.trim() ? 0.5 : 1 })}>
                  {loading ? 'Criando...' : 'Criar'}
                </button>
              </div>
            </div>
          )}

          {/* Templates list */}
          <div style={{
            borderRadius: '12px',
            background: '#0A0A0A',
            border: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
          }}>
            {templates.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '14px' }}>
                Nenhum template. Crie o primeiro.
              </div>
            ) : (
              templates.map(tpl => {
                const s = STATUS_STYLES[tpl.status];
                const isSelected = selectedTemplate?.id === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => handleSelectTemplate(tpl)}
                    style={{
                      padding: '14px 16px',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(74,144,255,0.05)' : 'transparent',
                      transition: 'background 150ms',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                    onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}
                    onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: '#fff', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {tpl.title}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                          {tpl.total_phases} {tpl.total_phases === 1 ? 'fase' : 'fases'}
                        </span>
                        {tpl.estimated_weeks && (
                          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
                            {tpl.estimated_weeks} sem.
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <span style={{
                        fontSize: '10px',
                        padding: '2px 7px',
                        borderRadius: '9999px',
                        background: s.bg,
                        color: s.color,
                        whiteSpace: 'nowrap',
                      }}>
                        {s.label}
                      </span>
                      <button
                        onClick={e => { e.stopPropagation(); handleDeleteTemplate(tpl.id); }}
                        style={btnDanger({ display: 'flex', alignItems: 'center' })}
                        title="Excluir template"
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EF4444'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(239,68,68,0.4)'}
                      >
                        <IconTrash size={13} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── Right panel: Template editor ── */}
        <div>
          {!selectedTemplate ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              borderRadius: '12px',
              background: '#0A0A0A',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              {loading ? (
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.25)' }}>Carregando...</p>
              ) : (
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.25)' }}>
                  Selecione um template para editar
                </p>
              )}
            </div>
          ) : (
            <div>
              {/* Header */}
              <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
                    {selectedTemplate.title}
                  </h2>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
                    {sortedPhases.length} {sortedPhases.length === 1 ? 'fase' : 'fases'} ·{' '}
                    {sortedPhases.reduce((acc, p) => acc + (p.nodes?.length || 0), 0)} itens totais
                  </span>
                </div>
                <span style={{
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  background: STATUS_STYLES[selectedTemplate.status].bg,
                  color: STATUS_STYLES[selectedTemplate.status].color,
                  flexShrink: 0,
                }}>
                  {STATUS_STYLES[selectedTemplate.status].label}
                </span>
              </div>

              {/* ── Metadata section ── */}
              <div style={{
                padding: '16px',
                borderRadius: '12px',
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.06)',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Metadados
                </span>
                <input
                  placeholder="Título"
                  value={metaDraft.title || ''}
                  onChange={e => setMetaDraft(p => ({ ...p, title: e.target.value }))}
                  style={inputStyle()}
                />
                <textarea
                  placeholder="Descrição (opcional)"
                  value={metaDraft.description || ''}
                  onChange={e => setMetaDraft(p => ({ ...p, description: e.target.value || null }))}
                  style={inputStyle({ resize: 'vertical', minHeight: '72px' })}
                />
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <select
                    value={metaDraft.program || 'founders_beta'}
                    onChange={e => setMetaDraft(p => ({ ...p, program: e.target.value }))}
                    style={selectStyle()}
                  >
                    <option value="founders_beta">Founders Beta</option>
                  </select>
                  <select
                    value={metaDraft.status || 'draft'}
                    onChange={e => setMetaDraft(p => ({ ...p, status: e.target.value as JourneyTemplate['status'] }))}
                    style={selectStyle()}
                  >
                    <option value="draft">Rascunho</option>
                    <option value="published">Publicado</option>
                    <option value="archived">Arquivado</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Duração (semanas)"
                    value={metaDraft.estimated_weeks ?? ''}
                    onChange={e => setMetaDraft(p => ({ ...p, estimated_weeks: e.target.value ? parseInt(e.target.value) : null }))}
                    style={inputStyle({ width: '170px', flex: 'none' })}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleSaveMeta} disabled={metaSaving} style={btnPrimary({ fontSize: '12px', padding: '8px 18px', opacity: metaSaving ? 0.6 : 1 })}>
                    {metaSaving ? 'Salvando...' : 'Salvar Metadados'}
                  </button>
                </div>
              </div>

              {/* ── Phases section ── */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                    Fases
                  </span>
                  <button
                    onClick={handleAddPhase}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '8px',
                      background: 'rgba(74,144,255,0.1)',
                      color: '#4A90FF',
                      fontSize: '12px',
                      fontWeight: 500,
                      border: '1px solid rgba(74,144,255,0.2)',
                      cursor: 'pointer',
                    }}
                  >
                    + Adicionar Fase
                  </button>
                </div>

                {sortedPhases.length === 0 ? (
                  <div style={{
                    padding: '32px',
                    textAlign: 'center',
                    borderRadius: '12px',
                    border: '1px dashed rgba(255,255,255,0.08)',
                  }}>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.25)', marginBottom: '12px' }}>
                      Nenhuma fase adicionada
                    </p>
                    <button
                      onClick={handleAddPhase}
                      style={btnPrimary({ fontSize: '13px' })}
                    >
                      Adicionar primeira fase
                    </button>
                  </div>
                ) : (
                  sortedPhases.map((phase, idx) => (
                    <PhaseCard
                      key={phase.id}
                      phase={phase}
                      phaseIndex={idx}
                      totalPhases={sortedPhases.length}
                      onUpdatePhase={handleUpdatePhase}
                      onDeletePhase={handleDeletePhase}
                      onMovePhase={handleMovePhase}
                      onAddNode={handleAddNode}
                      onUpdateNode={handleUpdateNode}
                      onDeleteNode={handleDeleteNode}
                    />
                  ))
                )}
              </div>

              {/* ── Assign to student section (published only) ── */}
              {selectedTemplate.status === 'published' && (
                <div style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                    Atribuir a Estudante
                  </span>

                  {assignSuccess && (
                    <div style={{
                      marginBottom: '12px',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(34,197,94,0.1)',
                      border: '1px solid rgba(34,197,94,0.2)',
                      color: '#22C55E',
                      fontSize: '13px',
                    }}>
                      Jornada atribuída com sucesso.
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <select
                      value={assignStudentId}
                      onChange={e => setAssignStudentId(e.target.value)}
                      style={selectStyle({ flex: 1, minWidth: '220px' })}
                    >
                      <option value="">Selecionar estudante...</option>
                      {students.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.full_name} — {s.email}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleAssign}
                      disabled={assigning || !assignStudentId}
                      style={btnPrimary({ opacity: assigning || !assignStudentId ? 0.5 : 1, cursor: assigning || !assignStudentId ? 'not-allowed' : 'pointer' })}
                    >
                      {assigning ? 'Atribuindo...' : 'Atribuir'}
                    </button>
                  </div>

                  {students.length === 0 && (
                    <p style={{ marginTop: '10px', fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
                      Nenhum estudante disponível.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Assigned Journeys Overview ── */}
      <div style={{
        marginTop: '32px',
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', margin: 0 }}>
            Jornadas Atribuidas
          </h3>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
            {assignedJourneys.length} {assignedJourneys.length === 1 ? 'jornada' : 'jornadas'}
          </span>
        </div>

        {loadingJourneys && (
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Carregando...</p>
        )}

        {!loadingJourneys && assignedJourneys.length === 0 && (
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
            Nenhuma jornada atribuida ainda. Crie um template, publique e atribua a um estudante.
          </p>
        )}

        {!loadingJourneys && assignedJourneys.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {assignedJourneys.map((j: any) => {
              const totalPhases = j.phases?.length || 0;
              const completedPhases = j.phases?.filter((p: any) => p.status === 'completed').length || 0;
              const currentPhase = j.phases?.find((p: any) => p.status === 'in_progress' || p.status === 'available');
              const progress = totalPhases > 0 ? Math.round((completedPhases / totalPhases) * 100) : 0;
              const studentName = j.student?.full_name || 'Sem nome';
              const studentEmail = j.student?.email || '';
              const initials = studentName.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase();

              return (
                <a
                  key={j.id}
                  href={`/academy/journey/${j.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: '#161616',
                    border: '1px solid rgba(255,255,255,0.06)',
                    textDecoration: 'none',
                    transition: 'border-color 200ms ease, background 200ms ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,144,255,0.25)';
                    (e.currentTarget as HTMLElement).style.background = '#1A1A1A';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLElement).style.background = '#161616';
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(74,144,255,0.10)',
                    border: '1px solid rgba(74,144,255,0.20)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#4A90FF',
                    flexShrink: 0,
                  }}>
                    {initials}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: '#fff' }}>
                        {studentName}
                      </span>
                      <span style={{
                        fontSize: '10px',
                        padding: '1px 7px',
                        borderRadius: '9999px',
                        background: j.status === 'active' ? 'rgba(34,197,94,0.10)' : 'rgba(255,255,255,0.05)',
                        color: j.status === 'active' ? '#22C55E' : 'rgba(255,255,255,0.35)',
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.05em',
                        fontWeight: 500,
                      }}>
                        {j.status === 'active' ? 'Ativa' : j.status === 'completed' ? 'Concluida' : j.status}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: 'rgba(255,255,255,0.40)' }}>
                      <span>{j.title}</span>
                      {currentPhase && <span>Fase: {currentPhase.title}</span>}
                    </div>
                  </div>

                  {/* Progress */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                    <div style={{ width: '80px' }}>
                      <div style={{ height: '3px', borderRadius: '9999px', background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          borderRadius: '9999px',
                          background: progress === 100 ? '#22C55E' : '#4A90FF',
                          width: `${progress}%`,
                          transition: 'width 300ms ease',
                        }} />
                      </div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.30)', marginTop: '3px', textAlign: 'right' as const }}>
                        {completedPhases}/{totalPhases} fases
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#4A90FF', fontWeight: 500, minWidth: '45px', textAlign: 'right' as const }}>
                      {j.total_xp} XP
                    </div>
                    {/* Arrow */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9,18 15,12 9,6" />
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
