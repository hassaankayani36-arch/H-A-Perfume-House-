import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroBottle from '../assets/images/hero-bottle.jpg';
export const Hero = () => {
    return (<section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0B0B0B]">
      {/* Simple, centered perfume image keeps the hero clear and easy to read. */}
      <div className="absolute inset-0 z-0">
        <img src={heroBottle} alt="H&A Luxury perfume bottle" className="w-full h-full object-cover object-center" style={{ filter: 'brightness(0.62) contrast(1.05)' }}/>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/45 via-[#0B0B0B]/25 to-[#0B0B0B]/75"/>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-24">
        {/* Editorial Kicker */}
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-[#C6A15B]"/>
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
            HAUTE PARFUMERIE HOUSE
          </span>
          <div className="h-[1px] w-8 bg-[#C6A15B]"/>
        </div>

        {/* Primary Heading */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.08em] font-light text-[#F5F2EC] leading-[1.05] uppercase max-w-4xl mx-auto">
          DEFINE YOUR <br className="hidden sm:inline"/>
          <span className="italic font-normal text-[#C6A15B]">PRESENCE.</span>
        </h1>

        {/* Narrative Subtext */}
        <p className="mt-8 text-base sm:text-lg md:text-xl text-[#F5F2EC]/80 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
          A curated selection of perfumes for those who leave an impression.
        </p>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link to="/shop" className="w-full sm:w-auto px-8 py-4 bg-[#C6A15B] text-[#0B0B0B] text-xs uppercase tracking-[0.26em] font-medium hover:bg-[#DFC27D] transition-all duration-300 shadow-lg shadow-[#C6A15B]/10 flex items-center justify-center gap-2 group">
            <span>SHOP NOW</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"/>
          </Link>

          <Link to="/collections" className="w-full sm:w-auto px-8 py-4 border border-[#C6A15B]/60 text-[#F5F2EC] text-xs uppercase tracking-[0.26em] font-light hover:border-[#C6A15B] hover:bg-[#C6A15B]/10 transition-all duration-300 flex items-center justify-center">
            EXPLORE PERFUMES
          </Link>
        </div>

        {/* Trust micro-editorial indicator */}
        <div className="mt-16 flex items-center justify-center gap-6 text-[10px] tracking-[0.28em] text-[#F5F2EC]/40 uppercase">
          <span>CURATED PERFUMES</span>
          <span>·</span>
          <span>HIGH SILLAGE</span>
          <span>·</span>
          <span>PKR PRICING</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-60">
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#F5F2EC]/50 font-light">
          SCROLL
        </span>
        <div className="w-[1px] h-7 bg-gradient-to-b from-[#C6A15B] to-transparent animate-pulse"/>
      </div>
    </section>);
};
export default Hero;
