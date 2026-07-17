/**
 * Supabase REST API client — fetch-based, no npm dependency.
 * Uses process.env.SUPABASE_URL and process.env.SUPABASE_KEY.
 */

// Env vars no Vercel podem carregar \n/espaços no fim (lição 10/07: a URL pública
// do Storage saiu com newline embutida) — sempre sanitizar.
function cleanEnv(v) {
  return String(v || '').trim();
}

function getClient() {
  const url = cleanEnv(process.env.SUPABASE_URL);
  const key = cleanEnv(process.env.SUPABASE_KEY);
  if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_KEY env vars are required');
  return { url, key };
}

function headers(key, extras = {}) {
  return {
    'apikey': key,
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
    ...extras,
  };
}

/**
 * SELECT rows from a table.
 * @param {string} table - Table name
 * @param {string} query - Query string e.g. "phone=eq.5511...&order=created_at.desc&limit=50"
 * @returns {Promise<Array>}
 */
export async function select(table, query = '') {
  const { url, key } = getClient();
  const qs = query ? `?${query}` : '';
  const res = await fetch(`${url}/rest/v1/${table}${qs}`, {
    headers: headers(key),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`[supabase select ${table}] ${data?.message || res.status}`);
  return data;
}

/**
 * INSERT a row into a table.
 * @param {string} table - Table name
 * @param {object} data - Row data
 * @param {boolean} returning - Whether to return the inserted row (default: true)
 * @returns {Promise<Array|boolean>}
 */
export async function insert(table, data, returning = true) {
  const { url, key } = getClient();
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: headers(key, {
      'Prefer': returning ? 'return=representation' : 'return=minimal',
    }),
    body: JSON.stringify(data),
  });
  if (!returning) return res.ok;
  const body = await res.json();
  if (!res.ok) throw new Error(`[supabase insert ${table}] ${body?.message || res.status}`);
  return body;
}

/**
 * UPDATE rows in a table matching a filter.
 * @param {string} table - Table name
 * @param {string} query - PostgREST filter e.g. "id=eq.123"
 * @param {object} data - Fields to update
 * @returns {Promise<Array>}
 */
export async function update(table, query, data) {
  const { url, key } = getClient();
  const res = await fetch(`${url}/rest/v1/${table}?${query}`, {
    method: 'PATCH',
    headers: headers(key, { 'Prefer': 'return=representation' }),
    body: JSON.stringify(data),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`[supabase update ${table}] ${body?.message || res.status}`);
  return body;
}

/**
 * Upload a file to Supabase Storage and return its public URL.
 * Uses SUPABASE_SERVICE_KEY (storage writes need service role).
 * @param {string} bucket - Bucket name (must exist and be public)
 * @param {string} path - Object path inside the bucket (e.g. "cvs/abc.pdf")
 * @param {Buffer} buffer - File content
 * @param {string} contentType - MIME type (e.g. "application/pdf")
 * @returns {Promise<string>} Public URL of the uploaded object
 */
export async function uploadToStorage(bucket, path, buffer, contentType = 'application/pdf') {
  const url = cleanEnv(process.env.SUPABASE_URL);
  const key = cleanEnv(process.env.SUPABASE_SERVICE_KEY) || cleanEnv(process.env.SUPABASE_KEY);
  if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY env vars are required');

  const encodedPath = encodeURI(path); // chaves podem ter espaços (padrão de nome RHF)
  const res = await fetch(`${url}/storage/v1/object/${bucket}/${encodedPath}`, {
    method: 'POST',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': contentType,
      'x-upsert': 'true',
    },
    body: buffer,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`[supabase storage ${bucket}/${path}] ${res.status}: ${body.slice(0, 200)}`);
  }
  return `${url}/storage/v1/object/public/${bucket}/${encodedPath}`;
}

/**
 * Delete an object from Supabase Storage (used by cv delete-file, #10).
 * @param {string} bucket - Bucket name
 * @param {string} path - Object path inside the bucket
 * @returns {Promise<boolean>} true if deleted (404 counts as already gone)
 */
export async function deleteFromStorage(bucket, path) {
  const url = cleanEnv(process.env.SUPABASE_URL);
  const key = cleanEnv(process.env.SUPABASE_SERVICE_KEY) || cleanEnv(process.env.SUPABASE_KEY);
  if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY env vars are required');

  const encodedPath = encodeURI(path);
  const res = await fetch(`${url}/storage/v1/object/${bucket}/${encodedPath}`, {
    method: 'DELETE',
    headers: { 'apikey': key, 'Authorization': `Bearer ${key}` },
  });
  if (!res.ok && res.status !== 404) {
    const body = await res.text();
    throw new Error(`[supabase storage delete ${bucket}/${path}] ${res.status}: ${body.slice(0, 200)}`);
  }
  return true;
}

/**
 * UPSERT a row into a table (insert or update on conflict).
 * @param {string} table - Table name
 * @param {object} data - Row data
 * @param {string} onConflict - Column(s) to match on conflict e.g. "phone"
 * @returns {Promise<Array>}
 */
export async function upsert(table, data, onConflict = '') {
  const { url, key } = getClient();
  const prefer = onConflict
    ? `return=representation,resolution=merge-duplicates`
    : 'return=representation';
  const qs = onConflict ? `?on_conflict=${onConflict}` : '';
  const res = await fetch(`${url}/rest/v1/${table}${qs}`, {
    method: 'POST',
    headers: headers(key, { 'Prefer': prefer }),
    body: JSON.stringify(data),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`[supabase upsert ${table}] ${body?.message || res.status}`);
  return body;
}
