export interface CompanyIntel {
  domain: string;
  registrant: string | null;
  registrarName: string | null;
  creationDate: string | null;
  expirationDate: string | null;
  nameServers: string[];
  rawWhois: Record<string, any>;
}

export async function lookupDomain(url: string): Promise<CompanyIntel> {
  const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname.replace(/^www\./, '');

  // Try native whois-json (works locally), fall back to DNS-based detection (serverless)
  try {
    const whoisJson = (await import('whois-json')).default;
    const data = await whoisJson(domain);
    const result = Array.isArray(data) ? data[0] : data;

    return {
      domain,
      registrant: result.registrantOrganization || result.registrantName || result.registrant || null,
      registrarName: result.registrar || result.registrarName || null,
      creationDate: result.creationDate || result.created || null,
      expirationDate: result.registrarRegistrationExpirationDate || result.expirationDate || null,
      nameServers: extractNameServers(result),
      rawWhois: result,
    };
  } catch {
    // Fallback: extract what we can from HTTP headers and DNS
    return await fallbackLookup(domain);
  }
}

/** Lightweight fallback — extract hosting info from HTTP headers */
async function fallbackLookup(domain: string): Promise<CompanyIntel> {
  try {
    const res = await fetch(`https://${domain}`, {
      method: 'HEAD',
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    const headers = Object.fromEntries(res.headers.entries());
    const server = headers['server'] || '';
    const via = headers['via'] || '';
    const powered = headers['x-powered-by'] || '';

    // Detect hosting from headers
    let hosting: string | null = null;
    if (headers['cf-ray'] || server.includes('cloudflare')) hosting = 'Cloudflare';
    else if (headers['x-vercel-id']) hosting = 'Vercel';
    else if (server.includes('nginx')) hosting = 'Nginx';
    else if (server.includes('apache')) hosting = 'Apache';
    else if (via.includes('cloudfront') || headers['x-amz-cf-id']) hosting = 'AWS CloudFront';
    else if (server.includes('netlify')) hosting = 'Netlify';

    return {
      domain,
      registrant: null,
      registrarName: null,
      creationDate: null,
      expirationDate: null,
      nameServers: [],
      rawWhois: { server, via, powered, hosting, note: 'Fallback lookup (serverless)' },
    };
  } catch {
    return {
      domain,
      registrant: null,
      registrarName: null,
      creationDate: null,
      expirationDate: null,
      nameServers: [],
      rawWhois: { error: 'Lookup failed' },
    };
  }
}

function extractNameServers(data: Record<string, any>): string[] {
  const ns: string[] = [];
  for (const key of Object.keys(data)) {
    if (key.toLowerCase().includes('nameserver') || key.toLowerCase().includes('name_server')) {
      const val = data[key];
      if (typeof val === 'string') ns.push(val);
      if (Array.isArray(val)) ns.push(...val);
    }
  }
  return ns;
}

export function detectHostingProvider(nameServers: string[]): string | null {
  const nsString = nameServers.join(' ').toLowerCase();
  if (nsString.includes('cloudflare')) return 'Cloudflare';
  if (nsString.includes('hostinger') || nsString.includes('hstdomain')) return 'Hostinger';
  if (nsString.includes('locaweb')) return 'Locaweb';
  if (nsString.includes('godaddy')) return 'GoDaddy';
  if (nsString.includes('namecheap')) return 'Namecheap';
  if (nsString.includes('vercel')) return 'Vercel';
  if (nsString.includes('netlify')) return 'Netlify';
  if (nsString.includes('aws') || nsString.includes('amazon')) return 'AWS';
  if (nsString.includes('google')) return 'Google Cloud';
  return null;
}
