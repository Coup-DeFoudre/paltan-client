/**
 * @fileoverview Related Posts Component - Horizontal Cards
 * @description Displays related articles in horizontal card layout
 * @author Paltan Development Team
 */

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/sanity';

const builder = imageUrlBuilder(client);

interface ImageSource {
  asset: {
    url: string;
  };
}

function urlFor(source: ImageSource) {
  if (!source?.asset) return '';
  try {
    return builder.image(source).width(300).height(200).fit('crop').url();
  } catch {
    return source.asset.url || '';
  }
}

interface RelatedArticle {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  category?: string;
  subcategory?: string;
  author?: string;
  coverImage?: ImageSource;
  tags?: string[];
}

interface RelatedPostsProps {
  articles: RelatedArticle[];
}

export default function RelatedPosts({ articles }: RelatedPostsProps) {
  // If no related articles, don't render the component
  if (!articles || articles.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  return (
    <motion.section
      className="mt-16 pt-12 border-t border-slate-700/50"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Section Header */}
      <div className="mb-8">
        <motion.h2 
          className="text-3xl md:text-4xl font-black text-slate-100 mb-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">
            संबंधित लेख
          </span>
        </motion.h2>
        <motion.p 
          className="text-slate-400 text-lg"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          आपकी रुचि के अनुसार चुनिंदा लेख
        </motion.p>
      </div>

      {/* Articles Stack */}
      <div className="space-y-4">
        {articles.map((article, index) => (
          <motion.div
            key={article._id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link href={`/articles/${article.slug.current}`}>
              <div className="group bg-slate-800/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10">
                <div className="flex flex-row h-full">
                  {/* Image Section - Left Side */}
                  <div className="relative w-32 sm:w-48 md:w-80 h-32 md:h-36 flex-shrink-0 overflow-hidden">
                    {article.coverImage?.asset?.url ? (
                      <Image
                        src={urlFor(article.coverImage) || article.coverImage.asset.url}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-video.svg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                        <span className="text-slate-500 text-xs md:text-sm">कोई छवि नहीं</span>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    {article.category && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold shadow-lg">
                        {article.category === 'national' && '📰 देश'}
                        {article.category === 'dharma' && '🕉️ धर्म'}
                        {article.category === 'society' && '🌏 समाज'}
                        {article.category === 'ground-reports' && '🧭 रिपोर्ट'}
                        {article.category === 'youth' && '🎓 युवा'}
                        {article.category === 'voices' && '🗣️ विचार'}
                        {article.category === 'videos' && '🎥 वीडियो'}
                        {article.category === 'art-literature' && '🎨 कला'}
                        {article.category === 'local' && '🏘️ लोकल'}
                        {!['national', 'dharma', 'society', 'ground-reports', 'youth', 'voices', 'videos', 'art-literature', 'local'].includes(article.category) && article.category}
                      </div>
                    )}
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-transparent"></div>
                  </div>

                  {/* Content Section - Right Side */}
                  <div className="flex-1 p-3 md:p-5 flex flex-col justify-between min-w-0">
                    {/* Title */}
                    <h3 className="text-sm sm:text-base md:text-xl font-bold text-slate-100 mb-1 md:mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors duration-300">
                      {article.title}
                    </h3>

                    {/* Excerpt - Hidden on mobile */}
                    {article.excerpt && (
                      <p className="hidden sm:block text-slate-400 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}

                    {/* Bottom Section - Metadata and Read More */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        {article.author && (
                          <div className="flex items-center space-x-1 md:space-x-1.5 text-[10px] md:text-xs text-slate-400">
                            <User className="w-3 md:w-3.5 h-3 md:h-3.5 text-amber-400" />
                            <span className="truncate max-w-[80px] md:max-w-none">{article.author}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-1 md:space-x-1.5 text-[10px] md:text-xs text-slate-400">
                          <Calendar className="w-3 md:w-3.5 h-3 md:h-3.5 text-amber-400" />
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                      </div>

                      {/* Read More Link */}
                      <div className="flex items-center space-x-1 md:space-x-1.5 text-amber-400 font-medium text-xs md:text-sm group-hover:space-x-2 md:group-hover:space-x-2.5 transition-all duration-300 flex-shrink-0">
                        <span>पढ़ें</span>
                        <ArrowRight className="w-3 md:w-4 h-3 md:h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
