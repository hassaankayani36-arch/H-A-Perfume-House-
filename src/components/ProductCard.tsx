import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../data/products.ts';
import { useCart } from '../context/CartContext.tsx';
import BottleIdentity from './BottleIdentity.tsx';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group flex flex-col bg-[#121212] border border-[#222222] hover:border-[#C6A15B]/40 transition-all duration-500 overflow-hidden relative">
      {/* Visual Image Container */}
      <div className="relative aspect-[3/4] bg-[#171717] overflow-hidden flex items-center justify-center">
        <Link to={`/product/${product.id}`} className="w-full h-full block">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ filter: 'brightness(0.92) contrast(1.05)' }}
          />
          <BottleIdentity product={product} />
        </Link>

        {/* Subtle Dark Gradient at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-4 right-4 p-2.5 transition-colors z-10 backdrop-blur-sm ${
            wishlisted
              ? 'text-[#C6A15B] bg-[#0B0B0B]/80'
              : 'text-[#F5F2EC]/60 hover:text-[#C6A15B] bg-[#0B0B0B]/50 hover:bg-[#0B0B0B]/80'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#C6A15B]' : ''}`} />
        </button>

        {/* Quiet Kicker on Top Left if Signature */}
        {product.isSignature && (
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#C6A15B] font-light bg-[#0B0B0B]/80 px-2 py-1 backdrop-blur-sm border border-[#C6A15B]/20">
              SIGNATURE
            </span>
          </div>
        )}

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 flex gap-2 bg-[#0B0B0B]/90 backdrop-blur-md border-t border-[#262626]">
          <button
            type="button"
            onClick={() => addToCart(product, '10ML TESTER', 1)}
            className="flex-1 py-2.5 px-3 bg-[#C6A15B] text-[#0B0B0B] text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#DFC27D] transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ADD TO BAG</span>
          </button>
          <Link
            to={`/product/${product.id}`}
            className="p-2.5 border border-[#333333] text-[#F5F2EC] hover:text-[#C6A15B] hover:border-[#C6A15B]/50 transition-colors flex items-center justify-center"
            aria-label="View details"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Card Content & Editorial Typography */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
        <div>
          {/* Unboxed Metadata (Zero-Pill Rule) */}
          <div className="flex items-center gap-2 text-[10.5px] tracking-[0.22em] uppercase text-[#C6A15B] font-light mb-1.5">
            <span>{product.family}</span>
            <span aria-hidden="true">·</span>
            <span>{product.volume}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-light text-[#F5F2EC] tracking-wide group-hover:text-[#C6A15B] transition-colors">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>

          {/* Key Olfactory Notes */}
          <p className="mt-2 text-xs text-[#F5F2EC]/60 line-clamp-1 font-light tracking-wide">
            {product.notes.top[0]} · {product.notes.heart[0]} · {product.notes.base[0]}
          </p>
        </div>

        {/* Pricing & Discover Link */}
        <div className="pt-3 border-t border-[#1F1F1F] flex items-center justify-between">
          <span className="text-sm sm:text-base font-normal tracking-wider text-[#F5F2EC]">
            {product.price}
          </span>

          <Link
            to={`/product/${product.id}`}
            className="text-[10px] tracking-[0.22em] uppercase text-[#C6A15B] hover:text-[#DFC27D] transition-colors underline underline-offset-4 decoration-[#C6A15B]/40 font-light"
          >
            DISCOVER
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
