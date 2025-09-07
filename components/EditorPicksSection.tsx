'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock } from 'lucide-react';
import PremiumCard from './PremiumCard';
import GradientText from './GradientText';
import { Article } from './homepage/types';

interface EditorPicksSectionProps {
  editorPickArticles: Article[];
}

export default function EditorPicksSection({ editorPickArticles }: EditorPicksSectionProps) {
  const formatArticleDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    if (isNaN(date.getTime())) return '';
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return 'अभी';
    if (diffInHours < 24) return `${diffInHours} घंटे पहले`;
    const days = Math.floor(diffInHours / 24);
    if (days <= 2) return `${days} दिन पहले`;
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  if (!editorPickArticles || editorPickArticles.length === 0) {
    return null;
  }

  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Star className="w-6 h-6 text-amber-500" />
          <GradientText gradient="amber" className="text-2xl md:text-3xl font-bold">
            Editor&apos;s Picks
          </GradientText>
          <span className="text-lg text-slate-300 font-medium">⭐ संपादक की पसंद</span>
        </div>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
      </div>

      {/* Featured Article (First Pick) */}
      {editorPickArticles[0] && (
        <div className="mb-8">
          <PremiumCard glowColor="amber" className="overflow-hidden">
            <Link href={`/articles/${editorPickArticles[0].slug.current}`} className="block">
              <article className="group grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <Image
                    src={editorPickArticles[0].coverImage?.asset?.url || 'https://via.placeholder.com/600x300?text=No+Image'}
                    alt={editorPickArticles[0].title}
                    width={600}
                    height={300}
                    className="w-full h-64 md:h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Star size={12} />
                    <span>Editor&apos;s Pick</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-4 leading-tight group-hover:text-amber-400 transition-colors">
                    {editorPickArticles[0].title}
                  </h3>
                  {editorPickArticles[0].excerpt && (
                    <p className="text-slate-300 mb-4 leading-relaxed line-clamp-3">
                      {editorPickArticles[0].excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{formatArticleDate(editorPickArticles[0].publishedAt)}</span>
                  </div>
                </div>
              </article>
            </Link>
          </PremiumCard>
        </div>
      )}

      {/* Other Editor Picks */}
      {editorPickArticles.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {editorPickArticles.slice(1, 4).map((article, index) => (
            <PremiumCard key={article._id} glowColor="amber" delay={index * 0.1}>
              <Link href={`/articles/${article.slug.current}`} className="block h-full">
                <article className="h-full flex flex-col group">
                  <div className="relative mb-4">
                    <Image
                      src={article.coverImage?.asset?.url || 'https://via.placeholder.com/400x200?text=No+Image'}
                      alt={article.title}
                      width={400}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                      <Star size={10} />
                      <span>Pick</span>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-lg font-bold text-slate-100 mb-2 line-clamp-2 leading-tight group-hover:text-amber-400 transition-colors">
                      {article.title}
                    </h4>
                    {article.excerpt && (
                      <p className="text-sm text-slate-300 mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-auto">
                    <Clock className="w-3 h-3" />
                    <span>{formatArticleDate(article.publishedAt)}</span>
                  </div>
                </article>
              </Link>
            </PremiumCard>
          ))}
        </div>
      )}
    </section>
  );
}
