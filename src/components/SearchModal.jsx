import { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { handleProductImageError } from '../utils/productImage.js';
import { useProducts } from '../context/ProductContext.jsx';
import { searchProductsByName, splitSearchHighlight } from '../utils/productSearch.js';
export const SearchModal = () => {
    const { isSearchOpen, closeSearch } = useCart();
    const { products } = useProducts();
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const searchInputId = useId();
    if (!isSearchOpen)
        return null;
    const filtered = searchProductsByName(products, query);
    const handleSelect = (productId) => {
        closeSearch();
        setQuery('');
        navigate(`/product/${productId}`);
    };
    return (<div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" onClick={closeSearch}/>

      <div className="relative min-h-screen flex items-start justify-center pt-20 px-4 sm:px-6">
        <div className="relative w-full max-w-2xl bg-[#121212] border border-[#2E2E2E] shadow-2xl p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#242424]">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C6A15B] font-light">
              HAUTE PARFUMERIE SEARCH
            </span>
            <button onClick={closeSearch} className="p-1 text-[#F5F2EC]/60 hover:text-[#C6A15B] transition-colors" aria-label="Close search">
              <X className="w-5 h-5"/>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mt-6">
            <label htmlFor={searchInputId} className="sr-only">Search perfume names</label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C6A15B]"/>
            <input id={searchInputId} type="text" autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search perfume names..." className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C6A15B] pl-11 pr-4 py-3.5 text-xs sm:text-sm text-[#F5F2EC] placeholder:text-[#F5F2EC]/40 outline-none transition-colors"/>
          </div>

          {/* Quick Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[10px] uppercase tracking-widest text-[#F5F2EC]/40 mr-1">
              SUGGESTIONS:
            </span>
            {products.filter((product) => product.bestSeller).slice(0, 5).map((product) => (<button key={product.id} type="button" onClick={() => setQuery(product.name)} className="text-[10.5px] uppercase tracking-wider text-[#F5F2EC]/70 hover:text-[#C6A15B] underline underline-offset-4 decoration-[#333333] hover:decoration-[#C6A15B] transition-colors">
                {product.name}
              </button>))}
          </div>

          {/* Search Results */}
          <div className="mt-8 max-h-80 overflow-y-auto space-y-3">
            {query.trim().length === 1 ? (<div className="py-12 text-center text-xs text-[#F5F2EC]/60 font-light">
                Type at least 2 characters to search perfume names.
              </div>) : query.trim().length >= 2 && filtered.length === 0 ? (<div className="py-12 text-center text-xs text-[#F5F2EC]/60 font-light">
                No matching creations found for &ldquo;{query}&rdquo;.
              </div>) : (filtered.map((product) => (<button key={product.id} type="button" onClick={() => handleSelect(product.id)} className="flex w-full items-center justify-between p-3 bg-[#171717] text-left hover:bg-[#1E1E1E] border border-transparent hover:border-[#C6A15B]/30 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <img src={product.cardImage || product.image} onError={handleProductImageError} alt="" className="w-10 h-12 object-cover bg-[#0B0B0B]"/>
                    <div>
                      <span className="text-[9.5px] uppercase tracking-widest text-[#C6A15B]">
                        {product.family}
                      </span>
                      <span className="font-serif block text-base text-[#F5F2EC] font-light">
                        {splitSearchHighlight(product.name, query).map(({ text, highlighted }, index) => (
                          highlighted
                            ? <mark key={`${text}-${index}`} className="bg-[#C6A15B] text-[#0B0B0B]">{text}</mark>
                            : <span key={`${text}-${index}`}>{text}</span>
                        ))}
                      </span>
                      <p className="text-[11px] text-[#F5F2EC]/50 font-light">
                        {product.notes.top[0]} · {product.notes.heart[0]} · {product.notes.base[0]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#F5F2EC] font-light">{product.price}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C6A15B]"/>
                  </div>
                </button>)))}
          </div>
        </div>
      </div>
    </div>);
};
export default SearchModal;
