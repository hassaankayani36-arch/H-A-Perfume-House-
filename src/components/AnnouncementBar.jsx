import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const AnnouncementBar = () => {
  return /* @__PURE__ */ jsx("div", { className: "bg-[#121212] border-b border-[#262626] text-[#F5F2EC]/80 text-[11px] uppercase tracking-[0.22em] py-2.5 px-4 transition-colors", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-2 text-[#C6A15B]/90 font-light text-[10px]", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-[#C6A15B] animate-pulse" }),
      /* @__PURE__ */ jsx("span", { children: "COMPLIMENTARY GIFT WRAPPING ON ALL FLACONS" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center font-normal tracking-[0.25em] text-[#F5F2EC] flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { children: "FREE DELIVERY ON ORDERS ABOVE PKR 2,500" }),
      /* @__PURE__ */ jsx("span", { className: "text-[#C6A15B] text-xs", children: "\xB7" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/shop",
          className: "text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-4 decoration-[#C6A15B]/50 transition-colors",
          children: "DISCOVER"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-4 text-[10px] text-[#F5F2EC]/60", children: [
      /* @__PURE__ */ jsx("span", { className: "hover:text-[#F5F2EC] transition-colors cursor-default", children: "PKR (RS)" }),
      /* @__PURE__ */ jsx("span", { className: "text-[#262626]", children: "|" }),
      /* @__PURE__ */ jsx(Link, { to: "/about", className: "hover:text-[#C6A15B] transition-colors", children: "HAUTE PARFUMERIE" })
    ] })
  ] }) });
};
var AnnouncementBar_default = AnnouncementBar;
export {
  AnnouncementBar,
  AnnouncementBar_default as default
};
