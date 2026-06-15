import { useEffect, useRef } from "react";
import * as THREE from "three";

interface WebGLCanvasProps {
  activeDestinationId: string;
}

// Map destination IDs to distinct luxury light coordinates & colors
const COLOR_THEMES: Record<string, { primary: string; secondary: string; particles: string }> = {
  "amalfi-cliffs": {
    primary: "#059669", // Emerald seaglass
    secondary: "#D97706", // Sunburned bronze
    particles: "#CBD5E1", // Soft sea salt white
  },
  "kyoto-sanctuary": {
    primary: "#E11D48", // Cherry rose
    secondary: "#D97706", // Golden imperial maple
    particles: "#FFE4E6", // Kyoto blossom pink
  },
  "patagonia-wilderness": {
    primary: "#2563EB", // Glacial ice blue
    secondary: "#0F172A", // Dark Andean slate
    particles: "#E2E8F0", // Mountain snow dust
  },
  "sahara-oasis": {
    primary: "#EA580C", // Intense dune copper
    secondary: "#78350F", // Crimson sand gold
    particles: "#FEF3C7", // Bright stardust
  },
};

export default function WebGLCanvas({ activeDestinationId }: WebGLCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef({ current: 0, target: 0, ease: 0.08 });
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 4, 18);
    camera.lookAt(0, 0, 0);

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    containerRef.current.appendChild(renderer.domElement);

    // 3. Luxurious Topographic Contour Mesh (WebGL Dunes/Waves)
    const segmentsX = 42;
    const segmentsY = 42;
    const terrainGeo = new THREE.PlaneGeometry(35, 35, segmentsX, segmentsY);
    const posAttr = terrainGeo.attributes.position;
    
    // Save original heights
    const originalPositions = new Float32Array(posAttr.array);

    // Beautiful luxury wireframe / point shader combination
    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x221f1a,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });

    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.rotation.x = -Math.PI / 2.2;
    terrainMesh.position.set(0, -2, 0);
    scene.add(terrainMesh);

    // 4. Stardust Particles (Interactive Constellations)
    const particleCount = 650;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const randomScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Circle cylinder distribution for deep space feel
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const radius = THREE.MathUtils.randFloat(2, 35);
      positions[i] = Math.cos(theta) * radius;
      positions[i + 1] = THREE.MathUtils.randFloat(-10, 15);
      positions[i + 2] = Math.sin(theta) * radius;
      randomScales[i / 3] = THREE.MathUtils.randFloat(0.4, 2.2);
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Custom Canvas Circular Dust
    const canvasColor = document.createElement("canvas");
    canvasColor.width = 16;
    canvasColor.height = 16;
    const ctx = canvasColor.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 235, 180, 1)");
      grad.addColorStop(1, "rgba(255, 235, 180, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const dotTexture = new THREE.CanvasTexture(canvasColor);

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      map: dotTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Ambient & Themed Luxury Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const primaryLight = new THREE.DirectionalLight(0xE6C687, 2.5); // Warm gold sun light
    primaryLight.position.set(5, 12, 10);
    scene.add(primaryLight);

    // Themed accent light (fluid, morphing gradient backlight)
    const accentLight = new THREE.PointLight(0xe16d00, 10, 50);
    accentLight.position.set(-10, 3, -5);
    scene.add(accentLight);

    const secondAccentLight = new THREE.PointLight(0x00a896, 6, 40);
    secondAccentLight.position.set(10, -2, -8);
    scene.add(secondAccentLight);

    // 6. Scroll & Mouse Handlers
    const handleScroll = () => {
      // Capture viewport scroll percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        scrollRef.current.target = window.scrollY / totalScroll;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);

    // 7. Update lights and particles color dynamically when the theme props change
    const updateTheme = (destId: string) => {
      const theme = COLOR_THEMES[destId] || COLOR_THEMES["amalfi-cliffs"];
      
      const primaryHex = new THREE.Color(theme.primary);
      const secondaryHex = new THREE.Color(theme.secondary);
      const particleHex = new THREE.Color(theme.particles);

      // Smoothly tween light colors
      gsap.to(accentLight.color, { r: primaryHex.r, g: primaryHex.g, b: primaryHex.b, duration: 1.5 });
      gsap.to(secondAccentLight.color, { r: secondaryHex.r, g: secondaryHex.g, b: secondaryHex.b, duration: 1.5 });
      gsap.to(particleMat.color, { r: particleHex.r, g: particleHex.g, b: particleHex.b, duration: 1.2 });
    };

    // Lazy load gsap inside Three scope to ensure window support
    let gsap: any = (window as any).gsap;
    if (!gsap) {
      import("gsap").then((m) => {
        gsap = m.gsap;
        updateTheme(activeDestinationId);
      });
    } else {
      updateTheme(activeDestinationId);
    }

    // 8. Immersive Render & Animation Loop
    let clock = new THREE.Clock();
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Ease mouse and scroll
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * scrollRef.current.ease;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Camera immersive flight based on scroll position & mouse
      camera.position.z = 18 - scrollRef.current.current * 8.5; 
      camera.position.y = 4 + Math.sin(time * 0.3) * 0.15 + (mouseRef.current.y * 1.5);
      camera.position.x = mouseRef.current.x * 2.5;
      camera.lookAt(0, -1 - scrollRef.current.current * 2, 0);

      // Animate Topographic Wave Heights (Vertex Distortions of Golden Sand Dunes)
      const parts = posAttr.array;
      const count = posAttr.count;

      for (let i = 0; i < count; i++) {
        const x = originalPositions[i * 3];
        const y = originalPositions[i * 3 + 1];

        // Combine landscape harmonics, scroll offset, and mouse waves
        const wave1 = Math.sin(x * 0.15 + time * 0.4 + scrollRef.current.current * 4) * 1.1;
        const wave2 = Math.cos(y * 0.12 - time * 0.3 + mouseRef.current.x * 2) * 0.8;
        const wave3 = Math.sin((x + y) * 0.08 + time * 0.5) * 0.4;

        parts[i * 3 + 2] = wave1 + wave2 + wave3; // Set local Z coordinate (height)
      }
      posAttr.needsUpdate = true;

      // Ripple the stardust based on scroll speed
      particles.rotation.y = time * 0.035 + scrollRef.current.current * 0.8;
      particles.rotation.x = mouseRef.current.y * 0.1;

      // Breathe lights intensity
      accentLight.intensity = 15 + Math.sin(time * 1.2) * 5;
      secondAccentLight.intensity = 10 + Math.cos(time * 1.5) * 4;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(containerRef.current);

    // Cleanups
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      terrainGeo.dispose();
      terrainMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      dotTexture.dispose();
      renderer.dispose();
    };
  }, []);

  // Update theme when selected destination shifts
  useEffect(() => {
    // Rely on Three.js local update binding or dynamically trigger theme transition
    const handleRefUpdate = (window as any).__THREE_UPDATE_THEME__;
    if (handleRefUpdate) {
      handleRefUpdate(activeDestinationId);
    }
  }, [activeDestinationId]);

  return (
    <div
      ref={containerRef}
      id="3d-webgl-canvas"
      className="pointer-events-none fixed top-0 left-0 z-0 h-screen w-screen bg-[#060606]"
      style={{ mixBlendMode: "screen", opacity: 0.85 }}
    />
  );
}
