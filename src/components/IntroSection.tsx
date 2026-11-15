import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface IntroSectionProps {
  onNavigateToAbout: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onNavigateToAbout }) => {
  return (
    <section id="intro" className="relative py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-[#292930]/60">
      {/* Wide two-column composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: ABOUT ME label & large mixed-case Intro */}
        <div className="lg:col-span-5">
          <span className="text-[11px] font-mono tracking-widest text-[#B7B7C3] uppercase block mb-3">
            ABOUT ME
          </span>
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-heading font-black tracking-tight leading-none text-steel-gradient">
            Intro
          </h2>
        </div>

        {/* Right Column: Charcoal rectangle with modest corner rounding and generous inner padding */}
        <div className="lg:col-span-7">
          <div className="bg-[#111116] border border-[#292930] rounded-xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden group">
            {/* Subtle glow accent line */}
            <div className="absolute top-0 left-0 w-16 h-[2px] bg-[#FF5E3A]" />
            
            <p className="text-base sm:text-lg md:text-xl text-[#F5F5F7] leading-relaxed font-sans font-normal">
              {PERSONAL_INFO.introParagraph}
            </p>

            <div className="mt-6 pt-5 border-t border-[#292930]/80 flex items-center justify-between">
              <span className="font-mono text-xs text-[#71717A]">
                AI & ML SPECIALISATION · JECRC 2024–2027
              </span>

              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToAbout();
                }}
                className="group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-heading font-bold text-[#B7B7C3] hover:text-[#FF5E3A] transition-colors"
              >
                <span>More about me</span>
                <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform text-[#E05263]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

