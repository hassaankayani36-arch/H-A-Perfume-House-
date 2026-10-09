import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowUpRight, Check, MapPin, MessageCircle, Star } from "lucide-react";
import { emptyReviewState, sampleReviews } from "../data/reviews.js";
import { products } from "../data/products.js";
const Reviews = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [form, setForm] = useState({
    name: "",
    location: "",
    rating: 5,
    headline: "",
    comment: "",
    fragrance: products[0].name
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = [
      "H&A Customer Feedback",
      `Fragrance: ${form.fragrance}`,
      `Name: ${form.name}`,
      `City: ${form.location}`,
      `Rating: ${form.rating}/5`,
      `Title: ${form.headline}`,
      `Review: ${form.comment}`
    ].join("\n");
    setWhatsappUrl(`https://wa.me/923190731434?text=${encodeURIComponent(message)}`);
    setSubmitted(true);
  };
  return /* @__PURE__ */ jsxs("section", { id: "customer-feedback", className: "scroll-mt-24 py-24 sm:py-32 bg-[#0E0E0E] border-t border-[#1F1F1F] relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light", children: "VOICES OF DISTINCTION" }),
          /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl sm:text-5xl font-light text-[#F5F2EC] uppercase tracking-wide", children: "PATRON REFLECTIONS" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-[#F5F2EC]/60 font-light", children: "Perfume notes from the H&A community." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5", children: sampleReviews.map((review) => /* @__PURE__ */ jsxs(
        "article",
        {
          className: "flex h-full flex-col border border-[#2A2823] bg-gradient-to-br from-[#171614] to-[#10100F] p-6 transition-colors hover:border-[#C6A15B]/45 sm:p-7",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: `flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br font-serif text-sm text-[#F5F2EC] shadow-inner ${review.accent}`, children: review.initials }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium tracking-wide text-[#F5F2EC]", children: review.name }),
                  /* @__PURE__ */ jsxs("p", { className: "mt-1 flex items-center gap-1 text-[10px] text-[#F5F2EC]/45", children: [
                    /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3 text-[#C6A15B]/75" }),
                    review.location
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap border border-[#C6A15B]/25 px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-[#C6A15B]/80", children: "Sample" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mb-3 flex gap-0.5", "aria-label": `${review.rating} out of 5 sample stars`, children: Array.from({ length: 5 }, (_, index) => /* @__PURE__ */ jsx(
              Star,
              {
                className: `h-3.5 w-3.5 ${index < review.rating ? "fill-[#C6A15B] text-[#C6A15B]" : "text-[#3A3833]"}`
              },
              index
            )) }),
            /* @__PURE__ */ jsx("p", { className: "font-serif text-lg leading-snug text-[#F5F2EC]", children: review.product }),
            /* @__PURE__ */ jsxs("p", { className: "mt-3 flex-1 text-sm font-light leading-relaxed text-[#F5F2EC]/65", children: [
              "\u201C",
              review.review,
              "\u201D"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-5 border-t border-white/10 pt-4 text-[9px] uppercase tracking-[0.16em] text-[#C6A15B]/70", children: "Sample preview \xB7 Not a verified customer review" })
          ]
        },
        review.id
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col items-center justify-between gap-5 border border-[#C6A15B]/20 bg-[#141414] p-6 text-center sm:flex-row sm:px-8 sm:text-left", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl font-light text-[#F5F2EC]", children: emptyReviewState.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs leading-relaxed text-[#F5F2EC]/55", children: emptyReviewState.subtitle }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-[10px] uppercase tracking-[0.12em] text-[#C6A15B]/65", children: emptyReviewState.description })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setSubmitted(false);
              setWhatsappUrl("");
              setModalOpen(true);
            },
            className: "inline-flex shrink-0 items-center gap-2 border border-[#C6A15B] px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#C6A15B] transition-colors hover:bg-[#C6A15B] hover:text-[#0B0B0B]",
            children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
              emptyReviewState.ctaText
            ]
          }
        )
      ] })
    ] }),
    modalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "relative max-h-[90vh] w-full max-w-lg overflow-y-auto bg-[#141414] border border-[#2E2E2E] p-6 shadow-2xl sm:p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-[#242424] mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl text-[#F5F2EC] font-light", children: "Leave a Reflection" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setModalOpen(false),
            className: "text-[#F5F2EC]/50 hover:text-[#F5F2EC] text-sm",
            children: "\u2715"
          }
        )
      ] }),
      submitted ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 mx-auto rounded-full bg-[#C6A15B]/20 text-[#C6A15B] flex items-center justify-center", children: /* @__PURE__ */ jsx(Check, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsx("h4", { className: "font-serif text-2xl text-[#F5F2EC]", children: "Your review is ready" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#F5F2EC]/70 leading-relaxed font-light", children: "WhatsApp will open with your feedback. Press Send there to share it with the H&A team." }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: whatsappUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center justify-center gap-2 bg-[#C6A15B] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#0B0B0B] transition-colors hover:bg-[#DFC27D]",
            children: [
              "Open WhatsApp",
              /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4" })
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#C6A15B] mb-1", children: "Select Perfume" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              value: form.fragrance,
              onChange: (e) => setForm({ ...form, fragrance: e.target.value }),
              className: "w-full bg-[#0B0B0B] border border-[#2A2A2A] text-[#F5F2EC] px-3.5 py-2.5 text-xs focus:border-[#C6A15B] outline-none",
              children: products.map((product) => /* @__PURE__ */ jsx("option", { value: product.name, children: product.name }, product.id))
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1", children: "Your Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                value: form.name,
                onChange: (e) => setForm({ ...form, name: e.target.value }),
                placeholder: "e.g. Tariq K.",
                className: "w-full bg-[#0B0B0B] border border-[#2A2A2A] text-[#F5F2EC] px-3.5 py-2.5 text-xs focus:border-[#C6A15B] outline-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1", children: "City / Location" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                value: form.location,
                onChange: (e) => setForm({ ...form, location: e.target.value }),
                placeholder: "e.g. Lahore",
                className: "w-full bg-[#0B0B0B] border border-[#2A2A2A] text-[#F5F2EC] px-3.5 py-2.5 text-xs focus:border-[#C6A15B] outline-none"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1", children: "Rating" }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setForm({ ...form, rating: star }),
              className: "p-1 text-[#C6A15B]",
              children: /* @__PURE__ */ jsx(
                Star,
                {
                  className: `w-5 h-5 ${star <= form.rating ? "fill-[#C6A15B]" : "text-[#333333]"}`
                }
              )
            },
            star
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1", children: "Reflection Title" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: form.headline,
              onChange: (e) => setForm({ ...form, headline: e.target.value }),
              placeholder: "e.g. Unbelievable sillage and compliments",
              className: "w-full bg-[#0B0B0B] border border-[#2A2A2A] text-[#F5F2EC] px-3.5 py-2.5 text-xs focus:border-[#C6A15B] outline-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1", children: "Your Impression & Experience" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 3,
              required: true,
              value: form.comment,
              onChange: (e) => setForm({ ...form, comment: e.target.value }),
              placeholder: "Describe how the fragrance performed throughout the day or night...",
              className: "w-full bg-[#0B0B0B] border border-[#2A2A2A] text-[#F5F2EC] px-3.5 py-2.5 text-xs focus:border-[#C6A15B] outline-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "w-full py-3.5 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.22em] font-medium transition-colors",
            children: "CONTINUE TO WHATSAPP"
          }
        ) })
      ] })
    ] }) })
  ] });
};
var Reviews_default = Reviews;
export {
  Reviews,
  Reviews_default as default
};
