import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard.jsx';
import { useProducts } from '../context/ProductContext.jsx';
export const SignatureCollection = () => {
    const { products } = useProducts();
    // The 4 foundational signature fragrances
    const signatureProducts = products.filter((p) => p.isSignature).slice(0, 4);
    return (<section className="py-24 sm:py-32 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#222222] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#C6A15B]"/>
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
                THE FOUNDATION
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-[#F5F2EC] uppercase tracking-wide">
              THE PERFUME EDIT
            </h2>
            <p className="mt-3 text-sm text-[#F5F2EC]/60 max-w-xl font-light leading-relaxed">
              Discover a considered selection of perfumes, from bright and fresh notes to rich,
              warm compositions.
            </p>
          </div>

          <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C6A15B] hover:text-[#DFC27D] font-light transition-colors group self-start md:self-end">
            <span>VIEW ALL CREATIONS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"/>
          </Link>
        </div>

        {/* 4 Large Signature Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {signatureProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index}/>)}
        </div>
      </div>
    </section>);
};
export default SignatureCollection;
