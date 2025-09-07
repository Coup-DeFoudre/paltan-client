'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowLeft, Filter } from 'lucide-react';
import PremiumCard from '@/components/PremiumCard';

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage?: { asset: { url: string } };
  publishedAt: string;
  excerpt?: string;
  category: string;
  subcategory?: string;
  author?: string;
  isTrending?: boolean;
  isEditorPick?: boolean;
}

interface CategoryInfo {
  title: string;
  titleHindi: string;
  description: string;
}

interface CategoryPageClientProps {
  category: CategoryInfo;
  articles: Article[];
  categorySlug: string;
}

export default function CategoryPageClient({ category, articles }: CategoryPageClientProps) {
  const [filter, setFilter] = useState<'all' | 'trending' | 'editor-picks'>('all');

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

  // Filter articles based on selected filter
  const filteredArticles = articles.filter(article => {
    switch (filter) {
      case 'trending':
        return article.isTrending;
      case 'editor-picks':
        return article.isEditorPick;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Navigation */}
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-100">
                {category.title}
              </h1>
              <h2 className="text-xl text-slate-400 font-medium">{category.titleHindi}</h2>
            </div>
          </div>
          <p className="text-slate-500 max-w-4xl leading-relaxed ml-7">{category.description}</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 mr-4">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 text-sm font-medium">Filter:</span>
            </div>
            
            <div className="flex gap-2 min-w-max">
              {[
                { key: 'all', label: 'All Articles', labelHindi: 'सभी लेख' },
                { key: 'trending', label: 'Trending', labelHindi: 'ट्रेंडिंग' },
                { key: 'editor-picks', label: "Editor's Picks", labelHindi: 'संपादक की पसंद' }
              ].map(filterOption => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key as 'all' | 'trending' | 'editor-picks')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    filter === filterOption.key
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800/40 text-slate-400 border border-slate-600/30 hover:bg-slate-700/60 hover:text-slate-300'
                  }`}
                >
                  {filterOption.labelHindi}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-400 text-lg">इस फ़िल्टर में कोई लेख नहीं मिला।</p>
            </div>
          ) : (
            filteredArticles.map((article, index) => (
              <PremiumCard key={article._id} glowColor="amber" delay={index * 0.05}>
                <Link href={`/articles/${article.slug.current}`} className="block h-full">
                  <article className="h-full flex flex-col group">
                    <div className="relative mb-4">
                      <Image
                        src={article.coverImage?.asset?.url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop'}
                        alt={article.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        {article.isTrending && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                            ट्रेंडिंग
                          </span>
                        )}
                        {article.isEditorPick && (
                          <span className="bg-amber-500 text-slate-900 px-2 py-1 rounded text-xs font-bold">
                            Editor&apos;s Pick
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-slate-100 mb-3 line-clamp-2 leading-tight group-hover:text-amber-400 transition-colors">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-sm text-slate-400 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-auto">
                      <Clock className="w-3 h-3" />
                      <span>{formatArticleDate(article.publishedAt)}</span>
                      {article.author && (
                        <>
                          <span>•</span>
                          <span>{article.author}</span>
                        </>
                      )}
                    </div>
                  </article>
                </Link>
              </PremiumCard>
            ))
          )}
        </div>

        {/* Load More Button */}
        {filteredArticles.length > 9 && (
          <div className="text-center mt-12">
            <button className="px-6 py-3 bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-amber-400 rounded-full transition-all duration-300 border border-slate-600">
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
