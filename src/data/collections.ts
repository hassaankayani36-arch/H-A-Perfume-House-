import type { Product } from './products.ts';

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tagline: string;
  family: Product['family'];
}

export const collections: CollectionItem[] = [
  {
    id: 'fresh',
    title: 'Fresh Perfumes',
    subtitle: 'Citrus & Aromatic Notes',
    tagline: 'Bright, clean compositions for everyday wear.',
    description:
      'Explore perfumes built around fresh citrus, aquatic, and aromatic notes.',
    family: 'Fresh',
  },
  {
    id: 'woody',
    title: 'Woody Perfumes',
    subtitle: 'Woods & Leather',
    tagline: 'Grounded scents with a warm, textured character.',
    description:
      'Discover compositions featuring oud, woods, and leather-inspired notes.',
    family: 'Woody',
  },
  {
    id: 'oriental',
    title: 'Oriental Perfumes',
    subtitle: 'Amber, Spice & Florals',
    tagline: 'Expressive blends with rich, enveloping notes.',
    description:
      'Browse perfumes with warm amber, spice, floral, and gourmand facets.',
    family: 'Oriental',
  },
  {
    id: 'distinctive',
    title: 'Distinctive Perfumes',
    subtitle: 'Characterful Compositions',
    tagline: 'Explore scents with their own distinctive character.',
    description:
      'A selection of perfumes spanning varied notes, styles, and occasions.',
    family: 'Intense',
  },
];
