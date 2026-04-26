/** Tech stack detection patterns — matches against page HTML/scripts */

interface TechDetection {
  name: string;
  type: 'analytics' | 'checkout' | 'video' | 'email' | 'builder' | 'cdn' | 'whatsapp' | 'remarketing';
  patterns: RegExp[];
  extractId?: (html: string) => string | null;
}

const TECH_PATTERNS: TechDetection[] = [
  // Analytics
  {
    name: 'Meta Pixel',
    type: 'analytics',
    patterns: [/fbq\s*\(/, /facebook\.net\/en_US\/fbevents/, /connect\.facebook\.net/],
    extractId: (html) => html.match(/fbq\s*\(\s*['"]init['"]\s*,\s*['"](\d+)['"]/)?.[1] ?? null,
  },
  {
    name: 'Google Analytics 4',
    type: 'analytics',
    patterns: [/gtag\s*\(/, /googletagmanager\.com\/gtag/, /G-[A-Z0-9]+/],
    extractId: (html) => html.match(/(G-[A-Z0-9]+)/)?.[1] ?? null,
  },
  {
    name: 'TikTok Pixel',
    type: 'analytics',
    patterns: [/analytics\.tiktok\.com/, /ttq\.load/],
    extractId: (html) => html.match(/ttq\.load\s*\(\s*['"]([^'"]+)['"]/)?.[1] ?? null,
  },
  {
    name: 'Hotjar',
    type: 'analytics',
    patterns: [/static\.hotjar\.com/, /hj\s*\(\s*['"]init['"]/],
    extractId: (html) => html.match(/hjid:\s*(\d+)/)?.[1] ?? null,
  },
  {
    name: 'Microsoft Clarity',
    type: 'analytics',
    patterns: [/clarity\.ms\/tag/],
    extractId: (html) => html.match(/clarity\.ms\/tag\/([a-z0-9]+)/)?.[1] ?? null,
  },

  // Checkout platforms
  {
    name: 'Hotmart',
    type: 'checkout',
    patterns: [/hotmart\.com/, /pay\.hotmart/, /hotmart_tracking/],
    extractId: (html) => html.match(/hotmart\.com\/(?:product\/|checkout\/)(\d+)/)?.[1] ?? null,
  },
  {
    name: 'Ticto',
    type: 'checkout',
    patterns: [/ticto\.app/, /payment\.ticto/, /checkout\.ticto/],
    extractId: (html) => html.match(/ticto\.app\/(\d+)/)?.[1] ?? null,
  },
  {
    name: 'Eduzz',
    type: 'checkout',
    patterns: [/eduzz\.com/, /sun\.eduzz/, /eduzz_tracking/],
    extractId: (html) => html.match(/eduzz\.com\/(?:checkout\/|product\/)(\d+)/)?.[1] ?? null,
  },
  {
    name: 'Kiwify',
    type: 'checkout',
    patterns: [/kiwify\.com/, /pay\.kiwify/],
    extractId: (html) => html.match(/kiwify\.com\/.+?\/([a-zA-Z0-9]+)/)?.[1] ?? null,
  },
  {
    name: 'Stripe',
    type: 'checkout',
    patterns: [/js\.stripe\.com/, /stripe\.com\/v3/],
    extractId: (html) => html.match(/pk_(?:live|test)_[a-zA-Z0-9]+/)?.[0] ?? null,
  },
  {
    name: 'PagSeguro',
    type: 'checkout',
    patterns: [/pagseguro\.uol\.com/, /stc\.pagseguro/],
    extractId: () => null,
  },

  // Video platforms
  {
    name: 'Vturb',
    type: 'video',
    patterns: [/vturb\.com/, /scripts\.converteai/, /smartplayer/],
    extractId: (html) => html.match(/vturb\.com\/([a-zA-Z0-9]+)/)?.[1] ?? null,
  },
  {
    name: 'Bunny CDN',
    type: 'video',
    patterns: [/b-cdn\.net/, /iframe\.mediadelivery\.net/, /bunnycdn/i],
    extractId: (html) => html.match(/mediadelivery\.net\/([a-zA-Z0-9]+)/)?.[1] ?? null,
  },
  {
    name: 'Panda Video',
    type: 'video',
    patterns: [/pandavideo\.com/, /player-vz/],
    extractId: (html) => html.match(/pandavideo\.com.*?\/([a-f0-9-]+)/)?.[1] ?? null,
  },
  {
    name: 'Wistia',
    type: 'video',
    patterns: [/wistia\.com/, /wistia\.net/, /wistia-embed/],
    extractId: (html) => html.match(/wistia_async_([a-zA-Z0-9]+)/)?.[1] ?? null,
  },
  {
    name: 'YouTube Embed',
    type: 'video',
    patterns: [/youtube\.com\/embed/, /youtube-nocookie\.com\/embed/],
    extractId: (html) => html.match(/youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]+)/)?.[1] ?? null,
  },

  // Email / CRM
  {
    name: 'ActiveCampaign',
    type: 'email',
    patterns: [/activehosted\.com/, /trackcmp\.net/, /activecamp/i],
    extractId: (html) => html.match(/(\w+)\.activehosted\.com/)?.[1] ?? null,
  },
  {
    name: 'RD Station',
    type: 'email',
    patterns: [/rdstation\.com/, /d335luupugsy2\.cloudfront/],
    extractId: () => null,
  },
  {
    name: 'Mailchimp',
    type: 'email',
    patterns: [/mailchimp\.com/, /list-manage\.com/, /chimpstatic\.com/],
    extractId: () => null,
  },
  {
    name: 'ConvertKit',
    type: 'email',
    patterns: [/convertkit\.com/, /ck\.page/],
    extractId: () => null,
  },
  {
    name: 'Leadlovers',
    type: 'email',
    patterns: [/leadlovers\.com/, /llapi\.leadlovers/],
    extractId: () => null,
  },

  // Page builders
  {
    name: 'WordPress',
    type: 'builder',
    patterns: [/wp-content/, /wp-includes/, /wp-json/],
    extractId: () => null,
  },
  {
    name: 'Elementor',
    type: 'builder',
    patterns: [/elementor/, /elementor-widget/],
    extractId: () => null,
  },
  {
    name: 'ClickFunnels',
    type: 'builder',
    patterns: [/clickfunnels\.com/, /cfimg\.com/],
    extractId: () => null,
  },

  // CDN / Hosting
  {
    name: 'Cloudflare',
    type: 'cdn',
    patterns: [/cdnjs\.cloudflare\.com/, /cf-ray/i],
    extractId: () => null,
  },
  {
    name: 'Vercel',
    type: 'cdn',
    patterns: [/vercel\.app/, /x-vercel/i],
    extractId: () => null,
  },

  // WhatsApp
  {
    name: 'WhatsApp Business',
    type: 'whatsapp',
    patterns: [/wa\.me\//, /api\.whatsapp\.com/, /whatsapp.*business/i],
    extractId: (html) => html.match(/wa\.me\/(\+?\d+)/)?.[1] ?? html.match(/phone=(\+?\d+)/)?.[1] ?? null,
  },
  {
    name: 'WhatsApp Group',
    type: 'whatsapp',
    patterns: [/chat\.whatsapp\.com\/invite/],
    extractId: (html) => html.match(/chat\.whatsapp\.com\/invite\/([a-zA-Z0-9]+)/)?.[1] ?? null,
  },

  // Remarketing
  {
    name: 'Google Ads',
    type: 'remarketing',
    patterns: [/googleads\.g\.doubleclick/, /google_conversion_id/, /AW-\d+/],
    extractId: (html) => html.match(/(AW-\d+)/)?.[1] ?? null,
  },
];

export interface DetectedTech {
  name: string;
  type: string;
  identifier: string | null;
}

export function detectTechStack(html: string, headers?: Record<string, string>): DetectedTech[] {
  const detected: DetectedTech[] = [];
  const fullContent = html + (headers ? JSON.stringify(headers) : '');

  for (const tech of TECH_PATTERNS) {
    const matched = tech.patterns.some((p) => p.test(fullContent));
    if (matched) {
      detected.push({
        name: tech.name,
        type: tech.type,
        identifier: tech.extractId ? tech.extractId(fullContent) : null,
      });
    }
  }

  return detected;
}
