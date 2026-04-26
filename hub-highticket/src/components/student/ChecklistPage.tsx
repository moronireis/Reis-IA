import { useState } from 'react';
import { Card, Progress } from '../ui';
import ChecklistItem from '../ui/ChecklistItem';
import GlowLine from '../vfx/GlowLine';
import { mockStudentChecklist } from '../../lib/mock-data';

export default function ChecklistPage() {
  const [items, setItems] = useState(mockStudentChecklist);

  const categories = [...new Set(items.map((i) => i.category))];
  const completedCount = items.filter((i) => i.completed).length;
  const totalCount = items.length;

  function toggleItem(id: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i))
    );
  }

  return (
    <div>
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold text-text-primary">Checklist de Implementação</h1>
        <p className="text-sm text-text-secondary mt-1">Siga cada passo para construir seu funil</p>
      </div>

      <GlowLine className="my-6" />

      {/* Overall Progress */}
      <Card padding="lg" glow className="mb-6 animate-fade-up">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-text-primary">Progresso Geral</h3>
          <span className="text-sm font-bold text-accent">{completedCount}/{totalCount}</span>
        </div>
        <Progress value={completedCount} max={totalCount} size="lg" striped />
      </Card>

      {/* By Category */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const catItems = items.filter((i) => i.category === cat);
          const catCompleted = catItems.filter((i) => i.completed).length;

          return (
            <Card key={cat} padding="sm" className="animate-fade-up">
              <div className="px-4 py-3 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-text-primary">{cat}</h3>
                  <span className="text-xs text-text-muted">{catCompleted}/{catItems.length}</span>
                </div>
                <Progress value={catCompleted} max={catItems.length} size="sm" showPercent={false} />
              </div>
              {catItems.map((item) => (
                <ChecklistItem
                  key={item.id}
                  label={item.title}
                  checked={item.completed}
                  onChange={() => toggleItem(item.id)}
                />
              ))}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
