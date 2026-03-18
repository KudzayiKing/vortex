import { useEffect, useRef } from 'react';

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
    // GSAP disabled for testing - uncomment to enable smooth scroll
    /*
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
    */
  }, []);

  return (
    <div ref={mainRef} className="relative bg-void min-h-screen">
      <LoadingScreen />
      <CustomCursor />
      <Navigation />
      
      <main className="relative">
        <Hero />
        <Work />
        <Services />
        <Clients />
        <Contact />
      </main>
    </div>
  );
}

export default App;
