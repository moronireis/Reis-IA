import React, { useState, useMemo, useCallback } from 'react';

type Priority = 'low' | 'medium' | 'high' | 'urgent';
type TaskStatus = 'todo' | 'in_progress' | 'done';
type Category = 'systems' | 'marketing' | 'builders' | 'general';
type ViewMode = 'board' | 'list' | 'calendar';
type SortKey = 'title' | 'category' | 'priority' | 'due_date' | 'project_name' | 'assignee_name';
type SortDir = 'asc' | 'desc';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  category: Category;
  assignee_name?: string;
  project_name?: string;
  due_date?: string;
  due_time?: string;
  tags?: string[];
  notes?: string;
  completed_at?: string;
  created_at: string;
  updated_at?: string;
}

interface TaskBoardProps {
  initialTasks: Task[];
}

// ── Constants ──────────────────────────────────────────────────────────────

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: 'todo', label: 'A Fazer' },
  { id: 'in_progress', label: 'Em Progresso' },
  { id: 'done', label: 'Concluído' },
];

const priorityStyles: Record<Priority, { bg: string; color: string; label: string }> = {
  urgent: { bg: 'rgba(239,68,68,0.10)', color: '#EF4444', label: 'Urgente' },
  high: { bg: 'rgba(245,158,11,0.10)', color: '#F59E0B', label: 'Alta' },
  medium: { bg: 'rgba(74,144,255,0.10)', color: '#4A90FF', label: 'Média' },
  low: { bg: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', label: 'Baixa' },
};

const categoryStyles: Record<Category, { bg: string; color: string; label: string }> = {
  marketing: { bg: 'rgba(139,92,246,0.1)', color: '#8B5CF6', label: 'Marketing' },
  builders: { bg: 'rgba(45,122,255,0.1)', color: '#2D7AFF', label: 'Builders' },
  systems: { bg: 'rgba(74,144,255,0.1)', color: '#4A90FF', label: 'Systems' },
  general: { bg: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', label: 'Geral' },
};

const priorityOrder: Record<Priority, number> = { urgent: 0, high: 1, medium: 2, low: 3 };

// ── SVG Icons ─────────────────────────────────────────────────────────────

function IconCalendar() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 1v4M11 1v4M1 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconFolder() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M2 4a1 1 0 011-1h3.586a1 1 0 01.707.293L8.414 4.5A1 1 0 009.121 4.793H13a1 1 0 011 1V12a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconChevron({ dir = 'down' }: { dir?: 'up' | 'down' | 'left' | 'right' }) {
  const rotate = { down: 0, up: 180, left: 90, right: -90 }[dir];
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `rotate(${rotate}deg)`, flexShrink: 0 }}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Status circle icons
function StatusIcon({ status }: { status: TaskStatus }) {
  if (status === 'todo') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <circle cx="8" cy="8" r="6.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      </svg>
    );
  }
  if (status === 'in_progress') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <circle cx="8" cy="8" r="6.5" stroke="#4A90FF" strokeWidth="1.5" />
        <path d="M8 1.5 A6.5 6.5 0 0 1 14.5 8 A6.5 6.5 0 0 1 8 14.5" stroke="#4A90FF" strokeWidth="0" />
        <path d="M8 8 L8 1.5 A6.5 6.5 0 0 1 14.5 8 Z" fill="#4A90FF" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="6.5" fill="rgba(74,144,255,0.15)" stroke="#4A90FF" strokeWidth="1.5" />
      <path d="M5 8l2 2 4-4" stroke="#4A90FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────

/** Parse due_date safely — handles both "YYYY-MM-DD" and "YYYY-MM-DDT00:00:00" */
function parseDate(d: string): Date {
  const dateOnly = d.includes('T') ? d.split('T')[0] : d;
  return new Date(dateOnly + 'T00:00:00');
}

/** Extract YYYY-MM-DD from a date string (strips time if present) */
function toDateOnly(d: string): string {
  return d.includes('T') ? d.split('T')[0] : d;
}

function formatDate(d?: string, time?: string): string {
  if (!d) return '';
  const dateStr = parseDate(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  if (time) return `${dateStr} ${time}`;
  return dateStr;
}

function isOverdue(d?: string): boolean {
  if (!d) return false;
  return parseDate(d) < new Date(new Date().toDateString());
}

function getTaskUrgencyColor(task: Task): { bg: string; color: string } {
  if (task.status === 'done') {
    return { bg: 'rgba(74,144,255,0.12)', color: '#4A90FF' };
  }
  if (task.priority === 'urgent') {
    return { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' };
  }
  if (!task.due_date) {
    return { bg: 'rgba(34,197,94,0.12)', color: '#22C55E' };
  }
  const today = new Date(new Date().toDateString());
  const due = parseDate(task.due_date);
  const daysUntil = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntil < 0) {
    return { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' };
  }
  if (daysUntil <= 3) {
    return { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' };
  }
  return { bg: 'rgba(34,197,94,0.12)', color: '#22C55E' };
}

function emptyForm(): Partial<Task> {
  return {
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    category: 'general',
    assignee_name: '',
    project_name: '',
    due_date: '',
    due_time: '',
    tags: [],
    notes: '',
  };
}

// ── Modal Component ───────────────────────────────────────────────────────

interface ModalProps {
  mode: 'create' | 'edit';
  formData: Partial<Task>;
  onChange: (field: keyof Task, value: string | string[]) => void;
  onSave: () => void;
  onDelete?: () => void;
  onClose: () => void;
  loading: boolean;
}

function TaskModal({ mode, formData, onChange, onSave, onDelete, onClose, loading }: ModalProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '9px 12px',
    borderRadius: '8px',
    background: '#161616',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '4px',
    display: 'block',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none' as const,
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: '#0F0F0F',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '28px',
        width: '100%',
        maxWidth: '560px',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        {/* Modal header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>
            {mode === 'create' ? 'Nova Tarefa' : 'Editar Tarefa'}
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <IconClose />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Title */}
          <div>
            <label style={labelStyle}>Título *</label>
            <input
              autoFocus
              value={formData.title || ''}
              onChange={e => onChange('title', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && onSave()}
              placeholder="Título da tarefa..."
              style={inputStyle}
            />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Descrição</label>
            <textarea
              value={formData.description || ''}
              onChange={e => onChange('description', e.target.value)}
              placeholder="Descrição opcional..."
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' as const }}
            />
          </div>

          {/* Row: Category + Priority */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Categoria</label>
              <select value={formData.category || 'general'} onChange={e => onChange('category', e.target.value)} style={selectStyle}>
                <option value="general">Geral</option>
                <option value="marketing">Marketing</option>
                <option value="builders">Builders</option>
                <option value="systems">Systems</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Prioridade</label>
              <select value={formData.priority || 'medium'} onChange={e => onChange('priority', e.target.value)} style={selectStyle}>
                <option value="urgent">Urgente</option>
                <option value="high">Alta</option>
                <option value="medium">Média</option>
                <option value="low">Baixa</option>
              </select>
            </div>
          </div>

          {/* Row: Status + Due date + Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Status</label>
              <select value={formData.status || 'todo'} onChange={e => onChange('status', e.target.value)} style={selectStyle}>
                <option value="todo">A Fazer</option>
                <option value="in_progress">Em Progresso</option>
                <option value="done">Concluído</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Data</label>
              <input
                type="date"
                value={formData.due_date || ''}
                onChange={e => onChange('due_date', e.target.value)}
                style={{ ...inputStyle, colorScheme: 'dark' as const }}
              />
            </div>
            <div>
              <label style={labelStyle}>Horario</label>
              <select
                value={formData.due_time || ''}
                onChange={e => onChange('due_time', e.target.value)}
                style={{ ...selectStyle, colorScheme: 'dark' as const }}
              >
                <option value="">--</option>
                {Array.from({ length: 48 }, (_, i) => {
                  const h = String(Math.floor(i / 2)).padStart(2, '0');
                  const m = i % 2 === 0 ? '00' : '30';
                  return <option key={i} value={`${h}:${m}`}>{h}:{m}</option>;
                })}
              </select>
            </div>
          </div>

          {/* Row: Assignee + Project */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Responsável</label>
              <input
                value={formData.assignee_name || ''}
                onChange={e => onChange('assignee_name', e.target.value)}
                placeholder="Nome..."
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Projeto</label>
              <input
                value={formData.project_name || ''}
                onChange={e => onChange('project_name', e.target.value)}
                placeholder="Nome do projeto..."
                style={inputStyle}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label style={labelStyle}>Tags (separadas por vírgula)</label>
            <input
              value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
              onChange={e => onChange('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
              placeholder="criativos, tráfego, systems..."
              style={inputStyle}
            />
          </div>

          {/* Notes */}
          <div>
            <label style={labelStyle}>Notas</label>
            <textarea
              value={formData.notes || ''}
              onChange={e => onChange('notes', e.target.value)}
              placeholder="Notas internas..."
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' as const }}
            />
          </div>

          {/* Metadata (edit only) */}
          {mode === 'edit' && (formData.created_at || formData.updated_at) && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', display: 'flex', gap: '16px' }}>
              {formData.created_at && (
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                  Criado: {new Date(formData.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
              {formData.updated_at && (
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                  Atualizado: {new Date(formData.updated_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
          <div>
            {mode === 'edit' && onDelete && (
              confirmDelete ? (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#EF4444' }}>Confirmar exclusão?</span>
                  <button
                    onClick={onDelete}
                    style={{ padding: '6px 12px', borderRadius: '6px', background: '#EF4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Excluir
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    style={{ padding: '6px 12px', borderRadius: '6px', background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer', fontSize: '13px' }}
                >
                  Excluir
                </button>
              )
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={onClose}
              style={{ padding: '9px 18px', borderRadius: '8px', background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontSize: '14px' }}
            >
              Cancelar
            </button>
            <button
              onClick={onSave}
              disabled={loading}
              style={{ padding: '9px 22px', borderRadius: '8px', background: '#4A90FF', color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: 500, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Salvando...' : mode === 'create' ? 'Criar' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Board View ─────────────────────────────────────────────────────────────

interface BoardViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDrop: (status: TaskStatus) => void;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  draggedTask: string | null;
  onAddInColumn: (status: TaskStatus) => void;
}

function BoardView({ tasks, onEditTask, onDrop, onDragStart, onDragEnd, draggedTask, onAddInColumn }: BoardViewProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {COLUMNS.map(column => {
        const columnTasks = tasks.filter(t => t.status === column.id);
        return (
          <div
            key={column.id}
            onDragOver={e => e.preventDefault()}
            onDrop={() => onDrop(column.id)}
            style={{
              borderRadius: '12px',
              background: '#0A0A0A',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: '16px',
              minHeight: '400px',
            }}
          >
            {/* Column header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#fff' }}>{column.label}</span>
                <span style={{ fontSize: '11px', padding: '2px 7px', borderRadius: '9999px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}>
                  {columnTasks.length}
                </span>
              </div>
              <button
                onClick={() => onAddInColumn(column.id)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: '0 4px' }}
              >
                +
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {columnTasks.map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => onDragStart(task.id)}
                  onDragEnd={onDragEnd}
                  onClick={() => onEditTask(task)}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'pointer',
                    opacity: draggedTask === task.id ? 0.45 : 1,
                    transition: 'opacity 150ms ease, border-color 150ms ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}
                >
                  {/* Top row: category + priority */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: categoryStyles[task.category].bg,
                      color: categoryStyles[task.category].color,
                    }}>
                      {categoryStyles[task.category].label}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: priorityStyles[task.priority].bg,
                      color: priorityStyles[task.priority].color,
                    }}>
                      {priorityStyles[task.priority].label}
                    </span>
                  </div>

                  {/* Title */}
                  <p style={{ fontSize: '13px', color: '#fff', fontWeight: 400, lineHeight: 1.45, margin: '0 0 8px 0' }}>
                    {task.title}
                  </p>

                  {/* Tags */}
                  {task.tags && task.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                      {task.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: 'rgba(255,255,255,0.04)',
                          color: 'rgba(255,255,255,0.45)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer: date, assignee, project */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    {task.due_date && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: isOverdue(task.due_date) ? '#EF4444' : 'rgba(255,255,255,0.35)' }}>
                        <IconCalendar /> {formatDate(task.due_date, task.due_time)}
                      </span>
                    )}
                    {task.assignee_name && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
                        <IconUser /> {task.assignee_name}
                      </span>
                    )}
                    {task.project_name && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
                        <IconFolder /> {task.project_name}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {columnTasks.length === 0 && (
                <div
                  style={{ padding: '24px 16px', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '12px', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.06)' }}
                >
                  Nenhuma tarefa
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── List View ──────────────────────────────────────────────────────────────

interface ListViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onStatusCycle: (task: Task) => void;
}

function ListView({ tasks, onEditTask, onStatusCycle }: ListViewProps) {
  const [sortKey, setSortKey] = useState<SortKey>('title');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = useMemo(() => {
    return [...tasks].sort((a, b) => {
      let av: string | number = '';
      let bv: string | number = '';
      if (sortKey === 'priority') {
        av = priorityOrder[a.priority];
        bv = priorityOrder[b.priority];
      } else if (sortKey === 'due_date') {
        av = a.due_date || 'z';
        bv = b.due_date || 'z';
      } else {
        av = (a[sortKey] as string) || '';
        bv = (b[sortKey] as string) || '';
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [tasks, sortKey, sortDir]);

  const thStyle = (key: SortKey): React.CSSProperties => ({
    padding: '10px 12px',
    fontSize: '11px',
    fontWeight: 500,
    color: sortKey === key ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
    textAlign: 'left',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: '#0A0A0A',
  });

  const tdStyle: React.CSSProperties = {
    padding: '11px 12px',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.75)',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    verticalAlign: 'middle',
  };

  return (
    <div style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ ...thStyle('title'), width: '32px' }}> </th>
            <th style={thStyle('title')} onClick={() => handleSort('title')}>
              Título {sortKey === 'title' && <IconChevron dir={sortDir === 'asc' ? 'down' : 'up'} />}
            </th>
            <th style={thStyle('category')} onClick={() => handleSort('category')}>
              Categoria {sortKey === 'category' && <IconChevron dir={sortDir === 'asc' ? 'down' : 'up'} />}
            </th>
            <th style={thStyle('priority')} onClick={() => handleSort('priority')}>
              Prioridade {sortKey === 'priority' && <IconChevron dir={sortDir === 'asc' ? 'down' : 'up'} />}
            </th>
            <th style={{ ...thStyle('title'), cursor: 'default' }}>Tags</th>
            <th style={thStyle('due_date')} onClick={() => handleSort('due_date')}>
              Vencimento {sortKey === 'due_date' && <IconChevron dir={sortDir === 'asc' ? 'down' : 'up'} />}
            </th>
            <th style={thStyle('project_name')} onClick={() => handleSort('project_name')}>
              Projeto {sortKey === 'project_name' && <IconChevron dir={sortDir === 'asc' ? 'down' : 'up'} />}
            </th>
            <th style={thStyle('assignee_name')} onClick={() => handleSort('assignee_name')}>
              Responsável {sortKey === 'assignee_name' && <IconChevron dir={sortDir === 'asc' ? 'down' : 'up'} />}
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(task => (
            <tr
              key={task.id}
              onClick={() => onEditTask(task)}
              style={{ cursor: 'pointer', transition: 'background 100ms' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <td style={{ ...tdStyle, paddingRight: 0 }} onClick={e => { e.stopPropagation(); onStatusCycle(task); }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <StatusIcon status={task.status} />
                </div>
              </td>
              <td style={{ ...tdStyle, color: '#fff', fontWeight: 400, maxWidth: '280px' }}>
                <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {task.title}
                </span>
              </td>
              <td style={tdStyle}>
                <span style={{
                  fontSize: '11px', padding: '2px 8px', borderRadius: '6px',
                  background: categoryStyles[task.category].bg,
                  color: categoryStyles[task.category].color,
                }}>
                  {categoryStyles[task.category].label}
                </span>
              </td>
              <td style={tdStyle}>
                <span style={{
                  fontSize: '11px', padding: '2px 8px', borderRadius: '6px',
                  background: priorityStyles[task.priority].bg,
                  color: priorityStyles[task.priority].color,
                }}>
                  {priorityStyles[task.priority].label}
                </span>
              </td>
              <td style={tdStyle}>
                {task.tags && task.tags.length > 0 ? (
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {task.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{
                        fontSize: '10px', padding: '1px 6px', borderRadius: '4px',
                        background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}>
                        {tag}
                      </span>
                    ))}
                    {task.tags.length > 3 && (
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>+{task.tags.length - 3}</span>
                    )}
                  </div>
                ) : (
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>
                )}
              </td>
              <td style={{ ...tdStyle, color: task.due_date && isOverdue(task.due_date) ? '#EF4444' : 'rgba(255,255,255,0.5)' }}>
                {task.due_date ? formatDate(task.due_date, task.due_time) : <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}
              </td>
              <td style={tdStyle}>
                {task.project_name || <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}
              </td>
              <td style={tdStyle}>
                {task.assignee_name || <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}
              </td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={8} style={{ ...tdStyle, textAlign: 'center', color: 'rgba(255,255,255,0.2)', padding: '40px' }}>
                Nenhuma tarefa encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ── Calendar View ──────────────────────────────────────────────────────────

interface CalendarViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onReschedule: (taskId: string, newDate: string, newTime?: string) => void;
}

function CalendarView({ tasks, onEditTask, onReschedule }: CalendarViewProps) {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  const prevMonth = () => {
    setSelectedDay(null);
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else { setViewMonth(m => m - 1); }
  };

  const nextMonth = () => {
    setSelectedDay(null);
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else { setViewMonth(m => m + 1); }
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const tasksByDay = useMemo(() => {
    const map: Record<number, Task[]> = {};
    tasks.forEach(t => {
      if (!t.due_date) return;
      const d = parseDate(t.due_date);
      if (d.getFullYear() === viewYear && d.getMonth() === viewMonth) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(t);
      }
    });
    // Sort tasks within each day by time
    for (const day in map) {
      map[day].sort((a, b) => (a.due_time || '99:99').localeCompare(b.due_time || '99:99'));
    }
    return map;
  }, [tasks, viewYear, viewMonth]);

  const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const MONTHS = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const isToday = (day: number) =>
    today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Tasks without any date — available for scheduling
  const undatedTasks = useMemo(() => tasks.filter(t => !t.due_date), [tasks]);

  // Day detail panel data
  const selectedDayTasks = selectedDay ? (tasksByDay[selectedDay] || []) : [];
  const withTime = selectedDayTasks.filter(t => t.due_time);
  const withoutTime = selectedDayTasks.filter(t => !t.due_time);

  // Time slots for day view (08:00 - 20:00 in 30min increments)
  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    for (let h = 8; h <= 20; h++) {
      slots.push(`${String(h).padStart(2, '0')}:00`);
      if (h < 20) slots.push(`${String(h).padStart(2, '0')}:30`);
    }
    return slots;
  }, []);

  const selectedDateStr = selectedDay
    ? `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
    : '';

  const selectedDateLabel = selectedDay
    ? `${selectedDay} de ${MONTHS[viewMonth]}`
    : '';

  return (
    <div>
      {/* Month grid — always full width */}
      <div>
        {/* Nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <button onClick={prevMonth} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '8px', display: 'flex', borderRadius: '6px' }}>
            <IconChevron dir="left" />
          </button>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button onClick={nextMonth} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '8px', display: 'flex', borderRadius: '6px' }}>
            <IconChevron dir="right" />
          </button>
        </div>

        {/* Weekday headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '2px' }}>
          {WEEKDAYS.map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.35)', padding: '6px 0', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
          {cells.map((day, idx) => {
            if (day === null) return <div key={`e-${idx}`} style={{ minHeight: '64px' }} />;
            const dayTasks = tasksByDay[day] || [];
            const count = dayTasks.length;
            const isSelected = selectedDay === day;
            const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasDone = dayTasks.some(t => t.status === 'done');
            const hasOverdue = dayTasks.some(t => t.status !== 'done' && isOverdue(t.due_date));
            const hasUrgent = dayTasks.some(t => t.priority === 'urgent' && t.status !== 'done');
            // Dot color: worst status wins
            const dotColor = hasOverdue || hasUrgent ? '#EF4444' : hasDone && count === dayTasks.filter(t => t.status === 'done').length ? '#4A90FF' : count > 0 ? '#22C55E' : 'transparent';

            return (
              <div
                key={day}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'rgba(74,144,255,0.5)'; }}
                onDragLeave={e => { e.currentTarget.style.borderColor = isSelected ? 'rgba(74,144,255,0.4)' : isToday(day) ? 'rgba(74,144,255,0.2)' : 'rgba(255,255,255,0.04)'; }}
                onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor = isSelected ? 'rgba(74,144,255,0.4)' : 'rgba(255,255,255,0.04)'; if (draggedTaskId) { onReschedule(draggedTaskId, dateStr); setDraggedTaskId(null); } }}
                style={{
                  minHeight: '64px',
                  padding: '6px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(74,144,255,0.08)' : isToday(day) ? 'rgba(74,144,255,0.04)' : 'rgba(255,255,255,0.015)',
                  border: isSelected ? '1px solid rgba(74,144,255,0.4)' : isToday(day) ? '1px solid rgba(74,144,255,0.2)' : '1px solid rgba(255,255,255,0.04)',
                  transition: 'all 120ms ease',
                }}
              >
                {/* Day number + dot */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: isToday(day) || isSelected ? 600 : 400,
                    color: isSelected ? '#4A90FF' : isToday(day) ? '#4A90FF' : 'rgba(255,255,255,0.5)',
                  }}>
                    {day}
                  </span>
                  {count > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: dotColor }} />
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{count}</span>
                    </div>
                  )}
                </div>
                {/* Mini task previews */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  {dayTasks.slice(0, 3).map(task => {
                    const uc = getTaskUrgencyColor(task);
                    return (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={e => { e.stopPropagation(); setDraggedTaskId(task.id); }}
                        onDragEnd={() => setDraggedTaskId(null)}
                        onClick={e => { e.stopPropagation(); setSelectedDay(day); }}
                        style={{
                          padding: '1px 4px',
                          borderRadius: '3px',
                          background: uc.bg,
                          fontSize: '9px',
                          color: uc.color,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          cursor: 'grab',
                          opacity: draggedTaskId === task.id ? 0.3 : 1,
                        }}
                      >
                        {task.due_time ? `${task.due_time} ` : ''}{task.title}
                      </div>
                    );
                  })}
                  {count > 3 && (
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)', paddingLeft: '4px' }}>+{count - 3}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Undated tasks — drag to schedule, or drop here to remove date */}
        <div
          style={{ marginTop: '12px', padding: '10px 12px', borderRadius: '10px', background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.05)', transition: 'border-color 100ms' }}
          onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'rgba(74,144,255,0.4)'; }}
          onDragLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
          onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; if (draggedTaskId) { onReschedule(draggedTaskId, '', ''); setDraggedTaskId(null); } }}
        >
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: undatedTasks.length > 0 ? '8px' : '0' }}>
            Sem data{undatedTasks.length > 0 ? ` (${undatedTasks.length})` : ' — arraste para remover data'}
          </div>
          {undatedTasks.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {undatedTasks.map(task => {
                const uc = getTaskUrgencyColor(task);
                return (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggedTaskId(task.id)}
                    onDragEnd={() => setDraggedTaskId(null)}
                    onClick={() => onEditTask(task)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '5px',
                      background: uc.bg,
                      border: `1px solid ${uc.color}22`,
                      fontSize: '11px',
                      color: uc.color,
                      cursor: 'grab',
                      opacity: draggedTaskId === task.id ? 0.3 : 1,
                      transition: 'opacity 100ms',
                      maxWidth: '220px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={task.title}
                  >
                    {task.title}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Day detail — overlay modal */}
      {selectedDay && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          onClick={e => { if (e.target === e.currentTarget) setSelectedDay(null); }}
        >
        <div style={{
          width: '100%',
          maxWidth: '360px',
          background: '#0F0F0F',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '14px',
          padding: '16px',
          overflowY: 'auto',
          maxHeight: '70vh',
        }}>
          {/* Day header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{selectedDateLabel}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>
                {selectedDayTasks.length} tarefa{selectedDayTasks.length !== 1 ? 's' : ''}
              </div>
            </div>
            <button
              onClick={() => setSelectedDay(null)}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', padding: '4px', display: 'flex' }}
            >
              <IconClose />
            </button>
          </div>

          {/* Tasks without time — also a drop zone to clear time */}
          <div
            style={{ marginBottom: '16px', minHeight: '32px', borderRadius: '6px', transition: 'background 80ms' }}
            onDragOver={e => { e.preventDefault(); e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
            onDragLeave={e => { e.currentTarget.style.background = ''; }}
            onDrop={e => { e.preventDefault(); e.currentTarget.style.background = ''; if (draggedTaskId) { onReschedule(draggedTaskId, selectedDateStr, ''); setDraggedTaskId(null); } }}
          >
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
              Sem horario
            </div>
              {withoutTime.map(task => {
                const uc = getTaskUrgencyColor(task);
                return (
                  <button
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggedTaskId(task.id)}
                    onDragEnd={() => setDraggedTaskId(null)}
                    onClick={() => onEditTask(task)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      marginBottom: '4px',
                      borderRadius: '6px',
                      background: uc.bg,
                      border: `1px solid ${uc.color}22`,
                      cursor: 'pointer',
                      fontSize: '12px',
                      color: uc.color,
                    }}
                  >
                    <StatusIcon status={task.status} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{task.title}</span>
                  </button>
                );
              })}
            {withoutTime.length === 0 && (
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.15)', padding: '6px 0', fontStyle: 'italic' }}>
                Arraste aqui para remover horario
              </div>
            )}
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {timeSlots.map((slot, i) => {
              const isHour = slot.endsWith(':00');
              const slotTasks = withTime.filter(t => t.due_time === slot);
              return (
                <div
                  key={slot}
                  onDragOver={e => {
                    e.preventDefault();
                    e.currentTarget.style.background = 'rgba(74,144,255,0.08)';
                  }}
                  onDragLeave={e => {
                    e.currentTarget.style.background = '';
                  }}
                  onDrop={e => {
                    e.preventDefault();
                    e.currentTarget.style.background = '';
                    if (draggedTaskId) {
                      onReschedule(draggedTaskId, selectedDateStr, slot);
                      setDraggedTaskId(null);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    minHeight: slotTasks.length > 0 ? '36px' : isHour ? '28px' : '20px',
                    borderTop: isHour ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(255,255,255,0.02)',
                    paddingTop: '3px',
                    borderRadius: '4px',
                    transition: 'background 80ms',
                  }}
                >
                  <span style={{
                    fontSize: '10px',
                    color: isHour ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)',
                    minWidth: '36px',
                    textAlign: 'right',
                    paddingTop: '1px',
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {slot}
                  </span>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {slotTasks.map(task => {
                      const uc = getTaskUrgencyColor(task);
                      return (
                        <button
                          key={task.id}
                          draggable
                          onDragStart={e => { e.stopPropagation(); setDraggedTaskId(task.id); }}
                          onDragEnd={() => setDraggedTaskId(null)}
                          onClick={() => onEditTask(task)}
                          data-task-id={task.id}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '5px 8px',
                            borderRadius: '5px',
                            background: uc.bg,
                            border: `1px solid ${uc.color}22`,
                            cursor: 'grab',
                            fontSize: '11px',
                            color: uc.color,
                            opacity: draggedTaskId === task.id ? 0.3 : 1,
                            transition: 'opacity 100ms',
                          }}
                        >
                          <StatusIcon status={task.status} />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{task.title}</span>
                          <span style={{ fontSize: '10px', opacity: 0.6 }}>{priorityStyles[task.priority].label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function TaskBoard({ initialTasks }: TaskBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [view, setView] = useState<ViewMode>('board');

  // Drag state (board)
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  // Filters
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<Partial<Task>>(emptyForm());
  const [modalLoading, setModalLoading] = useState(false);

  // Global error
  const [error, setError] = useState<string | null>(null);

  // All unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    tasks.forEach(t => t.tags?.forEach(tag => set.add(tag)));
    return Array.from(set).sort();
  }, [tasks]);

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      if (filterCategory !== 'all' && t.category !== filterCategory) return false;
      if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
      if (filterTag !== 'all' && !(t.tags || []).includes(filterTag)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const inTitle = t.title.toLowerCase().includes(q);
        const inDesc = (t.description || '').toLowerCase().includes(q);
        if (!inTitle && !inDesc) return false;
      }
      return true;
    });
  }, [tasks, filterCategory, filterPriority, filterTag, searchQuery]);

  const hasActiveFilters = filterCategory !== 'all' || filterPriority !== 'all' || filterTag !== 'all' || searchQuery !== '';

  const clearFilters = () => {
    setFilterCategory('all');
    setFilterPriority('all');
    setFilterTag('all');
    setSearchQuery('');
  };

  // ── Modal helpers ──

  const openCreateModal = useCallback((defaultStatus: TaskStatus = 'todo') => {
    setFormData({ ...emptyForm(), status: defaultStatus });
    setEditingTask(null);
    setModalMode('create');
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback((task: Task) => {
    setFormData({
      ...task,
      due_date: task.due_date ? toDateOnly(task.due_date) : '',
      due_time: task.due_time || '',
    });
    setEditingTask(task);
    setModalMode('edit');
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setFormData(emptyForm());
    setEditingTask(null);
    setModalLoading(false);
  }, []);

  const handleFormChange = useCallback((field: keyof Task, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // ── API actions ──

  const handleCreate = async () => {
    if (!formData.title?.trim()) return;
    setModalLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description || '',
          status: formData.status || 'todo',
          priority: formData.priority || 'medium',
          category: formData.category || 'general',
          assignee_name: formData.assignee_name || null,
          project_name: formData.project_name || null,
          due_date: formData.due_date || null,
          due_time: formData.due_time || null,
          tags: formData.tags || [],
          notes: formData.notes || '',
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Erro ao criar tarefa');
        return;
      }
      const newTask = await res.json();
      setTasks(prev => [newTask, ...prev]);
      closeModal();
    } catch {
      setError('Erro de conexão');
    } finally {
      setModalLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingTask) return;
    if (!formData.title?.trim()) return;
    setModalLoading(true);
    setError(null);
    try {
      // Only send fields that actually changed
      const diff: Record<string, unknown> = {};
      if (formData.title?.trim() !== editingTask.title) diff.title = formData.title!.trim();
      if ((formData.description || '') !== (editingTask.description || '')) diff.description = formData.description || '';
      if (formData.status !== editingTask.status) diff.status = formData.status;
      if (formData.priority !== editingTask.priority) diff.priority = formData.priority;
      if (formData.category !== editingTask.category) diff.category = formData.category;
      if ((formData.assignee_name || '') !== (editingTask.assignee_name || '')) diff.assignee_name = formData.assignee_name || null;
      if ((formData.project_name || '') !== (editingTask.project_name || '')) diff.project_name = formData.project_name || null;
      if ((formData.due_date || '') !== (toDateOnly(editingTask.due_date || ''))) diff.due_date = formData.due_date || null;
      if ((formData.due_time || '') !== (editingTask.due_time || '')) diff.due_time = formData.due_time || null;
      if (JSON.stringify(formData.tags || []) !== JSON.stringify(editingTask.tags || [])) diff.tags = formData.tags || [];
      if ((formData.notes || '') !== (editingTask.notes || '')) diff.notes = formData.notes || '';

      // Nothing changed
      if (Object.keys(diff).length === 0) { closeModal(); return; }

      const res = await fetch(`/api/tasks/${editingTask.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(diff),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Erro ao salvar tarefa');
        return;
      }
      const updated = await res.json();
      setTasks(prev => prev.map(t => t.id === editingTask.id ? updated : t));
      closeModal();
    } catch {
      setError('Erro de conexão');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!editingTask) return;
    const prevTasks = tasks;
    setTasks(prev => prev.filter(t => t.id !== editingTask.id));
    closeModal();
    try {
      const res = await fetch(`/api/tasks/${editingTask.id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Erro ao excluir tarefa');
        setTasks(prevTasks);
      }
    } catch {
      setError('Erro de conexão');
      setTasks(prevTasks);
    }
  };

  // ── Drag & drop ──

  const handleDragStart = useCallback((id: string) => setDraggedTask(id), []);
  const handleDragEnd = useCallback(() => setDraggedTask(null), []);

  const handleDrop = useCallback(async (status: TaskStatus) => {
    if (!draggedTask) return;
    const prev = tasks;
    setTasks(ts => ts.map(t => t.id === draggedTask ? { ...t, status } : t));
    setDraggedTask(null);
    try {
      const res = await fetch(`/api/tasks/${draggedTask}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        setTasks(prev);
        const err = await res.json();
        setError(err.error || 'Erro ao mover tarefa');
      }
    } catch {
      setTasks(prev);
      setError('Erro de conexão');
    }
  }, [draggedTask, tasks]);

  // ── Calendar reschedule (drag to day) ──

  const handleReschedule = useCallback(async (taskId: string, newDate: string, newTime?: string) => {
    const prev = tasks;
    setTasks(ts => ts.map(t => {
      if (t.id !== taskId) return t;
      const updated = { ...t, due_date: newDate || undefined };
      if (newTime !== undefined) updated.due_time = newTime || undefined;
      return updated;
    }));
    try {
      const patch: Record<string, unknown> = { due_date: newDate || null };
      if (newTime !== undefined) patch.due_time = newTime || null;
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (!res.ok) {
        setTasks(prev);
        const err = await res.json();
        setError(err.error || 'Erro ao reagendar tarefa');
      }
    } catch {
      setTasks(prev);
      setError('Erro de conexão');
    }
  }, [tasks]);

  // ── Status cycle (list view) ──

  const handleStatusCycle = useCallback(async (task: Task) => {
    const cycle: Record<TaskStatus, TaskStatus> = { todo: 'in_progress', in_progress: 'done', done: 'todo' };
    const newStatus = cycle[task.status];
    const prev = tasks;
    setTasks(ts => ts.map(t => t.id === task.id ? { ...t, status: newStatus } : t));
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        setTasks(prev);
        const err = await res.json();
        setError(err.error || 'Erro ao atualizar status');
      }
    } catch {
      setTasks(prev);
      setError('Erro de conexão');
    }
  }, [tasks]);

  // ── Styles ──

  const selectStyle: React.CSSProperties = {
    padding: '6px 10px',
    borderRadius: '7px',
    background: '#111111',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '13px',
    cursor: 'pointer',
  };

  const viewBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '7px 14px',
    borderRadius: '7px',
    background: active ? 'rgba(74,144,255,0.12)' : 'transparent',
    color: active ? '#4A90FF' : 'rgba(255,255,255,0.45)',
    border: active ? '1px solid rgba(74,144,255,0.2)' : '1px solid transparent',
    fontSize: '13px',
    fontWeight: active ? 500 : 400,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  });

  const stats = useMemo(() => {
    const today = new Date(new Date().toDateString());
    const total = tasks.length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress').length;
    const done = tasks.filter(t => t.status === 'done').length;
    const overdue = tasks.filter(t =>
      t.status !== 'done' && t.due_date && new Date(t.due_date + 'T00:00:00') < today
    ).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, todo, inProgress, done, overdue, pct };
  }, [tasks]);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Mini Dashboard */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '24px',
        padding: '14px 20px', marginBottom: '16px', borderRadius: '12px',
        background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ textAlign: 'center', minWidth: '56px' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>{stats.total}</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Total</div>
        </div>
        <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ textAlign: 'center', minWidth: '56px' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#4A90FF' }}>{stats.inProgress}</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Em progresso</div>
        </div>
        <div style={{ textAlign: 'center', minWidth: '56px' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#22C55E' }}>{stats.done}</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Concluidas</div>
        </div>
        {stats.overdue > 0 && (
          <div style={{ textAlign: 'center', minWidth: '56px' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#EF4444' }}>{stats.overdue}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Atrasadas</div>
          </div>
        )}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
          <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${stats.pct}%`, background: '#4A90FF', borderRadius: '2px', transition: 'width 300ms ease' }} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', minWidth: '36px', textAlign: 'right' }}>
            {stats.pct}%
          </span>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div style={{
          marginBottom: '16px', padding: '12px 16px', borderRadius: '8px',
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
          color: '#EF4444', fontSize: '13px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>{error}</span>
          <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', display: 'flex', padding: '2px' }}>
            <IconClose />
          </button>
        </div>
      )}

      {/* Top bar */}
      <div style={{ marginBottom: '20px', padding: '16px', borderRadius: '12px', background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.05)' }}>

        {/* Row 1: view switcher + search */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button style={viewBtnStyle(view === 'board')} onClick={() => setView('board')}>Board</button>
            <button style={viewBtnStyle(view === 'list')} onClick={() => setView('list')}>Lista</button>
            <button style={viewBtnStyle(view === 'calendar')} onClick={() => setView('calendar')}>Calendário</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, maxWidth: '320px', marginLeft: 'auto' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none', display: 'flex' }}>
                <IconSearch />
              </div>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar..."
                style={{
                  width: '100%',
                  padding: '7px 12px 7px 32px',
                  borderRadius: '7px',
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
        </div>

        {/* Row 2: filters + stats + new */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Filtros:</span>

            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value as Category | 'all')} style={selectStyle}>
              <option value="all">Categoria</option>
              <option value="marketing">Marketing</option>
              <option value="builders">Builders</option>
              <option value="systems">Systems</option>
              <option value="general">Geral</option>
            </select>

            <select value={filterPriority} onChange={e => setFilterPriority(e.target.value as Priority | 'all')} style={selectStyle}>
              <option value="all">Prioridade</option>
              <option value="urgent">Urgente</option>
              <option value="high">Alta</option>
              <option value="medium">Média</option>
              <option value="low">Baixa</option>
            </select>

            <select value={filterTag} onChange={e => setFilterTag(e.target.value)} style={selectStyle}>
              <option value="all">Tag</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                style={{
                  padding: '5px 10px', borderRadius: '6px', fontSize: '12px',
                  background: 'rgba(239,68,68,0.08)', color: '#EF4444',
                  border: '1px solid rgba(239,68,68,0.15)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}
              >
                <IconClose /> Limpar
              </button>
            )}

            {/* Active filter pills */}
            {filterCategory !== 'all' && (
              <span style={{
                padding: '3px 8px', borderRadius: '9999px', fontSize: '11px',
                background: categoryStyles[filterCategory as Category].bg,
                color: categoryStyles[filterCategory as Category].color,
                display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                {categoryStyles[filterCategory as Category].label}
                <button onClick={() => setFilterCategory('all')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 0 }}>
                  <IconClose />
                </button>
              </span>
            )}
            {filterPriority !== 'all' && (
              <span style={{
                padding: '3px 8px', borderRadius: '9999px', fontSize: '11px',
                background: priorityStyles[filterPriority as Priority].bg,
                color: priorityStyles[filterPriority as Priority].color,
                display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                {priorityStyles[filterPriority as Priority].label}
                <button onClick={() => setFilterPriority('all')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 0 }}>
                  <IconClose />
                </button>
              </span>
            )}
            {filterTag !== 'all' && (
              <span style={{
                padding: '3px 8px', borderRadius: '9999px', fontSize: '11px',
                background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                #{filterTag}
                <button onClick={() => setFilterTag('all')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 0 }}>
                  <IconClose />
                </button>
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
              {stats.total} tarefas · {stats.inProgress} em progresso · {stats.done} concluidas
            </span>
            <button
              onClick={() => openCreateModal('todo')}
              style={{
                padding: '8px 18px', borderRadius: '8px', background: '#4A90FF',
                color: '#fff', fontSize: '13px', fontWeight: 500, border: 'none',
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}
            >
              + Nova
            </button>
          </div>
        </div>
      </div>

      {/* Views */}
      {view === 'board' && (
        <BoardView
          tasks={filteredTasks}
          onEditTask={openEditModal}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          draggedTask={draggedTask}
          onAddInColumn={openCreateModal}
        />
      )}
      {view === 'list' && (
        <ListView
          tasks={filteredTasks}
          onEditTask={openEditModal}
          onStatusCycle={handleStatusCycle}
        />
      )}
      {view === 'calendar' && (
        <CalendarView
          tasks={filteredTasks}
          onEditTask={openEditModal}
          onReschedule={handleReschedule}
        />
      )}

      {/* Modal */}
      {modalOpen && (
        <TaskModal
          mode={modalMode}
          formData={formData}
          onChange={handleFormChange}
          onSave={modalMode === 'create' ? handleCreate : handleSave}
          onDelete={modalMode === 'edit' ? handleDelete : undefined}
          onClose={closeModal}
          loading={modalLoading}
        />
      )}
    </div>
  );
}
