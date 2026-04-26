import { useState } from 'react';
import { Card, Badge, Button } from '../ui';
import Avatar from '../ui/Avatar';
import GlowLine from '../vfx/GlowLine';
import { mockActions } from '../../lib/mock-data';

type StatusFilter = 'all' | 'todo' | 'in_progress' | 'done';

const statusLabel: Record<string, string> = {
  todo: 'A Fazer',
  in_progress: 'Em Andamento',
  done: 'Concluído',
};

const statusBadge: Record<string, 'warning' | 'info' | 'success'> = {
  todo: 'warning',
  in_progress: 'info',
  done: 'success',
};

function ActionCard({ action }: { action: typeof mockActions[0] }) {
  return (
    <Card hover padding="md" className="group">
      <div className="flex items-start justify-between mb-2">
        <Badge variant={statusBadge[action.status]}>{statusLabel[action.status]}</Badge>
        {action.dueDate && (
          <span className="text-[10px] text-text-muted">
            {new Date(action.dueDate).toLocaleDateString('pt-BR')}
          </span>
        )}
      </div>
      <h4 className="text-sm font-semibold text-text-primary">{action.title}</h4>
      <p className="text-xs text-text-muted mt-1">{action.description}</p>
      <div className="mt-3 p-2.5 bg-surface-2 rounded-md">
        <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Como fazer</p>
        <p className="text-xs text-text-secondary">{action.how}</p>
      </div>
      {action.assignedTo && (
        <div className="flex items-center gap-2 mt-3">
          <Avatar name={action.assignedTo} size="sm" />
          <span className="text-xs text-text-muted">{action.assignedTo}</span>
        </div>
      )}
    </Card>
  );
}

export default function AcoesPage() {
  const [filter, setFilter] = useState<StatusFilter>('all');

  const filtered = filter === 'all' ? mockActions : mockActions.filter((a) => a.status === filter);

  const todoItems = mockActions.filter((a) => a.status === 'todo');
  const inProgressItems = mockActions.filter((a) => a.status === 'in_progress');
  const doneItems = mockActions.filter((a) => a.status === 'done');

  return (
    <div>
      <div className="flex items-start sm:items-center justify-between animate-fade-up gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Ações</h1>
          <p className="text-sm text-text-secondary mt-1">Gerencie suas tarefas e próximos passos</p>
        </div>
        <Button size="sm" className="shrink-0">Nova Ação</Button>
      </div>

      <GlowLine className="my-6" />

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'all' as StatusFilter, label: 'Todas', count: mockActions.length },
          { id: 'todo' as StatusFilter, label: 'A Fazer', count: todoItems.length },
          { id: 'in_progress' as StatusFilter, label: 'Em Andamento', count: inProgressItems.length },
          { id: 'done' as StatusFilter, label: 'Concluído', count: doneItems.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-all flex items-center gap-1.5 ${
              filter === tab.id
                ? 'bg-accent/15 text-accent font-medium'
                : 'text-text-muted hover:text-text-secondary hover:bg-surface-2'
            }`}
          >
            {tab.label}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              filter === tab.id ? 'bg-accent/20' : 'bg-surface-3'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Kanban View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          { title: 'A Fazer', items: filter === 'all' ? todoItems : filter === 'todo' ? todoItems : [], color: 'text-warning' },
          { title: 'Em Andamento', items: filter === 'all' ? inProgressItems : filter === 'in_progress' ? inProgressItems : [], color: 'text-info' },
          { title: 'Concluído', items: filter === 'all' ? doneItems : filter === 'done' ? doneItems : [], color: 'text-success' },
        ].map((column) => (
          <div key={column.title}>
            <div className="flex items-center gap-2 mb-3">
              <h3 className={`text-sm font-semibold ${column.color}`}>{column.title}</h3>
              <span className="text-[10px] text-text-muted bg-surface-3 px-1.5 py-0.5 rounded-full">
                {column.items.length}
              </span>
            </div>
            <div className="space-y-3">
              {column.items.map((action) => (
                <ActionCard key={action.id} action={action} />
              ))}
              {column.items.length === 0 && filter !== 'all' && (
                <div className="p-6 border border-dashed border-border rounded-lg text-center">
                  <p className="text-xs text-text-muted">Nenhuma ação nesta categoria</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
