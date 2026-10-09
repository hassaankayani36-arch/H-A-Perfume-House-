import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Check, Clock } from "lucide-react";
const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Flacon Consultation",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "Flacon Consultation",
        message: ""
      });
    }, 4e3);
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-[#0B0B0B] py-16 sm:py-24 text-[#F5F2EC]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light", children: "ATELIER CONCIERGE" }),
        /* @__PURE__ */ jsx("span", { className: "w-5 h-[1px] bg-[#C6A15B]" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-4xl sm:text-6xl font-light uppercase tracking-wide", children: "CONNECT WITH H&A" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm sm:text-base text-[#F5F2EC]/65 font-light leading-relaxed max-w-xl mx-auto", children: "Whether inquiring about private olfactory consultations, bespoke corporate gifting, or order tracking, our concierge is at your service." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-8 bg-[#121212] border border-[#222222] space-y-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl font-light text-[#F5F2EC]", children: "VIP Concierge Desk" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#F5F2EC]/70 font-light leading-relaxed", children: "Direct client assistance for patrons in Pakistan and international destinations." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-4 border-t border-[#1F1F1F] text-xs", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-[#F5F2EC]/40 block", children: "WHATSAPP & CALL" }),
                /* @__PURE__ */ jsx("a", { href: "tel:+923190731434", className: "block text-[#F5F2EC] font-mono hover:text-[#C6A15B]", children: "Hassaan Kayani \xB7 +92 319 0731434" }),
                /* @__PURE__ */ jsx("a", { href: "tel:+923099282467", className: "mt-1 block text-[#F5F2EC] font-mono hover:text-[#C6A15B]", children: "Arslan Qamar \xB7 +92 309 9282467" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-[#F5F2EC]/40 block", children: "DIRECT CORRESPONDENCE" }),
                /* @__PURE__ */ jsx("span", { className: "text-[#F5F2EC]", children: "H&A luxuary@gmail.com" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-[#F5F2EC]/40 block", children: "HOURS OF RECEPTION" }),
                /* @__PURE__ */ jsx("span", { className: "text-[#F5F2EC]", children: "Mon \u2013 Sat: 11:00 AM \u2013 09:00 PM (PKT)" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 bg-[#121212] border border-[#222222] space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl font-light text-[#F5F2EC]", children: "H&A Office" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 text-xs font-light text-[#F5F2EC]/75", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-[#C6A15B]" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-[11px] font-medium uppercase tracking-widest text-[#C6A15B]", children: "KAHUTA" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1", children: "Office 302, near Al-Ghani Bakers, Motor Chowk, Kahuta, Pakistan" }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://maps.google.com/?q=Office+302+Al-Ghani+Bakers+Motor+Chowk+Kahuta",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "mt-2 inline-block text-[10px] uppercase tracking-widest text-[#C6A15B] underline underline-offset-4",
                  children: "View on Google Maps"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 bg-[#141414] border border-[#262626] p-8 sm:p-12", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl sm:text-3xl font-light mb-2", children: "Send a Correspondence" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#F5F2EC]/60 font-light mb-8", children: "A private perfume advisor will respond within 12 hours." }),
        submitted ? /* @__PURE__ */ jsxs("div", { className: "py-16 text-center space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 mx-auto rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] flex items-center justify-center text-[#C6A15B]", children: /* @__PURE__ */ jsx(Check, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsx("h4", { className: "font-serif text-2xl", children: "Correspondence Received" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#F5F2EC]/70 max-w-sm mx-auto font-light leading-relaxed", children: "Thank you. Hassaan & Arslan's concierge desk will review your inquiry and reach out shortly." })
        ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-2", children: "Full Name *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  required: true,
                  value: form.name,
                  onChange: (e) => setForm({ ...form, name: e.target.value }),
                  placeholder: "e.g. Arslan Malik",
                  className: "w-full bg-[#0B0B0B] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-2", children: "Email Address *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  required: true,
                  value: form.email,
                  onChange: (e) => setForm({ ...form, email: e.target.value }),
                  placeholder: "client@domain.com",
                  className: "w-full bg-[#0B0B0B] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-2", children: "Phone Number (Optional)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  value: form.phone,
                  onChange: (e) => setForm({ ...form, phone: e.target.value }),
                  placeholder: "+92 300 1234567",
                  className: "w-full bg-[#0B0B0B] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-2", children: "Nature of Inquiry" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: form.subject,
                  onChange: (e) => setForm({ ...form, subject: e.target.value }),
                  className: "w-full bg-[#0B0B0B] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "Flacon Consultation", children: "Olfactory / Flacon Consultation" }),
                    /* @__PURE__ */ jsx("option", { value: "Order Tracking", children: "Order & Delivery Tracking" }),
                    /* @__PURE__ */ jsx("option", { value: "Corporate Gifting", children: "Corporate & Bespoke Gifting" }),
                    /* @__PURE__ */ jsx("option", { value: "Salon Booking", children: "Private Salon Appointment" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-2", children: "Your Message *" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 4,
                required: true,
                value: form.message,
                onChange: (e) => setForm({ ...form, message: e.target.value }),
                placeholder: "Tell us about your scent preferences or inquiry...",
                className: "w-full bg-[#0B0B0B] border border-[#2E2E2E] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F2EC] outline-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full py-4 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.24em] font-medium transition-colors",
              children: "TRANSMIT TO CONCIERGE"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
};
var Contact_default = Contact;
export {
  Contact,
  Contact_default as default
};
