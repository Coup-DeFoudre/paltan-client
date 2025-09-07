'use client';

import React from 'react';

export default function OrbBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      
      {/* Large central orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-30">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-3xl animate-pulse"></div>
      </div>
      
      {/* Secondary orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 opacity-20">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-teal-500/15 to-cyan-500/15 blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="absolute bottom-20 left-20 w-48 h-48 opacity-25">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-slate-500/10 to-slate-400/10 blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Radial fade */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/50 to-slate-950"></div>
    </div>
  );
}
