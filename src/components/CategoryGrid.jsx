import React from 'react';
import { useApp } from '../context/AppContext';
import { SKILL_CATEGORIES } from '../data/mockData';
import { ArrowRight, Grid, Sparkles } from 'lucide-react';

export default function CategoryGrid() {
  const { setSearchParams, navigateTo } = useApp();

  const handleExploreCategory = (catId) => {
    setSearchParams(prev => ({ ...prev, category: catId }));
    navigateTo('discover');
  };

  return (
    <section className="py-16 px-4 sm:px-8 bg-[#0D1722]/40 border-y border-[#F0F9FF]/10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00B4D8]">
              Browse Skill Ecosystems
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#F0F9FF] mt-1">
              Explore by Category.
            </h2>
            <p className="text-[#F0F9FF]/70 text-sm sm:text-base mt-1">
              Initial launch categories powered by vetted campus creators.
            </p>
          </div>

          <button 
            onClick={() => {
              setSearchParams(prev => ({ ...prev, category: 'all' }));
              navigateTo('discover');
            }}
            className="btn-secondary text-xs self-start md:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visual Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isTopLaunchCategory = idx < 5;
            return (
              <div 
                key={cat.id}
                onClick={() => handleExploreCategory(cat.id)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer group border transition-all duration-300 ${isTopLaunchCategory ? 'h-64 border-[#00B4D8]/30 shadow-[0_8px_30px_rgba(0,180,216,0.12)]' : 'h-52 border-[#F0F9FF]/10'}`}
              >
                {/* Background Image */}
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Gradient Overlay matching logo tone */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D14] via-[#070D14]/70 to-transparent group-hover:via-[#070D14]/50 transition-colors" />

                {/* Top Launch Pill */}
                {isTopLaunchCategory && (
                  <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider bg-[#00B4D8] text-[#070D14] px-2.5 py-1 rounded-full shadow-lg">
                    ★ Core Launch Category
                  </span>
                )}

                {/* Content Overlay */}
                <div className="absolute bottom-5 left-5 right-5 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-[#F0F9FF] group-hover:text-[#00B4D8] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-[#00B4D8] font-semibold mt-0.5">
                        {cat.studentsCount} Active Students
                      </p>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-[#00B4D8]/20 group-hover:bg-[#00B4D8] text-[#00B4D8] group-hover:text-[#070D14] flex items-center justify-center transition-all border border-[#00B4D8]/40">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-[#F0F9FF]/70 line-clamp-2 mt-2 font-light">
                    {cat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
