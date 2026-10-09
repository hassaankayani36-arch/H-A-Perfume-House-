import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import { products } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { handleProductImageError } from "../utils/productImage.js";
const SearchModal = () => {
  const { isSearchOpen, closeSearch } = useCart();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchInputId = useId();
  if (!isSearchOpen) return null;
  const filtered = query.trim() ? products.filter(
    (p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.family.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()) || p.notes.top.some((n) => n.toLowerCase().includes(query.toLowerCase())) || p.notes.heart.some((n) => n.toLowerCase().includes(query.toLowerCase())) || p.notes.base.some((n) => n.toLowerCase().includes(query.toLowerCase()))
  ) : [];
  const handleSelect = (productId) => {
    closeSearch();
    setQuery("");
    navigate(`/product/${productId}`);
  };
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity",
        onClick: closeSearch
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "relative min-h-screen flex items-start justify-center pt-20 px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-2xl bg-[#121212] border border-[#2E2E2E] shadow-2xl p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-[#242424]", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.3em] uppercase text-[#C6A15B] font-light", children: "HAUTE PARFUMERIE SEARCH" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: closeSearch,
            className: "p-1 text-[#F5F2EC]/60 hover:text-[#C6A15B] transition-colors",
            "aria-label": "Close search",
            children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative mt-6", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: searchInputId, className: "sr-only", children: "Search perfumes, notes, or perfume families" }),
        /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C6A15B]" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: searchInputId,
            type: "text",
            autoFocus: true,
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: "Search perfumes, notes (Oud, Saffron, Bergamot), or families...",
            className: "w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C6A15B] pl-11 pr-4 py-3.5 text-xs sm:text-sm text-[#F5F2EC] placeholder:text-[#F5F2EC]/40 outline-none transition-colors"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2 text-xs", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-[#F5F2EC]/40 mr-1", children: "SUGGESTIONS:" }),
        ["H&A Noir", "Oud", "Saffron", "Amber", "Fresh", "Bergamot"].map((item) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setQuery(item),
            className: "text-[10.5px] uppercase tracking-wider text-[#F5F2EC]/70 hover:text-[#C6A15B] underline underline-offset-4 decoration-[#333333] hover:decoration-[#C6A15B] transition-colors",
            children: item
          },
          item
        ))
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-h-80 overflow-y-auto space-y-3", children: query.trim() && filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-xs text-[#F5F2EC]/60 font-light", children: [
        "No matching creations found for \u201C",
        query,
        "\u201D."
      ] }) : filtered.map((product) => /* @__PURE__ */ jsxs(
        "div",
        {
          onClick: () => handleSelect(product.id),
          className: "flex items-center justify-between p-3 bg-[#171717] hover:bg-[#1E1E1E] border border-transparent hover:border-[#C6A15B]/30 cursor-pointer transition-all",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: product.image,
                  onError: handleProductImageError,
                  alt: product.name,
                  className: "w-10 h-12 object-cover bg-[#0B0B0B]"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[9.5px] uppercase tracking-widest text-[#C6A15B]", children: product.family }),
                /* @__PURE__ */ jsx("h4", { className: "font-serif text-base text-[#F5F2EC] font-light", children: product.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-[#F5F2EC]/50 font-light", children: [
                  product.notes.top[0],
                  " \xB7 ",
                  product.notes.heart[0],
                  " \xB7 ",
                  product.notes.base[0]
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-[#F5F2EC] font-light", children: product.price }),
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 text-[#C6A15B]" })
            ] })
          ]
        },
        product.id
      )) })
    ] }) })
  ] });
};
var SearchModal_default = SearchModal;
export {
  SearchModal,
  SearchModal_default as default
};
