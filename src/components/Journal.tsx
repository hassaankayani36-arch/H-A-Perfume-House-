import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { journalArticles } from '../data/journal.ts';
import { handleProductImageError } from '../utils/productImage.ts';

export const Journal: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#0B0B0B] border-t border-[#1C1C1C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#222222] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-[#C6A15B]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#C6A15B] font-light">
                OLFACTORY DISPATCHES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F2EC] uppercase tracking-wide">
              THE H&A JOURNAL
            </h2>
            <p className="mt-3 text-sm text-[#F5F2EC]/60 max-w-xl font-light leading-relaxed">
              Essays on raw materials, sillage philosophy, and the architecture of personal presence.
            </p>
          </div>

          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C6A15B] hover:text-[#DFC27D] font-light transition-colors group"
          >
            <span>EXPLORE ALL ESSAYS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalArticles.slice(0, 3).map((article) => (
            <article
              key={article.id}
              className="group flex flex-col bg-[#121212] border border-[#222222] hover:border-[#C6A15B]/40 transition-all duration-500 overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] bg-[#171717] overflow-hidden">
                <Link to={`/journal#${article.slug}`} className="block w-full h-full">
                  <img
                    src={article.image}
                    onError={handleProductImageError}
                    alt={article.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ filter: 'brightness(0.9) contrast(1.1)' }}
                  />
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  {/* Unboxed metadata adhering to zero-pill rule */}
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-light mb-3">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#F5F2EC] tracking-wide group-hover:text-[#C6A15B] transition-colors leading-snug">
                    <Link to={`/journal#${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="mt-3 text-xs text-[#F5F2EC]/65 font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-between">
                  <span className="text-[10px] text-[#F5F2EC]/40 uppercase tracking-widest font-light">
                    BY {article.author.toUpperCase()}
                  </span>

                  <Link
                    to={`/journal#${article.slug}`}
                    className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] hover:text-[#DFC27D] underline underline-offset-4 decoration-[#C6A15B]/40 font-light"
                  >
                    READ ESSAY
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journal;
