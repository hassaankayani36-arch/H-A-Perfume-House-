import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Star,
} from 'lucide-react';
import { products, Product } from '../data/products.ts';
import { useCart } from '../context/CartContext.tsx';
import ProductCard from '../components/ProductCard.tsx';
import BottleIdentity from '../components/BottleIdentity.tsx';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const product = products.find((p) => p.id === id) || products[0];

  const [selectedSize, setSelectedSize] = useState<string>('10ML TESTER');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'ritual' | 'shipping'>('notes');

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(product.image);
    setSelectedSize('10ML TESTER');
    setQuantity(1);
  }, [id, product.image]);

  const wishlisted = isInWishlist(product.id);
  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2200);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    navigate('/checkout');
  };

  const related = products
    .filter((p) => p.id !== product.id && (p.family === product.family || p.isSignature))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0B0B0B] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-10 text-[11px] uppercase tracking-[0.22em] text-[#F5F2EC]/50 font-light flex items-center gap-2">
          <Link to="/" className="hover:text-[#F5F2EC] transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#F5F2EC] transition-colors">
            FRAGRANCES
          </Link>
          <span>/</span>
          <span className="text-[#C6A15B]">{product.name}</span>
        </nav>

        {/* Primary Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Image Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[3/4] bg-[#141414] border border-[#242424] overflow-hidden group">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{ filter: 'brightness(0.92) contrast(1.08)' }}
              />
              <BottleIdentity product={product} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent pointer-events-none" />

              {/* Wishlist button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-5 right-5 p-3 bg-[#0B0B0B]/80 backdrop-blur-sm text-[#F5F2EC]/70 hover:text-[#C6A15B] border border-[#262626] transition-colors"
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#C6A15B] text-[#C6A15B]' : ''}`} />
              </button>

              {/* Concentration Tag */}
              <div className="absolute bottom-5 left-5">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-light bg-[#0B0B0B]/90 px-3 py-1.5 border border-[#C6A15B]/30">
                  {product.concentration}
                </span>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex gap-3">
              {[product.image, product.secondaryImage || product.image].map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-24 bg-[#141414] border overflow-hidden transition-all ${
                    activeImage === img ? 'border-[#C6A15B]' : 'border-[#262626] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} angle ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial Details & Purchasing (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              {/* Family Kicker (Zero-pill clean text) */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-light">
                <span>{product.family}</span>
                <span aria-hidden="true">·</span>
                <span>HAUTE PARFUMERIE</span>
              </div>

              {/* Title & Tagline */}
              <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#F5F2EC] tracking-wide">
                {product.name}
              </h1>
              <p className="font-serif italic text-base text-[#F5F2EC]/60">
                {product.tagline}
              </p>

              {/* Price display */}
              <div className="pt-2 flex items-baseline gap-4">
                <span className="font-serif text-3xl sm:text-4xl text-[#F5F2EC] font-light">
                  {currentSizeObj.price}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#F5F2EC]/50 font-light">
                  TAX INCLUDED · COMPLIMENTARY BOX
                </span>
              </div>

              {/* Short Description */}
              <p className="text-sm sm:text-base text-[#F5F2EC]/75 font-light leading-relaxed pt-2">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div className="space-y-3 pt-4 border-t border-[#1C1C1C]">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#F5F2EC]/60">
                <span>CHOOSE TESTER OR FLACON SIZE</span>
                <span className="text-[#C6A15B]">{selectedSize} SELECTED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-3.5 px-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 font-light border text-left ${
                      selectedSize === s.size
                        ? 'border-[#C6A15B] bg-[#C6A15B]/10 text-[#F5F2EC]'
                        : 'border-[#262626] bg-[#141414] text-[#F5F2EC]/60 hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{s.size}</span>
                      <span className="text-[11px] text-[#C6A15B]">{s.price}</span>
                    </div>
                    {s.isTester && (
                      <span className="mt-2 block text-[9px] tracking-[0.16em] text-[#F5F2EC]/45">
                        TRAVEL TESTER
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Controller & Purchasing Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#F5F2EC]/60">
                  QUANTITY
                </span>
                <div className="flex items-center border border-[#2E2E2E] bg-[#141414]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#F5F2EC]/60 hover:text-[#F5F2EC]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-mono text-[#F5F2EC]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#F5F2EC]/60 hover:text-[#F5F2EC]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: ADD TO BAG & BUY NOW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="py-4 px-6 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.24em] font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-[#0B0B0B]" />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="py-4 px-6 bg-transparent border border-[#C6A15B] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#0B0B0B] text-xs uppercase tracking-[0.24em] font-medium transition-colors text-center"
                >
                  BUY NOW
                </button>
              </div>

              {/* Delivery & Assurance guarantees */}
              <div className="pt-4 grid grid-cols-2 gap-4 text-xs text-[#F5F2EC]/60 font-light border-t border-[#1C1C1C]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C6A15B]" />
                  <span>Free delivery &gt; PKR 2,500</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                  <span>100% Authentic Extrait</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Editorial Sections (Notes / Ritual / Shipping) */}
        <div className="mt-24 border-t border-[#222222] pt-12">
          <div className="flex border-b border-[#222222] gap-8">
            <button
              onClick={() => setActiveTab('notes')}
              className={`pb-4 text-xs uppercase tracking-[0.24em] transition-all relative font-light ${
                activeTab === 'notes' ? 'text-[#C6A15B] font-medium' : 'text-[#F5F2EC]/50 hover:text-[#F5F2EC]'
              }`}
            >
              OLFACTORY NOTES
              {activeTab === 'notes' && <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C6A15B]" />}
            </button>
            <button
              onClick={() => setActiveTab('ritual')}
              className={`pb-4 text-xs uppercase tracking-[0.24em] transition-all relative font-light ${
                activeTab === 'ritual' ? 'text-[#C6A15B] font-medium' : 'text-[#F5F2EC]/50 hover:text-[#F5F2EC]'
              }`}
            >
              HOW TO WEAR
              {activeTab === 'ritual' && <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C6A15B]" />}
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 text-xs uppercase tracking-[0.24em] transition-all relative font-light ${
                activeTab === 'shipping' ? 'text-[#C6A15B] font-medium' : 'text-[#F5F2EC]/50 hover:text-[#F5F2EC]'
              }`}
            >
              SHIPPING &amp; RETURNS
              {activeTab === 'shipping' && <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C6A15B]" />}
            </button>
          </div>

          <div className="py-10">
            {activeTab === 'notes' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-[#121212] border border-[#222222]">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] block mb-2 font-medium">
                    TOP NOTES · FIRST 30 MINUTES
                  </span>
                  <p className="text-sm text-[#F5F2EC] font-light leading-relaxed">
                    {product.notes.top.join(', ')}
                  </p>
                  <p className="mt-3 text-xs text-[#F5F2EC]/50 font-light">
                    The immediate burst of aromatic presence upon application.
                  </p>
                </div>

                <div className="p-6 bg-[#121212] border border-[#222222]">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] block mb-2 font-medium">
                    HEART NOTES · 2 TO 6 HOURS
                  </span>
                  <p className="text-sm text-[#F5F2EC] font-light leading-relaxed">
                    {product.notes.heart.join(', ')}
                  </p>
                  <p className="mt-3 text-xs text-[#F5F2EC]/50 font-light">
                    The evolving soul of the fragrance defining your midday wake.
                  </p>
                </div>

                <div className="p-6 bg-[#121212] border border-[#222222]">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] block mb-2 font-medium">
                    BASE NOTES · 8 TO 16+ HOURS
                  </span>
                  <p className="text-sm text-[#F5F2EC] font-light leading-relaxed">
                    {product.notes.base.join(', ')}
                  </p>
                  <p className="mt-3 text-xs text-[#F5F2EC]/50 font-light">
                    The enduring anchor of aged woods, rare resins, and sensual musks.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'ritual' && (
              <div className="max-w-3xl space-y-6">
                <h3 className="font-serif text-2xl text-[#F5F2EC] font-light">
                  The H&amp;A Application Ritual
                </h3>
                <p className="text-sm text-[#F5F2EC]/80 font-light leading-relaxed">
                  {product.howToWear}
                </p>
                <div className="p-6 bg-[#121212] border border-[#222222] space-y-3">
                  <div className="text-xs uppercase tracking-widest text-[#C6A15B]">
                    PROJECTION &amp; SILLAGE ADVISORY
                  </div>
                  <p className="text-xs text-[#F5F2EC]/70 leading-relaxed font-light">
                    Because this flacon contains high extrait concentration, we recommend refraining
                    from rubbing your wrists together after application. Friction alters the delicate
                    molecular volatile chains, blunting the top notes of saffron and bergamot.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-3xl space-y-6 text-sm text-[#F5F2EC]/80 font-light leading-relaxed">
                <h3 className="font-serif text-2xl text-[#F5F2EC]">
                  Nationwide Delivery &amp; Flacon Assurance
                </h3>
                <p>
                  We offer nationwide expedited courier delivery across Pakistan (Lahore, Karachi,
                  Islamabad, Rawalpindi, Peshawar, Faisalabad, Multan, and all other major cities).
                </p>
                <ul className="space-y-2 text-xs text-[#F5F2EC]/70">
                  <li>• <strong>Orders Above PKR 2,500:</strong> Complimentary Expedited Shipping.</li>
                  <li>• <strong>Standard Shipping:</strong> Flat PKR 350 for orders below threshold.</li>
                  <li>• <strong>Delivery Timeframe:</strong> 2 to 4 business days in secure shockproof packaging.</li>
                  <li>• <strong>Returns &amp; Exchanges:</strong> Unopened flacons with their wax-seal intact may be exchanged within 7 days.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Fragrances */}
        <div className="mt-24 border-t border-[#222222] pt-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C6A15B] font-light block mb-1">
                COMPLEMENTARY CREATIONS
              </span>
              <h2 className="font-serif text-3xl font-light text-[#F5F2EC]">
                Patrons Also Explored
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-4 font-light"
            >
              VIEW ALL
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
