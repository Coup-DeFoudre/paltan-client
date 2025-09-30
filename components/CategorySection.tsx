/**
 * @fileoverview Category section component with article display
 * @description Displays articles for a specific category with theming support
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import PremiumCard from './PremiumCard';
// import GradientText from './GradientText';
import { Article } from './homepage/types';

/**
 * Props interface for CategorySection component
 * @interface CategorySectionProps
 */
interface CategorySectionProps {
  title: string;
  titleHindi?: string;
  subtitle?: string;
  description: string;
  articles: Article[];
  categoryKey: string;
  icon?: string;
  emoji?: string;
  gradientColor?: 'amber' | 'teal' | 'purple' | 'green';
  themeColor?: {
    gradient: string;
    bg: string;
    button: string;
    buttonHover: string;
    badge: string;
    hover: string;
    text: string;
    accent: string;
    shadow: string;
  };
}

/**
 * Category section component optimized with React.memo
 * @param {CategorySectionProps} props - Component props
 * @returns {React.ReactElement} Rendered category section
 */
const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  titleHindi,
  // subtitle, // Currently unused but part of the interface for future use
  description,
  articles,
  categoryKey,
  // icon = '📰',
  gradientColor = 'amber',
  // themeColor // Currently unused but part of the interface for future use
}: CategorySectionProps) => {
  
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

  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="mb-8">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {title}
                </h2>
                {titleHindi && <h3 className="text-lg text-amber-400 font-medium">{titleHindi}</h3>}
              </div>
            </div>
            
            {/* Desktop View All Button */}
            <div className="hidden md:block">
              {articles.length > 0 && (
                <Link 
                  href={`/category/${categoryKey}`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-amber-400 text-sm font-medium transition-all duration-300 group"
                >
                  <span>View All</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        </div>
        <p className="text-slate-500 max-w-3xl leading-relaxed ml-7">{description}</p>
      </div>

      {/* Articles Horizontal Scroll - Desktop & Mobile */}
      <div className="horizontal-scroll scrollbar-hide">
        <div className="flex gap-4 pb-4" style={{ minWidth: '100%', width: 'max-content' }}>
          {articles.slice(0, 5).map((article, index) => (
            <div key={article._id} className="w-80 h-80 flex-shrink-0">
              <PremiumCard glowColor={gradientColor} delay={index * 0.1} className="h-full">
                <Link href={`/articles/${article.slug.current}`} className="block h-full">
                  <article className="h-full flex flex-col">
                    <div className="relative mb-4 group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={article.coverImage?.asset?.url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop'}
                        alt={article.title}
                        width={400}
                        height={200}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-lg"></div>
                      
                      {/* Reading indicator */}
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-white text-xs">Live</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-grow flex flex-col">
                      <h4 className="text-sm font-bold text-slate-100 mb-2 line-clamp-3 leading-tight hover:text-amber-400 transition-colors">
                        {article.title}
                      </h4>
                      <div className="flex-grow">
                        {article.excerpt && (
                          <p className="text-xs text-slate-400 mb-3 line-clamp-3">
                            {article.excerpt}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatArticleDate(article.publishedAt)}</span>
                        </div>
                        <ArrowRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </article>
                </Link>
              </PremiumCard>
            </div>
          ))}

          {/* Mobile View All Button - At end of list with squeeze effect */}
          {articles.length > 0 && (
            <div className="md:hidden w-60 h-80 flex-shrink-0 flex items-center justify-center">
              <Link 
                href={`/category/${categoryKey}`}
                className="flex flex-col items-center justify-center w-full h-full bg-slate-800/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-xl transition-all duration-300 group hover:scale-105"
              >
                <ArrowRight size={28} className="text-slate-400 group-hover:text-amber-400 mb-3 group-hover:translate-x-1 transition-all" />
                <span className="text-slate-400 group-hover:text-amber-400 text-base font-medium transition-colors">View All</span>
                {titleHindi && <span className="text-slate-500 group-hover:text-slate-400 text-sm mt-2 transition-colors text-center">{titleHindi}</span>}
              </Link>
            </div>
          )}
        </div>
      </div>


    </section>
  );
};

// Memoize component for performance optimization
export default React.memo(CategorySection);
