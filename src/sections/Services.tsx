import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { 
  Clapperboard, 
  Film, 
  Music, 
  Palette, 
  Sparkles,
  Wand2,
  Brain
} from 'lucide-react';

const services = [
  {
    icon: Music,
    title: 'Music Videos',
    description: 'Visual experiences that amplify your sound and connect with audiences on a deeper level.',
  },
  {
    icon: Brain,
    title: 'AI Generated Content',
    description: 'Cutting-edge artificial intelligence solutions for content creation and visual effects.',
  },
  {
    icon: Clapperboard,
    title: 'Commercial Production',
    description: 'High-impact commercials that capture attention and drive results. From concept to final cut.',
  },
  {
    icon: Film,
    title: 'Brand Films',
    description: 'Cinematic storytelling that brings your brand identity to life with emotional resonance.',
  },
  {
    icon: Palette,
    title: 'Color Grading',
    description: 'Expert color correction and grading to achieve the perfect visual tone and mood.',
  },
  {
    icon: Wand2,
    title: 'VFX & Motion',
    description: 'Cutting-edge visual effects and motion graphics that push creative boundaries.',
  },
];

// Particle System - Optimized for performance
const ParticleSystem = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 800; // Reduced from 2000 for better performance

  const [positions, colors] = useMemo(() => {
    const posArray = new Float32Array(particleCount * 3);
    const colArray = new Float32Array(particleCount * 3);
    
    const color1 = new THREE.Color('#A020F0');
    const color2 = new THREE.Color('#00F0FF');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle = (i / particleCount) * Math.PI * 20;
      const radius = 2 + (i / particleCount) * 8;
      const height = (Math.random() - 0.5) * 6;

      posArray[i3] = Math.cos(angle) * radius;
      posArray[i3 + 1] = height;
      posArray[i3 + 2] = Math.sin(angle) * radius;

      const mixRatio = Math.random();
      const color = color1.clone().lerp(color2, mixRatio);
      colArray[i3] = color.r;
      colArray[i3 + 1] = color.g;
      colArray[i3 + 2] = color.b;
    }

    return [posArray, colArray];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Use simple rotation only - much more performant than updating positions
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP animations disabled for testing
  /*
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || !heading || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);
  */

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-flowing bg-void py-24 md:py-32 relative overflow-hidden"
      style={{ zIndex: 25 }}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 opacity-60">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.5} />
          <ParticleSystem />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <span className="text-xs text-cyan tracking-widest uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-6">
            OUR <span className="gradient-text">EXPERTISE</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            From concept to final cut, we handle the entire production pipeline 
            with precision and creative excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative p-8 rounded-2xl glass hover:glass-strong transition-all duration-500 cursor-pointer"
                data-cursor-hover
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple/20 to-cyan/20 flex items-center justify-center mb-6 group-hover:from-purple/40 group-hover:to-cyan/40 transition-all duration-300">
                  <Icon size={28} className="text-cyan group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl text-white mb-3 group-hover:text-cyan transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple/10 to-cyan/10" />
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-purple/50 to-transparent transform translate-x-[-1px]" />
                  <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-purple/50 to-transparent transform translate-y-[1px]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-24 text-center">
          <p className="text-white/40 mb-6">Have a project in mind?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass border-gradient text-white font-medium hover:scale-105 transition-transform duration-300"
          >
            <Sparkles size={18} className="text-cyan" />
            <span>Start a Project</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
