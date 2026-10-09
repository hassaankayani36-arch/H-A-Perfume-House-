import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { products } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
const BestSellers = () => {
  const { addToCart } = useCart();
  const mostWanted = products.filter((p) => p.bestSeller);
  return /* @__PURE__ */ jsx("section", { className: "py-24 sm:py-32 bg-[#0E0E0E] border-t border-[#1F1F1F] relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#222222] pb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light", children: "THE HOUSE EDIT" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl sm:text-5xl font-light text-[#F5F2EC] uppercase tracking-wide", children: "ATELIER PICKS" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-[#F5F2EC]/60 max-w-xl font-light leading-relaxed", children: "A considered selection of signature scents from the H&A collection." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/shop",
          className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C6A15B] hover:text-[#DFC27D] font-light transition-colors group",
          children: [
            /* @__PURE__ */ jsx("span", { children: "EXPLORE FULL ATELIER" }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8", children: mostWanted.slice(0, 4).map((product) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "group bg-[#121212] border border-[#222222] hover:border-[#C6A15B]/40 transition-all duration-500 flex flex-col justify-between",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-[3/4] bg-[#171717] overflow-hidden", children: [
            /* @__PURE__ */ jsx(Link, { to: `/product/${product.id}`, className: "block w-full h-full", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: product.image,
                alt: `${product.name} perfume bottle`,
                loading: "lazy",
                className: "w-full h-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80 pointer-events-none" }),
            product.discounted && /* @__PURE__ */ jsx("div", { className: "absolute right-4 top-4 z-10 bg-[#9F3434] px-2.5 py-1.5", children: /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-semibold tracking-[0.12em] text-white", children: [
              "-",
              product.discountPercent,
              "%"
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 z-10", children: /* @__PURE__ */ jsx("span", { className: "text-[9.5px] uppercase tracking-[0.25em] text-[#C6A15B] font-light bg-[#0B0B0B]/85 px-2 py-1 border border-[#C6A15B]/20", children: product.family }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col flex-1 justify-between space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl font-light text-[#F5F2EC] tracking-wide group-hover:text-[#C6A15B] transition-colors", children: /* @__PURE__ */ jsx(Link, { to: `/product/${product.id}`, children: product.name }) }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-[#F5F2EC]/60 font-light line-clamp-1", children: [
                product.notes.top[0],
                " \xB7 ",
                product.notes.heart[0],
                " \xB7 ",
                product.notes.base[0]
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-[#1C1C1C] space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  product.discounted && product.sizes.find((size) => size.size === "50ML")?.compareAtPrice && /* @__PURE__ */ jsx("del", { className: "text-[11px] text-[#F5F2EC]/45", children: product.sizes.find((size) => size.size === "50ML")?.compareAtPrice }),
                  /* @__PURE__ */ jsx("span", { className: "text-base font-normal tracking-wide text-[#F5F2EC]", children: product.price })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#F5F2EC]/50 uppercase tracking-widest", children: product.volume })
              ] }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => addToCart(product, "50ML", 1),
                  className: "w-full py-3 bg-[#1A1A1A] hover:bg-[#C6A15B] text-[#F5F2EC] hover:text-[#0B0B0B] border border-[#2E2E2E] hover:border-[#C6A15B] text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 flex items-center justify-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx(ShoppingBag, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsx("span", { children: "ADD TO BAG" })
                  ]
                }
              )
            ] })
          ] })
        ]
      },
      product.id
    )) })
  ] }) });
};
var BestSellers_default = BestSellers;
export {
  BestSellers,
  BestSellers_default as default
};
