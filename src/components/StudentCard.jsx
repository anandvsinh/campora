import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Star, Heart, ArrowRight, Zap, CheckCircle2, Award } from 'lucide-react';

export default function StudentCard({ student }) {
  const { navigateTo, wishlist, toggleWishlist } = useApp();
  const isWishlisted = wishlist.includes(student.id);

  return (
    <div className="glass-card p-5 relative flex flex-col justify-between group border border-[#F0F9FF]/10 hover:border-[#00B4D8]/50 transition-all duration-300">
      
      {/* Top Header: Avatar, Name, Wishlist & Availability */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={student.avatar} 
                alt={student.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#00B4D8]/30 group-hover:border-[#00B4D8] transition-colors"
              />
              {student.availability === 'Available' && (
                <span 
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#070D14] rounded-full" 
                  title="Available for Projects"
                />
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-base text-[#F0F9FF] group-hover:text-[#00B4D8] transition-colors">
                  {student.name}
                </h3>
                {student.verified && (
                  <span className="inline-flex items-center text-[10px] font-bold text-[#00B4D8] bg-[#00B4D8]/10 px-2 py-0.5 rounded-full border border-[#00B4D8]/30">
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-[#F0F9FF]/60 font-medium mt-0.5">{student.college}</p>
              <div className="text-[11px] font-semibold text-[#00B4D8] mt-1">{student.primarySkill}</div>
            </div>
          </div>

          {/* Wishlist Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(student.id);
            }}
            className={`p-2 rounded-full border transition-all ${isWishlisted ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : 'bg-[#070D14]/40 text-[#F0F9FF]/40 border-transparent hover:text-rose-400'}`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Save Student (People worth remembering)'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-400' : ''}`} />
          </button>
        </div>

        {/* Short Bio */}
        <p className="text-xs text-[#F0F9FF]/70 line-clamp-2 mt-3 leading-relaxed font-light">
          {student.bio}
        </p>

        {/* Badges strip */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {student.badges.slice(0, 3).map((badge, idx) => (
            <span 
              key={idx} 
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#0D1722] text-[#00B4D8] border border-[#00B4D8]/20"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Portfolio Visual Preview Thumbnail */}
        {student.portfolio && student.portfolio[0] && (
          <div className="mt-4 rounded-xl overflow-hidden h-28 relative group/img">
            <img 
              src={student.portfolio[0].image} 
              alt={student.portfolio[0].title}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070D14] via-transparent to-transparent opacity-70" />
            <span className="absolute bottom-2 left-2 text-[10px] text-[#F0F9FF]/90 font-medium bg-[#070D14]/80 px-2 py-0.5 rounded border border-[#F0F9FF]/10">
              Sample: {student.portfolio[0].title}
            </span>
          </div>
        )}
      </div>

      {/* Card Footer: Metrics & CTA */}
      <div className="pt-4 mt-4 border-t border-[#F0F9FF]/10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[#F0F9FF]">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{student.rating}</span>
            <span className="text-[#F0F9FF]/40">({student.reviewsCount})</span>
            <span className="text-[#F0F9FF]/30 font-normal">· {student.completedProjects} jobs</span>
          </div>
          <div className="text-xs font-bold text-[#00B4D8] mt-0.5">
            Starting at ₹{student.startingPrice}
          </div>
        </div>

        <button 
          onClick={() => navigateTo('student-profile', { student })}
          className="px-3.5 py-1.5 rounded-xl bg-[#00B4D8]/10 hover:bg-[#00B4D8] text-[#00B4D8] hover:text-[#070D14] font-semibold text-xs border border-[#00B4D8]/30 transition-all flex items-center gap-1"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
