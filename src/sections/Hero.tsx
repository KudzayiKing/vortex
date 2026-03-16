import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Volume2, VolumeX } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mask = maskRef.current;
    const logo = logoRef.current;
    const content = contentRef.current;
    if (!section || !mask || !logo || !content) return;

    const ctx = gsap.context(() => {
      // Create pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          onLeaveBack: () => {
            // Reset when scrolling back to top
            gsap.set(mask, { scale: 1, opacity: 1 });
            gsap.set(logo, { opacity: 1, scale: 1 });
            gsap.set(content, { opacity: 1, y: 0 });
          },
        },
      });

      // Phase 1: Settle (0% - 30%) - Nothing happens, just viewing
      // Phase 2: Exit (30% - 100%) - Aperture opens
      tl.fromTo(
        mask,
        { scale: 1, opacity: 1 },
        { scale: 25, opacity: 0, ease: 'power2.inOut' },
        0.3
      );

      tl.fromTo(
        logo,
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.5, ease: 'power2.in' },
        0.3
      );

      tl.fromTo(
        content,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -50, ease: 'power2.in' },
        0.5
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-void flex items-center justify-center"
      style={{ zIndex: 10 }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/work-1.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(0.8) contrast(1.1)' }}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-702-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Video overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void/80" />
      </div>

      {/* Aperture Mask */}
      <div
        ref={maskRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 150px, #050505 150px)',
          willChange: 'transform, opacity',
        }}
      >
        {/* Aperture blades decoration */}
        <div className="absolute w-[300px] h-[300px] animate-spin-slow opacity-30">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-b from-purple to-transparent origin-bottom"
              style={{
                transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Center Logo */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="text-center">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white tracking-[0.2em] text-glow-purple">
            VORTEX
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/60 tracking-[0.5em] uppercase">
            Studios
          </p>
        </div>
      </div>

      {/* Content Overlay */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Tagline */}
        <div className="text-center mb-8">
          <p className="text-lg md:text-xl text-white/80 tracking-wide">
            Crafting Visual Stories That Move The World
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <a
            href="#work"
            className="magnetic-btn group flex items-center gap-3 px-8 py-4 rounded-full glass border-gradient text-white font-medium hover:scale-105 transition-transform duration-300"
          >
            <Play size={18} className="text-cyan group-hover:scale-110 transition-transform" />
            <span>View Showreel</span>
          </a>
          <a
            href="#contact"
            className="magnetic-btn px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>

        {/* Video Controls */}
        <button
          onClick={toggleMute}
          className="absolute bottom-8 right-8 w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
          aria-label="Toggle mute"
        >
          {videoRef.current?.muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-white/40 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-purple/30" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-purple/30" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-cyan/30" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-cyan/30" />
    </section>
  );
};

export default Hero;
