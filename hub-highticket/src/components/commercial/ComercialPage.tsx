import { useState } from 'react';
import { Card, Badge, Tabs, Progress, Button } from '../ui';
import Avatar from '../ui/Avatar';
import StatCard from '../ui/StatCard';
import RankingItem from '../ui/RankingItem';
import GlowLine from '../vfx/GlowLine';
import { mockClosers, mockCloserReviews } from '../../lib/mock-data';
import { formatCompactCurrency } from '../../lib/utils';

function CloserDetail({ closer }: { closer: typeof mockClosers[0] }) {
  const review = mockCloserReviews.find((r) => r.closerId === closer.id);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Calls" value={String(closer.calls)} />
        <StatCard label="Vendas" value={String(closer.sales)} />
        <StatCard label="Conversão" value={`${closer.conversion}%`} />
        <StatCard label="Receita" value={formatCompactCurrency(closer.revenue)} />
      </div>

      {review && (
        <Card padding="lg">
          <h4 className="text-sm font-semibold text-text-primary mb-4">Review de Performance</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Acertos', value: review.hits, color: 'text-success' },
              { label: 'Erros', value: review.misses, color: 'text-danger' },
              { label: 'Pontos Cegos', value: review.blindSpots, color: 'text-warning' },
              { label: 'Melhorias', value: review.improvements, color: 'text-info' },
            ].map((item) => (
              <div key={item.label}>
                <p className={`text-xs font-semibold ${item.color} mb-1`}>{item.label}</p>
                <p className="text-sm text-text-secondary">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

export default function ComercialPage() {
  const [selectedCloser, setSelectedCloser] = useState<string | null>(null);

  const totalSales = mockClosers.reduce((s, c) => s + c.sales, 0);
  const totalRevenue = mockClosers.reduce((s, c) => s + c.revenue, 0);
  const avgConversion = Math.round(mockClosers.reduce((s, c) => s + c.conversion, 0) / mockClosers.length);
  const best = mockClosers[0];
  const worst = mockClosers[mockClosers.length - 1];
  const gap = best.conversion - worst.conversion;

  const selected = mockClosers.find((c) => c.id === selectedCloser);

  return (
    <div>
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold text-text-primary">Time Comercial</h1>
        <p className="text-sm text-text-secondary mt-1">Performance dos closers e métricas de venda</p>
      </div>

      <GlowLine className="my-6" />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 stagger-children">
        <StatCard label="Total de Vendas" value={String(totalSales)} className="animate-fade-up" />
        <StatCard label="Receita Total" value={formatCompactCurrency(totalRevenue)} className="animate-fade-up" />
        <StatCard label="Conversão Média" value={`${avgConversion}%`} className="animate-fade-up" />
        <StatCard
          label="Gap (melhor vs pior)"
          value={`${gap}pp`}
          className="animate-fade-up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Ranking */}
        <Card padding="sm" className="animate-fade-up">
          <div className="px-3 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-text-primary">Ranking de Vendedores</h3>
            <p className="text-[10px] text-text-muted">Clique para ver detalhes</p>
          </div>
          {mockClosers.map((c, i) => (
            <div
              key={c.id}
              onClick={() => setSelectedCloser(c.id)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedCloser === c.id ? 'bg-accent/5' : ''
              }`}
            >
              <RankingItem
                position={i + 1}
                name={c.name}
                value={formatCompactCurrency(c.revenue)}
                subtitle={`${c.sales} vendas | ${c.conversion}% conv.`}
              />
            </div>
          ))}
        </Card>

        {/* Detail / Metrics */}
        <div className="lg:col-span-2 animate-fade-left">
          {selected ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Avatar name={selected.name} size="lg" />
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{selected.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="success">Ativo</Badge>
                    <span className="text-xs text-text-muted">Closer desde Jan 2026</span>
                  </div>
                </div>
              </div>
              <CloserDetail closer={selected} />
            </div>
          ) : (
            <Card padding="lg" className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-text-muted">Selecione um closer para ver os detalhes</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
