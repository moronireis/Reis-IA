const COOKIE_NAME = 'castelo_auth';
const PASSWORD = import.meta.env.CHAT_PASSWORD || process.env.CHAT_PASSWORD || 'castelo2024';
const TOKEN = 'castelo_authenticated_session';

export function isAuthenticated(request: Request): boolean {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [k, ...v] = c.trim().split('=');
      return [k, v.join('=')];
    })
  );
  return cookies[COOKIE_NAME] === TOKEN;
}

export function validatePassword(password: string): boolean {
  return password === PASSWORD;
}

export function getAuthCookie(): string {
  return `${COOKIE_NAME}=${TOKEN}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`;
}

export function clearAuthCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
