import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
export const ProductCard = ({ product }) => {
    const { addToCart, toggleWishlist, isInWishlist } = useCart();
    const wishlisted = isInWishlist(product.id);
    const fullSize = product.sizes.find((size) => size.size === '50ML') ?? product.sizes[0];
    return (<article className="group relative flex flex-col overflow-hidden border border-[#292929] bg-[#151515] transition-colors duration-300 hover:border-[#A9884C]/70">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E3DA]">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name} details`} className="block h-full">
          <img src={product.image} alt={`${product.name} perfume bottle`} loading="lazy" className="h-full w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"/>
        </Link>

        {product.discounted && (<span className="absolute left-3 top-3 bg-[#171717]/90 px-2.5 py-1.5 text-[9px] font-medium tracking-[0.12em] text-[#DFC27D]">
            -{product.discountPercent}%
          </span>)}

        <button type="button" onClick={() => toggleWishlist(product.id)} className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center border border-white/15 bg-[#171717]/75 text-[#F5F2EC] backdrop-blur-sm transition-colors hover:border-[#C6A15B] hover:text-[#DFC27D] ${wishlisted ? 'text-[#DFC27D]' : ''}`} aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}>
          <Heart className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`}/>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-serif text-lg font-medium leading-snug tracking-wide text-[#F5F2EC] transition-colors group-hover:text-[#DFC27D] sm:text-xl">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h2>
          <div className="shrink-0 text-right">
            {fullSize.compareAtPrice && <del className="block text-[10px] tracking-wide text-[#F5F2EC]/40">{fullSize.compareAtPrice}</del>}
            <span className="text-sm font-medium tracking-wide text-[#F5F2EC]">{fullSize.price}</span>
          </div>
        </div>
        <button type="button" onClick={() => addToCart(product, fullSize.size, 1)} disabled={!fullSize.stock} className="mt-auto flex w-full items-center justify-center gap-2 border border-[#756039] px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#DFC27D] transition-colors hover:border-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#0B0B0B] disabled:cursor-not-allowed disabled:opacity-50">
            <ShoppingBag className="h-3.5 w-3.5"/>
            {fullSize.stock ? 'Add to Bag' : 'Out of Stock'}
        </button>
      </div>
    </article>);
};
export default ProductCard;
