export type UserRole = 'starter' | 'journey' | 'builder' | 'mentoria' | 'admin';

const ROLE_LEVEL: Record<UserRole, number> = {
  starter: 1,
  journey: 2,
  builder: 3,
  mentoria: 4,
  admin: 5,
};

export function hasAccess(userRole: UserRole, requiredRole: UserRole): boolean {
  return (ROLE_LEVEL[userRole] || 0) >= (ROLE_LEVEL[requiredRole] || 0);
}

export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    starter: 'Starter',
    journey: 'Journey',
    builder: 'Builder',
    mentoria: 'Mentoria',
    admin: 'Admin',
  };
  return labels[role] || role;
}
