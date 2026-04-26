import { useState } from 'react';
import {
  Button, Input, Select, Textarea, Card, Badge, Avatar, AvatarGroup,
  Table, Modal, Tabs, Progress, Tooltip, Dropdown, StatCard,
  RankingItem, ChecklistItem, TimelineStep,
} from './ui';
import Skeleton, { SkeletonCard, SkeletonRow } from './ui/Skeleton';
import Spinner, { DotLoader } from './ui/Spinner';
import GlowOrb from './vfx/GlowOrb';
import GridPattern from './vfx/GridPattern';
import GlowLine from './vfx/GlowLine';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-xl font-semibold text-text-primary mb-1">{title}</h2>
      <div className="w-12 h-0.5 bg-accent mb-6 rounded-full" />
      {children}
    </section>
  );
}

export default function DesignSystemPreview() {
  const [modalOpen, setModalOpen] = useState(false);
  const [checks, setChecks] = useState([true, false, false, true]);

  return (
    <div className="relative min-h-screen">
      <GridPattern className="fixed" />
      <GlowOrb size={400} top="-10%" left="50%" opacity={0.06} />
      <GlowOrb size={250} top="40%" left="5%" opacity={0.04} delay={3} />
      <GlowOrb size={300} top="70%" left="80%" opacity={0.05} delay={5} />

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="mb-20 animate-fade-up">
          <h1 className="text-4xl font-bold text-shimmer mb-3">
            HUB HT — Design System
          </h1>
          <p className="text-text-secondary text-lg">
            Fase 1 — Tokens, componentes, animações e VFX
          </p>
          <GlowLine className="mt-6" />

          {/* Mockup Links */}
          <div className="flex gap-3 mt-6">
            <a href="/mockups/expert">
              <Button variant="primary" size="lg">Ver Mockup Expert</Button>
            </a>
            <a href="/mockups/aluno">
              <Button variant="secondary" size="lg">Ver Mockup Aluno</Button>
            </a>
          </div>
        </div>

        {/* COLORS */}
        <Section title="Colors — Deeper Dark">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: 'surface-0', bg: 'bg-surface-0', hex: '#050505', border: true },
              { name: 'surface-1', bg: 'bg-surface-1', hex: '#0A0A0A' },
              { name: 'surface-2', bg: 'bg-surface-2', hex: '#0F0F0F' },
              { name: 'surface-3', bg: 'bg-surface-3', hex: '#161616' },
              { name: 'surface-4', bg: 'bg-surface-4', hex: '#1C1C1C' },
              { name: 'border', bg: 'bg-border', hex: '#1E1E1E' },
              { name: 'accent', bg: 'bg-accent', hex: '#00E660' },
              { name: 'accent-light', bg: 'bg-accent-light', hex: '#33FF85' },
              { name: 'accent-dark', bg: 'bg-accent-dark', hex: '#00B84D' },
              { name: 'success', bg: 'bg-success', hex: '#00E660' },
              { name: 'warning', bg: 'bg-warning', hex: '#FFB020' },
              { name: 'danger', bg: 'bg-danger', hex: '#FF4D4D' },
              { name: 'info', bg: 'bg-info', hex: '#4D94FF' },
            ].map((c) => (
              <div key={c.name} className="flex flex-col gap-1.5 group">
                <div
                  className={`h-16 rounded-lg ${c.bg} ${c.border ? 'border border-border' : ''} transition-transform duration-300 group-hover:scale-105`}
                />
                <span className="text-xs text-text-muted">{c.name}</span>
                <span className="text-[10px] text-text-muted/60">{c.hex}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* TYPOGRAPHY */}
        <Section title="Typography">
          <div className="space-y-3">
            <p className="text-4xl font-bold text-text-primary">Heading 4XL Bold</p>
            <p className="text-3xl font-semibold text-text-primary">Heading 3XL Semibold</p>
            <p className="text-2xl font-semibold text-text-primary">Heading 2XL Semibold</p>
            <p className="text-xl font-medium text-text-primary">Heading XL Medium</p>
            <p className="text-lg text-text-primary">Body Large</p>
            <p className="text-base text-text-secondary">Body Base — secondary text</p>
            <p className="text-sm text-text-muted">Small — muted text</p>
            <p className="text-xs text-text-muted">Extra Small — captions</p>
            <GlowLine className="my-4" />
            <p className="text-2xl font-bold text-shimmer">Text Shimmer Effect</p>
          </div>
        </Section>

        {/* BUTTONS */}
        <Section title="Buttons">
          <div className="flex flex-wrap gap-3 mb-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Section>

        {/* FORM CONTROLS */}
        <Section title="Form Controls">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            <Input label="Nome" placeholder="Digite seu nome" />
            <Input label="Email" placeholder="email@exemplo.com" error="Email inválido" />
            <Select
              label="Plano"
              options={[
                { value: '', label: 'Selecione...' },
                { value: 'starter', label: 'Starter' },
                { value: 'growth', label: 'Growth' },
                { value: 'scale', label: 'Scale' },
              ]}
            />
            <Textarea label="Observações" placeholder="Notas opcionais..." />
          </div>
        </Section>

        {/* CARDS */}
        <Section title="Cards">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card padding="sm">
              <p className="text-sm text-text-secondary">Basic card</p>
            </Card>
            <Card hover>
              <p className="text-sm text-text-secondary">Hover card with glow effect</p>
            </Card>
            <Card hover glow padding="lg">
              <p className="text-sm text-text-secondary">Animated border glow</p>
            </Card>
          </div>
        </Section>

        {/* BADGES */}
        <Section title="Badges">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </Section>

        {/* AVATARS */}
        <Section title="Avatars">
          <div className="flex items-center gap-4 mb-4">
            <Avatar name="Moroni Reis" size="sm" />
            <Avatar name="Moroni Reis" size="md" />
            <Avatar name="Moroni Reis" size="lg" />
            <Avatar name="Moroni Reis" size="xl" />
          </div>
          <AvatarGroup
            avatars={[
              { name: 'Ana Silva' }, { name: 'Bruno Costa' }, { name: 'Carlos Dias' },
              { name: 'Diana Lima' }, { name: 'Eduardo' }, { name: 'Fernanda' },
            ]}
            max={4}
          />
        </Section>

        {/* STAT CARDS */}
        <Section title="Stat Cards">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
            <StatCard label="Faturamento Total" value="R$ 847K" change={{ value: '12.5%', positive: true }} className="animate-fade-up" />
            <StatCard label="Alunos Ativos" value="156" change={{ value: '+8', positive: true }} className="animate-fade-up" />
            <StatCard label="Ticket Médio" value="R$ 5.430" change={{ value: '3.2%', positive: false }} className="animate-fade-up" />
            <StatCard label="Inadimplência" value="4.2%" glow className="animate-fade-up" />
          </div>
        </Section>

        {/* TABLE */}
        <Section title="Table">
          <Table
            columns={[
              { key: 'name', header: 'Nome' },
              { key: 'role', header: 'Role' },
              { key: 'revenue', header: 'Receita', align: 'right' },
              {
                key: 'status', header: 'Status',
                render: (row) => (
                  <Badge variant={row.status === 'Ativo' ? 'success' : 'warning'}>
                    {row.status as string}
                  </Badge>
                ),
              },
            ]}
            data={[
              { id: '1', name: 'Ana Silva', role: 'Closer', revenue: 'R$ 124K', status: 'Ativo' },
              { id: '2', name: 'Bruno Costa', role: 'Closer', revenue: 'R$ 98K', status: 'Ativo' },
              { id: '3', name: 'Carlos Dias', role: 'Closer', revenue: 'R$ 67K', status: 'Pendente' },
            ]}
            keyExtractor={(row) => row.id as string}
          />
        </Section>

        {/* PROGRESS */}
        <Section title="Progress">
          <div className="space-y-5 max-w-md">
            <Progress value={75} label="Default" size="sm" />
            <Progress value={45} label="Animated + Striped" striped />
            <Progress value={90} label="Large" size="lg" striped />
          </div>
        </Section>

        {/* TABS */}
        <Section title="Tabs">
          <Tabs
            tabs={[
              { id: 'overview', label: 'Visão Geral', content: <p className="text-sm text-text-secondary">Conteúdo da aba visão geral</p> },
              { id: 'metrics', label: 'Métricas', content: <p className="text-sm text-text-secondary">Conteúdo da aba métricas</p> },
              { id: 'team', label: 'Time', content: <p className="text-sm text-text-secondary">Conteudo da aba time</p> },
            ]}
          />
        </Section>

        {/* TOOLTIP & DROPDOWN */}
        <Section title="Tooltip & Dropdown">
          <div className="flex items-center gap-6">
            <Tooltip content="Isso é um tooltip">
              <Button variant="secondary">Hover me</Button>
            </Tooltip>
            <Dropdown
              trigger={<Button variant="secondary">Menu</Button>}
              items={[
                { id: 'edit', label: 'Editar', onClick: () => {} },
                { id: 'copy', label: 'Duplicar', onClick: () => {} },
                { id: 'delete', label: 'Excluir', danger: true, onClick: () => {} },
              ]}
            />
          </div>
        </Section>

        {/* MODAL */}
        <Section title="Modal">
          <Button onClick={() => setModalOpen(true)}>Abrir Modal</Button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Confirmar ação">
            <p className="text-sm text-text-secondary mb-4">
              Tem certeza que deseja continuar com esta ação?
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
              <Button onClick={() => setModalOpen(false)}>Confirmar</Button>
            </div>
          </Modal>
        </Section>

        {/* RANKING */}
        <Section title="Ranking">
          <Card padding="sm" className="max-w-md">
            <RankingItem position={1} name="Ana Silva" value="R$ 124K" subtitle="32 vendas" />
            <RankingItem position={2} name="Bruno Costa" value="R$ 98K" subtitle="26 vendas" />
            <RankingItem position={3} name="Carlos Dias" value="R$ 67K" subtitle="18 vendas" />
            <RankingItem position={4} name="Diana Lima" value="R$ 45K" subtitle="12 vendas" />
          </Card>
        </Section>

        {/* CHECKLIST */}
        <Section title="Checklist">
          <Card padding="sm" className="max-w-md">
            {['Definir ICP e persona principal', 'Configurar funil de vendas', 'Gravar VSL', 'Lançar campanha'].map((label, i) => (
              <ChecklistItem
                key={i}
                label={label}
                checked={checks[i]}
                onChange={(v) => { const n = [...checks]; n[i] = v; setChecks(n); }}
                category={i < 2 ? 'Fundação' : 'Execução'}
              />
            ))}
          </Card>
        </Section>

        {/* TIMELINE */}
        <Section title="Timeline / Journey">
          <div className="max-w-md">
            <TimelineStep title="Onboarding completo" description="Questionário e chamada inicial" status="completed" />
            <TimelineStep title="Funil configurado" description="Páginas, emails e automações" status="completed" />
            <TimelineStep title="Campanha ativa" description="Meta Ads rodando" status="active" />
            <TimelineStep title="Otimização" description="Ajustes baseados em dados" status="pending" />
            <TimelineStep title="Escala" description="Aumentar investimento e time" status="pending" isLast />
          </div>
        </Section>

        {/* VFX & ANIMATIONS */}
        <Section title="VFX & Animations">
          <div className="space-y-8">
            {/* Glow Effects */}
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-3">Glow Effects</h3>
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg bg-surface-2 border border-accent/20 animate-glow-pulse" />
                <div className="w-20 h-20 rounded-lg bg-surface-2 border border-border animate-border-glow" />
                <div className="w-20 h-20 rounded-full bg-accent/10 animate-glow-breathe flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                </div>
                <div className="w-20 h-20 rounded-lg bg-surface-2 border border-border glow-ring flex items-center justify-center text-xs text-text-muted">
                  Hover
                </div>
              </div>
            </div>

            {/* Entrance Animations */}
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-3">Entrance Animations</h3>
              <div className="flex gap-4 stagger-children">
                {['fade-up', 'fade-down', 'fade-left', 'scale-in'].map((anim) => (
                  <div
                    key={anim}
                    className={`px-4 py-3 rounded-lg bg-surface-2 border border-border text-xs text-text-secondary animate-${anim}`}
                  >
                    {anim}
                  </div>
                ))}
              </div>
            </div>

            {/* Float */}
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-3">Float & Orbit</h3>
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 rounded-full bg-accent/15 border border-accent/20 animate-float flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-surface-2 border border-border animate-float-slow" />
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-accent/30" />
                  </div>
                  <div className="animate-orbit">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                </div>
              </div>
            </div>

            {/* Glow Line */}
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-3">Glow Line Divider</h3>
              <GlowLine />
            </div>
          </div>
        </Section>

        {/* LOADING STATES */}
        <Section title="Loading States">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-text-secondary">Skeleton Cards</h3>
              <SkeletonCard />
              <SkeletonCard />
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-text-secondary">Skeleton Rows</h3>
              <Card padding="sm">
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </Card>
            </div>
          </div>
          <div className="flex items-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span className="text-xs text-text-muted">Small</span>
            </div>
            <div className="flex items-center gap-2">
              <Spinner size="md" />
              <span className="text-xs text-text-muted">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <Spinner size="lg" />
              <span className="text-xs text-text-muted">Large</span>
            </div>
            <div className="flex items-center gap-2">
              <DotLoader />
              <span className="text-xs text-text-muted">Dots</span>
            </div>
          </div>
        </Section>

        {/* SPACING & RADIUS */}
        <Section title="Spacing & Radius">
          <div className="flex flex-wrap gap-4">
            {[
              { r: 'rounded-sm', label: 'sm (6px)' },
              { r: 'rounded-md', label: 'md (8px)' },
              { r: 'rounded-lg', label: 'lg (12px)' },
              { r: 'rounded-xl', label: 'xl (16px)' },
              { r: 'rounded-full', label: 'full' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div className={`w-16 h-16 bg-accent/15 border border-accent/20 ${item.r}`} />
                <span className="text-xs text-text-muted">{item.label}</span>
              </div>
            ))}
          </div>
        </Section>

        <footer className="pt-8 border-t border-border text-center">
          <p className="text-sm text-text-muted">
            HUB HT Design System — Fase 1 Completa
          </p>
          <div className="flex justify-center gap-4 mt-3">
            <a href="/mockups/expert" className="text-xs text-accent hover:underline">Expert Mockup</a>
            <a href="/mockups/aluno" className="text-xs text-accent hover:underline">Aluno Mockup</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
