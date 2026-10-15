import { useEffect } from 'react';
import { collections } from '../data/collections.js';
import { products } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
export const Collections = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (<div className="min-h-screen bg-[#0B0B0B] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#C6A15B]"/>
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
              CURATED ANTHOLOGIES
            </span>
            <span className="w-5 h-[1px] bg-[#C6A15B]"/>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#F5F2EC] uppercase tracking-wide">
            THE COLLECTIONS
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#F5F2EC]/65 font-light leading-relaxed max-w-xl mx-auto">
            Browse our curated perfume selection by scent family and discover notes suited to
            different moods and occasions.
          </p>
        </div>

        {/* Collections Overview */}
        <div className="space-y-20">
          {collections.map((col) => {
            const matchingProducts = products.filter((product) => product.family === col.family);
            if (matchingProducts.length === 0)
                return null;
            return (<section key={col.id} className="border-t border-[#29251f] pt-10 first:border-t-0 first:pt-0 sm:pt-12">
                <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <span className="mb-2 block text-[10px] font-light uppercase tracking-[0.3em] text-[#C6A15B]">
                      {col.subtitle}
                    </span>
                    <h2 className="font-serif text-3xl font-light uppercase tracking-wide text-[#F5F2EC] sm:text-4xl">
                      {col.title}
                    </h2>
                  </div>

                  <div className="max-w-xl sm:text-right">
                    <p className="text-sm font-light leading-relaxed text-[#F5F2EC]/65">
                      {col.description}
                    </p>
                    <p className="mt-2 font-serif text-xs italic text-[#C6A15B]">
                      &ldquo;{col.tagline}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Products in this collection */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
                  {matchingProducts.map((p, productIndex) => (<div key={p.id} className="product-card-enter h-full" style={{ animationDelay: `${Math.min(productIndex, 8) * 55}ms` }}><ProductCard product={p}/></div>))}
                </div>
              </section>);
        })}
        </div>
      </div>
    </div>);
};
export default Collections;
