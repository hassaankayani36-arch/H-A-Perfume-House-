import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import AnnouncementBar from "./components/AnnouncementBar.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import SearchModal from "./components/SearchModal.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Collections from "./pages/Collections.jsx";
import About from "./pages/About.jsx";
import Journal from "./pages/Journal.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
function App() {
  return /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(CartProvider, { children: /* @__PURE__ */ jsxs(BrowserRouter, { children: [
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#0B0B0B] text-[#F5F2EC] flex flex-col font-sans selection:bg-[#C6A15B]/30 selection:text-[#F5F2EC]", children: [
      /* @__PURE__ */ jsx(AnnouncementBar, {}),
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxs(Routes, { children: [
        /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/shop", element: /* @__PURE__ */ jsx(Shop, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/product/:id", element: /* @__PURE__ */ jsx(ProductDetails, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/collections", element: /* @__PURE__ */ jsx(Collections, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(About, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/journal", element: /* @__PURE__ */ jsx(Journal, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(Contact, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/cart", element: /* @__PURE__ */ jsx(Cart, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/checkout", element: /* @__PURE__ */ jsx(Checkout, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Home, {}) })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(CartDrawer, {}),
      /* @__PURE__ */ jsx(SearchModal, {})
    ] })
  ] }) }) });
}
export {
  App as default
};
