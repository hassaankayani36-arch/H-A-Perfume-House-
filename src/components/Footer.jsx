import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Logo from "../assets/logo/Logo.jsx";
import { ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import { products } from "../data/products.js";
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsx("footer", { className: "bg-[#080808] border-t border-[#1C1C1C] text-[#F5F2EC] pt-20 pb-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center text-center pb-16 border-b border-[#1C1C1C]", children: [
      /* @__PURE__ */ jsx(Logo, { size: "lg", variant: "full" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-light", children: "DEFINE YOUR PRESENCE." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "py-16 grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12 border-b border-[#1C1C1C]", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-normal", children: "SHOP PERFUMES" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2.5 text-xs text-[#F5F2EC]/65 font-light", children: [
          products.slice(0, 4).map((product) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: `/product/${product.id}`, className: "hover:text-[#F5F2EC] transition-colors", children: product.name }) }, product.id)),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/collections", className: "hover:text-[#F5F2EC] transition-colors", children: "Explore Curated Collections" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/shop", className: "hover:text-[#C6A15B] transition-colors", children: [
            "Shop All ",
            products.length,
            " Perfumes \u2192"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-normal", children: "THE HOUSE" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2.5 text-xs text-[#F5F2EC]/65 font-light", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "hover:text-[#F5F2EC] transition-colors", children: "Our Story" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about#founders", className: "hover:text-[#F5F2EC] transition-colors", children: "Hassaan & Arslan" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about#philosophy", className: "hover:text-[#F5F2EC] transition-colors", children: "The Philosophy of Presence" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/journal", className: "hover:text-[#F5F2EC] transition-colors", children: "The H&A Journal" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about#sourcing", className: "hover:text-[#F5F2EC] transition-colors", children: "How We Source Perfumes" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-normal", children: "CONCIERGE & CARE" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2.5 text-xs text-[#F5F2EC]/65 font-light", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#C6A15B]", children: "Free Delivery:" }),
            " Orders > PKR 2,500"
          ] }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-[#F5F2EC] transition-colors", children: "Concierge Inquiries" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact#shipping", className: "hover:text-[#F5F2EC] transition-colors", children: "Shipping & Delivery Across Pakistan" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact#returns", className: "hover:text-[#F5F2EC] transition-colors", children: "Flacon Return & Exchange Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact#gifting", className: "hover:text-[#F5F2EC] transition-colors", children: "Corporate & Bespoke Gifting" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-normal", children: "ATELIER PRESENCE" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-xs text-[#F5F2EC]/65 font-light", children: [
          /* @__PURE__ */ jsxs("p", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-3.5 h-3.5 text-[#C6A15B] mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "Office 302, near Al-Ghani Bakers, Motor Chowk, Kahuta, Pakistan" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Mail, { className: "w-3.5 h-3.5 text-[#C6A15B] shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "H&A luxuary@gmail.com" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-3.5 h-3.5 text-[#C6A15B] shrink-0" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("a", { href: "tel:+923190731434", className: "hover:text-[#C6A15B]", children: "Hassaan: +92 319 0731434" }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("a", { href: "tel:+923099282467", className: "hover:text-[#C6A15B]", children: "Arslan: +92 309 9282467" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-[#C6A15B] block mb-1", children: "HOURS" }),
            /* @__PURE__ */ jsx("span", { children: "Monday \u2013 Saturday: 11:00 AM \u2013 09:00 PM" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10.5px] text-[#F5F2EC]/50 font-light", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "\xA9 ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " H&A LUXURY \u2014 BY HASSAAN & ARSLAN"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-[#333333]", children: "|" }),
        /* @__PURE__ */ jsx("span", { className: "text-[#C6A15B]/80", children: "ALL RIGHTS RESERVED" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-[#F5F2EC] transition-colors", children: "PRIVACY POLICY" }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-[#F5F2EC] transition-colors", children: "TERMS OF SERVICE" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: scrollToTop,
            className: "p-2 border border-[#262626] hover:border-[#C6A15B] text-[#F5F2EC]/70 hover:text-[#C6A15B] transition-colors ml-2",
            "aria-label": "Scroll to top of page",
            children: /* @__PURE__ */ jsx(ArrowUp, { className: "w-3.5 h-3.5" })
          }
        )
      ] })
    ] })
  ] }) });
};
var Footer_default = Footer;
export {
  Footer,
  Footer_default as default
};
