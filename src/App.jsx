import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
// Components
import AnnouncementBar from './components/AnnouncementBar.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import SearchModal from './components/SearchModal.jsx';
// Pages
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Collections from './pages/Collections.jsx';
import About from './pages/About.jsx';
import Journal from './pages/Journal.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
// Auto scroll to top on route change
function ScrollToTop() {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);
    return null;
}
export default function App() {
    return (<ThemeProvider>
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
                <Route path="/" element={<Home />}/>
                <Route path="/shop" element={<Shop />}/>
                <Route path="/product/:id" element={<ProductDetails />}/>
                <Route path="/collections" element={<Collections />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/journal" element={<Journal />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/cart" element={<Cart />}/>
                <Route path="/checkout" element={<Checkout />}/>
                {/* Fallback to home */}
                <Route path="*" element={<Home />}/>
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
    </ThemeProvider>);
}
