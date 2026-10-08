import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { handleProductImageError } from '../utils/productImage.ts';

export const CartDrawer: React.FC = () => {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    amountNeededForFreeDelivery,
    progressToFreeDelivery,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0E0E0E] border-l border-[#242424] shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#222222]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-[#C6A15B]" />
                <h2 className="font-serif text-2xl text-[#F5F2EC] font-light tracking-wide uppercase">
                  SHOPPING BAG
                </h2>
                <span className="text-xs text-[#C6A15B] font-light">
                  ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                </span>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="p-1.5 text-[#F5F2EC]/60 hover:text-[#C6A15B] transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Bar */}
            <div className="mt-4 pt-4 border-t border-[#1C1C1C]">
              <div className="flex items-center justify-between text-[11px] mb-1.5 font-light">
                {amountNeededForFreeDelivery > 0 ? (
                  <span className="text-[#F5F2EC]/80">
                    Add <strong className="text-[#C6A15B] font-medium">PKR {amountNeededForFreeDelivery.toLocaleString()}</strong> for free delivery
                  </span>
                ) : (
                  <span className="text-[#C6A15B] font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 inline" /> You have unlocked Free Nationwide Delivery!
                  </span>
                )}
                <span className="text-[#F5F2EC]/50 text-[10px]">{progressToFreeDelivery}%</span>
              </div>
              <div className="w-full h-1 bg-[#222222] overflow-hidden">
                <div
                  className="h-full bg-[#C6A15B] transition-all duration-500 ease-out"
                  style={{ width: `${progressToFreeDelivery}%` }}
                />
              </div>
            </div>
          </div>

          {/* Drawer Items Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-5">
                <div className="w-16 h-16 mx-auto border border-[#2E2E2E] flex items-center justify-center text-[#F5F2EC]/30">
                  <ShoppingBag className="w-7 h-7 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-2xl text-[#F5F2EC] font-light">
                  Your Bag is Empty
                </h3>
                <p className="text-xs text-[#F5F2EC]/60 font-light max-w-xs mx-auto leading-relaxed">
                  Explore our Haute Parfumerie collection to find your personal signature extrait.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    navigate('/shop');
                  }}
                  className="mt-4 px-6 py-3 bg-[#C6A15B] text-[#0B0B0B] text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#DFC27D] transition-colors"
                >
                  EXPLORE PERFUMES
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-4 pb-6 border-b border-[#1C1C1C] last:border-b-0"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#141414] border border-[#262626] overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      onError={handleProductImageError}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[9.5px] uppercase tracking-widest text-[#C6A15B] block font-light">
                            {item.family}
                          </span>
                          <h4 className="font-serif text-lg text-[#F5F2EC] font-light leading-snug">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-[#F5F2EC]/50 font-light">
                            {item.size}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.key)}
                          className="p-1 text-[#F5F2EC]/40 hover:text-red-400 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[#2A2A2A] bg-[#141414]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, -1)}
                          className="p-1.5 text-[#F5F2EC]/60 hover:text-[#F5F2EC] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs text-[#F5F2EC] font-mono">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, 1)}
                          className="p-1.5 text-[#F5F2EC]/60 hover:text-[#F5F2EC] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total for Item */}
                      <div className="text-right">
                        {item.originalPrice > item.discountedPrice && (
                          <del className="block text-[10px] text-[#F5F2EC]/40">
                            PKR {(item.originalPrice * item.quantity).toLocaleString('en-PK')}
                          </del>
                        )}
                        <span className="text-xs sm:text-sm font-normal text-[#F5F2EC] tracking-wide">
                          PKR {(item.discountedPrice * item.quantity).toLocaleString('en-PK')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#222222] bg-[#121212] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#F5F2EC]/70 font-light">
                  <span>Subtotal</span>
                  <span className="text-[#F5F2EC]">PKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#F5F2EC]/70 font-light">
                  <span>Estimated Shipping</span>
                  <span className={deliveryFee === 0 ? 'text-[#C6A15B]' : 'text-[#F5F2EC]'}>
                    {deliveryFee === 0 ? 'FREE' : `PKR ${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[#F5F2EC] pt-2 border-t border-[#1C1C1C]">
                  <span>Total</span>
                  <span className="text-base font-serif text-[#C6A15B]">
                    PKR {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    navigate('/checkout');
                  }}
                  className="w-full py-4 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.24em] font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    navigate('/cart');
                  }}
                  className="w-full py-3 bg-transparent border border-[#2E2E2E] hover:border-[#C6A15B] text-[#F5F2EC] hover:text-[#C6A15B] text-xs uppercase tracking-[0.22em] font-light transition-colors text-center"
                >
                  VIEW FULL BAG
                </button>
              </div>

              <p className="text-[10px] text-center text-[#F5F2EC]/40 tracking-widest uppercase">
                DISCREET LUXURY PACKAGING INCLUDED
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
