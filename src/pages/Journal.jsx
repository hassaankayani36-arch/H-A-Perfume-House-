import { useEffect, useState } from 'react';
import { journalArticles } from '../data/journal.js';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { handleProductImageError } from '../utils/productImage.js';
export const Journal = () => {
    const location = useLocation();
    const [selectedArticle, setSelectedArticle] = useState(null);
    useEffect(() => {
        window.scrollTo(0, 0);
        const hash = location.hash.replace('#', '');
        if (hash) {
            const found = journalArticles.find((a) => a.slug === hash);
            if (found)
                setSelectedArticle(found);
        }
    }, [location.hash]);
    return (<div className="min-h-screen bg-[#0B0B0B] py-16 sm:py-24 text-[#F5F2EC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedArticle ? (
        /* Single Article Reader View */
        <div className="space-y-12">
            <button onClick={() => setSelectedArticle(null)} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C6A15B] hover:text-[#DFC27D] font-light transition-colors">
              <ArrowLeft className="w-3.5 h-3.5"/>
              <span>RETURN TO ALL ESSAYS</span>
            </button>

            {/* Article Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#C6A15B] font-light">
                <span>{selectedArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-light leading-tight">
                {selectedArticle.title}
              </h1>
              <div className="pt-2 flex items-center gap-4 text-xs text-[#F5F2EC]/50 font-light border-b border-[#222222] pb-6">
                <span>BY {selectedArticle.author.toUpperCase()}</span>
                <span>·</span>
                <span>{selectedArticle.date}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] bg-[#141414] border border-[#262626] overflow-hidden">
              <img src={selectedArticle.image} onError={handleProductImageError} alt={selectedArticle.title} className="w-full h-full object-cover" style={{ filter: 'brightness(0.9) contrast(1.1)' }}/>
            </div>

            {/* Pull Quote */}
            <blockquote className="p-8 bg-[#121212] border-l-2 border-[#C6A15B] my-8 font-serif text-xl sm:text-2xl text-[#C6A15B] font-light italic leading-relaxed">
              &ldquo;{selectedArticle.quote}&rdquo;
            </blockquote>

            {/* Body Paragraphs */}
            <div className="space-y-6 text-sm sm:text-base text-[#F5F2EC]/80 font-light leading-relaxed max-w-3xl">
              {selectedArticle.content.map((paragraph, i) => (<p key={i}>{paragraph}</p>))}
            </div>

            <div className="pt-12 border-t border-[#222222] flex justify-between items-center">
              <button onClick={() => setSelectedArticle(null)} className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] hover:text-[#DFC27D]">
                ← Back to Archive
              </button>
              <Link to="/shop" className="px-6 py-3 bg-[#C6A15B] text-[#0B0B0B] text-xs uppercase tracking-[0.2em] font-medium">
                DISCOVER THE CREATIONS
              </Link>
            </div>
          </div>) : (
        /* Archive Grid */
        <div>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-5 h-[1px] bg-[#C6A15B]"/>
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
                  EDITORIAL CHRONICLES
                </span>
                <span className="w-5 h-[1px] bg-[#C6A15B]"/>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl font-light uppercase tracking-wide">
                THE H&amp;A JOURNAL
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#F5F2EC]/65 font-light leading-relaxed max-w-xl mx-auto">
                Olfactory treatises, raw material deep-dives, and insights into the philosophy of presence.
              </p>
            </div>

            <div className="space-y-12">
              {journalArticles.map((article) => (<div key={article.id} className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#121212] border border-[#222222] hover:border-[#C6A15B]/40 transition-all p-6 sm:p-8">
                  <div className="md:col-span-5 relative aspect-[16/10] bg-[#141414] overflow-hidden">
                    <img src={article.image} onError={handleProductImageError} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"/>
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#C6A15B]">
                      <span>{article.category}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#F5F2EC] group-hover:text-[#C6A15B] transition-colors">
                      {article.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#F5F2EC]/70 font-light leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] text-[#F5F2EC]/40 uppercase tracking-widest font-light">
                        BY {article.author.toUpperCase()}
                      </span>
                      <button onClick={() => setSelectedArticle(article)} className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-4 decoration-[#C6A15B]/40 font-light">
                        READ ESSAY →
                      </button>
                    </div>
                  </div>
                </div>))}
            </div>
          </div>)}
      </div>
    </div>);
};
export default Journal;
