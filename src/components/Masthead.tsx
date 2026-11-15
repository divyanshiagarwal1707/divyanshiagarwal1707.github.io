import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface MastheadProps {
  currentPath: string;
  onNavigate: (path: string, hash?: string) => void;
}

interface NavItem {
  label: string;
  path: string;
  hash?: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', path: '/', id: 'home' },
  { label: 'ABOUT', path: '/about', id: 'about' },
  { label: 'WHAT I DO', path: '/', hash: 'what-i-do', id: 'what-i-do' },
  { label: 'PROJECTS', path: '/projects', id: 'projects' },
  { label: 'PLAY', path: '/', hash: 'play', id: 'play' },
  { label: 'CONTACT', path: '/', hash: 'contact', id: 'contact' },
];

export const Masthead: React.FC<MastheadProps> = ({ currentPath, onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ScrollSpy on Home page
  useEffect(() => {
    if (currentPath !== '/') {
      if (currentPath === '/about') setActiveSection('about');
      if (currentPath === '/projects') setActiveSection('projects');
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['contact', 'play', 'projects-preview', 'what-i-do', 'intro', 'hero'];
      const scrollPos = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (sectionId === 'contact') setActiveSection('contact');
            else if (sectionId === 'play') setActiveSection('play');
            else if (sectionId === 'what-i-do') setActiveSection('what-i-do');
            else if (sectionId === 'projects-preview') setActiveSection('projects');
            else setActiveSection('home');
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const handleItemClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (item.path !== currentPath) {
      onNavigate(item.path, item.hash);
    } else if (item.hash) {
      const target = document.getElementById(item.hash);
      if (target) {
        const navHeight = 64;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
        history.pushState(null, '', `#${item.hash}`);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.pushState(null, '', item.path);
    }
  };

  const isActive = (item: NavItem) => {
    if (currentPath === '/about' && item.id === 'about') return true;
    if (currentPath === '/projects' && item.id === 'projects') return true;
    if (currentPath === '/' && activeSection === item.id) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#08080C]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="/"
          onClick={(e) => handleItemClick(e, NAV_ITEMS[0])}
          className="group flex items-center gap-2 text-xs sm:text-sm font-heading font-black tracking-widest text-[#F5F5F7] hover:text-white transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E3A] group-hover:scale-125 transition-transform" />
          <span>{PERSONAL_INFO.name.toUpperCase()}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7 lg:space-x-9 text-xs font-heading font-bold tracking-wider" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <a
                key={item.label}
                href={item.hash ? `${item.path}#${item.hash}` : item.path}
                onClick={(e) => handleItemClick(e, item)}
                className={`relative py-2 transition-colors duration-200 ${
                  active ? 'text-[#E05263]' : 'text-[#B7B7C3] hover:text-[#F5F5F7]'
                }`}
              >
                <span>{item.label}</span>
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5E3A] rounded-full animate-fadeIn" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#B7B7C3] hover:text-white focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Fine colored line under navigation */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#E05263]/40 to-transparent" />

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0D12] border-b border-[#292930] px-6 py-6 animate-fadeIn">
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <a
                  key={item.label}
                  href={item.hash ? `${item.path}#${item.hash}` : item.path}
                  onClick={(e) => handleItemClick(e, item)}
                  className={`text-sm font-heading font-bold tracking-wider py-2 flex items-center justify-between border-b border-[#292930]/40 ${
                    active ? 'text-[#E05263]' : 'text-[#B7B7C3]'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-[#FF5E3A]" />}
                </a>
              );
            })}
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#71717A]">
              <span>{PERSONAL_INFO.email}</span>
              <a 
                href={PERSONAL_INFO.emailAction}
                className="text-[#FF5E3A] hover:underline flex items-center gap-1"
              >
                Email <ArrowUpRight size={12} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
