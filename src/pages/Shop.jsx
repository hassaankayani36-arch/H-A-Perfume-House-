import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import { Heart, Search } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useCart();
  const familyParam = searchParams.get("family");
  const filterParam = searchParams.get("filter");
  const [activeFamily, setActiveFamily] = useState(familyParam || "ALL");
  const [activeSort, setActiveSort] = useState("featured");
  const [onlyWishlist, setOnlyWishlist] = useState(filterParam === "wishlist");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (familyParam) {
      setActiveFamily(familyParam);
      setOnlyWishlist(false);
    }
    if (filterParam === "wishlist") {
      setOnlyWishlist(true);
      setActiveFamily("ALL");
    }
  }, [familyParam, filterParam]);
  let displayed = [...products];
  if (onlyWishlist) {
    displayed = displayed.filter((p) => wishlist.includes(p.id));
  } else if (activeFamily !== "ALL") {
    displayed = displayed.filter((p) => p.family.toLowerCase() === activeFamily.toLowerCase());
  }
  const normalizedQuery = searchQuery.trim().toLowerCase();
  if (normalizedQuery) {
    displayed = displayed.filter(
      (product) => [
        product.name,
        product.tagline,
        product.family,
        ...product.notes.top,
        ...product.notes.heart,
        ...product.notes.base
      ].join(" ").toLowerCase().includes(normalizedQuery)
    );
  }
  if (activeSort === "low-high") {
    displayed.sort(
      (a, b) => (a.sizes.find((size) => size.size === "50ML")?.discountedPrice ?? a.discountedPrice) - (b.sizes.find((size) => size.size === "50ML")?.discountedPrice ?? b.discountedPrice)
    );
  } else if (activeSort === "high-low") {
    displayed.sort(
      (a, b) => (b.sizes.find((size) => size.size === "50ML")?.discountedPrice ?? b.discountedPrice) - (a.sizes.find((size) => size.size === "50ML")?.discountedPrice ?? a.discountedPrice)
    );
  }
  const families = ["ALL", "Fresh", "Woody", "Oriental", "Intense"];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#0B0B0B] pb-16 sm:pb-24", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative isolate min-h-[20rem] overflow-hidden border-b border-[#262626]", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: products[0].image,
          alt: "",
          "aria-hidden": "true",
          className: "absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-55"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-r from-[#0B0B0B]/95 via-[#0B0B0B]/75 to-[#0B0B0B]/35" }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto flex min-h-[20rem] max-w-7xl items-center px-4 py-14 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "h-px w-7 bg-[#C6A15B]" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.35em] text-[#C6A15B]", children: "H&A LUXURY \xB7 MADE TO BE REMEMBERED" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "font-serif text-5xl font-light tracking-wide text-[#F5F2EC] sm:text-7xl", children: [
          "The Perfume",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "italic text-[#DFC27D]", children: "Collection" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-xl text-sm leading-relaxed text-[#F5F2EC]/75 sm:text-base", children: "Explore our curated selection of perfumes and find your next signature scent by notes, mood, or moment." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12 mt-10 flex flex-col items-center justify-between gap-6 border-b border-[#222222] pb-6 md:flex-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2", children: [
          families.map((fam) => {
            const active = !onlyWishlist && activeFamily.toUpperCase() === fam.toUpperCase();
            return /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setOnlyWishlist(false);
                  setActiveFamily(fam);
                  setSearchParams(fam === "ALL" ? {} : { family: fam });
                },
                className: `py-2 px-4 text-xs uppercase tracking-[0.2em] transition-all font-light ${active ? "bg-[#1C1C1C] text-[#C6A15B] border border-[#C6A15B]/50" : "text-[#F5F2EC]/60 hover:text-[#F5F2EC] border border-transparent"}`,
                children: fam
              },
              fam
            );
          }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setOnlyWishlist(!onlyWishlist);
                if (!onlyWishlist) {
                  setSearchParams({ filter: "wishlist" });
                } else {
                  setSearchParams({});
                }
              },
              className: `py-2 px-4 text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 font-light ${onlyWishlist ? "bg-[#1C1C1C] text-[#C6A15B] border border-[#C6A15B]/50" : "text-[#F5F2EC]/60 hover:text-[#C6A15B] border border-transparent"}`,
              children: [
                /* @__PURE__ */ jsx(Heart, { className: `w-3.5 h-3.5 ${onlyWishlist ? "fill-[#C6A15B]" : ""}` }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "SAVED (",
                  wishlist.length,
                  ")"
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-3 sm:flex-row md:w-auto", children: [
          /* @__PURE__ */ jsxs("label", { className: "relative flex min-w-0 flex-1 items-center sm:min-w-56", children: [
            /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 h-4 w-4 text-[#F5F2EC]/45" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "search",
                value: searchQuery,
                onChange: (event) => setSearchQuery(event.target.value),
                placeholder: "Search perfumes or notes",
                "aria-label": "Search perfumes or notes",
                className: "w-full border border-[#2E2E2E] bg-[#141414] py-2.5 pl-10 pr-3 text-xs text-[#F5F2EC] outline-none placeholder:text-[#F5F2EC]/40 focus:border-[#C6A15B]"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10.5px] uppercase tracking-widest text-[#F5F2EC]/40", children: "SORT BY:" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: activeSort,
                onChange: (e) => setActiveSort(e.target.value),
                className: "border border-[#2E2E2E] bg-[#141414] px-3 py-2.5 text-xs text-[#F5F2EC] outline-none focus:border-[#C6A15B]",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "featured", children: "Featured" }),
                  /* @__PURE__ */ jsx("option", { value: "low-high", children: "Price: Low to High" }),
                  /* @__PURE__ */ jsx("option", { value: "high-low", children: "Price: High to Low" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      displayed.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-24 text-center space-y-4", children: [
        /* @__PURE__ */ jsx("p", { className: "font-serif text-2xl text-[#F5F2EC] font-light", children: "No perfumes match the selected criteria." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setOnlyWishlist(false);
              setActiveFamily("ALL");
              setSearchParams({});
            },
            className: "px-6 py-2.5 bg-[#C6A15B] text-[#0B0B0B] text-xs uppercase tracking-widest font-medium",
            children: "RESET FILTERS"
          }
        )
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { className: "mb-5 text-xs uppercase tracking-[0.16em] text-[#F5F2EC]/45", children: [
          displayed.length,
          " ",
          displayed.length === 1 ? "perfume" : "perfumes",
          onlyWishlist ? " in your wishlist" : ""
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8", children: displayed.map((product) => /* @__PURE__ */ jsx(ProductCard, { product }, product.id)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-20 p-8 bg-[#121212] border border-[#222222] text-center max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-[#C6A15B] mb-2 font-light", children: "OUR CURATED SELECTION" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#F5F2EC]/60 font-light leading-relaxed", children: "Explore perfumes sourced through our affiliate supply partners, with product notes, available sizes, stock, and PKR pricing shown on each listing." })
      ] })
    ] })
  ] });
};
var Shop_default = Shop;
export {
  Shop,
  Shop_default as default
};
