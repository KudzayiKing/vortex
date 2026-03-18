import { useRef } from 'react';
import { ArrowUpRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="work"
      className="bg-void pt-8 pb-6 md:pt-12 md:pb-8 relative"
      style={{ zIndex: 30 }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void to-void" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/50 to-transparent" />
      </div>

      {/* Heading */}
      <div className="px-6 lg:px-12 mb-2">
        <span className="text-xs text-cyan tracking-widest uppercase mb-2 block">
          Portfolio
        </span>
        <h2 className="font-display text-4xl md:text-6xl text-white">
          SELECTED <span className="gradient-text">WORK</span>
        </h2>
      </div>

      {/* Scroll Buttons - Left */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 md:left-4 top-[60%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-white hover:bg-purple/50 transition-colors duration-300"
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Scroll Buttons - Right */}
      <button
        onClick={scrollRight}
        className="absolute right-2 md:right-4 top-[60%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-white hover:bg-purple/50 transition-colors duration-300"
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="flex items-center gap-4 md:gap-6 px-6 md:px-12 overflow-x-auto scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Project Cards */}
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="work-card relative shrink-0 w-[280px] md:w-[400px] lg:w-[500px] h-[220px] md:h-[300px] lg:h-[350px] group cursor-pointer"
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
              <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
                {/* Top */}
                <div className="flex justify-between items-start">
                  <span className="px-2 py-1 rounded-full glass text-xs text-white/70">
                    {project.category}
                  </span>
                  <span className="text-xs text-white/50">{project.year}</span>
                </div>

                {/* Bottom */}
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-white mb-2 md:mb-4 group-hover:text-cyan transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  {/* Play Button */}
                  <div className="flex items-center gap-2 md:gap-4">
                    <button className="w-10 h-10 md:w-14 md:h-14 rounded-full glass flex items-center justify-center text-white group-hover:bg-purple group-hover:border-purple transition-all duration-300">
                      <Play size={16} className="ml-0.5 md:ml-1" />
                    </button>
                    <span className="text-xs md:text-sm text-white/60 group-hover:text-white transition-colors duration-300">
                      Watch
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-purple/50 transition-colors duration-300 pointer-events-none" />
            </div>

            {/* Index Number */}
            <div className="absolute top-3 right-3 w-8 h-8 md:w-10 md:h-10 rounded-full glass-strong flex items-center justify-center">
              <span className="font-display text-sm md:text-lg text-cyan">{index + 1}</span>
            </div>
          </div>
        ))}

        {/* View All Card */}
        <div className="shrink-0 w-[200px] md:w-[300px] h-[300px] md:h-[400px] flex items-center justify-center">
          <a
            href="#contact"
            className="group flex flex-col items-center gap-4 md:gap-6 p-8 md:p-12 rounded-2xl glass hover:bg-white/5 transition-colors duration-300"
          >
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-purple flex items-center justify-center group-hover:bg-purple group-hover:border-cyan transition-all duration-300">
              <ArrowUpRight size={24} className="text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-display text-lg md:text-xl text-white mb-1 md:mb-2">View All</h3>
              <p className="text-xs md:text-sm text-white/50">150+ Projects</p>
            </div>
          </a>
        </div>

        {/* End Spacer */}
        <div className="w-4 md:w-8 shrink-0" />
      </div>

      {/* Scroll Hint */}
      <div className="mt-2 text-center text-xs text-white/40 tracking-widest uppercase">
        Use arrows to navigate
      </div>
    </section>
  );
};

export default Work;
