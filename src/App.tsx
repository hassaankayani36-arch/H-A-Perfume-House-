import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

// Components
import AnnouncementBar from './components/AnnouncementBar.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import CartDrawer from './components/CartDrawer.tsx';
import SearchModal from './components/SearchModal.tsx';

// Pages
import Home from './pages/Home.tsx';
import Shop from './pages/Shop.tsx';
import ProductDetails from './pages/ProductDetails.tsx';
import Collections from './pages/Collections.tsx';
import About from './pages/About.tsx';
import Journal from './pages/Journal.tsx';
import Contact from './pages/Contact.tsx';
import Cart from './pages/Cart.tsx';
import Checkout from './pages/Checkout.tsx';

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-[#0B0B0B] text-[#F5F2EC] flex flex-col font-sans selection:bg-[#C6A15B]/30 selection:text-[#F5F2EC]">
            {/* Top Announcement Bar */}
            <AnnouncementBar />

            {/* Sticky Navigation */}
            <Navbar />

            {/* Main Route Content */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/about" element={<About />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                {/* Fallback to home */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>

            {/* Luxury Footer */}
            <Footer />

            {/* Global Drawers & Modals */}
            <CartDrawer />
            <SearchModal />
          </div>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}
