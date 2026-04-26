import type { UserRole } from './database.types';

interface DemoAccount {
  email: string;
  password: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar: string | null;
    created_at: string;
  };
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: 'admin',
    password: 'admin',
    user: {
      id: 'demo-expert-001',
      name: 'Moroni Reis',
      email: 'admin',
      role: 'expert',
      avatar: null,
      created_at: '2026-01-01T00:00:00Z',
    },
  },
  {
    email: 'aluno',
    password: 'aluno',
    user: {
      id: 'demo-student-001',
      name: 'Rafael Santos',
      email: 'aluno',
      role: 'student',
      avatar: null,
      created_at: '2026-03-01T00:00:00Z',
    },
  },
];

export function findDemoAccount(email: string, password: string) {
  return DEMO_ACCOUNTS.find((a) => a.email === email && a.password === password) || null;
}

export function findDemoAccountByToken(token: string) {
  return DEMO_ACCOUNTS.find((a) => a.user.id === token) || null;
}
