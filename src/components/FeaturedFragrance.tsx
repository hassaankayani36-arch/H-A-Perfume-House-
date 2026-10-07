import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Check, Sparkles } from 'lucide-react';
import { products } from '../data/products.ts';
import { useCart } from '../context/CartContext.tsx';
import bottleNoir from '../assets/images/bottle-noir.jpg';
import BottleIdentity from './BottleIdentity.tsx';
import { handleProductImageError } from '../utils/productImage.ts';

export const FeaturedFragrance: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('10ML TESTER');
  const [isAdded, setIsAdded] = useState(false);

  const noirProduct = products.find((p) => p.id === 'ha-noir') || products[0];

  const handleAdd = () => {
    addToCart(noirProduct, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const currentSizeObj = noirProduct.sizes.find((s) => s.size === selectedSize) || noirProduct.sizes[0];

  return (
    <section className="py-24 sm:py-32 bg-[#0E0E0E] border-t border-[#1F1F1F] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C6A15B]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Half-screen bottle image (5 cols on lg) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] bg-[#141414] border border-[#262626] overflow-hidden group">
              <img
                src={bottleNoir}
                onError={handleProductImageError}
                alt="H&A Noir Flacon"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000"
                style={{ filter: 'brightness(0.9) contrast(1.1)' }}
              />
              <BottleIdentity product={noirProduct} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-transparent opacity-80" />

              {/* Monogram water mark */}
              <div className="absolute top-6 left-6 font-serif text-6xl text-[#C6A15B]/10 select-none">
                H&A
              </div>

              {/* Badge */}
              <div className="absolute bottom-6 left-6 z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-light bg-[#0B0B0B]/90 px-3 py-1.5 border border-[#C6A15B]/30">
                  ICONIC EXTRAIT
                </span>
              </div>
            </div>
          </div>

          {/* Product details & Olfactory Pyramid (6 cols on lg) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-5 h-[1px] bg-[#C6A15B]" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
                  FEATURED EXTRAIT
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F5F2EC] font-light uppercase tracking-wide">
                H&A NOIR
              </h2>
              <p className="mt-2 text-sm text-[#C6A15B] tracking-[0.2em] uppercase font-light">
                {noirProduct.concentration}
              </p>
              <p className="mt-4 text-sm sm:text-base text-[#F5F2EC]/70 font-light leading-relaxed">
                An intoxicating chiaroscuro of crisp Italian bergamot and fiery saffron leading
                into midnight rose and an indomitable base of royal Cambodian oud, dark musk, and bourbon vanilla.
              </p>
            </div>

            {/* Olfactory Pyramid (Clean luxury layout) */}
            <div className="p-6 bg-[#141414] border border-[#242424] space-y-4">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium border-b border-[#242424] pb-2">
                OLFACTORY ARCHITECTURE
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <span className="text-[#C6A15B]/90 tracking-[0.2em] uppercase text-[11px] font-medium min-w-20">
                    TOP:
                  </span>
                  <span className="text-[#F5F2EC] font-light tracking-wide sm:text-right">
                    Bergamot, Saffron
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-t border-[#1C1C1C] pt-2">
                  <span className="text-[#C6A15B]/90 tracking-[0.2em] uppercase text-[11px] font-medium min-w-20">
                    HEART:
                  </span>
                  <span className="text-[#F5F2EC] font-light tracking-wide sm:text-right">
                    Rose, Amber
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-t border-[#1C1C1C] pt-2">
                  <span className="text-[#C6A15B]/90 tracking-[0.2em] uppercase text-[11px] font-medium min-w-20">
                    BASE:
                  </span>
                  <span className="text-[#F5F2EC] font-light tracking-wide sm:text-right">
                    Oud, Musk, Vanilla
                  </span>
                </div>
              </div>
            </div>

            {/* Size Selector & Price */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-[#F5F2EC]/60">
                  SELECT VOLUME
                </span>
                <span className="font-serif text-2xl sm:text-3xl text-[#F5F2EC] font-light tracking-wide">
                  {currentSizeObj.price}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {noirProduct.sizes.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setSelectedSize(s.size)}
                    className={`flex-1 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 font-light border ${
                      selectedSize === s.size
                        ? 'border-[#C6A15B] bg-[#C6A15B]/10 text-[#F5F2EC]'
                        : 'border-[#262626] bg-[#141414] text-[#F5F2EC]/60 hover:border-[#383838]'
                    }`}
                  >
                    <span>{s.size}</span>
                    <span className="text-[10px] text-[#C6A15B] block mt-0.5">{s.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-4 px-6 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-[#0B0B0B]" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG · {currentSizeObj.size}</span>
                  </>
                )}
              </button>

              <Link
                to="/product/ha-noir"
                className="py-4 px-6 border border-[#2E2E2E] hover:border-[#C6A15B] text-[#F5F2EC] text-xs uppercase tracking-[0.25em] font-light hover:text-[#C6A15B] transition-colors flex items-center justify-center gap-2"
              >
                <span>EXPLORE DETAILS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFragrance;
