import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0B0B0B] border-t border-[#1C1C1C] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C6A15B]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-5 h-[1px] bg-[#C6A15B]" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
            PRIVATE CORRESPONDENCE
          </span>
          <span className="w-5 h-[1px] bg-[#C6A15B]" />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F2EC] uppercase tracking-wide">
          ENTER THE WORLD OF H&A.
        </h2>

        <p className="mt-4 text-xs sm:text-sm text-[#F5F2EC]/70 font-light leading-relaxed max-w-xl mx-auto tracking-wide">
          Be among the privileged few to receive confidential previews of limited-run extraits,
          Kahuta office updates, and direct correspondence from Hassaan &amp; Arslan.
        </p>

        {submitted ? (
          <div className="mt-10 p-6 bg-[#141414] border border-[#C6A15B]/40 max-w-md mx-auto space-y-2">
            <div className="flex items-center justify-center gap-2 text-[#C6A15B]">
              <Check className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.2em] font-medium">
                WELCOME TO THE CIRCLE
              </span>
            </div>
            <p className="text-xs text-[#F5F2EC]/70 font-light">
              Your invitation has been recorded. Check your correspondence shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 max-w-md mx-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              placeholder="YOUR EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-[#141414] border border-[#2E2E2E] focus:border-[#C6A15B] px-5 py-3.5 text-xs text-[#F5F2EC] placeholder:text-[#F5F2EC]/30 tracking-widest outline-none transition-colors"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.22em] font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span>JOIN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="mt-4 text-[10px] text-[#F5F2EC]/40 tracking-widest uppercase font-light">
          WE RESPECT YOUR TIME AND PRIVACY. ZERO SPAM.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
