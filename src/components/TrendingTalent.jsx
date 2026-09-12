import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import StudentCard from './StudentCard';
import { Flame, Sparkles, TrendingUp, Award } from 'lucide-react';

export default function TrendingTalent() {
  const { students } = useApp();
  const [activeFilter, setActiveFilter] = useState('All');

  const filterOptions = ['All', 'Rising Talent', 'Top Rated', 'Fast Responder', 'Popular on Campus'];

  const filteredStudents = students.filter(student => {
    if (activeFilter === 'All') return true;
    return student.badges.includes(activeFilter);
  });

  return (
    <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Section Title & Filter Pills */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#00B4D8]">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>High Engagement Talent</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#F0F9FF] mt-1">
            Students getting noticed.
          </h2>
          <p className="text-[#F0F9FF]/70 text-sm sm:text-base mt-1 max-w-xl">
            Ranked by recent project completions, verified customer ratings, repeat hire rates, and lightning-fast response times.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeFilter === filter ? 'bg-[#00B4D8] text-[#070D14] shadow-[0_0_16px_rgba(0,180,216,0.4)]' : 'bg-[#13202E] text-[#F0F9FF]/70 border border-[#F0F9FF]/10 hover:border-[#00B4D8]/30'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

    </section>
  );
}
