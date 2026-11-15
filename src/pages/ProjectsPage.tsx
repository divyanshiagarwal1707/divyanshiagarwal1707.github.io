import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, Terminal, Sparkles, Scale, CheckCircle2, ArrowRight, Layers, Database, Shield } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';

interface ProjectsPageProps {
  onNavigate: (path: string, hash?: string) => void;
  targetHash?: string;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ targetHash }) => {
  const [activeProject, setActiveProject] = useState<string>("luxeloom");

  useEffect(() => {
    document.title = "Projects & Case Studies — Divyanshi Agarwal";

    // Scroll to target hash if provided
    const hash = targetHash || window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const navHeight = 70;
          const pos = el.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top: pos, behavior: 'smooth' });
          setActiveProject(hash);
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [targetHash]);

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 70;
      const pos = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: pos, behavior: 'smooth' });
      setActiveProject(id);
      history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="pb-12 border-b border-[#292930]/60">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF5E3A]" />
            <span className="text-[11px] font-mono tracking-widest text-[#B7B7C3] uppercase">
              CASE STUDIES & ARCHITECTURE
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-steel-gradient mb-6">
            Selected Projects
          </h1>

          <p className="text-base sm:text-lg text-[#B7B7C3] max-w-3xl leading-relaxed">
            I build software where data modeling directly serves the user’s next decision. Below are in-depth case studies for my e-commerce metal pricing platform, my multi-threaded Python banking server, and my corporate legal consultation portal.
          </p>

          {/* Quick Index Links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {PROJECTS.map((proj) => (
              <button
                key={proj.id}
                type="button"
                onClick={() => scrollToAnchor(proj.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all border ${
                  activeProject === proj.id
                    ? 'bg-[#FF5E3A] text-white border-[#FF5E3A]'
                    : 'bg-[#111116] text-[#B7B7C3] border-[#292930] hover:border-[#B7B7C3]'
                }`}
              >
                #{proj.id} — {proj.titlePrimary}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Container */}
        <div className="divide-y divide-[#292930]/80">
          {PROJECTS.map((project, idx) => {
            const nextProject = PROJECTS[(idx + 1) % PROJECTS.length];

            return (
              <article
                key={project.id}
                id={project.id}
                className="py-20 md:py-28 scroll-mt-20"
              >
                {/* Case Study Header */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-8">
                  <div>
                    <span className="font-mono text-xs text-[#FF5E3A] font-bold tracking-wider uppercase block mb-1">
                      PROJECT {project.number} · {project.category}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
                      {project.titlePrimary} <span className="font-serif italic font-normal text-[#FF5E3A]">{project.titleItalic}</span>
                    </h2>
                  </div>

                  {/* External links */}
                  <div className="flex flex-wrap items-center gap-3">
                    {project.hasPublicRepo && project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#292930] bg-[#111116] hover:border-[#B7B7C3] text-xs font-mono text-[#F5F5F7] transition-all"
                      >
                        <Github size={14} />
                        <span>View source on GitHub</span>
                        <ArrowUpRight size={13} className="text-[#FF5E3A]" />
                      </a>
                    )}
                  </div>
                </div>

                {/* 4 Case Study Parts */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Left Column: Parts 1, 2, 3 */}
                  <div className="lg:col-span-7 space-y-10">
                    {/* Part 1: User & Problem */}
                    <section className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <h3 className="text-xs font-mono uppercase tracking-widest text-[#B7B7C3] font-bold">
                          1. THE USER AND THE PROBLEM THEY FACE
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-[#F5F5F7] leading-relaxed font-sans bg-[#111116] p-5 rounded-xl border border-[#292930]">
                        {project.caseStudy.userAndProblem}
                      </p>
                    </section>

                    {/* Part 2: What I Built & Workflow */}
                    <section className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <h3 className="text-xs font-mono uppercase tracking-widest text-[#B7B7C3] font-bold">
                          2. WHAT I BUILT AND HOW THE WORKFLOW OPERATES
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-[#B7B7C3] leading-relaxed font-sans bg-[#111116] p-5 rounded-xl border border-[#292930]">
                        {project.caseStudy.whatBuiltAndWorkflow}
                      </p>

                      {/* Architecture Steps Flow */}
                      <div className="p-5 rounded-xl bg-[#0D0D12] border border-[#292930] space-y-3">
                        <span className="text-[10px] font-mono uppercase text-[#71717A] tracking-wider block">
                          SYSTEM WORKFLOW PIPELINE
                        </span>
                        <div className="space-y-2">
                          {project.caseStudy.architectureSteps.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-3 text-xs font-mono text-[#F5F5F7]">
                              <span className="w-5 h-5 rounded-full bg-[#1A1A24] text-[#FF5E3A] flex items-center justify-center font-bold text-[10px] shrink-0 border border-[#292930]">
                                {sIdx + 1}
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* Part 3: Concrete Implementation Decision */}
                    <section className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <h3 className="text-xs font-mono uppercase tracking-widest text-[#B7B7C3] font-bold">
                          3. KEY IMPLEMENTATION & DESIGN DECISION
                        </h3>
                      </div>
                      <div className="p-5 rounded-xl bg-[#111116] border border-[#292930] border-l-4 border-l-[#FF5E3A]">
                        <p className="text-sm sm:text-base text-[#F5F5F7] leading-relaxed font-sans font-medium">
                          {project.caseStudy.keyImplementationDecision}
                        </p>
                      </div>
                    </section>
                  </div>

                  {/* Right Column: Part 4 - Evidence, Outcomes, Next Project */}
                  <div className="lg:col-span-5 space-y-8">
                    {/* Part 4: Evidence & Outlined metrics */}
                    <section className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <h3 className="text-xs font-mono uppercase tracking-widest text-[#B7B7C3] font-bold">
                          4. VERIFIABLE EVIDENCE & CODE INSPECTION
                        </h3>
                      </div>

                      <div className="p-6 rounded-xl bg-[#111116] border border-[#292930] space-y-4">
                        <p className="text-xs text-[#B7B7C3] leading-relaxed font-sans">
                          {project.caseStudy.evidenceNotes}
                        </p>

                        <div className="space-y-2.5 pt-2">
                          <span className="text-[10px] font-mono uppercase text-[#71717A] tracking-wider block">
                            KEY SYSTEM CAPABILITIES:
                          </span>
                          {project.caseStudy.metricsOrOutcomes.map((metric, mIdx) => (
                            <div key={mIdx} className="flex items-start gap-2.5 text-xs text-[#F5F5F7]">
                              <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span>{metric}</span>
                            </div>
                          ))}
                        </div>

                        {/* Technologies used */}
                        <div className="pt-4 border-t border-[#292930]/80">
                          <span className="text-[10px] font-mono uppercase text-[#71717A] tracking-wider block mb-2">
                            STACK UTILISED
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((t) => (
                              <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1C1C26] text-[#B7B7C3] border border-[#292930]">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Next Project Link */}
                    <div className="p-5 rounded-xl border border-dashed border-[#292930] bg-[#0C0C10] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#71717A] uppercase block">
                          CONTINUE READING
                        </span>
                        <span className="text-sm font-heading font-bold text-white">
                          Next: {nextProject.titlePrimary} {nextProject.titleItalic}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => scrollToAnchor(nextProject.id)}
                        className="p-2.5 rounded-full bg-[#181822] hover:bg-[#FF5E3A] text-white transition-colors"
                        aria-label={`Jump to next project ${nextProject.titlePrimary}`}
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
};
