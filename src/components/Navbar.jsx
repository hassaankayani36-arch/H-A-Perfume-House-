import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu, X, ArrowRight, Moon, Sun } from "lucide-react";
import Logo from "../assets/logo/Logo.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, openSearch } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  const navLinks = [
    { label: "HOME", path: "/" },
    { label: "SHOP", path: "/shop" },
    { label: "ABOUT US", path: "/about" },
    { label: "CONTACT", path: "/contact" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "header",
      {
        className: `sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? "bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#262626] py-3.5 shadow-2xl" : "bg-[#0B0B0B] border-b border-[#1A1A1A] py-5"}`,
        children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 sm:gap-5", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", className: "flex shrink-0 items-center justify-center py-0.5", children: /* @__PURE__ */ jsx(Logo, { size: "md", variant: "full" }) }),
          /* @__PURE__ */ jsx("nav", { className: "hidden items-center gap-5 lg:flex xl:gap-7", "aria-label": "Main navigation", children: navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return /* @__PURE__ */ jsxs(
              Link,
              {
                to: link.path,
                className: `text-[11.5px] uppercase tracking-[0.24em] transition-all relative py-1 ${isActive ? "text-[#C6A15B] font-medium" : "text-[#F5F2EC]/70 hover:text-[#F5F2EC]"}`,
                children: [
                  link.label,
                  isActive && /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 left-0 right-0 h-[1px] bg-[#C6A15B]" })
                ]
              },
              link.path
            );
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-2.5 border-l border-[#262626]/60 pl-3 sm:gap-4 sm:pl-5", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setMobileMenuOpen(true),
                className: "p-1.5 text-[#F5F2EC]/80 transition-colors hover:text-[#C6A15B] lg:hidden",
                "aria-label": "Open navigation menu",
                children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: toggleTheme,
                className: "p-1.5 text-[#F5F2EC]/80 hover:text-[#C6A15B] transition-colors",
                "aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
                title: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
                children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: openSearch,
                className: "p-1.5 text-[#F5F2EC]/80 hover:text-[#C6A15B] transition-colors",
                "aria-label": "Search perfumes",
                children: /* @__PURE__ */ jsx(Search, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/cart",
                className: "relative p-1.5 text-[#F5F2EC]/80 transition-colors hover:text-[#C6A15B]",
                "aria-label": `Cart${itemCount ? `, ${itemCount} items` : ""}`,
                children: [
                  /* @__PURE__ */ jsx(ShoppingBag, { className: "h-4 w-4" }),
                  itemCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1.5 bg-[#C6A15B] text-[#0B0B0B] text-[9.5px] font-semibold h-4 min-w-4 px-1 rounded-full flex items-center justify-center", children: itemCount })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/shop",
                className: "hidden items-center gap-2 border border-[#C6A15B] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-[#C6A15B] transition-all duration-300 hover:bg-[#C6A15B] hover:text-[#0B0B0B] sm:inline-flex",
                children: /* @__PURE__ */ jsx("span", { children: "SHOP NOW" })
              }
            )
          ] })
        ] }) })
      }
    ),
    mobileMenuOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 lg:hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity",
          onClick: () => setMobileMenuOpen(false)
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "fixed inset-y-0 left-0 w-full max-w-xs bg-[#0B0B0B] border-r border-[#262626] p-6 flex flex-col justify-between shadow-2xl z-50", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-6 border-b border-[#262626]", children: [
            /* @__PURE__ */ jsx(Logo, { size: "sm", variant: "monogram" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setMobileMenuOpen(false),
                className: "p-1 text-[#F5F2EC]/70 hover:text-[#C6A15B]",
                "aria-label": "Close navigation menu",
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "py-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.25em] text-[#C6A15B] uppercase mb-4", children: "HAUTE PARFUMERIE" }),
            /* @__PURE__ */ jsx("nav", { className: "flex flex-col space-y-4", children: navLinks.map((link) => /* @__PURE__ */ jsxs(
              Link,
              {
                to: link.path,
                className: "text-sm uppercase tracking-[0.2em] text-[#F5F2EC] hover:text-[#C6A15B] py-1 border-b border-[#1A1A1A] transition-colors flex items-center justify-between",
                children: [
                  /* @__PURE__ */ jsx("span", { children: link.label }),
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 text-[#C6A15B]/50" })
                ]
              },
              link.path
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-[#262626] space-y-4", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/shop",
              onClick: () => setMobileMenuOpen(false),
              className: "w-full block text-center bg-[#C6A15B] text-[#0B0B0B] py-3 text-xs tracking-[0.22em] uppercase font-medium hover:bg-[#DFC27D] transition-colors",
              children: "SHOP ALL PERFUMES"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-center text-[#F5F2EC]/40 tracking-widest uppercase", children: "DEFINE YOUR PRESENCE." })
        ] })
      ] })
    ] })
  ] });
};
var Navbar_default = Navbar;
export {
  Navbar,
  Navbar_default as default
};
