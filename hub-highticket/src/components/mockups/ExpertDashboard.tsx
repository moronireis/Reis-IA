import StatCard from '../ui/StatCard';
import Progress from '../ui/Progress';
import Badge from '../ui/Badge';
import RankingItem from '../ui/RankingItem';
import Card from '../ui/Card';
import Button from '../ui/Button';
import TimelineStep from '../ui/TimelineStep';
import Avatar from '../ui/Avatar';
import GlowOrb from '../vfx/GlowOrb';
import GlowLine from '../vfx/GlowLine';

const chartBars = [35, 52, 48, 72, 61, 85, 78, 92, 88, 95, 82, 68];
const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function MiniChart() {
  const max = Math.max(...chartBars);
  return (
    <div className="flex items-end gap-1.5 h-32">
      {chartBars.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t bg-gradient-to-t from-accent-dark to-accent hover:to-accent-light transition-all duration-300 relative group"
            style={{
              height: `${(v / max) * 100}%`,
              animationDelay: `${i * 60}ms`,
            }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              R${v}K
            </div>
          </div>
          <span className="text-[9px] text-text-muted">{months[i]}</span>
        </div>
      ))}
    </div>
  );
}

const recentSales = [
  { name: 'Maria Souza', plan: 'Scale', value: 'R$ 12.800', time: '2h atrás', status: 'confirmed' },
  { name: 'Pedro Lima', plan: 'Growth', value: 'R$ 7.500', time: '5h atrás', status: 'confirmed' },
  { name: 'Ana Costa', plan: 'Scale', value: 'R$ 12.800', time: '8h atrás', status: 'pending' },
  { name: 'Lucas Reis', plan: 'Starter', value: 'R$ 3.200', time: '1d atrás', status: 'confirmed' },
];

export default function ExpertDashboard() {
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
            { label: 'Dashboard', active: true },
            { label: 'Comercial' },
            { label: 'Alunos', badge: '156' },
            { label: 'Jornada' },
            { label: 'Ações', badge: '3' },
            { label: 'Financeiro' },
            { label: 'Configurações' },
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
            <Avatar name="Moroni Reis" size="sm" />
            <div>
              <p className="text-xs font-medium text-text-primary">Moroni Reis</p>
              <p className="text-[10px] text-text-muted">Expert</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <GlowOrb size={300} top="-5%" left="60%" opacity={0.06} />
        <GlowOrb size={200} top="50%" left="10%" opacity={0.04} delay={2} />

        {/* Top Bar */}
        <header className="h-14 px-6 flex items-center justify-between border-b border-border bg-surface-0/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-text-muted">Hub HT</span>
            <span className="text-text-muted">/</span>
            <span className="text-text-primary font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="success">Ativo</Badge>
            <span className="text-xs text-text-muted">Abr 2026</span>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Welcome */}
          <div className="animate-fade-up">
            <h1 className="text-2xl font-bold text-text-primary">
              Bom dia, <span className="text-accent">Moroni</span>
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Seu hub está com <span className="text-accent font-medium">156 alunos ativos</span> e R$ 847K em faturamento.
            </p>
          </div>

          <GlowLine />

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4 stagger-children">
            <StatCard
              label="Faturamento Total"
              value="R$ 847K"
              change={{ value: '12.5%', positive: true }}
              className="animate-fade-up"
            />
            <StatCard
              label="Alunos Ativos"
              value="156"
              change={{ value: '+8', positive: true }}
              className="animate-fade-up"
            />
            <StatCard
              label="Ticket Médio"
              value="R$ 5.430"
              change={{ value: '3.2%', positive: false }}
              className="animate-fade-up"
            />
            <StatCard
              label="A Receber (30d)"
              value="R$ 124K"
              glow
              className="animate-fade-up"
            />
          </div>

          {/* Chart + Ranking Row */}
          <div className="grid grid-cols-3 gap-4">
            {/* Chart */}
            <Card padding="lg" className="col-span-2 animate-fade-up">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">Faturamento Mensal</h3>
                  <p className="text-xs text-text-muted mt-0.5">Evolução 2026</p>
                </div>
                <div className="flex gap-1">
                  {['7d', '30d', '90d', 'Ano'].map((f, i) => (
                    <button
                      key={f}
                      className={`px-2.5 py-1 text-xs rounded cursor-pointer transition-all ${
                        i === 3
                          ? 'bg-accent/15 text-accent font-medium'
                          : 'text-text-muted hover:text-text-secondary hover:bg-surface-2'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <MiniChart />
            </Card>

            {/* Top Closers */}
            <Card padding="sm" className="animate-fade-left">
              <div className="px-3 py-3 border-b border-border">
                <h3 className="text-sm font-semibold text-text-primary">Top Closers</h3>
                <p className="text-[10px] text-text-muted">Ranking mensal</p>
              </div>
              <RankingItem position={1} name="Ana Silva" value="R$ 124K" subtitle="32 vendas | 68%" />
              <RankingItem position={2} name="Bruno Costa" value="R$ 98K" subtitle="26 vendas | 61%" />
              <RankingItem position={3} name="Carlos Dias" value="R$ 67K" subtitle="18 vendas | 52%" />
              <RankingItem position={4} name="Diana Lima" value="R$ 45K" subtitle="12 vendas | 48%" />
            </Card>
          </div>

          {/* Recent Sales + Journey Row */}
          <div className="grid grid-cols-3 gap-4">
            {/* Recent Sales */}
            <Card padding="sm" className="col-span-2 animate-fade-up">
              <div className="px-3 py-3 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">Vendas Recentes</h3>
                  <p className="text-[10px] text-text-muted">Últimas 24h</p>
                </div>
                <Button variant="ghost" size="sm">Ver todas</Button>
              </div>
              {recentSales.map((sale, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-3 border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
                  <Avatar name={sale.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary font-medium">{sale.name}</p>
                    <p className="text-[10px] text-text-muted">{sale.plan} — {sale.time}</p>
                  </div>
                  <span className="text-sm font-semibold text-accent">{sale.value}</span>
                  <Badge variant={sale.status === 'confirmed' ? 'success' : 'warning'}>
                    {sale.status === 'confirmed' ? 'Pago' : 'Pendente'}
                  </Badge>
                </div>
              ))}
            </Card>

            {/* Journey Progress */}
            <Card padding="lg" className="animate-fade-left">
              <h3 className="text-sm font-semibold text-text-primary mb-1">Jornada Expert</h3>
              <p className="text-[10px] text-text-muted mb-4">Progresso geral</p>
              <Progress value={65} label="Concluído" striped className="mb-6" />
              <TimelineStep title="Estrutura definida" status="completed" />
              <TimelineStep title="Time comercial montado" status="completed" />
              <TimelineStep title="Funil otimizado" status="active" />
              <TimelineStep title="Escala e automação" status="pending" isLast />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
