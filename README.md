# Auren Luxury Travel (Auren Resorts)

An award-winning, highly cinematic, and deeply immersive luxury travel agency website inspired by the highest-tier digital showcases (*Auren Resorts*, *Apple*, *National Geographic*). Styled for high-resolution depth and bespoke sensory response.

## Key Experiential Features
- **Dynamic 3D WebGL Dune & Wave Engine**: An interactive, responsive WebGL plane utilizing advanced vertex waves and stardust particles to mimic golden sands, high mountain ranges, or deep emerald waters based on your active section.
- **GSAP ScrollTrigger Fluidity**: Staggered, scroll-bound transitions, parallax topography landscapes, and smooth component animations.
- **Velvety Soundscapes (Web Audio Synth)**: An organic, low-pass filtered major-9th drone using synthesized oscillators and microscopic button sound cue clicks.
- **Full-Screen Cinematic Navigation**: A fully layered, glassmorphic navigation hub complete with live coordinate indicators, privacy parameters, and an elegant digital clock synced with Greenwich Mean Time (UTC).
- **Glassmorphic Bespoke Concierge Desk**: Fully customizable and structured ticketing queue incorporating private jet charters, helicopter transfers, and custom Michelin gastronomics.
- **Bespoke CMS Architecture**: Robust, type-safe schema representing elite destinations (*Arashiyama*, *Patagonia*, *Sahara Dunes*, *Amalfi Coast*), custom packages, member reviews, and editorial journals.

---

## 🎨 Visual System & Identity

- **Palette**: Cosmic Charcoal (`#060606`, `#0a0a0a`), Velvet Luxury Gold (`#E6C687`), and Emerald/Rose highlights.
- **Typography Concept**: Classical serif display typography for grand titles, paired with high-density monospaced font sizes (`JetBrains Mono` / `Fira Code`) for structural coordinates, coordinates systems, and telemetry indicators.

---

## 🛠️ Stack & Technology

- **Framework**: React 19 (TypeScript)
- **Styling**: Tailwind CSS v4
- **Animation Layer**: Motion + GSAP (GreenSock Animation Platform) + Three.js (WebGL)
- **Sound System**: Web Audio API (Live synthesizer synthesis, no external static mp3 files required)
- **Persistance & Confetti**: Lightweight state + Canvas Confetti physical engine

---

## 🚀 Local Development

Follow these steps to run the application locally on your computer:

1. **Clone this repository**:
   ```bash
   git clone <your-repo-url>
   cd auren-luxury-travel
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Boot Development Server**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   ```

---

## 📤 Publishing to GitHub

To push this codebase to your own GitHub repository:

1. Initialize git if not already set up:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of Auren luxury experience"
   ```
2. Create a new repository on GitHub.
3. Link your local project to your new GitHub repository:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

*(Alternatively, you can use the built-in Export to GitHub options in your project interface to automate the repository setup.)*

## 📸 Capturing Screenshots or Video Demo
To capture high-fidelity screen recordings or screenshots of our design:
1. Open the application.
2. Press `F11` (or `Cmd+Ctrl+F` on macOS) to hide your browser tabs and enter immersive, full-screen mode.
3. Use standard recording software (such as OBS Studio, QuickTime, or Windows Game Bar) to capture the beautiful hover animations, smooth WebGL canvas transitions, and customized audio feedback as you scroll.
