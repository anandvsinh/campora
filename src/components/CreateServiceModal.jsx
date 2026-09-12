import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SKILL_CATEGORIES } from '../data/mockData';
import { Sparkles, Plus, Clock, Upload, CheckCircle2, DollarSign, X } from 'lucide-react';

export default function CreateServiceModal({ onClose }) {
  const { publishService, selectedStudent } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('graphic-design');
  const [price, setPrice] = useState(499);
  const [deliveryDays, setDeliveryDays] = useState(2);
  const [revisions, setRevisions] = useState(3);
  const [description, setDescription] = useState('');
  const [portfolioImg, setPortfolioImg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    publishService({
      studentId: selectedStudent?.id || 'student-aarav',
      title,
      category,
      price: Number(price),
      deliveryDays: Number(deliveryDays),
      revisions: Number(revisions),
      description,
      portfolioImg: portfolioImg || 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'
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
            <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">Seller Studio</span>
            <h3 className="font-serif text-2xl text-[#F0F9FF]">Publish a New Skill Service</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-full text-[#F0F9FF]/60 hover:text-[#00B4D8]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Service Title</label>
            <input 
              type="text"
              required
              placeholder="e.g. Modern College Fest Poster & Instagram Banner Pack"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Skill Category</label>
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
              <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Starting Price (₹)</label>
              <input 
                type="number"
                required
                min={100}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#00B4D8] font-bold focus:outline-none focus:border-[#00B4D8]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Est. Delivery (Days)</label>
              <input 
                type="number"
                required
                min={1}
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Included Revisions</label>
              <input 
                type="number"
                required
                min={1}
                value={revisions}
                onChange={(e) => setRevisions(e.target.value)}
                className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Service Description & Deliverables</label>
            <textarea 
              required
              rows={3}
              placeholder="Describe what client receives (e.g. High-res PNG/PDF, source files, fast 48h turnaround)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Portfolio Sample Image URL (Optional)</label>
            <input 
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={portfolioImg}
              onChange={(e) => setPortfolioImg(e.target.value)}
              className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-[#F0F9FF]/10">
          <button type="button" onClick={onClose} className="btn-secondary text-xs py-2 px-4">Cancel</button>
          <button type="submit" className="btn-primary text-xs py-2 px-6 font-bold">Publish Skill Service</button>
        </div>
      </form>
    </div>
  );
}
