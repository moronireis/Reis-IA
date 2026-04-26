import { useState } from 'react';
import { StatCard, Card, Badge, Progress, TimelineStep, Button } from '../ui';
import Avatar from '../ui/Avatar';
import RankingItem from '../ui/RankingItem';
import GlowOrb from '../vfx/GlowOrb';
import GlowLine from '../vfx/GlowLine';
import { mockStats, mockRevenueChart, mockClosers, mockRecentSales, mockExpertJourney } from '../../lib/mock-data';
import { formatCompactCurrency, formatRelativeTime } from '../../lib/utils';

type Period = '7d' | '30d' | '90d' | 'all';

function RevenueChart() {
  const max = Math.max(...mockRevenueChart.map((d) => d.value));
  return (
    <div className="flex items-end gap-1.5 h-36">
      {mockRevenueChart.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t bg-gradient-to-t from-accent-dark to-accent hover:to-accent-light transition-all duration-300 relative group cursor-pointer"
            style={{ height: `${(d.value / max) * 100}%` }}
          >
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">
              {formatCompactCurrency(d.value)}
            </div>
          </div>
          <span className="text-[9px] text-text-muted">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

export default function ExpertDashboardPage({ userName = 'Expert' }: { userName?: string }) {
  const [period, setPeriod] = useState<Period>('all');

  return (
    <div className="relative">
      <GlowOrb size={300} top="-10%" left="60%" opacity={0.04} />

      {/* Welcome */}
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold text-text-primary">
          Bom dia, <span className="text-accent">{userName}</span>
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Seu hub está com <span className="text-accent font-medium">{mockStats.qtdAlunos} alunos ativos</span> e {formatCompactCurrency(mockStats.faturamentoTotal)} em faturamento.
        </p>
      </div>

      <GlowLine className="my-6" />

      {/* Row 1: Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <StatCard label="Valor Investido" value={formatCompactCurrency(mockStats.valorInvestido)} className="animate-fade-up" />
        <StatCard label="Faturamento Total" value={formatCompactCurrency(mockStats.faturamentoTotal)} change={{ value: '12.5%', positive: true }} className="animate-fade-up" />
        <StatCard label="Qtd Alunos" value={String(mockStats.qtdAlunos)} change={{ value: '+8', positive: true }} className="animate-fade-up" />
        <StatCard label="Ticket Médio" value={formatCompactCurrency(mockStats.ticketMedio)} change={{ value: '3.2%', positive: false }} className="animate-fade-up" />
      </div>

      {/* Row 2: Financial Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 stagger-children">
        <StatCard label="A Receber (30d)" value={formatCompactCurrency(mockStats.aReceber30d)} glow className="animate-fade-up" />
        <StatCard label="Total a Receber" value={formatCompactCurrency(mockStats.totalAReceber)} className="animate-fade-up" />
        <StatCard label="Inadimplência" value={`${mockStats.inadimplencia}%`} className="animate-fade-up" />
      </div>

      {/* Row 3: Chart + Top Closers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <Card padding="lg" className="lg:col-span-2 animate-fade-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Faturamento Mensal</h3>
              <p className="text-xs text-text-muted mt-0.5">Evolução 2026</p>
            </div>
            <div className="flex gap-1">
              {(['7d', '30d', '90d', 'all'] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-2.5 py-1 text-xs rounded cursor-pointer transition-all ${
                    period === p
                      ? 'bg-accent/15 text-accent font-medium'
                      : 'text-text-muted hover:text-text-secondary hover:bg-surface-2'
                  }`}
                >
                  {p === 'all' ? 'Ano' : p}
                </button>
              ))}
            </div>
          </div>
          <RevenueChart />
        </Card>

        <Card padding="sm" className="animate-fade-left">
          <div className="px-3 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-text-primary">Top Closers</h3>
            <p className="text-[10px] text-text-muted">Ranking mensal</p>
          </div>
          {mockClosers.map((c, i) => (
            <RankingItem
              key={c.id}
              position={i + 1}
              name={c.name}
              value={formatCompactCurrency(c.revenue)}
              subtitle={`${c.sales} vendas | ${c.conversion}%`}
            />
          ))}
        </Card>
      </div>

      {/* Row 4: Recent Sales + Journey */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <Card padding="sm" className="lg:col-span-2 animate-fade-up">
          <div className="px-3 py-3 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Vendas Recentes</h3>
              <p className="text-[10px] text-text-muted">Últimas transações</p>
            </div>
            <Button variant="ghost" size="sm">Ver todas</Button>
          </div>
          {mockRecentSales.map((sale) => (
            <div key={sale.id} className="flex items-center gap-3 px-3 py-3 border-b border-border last:border-0 hover:bg-surface-2 transition-colors flex-wrap sm:flex-nowrap">
              <Avatar name={sale.studentName} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary font-medium">{sale.studentName}</p>
                <p className="text-[10px] text-text-muted">{sale.plan} — {sale.closerName} — {formatRelativeTime(sale.date)}</p>
              </div>
              <span className="text-sm font-semibold text-accent">{formatCompactCurrency(sale.amount)}</span>
              <Badge variant={sale.status === 'confirmed' ? 'success' : 'warning'}>
                {sale.status === 'confirmed' ? 'Pago' : 'Pendente'}
              </Badge>
            </div>
          ))}
        </Card>

        <Card padding="lg" className="animate-fade-left">
          <h3 className="text-sm font-semibold text-text-primary mb-1">Jornada Expert</h3>
          <p className="text-[10px] text-text-muted mb-4">Progresso geral</p>
          <Progress value={65} label="Concluído" striped className="mb-6" />
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
      </div>
    </div>
  );
}
