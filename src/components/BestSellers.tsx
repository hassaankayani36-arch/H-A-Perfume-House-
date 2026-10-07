import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag } from 'lucide-react';
import { products } from '../data/products.ts';
import { useCart } from '../context/CartContext.tsx';
import BottleIdentity from './BottleIdentity.tsx';

export const BestSellers: React.FC = () => {
  const { addToCart } = useCart();
  const mostWanted = products.filter((p) => p.bestSeller);

  return (
    <section className="py-24 sm:py-32 bg-[#0E0E0E] border-t border-[#1F1F1F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#222222] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-[#C6A15B]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
                CURATED ACCLAIM
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F2EC] uppercase tracking-wide">
              MOST WANTED
            </h2>
            <p className="mt-3 text-sm text-[#F5F2EC]/60 max-w-xl font-light leading-relaxed">
              The flacons most frequently selected by discerning patrons and private collectors.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C6A15B] hover:text-[#DFC27D] font-light transition-colors group"
          >
            <span>EXPLORE FULL ATELIER</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Best sellers grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mostWanted.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="group bg-[#121212] border border-[#222222] hover:border-[#C6A15B]/40 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Product Visual */}
              <div className="relative aspect-[3/4] bg-[#171717] overflow-hidden">
                <Link to={`/product/${product.id}`} className="block w-full h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ filter: 'brightness(0.92) contrast(1.08)' }}
                  />
                  <BottleIdentity product={product} />
                </Link>

                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Rating Display */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-[#0B0B0B]/85 px-2.5 py-1 border border-[#2A2A2A]">
                  <Star className="w-3 h-3 text-[#C6A15B] fill-[#C6A15B]" />
                  <span className="text-[10px] text-[#F5F2EC] tracking-widest font-normal">
                    {product.rating}
                  </span>
                </div>

                {/* Family */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#C6A15B] font-light bg-[#0B0B0B]/85 px-2 py-1 border border-[#C6A15B]/20">
                    {product.family}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-light text-[#F5F2EC] tracking-wide group-hover:text-[#C6A15B] transition-colors">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <p className="mt-1 text-xs text-[#F5F2EC]/60 font-light line-clamp-1">
                    {product.notes.top[0]} · {product.notes.heart[0]} · {product.notes.base[0]}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1C1C1C] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-normal text-[#F5F2EC] tracking-wide">
                      {product.price}
                    </span>
                    <span className="text-[10px] text-[#F5F2EC]/50 uppercase tracking-widest">
                      {product.volume}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product, '10ML TESTER', 1)}
                    className="w-full py-3 bg-[#1A1A1A] hover:bg-[#C6A15B] text-[#F5F2EC] hover:text-[#0B0B0B] border border-[#2E2E2E] hover:border-[#C6A15B] text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ADD TO BAG</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
