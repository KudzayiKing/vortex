import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Clapperboard } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#manifesto' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Show/hide nav based on scroll
    ScrollTrigger.create({
      start: 'top -100',
      end: 99999,
      onUpdate: (self) => {
        setIsScrolled(self.progress > 0);
      },
    });

    // Entrance animation
    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 2.5, ease: 'power3.out' }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.start === 'top -100') st.kill();
      });
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-strong py-3' : 'py-6 bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-lg bg-purple/20 flex items-center justify-center group-hover:bg-purple/40 transition-colors duration-300">
              <Clapperboard size={22} className="text-purple group-hover:text-cyan transition-colors duration-300" />
            </div>
            <span className="font-display text-xl tracking-wider text-white hidden sm:block">
              RESPECTABLE HOUSE
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="nav-link text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="magnetic-btn relative px-6 py-2.5 rounded-full border border-purple text-white text-sm font-medium overflow-hidden hover:border-cyan transition-colors duration-300"
            >
              <span className="relative z-10">Get in Touch</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-void/95 backdrop-blur-xl" />
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-3xl font-display text-white/70 hover:text-white transition-colors duration-300"
              style={{
                transitionDelay: isMobileOpen ? `${index * 50}ms` : '0ms',
                transform: isMobileOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
