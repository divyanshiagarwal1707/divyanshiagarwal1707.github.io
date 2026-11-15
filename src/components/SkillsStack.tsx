import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsStack: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-[#292930]/40">
      <div className="mb-10 flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E3A]" />
        <span className="text-[11px] font-mono tracking-widest text-[#B7B7C3] uppercase">
          THE STACK
        </span>
      </div>

      {/* Close-set horizontal rows with tiny separators & ample black space around group */}
      <div className="space-y-8 sm:space-y-10">
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.title} className="group">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-3">
              <span className="text-xs font-mono text-[#71717A] tracking-wider uppercase min-w-[200px]">
                {category.title}
              </span>
              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base md:text-lg text-[#F5F5F7] font-sans font-medium">
                {category.skills.map((skill, sIdx) => (
                  <React.Fragment key={skill}>
                    <span className="hover:text-[#FF5E3A] transition-colors cursor-default">
                      {skill}
                    </span>
                    {sIdx < category.skills.length - 1 && (
                      <span className="text-[#292930] font-mono text-xs select-none">
                        /
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="h-[1px] w-full bg-[#292930]/30 mt-4 group-last:hidden" />
          </div>
        ))}
      </div>
    </section>
  );
};

