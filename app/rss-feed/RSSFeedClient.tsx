'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rss, ExternalLink, Calendar, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import PremiumCard from '@/components/PremiumCard';
import ErrorBoundary from '@/components/ErrorBoundary';
import { type RSSItem } from '@/lib/rssFeed';

interface RSSFeedClientProps {
  feed: { title?: string; description?: string } | null;
  groupedItems: Record<string, RSSItem[]>;
}

export default function RSSFeedClient({ feed, groupedItems }: RSSFeedClientProps) {
  const cleanDescription = (description: string) => {
    return description
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\s*-\s*([\d]{2})\/(?:[\d]{2})\/(?:[\d]{4})\s*$/, '')
      .replace(/\s*([\d]{2})\/(?:[\d]{2})\/(?:[\d]{4})\s*$/, '')
      .trim();
  };

  const getImageUrl = (item: RSSItem): string => {
    if (item['media:content'] && item['media:content']['@_url']) {
      return item['media:content']['@_url'];
    }
    if (item.enclosure && item.enclosure['@_url'] && 
        (item.enclosure['@_type']?.startsWith('image/') || 
         item.enclosure['@_url'].match(/\.(jpg|jpeg|png|gif|webp)$/i))) {
      return item.enclosure['@_url'];
    }
    const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/i);
    return imgMatch?.[1] || '';
  };

  const formatItemDate = (item: RSSItem): string => {
    try {
      const pubDate = item.pubDate ? item.pubDate.replace(/[^\x00-\x7F]/g, '').trim() : '';
      if (pubDate) {
        const date = new Date(pubDate);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('hi-IN', {
            year: 'numeric',
            month: 'long', 
            day: 'numeric'
          });
        }
      }
      
      const dateMatch = item.description.match(/([\d]{2})\/(?:[\d]{2})\/(?:[\d]{4})/);
      if (dateMatch && dateMatch[0]) {
        const [day, month, year] = dateMatch[0].split('/');
        const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return parsedDate.toLocaleDateString('hi-IN', {
          year: 'numeric',
          month: 'long', 
          day: 'numeric'
        });
      }
      
      return new Date().toLocaleDateString('hi-IN');
    } catch {
      return new Date().toLocaleDateString('hi-IN');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-red-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-amber-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Rss className="w-10 h-10 text-orange-500" />
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  RSS Feed
                </h1>
              </div>
              <h2 className="text-2xl md:text-3xl font-medium text-orange-400 mb-4">
                समाचार फ़ीड
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                {feed ? `Latest updates from ${feed.title}` : 'ताज़ी खबरों और अपडेट्स के लिए'}
              </p>
              {feed && (
                <div className="flex items-center justify-center mt-6">
                  <div className="bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium">
                    Auto-refreshes every hour
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <ErrorBoundary>
            {Object.keys(groupedItems).length > 0 ? (
              <div className="space-y-8">
                {Object.entries(groupedItems).map(([date, items], dateIndex) => (
                  <motion.div 
                    key={date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: dateIndex * 0.1 }}
                  >
                    <PremiumCard glowColor="amber" className="overflow-hidden">
                      {/* Date Header */}
                      <div className="bg-orange-500/20 border-b border-orange-500/30 px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-orange-400" />
                          <h2 className="text-xl font-bold text-white">{date}</h2>
                          <div className="ml-auto text-orange-400 text-sm">
                            {items.length} articles
                          </div>
                        </div>
                      </div>

                      {/* Articles */}
                      <div className="divide-y divide-slate-700/50">
                        {items.map((item, itemIndex) => {
                          const imageUrl = getImageUrl(item);
                          const cleanDesc = cleanDescription(item.description);

                          return (
                            <motion.article 
                              key={item.guid || item.link}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (dateIndex * 0.1) + (itemIndex * 0.05) }}
                              className="p-6 hover:bg-slate-700/20 transition-all duration-300 group"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {imageUrl && (
                                  <div className="md:col-span-1">
                                    <div className="relative h-40 w-full rounded-lg overflow-hidden bg-slate-800/50">
                                      <Image
                                        src={imageUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                                <div className={`${imageUrl ? 'md:col-span-3' : 'md:col-span-4'} flex flex-col`}>
                                  <h3 className="text-xl font-semibold text-white mb-3 leading-tight group-hover:text-orange-400 transition-colors">
                                    <a 
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:underline"
                                    >
                                      {item.title}
                                    </a>
                                  </h3>
                                  <p className="text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                                    {cleanDesc}
                                  </p>
                                  <div className="mt-auto flex items-center justify-between">
                                    <span className="text-sm text-slate-500">
                                      {formatItemDate(item)}
                                    </span>
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium text-sm group-hover:translate-x-1 transition-all duration-300"
                                    >
                                      <span>Read More</span>
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </motion.article>
                          );
                        })}
                      </div>
                    </PremiumCard>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <PremiumCard glowColor="amber" className="max-w-lg mx-auto">
                  <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-amber-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">No Feed Items Found</h3>
                    <p className="text-slate-300 mb-6">
                      हमें RSS फ़ीड में कोई आइटम नहीं मिले। कृपया बाद में दोबारा देखें।
                    </p>
                    <Link 
                      href="/"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-medium transition-colors"
                    >
                      Homepage पर वापस जाएं
                    </Link>
                  </div>
                </PremiumCard>
              </div>
            )}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
