import React, { useEffect, useRef, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface OpeningHeroProps {
  onComplete?: () => void;
}

type IntroPhase = 
  | 'dot'        // A. Single white dot with vertical movement & rotating stroke
  | 'name'       // B. Letter fragments settle into DIVYANSHI
  | 'morph'      // C. DIVYANSHI transforms to PORTFOLIO across center line
  | 'particles'  // D. PORTFOLIO settles, particles gather into portrait
  | 'completed'; // E. Final hero state

export const OpeningHero: React.FC<OpeningHeroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<IntroPhase>('dot');
  const [skipAvailable, setSkipAvailable] = useState(true);
  const [morphIndices, setMorphIndices] = useState<number[]>([]);
  const [scrollScatter, setScrollScatter] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const nameChars = "DIVYANSHI".split("");
  const portChars = "PORTFOLIO".split("");

  // Check if user prefers reduced motion or already played intro this session
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasPlayed = sessionStorage.getItem('divyanshi_intro_played');

    if (prefersReducedMotion || hasPlayed) {
      setPhase('completed');
      setSkipAvailable(false);
      if (onComplete) onComplete();
      return;
    }

    // Phase timings compressed to ~4.2s total
    // 0.0s - 0.7s: Dot & rotating stroke
    const t1 = setTimeout(() => {
      setPhase('name');
    }, 700);

    // 0.7s - 1.8s: DIVYANSHI settles and holds
    const t2 = setTimeout(() => {
      setPhase('morph');
      // Stagger morphing of letters from DIVYANSHI to PORTFOLIO
      [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((idx) => {
        setTimeout(() => {
          setMorphIndices((prev) => [...prev, idx]);
        }, idx * 90);
      });
    }, 1800);

    // 2.7s: PORTFOLIO settles, particles gather into portrait
    const t3 = setTimeout(() => {
      setPhase('particles');
    }, 2700);

    // 4.2s: Complete
    const t4 = setTimeout(() => {
      setPhase('completed');
      setSkipAvailable(false);
      sessionStorage.setItem('divyanshi_intro_played', 'true');
      if (onComplete) onComplete();
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleSkip = () => {
    setPhase('completed');
    setSkipAvailable(false);
    sessionStorage.setItem('divyanshi_intro_played', 'true');
    if (onComplete) onComplete();
  };

  // Scroll scatter effect (Phase F)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const factor = Math.min(1, Math.max(0, scrollY / 450));
      setScrollScatter(factor);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Particle Canvas for portrait gathering & dispersion
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate particles
    const particleCount = 280;
    const particles: Array<{
      x: number;
      y: number;
      originX: number;
      originY: number;
      targetX: number;
      targetY: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      targetAlpha: number;
    }> = [];

    const centerX = width / 2;
    const centerY = height * 0.42;

    for (let i = 0; i < particleCount; i++) {
      // Elliptical portrait outline cluster
      const angle = Math.random() * Math.PI * 2;
      const radiusX = (Math.random() * 0.35 + 0.05) * Math.min(width, height) * 0.55;
      const radiusY = (Math.random() * 0.45 + 0.05) * Math.min(width, height) * 0.7;
      
      const targetX = centerX + Math.cos(angle) * radiusX;
      const targetY = centerY + Math.sin(angle) * radiusY;

      // Random starting point across viewport
      const startAngle = Math.random() * Math.PI * 2;
      const startDist = Math.max(width, height) * (0.6 + Math.random() * 0.4);
      const originX = centerX + Math.cos(startAngle) * startDist;
      const originY = centerY + Math.sin(startAngle) * startDist;

      particles.push({
        x: originX,
        y: originY,
        originX,
        originY,
        targetX,
        targetY,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.7 + 0.2,
        targetAlpha: Math.random() * 0.8 + 0.2,
      });
    }

    let progress = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // In completed phase or particles phase
      if (phase === 'particles' || phase === 'completed') {
        progress = Math.min(1, progress + 0.025);
      } else {
        progress = 0;
      }

      const scatter = scrollScatter; // 0 to 1

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Normal interpolation from origin to target
        const currentTargetX = p.originX + (p.targetX - p.originX) * progress;
        const currentTargetY = p.originY + (p.targetY - p.originY) * progress;

        // Apply scroll dispersion when scrolling away (Phase F)
        const dispersedX = currentTargetX + (p.targetX - centerX) * scatter * 1.8 + Math.sin(i + scatter * 5) * 20 * scatter;
        const dispersedY = currentTargetY + (p.targetY - centerY) * scatter * 1.8 - scatter * 80;

        p.x += (dispersedX - p.x) * 0.15;
        p.y += (dispersedY - p.y) * 0.15;

        const currentAlpha = Math.max(0, (p.targetAlpha * progress) - (scatter * 0.8));

        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - scatter * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [phase, scrollScatter]);

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-end items-center overflow-hidden bg-[#08080C] pt-20 pb-12 md:pb-16 select-none"
      aria-label="Hero Introduction"
    >
      {/* Skip Intro button */}
      {skipAvailable && phase !== 'completed' && (
        <button
          onClick={handleSkip}
          className="absolute top-20 right-6 z-50 text-xs font-mono uppercase tracking-widest text-[#B7B7C3] hover:text-[#FF5E3A] px-3 py-1.5 rounded border border-[#292930] bg-[#111116]/80 backdrop-blur transition-all duration-200"
          aria-label="Skip introduction animation"
        >
          Skip intro ⇥
        </button>
      )}

      {/* Layer 1: Background grain / ambient glow */}
      <div className="absolute inset-0 pointer-events-none grain-overlay opacity-40 z-0" />
      
      {/* Subtle radial halo for high contrast backdrop */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(160, 180, 210, 0.08) 0%, rgba(8, 8, 12, 0) 70%)',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -20%)',
          opacity: phase === 'particles' || phase === 'completed' ? 1 : 0
        }}
      />

      {/* Canvas for dynamic particles (Gathering & Scroll Dispersion) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10" 
      />

      {/* Center Opening Animation for Phase A: Dot & rotating stroke */}
      {phase === 'dot' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="relative flex items-center justify-center">
            {/* Pulsing & vertically floating white dot with afterimage */}
            <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] animate-pulse" />
            <div className="absolute w-2 h-2 rounded-full bg-white/40 blur-[2px] -translate-y-2" />
            
            {/* Rotating bright rectangular stroke */}
            <div 
              className="absolute w-5 h-1 bg-white/90 rounded-sm"
              style={{
                transform: 'rotate(45deg) translateX(12px)',
                transition: 'all 0.5s ease-out'
              }}
            />
          </div>
        </div>
      )}

      {/* Layer 2: Divyanshi's Portrait with High-Contrast B&W Treatment */}
      <div 
        className="relative z-10 w-full max-w-xl md:max-w-2xl flex justify-center items-end transition-all duration-700 pointer-events-none"
        style={{
          opacity: (phase === 'particles' || phase === 'completed') ? (1 - scrollScatter * 0.95) : 0,
          transform: `translateY(${(phase === 'particles' || phase === 'completed') ? (scrollScatter * 40) : 60}px) scale(${1 - scrollScatter * 0.08})`,
          transition: phase === 'completed' ? 'transform 0.1s ease-out, opacity 0.1s ease-out' : 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="relative w-[280px] sm:w-[360px] md:w-[460px] aspect-[4/5] flex items-end justify-center">
          {/* Portrait Image with High-contrast B&W, grain halo, and deep shadows fading to background */}
          <img
            src={PERSONAL_INFO.portraitPath}
            alt="Divyanshi Agarwal"
            className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-95"
            style={{
              // Mask bottom and sides smoothly into #08080C background so shoulders merge into darkness
              maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 50%, transparent 95%), linear-gradient(to bottom, black 65%, transparent 98%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 50%, transparent 95%), linear-gradient(to bottom, black 65%, transparent 98%)'
            }}
          />
          {/* Fine grain overlay over portrait */}
          <div className="absolute inset-0 grain-overlay opacity-30 mix-blend-overlay pointer-events-none" />
        </div>
      </div>

      {/* Layer 3: Foreground Titles (DIVYANSHI -> PORTFOLIO) & Subtitle */}
      <div className="relative z-20 w-full max-w-7xl px-4 sm:px-6 md:px-8 mx-auto -mt-16 sm:-mt-24 md:-mt-32">
        {/* Title Container */}
        <div className="w-full text-center">
          {/* Phase B: DIVYANSHI */}
          {phase === 'name' && (
            <div className="flex justify-center items-center gap-[0.05em] overflow-hidden">
              {nameChars.map((char, i) => (
                <span
                  key={i}
                  className="inline-block font-heading font-black text-white text-5xl sm:text-7xl md:text-9xl lg:text-[13vw] tracking-tighter leading-none"
                  style={{
                    animation: `letterDrop 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s backwards`,
                    transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (2 - (i % 3))}deg)`
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          )}

          {/* Phase C: Morphing DIVYANSHI -> PORTFOLIO across center line */}
          {phase === 'morph' && (
            <div className="flex justify-center items-center gap-[0.05em] overflow-hidden">
              {nameChars.map((char, i) => {
                const isMorphed = morphIndices.includes(i);
                return (
                  <span
                    key={i}
                    className="inline-block font-heading font-black text-5xl sm:text-7xl md:text-9xl lg:text-[13vw] tracking-tighter leading-none transition-all duration-300"
                    style={{
                      color: isMorphed ? '#FFFFFF' : '#B7B7C3',
                      transform: isMorphed ? 'translateY(0) scale(1)' : 'translateY(-4px) scale(0.96)',
                      opacity: isMorphed ? 1 : 0.75
                    }}
                  >
                    {isMorphed ? portChars[i] : char}
                  </span>
                );
              })}
            </div>
          )}

          {/* Phase D & E: Settled PORTFOLIO foreground */}
          {(phase === 'particles' || phase === 'completed') && (
            <h1 
              className="font-heading font-black text-5xl sm:text-7xl md:text-9xl lg:text-[14vw] tracking-tighter leading-none uppercase text-steel-gradient select-none"
              style={{
                letterSpacing: '-0.05em',
                lineHeight: 0.88,
              }}
            >
              PORTFOLIO
            </h1>
          )}
        </div>

        {/* Subtitles & Role captions under left edge of PORTFOLIO */}
        <div 
          className="mt-6 md:mt-8 pt-4 border-t border-[#292930]/40 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 text-left transition-opacity duration-700"
          style={{
            opacity: phase === 'completed' || phase === 'particles' ? 1 : 0
          }}
        >
          <div>
            <span className="font-heading text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white block">
              <span className="italic font-serif font-normal text-xl sm:text-2xl md:text-3xl mr-1 text-[#FF5E3A]">{PERSONAL_INFO.roleTitle}</span>
              <span>· JECRC University</span>
            </span>
            <p className="text-xs sm:text-sm font-sans text-[#B7B7C3] mt-1 tracking-wide">
              {PERSONAL_INFO.headline}
            </p>
          </div>

          <div className="font-mono text-xs text-[#71717A] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5E3A] animate-pulse" />
            <span>JAIPUR, INDIA · 2026</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes letterDrop {
          0% {
            opacity: 0;
            transform: translateY(-50px) rotate(12deg) scale(0.85);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

