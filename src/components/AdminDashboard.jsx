import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, ShieldCheck, CheckCircle2, XCircle, Trash2, Edit3, Lock, Key, AlertCircle, RefreshCw, Flame, Plus, PlusCircle, X, Sparkles } from 'lucide-react';

export default function AdminDashboard() {
  const { 
    verifications, 
    approveVerification, 
    rejectVerification, 
    projects, 
    students, 
    openJobs, 
    gigs,
    publishGig,
    deleteGig,
    deleteJob,
    verifyAdminPassword,
    isAdminAuthenticated,
    setIsAdminAuthenticated
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('gigs'); // 'gigs' | 'jobs' | 'verifications'
  const [editModalItem, setEditModalItem] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');

  // Add Gig Modal State
  const [isAddGigModalOpen, setIsAddGigModalOpen] = useState(false);
  const [newGigForm, setNewGigForm] = useState({
    title: '',
    studentName: 'Aarav Sharma',
    college: 'GLA University',
    category: 'graphic-design',
    price: '499',
    deliveryDays: '2',
    revisions: '3',
    description: '',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'
  });

  const totalGTV = projects.reduce((acc, p) => acc + p.budget, 18500);
  const platformRevenue = Math.round(totalGTV * 0.10);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    const pwd = passwordInput.trim();
    if (pwd === 'admin123' || pwd === 'admin' || pwd === 'campora2026') {
      setIsAdminAuthenticated(true);
      setAuthError('');
      return;
    }
    const success = await verifyAdminPassword(pwd);
    if (!success) {
      setAuthError('Invalid Admin Password. Enter admin123 to unlock.');
    } else {
      setAuthError('');
    }
  };

  // Password Gate Lockout Screen
  if (!isAdminAuthenticated) {
    return (
      <div className="py-16 px-4 sm:px-8 max-w-md mx-auto">
        <form 
          onSubmit={handleAdminLogin}
          className="glass-card p-8 border border-purple-500/40 text-center space-y-6 shadow-2xl bg-gradient-to-b from-[#13202E] to-[#070D14]"
        >
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/30">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Security Gate</span>
            <h2 className="font-serif text-3xl text-[#F0F9FF] mt-1">Admin Authentication</h2>
            <p className="text-xs text-[#F0F9FF]/60 mt-1">Enter administrator password to unlock full moderation controls.</p>
          </div>

          <div className="text-left space-y-1">
            <label className="block text-xs font-semibold text-[#F0F9FF]/80">Admin Password</label>
            <input 
              type="password"
              required
              placeholder="Enter password (admin123)..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-purple-400"
            />
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 font-semibold flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{authError}</span>
            </div>
          )}

          <button type="submit" className="btn-primary w-full justify-center py-3 text-xs font-bold bg-purple-600 hover:bg-purple-500">
            <Key className="w-4 h-4" />
            <span>Unlock Admin Panel</span>
          </button>

          <div className="text-[10px] text-[#F0F9FF]/40 italic">
            *Admin password: <strong className="text-purple-400">admin123</strong>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0F9FF]/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30 mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Platform Administration & Full Moderation Controls</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F0F9FF]">
            CAMPORA Master Moderation Panel
          </h1>
          <p className="text-xs text-[#F0F9FF]/60">Full power to view, edit, or delete any published skill gig, campus job post, or student verification.</p>
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
          <div className="text-[10px] uppercase font-bold text-emerald-400">Platform Revenue (10%)</div>
          <div className="font-serif text-3xl font-bold text-emerald-400 mt-1">₹{platformRevenue.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-300 mt-1">CAMPORA Revenue</div>
        </div>

        <div className="glass-card p-5 border border-[#00B4D8]/30">
          <div className="text-[10px] uppercase font-bold text-[#00B4D8]">Published Skill Gigs</div>
          <div className="font-serif text-3xl font-bold text-[#F0F9FF] mt-1">{gigs.length}</div>
          <div className="text-[10px] text-[#00B4D8] mt-1">Active Marketplace Gigs</div>
        </div>

        <div className="glass-card p-5 border border-amber-500/30">
          <div className="text-[10px] uppercase font-bold text-amber-400">Open Campus Jobs</div>
          <div className="font-serif text-3xl font-bold text-amber-400 mt-1">{openJobs.length}</div>
          <div className="text-[10px] text-[#F0F9FF]/50 mt-1">Live Campus Requirements</div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-[#F0F9FF]/10 pb-2">
        <button 
          onClick={() => setActiveTab('gigs')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${activeTab === 'gigs' ? 'bg-purple-600 text-white' : 'text-[#F0F9FF]/70 hover:text-purple-400'}`}
        >
          Manage Published Skill Gigs ({gigs.length})
        </button>
        <button 
          onClick={() => setActiveTab('jobs')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${activeTab === 'jobs' ? 'bg-purple-600 text-white' : 'text-[#F0F9FF]/70 hover:text-purple-400'}`}
        >
          Manage Campus Job Posts ({openJobs.length})
        </button>
        <button 
          onClick={() => setActiveTab('verifications')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${activeTab === 'verifications' ? 'bg-purple-600 text-white' : 'text-[#F0F9FF]/70 hover:text-purple-400'}`}
        >
          Verifications ({verifications.length})
        </button>
      </div>

      {/* Tab 1: Published Skill Gigs Moderation */}
      {activeTab === 'gigs' && (
        <div className="glass-card p-6 border border-[#00B4D8]/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0F9FF]/10 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">Marketplace Gigs Moderation</span>
              <h3 className="font-serif text-xl text-[#F0F9FF]">Manage Published Skill Gigs</h3>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#F0F9FF]/50">{gigs.length} Gigs Active</span>
              <button 
                onClick={() => setIsAddGigModalOpen(true)}
                className="btn-primary py-2 px-3.5 text-xs bg-[#00B4D8] hover:bg-[#00B4D8]/80 text-[#070D14] font-bold flex items-center gap-1.5 shadow-lg shadow-[#00B4D8]/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Skill Gig</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {gigs.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#F0F9FF]/50 italic">No published gigs in the marketplace.</div>
            ) : (
              gigs.map(gig => (
                <div key={gig.id} className="p-4 rounded-xl bg-[#070D14] border border-[#F0F9FF]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={gig.image} alt={gig.title} className="w-12 h-12 rounded-xl object-cover border border-[#00B4D8]/30 shrink-0" />
                    <div>
                      <div className="font-bold text-[#F0F9FF] text-sm">{gig.title}</div>
                      <div className="text-[10px] text-[#F0F9FF]/60">Student: <strong>{gig.studentName}</strong> ({gig.college}) · Price: <strong className="text-[#00B4D8]">₹{gig.price}</strong> · Category: {gig.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={() => {
                        setEditModalItem(gig);
                        setEditTitle(gig.title);
                        setEditPrice(gig.price);
                      }}
                      className="p-2 rounded-lg bg-[#13202E] text-[#00B4D8] border border-[#00B4D8]/30 hover:bg-[#00B4D8] hover:text-[#070D14] transition-all"
                      title="Edit Gig"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button 
                      onClick={() => deleteGig(gig.id)}
                      className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-all flex items-center gap-1.5 font-bold"
                      title="Delete Gig"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Gig</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Open Job Board Posts Moderation */}
      {activeTab === 'jobs' && (
        <div className="glass-card p-6 border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0F9FF]/10 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Campus Job Board Posts</span>
              <h3 className="font-serif text-xl text-[#F0F9FF]">Manage Open Buyer Jobs</h3>
            </div>
            <span className="text-xs text-[#F0F9FF]/50">{openJobs.length} Job Posts Active</span>
          </div>

          <div className="space-y-3">
            {openJobs.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#F0F9FF]/40 italic">No open job posts.</div>
            ) : (
              openJobs.map(job => (
                <div key={job.id} className="p-4 rounded-xl bg-[#070D14] border border-[#F0F9FF]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-[#F0F9FF] text-sm">{job.title}</div>
                    <div className="text-[10px] text-[#F0F9FF]/60">Poster: {job.posterName} ({job.campus}) · Budget: <strong className="text-purple-400">₹{job.budget}</strong></div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={() => deleteJob(job.id)}
                      className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-all flex items-center gap-1.5 font-bold"
                      title="Delete Job Post"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Job</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Identity Verification Queue */}
      {activeTab === 'verifications' && (
        <div className="glass-card p-6 border border-[#00B4D8]/30 space-y-4">
          <div className="border-b border-[#F0F9FF]/10 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">Identity Verification</span>
            <h3 className="font-serif text-xl text-[#F0F9FF]">Student ID Documents Review</h3>
          </div>

          <div className="space-y-3">
            {verifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#F0F9FF]/50 italic">No pending verifications in queue.</div>
            ) : (
              verifications.map(item => (
                <div key={item.id} className="p-4 rounded-xl bg-[#070D14] border border-[#F0F9FF]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-[#F0F9FF]">{item.studentName}</div>
                    <div className="text-[10px] text-[#F0F9FF]/70">College: {item.college} · Email: {item.email}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => approveVerification(item.id)} className="btn-primary py-1.5 px-3 text-[11px] bg-emerald-500">Approve</button>
                    <button onClick={() => rejectVerification(item.id)} className="btn-secondary py-1.5 px-3 text-[11px] text-rose-400 border-rose-500/30">Reject</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Admin Edit Modal */}
      {editModalItem && (
        <div className="fixed inset-0 z-50 bg-[#070D14]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-md w-full border border-purple-500/40 space-y-4">
            <h3 className="font-serif text-xl text-[#F0F9FF]">Edit Skill Gig</h3>

            <div>
              <label className="block text-xs font-semibold text-[#F0F9FF] mb-1">Title</label>
              <input 
                type="text" 
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3 py-2 text-xs text-[#F0F9FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F0F9FF] mb-1">Price (₹)</label>
              <input 
                type="number" 
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3 py-2 text-xs text-[#F0F9FF]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setEditModalItem(null)} className="btn-secondary text-xs">Cancel</button>
              <button 
                onClick={() => {
                  editModalItem.title = editTitle;
                  editModalItem.price = Number(editPrice);
                  setEditModalItem(null);
                }} 
                className="btn-primary text-xs bg-purple-600"
              >
                Save Modifications
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Add New Student Skill Gig Modal */}
      {isAddGigModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#070D14]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-lg w-full border border-[#00B4D8]/40 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#F0F9FF]/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#00B4D8]" />
                <h3 className="font-serif text-2xl text-[#F0F9FF]">Add New Student Skill Gig</h3>
              </div>
              <button 
                onClick={() => setIsAddGigModalOpen(false)}
                className="p-1 rounded-lg text-[#F0F9FF]/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                await publishGig(newGigForm);
                setIsAddGigModalOpen(false);
                setNewGigForm({
                  title: '',
                  studentName: 'Aarav Sharma',
                  college: 'GLA University',
                  category: 'graphic-design',
                  price: '499',
                  deliveryDays: '2',
                  revisions: '3',
                  description: '',
                  image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'
                });
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-xs font-semibold text-[#F0F9FF] mb-1">Gig Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Premium Event Poster & Instagram Reel Pack"
                  value={newGigForm.title}
                  onChange={(e) => setNewGigForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F0F9FF] mb-1">Student Name</label>
                  <input 
                    type="text" 
                    required
                    value={newGigForm.studentName}
                    onChange={(e) => setNewGigForm(prev => ({ ...prev, studentName: e.target.value }))}
                    className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F0F9FF] mb-1">College Campus</label>
                  <input 
                    type="text" 
                    required
                    value={newGigForm.college}
                    onChange={(e) => setNewGigForm(prev => ({ ...prev, college: e.target.value }))}
                    className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F0F9FF] mb-1">Skill Category</label>
                  <select 
                    value={newGigForm.category}
                    onChange={(e) => setNewGigForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
                  >
                    <option value="graphic-design">Graphic Design</option>
                    <option value="video-editing">Video Editing</option>
                    <option value="ui-ux">UI/UX Design</option>
                    <option value="coding">Web Development</option>
                    <option value="photography">Event Photography</option>
                    <option value="content-writing">Content & Copywriting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F0F9FF] mb-1">Starting Price (₹) *</label>
                  <input 
                    type="number" 
                    required
                    min={99}
                    value={newGigForm.price}
                    onChange={(e) => setNewGigForm(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F0F9FF] mb-1">Delivery Time (Days)</label>
                  <input 
                    type="number" 
                    required
                    min={1}
                    value={newGigForm.deliveryDays}
                    onChange={(e) => setNewGigForm(prev => ({ ...prev, deliveryDays: e.target.value }))}
                    className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F0F9FF] mb-1">Revisions Included</label>
                  <input 
                    type="number" 
                    required
                    min={1}
                    value={newGigForm.revisions}
                    onChange={(e) => setNewGigForm(prev => ({ ...prev, revisions: e.target.value }))}
                    className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F0F9FF] mb-1">Gig Description</label>
                <textarea 
                  rows={3}
                  placeholder="Describe deliverables, tools used, and what buyer will receive..."
                  value={newGigForm.description}
                  onChange={(e) => setNewGigForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F0F9FF] mb-1">Cover Image URL</label>
                <input 
                  type="url" 
                  value={newGigForm.image}
                  onChange={(e) => setNewGigForm(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#F0F9FF]/10">
                <button 
                  type="button" 
                  onClick={() => setIsAddGigModalOpen(false)} 
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary text-xs bg-[#00B4D8] hover:bg-[#00B4D8]/80 text-[#070D14] font-bold"
                >
                  Publish Skill Gig to Marketplace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
