import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Hero from './sections/Hero';
import Manifesto from './sections/Manifesto';
import Work from './sections/Work';
import Services from './sections/Services';
import Clients from './sections/Clients';
import Contact from './sections/Contact';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll with optimized settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger using GSAP's ticker
    // This is the proper way to integrate Lenis with GSAP
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Configure GSAP for smooth performance
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.fps(60);

    // Configure ScrollTrigger with optimized settings
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger after everything loads
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-void min-h-screen">
      <LoadingScreen />
      <CustomCursor />
      <Navigation />
      
      <main className="relative">
        <Hero />
        <Manifesto />
        <Work />
        <Services />
        <Clients />
        <Contact />
      </main>
    </div>
  );
}

export default App;
