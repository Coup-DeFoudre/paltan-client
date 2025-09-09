'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, TrendingUp, Star, Eye } from 'lucide-react';

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

  const cardVariants = {
    default: "w-80 h-80",
    featured: "w-full h-96 lg:h-[500px]",
    trending: "w-80 h-80"
  };

  const getRandomViews = () => Math.floor(Math.random() * 5000) + 500;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={{ y: -8 }}
      className={`${cardVariants[variant]} flex-shrink-0 motion-element`}
    >
      <div className="group relative h-full bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl overflow-hidden hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-2xl">
        <Link href={`/articles/${article.slug.current}`} className="block h-full">
          
          {/* Image Section */}
          <div className={`relative overflow-hidden ${
            variant === 'featured' ? 'h-48 lg:h-64' : 'h-40'
          }`}>
            <Image
              src={article.coverImage?.asset?.url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop'}
              alt={article.title}
              width={400}
              height={200}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              style={{ willChange: 'transform' }}
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
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

            {/* Reading stats */}
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
              <div className="flex items-center gap-1 text-white text-xs">
                <Eye size={10} />
                <span>{getRandomViews()}</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={`p-4 flex flex-col ${
            variant === 'featured' 
              ? 'lg:p-6' 
              : ''
          }`} style={{ 
            height: variant === 'featured' 
              ? 'calc(100% - 192px)' 
              : 'calc(100% - 160px)' 
          }}>
            <h3 className={`font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-amber-400 transition-colors ${
              variant === 'featured' ? 'text-lg lg:text-xl' : 'text-sm'
            }`}>
              {article.title}
            </h3>
            
            <div className="flex-grow mb-3">
              {article.excerpt && (
                <p className={`text-slate-400 line-clamp-2 leading-relaxed ${
                  variant === 'featured' ? 'text-sm lg:text-base' : 'text-xs'
                }`}>
                  {article.excerpt}
                </p>
              )}
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-700/30">
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>{formatArticleDate(article.publishedAt)}</span>
              </div>
              <div className="text-xs text-slate-500 truncate max-w-20">
                {article.author}
              </div>
            </div>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
      </div>
    </motion.div>
  );
}
