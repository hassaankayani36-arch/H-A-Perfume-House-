import { jsx, jsxs } from "react/jsx-runtime";
const Logo = ({ className = "", size = "md", variant = "full" }) => {
  if (variant === "monogram") {
    return /* @__PURE__ */ jsx("div", { className: `inline-flex items-center justify-center font-serif text-[#C6A15B] tracking-wider select-none ${className}`, children: /* @__PURE__ */ jsxs("span", { className: size === "sm" ? "text-xl" : size === "lg" ? "text-4xl" : "text-2xl", children: [
      "H",
      /* @__PURE__ */ jsx("span", { className: "text-[#F5F2EC] font-light", children: "&" }),
      "A"
    ] }) });
  }
  const textSize = {
    sm: { main: "text-lg", sub: "text-[9px]", tag: "text-[7px]" },
    md: { main: "text-2xl", sub: "text-[11px]", tag: "text-[8.5px]" },
    lg: { main: "text-4xl", sub: "text-[14px]", tag: "text-[10px]" }
  }[size];
  return /* @__PURE__ */ jsxs("div", { className: `inline-flex flex-col items-center justify-center text-center select-none group ${className}`, children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 leading-none", children: /* @__PURE__ */ jsxs("span", { className: `font-serif font-light text-[#F5F2EC] tracking-[0.2em] transition-colors duration-300 group-hover:text-[#C6A15B] ${textSize.main}`, children: [
      "H",
      /* @__PURE__ */ jsx("span", { className: "text-[#C6A15B] font-normal", children: "&" }),
      "A"
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: `mt-0.5 font-sans font-light tracking-[0.45em] text-[#C6A15B] uppercase ${textSize.sub}`, children: "LUXURY" }),
    variant === "full" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1 w-full justify-center", children: [
      /* @__PURE__ */ jsx("div", { className: "h-[1px] w-3 bg-[#C6A15B]/40" }),
      /* @__PURE__ */ jsx("span", { className: `font-sans tracking-[0.22em] text-[#F5F2EC]/60 uppercase font-normal ${textSize.tag}`, children: "BY HASSAAN & ARSLAN" }),
      /* @__PURE__ */ jsx("div", { className: "h-[1px] w-3 bg-[#C6A15B]/40" })
    ] })
  ] });
};
var Logo_default = Logo;
export {
  Logo,
  Logo_default as default
};
