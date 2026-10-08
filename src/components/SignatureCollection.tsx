import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Eye } from 'lucide-react';
import { products } from '../data/products.ts';
import { useCart } from '../context/CartContext.tsx';

export const SignatureCollection: React.FC = () => {
  const { addToCart } = useCart();
  
  // The 4 foundational signature fragrances
  const signatureProducts = products.filter((p) => p.isSignature).slice(0, 4);

  return (
    <section className="py-24 sm:py-32 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#222222] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#C6A15B]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
                THE FOUNDATION
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F2EC] uppercase tracking-wide">
              THE PERFUME EDIT
            </h2>
            <p className="mt-3 text-sm text-[#F5F2EC]/60 max-w-xl font-light leading-relaxed">
              Discover a considered selection of perfumes, from bright and fresh notes to rich,
              warm compositions.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C6A15B] hover:text-[#DFC27D] font-light transition-colors group self-start md:self-end"
          >
            <span>VIEW ALL CREATIONS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Large Signature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {signatureProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-[#141414] border border-[#262626] hover:border-[#C6A15B]/50 transition-all duration-500 overflow-hidden"
            >
              {/* Large Image Frame */}
              <div className="relative aspect-[3/4] bg-[#1A1A1A] overflow-hidden">
                <Link to={`/product/${product.id}`} className="block w-full h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-70 pointer-events-none" />

                {/* Perfume family label */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-light bg-[#0B0B0B]/85 px-2.5 py-1 backdrop-blur-sm border border-[#C6A15B]/20">
                    {product.family}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-light text-[#F5F2EC] tracking-wide group-hover:text-[#C6A15B] transition-colors">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  
                  <p className="mt-1 text-xs text-[#F5F2EC]/50 italic font-serif">
                    {product.tagline}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#222222]">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#F5F2EC]/40 block mb-1">
                      KEY NOTES
                    </span>
                    <p className="text-xs text-[#F5F2EC]/75 font-light">
                      {product.notes.top[0]} · {product.notes.heart[0]} · {product.notes.base[0]}
                    </p>
                  </div>
                </div>

                {/* Price and Action Buttons */}
                <div className="pt-4 border-t border-[#222222] space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-base text-[#F5F2EC] font-normal tracking-wide">
                      {product.sizes.find((size) => size.size === '50ML')?.price ?? product.price}
                    </span>
                    <span className="text-[10px] text-[#F5F2EC]/50 tracking-widest uppercase">
                      50ML FLACON
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      to={`/product/${product.id}`}
                      className="py-2.5 px-3 border border-[#333333] hover:border-[#C6A15B] text-[#F5F2EC] text-center text-[10px] uppercase tracking-[0.2em] font-light hover:text-[#C6A15B] transition-colors"
                    >
                      DISCOVER
                    </Link>

                    <button
                      type="button"
                      onClick={() => addToCart(product, '50ML', 1)}
                      className="py-2.5 px-3 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-center text-[10px] uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>ADD TO BAG</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureCollection;
