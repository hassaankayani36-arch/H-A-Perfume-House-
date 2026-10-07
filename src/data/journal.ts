import heroBottle from '../assets/images/hero-bottle.jpg';
import bottleNoir from '../assets/images/bottle-noir.jpg';
import bottleAmber from '../assets/images/bottle-amber.jpg';

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  content: string[];
  quote: string;
}

export const journalArticles: JournalArticle[] = [
  {
    id: 'journal-1',
    slug: 'the-art-of-sillage',
    title: 'The Art of Sillage: Why Presence Outlasts Memory',
    category: 'Philosophy & Technique',
    readTime: '4 MIN READ',
    date: 'OCTOBER 2026',
    author: 'Hassaan Kayani',
    excerpt:
      'Fragrance is the invisible architecture of your presence. It enters the room before you speak and lingers long after you have departed.',
    image: heroBottle,
    quote:
      'True elegance does not shout for attention; it creates a gravitational pull.',
    content: [
      'In French, the term "sillage" evokes the wake of an ocean vessel through midnight waters—the lingering disturbance left in the surface long after the ship has disappeared past the horizon.',
      'When Arslan and I began conceptualizing H&A Luxury, our paramount objective was to reclaim fragrance from disposable consumerism. A fragrance should never be merely decorative. It is an extension of psychological posture.',
      'By utilizing heavy 30%+ extrait concentrations, our compositions bond uniquely to the wearer’s natural body chemistry. The top notes of Calabrian bergamot or smoked cardamom might dazzle in the initial minutes, but the true testament of luxury lies in the eighth hour: the amber embers, the dark oud resins, and the musk that only intimate companions are permitted to discover.',
    ],
  },
  {
    id: 'journal-2',
    slug: 'origin-of-ha-oud',
    title: 'Between Grasse and the Orient: The Origin of H&A Oud',
    category: 'Raw Materials',
    readTime: '6 MIN READ',
    date: 'SEPTEMBER 2026',
    author: 'Arslan Qamar',
    excerpt:
      'Journeying into the sacred distillations of aged agarwood, we bridge classical French restraint with the primordial power of Eastern resins.',
    image: bottleNoir,
    quote:
      'Agarwood is not merely an ingredient; it is liquid history matured under silent decades.',
    content: [
      'Genuine agarwood (Oud) is among the most precious botanical substances on earth, formed only when Aquilaria trees respond to natural conditions by producing an aromatic dark resin.',
      'Many commercial fragrances utilize synthetic accords that mimic oud with harsh, medicinal faceting. For H&A Oud, our standard was uncompromising: sustainably aged Cambodian agarwood distilled slowly in copper stills, then rounded with Atlas cedar and green cardamom.',
      'The outcome is a woody extrait of regal restraint. It possesses no abrasive edges, only smoky suede, antique bookshelves, and a dark spiritual radiance that elevates the wearer instantly.',
    ],
  },
  {
    id: 'journal-3',
    slug: 'how-to-curate-fragrance-wardrobe',
    title: 'The Architecture of a Signature: Olfactory Wardrobes',
    category: 'Curation',
    readTime: '5 MIN READ',
    date: 'AUGUST 2026',
    author: 'H&A Atelier',
    excerpt:
      'A singular signature scent is iconic, yet discerning patrons understand the power of rotating compositions to match season, climate, and intent.',
    image: bottleAmber,
    quote:
      'Wear your scent like bespoke tailoring—cut precisely to the mood and the hour.',
    content: [
      'Just as one does not wear black velvet under the noon sun or lightweight linen to an autumn gala, an olfactory wardrobe must be intentional.',
      'Begin your foundation with a daytime anchor such as H&A Élite: clean, razor-sharp citrus with French lavender and white ambergris that projects crisp authority without overwhelming close quarters.',
      'For twilight and celebratory evenings, transition seamlessly into H&A Noir or Cuir Obscur. The richer amber, rose, and smoky leather facets bloom effortlessly in cooler evening air, radiating an intoxicating warmth.',
    ],
  },
];
