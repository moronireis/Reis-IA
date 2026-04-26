import { useState } from 'react';
import { Card, Badge, Tabs } from '../ui';
import StatCard from '../ui/StatCard';
import GlowLine from '../vfx/GlowLine';
import { mockClosers, mockRevenueChart } from '../../lib/mock-data';
import { formatCompactCurrency } from '../../lib/utils';

function MetricRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-text-secondary">{label}</span>
      <div className="text-right">
        <span className="text-sm font-semibold text-text-primary">{value}</span>
        {sub && <p className="text-[10px] text-text-muted">{sub}</p>}
      </div>
    </div>
  );
}

function CloserMetrics() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Calls" value="150" change={{ value: '+12', positive: true }} />
        <StatCard label="Vendas" value="88" />
        <StatCard label="Conversão Geral" value="58.7%" />
        <StatCard label="Ticket Médio" value="R$ 7.650" />
      </div>
      <Card padding="sm">
        <div className="px-3 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-text-primary">Detalhamento por Closer</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-3 py-2 text-text-secondary font-medium">Closer</th>
                <th className="text-right px-3 py-2 text-text-secondary font-medium">Calls</th>
                <th className="text-right px-3 py-2 text-text-secondary font-medium">Vendas</th>
                <th className="text-right px-3 py-2 text-text-secondary font-medium">Conv.</th>
                <th className="text-right px-3 py-2 text-text-secondary font-medium">Receita</th>
              </tr>
            </thead>
            <tbody>
              {mockClosers.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
                  <td className="px-3 py-2.5 text-text-primary font-medium">{c.name}</td>
                  <td className="text-right px-3 py-2.5 text-text-secondary">{c.calls}</td>
                  <td className="text-right px-3 py-2.5 text-text-secondary">{c.sales}</td>
                  <td className="text-right px-3 py-2.5">
                    <Badge variant={c.conversion >= 60 ? 'success' : c.conversion >= 50 ? 'warning' : 'danger'}>
                      {c.conversion}%
                    </Badge>
                  </td>
                  <td className="text-right px-3 py-2.5 text-accent font-semibold">{formatCompactCurrency(c.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function SHTMetrics() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Alunos SHT" value="42" />
        <StatCard label="Receita SHT" value="R$ 378K" />
        <StatCard label="Ticket Médio SHT" value="R$ 9.000" />
      </div>
      <Card padding="md">
        <MetricRow label="Total de inscrições" value="42" />
        <MetricRow label="Renovações" value="18" sub="42.8% de retenção" />
        <MetricRow label="Cancelamentos" value="3" sub="7.1% churn" />
        <MetricRow label="Receita recorrente mensal" value="R$ 31.5K" />
      </Card>
    </div>
  );
}

function IMAMetrics() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card padding="lg">
          <h4 className="text-sm font-semibold text-text-primary mb-3">IMA Online</h4>
          <MetricRow label="Alunos" value="89" />
          <MetricRow label="Receita" value="R$ 267K" />
          <MetricRow label="Ticket Médio" value="R$ 3.000" />
          <MetricRow label="NPS" value="72" />
        </Card>
        <Card padding="lg">
          <h4 className="text-sm font-semibold text-text-primary mb-3">IMA Presencial</h4>
          <MetricRow label="Alunos" value="25" />
          <MetricRow label="Receita" value="R$ 200K" />
          <MetricRow label="Ticket Médio" value="R$ 8.000" />
          <MetricRow label="NPS" value="91" />
        </Card>
      </div>
    </div>
  );
}

function AdsMetrics() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card padding="lg">
          <div className="flex items-center gap-2 mb-4">
            <h4 className="text-sm font-semibold text-text-primary">Meta Ads</h4>
            <Badge variant="info">Integração pendente</Badge>
          </div>
          <MetricRow label="Impressões" value="—" />
          <MetricRow label="Cliques" value="—" />
          <MetricRow label="CPL" value="—" />
          <MetricRow label="Investimento" value="—" />
        </Card>
        <Card padding="lg">
          <div className="flex items-center gap-2 mb-4">
            <h4 className="text-sm font-semibold text-text-primary">Google Ads</h4>
            <Badge variant="info">Integração pendente</Badge>
          </div>
          <MetricRow label="Impressões" value="—" />
          <MetricRow label="Cliques" value="—" />
          <MetricRow label="CPL" value="—" />
          <MetricRow label="Investimento" value="—" />
        </Card>
      </div>
      <Card padding="lg">
        <div className="flex items-center gap-2 mb-4">
          <h4 className="text-sm font-semibold text-text-primary">Hotmart</h4>
          <Badge variant="info">Integração pendente</Badge>
        </div>
        <MetricRow label="Vendas totais" value="—" />
        <MetricRow label="Reembolsos" value="—" />
        <MetricRow label="Status pagamento" value="—" />
      </Card>
    </div>
  );
}

export default function FinanceiroPage() {
  return (
    <div>
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold text-text-primary">Métricas & Financeiro</h1>
        <p className="text-sm text-text-secondary mt-1">Visão completa de vendas, métricas e integrações</p>
      </div>

      <GlowLine className="my-6" />

      <Tabs
        tabs={[
          { id: 'closers', label: 'Vendas Individuais', content: <CloserMetrics /> },
          { id: 'sht', label: 'SHT', content: <SHTMetrics /> },
          { id: 'ima', label: 'IMA', content: <IMAMetrics /> },
          { id: 'ads', label: 'Integrações', content: <AdsMetrics /> },
        ]}
      />
    </div>
  );
}
