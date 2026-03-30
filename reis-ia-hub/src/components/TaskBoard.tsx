import React, { useState } from 'react';

type Priority = 'low' | 'medium' | 'high' | 'urgent';
type TaskStatus = 'todo' | 'in_progress' | 'done';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  assignee_name?: string;
  project_name?: string;
  due_date?: string;
  created_at: string;
}

interface TaskBoardProps {
  initialTasks: Task[];
}

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: 'todo', label: 'A Fazer' },
  { id: 'in_progress', label: 'Em Progresso' },
  { id: 'done', label: 'Concluído' },
];

const priorityStyles: Record<Priority, { bg: string; color: string; label: string }> = {
  urgent: { bg: 'rgba(239, 68, 68, 0.10)', color: '#EF4444', label: 'Urgente' },
  high: { bg: 'rgba(245, 158, 11, 0.10)', color: '#F59E0B', label: 'Alta' },
  medium: { bg: 'rgba(74, 144, 255, 0.10)', color: '#4A90FF', label: 'Média' },
  low: { bg: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', label: 'Baixa' },
};

export default function TaskBoard({ initialTasks }: TaskBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskColumn, setNewTaskColumn] = useState<TaskStatus>('todo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragStart = (taskId: string) => setDraggedTask(taskId);
  const handleDragEnd = () => setDraggedTask(null);

  const handleDrop = async (status: TaskStatus) => {
    if (!draggedTask) return;

    const previousTasks = tasks;
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === draggedTask ? { ...t, status } : t));
    setDraggedTask(null);

    try {
      const res = await fetch(`/api/tasks/${draggedTask}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Erro ao atualizar tarefa');
        setTasks(previousTasks);
      }
    } catch {
      setError('Erro de conexão');
      setTasks(previousTasks);
    }
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTaskTitle.trim(),
          status: newTaskColumn,
          priority: 'medium',
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Erro ao criar tarefa');
        return;
      }

      const newTask = await res.json();
      setTasks(prev => [newTask, ...prev]);
      setNewTaskTitle('');
      setShowNewTask(false);
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const previousTasks = tasks;
    // Optimistic remove
    setTasks(prev => prev.filter(t => t.id !== taskId));

    try {
      const res = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Erro ao excluir tarefa');
        setTasks(previousTasks);
      }
    } catch {
      setError('Erro de conexão');
      setTasks(previousTasks);
    }
  };

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
          <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '16px' }}>×</button>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
            {tasks.length} tarefas · {tasks.filter(t => t.status === 'done').length} concluídas
          </span>
        </div>
        <button
          onClick={() => { setShowNewTask(true); setNewTaskColumn('todo'); }}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: '#4A90FF',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          + Nova Tarefa
        </button>
      </div>

      {/* New task inline form */}
      {showNewTask && (
        <div style={{
          marginBottom: '20px',
          padding: '16px',
          borderRadius: '12px',
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}>
          <input
            autoFocus
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddTask()}
            placeholder="Título da tarefa..."
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '8px',
              background: '#161616',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#fff',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <select
            value={newTaskColumn}
            onChange={e => setNewTaskColumn(e.target.value as TaskStatus)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              background: '#161616',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '14px',
            }}
          >
            {COLUMNS.map(col => (
              <option key={col.id} value={col.id}>{col.label}</option>
            ))}
          </select>
          <button
            onClick={handleAddTask}
            disabled={loading}
            style={{ padding: '10px 20px', borderRadius: '8px', background: '#4A90FF', color: '#fff', fontSize: '14px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Criando...' : 'Criar'}
          </button>
          <button onClick={() => setShowNewTask(false)} style={{ padding: '10px 14px', borderRadius: '8px', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: '14px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
            Cancelar
          </button>
        </div>
      )}

      {/* Empty state */}
      {tasks.length === 0 && !showNewTask && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(255,255,255,0.35)', fontSize: '14px' }}>
          Nenhuma tarefa ainda. Crie a primeira.
        </div>
      )}

      {/* Kanban Board */}
      {tasks.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {COLUMNS.map(column => {
            const columnTasks = tasks.filter(t => t.status === column.id);
            return (
              <div
                key={column.id}
                onDragOver={e => e.preventDefault()}
                onDrop={() => handleDrop(column.id)}
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
                    <span style={{
                      fontSize: '12px',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'rgba(255,255,255,0.5)',
                    }}>
                      {columnTasks.length}
                    </span>
                  </div>
                  <button
                    onClick={() => { setShowNewTask(true); setNewTaskColumn(column.id); }}
                    style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: '18px' }}
                  >
                    +
                  </button>
                </div>

                {/* Tasks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {columnTasks.map(task => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task.id)}
                      onDragEnd={handleDragEnd}
                      style={{
                        padding: '14px',
                        borderRadius: '10px',
                        background: '#111111',
                        border: '1px solid rgba(255,255,255,0.06)',
                        cursor: 'grab',
                        opacity: draggedTask === task.id ? 0.5 : 1,
                        transition: 'all 200ms ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#fff', fontWeight: 400, lineHeight: 1.4 }}>{task.title}</span>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: '14px', flexShrink: 0, padding: '0 2px', lineHeight: 1 }}
                          title="Excluir tarefa"
                        >
                          ×
                        </button>
                      </div>
                      {task.description && (
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '6px', lineHeight: 1.5 }}>{task.description}</p>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: priorityStyles[task.priority].bg,
                          color: priorityStyles[task.priority].color,
                        }}>
                          {priorityStyles[task.priority].label}
                        </span>
                        {task.project_name && (
                          <span style={{
                            fontSize: '11px',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            background: 'rgba(74, 144, 255, 0.08)',
                            color: 'rgba(74, 144, 255, 0.7)',
                          }}>
                            {task.project_name}
                          </span>
                        )}
                        {task.due_date && (
                          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
                            {task.due_date}
                          </span>
                        )}
                      </div>
                      {task.assignee_name && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                          <div style={{
                            width: '20px', height: '20px', borderRadius: '9999px',
                            background: 'rgba(74,144,255,0.1)', color: '#4A90FF',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '10px', fontWeight: 500,
                          }}>
                            {task.assignee_name.charAt(0)}
                          </div>
                          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{task.assignee_name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
