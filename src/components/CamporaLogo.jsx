import React from 'react';

export default function CamporaLogo({ size = 'md', showSubtitle = true, className = '' }) {
  const dimensions = {
    sm: { icon: 32, fontMain: 'text-xl', fontSub: 'text-[9px]' },
    md: { icon: 42, fontMain: 'text-2xl', fontSub: 'text-[10px]' },
    lg: { icon: 60, fontMain: 'text-4xl', fontSub: 'text-[12px]' }
  }[size] || { icon: 42, fontMain: 'text-2xl', fontSub: 'text-[10px]' };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official CAMPORA Emblem SVG */}
      <svg 
        width={dimensions.icon} 
        height={dimensions.icon} 
        viewBox="0 0 500 500" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_4px_16px_rgba(0,180,216,0.3)]"
      >
        <defs>
          <linearGradient id="capGrad" x1="100" y1="50" x2="350" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0077B6" />
            <stop offset="100%" stopColor="#003554" />
          </linearGradient>

          <linearGradient id="waveGrad" x1="100" y1="180" x2="450" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00B4D8" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0077B6" />
          </linearGradient>

          <linearGradient id="nodeGrad" x1="300" y1="50" x2="450" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00B4D8" />
            <stop offset="100%" stopColor="#005C8A" />
          </linearGradient>
        </defs>

        {/* Graduation Cap */}
        <path 
          d="M 90,160 L 280,70 L 450,160 L 280,230 Z" 
          fill="url(#capGrad)" 
        />
        <path 
          d="M 140,188 L 140,240 Q 140,260 130,270 L 130,275 Q 140,275 145,260 L 145,190 Z" 
          fill="#00B4D8" 
        />
        <circle cx="130" cy="275" r="8" fill="#00B4D8" />

        {/* Cap inner band */}
        <path 
          d="M 200,210 Q 280,240 360,200 L 360,225 Q 280,270 200,230 Z" 
          fill="#FFFFFF" 
          opacity="0.8"
        />

        {/* Outer Circular Wave & Sweeping Arc */}
        <path 
          d="M 160,220 C 100,280 120,400 230,440 C 340,480 440,400 450,310 C 430,370 340,430 250,400 C 180,380 150,300 190,240 Z" 
          fill="url(#waveGrad)" 
        />

        {/* Shaking Hands Figures & Arrow */}
        {/* Left figure */}
        <circle cx="215" cy="285" r="22" fill="url(#waveGrad)" />
        <path 
          d="M 180,360 Q 215,315 250,335 L 290,320 L 270,350 L 230,365 Z" 
          fill="url(#waveGrad)" 
        />

        {/* Right figure */}
        <circle cx="340" cy="315" r="22" fill="url(#waveGrad)" />
        <path 
          d="M 370,390 Q 340,345 300,335 L 265,340 L 285,365 L 320,380 Z" 
          fill="url(#waveGrad)" 
        />

        {/* Handshake Center */}
        <path 
          d="M 255,335 Q 275,325 295,335 Q 275,355 255,335 Z" 
          fill="#FFFFFF" 
        />

        {/* Upward Growth Arrow */}
        <path 
          d="M 240,300 L 320,240 L 305,270 L 320,275 Z" 
          fill="#00B4D8" 
        />

        {/* Skill Nodes & Connecting Lines (Gear, Paintbrush, Wrench) */}
        {/* Line to Gear */}
        <line x1="260" y1="270" x2="310" y2="180" stroke="#00B4D8" strokeWidth="6" strokeLinecap="round" />
        <circle cx="320" cy="165" r="24" fill="url(#nodeGrad)" />
        {/* Gear icon inside node */}
        <path d="M 320,153 L 323,158 L 328,158 L 325,163 L 327,168 L 320,165 L 313,168 L 315,163 L 312,158 L 317,158 Z" fill="#FFFFFF" />

        {/* Line to Paintbrush */}
        <line x1="330" y1="200" x2="380" y2="180" stroke="#00B4D8" strokeWidth="6" strokeLinecap="round" />
        <circle cx="395" cy="175" r="22" fill="url(#nodeGrad)" />
        {/* Paintbrush inside node */}
        <path d="M 388,182 L 400,170 C 403,167 405,170 402,173 L 392,185 Z" fill="#FFFFFF" />

        {/* Line to Tool / Wrench */}
        <line x1="390" y1="200" x2="415" y2="240" stroke="#00B4D8" strokeWidth="6" strokeLinecap="round" />
        <circle cx="425" cy="255" r="20" fill="url(#nodeGrad)" />
      </svg>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <span className={`font-extrabold tracking-wider text-[#F0F9FF] ${dimensions.fontMain}`}>
          CAMPORA
        </span>
        {showSubtitle && (
          <span className={`font-bold tracking-[0.25em] text-[#00B4D8] uppercase ${dimensions.fontSub} mt-0.5`}>
            Student Skill Marketplace
          </span>
        )}
      </div>
    </div>
  );
}
