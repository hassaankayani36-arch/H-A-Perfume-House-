import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products.ts';

export const Lifestyle: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#0B0B0B] border-t border-[#1C1C1C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
              MOMENTS OF DISTINCTION
            </span>
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#F5F2EC] uppercase tracking-wide">
            WEAR THE MOMENT.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#F5F2EC]/60 font-light leading-relaxed">
            From a fresh start to an evening out, explore perfumes selected for different moods
            and occasions.
          </p>
        </div>

        {/* 3-Part Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: 08:00 AM */}
          <div className="group relative bg-[#121212] border border-[#222222] p-8 flex flex-col justify-between overflow-hidden">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-light">
                08:00 AM · THE MORNING ASCENT
              </span>
              <h3 className="font-serif text-2xl text-[#F5F2EC] font-light tracking-wide">
                Crisp Architecture
              </h3>
              <p className="text-xs text-[#F5F2EC]/65 font-light leading-relaxed">
                {products[2].name} opens with {products[2].notes.top.join(', ')} and develops through
                {` ${products[2].notes.heart.join(', ')}`} for an easy daytime choice.
              </p>
            </div>
            
            <div className="mt-8 pt-4 border-t border-[#1F1F1F] flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-[#F5F2EC]/40">
                RECOMMENDED
              </span>
              <Link to={`/product/${products[2].id}`} className="text-xs text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-4 decoration-[#C6A15B]/30 font-light">
                {products[2].name} →
              </Link>
            </div>
          </div>

          {/* Card 2: 07:00 PM */}
          <div className="group relative bg-[#121212] border border-[#C6A15B]/30 p-8 flex flex-col justify-between overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C6A15B]/5 rounded-bl-full pointer-events-none" />
            
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-light">
                07:00 PM · TWILIGHT RENDEZVOUS
              </span>
              <h3 className="font-serif text-2xl text-[#F5F2EC] font-light tracking-wide">
                Velvet & Amber Embers
              </h3>
              <p className="text-xs text-[#F5F2EC]/65 font-light leading-relaxed">
                Explore {products[1].name}, with {products[1].notes.top.join(', ')} up front and
                {` ${products[1].notes.base.join(', ')}`} in its base.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1F1F1F] flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-[#F5F2EC]/40">
                RECOMMENDED
              </span>
              <Link to={`/product/${products[1].id}`} className="text-xs text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-4 decoration-[#C6A15B]/30 font-light">
                {products[1].name} →
              </Link>
            </div>
          </div>

          {/* Card 3: 11:30 PM */}
          <div className="group relative bg-[#121212] border border-[#222222] p-8 flex flex-col justify-between overflow-hidden">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-light">
                11:30 PM · MIDNIGHT EXTRAIT
              </span>
              <h3 className="font-serif text-2xl text-[#F5F2EC] font-light tracking-wide">
                Royal Oud & Dark Saffron
              </h3>
              <p className="text-xs text-[#F5F2EC]/65 font-light leading-relaxed">
                {products[0].name} brings together {products[0].notes.heart.join(', ')} and
                {` ${products[0].notes.base.join(', ')}`} for a distinctive evening perfume.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1F1F1F] flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-[#F5F2EC]/40">
                RECOMMENDED
              </span>
              <Link to={`/product/${products[0].id}`} className="text-xs text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-4 decoration-[#C6A15B]/30 font-light">
                {products[0].name} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
