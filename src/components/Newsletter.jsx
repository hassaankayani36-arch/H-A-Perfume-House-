import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };
  return /* @__PURE__ */ jsxs("section", { className: "py-24 sm:py-32 bg-[#0B0B0B] border-t border-[#1C1C1C] relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C6A15B]/5 rounded-full blur-[150px] pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light", children: "PRIVATE CORRESPONDENCE" }),
        /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl sm:text-5xl font-light text-[#F5F2EC] uppercase tracking-wide", children: "ENTER THE WORLD OF H&A." }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs sm:text-sm text-[#F5F2EC]/70 font-light leading-relaxed max-w-xl mx-auto tracking-wide", children: "Be among the privileged few to receive confidential previews of limited-run extraits, Kahuta office updates, and direct correspondence from Hassaan & Arslan." }),
      submitted ? /* @__PURE__ */ jsxs("div", { className: "mt-10 p-6 bg-[#141414] border border-[#C6A15B]/40 max-w-md mx-auto space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 text-[#C6A15B]", children: [
          /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-[0.2em] font-medium", children: "WELCOME TO THE CIRCLE" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#F5F2EC]/70 font-light", children: "Your invitation has been recorded. Check your correspondence shortly." })
      ] }) : /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "mt-10 max-w-md mx-auto flex flex-col sm:flex-row gap-3",
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                required: true,
                placeholder: "YOUR EMAIL ADDRESS",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                className: "flex-1 bg-[#141414] border border-[#2E2E2E] focus:border-[#C6A15B] px-5 py-3.5 text-xs text-[#F5F2EC] placeholder:text-[#F5F2EC]/30 tracking-widest outline-none transition-colors"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                className: "px-7 py-3.5 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.22em] font-medium transition-colors flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "JOIN" }),
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-[10px] text-[#F5F2EC]/40 tracking-widest uppercase font-light", children: "WE RESPECT YOUR TIME AND PRIVACY. ZERO SPAM." })
    ] })
  ] });
};
var Newsletter_default = Newsletter;
export {
  Newsletter,
  Newsletter_default as default
};
