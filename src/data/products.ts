import bottleNoir from '../assets/images/bottle-noir.jpg';
import bottleAmber from '../assets/images/bottle-amber.jpg';
import heroBottle from '../assets/images/hero-bottle.jpg';

export interface FragranceNoteGroup {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductSize {
  size: string;
  price: string;
  rawPrice: number;
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
  secondaryImage?: string;
  bestSeller: boolean;
  isSignature: boolean;
  volume: string;
  rating: number;
  reviewsCount: number;
}

export const products: Product[] = [
  {
    id: 'ha-noir',
    name: 'H&A Noir',
    tagline: 'The Essence of Midnight Seduction',
    family: 'Intense',
    concentration: 'Extrait de Parfum — 30% Essence',
    price: 'PKR 8,500',
    rawPrice: 8500,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 8,500', rawPrice: 8500 },
      { size: '100ML', price: 'PKR 14,200', rawPrice: 14200 },
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
    image: bottleNoir,
    secondaryImage: heroBottle,
    bestSeller: true,
    isSignature: true,
    rating: 4.95,
    reviewsCount: 0,
  },
  {
    id: 'ha-oud',
    name: 'H&A Oud',
    tagline: 'Ancestral Agarwood Reimagined for the Modern Icon',
    family: 'Woody',
    concentration: 'Extrait de Parfum — 32% Essence',
    price: 'PKR 9,200',
    rawPrice: 9200,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 9,200', rawPrice: 9200 },
      { size: '100ML', price: 'PKR 15,500', rawPrice: 15500 },
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
    image: bottleAmber,
    secondaryImage: bottleNoir,
    bestSeller: true,
    isSignature: true,
    rating: 4.92,
    reviewsCount: 0,
  },
  {
    id: 'ha-amber',
    name: 'H&A Amber',
    tagline: 'Liquid Gold and Velvet Embers',
    family: 'Oriental',
    concentration: 'Eau de Parfum Intense — 25% Essence',
    price: 'PKR 8,800',
    rawPrice: 8800,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 8,800', rawPrice: 8800 },
      { size: '100ML', price: 'PKR 14,800', rawPrice: 14800 },
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
    image: bottleAmber,
    secondaryImage: heroBottle,
    bestSeller: true,
    isSignature: true,
    rating: 4.9,
    reviewsCount: 0,
  },
  {
    id: 'ha-elite',
    name: 'H&A Élite',
    tagline: 'Crisp Sophistication in High Definition',
    family: 'Fresh',
    concentration: 'Eau de Parfum — 22% Essence',
    price: 'PKR 8,200',
    rawPrice: 8200,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 8,200', rawPrice: 8200 },
      { size: '100ML', price: 'PKR 13,800', rawPrice: 13800 },
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
    image: bottleNoir,
    secondaryImage: bottleAmber,
    bestSeller: true,
    isSignature: true,
    rating: 4.88,
    reviewsCount: 0,
  },
  {
    id: 'ha-santal-imperial',
    name: 'H&A Santal Impérial',
    tagline: 'Aristocratic Creamy Woods and Papyrus',
    family: 'Woody',
    concentration: 'Extrait de Parfum — 28% Essence',
    price: 'PKR 8,600',
    rawPrice: 8600,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 8,600', rawPrice: 8600 },
      { size: '100ML', price: 'PKR 14,500', rawPrice: 14500 },
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
    image: bottleAmber,
    secondaryImage: bottleNoir,
    bestSeller: false,
    isSignature: false,
    rating: 4.89,
    reviewsCount: 0,
  },
  {
    id: 'ha-rose-royale',
    name: 'H&A Rose Royale',
    tagline: 'The Thorny Petals of Dark Oriental Romance',
    family: 'Oriental',
    concentration: 'Extrait de Parfum — 30% Essence',
    price: 'PKR 8,900',
    rawPrice: 8900,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 8,900', rawPrice: 8900 },
      { size: '100ML', price: 'PKR 14,900', rawPrice: 14900 },
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
    image: bottleNoir,
    secondaryImage: heroBottle,
    bestSeller: false,
    isSignature: false,
    rating: 4.93,
    reviewsCount: 0,
  },
  {
    id: 'ha-vetiver-prive',
    name: 'H&A Vétiver Privé',
    tagline: 'Earthy Mineral Purity and Sunlit Citrus',
    family: 'Fresh',
    concentration: 'Eau de Parfum — 24% Essence',
    price: 'PKR 7,900',
    rawPrice: 7900,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 7,900', rawPrice: 7900 },
      { size: '100ML', price: 'PKR 13,200', rawPrice: 13200 },
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
    image: bottleAmber,
    secondaryImage: bottleNoir,
    bestSeller: false,
    isSignature: false,
    rating: 4.84,
    reviewsCount: 0,
  },
  {
    id: 'ha-cuir-obscur',
    name: 'H&A Cuir Obscur',
    tagline: 'Dark Velvet, Black Birch, and Forbidden Smoke',
    family: 'Intense',
    concentration: 'Extrait de Parfum — 33% Essence',
    price: 'PKR 9,500',
    rawPrice: 9500,
    volume: '50ML',
    sizes: [
      { size: '50ML', price: 'PKR 9,500', rawPrice: 9500 },
      { size: '100ML', price: 'PKR 16,000', rawPrice: 16000 },
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
    image: bottleNoir,
    secondaryImage: heroBottle,
    bestSeller: true,
    isSignature: false,
    rating: 4.96,
    reviewsCount: 0,
  },
];
