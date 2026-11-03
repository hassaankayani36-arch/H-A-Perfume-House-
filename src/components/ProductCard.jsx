import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, LoaderCircle, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
export const ProductCard = ({ product, index = 0, priority = false }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [resolvedImage, setResolvedImage] = useState("");
  const wishlisted = isInWishlist(product.id);
  const imageSource = product.cardImage || product.image;
  const fullSize =
    product.sizes.find((size) => size.size === "50ML") ?? product.sizes[0];
  const imageResolved = resolvedImage === imageSource;
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);
  return (
    <article
      ref={cardRef}
      style={{ transitionDelay: `${Math.min(index % 4, 3) * 150}ms` }}
      className={`product-card group relative flex flex-col overflow-hidden border border-[#292929] bg-[#151515] transition-[opacity,translate,scale,border-color] duration-[800ms] ease-[cubic-bezier(0.82,0,0.1,1)] hover:border-[#A9884C]/70 motion-reduce:!transition-none motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 ${isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-15 scale-[0.94] opacity-0"}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E3DA]">
        {!imageResolved && (
          <span
            role="status"
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          >
            <LoaderCircle
              aria-hidden="true"
              className="h-8 w-8 animate-spin text-[#A37F38]"
              strokeWidth={1.5}
            />
            <span className="sr-only">Loading {product.name} image</span>
          </span>
        )}
        <Link
          to={`/product/${product.id}`}
          aria-label={`View ${product.name} details`}
          className="block h-full"
        >
          <img
            src={imageSource}
            alt={`${product.name} perfume bottle`}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority && index < 2 ? "high" : "auto"}
            decoding="async"
            onLoad={() => setResolvedImage(imageSource)}
            onError={() => setResolvedImage(imageSource)}
            className={`h-full w-full object-contain object-center transition-[opacity,transform] duration-500 ease-out group-hover:scale-[1.02] ${imageResolved ? "opacity-100" : "opacity-0"}`}
          />
        </Link>

        {product.discounted && (
          <span className="absolute left-3 top-3 bg-[#171717]/90 px-2.5 py-1.5 text-[9px] font-medium tracking-[0.12em] text-[#DFC27D]">
            -{product.discountPercent}%
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={`product-card-wishlist absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center border border-white/15 bg-[#171717]/75 text-[#F5F2EC] backdrop-blur-sm transition-colors hover:border-[#C6A15B] hover:text-[#DFC27D] ${wishlisted ? "text-[#DFC27D]" : ""}`}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
        >
          <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="product-card-title font-serif text-lg font-medium leading-snug tracking-wide text-[#F5F2EC] transition-colors group-hover:text-[#DFC27D] sm:text-xl">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h2>
          <div className="shrink-0 text-right">
            {fullSize.compareAtPrice && (
              <del className="product-card-original-price block text-[10px] tracking-wide text-[#F5F2EC]/40">
                {fullSize.compareAtPrice}
              </del>
            )}
            <span className="product-card-price text-sm font-medium tracking-wide text-[#F5F2EC]">
              {fullSize.price}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => addToCart(product, fullSize.size, 1)}
          disabled={!fullSize.stock}
          className="product-card-action mt-auto flex w-full items-center justify-center gap-2 border border-[#756039] px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#DFC27D] transition-colors hover:border-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#0B0B0B] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          {fullSize.stock ? "Add to Bag" : "Out of Stock"}
        </button>
      </div>
    </article>
  );
};
export default ProductCard;
