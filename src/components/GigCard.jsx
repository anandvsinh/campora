import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function GigCard({ gig }) {
  const { setSelectedService, setSelectedStudent, navigateTo } = useApp();

  const handleOrderGig = () => {
    const srv = {
      id: gig.id,
      title: gig.title,
      description: gig.description,
      price: gig.price,
      deliveryDays: gig.deliveryDays,
      revisions: gig.revisions || 3
    };

    const std = {
      id: gig.studentId || 'student-aarav',
      name: gig.studentName || 'Aarav Sharma',
      avatar: gig.avatar,
      verified: gig.verified,
      college: gig.college,
      trustScore: 94,
      bio: gig.description
    };

    setSelectedService(srv);
    setSelectedStudent(std);
    navigateTo('service-detail', { student: std, service: srv });
  };

  return (
    <div className="glass-card overflow-hidden flex flex-col justify-between group border border-[#F0F9FF]/10 hover:border-[#00B4D8]/50 transition-all duration-300">
      
      <div>
        {/* Cover Image Header */}
        <div className="h-48 relative overflow-hidden">
          <img 
            src={gig.image} 
            alt={gig.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13202E] via-transparent to-transparent opacity-80" />
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-[#00B4D8] text-[#070D14] px-2.5 py-1 rounded-full shadow-md">
            {gig.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Creator Header */}
          <div className="flex items-center gap-2.5">
            <img src={gig.avatar} alt={gig.studentName} className="w-8 h-8 rounded-full object-cover border border-[#00B4D8]" />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-xs text-[#F0F9FF]">{gig.studentName}</span>
                {gig.verified && (
                  <span className="text-[9px] font-bold text-[#00B4D8] bg-[#00B4D8]/10 px-1.5 py-0.2 rounded border border-[#00B4D8]/30">
                    ✓ Verified
                  </span>
                )}
              </div>
              <div className="text-[10px] text-[#F0F9FF]/50 font-medium">{gig.college}</div>
            </div>
          </div>

          {/* Gig Title */}
          <h3 className="font-bold text-sm text-[#F0F9FF] group-hover:text-[#00B4D8] transition-colors leading-snug line-clamp-2">
            {gig.title}
          </h3>

          <p className="text-xs text-[#F0F9FF]/60 line-clamp-2 font-light">
            {gig.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 pt-0 border-t border-[#F0F9FF]/10 mt-2 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[#F0F9FF]">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{gig.rating || 5.0}</span>
            <span className="text-[#F0F9FF]/40">({gig.salesCount || 12})</span>
          </div>
          <div className="text-xs font-bold text-[#00B4D8] mt-0.5">
            Starting at ₹{gig.price}
          </div>
        </div>

        <button 
          onClick={handleOrderGig}
          className="btn-primary py-1.5 px-4 text-xs font-bold"
        >
          <span>Order Gig</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
