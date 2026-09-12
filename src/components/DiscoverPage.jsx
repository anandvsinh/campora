import React from 'react';
import { useApp } from '../context/AppContext';
import { SKILL_CATEGORIES, CAMPUS_HUBS } from '../data/mockData';
import GigCard from './GigCard';
import { Search, Filter, RefreshCw, Building2, X } from 'lucide-react';

export default function DiscoverPage() {
  const { gigs, searchParams, setSearchParams } = useApp();

  const filteredGigs = gigs.filter(gig => {
    if (searchParams.query.trim()) {
      const q = searchParams.query.toLowerCase();
      const matchTitle = gig.title.toLowerCase().includes(q);
      const matchStudent = gig.studentName.toLowerCase().includes(q);
      const bgDesc = gig.description.toLowerCase().includes(q);
      const matchCollege = gig.college.toLowerCase().includes(q);
      if (!matchTitle && !matchStudent && !bgDesc && !matchCollege) return false;
    }

    if (searchParams.category !== 'all' && gig.category !== searchParams.category) {
      return false;
    }

    if (searchParams.campus && searchParams.campus !== 'all') {
      const gigCollege = (gig.college || gig.campus || '').toLowerCase();
      const targetCampus = searchParams.campus.toLowerCase();
      if (!gigCollege.includes(targetCampus) && !targetCampus.includes(gigCollege)) {
        return false;
      }
    }

    if (gig.price > searchParams.maxPrice) {
      return false;
    }

    return true;
  });

  const resetFilters = () => {
    setSearchParams({
      query: '',
      category: 'all',
      campus: 'all',
      maxPrice: 5000,
      minRating: 0
    });
  };

  return (
    <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-left space-y-2 border-b border-[#F0F9FF]/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00B4D8]">
            Marketplace Skill Gigs
          </span>
          {searchParams.campus !== 'all' && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>Campus: {searchParams.campus}</span>
              <button 
                onClick={() => setSearchParams(prev => ({ ...prev, campus: 'all' }))}
                className="hover:text-white ml-1"
                title="Clear campus filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl text-[#F0F9FF]">
          {searchParams.campus !== 'all' ? `${searchParams.campus} Talent Gigs` : 'Discover Student Skill Gigs'}
        </h1>
        <p className="text-xs sm:text-sm text-[#F0F9FF]/70">
          Showing {filteredGigs.length} verified skill gigs posted by campus creators {searchParams.campus !== 'all' ? `at ${searchParams.campus}` : 'across universities'}.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="glass-card p-5 border border-[#00B4D8]/30 space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#00B4D8] absolute left-3.5 top-3.5" />
          <input 
            type="text" 
            placeholder="Search gigs by skill, poster, title, college, or keyword (e.g. poster, website, reels)..."
            value={searchParams.query}
            onChange={(e) => setSearchParams(prev => ({ ...prev, query: e.target.value }))}
            className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
          />
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          
          {/* Category Dropdown */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#00B4D8] mb-1">Category</label>
            <select 
              value={searchParams.category}
              onChange={(e) => setSearchParams(prev => ({ ...prev, category: e.target.value }))}
              className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3 py-2 text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
            >
              <option value="all">All Categories</option>
              {SKILL_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Campus Hub Dropdown */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#00B4D8] mb-1">University Campus</label>
            <select 
              value={searchParams.campus}
              onChange={(e) => setSearchParams(prev => ({ ...prev, campus: e.target.value }))}
              className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3 py-2 text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
            >
              <option value="all">All Campuses</option>
              {CAMPUS_HUBS.map(h => (
                <option key={h.id} value={h.name}>{h.name}</option>
              ))}
            </select>
          </div>

          {/* Max Price Range Slider */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#00B4D8] mb-1">
              Max Price: ₹{searchParams.maxPrice}
            </label>
            <input 
              type="range" 
              min={299} 
              max={5000} 
              step={100}
              value={searchParams.maxPrice}
              onChange={(e) => setSearchParams(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full accent-[#00B4D8]"
            />
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <button 
              onClick={resetFilters}
              className="w-full btn-secondary py-2 justify-center text-xs text-[#00B4D8]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>

        </div>

      </div>

      {/* Grid of Results */}
      {filteredGigs.length === 0 ? (
        <div className="glass-card p-12 text-center border border-[#F0F9FF]/10 space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl text-[#F0F9FF]">No skill gigs found.</h3>
          <p className="text-xs text-[#F0F9FF]/60 font-light">
            Try adjusting your search query or expanding your category filters.
          </p>
          <button onClick={resetFilters} className="btn-primary py-2 px-5 text-xs mx-auto">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map(gig => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      )}

    </div>
  );
}
