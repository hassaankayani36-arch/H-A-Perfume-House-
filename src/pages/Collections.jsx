import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { collections } from "../data/collections.js";
import { products } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
const Collections = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-[#0B0B0B] py-16 sm:py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light", children: "CURATED ANTHOLOGIES" }),
        /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-4xl sm:text-6xl font-light text-[#F5F2EC] uppercase tracking-wide", children: "THE COLLECTIONS" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm sm:text-base text-[#F5F2EC]/65 font-light leading-relaxed max-w-xl mx-auto", children: "Browse our curated perfume selection by scent family and discover notes suited to different moods and occasions." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-24", children: collections.map((col, index) => {
      const matchingProducts = products.filter((product) => product.family === col.family);
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "pt-12 border-t border-[#222222] first:border-t-0 first:pt-0",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline mb-12", children: [
              /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-light block mb-2", children: [
                  "COLLECTION ",
                  `0${index + 1}`,
                  " \xB7 ",
                  col.subtitle
                ] }),
                /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl sm:text-4xl font-light text-[#F5F2EC] uppercase tracking-wide", children: col.title })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-[#F5F2EC]/75 font-light leading-relaxed", children: col.description }),
                /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs italic font-serif text-[#C6A15B]", children: [
                  "\u201C",
                  col.tagline,
                  "\u201D"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: matchingProducts.slice(0, 4).map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id)) })
          ]
        },
        col.id
      );
    }) })
  ] }) });
};
var Collections_default = Collections;
export {
  Collections,
  Collections_default as default
};
