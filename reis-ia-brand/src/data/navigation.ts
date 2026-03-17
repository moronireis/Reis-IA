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
        heading: '',
        links: [
          { label: 'Guidelines', href: '/brandbook/guidelines' },
          { label: 'Strategy', href: '/brandbook/strategy' },
          { label: 'Logo', href: '/brandbook/logo' },
          { label: 'Icons', href: '/brandbook/icons' },
          { label: 'Moodboard', href: '/brandbook/moodboard' },
          { label: 'Foundations', href: '/brandbook/foundations' },
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
}

export const homeSections: SectionCard[] = [
  {
    number: '01',
    title: 'Brand Guidelines',
    description: 'Voice, personality, manifesto, and brand principles.',
    href: '/brandbook/guidelines',
    span: 'md:col-span-6 lg:col-span-4',
  },
  {
    number: '02',
    title: 'Foundations',
    description: 'Colors, typography, spacing, and all design tokens.',
    href: '/brandbook/foundations',
    span: 'md:col-span-6 lg:col-span-4',
  },
  {
    number: '03',
    title: 'Logo System',
    description: 'H1-B Hourglass construction, safe space, and usage rules.',
    href: '/brandbook/logo',
    span: 'md:col-span-6 lg:col-span-4',
  },
  {
    number: '04',
    title: 'Icon System',
    description: '32-icon library plus the H1-B and agent icons.',
    href: '/brandbook/icons',
    span: 'md:col-span-6 lg:col-span-4',
  },
  {
    number: '05',
    title: 'Surfaces & Elevation',
    description: '5-tier surface system with borders and shadows.',
    href: '/brandbook/surfaces',
    span: 'md:col-span-6 lg:col-span-4',
  },
  {
    number: '06',
    title: 'Effects & Motion',
    description: 'Grain, scanner, and animation system.',
    href: '/brandbook/effects',
    span: 'md:col-span-6 lg:col-span-4',
  },
  {
    number: '07',
    title: 'Components',
    description: 'Buttons, cards, forms, and advanced UI patterns.',
    href: '/brandbook/components',
    span: 'md:col-span-6 lg:col-span-6',
  },
  {
    number: '08',
    title: 'Strategy',
    description: 'Positioning, enemy narrative, and ICP definition.',
    href: '/brandbook/strategy',
    span: 'md:col-span-6 lg:col-span-6',
  },
];
