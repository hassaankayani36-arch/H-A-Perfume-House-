import { jsx, jsxs } from "react/jsx-runtime";
import Founders from "../components/Founders.jsx";
import { Link } from "react-router-dom";
import { products } from "../data/products.js";
const About = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#0B0B0B] text-[#F5F2EC]", children: [
    /* @__PURE__ */ jsx("div", { className: "relative py-24 sm:py-32 bg-[#0E0E0E] border-b border-[#1C1C1C] overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] font-light block mb-4", children: "OUR STORY" }),
      /* @__PURE__ */ jsxs("h1", { className: "font-serif text-4xl sm:text-6xl md:text-7xl font-light uppercase tracking-wide leading-tight", children: [
        "THE ARCHITECTURE ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "italic text-[#C6A15B] font-normal", children: "OF PRESENCE." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm sm:text-base md:text-lg text-[#F5F2EC]/75 font-light leading-relaxed max-w-2xl mx-auto", children: "Founded by Hassaan Kayani and Arslan Qamar, H&A Luxury is an affiliate perfume retailer curating products from its supply partners." })
    ] }) }),
    /* @__PURE__ */ jsx(Founders, { showAboutLink: false }),
    /* @__PURE__ */ jsx("section", { className: "py-24 sm:py-32 bg-[#0B0B0B] border-t border-[#1C1C1C]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 space-y-6", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium", children: "THE GENESIS" }),
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl sm:text-4xl font-light uppercase", children: "A Refusal to Conform" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-[#F5F2EC]/75 font-light leading-relaxed", children: "Hassaan Kayani and Arslan Qamar created H&A to make a considered range of perfumes easier to explore, compare, and shop." }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-[#F5F2EC]/75 font-light leading-relaxed", children: "As affiliate sellers, they source products in bulk through their supply relationships and present each perfume with its notes, sizes, availability, and price." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "md:col-span-6", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/5] bg-[#141414] border border-[#262626] overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: products[0].image,
              alt: `${products[0].name} perfume from the H&A selection`,
              loading: "lazy",
              className: "w-full h-full object-contain"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-80" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 border-y border-[#1C1C1C] py-8 text-center", children: [
        { value: String(products.length), label: "Perfumes in our selection" },
        { value: "4", label: "Perfume families" },
        { value: "2", label: "Founders, one vision" }
      ].map((stat) => /* @__PURE__ */ jsxs("div", { className: "px-2", children: [
        /* @__PURE__ */ jsx("p", { className: "font-serif text-3xl text-[#C6A15B] sm:text-4xl", children: stat.value }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-[9px] uppercase tracking-[0.16em] text-[#F5F2EC]/55 sm:text-[10px]", children: stat.label })
      ] }, stat.label)) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "border border-[#262626] bg-[#121212] p-7 sm:p-9", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.25em] text-[#C6A15B]", children: "Our mission" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-3 font-serif text-2xl", children: "Make choosing a perfume personal." }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-[#F5F2EC]/65", children: "Help customers discover perfumes that suit their notes, style, and occasion." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border border-[#262626] bg-[#121212] p-7 sm:p-9", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.25em] text-[#C6A15B]", children: "Our vision" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-3 font-serif text-2xl", children: "A trusted H&A destination." }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-[#F5F2EC]/65", children: "Offer a carefully presented selection from our affiliate supply partners, with clear product details and straightforward pricing." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-16 border-t border-[#1C1C1C] grid grid-cols-1 md:grid-cols-3 gap-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-[#C6A15B]", children: "01 / CAREFUL CURATION" }),
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl font-light", children: "A Considered Selection" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#F5F2EC]/60 font-light leading-relaxed", children: "Explore perfumes across fresh, woody, oriental, and distinctive scent families." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-[#C6A15B]", children: "02 / AFFILIATE SOURCING" }),
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl font-light", children: "Trusted Supply Partners" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#F5F2EC]/60 font-light leading-relaxed", children: "Our perfumes are sourced through the affiliate and bulk-purchasing relationships behind the H&A selection." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-[#C6A15B]", children: "03 / CLEAR DETAILS" }),
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl font-light", children: "Notes, Sizes & Prices" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#F5F2EC]/60 font-light leading-relaxed", children: "Compare product notes, available bottle sizes, stock status, and PKR prices before you order." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-12 text-center", children: /* @__PURE__ */ jsx(
        Link,
        {
          to: "/shop",
          className: "inline-block px-8 py-4 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.24em] font-medium transition-colors",
          children: "EXPLORE THE PERFUME SELECTION"
        }
      ) })
    ] }) })
  ] });
};
var About_default = About;
export {
  About,
  About_default as default
};
