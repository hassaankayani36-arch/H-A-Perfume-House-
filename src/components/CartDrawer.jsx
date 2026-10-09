import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { handleProductImageError } from "../utils/productImage.js";
const CartDrawer = () => {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    amountNeededForFreeDelivery,
    progressToFreeDelivery,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart
  } = useCart();
  const navigate = useNavigate();
  if (!isCartOpen) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity",
        onClick: closeCart
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "fixed inset-y-0 right-0 max-w-full flex pl-10", children: /* @__PURE__ */ jsxs("div", { className: "w-screen max-w-md bg-[#0E0E0E] border-l border-[#242424] shadow-2xl flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-[#222222]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(ShoppingBag, { className: "w-4 h-4 text-[#C6A15B]" }),
            /* @__PURE__ */ jsx("h2", { className: "font-serif text-2xl text-[#F5F2EC] font-light tracking-wide uppercase", children: "SHOPPING BAG" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-[#C6A15B] font-light", children: [
              "(",
              itemCount,
              " ",
              itemCount === 1 ? "item" : "items",
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: closeCart,
              className: "p-1.5 text-[#F5F2EC]/60 hover:text-[#C6A15B] transition-colors",
              "aria-label": "Close cart drawer",
              children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t border-[#1C1C1C]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[11px] mb-1.5 font-light", children: [
            amountNeededForFreeDelivery > 0 ? /* @__PURE__ */ jsxs("span", { className: "text-[#F5F2EC]/80", children: [
              "Add ",
              /* @__PURE__ */ jsxs("strong", { className: "text-[#C6A15B] font-medium", children: [
                "PKR ",
                amountNeededForFreeDelivery.toLocaleString()
              ] }),
              " for free delivery"
            ] }) : /* @__PURE__ */ jsxs("span", { className: "text-[#C6A15B] font-medium flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3.5 h-3.5 inline" }),
              " You have unlocked Free Nationwide Delivery!"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#F5F2EC]/50 text-[10px]", children: [
              progressToFreeDelivery,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full h-1 bg-[#222222] overflow-hidden", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-full bg-[#C6A15B] transition-all duration-500 ease-out",
              style: { width: `${progressToFreeDelivery}%` }
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-20 text-center space-y-5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 mx-auto border border-[#2E2E2E] flex items-center justify-center text-[#F5F2EC]/30", children: /* @__PURE__ */ jsx(ShoppingBag, { className: "w-7 h-7 stroke-[1.2]" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl text-[#F5F2EC] font-light", children: "Your Bag is Empty" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#F5F2EC]/60 font-light max-w-xs mx-auto leading-relaxed", children: "Explore our Haute Parfumerie collection to find your personal signature extrait." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              closeCart();
              navigate("/shop");
            },
            className: "mt-4 px-6 py-3 bg-[#C6A15B] text-[#0B0B0B] text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#DFC27D] transition-colors",
            children: "EXPLORE PERFUMES"
          }
        )
      ] }) : items.map((item) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex gap-4 pb-6 border-b border-[#1C1C1C] last:border-b-0",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-24 bg-[#141414] border border-[#262626] overflow-hidden shrink-0", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: item.image,
                onError: handleProductImageError,
                alt: item.name,
                className: "w-full h-full object-cover object-center"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col justify-between", children: [
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[9.5px] uppercase tracking-widest text-[#C6A15B] block font-light", children: item.family }),
                  /* @__PURE__ */ jsx("h4", { className: "font-serif text-lg text-[#F5F2EC] font-light leading-snug", children: item.name }),
                  /* @__PURE__ */ jsx("span", { className: "text-[11px] text-[#F5F2EC]/50 font-light", children: item.size })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeFromCart(item.key),
                    className: "p-1 text-[#F5F2EC]/40 hover:text-red-400 transition-colors",
                    "aria-label": `Remove ${item.name}`,
                    children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center border border-[#2A2A2A] bg-[#141414]", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(item.key, -1),
                      className: "p-1.5 text-[#F5F2EC]/60 hover:text-[#F5F2EC] transition-colors",
                      "aria-label": "Decrease quantity",
                      children: /* @__PURE__ */ jsx(Minus, { className: "w-3 h-3" })
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "px-3 text-xs text-[#F5F2EC] font-mono", children: item.quantity }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(item.key, 1),
                      className: "p-1.5 text-[#F5F2EC]/60 hover:text-[#F5F2EC] transition-colors",
                      "aria-label": "Increase quantity",
                      children: /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                  item.originalPrice > item.discountedPrice && /* @__PURE__ */ jsxs("del", { className: "block text-[10px] text-[#F5F2EC]/40", children: [
                    "PKR ",
                    (item.originalPrice * item.quantity).toLocaleString("en-PK")
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs sm:text-sm font-normal text-[#F5F2EC] tracking-wide", children: [
                    "PKR ",
                    (item.discountedPrice * item.quantity).toLocaleString("en-PK")
                  ] })
                ] })
              ] })
            ] })
          ]
        },
        item.key
      )) }),
      items.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-6 border-t border-[#222222] bg-[#121212] space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[#F5F2EC]/70 font-light", children: [
            /* @__PURE__ */ jsx("span", { children: "Subtotal" }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#F5F2EC]", children: [
              "PKR ",
              subtotal.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[#F5F2EC]/70 font-light", children: [
            /* @__PURE__ */ jsx("span", { children: "Estimated Shipping" }),
            /* @__PURE__ */ jsx("span", { className: deliveryFee === 0 ? "text-[#C6A15B]" : "text-[#F5F2EC]", children: deliveryFee === 0 ? "FREE" : `PKR ${deliveryFee}` })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm font-medium text-[#F5F2EC] pt-2 border-t border-[#1C1C1C]", children: [
            /* @__PURE__ */ jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxs("span", { className: "text-base font-serif text-[#C6A15B]", children: [
              "PKR ",
              total.toLocaleString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2.5 pt-2", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                closeCart();
                navigate("/checkout");
              },
              className: "w-full py-4 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.24em] font-medium transition-colors flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsx("span", { children: "PROCEED TO CHECKOUT" }),
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                closeCart();
                navigate("/cart");
              },
              className: "w-full py-3 bg-transparent border border-[#2E2E2E] hover:border-[#C6A15B] text-[#F5F2EC] hover:text-[#C6A15B] text-xs uppercase tracking-[0.22em] font-light transition-colors text-center",
              children: "VIEW FULL BAG"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-center text-[#F5F2EC]/40 tracking-widest uppercase", children: "DISCREET LUXURY PACKAGING INCLUDED" })
      ] })
    ] }) })
  ] });
};
var CartDrawer_default = CartDrawer;
export {
  CartDrawer,
  CartDrawer_default as default
};
