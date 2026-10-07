import React, { useEffect } from 'react';
import Founders from '../components/Founders.tsx';
import heroBottle from '../assets/images/hero-bottle.jpg';
import bottleNoir from '../assets/images/bottle-noir.jpg';
import { Sparkles, ShieldCheck, Compass, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F2EC]">
      {/* Editorial Header */}
      <div className="relative py-24 sm:py-32 bg-[#0E0E0E] border-b border-[#1C1C1C] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] font-light block mb-4">
            THE ATELIER MANIFESTO
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light uppercase tracking-wide leading-tight">
            THE ARCHITECTURE <br />
            <span className="italic text-[#C6A15B] font-normal">OF PRESENCE.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-[#F5F2EC]/75 font-light leading-relaxed max-w-2xl mx-auto">
            H&amp;A Luxury was founded by Hassaan and Arslan on a simple conviction: fragrance is
            the most potent form of memory and personal gravity.
          </p>
        </div>
      </div>

      {/* Founders Section (Reused as explicitly required by prompt) */}
      <Founders showAboutLink={false} />

      {/* The Story & Genesis */}
      <section className="py-24 sm:py-32 bg-[#0B0B0B] border-t border-[#1C1C1C]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium">
                THE GENESIS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light uppercase">
                A Refusal to Conform
              </h2>
              <p className="text-sm text-[#F5F2EC]/75 font-light leading-relaxed">
                Modern perfumery had become inundated with diluted formulations, synthetic alcohol
                blasts, and celebrity endorsements. In response, Hassaan &amp; Arslan sought to revive
                the golden era of high-concentration extraits.
              </p>
              <p className="text-sm text-[#F5F2EC]/75 font-light leading-relaxed">
                By formulating every extrait with 25% to 33% pure aromatic essences, H&amp;A flacons
                bond with the wearer&apos;s skin chemistry, blooming in distinct, intimate layers throughout
                the entire day and into the night.
              </p>
            </div>

            <div className="md:col-span-6">
              <div className="relative aspect-[4/5] bg-[#141414] border border-[#262626] overflow-hidden">
                <img
                  src={bottleNoir}
                  alt="H&A Atelier craftsmanship"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.9) contrast(1.1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div className="pt-16 border-t border-[#1C1C1C] grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#C6A15B]">01 / EXTRAIT DISCIPLINE</span>
              <h3 className="font-serif text-xl font-light">Concentration Without Compromise</h3>
              <p className="text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
                Never diluted with unnecessary fillers. Only pure distilled oils and organic alcohol bases.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#C6A15B]">02 / ETHICAL SOURCING</span>
              <h3 className="font-serif text-xl font-light">Sustainable Agarwood Reserves</h3>
              <p className="text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
                We partner with dedicated arborists in Southeast Asia to protect ancient trees while
                harvesting mature heartwood.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#C6A15B]">03 / TACTILE LUXURY</span>
              <h3 className="font-serif text-xl font-light">Obsidian &amp; Gold Coffrets</h3>
              <p className="text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
                Weighted custom glass, precision spray atomizers, and handcrafted magnetic caps.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-12 text-center">
            <Link
              to="/shop"
              className="inline-block px-8 py-4 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.24em] font-medium transition-colors"
            >
              EXPLORE THE ATELIER REPERTOIRE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
