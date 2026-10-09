import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { handleProductImageError } from "../utils/productImage.js";
import { ShieldCheck, Check, Truck, Lock, ArrowLeft } from "lucide-react";
import Logo from "../assets/logo/Logo.jsx";
const Checkout = () => {
  const { items, itemCount, subtotal, deliveryFee, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "Lahore",
    postalCode: "",
    orderNotes: ""
  });
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
    if (items.length === 0 && !orderComplete) {
      navigate("/shop");
    }
  }, [items.length, orderComplete, navigate]);
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = `HA-${Math.floor(1e5 + Math.random() * 9e5)}`;
    setOrderNumber(generatedId);
    setOrderComplete(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const pakistaniCities = [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala",
    "Hyderabad",
    "Abbottabad",
    "Other City"
  ];
  if (orderComplete) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-[#0B0B0B] py-20 px-4 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-xl w-full bg-[#121212] border border-[#2E2E2E] p-8 sm:p-12 text-center space-y-6 shadow-2xl", children: [
      /* @__PURE__ */ jsx(Logo, { size: "md", variant: "full" }),
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 mx-auto rounded-full bg-[#C6A15B]/15 border border-[#C6A15B] flex items-center justify-center text-[#C6A15B]", children: /* @__PURE__ */ jsx(Check, { className: "w-8 h-8" }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] text-[#C6A15B]", children: "ORDER CONFIRMATION" }),
        /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl sm:text-4xl text-[#F5F2EC] font-light", children: "Your Presence Is Defined." }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs uppercase tracking-widest text-[#F5F2EC]/50 font-mono", children: [
          "ORDER REFERENCE: ",
          /* @__PURE__ */ jsx("strong", { className: "text-[#C6A15B]", children: orderNumber })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-[#F5F2EC]/75 font-light leading-relaxed max-w-md mx-auto", children: [
        "Thank you, ",
        formData.firstName || "Patron",
        ". Your order is being prepared for dispatch. Updates will be sent to",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-[#C6A15B]", children: formData.email || "your email" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 bg-[#171717] border border-[#262626] text-xs text-left space-y-2 font-light", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#F5F2EC]/60", children: "Delivery Address:" }),
          /* @__PURE__ */ jsxs("span", { className: "text-[#F5F2EC] text-right font-normal", children: [
            formData.address,
            ", ",
            formData.city
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#F5F2EC]/60", children: "Payment Method:" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#C6A15B] uppercase font-normal", children: paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "bank" ? "Direct Bank Transfer" : "Credit / Debit Card" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-t border-[#222222] pt-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#F5F2EC]/60", children: "Total Amount:" }),
          /* @__PURE__ */ jsxs("span", { className: "text-[#F5F2EC] font-serif text-base font-normal", children: [
            "PKR ",
            total.toLocaleString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-4 flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/shop",
            className: "flex-1 py-3.5 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.22em] font-medium transition-colors text-center",
            children: "CONTINUE SHOPPING"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            className: "flex-1 py-3.5 bg-transparent border border-[#2E2E2E] hover:border-[#C6A15B] text-[#F5F2EC] text-xs uppercase tracking-[0.22em] font-light transition-colors text-center",
            children: "RETURN TO HOME"
          }
        )
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-[#0B0B0B] py-16 sm:py-24 text-[#F5F2EC]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/cart",
        className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#F5F2EC]/60 hover:text-[#C6A15B] transition-colors font-light",
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsx("span", { children: "RETURN TO BAG" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 space-y-10", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.3em] uppercase text-[#C6A15B] font-light block mb-2", children: "DISPATCH SPECIFICATION" }),
          /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl sm:text-4xl font-light uppercase tracking-wide", children: "CHECKOUT DETAILS" })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handlePlaceOrder, id: "checkout-form", className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-medium pb-2 border-b border-[#222222]", children: "1. PATRON CONTACT" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1", children: "Email Address (for dispatch updates) *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    required: true,
                    value: formData.email,
                    onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                    placeholder: "client@luxury.com",
                    className: "w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1", children: "Contact Phone (for Courier SMS) *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    required: true,
                    value: formData.phone,
                    onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                    placeholder: "+92 300 1234567",
                    className: "w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-medium pb-2 border-b border-[#222222]", children: "2. DELIVERY DESTINATION" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1", children: "First Name *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    required: true,
                    value: formData.firstName,
                    onChange: (e) => setFormData({ ...formData, firstName: e.target.value }),
                    placeholder: "First name",
                    className: "w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1", children: "Last Name *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    required: true,
                    value: formData.lastName,
                    onChange: (e) => setFormData({ ...formData, lastName: e.target.value }),
                    placeholder: "Last name",
                    className: "w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1", children: "Street Address & House / Bungalow # *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  required: true,
                  value: formData.address,
                  onChange: (e) => setFormData({ ...formData, address: e.target.value }),
                  placeholder: "House / Flat #, Street, Phase or Sector",
                  className: "w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1", children: "City (Pakistan) *" }),
                /* @__PURE__ */ jsx(
                  "select",
                  {
                    value: formData.city,
                    onChange: (e) => setFormData({ ...formData, city: e.target.value }),
                    className: "w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none",
                    children: pakistaniCities.map((city) => /* @__PURE__ */ jsx("option", { value: city, children: city }, city))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1", children: "Special Delivery Instructions (Optional)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: formData.orderNotes,
                    onChange: (e) => setFormData({ ...formData, orderNotes: e.target.value }),
                    placeholder: "e.g. Leave with gate security / Ring bell",
                    className: "w-full bg-[#121212] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-medium pb-2 border-b border-[#222222]", children: "3. PAYMENT SETTLEMENT" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  className: `block p-4 border transition-all cursor-pointer ${paymentMethod === "cod" ? "border-[#C6A15B] bg-[#171717]" : "border-[#262626] bg-[#121212]"}`,
                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "radio",
                        name: "paymentMethod",
                        checked: paymentMethod === "cod",
                        onChange: () => setPaymentMethod("cod"),
                        className: "accent-[#C6A15B]"
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-wider text-[#F5F2EC] font-medium", children: "Cash On Delivery (COD)" }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#C6A15B] uppercase tracking-widest", children: "MOST POPULAR" })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-[11px] text-[#F5F2EC]/60 font-light mt-1", children: "Pay in cash upon physical receipt and inspection of your sealed flacon." })
                    ] })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                "label",
                {
                  className: `block p-4 border transition-all cursor-pointer ${paymentMethod === "bank" ? "border-[#C6A15B] bg-[#171717]" : "border-[#262626] bg-[#121212]"}`,
                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "radio",
                        name: "paymentMethod",
                        checked: paymentMethod === "bank",
                        onChange: () => setPaymentMethod("bank"),
                        className: "accent-[#C6A15B]"
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-wider text-[#F5F2EC] font-medium", children: "Direct Bank Transfer / IBFT" }),
                      /* @__PURE__ */ jsx("p", { className: "text-[11px] text-[#F5F2EC]/60 font-light mt-1", children: "Meezan Bank / HBL Atelier Accounts. Transfer confirmation sent via WhatsApp." })
                    ] })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                "label",
                {
                  className: `block p-4 border transition-all cursor-pointer ${paymentMethod === "card" ? "border-[#C6A15B] bg-[#171717]" : "border-[#262626] bg-[#121212]"}`,
                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "radio",
                        name: "paymentMethod",
                        checked: paymentMethod === "card",
                        onChange: () => setPaymentMethod("card"),
                        className: "accent-[#C6A15B]"
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-wider text-[#F5F2EC] font-medium", children: "Credit / Debit Card (Visa, Mastercard, PayPak)" }),
                      /* @__PURE__ */ jsx("p", { className: "text-[11px] text-[#F5F2EC]/60 font-light mt-1", children: "Encrypted 256-bit secure gateway transaction." })
                    ] })
                  ] })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              className: "w-full py-4 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.26em] font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-xl",
              children: [
                /* @__PURE__ */ jsx(Lock, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "AUTHORIZE & PLACE ORDER \xB7 PKR ",
                  total.toLocaleString()
                ] })
              ]
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-5", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#121212] border border-[#262626] p-6 sm:p-8 space-y-6 sticky top-28", children: [
        /* @__PURE__ */ jsxs("h2", { className: "font-serif text-2xl text-[#F5F2EC] font-light pb-4 border-b border-[#222222]", children: [
          "Selected Flacons (",
          itemCount,
          ")"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4 max-h-72 overflow-y-auto pr-1", children: items.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-xs font-light", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: item.image,
              onError: handleProductImageError,
              alt: item.name,
              className: "w-12 h-14 object-cover bg-[#0B0B0B] border border-[#242424]"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-serif text-base text-[#F5F2EC]", children: item.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-[10.5px] text-[#F5F2EC]/50", children: [
              item.size,
              " \xB7 Qty ",
              item.quantity
            ] })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "font-mono text-[#F5F2EC]", children: [
            "PKR ",
            (item.discountedPrice * item.quantity).toLocaleString("en-PK")
          ] })
        ] }, item.key)) }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-[#222222] space-y-3 text-xs font-light", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[#F5F2EC]/80", children: [
            /* @__PURE__ */ jsx("span", { children: "Subtotal" }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
              "PKR ",
              subtotal.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[#F5F2EC]/80", children: [
            /* @__PURE__ */ jsx("span", { children: "Shipping" }),
            /* @__PURE__ */ jsx("span", { className: `font-mono ${deliveryFee === 0 ? "text-[#C6A15B]" : ""}`, children: deliveryFee === 0 ? "COMPLIMENTARY" : `PKR ${deliveryFee}` })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[#F5F2EC]/80", children: [
            /* @__PURE__ */ jsx("span", { children: "Coffret Gift Packaging" }),
            /* @__PURE__ */ jsx("span", { className: "text-[#C6A15B]", children: "INCLUDED" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-[#222222] flex justify-between items-baseline", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm uppercase tracking-widest text-[#F5F2EC]", children: "Total" }),
            /* @__PURE__ */ jsxs("span", { className: "font-serif text-3xl text-[#C6A15B] font-light", children: [
              "PKR ",
              total.toLocaleString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-[#1C1C1C] space-y-2 text-[10px] text-[#F5F2EC]/50 font-light", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Truck, { className: "w-3.5 h-3.5 text-[#C6A15B]" }),
            /* @__PURE__ */ jsx("span", { children: "Dispatched via air-ride courier service in Pakistan" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-[#C6A15B]" }),
            /* @__PURE__ */ jsx("span", { children: "Wax-sealed flacons with tamper-evident serial numbers" })
          ] })
        ] })
      ] }) })
    ] })
  ] }) });
};
var Checkout_default = Checkout;
export {
  Checkout,
  Checkout_default as default
};
