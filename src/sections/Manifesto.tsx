import { useRef } from 'react';

const manifestoLines = [
  { text: 'WE CRAFT', align: 'left' },
  { text: 'VISUAL STORIES', align: 'center' },
  { text: 'THAT MOVE', align: 'right' },
  { text: 'THE WORLD', align: 'center' },
];

const Manifesto = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP animations disabled for testing
  /*
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const lines = linesRef.current.filter(Boolean);
    if (!section || !container || lines.length === 0) return;

    const ctx = gsap.context(() => {
      // Create pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      // Entrance phase (0% - 20%)
      lines.forEach((line, index) => {
        const direction = index % 2 === 0 ? -100 : 100;
        tl.fromTo(
          line,
          { x: `${direction}%`, opacity: 0 },
          { x: '0%', opacity: 1, ease: 'power2.out' },
          index * 0.03
        );
      });

      // Settle phase (20% - 70%) - Text scramble effect
      tl.to({}, { duration: 0.5 });

      // Exit phase (70% - 100%)
      tl.to(
        container,
        { scale: 1.5, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);
  */

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="section-pinned bg-void flex items-center justify-center overflow-hidden"
      style={{ zIndex: 20, minHeight: '100vh' }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(160, 32, 240, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(160, 32, 240, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl px-6 pt-20"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="flex flex-col gap-2 md:gap-4">
          {manifestoLines.map((line, index) => (
            <div
              key={index}
              ref={(el) => { linesRef.current[index] = el; }}
              className={`flex ${
                line.align === 'center'
                  ? 'justify-center'
                  : line.align === 'right'
                  ? 'justify-end'
                  : 'justify-start'
              }`}
              style={{ willChange: 'transform, opacity' }}
            >
              <span
                className={`font-display kinetic-text ${
                  index % 2 === 0 ? 'gradient-text' : 'text-white'
                }`}
                style={{
                  textShadow: index % 2 === 0 
                    ? '0 0 40px rgba(160, 32, 240, 0.5)' 
                    : '0 0 40px rgba(0, 240, 255, 0.3)',
                }}
              >
                {line.text}
              </span>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-px h-40 bg-gradient-to-b from-transparent via-purple to-transparent" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-px h-40 bg-gradient-to-b from-transparent via-cyan to-transparent" />
      </div>

      {/* Bottom Stats */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-16 md:gap-32 py-8">
        {[
          { value: '150+', label: 'Projects' },
          { value: '50+', label: 'Clients' },
          { value: '12', label: 'Awards' },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="font-display text-3xl md:text-5xl text-white mb-2">
              {stat.value}
            </div>
            <div className="text-xs md:text-sm text-white/50 tracking-widest uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Manifesto;
