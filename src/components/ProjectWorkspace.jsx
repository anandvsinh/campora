import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, CheckCircle2, Clock, Send, Paperclip, Upload, Star, ArrowLeft, MessageSquare, AlertCircle, FileText } from 'lucide-react';

export default function ProjectWorkspace() {
  const { 
    selectedProject, 
    currentRole, 
    updateProjectStatus, 
    sendChatMessage, 
    submitWork, 
    submitReview, 
    navigateTo 
  } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [submissionFileName, setSubmissionFileName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  if (!selectedProject) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    sendChatMessage(selectedProject.id, messageInput);
    setMessageInput('');
  };

  const handleWorkUploadSubmit = (e) => {
    e.preventDefault();
    submitWork(selectedProject.id, {
      name: submissionFileName || 'Project_Final_Deliverable.zip',
      size: '24.5 MB',
      date: 'Just now'
    });
    setShowSubmitModal(false);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    submitReview(selectedProject.id, reviewRating, reviewComment);
    setShowReviewModal(false);
  };

  const stages = [
    { label: 'Requested', index: 1 },
    { label: 'Accepted', index: 2 },
    { label: 'In Progress', index: 3 },
    { label: 'Submitted', index: 4 },
    { label: 'Completed', index: 5 }
  ];

  return (
    <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0F9FF]/10 pb-4">
        <div>
          <button 
            onClick={() => navigateTo(currentRole === 'student' ? 'student-dashboard' : 'buyer-dashboard')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#00B4D8] hover:text-[#06B6D4] transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#F0F9FF]">
            {selectedProject.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#F0F9FF]/60 mt-1">
            <span>Client: <strong className="text-[#F0F9FF]">{selectedProject.buyerName}</strong></span>
            <span>·</span>
            <span>Student: <strong className="text-[#00B4D8]">{selectedProject.studentName}</strong></span>
            <span>·</span>
            <span>Deadline: <strong className="text-[#F0F9FF]">{selectedProject.deadline}</strong></span>
          </div>
        </div>

        {/* Budget & Payout Card */}
        <div className="p-4 rounded-2xl bg-[#0D1722] border border-[#00B4D8]/30 flex items-center gap-4 shrink-0">
          <div>
            <div className="text-[10px] uppercase font-bold text-[#00B4D8]">Escrow Budget</div>
            <div className="font-serif text-2xl font-bold text-[#F0F9FF]">₹{selectedProject.budget.toLocaleString()}</div>
          </div>
          {currentRole === 'student' && (
            <div className="pl-4 border-l border-[#F0F9FF]/10">
              <div className="text-[10px] uppercase font-bold text-emerald-400">Net Earnings (90%)</div>
              <div className="font-serif text-xl font-bold text-emerald-400">₹{selectedProject.studentNetEarnings.toLocaleString()}</div>
            </div>
          )}
        </div>
      </div>

      {/* Workspace Pipeline Stage Bar */}
      <div className="glass-card p-4 border border-[#00B4D8]/30">
        <div className="text-xs font-bold uppercase tracking-wider text-[#00B4D8] mb-3">
          Project Timeline Status: <span className="text-[#F0F9FF]">{selectedProject.status}</span>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center">
          {stages.map((stg) => {
            const isDone = selectedProject.stageIndex >= stg.index;
            const isCurrent = selectedProject.stageIndex === stg.index;
            return (
              <div 
                key={stg.index} 
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${isCurrent ? 'bg-[#00B4D8] text-[#070D14] border-[#00B4D8] shadow-[0_0_12px_rgba(0,180,216,0.5)]' : isDone ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-[#070D14] text-[#F0F9FF]/30 border-[#F0F9FF]/10'}`}
              >
                <div className="text-[10px] opacity-70">0{stg.index}</div>
                <div>{stg.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Split View */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Workspace Panel: Requirements, Files & Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Project Details Box */}
          <div className="glass-card p-6 border border-[#F0F9FF]/10 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">Project Brief & Scope</h3>
            <p className="text-xs text-[#F0F9FF]/80 leading-relaxed font-light">{selectedProject.description}</p>

            {selectedProject.requirements && (
              <div className="p-3 rounded-xl bg-[#070D14] border border-[#F0F9FF]/10 space-y-1">
                <div className="text-[10px] font-bold text-[#00B4D8] uppercase">Specific Instructions</div>
                <p className="text-xs text-[#F0F9FF]/70">{selectedProject.requirements}</p>
              </div>
            )}
          </div>

          {/* Files List Box */}
          <div className="glass-card p-6 border border-[#F0F9FF]/10 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">Uploaded Project Files</h3>
            <div className="space-y-2">
              {selectedProject.files.length === 0 ? (
                <div className="text-xs text-[#F0F9FF]/40 italic">No files attached yet.</div>
              ) : (
                selectedProject.files.map((file, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#070D14] border border-[#00B4D8]/20 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <FileText className="w-4 h-4 text-[#00B4D8]" />
                      <div>
                        <div className="font-semibold text-[#F0F9FF]">{file.name}</div>
                        <div className="text-[10px] text-[#F0F9FF]/50">{file.size} · {file.date}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#00B4D8] hover:underline cursor-pointer">Download</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action Control Panel based on Persona Role */}
          <div className="glass-card p-6 border border-[#00B4D8]/30 space-y-4 bg-gradient-to-b from-[#13202E] to-[#070D14]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">Workspace Actions</h3>

            {currentRole === 'student' && (
              <div className="space-y-3">
                {selectedProject.status === 'Requested' && (
                  <button 
                    onClick={() => updateProjectStatus(selectedProject.id, 'In Progress', 3)}
                    className="btn-primary w-full justify-center py-2.5 text-xs font-bold"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Accept Request & Start Work</span>
                  </button>
                )}

                {selectedProject.status === 'In Progress' && (
                  <button 
                    onClick={() => setShowSubmitModal(true)}
                    className="btn-primary w-full justify-center py-2.5 text-xs font-bold"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Submit Completed Work</span>
                  </button>
                )}

                {selectedProject.status === 'Submitted' && (
                  <div className="text-xs text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/30">
                    ⏳ Work submitted! Awaiting buyer review and milestone release.
                  </div>
                )}

                {selectedProject.status === 'Completed' && (
                  <div className="text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/30">
                    🎉 Project completed! Funds released to your earnings balance.
                  </div>
                )}
              </div>
            )}

            {currentRole === 'buyer' && (
              <div className="space-y-3">
                {selectedProject.status === 'Submitted' && (
                  <button 
                    onClick={() => setShowReviewModal(true)}
                    className="btn-primary w-full justify-center py-2.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-400"
                  >
                    <Star className="w-4 h-4" />
                    <span>Approve Work & Leave Verified Review</span>
                  </button>
                )}

                {selectedProject.status === 'Completed' && (
                  <div className="text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/30">
                    ✓ Milestone payment released & verified review saved!
                  </div>
                )}

                {selectedProject.status !== 'Submitted' && selectedProject.status !== 'Completed' && (
                  <div className="text-xs text-[#F0F9FF]/60 bg-[#070D14] p-3 rounded-xl border border-[#F0F9FF]/10">
                    Active workspace open. Student is preparing deliverables.
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Integrated Live Workspace Chat */}
        <div className="lg:col-span-7">
          <div className="glass-card p-6 border border-[#00B4D8]/40 shadow-2xl flex flex-col h-[600px] justify-between">
            
            {/* Chat Top Banner */}
            <div className="flex items-center justify-between border-b border-[#F0F9FF]/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h3 className="font-bold text-sm text-[#F0F9FF]">Integrated Project Chat</h3>
                  <div className="text-[10px] text-[#00B4D8]">Secured by CAMPORA Workspace</div>
                </div>
              </div>
              <span className="text-[10px] text-[#F0F9FF]/50">Live Sync</span>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
              {selectedProject.messages.map((msg) => {
                if (msg.sender === 'system') {
                  return (
                    <div key={msg.id} className="text-center my-3">
                      <span className="text-[10px] font-semibold text-[#00B4D8] bg-[#00B4D8]/10 px-3 py-1 rounded-full border border-[#00B4D8]/30 inline-block">
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                const isMe = (currentRole === 'student' && msg.sender === 'student') ||
                             (currentRole === 'buyer' && msg.sender === 'buyer');

                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className="text-[10px] text-[#F0F9FF]/50 mb-0.5">{msg.senderName} · {msg.timestamp}</div>
                    <div className={`p-3.5 rounded-2xl text-xs max-w-md ${isMe ? 'bg-[#00B4D8] text-[#070D14] font-medium rounded-br-none' : 'bg-[#0D1722] text-[#F0F9FF] border border-[#F0F9FF]/10 rounded-bl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="pt-3 border-t border-[#F0F9FF]/10 flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 bg-[#070D14] border border-[#F0F9FF]/10 rounded-full px-4 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
              />
              <button type="submit" className="btn-primary p-2.5 rounded-full shrink-0">
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>

      </div>

      {/* Modal 1: Student Work Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-[#070D14]/90 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleWorkUploadSubmit} className="glass-card p-6 max-w-md w-full border border-[#00B4D8]/40 space-y-4">
            <h3 className="font-serif text-2xl text-[#F0F9FF]">Submit Completed Work</h3>
            <p className="text-xs text-[#F0F9FF]/70">Upload your final deliverables for client review.</p>

            <div>
              <label className="block text-xs font-semibold text-[#F0F9FF] mb-1">File Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. TechnoFest_Poster_Final_HD.zip"
                value={submissionFileName}
                onChange={(e) => setSubmissionFileName(e.target.value)}
                className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3 py-2 text-xs text-[#F0F9FF]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowSubmitModal(false)} className="btn-secondary text-xs">Cancel</button>
              <button type="submit" className="btn-primary text-xs">Confirm Submission</button>
            </div>
          </form>
        </div>
      )}

      {/* Modal 2: Verified Review Generator Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-[#070D14]/90 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleReviewSubmit} className="glass-card p-6 max-w-lg w-full border border-[#00B4D8]/40 space-y-4">
            <h3 className="font-serif text-2xl text-[#F0F9FF]">Approve Project & Leave Review</h3>
            <p className="text-xs text-[#F0F9FF]/70">Releasing ₹{selectedProject.budget} to {selectedProject.studentName}. Verified reviews help build student reputation.</p>

            <div>
              <label className="block text-xs font-semibold text-[#F0F9FF] mb-1">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 border ${reviewRating >= star ? 'bg-amber-400/20 text-amber-400 border-amber-400' : 'bg-[#070D14] text-[#F0F9FF]/40 border-[#F0F9FF]/10'}`}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" /> {star}★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F0F9FF] mb-1">Verified Client Review</label>
              <textarea 
                required
                rows={3}
                placeholder="Write your honest review of the student's work and communication..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3 py-2 text-xs text-[#F0F9FF]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowReviewModal(false)} className="btn-secondary text-xs">Cancel</button>
              <button type="submit" className="btn-primary text-xs bg-emerald-500 hover:bg-emerald-400">Release Payout & Save Review</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
