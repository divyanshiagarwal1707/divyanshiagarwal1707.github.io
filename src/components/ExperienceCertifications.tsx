import React from 'react';
import { Award, Calendar, CheckCircle2, Trophy, Users } from 'lucide-react';
import { EXPERIENCES, CERTIFICATIONS } from '../data/portfolioData';

export const ExperienceCertifications: React.FC = () => {
  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-[#292930]/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Experience & Activities */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5E3A]" />
              <span className="text-[11px] font-mono tracking-widest text-[#B7B7C3] uppercase">
                JOURNEY & ENGAGEMENT
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-[#F5F5F7]">
              Experience & Activities
            </h3>
          </div>

          <div className="space-y-6">
            {EXPERIENCES.map((exp, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-xl bg-[#111116] border border-[#292930] hover:border-[#FF5E3A]/40 transition-colors group"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="font-mono text-xs text-[#FF5E3A] flex items-center gap-1.5 font-semibold">
                    <Calendar size={13} />
                    {exp.date}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1B1B24] text-[#B7B7C3] border border-[#292930]">
                    {exp.type}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-heading font-bold text-white group-hover:text-[#FF5E3A] transition-colors flex items-center gap-2">
                  {exp.type === 'achievement' && <Trophy size={16} className="text-amber-400 shrink-0" />}
                  {exp.type === 'leadership' && <Users size={16} className="text-emerald-400 shrink-0" />}
                  {exp.type === 'activity' && <CheckCircle2 size={16} className="text-[#E05263] shrink-0" />}
                  <span>{exp.role}</span>
                </h4>

                <p className="text-xs sm:text-sm font-sans font-medium text-[#B7B7C3] mt-1">
                  {exp.organization}
                </p>

                <p className="text-xs text-[#71717A] mt-2.5 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Certifications (Anchor at #certifications) */}
        <div id="certifications" className="lg:col-span-6 space-y-8 scroll-mt-24">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E05263]" />
              <span className="text-[11px] font-mono tracking-widest text-[#B7B7C3] uppercase">
                VERIFIED CREDENTIALS
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-[#F5F5F7]">
              Certifications
            </h3>
          </div>

          <div className="space-y-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-xl bg-[#111116] border border-[#292930] hover:border-[#E05263]/40 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-[#1B1B26] text-[#FF5E3A] mt-0.5">
                    <Award size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono text-xs text-[#B7B7C3]">
                        {cert.date}
                      </span>
                      {cert.hasFile ? (
                        <a
                          href={cert.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-[#FF5E3A] hover:underline"
                        >
                          View certificate ↗
                        </a>
                      ) : (
                        <span className="text-[10px] font-mono text-[#71717A] italic">
                          Credential on record
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm sm:text-base font-heading font-bold text-white mt-1 leading-snug">
                      {cert.title}
                    </h4>

                    {cert.organization && (
                      <p className="text-xs font-mono text-[#71717A] mt-1">
                        Issued by: {cert.organization}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="p-4 rounded-xl border border-dashed border-[#292930] bg-[#0A0A0E] text-xs font-mono text-[#71717A] text-center">
              Additional course certificates in Data Structures & Salesforce ongoing.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
