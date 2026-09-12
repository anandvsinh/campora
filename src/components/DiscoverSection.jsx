import React from 'react';
import { useApp } from '../context/AppContext';
import { SKILL_CATEGORIES } from '../data/mockData';
import { Search, Sparkles, ArrowRight, Filter } from 'lucide-react';

export default function DiscoverSection() {
  const { searchParams, setSearchParams, navigateTo } = useApp();

  const promptChips = [
    'Design a poster',
    'Build a website',
    'Edit my video',
    'Photograph an event',
    'Create a logo'
  ];

  const handlePromptClick = (prompt) => {
    setSearchParams(prev => ({ ...prev, query: prompt }));
    navigateTo('discover');
  };

  const handleCategorySelect = (catId) => {
    setSearchParams(prev => ({ ...prev, category: catId }));
    navigateTo('discover');
  };

  return (
    <section className="py-16 px-4 sm:px-8 relative">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        
        {/* Editorial Subheading */}
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00B4D8]">
            Instant Skill Search
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#F0F9FF] mt-1">
            Find the right skill.
          </h2>
          <p className="text-[#F0F9FF]/70 text-base sm:text-lg max-w-xl mx-auto mt-2">
            From your next poster to your next website, find students who can make it happen.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative flex items-center glass-pill p-2 shadow-2xl border border-[#00B4D8]/40 focus-within:border-[#00B4D8]">
            <Search className="w-5 h-5 text-[#00B4D8] ml-4 shrink-0" />
            <input 
              type="text" 
              value={searchParams.query}
              onChange={(e) => setSearchParams(prev => ({ ...prev, query: e.target.value }))}
              placeholder="What do you need help with?"
              className="w-full bg-transparent px-4 py-3 text-[#F0F9FF] placeholder-[#F0F9FF]/40 text-base focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigateTo('discover');
              }}
            />
            <button 
              onClick={() => navigateTo('discover')}
              className="btn-primary py-2.5 px-6 text-sm shrink-0"
            >
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Quick Example Prompt Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-xs text-[#F0F9FF]/50 flex items-center gap-1 mr-1">
            <Sparkles className="w-3 h-3 text-[#00B4D8]" /> Popular prompts:
          </span>
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handlePromptClick(chip)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#13202E] border border-[#F0F9FF]/10 text-[#F0F9FF]/80 hover:border-[#00B4D8]/40 hover:text-[#00B4D8] transition-all"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-4 no-scrollbar">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${searchParams.category === 'all' ? 'bg-[#00B4D8] text-[#070D14]' : 'bg-[#13202E] text-[#F0F9FF]/70 border border-[#F0F9FF]/10 hover:border-[#00B4D8]/30'}`}
          >
            All Skills
          </button>
          {SKILL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${searchParams.category === cat.id ? 'bg-[#00B4D8] text-[#070D14]' : 'bg-[#13202E] text-[#F0F9FF]/70 border border-[#F0F9FF]/10 hover:border-[#00B4D8]/30'}`}
            >
              {cat.name} ({cat.studentsCount})
            </button>
          ))}
        </div>

        {/* View All CTA */}
        <div>
          <button 
            onClick={() => navigateTo('discover')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B4D8] hover:text-[#06B6D4] transition-colors"
          >
            <span>View all student skills & categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
