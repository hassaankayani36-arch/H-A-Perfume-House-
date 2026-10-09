import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Gift, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { handleProductImageError } from "../utils/productImage.js";
const Cart = () => {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    amountNeededForFreeDelivery,
    progressToFreeDelivery,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [giftNote, setGiftNote] = useState(false);
  const [giftNoteText, setGiftNoteText] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === "HA10" || clean === "PRESENCE") {
      setDiscountPercent(10);
      setPromoMessage("10% Patron Privilege Applied");
    } else if (clean === "HA15" || clean === "ROYAL") {
      setDiscountPercent(15);
      setPromoMessage("15% VIP Maison Privilege Applied");
    } else {
      setPromoMessage("Invalid invitation code");
      setDiscountPercent(0);
    }
  };
  const discountAmount = Math.round(subtotal * discountPercent / 100);
  const finalTotal = subtotal - discountAmount + deliveryFee;
  if (items.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-[70vh] bg-[#0B0B0B] flex items-center justify-center py-20 px-4", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-md mx-auto space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 mx-auto border border-[#2E2E2E] flex items-center justify-center text-[#F5F2EC]/30", children: /* @__PURE__ */ jsx(ShoppingBag, { className: "w-8 h-8 stroke-[1.2]" }) }),
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl sm:text-4xl text-[#F5F2EC] font-light", children: "Your Bag is Empty" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-[#F5F2EC]/60 font-light leading-relaxed", children: "Your shopping bag does not currently contain any perfumes. Explore our curated selection and find a scent that suits you." }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/shop",
          className: "inline-block px-8 py-4 bg-[#C6A15B] text-[#0B0B0B] text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#DFC27D] transition-colors",
          children: "DISCOVER PERFUMES"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-[#0B0B0B] py-16 sm:py-24 text-[#F5F2EC]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12 border-b border-[#222222] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.3em] uppercase text-[#C6A15B] font-light block mb-2", children: "SELECTIONS" }),
        /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl sm:text-5xl font-light uppercase tracking-wide", children: "YOUR SHOPPING BAG" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: clearCart,
          className: "text-xs uppercase tracking-widest text-[#F5F2EC]/40 hover:text-red-400 font-light self-start sm:self-auto",
          children: "EMPTY BAG"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10 p-5 bg-[#141414] border border-[#262626]", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs mb-2 font-light", children: [
        amountNeededForFreeDelivery > 0 ? /* @__PURE__ */ jsxs("span", { children: [
          "Add ",
          /* @__PURE__ */ jsxs("strong", { className: "text-[#C6A15B]", children: [
            "PKR ",
            amountNeededForFreeDelivery.toLocaleString()
          ] }),
          " more for complimentary delivery across Pakistan."
        ] }) : /* @__PURE__ */ jsxs("span", { className: "text-[#C6A15B] flex items-center gap-1.5 font-medium", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4" }),
          " You have qualified for Complimentary Nationwide Delivery!"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-[#F5F2EC]/50 font-mono", children: [
          progressToFreeDelivery,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full h-1.5 bg-[#222222] overflow-hidden", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full bg-[#C6A15B] transition-all duration-500 ease-out",
          style: { width: `${progressToFreeDelivery}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 space-y-6", children: [
        items.map((item) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex flex-col sm:flex-row gap-6 p-6 bg-[#121212] border border-[#222222] items-start sm:items-center justify-between",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-5 items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "w-20 h-24 bg-[#171717] border border-[#262626] overflow-hidden shrink-0", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: item.image,
                    onError: handleProductImageError,
                    alt: item.name,
                    className: "w-full h-full object-cover object-center"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-[#C6A15B] font-light", children: item.family }),
                  /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl sm:text-2xl text-[#F5F2EC] font-light", children: /* @__PURE__ */ jsx(Link, { to: `/product/${item.id}`, className: "hover:text-[#C6A15B] transition-colors", children: item.name }) }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#F5F2EC]/60 font-light mt-0.5", children: [
                    "Flacon Size: ",
                    item.size
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#F5F2EC]/75 font-mono mt-1", children: [
                    item.price,
                    " each"
                  ] }),
                  item.originalPrice > item.discountedPrice && /* @__PURE__ */ jsxs("del", { className: "text-[11px] text-[#F5F2EC]/45", children: [
                    "PKR ",
                    item.originalPrice.toLocaleString("en-PK"),
                    " each"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full sm:w-auto gap-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-[#1E1E1E]", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center border border-[#2E2E2E] bg-[#171717]", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(item.key, -1),
                      className: "p-2 text-[#F5F2EC]/60 hover:text-[#F5F2EC]",
                      "aria-label": "Decrease quantity",
                      children: /* @__PURE__ */ jsx(Minus, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "px-3 text-xs font-mono", children: item.quantity }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(item.key, 1),
                      className: "p-2 text-[#F5F2EC]/60 hover:text-[#F5F2EC]",
                      "aria-label": "Increase quantity",
                      children: /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "font-serif text-lg text-[#F5F2EC] min-w-24 text-right", children: [
                  "PKR ",
                  (item.discountedPrice * item.quantity).toLocaleString("en-PK")
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeFromCart(item.key),
                    className: "p-1.5 text-[#F5F2EC]/40 hover:text-red-400 transition-colors",
                    "aria-label": "Remove item",
                    children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ]
          },
          item.key
        )),
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-[#121212] border border-[#222222] space-y-4", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer select-none", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: giftNote,
                onChange: (e) => setGiftNote(e.target.checked),
                className: "accent-[#C6A15B] w-4 h-4"
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: "text-xs uppercase tracking-widest text-[#F5F2EC] flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Gift, { className: "w-4 h-4 text-[#C6A15B]" }),
              "Include a handwritten gift card (Complimentary)"
            ] })
          ] }),
          giftNote && /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 3,
              value: giftNoteText,
              onChange: (e) => setGiftNoteText(e.target.value),
              placeholder: "Enter your personalized gift message for the recipient...",
              className: "w-full bg-[#0B0B0B] border border-[#2A2A2A] focus:border-[#C6A15B] p-3 text-xs text-[#F5F2EC] outline-none"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-5", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#141414] border border-[#262626] p-6 sm:p-8 space-y-6 sticky top-28", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-2xl text-[#F5F2EC] font-light pb-4 border-b border-[#242424]", children: "Order Summary" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleApplyPromo, className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: promoCode,
                onChange: (e) => setPromoCode(e.target.value),
                placeholder: "PATRON PRIVILEGE CODE",
                className: "flex-1 bg-[#0B0B0B] border border-[#2A2A2A] focus:border-[#C6A15B] px-3.5 py-2.5 text-xs text-[#F5F2EC] placeholder:text-[#F5F2EC]/30 tracking-widest uppercase outline-none"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "px-4 py-2.5 bg-[#222222] hover:bg-[#C6A15B] hover:text-[#0B0B0B] text-[#F5F2EC] text-xs uppercase tracking-widest font-light transition-colors",
                children: "APPLY"
              }
            )
          ] }),
          promoMessage && /* @__PURE__ */ jsx(
            "p",
            {
              className: `text-[11px] font-light ${discountPercent > 0 ? "text-[#C6A15B]" : "text-red-400"}`,
              children: promoMessage
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-[#F5F2EC]/40 tracking-wider", children: 'Tip: Use code "HA10" for 10% privilege' })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-4 border-t border-[#222222] text-xs font-light", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[#F5F2EC]/80", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Subtotal (",
              itemCount,
              " items)"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
              "PKR ",
              subtotal.toLocaleString()
            ] })
          ] }),
          discountAmount > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[#C6A15B]", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Patron Privilege (",
              discountPercent,
              "%)"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
              "- PKR ",
              discountAmount.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[#F5F2EC]/80", children: [
            /* @__PURE__ */ jsx("span", { children: "Nationwide Courier Shipping" }),
            /* @__PURE__ */ jsx("span", { className: `font-mono ${deliveryFee === 0 ? "text-[#C6A15B]" : ""}`, children: deliveryFee === 0 ? "COMPLIMENTARY" : `PKR ${deliveryFee}` })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[#F5F2EC]/80", children: [
            /* @__PURE__ */ jsx("span", { children: "Luxury Obsidian Coffret" }),
            /* @__PURE__ */ jsx("span", { className: "text-[#C6A15B]", children: "INCLUDED" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-[#242424] flex justify-between items-baseline", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm uppercase tracking-widest text-[#F5F2EC]", children: "Estimated Total" }),
            /* @__PURE__ */ jsxs("span", { className: "font-serif text-3xl text-[#C6A15B] font-light", children: [
              "PKR ",
              finalTotal.toLocaleString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate("/checkout"),
            className: "w-full py-4 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.26em] font-medium transition-colors flex items-center justify-center gap-2 shadow-xl",
            children: [
              /* @__PURE__ */ jsx("span", { children: "PROCEED TO CHECKOUT" }),
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "text-center pt-2", children: /* @__PURE__ */ jsx(
          Link,
          {
            to: "/shop",
            className: "text-xs uppercase tracking-[0.2em] text-[#F5F2EC]/50 hover:text-[#C6A15B] transition-colors",
            children: "\u2190 CONTINUE BROWSING"
          }
        ) })
      ] }) })
    ] })
  ] }) });
};
var Cart_default = Cart;
export {
  Cart,
  Cart_default as default
};
