// Playwright is optional — falls back to fetch on serverless

export interface AdCreative {
  adId: string;
  pageName: string;
  copyText: string;
  status: 'active' | 'inactive';
  startedAt: string | null;
  platform: string;
  creativeImageUrl: string | null;
  creativeVideoUrl: string | null;
  linkUrl: string | null;
  screenshotDataUrl: string | null;
}

export interface AdLibraryResult {
  ads: AdCreative[];
  totalFound: number;
  searchTerm: string;
  scrapedAt: string;
}

/**
 * Scrape Meta Ad Library for ads by a specific page or keyword.
 * Uses Playwright to navigate the public Ad Library website.
 */
export async function scrapeMetaAdLibrary(
  searchTerm: string,
  options?: { maxAds?: number; country?: string }
): Promise<AdLibraryResult> {
  const maxAds = options?.maxAds || 20;
  const country = options?.country || 'BR';
  const ads: AdCreative[] = [];

  // Try Playwright first, fall back to fetch
  let browser: any = null;
  let usePlaywright = false;
  try {
    const pw = await import('playwright');
    browser = await pw.chromium.launch({
      headless: true,
      args: ['--disable-blink-features=AutomationControlled'],
    });
    usePlaywright = true;
  } catch {
    // Playwright not available — use fetch fallback
  }

  // Fetch fallback: scrape the public Ad Library page with fetch
  if (!usePlaywright) {
    const url = `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=${country}&q=${encodeURIComponent(searchTerm)}&search_type=keyword_unordered`;
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'text/html',
        },
      });
      const html = await res.text();
      // Extract what we can from the HTML (limited without JS rendering)
      const textBlocks = html.match(/"text":"([^"]{30,500})"/g) || [];
      textBlocks.slice(0, maxAds).forEach((block, i) => {
        const text = block.replace(/"text":"/, '').replace(/"$/, '').replace(/\\n/g, '\n').replace(/\\u[\dA-Fa-f]{4}/g, '');
        if (text.length > 20) {
          ads.push({
            adId: `meta-fetch-${i}`,
            pageName: searchTerm,
            copyText: text,
            status: 'active',
            startedAt: null,
            platform: 'meta',
            creativeImageUrl: null,
            creativeVideoUrl: null,
            linkUrl: url,
            screenshotDataUrl: null,
          });
        }
      });
    } catch (err) {
      console.error('Ad Library fetch fallback error:', err);
    }
    return { ads, totalFound: ads.length, searchTerm, scrapedAt: new Date().toISOString() };
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'pt-BR',
  });

  const page = await context.newPage();

  try {
    // Navigate to Meta Ad Library
    const url = `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=${country}&q=${encodeURIComponent(searchTerm)}&search_type=keyword_unordered`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for content to load
    await page.waitForTimeout(3000);

    // Try to close any cookie/login modals
    try {
      const closeButton = page.locator('[aria-label="Close"], [aria-label="Fechar"]').first();
      if (await closeButton.isVisible({ timeout: 2000 })) {
        await closeButton.click();
        await page.waitForTimeout(500);
      }
    } catch {
      // No modal
    }

    // Scroll to load more ads
    let previousHeight = 0;
    let scrollAttempts = 0;
    while (scrollAttempts < 5) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      const currentHeight = await page.evaluate(() => document.body.scrollHeight);
      if (currentHeight === previousHeight) break;
      previousHeight = currentHeight;
      scrollAttempts++;
    }

    // Extract ad data using multiple selector strategies
    const adData = await page.evaluate((max) => {
      const results: Array<{
        copyText: string;
        pageName: string;
        status: string;
        startedAt: string;
        linkUrl: string;
        imageUrl: string;
        videoUrl: string;
      }> = [];

      // Strategy 1: Look for ad card containers
      // Meta Ad Library uses various div structures, try common patterns
      const adContainers = document.querySelectorAll(
        '[class*="xrvj5dj"], [class*="x1cy8zhl"], div[role="article"], ._7jvw'
      );

      if (adContainers.length > 0) {
        adContainers.forEach((container, i) => {
          if (i >= max) return;
          const text = container.textContent || '';

          // Extract copy text (usually the longest paragraph)
          const paragraphs = container.querySelectorAll('span, p, div');
          let longestText = '';
          paragraphs.forEach((p) => {
            const t = (p as HTMLElement).innerText?.trim() || '';
            if (t.length > longestText.length && t.length > 20 && t.length < 2000) {
              longestText = t;
            }
          });

          // Extract page name
          const pageLink = container.querySelector('a[href*="/ads/library/"]');
          const pageName = pageLink?.textContent?.trim() || '';

          // Extract dates
          const dateMatch = text.match(/(?:Started|Iniciado|Ativo desde)\s+(.+?)(?:\s*·|\s*$)/i);
          const startedAt = dateMatch?.[1] || '';

          // Extract links
          const links = container.querySelectorAll('a[href]');
          let linkUrl = '';
          links.forEach((a) => {
            const href = (a as HTMLAnchorElement).href;
            if (href && !href.includes('facebook.com/ads') && href.startsWith('http')) {
              linkUrl = href;
            }
          });

          // Extract media
          const img = container.querySelector('img[src*="scontent"], img[src*="fbcdn"]');
          const video = container.querySelector('video source, video[src]');
          const imageUrl = img ? (img as HTMLImageElement).src : '';
          const videoUrl = video ? ((video as HTMLSourceElement).src || (video as HTMLVideoElement).src) : '';

          if (longestText || pageName) {
            results.push({
              copyText: longestText,
              pageName,
              status: text.toLowerCase().includes('ativ') || text.toLowerCase().includes('active') ? 'active' : 'inactive',
              startedAt,
              linkUrl,
              imageUrl,
              videoUrl,
            });
          }
        });
      }

      // Strategy 2: If no containers found, try extracting from the whole page
      if (results.length === 0) {
        // Get all text blocks that look like ad copy
        const allDivs = document.querySelectorAll('div');
        const seen = new Set<string>();

        allDivs.forEach((div) => {
          const text = (div as HTMLElement).innerText?.trim() || '';
          if (text.length > 50 && text.length < 1500 && !seen.has(text.slice(0, 50))) {
            seen.add(text.slice(0, 50));
            // Check if this looks like ad copy (has typical ad patterns)
            if (
              text.includes('Saiba mais') || text.includes('Compre agora') ||
              text.includes('clique') || text.includes('acesse') ||
              text.includes('grátis') || text.includes('oferta') ||
              text.length > 100
            ) {
              results.push({
                copyText: text.slice(0, 1000),
                pageName: '',
                status: 'active',
                startedAt: '',
                linkUrl: '',
                imageUrl: '',
                videoUrl: '',
              });
            }
          }
          if (results.length >= max) return;
        });
      }

      return results.slice(0, max);
    }, maxAds);

    // Take screenshots of ad creatives if found
    for (let i = 0; i < Math.min(adData.length, 10); i++) {
      const ad = adData[i];
      ads.push({
        adId: `meta-${searchTerm.replace(/\s+/g, '-')}-${i}`,
        pageName: ad.pageName || searchTerm,
        copyText: ad.copyText,
        status: ad.status === 'active' ? 'active' : 'inactive',
        startedAt: ad.startedAt || null,
        platform: 'meta',
        creativeImageUrl: ad.imageUrl || null,
        creativeVideoUrl: ad.videoUrl || null,
        linkUrl: ad.linkUrl || null,
        screenshotDataUrl: null,
      });
    }

    // If we got nothing from parsing, at least take a full-page screenshot as evidence
    if (ads.length === 0) {
      const screenshot = await page.screenshot({ fullPage: false, type: 'png' });
      const dataUrl = `data:image/png;base64,${screenshot.toString('base64')}`;

      // Try to extract any visible count
      const pageText = await page.evaluate(() => document.body?.innerText || '');
      const countMatch = pageText.match(/(\d+)\s*(?:result|anúncio|ad)/i);

      ads.push({
        adId: `meta-overview-${searchTerm.replace(/\s+/g, '-')}`,
        pageName: searchTerm,
        copyText: countMatch ? `${countMatch[1]} anuncios encontrados na biblioteca` : 'Resultados encontrados — screenshot salvo',
        status: 'active',
        startedAt: null,
        platform: 'meta',
        creativeImageUrl: null,
        creativeVideoUrl: null,
        linkUrl: url,
        screenshotDataUrl: dataUrl,
      });
    }

    return {
      ads,
      totalFound: ads.length,
      searchTerm,
      scrapedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Ad Library scrape error:', error);

    // Return partial results even on error
    return {
      ads,
      totalFound: ads.length,
      searchTerm,
      scrapedAt: new Date().toISOString(),
    };
  } finally {
    await browser.close();
  }
}
