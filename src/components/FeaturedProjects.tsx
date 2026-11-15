import React from 'react';
import { ArrowUpRight, Github, Terminal, Sparkles, Scale, ShieldCheck } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';

interface FeaturedProjectsProps {
  onNavigateToProjects: (hash?: string) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onNavigateToProjects }) => {
  return (
    <section id="projects-preview" className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-[#292930]/60">
      {/* Header: Tiny coral marker + SELECTED WORK label + 2-line heading */}
      <div className="mb-16 md:mb-24">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FF5E3A]" />
          <span className="text-[11px] font-mono tracking-widest text-[#B7B7C3] uppercase">
            SELECTED WORK
          </span>
        </div>
        <h2 className="text-5xl sm:text-6xl md:text-8xl font-heading font-black tracking-tight leading-[0.9] text-steel-gradient">
          FEATURED<br />PROJECTS
        </h2>
      </div>

      {/* 3 Alternating Project Rows */}
      <div className="space-y-24 md:space-y-36">
        {PROJECTS.map((project, index) => {
          const isEven = index % 2 === 1; // 0: Image left, 1: Copy left, 2: Image left

          return (
            <div
              key={project.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                isEven ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Preview Visual Column */}
              <div className={`lg:col-span-7 ${isEven ? 'lg:col-start-6' : 'lg:col-start-1'}`}>
                <div className="relative rounded-2xl overflow-hidden border border-[#292930] bg-[#111116] shadow-2xl group transition-all duration-300 hover:border-[#FF5E3A]/40">
                  {renderProjectPreview(project.id)}
                </div>
              </div>

              {/* Copy Column */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:col-start-1' : 'lg:col-start-8'}`}>
                {/* Small project number and category */}
                <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#B7B7C3]">
                  <span className="text-[#FF5E3A] font-bold">{project.number}</span>
                  <span>/</span>
                  <span className="tracking-wider uppercase">{project.category}</span>
                </div>

                {/* Distinctive Title with bold sans and italic serif */}
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-[#F5F5F7] mb-4">
                  <span>{project.titlePrimary} </span>
                  <span className="font-serif italic font-normal text-[#FF5E3A]">{project.titleItalic}</span>
                </h3>

                {/* One-sentence summary */}
                <p className="text-sm sm:text-base font-semibold text-[#F5F5F7] mb-3 leading-snug">
                  “{project.summary}”
                </p>

                {/* Supporting paragraph */}
                <p className="text-xs sm:text-sm text-[#B7B7C3] leading-relaxed mb-6 font-sans">
                  {project.description}
                </p>

                {/* Technologies tag pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#1A1A22] text-[#B7B7C3] border border-[#292930]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={`/projects#${project.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateToProjects(project.id);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-heading font-bold bg-[#F5F5F7] text-[#08080C] hover:bg-[#FF5E3A] hover:text-white transition-all shadow-md group/btn"
                  >
                    <span>Read case study</span>
                    <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>

                  {project.hasPublicRepo && project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-mono text-[#B7B7C3] hover:text-[#F5F5F7] border border-[#292930] hover:border-[#B7B7C3] transition-all"
                    >
                      <Github size={14} />
                      <span>View source on GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* End showcase with Explore all projects link */}
      <div className="mt-20 pt-8 border-t border-[#292930]/40 flex justify-end">
        <a
          href="/projects"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToProjects();
          }}
          className="group inline-flex items-center gap-2 text-sm sm:text-base font-heading font-bold text-[#F5F5F7] hover:text-[#FF5E3A] transition-colors"
        >
          <span>Explore all projects</span>
          <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#E05263]" />
        </a>
      </div>
    </section>
  );
};

// Render Rich Illustrative Previews
function renderProjectPreview(projectId: string) {
  if (projectId === 'luxeloom') {
    return (
      <div className="p-5 sm:p-7 bg-gradient-to-br from-[#16141B] to-[#0E0D12]">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#292930]/80 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E54B64]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span className="ml-2 text-[#71717A]">luxeloom.store/product/gold-solitaire</span>
          </div>
          <span className="text-[#FF5E3A] font-semibold text-[10px] uppercase tracking-wider bg-[#FF5E3A]/10 px-2 py-0.5 rounded border border-[#FF5E3A]/20">
            Live Metal Calculation Demo
          </span>
        </div>

        {/* Product Detail Layout */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
          {/* Jewellery Visual representation */}
          <div className="sm:col-span-5 bg-gradient-to-b from-[#221F28] to-[#14121A] rounded-xl p-4 flex flex-col items-center justify-center border border-[#292930] aspect-square relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.12)_0%,transparent_70%)]" />
            {/* Elegant jewellery geometric rendering */}
            <div className="relative w-28 h-28 rounded-full border-4 border-amber-400/80 shadow-[0_0_25px_rgba(255,215,0,0.3)] flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-200/60 flex items-center justify-center">
                <Sparkles className="text-amber-300 w-8 h-8 animate-pulse" />
              </div>
            </div>
            <span className="mt-3 text-[11px] font-heading font-semibold text-amber-200 tracking-wide text-center">
              22K Royal Solitaire Pendant
            </span>
            <span className="text-[10px] font-mono text-[#71717A]">Net Wt: 4.500 g</span>
          </div>

          {/* Pricing Engine & Checkout Breakdown */}
          <div className="sm:col-span-7 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-mono text-[#B7B7C3]">Market Rate (22K)</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">₹6,840 / gram</span>
            </div>

            <div className="bg-[#0C0B0F] p-3 rounded-lg border border-[#292930] space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-[#B7B7C3]">
                <span>Metal Value (4.5g × ₹6,840)</span>
                <span className="text-[#F5F5F7]">₹30,780.00</span>
              </div>
              <div className="flex justify-between text-[#B7B7C3]">
                <span>Making Charges (12%)</span>
                <span className="text-[#F5F5F7]">₹3,693.60</span>
              </div>
              <div className="flex justify-between text-[#B7B7C3]">
                <span>Applicable GST (3%)</span>
                <span className="text-[#F5F5F7]">₹1,034.20</span>
              </div>
              <div className="pt-2 border-t border-[#292930] flex justify-between font-bold text-sm">
                <span className="text-amber-300">Total Price</span>
                <span className="text-white">₹35,507.80</span>
              </div>
            </div>

            {/* Simulated Razorpay Test Flow */}
            <div className="flex items-center gap-2 pt-1">
              <button 
                type="button"
                className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-[#FF5E3A] to-[#FF8A6E] text-white font-heading font-bold text-xs tracking-wide text-center shadow-lg"
              >
                Proceed to Checkout (Razorpay Test)
              </button>
            </div>

            {/* Chatbot notification badge */}
            <div className="flex items-center gap-2 bg-[#1B1922] p-2 rounded border border-[#292930] text-[11px] font-mono text-[#B7B7C3]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>LuxeBot: Order tracking & certificate support active</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === 'securebank') {
    return (
      <div className="p-5 sm:p-7 bg-[#0B0C10] font-mono text-xs">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#292930] text-[#71717A]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E54B64]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span className="ml-2 text-[#A1A1AA] flex items-center gap-1.5">
              <Terminal size={12} /> securebank_cli.py — bash — 80×24
            </span>
          </div>
          <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
            DEMO DATA · LOCAL SOCKET
          </span>
        </div>

        {/* Terminal Screen Content */}
        <div className="pt-4 space-y-2 text-[#F5F5F7]">
          <p className="text-[#71717A]">
            [SecureBank Core] Initializing TCP connection to 127.0.0.1:8080...
          </p>
          <p className="text-emerald-400">
            ✓ Connected. Worker Thread #3 spawned for Client ID: CL-904
          </p>
          
          <div className="pt-2 pl-2 border-l-2 border-[#292930] space-y-1.5">
            <p className="text-[#B7B7C3]">
              <span className="text-[#FF5E3A]">&gt;</span> AUTH_USER --account SB-82914 --pin ****
            </p>
            <p className="text-emerald-300">
              [AUTH OK] Account Holder: Divyanshi Agarwal | Type: SavingsAccount
            </p>
            <p className="text-[#B7B7C3]">
              <span className="text-[#FF5E3A]">&gt;</span> POST_TRANSACTION --type DEPOSIT --amount 25000.00
            </p>
            <p className="text-[#A1A1AA]">
              [SQLite] BEGIN TRANSACTION; UPDATE accounts SET balance = balance + 25000.00...
            </p>
            <p className="text-[#A1A1AA]">
              [AUDIT LOG] Inserted Tx #TX-4819 | Timestamp: 2026-11-15 19:40:02
            </p>
            <p className="text-cyan-300 font-bold">
              [TX SUCCESS] New Balance: ₹1,67,500.00 | ACID Commit verified.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#292930] flex items-center justify-between text-[11px] text-[#71717A]">
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-emerald-400" />
              Concurrent Lock: Released
            </span>
            <span>Latency: 3.8ms</span>
          </div>
        </div>
      </div>
    );
  }

  // Law Firm Website Preview
  return (
    <div className="p-5 sm:p-7 bg-[#101017]">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#292930] text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E54B64]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
          <span className="ml-2 text-[#71717A]">lawfirm-advocates.org/consultation</span>
        </div>
        <span className="text-[#E05263] text-[10px] uppercase font-semibold bg-[#E05263]/10 px-2 py-0.5 rounded border border-[#E05263]/20">
          Client Intake Flow
        </span>
      </div>

      {/* Corporate Law Visual */}
      <div className="mt-4 space-y-4">
        <div className="bg-[#171722] p-4 rounded-xl border border-[#292930] flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-[#242436] text-amber-300">
            <Scale size={24} />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF5E3A] block">
              Corporate & Commercial Advisory
            </span>
            <h4 className="text-sm sm:text-base font-heading font-bold text-white">
              Apex Corporate Law Partners
            </h4>
            <p className="text-xs text-[#B7B7C3] mt-1">
              Regulatory compliance, IP trademark protection, and contract dispute arbitration.
            </p>
          </div>
        </div>

        {/* 3-Step Booking Intake Illustration */}
        <div className="bg-[#0C0C12] p-4 rounded-xl border border-[#292930] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#71717A]">
            <span className="text-[#FF5E3A] font-semibold">Step 2 of 3: Consultation Schedule</span>
            <span>Est. Review: 30 Mins</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded bg-[#1B1B27] border border-[#292930] text-[#B7B7C3]">
              <span className="block text-[10px] text-[#71717A]">Mon</span>
              <span className="font-bold text-white">10:30 AM</span>
            </div>
            <div className="p-2 rounded bg-[#FF5E3A]/20 border border-[#FF5E3A] text-white">
              <span className="block text-[10px] text-[#FF5E3A]">Tue (Selected)</span>
              <span className="font-bold">02:00 PM</span>
            </div>
            <div className="p-2 rounded bg-[#1B1B27] border border-[#292930] text-[#B7B7C3]">
              <span className="block text-[10px] text-[#71717A]">Wed</span>
              <span className="font-bold text-white">04:30 PM</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-2 rounded-lg bg-[#F5F5F7] text-[#08080C] font-heading font-bold text-xs hover:bg-[#FF5E3A] hover:text-white transition-colors"
          >
            Confirm Legal Consultation Request
          </button>
        </div>
      </div>
    </div>
  );
}

