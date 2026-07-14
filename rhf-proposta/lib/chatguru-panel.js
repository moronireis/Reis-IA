/**
 * ChatGuru Panel client — módulo "Arquivos" (repositório com tags).
 *
 * A API REST oficial do ChatGuru (api/v1) NÃO expõe o módulo Arquivos —
 * confirmado por probe (todas as ações "ação inválida"). O módulo só é
 * acessível pelas rotas internas do painel, autenticadas por cookie de sessão.
 *
 * Fluxo (engenharia reversa do painel s18, 2026-07-14):
 *   1. POST /login            (email + password) → cookie `session` (HttpOnly)
 *   2. POST /user_upload_files (multipart: attachment, send_or_save, chat_id)
 *        - send_or_save='save', chat_id='0'  → salva no repositório global
 *        - send_or_save='send', chat_id=<id> → envia dentro da conversa da pessoa
 *   3. GET  /attachments/search               → lista (para achar o id novo)
 *   4. POST /attachments/{id}/edit_tags       (urlencoded: tags=a,b,c)
 *   5. GET  /attachments/{id}/delete          → remove
 *
 * Credenciais: CHATGURU_PANEL_EMAIL / CHATGURU_PANEL_PASSWORD (env, nunca no git).
 */

const PANEL_BASE = process.env.CHATGURU_PANEL_BASE || 'https://s18.chatguru.app';
const SESSION_TTL_MS = 15 * 60 * 1000; // re-login a cada 15min

// Cache do cookie em memória de módulo (dura enquanto o container Vercel está quente)
let _session = { cookie: null, ts: 0 };

function clean(v) { return String(v || '').trim(); }

/**
 * Autentica no painel e retorna o cookie de sessão (string "session=...").
 * @param {boolean} force - ignora o cache e re-loga
 */
export async function panelLogin(force = false) {
  if (!force && _session.cookie && (Date.now() - _session.ts) < SESSION_TTL_MS) {
    return _session.cookie;
  }
  const email = clean(process.env.CHATGURU_PANEL_EMAIL);
  const password = clean(process.env.CHATGURU_PANEL_PASSWORD);
  if (!email || !password) {
    throw new Error('CHATGURU_PANEL_EMAIL / CHATGURU_PANEL_PASSWORD não configuradas.');
  }

  const body = new URLSearchParams({ email, password, browser_session: '' }).toString();
  const res = await fetch(`${PANEL_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    redirect: 'manual',
  });

  // Sucesso = 302 para /home (senha errada re-renderiza /login, 200)
  const location = res.headers.get('location') || '';
  const setCookies = typeof res.headers.getSetCookie === 'function'
    ? res.headers.getSetCookie()
    : [res.headers.get('set-cookie')].filter(Boolean);
  const sessionCookie = setCookies
    .map(c => (c || '').split(';')[0])
    .find(c => /^session=/.test(c));

  if (!sessionCookie || !/\/home/.test(location)) {
    throw new Error(`Login no ChatGuru falhou (status ${res.status}${location ? ', redir ' + location : ''}). Verifique as credenciais / 2FA.`);
  }

  _session = { cookie: sessionCookie, ts: Date.now() };
  return sessionCookie;
}

async function panelFetch(path, opts = {}, retry = true) {
  const cookie = await panelLogin();
  const res = await fetch(`${PANEL_BASE}${path}`, {
    ...opts,
    headers: { ...(opts.headers || {}), Cookie: cookie },
    redirect: 'manual',
  });
  // Sessão expirou → o painel redireciona para /login. Re-loga uma vez.
  const loc = res.headers.get('location') || '';
  if ((res.status === 302 || res.status === 301) && /\/login/.test(loc) && retry) {
    await panelLogin(true);
    return panelFetch(path, opts, false);
  }
  return res;
}

/**
 * Sobe um PDF no módulo Arquivos do ChatGuru.
 * @param {Buffer} buffer
 * @param {string} fileName - nome exibido no repositório (padrão RHF)
 * @param {object} [opts]
 * @param {string[]} [opts.tags] - tags a aplicar (organização do Rodrigo)
 * @param {string} [opts.chatId] - se informado + mode='send', envia na conversa
 * @param {'save'|'send'} [opts.mode='save']
 * @returns {Promise<{ ok: true, id: string|null, name: string }>}
 */
export async function uploadToArquivos(buffer, fileName, opts = {}) {
  const { tags = [], chatId = '0', mode = 'save' } = opts;
  if (!Buffer.isBuffer(buffer) || buffer.length < 512) throw new Error('PDF inválido ou vazio.');
  if (buffer.length > 15 * 1024 * 1024) throw new Error('Arquivo acima de 15MB (limite do ChatGuru).');

  const safeName = clean(fileName).replace(/[\r\n"]/g, '').slice(0, 180) || 'curriculo.pdf';

  const fd = new FormData();
  fd.append('attachment', new Blob([buffer], { type: 'application/pdf' }), safeName);
  fd.append('send_or_save', mode);
  fd.append('chat_id', String(chatId || '0'));

  const up = await panelFetch('/user_upload_files', { method: 'POST', body: fd });
  const upText = await up.text();
  if (!up.ok || !/ok/i.test(upText)) {
    throw new Error(`Upload no ChatGuru falhou (status ${up.status}): ${upText.slice(0, 120)}`);
  }

  // Descobre o id do arquivo recém-criado (search vem por data desc) para aplicar tags
  let id = null;
  try {
    const sr = await panelFetch('/attachments/search', { method: 'GET' });
    if (sr.ok) {
      const data = await sr.json();
      const match = (data.attachments || []).find(a =>
        clean(a.original_name) === safeName || clean(a.name).includes(safeName.replace(/\.pdf$/i, '')));
      id = match?._id?.$oid || null;
      if (id && tags.length > 0) {
        const cleanTags = tags.map(t => clean(t)).filter(Boolean).join(',');
        if (cleanTags) {
          await panelFetch(`/attachments/${id}/edit_tags`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ tags: cleanTags }).toString(),
          });
        }
      }
    }
  } catch (err) {
    // Upload já funcionou; falha nas tags/id não invalida a entrega
    console.warn('[chatguru-panel] tag/id step failed:', err.message);
  }

  return { ok: true, id, name: safeName };
}

/** Remove um arquivo do repositório (usado em testes/limpeza). */
export async function deleteArquivo(id) {
  const res = await panelFetch(`/attachments/${clean(id)}/delete`, { method: 'GET' });
  return res.ok;
}
