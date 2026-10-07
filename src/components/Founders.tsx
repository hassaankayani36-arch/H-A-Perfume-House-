import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import founder1Img from '../assets/images/founder-hassaan.png';
import founder2Img from '../assets/images/founder-arslan.png';

interface FoundersProps {
  showAboutLink?: boolean;
}

export const Founders: React.FC<FoundersProps> = ({ showAboutLink = true }) => {
  return (
    <section className="py-24 sm:py-32 bg-[#0E0E0E] border-t border-[#1F1F1F] relative overflow-hidden">
      {/* Background ambient element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6A15B]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
              THE VISIONARIES
            </span>
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F2EC] uppercase tracking-wide">
            THE STORY OF H&A
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#C6A15B] tracking-[0.2em] uppercase font-light">
            Created by Hassaan Kayani &amp; Arslan Qamar.
          </p>
          <p className="mt-5 text-sm sm:text-base text-[#F5F2EC]/70 font-light leading-relaxed max-w-2xl mx-auto">
            United by a shared obsession with high-sillage perfumery and uncompromised artisanal
            refinement, Hassaan Kayani and Arslan Qamar established H&A Luxury to restore gravitas, mystery,
            and enduring distinction to modern fragrance.
          </p>
        </div>

        {/* Two Tall Portraits Side by Side with Thin Gold Border */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 max-w-5xl mx-auto">
          {/* Founder 1: Hassaan */}
          <div className="flex flex-col group">
            {/* Tall Portrait Container with Thin Gold Border */}
            <div className="relative aspect-[4/5] overflow-hidden border border-[#C6A15B]/50 shadow-2xl bg-[#141414]">
              <img
                src={founder1Img}
                alt="Hassaan Kayani, co-founder of H&A Luxury, in a rose jacket"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[50%_24%] transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                style={{ filter: 'contrast(1.05) brightness(0.9) saturate(0.9)' }}
              />

              {/* Subtle CSS Dark Gradient Overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/30 to-transparent opacity-90 pointer-events-none" />

              {/* Corner accent */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#C6A15B]/80 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#C6A15B]/80 pointer-events-none" />
            </div>

            {/* Founder Info & Quote */}
            <div className="mt-6 text-center space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F5F2EC] tracking-wide">
                Hassaan Kayani
              </h3>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-light">
                Co-Founder & Creative Director
              </p>
              <a
                href="tel:+923190731434"
                className="inline-block text-xs text-[#F5F2EC]/65 hover:text-[#C6A15B] transition-colors"
              >
                +92 319 0731434
              </a>
              <div className="w-8 h-[1px] bg-[#C6A15B]/40 mx-auto my-3" />
              <blockquote className="text-xs sm:text-sm text-[#F5F2EC]/70 font-light italic leading-relaxed max-w-sm mx-auto">
                &ldquo;We did not create H&A to follow fleeting trends. We created it to formulate
                an indelible presence that commands the room before you speak.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Founder 2: Arslan */}
          <div className="flex flex-col group">
            {/* Tall Portrait Container with Thin Gold Border */}
            <div className="relative aspect-[3/4] overflow-hidden border border-[#C6A15B]/50 shadow-2xl bg-[#141414]">
              <img
                src={founder2Img}
                alt="Arslan Qamar, co-founder of H&A Luxury, in the mountains"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[50%_22%] transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                style={{ filter: 'contrast(1.08) brightness(0.82) saturate(0.85)' }}
              />

              {/* Subtle CSS Dark Gradient Overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/30 to-transparent opacity-90 pointer-events-none" />

              {/* Corner accent */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#C6A15B]/80 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#C6A15B]/80 pointer-events-none" />
            </div>

            {/* Founder Info & Quote */}
            <div className="mt-6 text-center space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F5F2EC] tracking-wide">
                Arslan Qamar
              </h3>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-light">
                Co-Founder & Master Distiller
              </p>
              <a
                href="tel:+923099282467"
                className="inline-block text-xs text-[#F5F2EC]/65 hover:text-[#C6A15B] transition-colors"
              >
                +92 309 9282467
              </a>
              <div className="w-8 h-[1px] bg-[#C6A15B]/40 mx-auto my-3" />
              <blockquote className="text-xs sm:text-sm text-[#F5F2EC]/70 font-light italic leading-relaxed max-w-sm mx-auto">
                &ldquo;Perfume is the most intimate form of memory. Our mission was to bring
                extreme concentration and uncompromising raw distillates to patrons of pure distinction.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>

        {/* Read full story link */}
        {showAboutLink && (
          <div className="mt-16 text-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-8 decoration-[#C6A15B]/40 font-light transition-colors"
            >
              <span>READ THE COMPLETE H&A ODYSSEY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Founders;
