import { useState, useEffect } from "react";
import { PACKAGES, DESTINATIONS } from "../data/cms";
import { Sparkles, Calendar, Users, Ship, ShieldCheck, TicketCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface PackagesCMSProps {
  activeDestinationId: string;
  onSelectPackageForBooking: (packageId: string, basePrice: number, guestCount: number, upgradeIds: string[]) => void;
}

export default function PackagesCMS({ activeDestinationId, onSelectPackageForBooking }: PackagesCMSProps) {
  // Find package associated with destination
  const activePackage = PACKAGES.find((p) => p.destinationId === activeDestinationId) || PACKAGES[0];
  const activeDest = DESTINATIONS.find((d) => d.id === activeDestinationId) || DESTINATIONS[0];

  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Re-calculate price on dependencies change, reset selected upgrades when package shifts
  useEffect(() => {
    setSelectedUpgrades([]);
  }, [activeDestinationId]);

  useEffect(() => {
    const baseCost = activePackage.basePricePerPerson * guestCount;
    const upgradeCost = activePackage.exclusiveUpgrades
      .filter((u) => selectedUpgrades.includes(u.id))
      .reduce((acc, u) => acc + u.price, 0);

    setTotalPrice(baseCost + upgradeCost);
  }, [activePackage, guestCount, selectedUpgrades]);

  const toggleUpgrade = (id: string) => {
    if (selectedUpgrades.includes(id)) {
      setSelectedUpgrades(selectedUpgrades.filter((uid) => uid !== id));
    } else {
      setSelectedUpgrades([...selectedUpgrades, id]);
    }
  };

  const handleExportToBooking = () => {
    onSelectPackageForBooking(activePackage.id, totalPrice, guestCount, selectedUpgrades);
    
    // Smooth scroll down to the booking form
    const bookingFormEl = document.getElementById("booking-form");
    if (bookingFormEl) {
      bookingFormEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="packages-cms" className="relative w-full bg-[#0a0a0a] py-24 text-white border-t border-neutral-900">
      
      {/* Decorative luxury vector lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "radial-gradient(ellipse at center, #E6C687 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Header story block */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs tracking-[0.4em] text-amber-500 uppercase">
            EXCLUSIVE PRIVILEGES & ACCOMMODATIONS
          </span>
          <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight text-white md:text-5xl">
            Curated Grand Itineraries
          </h2>
          <p className="mt-4 font-sans text-neutral-400">
            Every package is hand-woven by Auren Concierge experts, incorporating five-star private estate residences, private yacht escorts, custom dietary menus, and deep historical local integration. Let us build your sanctuary details.
          </p>
        </div>

        {/* CMS Package Grid */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Package Details Panel */}
          <div className="lg:col-span-7">
            <div className="group relative rounded-2xl border border-neutral-800/80 bg-neutral-900/20 p-6 md:p-8 backdrop-blur-md">
              
              {/* Luxury Ribbon header */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 font-mono text-[9px] tracking-widest text-[#E6C687] border border-amber-500/20">
                  <Sparkles size={10} className="text-amber-400 animate-pulse" />
                  {activePackage.pricingTier.toUpperCase()} RESERVE STATUS
                </span>
                <span className="flex items-center gap-1 text-xs text-neutral-400 font-mono">
                  <Calendar size={13} className="text-amber-400" />
                  {activePackage.duration}
                </span>
              </div>

              <h3 className="mt-4 font-serif text-2xl font-bold text-white md:text-3xl">
                {activePackage.title}
              </h3>
              <p className="mt-3 font-sans text-xs text-neutral-400 leading-relaxed">
                {activePackage.description}
              </p>

              {/* Included Luxury list */}
              <div className="mt-8">
                <h4 className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
                  COMPLIMENTARY ELITE ENCLOSURES
                </h4>
                <ul className="mt-3 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {activePackage.includedLuxuryServices.map((service, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <CheckCircle2 size={13} className="text-amber-400 mt-0.5 shrink-0" />
                      <span className="font-sans text-xs text-neutral-300 leading-relaxed font-light">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bespoke Upgrades Selector */}
              <div className="mt-8 border-t border-neutral-800/80 pt-6">
                <h4 className="font-mono text-[10px] tracking-[0.25em] text-[#E6C687] uppercase flex items-center gap-1">
                  <Ship size={11} className="text-amber-400 animate-bounce" />
                  AVAILABLE BESPOKE SPECIAL EXCLUSIVES
                </h4>
                <div className="mt-4 flex flex-col gap-3">
                  {activePackage.exclusiveUpgrades.map((upgrade) => {
                    const isSelected = selectedUpgrades.includes(upgrade.id);
                    return (
                      <button
                        key={upgrade.id}
                        onClick={() => toggleUpgrade(upgrade.id)}
                        className={`flex flex-col text-left rounded-xl p-3.5 border transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-[#E6C687]/10 border-amber-400/60 ring-1 ring-amber-400/20"
                            : "bg-neutral-900/60 border-neutral-800/80 hover:border-amber-500/30 hover:bg-neutral-900/90"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-[13px] font-bold text-white">
                            {upgrade.name}
                          </span>
                          <span className="font-mono text-xs text-amber-400 font-semibold">
                            +${upgrade.price.toLocaleString()} USD
                          </span>
                        </div>
                        <p className="mt-1 font-sans text-[11px] text-neutral-400 line-clamp-1 leading-relaxed">
                          {upgrade.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Pricing Summary Side Dashboard */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 backdrop-blur-md flex flex-col justify-between h-full">
              
              <div>
                <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-500 uppercase block mb-4">
                  VOYAGE STATEMENT & BREAKDOWN
                </span>

                <div className="flex flex-col gap-4 border-b border-neutral-800 pb-6">
                  {/* Dest Title */}
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-xs text-neutral-400">Selected Estate:</span>
                    <span className="font-serif text-sm font-bold text-[#E6C687]">{activeDest.name}</span>
                  </div>

                  {/* Base rate label */}
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-xs text-neutral-400">Base Rate per Traveler:</span>
                    <span className="font-mono text-xs font-semibold text-neutral-300">
                      ${activePackage.basePricePerPerson.toLocaleString()} USD
                    </span>
                  </div>

                  {/* Interactive travelers tally */}
                  <div className="flex justify-between items-center bg-neutral-950/80 p-3 rounded-lg border border-neutral-800/80">
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400 tracking-wider">
                      <Users size={12} className="text-amber-400" />
                      GUEST ENCLOSURE SIZE:
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 text-[#E6C687] hover:bg-neutral-700 font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="font-mono text-sm font-extrabold text-white">{guestCount}</span>
                      <button
                        onClick={() => setGuestCount(Math.min(12, guestCount + 1))}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 text-[#E6C687] hover:bg-neutral-700 font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Selected extras summary tally */}
                <div className="mt-6">
                  <span className="font-mono text-[8px] tracking-widest text-[#E6C687] uppercase block mb-2">
                    BESPOKE SELECTED EXTRAS
                  </span>
                  {selectedUpgrades.length === 0 ? (
                    <span className="font-sans text-[11px] text-neutral-500 italic block">
                      No custom transport, masterclass, or charters selected. Tap premium extras left to add.
                    </span>
                  ) : (
                    <div className="flex flex-col gap-2 max-h-24 overflow-y-auto pr-1">
                      {activePackage.exclusiveUpgrades
                        .filter((u) => selectedUpgrades.includes(u.id))
                        .map((upgrade) => (
                          <div key={upgrade.id} className="flex justify-between items-center text-[10px] font-mono text-neutral-400 bg-neutral-950/40 p-2 rounded border border-neutral-850">
                            <span className="truncate max-w-[200px]">{upgrade.name}</span>
                            <span className="text-[#E6C687]">${upgrade.price.toLocaleString()}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Grand Total output with CTA */}
              <div className="mt-8 border-t border-neutral-800 pt-6">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-neutral-500 block uppercase">
                      GRAND QUOTE EST.
                    </span>
                    <span className="font-mono text-xs text-neutral-400">All fees & tax included</span>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-3xl font-extrabold text-amber-400 md:text-4xl block">
                      ${totalPrice.toLocaleString()}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400 font-semibold block uppercase">
                      USD TOTAL
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleExportToBooking}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500 bg-amber-400 py-3.5 text-xs font-bold tracking-[0.2em] text-black transition-all hover:bg-white hover:border-white active:scale-95 cursor-pointer"
                >
                  <TicketCheck size={14} className="animate-pulse" />
                  <span>PREFILL TICKET BOARDING</span>
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
