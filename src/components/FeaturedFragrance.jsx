import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Check } from "lucide-react";
import { products } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
const FeaturedFragrance = () => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("50ML");
  const [isAdded, setIsAdded] = useState(false);
  const featuredProduct = products[0];
  const handleAdd = () => {
    addToCart(featuredProduct, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2e3);
  };
  const currentSizeObj = featuredProduct.sizes.find((s) => s.size === selectedSize) || featuredProduct.sizes[0];
  return /* @__PURE__ */ jsxs("section", { className: "py-24 sm:py-32 bg-[#0E0E0E] border-t border-[#1F1F1F] relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C6A15B]/5 rounded-full blur-[130px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-6 relative", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] bg-[#141414] border border-[#262626] overflow-hidden group", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: featuredProduct.image,
            alt: `${featuredProduct.name} perfume bottle`,
            loading: "lazy",
            className: "w-full h-full object-contain object-center transition-transform duration-1000 group-hover:scale-105"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-transparent opacity-80" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-6 left-6 font-serif text-6xl text-[#C6A15B]/10 select-none", children: "H&A" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 left-6 z-10", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-light bg-[#0B0B0B]/90 px-3 py-1.5 border border-[#C6A15B]/30", children: "FEATURED PERFUME" }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 flex flex-col justify-center space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light", children: "FEATURED PERFUME" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl sm:text-5xl md:text-6xl text-[#F5F2EC] font-light uppercase tracking-wide", children: featuredProduct.name }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[#C6A15B] tracking-[0.2em] uppercase font-light", children: featuredProduct.concentration }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm sm:text-base text-[#F5F2EC]/70 font-light leading-relaxed", children: featuredProduct.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-[#141414] border border-[#242424] space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium border-b border-[#242424] pb-2", children: "OLFACTORY ARCHITECTURE" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-xs", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-baseline justify-between gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#C6A15B]/90 tracking-[0.2em] uppercase text-[11px] font-medium min-w-20", children: "TOP:" }),
              /* @__PURE__ */ jsx("span", { className: "text-[#F5F2EC] font-light tracking-wide sm:text-right", children: featuredProduct.notes.top.join(", ") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-t border-[#1C1C1C] pt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#C6A15B]/90 tracking-[0.2em] uppercase text-[11px] font-medium min-w-20", children: "HEART:" }),
              /* @__PURE__ */ jsx("span", { className: "text-[#F5F2EC] font-light tracking-wide sm:text-right", children: featuredProduct.notes.heart.join(", ") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-t border-[#1C1C1C] pt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#C6A15B]/90 tracking-[0.2em] uppercase text-[11px] font-medium min-w-20", children: "BASE:" }),
              /* @__PURE__ */ jsx("span", { className: "text-[#F5F2EC] font-light tracking-wide sm:text-right", children: featuredProduct.notes.base.join(", ") })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-[#F5F2EC]/60", children: "SELECT VOLUME" }),
            /* @__PURE__ */ jsxs("span", { className: "font-serif text-2xl sm:text-3xl text-[#F5F2EC] font-light tracking-wide", children: [
              /* @__PURE__ */ jsx("del", { className: "mr-2 text-base text-[#F5F2EC]/45", children: currentSizeObj.compareAtPrice }),
              currentSizeObj.price
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2", children: featuredProduct.sizes.map((s) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSelectedSize(s.size),
              className: `flex-1 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 font-light border ${selectedSize === s.size ? "border-[#C6A15B] bg-[#C6A15B]/10 text-[#F5F2EC]" : "border-[#262626] bg-[#141414] text-[#F5F2EC]/60 hover:border-[#383838]"}`,
              children: [
                /* @__PURE__ */ jsx("span", { children: s.size }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#C6A15B] block mt-0.5", children: s.price })
              ]
            },
            s.size
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 pt-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleAdd,
              className: "flex-1 py-4 px-6 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 flex items-center justify-center gap-2",
              children: isAdded ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-[#0B0B0B]" }),
                /* @__PURE__ */ jsx("span", { children: "ADDED TO BAG" })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(ShoppingBag, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "ADD TO BAG \xB7 ",
                  currentSizeObj.size
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: `/product/${featuredProduct.id}`,
              className: "py-4 px-6 border border-[#2E2E2E] hover:border-[#C6A15B] text-[#F5F2EC] text-xs uppercase tracking-[0.25em] font-light hover:text-[#C6A15B] transition-colors flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsx("span", { children: "EXPLORE DETAILS" }),
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
};
var FeaturedFragrance_default = FeaturedFragrance;
export {
  FeaturedFragrance,
  FeaturedFragrance_default as default
};
