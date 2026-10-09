import { Gift, ShieldCheck, Feather } from 'lucide-react';
export const Packaging = () => {
    return (<section className="py-24 sm:py-32 bg-[#0B0B0B] border-t border-[#1C1C1C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Packaging Editorial Story */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-5 h-[1px] bg-[#C6A15B]"/>
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
                  UNBOXING RITUAL
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F2EC] font-light uppercase tracking-wide leading-tight">
                THE ART OF <br />
                <span className="italic text-[#C6A15B] font-normal">GIVING.</span>
              </h2>
              <p className="mt-6 text-sm sm:text-base text-[#F5F2EC]/75 font-light leading-relaxed">
                We believe that the encounter with an extraordinary perfume begins long before the
                atomizer is pressed. Every H&A Luxury flacon is nestled in a bespoke matte-black
                rigid coffret, hot-stamped with our gold crest and bound by textured ribbon.
              </p>
            </div>

            {/* Packaging Features */}
            <div className="space-y-6 pt-4 border-t border-[#1F1F1F]">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#141414] border border-[#2E2E2E] text-[#C6A15B]">
                  <Gift className="w-4 h-4"/>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-[#F5F2EC] font-medium">
                    COMPLIMENTARY GIFT PRESENTATION
                  </h4>
                  <p className="mt-1 text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
                    Every order arrives wrapped ready to gift, complete with our signature sealed
                    black envelope and embossed wax stamp.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#141414] border border-[#2E2E2E] text-[#C6A15B]">
                  <Feather className="w-4 h-4"/>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-[#F5F2EC] font-medium">
                    HANDWRITTEN CONCIERGE NOTE
                  </h4>
                  <p className="mt-1 text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
                    Include your personal message at checkout, penned with calligraphy on heavy
                    cotton archival paper.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#141414] border border-[#2E2E2E] text-[#C6A15B]">
                  <ShieldCheck className="w-4 h-4"/>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-[#F5F2EC] font-medium">
                    ATMOSPHERIC SAMPLE VIAL
                  </h4>
                  <p className="mt-1 text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
                    Explore 10ML, 20ML, and 30ML testers before choosing a full-size flacon.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#121212] border border-[#2A2A2A] p-8 sm:p-12 overflow-hidden shadow-2xl">
              {/* Subtle gold line accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent"/>

              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto border border-[#C6A15B]/40 rounded-full flex items-center justify-center font-serif text-[#C6A15B] text-2xl">
                  H&A
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B]">
                    THE PACKAGING SPECIFICATION
                  </span>
                  <h3 className="font-serif text-3xl text-[#F5F2EC] font-light">
                    The Obsidian Coffret
                  </h3>
                </div>

                <div className="py-8 border-y border-[#1F1F1F] grid grid-cols-2 gap-6 text-left">
                  <div>
                    <span className="text-[10px] text-[#F5F2EC]/40 uppercase tracking-widest block">
                      BOX CONSTRUCTION
                    </span>
                    <p className="text-xs text-[#F5F2EC]/80 mt-1 font-light">
                      1200 GSM Rigid Greyboard with Textured Velvet Lining
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#F5F2EC]/40 uppercase tracking-widest block">
                      FINISH & ACCENTS
                    </span>
                    <p className="text-xs text-[#F5F2EC]/80 mt-1 font-light">
                      Hot Stamped Pure Gold Leaf with Magnetic Closure
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#F5F2EC]/40 uppercase tracking-widest block">
                      ATOMIZER
                    </span>
                    <p className="text-xs text-[#F5F2EC]/80 mt-1 font-light">
                      Micro-Mist German Spray Valve for Ultra-Fine Dispersion
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#F5F2EC]/40 uppercase tracking-widest block">
                      SEAL
                    </span>
                    <p className="text-xs text-[#F5F2EC]/80 mt-1 font-light">
                      Numbered Tamper-Evident Atelier Guarantee Strip
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#F5F2EC]/50 font-light italic">
                  Crafted by Hassaan & Arslan with zero compromise on tactile excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
};
export default Packaging;
