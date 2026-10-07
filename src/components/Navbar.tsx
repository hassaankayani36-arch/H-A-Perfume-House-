import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight } from 'lucide-react';
import Logo from '../assets/logo/Logo.tsx';
import { useCart } from '../context/CartContext.tsx';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, itemCount, openSearch, wishlist } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'FRAGRANCES', path: '/shop' },
    { label: 'COLLECTIONS', path: '/collections' },
    { label: 'OUR STORY', path: '/about' },
    { label: 'JOURNAL', path: '/journal' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#262626] py-3.5 shadow-2xl'
            : 'bg-[#0B0B0B] border-b border-[#1A1A1A] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#F5F2EC]/80 hover:text-[#C6A15B] transition-colors focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Left Nav (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.slice(0, 3).map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-[11.5px] uppercase tracking-[0.24em] transition-all relative py-1 ${
                      isActive
                        ? 'text-[#C6A15B] font-medium'
                        : 'text-[#F5F2EC]/70 hover:text-[#F5F2EC]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C6A15B]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Centered Brand Logo */}
            <Link to="/" className="flex items-center justify-center py-0.5">
              <Logo size="md" variant="full" />
            </Link>

            {/* Right Nav (Desktop) & Actions */}
            <div className="flex items-center gap-6">
              <nav className="hidden lg:flex items-center gap-7">
                {navLinks.slice(3).map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-[11.5px] uppercase tracking-[0.24em] transition-all relative py-1 ${
                        isActive
                          ? 'text-[#C6A15B] font-medium'
                          : 'text-[#F5F2EC]/70 hover:text-[#F5F2EC]'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C6A15B]" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Utility Icons */}
              <div className="flex items-center gap-3.5 sm:gap-4 border-l border-[#262626]/60 pl-4 sm:pl-6">
                {/* Search */}
                <button
                  type="button"
                  onClick={openSearch}
                  className="p-1.5 text-[#F5F2EC]/80 hover:text-[#C6A15B] transition-colors"
                  aria-label="Search fragrances"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* Wishlist */}
                <Link
                  to="/shop?filter=wishlist"
                  className="p-1.5 text-[#F5F2EC]/80 hover:text-[#C6A15B] transition-colors relative"
                  aria-label="View wishlist"
                >
                  <Heart className="w-4 h-4" />
                  {wishlist.length > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#C6A15B]" />
                  )}
                </Link>

                {/* Cart Bag */}
                <button
                  type="button"
                  onClick={openCart}
                  className="p-1.5 text-[#F5F2EC]/80 hover:text-[#C6A15B] transition-colors relative"
                  aria-label="Open shopping bag"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 bg-[#C6A15B] text-[#0B0B0B] text-[9.5px] font-semibold h-4 min-w-4 px-1 rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>

                {/* SHOP NOW button */}
                <Link
                  to="/shop"
                  className="hidden sm:inline-flex items-center gap-2 border border-[#C6A15B] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#0B0B0B] px-3.5 py-1.5 text-[10px] tracking-[0.24em] uppercase transition-all duration-300 font-medium"
                >
                  <span>SHOP NOW</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#0B0B0B] border-r border-[#262626] p-6 flex flex-col justify-between shadow-2xl z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#262626]">
                <Logo size="sm" variant="monogram" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#F5F2EC]/70 hover:text-[#C6A15B]"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6">
                <p className="text-[10px] tracking-[0.25em] text-[#C6A15B] uppercase mb-4">
                  HAUTE PARFUMERIE
                </p>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-sm uppercase tracking-[0.2em] text-[#F5F2EC] hover:text-[#C6A15B] py-1 border-b border-[#1A1A1A] transition-colors flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C6A15B]/50" />
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            <div className="pt-6 border-t border-[#262626] space-y-4">
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center bg-[#C6A15B] text-[#0B0B0B] py-3 text-xs tracking-[0.22em] uppercase font-medium hover:bg-[#DFC27D] transition-colors"
              >
                SHOP ALL FRAGRANCES
              </Link>
              <p className="text-[10px] text-center text-[#F5F2EC]/40 tracking-widest uppercase">
                DEFINE YOUR PRESENCE.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
