'use client';

import React from 'react';

interface AdSectionProps {
  ads?: { title: string; description: string; imageUrl?: string }[];
}

export default function AdSection({ ads = [] }: AdSectionProps) {
  if (!ads || ads.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Sponsored Content</h2>
      <div className="space-y-4">
        {ads.slice(0, 2).map((ad, index) => (
          <div key={index} className="border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">{ad.title}</h3>
            <p className="text-slate-300 text-sm">{ad.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
