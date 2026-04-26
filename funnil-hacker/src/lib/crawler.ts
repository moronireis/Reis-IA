import * as cheerio from 'cheerio';
import { detectTechStack, type DetectedTech } from './techstack';

export interface CrawledPage {
  url: string;
  finalUrl: string;
  title: string;
  metaDescription: string;
  screenshotDesktop: Buffer;
  screenshotMobile: Buffer;
  html: string;
  textContent: string;
  techStack: DetectedTech[];
  outboundLinks: string[];
  redirectChain: string[];
  statusCode: number;
  headers: Record<string, string>;
}

export interface CrawlResult {
  pages: CrawledPage[];
  edges: Array<{ from: string; to: string; type: string; label: string }>;
  totalTime: number;
}

interface CrawlOptions {
  maxPages?: number;
  maxDepth?: number;
  sameDomainOnly?: boolean;
}

const DEFAULT_OPTIONS: CrawlOptions = {
  maxPages: 20,
  maxDepth: 4,
  sameDomainOnly: true,
};

/**
 * Crawl a funnel starting from a URL. Auto-detects environment:
 * - Local: uses Playwright (screenshots + JS rendering)
 * - Serverless: uses fetch + cheerio (no screenshots)
 */
export async function crawlFunnel(startUrl: string, options?: CrawlOptions): Promise<CrawlResult> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const startTime = Date.now();
  const normalizedStart = startUrl.startsWith('http') ? startUrl : `https://${startUrl}`;
  const startDomain = new URL(normalizedStart).hostname;

  const visited = new Set<string>();
  const queue: Array<{ url: string; depth: number; fromUrl: string | null }> = [
    { url: normalizedStart, depth: 0, fromUrl: null },
  ];

  const pages: CrawledPage[] = [];
  const edges: CrawlResult['edges'] = [];

  // Detect if Playwright is available
  let usePlaywright = false;
  let browser: any = null;
  try {
    const pw = await import('playwright');
    browser = await pw.chromium.launch({ headless: true });
    usePlaywright = true;
  } catch {
    // Playwright not available, use fetch
  }

  while (queue.length > 0 && pages.length < (opts.maxPages || 20)) {
    const item = queue.shift();
    if (!item) break;

    const key = normalizeUrl(item.url);
    if (visited.has(key)) continue;
    if (item.depth > (opts.maxDepth || 4)) continue;
    visited.add(key);

    try {
      const page = usePlaywright
        ? await crawlWithPlaywright(browser, item.url)
        : await crawlWithFetch(item.url);

      pages.push(page);

      // Record edge
      if (item.fromUrl) {
        const edgeType = page.redirectChain.length > 0 ? 'redirect' : 'click';
        edges.push({
          from: item.fromUrl,
          to: page.finalUrl,
          type: edgeType,
          label: edgeType === 'redirect' ? `redirect ${page.statusCode}` : 'click',
        });
      }

      // Queue outbound links
      for (const link of page.outboundLinks) {
        const linkKey = normalizeUrl(link);
        if (visited.has(linkKey)) continue;

        if (opts.sameDomainOnly) {
          try {
            if (!isSameFunnel(startDomain, new URL(link).hostname)) continue;
          } catch { continue; }
        }

        queue.push({ url: link, depth: item.depth + 1, fromUrl: page.finalUrl });
      }
    } catch (err) {
      console.error(`Crawl error for ${item.url}:`, err);
    }
  }

  if (browser) await browser.close();

  return { pages, edges, totalTime: Date.now() - startTime };
}

/** Crawl single page with Playwright */
async function crawlWithPlaywright(browser: any, url: string): Promise<CrawledPage> {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();
  const redirectChain: string[] = [];
  let responseHeaders: Record<string, string> = {};
  let statusCode = 200;

  page.on('response', (response: any) => {
    const status = response.status();
    if (status >= 300 && status < 400) redirectChain.push(response.url());
    if (response.url() === page.url()) {
      responseHeaders = Object.fromEntries(Object.entries(response.headers()));
      statusCode = status;
    }
  });

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 });
    await page.waitForTimeout(1500);

    const title = await page.title();
    const metaDescription = await page.$eval('meta[name="description"]', (el: any) => el.getAttribute('content') || '').catch(() => '');
    const html = await page.content();
    const textContent = await page.evaluate(() => (document as any).body?.innerText || '');

    const outboundLinks: string[] = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href]'))
        .map((a) => { try { return new URL((a as HTMLAnchorElement).href, window.location.origin).href; } catch { return null; } })
        .filter((h): h is string => h !== null && h.startsWith('http') && !h.includes('#'))
    );

    // Detect iframes (checkout embeds, video players)
    const iframeSrcs: string[] = await page.evaluate(() =>
      Array.from(document.querySelectorAll('iframe[src]')).map((f) => (f as HTMLIFrameElement).src).filter((s: string) => s.startsWith('http'))
    );

    const techStack = detectTechStack(html, responseHeaders);
    const screenshotDesktop = await page.screenshot({ fullPage: true, type: 'png' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    const screenshotMobile = await page.screenshot({ fullPage: true, type: 'png' });

    return {
      url, finalUrl: page.url(), title, metaDescription,
      screenshotDesktop, screenshotMobile, html, textContent, techStack,
      outboundLinks: [...new Set([...outboundLinks, ...iframeSrcs])],
      redirectChain, statusCode, headers: responseHeaders,
    };
  } finally {
    await context.close();
  }
}

/** Crawl single page with fetch+cheerio (serverless) */
async function crawlWithFetch(url: string): Promise<CrawledPage> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Accept': 'text/html,application/xhtml+xml',
    },
    redirect: 'follow',
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  $('script, style, noscript').remove();
  const textContent = $('body').text().replace(/\s+/g, ' ').trim();

  const title = $('title').text().trim();
  const metaDescription = $('meta[name="description"]').attr('content') || '';

  const outboundLinks: string[] = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) {
      try {
        const abs = new URL(href, url).href;
        if (abs.startsWith('http') && !abs.includes('#')) outboundLinks.push(abs);
      } catch { /* skip */ }
    }
  });

  // Also get iframe sources
  $('iframe[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src?.startsWith('http')) outboundLinks.push(src);
  });

  const responseHeaders = Object.fromEntries(res.headers.entries());
  const techStack = detectTechStack(html, responseHeaders);

  return {
    url, finalUrl: res.url, title, metaDescription,
    screenshotDesktop: Buffer.alloc(0), screenshotMobile: Buffer.alloc(0),
    html, textContent, techStack,
    outboundLinks: [...new Set(outboundLinks)],
    redirectChain: [], statusCode: res.status, headers: responseHeaders,
  };
}

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    return `${u.hostname}${u.pathname.replace(/\/$/, '') || '/'}`.toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

function isSameFunnel(baseDomain: string, targetDomain: string): boolean {
  const base = baseDomain.replace(/^www\./, '');
  const target = targetDomain.replace(/^www\./, '');
  if (base === target) return true;

  const baseRoot = base.split('.').slice(-2).join('.');
  const targetRoot = target.split('.').slice(-2).join('.');
  if (baseRoot === targetRoot) return true;

  const funnelDomains = [
    'hotmart.com', 'pay.hotmart.com', 'payment.ticto.app', 'checkout.ticto.app',
    'sun.eduzz.com', 'pay.kiwify.com.br', 'chat.whatsapp.com', 'wa.me',
  ];
  return funnelDomains.some((d) => target.includes(d));
}
