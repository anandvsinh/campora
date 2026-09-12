import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, ShieldCheck, CheckCircle2, XCircle, FileText, AlertTriangle, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const { verifications, approveVerification, rejectVerification, projects, students } = useApp();

  const totalGTV = projects.reduce((acc, p) => acc + p.budget, 18500);
  const platformRevenue = Math.round(totalGTV * 0.10);

  return (
    <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0F9FF]/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30 mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Platform Administration & Trust Operations</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F0F9FF]">
            CAMPORA Safety & Verification Panel
          </h1>
          <p className="text-xs text-[#F0F9FF]/60">Review pending institutional student verifications, GTV metrics, and disputes.</p>
        </div>
      </div>

      {/* Admin Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 border border-purple-500/30">
          <div className="text-[10px] uppercase font-bold text-purple-400">Gross Transaction Value (GTV)</div>
          <div className="font-serif text-3xl font-bold text-[#F0F9FF] mt-1">₹{totalGTV.toLocaleString()}</div>
          <div className="text-[10px] text-purple-300 mt-1">Marketplace Volume</div>
        </div>

        <div className="glass-card p-5 border border-emerald-500/30">
          <div className="text-[10px] uppercase font-bold text-emerald-400">Platform Fee Revenue (10%)</div>
          <div className="font-serif text-3xl font-bold text-emerald-400 mt-1">₹{platformRevenue.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-300 mt-1">CAMPORA Earnings</div>
        </div>

        <div className="glass-card p-5 border border-[#00B4D8]/30">
          <div className="text-[10px] uppercase font-bold text-[#00B4D8]">Verified Students</div>
          <div className="font-serif text-3xl font-bold text-[#F0F9FF] mt-1">{students.length + 38}</div>
          <div className="text-[10px] text-[#00B4D8] mt-1">Institutional Verified</div>
        </div>

        <div className="glass-card p-5 border border-amber-500/30">
          <div className="text-[10px] uppercase font-bold text-amber-400">Pending Verification Requests</div>
          <div className="font-serif text-3xl font-bold text-amber-400 mt-1">{verifications.length}</div>
          <div className="text-[10px] text-[#F0F9FF]/50 mt-1">Requires Admin Action</div>
        </div>
      </div>

      {/* Student ID Verification Queue */}
      <div className="glass-card p-6 sm:p-8 border border-[#00B4D8]/30 space-y-6">
        <div className="flex items-center justify-between border-b border-[#F0F9FF]/10 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">Identity Operations</span>
            <h3 className="font-serif text-2xl text-[#F0F9FF]">Pending Student Verification Requests</h3>
          </div>
          <span className="text-xs text-[#F0F9FF]/50">{verifications.length} items in queue</span>
        </div>

        {verifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#F0F9FF]/50 italic glass-card border border-[#F0F9FF]/10">
            No pending verification requests in the queue.
          </div>
        ) : (
          <div className="space-y-4">
            {verifications.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-[#070D14] border border-[#F0F9FF]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-[#F0F9FF]">{item.studentName}</h4>
                    <span className="text-[10px] font-bold text-[#00B4D8] bg-[#00B4D8]/10 px-2 py-0.5 rounded border border-[#00B4D8]/30">
                      {item.skillCategory}
                    </span>
                  </div>
                  <div className="text-xs text-[#F0F9FF]/70">
                    College: <strong>{item.college}</strong> · Roll No: <strong>{item.rollNumber}</strong>
                  </div>
                  <div className="text-xs text-[#00B4D8]">Institutional Email: {item.email}</div>
                  <div className="text-[10px] text-[#F0F9FF]/40">Submitted: {item.submittedAt}</div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => approveVerification(item.id)}
                    className="btn-primary py-2 px-5 text-xs bg-emerald-500 hover:bg-emerald-400 font-bold flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Verification</span>
                  </button>

                  <button 
                    onClick={() => rejectVerification(item.id)}
                    className="btn-secondary py-2 px-4 text-xs text-rose-400 border-rose-500/30 hover:bg-rose-500/10 flex items-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
