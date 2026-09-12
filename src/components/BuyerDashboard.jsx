import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Briefcase, Star, ArrowRight, ShieldCheck, Plus, RefreshCw } from 'lucide-react';
import StudentCard from './StudentCard';

export default function BuyerDashboard() {
  const { projects, wishlist, students, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'wishlist'

  const savedStudents = students.filter(s => wishlist.includes(s.id));
  const totalSpent = projects.reduce((acc, p) => acc + p.budget, 0);

  return (
    <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0F9FF]/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Organisation Portal · Apex Tech Society</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F0F9FF]">
            Buyer Dashboard & Projects
          </h1>
          <p className="text-xs text-[#F0F9FF]/60">Manage active hiring requests, saved campus talent, and past orders.</p>
        </div>

        <button 
          onClick={() => navigateTo('discover')}
          className="btn-primary text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Hire New Talent</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 border border-[#00B4D8]/30">
          <div className="text-[10px] uppercase font-bold text-[#00B4D8]">Active Workspaces</div>
          <div className="font-serif text-3xl font-bold text-[#F0F9FF] mt-1">{projects.length}</div>
          <div className="text-[10px] text-[#00B4D8] mt-1">In Progress</div>
        </div>

        <div className="glass-card p-5 border border-[#F0F9FF]/10">
          <div className="text-[10px] uppercase font-bold text-[#F0F9FF]/50">Total Budget Escrowed</div>
          <div className="font-serif text-3xl font-bold text-cyan-400 mt-1">₹{totalSpent.toLocaleString()}</div>
          <div className="text-[10px] text-[#F0F9FF]/50 mt-1">Safely Escrowed</div>
        </div>

        <div className="glass-card p-5 border border-[#F0F9FF]/10">
          <div className="text-[10px] uppercase font-bold text-[#F0F9FF]/50">Saved Talent</div>
          <div className="font-serif text-3xl font-bold text-rose-400 mt-1">{wishlist.length}</div>
          <div className="text-[10px] text-rose-400/80 mt-1">People Worth Remembering</div>
        </div>

        <div className="glass-card p-5 border border-[#F0F9FF]/10">
          <div className="text-[10px] uppercase font-bold text-[#F0F9FF]/50">Verified Reviews Left</div>
          <div className="font-serif text-3xl font-bold text-amber-400 mt-1">12</div>
          <div className="text-[10px] text-[#F0F9FF]/50 mt-1">Reputation Contributions</div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-[#F0F9FF]/10 pb-2">
        <button 
          onClick={() => setActiveTab('projects')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${activeTab === 'projects' ? 'bg-[#00B4D8] text-[#070D14]' : 'text-[#F0F9FF]/70 hover:text-[#00B4D8]'}`}
        >
          My Hired Projects ({projects.length})
        </button>
        <button 
          onClick={() => setActiveTab('wishlist')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${activeTab === 'wishlist' ? 'bg-[#00B4D8] text-[#070D14]' : 'text-[#F0F9FF]/70 hover:text-[#00B4D8]'}`}
        >
          Saved Talent ({wishlist.length})
        </button>
      </div>

      {/* Projects List */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          {projects.map((p) => (
            <div 
              key={p.id}
              onClick={() => navigateTo('project-workspace', { project: p })}
              className="glass-card p-5 border border-[#F0F9FF]/10 hover:border-[#00B4D8]/50 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-[#F0F9FF]">{p.title}</h4>
                  <span className="text-[10px] font-bold text-[#00B4D8] bg-[#00B4D8]/10 px-2 py-0.5 rounded border border-[#00B4D8]/30">
                    Status: {p.status}
                  </span>
                </div>
                <p className="text-xs text-[#F0F9FF]/60 mt-1">Hired Student: <strong className="text-[#00B4D8]">{p.studentName}</strong> · Due: {p.deadline}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-serif text-xl font-bold text-[#F0F9FF]">₹{p.budget}</div>
                  <div className="text-[10px] text-[#F0F9FF]/50">Escrow Payout</div>
                </div>

                <button className="btn-primary py-1.5 px-4 text-xs">
                  <span>Open Workspace</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Saved Wishlist Tab ("People worth remembering") */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#0D1722] border border-[#00B4D8]/30 text-xs text-[#F0F9FF]/70">
            <h3 className="font-serif text-lg font-bold text-[#F0F9FF]">People worth remembering.</h3>
            <p className="text-xs text-[#F0F9FF]/60 mt-0.5">Keep track of outstanding student talent you want to hire again for upcoming events.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedStudents.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
