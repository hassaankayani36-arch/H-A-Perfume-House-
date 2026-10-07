import React, { useState } from 'react';
import { Star, MessageSquare, Sparkles, Check } from 'lucide-react';
import { emptyReviewState } from '../data/reviews.ts';

interface ReviewFormState {
  name: string;
  email: string;
  rating: number;
  headline: string;
  comment: string;
  fragrance: string;
}

export const Reviews: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<ReviewFormState>({
    name: '',
    email: '',
    rating: 5,
    headline: '',
    comment: '',
    fragrance: 'H&A Noir',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setSubmitted(false);
      setForm({
        name: '',
        email: '',
        rating: 5,
        headline: '',
        comment: '',
        fragrance: 'H&A Noir',
      });
    }, 2500);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0E0E0E] border-t border-[#1F1F1F] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
              VOICES OF DISTINCTION
            </span>
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F2EC] uppercase tracking-wide">
            PATRON REFLECTIONS
          </h2>
          <p className="mt-3 text-sm text-[#F5F2EC]/60 font-light">
            Genuine accounts of presence, sillage, and emotional resonance.
          </p>
        </div>

        {/* Empty State Box (As requested: "show an empty state only, real reviews will be added later") */}
        <div className="relative bg-[#141414] border border-[#242424] p-10 sm:p-16 text-center max-w-3xl mx-auto">
          {/* Subtle gold emblem */}
          <div className="w-14 h-14 mx-auto border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] mb-6">
            <MessageSquare className="w-6 h-6 stroke-[1.2]" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F5F2EC] tracking-wide mb-3">
            {emptyReviewState.title}
          </h3>

          <p className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] mb-4 font-light">
            {emptyReviewState.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-[#F5F2EC]/70 font-light max-w-lg mx-auto leading-relaxed mb-8">
            {emptyReviewState.description}
          </p>

          {/* Action button */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-8 py-3.5 bg-transparent border border-[#C6A15B] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#0B0B0B] text-xs uppercase tracking-[0.24em] font-medium transition-all duration-300"
          >
            {emptyReviewState.ctaText}
          </button>
        </div>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#141414] border border-[#2E2E2E] p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#242424] mb-6">
              <h3 className="font-serif text-2xl text-[#F5F2EC] font-light">
                Leave a Reflection
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[#F5F2EC]/50 hover:text-[#F5F2EC] text-sm"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#C6A15B]/20 text-[#C6A15B] flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl text-[#F5F2EC]">Gratitude, Patron</h4>
                <p className="text-xs text-[#F5F2EC]/70 leading-relaxed font-light">
                  Your reflection has been submitted to the H&A Atelier for curation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#C6A15B] mb-1">
                    Select Fragrance
                  </label>
                  <select
                    value={form.fragrance}
                    onChange={(e) => setForm({ ...form, fragrance: e.target.value })}
                    className="w-full bg-[#0B0B0B] border border-[#2A2A2A] text-[#F5F2EC] px-3.5 py-2.5 text-xs focus:border-[#C6A15B] outline-none"
                  >
                    <option value="H&A Noir">H&A Noir (Extrait)</option>
                    <option value="H&A Oud">H&A Oud (Extrait)</option>
                    <option value="H&A Amber">H&A Amber (Eau de Parfum)</option>
                    <option value="H&A Élite">H&A Élite (Eau de Parfum)</option>
                    <option value="H&A Cuir Obscur">H&A Cuir Obscur (Extrait)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Tariq K."
                      className="w-full bg-[#0B0B0B] border border-[#2A2A2A] text-[#F5F2EC] px-3.5 py-2.5 text-xs focus:border-[#C6A15B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                      City / Location
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lahore / Islamabad"
                      className="w-full bg-[#0B0B0B] border border-[#2A2A2A] text-[#F5F2EC] px-3.5 py-2.5 text-xs focus:border-[#C6A15B] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setForm({ ...form, rating: star })}
                        className="p-1 text-[#C6A15B]"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= form.rating ? 'fill-[#C6A15B]' : 'text-[#333333]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                    Reflection Title
                  </label>
                  <input
                    type="text"
                    required
                    value={form.headline}
                    onChange={(e) => setForm({ ...form, headline: e.target.value })}
                    placeholder="e.g. Unbelievable sillage and compliments"
                    className="w-full bg-[#0B0B0B] border border-[#2A2A2A] text-[#F5F2EC] px-3.5 py-2.5 text-xs focus:border-[#C6A15B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#F5F2EC]/60 mb-1">
                    Your Impression & Experience
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    placeholder="Describe how the fragrance performed throughout the day or night..."
                    className="w-full bg-[#0B0B0B] border border-[#2A2A2A] text-[#F5F2EC] px-3.5 py-2.5 text-xs focus:border-[#C6A15B] outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C6A15B] hover:bg-[#DFC27D] text-[#0B0B0B] text-xs uppercase tracking-[0.22em] font-medium transition-colors"
                  >
                    SUBMIT TO ATELIER
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;
