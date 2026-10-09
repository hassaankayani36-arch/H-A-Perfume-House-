import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import { Heart, Search } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
export const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { wishlist } = useCart();
    const familyParam = searchParams.get('family');
    const filterParam = searchParams.get('filter');
    const [activeFamily, setActiveFamily] = useState(familyParam || 'ALL');
    const [activeSort, setActiveSort] = useState('featured');
    const [onlyWishlist, setOnlyWishlist] = useState(filterParam === 'wishlist');
    const [searchQuery, setSearchQuery] = useState('');
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
    }
    else if (activeFamily !== 'ALL') {
        displayed = displayed.filter((p) => p.family.toLowerCase() === activeFamily.toLowerCase());
    }
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (normalizedQuery) {
        displayed = displayed.filter((product) => [
            product.name,
            product.tagline,
            product.family,
            ...product.notes.top,
            ...product.notes.heart,
            ...product.notes.base,
        ]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery));
    }
    // Sorting
    if (activeSort === 'low-high') {
        displayed.sort((a, b) => (a.sizes.find((size) => size.size === '50ML')?.discountedPrice ?? a.discountedPrice) -
            (b.sizes.find((size) => size.size === '50ML')?.discountedPrice ?? b.discountedPrice));
    }
    else if (activeSort === 'high-low') {
        displayed.sort((a, b) => (b.sizes.find((size) => size.size === '50ML')?.discountedPrice ?? b.discountedPrice) -
            (a.sizes.find((size) => size.size === '50ML')?.discountedPrice ?? a.discountedPrice));
    }
    const families = ['ALL', 'Fresh', 'Woody', 'Oriental', 'Intense'];
    return (<div className="min-h-screen bg-[#0B0B0B] pb-16 sm:pb-24">
      <section className="relative isolate min-h-[20rem] overflow-hidden border-b border-[#262626]">
        <img src={products[0].image} alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-55"/>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B0B0B]/95 via-[#0B0B0B]/75 to-[#0B0B0B]/35"/>
        <div className="mx-auto flex min-h-[20rem] max-w-7xl items-center px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="h-px w-7 bg-[#C6A15B]"/>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B]">
                H&A LUXURY · MADE TO BE REMEMBERED
              </span>
            </div>
            <h1 className="font-serif text-5xl font-light tracking-wide text-[#F5F2EC] sm:text-7xl">
              The Perfume
              <br />
              <span className="italic text-[#DFC27D]">Collection</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#F5F2EC]/75 sm:text-base">
              Explore our curated selection of perfumes and find your next signature scent by
              notes, mood, or moment.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter & Sorting Controls */}
        <div className="mb-12 mt-10 flex flex-col items-center justify-between gap-6 border-b border-[#222222] pb-6 md:flex-row">
          {/* Family Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {families.map((fam) => {
            const active = !onlyWishlist && activeFamily.toUpperCase() === fam.toUpperCase();
            return (<button key={fam} type="button" onClick={() => {
                    setOnlyWishlist(false);
                    setActiveFamily(fam);
                    setSearchParams(fam === 'ALL' ? {} : { family: fam });
                }} className={`py-2 px-4 text-xs uppercase tracking-[0.2em] transition-all font-light ${active
                    ? 'bg-[#1C1C1C] text-[#C6A15B] border border-[#C6A15B]/50'
                    : 'text-[#F5F2EC]/60 hover:text-[#F5F2EC] border border-transparent'}`}>
                  {fam}
                </button>);
        })}

            {/* Wishlist filter button */}
            <button type="button" onClick={() => {
            setOnlyWishlist(!onlyWishlist);
            if (!onlyWishlist) {
                setSearchParams({ filter: 'wishlist' });
            }
            else {
                setSearchParams({});
            }
        }} className={`py-2 px-4 text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 font-light ${onlyWishlist
            ? 'bg-[#1C1C1C] text-[#C6A15B] border border-[#C6A15B]/50'
            : 'text-[#F5F2EC]/60 hover:text-[#C6A15B] border border-transparent'}`}>
              <Heart className={`w-3.5 h-3.5 ${onlyWishlist ? 'fill-[#C6A15B]' : ''}`}/>
              <span>SAVED ({wishlist.length})</span>
            </button>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <label className="relative flex min-w-0 flex-1 items-center sm:min-w-56">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-[#F5F2EC]/45"/>
              <input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search perfumes or notes" aria-label="Search perfumes or notes" className="w-full border border-[#2E2E2E] bg-[#141414] py-2.5 pl-10 pr-3 text-xs text-[#F5F2EC] outline-none placeholder:text-[#F5F2EC]/40 focus:border-[#C6A15B]"/>
            </label>
            <label className="flex items-center gap-3">
              <span className="text-[10.5px] uppercase tracking-widest text-[#F5F2EC]/40">
                SORT BY:
              </span>
              <select value={activeSort} onChange={(e) => setActiveSort(e.target.value)} className="border border-[#2E2E2E] bg-[#141414] px-3 py-2.5 text-xs text-[#F5F2EC] outline-none focus:border-[#C6A15B]">
                <option value="featured">Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>

        {/* Product Grid */}
        {displayed.length === 0 ? (<div className="py-24 text-center space-y-4">
            <p className="font-serif text-2xl text-[#F5F2EC] font-light">
              No perfumes match the selected criteria.
            </p>
            <button onClick={() => {
                setOnlyWishlist(false);
                setActiveFamily('ALL');
                setSearchParams({});
            }} className="px-6 py-2.5 bg-[#C6A15B] text-[#0B0B0B] text-xs uppercase tracking-widest font-medium">
              RESET FILTERS
            </button>
          </div>) : (<>
            <p className="mb-5 text-xs uppercase tracking-[0.16em] text-[#F5F2EC]/45">
              {displayed.length} {displayed.length === 1 ? 'perfume' : 'perfumes'}
              {onlyWishlist ? ' in your wishlist' : ''}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {displayed.map((product) => (<ProductCard key={product.id} product={product}/>))}
            </div>
          </>)}

        {/* Atelier Note Footer */}
        <div className="mt-20 p-8 bg-[#121212] border border-[#222222] text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] mb-2 font-light">
            OUR CURATED SELECTION
          </p>
          <p className="text-xs text-[#F5F2EC]/60 font-light leading-relaxed">
            Explore perfumes sourced through our affiliate supply partners, with product notes,
            available sizes, stock, and PKR pricing shown on each listing.
          </p>
        </div>
      </div>
    </div>);
};
export default Shop;
