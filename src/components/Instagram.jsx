import { jsx, jsxs } from "react/jsx-runtime";
import { Instagram as InstaIcon } from "lucide-react";
import heroBottle from "../assets/images/hero-bottle.jpg";
import bottleNoir from "../assets/images/bottle-noir.jpg";
import bottleAmber from "../assets/images/bottle-amber.jpg";
import founder1 from "../assets/images/founder-1.jpg";
import founder2 from "../assets/images/founder-2.jpg";
const Instagram = () => {
  const posts = [
    {
      img: bottleNoir,
      caption: "The weight of obsidian glass and the allure of midnight rose. #HALuxury #HANoir"
    },
    {
      img: founder1,
      caption: "Presence is not about occupying space; it is about leaving a memory. Co-Founder Hassaan. #DefineYourPresence"
    },
    {
      img: heroBottle,
      caption: "Extrait concentration in every drop. Hand-poured in small batches. #HauteParfumerie"
    },
    {
      img: founder2,
      caption: "Testing rare distillations in the quiet hours. Co-Founder Arslan. #TheStoryOfHA"
    },
    {
      img: bottleAmber,
      caption: "Golden resins and smoked cinnamon bark. The warm embrace of H&A Amber. #AmberExtrait"
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-20 sm:py-28 bg-[#0E0E0E] border-t border-[#1C1C1C]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-xl mx-auto mb-12", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light block mb-2", children: "THE DIGITAL SALON" }),
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-2xl sm:text-4xl font-light text-[#F5F2EC] tracking-wide", children: "@H&A LUXURY" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-[#F5F2EC]/60 font-light tracking-wider uppercase", children: "FOLLOW THE ARCHIVE ON INSTAGRAM" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4", children: posts.map((post, idx) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "group relative aspect-square bg-[#141414] overflow-hidden border border-[#242424]",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: post.img,
              alt: "H&A Luxury editorial social post",
              className: "w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out",
              style: { filter: "brightness(0.9) contrast(1.1)" }
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-[#0B0B0B]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col items-center justify-center text-center", children: [
            /* @__PURE__ */ jsx(InstaIcon, { className: "w-5 h-5 text-[#C6A15B] mb-2" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-[#F5F2EC]/80 font-light line-clamp-3 leading-relaxed", children: post.caption })
          ] })
        ]
      },
      idx
    )) })
  ] }) });
};
var Instagram_default = Instagram;
export {
  Instagram,
  Instagram_default as default
};
