export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  heading: string;
  links: NavLink[];
}

export interface NavDropdown {
  label: string;
  groups: NavGroup[];
}

/* ---- HEADER NAVIGATION ---- */

export const headerDropdowns: NavDropdown[] = [
  {
    label: 'Brandbook',
    groups: [
      {
        heading: 'Brand Identity',
        links: [
          { label: 'Guidelines', href: '/brandbook/guidelines' },
          { label: 'Strategy', href: '/brandbook/strategy' },
          { label: 'Logo', href: '/brandbook/logo' },
          { label: 'Icons', href: '/brandbook/icons' },
          { label: 'Moodboard', href: '/brandbook/moodboard' },
          { label: 'Foundations', href: '/brandbook/foundations' },
        ],
      },
      {
        heading: 'Brand Ecosystem',
        links: [
          { label: 'Company Brand', href: '/brandbook/company-brand' },
          { label: 'Personal Brand', href: '/brandbook/personal-brand' },
          { label: 'Time Builders Movement', href: '/brandbook/movement' },
          { label: 'Products Z7 + Systems', href: '/brandbook/products' },
        ],
      },
    ],
  },
  {
    label: 'Design System',
    groups: [
      {
        heading: 'Tokens',
        links: [
          { label: 'Foundations', href: '/brandbook/foundations' },
          { label: 'Spacing Scale', href: '/brandbook/spacing-scale' },
          { label: 'Surfaces', href: '/brandbook/surfaces' },
          { label: 'Semantic Tokens', href: '/brandbook/semantic-tokens' },
        ],
      },
      {
        heading: 'Visual',
        links: [
          { label: 'Effects', href: '/brandbook/effects' },
          { label: 'Patterns', href: '/brandbook/patterns' },
          { label: 'Motion', href: '/brandbook/motion' },
          { label: 'VFX', href: '/brandbook/vfx' },
        ],
      },
      {
        heading: 'Meta',
        links: [
          { label: 'Templates', href: '/brandbook/templates' },
          { label: 'SEO', href: '/brandbook/seo' },
        ],
      },
    ],
  },
  {
    label: 'Components',
    groups: [
      {
        heading: '',
        links: [
          { label: 'Overview', href: '/brandbook/components' },
          { label: 'Buttons', href: '/brandbook/buttons' },
          { label: 'Cards', href: '/brandbook/cards' },
          { label: 'Forms', href: '/brandbook/forms' },
          { label: 'Sections', href: '/brandbook/sections' },
          { label: 'Advanced', href: '/brandbook/advanced' },
        ],
      },
    ],
  },
];

/* ---- FOOTER NAVIGATION ---- */

export const footerColumns: NavGroup[] = [
  {
    heading: 'Brandbook',
    links: [
      { label: 'Guidelines', href: '/brandbook/guidelines' },
      { label: 'Strategy', href: '/brandbook/strategy' },
      { label: 'Logo', href: '/brandbook/logo' },
      { label: 'Icons', href: '/brandbook/icons' },
      { label: 'Moodboard', href: '/brandbook/moodboard' },
      { label: 'Foundations', href: '/brandbook/foundations' },
    ],
  },
  {
    heading: 'Tokens & Visual',
    links: [
      { label: 'Spacing Scale', href: '/brandbook/spacing-scale' },
      { label: 'Surfaces', href: '/brandbook/surfaces' },
      { label: 'Semantic Tokens', href: '/brandbook/semantic-tokens' },
      { label: 'Effects', href: '/brandbook/effects' },
      { label: 'Patterns', href: '/brandbook/patterns' },
      { label: 'Motion', href: '/brandbook/motion' },
      { label: 'VFX', href: '/brandbook/vfx' },
    ],
  },
  {
    heading: 'Components',
    links: [
      { label: 'Overview', href: '/brandbook/components' },
      { label: 'Buttons', href: '/brandbook/buttons' },
      { label: 'Cards', href: '/brandbook/cards' },
      { label: 'Forms', href: '/brandbook/forms' },
      { label: 'Sections', href: '/brandbook/sections' },
      { label: 'Advanced', href: '/brandbook/advanced' },
    ],
  },
  {
    heading: 'Ecosystem',
    links: [
      { label: 'Company Brand', href: '/brandbook/company-brand' },
      { label: 'Personal Brand', href: '/brandbook/personal-brand' },
      { label: 'Time Builders', href: '/brandbook/movement' },
      { label: 'Products', href: '/brandbook/products' },
    ],
  },
  {
    heading: 'Meta',
    links: [
      { label: 'Templates', href: '/brandbook/templates' },
      { label: 'SEO', href: '/brandbook/seo' },
    ],
  },
];

/* ---- HOME PAGE SECTION CARDS ---- */

export interface SectionCard {
  number: string;
  title: string;
  description: string;
  href: string;
  span?: string;
  category: string;
  isNew?: boolean;
}

export const homeSections: SectionCard[] = [
  /* Brand */
  {
    number: '01',
    title: 'Brand Guidelines',
    description: 'Filosofia Z7, arquetipos, voz por camada e regras de marca.',
    href: '/brandbook/guidelines',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Brand',
  },
  {
    number: '02',
    title: 'Brand Strategy',
    description: '"O Tempo e Rei" — posicionamento, ecossistema 4 camadas, viloes e missao.',
    href: '/brandbook/strategy',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Brand',
  },
  {
    number: '03',
    title: 'Logo System',
    description: 'H1-B Hourglass construction, safe space, and usage rules.',
    href: '/brandbook/logo',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Brand',
  },
  {
    number: '04',
    title: 'Icon System',
    description: 'Lucide Icons library with sizes, colors, and guidelines.',
    href: '/brandbook/icons',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Brand',
  },
  {
    number: '05',
    title: 'Moodboard',
    description: 'Visual mood, aesthetic direction, and design references.',
    href: '/brandbook/moodboard',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Brand',
  },
  /* Tokens */
  {
    number: '06',
    title: 'Foundations',
    description: 'Colors, typography, spacing, and all design tokens.',
    href: '/brandbook/foundations',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Tokens',
  },
  {
    number: '07',
    title: 'Spacing Scale',
    description: 'Named and numeric spacing tokens with visual rulers.',
    href: '/brandbook/spacing-scale',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Tokens',
  },
  {
    number: '08',
    title: 'Surfaces',
    description: '5-tier surface elevation system with interactive demos.',
    href: '/brandbook/surfaces',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Tokens',
  },
  {
    number: '09',
    title: 'Semantic Tokens',
    description: 'Blue ladder, signal colors, borders, easing, and z-index.',
    href: '/brandbook/semantic-tokens',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Tokens',
  },
  /* Visual */
  {
    number: '10',
    title: 'Effects',
    description: 'Rotating border, ambient pool, grain, and watermark.',
    href: '/brandbook/effects',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Visual',
  },
  {
    number: '11',
    title: 'Patterns',
    description: 'Card patterns, section compositions, and background textures.',
    href: '/brandbook/patterns',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Visual',
  },
  {
    number: '12',
    title: 'Motion',
    description: 'Easing curves, durations, and scroll-triggered effects.',
    href: '/brandbook/motion',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Visual',
  },
  {
    number: '13',
    title: 'VFX',
    description: 'Aurora, mesh gradients, parallax, and advanced effects.',
    href: '/brandbook/vfx',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Visual',
  },
  /* Components */
  {
    number: '14',
    title: 'Components',
    description: 'Complete component catalog overview and navigation.',
    href: '/brandbook/components',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Components',
  },
  {
    number: '15',
    title: 'Buttons',
    description: 'Primary, secondary, ghost, hero, and link button variants.',
    href: '/brandbook/buttons',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Components',
  },
  {
    number: '16',
    title: 'Cards',
    description: 'Standard, accented, glass, featured, KPI, and content cards.',
    href: '/brandbook/cards',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Components',
  },
  {
    number: '17',
    title: 'Forms',
    description: 'Inputs, textareas, selects, validation, and glass-morphism.',
    href: '/brandbook/forms',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Components',
  },
  {
    number: '18',
    title: 'Sections',
    description: 'Container widths, section spacing, and layout compositions.',
    href: '/brandbook/sections',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Components',
  },
  {
    number: '19',
    title: 'Advanced',
    description: 'Accordions, tabs, stat counters, and marquee components.',
    href: '/brandbook/advanced',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Components',
  },
  /* Ecosystem */
  {
    number: '20',
    title: 'Company Brand',
    description: 'Essencia, valores, voz, Kapferer, arquitetura e posicionamento.',
    href: '/brandbook/company-brand',
    span: 'md:col-span-6 lg:col-span-6',
    category: 'Ecosystem',
    isNew: true,
  },
  {
    number: '21',
    title: 'Personal Brand',
    description: 'Moroni Reis: arquetipos, mantras, conteudo e estilo visual.',
    href: '/brandbook/personal-brand',
    span: 'md:col-span-6 lg:col-span-6',
    category: 'Ecosystem',
    isNew: true,
  },
  {
    number: '22',
    title: 'Time Builders',
    description: 'Movimento, filosofia Z7, tribo, viloes, manifesto e rituais.',
    href: '/brandbook/movement',
    span: 'md:col-span-6 lg:col-span-6',
    category: 'Ecosystem',
    isNew: true,
  },
  {
    number: '23',
    title: 'Products Z7 + Systems',
    description: 'Z7 Hours, Days, Months, 7 Stages e produtos Systems.',
    href: '/brandbook/products',
    span: 'md:col-span-6 lg:col-span-6',
    category: 'Ecosystem',
    isNew: true,
  },
  /* Meta */
  {
    number: '24',
    title: 'Page Templates',
    description: 'Three reusable page templates and layout guides.',
    href: '/brandbook/templates',
    span: 'md:col-span-6 lg:col-span-6',
    category: 'Meta',
    isNew: true,
  },
  {
    number: '25',
    title: 'SEO & Meta',
    description: 'Title patterns, OG images, structured data, and sitemap.',
    href: '/brandbook/seo',
    span: 'md:col-span-6 lg:col-span-6',
    category: 'Meta',
    isNew: true,
  },
];

/* ---- CROSS-LINK MAP ---- */

export interface RelatedLink {
  label: string;
  href: string;
}

export const relatedLinksMap: Record<string, RelatedLink[]> = {
  '/brandbook/foundations': [
    { label: 'Spacing Scale', href: '/brandbook/spacing-scale' },
    { label: 'Surfaces', href: '/brandbook/surfaces' },
    { label: 'Semantic Tokens', href: '/brandbook/semantic-tokens' },
  ],
  '/brandbook/spacing-scale': [
    { label: 'Foundations', href: '/brandbook/foundations' },
    { label: 'Surfaces', href: '/brandbook/surfaces' },
  ],
  '/brandbook/surfaces': [
    { label: 'Foundations', href: '/brandbook/foundations' },
    { label: 'Semantic Tokens', href: '/brandbook/semantic-tokens' },
  ],
  '/brandbook/semantic-tokens': [
    { label: 'Foundations', href: '/brandbook/foundations' },
    { label: 'Surfaces', href: '/brandbook/surfaces' },
    { label: 'Effects', href: '/brandbook/effects' },
  ],
  '/brandbook/effects': [
    { label: 'Motion', href: '/brandbook/motion' },
    { label: 'VFX', href: '/brandbook/vfx' },
    { label: 'Patterns', href: '/brandbook/patterns' },
  ],
  '/brandbook/motion': [
    { label: 'Effects', href: '/brandbook/effects' },
    { label: 'VFX', href: '/brandbook/vfx' },
    { label: 'Semantic Tokens', href: '/brandbook/semantic-tokens' },
  ],
  '/brandbook/vfx': [
    { label: 'Effects', href: '/brandbook/effects' },
    { label: 'Motion', href: '/brandbook/motion' },
  ],
  '/brandbook/patterns': [
    { label: 'Cards', href: '/brandbook/cards' },
    { label: 'Forms', href: '/brandbook/forms' },
    { label: 'Buttons', href: '/brandbook/buttons' },
    { label: 'Sections', href: '/brandbook/sections' },
  ],
  '/brandbook/buttons': [
    { label: 'Patterns', href: '/brandbook/patterns' },
    { label: 'Forms', href: '/brandbook/forms' },
  ],
  '/brandbook/cards': [
    { label: 'Patterns', href: '/brandbook/patterns' },
    { label: 'Effects', href: '/brandbook/effects' },
  ],
  '/brandbook/forms': [
    { label: 'Patterns', href: '/brandbook/patterns' },
    { label: 'Semantic Tokens', href: '/brandbook/semantic-tokens' },
  ],
  '/brandbook/sections': [
    { label: 'Patterns', href: '/brandbook/patterns' },
    { label: 'Effects', href: '/brandbook/effects' },
    { label: 'Surfaces', href: '/brandbook/surfaces' },
  ],
  '/brandbook/advanced': [
    { label: 'Buttons', href: '/brandbook/buttons' },
    { label: 'Cards', href: '/brandbook/cards' },
    { label: 'Forms', href: '/brandbook/forms' },
  ],
  '/brandbook/components': [
    { label: 'Buttons', href: '/brandbook/buttons' },
    { label: 'Cards', href: '/brandbook/cards' },
    { label: 'Forms', href: '/brandbook/forms' },
    { label: 'Sections', href: '/brandbook/sections' },
    { label: 'Advanced', href: '/brandbook/advanced' },
  ],
  '/brandbook/guidelines': [
    { label: 'Strategy', href: '/brandbook/strategy' },
    { label: 'Company Brand', href: '/brandbook/company-brand' },
    { label: 'Foundations', href: '/brandbook/foundations' },
    { label: 'Logo', href: '/brandbook/logo' },
  ],
  '/brandbook/logo': [
    { label: 'Guidelines', href: '/brandbook/guidelines' },
    { label: 'Icons', href: '/brandbook/icons' },
  ],
  '/brandbook/icons': [
    { label: 'Logo', href: '/brandbook/logo' },
    { label: 'Foundations', href: '/brandbook/foundations' },
  ],
  '/brandbook/moodboard': [
    { label: 'Guidelines', href: '/brandbook/guidelines' },
    { label: 'Effects', href: '/brandbook/effects' },
  ],
  '/brandbook/strategy': [
    { label: 'Guidelines', href: '/brandbook/guidelines' },
    { label: 'Company Brand', href: '/brandbook/company-brand' },
    { label: 'Time Builders', href: '/brandbook/movement' },
    { label: 'Products', href: '/brandbook/products' },
  ],
  '/brandbook/templates': [
    { label: 'Sections', href: '/brandbook/sections' },
    { label: 'Patterns', href: '/brandbook/patterns' },
    { label: 'Components', href: '/brandbook/components' },
    { label: 'SEO', href: '/brandbook/seo' },
  ],
  '/brandbook/seo': [
    { label: 'Templates', href: '/brandbook/templates' },
  ],
  '/brandbook/company-brand': [
    { label: 'Personal Brand', href: '/brandbook/personal-brand' },
    { label: 'Time Builders', href: '/brandbook/movement' },
    { label: 'Products', href: '/brandbook/products' },
    { label: 'Guidelines', href: '/brandbook/guidelines' },
  ],
  '/brandbook/personal-brand': [
    { label: 'Company Brand', href: '/brandbook/company-brand' },
    { label: 'Time Builders', href: '/brandbook/movement' },
    { label: 'Guidelines', href: '/brandbook/guidelines' },
  ],
  '/brandbook/movement': [
    { label: 'Products', href: '/brandbook/products' },
    { label: 'Company Brand', href: '/brandbook/company-brand' },
    { label: 'Personal Brand', href: '/brandbook/personal-brand' },
  ],
  '/brandbook/products': [
    { label: 'Time Builders', href: '/brandbook/movement' },
    { label: 'Company Brand', href: '/brandbook/company-brand' },
    { label: 'Strategy', href: '/brandbook/strategy' },
  ],
};
