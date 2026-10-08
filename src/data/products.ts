export interface FragranceNoteGroup {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductSize {
  size: string;
  price: string;
  rawPrice: number;
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

const catalogue: Omit<
  Product,
  'discounted' | 'discountPercent' | 'image' | 'secondaryImage' | 'tags' | 'stock' | 'longevityPercent' | 'projection' | 'projectionPercent'
>[] = [
  {
    id: 'ha-noir',
    name: 'H&A Noir',
    tagline: 'The Essence of Midnight Seduction',
    family: 'Intense',
    concentration: 'Extrait de Parfum — 30% Essence',
    price: 'PKR 1,500',
    rawPrice: 1500,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 1,500', rawPrice: 1500 },
      { size: '100ML', price: 'PKR 2,500', rawPrice: 2500 },
    ],
    notes: {
      top: ['Calabrian Bergamot', 'Persian Saffron'],
      heart: ['Damascena Rose', 'Warm Golden Amber'],
      base: ['Smoked Royal Oud', 'Sensual Musk', 'Bourbon Vanilla'],
    },
    description:
      'H&A Noir is an intoxicating exploration of chiaroscuro—where radiant Mediterranean citrus meets the shadowed velvet depths of rare agarwood and spun saffron. Designed to leave an enduring, hypnotic sillage long after you have departed the room.',
    story:
      'Conceived in the quiet hours between midnight and dawn, Hassaan & Arslan sought to distill the quiet confidence of commanding a room without uttering a single word. A composition of sheer gravitas.',
    sillage: 'Heavy & Alluring',
    longevity: '14+ Hours on Skin',
    occasion: 'Black Tie, Intimate Dinners, High-Stakes Presence',
    howToWear:
      'Apply 2 to 3 measured sprays to pulse points: behind the ear lobes, base of the throat, and inside the wrists. Allow the fragrance to meld naturally without rubbing.',
    bestSeller: true,
    isSignature: true,
  },
  {
    id: 'ha-oud',
    name: 'H&A Oud',
    tagline: 'Ancestral Agarwood Reimagined for the Modern Icon',
    family: 'Woody',
    concentration: 'Extrait de Parfum — 32% Essence',
    price: 'PKR 1,500',
    rawPrice: 1500,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 1,500', rawPrice: 1500 },
      { size: '100ML', price: 'PKR 2,600', rawPrice: 2600 },
    ],
    notes: {
      top: ['Smoked Green Cardamom', 'Omani Frankincense'],
      heart: ['Atlas Cedarwood', 'Aged Cambodian Agarwood'],
      base: ['Russian Leather', 'Smoked Birch', 'Fossilized Amber'],
    },
    description:
      'A majestic tribute to Middle Eastern olfactory heritage stripped of all excess. Raw, regal, and smoky with facets of warm cedar, dry spices, and supple black leather.',
    story:
      'Sourced from sustainably aged agarwood hearts, H&A Oud balances primordial resinous power with contemporary European refinement. It is the signature of kings and visionaries.',
    sillage: 'Commanding & Unapologetic',
    longevity: '16+ Hours',
    occasion: 'Ceremonial, Winter Evenings, Boardrooms',
    howToWear:
      'One spray to the sternum and one to each wrist creates an aura that unfolds in regal layers throughout the night.',
    bestSeller: true,
    isSignature: true,
  },
  {
    id: 'ha-amber',
    name: 'H&A Amber',
    tagline: 'Liquid Gold and Velvet Embers',
    family: 'Oriental',
    concentration: 'Eau de Parfum Intense — 25% Essence',
    price: 'PKR 1,400',
    rawPrice: 1400,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 1,400', rawPrice: 1400 },
      { size: '100ML', price: 'PKR 2,400', rawPrice: 2400 },
    ],
    notes: {
      top: ['Sweet Mandarin Zest', 'Sri Lankan Cinnamon Bark'],
      heart: ['Labdanum Resin', 'Honeyed Orchid', 'Myrrh'],
      base: ['Roasted Tonka Bean', 'Siam Benzoin', 'Mysore Sandalwood'],
    },
    description:
      'An opulent, golden tapestry of warmth. H&A Amber wraps the wearer in glowing resinous balms, caramelized vanilla pods, and powdered woods with an addictive, comforting halo.',
    story:
      'Inspired by the golden hour over ancient sandstone courtyards, where the air cools and the stone releases centuries of captured sunshine and aromatic spices.',
    sillage: 'Sensual & Enveloping',
    longevity: '12+ Hours',
    occasion: 'Cold Weather, Date Nights, Fireside Lounges',
    howToWear:
      'Spray generously over clothing and warm skin to create a radiant cloud of honeyed resin and spiced woods.',
    bestSeller: true,
    isSignature: true,
  },
  {
    id: 'ha-elite',
    name: 'H&A Élite',
    tagline: 'Crisp Sophistication in High Definition',
    family: 'Fresh',
    concentration: 'Eau de Parfum — 22% Essence',
    price: 'PKR 1,200',
    rawPrice: 1200,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 1,200', rawPrice: 1200 },
      { size: '100ML', price: 'PKR 2,200', rawPrice: 2200 },
    ],
    notes: {
      top: ['Calabrian Bergamot', 'Pink Peppercorn', 'Icy Mint'],
      heart: ['French Lavender Absolute', 'Green Apple', 'Haitian Vetiver'],
      base: ['White Ambergris', 'Indonesian Patchouli', 'Clean Cashmeran'],
    },
    description:
      'The definitive statement of architectural elegance. H&A Élite delivers an invigorating shock of crystalline bergamot and chilled aromatic spices, resting on a tailored foundation of clean woods and sea amber.',
    story:
      'Crafted for the modern vanguard. Hassaan & Arslan engineered Élite to be razor-sharp, energetic, and immaculately poised from early morning arrivals to late evening departures.',
    sillage: 'Vibrant & Clean',
    longevity: '10+ Hours',
    occasion: 'Daytime Executive, Summertime Soirées, Everyday Elegance',
    howToWear:
      'Mist onto collarbones, forearms, and hair for an effervescent burst that remains crisp throughout the day.',
    bestSeller: true,
    isSignature: true,
  },
  {
    id: 'ha-santal-imperial',
    name: 'H&A Santal Impérial',
    tagline: 'Aristocratic Creamy Woods and Papyrus',
    family: 'Woody',
    concentration: 'Extrait de Parfum — 28% Essence',
    price: 'PKR 1,400',
    rawPrice: 1400,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 1,400', rawPrice: 1400 },
      { size: '100ML', price: 'PKR 2,400', rawPrice: 2400 },
    ],
    notes: {
      top: ['Violet Leaf', 'Green Cardamom', 'Crisp Cypress'],
      heart: ['Florentine Orris', 'Egyptian Papyrus', 'Smoky Cedar'],
      base: ['Australian Sandalwood', 'Leather Accord', 'Soft Amber'],
    },
    description:
      'Silky, meditative, and endlessly chic. Santal Impérial evokes ancient library bindings, cashmere scarves, and the comforting stillness of sacred groves.',
    story:
      'A study in quiet luxury. No screaming logos, no synthetic buzz—pure sustainably harvested sandalwood refined to buttery perfection.',
    sillage: 'Subtle & Sophisticated',
    longevity: '12 Hours',
    occasion: 'Art Galleries, Autumn Days, Intellectual Presence',
    howToWear:
      'Spray across chest and wrists. Develops a skin-scent intimate sillage that invites people closer.',
    bestSeller: false,
    isSignature: false,
  },
  {
    id: 'ha-rose-royale',
    name: 'H&A Rose Royale',
    tagline: 'The Thorny Petals of Dark Oriental Romance',
    family: 'Oriental',
    concentration: 'Extrait de Parfum — 30% Essence',
    price: 'PKR 1,400',
    rawPrice: 1400,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 1,400', rawPrice: 1400 },
      { size: '100ML', price: 'PKR 2,400', rawPrice: 2400 },
    ],
    notes: {
      top: ['Damask Rose Water', 'Tart Lychee', 'Black Pepper'],
      heart: ['Taif Mountain Rose', 'Somalian Myrrh', 'Cacao Pod'],
      base: ['Guaiacwood', 'Golden Ambergris', 'Dark Vanilla'],
    },
    description:
      'Not a fragile garden rose, but a dark, intoxicating bloom plucked at dusk. Drenched in dark resins, spicy myrrh, and smoky guaiacwood for an unforgettable signature.',
    story:
      'A tribute to the majestic Taif rose gardens perched high above the desert, where petals are harvested by hand while coated in dawn dew.',
    sillage: 'Mesmerizing & Deep',
    longevity: '14 Hours',
    occasion: 'Romantic Evenings, Galas, Seductive Aura',
    howToWear: 'Spray on collarbones, the nape of the neck, and scarves.',
    bestSeller: false,
    isSignature: false,
  },
  {
    id: 'ha-vetiver-prive',
    name: 'H&A Vétiver Privé',
    tagline: 'Earthy Mineral Purity and Sunlit Citrus',
    family: 'Fresh',
    concentration: 'Eau de Parfum — 24% Essence',
    price: 'PKR 1,200',
    rawPrice: 1200,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 1,200', rawPrice: 1200 },
      { size: '100ML', price: 'PKR 2,200', rawPrice: 2200 },
    ],
    notes: {
      top: ['Ruby Grapefruit', 'Bitter Bigarade', 'Pink Salt'],
      heart: ['Haitian Vetiver Roots', 'Tunisian Neroli', 'Nutmeg'],
      base: ['Damp Oakmoss', 'Virginian Cedar', 'Clean Musk'],
    },
    description:
      'An invigorating testament to understated power. Sparkling bitter citrus yields to the earthy, smoky depth of wild-harvested Haitian vetiver roots and wet stones.',
    story:
      'Formulated for discerning tastemakers who appreciate the green, mineral architecture of natural roots over cloying sweetness.',
    sillage: 'Effortless & Distinguished',
    longevity: '9 Hours',
    occasion: 'Warm Days, High Noon Meetings, Travel',
    howToWear:
      'Apply freely after morning grooming for an elevated, clean presence.',
    bestSeller: false,
    isSignature: false,
  },
  {
    id: 'ha-cuir-obscur',
    name: 'H&A Cuir Obscur',
    tagline: 'Dark Velvet, Black Birch, and Forbidden Smoke',
    family: 'Intense',
    concentration: 'Extrait de Parfum — 33% Essence',
    price: 'PKR 1,500',
    rawPrice: 1500,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 1,500', rawPrice: 1500 },
      { size: '100ML', price: 'PKR 2,600', rawPrice: 2600 },
    ],
    notes: {
      top: ['Cracked Black Pepper', 'Wild Thyme', 'Bergamot Zest'],
      heart: ['Tuscan Glove Leather', 'Night-Blooming Violet', 'Incense'],
      base: ['Cade Wood', 'Birch Tar', 'Dark Amber', 'Castoreum Accord'],
    },
    description:
      'Deep, provocative, and unapologetically bold. Cuir Obscur embodies the sensory rush of bespoke leather ateliers, cigar smoke, and rich aged woods.',
    story:
      'Engineered for those whose presence needs no introduction. An arresting trail of dark leather, smoldering birch, and velvety dark violet.',
    sillage: 'Maximum Projection',
    longevity: '18+ Hours',
    occasion: 'Midnight Events, Leather Jackets, Autumn Nightfall',
    howToWear:
      'One or two sprays are sufficient. An extrait of monumental concentration.',
    bestSeller: true,
    isSignature: false,
  },
  {
    id: 'ha-azure-dusk',
    name: 'H&A Azure Dusk',
    tagline: 'Coastal Air, Blue Citrus, and Clean Woods',
    family: 'Fresh',
    concentration: 'Eau de Parfum — 23% Essence',
    price: 'PKR 1,300',
    rawPrice: 1300,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 1,300', rawPrice: 1300 },
      { size: '100ML', price: 'PKR 2,300', rawPrice: 2300 },
    ],
    notes: {
      top: ['Bitter Orange', 'Sea Salt', 'Juniper'],
      heart: ['Blue Cypress', 'Lavender', 'Neroli'],
      base: ['Driftwood', 'White Musk', 'Mineral Amber'],
    },
    description:
      'A bright, mineral breeze over sun-warmed coastlines. Bitter orange and sea salt open into crisp aromatic woods with a soft, clean musk finish.',
    story:
      'Azure Dusk captures the cool quiet between the last light of day and the first evening star, bottled for an effortless everyday signature.',
    sillage: 'Fresh & Noticeable',
    longevity: '10 Hours',
    occasion: 'Daytime, Travel, Warm Weather',
    howToWear: 'Mist over pulse points after dressing for a fresh, composed trail.',
    bestSeller: false,
    isSignature: false,
  },
  {
    id: 'ha-fleur-dor',
    name: "H&A Fleur d'Or",
    tagline: 'Golden Petals Wrapped in Soft Amber',
    family: 'Oriental',
    concentration: 'Eau de Parfum Intense — 26% Essence',
    price: 'PKR 1,450',
    rawPrice: 1450,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 1,450', rawPrice: 1450 },
      { size: '100ML', price: 'PKR 2,450', rawPrice: 2450 },
    ],
    notes: {
      top: ['Orange Blossom', 'Pear Skin', 'Pink Pepper'],
      heart: ['Jasmine Sambac', 'Golden Rose', 'Iris'],
      base: ['Amber', 'Vanilla Bean', 'Creamy Sandalwood'],
    },
    description:
      'Luminous white petals meet a warm amber glow. A graceful floral heart rests on creamy woods and vanilla for a soft, enveloping finish.',
    story:
      'Inspired by the first golden light falling across an old garden, Fleur d’Or balances delicate florals with the quiet richness of amber.',
    sillage: 'Soft & Enveloping',
    longevity: '12 Hours',
    occasion: 'Evening, Celebrations, Signature Wear',
    howToWear: 'Apply lightly at the neck and wrists to let the floral amber unfold.',
    bestSeller: false,
    isSignature: false,
  },
  {
    id: 'ha-saffron-veil',
    name: 'H&A Saffron Veil',
    tagline: 'A Spiced Amber Accord with a Velvet Finish',
    family: 'Intense',
    concentration: 'Extrait de Parfum — 31% Essence',
    price: 'PKR 1,550',
    rawPrice: 1550,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 1,550', rawPrice: 1550 },
      { size: '100ML', price: 'PKR 2,650', rawPrice: 2650 },
    ],
    notes: {
      top: ['Saffron', 'Cardamom', 'Mandarin Peel'],
      heart: ['Suede', 'Rose Absolute', 'Incense'],
      base: ['Labdanum', 'Oud', 'Vanilla Musk'],
    },
    description:
      'Golden saffron and cool cardamom lead into a suede-soft heart, then settle into deep resins and a lasting veil of warm oud.',
    story:
      'Saffron Veil is a modern study of contrast: precious spice softened by polished suede and grounded in a slow-burning amber accord.',
    sillage: 'Rich & Lasting',
    longevity: '15+ Hours',
    occasion: 'Evening, Formal, Cool Weather',
    howToWear: 'One or two sprays are enough for its warm, long-lasting presence.',
    bestSeller: true,
    isSignature: false,
  },
  {
    id: 'ha-atlas-cedar',
    name: 'H&A Atlas Cedar',
    tagline: 'Dry Cedarwood, Green Spice, and Quiet Smoke',
    family: 'Woody',
    concentration: 'Extrait de Parfum — 29% Essence',
    price: 'PKR 1,450',
    rawPrice: 1450,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 1,450', rawPrice: 1450 },
      { size: '100ML', price: 'PKR 2,500', rawPrice: 2500 },
    ],
    notes: {
      top: ['Juniper Berry', 'Black Pepper', 'Bergamot'],
      heart: ['Atlas Cedar', 'Clary Sage', 'Vetiver'],
      base: ['Oakmoss', 'Dry Amber', 'Smoked Woods'],
    },
    description:
      'Crisp green spice opens onto dry cedar and earthy vetiver. A restrained smoky-amber base leaves a polished, quietly distinctive trail.',
    story:
      'Named for the strength and stillness of the Atlas mountains, this woody composition keeps its lines clean and its character assured.',
    sillage: 'Balanced & Refined',
    longevity: '13 Hours',
    occasion: 'Day-to-Evening, Work, Autumn',
    howToWear: 'Wear on the wrists and chest for a steady cedarwood trail.',
    bestSeller: false,
    isSignature: false,
  },
];

const productMetrics: Record<
  string,
  Pick<Product, 'stock' | 'longevityPercent' | 'projection' | 'projectionPercent'>
> = {
  'ha-noir': { stock: true, longevityPercent: 92, projection: 'Strong', projectionPercent: 86 },
  'ha-oud': { stock: true, longevityPercent: 96, projection: 'Strong', projectionPercent: 92 },
  'ha-amber': { stock: true, longevityPercent: 78, projection: 'Moderate', projectionPercent: 69 },
  'ha-elite': { stock: true, longevityPercent: 66, projection: 'Moderate', projectionPercent: 64 },
  'ha-santal-imperial': { stock: true, longevityPercent: 77, projection: 'Soft', projectionPercent: 48 },
  'ha-rose-royale': { stock: true, longevityPercent: 86, projection: 'Strong', projectionPercent: 80 },
  'ha-vetiver-prive': { stock: true, longevityPercent: 60, projection: 'Moderate', projectionPercent: 58 },
  'ha-cuir-obscur': { stock: true, longevityPercent: 98, projection: 'Strong', projectionPercent: 96 },
  'ha-azure-dusk': { stock: true, longevityPercent: 66, projection: 'Moderate', projectionPercent: 62 },
  'ha-fleur-dor': { stock: true, longevityPercent: 78, projection: 'Moderate', projectionPercent: 69 },
  'ha-saffron-veil': { stock: true, longevityPercent: 90, projection: 'Strong', projectionPercent: 84 },
  'ha-atlas-cedar': { stock: true, longevityPercent: 83, projection: 'Moderate', projectionPercent: 72 },
};

const undiscountedProducts = new Set([
  'ha-santal-imperial',
  'ha-vetiver-prive',
  'ha-azure-dusk',
  'ha-atlas-cedar',
]);

export const products: Product[] = catalogue.map((product, productIndex) => {
  const firstImageNumber = productIndex * 3 + 1;
  const gallery = Array.from(
    { length: 3 },
    (_, imageIndex) =>
      `/images/perfumes/perfume-${String(firstImageNumber + imageIndex).padStart(2, '0')}.jpg`,
  );
  const discounted = !undiscountedProducts.has(product.id);

  return {
    ...product,
    ...productMetrics[product.id],
    tags: [product.family.toUpperCase(), product.family === 'Fresh' ? 'DAYTIME' : 'EVENING'],
    discounted,
    discountPercent: discounted
      ? Math.round((100 / (product.rawPrice + 100)) * 100)
      : undefined,
    image: gallery[0],
    gallery,
    volume: '50ML',
    sizes: product.sizes.map((size) => ({
      ...withDiscount(size, discounted),
      isTester: false,
    })),
  };
});

function withDiscount(size: ProductSize, discounted: boolean): ProductSize {
  if (!discounted) return size;

  const compareAtRawPrice = size.rawPrice + 100;
  return {
    ...size,
    compareAtRawPrice,
    compareAtPrice: `PKR ${compareAtRawPrice.toLocaleString('en-PK')}`,
  };
}
