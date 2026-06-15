import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientOscillators = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);
  const masterGain = useRef<GainNode | null>(null);

  // Initialize Audio Context lazily on user action
  const initAudio = () => {
    if (audioContextRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0, ctx.currentTime);
      master.connect(ctx.destination);
      masterGain.current = master;

      // Create warm luxury resort soundscape (3 gentle sine waves creating a rich Major 9th chord)
      const freqs = [110, 165, 220, 275, 330]; // A2, E3, A3, C#4, E4
      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Slow frequency modulation for organic ocean-like sway
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.05 + index * 0.02, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        // Soft individual volume
        gainNode.gain.setValueAtTime(0.04 / freqs.length, ctx.currentTime);

        osc.connect(gainNode);
        gainNode.connect(master);
        osc.start();

        ambientOscillators.current.push({ osc, gain: gainNode });
      });

      // Add high-cut filter for premium velvet feeling
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      master.connect(filter);
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  };

  const toggleSound = () => {
    initAudio();
    const ctx = audioContextRef.current;
    const master = masterGain.current;

    if (!ctx || !master) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    if (isPlaying) {
      // Fade out
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      setIsPlaying(false);
    } else {
      // Fade in to very gentle level
      master.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.2);
      setIsPlaying(true);
    }
  };

  // Sound cue for button hover (Micro wooden clicks)
  const triggerTick = () => {
    const ctx = audioContextRef.current;
    if (!ctx || !isPlaying || ctx.state === "suspended") return;

    try {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.02);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1000, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.012, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {}
  };

  useEffect(() => {
    const handleGlobalHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.classList.contains("interactive-element"))
      ) {
        triggerTick();
      }
    };

    window.addEventListener("mouseover", handleGlobalHover);
    return () => {
      window.removeEventListener("mouseover", handleGlobalHover);
      // Clean up sound context
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {}
      }
    };
  }, [isPlaying]);

  return (
    <button
      id="ambient-sound-toggle"
      onClick={toggleSound}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2 rounded-full border border-amber-500/30 bg-neutral-900/80 px-4 py-2.5 font-mono text-xs tracking-widest text-[#E6C687] shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-amber-400 active:scale-95"
      aria-label="Toggle ambient luxury soundscape"
    >
      <span className="relative flex h-2 w-2">
        {isPlaying && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${isPlaying ? "bg-amber-400" : "bg-neutral-600"}`}></span>
      </span>
      <span className="uppercase text-[10px]">
        {isPlaying ? "AUREN SOUNDSCAPES ACTIVE" : "PLAY RESORT CHORDS"}
      </span>
      {isPlaying ? <Volume2 size={13} className="text-amber-400" /> : <VolumeX size={13} className="text-neutral-400" />}
    </button>
  );
}
