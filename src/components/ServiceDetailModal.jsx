import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Star, Clock, ArrowLeft, Upload, Send, CheckCircle2, DollarSign } from 'lucide-react';

export default function ServiceDetailModal() {
  const { selectedStudent, selectedService, createHiringRequest, navigateTo } = useApp();

  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [budget, setBudget] = useState(selectedService?.price || 499);
  const [deadline, setDeadline] = useState('2026-09-22');
  const [fileName, setFileName] = useState('');

  if (!selectedStudent || !selectedService) return null;

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!projectTitle.trim() || !projectDesc.trim()) return;

    createHiringRequest({
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      serviceId: selectedService.id,
      title: projectTitle,
      description: projectDesc,
      budget: Number(budget),
      deadline: deadline,
      attachmentName: fileName || 'Project_Brief.pdf'
    });
  };

  return (
    <div className="py-8 px-4 sm:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* Back CTA */}
      <button 
        onClick={() => navigateTo('student-profile', { student: selectedStudent })}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#00B4D8] hover:text-[#06B6D4] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to {selectedStudent.name}'s Profile</span>
      </button>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Service Details */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="glass-card p-6 sm:p-8 border border-[#00B4D8]/30 space-y-5">
            {/* Student Header */}
            <div className="flex items-center gap-4 border-b border-[#F0F9FF]/10 pb-4">
              <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-12 h-12 rounded-2xl object-cover border border-[#00B4D8]" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-[#F0F9FF]">{selectedStudent.name}</h3>
                  <span className="text-[10px] font-bold text-[#00B4D8] bg-[#00B4D8]/10 px-2 py-0.5 rounded border border-[#00B4D8]/30">
                    ✓ Verified Student
                  </span>
                </div>
                <p className="text-xs text-[#F0F9FF]/60">{selectedStudent.college} · Trust Score {selectedStudent.trustScore}/100</p>
              </div>
            </div>

            {/* Service Info */}
            <div className="space-y-3">
              <h1 className="font-serif text-2xl sm:text-3xl text-[#F0F9FF]">
                {selectedService.title}
              </h1>

              <p className="text-xs text-[#F0F9FF]/80 leading-relaxed font-light">
                {selectedService.description}
              </p>
            </div>

            {/* Deliverables summary */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#070D14] border border-[#F0F9FF]/10 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00B4D8]" />
                <div>
                  <div className="font-bold text-[#F0F9FF]">{selectedService.deliveryDays} Days Delivery</div>
                  <div className="text-[10px] text-[#F0F9FF]/50">Estimated Turnaround</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" />
                <div>
                  <div className="font-bold text-[#F0F9FF]">{selectedService.revisions} Revisions</div>
                  <div className="text-[10px] text-[#F0F9FF]/50">Included Modifications</div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Structured Hiring Request Form */}
        <div className="lg:col-span-5">
          <form 
            onSubmit={handleSubmitRequest}
            className="glass-card p-6 sm:p-8 border border-[#00B4D8]/40 shadow-2xl space-y-5 bg-gradient-to-b from-[#13202E] to-[#070D14]"
          >
            <div className="border-b border-[#F0F9FF]/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">Project Request</span>
              <h3 className="font-serif text-2xl text-[#F0F9FF]">Hire {selectedStudent.name.split(' ')[0]}</h3>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Project Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. TechnoFest Poster & Instagram Banner Kit"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Project Requirements & Scope</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe your project expectations, colors, assets needed, or key references..."
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Offered Budget (₹)</label>
                  <input 
                    type="number"
                    required
                    min={100}
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F0F9FF] font-bold text-[#00B4D8] focus:outline-none focus:border-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Proposed Deadline</label>
                  <input 
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
                  />
                </div>
              </div>

              {/* File Upload Simulation */}
              <div>
                <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Attach Brief or Files (Optional)</label>
                <div className="border border-dashed border-[#F0F9FF]/20 rounded-xl p-3 text-center bg-[#070D14]/50 hover:border-[#00B4D8]/40 transition-colors">
                  <Upload className="w-4 h-4 text-[#00B4D8] mx-auto mb-1" />
                  <input 
                    type="file" 
                    id="file-input"
                    className="hidden" 
                    onChange={(e) => setFileName(e.target.files[0]?.name || '')}
                  />
                  <label htmlFor="file-input" className="cursor-pointer text-[11px] text-[#F0F9FF]/70 hover:text-[#00B4D8]">
                    {fileName ? `Attached: ${fileName}` : 'Click to attach brief PDF or assets'}
                  </label>
                </div>
              </div>

              {/* Fee Breakdown transparency */}
              <div className="p-3 rounded-xl bg-[#070D14] border border-[#00B4D8]/20 text-[11px] space-y-1">
                <div className="flex justify-between text-[#F0F9FF]/70">
                  <span>Project Budget</span>
                  <span>₹{budget}</span>
                </div>
                <div className="flex justify-between text-[#00B4D8]">
                  <span>CAMPORA Escrow Guarantee</span>
                  <span>Free</span>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="btn-primary w-full justify-center py-3 text-xs font-bold"
            >
              <Send className="w-4 h-4" />
              <span>Send Hiring Request</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
