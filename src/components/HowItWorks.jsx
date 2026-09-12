import React, { useState } from 'react';
import { UserCheck, Sparkles, Search, MessageSquare, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Create',
      label: 'Student Verification',
      icon: UserCheck,
      desc: 'Students create their profile and verify their official student identity via college email or institutional document review.',
      detail: 'Includes student status badge, university badge, and skill tagging.'
    },
    {
      num: '02',
      title: 'Showcase',
      label: 'Portfolio & Services',
      icon: Sparkles,
      desc: 'Students upload skills, starting prices, service packages, and high-impact visual portfolio case studies.',
      detail: 'Custom pricing tiers (e.g. ₹499 - ₹1,499) with delivery time estimates.'
    },
    {
      num: '03',
      title: 'Discover',
      label: 'Campus Search & Compare',
      icon: Search,
      desc: 'Buyers (students, clubs, hackathon teams, startups) search, filter, and compare verified student portfolios and trust scores.',
      detail: 'Filter by skill, university campus, budget, rating, and availability.'
    },
    {
      num: '04',
      title: 'Hire',
      label: 'Project Workspace & Chat',
      icon: MessageSquare,
      desc: 'Buyers send a structured project request with budget and deadline. Communicate directly in the integrated live workspace.',
      detail: 'Milestone tracking, attachment uploads, and real-time status updates.'
    },
    {
      num: '05',
      title: 'Grow',
      label: 'Verified Reviews & Trust',
      icon: TrendingUp,
      desc: 'Completed projects automatically generate verified reviews, update the student Trust Score, and unlock high-value opportunities.',
      detail: '100% verified review pipeline tied exclusively to actual completed work.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto text-center space-y-12">
      
      {/* Title */}
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00B4D8]">
          The CAMPORA Lifecycle
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl text-[#F0F9FF] mt-1">
          How CAMPORA works.
        </h2>
        <p className="text-[#F0F9FF]/70 text-base sm:text-lg max-w-xl mx-auto mt-2">
          From verified student onboarding to milestone payout and reputation building.
        </p>
      </div>

      {/* Visual Workflow Pipeline Banner */}
      <div className="glass-pill p-2 sm:p-3 max-w-4xl mx-auto flex items-center justify-between overflow-x-auto gap-2 border border-[#00B4D8]/30">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${activeStep === i ? 'bg-[#00B4D8] text-[#070D14] shadow-[0_0_16px_rgba(0,180,216,0.4)]' : 'text-[#F0F9FF]/70 hover:text-[#00B4D8]'}`}
          >
            <span>{s.num}</span>
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {/* Grid of Steps */}
      <div className="grid md:grid-cols-5 gap-4 text-left">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          return (
            <div 
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border flex flex-col justify-between ${isActive ? 'bg-[#1A2B3C] border-[#00B4D8] shadow-[0_8px_32px_rgba(0,180,216,0.2)]' : 'bg-[#13202E]/70 border-[#F0F9FF]/10 hover:border-[#00B4D8]/30'}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl font-bold text-[#00B4D8]">{step.num}</span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? 'bg-[#00B4D8] text-[#070D14]' : 'bg-[#00B4D8]/10 text-[#00B4D8]'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-bold text-lg text-[#F0F9FF]">{step.title}</h3>
                <div className="text-xs font-semibold text-[#00B4D8] mt-0.5">{step.label}</div>
                <p className="text-xs text-[#F0F9FF]/70 mt-3 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F0F9FF]/10 text-[10px] text-[#F0F9FF]/50 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#00B4D8]" />
                <span>{step.detail}</span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
