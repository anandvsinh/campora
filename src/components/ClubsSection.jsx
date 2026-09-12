import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, Shield, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ClubsSection() {
  const { switchRole, navigateTo } = useApp();

  const clubTypes = [
    { name: 'College Clubs & Societies', desc: 'Fest posters, branding decks, sponsorship materials, aftermovies.' },
    { name: 'Hackathon Teams', desc: 'Frontend prototypes, pitch deck design, video teasers, presentation UI.' },
    { name: 'Event Organisers', desc: 'Live event photography, badge design, registration websites.' },
    { name: 'Student Startups', desc: 'MVP web apps, social media graphics, explainer videos, logo design.' }
  ];

  return (
    <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="glass-card p-8 sm:p-12 border border-[#00B4D8]/30 relative overflow-hidden bg-gradient-to-br from-[#0D1722] via-[#13202E] to-[#070D14]">
        
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B4D8]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/30 text-xs font-bold text-[#00B4D8]">
              <Users className="w-4 h-4" />
              <span>B2B Campus Hiring</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl text-[#F0F9FF] leading-tight">
              Built for college clubs, societies & hackathon teams.
            </h2>

            <p className="text-[#F0F9FF]/75 text-base leading-relaxed font-light">
              Stop asking ten WhatsApp groups for a poster designer or video editor. CAMPORA provides student organisations with instant access to verified talent at student-friendly pricing.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {clubTypes.map((c, i) => (
                <div key={i} className="p-3 rounded-2xl bg-[#070D14]/60 border border-[#F0F9FF]/10 space-y-1">
                  <div className="text-xs font-bold text-[#00B4D8] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{c.name}</span>
                  </div>
                  <div className="text-[11px] text-[#F0F9FF]/60 font-light">{c.desc}</div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button 
                onClick={() => switchRole('buyer')}
                className="btn-primary text-sm py-3 px-6"
              >
                <span>Hire as an Organisation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigateTo('discover')}
                className="btn-secondary text-sm py-3 px-6"
              >
                <span>Browse Available Talent</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-[#070D14] border border-[#00B4D8]/30 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#F0F9FF]/10 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">Organisation Account</span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">Verified Org</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00B4D8]/20 flex items-center justify-center text-[#00B4D8] font-bold text-sm">
                    AT
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#F0F9FF]">Apex Tech Society</h4>
                    <p className="text-xs text-[#F0F9FF]/60">GLA University · 12 Active Hiring Requests</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#13202E] border border-[#F0F9FF]/5 space-y-1">
                  <div className="text-xs font-bold text-[#F0F9FF]">TechnoFest '26 Poster & Brand Kit</div>
                  <div className="flex items-center justify-between text-[11px] text-[#F0F9FF]/60">
                    <span>Hired: Aarav Sharma</span>
                    <span className="text-[#00B4D8] font-bold">₹1,500</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#13202E] border border-[#F0F9FF]/5 space-y-1">
                  <div className="text-xs font-bold text-[#F0F9FF]">Hackathon Aftermovie Edit</div>
                  <div className="flex items-center justify-between text-[11px] text-[#F0F9FF]/60">
                    <span>Hired: Priya Verma</span>
                    <span className="text-[#00B4D8] font-bold">₹2,200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
