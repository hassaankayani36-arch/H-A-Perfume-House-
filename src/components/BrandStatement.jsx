export const BrandStatement = () => {
    return (<section className="py-24 sm:py-32 bg-[#0E0E0E] border-y border-[#1C1C1C] relative overflow-hidden">
      {/* Subtle light accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C6A15B]/5 via-transparent to-transparent pointer-events-none"/>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] font-light block mb-6">
          THE HOUSE PHILOSOPHY
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F2EC] font-light uppercase tracking-[0.1em] leading-tight">
          MORE THAN A PERFUME. <br className="hidden sm:inline"/>
          <span className="italic text-[#C6A15B] font-normal">IT&apos;S YOUR SIGNATURE.</span>
        </h2>

        <div className="w-16 h-[1px] bg-[#C6A15B] mx-auto my-8 opacity-80"/>

        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#F5F2EC]/75 font-light leading-relaxed tracking-wide">
          H&amp;A Luxury is an affiliate perfume retailer. We curate a varied selection from our
          supply partners and make product notes, sizes, and PKR prices easy to compare.
        </p>

        {/* Brand values trio with zero-pill unboxed design */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 pt-12 border-t border-[#222222]">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] block mb-2 font-normal">
              01 · PERFUME FAMILIES
            </span>
            <p className="text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
              Explore fresh, woody, oriental, and distinctive scent profiles.
            </p>
          </div>

          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] block mb-2 font-normal">
              02 · AFFILIATE SOURCING
            </span>
            <p className="text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
              Products are sourced through our affiliate and bulk-purchasing relationships.
            </p>
          </div>

          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] block mb-2 font-normal">
              03 · CLEAR DETAILS
            </span>
            <p className="text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
              Review each perfume&apos;s notes, available sizes, stock status, and price.
            </p>
          </div>
        </div>
      </div>
    </section>);
};
export default BrandStatement;
