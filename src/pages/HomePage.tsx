import React, { useEffect } from 'react';
import { OpeningHero } from '../components/OpeningHero';
import { IntroSection } from '../components/IntroSection';
import { SkillsStack } from '../components/SkillsStack';
import { WhatIDo } from '../components/WhatIDo';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { ExperienceCertifications } from '../components/ExperienceCertifications';
import { ArcadeGame } from '../components/ArcadeGame';
import { ContactFooter } from '../components/ContactFooter';

interface HomePageProps {
  onNavigate: (path: string, hash?: string) => void;
  targetHash?: string;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, targetHash }) => {
  useEffect(() => {
    document.title = "Divyanshi Agarwal — Portfolio | Artificial Intelligence & Machine Learning";

    if (targetHash) {
      setTimeout(() => {
        const el = document.getElementById(targetHash);
        if (el) {
          const navHeight = 64;
          const pos = el.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top: pos, behavior: 'smooth' });
        }
      }, 150);
    }
  }, [targetHash]);

  return (
    <main className="w-full">
      {/* Opening sequence & High-contrast portrait hero */}
      <OpeningHero />

      {/* Quieter Introduction */}
      <IntroSection onNavigateToAbout={() => onNavigate('/about')} />

      {/* Dense skills index */}
      <SkillsStack />

      {/* Numbered capability rows with lavender-grey inverted hover & accordion */}
      <WhatIDo />

      {/* Alternating project features */}
      <FeaturedProjects onNavigateToProjects={(hash) => onNavigate('/projects', hash)} />

      {/* Experience & Certifications (anchored at /#certifications) */}
      <ExperienceCertifications />

      {/* Playable typographic arcade game (AI THAT SHIPS) */}
      <ArcadeGame />

      {/* Contact Section & Footer */}
      <ContactFooter />
    </main>
  );
};
