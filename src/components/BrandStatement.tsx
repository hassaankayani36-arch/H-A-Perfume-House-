import React from 'react';

export const BrandStatement: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#0E0E0E] border-y border-[#1C1C1C] relative overflow-hidden">
      {/* Subtle light accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C6A15B]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] font-light block mb-6">
          THE HOUSE PHILOSOPHY
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F2EC] font-light uppercase tracking-[0.1em] leading-tight">
          MORE THAN A FRAGRANCE. <br className="hidden sm:inline" />
          <span className="italic text-[#C6A15B] font-normal">IT&apos;S YOUR SIGNATURE.</span>
        </h2>

        <div className="w-16 h-[1px] bg-[#C6A15B] mx-auto my-8 opacity-80" />

        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#F5F2EC]/75 font-light leading-relaxed tracking-wide">
          At H&A Luxury, we reject ordinary mass-market perfumery. Every flacon is an intimate
          collaboration between rare Eastern distillates and European olfactory precision—formulated
          at extreme extrait concentrations to envelop you in an unforgettable, lingering aura.
        </p>

        {/* Brand values trio with zero-pill unboxed design */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 pt-12 border-t border-[#222222]">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] block mb-2 font-normal">
              01 · SUSTAINED SILLAGE
            </span>
            <p className="text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
              High percentage extrait formulations designed to linger for up to 16 hours.
            </p>
          </div>

          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] block mb-2 font-normal">
              02 · RARE DISTILLATIONS
            </span>
            <p className="text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
              Cambodian agarwood, Omani frankincense, Taif rose, and Calabrian bergamot.
            </p>
          </div>

          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] block mb-2 font-normal">
              03 · BESPOKE FINISH
            </span>
            <p className="text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
              Weighted obsidian flacons fitted with custom magnetic brushed-gold closures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;
