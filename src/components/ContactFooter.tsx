import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Github, Linkedin, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = PERSONAL_INFO.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-24 md:py-36 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-[#292930]/60">
      {/* Two-Column Closing Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
        {/* Left Side: Status, 3-line invitation, copy, actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5E3A] animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-[#B7B7C3] uppercase">
              {PERSONAL_INFO.statusLine}
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight leading-[0.92] text-white">
            LET’S BUILD<br />
            <span className="font-serif italic font-normal text-coral-amber">SOMETHING</span><br />
            TOGETHER.
          </h2>

          <p className="text-base sm:text-lg text-[#B7B7C3] max-w-xl font-sans leading-relaxed pt-2">
            Have a project, internship, or student collaboration in mind? I’d love to hear about it.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            {/* Primary Coral Pill */}
            <a
              href={PERSONAL_INFO.emailAction}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FF5E3A] text-white font-heading font-bold text-sm tracking-wide hover:bg-[#FF7352] transition-all hover:scale-105 shadow-xl shadow-[#FF5E3A]/20"
            >
              <span>Send an email</span>
              <ArrowUpRight size={16} />
            </a>

            {/* Secondary Outlined Pill with Copy email feedback */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#292930] hover:border-[#B7B7C3] bg-[#111116] text-[#F5F5F7] font-mono text-xs sm:text-sm tracking-wide transition-all"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Email copied</span>
                </>
              ) : (
                <>
                  <Copy size={16} className="text-[#B7B7C3]" />
                  <span>Copy email</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Compact Charcoal Information Panel */}
        <div className="lg:col-span-5">
          <div className="bg-[#111116] border border-[#292930] rounded-2xl p-7 sm:p-9 shadow-2xl space-y-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#71717A] uppercase block mb-1">
                EMAIL
              </span>
              <a
                href={PERSONAL_INFO.emailAction}
                className="text-sm sm:text-base font-mono text-[#F5F5F7] hover:text-[#FF5E3A] transition-colors break-all"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            <div className="h-[1px] bg-[#292930]/40" />

            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#71717A] uppercase block mb-1">
                EDUCATION
              </span>
              <p className="text-sm sm:text-base font-sans text-[#F5F5F7]">
                {PERSONAL_INFO.university} · BCA
              </p>
            </div>

            <div className="h-[1px] bg-[#292930]/40" />

            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#71717A] uppercase block mb-1">
                FOCUS
              </span>
              <p className="text-sm sm:text-base font-sans text-[#F5F5F7]">
                Salesforce development · Data analysis · Software development
              </p>
            </div>

            <div className="h-[1px] bg-[#292930]/40" />

            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#71717A] uppercase block mb-2.5">
                ELSEWHERE
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Divyanshi's GitHub Profile"
                  className="w-10 h-10 rounded-full border border-[#292930] bg-[#181822] flex items-center justify-center text-[#B7B7C3] hover:text-white hover:border-[#FF5E3A] transition-all hover:scale-105"
                >
                  <Github size={18} />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Divyanshi's LinkedIn Profile"
                  className="w-10 h-10 rounded-full border border-[#292930] bg-[#181822] flex items-center justify-center text-[#B7B7C3] hover:text-white hover:border-[#FF5E3A] transition-all hover:scale-105"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fine Horizontal Rule & Bottom Copyright / Back to top */}
      <div className="pt-8 border-t border-[#292930]/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#71717A]">
        <div>
          © {PERSONAL_INFO.currentYear} {PERSONAL_INFO.name}. All rights reserved.
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-[#B7B7C3] hover:text-[#FF5E3A] transition-colors group cursor-pointer"
        >
          <span>Back to top</span>
          <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};

