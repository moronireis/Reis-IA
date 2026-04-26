import { useState } from 'react';
import { Card, Badge, Button } from '../ui';
import Avatar from '../ui/Avatar';
import GlowLine from '../vfx/GlowLine';

type TimeSlot = {
  id: string;
  date: string;
  time: string;
  available: boolean;
};

type PastSession = {
  id: string;
  date: string;
  duration: string;
  topic: string;
  notes: string;
};

const mockSlots: TimeSlot[] = [
  { id: 's1', date: '2026-04-08', time: '09:00', available: true },
  { id: 's2', date: '2026-04-08', time: '11:00', available: false },
  { id: 's3', date: '2026-04-09', time: '10:00', available: true },
  { id: 's4', date: '2026-04-10', time: '14:00', available: true },
  { id: 's5', date: '2026-04-11', time: '09:30', available: true },
  { id: 's6', date: '2026-04-11', time: '15:00', available: false },
];

const mockPastSessions: PastSession[] = [
  {
    id: 'p1',
    date: '2026-03-25',
    duration: '60min',
    topic: 'Revisão da oferta e precificação',
    notes: 'Ajustamos o ticket de R$5.000 para R$7.500. Próximo passo: atualizar a página de vendas.',
  },
  {
    id: 'p2',
    date: '2026-03-11',
    duration: '60min',
    topic: 'Diagnóstico inicial e plano de 90 dias',
    notes: 'Identificamos funil como prioridade. Meta: 5 leads qualificados por semana até abril.',
  },
  {
    id: 'p3',
    date: '2026-02-26',
    duration: '45min',
    topic: 'Onboarding — contexto do negócio',
    notes: 'Coleta de contexto completa. ICP definido: empreendedores com faturamento entre R$10K-R$50K/mês.',
  },
];

function weekdayLabel(dateStr: string): string {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const d = new Date(dateStr + 'T12:00:00');
  return days[d.getDay()];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

function SlotCard({
  slot,
  selected,
  onSelect,
}: {
  slot: TimeSlot;
  selected: boolean;
  onSelect: () => void;
}) {
  if (!slot.available) {
    return (
      <div className="flex flex-col items-center justify-center py-4 rounded-xl border border-border bg-surface-0 opacity-40">
        <span className="text-[10px] text-text-muted uppercase tracking-wider">{weekdayLabel(slot.date)}</span>
        <span className="text-sm font-medium text-text-muted mt-0.5">{formatDate(slot.date)}</span>
        <span className="text-lg font-bold text-text-muted mt-1">{slot.time}</span>
        <span className="text-[10px] text-text-muted mt-1.5">Ocupado</span>
      </div>
    );
  }

  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center justify-center py-4 rounded-xl border cursor-pointer transition-all ${
        selected
          ? 'border-accent bg-accent/10 text-accent'
          : 'border-border bg-surface-1 hover:border-accent/40 hover:bg-surface-2 text-text-primary'
      }`}
    >
      <span className={`text-[10px] uppercase tracking-wider ${selected ? 'text-accent/80' : 'text-text-muted'}`}>
        {weekdayLabel(slot.date)}
      </span>
      <span className={`text-sm font-medium mt-0.5 ${selected ? 'text-accent' : 'text-text-secondary'}`}>
        {formatDate(slot.date)}
      </span>
      <span className="text-lg font-bold mt-1">{slot.time}</span>
      <span className={`text-[10px] mt-1.5 ${selected ? 'text-accent/70' : 'text-text-muted'}`}>
        {selected ? 'Selecionado' : 'Disponível'}
      </span>
    </button>
  );
}

type ConfirmState = 'idle' | 'confirming' | 'confirmed';

export default function SessaoPage() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmState, setConfirmState] = useState<ConfirmState>('idle');

  const selected = mockSlots.find((s) => s.id === selectedSlot);

  function handleBook() {
    if (!selectedSlot) return;
    setConfirmState('confirming');
    setTimeout(() => setConfirmState('confirmed'), 1200);
  }

  function handleReset() {
    setSelectedSlot(null);
    setConfirmState('idle');
  }

  return (
    <div>
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold text-text-primary">Sessão Individual</h1>
        <p className="text-sm text-text-secondary mt-1">Agende uma sessão de 1h diretamente com o mentor</p>
      </div>

      <GlowLine className="my-6" />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-6">

          {/* How it works */}
          <Card padding="lg" className="animate-fade-up">
            <h2 className="text-sm font-semibold text-text-primary mb-4">Como funciona</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { step: '01', label: 'Escolha um horário', desc: 'Selecione um slot disponível nesta semana' },
                { step: '02', label: 'Confirme o agendamento', desc: 'Você recebe confirmação por e-mail' },
                { step: '03', label: 'Participe da sessão', desc: 'Acesse pelo link enviado no e-mail' },
              ].map((item) => (
                <div key={item.step} className="flex flex-col gap-2">
                  <span className="text-2xl font-bold text-accent/30">{item.step}</span>
                  <p className="text-sm font-medium text-text-primary">{item.label}</p>
                  <p className="text-xs text-text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Slot Picker */}
          <Card padding="lg" className="animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-text-primary">Horários disponíveis</h2>
              <Badge variant="info">Esta semana</Badge>
            </div>

            {confirmState === 'confirmed' ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10L8 14L16 6" stroke="#00E660" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-base font-semibold text-text-primary">Sessão agendada!</p>
                <p className="text-sm text-text-muted mt-1">
                  {selected && `${weekdayLabel(selected.date)}, ${formatDate(selected.date)} às ${selected.time}`}
                </p>
                <p className="text-xs text-text-muted mt-1">Você receberá a confirmação por e-mail.</p>
                <button
                  onClick={handleReset}
                  className="mt-4 text-xs text-accent hover:text-accent/80 transition-colors cursor-pointer"
                >
                  Agendar outra sessão
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                  {mockSlots.map((slot) => (
                    <SlotCard
                      key={slot.id}
                      slot={slot}
                      selected={selectedSlot === slot.id}
                      onSelect={() => slot.available && setSelectedSlot(slot.id)}
                    />
                  ))}
                </div>

                <Button
                  onClick={handleBook}
                  disabled={!selectedSlot || confirmState === 'confirming'}
                  className="w-full"
                >
                  {confirmState === 'confirming'
                    ? 'Confirmando...'
                    : selectedSlot
                    ? `Agendar — ${weekdayLabel(selected!.date)}, ${formatDate(selected!.date)} às ${selected!.time}`
                    : 'Selecione um horário'}
                </Button>
              </>
            )}
          </Card>

          {/* Past Sessions */}
          <Card padding="sm" className="animate-fade-up">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-sm font-semibold text-text-primary">Sessões Anteriores</h2>
            </div>
            {mockPastSessions.map((session) => (
              <div key={session.id} className="px-4 py-4 border-b border-border last:border-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{session.topic}</p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {new Date(session.date + 'T12:00:00').toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <Badge variant="default">{session.duration}</Badge>
                </div>
                <div className="bg-surface-2 rounded-lg p-3">
                  <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Anotações</p>
                  <p className="text-xs text-text-secondary">{session.notes}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Sidebar — Mentor Info */}
        <div className="space-y-4">
          <Card padding="lg" glow className="animate-fade-up">
            <div className="flex flex-col items-center text-center">
              <Avatar name="Moroni Reis" size="lg" />
              <h3 className="text-sm font-semibold text-text-primary mt-3">Moroni Reis</h3>
              <p className="text-xs text-text-muted mt-1">Especialista em Alto Ticket</p>
              <div className="w-full border-t border-border my-4" />
              <div className="w-full space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">Duração</span>
                  <span className="text-xs font-medium text-text-primary">60 minutos</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">Formato</span>
                  <span className="text-xs font-medium text-text-primary">Videochamada</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">Slots disponíveis</span>
                  <span className="text-xs font-medium text-accent">
                    {mockSlots.filter((s) => s.available).length} esta semana
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card padding="lg" className="animate-fade-up">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Prepare sua sessão</h3>
            <ul className="space-y-2">
              {[
                'Anote 2-3 dúvidas ou bloqueios antes de entrar',
                'Tenha métricas do seu negócio em mãos',
                'Acesse o link enviado por e-mail 5 min antes',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent text-xs mt-0.5 flex-shrink-0">—</span>
                  <span className="text-xs text-text-secondary">{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
