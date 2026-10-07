import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collections } from '../data/collections.ts';
import { products } from '../data/products.ts';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard.tsx';

export const Collections: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0B] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
              CURATED ANTHOLOGIES
            </span>
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#F5F2EC] uppercase tracking-wide">
            THE COLLECTIONS
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#F5F2EC]/65 font-light leading-relaxed max-w-xl mx-auto">
            Each collection represents a philosophical chapter in the H&A journey—formulated to
            harmonize with distinct aspects of personal identity and atmospheric mood.
          </p>
        </div>

        {/* Collections Overview */}
        <div className="space-y-24">
          {collections.map((col, index) => {
            const matchingProducts = products.filter((p) => col.highlightedIds.includes(p.id));

            return (
              <div
                key={col.id}
                className="pt-12 border-t border-[#222222] first:border-t-0 first:pt-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline mb-12">
                  <div className="lg:col-span-5">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-light block mb-2">
                      COLLECTION {`0${index + 1}`} · {col.subtitle}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F5F2EC] uppercase tracking-wide">
                      {col.title}
                    </h2>
                  </div>

                  <div className="lg:col-span-7">
                    <p className="text-sm text-[#F5F2EC]/75 font-light leading-relaxed">
                      {col.description}
                    </p>
                    <p className="mt-2 text-xs italic font-serif text-[#C6A15B]">
                      &ldquo;{col.tagline}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Products in this collection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {matchingProducts.slice(0, 4).map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collections;
