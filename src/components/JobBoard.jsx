import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import CreateJobModal from './CreateJobModal';
import { Briefcase, MapPin, Clock, ArrowRight, Plus, Search, CheckCircle2 } from 'lucide-react';

export default function JobBoard() {
  const { openJobs, createHiringRequest, navigateTo } = useApp();
  const [showJobModal, setShowJobModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedJobId, setAppliedJobId] = useState(null);

  const filteredJobs = openJobs.filter(job => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return job.title.toLowerCase().includes(q) ||
           job.posterName.toLowerCase().includes(q) ||
           job.campus.toLowerCase().includes(q) ||
           job.description.toLowerCase().includes(q);
  });

  const handleApply = (job) => {
    createHiringRequest({
      studentId: 'student-aarav',
      studentName: 'Aarav Sharma',
      serviceId: 'srv-1',
      title: `Proposal for: ${job.title}`,
      description: `Hi! I would love to work on this job. I have relevant experience from my portfolio.`,
      budget: job.budget,
      deadline: job.deadline
    });
    setAppliedJobId(job.id);
  };

  return (
    <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0F9FF]/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00B4D8] bg-[#00B4D8]/10 px-3 py-1 rounded-full border border-[#00B4D8]/30 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Public Campus Job Board</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#F0F9FF]">
            Open Gigs & Requirements
          </h1>
          <p className="text-xs sm:text-sm text-[#F0F9FF]/70">
            Discover active project requirements posted by college clubs, societies, hackathon teams, and startups.
          </p>
        </div>

        <button 
          onClick={() => setShowJobModal(true)}
          className="btn-primary text-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post a Job Requirement</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4 border border-[#00B4D8]/30 flex items-center gap-3">
        <Search className="w-4 h-4 text-[#00B4D8] shrink-0" />
        <input 
          type="text" 
          placeholder="Filter open jobs by title, club, campus, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-[#F0F9FF] focus:outline-none placeholder-[#F0F9FF]/40"
        />
      </div>

      {/* Job Cards Grid */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="glass-card p-12 text-center text-xs text-[#F0F9FF]/50 italic">
            No open jobs matching your search query.
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div 
              key={job.id}
              className="glass-card p-6 border border-[#F0F9FF]/10 hover:border-[#00B4D8]/50 transition-all space-y-4 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    🟢 {job.status || 'Open'}
                  </span>
                  <h3 className="font-bold text-lg text-[#F0F9FF]">{job.title}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#F0F9FF]/60 font-medium">
                  <span>Posted by: <strong className="text-[#00B4D8]">{job.posterName}</strong></span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#00B4D8]" /> {job.campus}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> Deadline: {job.deadline}
                  </span>
                </div>

                <p className="text-xs text-[#F0F9FF]/75 leading-relaxed font-light line-clamp-2">
                  {job.description}
                </p>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 md:border-l border-[#F0F9FF]/10 pt-3 md:pt-0 md:pl-6 shrink-0">
                <div className="text-left md:text-right">
                  <div className="text-[10px] uppercase font-bold text-[#00B4D8]">Offered Budget</div>
                  <div className="font-serif text-3xl font-bold text-[#F0F9FF]">₹{job.budget.toLocaleString()}</div>
                </div>

                <button 
                  onClick={() => handleApply(job)}
                  className={`btn-primary py-2 px-5 text-xs font-bold ${appliedJobId === job.id ? 'bg-emerald-500 border-emerald-500' : ''}`}
                >
                  {appliedJobId === job.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Proposal Sent!</span>
                    </>
                  ) : (
                    <>
                      <span>Apply as Student</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showJobModal && <CreateJobModal onClose={() => setShowJobModal(false)} />}

    </div>
  );
}
