import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { handleProductImageError } from '../utils/productImage.ts';
import { ShieldCheck, Check, Truck, Lock, ArrowLeft, Building2 } from 'lucide-react';
import Logo from '../assets/logo/Logo.tsx';

export const Checkout: React.FC = () => {
  const { items, itemCount, subtotal, deliveryFee, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank' | 'card'>('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: 'Lahore',
    postalCode: '',
    orderNotes: '',
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (items.length === 0 && !orderComplete) {
      navigate('/shop');
    }
  }, [items.length, orderComplete, navigate]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `HA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedId);
    setOrderComplete(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pakistaniCities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Abbottabad',
    'Other City',
  ];

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] py-20 px-4 flex items-center justify-center">
        <div className="max-w-xl w-full bg-[#121212] border border-[#2E2E2E] p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <Logo size="md" variant="full" />

          <div className="w-16 h-16 mx-auto rounded-full bg-[#C6A15B]/15 border border-[#C6A15B] flex items-center justify-center text-[#C6A15B]">
            <Check className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B]">
              ORDER CONFIRMATION
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F2EC] font-light">
              Your Presence Is Defined.
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#F5F2EC]/50 font-mono">
              ORDER REFERENCE: <strong className="text-[#C6A15B]">{orderNumber}</strong>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#F5F2EC]/75 font-light leading-relaxed max-w-md mx-auto">
            Thank you, {formData.firstName || 'Patron'}. Your flacon is now being hand-packaged in
            our signature obsidian coffret. A tracking correspondence has been transmitted to{' '}
            <span className="text-[#C6A15B]">{formData.email || 'your email'}</span>.
          </p>

          <div className="p-4 bg-[#171717] border border-[#262626] text-xs text-left space-y-2 font-light">
            <div className="flex justify-between">
              <span className="text-[#F5F2EC]/60">Delivery Address:</span>
              <span className="text-[#F5F2EC] text-right font-normal">
                {formData.address}, {formData.city}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#F5F2EC]/60">Payment Method:</span>
              <span className="text-[#C6A15B] uppercase font-normal">
                {paymentMethod === 'cod'
                  ? 'Cash on Delivery'
                  : paymentMethod === 'bank'
                  ? 'Direct Bank Transfer'
                  : 'Credit / Debit Card'}
              </span>
            </div>
            <div className="flex justify-between border-t border-[#222222] pt-2">
              <span className="text-[#F5F2EC]/60">Total Amount:</span>
              <span className="text-[#F5F2EC] font-serif text-base font-normal">
                PKR {total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link
              to="/shop"
              className="flex-1 py-3.5 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.22em] font-medium transition-colors text-center"
            >
              CONTINUE SHOPPING
            </Link>
            <Link
              to="/"
              className="flex-1 py-3.5 bg-transparent border border-[#2E2E2E] hover:border-[#C6A15B] text-[#F5F2EC] text-xs uppercase tracking-[0.22em] font-light transition-colors text-center"
            >
              RETURN TO HOME
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] py-16 sm:py-24 text-[#F5F2EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#F5F2EC]/60 hover:text-[#C6A15B] transition-colors font-light"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO BAG</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Checkout Form (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C6A15B] font-light block mb-2">
                DISPATCH SPECIFICATION
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-light uppercase tracking-wide">
                CHECKOUT DETAILS
              </h1>
            </div>

            <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-medium pb-2 border-b border-[#222222]">
                  1. PATRON CONTACT
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                      Email Address (for dispatch updates) *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@luxury.com"
                      className="w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                      Contact Phone (for Courier SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-medium pb-2 border-b border-[#222222]">
                  2. DELIVERY DESTINATION
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="First name"
                      className="w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Last name"
                      className="w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                    Street Address &amp; House / Bungalow # *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House / Flat #, Street, Phase or Sector"
                    className="w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                      City (Pakistan) *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                    >
                      {pakistaniCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                      Special Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.orderNotes}
                      onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                      placeholder="e.g. Leave with gate security / Ring bell"
                      className="w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-medium pb-2 border-b border-[#222222]">
                  3. PAYMENT SETTLEMENT
                </h3>

                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`block p-4 border transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#C6A15B] bg-[#171717]'
                        : 'border-[#262626] bg-[#121212]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-[#C6A15B]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-wider text-[#F5F2EC] font-medium">
                            Cash On Delivery (COD)
                          </span>
                          <span className="text-[10px] text-[#C6A15B] uppercase tracking-widest">
                            MOST POPULAR
                          </span>
                        </div>
                        <p className="text-[11px] text-[#F5F2EC]/60 font-light mt-1">
                          Pay in cash upon physical receipt and inspection of your sealed flacon.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Direct Bank Transfer */}
                  <label
                    className={`block p-4 border transition-all cursor-pointer ${
                      paymentMethod === 'bank'
                        ? 'border-[#C6A15B] bg-[#171717]'
                        : 'border-[#262626] bg-[#121212]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'bank'}
                        onChange={() => setPaymentMethod('bank')}
                        className="accent-[#C6A15B]"
                      />
                      <div className="flex-1">
                        <span className="text-xs uppercase tracking-wider text-[#F5F2EC] font-medium">
                          Direct Bank Transfer / IBFT
                        </span>
                        <p className="text-[11px] text-[#F5F2EC]/60 font-light mt-1">
                          Meezan Bank / HBL Atelier Accounts. Transfer confirmation sent via WhatsApp.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Card Payment */}
                  <label
                    className={`block p-4 border transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#C6A15B] bg-[#171717]'
                        : 'border-[#262626] bg-[#121212]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="accent-[#C6A15B]"
                      />
                      <div className="flex-1">
                        <span className="text-xs uppercase tracking-wider text-[#F5F2EC] font-medium">
                          Credit / Debit Card (Visa, Mastercard, PayPak)
                        </span>
                        <p className="text-[11px] text-[#F5F2EC]/60 font-light mt-1">
                          Encrypted 256-bit secure gateway transaction.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.26em] font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-xl"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>AUTHORIZE &amp; PLACE ORDER · PKR {total.toLocaleString()}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Review Sidebar (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#121212] border border-[#262626] p-6 sm:p-8 space-y-6 sticky top-28">
              <h2 className="font-serif text-2xl text-[#F5F2EC] font-light pb-4 border-b border-[#222222]">
                Selected Flacons ({itemCount})
              </h2>

              {/* Mini Item List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.key} className="flex items-center gap-4 text-xs font-light">
                    <img
                      src={item.image}
                      onError={handleProductImageError}
                      alt={item.name}
                      className="w-12 h-14 object-cover bg-[#0B0B0B] border border-[#242424]"
                    />
                    <div className="flex-1">
                      <h4 className="font-serif text-base text-[#F5F2EC]">{item.name}</h4>
                      <p className="text-[10.5px] text-[#F5F2EC]/50">
                        {item.size} · Qty {item.quantity}
                      </p>
                    </div>
                    <span className="font-mono text-[#F5F2EC]">
                      PKR {(item.rawPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="pt-4 border-t border-[#222222] space-y-3 text-xs font-light">
                <div className="flex justify-between text-[#F5F2EC]/80">
                  <span>Subtotal</span>
                  <span className="font-mono">PKR {subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-[#F5F2EC]/80">
                  <span>Shipping</span>
                  <span className={`font-mono ${deliveryFee === 0 ? 'text-[#C6A15B]' : ''}`}>
                    {deliveryFee === 0 ? 'COMPLIMENTARY' : `PKR ${deliveryFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-[#F5F2EC]/80">
                  <span>Coffret Gift Packaging</span>
                  <span className="text-[#C6A15B]">INCLUDED</span>
                </div>

                <div className="pt-4 border-t border-[#222222] flex justify-between items-baseline">
                  <span className="text-sm uppercase tracking-widest text-[#F5F2EC]">Total</span>
                  <span className="font-serif text-3xl text-[#C6A15B] font-light">
                    PKR {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1C1C1C] space-y-2 text-[10px] text-[#F5F2EC]/50 font-light">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Dispatched via air-ride courier service in Pakistan</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Wax-sealed flacons with tamper-evident serial numbers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
