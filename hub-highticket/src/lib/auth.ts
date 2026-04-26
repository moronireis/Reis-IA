import { supabase } from './supabase';
import type { UserRole } from './database.types';

export async function getSession(cookieHeader: string | null) {
  if (!cookieHeader) return null;

  // Extract access token from cookies
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [key, ...val] = c.trim().split('=');
      return [key, val.join('=')];
    })
  );

  const accessToken = cookies['sb-access-token'];
  const refreshToken = cookies['sb-refresh-token'];

  if (!accessToken) return null;

  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken || '',
  });

  if (error || !data.session) return null;

  return data.session;
}

export async function getUserWithRole(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !data) return null;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message };
  return { session: data.session, user: data.user };
}

export async function signOut() {
  await supabase.auth.signOut();
}

export function getRedirectByRole(role: UserRole): string {
  switch (role) {
    case 'expert':
      return '/admin';
    case 'closer':
      return '/admin/comercial';
    case 'student':
      return '/aluno';
    default:
      return '/login';
  }
}
