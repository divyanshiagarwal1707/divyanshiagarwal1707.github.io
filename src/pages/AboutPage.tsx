import React, { useEffect } from 'react';
import { Download, ArrowUpRight, GraduationCap, Code2, Sparkles, Database, Briefcase, Mail, Github, Linkedin, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_RECORDS, SKILL_CATEGORIES, EXPERIENCES } from '../data/portfolioData';

interface AboutPageProps {
  onNavigate: (path: string, hash?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About — Divyanshi Agarwal";
  }, []);

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-[#292930]/60">
          {/* Portrait with high contrast B&W */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#292930] bg-gradient-to-b from-[#181824] to-[#111116] shadow-2xl max-w-md mx-auto lg:mx-0">
              <img
                src={PERSONAL_INFO.portraitPath}
                alt="Divyanshi Agarwal"
                className="w-full h-auto aspect-square object-contain filter grayscale contrast-120 brightness-100 p-2"
              />
              <div className="absolute inset-0 grain-overlay opacity-25 mix-blend-overlay pointer-events-none" />
              
              <div className="p-4 bg-[#111116] border-t border-[#292930] flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold">{PERSONAL_INFO.name}</span>
                <span className="text-[#FF5E3A]">{PERSONAL_INFO.university}</span>
              </div>
            </div>

            {/* Quick Actions under Portrait */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={PERSONAL_INFO.resumePath}
                download="Divyanshi_Agarwal_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF5E3A] text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#FF7352] transition-all shadow-lg"
              >
                <Download size={15} />
                <span>Download Résumé (PDF)</span>
              </a>

              <a
                href={PERSONAL_INFO.emailAction}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#292930] bg-[#111116] text-[#F5F5F7] font-mono text-xs hover:border-[#B7B7C3] transition-all"
              >
                <Mail size={15} />
                <span>Say Hello</span>
              </a>
            </div>
          </div>

          {/* Biography & Approach */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#B7B7C3] uppercase block mb-2">
                BIOGRAPHY & ENGINEERING ETHOS
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-steel-gradient">
                Building Software Around Real Human Steps
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#F5F5F7] leading-relaxed font-sans font-normal">
              {PERSONAL_INFO.introParagraph}
            </p>

            {/* Concrete Examples from Each Project */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#FF5E3A] font-bold">
                HOW I THINK THROUGH REAL WORKFLOWS:
              </h3>

              <div className="p-4 rounded-xl bg-[#111116] border border-[#292930] space-y-1.5">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-sm">
                  <Sparkles size={16} className="text-amber-400" />
                  <span>Explaining a Changing Jewellery Price (LuxeLoom)</span>
                </div>
                <p className="text-xs sm:text-sm text-[#B7B7C3] leading-relaxed">
                  Instead of showing an arbitrary total, I broke down live 22K/24K metal market fluctuations against item gram weight, making charges, and taxes. Transparency upfront builds consumer trust before checkout.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111116] border border-[#292930] space-y-1.5">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-sm">
                  <Database size={16} className="text-cyan-400" />
                  <span>Preserving Account Transactions in a Database (SecureBank)</span>
                </div>
                <p className="text-xs sm:text-sm text-[#B7B7C3] leading-relaxed">
                  In a multi-threaded Python server, financial accuracy is paramount. I separated polymorphic OOP account behavior from the SQLite persistence layer, enforcing atomic transactions with timestamped audit logs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111116] border border-[#292930] space-y-1.5">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-sm">
                  <Briefcase size={16} className="text-rose-400" />
                  <span>Guiding a Prospective Legal Client to a Booking (Law Firm Website)</span>
                </div>
                <p className="text-xs sm:text-sm text-[#B7B7C3] leading-relaxed">
                  Legal clients often approach websites under stress. I structured practice areas around clear dilemmas and converted dense inquiry forms into a step-by-step consultation booking flow with explicit privacy disclosures.
                </p>
              </div>
            </div>

            {/* Link to Certifications on Home */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/', 'certifications')}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#E05263] hover:text-[#FF5E3A] transition-colors"
              >
                <span>View verified certificates on Home</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <section className="py-16 border-b border-[#292930]/60">
          <div className="flex items-center gap-2 mb-8">
            <GraduationCap className="text-[#FF5E3A]" size={20} />
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Formal Education
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EDUCATION_RECORDS.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#111116] border border-[#292930] hover:border-[#FF5E3A]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-2 font-mono text-xs">
                    <span className="text-[#FF5E3A] font-bold">{edu.period}</span>
                    <span className="px-2 py-0.5 rounded bg-[#1C1C26] text-white font-semibold">
                      {edu.score}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-heading font-bold text-white mb-1">
                    {edu.degree}
                  </h3>

                  <p className="text-xs text-[#B7B7C3] font-medium mb-3">
                    {edu.institution}
                  </p>

                  {edu.details && (
                    <p className="text-xs text-[#71717A] leading-relaxed">
                      {edu.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Competencies Matrix */}
        <section className="py-16 border-b border-[#292930]/60">
          <div className="flex items-center gap-2 mb-8">
            <Code2 className="text-[#E05263]" size={20} />
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Technical Foundations & Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.title} className="p-5 rounded-xl bg-[#111116] border border-[#292930]">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#FF5E3A] mb-4 font-semibold">
                  {cat.title}
                </h3>
                <ul className="space-y-2">
                  {cat.skills.map((s) => (
                    <li key={s} className="text-xs sm:text-sm text-[#F5F5F7] flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#B7B7C3]" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Student Activities & Leadership */}
        <section className="py-16">
          <div className="flex items-center gap-2 mb-8">
            <ShieldCheck className="text-emerald-400" size={20} />
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Activities & Contributions
            </h2>
          </div>

          <div className="space-y-4">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#111116] border border-[#292930] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#FF5E3A]">{exp.date}</span>
                    <span className="text-white font-heading font-bold text-sm sm:text-base">{exp.role}</span>
                  </div>
                  <p className="text-xs text-[#B7B7C3] mt-1">{exp.organization} — {exp.description}</p>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1B1B26] text-[#71717A] border border-[#292930] self-start sm:self-center">
                  {exp.type}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

