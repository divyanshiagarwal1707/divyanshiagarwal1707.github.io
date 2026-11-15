import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { CAPABILITIES } from '../data/portfolioData';

export const WhatIDo: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>("web-apps");

  const toggleRow = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="what-i-do" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-[#292930]/60">
      {/* Right-aligned large 2-line heading */}
      <div className="flex flex-col items-end mb-12 sm:mb-16">
        <span className="text-[11px] font-mono tracking-widest text-[#B7B7C3] uppercase mb-2">
          CAPABILITIES
        </span>
        <h2 className="text-right text-5xl sm:text-6xl md:text-8xl font-heading font-black tracking-tight leading-[0.9] text-steel-gradient">
          WHAT<br />I DO
        </h2>
      </div>

      {/* 5 Full-width horizontal rows */}
      <div className="border-t border-[#292930] divide-y divide-[#292930]" role="region" aria-label="Capabilities List">
        {CAPABILITIES.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="group transition-colors duration-200"
            >
              <button
                type="button"
                onClick={() => toggleRow(item.id)}
                aria-expanded={isExpanded}
                className="w-full text-left py-6 sm:py-8 px-4 sm:px-6 flex items-center justify-between transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E3A]
                  hover:bg-[#E4E1EE] hover:text-[#08080C] focus:bg-[#E4E1EE] focus:text-[#08080C]"
              >
                {/* Left: Two-digit number */}
                <span className="font-mono text-sm sm:text-base font-semibold tracking-wider text-[#B7B7C3] group-hover:text-[#08080C] group-focus:text-[#08080C] transition-colors w-12 sm:w-16">
                  {item.number}
                </span>

                {/* Middle: Uppercase title */}
                <span className="flex-1 font-heading font-bold text-lg sm:text-2xl md:text-3xl tracking-tight text-[#F5F5F7] group-hover:text-[#08080C] group-focus:text-[#08080C] transition-colors uppercase">
                  {item.title}
                </span>

                {/* Right: Small diagonal coral arrow */}
                <div className="flex items-center gap-3">
                  <ArrowUpRight 
                    size={22} 
                    className={`text-[#E05263] group-hover:text-[#08080C] group-focus:text-[#08080C] transition-transform duration-200 ${
                      isExpanded ? 'rotate-90' : 'group-hover:translate-x-1 group-hover:-translate-y-1'
                    }`} 
                  />
                </div>
              </button>

              {/* Accordion explanation on click/enter */}
              {isExpanded && (
                <div className="px-4 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#B7B7C3] bg-[#111116]/60 border-t border-[#292930]/30 transition-all duration-300">
                  <div className="max-w-3xl pl-12 sm:pl-16 py-2 border-l-2 border-[#FF5E3A]">
                    <p className="font-sans leading-relaxed text-[#F5F5F7]">
                      “{item.explanation}”
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

