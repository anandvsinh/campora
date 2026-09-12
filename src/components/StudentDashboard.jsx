import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DollarSign, Zap, Star, TrendingUp, CheckCircle2, Plus, ArrowRight, Wallet, ShieldCheck } from 'lucide-react';

export default function StudentDashboard() {
  const { students, projects, navigateTo } = useApp();
  const currentStudent = students[0]; // Aarav Sharma

  const [activeTab, setActiveTab] = useState('earnings'); // 'earnings' | 'projects' | 'services'
  const [withdrawnMsg, setWithdrawnMsg] = useState(false);

  // Financial calculations
  const totalEarned = projects
    .filter(p => p.studentId === currentStudent.id && p.status === 'Completed')
    .reduce((acc, p) => acc + p.studentNetEarnings, 4500);

  const pendingBalance = projects
    .filter(p => p.studentId === currentStudent.id && p.status !== 'Completed')
    .reduce((acc, p) => acc + p.studentNetEarnings, 0);

  const handleSimulateWithdrawal = () => {
    setWithdrawnMsg(true);
    setTimeout(() => setWithdrawnMsg(false), 4000);
  };

  return (
    <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0F9FF]/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00B4D8] bg-[#00B4D8]/10 px-3 py-1 rounded-full border border-[#00B4D8]/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Student Seller Studio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F0F9FF]">
            Welcome back, {currentStudent.name}
          </h1>
          <p className="text-xs text-[#F0F9FF]/60">{currentStudent.college} · Trust Score {currentStudent.trustScore}/100</p>
        </div>

        <button 
          onClick={() => navigateTo('student-profile', { student: currentStudent })}
          className="btn-secondary text-xs"
        >
          View Public Profile
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 border border-[#00B4D8]/30">
          <div className="text-[10px] uppercase font-bold text-[#00B4D8]">Total Net Earnings</div>
          <div className="font-serif text-3xl font-bold text-emerald-400 mt-1">₹{totalEarned.toLocaleString()}</div>
          <div className="text-[10px] text-[#F0F9FF]/50 mt-1">Direct to Bank</div>
        </div>

        <div className="glass-card p-5 border border-[#F0F9FF]/10">
          <div className="text-[10px] uppercase font-bold text-[#F0F9FF]/50">Active Gigs</div>
          <div className="font-serif text-3xl font-bold text-[#F0F9FF] mt-1">
            {projects.filter(p => p.studentId === currentStudent.id && p.status !== 'Completed').length}
          </div>
          <div className="text-[10px] text-[#00B4D8] mt-1">In Workspace Pipeline</div>
        </div>

        <div className="glass-card p-5 border border-[#F0F9FF]/10">
          <div className="text-[10px] uppercase font-bold text-[#F0F9FF]/50">Completed Jobs</div>
          <div className="font-serif text-3xl font-bold text-[#F0F9FF] mt-1">{currentStudent.completedProjects}</div>
          <div className="text-[10px] text-emerald-400 mt-1">100% On-Time Payout</div>
        </div>

        <div className="glass-card p-5 border border-[#F0F9FF]/10">
          <div className="text-[10px] uppercase font-bold text-[#F0F9FF]/50">Avg Rating</div>
          <div className="font-serif text-3xl font-bold text-amber-400 mt-1">{currentStudent.rating} ★</div>
          <div className="text-[10px] text-[#F0F9FF]/50 mt-1">{currentStudent.reviewsCount} Verified Reviews</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#F0F9FF]/10 pb-2">
        <button 
          onClick={() => setActiveTab('earnings')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${activeTab === 'earnings' ? 'bg-[#00B4D8] text-[#070D14]' : 'text-[#F0F9FF]/70 hover:text-[#00B4D8]'}`}
        >
          Financial Earnings & Payouts
        </button>
        <button 
          onClick={() => setActiveTab('projects')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${activeTab === 'projects' ? 'bg-[#00B4D8] text-[#070D14]' : 'text-[#F0F9FF]/70 hover:text-[#00B4D8]'}`}
        >
          Active Workspaces ({projects.filter(p => p.studentId === currentStudent.id).length})
        </button>
      </div>

      {/* Financial Earnings Tab */}
      {activeTab === 'earnings' && (
        <div className="space-y-6">
          <div className="glass-card p-6 sm:p-8 border border-[#00B4D8]/30 space-y-6 bg-gradient-to-br from-[#0D1722] to-[#070D14]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0F9FF]/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">Available Balance</span>
                <div className="font-serif text-4xl font-bold text-[#F0F9FF]">₹{totalEarned.toLocaleString()}</div>
                <div className="text-xs text-[#F0F9FF]/60 mt-0.5">Pending in Escrow: ₹{pendingBalance.toLocaleString()}</div>
              </div>

              <button 
                onClick={handleSimulateWithdrawal}
                className="btn-primary py-3 px-6 text-xs font-bold bg-emerald-500 hover:bg-emerald-400"
              >
                <Wallet className="w-4 h-4" />
                <span>Withdraw to UPI / Bank</span>
              </button>
            </div>

            {withdrawnMsg && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-semibold animate-in fade-in">
                ✓ Payout request of ₹{totalEarned.toLocaleString()} processed! Funds dispatched via instant UPI.
              </div>
            )}

            {/* Platform Fee Ledger Table */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">Transparent Fee Ledger History</h3>
              <div className="space-y-2">
                {projects.map((p) => (
                  <div key={p.id} className="p-3.5 rounded-xl bg-[#070D14] border border-[#F0F9FF]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="font-bold text-[#F0F9FF]">{p.title}</div>
                      <div className="text-[10px] text-[#F0F9FF]/50">Client: {p.buyerName} · Status: {p.status}</div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <div className="text-[#F0F9FF]/50 text-[10px]">Gross</div>
                        <div className="font-semibold text-[#F0F9FF]">₹{p.budget}</div>
                      </div>
                      <div>
                        <div className="text-[#00B4D8] text-[10px]">CAMPORA (10%)</div>
                        <div className="font-semibold text-[#00B4D8]">-₹{p.platformFee}</div>
                      </div>
                      <div>
                        <div className="text-emerald-400 text-[10px]">Net Payout</div>
                        <div className="font-bold text-emerald-400">₹{p.studentNetEarnings}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          {projects.filter(p => p.studentId === currentStudent.id).map((p) => (
            <div 
              key={p.id}
              onClick={() => navigateTo('project-workspace', { project: p })}
              className="glass-card p-5 border border-[#F0F9FF]/10 hover:border-[#00B4D8]/50 cursor-pointer transition-all flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-base text-[#F0F9FF]">{p.title}</h4>
                <p className="text-xs text-[#F0F9FF]/60 mt-0.5">Client: {p.buyerName} · Due {p.deadline}</p>
                <span className="text-[10px] font-bold text-[#00B4D8] bg-[#00B4D8]/10 px-2.5 py-0.5 rounded border border-[#00B4D8]/30 mt-2 inline-block">
                  Status: {p.status}
                </span>
              </div>

              <div className="text-right">
                <div className="font-serif text-xl font-bold text-emerald-400">₹{p.studentNetEarnings}</div>
                <button className="btn-secondary py-1 px-3 text-[11px] mt-1">Open Workspace →</button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
