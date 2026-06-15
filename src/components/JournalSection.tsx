import React, { useState } from "react";
import { BLOG_ARTICLES } from "../data/cms";
import { BlogArticle } from "../types";
import { BookOpen, Calendar, Clock, X, Heart, Share2, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function JournalSection() {
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [likedArticles, setLikedArticles] = useState<string[]>([]);

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedArticles.includes(id)) {
      setLikedArticles(likedArticles.filter((aid) => aid !== id));
    } else {
      setLikedArticles([...likedArticles, id]);
    }
  };

  return (
    <section id="journal-section" className="relative w-full bg-[#0a0a0a] py-24 text-white border-t border-neutral-900">
      
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Header story alignment */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="font-mono text-xs tracking-[0.4em] text-amber-500 uppercase">
              REPORTS FROM OUR COURIERS
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-white md:text-5xl">
              The Sovereign Journal
            </h2>
            <p className="mt-4 font-sans text-xs text-neutral-400 max-w-2xl leading-relaxed">
              Timeless journalism exploring slow architecture, cultural preservation, and ancient gastronomy. Published on fine high-density nodes.
            </p>
          </div>

          <div className="mt-6 font-mono text-[10px] tracking-widest text-[#E6C687] uppercase border-b border-amber-500/20 pb-2 shrink-0 flex items-center gap-1.5">
            <BookOpen size={11} className="animate-pulse" />
            <span>VOLUME IV • THIRD EDITION</span>
          </div>
        </div>

        {/* Stories list rendering */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {BLOG_ARTICLES.map((art, i) => {
            const hasLiked = likedArticles.includes(art.id);
            return (
              <motion.article
                key={art.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                onClick={() => setActiveArticle(art)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-850 bg-neutral-900/10 p-5 backdrop-blur-md transition-all duration-300 hover:border-amber-400/30 cursor-pointer"
              >
                {/* Header visual card */}
                <div>
                  <div className="relative h-48 w-full overflow-hidden rounded-xl">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.75]"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 rounded bg-neutral-950/80 border border-neutral-800 px-2.5 py-1 font-mono text-[8px] tracking-widest text-amber-400 uppercase">
                      {art.category}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between font-mono text-[9px] text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} />
                      {art.publishedAt}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-lg font-bold text-white tracking-tight leading-snug group-hover:text-[#E6C687] transition-colors duration-300">
                    {art.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-xs text-neutral-400 leading-relaxed font-light line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                {/* Card footer details */}
                <div className="mt-6 border-t border-neutral-800/80 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={art.author.avatarUrl}
                      alt={art.author.name}
                      className="h-7 w-7 rounded-full object-cover border border-amber-500/10"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="block font-sans text-[11px] font-bold text-white">
                        {art.author.name}
                      </span>
                      <span className="block font-mono text-[8px] text-[#E6C687]/70 uppercase">
                        {art.author.role.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleToggleLike(art.id, e)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-rose-500 hover:border-rose-500/40 active:scale-90 transition-all cursor-pointer"
                  >
                    <Heart size={12} className={hasLiked ? "fill-rose-500 text-rose-500" : "text-neutral-400"} />
                  </button>
                </div>

              </motion.article>
            );
          })}
        </div>

      </div>

      {/* Cinematic Article Read Mode Popup overlay */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-980/95 p-4 md:p-6 backdrop-blur-xl overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-neutral-950 shadow-2xl overflow-hidden max-h-[90vh]"
            >
              
              {/* Close Button hover action */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-neutral-400 hover:text-white hover:border-white transition-all cursor-pointer"
                aria-label="Close luxury reading pane"
              >
                <X size={18} />
              </button>

              {/* Header Visual with blend modes */}
              <div className="relative h-64 w-full md:h-80 overflow-hidden">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="h-full w-full object-cover brightness-[0.4]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                
                {/* Coordinates metadata bottom overlay */}
                <div className="absolute inset-x-6 bottom-6 md:inset-x-10">
                  <span className="rounded bg-amber-500/10 border border-amber-500/20 px-3 py-1 font-mono text-[9px] tracking-widest text-[#E6C687] uppercase inline-block">
                    {activeArticle.category} CHRONICLE
                  </span>
                  <h1 className="mt-3 font-serif text-2xl font-bold text-white md:text-3xl leading-snug">
                    {activeArticle.title}
                  </h1>
                </div>
              </div>

              {/* Text content with drop-cap styling */}
              <div className="p-6 md:p-10 overflow-y-auto max-h-[50vh] flex flex-col gap-8">
                
                {/* Meta details dashboard */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-6 border-b border-neutral-800 font-mono text-[10px] text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-amber-400" />
                    RECORDED DATE: {activeArticle.publishedAt}
                  </span>
                  <span>|</span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-amber-400" />
                    METRIC SPEED: {activeArticle.readTime}
                  </span>
                  <span>|</span>
                  <span className="flex items-center gap-1 text-[#E6C687]">
                    <Compass size={13} className="text-amber-400" />
                    AUTHOR CORRESPONDENCE SYSTEM
                  </span>
                </div>

                {/* Flow-body paragraph with drop capital letter */}
                <div className="text-neutral-300 text-sm md:text-base leading-relaxed font-sans font-light">
                  <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#E6C687] first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                    {activeArticle.content}
                  </p>
                  <p className="mt-6">
                    As reported by Auren's internal investigative team, we ensure these standards remain fully intact. Rather than conforming to commercial paths, we maintain direct control over all elements. Our clifftop retreats, timber villas, and planetary telescopes are open exclusively to our select sovereign package holders.
                  </p>
                </div>

                {/* Quote Block decoration */}
                <div className="border-l-2 border-[#E6C687] pl-4 italic font-serif text-[#E6C687] text-[15px] bg-neutral-900/40 p-4 rounded-r-xl">
                  "Timelessness isn't a commodity you purchase off catalogs; it is the physical extraction of noise from the landscape."
                </div>

                {/* Author Credentials and Footnotes */}
                <div className="border-t border-neutral-800 pt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeArticle.author.avatarUrl}
                      alt={activeArticle.author.name}
                      className="h-10 w-10 rounded-full object-cover border border-amber-500/20"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="block font-sans text-xs font-bold text-white">
                        {activeArticle.author.name}
                      </span>
                      <span className="block font-mono text-[9px] text-[#E6C687] uppercase">
                        {activeArticle.author.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer">
                      <Share2 size={13} />
                    </button>
                    <button className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-400/5 px-4 py-1.5 font-mono text-[9px] text-[#E6C687] uppercase hover:bg-amber-400 hover:text-black transition-all cursor-pointer">
                      <span>SECURE ARCHIVE</span>
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
