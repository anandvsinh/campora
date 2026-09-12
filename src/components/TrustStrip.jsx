import React from 'react';
import { ShieldCheck, Image, Lock, Star, MapPin } from 'lucide-react';

export default function TrustStrip() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Verified Students',
      desc: 'Every seller verified with official college credentials & IDs.'
    },
    {
      icon: Image,
      title: 'Real Portfolios',
      desc: 'Authentic student project work & case studies.'
    },
    {
      icon: Lock,
      title: 'Secure Transactions',
      desc: 'Funds held safely until project milestones are approved.'
    },
    {
      icon: Star,
      title: 'Verified Reviews',
      desc: 'Only completed transactions generate client reviews.'
    },
    {
      icon: MapPin,
      title: 'Campus Discovery',
      desc: 'Hire talent directly from your university or peer networks.'
    }
  ];

  return (
    <section className="py-10 border-y border-[#F0F9FF]/10 bg-[#0D1722]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00B4D8]">
            Platform Integrity & Trust
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F0F9FF] mt-1">
            Built for the campus community
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {trustItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div 
                key={i} 
                className="p-4 rounded-2xl bg-[#13202E]/80 border border-[#F0F9FF]/5 hover:border-[#00B4D8]/30 transition-all text-left space-y-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#00B4D8]/10 flex items-center justify-center text-[#00B4D8] group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-[#F0F9FF]">{item.title}</h4>
                <p className="text-xs text-[#F0F9FF]/60 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
