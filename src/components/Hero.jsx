import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, CheckCircle2, Star, ShieldCheck, Sparkles, Zap, Award } from 'lucide-react';

export default function Hero() {
  const { navigateTo, switchRole } = useApp();

  return (
    <section className="relative pt-8 pb-16 px-4 sm:px-8 overflow-hidden">
      {/* Background Ambient Glows (Logo Teal/Cyan) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#0077B6]/30 via-[#00B4D8]/20 to-transparent blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Editorial Copy */}
        <div className="lg:col-span-7 space-y-6 text-left relative z-10">
          
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/30 text-xs font-semibold text-[#00B4D8] tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Student Talent Marketplace</span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F0F9FF] leading-[1.05]">
            Your skill is <br />
            <span className="italic font-normal bg-gradient-to-r from-[#00B4D8] via-[#06B6D4] to-[#F0F9FF] bg-clip-text text-transparent">
              worth something.
            </span>
          </h1>

          {/* Supporting Statement */}
          <p className="text-lg sm:text-xl text-[#F0F9FF]/75 max-w-2xl font-light leading-relaxed">
            Discover talented students, hire for real projects, and turn campus skills into real opportunities. Every student has a skill. Every skill deserves an opportunity.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button 
              onClick={() => navigateTo('discover')}
              className="btn-primary text-base py-3.5 px-8"
            >
              <span>Explore Talent</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => switchRole('student')}
              className="btn-secondary text-base py-3.5 px-7"
            >
              <span>Offer Your Skill</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 border-t border-[#F0F9FF]/10 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <div className="font-serif text-2xl sm:text-3xl text-[#00B4D8] font-bold">100%</div>
              <div className="text-xs text-[#F0F9FF]/60 mt-0.5">Verified Identity</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl text-[#00B4D8] font-bold">₹0</div>
              <div className="text-xs text-[#F0F9FF]/60 mt-0.5">Upfront Upkeep</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl text-[#00B4D8] font-bold">4.9 ★</div>
              <div className="text-xs text-[#F0F9FF]/60 mt-0.5">Avg Student Rating</div>
            </div>
          </div>

        </div>

        {/* Right Creative Showcase Collage with Floating Metadata Badges */}
        <div className="lg:col-span-5 relative">
          
          {/* Central Collage Frame */}
          <div className="relative mx-auto max-w-md lg:max-w-none">
            
            {/* Background Glow Ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00B4D8] to-[#0077B6] rounded-[36px] blur-lg opacity-30 animate-pulse-glow" />

            <div className="relative glass-card p-4 space-y-4 border border-[#00B4D8]/30 shadow-2xl">
              
              {/* Main Visual Image (Design + Coding Showcase) */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80" 
                  alt="Student Showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D14] via-transparent to-transparent opacity-80" />
                
                {/* Category Tag on Image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#00B4D8] bg-[#070D14]/80 px-2.5 py-1 rounded-full border border-[#00B4D8]/30">
                      Featured Talent
                    </span>
                    <h3 className="text-lg font-bold text-[#F0F9FF] mt-1">TechnoFest Brand System</h3>
                    <p className="text-xs text-[#F0F9FF]/70">by Aarav Sharma · GLA University</p>
                  </div>
                  <span className="text-sm font-bold text-[#00B4D8] bg-[#070D14]/90 px-3 py-1.5 rounded-xl border border-[#00B4D8]/30">
                    ₹499
                  </span>
                </div>
              </div>

              {/* Sub-Collage Thumbnails (Multi-skill) */}
              <div className="grid grid-cols-3 gap-3">
                <div className="h-20 rounded-xl overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=300&q=80" alt="Video" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <span className="absolute bottom-1 left-1 text-[9px] bg-[#070D14]/80 text-[#F0F9FF] px-1.5 py-0.5 rounded">Video</span>
                </div>
                <div className="h-20 rounded-xl overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&q=80" alt="Coding" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <span className="absolute bottom-1 left-1 text-[9px] bg-[#070D14]/80 text-[#F0F9FF] px-1.5 py-0.5 rounded">React</span>
                </div>
                <div className="h-20 rounded-xl overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80" alt="Camera" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <span className="absolute bottom-1 left-1 text-[9px] bg-[#070D14]/80 text-[#F0F9FF] px-1.5 py-0.5 rounded">Photo</span>
                </div>
              </div>

            </div>

            {/* Floating Metadata Badge 1: Verified Student */}
            <div className="absolute -top-4 -left-4 sm:-left-6 glass-pill px-3.5 py-2 flex items-center gap-2 border border-[#00B4D8]/40 shadow-xl animate-float" style={{ animationDelay: '0s' }}>
              <div className="w-6 h-6 rounded-full bg-[#00B4D8]/20 flex items-center justify-center text-[#00B4D8]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#F0F9FF]">✓ Verified Student</div>
                <div className="text-[10px] text-[#F0F9FF]/60">Institutional Identity</div>
              </div>
            </div>

            {/* Floating Metadata Badge 2: Rating */}
            <div className="absolute top-1/2 -right-4 sm:-right-8 glass-pill px-3.5 py-2 flex items-center gap-2 border border-emerald-500/40 shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Star className="w-3.5 h-3.5 fill-emerald-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#F0F9FF]">4.9 ★ Rating</div>
                <div className="text-[10px] text-emerald-400">Verified Client Reviews</div>
              </div>
            </div>

            {/* Floating Metadata Badge 3: Completed Projects */}
            <div className="absolute -bottom-4 left-6 sm:left-12 glass-pill px-3.5 py-2 flex items-center gap-2 border border-cyan-500/40 shadow-xl animate-float" style={{ animationDelay: '2.5s' }}>
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#F0F9FF]">42 Projects Completed</div>
                <div className="text-[10px] text-cyan-300">CAMPORA Trust Score 94</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
