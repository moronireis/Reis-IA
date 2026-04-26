import * as cheerio from 'cheerio';
import { detectTechStack, type DetectedTech } from './techstack';

export interface ScanResult {
  url: string;
  finalUrl: string;
  title: string;
  metaDescription: string;
  screenshotDesktop: Buffer;
  screenshotMobile: Buffer;
  html: string;
  textContent: string;
  techStack: DetectedTech[];
  links: string[];
  redirectChain: string[];
  headers: Record<string, string>;
  statusCode: number;
}

/**
 * Scan a URL — auto-detects environment.
 * Uses Playwright locally (with screenshots), falls back to fetch+cheerio on serverless.
 */
export async function scanUrl(url: string): Promise<ScanResult> {
  const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;

  // Try Playwright first (local dev), fall back to fetch (Vercel serverless)
  try {
    const pw = await import('playwright');
    return await scanWithPlaywright(pw.chromium, normalizedUrl);
  } catch {
    return await scanWithFetch(normalizedUrl);
  }
}

/** Full scan with Playwright — screenshots, JS rendering, redirect tracking */
async function scanWithPlaywright(chromium: any, url: string): Promise<ScanResult> {
  const browser = await chromium.launch({ headless: true });
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
    if (status >= 300 && status < 400) {
      redirectChain.push(response.url());
    }
    if (response.url() === page.url()) {
      responseHeaders = Object.fromEntries(Object.entries(response.headers()));
      statusCode = status;
    }
  });

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    const screenshotDesktop = await page.screenshot({ fullPage: true, type: 'png' });
    const title = await page.title();
    const metaDescription = await page.$eval(
      'meta[name="description"]',
      (el: any) => el.getAttribute('content') || ''
    ).catch(() => '');

    const html = await page.content();
    const textContent = await page.evaluate(() => (document as any).body?.innerText || '');
    const links: string[] = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href]'))
        .map((a) => (a as HTMLAnchorElement).href)
        .filter((href: string) => href.startsWith('http'))
    );

    const techStack = detectTechStack(html, responseHeaders);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(500);
    const screenshotMobile = await page.screenshot({ fullPage: true, type: 'png' });

    return {
      url, finalUrl: page.url(), title, metaDescription,
      screenshotDesktop, screenshotMobile, html, textContent,
      techStack, links: [...new Set(links)], redirectChain,
      headers: responseHeaders, statusCode,
    };
  } finally {
    await browser.close();
  }
}

/** Lightweight scan with fetch+cheerio — no screenshots, works on serverless */
async function scanWithFetch(url: string): Promise<ScanResult> {
  const redirectChain: string[] = [];
  let finalUrl = url;
  let statusCode = 200;
  let responseHeaders: Record<string, string> = {};

  // Follow redirects manually to track chain
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml',
    },
    redirect: 'follow',
  });

  finalUrl = res.url;
  statusCode = res.status;
  responseHeaders = Object.fromEntries(res.headers.entries());

  const html = await res.text();
  const $ = cheerio.load(html);

  // Extract text content (remove scripts, styles)
  $('script, style, noscript').remove();
  const textContent = $('body').text().replace(/\s+/g, ' ').trim();

  const title = $('title').text().trim();
  const metaDescription = $('meta[name="description"]').attr('content') || '';

  // Extract links
  const links: string[] = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) {
      try {
        const absolute = new URL(href, url).href;
        if (absolute.startsWith('http')) links.push(absolute);
      } catch { /* skip invalid */ }
    }
  });

  const techStack = detectTechStack(html, responseHeaders);

  return {
    url, finalUrl, title, metaDescription,
    screenshotDesktop: Buffer.alloc(0),
    screenshotMobile: Buffer.alloc(0),
    html, textContent, techStack,
    links: [...new Set(links)], redirectChain,
    headers: responseHeaders, statusCode,
  };
}
