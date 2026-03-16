import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const progressBar = progressRef.current;
    if (!container || !logo || !progressBar) return;

    const tl = gsap.timeline();

    // Animate progress
    const progressObj = { value: 0 };
    tl.to(progressObj, {
      value: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      },
    });

    // Logo spin animation
    gsap.to(logo, {
      rotation: 360,
      duration: 2,
      ease: 'none',
      repeat: -1,
    });

    // Exit animation
    tl.to(container, {
      clipPath: 'inset(50% 0% 50% 0%)',
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 0.3,
    });

    tl.set(container, { display: 'none' });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      {/* Logo Spinner */}
      <div ref={logoRef} className="relative mb-8">
        <svg
          viewBox="0 0 100 100"
          className="w-24 h-24"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A020F0" />
              <stop offset="100%" stopColor="#00F0FF" />
            </linearGradient>
          </defs>
          {/* Outer ring */}
          <circle cx="50" cy="50" r="45" strokeOpacity="0.2" />
          {/* Progress arc */}
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeDasharray={`${progress * 2.83} 283`}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
          {/* Inner vortex */}
          <path d="M50 20 Q70 35 50 50 Q30 65 50 80" strokeLinecap="round" />
          <path d="M50 80 Q30 65 50 50 Q70 35 50 20" strokeLinecap="round" strokeOpacity="0.5" />
        </svg>
      </div>

      {/* Brand Name */}
      <h1 className="font-display text-4xl tracking-[0.3em] text-white mb-4">
        VORTEX
      </h1>

      {/* Progress Bar */}
      <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-purple to-cyan rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress Text */}
      <p className="mt-4 text-sm text-white/50 font-mono">{progress}%</p>
    </div>
  );
};

export default LoadingScreen;
