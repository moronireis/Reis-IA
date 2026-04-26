import { Card, Badge, Progress, Button } from '../ui';
import Avatar from '../ui/Avatar';
import RankingItem from '../ui/RankingItem';
import TimelineStep from '../ui/TimelineStep';
import GlowLine from '../vfx/GlowLine';
import GlowOrb from '../vfx/GlowOrb';
import { mockStudents, mockStudentJourney } from '../../lib/mock-data';
import { formatCompactCurrency } from '../../lib/utils';

export default function StudentDashboardPage({ userName = 'Aluno' }: { userName?: string }) {
  // Mock: current student is #7
  const currentStudent = mockStudents[6];
  const completedSteps = mockStudentJourney.filter((s) => s.status === 'completed').length;
  const totalSteps = mockStudentJourney.length;
  const journeyPercent = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="relative">
      <GlowOrb size={250} top="-5%" left="70%" opacity={0.04} />

      {/* Hero */}
      <div className="animate-fade-up">
        <div className="flex items-center gap-4 flex-wrap">
          <Avatar name={userName} size="xl" />
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{userName}</h1>
            <div className="flex items-center flex-wrap gap-2 mt-1">
              <Badge variant="success">Nível {currentStudent.level}</Badge>
              <span className="text-sm text-text-secondary">{currentStudent.points.toLocaleString('pt-BR')} pontos</span>
              <span className="text-xs text-text-muted">— Top 12%</span>
            </div>
          </div>
        </div>
      </div>

      <GlowLine className="my-6" />

      {/* Level Progress */}
      <Card padding="lg" glow className="animate-fade-up mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Progresso Nível {currentStudent.level + 1}</h3>
            <p className="text-[10px] text-text-muted">Faltam {1500 - currentStudent.points} pontos</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-accent count-up">{currentStudent.points.toLocaleString('pt-BR')}</span>
            <span className="text-xs text-text-muted">/ 1.500 pts</span>
          </div>
        </div>
        <Progress value={currentStudent.points} max={1500} showPercent={false} size="lg" striped />
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 stagger-children">
        <Card className="animate-fade-up text-center py-6">
          <p className="text-3xl font-bold text-accent count-up">#7</p>
          <p className="text-xs text-text-secondary mt-1">Posição no Ranking</p>
          <p className="text-[10px] text-text-muted">de {mockStudents.length * 19} alunos</p>
        </Card>
        <Card className="animate-fade-up text-center py-6">
          <p className="text-3xl font-bold text-text-primary count-up">{formatCompactCurrency(currentStudent.revenue)}</p>
          <p className="text-xs text-text-secondary mt-1">Faturamento Acumulado</p>
          <p className="text-[10px] text-success">+R$ 8K este mês</p>
        </Card>
        <Card className="animate-fade-up text-center py-6">
          <p className="text-3xl font-bold text-text-primary count-up">{journeyPercent}%</p>
          <p className="text-xs text-text-secondary mt-1">Jornada Concluída</p>
          <p className="text-[10px] text-text-muted">{completedSteps} de {totalSteps} etapas</p>
        </Card>
      </div>

      {/* Ranking + Journey */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card padding="sm" className="animate-fade-up">
          <div className="px-3 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-text-primary">Ranking Alunos</h3>
            <p className="text-[10px] text-text-muted">Top performers</p>
          </div>
          {mockStudents.slice(0, 5).map((s, i) => (
            <RankingItem key={s.id} position={i + 1} name={s.name} value={formatCompactCurrency(s.revenue)} subtitle={`Nível ${s.level}`} />
          ))}
          <div className="mx-3 my-2 h-px bg-border" />
          <div className="flex items-center gap-3 px-4 py-3 bg-accent/5 rounded-lg mx-1 mb-1">
            <span className="w-6 text-center text-sm text-accent font-bold">7</span>
            <Avatar name={userName} size="sm" />
            <div className="flex-1"><span className="text-sm font-medium text-accent">Você</span></div>
            <span className="text-sm font-semibold text-accent">{formatCompactCurrency(currentStudent.revenue)}</span>
          </div>
        </Card>

        <Card padding="lg" className="animate-fade-left">
          <h3 className="text-sm font-semibold text-text-primary mb-1">Minha Jornada</h3>
          <p className="text-[10px] text-text-muted mb-4">Etapas da mentoria</p>
          {mockStudentJourney.map((step, i) => (
            <TimelineStep key={step.id} title={step.title} description={step.description} status={step.status} isLast={i === mockStudentJourney.length - 1} />
          ))}
        </Card>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger-children">
        {[
          { label: 'Acessar Aulas', desc: 'Conteúdo da mentoria no Hotmart', cta: 'Abrir Hotmart', href: '#' },
          { label: 'Sessão Individual', desc: 'Sessão individual com o expert', cta: 'Escolher horário', href: '#' },
          { label: 'Comunidade', desc: 'Grupo exclusivo de alunos', cta: 'Entrar no grupo', href: '#' },
        ].map((card) => (
          <Card key={card.label} hover padding="lg" className="animate-fade-up">
            <h4 className="text-sm font-semibold text-text-primary">{card.label}</h4>
            <p className="text-xs text-text-muted mt-1 mb-4">{card.desc}</p>
            <Button variant="secondary" size="sm" className="w-full">{card.cta}</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
