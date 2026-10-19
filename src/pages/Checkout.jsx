import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { handleProductImageError } from '../utils/productImage.js';
import { ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
export const Checkout = () => {
    const { items, itemCount, subtotal, deliveryFee, total } = useCart();
    const { profile, loading: authLoading } = useAuth();
    const navigate = useNavigate();
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
    useEffect(() => {
        window.scrollTo(0, 0);
        if (authLoading)
            return;
        if (!profile?.onboardingComplete) {
            navigate('/account', { replace: true, state: { from: '/checkout' } });
            return;
        }
        if (items.length === 0) {
            navigate('/shop');
        }
    }, [authLoading, profile, items.length, navigate]);
    useEffect(() => {
        if (!profile)
            return;
        setFormData((current) => ({
            ...current,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            phone: profile.phone,
            address: profile.address.line1,
            apartment: profile.address.line2 || '',
            city: profile.address.city,
            postalCode: profile.address.postalCode,
        }));
    }, [profile]);
    if (authLoading || !profile?.onboardingComplete) {
        return <div className="grid min-h-[70vh] place-items-center text-sm text-[#F5F2EC]/60">Loading verified account…</div>;
    }
    return (<div className="min-h-screen bg-[#0B0B0B] py-16 sm:py-24 text-[#F5F2EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#F5F2EC]/60 hover:text-[#C6A15B] transition-colors font-light">
            <ArrowLeft className="w-3.5 h-3.5"/>
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

            <div id="checkout-form" className="space-y-8">
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
                    <input type="email" required value={formData.email} readOnly className="w-full bg-[#121212] border border-[#2E2E2E] px-4 py-3 text-xs text-[#F5F2EC]/65 outline-none"/>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                      Contact Phone (for Courier SMS) *
                    </label>
                    <input type="tel" required value={formData.phone} readOnly className="w-full bg-[#121212] border border-[#2E2E2E] px-4 py-3 text-xs text-[#F5F2EC]/65 outline-none"/>
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
                    <input type="text" required value={formData.firstName} readOnly className="w-full bg-[#121212] border border-[#2E2E2E] px-4 py-3 text-xs text-[#F5F2EC]/65 outline-none"/>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                      Last Name *
                    </label>
                    <input type="text" required value={formData.lastName} readOnly className="w-full bg-[#121212] border border-[#2E2E2E] px-4 py-3 text-xs text-[#F5F2EC]/65 outline-none"/>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                    Street Address &amp; House / Bungalow # *
                  </label>
                  <input type="text" required value={formData.address} readOnly className="w-full bg-[#121212] border border-[#2E2E2E] px-4 py-3 text-xs text-[#F5F2EC]/65 outline-none"/>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                      City (Pakistan) *
                    </label>
                    <input type="text" required value={formData.city} readOnly className="w-full bg-[#121212] border border-[#2E2E2E] px-4 py-3 text-xs text-[#F5F2EC]/65 outline-none"/>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                      Special Delivery Instructions (Optional)
                    </label>
                    <input type="text" value={formData.orderNotes} onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })} placeholder="e.g. Leave with gate security / Ring bell" className="w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"/>
                  </div>
                </div>
              </div>

              <p className="border border-amber-800/70 bg-amber-950/30 p-3 text-xs leading-5 text-amber-200">
                Order placement and payment are not connected yet. No order will be submitted or charged from this page.
              </p>
            </div>
          </div>

          {/* Right Column: Order Review Sidebar (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#121212] border border-[#262626] p-6 sm:p-8 space-y-6 sticky top-28">
              <h2 className="font-serif text-2xl text-[#F5F2EC] font-light pb-4 border-b border-[#222222]">
                Selected Flacons ({itemCount})
              </h2>

              {/* Mini Item List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (<div key={item.key} className="flex items-center gap-4 text-xs font-light">
                    <img src={item.image} onError={handleProductImageError} alt={item.name} className="w-12 h-14 object-cover bg-[#0B0B0B] border border-[#242424]"/>
                    <div className="flex-1">
                      <h4 className="font-serif text-base text-[#F5F2EC]">{item.name}</h4>
                      <p className="text-[10.5px] text-[#F5F2EC]/50">
                        {item.size} · Qty {item.quantity}
                      </p>
                    </div>
                    <span className="font-mono text-[#F5F2EC]">
                      PKR {(item.discountedPrice * item.quantity).toLocaleString('en-PK')}
                    </span>
                  </div>))}
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
                  <Truck className="w-3.5 h-3.5 text-[#C6A15B]"/>
                  <span>Dispatched via air-ride courier service in Pakistan</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]"/>
                  <span>Wax-sealed flacons with tamper-evident serial numbers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default Checkout;
