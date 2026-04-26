import { Card, Progress, Badge } from '../ui';
import TimelineStep from '../ui/TimelineStep';
import GlowLine from '../vfx/GlowLine';
import { mockStudentJourney } from '../../lib/mock-data';

export default function StudentJourneyPage() {
  const completed = mockStudentJourney.filter((s) => s.status === 'completed').length;
  const total = mockStudentJourney.length;
  const active = mockStudentJourney.find((s) => s.status === 'active');

  return (
    <div>
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold text-text-primary">Minha Jornada</h1>
        <p className="text-sm text-text-secondary mt-1">Seu progresso dentro da mentoria</p>
      </div>

      <GlowLine className="my-6" />

      {/* Current Step Highlight */}
      {active && (
        <Card padding="lg" glow className="mb-6 animate-fade-up">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="success">Etapa Atual</Badge>
            <span className="text-xs text-text-muted">Etapa {completed + 1} de {total}</span>
          </div>
          <h2 className="text-lg font-bold text-accent">{active.title}</h2>
          <p className="text-sm text-text-secondary mt-1">{active.description}</p>
          <Progress value={completed} max={total} label="Progresso geral" striped className="mt-4" />
        </Card>
      )}

      {/* Full Timeline */}
      <Card padding="lg" className="animate-fade-up">
        <h3 className="text-sm font-semibold text-text-primary mb-6">Todas as Etapas</h3>
        {mockStudentJourney.map((step, i) => (
          <TimelineStep
            key={step.id}
            title={step.title}
            description={step.description}
            status={step.status}
            isLast={i === mockStudentJourney.length - 1}
          />
        ))}
      </Card>
    </div>
  );
}
