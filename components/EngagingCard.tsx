'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, TrendingUp, Star } from 'lucide-react';

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage?: { asset: { url: string } };
  publishedAt: string;
  excerpt?: string;
  category?: string;
  author?: string;
  isTrending?: boolean;
  isEditorPick?: boolean;
}

interface EngagingCardProps {
  article: Article;
  index: number;
  variant?: 'default' | 'featured' | 'trending';
}

export default function EngagingCard({ article, index, variant = 'default' }: EngagingCardProps) {
  // SSR-safe date formatting - always return consistent format to avoid hydration mismatch
  const formatArticleDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    // Always use DD-MM-YYYY format for SSR consistency
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  // Card size variants - increased height to fit more text
  const cardVariants = {
    default: "w-80 h-[340px]",
    featured: "w-full h-[420px] lg:h-[520px]",
    trending: "w-80 h-[340px]"
  };

  // Image height based on variant
  const imageHeight = variant === 'featured' ? 'h-44 lg:h-56' : 'h-36';

  return (
    <motion.div
      // SSR-safe animation - no Y movement to prevent scroll issues on mobile
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(index * 0.06, 0.3), 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      // Scale-only hover to avoid vertical movement
      whileHover={{ scale: 1.02 }}
      className={`${cardVariants[variant]} flex-shrink-0`}
      style={{ touchAction: 'auto' }} // Allow both horizontal and vertical touch to pass through
    >
      <div className="group relative h-full bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl overflow-hidden hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-2xl">
        <Link href={`/articles/${article.slug.current}`} className="block h-full flex flex-col">
          
          {/* Image Section - reduced height */}
          <div className={`relative overflow-hidden flex-shrink-0 ${imageHeight}`}>
            <Image
              src={article.coverImage?.asset?.url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop'}
              alt={article.title}
              width={400}
              height={200}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            
            {/* Status badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {article.isTrending && (
                <div className="bg-red-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <TrendingUp size={10} />
                  <span>Hot</span>
                </div>
              )}
              {article.isEditorPick && (
                <div className="bg-amber-500/90 backdrop-blur-sm text-slate-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star size={10} />
                  <span>Pick</span>
                </div>
              )}
            </div>
          </div>

          {/* Content Section - flex-grow to fill remaining space */}
          <div className={`p-4 flex flex-col flex-grow min-h-0 ${
            variant === 'featured' ? 'lg:p-5' : ''
          }`}>
            {/* Title with proper Hindi text rendering */}
            <h3 
              className={`font-semibold text-white group-hover:text-amber-400 transition-colors mb-2 ${
                variant === 'featured' ? 'text-base lg:text-lg' : 'text-sm'
              }`}
              style={{ 
                display: '-webkit-box',
                WebkitLineClamp: variant === 'featured' ? 3 : 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: '1.7', // Extra height for Hindi matras (ी, ो, ु, ू)
                minHeight: variant === 'featured' ? '5.1em' : '3.4em' // 1.7 * 3 or 1.7 * 2
              }}
            >
              {article.title}
            </h3>
            
            {/* Excerpt */}
            <div className="flex-grow min-h-0 mb-2">
              {article.excerpt && (
                <p 
                  className={`text-slate-400 ${
                    variant === 'featured' ? 'text-sm' : 'text-xs'
                  }`}
                  style={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.5'
                  }}
                >
                  {article.excerpt}
                </p>
              )}
            </div>
            
            {/* Footer - always at bottom */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-700/30 mt-auto">
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3 flex-shrink-0" />
                <span>{formatArticleDate(article.publishedAt)}</span>
              </div>
              <div className="text-xs text-slate-500 truncate max-w-24">
                {article.author}
              </div>
            </div>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </Link>
      </div>
    </motion.div>
  );
}
