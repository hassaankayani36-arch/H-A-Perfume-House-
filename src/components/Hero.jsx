import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "../data/products.js";
const Hero = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0B0B0B]", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: products[0].image,
          alt: "H&A Luxury perfume bottle",
          className: "w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse-subtle transition-transform duration-1000",
          style: { filter: "brightness(0.55) contrast(1.15)" }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-[#0B0B0B]/85" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-radial from-transparent via-[#0B0B0B]/40 to-[#0B0B0B]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C6A15B]/10 rounded-full blur-[140px] pointer-events-none" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-8 bg-[#C6A15B]" }),
        /* @__PURE__ */ jsx("span", { className: "text-[11px] tracking-[0.35em] uppercase text-[#C6A15B] font-light", children: "HAUTE PARFUMERIE HOUSE" }),
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-8 bg-[#C6A15B]" })
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.08em] font-light text-[#F5F2EC] leading-[1.05] uppercase max-w-4xl mx-auto", children: [
        "DEFINE YOUR ",
        /* @__PURE__ */ jsx("br", { className: "hidden sm:inline" }),
        /* @__PURE__ */ jsx("span", { className: "italic font-normal text-[#C6A15B]", children: "PRESENCE." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-8 text-base sm:text-lg md:text-xl text-[#F5F2EC]/80 max-w-2xl mx-auto font-light leading-relaxed tracking-wide", children: "A curated selection of perfumes for those who leave an impression." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 flex flex-col sm:flex-row items-center justify-center gap-5", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/shop",
            className: "w-full sm:w-auto px-8 py-4 bg-[#C6A15B] text-[#0B0B0B] text-xs uppercase tracking-[0.26em] font-medium hover:bg-[#DFC27D] transition-all duration-300 shadow-lg shadow-[#C6A15B]/10 flex items-center justify-center gap-2 group",
            children: [
              /* @__PURE__ */ jsx("span", { children: "SHOP NOW" }),
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/collections",
            className: "w-full sm:w-auto px-8 py-4 border border-[#C6A15B]/60 text-[#F5F2EC] text-xs uppercase tracking-[0.26em] font-light hover:border-[#C6A15B] hover:bg-[#C6A15B]/10 transition-all duration-300 flex items-center justify-center",
            children: "EXPLORE PERFUMES"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 flex items-center justify-center gap-6 text-[10px] tracking-[0.28em] text-[#F5F2EC]/40 uppercase", children: [
        /* @__PURE__ */ jsx("span", { children: "CURATED PERFUMES" }),
        /* @__PURE__ */ jsx("span", { children: "\xB7" }),
        /* @__PURE__ */ jsx("span", { children: "HIGH SILLAGE" }),
        /* @__PURE__ */ jsx("span", { children: "\xB7" }),
        /* @__PURE__ */ jsx("span", { children: "PKR PRICING" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-60", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[9px] uppercase tracking-[0.3em] text-[#F5F2EC]/50 font-light", children: "SCROLL" }),
      /* @__PURE__ */ jsx("div", { className: "w-[1px] h-7 bg-gradient-to-b from-[#C6A15B] to-transparent animate-pulse" })
    ] })
  ] });
};
var Hero_default = Hero;
export {
  Hero,
  Hero_default as default
};
