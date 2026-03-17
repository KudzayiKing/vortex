import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Client logos as text-based representations
const clients = [
  'NETFLIX',
  'SPOTIFY',
  'NIKE',
  'ADIDAS',
  'APPLE',
  'GOOGLE',
  'META',
  'AMAZON',
  'TESLA',
  'SONY',
  'UNIVERSAL',
  'WARNER',
];

const Clients = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-flowing bg-void py-24 md:py-32 relative overflow-hidden"
      style={{ zIndex: 15 }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void to-void" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 px-6">
          <span className="text-xs text-cyan tracking-widest uppercase mb-4 block">
            Trusted By
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            OUR <span className="gradient-text">CLIENTS</span>
          </h2>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div
            ref={marqueeRef}
            className="flex animate-marquee"
            style={{ width: 'fit-content' }}
          >
            {/* First set */}
            {clients.map((client, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center justify-center px-8 md:px-16"
              >
                <span className="font-display text-3xl md:text-5xl lg:text-6xl text-white/10 hover:text-white/30 transition-colors duration-300 whitespace-nowrap">
                  {client}
                </span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {clients.map((client, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center justify-center px-8 md:px-16"
              >
                <span className="font-display text-3xl md:text-5xl lg:text-6xl text-white/10 hover:text-white/30 transition-colors duration-300 whitespace-nowrap">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Second Marquee (Reverse Direction) */}
        <div className="relative mt-8">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

          {/* Marquee Track - Reverse */}
          <div
            className="flex"
            style={{ 
              width: 'fit-content',
              animation: 'marquee 30s linear infinite reverse',
            }}
          >
            {/* First set */}
            {[...clients].reverse().map((client, index) => (
              <div
                key={`reverse-first-${index}`}
                className="flex items-center justify-center px-8 md:px-16"
              >
                <span className="font-display text-2xl md:text-4xl text-white/5 hover:text-white/20 transition-colors duration-300 whitespace-nowrap">
                  {client}
                </span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[...clients].reverse().map((client, index) => (
              <div
                key={`reverse-second-${index}`}
                className="flex items-center justify-center px-8 md:px-16"
              >
                <span className="font-display text-2xl md:text-4xl text-white/5 hover:text-white/20 transition-colors duration-300 whitespace-nowrap">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 flex flex-wrap justify-center gap-12 md:gap-24 px-6">
          {[
            { value: '98%', label: 'Client Satisfaction' },
            { value: '12+', label: 'Years Experience' },
            { value: '30+', label: 'Industry Awards' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-4xl md:text-5xl gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/50 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
