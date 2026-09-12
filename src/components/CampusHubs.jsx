import React from 'react';
import { useApp } from '../context/AppContext';
import { CAMPUS_HUBS } from '../data/mockData';
import { MapPin, Users, Briefcase, ArrowRight, Building2 } from 'lucide-react';

export default function CampusHubs() {
  const { setSearchParams, navigateTo } = useApp();

  const handleSelectCampus = (campusName) => {
    setSearchParams(prev => ({ ...prev, campus: campusName }));
    navigateTo('discover');
  };

  return (
    <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#00B4D8]">
            <Building2 className="w-4 h-4" />
            <span>Multi-University Ecosystem</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#F0F9FF] mt-1">
            Popular on Campus.
          </h2>
          <p className="text-[#F0F9FF]/70 text-sm sm:text-base mt-1">
            Discover verified talent hubs from top universities across India.
          </p>
        </div>

        <button 
          onClick={() => navigateTo('discover')}
          className="btn-secondary text-xs self-start sm:self-auto"
        >
          <span>Browse All Campuses</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of Campus Hub Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CAMPUS_HUBS.map((hub) => (
          <div 
            key={hub.id}
            onClick={() => handleSelectCampus(hub.name)}
            className="glass-card overflow-hidden cursor-pointer group border border-[#F0F9FF]/10 hover:border-[#00B4D8]/50 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Campus Image Header */}
              <div className="h-36 relative overflow-hidden">
                <img 
                  src={hub.image} 
                  alt={hub.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13202E] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-2 left-3 flex items-center gap-1 text-[11px] font-medium text-[#F0F9FF]/80 bg-[#070D14]/80 px-2 py-0.5 rounded border border-[#F0F9FF]/10">
                  <MapPin className="w-3 h-3 text-[#00B4D8]" />
                  <span>{hub.location}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-lg text-[#F0F9FF] group-hover:text-[#00B4D8] transition-colors">
                  {hub.name}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-[#F0F9FF]/10">
                  <div>
                    <div className="text-[#00B4D8] font-bold text-sm">{hub.activeStudents}</div>
                    <div className="text-[10px] text-[#F0F9FF]/50 uppercase">Active Sellers</div>
                  </div>
                  <div>
                    <div className="text-emerald-400 font-bold text-sm">{hub.activeProjects}</div>
                    <div className="text-[10px] text-[#F0F9FF]/50 uppercase">Active Jobs</div>
                  </div>
                </div>

                {/* Top Skills Tags */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-[#F0F9FF]/40 uppercase tracking-wider">Top Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {hub.topSkills.map((sk, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#0D1722] text-[#F0F9FF]/80 border border-[#F0F9FF]/10">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button className="w-full py-2 rounded-xl bg-[#00B4D8]/10 group-hover:bg-[#00B4D8] text-[#00B4D8] group-hover:text-[#070D14] font-semibold text-xs border border-[#00B4D8]/30 transition-all flex items-center justify-center gap-1">
                <span>Explore {hub.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
