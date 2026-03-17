import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, ArrowUpRight, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const form = formRef.current;
    const info = infoRef.current;
    if (!section || !heading || !form || !info) return;

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

      // Form animation
      gsap.fromTo(
        form,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
          },
        }
      );

      // Info animation
      gsap.fromTo(
        info,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-flowing relative overflow-hidden py-24 md:py-32"
      style={{ 
        zIndex: 10,
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #0d0612 100%)',
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[150px]" />
        
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(160, 32, 240, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(160, 32, 240, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <span className="text-xs text-cyan tracking-widest uppercase mb-4 block">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-6">
            READY TO <span className="gradient-text">CREATE?</span>
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Let&apos;s bring your vision to life. Tell us about your project 
            and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-glass w-full px-5 py-4 rounded-xl text-white placeholder:text-white/30"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-glass w-full px-5 py-4 rounded-xl text-white placeholder:text-white/30"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm text-white/60 mb-2">Company (Optional)</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="input-glass w-full px-5 py-4 rounded-xl text-white placeholder:text-white/30"
                placeholder="Your Company"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm text-white/60 mb-2">Project Details</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="input-glass w-full px-5 py-4 rounded-xl text-white placeholder:text-white/30 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="magnetic-btn group w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple to-cyan text-white font-medium flex items-center justify-center gap-3 hover:shadow-glow transition-shadow duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-8">
            {/* Info Cards */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'hello@vortexstudios.com' },
                { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: MapPin, label: 'Location', value: 'Los Angeles, California' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl glass hover:glass-strong transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple/20 to-cyan/20 flex items-center justify-center">
                      <Icon size={20} className="text-cyan" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider">{item.label}</p>
                      <p className="text-white">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider mb-4">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Linkedin, href: '#' },
                  { icon: Youtube, href: '#' },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick CTA */}
            <div className="p-6 rounded-xl glass border-gradient">
              <p className="text-white mb-4">Want to see more of our work?</p>
              <a
                href="#work"
                className="inline-flex items-center gap-2 text-cyan hover:text-white transition-colors"
              >
                <span>View Portfolio</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-24 pt-12 border-t border-white/5">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-purple flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-purple"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <span className="font-display text-xl tracking-wider text-white">RESPECTABLE HOUSE</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-white/50">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-white/30">
              &copy; {new Date().getFullYear()} Respectable House. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
