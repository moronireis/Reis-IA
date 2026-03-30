export type UserRole = 'starter' | 'builder' | 'mentoria' | 'admin';

const ROLE_LEVEL: Record<UserRole, number> = {
  starter: 1,
  builder: 2,
  mentoria: 3,
  admin: 4,
};

export function hasAccess(userRole: UserRole, requiredRole: UserRole): boolean {
  return (ROLE_LEVEL[userRole] || 0) >= (ROLE_LEVEL[requiredRole] || 0);
}

export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    starter: 'Starter',
    builder: 'Builder',
    mentoria: 'Mentoria',
    admin: 'Admin',
  };
  return labels[role] || role;
}
