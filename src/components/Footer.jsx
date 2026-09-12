import React from 'react';
import { useApp } from '../context/AppContext';
import CamporaLogo from './CamporaLogo';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const { navigateTo } = useApp();

  return (
    <footer className="border-t border-[#F0F9FF]/10 bg-[#070D14] pt-16 pb-12 px-4 sm:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Manifesto & Logo Column */}
          <div className="md:col-span-5 space-y-4">
            <CamporaLogo size="lg" />
            <p className="text-xs text-[#F0F9FF]/70 max-w-md leading-relaxed font-light mt-3">
              CAMPORA is the verified student talent marketplace. Every student has a skill. Every skill deserves an opportunity. Built for students, college clubs, societies, hackathon teams, and startups.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B4D8]/10 text-[11px] text-[#00B4D8] border border-[#00B4D8]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Verified Campus Identity</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">Marketplace</h4>
            <ul className="space-y-2 text-xs text-[#F0F9FF]/70">
              <li>
                <button onClick={() => navigateTo('discover')} className="hover:text-[#00B4D8] transition-colors">
                  Discover Talent
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('campus-hubs')} className="hover:text-[#00B4D8] transition-colors">
                  Campus Hubs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wishlist')} className="hover:text-[#00B4D8] transition-colors">
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="hover:text-[#00B4D8] transition-colors"
                >
                  How CAMPORA Works
                </button>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">For Students & Clubs</h4>
            <ul className="space-y-2 text-xs text-[#F0F9FF]/70">
              <li>Verified Student Seller Studio</li>
              <li>College Clubs & Hackathon Hiring</li>
              <li>10% Transparent Commission Escrow</li>
              <li>CAMPORA Trust Score Index</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#F0F9FF]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F0F9FF]/50">
          <div>
            © 2026 CAMPORA Student Skill Marketplace. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
            <span>for the Indian campus community.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
