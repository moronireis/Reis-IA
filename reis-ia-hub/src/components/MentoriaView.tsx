import React, { useState } from 'react';

// ---- Types ----

interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  role?: string;
  company?: string;
}

interface Mentorship {
  id: string;
  mentor_id: string;
  mentee_id: string;
  status: string;
  program: string;
  start_date: string;
  end_date?: string;
  goals?: string;
  mentor: Profile;
  mentee: Profile;
}

interface Milestone {
  id: string;
  mentorship_id: string;
  title: string;
  description?: string;
  status: 'pending' | 'current' | 'done';
  sort_order: number;
  completed_at?: string;
}

interface MentorshipTask {
  id: string;
  mentorship_id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date?: string;
  completed_at?: string;
  category?: 'systems' | 'marketing' | 'builders';
  assigned_to?: 'mentor' | 'mentee';
  link?: string;
}

interface Session {
  id: string;
  mentorship_id: string;
  date: string;
  duration_minutes: number;
  summary?: string;
  notes?: string;
  action_items?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface MentoriaViewProps {
  mentorship: Mentorship;
  milestones: Milestone[];
  tasks: MentorshipTask[];
  sessions: Session[];
  isAdmin: boolean;
  currentUserId: string;
}

// ---- Helpers ----

const priorityConfig = {
  urgent: { bg: 'rgba(239,68,68,0.10)', color: '#EF4444', label: 'Urgente' },
  high: { bg: 'rgba(245,158,11,0.10)', color: '#F59E0B', label: 'Alta' },
  medium: { bg: 'rgba(74,144,255,0.10)', color: '#4A90FF', label: 'Media' },
  low: { bg: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', label: 'Baixa' },
};

const categoryConfig: Record<string, { bg: string; color: string; label: string }> = {
  builders: { bg: 'rgba(45,122,255,0.1)', color: '#2D7AFF', label: 'Builders' },
  marketing: { bg: 'rgba(139,92,246,0.1)', color: '#8B5CF6', label: 'Marketing' },
  systems: { bg: 'rgba(74,144,255,0.1)', color: '#4A90FF', label: 'Systems' },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

function getInitials(name: string | undefined): string {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// ---- Milestone Stepper ----

function MilestoneStepper({ milestones }: { milestones: Milestone[] }) {
  const sorted = [...milestones].sort((a, b) => a.sort_order - b.sort_order);
  const doneCount = sorted.filter(m => m.status === 'done').length;
  const progress = sorted.length > 0 ? Math.round((doneCount / sorted.length) * 100) : 0;

  return (
    <div style={{
      background: 'var(--surface-2)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '12px',
      padding: '20px 24px',
      marginBottom: '24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>Progresso</span>
        <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>
          {progress}% ({doneCount} de {sorted.length} concluidos)
        </span>
      </div>

      {sorted.length > 0 ? (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, overflowX: 'auto', paddingBottom: '4px' }}>
          {sorted.map((m, i) => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'flex-start', flex: 1, minWidth: '80px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                {/* Circle */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  ...(m.status === 'done'
                    ? { background: 'rgba(34,197,94,0.15)', border: '1.5px solid #22C55E' }
                    : m.status === 'current'
                    ? { background: 'var(--blue-15)', border: '1.5px solid var(--accent-blue)' }
                    : { background: 'var(--surface-3)', border: '1.5px solid var(--border-visible)' }),
                }}>
                  {m.status === 'done' ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : m.status === 'current' ? (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-blue)' }} />
                  ) : (
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--border-visible)' }} />
                  )}
                </div>
                {/* Label */}
                <div style={{
                  marginTop: '6px',
                  fontSize: '11px',
                  color: m.status === 'done' ? '#22C55E' : m.status === 'current' ? 'var(--accent-blue)' : 'var(--text-quaternary)',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  maxWidth: '72px',
                  wordBreak: 'break-word',
                }}>
                  {m.title}
                </div>
              </div>
              {/* Connector line */}
              {i < sorted.length - 1 && (
                <div style={{
                  height: '1.5px',
                  flex: 1,
                  marginTop: '13px',
                  background: m.status === 'done' ? 'rgba(34,197,94,0.4)' : 'var(--border-subtle)',
                }} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-quaternary)' }}>Nenhum marco definido.</p>
      )}
    </div>
  );
}

// ---- Task Item ----

function TaskItem({
  task,
  onToggle,
  isAdmin,
}: {
  task: MentorshipTask;
  onToggle: (taskId: string, newStatus: 'pending' | 'done') => void;
  isAdmin: boolean;
}) {
  const isDone = task.status === 'done';
  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  const category = task.category ? categoryConfig[task.category] : null;

  const titleElement = task.link ? (
    <a
      href={task.link}
      style={{
        fontSize: 'var(--text-body-sm)',
        color: isDone ? 'var(--text-quaternary)' : 'var(--accent-blue)',
        textDecoration: isDone ? 'line-through' : 'underline',
        textDecorationColor: 'rgba(74,144,255,0.4)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {task.title}
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </a>
  ) : (
    <span style={{
      fontSize: 'var(--text-body-sm)',
      color: isDone ? 'var(--text-quaternary)' : 'var(--text-primary)',
      textDecoration: isDone ? 'line-through' : 'none',
    }}>
      {task.title}
    </span>
  );

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      padding: '10px 0',
      borderBottom: '1px solid var(--border-subtle)',
      opacity: isDone ? 0.6 : 1,
      transition: 'opacity 0.15s',
    }}>
      <button
        onClick={() => onToggle(task.id, isDone ? 'pending' : 'done')}
        style={{
          width: '18px',
          height: '18px',
          borderRadius: '4px',
          border: `1.5px solid ${isDone ? '#22C55E' : 'var(--border-visible)'}`,
          background: isDone ? 'rgba(34,197,94,0.15)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          marginTop: '1px',
          transition: 'all 0.15s',
        }}
      >
        {isDone && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '3px' }}>
          {titleElement}
          {category && (
            <span style={{
              fontSize: '11px',
              padding: '1px 6px',
              borderRadius: '4px',
              background: category.bg,
              color: category.color,
            }}>
              {category.label}
            </span>
          )}
          <span style={{
            fontSize: '11px',
            padding: '1px 6px',
            borderRadius: '4px',
            background: priority.bg,
            color: priority.color,
          }}>
            {priority.label}
          </span>
          {isAdmin && task.assigned_to && (
            <span style={{
              fontSize: '11px',
              padding: '1px 6px',
              borderRadius: '4px',
              background: 'var(--surface-3)',
              color: 'var(--text-quaternary)',
            }}>
              {task.assigned_to === 'mentor' ? 'Sua tarefa' : 'Tarefa do mentorado'}
            </span>
          )}
        </div>
        {task.due_date && !isDone && (
          <span style={{ fontSize: '11px', color: 'var(--text-quaternary)' }}>
            Ate {formatDateShort(task.due_date)}
          </span>
        )}
      </div>
    </div>
  );
}

// ---- Create Task Form ----

interface CreateTaskFormProps {
  mentorshipId: string;
  onCreated: (task: MentorshipTask) => void;
  onCancel: () => void;
}

function CreateTaskForm({ mentorshipId, onCreated, onCancel }: CreateTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'builders' | 'marketing' | 'systems'>('builders');
  const [assignedTo, setAssignedTo] = useState<'mentor' | 'mentee'>('mentee');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [link, setLink] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--surface-2)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '6px',
    color: 'var(--text-primary)',
    fontSize: '13px',
    fontFamily: 'inherit',
    padding: '7px 10px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    color: 'var(--text-tertiary)',
    marginBottom: '4px',
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setError('Titulo obrigatorio'); return; }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`/api/mentoria/${mentorshipId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          category,
          assigned_to: assignedTo,
          priority,
          due_date: dueDate || undefined,
          link: link.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Erro ao criar task');
      }
      const created = await res.json();
      onCreated(created);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar task');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border-accent)',
        borderRadius: '10px',
        padding: '16px',
        marginBottom: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Nova Task</span>
        <button type="button" onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-quaternary)', padding: '2px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {error && (
        <div style={{ marginBottom: '10px', fontSize: '12px', color: '#EF4444', padding: '6px 10px', background: 'rgba(239,68,68,0.08)', borderRadius: '6px' }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '10px' }}>
        <label style={labelStyle}>Titulo *</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Preencher formulario de branding" style={inputStyle} required />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={labelStyle}>Descricao</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
        <div>
          <label style={labelStyle}>Categoria</label>
          <select value={category} onChange={e => setCategory(e.target.value as any)} style={inputStyle}>
            <option value="builders">Builders</option>
            <option value="marketing">Marketing</option>
            <option value="systems">Systems</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Atribuida a</label>
          <select value={assignedTo} onChange={e => setAssignedTo(e.target.value as any)} style={inputStyle}>
            <option value="mentee">Mentorado</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Prioridade</label>
          <select value={priority} onChange={e => setPriority(e.target.value as any)} style={inputStyle}>
            <option value="low">Baixa</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Prazo</label>
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={inputStyle} />
        </div>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <label style={labelStyle}>Link (opcional)</label>
        <input type="text" value={link} onChange={e => setLink(e.target.value)} placeholder="/forms/personal-branding" style={inputStyle} />
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={submitting}
          style={{
            flex: 2,
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
            background: 'var(--accent-blue)',
            color: '#000',
            fontSize: '13px',
            fontWeight: 600,
            cursor: submitting ? 'default' : 'pointer',
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? 'Criando...' : 'Criar Task'}
        </button>
      </div>
    </form>
  );
}

// ---- Session Item ----

function SessionItem({ session }: { session: Session }) {
  const [expanded, setExpanded] = useState(false);
  const isScheduled = session.status === 'scheduled';

  return (
    <div style={{
      border: `1px solid ${isScheduled ? 'var(--border-accent)' : 'var(--border-subtle)'}`,
      borderRadius: '8px',
      background: isScheduled ? 'var(--blue-04)' : 'var(--surface-3)',
      marginBottom: '8px',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setExpanded(prev => !prev)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 12px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: 'var(--text-caption)',
            fontWeight: 500,
            color: isScheduled ? 'var(--accent-blue)' : 'var(--text-secondary)',
          }}>
            {formatDateShort(session.date)}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-quaternary)' }}>
            {session.duration_minutes}min
          </span>
          {isScheduled && (
            <span style={{ fontSize: '11px', padding: '1px 6px', borderRadius: '4px', background: 'var(--blue-10)', color: 'var(--accent-blue)' }}>
              Agendada
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {session.summary && (
            <span style={{
              fontSize: '11px',
              color: 'var(--text-quaternary)',
              maxWidth: '140px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {session.summary}
            </span>
          )}
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-quaternary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {expanded && (session.summary || session.notes || session.action_items) && (
        <div style={{ padding: '0 12px 12px', borderTop: '1px solid var(--border-subtle)' }}>
          {session.summary && (
            <div style={{ marginTop: '10px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-quaternary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Resumo</div>
              <p style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{session.summary}</p>
            </div>
          )}
          {session.notes && (
            <div style={{ marginTop: '10px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-quaternary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Notas</div>
              <p style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{session.notes}</p>
            </div>
          )}
          {session.action_items && (
            <div style={{ marginTop: '10px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-quaternary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Acoes</div>
              <p style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{session.action_items}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---- Main Component ----

export default function MentoriaView({
  mentorship,
  milestones,
  tasks: initialTasks,
  sessions,
  isAdmin,
  currentUserId,
}: MentoriaViewProps) {
  const [tasks, setTasks] = useState<MentorshipTask[]>(initialTasks);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const visibleTasks = isAdmin
    ? tasks
    : tasks.filter(t => t.assigned_to === 'mentee' || !t.assigned_to);

  const pendingTasks = visibleTasks.filter(t => t.status !== 'done');
  const doneTasks = visibleTasks.filter(t => t.status === 'done');

  const upcomingSessions = sessions.filter(s => s.status === 'scheduled').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastSessions = sessions.filter(s => s.status !== 'scheduled').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const nextSession = upcomingSessions[0];

  async function handleToggleTask(taskId: string, newStatus: 'pending' | 'done') {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    try {
      await fetch(`/api/mentoria/${mentorship.id}/tasks`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: taskId, status: newStatus }),
      });
    } catch (_) {
      // Revert on error
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus === 'done' ? 'pending' : 'done' } : t));
    }
  }

  function handleTaskCreated(task: MentorshipTask) {
    setTasks(prev => [task, ...prev]);
    setShowCreateForm(false);
  }

  // Group tasks by category
  const categories = ['builders', 'marketing', 'systems'] as const;
  const uncategorized = pendingTasks.filter(t => !t.category);
  const tasksByCategory = categories.map(cat => ({
    cat,
    tasks: pendingTasks.filter(t => t.category === cat),
  })).filter(g => g.tasks.length > 0);

  const mentorInitials = getInitials(mentorship.mentor?.full_name);
  const menteeInitials = getInitials(mentorship.mentee?.full_name);

  return (
    <div style={{ maxWidth: '960px' }}>
      {/* Header Card */}
      <div style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '20px 24px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
      }}>
        {/* Mentor Avatar */}
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'var(--blue-15)',
          color: 'var(--accent-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 600,
          flexShrink: 0,
        }}>
          {mentorInitials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '4px' }}>
            <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Mentor: {mentorship.mentor?.full_name || '—'}
            </span>
            <span style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '4px',
              background: 'var(--blue-10)',
              color: 'var(--accent-blue)',
            }}>
              {mentorship.program}
            </span>
            <span style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '4px',
              background: mentorship.status === 'active' ? 'rgba(34,197,94,0.10)' : 'var(--surface-4)',
              color: mentorship.status === 'active' ? '#22C55E' : 'var(--text-quaternary)',
            }}>
              {mentorship.status === 'active' ? 'Ativa' : mentorship.status}
            </span>
          </div>
          {mentorship.start_date && (
            <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
              Inicio: {formatDate(mentorship.start_date)}
              {mentorship.end_date && ` — Fim: ${formatDate(mentorship.end_date)}`}
            </div>
          )}
          {mentorship.goals && (
            <p style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Objetivo: {mentorship.goals}
            </p>
          )}
        </div>
        {isAdmin && (
          <div style={{ flexShrink: 0 }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--surface-3)',
              color: 'var(--text-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: 600,
            }}>
              {menteeInitials}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-quaternary)', textAlign: 'center', marginTop: '3px' }}>
              {mentorship.mentee?.full_name?.split(' ')[0]}
            </div>
          </div>
        )}
      </div>

      {/* Milestones */}
      <MilestoneStepper milestones={milestones} />

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Tasks Column */}
        <div style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>
              {isAdmin ? 'Tasks' : 'Minhas Tasks'}
            </span>
            <span style={{
              fontSize: '11px',
              padding: '1px 6px',
              borderRadius: '4px',
              background: 'var(--surface-4)',
              color: 'var(--text-quaternary)',
            }}>
              {pendingTasks.length} pendentes
            </span>
            {isAdmin && (
              <button
                onClick={() => setShowCreateForm(prev => !prev)}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-visible)',
                  background: showCreateForm ? 'var(--blue-10)' : 'transparent',
                  color: showCreateForm ? 'var(--accent-blue)' : 'var(--text-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  flexShrink: 0,
                }}
                title="Nova task"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            )}
          </div>

          {/* Create task form */}
          {showCreateForm && isAdmin && (
            <CreateTaskForm
              mentorshipId={mentorship.id}
              onCreated={handleTaskCreated}
              onCancel={() => setShowCreateForm(false)}
            />
          )}

          {visibleTasks.length === 0 ? (
            <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-quaternary)', textAlign: 'center', padding: '20px 0' }}>
              Nenhuma task ainda.
            </p>
          ) : (
            <div>
              {/* Grouped pending tasks by category */}
              {tasksByCategory.map(({ cat, tasks: catTasks }) => {
                const catConfig = categoryConfig[cat];
                return (
                  <div key={cat} style={{ marginBottom: '12px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '4px',
                      paddingBottom: '4px',
                    }}>
                      <span style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: catConfig.bg,
                        color: catConfig.color,
                        fontWeight: 600,
                        letterSpacing: '0.03em',
                      }}>
                        {catConfig.label}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-quaternary)' }}>
                        {catTasks.length}
                      </span>
                    </div>
                    {catTasks.map(t => (
                      <TaskItem key={t.id} task={t} onToggle={handleToggleTask} isAdmin={isAdmin} />
                    ))}
                  </div>
                );
              })}

              {/* Uncategorized pending */}
              {uncategorized.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  {uncategorized.map(t => (
                    <TaskItem key={t.id} task={t} onToggle={handleToggleTask} isAdmin={isAdmin} />
                  ))}
                </div>
              )}

              {/* Done tasks */}
              {doneTasks.length > 0 && (
                <>
                  <div style={{ fontSize: '11px', color: 'var(--text-quaternary)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '12px 0 4px' }}>
                    Concluidas
                  </div>
                  {doneTasks.map(t => (
                    <TaskItem key={t.id} task={t} onToggle={handleToggleTask} isAdmin={isAdmin} />
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Sessions Column */}
        <div style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>Sessoes</span>
          </div>

          {/* Next session highlight */}
          {nextSession && (
            <div style={{
              background: 'var(--blue-06)',
              border: '1px solid var(--border-accent)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
            }}>
              <div style={{ fontSize: '11px', color: 'var(--accent-blue)', fontWeight: 500, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Proxima Sessao
              </div>
              <div style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>
                {formatDate(nextSession.date)} · {nextSession.duration_minutes}min
              </div>
              {nextSession.summary && (
                <p style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {nextSession.summary}
                </p>
              )}
            </div>
          )}

          {/* All upcoming sessions (excluding first which was in highlight) */}
          {upcomingSessions.slice(1).map(s => (
            <SessionItem key={s.id} session={s} />
          ))}

          {/* Past sessions */}
          {pastSessions.length > 0 && (
            <>
              <div style={{ fontSize: '11px', color: 'var(--text-quaternary)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '12px 0 8px' }}>
                Sessoes Anteriores
              </div>
              {pastSessions.map(s => (
                <SessionItem key={s.id} session={s} />
              ))}
            </>
          )}

          {sessions.length === 0 && (
            <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-quaternary)', textAlign: 'center', padding: '20px 0' }}>
              Nenhuma sessao agendada.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
