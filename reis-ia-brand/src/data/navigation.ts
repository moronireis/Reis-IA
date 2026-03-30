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
        heading: 'Identidade de Marca',
        links: [
          { label: 'Diretrizes', href: '/brandbook/guidelines' },
          { label: 'Estratégia', href: '/brandbook/strategy' },
          { label: 'Logo', href: '/brandbook/logo' },
          { label: 'Ícones', href: '/brandbook/icons' },
          { label: 'Moodboard', href: '/brandbook/moodboard' },
          { label: 'Fundações', href: '/brandbook/foundations' },
        ],
      },
      {
        heading: 'Ecossistema de Marca',
        links: [
          { label: 'Marca Empresa', href: '/brandbook/company-brand' },
          { label: 'Marca Pessoal', href: '/brandbook/personal-brand' },
          { label: 'Movimento Builders', href: '/brandbook/movement' },
          { label: 'Produtos + Systems', href: '/brandbook/products' },
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
          { label: 'Fundações', href: '/brandbook/foundations' },
          { label: 'Escala de Espaçamento', href: '/brandbook/spacing-scale' },
          { label: 'Superfícies', href: '/brandbook/surfaces' },
          { label: 'Tokens Semânticos', href: '/brandbook/semantic-tokens' },
        ],
      },
      {
        heading: 'Visual',
        links: [
          { label: 'Efeitos', href: '/brandbook/effects' },
          { label: 'Padrões', href: '/brandbook/patterns' },
          { label: 'Movimento', href: '/brandbook/motion' },
          { label: 'Efeitos Visuais', href: '/brandbook/vfx' },
        ],
      },
      {
        heading: 'Meta',
        links: [
          { label: 'Templates', href: '/brandbook/templates' },
          { label: 'SEO e Metadados', href: '/brandbook/seo' },
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
          { label: 'Visão Geral', href: '/brandbook/components' },
          { label: 'Botões', href: '/brandbook/buttons' },
          { label: 'Cards', href: '/brandbook/cards' },
          { label: 'Formulários', href: '/brandbook/forms' },
          { label: 'Seções', href: '/brandbook/sections' },
          { label: 'Avançados', href: '/brandbook/advanced' },
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
      { label: 'Diretrizes', href: '/brandbook/guidelines' },
      { label: 'Estratégia', href: '/brandbook/strategy' },
      { label: 'Logo', href: '/brandbook/logo' },
      { label: 'Ícones', href: '/brandbook/icons' },
      { label: 'Moodboard', href: '/brandbook/moodboard' },
      { label: 'Fundações', href: '/brandbook/foundations' },
    ],
  },
  {
    heading: 'Tokens e Visual',
    links: [
      { label: 'Escala de Espaçamento', href: '/brandbook/spacing-scale' },
      { label: 'Superfícies', href: '/brandbook/surfaces' },
      { label: 'Tokens Semânticos', href: '/brandbook/semantic-tokens' },
      { label: 'Efeitos', href: '/brandbook/effects' },
      { label: 'Padrões', href: '/brandbook/patterns' },
      { label: 'Movimento', href: '/brandbook/motion' },
      { label: 'Efeitos Visuais', href: '/brandbook/vfx' },
    ],
  },
  {
    heading: 'Componentes',
    links: [
      { label: 'Visão Geral', href: '/brandbook/components' },
      { label: 'Botões', href: '/brandbook/buttons' },
      { label: 'Cards', href: '/brandbook/cards' },
      { label: 'Formulários', href: '/brandbook/forms' },
      { label: 'Seções', href: '/brandbook/sections' },
      { label: 'Avançados', href: '/brandbook/advanced' },
    ],
  },
  {
    heading: 'Ecossistema',
    links: [
      { label: 'Marca Empresa', href: '/brandbook/company-brand' },
      { label: 'Marca Pessoal', href: '/brandbook/personal-brand' },
      { label: 'Builders', href: '/brandbook/movement' },
      { label: 'Produtos', href: '/brandbook/products' },
    ],
  },
  {
    heading: 'Meta',
    links: [
      { label: 'Templates', href: '/brandbook/templates' },
      { label: 'SEO e Metadados', href: '/brandbook/seo' },
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
    title: 'Diretrizes de Marca',
    description: 'Filosofia da marca, arquétipos, voz por camada e regras de marca.',
    href: '/brandbook/guidelines',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Brand',
  },
  {
    number: '02',
    title: 'Estratégia de Marca',
    description: '"O Tempo é Rei" — posicionamento, ecossistema 4 camadas, vilões e missão.',
    href: '/brandbook/strategy',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Brand',
  },
  {
    number: '03',
    title: 'Sistema de Logo',
    description: 'Construção do H1-B Hourglass, área segura e regras de uso.',
    href: '/brandbook/logo',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Brand',
  },
  {
    number: '04',
    title: 'Sistema de Ícones',
    description: 'Biblioteca Lucide Icons com tamanhos, cores e diretrizes.',
    href: '/brandbook/icons',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Brand',
  },
  {
    number: '05',
    title: 'Moodboard',
    description: 'Direção visual, estética e referências de design.',
    href: '/brandbook/moodboard',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Brand',
  },
  /* Tokens */
  {
    number: '06',
    title: 'Fundações',
    description: 'Cores, tipografia, espaçamento e todos os design tokens.',
    href: '/brandbook/foundations',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Tokens',
  },
  {
    number: '07',
    title: 'Escala de Espaçamento',
    description: 'Tokens de espaçamento nomeados e numéricos com réguas visuais.',
    href: '/brandbook/spacing-scale',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Tokens',
  },
  {
    number: '08',
    title: 'Superfícies',
    description: 'Sistema de elevação com 5 camadas e demos interativos.',
    href: '/brandbook/surfaces',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Tokens',
  },
  {
    number: '09',
    title: 'Tokens Semânticos',
    description: 'Escala azul, cores de sinal, bordas, easing e z-index.',
    href: '/brandbook/semantic-tokens',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Tokens',
  },
  /* Visual */
  {
    number: '10',
    title: 'Efeitos',
    description: 'Borda rotativa, pool ambiente, grain e marca d\'água.',
    href: '/brandbook/effects',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Visual',
  },
  {
    number: '11',
    title: 'Padrões',
    description: 'Padrões de cards, composições de seções e texturas.',
    href: '/brandbook/patterns',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Visual',
  },
  {
    number: '12',
    title: 'Movimento',
    description: 'Curvas de easing, durações e efeitos de scroll.',
    href: '/brandbook/motion',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Visual',
  },
  {
    number: '13',
    title: 'Efeitos Visuais',
    description: 'Aurora, gradientes mesh, parallax e efeitos avançados.',
    href: '/brandbook/vfx',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Visual',
  },
  /* Components */
  {
    number: '14',
    title: 'Componentes',
    description: 'Catálogo completo de componentes e navegação.',
    href: '/brandbook/components',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Components',
  },
  {
    number: '15',
    title: 'Botões',
    description: 'Variantes primário, secundário, ghost, hero e link.',
    href: '/brandbook/buttons',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Components',
  },
  {
    number: '16',
    title: 'Cards',
    description: 'Standard, acentuado, glass, featured, KPI e conteúdo.',
    href: '/brandbook/cards',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Components',
  },
  {
    number: '17',
    title: 'Formulários',
    description: 'Inputs, textareas, selects, validação e glass-morphism.',
    href: '/brandbook/forms',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Components',
  },
  {
    number: '18',
    title: 'Seções',
    description: 'Larguras de container, espaçamento de seções e composições.',
    href: '/brandbook/sections',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Components',
  },
  {
    number: '19',
    title: 'Avançados',
    description: 'Accordions, tabs, contadores e componentes marquee.',
    href: '/brandbook/advanced',
    span: 'md:col-span-6 lg:col-span-4',
    category: 'Components',
  },
  /* Ecosystem */
  {
    number: '20',
    title: 'Marca Empresa',
    description: 'Essência, valores, voz, Kapferer, arquitetura e posicionamento.',
    href: '/brandbook/company-brand',
    span: 'md:col-span-6 lg:col-span-6',
    category: 'Ecosystem',
    isNew: true,
  },
  {
    number: '21',
    title: 'Marca Pessoal',
    description: 'Moroni Reis: arquétipos, mantras, conteúdo e estilo visual.',
    href: '/brandbook/personal-brand',
    span: 'md:col-span-6 lg:col-span-6',
    category: 'Ecosystem',
    isNew: true,
  },
  {
    number: '22',
    title: 'Builders',
    description: 'Movimento Builders, tribo, vilões, manifesto e rituais.',
    href: '/brandbook/movement',
    span: 'md:col-span-6 lg:col-span-6',
    category: 'Ecosystem',
    isNew: true,
  },
  {
    number: '23',
    title: 'Produtos + Systems',
    description: 'Produtos Systems, pilares do ecossistema e arquitetura de oferta.',
    href: '/brandbook/products',
    span: 'md:col-span-6 lg:col-span-6',
    category: 'Ecosystem',
    isNew: true,
  },
  /* Meta */
  {
    number: '24',
    title: 'Templates de Página',
    description: 'Três templates reutilizáveis e guias de layout.',
    href: '/brandbook/templates',
    span: 'md:col-span-6 lg:col-span-6',
    category: 'Meta',
    isNew: true,
  },
  {
    number: '25',
    title: 'SEO e Metadados',
    description: 'Padrões de título, imagens OG, dados estruturados e sitemap.',
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
    { label: 'Builders', href: '/brandbook/movement' },
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
    { label: 'Builders', href: '/brandbook/movement' },
    { label: 'Products', href: '/brandbook/products' },
    { label: 'Guidelines', href: '/brandbook/guidelines' },
  ],
  '/brandbook/personal-brand': [
    { label: 'Company Brand', href: '/brandbook/company-brand' },
    { label: 'Builders', href: '/brandbook/movement' },
    { label: 'Guidelines', href: '/brandbook/guidelines' },
  ],
  '/brandbook/movement': [
    { label: 'Products', href: '/brandbook/products' },
    { label: 'Company Brand', href: '/brandbook/company-brand' },
    { label: 'Personal Brand', href: '/brandbook/personal-brand' },
  ],
  '/brandbook/products': [
    { label: 'Builders', href: '/brandbook/movement' },
    { label: 'Company Brand', href: '/brandbook/company-brand' },
    { label: 'Strategy', href: '/brandbook/strategy' },
  ],
};
