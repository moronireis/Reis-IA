import { useState } from 'react';
import { Card, Badge, Progress } from '../ui';
import GlowLine from '../vfx/GlowLine';

type Lesson = {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
};

type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  tag: string;
};

const mockModules: Module[] = [
  {
    id: 'm1',
    title: 'Fundação do Negócio',
    description: 'Posicionamento, ICP e criação da oferta irresistível de alto ticket',
    tag: 'Obrigatório',
    lessons: [
      { id: 'l1', title: 'Introdução ao High Ticket', duration: '18min', completed: true },
      { id: 'l2', title: 'Definindo seu ICP', duration: '24min', completed: true },
      { id: 'l3', title: 'Grand Slam Offer — Criando sua oferta', duration: '31min', completed: true },
      { id: 'l4', title: 'Precificação estratégica', duration: '21min', completed: false },
    ],
  },
  {
    id: 'm2',
    title: 'Funil de Vendas',
    description: 'Páginas de captura, VSL, sequência de e-mails e automações',
    tag: 'Obrigatório',
    lessons: [
      { id: 'l5', title: 'Estrutura do funil high ticket', duration: '27min', completed: true },
      { id: 'l6', title: 'Criando a página de captura', duration: '34min', completed: false },
      { id: 'l7', title: 'VSL — Script e gravação', duration: '42min', completed: false },
      { id: 'l8', title: 'Automação de e-mails', duration: '29min', completed: false },
    ],
  },
  {
    id: 'm3',
    title: 'Tráfego Pago',
    description: 'Meta Ads e Google Ads para atrair leads qualificados de forma previsível',
    tag: 'Avançado',
    lessons: [
      { id: 'l9', title: 'Fundamentos de tráfego pago', duration: '22min', completed: false },
      { id: 'l10', title: 'Configurando Meta Ads', duration: '38min', completed: false },
      { id: 'l11', title: 'Criativos que convertem', duration: '26min', completed: false },
    ],
  },
  {
    id: 'm4',
    title: 'Processo Comercial',
    description: 'Script de vendas, gestão de objeções e como fechar sem pressão',
    tag: 'Avançado',
    lessons: [
      { id: 'l12', title: 'O processo de venda consultiva', duration: '33min', completed: false },
      { id: 'l13', title: 'Script — da abordagem ao fechamento', duration: '45min', completed: false },
      { id: 'l14', title: 'Objeções mais comuns e como superar', duration: '28min', completed: false },
      { id: 'l15', title: 'CRM e pipeline de vendas', duration: '19min', completed: false },
    ],
  },
];

const tagVariant: Record<string, 'success' | 'info'> = {
  Obrigatório: 'success',
  Avançado: 'info',
};

function LessonRow({ lesson }: { lesson: Lesson }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-surface-2 transition-colors cursor-pointer group`}
    >
      {/* Completion circle */}
      <div
        className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border transition-colors ${
          lesson.completed
            ? 'bg-accent border-accent'
            : 'border-border group-hover:border-accent/40'
        }`}
      >
        {lesson.completed && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      <span className={`text-sm flex-1 ${lesson.completed ? 'text-text-muted line-through' : 'text-text-primary'}`}>
        {lesson.title}
      </span>

      <div className="flex items-center gap-3">
        <span className="text-xs text-text-muted">{lesson.duration}</span>
        {!lesson.completed && (
          <button className="text-xs text-accent hover:text-accent/80 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer">
            Assistir
          </button>
        )}
      </div>
    </div>
  );
}

function ModuleCard({ module }: { module: Module }) {
  const [expanded, setExpanded] = useState(false);
  const completed = module.lessons.filter((l) => l.completed).length;
  const total = module.lessons.length;
  const percent = Math.round((completed / total) * 100);

  return (
    <Card padding="sm" className="animate-fade-up">
      {/* Module Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-4 text-left cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-text-primary">{module.title}</h3>
              <Badge variant={tagVariant[module.tag]}>{module.tag}</Badge>
            </div>
            <p className="text-xs text-text-muted">{module.description}</p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-right">
              <p className="text-xs text-text-muted">{completed}/{total} aulas</p>
              <p className={`text-sm font-semibold ${percent === 100 ? 'text-accent' : 'text-text-secondary'}`}>
                {percent}%
              </p>
            </div>

            {/* Chevron */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`text-text-muted transition-transform ${expanded ? 'rotate-180' : ''}`}
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <Progress value={completed} max={total} size="sm" showPercent={false} />
        </div>
      </button>

      {/* Lessons List */}
      {expanded && (
        <div className="border-t border-border">
          {module.lessons.map((lesson) => (
            <LessonRow key={lesson.id} lesson={lesson} />
          ))}
        </div>
      )}
    </Card>
  );
}

export default function AulasPage() {
  const totalLessons = mockModules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = mockModules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  );

  return (
    <div>
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold text-text-primary">Aulas</h1>
        <p className="text-sm text-text-secondary mt-1">Todo o conteúdo da sua mentoria em um só lugar</p>
      </div>

      <GlowLine className="my-6" />

      {/* Overall Progress */}
      <Card padding="lg" glow className="mb-6 animate-fade-up">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Progresso Geral</h3>
            <p className="text-xs text-text-muted mt-0.5">{completedLessons} de {totalLessons} aulas concluídas</p>
          </div>
          <span className="text-2xl font-bold text-accent">
            {Math.round((completedLessons / totalLessons) * 100)}%
          </span>
        </div>
        <Progress value={completedLessons} max={totalLessons} size="lg" striped />
      </Card>

      {/* Modules Grid */}
      <div className="space-y-3 stagger-children">
        {mockModules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
