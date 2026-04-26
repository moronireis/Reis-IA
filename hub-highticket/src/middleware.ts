import { defineMiddleware } from 'astro:middleware';
import { findDemoAccountByToken } from './lib/demo-accounts';
import { getRedirectByRole } from './lib/auth';

const PUBLIC_PATHS = ['/login', '/api/auth/login', '/api/auth/logout'];

function parseCookies(header: string | null): Record<string, string> {
  if (!header) return {};
  return Object.fromEntries(
    header.split(';').map((c) => {
      const [key, ...val] = c.trim().split('=');
      return [key, val.join('=')];
    })
  );
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Allow public paths and static assets
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p)) || pathname.startsWith('/_') || pathname === '/') {
    return next();
  }

  // Check session cookie
  const cookies = parseCookies(context.request.headers.get('cookie'));
  const sessionToken = cookies['ht-session'];

  if (!sessionToken) {
    return context.redirect('/login');
  }

  // Demo account lookup
  const demo = findDemoAccountByToken(sessionToken);
  if (!demo) {
    return context.redirect('/login');
  }

  const user = demo.user;

  // Role-based access control
  if (pathname.startsWith('/admin') && user.role === 'student') {
    return context.redirect('/aluno');
  }
  if (pathname.startsWith('/aluno') && user.role === 'expert') {
    return context.redirect('/admin');
  }

  // Store user in locals
  context.locals.user = user;
  context.locals.session = { user: { id: user.id } } as any;

  return next();
});
