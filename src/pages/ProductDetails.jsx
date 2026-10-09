import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Heart, Mountain, ShoppingBag, Wind } from 'lucide-react';
import { products } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
export const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const product = products.find((item) => item.id === id);
    const [selectedSize, setSelectedSize] = useState('50ML');
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState('');
    const [descriptionExpanded, setDescriptionExpanded] = useState(false);
    useEffect(() => {
        if (!product)
            return;
        setActiveImage(product.image);
        setSelectedSize('50ML');
        setQuantity(1);
        setDescriptionExpanded(false);
    }, [id, product?.image]);
    if (!product)
        return <Navigate to="/shop" replace/>;
    const currentSize = product.sizes.find((size) => size.size === selectedSize) ?? product.sizes[0];
    const related = products
        .filter((item) => item.id !== product.id)
        .sort((a, b) => Number(b.family === product.family) - Number(a.family === product.family))
        .slice(0, 4);
    const notes = [
        { label: 'Top Notes', value: product.notes.top, Icon: Wind },
        { label: 'Heart Notes', value: product.notes.heart, Icon: Heart },
        { label: 'Base Notes', value: product.notes.base, Icon: Mountain },
    ];
    const addProductToCart = () => addToCart(product, selectedSize, quantity);
    return (<div className="product-detail-page min-h-screen bg-[#F7F5F1] py-6 text-[#191919] dark:bg-[#0B0B0B] dark:text-[#F5F2EC] sm:py-10">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-[11px] text-[#726D66] dark:text-[#F5F2EC]/55">
          <Link to="/" className="transition-colors hover:text-[#A37F38]">Home</Link>
          <span aria-hidden="true">›</span>
          <Link to="/shop" className="transition-colors hover:text-[#A37F38]">Perfumes</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page" className="text-[#302D29] dark:text-[#F5F2EC]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <section aria-label={`${product.name} bottle images`} className="min-w-0">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE6DE] dark:bg-[#F0EDE7]">
              <img src={activeImage || product.image} alt={`${product.name} perfume bottle`} loading="lazy" className="h-full w-full object-contain transition-transform duration-700 hover:scale-[1.025]"/>
              {product.discounted && (<span className="absolute left-4 top-4 bg-[#9F3434] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                  PKR 100 OFF
                </span>)}
            </div>
            <div className="mt-2 flex gap-2">
              {product.gallery.map((image, index) => (<button key={`${product.id}-${index}`} type="button" onClick={() => setActiveImage(image)} aria-label={`View ${product.name} bottle view ${index + 1}`} aria-pressed={activeImage === image} className={`h-[72px] w-[68px] overflow-hidden border bg-[#EAE6DE] transition-colors dark:bg-[#F0EDE7] ${activeImage === image
                ? 'border-[#8F403B]'
                : 'border-[#BEB7AB] opacity-75 hover:opacity-100 dark:border-[#4B4741]'}`}>
                  <img src={image} alt="" loading="lazy" className="h-full w-full object-contain"/>
                </button>))}
            </div>
          </section>

          <section className="min-w-0 pt-2 sm:pt-4">
            <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[#77716A] dark:text-[#F5F2EC]/55">
              H&amp;A · {product.family} · {product.concentration.split(' — ')[0]}
            </p>
            <h1 className="font-serif text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.35rem]">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center justify-between gap-4 border-b border-[#D8D3CB] pb-4 dark:border-[#34312D]">
              <div className="min-w-0">
                {currentSize.compareAtPrice && (<p className="text-xs leading-tight text-[#766F67] dark:text-[#F5F2EC]/55">
                    <del>{currentSize.compareAtPrice}</del>
                  </p>)}
                <p className="font-serif text-[1.45rem] font-bold leading-tight sm:text-2xl">{currentSize.price}</p>
              </div>
              <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-[#E9E7E4] px-2.5 py-1.5 text-[9px] tracking-[0.12em] text-[#514D48] dark:bg-[#292724] dark:text-[#E8E3DC] ${product.stock ? '' : 'opacity-75'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${product.stock ? 'bg-[#C83434]' : 'bg-[#8A8580]'}`}/>
                {product.stock ? 'IN STOCK' : 'OUT OF STOCK'}
              </span>
            </div>
            {product.discounted && (<p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#A33C3C]">
                Save PKR 100 on this perfume
              </p>)}

            <div className="mt-3">
              <p className={`text-[13px] leading-[1.65] text-[#5D5851] dark:text-[#F5F2EC]/75 ${descriptionExpanded ? '' : 'line-clamp-3'}`}>
                {product.description}
              </p>
              <button type="button" onClick={() => setDescriptionExpanded((expanded) => !expanded)} className="mt-1 text-[11px] font-medium text-[#8E3E3A] underline underline-offset-2" aria-expanded={descriptionExpanded}>
                {descriptionExpanded ? 'Read less' : 'Read more'}
              </button>
            </div>

            <div className="my-4 border-t border-[#D8D3CB] dark:border-[#34312D]"/>
            <p className="mb-2.5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#77716A] dark:text-[#F5F2EC]/55">
              Perfume Pyramid
            </p>
            <div className="space-y-2.5">
              {notes.map(({ label, value, Icon }) => (<div key={label} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E5E2DD] text-[#706B65] dark:bg-[#302E2A] dark:text-[#D4CEC4]">
                    <Icon className="h-4 w-4" strokeWidth={1.7}/>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold leading-tight">{label}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-[#69635C] dark:text-[#F5F2EC]/65">
                      {value.join(', ')}
                    </p>
                  </div>
                </div>))}
            </div>

            <div className="my-4 border-t border-[#D8D3CB] dark:border-[#34312D]"/>
            <div className="grid grid-cols-2 gap-5">
              <ProgressMetric label="Longevity" value={product.longevity.replace(' Hours', 'h+').replace(' Hour', 'h+')} percent={product.longevityPercent}/>
              <ProgressMetric label="Projection" value={product.projection} percent={product.projectionPercent}/>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {product.tags.map((tag) => (<span key={tag} className="rounded-full border border-[#C9847F] px-2.5 py-0.5 text-[9px] font-medium tracking-[0.12em] text-[#8E3E3A] dark:border-[#A75650] dark:text-[#E8A49F]">
                  {tag}
                </span>))}
            </div>

            <div className="mt-7 flex items-end justify-between gap-4">
              <fieldset>
                <legend className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-[#77716A] dark:text-[#F5F2EC]/55">
                  Size
                </legend>
                <div className="flex gap-1.5">
                  {product.sizes.map((size) => (<button key={size.size} type="button" onClick={() => setSelectedSize(size.size)} aria-pressed={selectedSize === size.size} className={`min-w-[58px] border px-3 py-2.5 text-[10px] transition-colors ${selectedSize === size.size
                ? 'border-[#8E3E3A] text-[#71322F] dark:border-[#D78B85] dark:text-[#F1B3AE]'
                : 'border-[#C8C1B7] text-[#4D4944] hover:border-[#8E3E3A] dark:border-[#514C45] dark:text-[#F5F2EC]/80'}`}>
                      {size.size}
                    </button>))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="perfume-quantity" className="mb-1.5 block text-[9px] font-medium uppercase tracking-[0.16em] text-[#77716A] dark:text-[#F5F2EC]/55">
                  Qty
                </label>
                <div className="flex h-[38px] items-center border border-[#D5B6B1] dark:border-[#72524E]">
                  <button type="button" onClick={() => setQuantity((amount) => Math.max(1, amount - 1))} aria-label="Decrease quantity" className="px-2 text-sm">−</button>
                  <output id="perfume-quantity" className="min-w-7 text-center text-[11px]" aria-live="polite">{quantity}</output>
                  <button type="button" onClick={() => setQuantity((amount) => amount + 1)} aria-label="Increase quantity" className="px-2 text-sm">+</button>
                </div>
              </div>
            </div>

            <div className="mt-3 grid gap-2">
              <button type="button" onClick={addProductToCart} disabled={!product.stock} className="flex min-h-[42px] w-full items-center justify-center gap-3 bg-[#191919] px-4 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:bg-[#34302B] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#F5F2EC] dark:text-[#171717] dark:hover:bg-[#DED8CC]">
                Add to Cart <ShoppingBag className="h-4 w-4"/>
              </button>
              <button type="button" onClick={() => {
            addProductToCart();
            navigate('/checkout');
        }} disabled={!product.stock} className="min-h-[40px] w-full border border-[#25221F] px-4 text-[9px] font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-[#E9E4DC] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#A29B91] dark:hover:bg-[#24211E]">
                Buy Now
              </button>
            </div>
          </section>
        </div>

        <section className="mt-14 border-t border-[#D8D3CB] pt-8 dark:border-[#34312D] sm:mt-20 sm:pt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#8E3E3A]">Explore the house</p>
              <h2 className="mt-1 font-serif text-3xl font-semibold">Related Perfumes</h2>
            </div>
            <Link to="/shop" className="text-[10px] uppercase tracking-[0.12em] text-[#8E3E3A] underline underline-offset-4">Shop all perfumes</Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => <ProductCard key={item.id} product={item}/>)}
          </div>
        </section>
      </div>
    </div>);
};
const ProgressMetric = ({ label, value, percent }) => (<div>
    <div className="mb-1 flex items-center justify-between gap-2 text-[9px] font-medium tracking-[0.08em]">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} className="h-[3px] bg-[#DEDAD4] dark:bg-[#4B4640]">
      <div className="h-full bg-[#C43D3D]" style={{ width: `${percent}%` }}/>
    </div>
  </div>);
export default ProductDetails;
