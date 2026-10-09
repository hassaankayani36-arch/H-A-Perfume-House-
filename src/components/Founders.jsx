import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import founder1Img from "../assets/images/founder-hassaan.png";
import founder2Img from "../assets/images/founder-arslan.png";
const Founders = ({ showAboutLink = true }) => {
  return /* @__PURE__ */ jsxs("section", { className: "py-24 sm:py-32 bg-[#0E0E0E] border-t border-[#1F1F1F] relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6A15B]/5 rounded-full blur-[160px] pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16 sm:mb-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light", children: "THE VISIONARIES" }),
          /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl sm:text-5xl font-light text-[#F5F2EC] uppercase tracking-wide", children: "THE STORY OF H&A" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm sm:text-base text-[#C6A15B] tracking-[0.2em] uppercase font-light", children: "Created by Hassaan Kayani & Arslan Qamar." }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm sm:text-base text-[#F5F2EC]/70 font-light leading-relaxed max-w-2xl mx-auto", children: "Hassaan Kayani and Arslan Qamar founded H&A Luxury to curate perfumes from their affiliate supply partners and make each scent easier to discover." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col group", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-square overflow-hidden border border-[#C6A15B]/50 shadow-2xl bg-[#141414]", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: founder1Img,
                alt: "Hassaan Kayani, co-founder of H&A Luxury, in a rose jacket",
                loading: "lazy",
                decoding: "async",
                className: "w-full h-full object-cover object-[50%_25%] transform transition-transform duration-700 ease-out group-hover:scale-[1.03]",
                style: { filter: "contrast(1.05) brightness(0.9) saturate(0.9)" }
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/30 to-transparent opacity-90 pointer-events-none" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3 w-3 h-3 border-t border-l border-[#C6A15B]/80 pointer-events-none" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 w-3 h-3 border-t border-r border-[#C6A15B]/80 pointer-events-none" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 text-center space-y-2", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl sm:text-3xl font-light text-[#F5F2EC] tracking-wide", children: "Hassaan Kayani" }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-light", children: "Co-Founder & Perfume Curator" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "tel:+923190731434",
                className: "inline-block text-xs text-[#F5F2EC]/65 hover:text-[#C6A15B] transition-colors",
                children: "+92 319 0731434"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "w-8 h-[1px] bg-[#C6A15B]/40 mx-auto my-3" }),
            /* @__PURE__ */ jsx("blockquote", { className: "text-xs sm:text-sm text-[#F5F2EC]/70 font-light italic leading-relaxed max-w-sm mx-auto", children: "\u201COur goal is to make it easier to find a perfume that feels personal to you.\u201D" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col group", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-square overflow-hidden border border-[#C6A15B]/50 shadow-2xl bg-[#141414]", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: founder2Img,
                alt: "Arslan Qamar, co-founder of H&A Luxury, in the mountains",
                loading: "lazy",
                decoding: "async",
                className: "w-full h-full object-cover object-[50%_25%] transform transition-transform duration-700 ease-out group-hover:scale-[1.03]",
                style: { filter: "contrast(1.08) brightness(0.82) saturate(0.85)" }
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/30 to-transparent opacity-90 pointer-events-none" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3 w-3 h-3 border-t border-l border-[#C6A15B]/80 pointer-events-none" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 w-3 h-3 border-t border-r border-[#C6A15B]/80 pointer-events-none" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 text-center space-y-2", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl sm:text-3xl font-light text-[#F5F2EC] tracking-wide", children: "Arslan Qamar" }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-light", children: "Co-Founder & Collection Curator" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "tel:+923099282467",
                className: "inline-block text-xs text-[#F5F2EC]/65 hover:text-[#C6A15B] transition-colors",
                children: "+92 309 9282467"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "w-8 h-[1px] bg-[#C6A15B]/40 mx-auto my-3" }),
            /* @__PURE__ */ jsx("blockquote", { className: "text-xs sm:text-sm text-[#F5F2EC]/70 font-light italic leading-relaxed max-w-sm mx-auto", children: "\u201CWe bring together perfumes from our partners and make their notes and sizes easy to explore.\u201D" })
          ] })
        ] })
      ] }),
      showAboutLink && /* @__PURE__ */ jsx("div", { className: "mt-16 text-center", children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/about",
          className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-8 decoration-[#C6A15B]/40 font-light transition-colors",
          children: [
            /* @__PURE__ */ jsx("span", { children: "READ THE COMPLETE H&A ODYSSEY" }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
          ]
        }
      ) })
    ] })
  ] });
};
var Founders_default = Founders;
export {
  Founders,
  Founders_default as default
};
