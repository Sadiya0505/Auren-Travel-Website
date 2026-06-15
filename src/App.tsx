import { useState, useEffect, useRef } from "react";
import WebGLCanvas from "./components/WebGLCanvas";
import Navbar from "./components/Navbar";
import DestinationShowcase from "./components/DestinationShowcase";
import PackagesCMS from "./components/PackagesCMS";
import StatsSection from "./components/StatsSection";
import JournalSection from "./components/JournalSection";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import AudioController from "./components/AudioController";
import { Compass, Volume2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeDestinationId, setActiveDestinationId] = useState("amalfi-cliffs");

  // Booking pre-fills
  const [bookingPackageId, setBookingPackageId] = useState("");
  const [bookingPrefilledPrice, setBookingPrefilledPrice] = useState(0);
  const [bookingPrefilledGuestCount, setBookingPrefilledGuestCount] = useState(2);
  const [bookingPrefilledUpgrades, setBookingPrefilledUpgrades] = useState<string[]>([]);

  // Setup GSAP and Custom Cursor tracking
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorHovered, setCursorHovered] = useState(false);

  useEffect(() => {
    // 1. Sleek Custom Cursor tracker
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = cursorRef.current;
      if (!cursor) return;
      
      // Fluid coordinates
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.classList.contains("interactive-element") ||
          target.onclick)
      ) {
        setCursorHovered(true);
      } else {
        setCursorHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleHoverStart);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleHoverStart);
    };
  }, []);

  // Set up Awwwards style GSAP scroll animations
  useEffect(() => {
    // Safely load GSAP from our installed packages
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Immersive staggered smooth scroll triggers for section title blocks
        const sections = [
          "#destinations-showcase",
          "#packages-cms",
          "#stats-section",
          "#journal-section",
          "#booking-form",
        ];

        sections.forEach((sectionId) => {
          gsap.fromTo(
            `${sectionId} .max-w-3xl, ${sectionId} .max-w-xl, ${sectionId} .max-w-2xl`,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionId,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    });
  }, []);

  // Pre-fill coordinates from Packages section down to Guest Booking ticket
  const handleSelectPackageForBooking = (
    packageId: string,
    totalPrice: number,
    guestCount: number,
    upgradeIds: string[]
  ) => {
    setBookingPackageId(packageId);
    setBookingPrefilledPrice(totalPrice);
    setBookingPrefilledGuestCount(guestCount);
    setBookingPrefilledUpgrades(upgradeIds);
  };

  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="auren-root-application" className="relative min-h-screen bg-[#060606] text-white overflow-x-hidden selection:bg-[#E6C687] selection:text-black">
      
      {/* Pristine Awwwards Custom Pointer Cursor circles */}
      <div
        ref={cursorRef}
        id="custom-luxury-cursor"
        className={`pointer-events-none fixed z-50 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-500/50 bg-[#E6C687]/5 mix-blend-difference transition-all duration-300 ease-out hidden md:block ${
          cursorHovered ? "h-14 w-14 bg-[#E6C687]/15 border-amber-400 rotate-45 scale-110" : ""
        }`}
      />

      {/* Real-time WebGL liquid canvas rendering with synchronized destination colors */}
      <WebGLCanvas activeDestinationId={activeDestinationId} />

      {/* Brand header & Navigation drawer */}
      <Navbar onNavigate={handleNavigateToSection} activeDestinationId={activeDestinationId} />

      {/* Cinematic destinations slide arenas (Hero) */}
      <DestinationShowcase
        selectedId={activeDestinationId}
        onSelectDestination={setActiveDestinationId}
      />

      {/* Customizable Packages statement dashboard */}
      <PackagesCMS
        activeDestinationId={activeDestinationId}
        onSelectPackageForBooking={handleSelectPackageForBooking}
      />

      {/* Bento analytics, Parallax backdrop, and Guest reviews */}
      <StatsSection />

      {/* Chronicles Travel journal */}
      <JournalSection />

      {/* Glassmorphism private ticket booking desk */}
      <BookingForm
        activeDestinationId={activeDestinationId}
        prefilledPrice={bookingPrefilledPrice}
        prefilledGuestCount={bookingPrefilledGuestCount}
        prefilledUpgrades={bookingPrefilledUpgrades}
      />

      {/* Footer coordination systems */}
      <Footer />

      {/* Audio luxury synth triggers */}
      <AudioController />

    </div>
  );
}
