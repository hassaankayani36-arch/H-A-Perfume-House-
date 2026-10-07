import React, { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '../data/products.ts';
import { useCart } from '../context/CartContext.tsx';
import { handleProductImageError } from '../utils/productImage.ts';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch } = useCart();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const searchInputId = useId();

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.family.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.notes.top.some((n) => n.toLowerCase().includes(query.toLowerCase())) ||
          p.notes.heart.some((n) => n.toLowerCase().includes(query.toLowerCase())) ||
          p.notes.base.some((n) => n.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleSelect = (productId: string) => {
    closeSearch();
    setQuery('');
    navigate(`/product/${productId}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeSearch}
      />

      <div className="relative min-h-screen flex items-start justify-center pt-20 px-4 sm:px-6">
        <div className="relative w-full max-w-2xl bg-[#121212] border border-[#2E2E2E] shadow-2xl p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#242424]">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C6A15B] font-light">
              HAUTE PARFUMERIE SEARCH
            </span>
            <button
              onClick={closeSearch}
              className="p-1 text-[#F5F2EC]/60 hover:text-[#C6A15B] transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mt-6">
            <label htmlFor={searchInputId} className="sr-only">Search flacons, notes, or fragrance families</label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C6A15B]" />
            <input
              id={searchInputId}
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search flacons, notes (Oud, Saffron, Bergamot), or families..."
              className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C6A15B] pl-11 pr-4 py-3.5 text-xs sm:text-sm text-[#F5F2EC] placeholder:text-[#F5F2EC]/40 outline-none transition-colors"
            />
          </div>

          {/* Quick Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[10px] uppercase tracking-widest text-[#F5F2EC]/40 mr-1">
              SUGGESTIONS:
            </span>
            {['H&A Noir', 'Oud', 'Saffron', 'Amber', 'Fresh', 'Bergamot'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setQuery(item)}
                className="text-[10.5px] uppercase tracking-wider text-[#F5F2EC]/70 hover:text-[#C6A15B] underline underline-offset-4 decoration-[#333333] hover:decoration-[#C6A15B] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Search Results */}
          <div className="mt-8 max-h-80 overflow-y-auto space-y-3">
            {query.trim() && filtered.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#F5F2EC]/60 font-light">
                No matching creations found for &ldquo;{query}&rdquo;.
              </div>
            ) : (
              filtered.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelect(product.id)}
                  className="flex items-center justify-between p-3 bg-[#171717] hover:bg-[#1E1E1E] border border-transparent hover:border-[#C6A15B]/30 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      onError={handleProductImageError}
                      alt={product.name}
                      className="w-10 h-12 object-cover bg-[#0B0B0B]"
                    />
                    <div>
                      <span className="text-[9.5px] uppercase tracking-widest text-[#C6A15B]">
                        {product.family}
                      </span>
                      <h4 className="font-serif text-base text-[#F5F2EC] font-light">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#F5F2EC]/50 font-light">
                        {product.notes.top[0]} · {product.notes.heart[0]} · {product.notes.base[0]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#F5F2EC] font-light">{product.price}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C6A15B]" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
