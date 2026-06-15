import React, { useState, useRef, useEffect } from "react";
import { DESTINATIONS } from "../data/cms";
import { Compass, MapPin, Wind, Mountain, Plane, Terminal, ArrowDown, ChevronRight, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DestinationShowcaseProps {
  onSelectDestination: (id: string) => void;
  selectedId: string;
}

export default function DestinationShowcase({ onSelectDestination, selectedId }: DestinationShowcaseProps) {
  const activeDest = DESTINATIONS.find((d) => d.id === selectedId) || DESTINATIONS[0];
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // We store magnetic mouse positions for cards
  const mousePositions = useRef<Record<string, { x: number; y: number }>>({});

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Apply smooth magnetic tilt + translate
    card.style.transform = `translate3d(${x * 0.18}px, ${y * 0.18}px, 0) scale3d(1.02, 1.02, 1.02) rotateX(${-y * 0.06}deg) rotateY(${x * 0.06}deg)`;
    
    // Update gloss overlay reflection position coordinates
    const shine = card.querySelector(".magnetic-shine") as HTMLElement;
    if (shine) {
      shine.style.opacity = "0.2";
      shine.style.left = `${e.clientX - rect.left - 40}px`;
      shine.style.top = `${e.clientY - rect.top - 40}px`;
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)`;
    const shine = card.querySelector(".magnetic-shine") as HTMLElement;
    if (shine) {
      shine.style.opacity = "0";
    }
  };

  return (
    <section id="destinations-showcase" className="relative min-h-screen w-full bg-neutral-950 pb-20 pt-24 text-white">
      
      {/* Immersive Fullscreen Background Video & Overlay */}
      <div className="absolute inset-x-0 top-0 h-[85vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDest.id}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full"
          >
            {activeDest.videoUrl ? (
              <video
                src={activeDest.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover brightness-[0.35]"
              />
            ) : (
              <img
                src={activeDest.imageUrl}
                alt={activeDest.name}
                className="h-full w-full object-cover brightness-[0.25]"
                referrerPolicy="no-referrer"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Elegant Golden Gradients & Blend Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/20 via-neutral-950/45 to-neutral-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950/40" />

        <div className="absolute slot-blend inset-0 bg-neutral-950/5 mix-blend-color-dodge" />
      </div>

      {/* Hero Core content alignment container */}
      <div className="relative mx-auto flex max-w-7xl flex-col px-6 pt-16 md:px-12 md:pt-32">
        
        {/* Dynamic Telemetry stats block */}
        <motion.div
          key={activeDest.id + "-telemetry"}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-white/10 pb-4 font-mono text-[10px] tracking-[0.25em] text-[#E6C687]/80"
        >
          <span className="flex items-center gap-1.5 font-bold">
            <MapPin size={10} className="text-amber-400 animate-pulse" />
            {activeDest.coordinates}
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1.5 uppercase">
            <Wind size={10} className="text-[#E6C687]" />
            {activeDest.climate}
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1.5 uppercase">
            <Mountain size={10} className="text-[#E6C687]" />
            {activeDest.elevation}
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1.5 uppercase font-medium">
            <Plane size={10} />
            CONCIERGE GATE: {activeDest.airportCode}
          </span>
        </motion.div>

        {/* Spectacular Overlaid Titles */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-[0.4em] text-amber-500 uppercase">
              REDEFINING TRANSCENDENCE
            </p>
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeDest.id}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mt-2 font-serif text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl mix-blend-difference"
              >
                {activeDest.name}
              </motion.h1>
            </AnimatePresence>
            <motion.p
              key={activeDest.id + "desc"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 font-serif text-lg italic text-neutral-300 md:text-xl lg:max-w-2xl"
            >
              "{activeDest.tagline}"
            </motion.p>
          </div>

          <div className="mt-8 shrink-0 lg:mt-0 lg:pb-4 text-left lg:text-right">
            <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase block">
              MINIMUM BESPOKE OUTLAY
            </span>
            <span className="font-sans text-3xl font-extrabold text-[#E6C687] md:text-5xl block mt-1">
              ${activeDest.basePrice.toLocaleString()} <span className="text-xs font-mono font-normal text-neutral-400">USD</span>
            </span>
            <button
              onClick={() => {
                const formEl = document.getElementById("booking-form");
                if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="group/btn mt-3 inline-flex items-center gap-2 rounded-full bg-[#E6C687] px-6 py-2.5 text-xs font-bold tracking-widest text-black transition-all hover:bg-white active:scale-95 cursor-pointer"
            >
              <span>INITIATE VOYAGE</span>
              <ChevronRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Scroll Journey Indicator */}
        <div className="mt-12 flex items-center justify-between">
          <div className="flex gap-2">
            {DESTINATIONS.map((d) => (
              <button
                key={d.id}
                onClick={() => onSelectDestination(d.id)}
                className={`flex items-center gap-2 rounded-full border px-5 py-2 transition-all duration-300 text-xs font-mono ${
                  d.id === selectedId
                    ? "bg-[#E6C687] text-black border-[#E6C687]"
                    : "border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                <span>{d.name.split(" ")[0].toUpperCase()}</span>
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2 text-neutral-500 animate-bounce md:flex">
            <span className="font-mono text-[9px] tracking-widest">SCROLL DOCUMENTARY</span>
            <ArrowDown size={11} className="text-amber-500" />
          </div>
        </div>

        {/* Dynamic highlights list & Scenic description cards */}
        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Highlights Checklist */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 backdrop-blur-md">
              <span className="font-mono text-[10px] tracking-[0.3em] text-amber-500 uppercase block mb-4">
                CURATED HIGHLIGHTS
              </span>
              <ul className="flex flex-col gap-4">
                {activeDest.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/10 font-mono text-[9px] text-[#E6C687] border border-amber-500/20">
                      {i + 1}
                    </span>
                    <span className="font-sans text-xs text-neutral-300 leading-relaxed">
                      {h}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 border-t border-neutral-800 pt-4 flex justify-between items-center text-[10px] font-mono text-neutral-500">
                <span>BEST VISITATION:</span>
                <span className="text-[#E6C687] font-semibold">{activeDest.bestTime}</span>
              </div>
            </div>
          </div>

          {/* Interactive magnetic destination cards */}
          <div className="lg:col-span-8 flex flex-col justify-end">
            <span className="font-mono text-[10px] tracking-[0.4em] text-neutral-500 uppercase block mb-4">
              GLIDE OVER BESPOKE SANCTUARIES
            </span>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              {DESTINATIONS.map((d) => (
                <div
                  key={d.id}
                  onMouseMove={(e) => handleCardMouseMove(e, d.id)}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => onSelectDestination(d.id)}
                  className={`group relative h-80 overflow-hidden rounded-2xl border bg-neutral-900 shadow-xl transition-all duration-300 ease-out cursor-pointer ${
                    d.id === selectedId
                      ? "border-amber-400Ring border-amber-400"
                      : "border-neutral-800 hover:border-amber-400/50"
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Glossy reflective shine layer */}
                  <div className="magnetic-shine pointer-events-none absolute h-24 w-24 rounded-full bg-white/25 blur-xl opacity-0 transition-opacity duration-300" />
                  
                  {/* Background Image scale hover */}
                  <img
                    src={d.imageUrl}
                    alt={d.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 brightness-[0.4] group-hover:brightness-[0.55]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Coordinates indicator */}
                  <div className="absolute top-4 left-4 font-mono text-[8px] tracking-widest text-[#E6C687]/70">
                    {d.coordinates.split(" ")[0]}
                  </div>

                  {/* Gradient bottom fog */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Bottom details content */}
                  <div className="absolute inset-x-4 bottom-4 flex flex-col">
                    <span className="font-mono text-[8px] tracking-widest text-amber-500">
                      {d.region.split(",")[1]?.trim().toUpperCase() || "BESPOKE"}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                      {d.name}
                    </h3>
                    <p className="font-sans text-[10px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {d.tagline}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-mono text-[9px] text-[#E6C687]">${d.basePrice.toLocaleString()} USD</span>
                      <ChevronRight size={12} className="text-amber-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
