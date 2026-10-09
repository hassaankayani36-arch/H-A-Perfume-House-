import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);
  const fullSize = product.sizes.find((size) => size.size === "50ML") ?? product.sizes[0];
  return /* @__PURE__ */ jsxs("article", { className: "group relative flex flex-col overflow-hidden border border-[#222222] bg-[#121212] transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A15B]/50", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-[#E8E3DA]", children: [
      /* @__PURE__ */ jsx(Link, { to: `/product/${product.id}`, "aria-label": `View ${product.name} details`, className: "block h-full", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: product.image,
          alt: `${product.name} perfume bottle`,
          loading: "lazy",
          className: "h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        }
      ) }),
      product.discounted && /* @__PURE__ */ jsxs("span", { className: "absolute left-3 top-3 bg-[#9F3434] px-2.5 py-1.5 text-[9px] font-semibold tracking-[0.12em] text-white", children: [
        "-",
        product.discountPercent,
        "%"
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => toggleWishlist(product.id),
          className: `absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center bg-white/90 text-[#24211E] shadow-sm transition-colors hover:text-[#9F3434] ${wishlisted ? "text-[#9F3434]" : ""}`,
          "aria-label": wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`,
          children: /* @__PURE__ */ jsx(Heart, { className: `h-4 w-4 ${wishlisted ? "fill-current" : ""}` })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col justify-between space-y-4 p-4 sm:p-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "mb-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#C6A15B]", children: [
          product.family,
          " ",
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\xB7" }),
          " ",
          product.volume
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl font-semibold tracking-wide text-[#F5F2EC] transition-colors group-hover:text-[#DFC27D] sm:text-2xl", children: /* @__PURE__ */ jsx(Link, { to: `/product/${product.id}`, children: product.name }) }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1.5 line-clamp-1 text-[11px] text-[#F5F2EC]/60", children: [
          product.notes.top[0],
          " \xB7 ",
          product.notes.heart[0],
          " \xB7 ",
          product.notes.base[0]
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 border-t border-[#292622] pt-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            fullSize.compareAtPrice && /* @__PURE__ */ jsx("del", { className: "text-[11px] tracking-wide text-[#F5F2EC]/45", children: fullSize.compareAtPrice }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold tracking-wide text-[#F5F2EC] sm:text-base", children: fullSize.price })
          ] }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: `/product/${product.id}`,
              className: "inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-[#C6A15B] transition-colors hover:text-[#DFC27D]",
              children: [
                /* @__PURE__ */ jsx(Eye, { className: "h-3.5 w-3.5" }),
                " Details"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => addToCart(product, "50ML", 1),
            disabled: !product.stock,
            className: "flex w-full items-center justify-center gap-2 bg-[#C6A15B] px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#0B0B0B] transition-colors hover:bg-[#DFC27D] disabled:cursor-not-allowed disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsx(ShoppingBag, { className: "h-3.5 w-3.5" }),
              product.stock ? "Add to Cart" : "Out of Stock"
            ]
          }
        )
      ] })
    ] })
  ] });
};
var ProductCard_default = ProductCard;
export {
  ProductCard,
  ProductCard_default as default
};
