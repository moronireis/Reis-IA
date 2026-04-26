import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Progress from '../ui/Progress';
import Avatar from '../ui/Avatar';
import RankingItem from '../ui/RankingItem';
import ChecklistItem from '../ui/ChecklistItem';
import TimelineStep from '../ui/TimelineStep';
import GlowOrb from '../vfx/GlowOrb';
import GlowLine from '../vfx/GlowLine';

const journeySteps = [
  { title: 'Onboarding', desc: 'Questionário + chamada de boas-vindas', status: 'completed' as const },
  { title: 'Fundação do Negócio', desc: 'ICP, oferta, posicionamento', status: 'completed' as const },
  { title: 'Funil de Vendas', desc: 'Páginas, emails, automação', status: 'completed' as const },
  { title: 'Tráfego Pago', desc: 'Meta Ads + Google Ads', status: 'active' as const },
  { title: 'Otimização', desc: 'Métricas, testes, ajustes', status: 'pending' as const },
  { title: 'Escala', desc: 'Time, processos, multiplicação', status: 'pending' as const },
];

export default function StudentDashboard() {
  const [checks, setChecks] = useState([true, true, true, false, false, false, false]);

  const checklistItems = [
    { label: 'Definir ICP e persona', cat: 'Fundação' },
    { label: 'Criar Grand Slam Offer', cat: 'Fundação' },
    { label: 'Montar página de captura', cat: 'Funil' },
    { label: 'Configurar email welcome sequence', cat: 'Funil' },
    { label: 'Instalar pixel Meta + Google', cat: 'Tráfego' },
    { label: 'Criar 3 criativos de anúncio', cat: 'Tráfego' },
    { label: 'Lançar primeira campanha', cat: 'Tráfego' },
  ];

  const completedCount = checks.filter(Boolean).length;
  const totalCount = checks.length;

  return (
    <div className="flex h-screen bg-surface-0">
      {/* Sidebar */}
      <aside className="w-60 bg-surface-1 border-r border-border flex flex-col">
        <div className="h-14 px-5 flex items-center border-b border-border">
          <span className="text-sm font-bold tracking-wider">
            HUB <span className="text-accent">HT</span>
          </span>
        </div>
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {[
            { label: 'Meu Painel', active: true },
            { label: 'Checklist', badge: `${completedCount}/${totalCount}` },
            { label: 'Jornada' },
            { label: 'Ranking' },
            { label: 'Aulas' },
            { label: 'Sessão Individual' },
          ].map((item) => (
            <div
              key={item.label}
              className={`
                flex items-center justify-between px-3 py-2.5 rounded-lg text-sm
                ${item.active
                  ? 'bg-accent/10 text-accent font-medium'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                }
              `}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[10px] bg-accent/15 text-accent px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Avatar name="Rafael Santos" size="sm" />
            <div>
              <p className="text-xs font-medium text-text-primary">Rafael Santos</p>
              <p className="text-[10px] text-text-muted">Aluno — Nível 3</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto relative">
        <GlowOrb size={250} top="-5%" left="70%" opacity={0.05} />

        {/* Top Bar */}
        <header className="h-14 px-6 flex items-center justify-between border-b border-border bg-surface-0/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-text-muted">Hub HT</span>
            <span className="text-text-muted">/</span>
            <span className="text-text-primary font-medium">Meu Painel</span>
          </div>
          <Button size="sm">Sessão Individual</Button>
        </header>

        <div className="p-6 space-y-6">
          {/* Hero / Welcome */}
          <div className="animate-fade-up">
            <div className="flex items-center gap-4">
              <Avatar name="Rafael Santos" size="xl" />
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  Rafael Santos
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="success">Level 3</Badge>
                  <span className="text-sm text-text-secondary">1.240 pontos</span>
                  <span className="text-xs text-text-muted">— Top 12%</span>
                </div>
              </div>
            </div>
          </div>

          <GlowLine />

          {/* Level Progress */}
          <Card padding="lg" glow className="animate-fade-up">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Progresso Level 4</h3>
                <p className="text-[10px] text-text-muted">Faltam 260 pontos</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-accent count-up">1.240</span>
                <span className="text-xs text-text-muted">/ 1.500 pts</span>
              </div>
            </div>
            <Progress value={1240} max={1500} showPercent={false} size="lg" striped />
          </Card>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 stagger-children">
            <Card className="animate-fade-up text-center py-6">
              <p className="text-3xl font-bold text-accent count-up">#7</p>
              <p className="text-xs text-text-secondary mt-1">Posição no Ranking</p>
              <p className="text-[10px] text-text-muted">de 156 alunos</p>
            </Card>
            <Card className="animate-fade-up text-center py-6">
              <p className="text-3xl font-bold text-text-primary count-up">R$ 28K</p>
              <p className="text-xs text-text-secondary mt-1">Faturamento Acumulado</p>
              <p className="text-[10px] text-success">+R$ 8K este mês</p>
            </Card>
            <Card className="animate-fade-up text-center py-6">
              <p className="text-3xl font-bold text-text-primary count-up">67%</p>
              <p className="text-xs text-text-secondary mt-1">Jornada Concluída</p>
              <p className="text-[10px] text-text-muted">4 de 6 etapas</p>
            </Card>
          </div>

          {/* Ranking + Checklist + Journey */}
          <div className="grid grid-cols-3 gap-4">
            {/* Ranking */}
            <Card padding="sm" className="animate-fade-up">
              <div className="px-3 py-3 border-b border-border">
                <h3 className="text-sm font-semibold text-text-primary">Ranking Alunos</h3>
                <p className="text-[10px] text-text-muted">Top performers</p>
              </div>
              <RankingItem position={1} name="Julia Martins" value="R$ 89K" subtitle="Level 5" />
              <RankingItem position={2} name="Diego Alves" value="R$ 72K" subtitle="Level 5" />
              <RankingItem position={3} name="Camila Torres" value="R$ 54K" subtitle="Level 4" />
              <div className="mx-3 my-2 h-px bg-border" />
              <div className="flex items-center gap-3 px-4 py-3 bg-accent/5 rounded-lg mx-1 mb-1">
                <span className="w-6 text-center text-sm text-accent font-bold">7</span>
                <Avatar name="Rafael Santos" size="sm" />
                <div className="flex-1">
                  <span className="text-sm font-medium text-accent">Você</span>
                </div>
                <span className="text-sm font-semibold text-accent">R$ 28K</span>
              </div>
            </Card>

            {/* Checklist */}
            <Card padding="sm" className="animate-fade-up">
              <div className="px-3 py-3 border-b border-border">
                <h3 className="text-sm font-semibold text-text-primary">Checklist</h3>
                <Progress value={completedCount} max={totalCount} size="sm" className="mt-2" />
              </div>
              {checklistItems.map((item, i) => (
                <ChecklistItem
                  key={i}
                  label={item.label}
                  checked={checks[i]}
                  category={item.cat}
                  onChange={(v) => {
                    const next = [...checks];
                    next[i] = v;
                    setChecks(next);
                  }}
                />
              ))}
            </Card>

            {/* Journey */}
            <Card padding="lg" className="animate-fade-left">
              <h3 className="text-sm font-semibold text-text-primary mb-1">Minha Jornada</h3>
              <p className="text-[10px] text-text-muted mb-4">Etapas da mentoria</p>
              {journeySteps.map((step, i) => (
                <TimelineStep
                  key={i}
                  title={step.title}
                  description={step.desc}
                  status={step.status}
                  isLast={i === journeySteps.length - 1}
                />
              ))}
            </Card>
          </div>

          {/* Quick Access */}
          <div className="grid grid-cols-3 gap-4 stagger-children">
            {[
              { label: 'Acessar Aulas', desc: 'Conteúdo da mentoria no Hotmart', cta: 'Abrir Hotmart' },
              { label: 'Sessão Individual', desc: 'Sessão individual com o expert', cta: 'Escolher horário' },
              { label: 'Comunidade', desc: 'Grupo exclusivo de alunos', cta: 'Entrar no grupo' },
            ].map((card) => (
              <Card key={card.label} hover padding="lg" className="animate-fade-up">
                <h4 className="text-sm font-semibold text-text-primary">{card.label}</h4>
                <p className="text-xs text-text-muted mt-1 mb-4">{card.desc}</p>
                <Button variant="secondary" size="sm" className="w-full">{card.cta}</Button>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
