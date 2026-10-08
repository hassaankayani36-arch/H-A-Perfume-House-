import { products as sourceProducts } from '../../Data/data.js';

const productImageAssets = import.meta.glob<string>('../../Data/imgs/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

export interface FragranceNoteGroup {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductSize {
  size: string;
  price: string;
  rawPrice: number;
  discountedPrice: number;
  compareAtPrice?: string;
  compareAtRawPrice?: number;
  isTester?: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  family: 'Fresh' | 'Woody' | 'Oriental' | 'Intense';
  concentration: string;
  price: string;
  rawPrice: number;
  discountedPrice: number;
  sizes: ProductSize[];
  notes: FragranceNoteGroup;
  description: string;
  story: string;
  sillage: string;
  longevity: string;
  occasion: string;
  howToWear: string;
  image: string;
  gallery: string[];
  bestSeller: boolean;
  isSignature: boolean;
  discounted: boolean;
  discountPercent?: number;
  volume: string;
  tags: string[];
  stock: boolean;
  longevityPercent: number;
  projection: string;
  projectionPercent: number;
}

const formatPrice = (price: number) => `PKR ${price.toLocaleString('en-PK')}`;

function resolveProductImage(imagePath: string, productName: string): string {
  if (!imagePath.startsWith('imgs/')) return imagePath;

  const assetPath = `../../Data/${imagePath}`;
  const image = productImageAssets[assetPath];
  if (!image) {
    throw new Error(`Missing product image "${imagePath}" for ${productName}.`);
  }

  return image;
}

function getFamily(tags: string[], name: string): Product['family'] {
  const labels = `${tags.join(' ')} ${name}`.toLowerCase();
  if (/fresh|citrus|aquatic|sport|blue/.test(labels)) return 'Fresh';
  if (/oud|woody|wood|leather/.test(labels)) return 'Woody';
  if (/oriental|amber|spicy|floral|gourmand/.test(labels)) return 'Oriental';
  return 'Intense';
}

function getLongevityPercent(longevity: string): number {
  const hours = Number(longevity.match(/\d+/)?.[0]);
  return Number.isFinite(hours) ? Math.min(100, Math.max(30, hours * 8)) : 70;
}

function getProjectionPercent(projection: string): number {
  const level = projection.toLowerCase();
  if (level.includes('strong') || level.includes('beast')) return 85;
  if (level.includes('moderate') || level.includes('medium')) return 60;
  if (level.includes('soft') || level.includes('light')) return 35;
  return 65;
}

export const products: Product[] = sourceProducts.map((sourceProduct, index) => {
  const name = sourceProduct.name.trim();
  const price = Number(sourceProduct.price);
  const tags = sourceProduct.tags.map((tag) => String(tag).toUpperCase());
  const family = getFamily(tags, name);
  const descriptionArticle = family === 'Oriental' || family === 'Intense' ? 'An' : 'A';
  const gallery = sourceProduct.images.map((imagePath) =>
    resolveProductImage(String(imagePath), name)
  );
  const notes: FragranceNoteGroup = {
    top: sourceProduct.topNotes.map(String),
    heart: sourceProduct.heartNotes.map(String),
    base: sourceProduct.baseNotes.map(String),
  };
  const discountedPrice = Math.max(0, price - 100);
  const image = gallery[0];
  const sizes: ProductSize[] = sourceProduct.sizes.map((size) => ({
    size: String(size).toUpperCase(),
    price: formatPrice(discountedPrice),
    rawPrice: price,
    discountedPrice,
    compareAtPrice: formatPrice(price),
    compareAtRawPrice: price,
  }));
  const firstNote = notes.top[0] ?? 'aromatic notes';
  const heartNote = notes.heart[0] ?? 'a balanced heart';
  const baseNote = notes.base[0] ?? 'a warm base';

  return {
    id: String(sourceProduct.id),
    name,
    tagline: `${family} notes, thoughtfully composed.`,
    family,
    concentration: 'Perfume',
    price: formatPrice(discountedPrice),
    rawPrice: price,
    discountedPrice,
    sizes,
    notes,
    description: `${descriptionArticle} ${family.toLowerCase()} perfume with a distinctive opening of ${notes.top.join(', ')}, a heart of ${notes.heart.join(', ')}, and a base of ${notes.base.join(', ')}. Its ${String(sourceProduct.longevity)} longevity and ${String(sourceProduct.projection).toLowerCase()} projection create a memorable presence. Available in ${sourceProduct.sizes.join(' and ')}.`,
    story: `A ${family.toLowerCase()} perfume presented by H&A, with a composition shaped by ${firstNote}, ${heartNote}, and ${baseNote}.`,
    sillage: sourceProduct.projection,
    longevity: sourceProduct.longevity,
    occasion: tags.join(', '),
    howToWear: 'Apply to pulse points and allow the perfume to settle naturally on skin.',
    image,
    gallery,
    bestSeller: index < 8,
    isSignature: index < 4,
    discounted: true,
    discountPercent: Math.round(((price - discountedPrice) / price) * 100),
    volume: sourceProduct.sizes.join(' / '),
    tags,
    stock: String(sourceProduct.stock).toLowerCase() === 'in stock',
    longevityPercent: getLongevityPercent(String(sourceProduct.longevity)),
    projection: String(sourceProduct.projection),
    projectionPercent: getProjectionPercent(String(sourceProduct.projection)),
  };
});

export default products;
