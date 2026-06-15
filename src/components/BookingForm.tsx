import React, { useState, useEffect } from "react";
import { DESTINATIONS, PACKAGES } from "../data/cms";
import { Booking } from "../types";
import { Shield, Sparkles, Send, MapPin, Calendar, Users, Award, Printer, Download, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "motion/react";

interface BookingFormProps {
  activeDestinationId: string;
  prefilledPrice: number;
  prefilledGuestCount: number;
  prefilledUpgrades: string[];
}

export default function BookingForm({
  activeDestinationId,
  prefilledPrice,
  prefilledGuestCount,
  prefilledUpgrades,
}: BookingFormProps) {
  // Define local state
  const [destinationId, setDestinationId] = useState(activeDestinationId);
  const [tier, setTier] = useState<"Elite" | "Royal Oasis" | "Imperial Reserve">("Elite");
  const [guestCount, setGuestCount] = useState(2);
  const [startDate, setStartDate] = useState("");
  const [billingName, setBillingName] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<Booking | null>(null);
  const [ticketNumber, setTicketNumber] = useState("");

  // Synchronize with parent pre-fills
  useEffect(() => {
    setDestinationId(activeDestinationId);
  }, [activeDestinationId]);

  useEffect(() => {
    if (prefilledGuestCount > 0) {
      setGuestCount(prefilledGuestCount);
    }
    if (prefilledUpgrades.length > 0) {
      setSelectedUpgrades(prefilledUpgrades);
    }
  }, [prefilledGuestCount, prefilledUpgrades]);

  const activeDest = DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0];
  const activePackage = PACKAGES.find((p) => p.destinationId === destinationId) || PACKAGES[0];

  // Calculate dynamic pricing
  const calculateTotal = () => {
    const baseCost = activePackage.basePricePerPerson * guestCount;
    const upgradeCost = activePackage.exclusiveUpgrades
      .filter((u) => selectedUpgrades.includes(u.id))
      .reduce((acc, u) => acc + u.price, 0);

    // Apply Tier Multipliers
    let multiplier = 1.0;
    if (tier === "Royal Oasis") multiplier = 1.25;
    if (tier === "Imperial Reserve") multiplier = 1.5;

    return Math.round((baseCost + upgradeCost) * multiplier);
  };

  const handleUpgradeToggle = (id: string) => {
    if (selectedUpgrades.includes(id)) {
      setSelectedUpgrades(selectedUpgrades.filter((uid) => uid !== id));
    } else {
      setSelectedUpgrades([...selectedUpgrades, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billingName || !billingEmail || !startDate) {
      alert("Please fill in all elite communication fields to initiate authorization.");
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury server processing (checking yacht availability, etc.)
    setTimeout(() => {
      const finalPrice = calculateTotal();
      const confirmedObj: Booking = {
        destinationId,
        packageId: activePackage.id,
        guestCount,
        startDate,
        tier,
        upgradesSelected: selectedUpgrades,
        billingName,
        billingEmail,
        specialRequests,
        totalComputedPrice: finalPrice,
      };

      // Generate pristine booking reference code
      const randNum = Math.floor(100000 + Math.random() * 900000).toString();
      setTicketNumber(`AUR-${activeDest.airportCode}-${randNum}`);

      setBookingConfirmed(confirmedObj);
      setIsSubmitting(false);

      // Trigger spectacular custom golden star burst celebration
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#E6C687", "#D97706", "#FFFBEB", "#FFFFFF"],
      });
    }, 1800);
  };

  const resetForm = () => {
    setBookingConfirmed(null);
    setBillingName("");
    setBillingEmail("");
    setSpecialRequests("");
    setStartDate("");
  };

  return (
    <section id="booking-form" className="relative w-full bg-neutral-950 py-24 text-white">
      
      {/* Background vector star glow */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#E6C687]/5 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Form Description & Philosophies */}
          <div className="lg:col-span-4 flex flex-col justify-center gap-6">
            <span className="font-mono text-xs tracking-[0.4em] text-amber-500 uppercase block">
              SECURE CONCIERGE CHANNEL
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white md:text-5xl">
              Arrange Your Sanctuary
            </h2>
            <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
              By submitting this secure portal, your account is queued directly for Auren's executive concierge review. A private charter operator and estate butler will reach out via high-priority secure communication channels within 1 hour.
            </p>

            <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/10 p-5 backdrop-blur-sm flex flex-col gap-4">
              <div className="flex gap-3 leading-relaxed">
                <Shield size={16} className="text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider text-white">MILITARY GRADE SHIELDING</h4>
                  <p className="font-sans text-[11px] text-neutral-400 mt-0.5">Your luxury coordinates & financial statements are encrypted using TLS 1.3 standard keys.</p>
                </div>
              </div>
              <div className="flex gap-3 leading-relaxed border-t border-neutral-800/60 pt-4">
                <Award size={16} className="text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider text-white">UNRIVALED ASSURANCE</h4>
                  <p className="font-sans text-[11px] text-neutral-400 mt-0.5">Complimentary flight re-routing, 100% deposit protections, and 24/7 dedicated satellite health assistance.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Interactive Body / Success Pass */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!bookingConfirmed ? (
                // Glassmorphism Booking Form
                <motion.form
                  key="booking-form-element"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  onSubmit={handleSubmit}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl md:p-10"
                >
                  <span className="font-mono text-[10px] tracking-[0.4em] text-amber-500/80 uppercase block">
                    SECURE CONCIERGE APPLICATION Form 104-E
                  </span>
                  
                  {/* Form Main Inputs */}
                  <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    
                    {/* Destination Selection */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                        CHOOSE DESIRED CITADEL
                      </label>
                      <select
                        value={destinationId}
                        onChange={(e) => setDestinationId(e.target.value)}
                        className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3 font-serif text-[#E6C687] focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold"
                      >
                        {DESTINATIONS.map((d) => (
                          <option key={d.id} value={d.id} className="bg-neutral-900 text-white">
                            {d.name} ({d.region.split(",")[0]})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Booking Tier Switcher */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                        PRIVILEGE RESIDENCY TIER
                      </label>
                      <select
                        value={tier}
                        onChange={(e) => setTier(e.target.value as any)}
                        className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3 font-serif text-[#E6C687] focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold"
                      >
                        <option value="Elite" className="bg-neutral-900 text-white">Elite Reserve (Base Price)</option>
                        <option value="Royal Oasis" className="bg-neutral-900 text-white">Royal Oasis (+25% multiplier)</option>
                        <option value="Imperial Reserve" className="bg-neutral-900 text-white">Imperial Reserve (+50% premium)</option>
                      </select>
                    </div>

                    {/* Check In Date calendar picker */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase flex items-center gap-1">
                        <Calendar size={11} className="text-amber-400" />
                        ARRIVAL DEPARTURE SECURE DATE
                      </label>
                      <input
                        type="date"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3 font-mono text-neutral-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    {/* Traveler / Guest size count */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase flex items-center gap-1">
                        <Users size={11} className="text-amber-400" />
                        GUESTS SIZE LIMIT (MAX 12)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={guestCount}
                        onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                        className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3 font-mono text-neutral-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                        PASSENGER PREFERRED FULL NAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Admiral Sterling"
                        value={billingName}
                        onChange={(e) => setBillingName(e.target.value)}
                        className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3 font-sans text-neutral-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    {/* SECURE EMAIL */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                        SECURE COMMUNICATION EMAIL CAPABLE
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vip@domain.com"
                        value={billingEmail}
                        onChange={(e) => setBillingEmail(e.target.value)}
                        className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3 font-mono text-neutral-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                  </div>

                  {/* Upgrades Select ticks nested inside form */}
                  <div className="mt-8">
                    <label className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase block mb-3">
                      TICK TO ACTIVATE OPTIONAL ADDITIONAL PRIVILEGES
                    </label>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                      {activePackage.exclusiveUpgrades.map((upgrade) => {
                        const hasSelected = selectedUpgrades.includes(upgrade.id);
                        return (
                          <button
                            key={upgrade.id}
                            type="button"
                            onClick={() => handleUpgradeToggle(upgrade.id)}
                            className={`flex items-center gap-2 p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                              hasSelected
                                ? "bg-amber-400/10 border-amber-500/50"
                                : "bg-[#0c0c0c] border-neutral-850 hover:border-neutral-700"
                            }`}
                          >
                            <span className={`h-3 w-3 shrink-0 rounded-sm border ${hasSelected ? "bg-amber-400 border-amber-400" : "border-neutral-700"}`} />
                            <div className="truncate">
                              <span className="block font-serif text-[11px] font-bold text-white leading-none truncate">
                                {upgrade.name}
                              </span>
                              <span className="font-mono text-[9px] text-[#E6C687] mt-0.5 block">
                                +${upgrade.price.toLocaleString()}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Special requests comments */}
                  <div className="mt-6 flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                      DIETARY, PILOT TRANSFERS, OR SPECIAL REQUESTS
                    </label>
                    <textarea
                      rows={3}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Specify customized champagne selections, yacht dietary provisions, heli takeoff constraints..."
                      className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3 font-sans text-neutral-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {/* Live Quote Calculator footer indicator */}
                  <div className="mt-8 border-t border-neutral-800/80 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase block">
                        ESTIMATED TOTAL OUTLAY
                      </span>
                      <span className="font-mono text-[24px] font-extrabold text-[#E6C687]">
                        ${calculateTotal().toLocaleString()} <span className="font-normal text-xs text-neutral-400">USD</span>
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex items-center justify-center gap-2 bg-[#E6C687] border border-amber-500 text-black font-bold uppercase tracking-[0.25em] text-[11px] px-8 py-4 rounded-xl disabled:opacity-50 transition-all hover:bg-white hover:border-white active:scale-95 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-transparent" />
                          <span>AUTHORIZING ESCROW...</span>
                        </>
                      ) : (
                        <>
                          <Send size={12} className="group-hover:translate-x-1 transition-transform" />
                          <span>SUBMIT SECURE REQUEST</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                // Cinematic boarding pass confirmation card
                <motion.div
                  key="boarding-pass-confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-3xl border border-amber-400/30 bg-neutral-900/50 p-6 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden"
                >
                  {/* Decorative stamp element */}
                  <div className="absolute right-6 top-6 flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-amber-500/20 text-amber-400/10 font-mono text-[10px] tracking-widest rotate-12 pointer-events-none uppercase text-center font-bold">
                    AUREN<br />APPROVED
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 font-mono text-xs">
                      ✓
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-[#E6C687]">
                      SANCTUARY RESERVATION SECURED
                    </span>
                  </div>

                  <div className="mt-6 border-b border-neutral-800 pb-5">
                    <h3 className="font-serif text-3xl font-bold text-white">
                      The Invitation Awaits, {bookingConfirmed.billingName}
                    </h3>
                    <p className="mt-2 font-sans text-xs text-neutral-400 leading-relaxed font-light">
                      Your high-priority request has passed security gating. A personal estate manager has reserved your wooden Riva and private dome accommodations. Below is your bespoke invitational boarding pass code.
                    </p>
                  </div>

                  {/* Physical Boarding Pass style ticket */}
                  <div className="mt-8 rounded-2xl border border-amber-400/20 bg-neutral-950 p-5 md:p-8 font-mono relative">
                    {/* Gold bar decoration */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E6C687] rounded-t-2xl" />

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-neutral-800 pb-5">
                      <div>
                        <span className="text-[9px] text-neutral-500 block">PRIVATE BOARDING REFERENCE</span>
                        <span className="text-lg font-bold text-[#E6C687] tracking-wider">{ticketNumber}</span>
                      </div>
                      <div className="md:text-right">
                        <span className="text-[9px] text-neutral-500 block">VIP ENCLOSURE STATUS</span>
                        <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                          {bookingConfirmed.tier} LEVEL RESERVED
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 py-5 border-b border-neutral-800">
                      <div>
                        <span className="text-[9px] text-neutral-500 block">PRIMARY DESTINATION</span>
                        <span className="text-xs text-white uppercase font-bold">{activeDest.name}</span>
                        <span className="text-[9px] text-[#E6C687] block mt-0.5">{activeDest.region}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-neutral-500 block">CHECK-IN INITIATE</span>
                        <span className="text-xs text-white font-bold">{bookingConfirmed.startDate}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-neutral-500 block">TRAVEL PARTY GROUP</span>
                        <span className="text-xs text-white font-bold">{bookingConfirmed.guestCount} Elite Guests</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-neutral-500 block">TOTAL SECURITY DEPOSIT</span>
                        <span className="text-xs text-amber-400 font-extrabold">
                          ${bookingConfirmed.totalComputedPrice.toLocaleString()} USD
                        </span>
                      </div>
                    </div>

                    <div className="pt-5 flex items-center justify-between text-[10px] text-neutral-500">
                      <span>STAMP COORD: {activeDest.coordinates}</span>
                      <div className="flex items-center gap-1 text-[#E6C687]">
                        <Star size={10} className="fill-amber-400" />
                        <span>Timeless</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="mt-8 flex flex-wrap gap-4 items-center justify-between font-mono text-[10px]">
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-2 rounded-lg border border-neutral-800 px-4 py-2.5 text-neutral-400 hover:text-white hover:border-neutral-600 transition-all cursor-pointer"
                    >
                      <Printer size={12} />
                      <span>PRINT BESPOKE PASS</span>
                    </button>

                    <button
                      onClick={resetForm}
                      className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-400/5 px-6 py-2.5 text-[#E6C687] hover:bg-amber-400 hover:text-black transition-all cursor-pointer"
                    >
                      <span>PLAN ANOTHER VOYAGE</span>
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

    </section>
  );
}
