import { useState } from 'react';
import { Card, Badge, Button } from '../ui';
import Avatar from '../ui/Avatar';
import GlowLine from '../vfx/GlowLine';
import StatCard from '../ui/StatCard';
import { mockStudents } from '../../lib/mock-data';
import { formatCompactCurrency } from '../../lib/utils';

type Student = typeof mockStudents[0] & {
  plan?: string;
  joined?: string;
  status?: 'active' | 'inactive' | 'at_risk';
};

const studentsExtended: Student[] = mockStudents.map((s, i) => ({
  ...s,
  plan: ['Scale', 'Scale', 'Growth', 'Growth', 'Starter', 'Starter', 'Starter', 'Starter'][i],
  joined: ['2025-11-10', '2025-11-22', '2025-12-03', '2025-12-15', '2026-01-08', '2026-01-20', '2026-02-05', '2026-03-01'][i],
  status: (['active', 'active', 'active', 'active', 'active', 'at_risk', 'active', 'inactive'] as const)[i],
}));

const statusLabel: Record<string, string> = {
  active: 'Ativo',
  at_risk: 'Em Risco',
  inactive: 'Inativo',
};

const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  active: 'success',
  at_risk: 'warning',
  inactive: 'danger',
};

const planVariant: Record<string, 'info' | 'success' | 'default'> = {
  Scale: 'success',
  Growth: 'info',
  Starter: 'default',
};

function StudentRow({ student, onSelect, selected }: {
  student: Student;
  onSelect: (s: Student) => void;
  selected: boolean;
}) {
  return (
    <tr
      onClick={() => onSelect(student)}
      className={`border-b border-border last:border-0 transition-colors cursor-pointer ${
        selected ? 'bg-accent/5' : 'hover:bg-surface-2'
      }`}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar name={student.name} size="sm" />
          <span className="text-sm font-medium text-text-primary">{student.name}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-center">
        <span className="text-sm font-semibold text-accent">Nível {student.level}</span>
      </td>
      <td className="px-4 py-3 text-right">
        <span className="text-sm text-text-secondary">{student.points.toLocaleString('pt-BR')} pts</span>
      </td>
      <td className="px-4 py-3 text-right">
        <span className="text-sm font-semibold text-text-primary">{formatCompactCurrency(student.revenue)}</span>
      </td>
      <td className="px-4 py-3 text-center">
        <Badge variant={planVariant[student.plan ?? 'Starter']}>{student.plan}</Badge>
      </td>
      <td className="px-4 py-3 text-center">
        <span className="text-xs text-text-muted">
          {student.joined ? new Date(student.joined).toLocaleDateString('pt-BR') : '—'}
        </span>
      </td>
      <td className="px-4 py-3 text-center">
        <Badge variant={statusVariant[student.status ?? 'inactive']}>
          {statusLabel[student.status ?? 'inactive']}
        </Badge>
      </td>
    </tr>
  );
}

function StudentDetail({ student, onClose }: { student: Student; onClose: () => void }) {
  return (
    <Card padding="lg" className="animate-fade-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar name={student.name} size="lg" />
          <div>
            <h3 className="text-base font-semibold text-text-primary">{student.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={statusVariant[student.status ?? 'inactive']}>
                {statusLabel[student.status ?? 'inactive']}
              </Badge>
              <Badge variant={planVariant[student.plan ?? 'Starter']}>{student.plan}</Badge>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-text-muted hover:text-text-primary transition-colors text-lg leading-none"
        >
          ×
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-surface-2 rounded-lg p-3">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Nível</p>
          <p className="text-xl font-bold text-accent">{student.level}</p>
        </div>
        <div className="bg-surface-2 rounded-lg p-3">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Pontos</p>
          <p className="text-xl font-bold text-text-primary">{student.points.toLocaleString('pt-BR')}</p>
        </div>
        <div className="bg-surface-2 rounded-lg p-3">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Receita Gerada</p>
          <p className="text-xl font-bold text-text-primary">{formatCompactCurrency(student.revenue)}</p>
        </div>
        <div className="bg-surface-2 rounded-lg p-3">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Membro desde</p>
          <p className="text-sm font-semibold text-text-primary">
            {student.joined ? new Date(student.joined).toLocaleDateString('pt-BR') : '—'}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="sm" className="flex-1">Enviar Mensagem</Button>
        <Button size="sm" variant="ghost" className="flex-1">Ver Jornada</Button>
      </div>
    </Card>
  );
}

export default function AlunosPage() {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filtered = studentsExtended.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = studentsExtended.filter((s) => s.status === 'active').length;
  const atRiskCount = studentsExtended.filter((s) => s.status === 'at_risk').length;

  function handleSelect(s: Student) {
    setSelectedStudent((prev) => (prev?.id === s.id ? null : s));
  }

  return (
    <div>
      <div className="flex items-start sm:items-center justify-between animate-fade-up gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Alunos</h1>
          <p className="text-sm text-text-secondary mt-1">Gerencie e acompanhe todos os alunos</p>
        </div>
        <Button size="sm" className="shrink-0">Adicionar Aluno</Button>
      </div>

      <GlowLine className="my-6" />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 stagger-children">
        <StatCard label="Total de Alunos" value={String(studentsExtended.length)} className="animate-fade-up" />
        <StatCard label="Ativos" value={String(activeCount)} className="animate-fade-up" />
        <StatCard label="Em Risco" value={String(atRiskCount)} change={{ value: 'atenção', positive: false }} className="animate-fade-up" />
        <StatCard label="Receita Total" value={formatCompactCurrency(studentsExtended.reduce((acc, s) => acc + s.revenue, 0))} className="animate-fade-up" />
      </div>

      <div className={`grid gap-6 ${selectedStudent ? 'grid-cols-1 xl:grid-cols-[1fr_300px]' : 'grid-cols-1'}`}>
        {/* Table */}
        <Card padding="sm" className="animate-fade-up">
          {/* Search */}
          <div className="px-4 py-3 border-b border-border">
            <input
              type="text"
              placeholder="Buscar aluno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-text-muted uppercase tracking-wider">Aluno</th>
                  <th className="text-center px-4 py-2.5 text-xs font-medium text-text-muted uppercase tracking-wider">Nível</th>
                  <th className="text-right px-4 py-2.5 text-xs font-medium text-text-muted uppercase tracking-wider">Pontos</th>
                  <th className="text-right px-4 py-2.5 text-xs font-medium text-text-muted uppercase tracking-wider">Receita</th>
                  <th className="text-center px-4 py-2.5 text-xs font-medium text-text-muted uppercase tracking-wider">Plano</th>
                  <th className="text-center px-4 py-2.5 text-xs font-medium text-text-muted uppercase tracking-wider">Membro desde</th>
                  <th className="text-center px-4 py-2.5 text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student) => (
                  <StudentRow
                    key={student.id}
                    student={student}
                    onSelect={handleSelect}
                    selected={selectedStudent?.id === student.id}
                  />
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-sm text-text-muted">
                      Nenhum aluno encontrado para "{search}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Detail Panel */}
        {selectedStudent && (
          <StudentDetail
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)}
          />
        )}
      </div>
    </div>
  );
}
