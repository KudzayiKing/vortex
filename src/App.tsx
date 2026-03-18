import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import Hero from './sections/Hero';
import Work from './sections/Work';
import Services from './sections/Services';
import Clients from './sections/Clients';
import Contact from './sections/Contact';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';

// GSAP plugins registration - disabled for testing
// gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    gsap.ticker.fps(60);

    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

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
        <div className="px-6 lg:px-12 mb-2 text-center mt-[100px]">
          <span className="text-xs text-cyan tracking-widest uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-white">
            SELECTED <span className="gradient-text">WORKS</span>
          </h2>
        </div>
        <Work />
        <Services />
        <Clients />
        <Contact />
      </main>
    </div>
  );
}

export default App;
