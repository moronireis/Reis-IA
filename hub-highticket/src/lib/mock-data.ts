// Mock data for all pages until Supabase is connected

export const mockStats = {
  valorInvestido: 185_000,
  faturamentoTotal: 847_000,
  qtdAlunos: 156,
  ticketMedio: 5_430,
  aReceber30d: 124_000,
  totalAReceber: 312_000,
  inadimplencia: 4.2,
};

export const mockRevenueChart = [
  { month: 'Jan', value: 35_000 },
  { month: 'Fev', value: 52_000 },
  { month: 'Mar', value: 48_000 },
  { month: 'Abr', value: 72_000 },
  { month: 'Mai', value: 61_000 },
  { month: 'Jun', value: 85_000 },
  { month: 'Jul', value: 78_000 },
  { month: 'Ago', value: 92_000 },
  { month: 'Set', value: 88_000 },
  { month: 'Out', value: 95_000 },
  { month: 'Nov', value: 82_000 },
  { month: 'Dez', value: 68_000 },
];

export const mockClosers = [
  { id: '1', name: 'Ana Silva', avatar: null, sales: 32, revenue: 124_000, calls: 47, conversion: 68 },
  { id: '2', name: 'Bruno Costa', avatar: null, sales: 26, revenue: 98_000, calls: 43, conversion: 61 },
  { id: '3', name: 'Carlos Dias', avatar: null, sales: 18, revenue: 67_000, calls: 35, conversion: 52 },
  { id: '4', name: 'Diana Lima', avatar: null, sales: 12, revenue: 45_000, calls: 25, conversion: 48 },
];

export const mockCloserReviews = [
  {
    closerId: '1',
    hits: 'Excelente rapport, domina objeções de preço, follow-up consistente',
    misses: 'Demora no primeiro contato após lead entrar',
    blindSpots: 'Não identifica upsell quando o lead tem budget maior',
    improvements: 'Criar script de qualificação de budget nos primeiros 2 minutos',
  },
  {
    closerId: '2',
    hits: 'Rápido no primeiro contato, bom com leads frios',
    misses: 'Taxa de no-show acima da média, perde urgência',
    blindSpots: 'Aceita "vou pensar" sem puxar compromisso',
    improvements: 'Implementar técnica de compromisso antes de desligar',
  },
];

export const mockRecentSales = [
  { id: '1', studentName: 'Maria Souza', plan: 'Scale', amount: 12_800, closerName: 'Ana Silva', date: '2026-04-06T10:30:00', status: 'confirmed' as const },
  { id: '2', studentName: 'Pedro Lima', plan: 'Growth', amount: 7_500, closerName: 'Bruno Costa', date: '2026-04-06T07:15:00', status: 'confirmed' as const },
  { id: '3', studentName: 'Ana Costa', plan: 'Scale', amount: 12_800, closerName: 'Ana Silva', date: '2026-04-06T04:00:00', status: 'pending' as const },
  { id: '4', studentName: 'Lucas Reis', plan: 'Starter', amount: 3_200, closerName: 'Carlos Dias', date: '2026-04-05T16:00:00', status: 'confirmed' as const },
  { id: '5', studentName: 'Juliana Mendes', plan: 'Growth', amount: 7_500, closerName: 'Diana Lima', date: '2026-04-05T11:00:00', status: 'confirmed' as const },
];

export const mockExpertJourney = [
  { id: '1', title: 'Definir estrutura', description: 'Organizar oferta, ticket e modelo de negócio', status: 'completed' as const },
  { id: '2', title: 'Montar time comercial', description: 'Recrutar e treinar closers', status: 'completed' as const },
  { id: '3', title: 'Otimizar funil', description: 'Páginas, criativos, automações', status: 'active' as const },
  { id: '4', title: 'Escalar operação', description: 'Automação, processos e multiplicação', status: 'pending' as const },
];

export const mockActions = [
  { id: '1', title: 'Criar VSL de apresentação', description: 'Vídeo de 15min para página de vendas', how: 'Gravar com teleprompter, editar no CapCut', dueDate: '2026-04-10', status: 'todo' as const, assignedTo: 'Moroni Reis' },
  { id: '2', title: 'Revisar script dos closers', description: 'Analisar últimas 10 calls e atualizar script', how: 'Ouvir gravações, anotar padrões, reescrever', dueDate: '2026-04-08', status: 'in_progress' as const, assignedTo: 'Ana Silva' },
  { id: '3', title: 'Configurar automação de email', description: 'Sequence de boas-vindas para novos alunos', how: 'Montar 5 emails no ActiveCampaign', dueDate: '2026-04-12', status: 'todo' as const, assignedTo: 'Moroni Reis' },
  { id: '4', title: 'Lançar campanha Meta Ads', description: 'Campanha de conversão para página de captura', how: 'Criar 3 criativos, configurar público, definir budget R$100/dia', dueDate: '2026-04-07', status: 'in_progress' as const, assignedTo: 'Bruno Costa' },
  { id: '5', title: 'Criar onboarding do aluno', description: 'Documento com passo a passo pós-compra', how: 'Escrever checklist + gravar vídeo de boas-vindas', dueDate: '2026-04-15', status: 'done' as const, assignedTo: 'Moroni Reis' },
  { id: '6', title: 'Treinar novo closer', description: 'Onboarding completo do Carlos', how: 'Shadowing 5 calls + role-play + feedback', dueDate: '2026-04-09', status: 'done' as const, assignedTo: 'Ana Silva' },
];

export const mockStudents = [
  { id: '1', name: 'Júlia Martins', level: 5, points: 2_840, revenue: 89_000 },
  { id: '2', name: 'Diego Alves', level: 5, points: 2_560, revenue: 72_000 },
  { id: '3', name: 'Camila Torres', level: 4, points: 1_920, revenue: 54_000 },
  { id: '4', name: 'Thiago Nunes', level: 4, points: 1_780, revenue: 48_000 },
  { id: '5', name: 'Larissa Souza', level: 3, points: 1_450, revenue: 36_000 },
  { id: '6', name: 'Mateus Oliveira', level: 3, points: 1_320, revenue: 31_000 },
  { id: '7', name: 'Rafael Santos', level: 3, points: 1_240, revenue: 28_000 },
  { id: '8', name: 'Fernanda Cruz', level: 2, points: 980, revenue: 18_000 },
];

export const mockStudentChecklist = [
  { id: '1', title: 'Definir ICP e persona', category: 'Fundação', completed: true },
  { id: '2', title: 'Criar Grand Slam Offer', category: 'Fundação', completed: true },
  { id: '3', title: 'Montar página de captura', category: 'Funil', completed: true },
  { id: '4', title: 'Configurar email welcome sequence', category: 'Funil', completed: false },
  { id: '5', title: 'Instalar pixel Meta + Google', category: 'Tráfego', completed: false },
  { id: '6', title: 'Criar 3 criativos de anúncio', category: 'Tráfego', completed: false },
  { id: '7', title: 'Lançar primeira campanha', category: 'Tráfego', completed: false },
];

export const mockStudentJourney = [
  { id: '1', title: 'Onboarding', description: 'Questionário e chamada de boas-vindas', status: 'completed' as const },
  { id: '2', title: 'Fundação do Negócio', description: 'ICP, oferta, posicionamento', status: 'completed' as const },
  { id: '3', title: 'Funil de Vendas', description: 'Páginas, emails, automação', status: 'completed' as const },
  { id: '4', title: 'Tráfego Pago', description: 'Meta Ads + Google Ads', status: 'active' as const },
  { id: '5', title: 'Otimização', description: 'Métricas, testes, ajustes', status: 'pending' as const },
  { id: '6', title: 'Escala', description: 'Time, processos, multiplicação', status: 'pending' as const },
];
