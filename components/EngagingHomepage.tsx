/**
 * @fileoverview Engaging homepage component with trending content
 * @description Main homepage layout with trending articles, videos, and interactive elements
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ModernCarousel from './ModernCarousel';
import EngagingCard from './EngagingCard';
import NoticeBar from './homepage/NoticeBar';
import FeaturesSection from './FeaturesSection';
import VideosSectionHome from './VideosSectionHome';
import ErrorBoundary from './ErrorBoundary';
import { Article, Ad, Notice } from './homepage/types';

/**
 * Video interface for homepage video content
 * @interface Video
 */
interface Video {
  _id: string;
  title: string;
  description?: string;
  thumbnail?: { asset: { url: string } };
  thumbnailUrl?: string;
  embedUrl: string;
  category: string;
  publishedAt: string;
  views: number;
}

/**
 * Props interface for EngagingHomepage component
 * @interface EngagingHomepageProps
 */
interface EngagingHomepageProps {
  notices: Notice[];
  trendingArticles: Article[];
  editorPickArticles?: Article[];
  categoryArticles: { [key: string]: Article[] };
  categoryVideos?: { videos: Video[] };
  ads: Ad[];
}

export default function EngagingHomepage({ 
  notices, 
  trendingArticles, 
  editorPickArticles,
  categoryArticles,
  categoryVideos,
  ads 
}: EngagingHomepageProps) {
  
  // Enhanced ad filtering with fallback
  const homeBannerAds = ads?.filter(ad => ad.placements?.includes('home-top')) || [];
  const middleAds = ads?.filter(ad => ad.placements?.includes('home-mid')) || [];
  const footerAds = ads?.filter(ad => ad.placements?.includes('home-footer')) || [];

  const categories = [
    { key: 'national', title: 'National News', titleHindi: 'देश की खबरें', color: 'red' },
    { key: 'dharma', title: 'Dharma & Spirituality', titleHindi: 'धर्म और अध्यात्म', color: 'purple' },
    { key: 'society', title: 'Society & Culture', titleHindi: 'समाज और संस्कृति', color: 'blue' },
    { key: 'ground-reports', title: 'Ground Reports', titleHindi: 'ज़मीनी रिपोर्ट्स', color: 'green' },
    { key: 'youth', title: 'Youth & Careers', titleHindi: 'युवा और करियर', color: 'cyan' },
    { key: 'voices', title: 'Voices', titleHindi: 'विचार और अनुभव', color: 'pink' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Notice Bar */}
        <ErrorBoundary>
          <NoticeBar notices={notices} />
        </ErrorBoundary>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 md:py-6 lg:py-8">
          
          {/* Hero Trending Section */}
          <ErrorBoundary>
            <section className="mb-8 sm:mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Trending Now
                </h2>
                <div className="flex-grow h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
              </div>

              {/* Error handling and fallback */}
              {trendingArticles && trendingArticles.length > 0 ? (
                <ModernCarousel
                  autoplay={true}
                  autoplayDelay={6000}
                  showControls={false}
                  showDots={true}
                  className="h-[350px] sm:h-[420px] md:h-[500px]"
                >
                  {trendingArticles.slice(0, 5).map((article) => (
                    <Link key={article._id} href={`/articles/${article.slug?.current || '#'}`} className="block w-full h-full">
                      <article className="relative w-full h-full overflow-hidden group">
                        <Image
                          src={article.coverImage?.asset?.url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=600&fit=crop'}
                          alt={article.title || 'समाचार'}
                          width={1200}
                          height={600}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          style={{
                            objectPosition: 'center center',
                            willChange: 'transform'
                          }}
                          loading="eager"
                          priority={true}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        
                        {/* Content overlay */}
                        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 p-3 sm:p-4 md:p-8">
                          <div className="max-w-4xl">
                            <div className="flex flex-wrap items-center gap-2 mb-2 md:mb-4">
                              <div className="bg-red-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold">
                                Trending
                              </div>
                              <div className="flex items-center gap-1 text-white/80 text-xs md:text-sm">
                                <Eye size={12} className="md:w-4 md:h-4" />
                                <span>{Math.floor(Math.random() * 10000) + 1000} views</span>
                              </div>
                            </div>
                            
                            <h3 className="text-base sm:text-lg md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4 leading-tight line-clamp-2 md:line-clamp-3">
                              {article.title || 'शीर्षक उपलब्ध नहीं'}
                            </h3>
                            
                            {article.excerpt && (
                              <p className="text-white/90 text-sm md:text-lg mb-2 md:mb-4 line-clamp-1 md:line-clamp-2 leading-relaxed">
                                {article.excerpt}
                              </p>
                            )}
                            
                            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-white/70 text-xs md:text-sm">
                              <span>{article.author || 'अज्ञात लेखक'}</span>
                              <span className="hidden sm:inline">•</span>
                              <span className="hidden sm:inline">5 min read</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </ModernCarousel>
              ) : (
                <div className="h-[350px] sm:h-[420px] md:h-[500px] bg-slate-800/30 rounded-2xl border border-slate-700/30 flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">ट्रेंडिंग समाचार लोड हो रहे हैं...</p>
                    <p className="text-sm mt-2">कृपया कुछ समय बाद दोबारा देखें</p>
                  </div>
                </div>
              )}
            </section>
          </ErrorBoundary>

          {/* Editor's Picks - Featured Layout with Enhanced Error Handling */}
          <ErrorBoundary>
            <section className="mb-8 sm:mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <Star className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Editor&apos;s Choice
                </h2>
                <div className="flex-grow h-px bg-gradient-to-r from-amber-500/50 to-transparent"></div>
              </div>

              {editorPickArticles && editorPickArticles.length > 0 ? (
                <>
                  {/* Mobile: Horizontal scroll, Desktop: Grid */}
                  <div className="block md:hidden">
                    <div className="overflow-x-auto scrollbar-hide">
                      <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
                        {editorPickArticles.slice(0, 4).map((article, index) => (
                          <EngagingCard key={article._id} article={article} index={index} variant="default" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
                    {/* Featured pick - Larger */}
                    {editorPickArticles[0] && (
                      <div className="lg:row-span-2">
                        <EngagingCard article={editorPickArticles[0]} index={0} variant="featured" />
                      </div>
                    )}
                    
                    {/* Side picks - Better sizing */}
                    <div className="space-y-6">
                      {editorPickArticles.slice(1, 3).map((article, index) => (
                        <div key={article._id} className="h-80">
                          <EngagingCard article={article} index={index + 1} variant="default" />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-80 bg-slate-800/30 rounded-2xl border border-slate-700/30 flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">एडिटर की पसंद लोड हो रहे हैं...</p>
                    <p className="text-sm mt-2">चुनिंदा खबरों के लिए कुछ समय प्रतीक्षा करें</p>
                  </div>
                </div>
              )}
            </section>
          </ErrorBoundary>

          {/* Strategic Top Ad Placement */}
          <ErrorBoundary>
            {homeBannerAds.length > 0 && (
              <section className="mb-8 sm:mb-12">
                <div className="grid gap-4 sm:gap-6">
                  {homeBannerAds.slice(0, 1).map((ad: Ad) => (
                    <motion.a
                      key={ad._id}
                      href={ad.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 block"
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <Image
                        src={ad.adImage?.asset?.url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=300&fit=crop'}
                        alt={ad.title || 'विज्ञापन'}
                        width={1200}
                        height={300}
                        className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                      <div className="absolute top-3 left-3 bg-blue-500/90 backdrop-blur-sm text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                        Sponsored
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {ad.title || 'विज्ञापन देखें'}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </section>
            )}
          </ErrorBoundary>

          {/* Dynamic Category Sections */}
          <ErrorBoundary>
            {categories.map((category) => {
              const articles = categoryArticles[category.key] || [];
              const hasArticles = articles.length > 0;

              return (
                <section key={category.key} className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 bg-${category.color}-500 rounded-full animate-pulse`}></div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                          {category.title}
                        </h2>
                        <h3 className="text-lg text-slate-400 font-medium">{category.titleHindi}</h3>
                      </div>
                    </div>
                    
                    {/* Desktop View All */}
                    <div className="hidden md:block">
                      <Link 
                        href={`/category/${category.key}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-amber-400 text-sm font-medium transition-all duration-300 group"
                      >
                        <span>View All</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Horizontal scrolling articles */}
                  <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-4 sm:gap-6 pb-4" style={{ width: 'max-content' }}>
                      {hasArticles ? (
                        articles.slice(0, 5).map((article, index) => (
                          <EngagingCard key={article._id} article={article} index={index} variant="default" />
                        ))
                      ) : (
                        <motion.div 
                          className="w-80 h-80 flex-shrink-0 rounded-2xl border border-slate-700/40 bg-slate-800/30 flex items-center justify-center text-slate-400"
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                        >
                          <div className="text-center">
                            <div className={`w-12 h-12 bg-${category.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                              <div className={`w-3 h-3 bg-${category.color}-500 rounded-full animate-pulse`}></div>
                            </div>
                            <p className="text-sm font-medium">जल्द ही आएगी खबरें</p>
                            <p className="text-xs text-slate-500 mt-1">{category.titleHindi}</p>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Mobile View All */}
                      <motion.div 
                        className="md:hidden w-60 h-80 flex-shrink-0 flex items-center justify-center"
                        initial={{ opacity: 0, x: 50, scaleX: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, scaleX: 1 }}
                        viewport={{ once: true, margin: "0px" }}
                        transition={{ 
                          duration: 0.4,
                          delay: 0,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        <Link 
                          href={`/category/${category.key}`}
                          className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-r from-transparent to-slate-800/20 hover:to-slate-700/40 transition-all duration-300 group relative overflow-hidden"
                        >
                          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500/50 to-transparent"></div>
                          <ArrowRight size={32} className="text-slate-400 group-hover:text-amber-400 mb-4 group-hover:translate-x-2 transition-all" />
                          <span className="text-slate-400 group-hover:text-amber-400 text-lg font-medium transition-colors">View All</span>
                          <span className="text-slate-500 group-hover:text-slate-400 text-sm mt-2 transition-colors text-center">{category.titleHindi}</span>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </section>
              );
            })}
          </ErrorBoundary>

          {/* Strategic Mid-Page Ad Placement */}
          <ErrorBoundary>
            {middleAds.length > 0 && (
              <section className="mb-12 sm:mb-16">
                <div className="grid gap-6">
                  <div className="text-center text-slate-500 text-xs mb-4">
                    — विज्ञापन —
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    {middleAds.slice(0, 2).map((ad: Ad) => (
                      <motion.a
                        key={ad._id}
                        href={ad.link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 block"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <Image
                          src={ad.adImage?.asset?.url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=200&fit=crop'}
                          alt={ad.title || 'विज्ञापन'}
                          width={600}
                          height={200}
                          className="w-full h-28 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                        <div className="absolute top-2 left-2 bg-teal-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-bold">
                          Ad
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {ad.title || 'विज्ञापन'}
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </ErrorBoundary>

          {/* Videos Section */}
          <ErrorBoundary>
            {categoryVideos && categoryVideos.videos && categoryVideos.videos.length > 0 && (
              <VideosSectionHome videos={categoryVideos.videos} />
            )}
          </ErrorBoundary>

          {/* Footer Ads */}
          <ErrorBoundary>
            {footerAds.length > 0 && (
              <section className="mb-12 sm:mb-16">
                <div className="grid gap-4 sm:gap-6">
                  <div className="text-center text-slate-500 text-xs mb-4">
                    — समर्थित विज्ञापन —
                  </div>
                  {footerAds.map((ad: Ad) => (
                    <motion.a
                      key={ad._id}
                      href={ad.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 block"
                      whileHover={{ scale: 1.01 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <Image
                        src={ad.adImage?.asset?.url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=200&fit=crop'}
                        alt={ad.title || 'विज्ञापन'}
                        width={1200}
                        height={200}
                        className="w-full h-24 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                      <div className="absolute top-3 left-3 bg-purple-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-bold">
                        Sponsored
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {ad.title || 'और पढ़ें'}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </section>
            )}
          </ErrorBoundary>

          {/* Additional Features Section */}
          <ErrorBoundary>
            <FeaturesSection />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}