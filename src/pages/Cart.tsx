import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Gift, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { handleProductImageError } from '../utils/productImage.ts';

export const Cart: React.FC = () => {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    amountNeededForFreeDelivery,
    progressToFreeDelivery,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [giftNote, setGiftNote] = useState(false);
  const [giftNoteText, setGiftNoteText] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'HA10' || clean === 'PRESENCE') {
      setDiscountPercent(10);
      setPromoMessage('10% Patron Privilege Applied');
    } else if (clean === 'HA15' || clean === 'ROYAL') {
      setDiscountPercent(15);
      setPromoMessage('15% VIP Maison Privilege Applied');
    } else {
      setPromoMessage('Invalid invitation code');
      setDiscountPercent(0);
    }
  };

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#0B0B0B] flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 mx-auto border border-[#2E2E2E] flex items-center justify-center text-[#F5F2EC]/30">
            <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F2EC] font-light">
            Your Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#F5F2EC]/60 font-light leading-relaxed">
            Your shopping bag does not currently contain any perfumes. Explore our curated
            selection and find a scent that suits you.
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-4 bg-[#C6A15B] text-[#0B0B0B] text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#DFC27D] transition-colors"
          >
            DISCOVER PERFUMES
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] py-16 sm:py-24 text-[#F5F2EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 border-b border-[#222222] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C6A15B] font-light block mb-2">
              SELECTIONS
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light uppercase tracking-wide">
              YOUR SHOPPING BAG
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs uppercase tracking-widest text-[#F5F2EC]/40 hover:text-red-400 font-light self-start sm:self-auto"
          >
            EMPTY BAG
          </button>
        </div>

        {/* Free Delivery Bar Banner */}
        <div className="mb-10 p-5 bg-[#141414] border border-[#262626]">
          <div className="flex items-center justify-between text-xs mb-2 font-light">
            {amountNeededForFreeDelivery > 0 ? (
              <span>
                Add <strong className="text-[#C6A15B]">PKR {amountNeededForFreeDelivery.toLocaleString()}</strong> more for complimentary delivery across Pakistan.
              </span>
            ) : (
              <span className="text-[#C6A15B] flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4" /> You have qualified for Complimentary Nationwide Delivery!
              </span>
            )}
            <span className="text-[11px] text-[#F5F2EC]/50 font-mono">{progressToFreeDelivery}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#222222] overflow-hidden">
            <div
              className="h-full bg-[#C6A15B] transition-all duration-500 ease-out"
              style={{ width: `${progressToFreeDelivery}%` }}
            />
          </div>
        </div>

        {/* Two Columns: Items & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {items.map((item) => (
              <div
                key={item.key}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-[#121212] border border-[#222222] items-start sm:items-center justify-between"
              >
                <div className="flex gap-5 items-center">
                  <div className="w-20 h-24 bg-[#171717] border border-[#262626] overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      onError={handleProductImageError}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-light">
                      {item.family}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EC] font-light">
                      <Link to={`/product/${item.id}`} className="hover:text-[#C6A15B] transition-colors">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#F5F2EC]/60 font-light mt-0.5">
                      Flacon Size: {item.size}
                    </p>
                    <p className="text-xs text-[#F5F2EC]/75 font-mono mt-1">
                      {item.price} each
                    </p>
                    {item.originalPrice > item.discountedPrice && (
                      <del className="text-[11px] text-[#F5F2EC]/45">
                        PKR {item.originalPrice.toLocaleString('en-PK')} each
                      </del>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-[#1E1E1E]">
                  {/* Quantity */}
                  <div className="flex items-center border border-[#2E2E2E] bg-[#171717]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.key, -1)}
                      className="p-2 text-[#F5F2EC]/60 hover:text-[#F5F2EC]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-mono">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.key, 1)}
                      className="p-2 text-[#F5F2EC]/60 hover:text-[#F5F2EC]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="font-serif text-lg text-[#F5F2EC] min-w-24 text-right">
                    PKR {(item.discountedPrice * item.quantity).toLocaleString('en-PK')}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.key)}
                    className="p-1.5 text-[#F5F2EC]/40 hover:text-red-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Gift Note Option */}
            <div className="p-6 bg-[#121212] border border-[#222222] space-y-4">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={giftNote}
                  onChange={(e) => setGiftNote(e.target.checked)}
                  className="accent-[#C6A15B] w-4 h-4"
                />
                <span className="text-xs uppercase tracking-widest text-[#F5F2EC] flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#C6A15B]" />
                  Include a handwritten gift card (Complimentary)
                </span>
              </label>

              {giftNote && (
                <div className="pt-2">
                  <textarea
                    rows={3}
                    value={giftNoteText}
                    onChange={(e) => setGiftNoteText(e.target.value)}
                    placeholder="Enter your personalized gift message for the recipient..."
                    className="w-full bg-[#0B0B0B] border border-[#2A2A2A] focus:border-[#C6A15B] p-3 text-xs text-[#F5F2EC] outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Order Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#141414] border border-[#262626] p-6 sm:p-8 space-y-6 sticky top-28">
              <h2 className="font-serif text-2xl text-[#F5F2EC] font-light pb-4 border-b border-[#242424]">
                Order Summary
              </h2>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="PATRON PRIVILEGE CODE"
                    className="flex-1 bg-[#0B0B0B] border border-[#2A2A2A] focus:border-[#C6A15B] px-3.5 py-2.5 text-xs text-[#F5F2EC] placeholder:text-[#F5F2EC]/30 tracking-widest uppercase outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#222222] hover:bg-[#C6A15B] hover:text-[#0B0B0B] text-[#F5F2EC] text-xs uppercase tracking-widest font-light transition-colors"
                  >
                    APPLY
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] font-light ${
                      discountPercent > 0 ? 'text-[#C6A15B]' : 'text-red-400'
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}
                <p className="text-[10px] text-[#F5F2EC]/40 tracking-wider">
                  Tip: Use code &quot;HA10&quot; for 10% privilege
                </p>
              </form>

              {/* Calculation Rows */}
              <div className="space-y-3 pt-4 border-t border-[#222222] text-xs font-light">
                <div className="flex justify-between text-[#F5F2EC]/80">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-mono">PKR {subtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#C6A15B]">
                    <span>Patron Privilege ({discountPercent}%)</span>
                    <span className="font-mono">- PKR {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#F5F2EC]/80">
                  <span>Nationwide Courier Shipping</span>
                  <span className={`font-mono ${deliveryFee === 0 ? 'text-[#C6A15B]' : ''}`}>
                    {deliveryFee === 0 ? 'COMPLIMENTARY' : `PKR ${deliveryFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-[#F5F2EC]/80">
                  <span>Luxury Obsidian Coffret</span>
                  <span className="text-[#C6A15B]">INCLUDED</span>
                </div>

                <div className="pt-4 border-t border-[#242424] flex justify-between items-baseline">
                  <span className="text-sm uppercase tracking-widest text-[#F5F2EC]">
                    Estimated Total
                  </span>
                  <span className="font-serif text-3xl text-[#C6A15B] font-light">
                    PKR {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.26em] font-medium transition-colors flex items-center justify-center gap-2 shadow-xl"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/shop"
                  className="text-xs uppercase tracking-[0.2em] text-[#F5F2EC]/50 hover:text-[#C6A15B] transition-colors"
                >
                  ← CONTINUE BROWSING
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
