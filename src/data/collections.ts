export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tagline: string;
  image: string;
  productCount: number;
  highlightedIds: string[];
}

export const collections: CollectionItem[] = [
  {
    id: 'signature',
    title: 'The Signature Collection',
    subtitle: 'The Four Pillars of Presence',
    tagline: 'Crafted as the foundational olfactory identity of H&A Luxury.',
    description:
      'Comprising H&A Noir, H&A Oud, H&A Amber, and H&A Élite. Each composition represents an uncompromising devotion to master perfumery and rare natural distillates.',
    image: '/src/assets/images/hero-bottle.jpg',
    productCount: 4,
    highlightedIds: ['ha-noir', 'ha-oud', 'ha-amber', 'ha-elite'],
  },
  {
    id: 'private-blend',
    title: 'The Private Blend',
    subtitle: 'High-Concentration Extraits',
    tagline: 'Artisanal creations blended with raw, unapologetic intensity.',
    description:
      'Dark leathers, sacred resins, and midnight florals. Designed for patrons who seek deep sillage and unique aromatic character.',
    image: '/src/assets/images/bottle-noir.jpg',
    productCount: 3,
    highlightedIds: ['ha-cuir-obscur', 'ha-santal-imperial', 'ha-rose-royale'],
  },
  {
    id: 'fresh-atelier',
    title: 'The Fresh Atelier',
    subtitle: 'Solar & Mineral Precision',
    tagline: 'Crisp, crystalline citruses anchored in sea amber and vetiver roots.',
    description:
      'Modern, architectural freshness that avoids the fleeting nature of ordinary colognes. Engineered for all-day radiance.',
    image: '/src/assets/images/bottle-amber.jpg',
    productCount: 2,
    highlightedIds: ['ha-elite', 'ha-vetiver-prive'],
  },
  {
    id: 'discovery-coffret',
    title: 'The Discovery Coffret',
    subtitle: 'Bespoke 5 x 10ML Tasting Experience',
    tagline: 'Explore the full spectrum of H&A before committing to a full flacon.',
    description:
      'Encased in our signature black lacquered wooden presentation box with a gold testing atomizer. Includes a PKR 4,000 voucher towards your full bottle.',
    image: '/src/assets/images/hero-bottle.jpg',
    productCount: 5,
    highlightedIds: ['ha-noir', 'ha-oud', 'ha-amber', 'ha-elite', 'ha-cuir-obscur'],
  },
];
