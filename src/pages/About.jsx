import Founders from '../components/Founders.jsx';
import { Link } from 'react-router-dom';
import { products } from '../data/products.js';
export const About = () => {
    return (<div className="min-h-screen bg-[#0B0B0B] text-[#F5F2EC]">
      {/* Editorial Header */}
      <div className="relative py-24 sm:py-32 bg-[#0E0E0E] border-b border-[#1C1C1C] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] font-light block mb-4">
            OUR STORY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light uppercase tracking-wide leading-tight">
            THE ARCHITECTURE <br />
            <span className="italic text-[#C6A15B] font-normal">OF PRESENCE.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-[#F5F2EC]/75 font-light leading-relaxed max-w-2xl mx-auto">
            Founded by Hassaan Kayani and Arslan Qamar, H&amp;A Luxury is an affiliate perfume
            retailer curating products from its supply partners.
          </p>
        </div>
      </div>

      {/* Founders Section (Reused as explicitly required by prompt) */}
      <Founders showAboutLink={false}/>

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
                Hassaan Kayani and Arslan Qamar created H&amp;A to make a considered range of
                perfumes easier to explore, compare, and shop.
              </p>
              <p className="text-sm text-[#F5F2EC]/75 font-light leading-relaxed">
                As affiliate sellers, they source products in bulk through their supply relationships
                and present each perfume with its notes, sizes, availability, and price.
              </p>
            </div>

            <div className="md:col-span-6">
              <div className="relative aspect-[4/5] bg-[#141414] border border-[#262626] overflow-hidden">
                <img src={products[0].image} alt={`${products[0].name} perfume from the H&A selection`} loading="lazy" className="w-full h-full object-contain"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-80"/>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 border-y border-[#1C1C1C] py-8 text-center">
            {[
            { value: String(products.length), label: 'Perfumes in our selection' },
            { value: '4', label: 'Perfume families' },
            { value: '2', label: 'Founders, one vision' },
        ].map((stat) => (<div key={stat.label} className="px-2">
                <p className="font-serif text-3xl text-[#C6A15B] sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-[#F5F2EC]/55 sm:text-[10px]">
                  {stat.label}
                </p>
              </div>))}
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="border border-[#262626] bg-[#121212] p-7 sm:p-9">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B]">Our mission</span>
              <h3 className="mt-3 font-serif text-2xl">Make choosing a perfume personal.</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#F5F2EC]/65">
                Help customers discover perfumes that suit their notes, style, and occasion.
              </p>
            </div>
            <div className="border border-[#262626] bg-[#121212] p-7 sm:p-9">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B]">Our vision</span>
              <h3 className="mt-3 font-serif text-2xl">A trusted H&amp;A destination.</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#F5F2EC]/65">
                Offer a carefully presented selection from our affiliate supply partners, with clear
                product details and straightforward pricing.
              </p>
            </div>
          </div>

          {/* Pillars */}
          <div className="pt-16 border-t border-[#1C1C1C] grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#C6A15B]">01 / CAREFUL CURATION</span>
              <h3 className="font-serif text-xl font-light">A Considered Selection</h3>
              <p className="text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
                Explore perfumes across fresh, woody, oriental, and distinctive scent families.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#C6A15B]">02 / AFFILIATE SOURCING</span>
              <h3 className="font-serif text-xl font-light">Trusted Supply Partners</h3>
              <p className="text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
                Our perfumes are sourced through the affiliate and bulk-purchasing relationships
                behind the H&amp;A selection.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#C6A15B]">03 / CLEAR DETAILS</span>
              <h3 className="font-serif text-xl font-light">Notes, Sizes &amp; Prices</h3>
              <p className="text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
                Compare product notes, available bottle sizes, stock status, and PKR prices before
                you order.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-12 text-center">
            <Link to="/shop" className="inline-block px-8 py-4 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.24em] font-medium transition-colors">
              EXPLORE THE PERFUME SELECTION
            </Link>
          </div>
        </div>
      </section>
    </div>);
};
export default About;
