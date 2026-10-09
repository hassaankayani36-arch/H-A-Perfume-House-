import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { journalArticles } from "../data/journal.js";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { handleProductImageError } from "../utils/productImage.js";
const Journal = () => {
  const location = useLocation();
  const [selectedArticle, setSelectedArticle] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    const hash = location.hash.replace("#", "");
    if (hash) {
      const found = journalArticles.find((a) => a.slug === hash);
      if (found) setSelectedArticle(found);
    }
  }, [location.hash]);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-[#0B0B0B] py-16 sm:py-24 text-[#F5F2EC]", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: selectedArticle ? (
    /* Single Article Reader View */
    /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setSelectedArticle(null),
          className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C6A15B] hover:text-[#DFC27D] font-light transition-colors",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsx("span", { children: "RETURN TO ALL ESSAYS" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#C6A15B] font-light", children: [
          /* @__PURE__ */ jsx("span", { children: selectedArticle.category }),
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\xB7" }),
          /* @__PURE__ */ jsx("span", { children: selectedArticle.readTime })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl sm:text-5xl font-light leading-tight", children: selectedArticle.title }),
        /* @__PURE__ */ jsxs("div", { className: "pt-2 flex items-center gap-4 text-xs text-[#F5F2EC]/50 font-light border-b border-[#222222] pb-6", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "BY ",
            selectedArticle.author.toUpperCase()
          ] }),
          /* @__PURE__ */ jsx("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx("span", { children: selectedArticle.date })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative aspect-[16/9] bg-[#141414] border border-[#262626] overflow-hidden", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: selectedArticle.image,
          onError: handleProductImageError,
          alt: selectedArticle.title,
          className: "w-full h-full object-cover",
          style: { filter: "brightness(0.9) contrast(1.1)" }
        }
      ) }),
      /* @__PURE__ */ jsxs("blockquote", { className: "p-8 bg-[#121212] border-l-2 border-[#C6A15B] my-8 font-serif text-xl sm:text-2xl text-[#C6A15B] font-light italic leading-relaxed", children: [
        "\u201C",
        selectedArticle.quote,
        "\u201D"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6 text-sm sm:text-base text-[#F5F2EC]/80 font-light leading-relaxed max-w-3xl", children: selectedArticle.content.map((paragraph, i) => /* @__PURE__ */ jsx("p", { children: paragraph }, i)) }),
      /* @__PURE__ */ jsxs("div", { className: "pt-12 border-t border-[#222222] flex justify-between items-center", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedArticle(null),
            className: "text-xs uppercase tracking-[0.2em] text-[#C6A15B] hover:text-[#DFC27D]",
            children: "\u2190 Back to Archive"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/shop",
            className: "px-6 py-3 bg-[#C6A15B] text-[#0B0B0B] text-xs uppercase tracking-[0.2em] font-medium",
            children: "DISCOVER THE CREATIONS"
          }
        )
      ] })
    ] })
  ) : (
    /* Archive Grid */
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light", children: "EDITORIAL CHRONICLES" }),
          /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "font-serif text-4xl sm:text-6xl font-light uppercase tracking-wide", children: "THE H&A JOURNAL" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm sm:text-base text-[#F5F2EC]/65 font-light leading-relaxed max-w-xl mx-auto", children: "Olfactory treatises, raw material deep-dives, and insights into the philosophy of presence." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-12", children: journalArticles.map((article) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "group grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#121212] border border-[#222222] hover:border-[#C6A15B]/40 transition-all p-6 sm:p-8",
          children: [
            /* @__PURE__ */ jsx("div", { className: "md:col-span-5 relative aspect-[16/10] bg-[#141414] overflow-hidden", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: article.image,
                onError: handleProductImageError,
                alt: article.title,
                className: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-7 space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#C6A15B]", children: [
                /* @__PURE__ */ jsx("span", { children: article.category }),
                /* @__PURE__ */ jsx("span", { children: "\xB7" }),
                /* @__PURE__ */ jsx("span", { children: article.readTime })
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "font-serif text-2xl sm:text-3xl font-light text-[#F5F2EC] group-hover:text-[#C6A15B] transition-colors", children: article.title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-[#F5F2EC]/70 font-light leading-relaxed", children: article.excerpt }),
              /* @__PURE__ */ jsxs("div", { className: "pt-2 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-[#F5F2EC]/40 uppercase tracking-widest font-light", children: [
                  "BY ",
                  article.author.toUpperCase()
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setSelectedArticle(article),
                    className: "text-xs uppercase tracking-[0.2em] text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-4 decoration-[#C6A15B]/40 font-light",
                    children: "READ ESSAY \u2192"
                  }
                )
              ] })
            ] })
          ]
        },
        article.id
      )) })
    ] })
  ) }) });
};
var Journal_default = Journal;
export {
  Journal,
  Journal_default as default
};
