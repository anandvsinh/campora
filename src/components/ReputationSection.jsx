import React from 'react';
import { ShieldCheck, Star, Award, Zap, CheckCircle2, TrendingUp, Heart } from 'lucide-react';

export default function ReputationSection() {
  const badgesList = [
    { title: 'Verified Student', desc: 'ID & Email Verified', icon: ShieldCheck, color: 'text-[#00B4D8] border-[#00B4D8]/40 bg-[#00B4D8]/10' },
    { title: 'Rising Talent', desc: 'Fastest Growth in Category', icon: TrendingUp, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' },
    { title: 'Top Rated', desc: '4.9+ Rating over 15+ Jobs', icon: Star, color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' },
    { title: '100% Reliable', desc: 'Zero Cancelled Orders', icon: CheckCircle2, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
    { title: 'Fast Responder', desc: '< 15 mins Response Time', icon: Zap, color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' },
    { title: 'Campus Favorite', desc: '10+ Repeat Club Orders', icon: Heart, color: 'text-rose-400 border-rose-500/40 bg-rose-500/10' }
  ];

  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Copy & Badge System */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/30 text-xs font-bold text-[#00B4D8]">
            <Award className="w-4 h-4" />
            <span>CAMPORA Differentiator</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-[#F0F9FF] leading-tight">
            Your work becomes <br />
            <span className="italic bg-gradient-to-r from-[#00B4D8] to-[#06B6D4] bg-clip-text text-transparent">
              your reputation.
            </span>
          </h2>

          <p className="text-[#F0F9FF]/75 text-base sm:text-lg leading-relaxed font-light">
            Every completed project on CAMPORA is recorded on your verified portfolio ledger. Completed work builds your professional identity, earns trust badges, and opens doors to internships, startups, and high-value gigs.
          </p>

          {/* Achievement Badges Showcase */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">Earnable Achievement Badges</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {badgesList.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div 
                    key={i} 
                    className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all hover:scale-105 ${b.color}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <div>
                      <div className="text-xs font-bold leading-none">{b.title}</div>
                      <div className="text-[9px] opacity-80 mt-0.5">{b.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Visual CAMPORA Trust Score Calculation Widget */}
        <div className="lg:col-span-6 relative">
          <div className="relative glass-card p-6 sm:p-8 border border-[#00B4D8]/40 shadow-2xl space-y-6">
            
            {/* Widget Top Bar */}
            <div className="flex items-center justify-between border-b border-[#F0F9FF]/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">
                  Verified Student Score Card
                </span>
                <h3 className="font-serif text-2xl text-[#F0F9FF]">CAMPORA Trust Index</h3>
              </div>
              
              {/* Score Display Ring */}
              <div className="flex items-center gap-3 bg-[#070D14] px-4 py-2 rounded-2xl border border-[#00B4D8]/40">
                <div className="font-serif text-3xl font-bold text-[#00B4D8]">94</div>
                <div className="text-[10px] text-[#F0F9FF]/60 uppercase font-bold leading-tight">
                  out of <br /> 100
                </div>
              </div>
            </div>

            {/* Score Breakdown Elements */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#0D1722] border border-[#F0F9FF]/5">
                <span className="flex items-center gap-2 text-[#F0F9FF]/90 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" /> Student ID & College Email Verified
                </span>
                <span className="font-bold text-[#00B4D8]">+25 pts</span>
              </div>

              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#0D1722] border border-[#F0F9FF]/5">
                <span className="flex items-center gap-2 text-[#F0F9FF]/90 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" /> 24 Completed Campus Projects
                </span>
                <span className="font-bold text-[#00B4D8]">+30 pts</span>
              </div>

              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#0D1722] border border-[#F0F9FF]/5">
                <span className="flex items-center gap-2 text-[#F0F9FF]/90 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" /> 4.9 ★ Verified Client Rating
                </span>
                <span className="font-bold text-[#00B4D8]">+24 pts</span>
              </div>

              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#0D1722] border border-[#F0F9FF]/5">
                <span className="flex items-center gap-2 text-[#F0F9FF]/90 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" /> 100% Response Rate (&lt;15 mins)
                </span>
                <span className="font-bold text-[#00B4D8]">+10 pts</span>
              </div>

              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#0D1722] border border-[#F0F9FF]/5">
                <span className="flex items-center gap-2 text-[#F0F9FF]/90 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" /> 6 Repeat Club Buyers
                </span>
                <span className="font-bold text-[#00B4D8]">+5 pts</span>
              </div>
            </div>

            <div className="pt-2 text-center text-[11px] text-[#F0F9FF]/50 italic">
              *Trust Score dynamically updates after every completed transaction.
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
