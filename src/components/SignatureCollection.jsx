import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { products } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
const SignatureCollection = () => {
  const { addToCart } = useCart();
  const signatureProducts = products.filter((p) => p.isSignature).slice(0, 4);
  return /* @__PURE__ */ jsx("section", { className: "py-24 sm:py-32 bg-[#0B0B0B] relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#222222] pb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 h-[1px] bg-[#C6A15B]" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light", children: "THE FOUNDATION" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl sm:text-5xl font-light text-[#F5F2EC] uppercase tracking-wide", children: "THE PERFUME EDIT" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-[#F5F2EC]/60 max-w-xl font-light leading-relaxed", children: "Discover a considered selection of perfumes, from bright and fresh notes to rich, warm compositions." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/shop",
          className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C6A15B] hover:text-[#DFC27D] font-light transition-colors group self-start md:self-end",
          children: [
            /* @__PURE__ */ jsx("span", { children: "VIEW ALL CREATIONS" }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: signatureProducts.map((product) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "group flex flex-col bg-[#141414] border border-[#262626] hover:border-[#C6A15B]/50 transition-all duration-500 overflow-hidden",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-[3/4] bg-[#1A1A1A] overflow-hidden", children: [
            /* @__PURE__ */ jsx(Link, { to: `/product/${product.id}`, className: "block w-full h-full", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: product.image,
                alt: product.name,
                loading: "lazy",
                className: "w-full h-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-70 pointer-events-none" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 z-10", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-light bg-[#0B0B0B]/85 px-2.5 py-1 backdrop-blur-sm border border-[#C6A15B]/20", children: product.family }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col flex-1 justify-between space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl font-light text-[#F5F2EC] tracking-wide group-hover:text-[#C6A15B] transition-colors", children: /* @__PURE__ */ jsx(Link, { to: `/product/${product.id}`, children: product.name }) }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-[#F5F2EC]/50 italic font-serif", children: product.tagline }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-3 border-t border-[#222222]", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.2em] uppercase text-[#F5F2EC]/40 block mb-1", children: "KEY NOTES" }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#F5F2EC]/75 font-light", children: [
                  product.notes.top[0],
                  " \xB7 ",
                  product.notes.heart[0],
                  " \xB7 ",
                  product.notes.base[0]
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-[#222222] space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-base text-[#F5F2EC] font-normal tracking-wide", children: product.sizes.find((size) => size.size === "50ML")?.price ?? product.price }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#F5F2EC]/50 tracking-widest uppercase", children: "50ML FLACON" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2.5", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: `/product/${product.id}`,
                    className: "py-2.5 px-3 border border-[#333333] hover:border-[#C6A15B] text-[#F5F2EC] text-center text-[10px] uppercase tracking-[0.2em] font-light hover:text-[#C6A15B] transition-colors",
                    children: "DISCOVER"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => addToCart(product, "50ML", 1),
                    className: "py-2.5 px-3 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-center text-[10px] uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsx(ShoppingBag, { className: "w-3 h-3" }),
                      /* @__PURE__ */ jsx("span", { children: "ADD TO BAG" })
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ]
      },
      product.id
    )) })
  ] }) });
};
var SignatureCollection_default = SignatureCollection;
export {
  SignatureCollection,
  SignatureCollection_default as default
};
