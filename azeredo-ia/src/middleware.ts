import { defineMiddleware } from 'astro:middleware';
import { createClient } from '@supabase/supabase-js';

// /api/webhook: chamado pelo UazapiGO (sem sessão) — o handler valida o
// token da instância. Sem essa exceção o middleware redirecionava o webhook
// para /login e nenhuma mensagem inbound era gravada.
const PUBLIC_PATHS = ['/login', '/api/auth/login', '/api/auth/logout', '/api/webhook'];

// #18: gating de PÁGINA por papel (APIs revalidam com requireRole/requireAdmin).
// Papéis: admin (tudo) | operacional | vendedor | gerencia.
// /processos saiu do menu (#16) — rota permanece só para admin.
const PAGE_ROLES: [string, string[]][] = [
  ['/config',      ['operacional']],
  ['/ferramentas', ['operacional']],
  ['/metricas',    ['gerencia']],
  ['/processos',   []],
];

function pageAllowed(pathname: string, role: string): boolean {
  if (role === 'admin') return true;
  for (const [prefix, roles] of PAGE_ROLES) {
    if (pathname === prefix || pathname.startsWith(prefix + '/')) return roles.includes(role);
  }
  return true;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Allow public paths through without auth check
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    return next();
  }

  // Worker de disparo (self-chain servidor→servidor, sem cookie de sessão) e
  // tick do chatbot (#7 — cron GitHub Actions). O handler revalida o header —
  // aqui só liberamos a passagem.
  // trim(): o valor da env no Vercel pode ter newline no final.
  const workerKey = (import.meta.env.WEBHOOK_KEY || '').trim();
  const isWorkerPath =
    (pathname.startsWith('/api/campaigns/') && pathname.endsWith('/process')) ||
    pathname === '/api/bot/tick';
  if (
    workerKey && isWorkerPath &&
    context.request.headers.get('x-worker-key') === workerKey
  ) {
    return next();
  }

  const accessToken = context.cookies.get('sb-access-token')?.value;
  const refreshToken = context.cookies.get('sb-refresh-token')?.value;

  if (!accessToken) {
    return context.redirect('/login');
  }

  try {
    const sb = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );

    const { data: { user }, error } = await sb.auth.getUser(accessToken);

    if (error || !user) {
      // Try refresh if we have a refresh token
      if (refreshToken) {
        const { data: refreshData, error: refreshError } = await sb.auth.refreshSession({
          refresh_token: refreshToken,
        });
        if (refreshError || !refreshData.session) {
          context.cookies.delete('sb-access-token', { path: '/' });
          context.cookies.delete('sb-refresh-token', { path: '/' });
          return context.redirect('/login');
        }
        // Update cookies with refreshed tokens
        const maxAge = 60 * 60 * 24 * 30;
        context.cookies.set('sb-access-token', refreshData.session.access_token, {
          path: '/', httpOnly: true, secure: import.meta.env.PROD, sameSite: 'lax', maxAge,
        });
        context.cookies.set('sb-refresh-token', refreshData.session.refresh_token, {
          path: '/', httpOnly: true, secure: import.meta.env.PROD, sameSite: 'lax', maxAge,
        });

        // Fetch profile with new token
        const sbAdmin = createClient(
          import.meta.env.PUBLIC_SUPABASE_URL,
          import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
          { auth: { persistSession: false } }
        );
        const { data: profile } = await sbAdmin
          .from('az_profiles')
          .select('id, email, full_name, role')
          .eq('id', refreshData.user!.id)
          .single();

        const prof = profile || { id: refreshData.user!.id, role: 'vendedor' };
        (context.locals as any).profile = prof;
        if (!pathname.startsWith('/api/') && !pageAllowed(pathname, prof.role)) {
          return context.redirect('/disparos');
        }
        return next();
      }

      context.cookies.delete('sb-access-token', { path: '/' });
      context.cookies.delete('sb-refresh-token', { path: '/' });
      return context.redirect('/login');
    }

    // Fetch profile from az_profiles
    const sbAdmin = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );
    const { data: profile } = await sbAdmin
      .from('az_profiles')
      .select('id, email, full_name, role')
      .eq('id', user.id)
      .single();

    const prof = profile || { id: user.id, role: 'vendedor' };
    (context.locals as any).profile = prof;
    if (!pathname.startsWith('/api/') && !pageAllowed(pathname, prof.role)) {
      return context.redirect('/disparos');
    }
    return next();
  } catch {
    return context.redirect('/login');
  }
});
