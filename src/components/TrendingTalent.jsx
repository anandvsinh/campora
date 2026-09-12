import React from 'react';
import { useApp } from '../context/AppContext';
import GigCard from './GigCard';
import { Flame, ArrowRight } from 'lucide-react';

export default function TrendingTalent() {
  const { gigs, navigateTo } = useApp();

  return (
    <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#00B4D8]">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>High Engagement Skill Gigs</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#F0F9FF] mt-1">
            Gigs getting noticed.
          </h2>
          <p className="text-[#F0F9FF]/70 text-sm sm:text-base mt-1 max-w-xl">
            Popular student skill packages ranked by recent order completions, ratings, and fast delivery.
          </p>
        </div>

        <button 
          onClick={() => navigateTo('discover')}
          className="btn-secondary text-xs self-start md:self-auto"
        >
          <span>Explore All Marketplace Gigs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Gig Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.slice(0, 6).map(gig => (
          <GigCard key={gig.id} gig={gig} />
        ))}
      </div>

    </section>
  );
}
