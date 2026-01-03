/**
 * @fileoverview Article content renderer with enhanced link formatting
 * @description Renders Sanity portable text with custom styled components
 * @version 2.0 - Enhanced with beautiful link formatting
 * @author Paltan Development Team
 */

'use client';

import Image from 'next/image';
import { PortableText, PortableTextComponents, PortableTextBlock } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/sanity';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, Share2, BookOpen, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import ReadingProgress from './ReadingProgress';
import { calculateReadingTime, formatReadingTime } from '@/lib/readingTime';
import { useState } from 'react';
import RelatedPosts from './RelatedPosts';

/**
 * Interface for advertisement data
 */
interface Ad {
  _id: string;
  title: string;
  adImage?: { asset: { url: string } };
  link: string;
  placements: string[];
  startDate: string;
  duration: string;
}

/**
 * Interface for article data from Sanity
 */
interface Article {
  title: string;
  body: PortableTextBlock[];
  mainImage?: { asset: { url: string }; caption?: string; alt?: string };
  coverImage?: { asset: { url: string }; caption?: string; alt?: string };
  excerpt?: string;
  publishedAt: string;
  author?: string;
}

/**
 * Interface for related article data
 */
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

/**
 * Props for ArticleContent component
 */
interface ArticleContentProps {
  article: Article;
  ads: {
    topAds: Ad[];
    sideAds: Ad[];
    footerAds: Ad[];
  };
  relatedArticles?: RelatedArticle[];
}

const builder = imageUrlBuilder(client);

interface ImageSource {
  asset: {
    url: string;
  };
}

// Removed unused interfaces

// URL builder for content images - preserves aspect ratio without cropping
function urlFor(source: ImageSource) {
  if (!source?.asset) return '';
  try {
    // Use fit('max') to preserve original aspect ratio without cropping
    return builder.image(source).width(900).fit('max').auto('format').url();
  } catch {
    return source.asset.url || '';
  }
}

// URL builder for cover images - optimized for display
function urlForCover(source: ImageSource) {
  if (!source?.asset) return '';
  try {
    // Use fit('max') for cover images to preserve aspect ratio
    return builder.image(source).width(1200).fit('max').auto('format').url();
  } catch {
    return source.asset.url || '';
  }
}

// Custom Link Component for PortableText
const CustomLink = ({ children, value }: { children: React.ReactNode, value?: { href?: string } }) => {
  const href = value?.href || '';
  const isExternal = href.startsWith('http') || href.startsWith('https');

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline decoration-solid decoration-blue-600 hover:decoration-blue-800 transition-colors duration-200"
      >
        {children}
      </a>
    );
  }

  // Internal link
  return (
    <Link 
      href={href}
      className="text-blue-600 hover:text-blue-800 underline decoration-solid decoration-blue-600 hover:decoration-blue-800 transition-colors duration-200"
    >
      {children}
    </Link>
  );
};

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <motion.div 
          className="my-8 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Use unoptimized to preserve original aspect ratio for inline images */}
          <img
            src={urlFor(value) || value.asset.url}
            alt={value.alt || 'लेख छवि'}
            className="w-full h-auto object-contain max-h-[600px]"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-video.svg';
            }}
          />
        </motion.div>
      ) : null,
  },
  marks: {
    link: CustomLink,
    strong: ({ children }) => (
      <strong className="font-bold text-amber-200">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-slate-200">{children}</em>
    ),
    code: ({ children }) => (
      <code className="px-2 py-1 bg-slate-800 text-amber-300 rounded border border-slate-600 font-mono text-sm">
        {children}
      </code>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6 mt-8 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-5 mt-7 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-slate-200 mb-4 mt-6 leading-tight">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-slate-300 leading-relaxed mb-6 text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <motion.blockquote 
        className="border-l-4 border-amber-500 bg-slate-800/50 pl-6 py-4 my-8 italic text-slate-200 rounded-r-lg"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-6 text-slate-300 space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 text-slate-300 space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-slate-300 leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-slate-300 leading-relaxed">{children}</li>
    ),
  },
};

export default function ArticleContent({ article, ads, relatedArticles = [] }: ArticleContentProps) {
  const { topAds, sideAds, footerAds } = ads;
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Calculate reading time from article content
  const getArticleText = (body: unknown) => {
    if (!body || !Array.isArray(body)) return '';
    return body.map((block: unknown) => {
      if (typeof block === 'object' && block !== null && '_type' in block && block._type === 'block' && 'children' in block && Array.isArray(block.children)) {
        return block.children.map((child: unknown) => {
          if (typeof child === 'object' && child !== null && 'text' in child) {
            return (child as { text: string }).text || '';
          }
          return '';
        }).join('');
      }
      return '';
    }).join(' ');
  };

  const articleText = getArticleText(article.body);
  const readingTime = calculateReadingTime(articleText);

  // Share functionality using native Web Share API
  // Now relies on Open Graph meta tags for image previews
  const handleShare = async () => {
    if (isSharing) return;
    
    setIsSharing(true);
    setShareSuccess(false);

    const shareData = {
      title: article.title,
      text: article.excerpt || `पढ़ें: ${article.title}`,
      url: window.location.href,
    };

    try {
      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        setShareSuccess(true);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
        alert('शेयर नहीं हो सका। कृपया URL को मैन्युअल रूप से कॉपी करें।');
      }
    } finally {
      setIsSharing(false);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setShareSuccess(false);
      }, 3000);
    }
  };

  // Helper for date formatting - consistent between server and client
  const formatArticleDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    // Always return the same format to avoid hydration mismatch
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Reading Progress Indicator */}
      <ReadingProgress />
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-500/3 to-orange-500/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Back Button */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 text-slate-400 hover:text-amber-400 transition-colors duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">वापस जाएं</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Article Content */}
            <article className="xl:col-span-3">
              
              {/* Top Ads */}
              {topAds.length > 0 && (
                <motion.section 
                  className="mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    {topAds.map((ad: Ad) => (
                      <div key={ad._id} className="relative group">
                        {ad.link ? (
                          <a
                            href={ad.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 block border border-slate-700/50"
                          >
                            <Image
                              src={ad.adImage?.asset?.url || '/placeholder-ad.jpg'}
                              alt={ad.title || 'Advertisement'}
                              width={600}
                              height={300}
                              className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                              विज्ञापन
                            </div>
                            <div className="absolute bottom-3 right-3 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                              {ad.title}
                            </div>
                          </a>
                        ) : (
                          <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-700/50">
                            <Image
                              src={ad.adImage?.asset?.url || '/placeholder-ad.jpg'}
                              alt={ad.title || 'Advertisement'}
                              width={600}
                              height={300}
                              className="w-full h-32 sm:h-40 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Article Header */}
              <motion.header 
                className="mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Hero Image - Show mainImage first, then coverImage as fallback */}
                {article.mainImage?.asset?.url && (
                  <div className="mb-8">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-800">
                      {/* Image displays at natural aspect ratio, fills width */}
                      <img
                        src={urlForCover(article.mainImage) || article.mainImage.asset.url}
                        alt={article.mainImage.alt || article.title}
                        className="w-full h-auto block"
                        loading="eager"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-video.svg';
                        }}
                      />
                    </div>
                    {/* Caption if provided */}
                    {article.mainImage.caption && (
                      <p className="text-center text-slate-400 text-sm mt-3 italic px-4">
                        {article.mainImage.caption}
                      </p>
                    )}
                  </div>
                )}

                {/* Article Title */}
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-100 mb-8 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-2xl">
                    {article.title}
                  </span>
                </motion.h1>

                {/* Article Metadata */}
                <motion.div 
                  className="flex flex-wrap items-center gap-6 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="flex items-center space-x-2 bg-slate-800/60 backdrop-blur-xl px-4 py-3 rounded-2xl border border-slate-700/50">
                    <User className="w-5 h-5 text-amber-400" />
                    <span className="text-slate-200 font-medium">
                      {article.author ? article.author : 'चेतन जोशी'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-slate-800/60 backdrop-blur-xl px-4 py-3 rounded-2xl border border-slate-700/50">
                    <Calendar className="w-5 h-5 text-amber-400" />
                    <span className="text-slate-200 font-medium">
                      {formatArticleDate(article.publishedAt)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 bg-slate-800/60 backdrop-blur-xl px-4 py-3 rounded-2xl border border-slate-700/50">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <span className="text-slate-200 font-medium">{formatReadingTime(readingTime)}</span>
                  </div>

                  <button 
                    onClick={handleShare}
                    disabled={isSharing}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 shadow-lg ${
                      shareSuccess
                        ? 'bg-green-500 text-white shadow-green-500/30'
                        : isSharing
                        ? 'bg-slate-600 text-slate-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-amber-500/30'
                    }`}
                  >
                    {shareSuccess ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span className="font-medium">कॉपी हो गया!</span>
                      </>
                    ) : isSharing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
                        <span className="font-medium">शेयर हो रहा...</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-5 h-5" />
                        <span className="font-medium">शेयर करें</span>
                      </>
                    )}
                  </button>
                </motion.div>

                {/* Article Excerpt */}
                {article.excerpt && (
                  <motion.div 
                    className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <div className="flex items-start space-x-3">
                      <BookOpen className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                      <p className="text-xl text-slate-300 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Decorative Line */}
                <motion.div
                  className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </motion.header>

              {/* Article Body */}
              <motion.section 
                className="prose prose-lg max-w-none mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <PortableText value={article.body} components={portableTextComponents} />
                
                {/* Cover Image at the bottom - Show if no mainImage was shown at top */}
                {article.coverImage?.asset?.url && !article.mainImage?.asset?.url && (
                  <motion.div 
                    className="mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-800">
                      {/* Image displays at natural aspect ratio, fills width */}
                      <img
                        src={urlForCover(article.coverImage) || article.coverImage.asset.url}
                        alt={article.coverImage.alt || article.title}
                        className="w-full h-auto block"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-video.svg';
                        }}
                      />
                    </div>
                    {/* Caption if provided */}
                    {article.coverImage.caption && (
                      <p className="text-center text-slate-400 text-sm mt-3 italic px-4">
                        {article.coverImage.caption}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Share Button at Bottom - Exact same as top button */}
                <motion.div 
                  className="mt-10 flex justify-center not-prose"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <button 
                    onClick={handleShare}
                    disabled={isSharing}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg ${
                      shareSuccess
                        ? 'bg-green-500 text-white shadow-green-500/30'
                        : isSharing
                        ? 'bg-slate-600 text-slate-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-amber-500/30'
                    }`}
                  >
                    {shareSuccess ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span className="font-medium">कॉपी हो गया!</span>
                      </>
                    ) : isSharing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
                        <span className="font-medium">शेयर हो रहा...</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-5 h-5" />
                        <span className="font-medium">शेयर करें</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </motion.section>

              {/* Related Posts Section */}
              {relatedArticles && relatedArticles.length > 0 && (
                <RelatedPosts articles={relatedArticles} />
              )}

              {/* Footer Ads */}
              {footerAds.length > 0 && (
                <motion.section 
                  className="mt-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  <div className="grid gap-6">
                    {footerAds.map((ad: Ad) => (
                      <div key={ad._id} className="relative group">
                        {ad.link ? (
                          <a
                            href={ad.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 block border border-slate-700/50"
                          >
                            <Image
                              src={ad.adImage?.asset?.url || '/placeholder-ad.jpg'}
                              alt={ad.title || 'Advertisement'}
                              width={1200}
                              height={200}
                              className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              विज्ञापन
                            </div>
                            <div className="absolute bottom-4 right-4 bg-black/80 text-white px-6 py-3 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                              {ad.title}
                            </div>
                          </a>
                        ) : (
                          <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-700/50">
                            <Image
                              src={ad.adImage?.asset?.url || '/placeholder-ad.jpg'}
                              alt={ad.title || 'Advertisement'}
                              width={1200}
                              height={200}
                              className="w-full h-32 sm:h-40 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
            </article>

            {/* Side Ads Column */}
            <motion.div 
              className="xl:col-span-1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {sideAds.length > 0 && (
                <div className="space-y-6 sticky top-8">
                  {sideAds.map((ad: Ad) => (
                    <div key={ad._id} className="relative group">
                      {ad.link ? (
                        <a
                          href={ad.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 block border border-slate-700/50"
                        >
                          <Image
                            src={ad.adImage?.asset?.url || '/placeholder-ad.jpg'}
                            alt={ad.title || 'Advertisement'}
                            width={400}
                            height={600}
                            className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg">
                            विज्ञापन
                          </div>
                          <div className="absolute bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                            {ad.title}
                          </div>
                        </a>
                      ) : (
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-700/50">
                          <Image
                            src={ad.adImage?.asset?.url || '/placeholder-ad.jpg'}
                            alt={ad.title || 'Advertisement'}
                            width={400}
                            height={600}
                            className="w-full h-[500px] object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
