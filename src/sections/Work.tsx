import { useRef } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'NEON DREAMS',
    category: 'Commercial',
    image: '/images/work-1.jpg',
    year: '2024',
  },
  {
    id: 2,
    title: 'URBAN PULSE',
    category: 'Music Video',
    image: '/images/work-2.jpg',
    year: '2024',
  },
  {
    id: 3,
    title: 'SILENT ECHO',
    category: 'Brand Film',
    image: '/images/work-3.jpg',
    year: '2023',
  },
  {
    id: 4,
    title: 'BEYOND HORIZON',
    category: 'Documentary',
    image: '/images/work-4.jpg',
    year: '2023',
  },
];

const Work = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // GSAP animations disabled for testing
  /*
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const heading = headingRef.current;
    const progress = progressRef.current;
    if (!section || !track || !heading || !progress) return;

    const ctx = gsap.context(() => {
      // Calculate total scroll distance
      const totalWidth = track.scrollWidth - window.innerWidth;

      // Create pinned timeline for horizontal scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Heading entrance
      tl.fromTo(
        heading,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Horizontal scroll
      tl.fromTo(
        track,
        { x: 0 },
        { x: -totalWidth, ease: 'none' },
        0.1
      );

      // Progress bar
      tl.fromTo(
        progress,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none' },
        0.1
      );

      // Heading exit
      tl.to(
        heading,
        { y: -50, opacity: 0, ease: 'power2.in' },
        0.9
      );
    }, section);

    return () => ctx.revert();
  }, []);
  */

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-pinned bg-void overflow-hidden"
      style={{ zIndex: 30 }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void to-void" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/50 to-transparent" />
      </div>

      {/* Heading */}
      <div
        ref={headingRef}
        className="absolute top-8 left-6 lg:left-12 z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="text-xs text-cyan tracking-widest uppercase mb-2 block">
          Portfolio
        </span>
        <h2 className="font-display text-4xl md:text-6xl text-white">
          SELECTED <span className="gradient-text">WORK</span>
        </h2>
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 h-full flex items-center gap-8 px-6 lg:px-12 pt-24"
        style={{ willChange: 'transform' }}
      >
        {/* Spacer for heading */}
        <div className="w-[20vw] shrink-0" />

        {/* Project Cards */}
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="work-card relative shrink-0 w-[70vw] md:w-[50vw] lg:w-[40vw] h-[60vh] group cursor-pointer"
            data-cursor-hover
          >
            {/* Card Background */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden glass">
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="work-card-image w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent opacity-80" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                {/* Top */}
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full glass text-xs text-white/70">
                    {project.category}
                  </span>
                  <span className="text-sm text-white/50">{project.year}</span>
                </div>

                {/* Bottom */}
                <div>
                  <h3 className="font-display text-3xl md:text-4xl text-white mb-4 group-hover:text-cyan transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  {/* Play Button */}
                  <div className="flex items-center gap-4">
                    <button className="w-14 h-14 rounded-full glass flex items-center justify-center text-white group-hover:bg-purple group-hover:border-purple transition-all duration-300">
                      <Play size={24} className="ml-1" />
                    </button>
                    <span className="text-sm text-white/60 group-hover:text-white transition-colors duration-300">
                      Watch Project
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-purple/50 transition-colors duration-300 pointer-events-none" />
            </div>

            {/* Index Number */}
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full glass-strong flex items-center justify-center">
              <span className="font-display text-lg text-cyan">0{index + 1}</span>
            </div>
          </div>
        ))}

        {/* View All Card */}
        <div className="shrink-0 w-[40vw] md:w-[30vw] h-[60vh] flex items-center justify-center">
          <a
            href="#contact"
            className="group flex flex-col items-center gap-6 p-12 rounded-2xl glass hover:bg-white/5 transition-colors duration-300"
          >
            <div className="w-20 h-20 rounded-full border-2 border-purple flex items-center justify-center group-hover:bg-purple group-hover:border-cyan transition-all duration-300">
              <ArrowUpRight size={32} className="text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-display text-2xl text-white mb-2">View All Projects</h3>
              <p className="text-sm text-white/50">150+ Projects</p>
            </div>
          </a>
        </div>

        {/* End Spacer */}
        <div className="w-[10vw] shrink-0" />
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-6 right-6 lg:left-12 lg:right-12 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-purple to-cyan rounded-full origin-left"
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 right-6 lg:right-12 text-xs text-white/40 tracking-widest uppercase">
        Scroll to explore
      </div>
    </section>
  );
};

export default Work;
