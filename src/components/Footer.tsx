import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo/Logo.tsx';
import { ArrowUp, Phone, Mail, MapPin } from 'lucide-react';
import { products } from '../data/products.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080808] border-t border-[#1C1C1C] text-[#F5F2EC] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center text-center pb-16 border-b border-[#1C1C1C]">
          <Logo size="lg" variant="full" />
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-light">
            DEFINE YOUR PRESENCE.
          </p>
        </div>

        {/* 4-Column Footer Navigation */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12 border-b border-[#1C1C1C]">
          {/* Col 1: Shop */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-normal">
              SHOP PERFUMES
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5F2EC]/65 font-light">
              {products.slice(0, 4).map((product) => (
                <li key={product.id}>
                  <Link to={`/product/${product.id}`} className="hover:text-[#F5F2EC] transition-colors">
                    {product.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/collections" className="hover:text-[#F5F2EC] transition-colors">
                  Explore Curated Collections
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#C6A15B] transition-colors">
                  Shop All {products.length} Perfumes →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: About / Founders */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-normal">
              THE HOUSE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5F2EC]/65 font-light">
              <li>
                <Link to="/about" className="hover:text-[#F5F2EC] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/about#founders" className="hover:text-[#F5F2EC] transition-colors">
                  Hassaan &amp; Arslan
                </Link>
              </li>
              <li>
                <Link to="/about#philosophy" className="hover:text-[#F5F2EC] transition-colors">
                  The Philosophy of Presence
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-[#F5F2EC] transition-colors">
                  The H&A Journal
                </Link>
              </li>
              <li>
                <Link to="/about#sourcing" className="hover:text-[#F5F2EC] transition-colors">
                  How We Source Perfumes
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-normal">
              CONCIERGE &amp; CARE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5F2EC]/65 font-light">
              <li>
                <span className="text-[#C6A15B]">Free Delivery:</span> Orders &gt; PKR 2,500
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F5F2EC] transition-colors">
                  Concierge Inquiries
                </Link>
              </li>
              <li>
                <Link to="/contact#shipping" className="hover:text-[#F5F2EC] transition-colors">
                  Shipping &amp; Delivery Across Pakistan
                </Link>
              </li>
              <li>
                <Link to="/contact#returns" className="hover:text-[#F5F2EC] transition-colors">
                  Flacon Return &amp; Exchange Policy
                </Link>
              </li>
              <li>
                <Link to="/contact#gifting" className="hover:text-[#F5F2EC] transition-colors">
                  Corporate &amp; Bespoke Gifting
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Atelier & Salons */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-normal">
              ATELIER PRESENCE
            </h4>
            <div className="space-y-3 text-xs text-[#F5F2EC]/65 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C6A15B] mt-0.5 shrink-0" />
                <span>Office 302, near Al-Ghani Bakers, Motor Chowk, Kahuta, Pakistan</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span>H&amp;A luxuary@gmail.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span>
                  <a href="tel:+923190731434" className="hover:text-[#C6A15B]">Hassaan: +92 319 0731434</a>
                  <br />
                  <a href="tel:+923099282467" className="hover:text-[#C6A15B]">Arslan: +92 309 9282467</a>
                </span>
              </p>
              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] block mb-1">
                  HOURS
                </span>
                <span>Monday – Saturday: 11:00 AM – 09:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10.5px] text-[#F5F2EC]/50 font-light">
          <div className="flex items-center gap-4">
            <span>&copy; {new Date().getFullYear()} H&amp;A LUXURY — BY HASSAAN &amp; ARSLAN</span>
            <span className="text-[#333333]">|</span>
            <span className="text-[#C6A15B]/80">ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-[#F5F2EC] transition-colors">
              PRIVACY POLICY
            </Link>
            <Link to="/contact" className="hover:text-[#F5F2EC] transition-colors">
              TERMS OF SERVICE
            </Link>
            <button
              onClick={scrollToTop}
              className="p-2 border border-[#262626] hover:border-[#C6A15B] text-[#F5F2EC]/70 hover:text-[#C6A15B] transition-colors ml-2"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
