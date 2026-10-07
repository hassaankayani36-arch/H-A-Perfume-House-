import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, Product } from '../data/products.ts';
import ProductCard from '../components/ProductCard.tsx';
import { Filter, SlidersHorizontal, Heart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useCart();

  const familyParam = searchParams.get('family');
  const filterParam = searchParams.get('filter');

  const [activeFamily, setActiveFamily] = useState<string>(familyParam || 'ALL');
  const [activeSort, setActiveSort] = useState<'featured' | 'low-high' | 'high-low'>('featured');
  const [onlyWishlist, setOnlyWishlist] = useState<boolean>(filterParam === 'wishlist');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (familyParam) {
      setActiveFamily(familyParam);
      setOnlyWishlist(false);
    }
    if (filterParam === 'wishlist') {
      setOnlyWishlist(true);
      setActiveFamily('ALL');
    }
  }, [familyParam, filterParam]);

  // Filtering
  let displayed = [...products];

  if (onlyWishlist) {
    displayed = displayed.filter((p) => wishlist.includes(p.id));
  } else if (activeFamily !== 'ALL') {
    displayed = displayed.filter((p) => p.family.toLowerCase() === activeFamily.toLowerCase());
  }

  // Sorting
  if (activeSort === 'low-high') {
    displayed.sort(
      (a, b) =>
        (a.sizes.find((size) => size.size === '50ML')?.rawPrice ?? a.rawPrice) -
        (b.sizes.find((size) => size.size === '50ML')?.rawPrice ?? b.rawPrice)
    );
  } else if (activeSort === 'high-low') {
    displayed.sort(
      (a, b) =>
        (b.sizes.find((size) => size.size === '50ML')?.rawPrice ?? b.rawPrice) -
        (a.sizes.find((size) => size.size === '50ML')?.rawPrice ?? a.rawPrice)
    );
  }

  const families = ['ALL', 'Fresh', 'Woody', 'Oriental', 'Intense'];

  return (
    <div className="min-h-screen bg-[#0B0B0B] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
              HAUTE PARFUMERIE COLLECTION
            </span>
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#F5F2EC] uppercase tracking-wide">
            {onlyWishlist ? 'YOUR WISHLIST' : 'THE H&A ATELIER'}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#F5F2EC]/65 font-light leading-relaxed max-w-xl mx-auto">
            {onlyWishlist
              ? 'Your private selection of favored flacons saved for contemplation.'
              : 'Eight masterfully formulated extraits and eaux de parfum, designed with uncompromising concentration and enduring sillage.'}
          </p>
        </div>

        {/* Filter & Sorting Controls */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#222222]">
          {/* Family Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {families.map((fam) => {
              const active = !onlyWishlist && activeFamily.toUpperCase() === fam.toUpperCase();
              return (
                <button
                  key={fam}
                  type="button"
                  onClick={() => {
                    setOnlyWishlist(false);
                    setActiveFamily(fam);
                    setSearchParams(fam === 'ALL' ? {} : { family: fam });
                  }}
                  className={`py-2 px-4 text-xs uppercase tracking-[0.2em] transition-all font-light ${
                    active
                      ? 'bg-[#1C1C1C] text-[#C6A15B] border border-[#C6A15B]/50'
                      : 'text-[#F5F2EC]/60 hover:text-[#F5F2EC] border border-transparent'
                  }`}
                >
                  {fam}
                </button>
              );
            })}

            {/* Wishlist filter button */}
            <button
              type="button"
              onClick={() => {
                setOnlyWishlist(!onlyWishlist);
                if (!onlyWishlist) {
                  setSearchParams({ filter: 'wishlist' });
                } else {
                  setSearchParams({});
                }
              }}
              className={`py-2 px-4 text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 font-light ${
                onlyWishlist
                  ? 'bg-[#1C1C1C] text-[#C6A15B] border border-[#C6A15B]/50'
                  : 'text-[#F5F2EC]/60 hover:text-[#C6A15B] border border-transparent'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${onlyWishlist ? 'fill-[#C6A15B]' : ''}`} />
              <span>SAVED ({wishlist.length})</span>
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3">
            <span className="text-[10.5px] uppercase tracking-widest text-[#F5F2EC]/40">
              SORT BY:
            </span>
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value as any)}
              className="bg-[#141414] border border-[#2E2E2E] text-[#F5F2EC] text-xs px-3 py-2 outline-none focus:border-[#C6A15B]"
            >
              <option value="featured">House Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {displayed.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <p className="font-serif text-2xl text-[#F5F2EC] font-light">
              No creations match the selected criteria.
            </p>
            <button
              onClick={() => {
                setOnlyWishlist(false);
                setActiveFamily('ALL');
                setSearchParams({});
              }}
              className="px-6 py-2.5 bg-[#C6A15B] text-[#0B0B0B] text-xs uppercase tracking-widest font-medium"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Atelier Note Footer */}
        <div className="mt-20 p-8 bg-[#121212] border border-[#222222] text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] mb-2 font-light">
            BESPOKE FLACON BATCHING
          </p>
          <p className="text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
            All H&A extraits are matured for 90 days in temperature-controlled dark chambers to
            allow molecular harmonization before bottling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shop;
