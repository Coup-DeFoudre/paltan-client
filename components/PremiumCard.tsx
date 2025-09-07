'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'amber' | 'teal' | 'purple' | 'green';
  delay?: number;
}

export default function PremiumCard({ 
  children, 
  className = '', 
  glowColor = 'amber',
  delay = 0 
}: PremiumCardProps) {
  const glowClass = {
    amber: 'hover:glow-amber',
    teal: 'hover:glow-teal',
    purple: 'hover:shadow-purple-500/30',
    green: 'hover:shadow-green-500/30'
  }[glowColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${glowClass} ${className}`}
    >
      {children}
    </motion.div>
  );
}
