import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SKILL_CATEGORIES, CAMPUS_HUBS } from '../data/mockData';
import { Briefcase, Send, X, Calendar, DollarSign } from 'lucide-react';

export default function CreateJobModal({ onClose }) {
  const { postCampusJob } = useApp();

  const [title, setTitle] = useState('');
  const [posterName, setPosterName] = useState('Apex Tech Society');
  const [campus, setCampus] = useState('GLA University');
  const [category, setCategory] = useState('graphic-design');
  const [budget, setBudget] = useState(1500);
  const [deadline, setDeadline] = useState('2026-09-30');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !budget) return;

    postCampusJob({
      title,
      posterName,
      campus,
      category,
      budget: Number(budget),
      deadline,
      description
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070D14]/90 backdrop-blur-md flex items-center justify-center p-4">
      <form 
        onSubmit={handleSubmit}
        className="glass-card p-6 sm:p-8 max-w-lg w-full border border-[#00B4D8]/40 space-y-5 bg-gradient-to-b from-[#13202E] to-[#070D14] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#F0F9FF]/10 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">Organisation Hiring</span>
            <h3 className="font-serif text-2xl text-[#F0F9FF]">Post a Campus Job Requirement</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-full text-[#F0F9FF]/60 hover:text-[#00B4D8]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Job Title</label>
            <input 
              type="text"
              required
              placeholder="e.g. Need Motion Graphics Editor for Hackathon Pitch Reel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Club / Organisation Name</label>
              <input 
                type="text"
                required
                value={posterName}
                onChange={(e) => setPosterName(e.target.value)}
                className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">University Campus</label>
              <select 
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
              >
                {CAMPUS_HUBS.map(h => (
                  <option key={h.id} value={h.name}>{h.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Required Skill Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
              >
                {SKILL_CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Offered Budget (₹)</label>
              <input 
                type="number"
                required
                min={200}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#00B4D8] font-bold focus:outline-none focus:border-[#00B4D8]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Project Deadline</label>
            <input 
              type="date"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Job Description & Project Scope</label>
            <textarea 
              required
              rows={3}
              placeholder="Describe deliverables, required software experience, key references..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-[#F0F9FF]/10">
          <button type="button" onClick={onClose} className="btn-secondary text-xs py-2 px-4">Cancel</button>
          <button type="submit" className="btn-primary text-xs py-2 px-6 font-bold">Publish to Job Board</button>
        </div>
      </form>
    </div>
  );
}
