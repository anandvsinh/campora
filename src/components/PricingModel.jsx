import React from 'react';
import { DollarSign, ShieldCheck, CheckCircle2, Info } from 'lucide-react';

export default function PricingModel() {
  return (
    <section className="py-16 px-4 sm:px-8 bg-[#0D1722]/50 border-y border-[#F0F9FF]/10">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00B4D8]">
            Transparent Marketplace Economics
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#F0F9FF] mt-1">
            Fair pricing. Zero hidden surprises.
          </h2>
          <p className="text-[#F0F9FF]/70 text-sm sm:text-base max-w-lg mx-auto mt-2">
            CAMPORA operates on a clean 10% commission on completed transactions. No upfront registration fees or subscription traps for students.
          </p>
        </div>

        {/* Breakdown Card */}
        <div className="glass-card p-6 sm:p-8 max-w-2xl mx-auto border border-[#00B4D8]/40 shadow-2xl space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[#00B4D8] border-b border-[#F0F9FF]/10 pb-3">
            Sample Transaction Breakdown
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-[#070D14] border border-[#F0F9FF]/10">
              <div className="text-[10px] text-[#F0F9FF]/50 uppercase font-bold">Total Project Value</div>
              <div className="font-serif text-3xl font-bold text-[#F0F9FF] mt-1">₹500</div>
              <div className="text-[10px] text-[#F0F9FF]/60 mt-1">Client Payout</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#070D14] border border-emerald-500/30">
              <div className="text-[10px] text-emerald-400 uppercase font-bold">Student Earnings (90%)</div>
              <div className="font-serif text-3xl font-bold text-emerald-400 mt-1">₹450</div>
              <div className="text-[10px] text-emerald-400/70 mt-1">Direct Bank Payout</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#070D14] border border-[#00B4D8]/30">
              <div className="text-[10px] text-[#00B4D8] uppercase font-bold">CAMPORA Fee (10%)</div>
              <div className="font-serif text-3xl font-bold text-[#00B4D8] mt-1">₹50</div>
              <div className="text-[10px] text-[#00B4D8]/70 mt-1">Platform Maintenance</div>
            </div>
          </div>

          <div className="text-left text-xs text-[#F0F9FF]/70 space-y-2 pt-2 border-t border-[#F0F9FF]/10">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00B4D8] shrink-0" />
              <span>Funds are safely escrowed until project completion is approved by buyer.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00B4D8] shrink-0" />
              <span>Students can withdraw earned balances directly to UPI / bank accounts anytime.</span>
            </div>
          </div>
        </div>

        {/* Future Monetization Roadmap Note */}
        <div className="inline-flex items-center gap-2 text-xs text-[#F0F9FF]/50 bg-[#070D14] px-4 py-2 rounded-full border border-[#F0F9FF]/10">
          <Info className="w-3.5 h-3.5 text-[#00B4D8]" />
          <span>Future Roadmap: Premium Featured Profiles, Organization Team Portals & University Partnerships.</span>
        </div>

      </div>
    </section>
  );
}
