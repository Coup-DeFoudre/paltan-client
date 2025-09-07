'use client';

import React from 'react';

interface CategorySectionProps {
  articles?: { title: string; description: string; category: string }[];
  category?: string;
}

export default function CategorySection({ articles = [], category = 'General' }: CategorySectionProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4">{category}</h2>
      <div className="space-y-4">
        {articles.slice(0, 3).map((article, index) => (
          <div key={index} className="border-b border-slate-700 pb-4 last:border-b-0">
            <h3 className="text-lg font-semibold text-white mb-2">{article.title}</h3>
            <p className="text-slate-300 text-sm">{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
