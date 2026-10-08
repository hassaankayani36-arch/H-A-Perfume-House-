import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '../data/products.ts';
import { useCart } from '../context/CartContext.tsx';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);
  const fullSize = product.sizes.find((size) => size.size === '50ML') ?? product.sizes[0];

  return (
    <article className="group relative flex flex-col overflow-hidden border border-[#222222] bg-[#121212] transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A15B]/50">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E3DA]">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name} details`} className="block h-full">
          <img
            src={product.image}
            alt={`${product.name} perfume bottle`}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
        </Link>

        {product.discounted && (
          <span className="absolute left-3 top-3 bg-[#9F3434] px-2.5 py-1.5 text-[9px] font-semibold tracking-[0.12em] text-white">
            -{product.discountPercent}%
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center bg-white/90 text-[#24211E] shadow-sm transition-colors hover:text-[#9F3434] ${
            wishlisted ? 'text-[#9F3434]' : ''
          }`}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-4 p-4 sm:p-5">
        <div>
          <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#C6A15B]">
            {product.family} <span aria-hidden="true">·</span> {product.volume}
          </p>
          <h2 className="font-serif text-xl font-semibold tracking-wide text-[#F5F2EC] transition-colors group-hover:text-[#DFC27D] sm:text-2xl">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h2>
          <p className="mt-1.5 line-clamp-1 text-[11px] text-[#F5F2EC]/60">
            {product.notes.top[0]} · {product.notes.heart[0]} · {product.notes.base[0]}
          </p>
        </div>

        <div className="space-y-3 border-t border-[#292622] pt-3">
          <div className="flex items-end justify-between gap-3">
            <div className="flex flex-col">
              {fullSize.compareAtPrice && (
                <del className="text-[11px] tracking-wide text-[#F5F2EC]/45">{fullSize.compareAtPrice}</del>
              )}
              <span className="text-sm font-semibold tracking-wide text-[#F5F2EC] sm:text-base">
                {fullSize.price}
              </span>
            </div>
            <Link
              to={`/product/${product.id}`}
              className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-[#C6A15B] transition-colors hover:text-[#DFC27D]"
            >
              <Eye className="h-3.5 w-3.5" /> Details
            </Link>
          </div>
          <button
            type="button"
            onClick={() => addToCart(product, '50ML', 1)}
            disabled={!product.stock}
            className="flex w-full items-center justify-center gap-2 bg-[#C6A15B] px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#0B0B0B] transition-colors hover:bg-[#DFC27D] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {product.stock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
