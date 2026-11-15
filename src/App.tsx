import React, { useState, useEffect } from 'react';
import { Masthead } from './components/Masthead';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactFooter } from './components/ContactFooter';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [targetHash, setTargetHash] = useState<string>(() => {
    return window.location.hash.replace('#', '');
  });

  // Handle browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setTargetHash(window.location.hash.replace('#', ''));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string, hash?: string) => {
    const url = hash ? `${path}#${hash}` : path;
    history.pushState(null, '', url);
    setCurrentPath(path);
    setTargetHash(hash || '');

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080C] text-[#F5F5F7] selection:bg-[#FF5E3A] selection:text-white flex flex-col justify-between">
      {/* Slim Masthead Across the Top */}
      <Masthead currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main Page View */}
      <div className="flex-1">
        {currentPath === '/about' ? (
          <>
            <AboutPage onNavigate={navigateTo} />
            <ContactFooter />
          </>
        ) : currentPath === '/projects' ? (
          <>
            <ProjectsPage onNavigate={navigateTo} targetHash={targetHash} />
            <ContactFooter />
          </>
        ) : (
          <HomePage onNavigate={navigateTo} targetHash={targetHash} />
        )}
      </div>
    </div>
  );
};

export default App;
