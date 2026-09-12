import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Star, Heart, ArrowLeft, CheckCircle2, MessageSquare, Zap, Clock, Award, Image, Briefcase } from 'lucide-react';

export default function StudentProfileView() {
  const { selectedStudent, navigateTo, wishlist, toggleWishlist, setSelectedService } = useApp();
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' | 'services' | 'reviews' | 'history'
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!selectedStudent) return null;

  const isWishlisted = wishlist.includes(selectedStudent.id);

  return (
    <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Back Button */}
      <button 
        onClick={() => navigateTo('discover')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#00B4D8] hover:text-[#06B6D4] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Discover Talent</span>
      </button>

      {/* Student Profile Header Card */}
      <div className="glass-card p-6 sm:p-10 border border-[#00B4D8]/30 relative overflow-hidden bg-gradient-to-br from-[#0D1722] via-[#13202E] to-[#070D14]">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Avatar & Main Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative shrink-0">
              <img 
                src={selectedStudent.avatar} 
                alt={selectedStudent.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-[#00B4D8] shadow-[0_0_24px_rgba(0,180,216,0.3)]"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-[#070D14] rounded-full" title="Available for Hire" />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F0F9FF]">
                  {selectedStudent.name}
                </h1>
                {selectedStudent.verified && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00B4D8] bg-[#00B4D8]/10 px-3 py-1 rounded-full border border-[#00B4D8]/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>✓ Verified Student</span>
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-[#00B4D8]">
                {selectedStudent.primarySkill} · {selectedStudent.college}
              </p>
              
              <p className="text-xs text-[#F0F9FF]/60 font-light">
                {selectedStudent.course} · {selectedStudent.campus}
              </p>

              {/* Badges Strip */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedStudent.badges.map((b, i) => (
                  <span key={i} className="text-[10px] font-medium px-2.5 py-0.5 rounded-md bg-[#070D14] text-[#00B4D8] border border-[#00B4D8]/30">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Score & CTA Box */}
          <div className="p-5 rounded-3xl bg-[#070D14] border border-[#00B4D8]/30 space-y-4 shrink-0 lg:w-80">
            <div className="flex items-center justify-between border-b border-[#F0F9FF]/10 pb-3">
              <div>
                <div className="text-[10px] uppercase font-bold text-[#00B4D8]">CAMPORA Trust Score</div>
                <div className="text-xs text-[#F0F9FF]/60">Platform Reputation</div>
              </div>
              <div className="font-serif text-3xl font-bold text-[#00B4D8]">
                {selectedStudent.trustScore}<span className="text-xs text-[#F0F9FF]/40">/100</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-[#F0F9FF]/50 text-[10px]">Rating</div>
                <div className="font-bold text-[#F0F9FF] flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{selectedStudent.rating}</span>
                </div>
              </div>
              <div>
                <div className="text-[#F0F9FF]/50 text-[10px]">Completed Jobs</div>
                <div className="font-bold text-emerald-400">{selectedStudent.completedProjects} Jobs</div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button 
                onClick={() => {
                  if (selectedStudent.services && selectedStudent.services[0]) {
                    setSelectedService(selectedStudent.services[0]);
                    navigateTo('service-detail', { student: selectedStudent, service: selectedStudent.services[0] });
                  }
                }}
                className="btn-primary w-full justify-center py-2.5 text-xs"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Hire {selectedStudent.name.split(' ')[0]}</span>
              </button>

              <button 
                onClick={() => toggleWishlist(selectedStudent.id)}
                className={`p-2.5 rounded-xl border transition-all ${isWishlisted ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : 'bg-[#13202E] text-[#F0F9FF]/60 border-[#F0F9FF]/10'}`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-400' : ''}`} />
              </button>
            </div>
          </div>

        </div>

        {/* Bio */}
        <div className="mt-6 pt-6 border-t border-[#F0F9FF]/10 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">About the Student</h3>
          <p className="text-sm text-[#F0F9FF]/80 leading-relaxed font-light">
            {selectedStudent.bio}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-semibold text-[#F0F9FF]/50">Skillset:</span>
            {selectedStudent.skills.map((sk, idx) => (
              <span key={idx} className="text-xs px-3 py-1 rounded-full bg-[#13202E] text-[#F0F9FF]/90 border border-[#F0F9FF]/10">
                {sk}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-[#F0F9FF]/10 pb-2">
        <button 
          onClick={() => setActiveTab('portfolio')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${activeTab === 'portfolio' ? 'bg-[#00B4D8] text-[#070D14]' : 'text-[#F0F9FF]/70 hover:text-[#00B4D8]'}`}
        >
          Portfolio Projects ({selectedStudent.portfolio.length})
        </button>
        <button 
          onClick={() => setActiveTab('services')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${activeTab === 'services' ? 'bg-[#00B4D8] text-[#070D14]' : 'text-[#F0F9FF]/70 hover:text-[#00B4D8]'}`}
        >
          Services Offered ({selectedStudent.services.length})
        </button>
        <button 
          onClick={() => setActiveTab('reviews')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${activeTab === 'reviews' ? 'bg-[#00B4D8] text-[#070D14]' : 'text-[#F0F9FF]/70 hover:text-[#00B4D8]'}`}
        >
          Verified Client Reviews ({selectedStudent.reviewsCount})
        </button>
      </div>

      {/* Tab 1: Portfolio Visual Lightbox Grid */}
      {activeTab === 'portfolio' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedStudent.portfolio.map((item) => (
            <div 
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="glass-card overflow-hidden cursor-pointer group border border-[#F0F9FF]/10 hover:border-[#00B4D8]/50 transition-all flex flex-col justify-between"
            >
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D14] via-transparent to-transparent opacity-70" />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-[#00B4D8] text-[#070D14] px-2.5 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="font-bold text-base text-[#F0F9FF] group-hover:text-[#00B4D8] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[#F0F9FF]/60 line-clamp-2 font-light">
                  {item.description}
                </p>
              </div>

              <div className="p-4 pt-0 text-[11px] text-[#00B4D8] font-semibold flex items-center justify-between border-t border-[#F0F9FF]/5 mt-2">
                <span>Click to expand work sample</span>
                <Image className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Services Offered List */}
      {activeTab === 'services' && (
        <div className="grid md:grid-cols-2 gap-6">
          {selectedStudent.services.map((srv) => (
            <div key={srv.id} className="glass-card p-6 border border-[#F0F9FF]/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-lg text-[#F0F9FF]">{srv.title}</h3>
                  <span className="font-serif text-2xl font-bold text-[#00B4D8]">₹{srv.price}</span>
                </div>
                <p className="text-xs text-[#F0F9FF]/70 leading-relaxed font-light">{srv.description}</p>
              </div>

              <div className="pt-4 border-t border-[#F0F9FF]/10 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[#F0F9FF]/60">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00B4D8]" /> {srv.deliveryDays} Days Delivery
                  </span>
                  <span>· {srv.revisions} Revisions</span>
                </div>

                <button 
                  onClick={() => {
                    setSelectedService(srv);
                    navigateTo('service-detail', { student: selectedStudent, service: srv });
                  }}
                  className="btn-primary py-2 px-5 text-xs"
                >
                  Request to Hire
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Verified Client Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-4 max-w-4xl">
          <div className="p-4 rounded-2xl bg-[#0D1722] border border-[#00B4D8]/30 text-xs text-[#F0F9FF]/70 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00B4D8] shrink-0" />
            <span>Only reviews from buyers who have completed funded projects appear as <strong>Verified Reviews</strong>.</span>
          </div>

          <div className="space-y-3">
            {selectedStudent.workHistory.map((w, idx) => (
              <div key={idx} className="glass-card p-5 border border-[#F0F9FF]/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-[#F0F9FF]">{w.clientName}</div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{w.rating}.0 ★ Verified</span>
                  </div>
                </div>
                <div className="text-xs font-semibold text-[#00B4D8]">Project: {w.projectTitle}</div>
                <div className="text-[10px] text-[#F0F9FF]/40">Completed: {w.completedDate} · Value: ₹{w.amount}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-[#070D14]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-3xl w-full border border-[#00B4D8]/40 space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0F9FF]/10 pb-3">
              <h3 className="font-serif text-2xl text-[#F0F9FF]">{lightboxImage.title}</h3>
              <button 
                onClick={() => setLightboxImage(null)}
                className="px-3 py-1 rounded-full bg-[#13202E] text-xs text-[#F0F9FF] hover:bg-[#00B4D8] hover:text-[#070D14]"
              >
                Close ✕
              </button>
            </div>
            <img src={lightboxImage.image} alt={lightboxImage.title} className="w-full max-h-[500px] object-contain rounded-2xl border border-[#F0F9FF]/10" />
            <p className="text-xs text-[#F0F9FF]/70">{lightboxImage.description}</p>
          </div>
        </div>
      )}

    </div>
  );
}
