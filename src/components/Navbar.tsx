import { useState, useEffect } from "react";
import { Menu, X, Compass, Globe, MapPin, Anchor, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeDestinationId: string;
}

export default function Navbar({ onNavigate, activeDestinationId }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Keep a live elegant digital clock ticking representing Auren's primary base (UTC & Luxury Standard)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "UTC",
        }) + " UTC"
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = (sectionId: string) => {
    setIsOpen(false);
    onNavigate(sectionId);
  };

  const navLinks = [
    { name: "EXPEDITIONS", id: "destinations-showcase" },
    { name: "CURATED PRIVILEGES", id: "packages-cms" },
    { name: "MANOR STORIES", id: "stats-section" },
    { name: "COSMOS JOURNAL", id: "journal-section" },
    { name: "RESERVE VOYAGE", id: "booking-form" },
  ];

  return (
    <>
      <nav
        id="auren-navbar"
        className={`fixed top-0 left-0 z-40 w-full px-6 py-4 transition-all duration-500 md:px-12 ${
          scrolled ? "bg-neutral-950/80 shadow-2xl backdrop-blur-md border-b border-amber-500/10" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          {/* Brand Logo - Elite Space Grotesk elegant wordmark */}
          <button
            onClick={() => handleMenuClick("destinations-showcase")}
            className="group relative flex items-center gap-1.5 font-sans text-xl font-bold tracking-[0.25em] text-[#E6C687] cursor-pointer"
          >
            <span className="text-[22px] transition-all duration-500 group-hover:tracking-[0.4em]">AUREN</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
          </button>

          {/* Center Links - Timeless Desktop layout */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="group relative cursor-pointer py-2 text-[11px] font-medium tracking-[0.2em] text-[#E6C687]/75 transition-all hover:text-[#E6C687]"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#E6C687] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-4">
            <div className="hidden font-mono text-[10px] tracking-widest text-[#E6C687]/40 md:block">
              {currentTime}
            </div>

            <button
              onClick={() => onNavigate("booking-form")}
              className="group hidden items-center gap-2 rounded-full border border-amber-500/40 bg-amber-400/5 px-5 py-2 text-[10px] font-semibold tracking-widest text-[#E6C687] transition-all hover:bg-amber-400 hover:text-black hover:border-amber-400 lg:flex cursor-pointer"
            >
              <Compass size={12} className="animate-spin-slow" />
              <span>BESPOKE CONCIERGE</span>
            </button>

            {/* Menu Toggle Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/20 bg-neutral-900/65 text-[#E6C687] transition-all hover:border-[#E6C687] cursor-pointer"
              aria-label="Open luxury menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen cinematic menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="cinematic-overlay-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-30 flex flex-col bg-neutral-950/98 pt-24 backdrop-blur-2xl"
          >
            {/* Ambient luxury geometry backdrops */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 rounded-full bg-amber-400/5 blur-[120px] h-96 w-96 pointer-events-none" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-6 pb-12 md:px-12 md:pb-16 lg:flex-row lg:items-center">
              
              {/* Massive Elegant Menu Options (Staggered Animation) */}
              <div className="flex flex-col gap-4 lg:gap-6">
                <span className="font-mono text-[9px] tracking-[0.4em] text-amber-500/40 uppercase">
                  JOURNEY PORTALS
                </span>
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
                    onClick={() => handleMenuClick(link.id)}
                    className="group relative flex items-baseline gap-4 text-left cursor-pointer"
                  >
                    <span className="font-mono text-sm text-amber-500/30">0{index + 1}</span>
                    <span className="font-sans text-3xl font-extrabold tracking-[0.1em] text-neutral-300 transition-all duration-300 group-hover:translate-x-4 group-hover:text-[#E6C687] md:text-5xl lg:text-6xl">
                      {link.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Curated Editorial Info sidebar inside Menu */}
              <div className="mt-8 flex flex-col gap-6 border-t border-neutral-800 pt-8 lg:mt-0 lg:max-w-md lg:border-t-0 lg:pt-0">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-widest text-[#E6C687]/50">
                    AUREN HEADQUARTERS
                  </span>
                  <p className="font-sans text-sm font-medium text-neutral-400">
                    Mayfair Estate, London & Saint-Tropez Coastal Dock
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 rounded-lg bg-neutral-900/40 p-3 border border-neutral-800/80">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#E6C687]">
                      <Globe size={11} className="text-amber-400 animate-spin-slow" />
                      COORDINATE INDEX
                    </div>
                    <span className="font-mono text-[11px] text-neutral-400">
                      43°43'21\"N, 7°18'41\"E
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 rounded-lg bg-neutral-900/40 p-3 border border-neutral-800/80">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#E6C687]">
                      <ShieldCheck size={11} className="text-emerald-400" />
                      PRIVACY STANDARD
                    </div>
                    <span className="font-mono text-[11px] text-emerald-400">
                      Elite Enclosure 100%
                    </span>
                  </div>
                </div>

                <div className="rounded-lg border border-amber-500/20 bg-amber-400/5 p-4 text-center">
                  <p className="font-serif text-sm italic text-[#E6C687]">
                    \"Travel not to witness, but to transcend reality.\"
                  </p>
                  <span className="mt-1 block font-mono text-[9px] tracking-widest text-neutral-500 uppercase">
                    - Auren Philosophy Core
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
