export type Product = {
  slug: string;
  name: string;
  category: 'aneis' | 'colares' | 'brincos' | 'pulseiras';
  collection: string;
  price: number;
  shortDescription: string;
  longDescription: string;
  details: string[];
  metal: string;
  stones?: string;
  hero: string;
  gallery: string[];
  badge?: string;
};

const u = (id: string, w = 1200, q = 80) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const products: Product[] = [
  {
    slug: 'anel-solitario-vega',
    name: 'Anel Solitário Vega',
    category: 'aneis',
    collection: 'Constelação',
    price: 18900,
    shortDescription: 'Solitário em ouro 18k com diamante central de 0.50ct.',
    longDescription:
      'Inspirado na estrela mais brilhante da constelação de Lira, o Vega é uma declaração de presença. Lapidação brilhante, garras invisíveis e aro afilado para que o diamante respire.',
    details: [
      'Ouro amarelo 18k (4.2g)',
      'Diamante central 0.50ct — VS1, F',
      'Lapidação brilhante redondo',
      'Aro 1.7mm com acabamento espelhado',
      'Certificado GIA incluso',
    ],
    metal: 'Ouro 18k',
    stones: 'Diamante 0.50ct',
    hero: u('photo-1605100804763-247f67b3557e'),
    gallery: [
      u('photo-1605100804763-247f67b3557e'),
      u('photo-1611591437281-460bfbe1220a'),
      u('photo-1602173574767-37ac01994b2a'),
    ],
    badge: 'Edição limitada',
  },
  {
    slug: 'colar-aurora',
    name: 'Colar Aurora',
    category: 'colares',
    collection: 'Constelação',
    price: 12400,
    shortDescription: 'Pingente de ouro rosé com gota de quartzo morganita.',
    longDescription:
      'O Aurora desliza pela clavícula como um nascer do dia. Corrente veneziana fina, fecho sob pressão, gota de morganita lapidada à mão por nosso atelier em Belo Horizonte.',
    details: [
      'Ouro rosé 18k (3.1g)',
      'Morganita 1.8ct lapidação gota',
      'Corrente 45cm + extensor 5cm',
      'Fecho de pressão dupla trava',
    ],
    metal: 'Ouro rosé 18k',
    stones: 'Morganita',
    hero: u('photo-1599643478518-a784e5dc4c8f'),
    gallery: [
      u('photo-1599643478518-a784e5dc4c8f'),
      u('photo-1573408301185-9146fe634ad0'),
    ],
  },
  {
    slug: 'brincos-orvalho',
    name: 'Brincos Orvalho',
    category: 'brincos',
    collection: 'Jardim',
    price: 8650,
    shortDescription: 'Argolas duplas em ouro branco com diamantes pavê.',
    longDescription:
      'Pequenas e ousadas. Duas argolas que se sobrepõem em planos diferentes, capturando luz a cada movimento. Pavê de diamantes brancos em metade da circunferência.',
    details: [
      'Ouro branco 18k (2.8g par)',
      '54 diamantes (0.32ct totais)',
      'Diâmetro externo 12mm',
      'Fecho de pressão',
    ],
    metal: 'Ouro branco 18k',
    stones: 'Diamantes pavê',
    hero: u('photo-1535632787350-4e68ef0ac584'),
    gallery: [u('photo-1535632787350-4e68ef0ac584'), u('photo-1629224316810-9d8805b95e76')],
    badge: 'Best-seller',
  },
  {
    slug: 'pulseira-rio',
    name: 'Pulseira Rio',
    category: 'pulseiras',
    collection: 'Jardim',
    price: 6900,
    shortDescription: 'Riviera de safiras azuis em ouro branco 18k.',
    longDescription:
      'Trinta e duas safiras azuis em gradiente sobre uma estrutura de ouro branco articulada. Confortável o suficiente para usar todos os dias — para quem decide viver assim.',
    details: [
      'Ouro branco 18k (8.4g)',
      '32 safiras azuis (5.6ct totais)',
      'Comprimento 17cm — ajustável',
      'Fecho gaveta com trava de segurança',
    ],
    metal: 'Ouro branco 18k',
    stones: 'Safiras azuis',
    hero: u('photo-1611652022419-a9419f74343d'),
    gallery: [u('photo-1611652022419-a9419f74343d'), u('photo-1588444837495-c6cfeb53f32d')],
  },
  {
    slug: 'anel-meridiano',
    name: 'Anel Meridiano',
    category: 'aneis',
    collection: 'Arquitetura',
    price: 4200,
    shortDescription: 'Aliança ampla com torção em ouro amarelo escovado.',
    longDescription:
      'Uma faixa larga que torce uma única vez sobre o dedo. Acabamento escovado fosco que, com o tempo, se torna mais bonito — não menos. Para usar isolado ou em pilha.',
    details: [
      'Ouro amarelo 18k (5.6g)',
      'Largura 6mm',
      'Acabamento escovado fosco',
      'Aros 12 a 22 — sob medida',
    ],
    metal: 'Ouro 18k',
    hero: u('photo-1515562141207-7a88fb7ce338'),
    gallery: [u('photo-1515562141207-7a88fb7ce338')],
  },
  {
    slug: 'colar-linha-dagua',
    name: 'Colar Linha d’Água',
    category: 'colares',
    collection: 'Arquitetura',
    price: 3850,
    shortDescription: 'Gargantilha minimalista de ouro com elo singular.',
    longDescription:
      'Uma única linha de ouro 18k atravessa a clavícula. Sem pingente, sem ornamento. Apenas a peça falando por si — como joia deveria ser.',
    details: ['Ouro amarelo 18k (4.0g)', 'Comprimento 40cm', 'Espessura 1.2mm', 'Fecho mosquetão'],
    metal: 'Ouro 18k',
    hero: u('photo-1611085583191-a3b181a88401'),
    gallery: [u('photo-1611085583191-a3b181a88401')],
  },
  {
    slug: 'brincos-noturno',
    name: 'Brincos Noturno',
    category: 'brincos',
    collection: 'Constelação',
    price: 14200,
    shortDescription: 'Maxi brincos com onix negro e contorno de diamantes.',
    longDescription:
      'Pretos como a noite. O onix negro lapidado em gota é envolto por uma fileira de diamantes brancos — luz e sombra na mesma peça. Para ocasiões em que se entra na sala antes de qualquer apresentação.',
    details: [
      'Ouro branco 18k (6.2g par)',
      '2 onix negros (4ct totais)',
      '48 diamantes (0.42ct totais)',
      'Comprimento 38mm',
    ],
    metal: 'Ouro branco 18k',
    stones: 'Onix + Diamantes',
    hero: u('photo-1602173574767-37ac01994b2a'),
    gallery: [u('photo-1602173574767-37ac01994b2a')],
    badge: 'Novidade',
  },
  {
    slug: 'pulseira-pomar',
    name: 'Pulseira Pomar',
    category: 'pulseiras',
    collection: 'Jardim',
    price: 5400,
    shortDescription: 'Bracelete em ouro com esmeraldas em gradiente.',
    longDescription:
      'Cinco esmeraldas brasileiras em tons de verde que progridem do musgo ao primavera. Um pedaço da Mata Atlântica usado no pulso.',
    details: [
      'Ouro amarelo 18k (7.1g)',
      '5 esmeraldas (3.2ct totais)',
      'Cabo rígido 60mm de diâmetro interno',
      'Origem: Minas Gerais',
    ],
    metal: 'Ouro 18k',
    stones: 'Esmeraldas',
    hero: u('photo-1543294001-f7cd5d7fb516'),
    gallery: [u('photo-1543294001-f7cd5d7fb516')],
  },
];

export const collections = [
  {
    slug: 'constelacao',
    name: 'Constelação',
    tagline: 'Peças inspiradas no movimento da luz',
    cover: u('photo-1573408301185-9146fe634ad0'),
  },
  {
    slug: 'jardim',
    name: 'Jardim',
    tagline: 'Esmeraldas, safiras e morganitas',
    cover: u('photo-1611652022419-a9419f74343d'),
  },
  {
    slug: 'arquitetura',
    name: 'Arquitetura',
    tagline: 'Linhas limpas, ouro escovado, presença',
    cover: u('photo-1515562141207-7a88fb7ce338'),
  },
];

export const formatBRL = (cents: number) =>
  (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);
