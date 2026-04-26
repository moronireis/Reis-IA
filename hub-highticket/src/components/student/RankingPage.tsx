import { Card, Badge } from '../ui';
import Avatar from '../ui/Avatar';
import RankingItem from '../ui/RankingItem';
import GlowLine from '../vfx/GlowLine';
import { mockStudents } from '../../lib/mock-data';
import { formatCompactCurrency } from '../../lib/utils';

export default function RankingPage() {
  return (
    <div>
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold text-text-primary">Ranking</h1>
        <p className="text-sm text-text-secondary mt-1">Compare seu progresso com os outros alunos</p>
      </div>

      <GlowLine className="my-6" />

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 stagger-children">
        {mockStudents.slice(0, 3).map((s, i) => (
          <Card key={s.id} padding="lg" glow={i === 0} hover className={`animate-fade-up text-center ${i === 0 ? 'ring-1 ring-accent/20' : ''}`}>
            <div className="flex flex-col items-center">
              <span className={`text-2xl font-bold mb-2 ${i === 0 ? 'text-accent' : i === 1 ? 'text-text-primary' : 'text-text-secondary'}`}>
                #{i + 1}
              </span>
              <Avatar name={s.name} size="lg" />
              <h3 className="text-sm font-semibold text-text-primary mt-3">{s.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="success">Nível {s.level}</Badge>
              </div>
              <p className="text-lg font-bold text-accent mt-3">{formatCompactCurrency(s.revenue)}</p>
              <p className="text-[10px] text-text-muted">{s.points.toLocaleString('pt-BR')} pontos</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Full Ranking */}
      <Card padding="sm" className="animate-fade-up">
        <div className="px-3 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-text-primary">Ranking Completo</h3>
        </div>
        {mockStudents.map((s, i) => (
          <div key={s.id} className={i === 6 ? 'bg-accent/5 rounded-lg mx-1' : ''}>
            <RankingItem
              position={i + 1}
              name={i === 6 ? `${s.name} (Você)` : s.name}
              value={formatCompactCurrency(s.revenue)}
              subtitle={`Nível ${s.level} — ${s.points.toLocaleString('pt-BR')} pts`}
            />
          </div>
        ))}
      </Card>
    </div>
  );
}
