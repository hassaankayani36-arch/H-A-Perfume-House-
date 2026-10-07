import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { products, Product } from '../data/products.ts';
import ProductCard from './ProductCard.tsx';

type FamilyType = 'Fresh' | 'Woody' | 'Oriental' | 'Intense';

const familyProfiles: Record<FamilyType, { subtitle: string; description: string; mood: string; archetype: string }> = {
  Fresh: {
    subtitle: 'Crystalline Energy & Mineral Purity',
    description:
      'Luminous Calabrian bergamot, chilled mint, and white ambergris. Engineered for daytime sharpness, effortless poise, and clean architectural presence.',
    mood: 'Crisp, Vigorous, Executive',
    archetype: 'The Visionary at High Noon',
  },
  Woody: {
    subtitle: 'Ancestral Resins & Sacred Earth',
    description:
      'Cambodian agarwood hearts, Atlas cedarwood, and Australian sandalwood. Grounded, intellectual, and profoundly commanding without being aggressive.',
    mood: 'Contemplative, Aristocratic, Steadfast',
    archetype: 'The Quiet Authority',
  },
  Oriental: {
    subtitle: 'Liquid Gold & Spiced Embers',
    description:
      'Warm labdanum, Sri Lankan cinnamon bark, caramelized tonka bean, and honeyed resins. Envelops the wearer in a seductive, magnetic golden halo.',
    mood: 'Sensual, Intimate, Warm',
    archetype: 'The Seductive Icon',
  },
  Intense: {
    subtitle: 'Shadowed Velvet & Nocturnal Fire',
    description:
      'Smoked leather, midnight saffron, dark birch tar, and concentrated extraits. Formulated with maximum sillage to leave an undeniable wake.',
    mood: 'Hypnotic, Bold, Unapologetic',
    archetype: 'The Master of the Evening',
  },
};

export const FragranceFinder: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<FamilyType>('Intense');

  const filteredProducts = products.filter((p) => p.family === selectedFamily);
  const profile = familyProfiles[selectedFamily];

  return (
    <section className="py-24 sm:py-32 bg-[#0B0B0B] border-t border-[#1C1C1C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
              OLFACTORY COMPASS
            </span>
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F2EC] uppercase tracking-wide">
            FIND YOUR SIGNATURE
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#F5F2EC]/60 font-light leading-relaxed">
            Select an olfactory family below to uncover the fragrance engineered for your presence.
          </p>

          {/* Interactive Family Selector (Clean luxury tabs) */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-1.5 bg-[#141414] border border-[#242424] max-w-xl mx-auto">
            {(['Fresh', 'Woody', 'Oriental', 'Intense'] as FamilyType[]).map((family) => {
              const active = selectedFamily === family;
              return (
                <button
                  key={family}
                  type="button"
                  onClick={() => setSelectedFamily(family)}
                  className={`flex-1 min-w-[90px] py-2.5 px-4 text-xs uppercase tracking-[0.22em] transition-all duration-300 font-light ${
                    active
                      ? 'bg-[#0B0B0B] text-[#C6A15B] shadow-sm border border-[#C6A15B]/40 font-medium'
                      : 'text-[#F5F2EC]/60 hover:text-[#F5F2EC]'
                  }`}
                >
                  {family}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Family Brief & Archetype */}
        <div className="mb-14 p-6 sm:p-8 bg-[#121212] border border-[#222222] max-w-4xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C6A15B] font-medium block mb-2">
            {profile.subtitle}
          </span>
          <p className="text-sm sm:text-base text-[#F5F2EC]/80 font-light leading-relaxed max-w-2xl mx-auto">
            &ldquo;{profile.description}&rdquo;
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-[#F5F2EC]/50 font-light pt-4 border-t border-[#1C1C1C]">
            <span>
              MOOD: <strong className="text-[#F5F2EC] font-normal">{profile.mood}</strong>
            </span>
            <span>·</span>
            <span>
              ARCHETYPE: <strong className="text-[#C6A15B] font-normal">{profile.archetype}</strong>
            </span>
          </div>
        </div>

        {/* Recommended Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all in Shop with filter */}
        <div className="mt-14 text-center">
          <Link
            to={`/shop?family=${selectedFamily}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-8 decoration-[#C6A15B]/40 font-light transition-colors"
          >
            <span>EXPLORE ALL {selectedFamily.toUpperCase()} CREATIONS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FragranceFinder;
