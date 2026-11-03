import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { CustomerProvider } from './context/CustomerContext.jsx';
import { ProductProvider, useProducts } from './context/ProductContext.jsx';
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
import Admin from './pages/Admin.jsx';
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
        <CustomerProvider>
          <BrowserRouter>
            <ProductProvider>
              <ScrollToTop />
              <AppFrame />
            </ProductProvider>
          </BrowserRouter>
        </CustomerProvider>
      </CartProvider>
    </ThemeProvider>);
}

function AppFrame() {
    const { pathname } = useLocation();
    const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/');
    const { products, loading, error, reloadProducts } = useProducts();
    return (<div className="min-h-screen bg-[#0B0B0B] text-[#F5F2EC] flex flex-col font-sans selection:bg-[#C6A15B]/30 selection:text-[#F5F2EC]">
      {!isAdmin && <AnnouncementBar />}
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        {isAdmin ? <Routes><Route path="/admin/*" element={<Admin />} /><Route path="*" element={<Home />} /></Routes> :
            loading ? <CatalogMessage message="Loading the perfume collection..." /> :
            error ? <CatalogMessage message={error} onRetry={reloadProducts} /> :
            products.length === 0 ? <CatalogMessage message="The catalog is empty. Run the catalog seed command, then reload." onRetry={reloadProducts} /> :
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
              <Route path="*" element={<Home />}/>
            </Routes>}
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <CartDrawer />}
      {!isAdmin && <SearchModal />}
    </div>);
}

function CatalogMessage({ message, onRetry }) {
    return (<div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="max-w-xl text-sm text-[#F5F2EC]/75">{message}</p>
      {onRetry && <button type="button" onClick={onRetry} className="border border-[#C6A15B] px-5 py-3 text-xs uppercase tracking-widest text-[#C6A15B]">Try again</button>}
    </div>);
}
