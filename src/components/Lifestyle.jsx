import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { products } from "../data/products.js";
const Lifestyle = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-24 sm:py-32 bg-[#0B0B0B] border-t border-[#1C1C1C] relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light", children: "MOMENTS OF DISTINCTION" }),
        /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl sm:text-6xl font-light text-[#F5F2EC] uppercase tracking-wide", children: "WEAR THE MOMENT." }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm sm:text-base text-[#F5F2EC]/60 font-light leading-relaxed", children: "From a fresh start to an evening out, explore perfumes selected for different moods and occasions." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "group relative bg-[#121212] border border-[#222222] p-8 flex flex-col justify-between overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-light", children: "08:00 AM \xB7 THE MORNING ASCENT" }),
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl text-[#F5F2EC] font-light tracking-wide", children: "Crisp Architecture" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#F5F2EC]/65 font-light leading-relaxed", children: [
            products[2].name,
            " opens with ",
            products[2].notes.top.join(", "),
            " and develops through",
            ` ${products[2].notes.heart.join(", ")}`,
            " for an easy daytime choice."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-4 border-t border-[#1F1F1F] flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-[#F5F2EC]/40", children: "RECOMMENDED" }),
          /* @__PURE__ */ jsxs(Link, { to: `/product/${products[2].id}`, className: "text-xs text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-4 decoration-[#C6A15B]/30 font-light", children: [
            products[2].name,
            " \u2192"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "group relative bg-[#121212] border border-[#C6A15B]/30 p-8 flex flex-col justify-between overflow-hidden shadow-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-[#C6A15B]/5 rounded-bl-full pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-light", children: "07:00 PM \xB7 TWILIGHT RENDEZVOUS" }),
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl text-[#F5F2EC] font-light tracking-wide", children: "Velvet & Amber Embers" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#F5F2EC]/65 font-light leading-relaxed", children: [
            "Explore ",
            products[1].name,
            ", with ",
            products[1].notes.top.join(", "),
            " up front and",
            ` ${products[1].notes.base.join(", ")}`,
            " in its base."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-4 border-t border-[#1F1F1F] flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-[#F5F2EC]/40", children: "RECOMMENDED" }),
          /* @__PURE__ */ jsxs(Link, { to: `/product/${products[1].id}`, className: "text-xs text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-4 decoration-[#C6A15B]/30 font-light", children: [
            products[1].name,
            " \u2192"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "group relative bg-[#121212] border border-[#222222] p-8 flex flex-col justify-between overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-light", children: "11:30 PM \xB7 MIDNIGHT EXTRAIT" }),
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl text-[#F5F2EC] font-light tracking-wide", children: "Royal Oud & Dark Saffron" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#F5F2EC]/65 font-light leading-relaxed", children: [
            products[0].name,
            " brings together ",
            products[0].notes.heart.join(", "),
            " and",
            ` ${products[0].notes.base.join(", ")}`,
            " for a distinctive evening perfume."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-4 border-t border-[#1F1F1F] flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-[#F5F2EC]/40", children: "RECOMMENDED" }),
          /* @__PURE__ */ jsxs(Link, { to: `/product/${products[0].id}`, className: "text-xs text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-4 decoration-[#C6A15B]/30 font-light", children: [
            products[0].name,
            " \u2192"
          ] })
        ] })
      ] })
    ] })
  ] }) });
};
var Lifestyle_default = Lifestyle;
export {
  Lifestyle,
  Lifestyle_default as default
};
