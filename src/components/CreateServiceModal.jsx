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
  const [uploadedImageBase64, setUploadedImageBase64] = useState('');

  const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80';

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    // Use uploaded base64 image, or provided URL, or fallback to DEFAULT_IMAGE
    const finalImage = uploadedImageBase64 || portfolioImg.trim() || DEFAULT_IMAGE;

    publishService({
      studentId: selectedStudent?.id || 'student-aarav',
      title,
      category,
      price: Number(price),
      deliveryDays: Number(deliveryDays),
      revisions: Number(revisions),
      description,
      image: finalImage,
      portfolioImg: finalImage
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070D14]/90 backdrop-blur-md flex items-center justify-center p-4">
      <form 
        onSubmit={handleSubmit}
        className="glass-card p-6 sm:p-8 max-w-lg w-full border border-[#00B4D8]/40 space-y-5 bg-gradient-to-b from-[#13202E] to-[#070D14] shadow-2xl max-h-[90vh] overflow-y-auto"
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
            <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Service Title *</label>
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
              <label className="block text-xs font-semibold text-[#F0F9FF]/80 mb-1">Starting Price (₹) *</label>
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

          {/* Gig Image Upload Section */}
          <div className="space-y-2 border-t border-[#F0F9FF]/10 pt-3">
            <label className="block text-xs font-semibold text-[#F0F9FF]/90">
              Gig Cover Photo (Upload or Paste Link)
            </label>

            {uploadedImageBase64 ? (
              <div className="relative rounded-xl overflow-hidden border border-[#00B4D8]/50 h-36 bg-[#070D14] flex items-center justify-center">
                <img src={uploadedImageBase64} alt="Gig Cover Upload" className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => setUploadedImageBase64('')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-500/80 text-white hover:bg-rose-600 transition-all shadow-lg"
                  title="Remove uploaded photo"
                >
                  <X className="w-4 h-4" />
                </button>
                <span className="absolute bottom-2 left-2 text-[10px] bg-[#070D14]/80 text-[#00B4D8] px-2 py-0.5 rounded-md border border-[#00B4D8]/30 font-bold">
                  Uploaded Photo Attached
                </span>
              </div>
            ) : (
              <div className="border-2 border-dashed border-[#F0F9FF]/20 hover:border-[#00B4D8] rounded-xl p-4 text-center transition-all bg-[#070D14]">
                <input 
                  type="file" 
                  accept="image/*"
                  id="user-gig-file-upload"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
                <label htmlFor="user-gig-file-upload" className="cursor-pointer flex flex-col items-center gap-1 text-xs text-[#F0F9FF]/70 hover:text-[#00B4D8]">
                  <Upload className="w-6 h-6 text-[#00B4D8]" />
                  <span className="font-bold text-[#F0F9FF]">Click to upload photo from your computer</span>
                  <span className="text-[10px] text-[#F0F9FF]/40">PNG, JPG, WEBP, GIF (If empty, default image is used)</span>
                </label>
              </div>
            )}

            <div className="text-[10px] text-[#F0F9FF]/50 text-center uppercase tracking-wider font-semibold">
              — OR Paste Image URL —
            </div>

            <input 
              type="url"
              placeholder="Or paste external image URL (https://...)"
              value={portfolioImg}
              onChange={(e) => setPortfolioImg(e.target.value)}
              className="w-full bg-[#070D14] border border-[#F0F9FF]/10 rounded-xl px-3.5 py-2 text-xs text-[#F0F9FF] focus:outline-none focus:border-[#00B4D8]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-[#F0F9FF]/10">
          <button type="button" onClick={onClose} className="btn-secondary text-xs py-2 px-4">Cancel</button>
          <button type="submit" className="btn-primary text-xs py-2 px-6 font-bold bg-[#00B4D8] text-[#070D14] hover:bg-[#00B4D8]/90">
            Publish Skill Service
          </button>
        </div>
      </form>
    </div>
  );
}
