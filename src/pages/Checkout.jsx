import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useCustomer } from '../context/CustomerContext.jsx';
import { apiRequest } from '../api/client.js';
import { handleProductImageError } from '../utils/productImage.js';
import { ShieldCheck, Check, Truck, Lock, ArrowLeft } from 'lucide-react';
import Logo from '../assets/logo/Logo.jsx';
export const Checkout = () => {
    const { items, itemCount, subtotal, deliveryFee, total, discountPercent, discountAmount, checkoutOptions, clearCart, clearCheckoutOptions } = useCart();
    const { user, loading: customerLoading, isConfigured, signInWithGoogle, signOutCustomer } = useCustomer();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        apartment: '',
        city: 'Lahore',
        postalCode: '',
        orderNotes: '',
    });
    const [profileLoading, setProfileLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const [orderComplete, setOrderComplete] = useState(false);
    const [confirmedOrder, setConfirmedOrder] = useState(null);
    const [confirmedCustomer, setConfirmedCustomer] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [idempotencyKey] = useState(() => crypto.randomUUID());
    useEffect(() => {
        if (!user) {
            setProfileLoading(false);
            setFormData({ phone: '', address: '', apartment: '', city: 'Lahore', postalCode: '', orderNotes: '' });
            return;
        }
        let active = true;
        setProfileLoading(true);
        setAuthError('');
        user.getIdToken()
            .then((token) => apiRequest('/api/customer/profile', {
                headers: { Authorization: `Bearer ${token}` },
            }))
            .then((profile) => {
                if (!active) return;
                setFormData((current) => ({
                    ...current,
                    phone: profile.phone || '',
                    address: profile.address || '',
                    apartment: profile.apartment || '',
                    city: profile.city || 'Lahore',
                    postalCode: profile.postalCode || '',
                }));
            })
            .catch((error) => {
                if (active) setAuthError(error instanceof Error ? error.message : 'Your customer profile could not be loaded.');
            })
            .finally(() => {
                if (active) setProfileLoading(false);
            });
        return () => {
            active = false;
        };
    }, [user]);
    useEffect(() => {
        window.scrollTo(0, 0);
        if (items.length === 0 && !orderComplete) {
            navigate('/shop');
        }
    }, [items.length, orderComplete, navigate]);
    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (isSubmitting || !user) return;
        setIsSubmitting(true);
        setSubmitError('');
        setAuthError('');
        try {
            const token = await user.getIdToken();
            await apiRequest('/api/customer/profile', {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    phone: formData.phone,
                    address: formData.address,
                    apartment: formData.apartment,
                    city: formData.city,
                    postalCode: formData.postalCode,
                }),
            });
            const order = await apiRequest('/api/orders', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    items: items.map(({ id, size, quantity }) => ({ productId: id, size, quantity })),
                    promoCode: checkoutOptions.promoCode,
                    giftNote: checkoutOptions.giftNoteEnabled ? checkoutOptions.giftNoteText : '',
                    orderNotes: formData.orderNotes,
                    idempotencyKey,
                }),
            });
            setConfirmedOrder(order);
            setConfirmedCustomer({
                name: user.displayName,
                address: formData.address,
                city: formData.city,
            });
            setOrderComplete(true);
            clearCart();
            clearCheckoutOptions();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Your order could not be submitted. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
        return (<div className="min-h-screen bg-[#0B0B0B] py-20 px-4 flex items-center justify-center">
        <div className="max-w-xl w-full bg-[#121212] border border-[#2E2E2E] p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <Logo size="md" variant="full"/>

          <div className="w-16 h-16 mx-auto rounded-full bg-[#C6A15B]/15 border border-[#C6A15B] flex items-center justify-center text-[#C6A15B]">
            <Check className="w-8 h-8"/>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B]">
              ORDER CONFIRMATION
            </span>
            <h1 className="font-display text-3xl sm:text-4xl text-[#F5F2EC] font-light">
              Your Presence Is Defined.
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#F5F2EC]/50 font-mono">
              ORDER REFERENCE: <strong className="text-[#C6A15B]">{confirmedOrder?.orderNumber}</strong>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#F5F2EC]/75 font-light leading-relaxed max-w-md mx-auto">
            Thank you, {confirmedCustomer?.name || 'Patron'}. Your order has been recorded for Cash on Delivery.
          </p>

          <div className="p-4 bg-[#171717] border border-[#262626] text-xs text-left space-y-2 font-light">
            <div className="flex justify-between">
              <span className="text-[#F5F2EC]/60">Delivery Address:</span>
              <span className="text-[#F5F2EC] text-right font-normal">
                {confirmedCustomer?.address}, {confirmedCustomer?.city}
              </span>
            </div>
            <div className="flex justify-between border-t border-[#222222] pt-2">
              <span className="text-[#F5F2EC]/60">Total Amount:</span>
              <span className="text-[#F5F2EC] font-serif text-base font-normal">
                PKR {(confirmedOrder?.total ?? total).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link to="/shop" className="flex-1 py-3.5 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.22em] font-medium transition-colors text-center">
              CONTINUE SHOPPING
            </Link>
            <Link to="/" className="flex-1 py-3.5 bg-transparent border border-[#2E2E2E] hover:border-[#C6A15B] text-[#F5F2EC] text-xs uppercase tracking-[0.22em] font-light transition-colors text-center">
              RETURN TO HOME
            </Link>
          </div>
        </div>
      </div>);
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
              <h1 className="font-display text-3xl sm:text-4xl font-light uppercase tracking-wide">
                CHECKOUT DETAILS
              </h1>
            </div>

            <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-8">
              {!user ? (
                <section className="space-y-4 border border-[#302C25] bg-[#121212] p-5">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#C6A15B]">Sign in to continue</h3>
                  <p className="text-sm text-[#F5F2EC]/65">Use your Google account to create a customer profile and keep your delivery details with your orders.</p>
                  {authError && <p role="alert" className="text-sm text-red-400">{authError}</p>}
                  <button
                    type="button"
                    disabled={customerLoading || !isConfigured}
                    onClick={() => signInWithGoogle().catch((error) => setAuthError(error.message))}
                    className="w-full border border-[#C6A15B] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[#DFC27D] disabled:opacity-50"
                  >
                    {customerLoading ? 'CHECKING ACCOUNT…' : 'CONTINUE WITH GOOGLE'}
                  </button>
                  {!isConfigured && <p className="text-xs text-[#F5F2EC]/50">Google sign-in is unavailable until Firebase web app settings are configured.</p>}
                </section>
              ) : (
                <section className="space-y-4 border border-[#302C25] bg-[#121212] p-5">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-xs uppercase tracking-[0.2em] text-[#C6A15B]">Signed in customer</h3>
                      <p className="mt-2 text-sm text-[#F5F2EC]">{user.displayName}</p>
                      <p className="mt-1 text-xs text-[#F5F2EC]/55">{user.email}</p>
                    </div>
                    <button type="button" onClick={() => signOutCustomer().catch((error) => setAuthError(error.message))} className="text-left text-[10px] uppercase tracking-widest text-[#F5F2EC]/55 hover:text-[#C6A15B]">
                      Sign out
                    </button>
                  </div>
                  {profileLoading && <p className="text-xs text-[#F5F2EC]/50">Loading your saved delivery details…</p>}
                  {authError && <p role="alert" className="text-sm text-red-400">{authError}</p>}
                </section>
              )}

              {/* Contact Information */}
              {user && <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-medium pb-2 border-b border-[#222222]">
                  1. PATRON CONTACT
                </h3>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                    Contact Phone (for courier updates) *
                  </label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+92 300 1234567" className="w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"/>
                </div>
              </div>}

              {/* Delivery Address */}
              {user && <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-medium pb-2 border-b border-[#222222]">
                  2. DELIVERY DESTINATION
                </h3>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                    Street Address &amp; House / Bungalow # *
                  </label>
                  <input type="text" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="House / Flat #, Street, Phase or Sector" className="w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"/>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                      City (Pakistan) *
                    </label>
                    <select value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none">
                      {pakistaniCities.map((city) => (<option key={city} value={city}>
                          {city}
                        </option>))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                      Special Delivery Instructions (Optional)
                    </label>
                    <input type="text" value={formData.orderNotes} onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })} placeholder="e.g. Leave with gate security / Ring bell" className="w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"/>
                  </div>
                </div>
              </div>}

              {/* COD Settlement */}
              {user && <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-medium pb-2 border-b border-[#222222]">
                  3. PAYMENT SETTLEMENT
                </h3>
                <p className="border border-[#6C582F] bg-[#C6A15B]/10 p-4 text-sm text-[#DFC27D]">
                  Cash on Delivery only. Pay the PKR total when your order arrives.
                </p>
              </div>}

              {/* Submit CTA */}
              <div className="pt-4">
                {submitError && <p role="alert" className="mb-3 text-sm text-red-400">{submitError}</p>}
                <button type="submit" disabled={isSubmitting || !user || profileLoading} className="w-full py-4 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.26em] font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-xl disabled:cursor-wait disabled:opacity-60">
                  <Lock className="w-3.5 h-3.5"/>
                  <span>{isSubmitting ? 'SUBMITTING ORDER…' : `PLACE ORDER · PKR ${total.toLocaleString()}`}</span>
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

                {discountAmount > 0 && <div className="flex justify-between text-[#C6A15B]">
                  <span>Patron Privilege ({discountPercent}%)</span>
                  <span className="font-mono">- PKR {discountAmount.toLocaleString()}</span>
                </div>}

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
