import { Card, Progress, Badge } from '../ui';
import TimelineStep from '../ui/TimelineStep';
import GlowLine from '../vfx/GlowLine';
import { mockExpertJourney } from '../../lib/mock-data';

const roadmapItems = [
  { phase: 'Fase 1', title: 'Design System', desc: 'Tokens, componentes, animações', done: true },
  { phase: 'Fase 2', title: 'Arquitetura', desc: 'Database, auth, scaffold', done: true },
  { phase: 'Fase 3', title: 'Expert View', desc: 'Dashboard, comercial, jornada, ações', done: false, active: true },
  { phase: 'Fase 4', title: 'Student View', desc: 'Painel do aluno, checklist, ranking', done: false },
  { phase: 'Fase 5', title: 'Métricas & APIs', desc: 'Integrações Meta, Google, Hotmart', done: false },
  { phase: 'Fase 6', title: 'Preview & Polish', desc: 'Responsivo, loading states, deploy', done: false },
];

export default function ExpertJourneyPage() {
  const completed = mockExpertJourney.filter((s) => s.status === 'completed').length;
  const total = mockExpertJourney.length;
  const percent = Math.round((completed / total) * 100);

  return (
    <div>
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold text-text-primary">Jornada Expert</h1>
        <p className="text-sm text-text-secondary mt-1">Acompanhe o progresso da sua mentoria</p>
      </div>

      <GlowLine className="my-6" />

      {/* Progress Overview */}
      <Card padding="lg" glow className="mb-6 animate-fade-up">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Progresso Geral</h3>
            <p className="text-xs text-text-muted">{completed} de {total} etapas concluídas</p>
          </div>
          <span className="text-2xl font-bold text-accent">{percent}%</span>
        </div>
        <Progress value={percent} showPercent={false} size="lg" striped />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Journey Timeline */}
        <Card padding="lg" className="animate-fade-up">
          <h3 className="text-sm font-semibold text-text-primary mb-1">Etapas da Jornada</h3>
          <p className="text-[10px] text-text-muted mb-6">Sua evolução como expert</p>
          {mockExpertJourney.map((step, i) => (
            <TimelineStep
              key={step.id}
              title={step.title}
              description={step.description}
              status={step.status}
              isLast={i === mockExpertJourney.length - 1}
            />
          ))}
        </Card>

        {/* Build Roadmap */}
        <Card padding="lg" className="animate-fade-left">
          <h3 className="text-sm font-semibold text-text-primary mb-1">Roadmap da Plataforma</h3>
          <p className="text-[10px] text-text-muted mb-6">O que está sendo construído</p>
          <div className="space-y-3">
            {roadmapItems.map((item) => (
              <div
                key={item.phase}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                  item.active
                    ? 'border-accent/30 bg-accent/5'
                    : item.done
                      ? 'border-border bg-surface-2'
                      : 'border-border bg-surface-1'
                }`}
              >
                <div className="mt-0.5">
                  {item.done ? (
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 6l2 2 4-4" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  ) : item.active ? (
                    <div className="w-5 h-5 rounded-full border-2 border-accent animate-glow-pulse flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-border bg-surface-2" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-text-muted font-medium">{item.phase}</span>
                    {item.active && <Badge variant="success">Em andamento</Badge>}
                    {item.done && <Badge>Concluída</Badge>}
                  </div>
                  <p className={`text-sm font-medium mt-0.5 ${item.active ? 'text-accent' : item.done ? 'text-text-secondary' : 'text-text-muted'}`}>
                    {item.title}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
