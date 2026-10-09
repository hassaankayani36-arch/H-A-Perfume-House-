import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroBottle from "../assets/images/hero-bottle.jpg";
const FinalCTA = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative py-28 sm:py-36 bg-[#0B0B0B] border-t border-[#1C1C1C] overflow-hidden flex items-center justify-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: heroBottle,
          alt: "H&A Luxury Flacon",
          className: "w-full h-full object-cover object-center opacity-25 scale-105",
          style: { filter: "brightness(0.4) contrast(1.2)" }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/80 to-[#0B0B0B]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-radial from-transparent via-[#0B0B0B]/60 to-[#0B0B0B]" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] font-light block", children: "THE ULTIMATE TESTAMENT" }),
      /* @__PURE__ */ jsxs("h2", { className: "font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F2EC] font-light uppercase tracking-[0.08em] leading-tight", children: [
        "WHAT WILL THEY ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "italic text-[#C6A15B] font-normal", children: "REMEMBER YOU BY?" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "max-w-xl mx-auto text-sm sm:text-base text-[#F5F2EC]/75 font-light leading-relaxed tracking-wide", children: "Your scent is the punctuation mark on every interaction. Choose an extrait that echoes in their memory long after the room has emptied." }),
      /* @__PURE__ */ jsxs("div", { className: "pt-4 flex flex-col sm:flex-row items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/shop",
            className: "w-full sm:w-auto px-10 py-4 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.26em] font-medium transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group",
            children: [
              /* @__PURE__ */ jsx("span", { children: "SHOP H&A LUXURY" }),
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/about",
            className: "w-full sm:w-auto px-8 py-4 border border-[#2E2E2E] hover:border-[#C6A15B] text-[#F5F2EC] text-xs uppercase tracking-[0.24em] font-light hover:text-[#C6A15B] transition-colors",
            children: "THE FOUNDERS' STORY"
          }
        )
      ] })
    ] })
  ] });
};
var FinalCTA_default = FinalCTA;
export {
  FinalCTA,
  FinalCTA_default as default
};
