import React, { useState, useEffect } from "react";
import { Mail, ArrowRight, Github, Globe, MapPin, Compass } from "lucide-react";

export default function Footer() {
  const [subbed, setSubbed] = useState(false);
  const [email, setEmail] = useState("");
  const [clocks, setClocks] = useState({
    amalfi: "",
    kyoto: "",
    patagonia: "",
    sahara: "",
  });

  // Calculate coordinates timezones dynamically
  useEffect(() => {
    const updateTimezones = () => {
      const getZoneTime = (timeZone: string) => {
        return new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone,
        });
      };

      setClocks({
        amalfi: getZoneTime("Europe/Rome"),
        kyoto: getZoneTime("Asia/Tokyo"),
        patagonia: getZoneTime("America/Santiago"),
        sahara: getZoneTime("Africa/Casablanca"),
      });
    };

    updateTimezones();
    const interval = setInterval(updateTimezones, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubbed(true);
    setEmail("");
  };

  return (
    <footer id="auren-footer" className="relative w-full bg-[#050505] pt-24 pb-12 text-[#E6C687]/80 border-t border-neutral-900/60 overflow-hidden">
      
      {/* Footer Ambient Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/2 blur-[80px] h-96 w-96 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Top Segment: Brand & Newsletters */}
        <div className="grid grid-cols-1 gap-12 border-b border-neutral-900 pb-16 lg:grid-cols-12 lg:items-start">
          
          {/* Logo & Manifesto */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-1.5 font-sans text-xl font-extrabold tracking-[0.25em] text-[#E6C687] uppercase">
              <span>AUREN</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            </div>
            <p className="font-serif text-[13px] italic text-[#E6C687]/65 leading-relaxed max-w-sm">
              "We assemble experiences detached from the standard coordinates of commercial life. A sanctuary of silent bamboo, stone clifftops, and celestial desert pavilions."
            </p>
          </div>

          {/* Time Zone Telemetries Index (Live digital clocks for resorts!) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-neutral-950 p-3 flex flex-col gap-1 border border-neutral-900">
              <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest block">AMALFI CADENCE</span>
              <span className="font-mono text-xs font-bold text-white">{clocks.amalfi}</span>
              <span className="font-sans text-[9px] text-[#E6C687]/50 block mt-0.5">Rome, Italy</span>
            </div>
            <div className="rounded-xl bg-neutral-950 p-3 flex flex-col gap-1 border border-neutral-900">
              <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest block">KYOTO CADENCE</span>
              <span className="font-mono text-xs font-bold text-white">{clocks.kyoto}</span>
              <span className="font-sans text-[9px] text-[#E6C687]/50 block mt-0.5">Kyoto, Japan</span>
            </div>
            <div className="rounded-xl bg-neutral-950 p-3 flex flex-col gap-1 border border-neutral-900">
              <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest block">PATAGONIA CADENCE</span>
              <span className="font-mono text-xs font-bold text-white">{clocks.patagonia}</span>
              <span className="font-sans text-[9px] text-[#E6C687]/50 block mt-0.5">Santiago, Chile</span>
            </div>
            <div className="rounded-xl bg-neutral-950 p-3 flex flex-col gap-1 border border-neutral-900">
              <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest block">SAHARA CADENCE</span>
              <span className="font-mono text-xs font-bold text-white">{clocks.sahara}</span>
              <span className="font-sans text-[9px] text-[#E6C687]/50 block mt-0.5">Casablanca, Morocco</span>
            </div>
          </div>

          {/* Luxury Newsletter dispatch */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#E6C687] uppercase block font-semibold">
              JOIN THE SOVEREIGN GILD
            </span>
            <p className="font-sans text-[11px] text-neutral-400 max-w-xs leading-relaxed">
              Unlock dispatch logs, celestial astronomical updates, and invitations to new secret citadels.
            </p>

            {subbed ? (
              <span className="text-xs font-mono text-emerald-450 tracking-wider flex items-center gap-1.5">
                ✓ CREDENTIALS LOGGED FOR CORRESPONDENCE
              </span>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-sm rounded-lg border border-neutral-800 bg-neutral-950 p-1">
                <input
                  type="email"
                  required
                  placeholder="vip@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-3 text-xs text-white focus:outline-none focus:ring-0 font-mono"
                />
                <button
                  type="submit"
                  className="bg-[#E6C687] hover:bg-white text-black h-8 w-8 rounded flex items-center justify-center transition-all cursor-pointer"
                >
                  <ArrowRight size={13} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Segment: Trust badges, design copyright, and standards */}
        <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.2em] block">
              © {new Date().getFullYear()} AUREN LUXURY AG. ALL PRIVILEGES SECURED WORLDWIDE.
            </span>
            <span className="font-mono text-[8px] text-neutral-600 block">
              Designed under the Auren Resorts Collective standard. Powered by Google AI Studio.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[9px] tracking-widest text-[#E6C687] uppercase font-bold">
            <span className="flex items-center gap-1.5">
              <Globe size={11} className="text-amber-500 animate-spin-slow" />
              GLOBAL INGRESS CAPABLE
            </span>
            <span className="text-neutral-800">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin size={11} />
              COORDINATES SYSTEM ACTIVE
            </span>
          </div>
        </div>

      </div>

    </footer>
  );
}
