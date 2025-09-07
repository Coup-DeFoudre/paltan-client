'use client';

import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'amber' | 'teal' | 'purple' | 'rainbow';
  animate?: boolean;
}

export default function GradientText({ 
  children, 
  className = '', 
  gradient = 'amber',
  animate = false 
}: GradientTextProps) {
  const gradientClasses = {
    amber: 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500',
    teal: 'bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500',
    purple: 'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500',
    rainbow: 'bg-gradient-to-r from-amber-400 via-teal-400 via-purple-400 to-pink-400'
  }[gradient];

  const animationClass = animate ? 'text-reveal' : '';

  return (
    <span className={`${gradientClasses} bg-clip-text text-transparent ${animationClass} ${className}`}>
      {children}
    </span>
  );
}
