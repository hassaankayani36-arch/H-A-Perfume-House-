import React from 'react';
import { Link } from 'react-router-dom';
import heroBottle from '../assets/images/hero-bottle.jpg';
import bottleNoir from '../assets/images/bottle-noir.jpg';
import bottleAmber from '../assets/images/bottle-amber.jpg';

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
            From the quiet morning stillness to the intoxicating crescendo of midnight galas,
            H&A luxury flacons are tailored for life’s most commanding occasions.
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
                A shower of crystalline Calabrian citrus and green cardamom. Setting an
                immaculate tone of decisive clarity before entering the executive suite.
              </p>
            </div>
            
            <div className="mt-8 pt-4 border-t border-[#1F1F1F] flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-[#F5F2EC]/40">
                RECOMMENDED
              </span>
              <Link to="/product/ha-elite" className="text-xs text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-4 decoration-[#C6A15B]/30 font-light">
                H&A Élite →
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
                As twilight casts shadows across the city, honeyed resins and labdanum unfold.
                An aura of warm intrigue that draws intimate conversation closer.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1F1F1F] flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-[#F5F2EC]/40">
                RECOMMENDED
              </span>
              <Link to="/product/ha-amber" className="text-xs text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-4 decoration-[#C6A15B]/30 font-light">
                H&A Amber →
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
                Black tie galas and quiet midnight lounges. Deep Cambodian agarwood and smoky birch
                tar deliver a hypnotic sillage that defies forgetfulness.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1F1F1F] flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-[#F5F2EC]/40">
                RECOMMENDED
              </span>
              <Link to="/product/ha-noir" className="text-xs text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-4 decoration-[#C6A15B]/30 font-light">
                H&A Noir →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
