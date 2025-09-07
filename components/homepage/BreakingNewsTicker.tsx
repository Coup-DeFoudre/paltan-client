'use client';

import React from 'react';

interface BreakingNewsTickerProps {
  notices?: { title: string }[];
}

export default function BreakingNewsTicker({ notices = [] }: BreakingNewsTickerProps) {
  if (!notices || notices.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden">
      <div className="flex items-center space-x-4 animate-marquee">
        <span className="bg-red-700 px-3 py-1 rounded text-sm font-bold whitespace-nowrap">
          BREAKING
        </span>
        <div className="flex space-x-8">
          {notices.map((notice, index) => (
            <span key={index} className="text-sm whitespace-nowrap">
              {notice.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
