import React, { useState } from 'react';
import { ArrowUpRight, Check, MapPin, MessageCircle, Star } from 'lucide-react';
import { emptyReviewState, sampleReviews } from '../data/reviews.ts';
import { products } from '../data/products.ts';

interface ReviewFormState {
  name: string;
  location: string;
  rating: number;
  headline: string;
  comment: string;
  fragrance: string;
}

export const Reviews: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [form, setForm] = useState<ReviewFormState>({
    name: '',
    location: '',
    rating: 5,
    headline: '',
    comment: '',
    fragrance: products[0].name,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      'H&A Customer Feedback',
      `Fragrance: ${form.fragrance}`,
      `Name: ${form.name}`,
      `City: ${form.location}`,
      `Rating: ${form.rating}/5`,
      `Title: ${form.headline}`,
      `Review: ${form.comment}`,
    ].join('\n');

    setWhatsappUrl(`https://wa.me/923190731434?text=${encodeURIComponent(message)}`);
    setSubmitted(true);
  };

  return (
    <section id="customer-feedback" className="scroll-mt-24 py-24 sm:py-32 bg-[#0E0E0E] border-t border-[#1F1F1F] relative">
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
            Fragrance notes from the H&amp;A community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {sampleReviews.map((review) => (
            <article
              key={review.id}
              className="flex h-full flex-col border border-[#2A2823] bg-gradient-to-br from-[#171614] to-[#10100F] p-6 transition-colors hover:border-[#C6A15B]/45 sm:p-7"
            >
              <div className="mb-5 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br font-serif text-sm text-[#F5F2EC] shadow-inner ${review.accent}`}>
                    {review.initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium tracking-wide text-[#F5F2EC]">{review.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-[#F5F2EC]/45">
                      <MapPin className="h-3 w-3 text-[#C6A15B]/75" />
                      {review.location}
                    </p>
                  </div>
                </div>
                <span className="whitespace-nowrap border border-[#C6A15B]/25 px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-[#C6A15B]/80">
                  Sample
                </span>
              </div>

              <div className="mb-3 flex gap-0.5" aria-label={`${review.rating} out of 5 sample stars`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={`h-3.5 w-3.5 ${index < review.rating ? 'fill-[#C6A15B] text-[#C6A15B]' : 'text-[#3A3833]'}`}
                  />
                ))}
              </div>

              <p className="font-serif text-lg leading-snug text-[#F5F2EC]">{review.product}</p>
              <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-[#F5F2EC]/65">
                &ldquo;{review.review}&rdquo;
              </p>
              <p className="mt-5 border-t border-white/10 pt-4 text-[9px] uppercase tracking-[0.16em] text-[#C6A15B]/70">
                Sample preview · Not a verified customer review
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-5 border border-[#C6A15B]/20 bg-[#141414] p-6 text-center sm:flex-row sm:px-8 sm:text-left">
          <div>
            <h3 className="font-serif text-2xl font-light text-[#F5F2EC]">{emptyReviewState.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#F5F2EC]/55">{emptyReviewState.subtitle}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[#C6A15B]/65">
              {emptyReviewState.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setWhatsappUrl('');
              setModalOpen(true);
            }}
            className="inline-flex shrink-0 items-center gap-2 border border-[#C6A15B] px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#C6A15B] transition-colors hover:bg-[#C6A15B] hover:text-[#0B0B0B]"
          >
            <MessageCircle className="h-4 w-4" />
            {emptyReviewState.ctaText}
          </button>
        </div>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto bg-[#141414] border border-[#2E2E2E] p-6 shadow-2xl sm:p-8">
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
                <h4 className="font-serif text-2xl text-[#F5F2EC]">Your review is ready</h4>
                <p className="text-xs text-[#F5F2EC]/70 leading-relaxed font-light">
                  WhatsApp will open with your feedback. Press Send there to share it with the H&amp;A team.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#C6A15B] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#0B0B0B] transition-colors hover:bg-[#DFC27D]"
                >
                  Open WhatsApp
                  <ArrowUpRight className="h-4 w-4" />
                </a>
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
                    {products.map((product) => (
                      <option key={product.id} value={product.name}>{product.name}</option>
                    ))}
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
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="e.g. Lahore"
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
                    CONTINUE TO WHATSAPP
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
