import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Check, Clock } from 'lucide-react';
export const Contact = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'Flacon Consultation',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setForm({
                name: '',
                email: '',
                phone: '',
                subject: 'Flacon Consultation',
                message: '',
            });
        }, 4000);
    };
    return (<div className="min-h-screen bg-[#0B0B0B] py-16 sm:py-24 text-[#F5F2EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#C6A15B]"/>
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
              ATELIER CONCIERGE
            </span>
            <span className="w-5 h-[1px] bg-[#C6A15B]"/>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-light uppercase tracking-wide">
            CONNECT WITH H&amp;A
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#F5F2EC]/65 font-light leading-relaxed max-w-xl mx-auto">
            Whether inquiring about private olfactory consultations, bespoke corporate gifting, or
            order tracking, our concierge is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Information & Salons */}
          <div className="lg:col-span-5 space-y-10">
            <div className="p-8 bg-[#121212] border border-[#222222] space-y-6">
              <h3 className="font-serif text-2xl font-light text-[#F5F2EC]">
                VIP Concierge Desk
              </h3>
              <p className="text-xs text-[#F5F2EC]/70 font-light leading-relaxed">
                Direct client assistance for patrons in Pakistan and international destinations.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#1F1F1F] text-xs">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5"/>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#F5F2EC]/40 block">
                      WHATSAPP &amp; CALL
                    </span>
                    <a href="tel:+923190731434" className="block text-[#F5F2EC] font-mono hover:text-[#C6A15B]">
                      Hassaan Kayani · +92 319 0731434
                    </a>
                    <a href="tel:+923190731434" className="mt-1 block text-[#F5F2EC] font-mono hover:text-[#C6A15B]">
                      Arslan Qamar · +92 319 0731434
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5"/>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#F5F2EC]/40 block">
                      DIRECT CORRESPONDENCE
                    </span>
                    <span className="text-[#F5F2EC]">H&amp;A luxuary@gmail.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5"/>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#F5F2EC]/40 block">
                      HOURS OF RECEPTION
                    </span>
                    <span className="text-[#F5F2EC]">Mon – Sat: 11:00 AM – 09:00 PM (PKT)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Location */}
            <div className="p-8 bg-[#121212] border border-[#222222] space-y-4">
              <h3 className="font-serif text-2xl font-light text-[#F5F2EC]">H&amp;A Office</h3>
              <div className="flex items-start gap-3 text-xs font-light text-[#F5F2EC]/75">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C6A15B]"/>
                <div>
                  <h4 className="text-[11px] font-medium uppercase tracking-widest text-[#C6A15B]">
                    KAHUTA
                  </h4>
                  <p className="mt-1">Office 302, near Al-Ghani Bakers, Motor Chowk, Kahuta, Pakistan</p>
                  <a href="https://maps.google.com/?q=Office+302+Al-Ghani+Bakers+Motor+Chowk+Kahuta" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-[10px] uppercase tracking-widest text-[#C6A15B] underline underline-offset-4">
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#141414] border border-[#262626] p-8 sm:p-12">
            <h3 className="font-serif text-2xl sm:text-3xl font-light mb-2">
              Send a Correspondence
            </h3>
            <p className="text-xs text-[#F5F2EC]/60 font-light mb-8">
              A private perfume advisor will respond within 12 hours.
            </p>

            {submitted ? (<div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] flex items-center justify-center text-[#C6A15B]">
                  <Check className="w-6 h-6"/>
                </div>
                <h4 className="font-serif text-2xl">Correspondence Received</h4>
                <p className="text-xs text-[#F5F2EC]/70 max-w-sm mx-auto font-light leading-relaxed">
                  Thank you. Hassaan &amp; Arslan&apos;s concierge desk will review your inquiry and
                  reach out shortly.
                </p>
              </div>) : (<form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-2">
                      Full Name *
                    </label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Arslan Malik" className="w-full bg-[#0B0B0B] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"/>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-2">
                      Email Address *
                    </label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="client@domain.com" className="w-full bg-[#0B0B0B] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"/>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+92 300 1234567" className="w-full bg-[#0B0B0B] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"/>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-2">
                      Nature of Inquiry
                    </label>
                    <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full bg-[#0B0B0B] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none">
                      <option value="Flacon Consultation">Olfactory / Flacon Consultation</option>
                      <option value="Order Tracking">Order &amp; Delivery Tracking</option>
                      <option value="Corporate Gifting">Corporate &amp; Bespoke Gifting</option>
                      <option value="Salon Booking">Private Salon Appointment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-2">
                    Your Message *
                  </label>
                  <textarea rows={4} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your scent preferences or inquiry..." className="w-full bg-[#0B0B0B] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"/>
                </div>

                <button type="submit" className="w-full py-4 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.24em] font-medium transition-colors">
                  TRANSMIT TO CONCIERGE
                </button>
              </form>)}
          </div>
        </div>
      </div>
    </div>);
};
export default Contact;
