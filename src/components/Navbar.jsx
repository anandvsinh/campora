import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import CamporaLogo from './CamporaLogo';
import { Search, Heart, Bell, UserCheck, Shield, ChevronDown, Menu, X, Briefcase, LayoutDashboard, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { currentRole, switchRole, currentTab, navigateTo, wishlist, notifications } = useApp();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleLabels = {
    guest: { label: 'Guest Visitor', icon: UserCheck, color: 'bg-[#13202E] text-[#00B4D8] border-[#00B4D8]/30' },
    student: { label: 'Student (Aarav)', icon: Sparkles, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
    buyer: { label: 'Buyer (Tech Society)', icon: Briefcase, color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
    admin: { label: 'Platform Admin', icon: Shield, color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' }
  };

  const currentRoleInfo = roleLabels[currentRole] || roleLabels.guest;
  const RoleIcon = currentRoleInfo.icon;

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto glass-pill px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-[0_8px_32px_rgba(7,13,20,0.8)] border border-[#F0F9FF]/10">
        
        {/* Brand Logo */}
        <button 
          onClick={() => navigateTo('home')} 
          className="focus:outline-none hover:opacity-90 transition-opacity text-left"
        >
          <CamporaLogo size="md" />
        </button>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-[#F0F9FF]/80">
          <button 
            onClick={() => navigateTo('home')}
            className={`px-3.5 py-1.5 rounded-full transition-colors ${currentTab === 'home' ? 'text-[#00B4D8] bg-[#00B4D8]/10' : 'hover:text-[#F0F9FF]'}`}
          >
            Home
          </button>
          <button 
            onClick={() => navigateTo('discover')}
            className={`px-3.5 py-1.5 rounded-full transition-colors ${currentTab === 'discover' ? 'text-[#00B4D8] bg-[#00B4D8]/10' : 'hover:text-[#F0F9FF]'}`}
          >
            Discover Talent
          </button>
          <button 
            onClick={() => navigateTo('campus-hubs')}
            className={`px-3.5 py-1.5 rounded-full transition-colors ${currentTab === 'campus-hubs' ? 'text-[#00B4D8] bg-[#00B4D8]/10' : 'hover:text-[#F0F9FF]'}`}
          >
            Campus Hubs
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('how-it-works');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else navigateTo('home');
            }}
            className="px-3.5 py-1.5 rounded-full hover:text-[#F0F9FF] transition-colors"
          >
            How it works
          </button>
        </nav>

        {/* Right Section: Persona Role Switcher & Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Wishlist Button */}
          <button 
            onClick={() => navigateTo('wishlist')}
            className="relative p-2.5 rounded-full hover:bg-[#F0F9FF]/10 text-[#F0F9FF]/80 hover:text-[#00B4D8] transition-colors"
            title="Saved Talent (People worth remembering)"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#00B4D8] text-[#070D14] text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2.5 rounded-full hover:bg-[#F0F9FF]/10 text-[#F0F9FF]/80 hover:text-[#00B4D8] transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#00B4D8] rounded-full animate-ping" />
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 elevated-card p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between border-b border-[#F0F9FF]/10 pb-2 mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">Notifications</h4>
                  <span className="text-[10px] text-[#F0F9FF]/50">{notifications.length} recent</span>
                </div>
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {notifications.map(n => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-[#13202E] border border-[#F0F9FF]/5 hover:border-[#00B4D8]/30 transition-colors">
                      <div className="text-xs font-semibold text-[#F0F9FF]">{n.title}</div>
                      <div className="text-[11px] text-[#F0F9FF]/70 mt-0.5">{n.message}</div>
                      <div className="text-[9px] text-[#00B4D8] mt-1">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher Pills */}
          <div className="relative">
            <button 
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${currentRoleInfo.color}`}
            >
              <RoleIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{currentRoleInfo.label}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 elevated-card p-2 shadow-2xl z-50 border border-[#00B4D8]/30">
                <div className="px-3 py-2 border-b border-[#F0F9FF]/10 text-[10px] uppercase font-bold text-[#F0F9FF]/50">
                  Switch User Persona
                </div>
                <div className="space-y-1 mt-1">
                  <button 
                    onClick={() => { switchRole('guest'); setShowRoleMenu(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-[#00B4D8]/10 transition-colors ${currentRole === 'guest' ? 'text-[#00B4D8] font-bold' : 'text-[#F0F9FF]/80'}`}
                  >
                    <span>👁️ Guest Visitor</span>
                    {currentRole === 'guest' && <span className="text-[10px] uppercase">Active</span>}
                  </button>
                  <button 
                    onClick={() => { switchRole('student'); setShowRoleMenu(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-[#00B4D8]/10 transition-colors ${currentRole === 'student' ? 'text-emerald-400 font-bold' : 'text-[#F0F9FF]/80'}`}
                  >
                    <span>🎨 Student Seller (Aarav)</span>
                    {currentRole === 'student' && <span className="text-[10px] uppercase">Active</span>}
                  </button>
                  <button 
                    onClick={() => { switchRole('buyer'); setShowRoleMenu(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-[#00B4D8]/10 transition-colors ${currentRole === 'buyer' ? 'text-cyan-400 font-bold' : 'text-[#F0F9FF]/80'}`}
                  >
                    <span>🏢 Buyer / Club Lead (Apex)</span>
                    {currentRole === 'buyer' && <span className="text-[10px] uppercase">Active</span>}
                  </button>
                  <button 
                    onClick={() => { switchRole('admin'); setShowRoleMenu(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-[#00B4D8]/10 transition-colors ${currentRole === 'admin' ? 'text-purple-400 font-bold' : 'text-[#F0F9FF]/80'}`}
                  >
                    <span>🛡️ Platform Admin</span>
                    {currentRole === 'admin' && <span className="text-[10px] uppercase">Active</span>}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Dashboard Action CTA */}
          {currentRole === 'student' && (
            <button 
              onClick={() => navigateTo('student-dashboard')}
              className="btn-primary py-1.5 px-3.5 text-xs hidden lg:flex"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Seller Studio</span>
            </button>
          )}

          {currentRole === 'buyer' && (
            <button 
              onClick={() => navigateTo('buyer-dashboard')}
              className="btn-primary py-1.5 px-3.5 text-xs hidden lg:flex"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>My Projects</span>
            </button>
          )}

          {currentRole === 'guest' && (
            <button 
              onClick={() => switchRole('student')}
              className="btn-primary py-1.5 px-4 text-xs"
            >
              <span>Offer Your Skill</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F0F9FF]/80 hover:text-[#00B4D8]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 elevated-card border border-[#00B4D8]/20 space-y-3 animate-in fade-in slide-in-from-top-2">
          <button 
            onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-[#F0F9FF]/90 hover:bg-[#00B4D8]/10"
          >
            Home
          </button>
          <button 
            onClick={() => { navigateTo('discover'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-[#F0F9FF]/90 hover:bg-[#00B4D8]/10"
          >
            Discover Talent
          </button>
          <button 
            onClick={() => { navigateTo('campus-hubs'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-[#F0F9FF]/90 hover:bg-[#00B4D8]/10"
          >
            Campus Hubs
          </button>
          <button 
            onClick={() => { navigateTo('wishlist'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-[#F0F9FF]/90 hover:bg-[#00B4D8]/10"
          >
            Wishlist ({wishlist.length})
          </button>
        </div>
      )}
    </header>
  );
}
