import { useState, useEffect, useRef } from "react";
import { TESTIMONIALS } from "../data/cms";
import { Award, Star, Compass, Ship, Anchor, Quote } from "lucide-react";
import { motion } from "motion/react";

export default function StatsSection() {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  // Parallax landscape element
  const parallaxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const el = parallaxRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = window.scrollY;
      const offset = (scrolled - rect.top) * 0.12;
      const bg = el.querySelector(".parallax-bg") as HTMLElement;
      if (bg) {
        bg.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { title: "SOVEREIGN CITADELS", value: "14", desc: "Private global estates", icon: Anchor },
    { title: "GUEST SATISFACTION", value: "99.8%", desc: "Near flawless rating index", icon: Star },
    { title: "FLIGHT ARRANGEMENT", value: "4,200+", desc: "Private jet air corridors managed", icon: Compass },
    { title: "LEGACY PRESERVATION", value: "1,500s", desc: "Centuries of heritage preserved", icon: Award },
  ];

  return (
    <section id="stats-section" className="relative w-full bg-[#070707] py-24 text-white">
      
      {/* 1. Luxurious Bento Grid of Animated Statistics */}
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="max-w-2xl">
          <span className="font-mono text-xs tracking-[0.4em] text-amber-500 uppercase">
            AUREN SOVEREIGN TELEMETRIES
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-white md:text-5xl">
            Sovereign Standards of Influence
          </h2>
          <p className="mt-3 font-sans text-[#E6C687]/70 leading-relaxed font-light">
            We operate in isolation from standardized hospitality grids. We manage private lands, maintain bespoke marine fleets, and operate certified celestial observatories for our members.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl border border-neutral-850 bg-neutral-900/30 p-6 backdrop-blur-md transition-all duration-300 hover:border-amber-400/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/5 text-[#E6C687] border border-amber-500/10">
                  <Icon size={18} className="text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="mt-6">
                  <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block">
                    {stat.title}
                  </span>
                  <span className="mt-1 block font-sans text-4xl font-extrabold text-[#E6C687]">
                    {stat.value}
                  </span>
                  <span className="mt-1 block font-sans text-xs text-neutral-400 leading-relaxed">
                    {stat.desc}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. Stunning Parallax Landscape Frame */}
      <div
        ref={parallaxRef}
        className="relative my-24 h-[60vh] w-full overflow-hidden border-y border-neutral-900"
      >
        <div className="parallax-bg absolute inset-0 -top-24 -bottom-24 h-[90vh] w-full">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1500"
            alt="Majestic Mountain Range Parallax"
            className="h-full w-full object-cover brightness-[0.25]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#070707] via-transparent to-[#070707]" />
        
        {/* Parallax Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-[9px] tracking-[0.5em] text-amber-500 uppercase block mb-4">
              TIMELAND SANCTUARY PERSPECTIVES
            </span>
            <p className="font-serif text-3xl font-light italic text-neutral-200 md:text-5xl leading-tight">
              "We believe looking out across primeval granite peaks should not be a glance, but a confrontation with the infinite clock."
            </p>
            <span className="mt-4 block font-mono text-[10px] tracking-[0.3em] text-[#E6C687] uppercase">
              - EXECUTIVE TRUSTEES, AUREN RESORTS
            </span>
          </div>
        </div>
      </div>

      {/* 3. Luxurious Interactive Client Success Stories (CMS-driven) */}
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          <div className="lg:col-span-5">
            <span className="font-mono text-xs tracking-[0.4em] text-amber-500 uppercase">
              THE PATRON CIRCLE RECORDS
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-white md:text-5xl">
              Sanctuary Chronicles
            </h2>
            <p className="mt-4 font-sans text-xs text-neutral-400 leading-relaxed font-light">
              Listen to the testimonies of sovereign leaders, philosophers, and families who reside within our gated citadels around the globe.
            </p>

            <div className="mt-8 flex gap-3">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setActiveStoryIdx(idx)}
                  className={`flex h-12 w-12 overflow-hidden rounded-full border cursor-pointer transition-all ${
                    idx === activeStoryIdx ? "border-amber-400 scale-105" : "border-neutral-800 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src={t.imageUrl} alt={t.clientName} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-neutral-850 bg-neutral-900/20 p-8 md:p-12 backdrop-blur-xl">
              <Quote size={40} className="absolute top-6 left-6 text-amber-500/10 pointer-events-none" />
              
              <div className="min-h-48 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="mt-6 font-serif text-lg italic text-neutral-200 md:text-xl leading-relaxed">
                    "{TESTIMONIALS[activeStoryIdx].quote}"
                  </p>
                </div>

                <div className="mt-8 border-t border-neutral-800/80 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="font-sans text-sm font-extrabold text-white">
                      {TESTIMONIALS[activeStoryIdx].clientName}
                    </h4>
                    <p className="font-mono text-[10px] text-[#E6C687] mt-0.5 uppercase tracking-wide">
                      {TESTIMONIALS[activeStoryIdx].clientTitle}
                    </p>
                  </div>
                  <div className="text-left sm:text-right font-mono text-[9px] text-neutral-500 uppercase">
                    <span>VISITED SITE: </span>
                    <span className="text-white block font-sans text-xs mt-0.5">{TESTIMONIALS[activeStoryIdx].resortVisited}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
