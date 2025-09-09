'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
// import Image from 'next/image';
import VideoItem from '@/components/VideoItem';

// TypeScript interfaces for type safety
interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnail?: {
    asset: {
      url: string;
    };
  };
  thumbnailUrl?: string;
  embedUrl: string;
  category: string;
  publishedAt: string;
  views?: number;
}

interface VideoPageClientProps {
  initialVideos: Video[];
  error?: string;
}

// Format date function
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('hi-IN', options);
};

// Format view count
const formatViews = (count: number = 0): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M देखा गया`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K देखा गया`;
  } else {
    return `${count} देखा गया`;
  }
};

// Format YouTube URL for embedding
const getEmbedUrl = (url: string): string => {
  try {
    const videoId = url.includes('youtube.com') 
      ? new URL(url).searchParams.get('v')
      : url.includes('youtu.be')
        ? new URL(url).pathname.slice(1)
        : url;
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  } catch {
    return url;
  }
};

const VideoPageClient: React.FC<VideoPageClientProps> = ({ initialVideos, error }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [videos] = useState<Video[]>(initialVideos);
  const searchParams = useSearchParams();

  // Resolve focused video from URL (?focus=<id>) or default to first
  const focusedVideo = useMemo(() => {
    const id = searchParams?.get('focus');
    if (!id) return null;
    return videos.find(v => v._id === id) || null;
  }, [searchParams, videos]);

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(
    focusedVideo ?? (initialVideos.length > 0 ? initialVideos[0] : null)
  );

  useEffect(() => {
    if (focusedVideo) {
      setSelectedVideo(focusedVideo);
      // Smooth scroll the player into view on focus link
      const el = document.getElementById('main-video-player');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [focusedVideo]);

  if (error) {
    return (
      <div className="min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/30">
            <h2 className="text-2xl font-bold text-red-400 mb-4 hindi-text">वीडियो लोड नहीं हो सके</h2>
            <p className="text-slate-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/30">
            <h2 className="text-2xl font-bold text-slate-200 mb-4 hindi-text">कोई वीडियो उपलब्ध नहीं</h2>
            <p className="text-slate-400">वर्तमान में कोई वीडियो प्रकाशित नहीं है।</p>
          </div>
        </div>
      </div>
    );
  }

  // Get unique categories from videos
  const categories = ["all", ...new Set(videos.map(video => video.category).filter(Boolean))];

  // Filter videos based on selected category
  const filteredVideos = selectedCategory === "all" 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className="min-h-screen relative overflow-hidden">
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
          
          {/* Hero Section with Cinematic Title */}
          <motion.div
            className="text-center mb-16 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
            </div>
            
            {/* Main Title */}
            <div className="relative">
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-2xl">
                  पल्टन
                </span>
                <br />
                <span className="text-slate-200 text-4xl md:text-5xl lg:text-6xl font-light tracking-wider">
                  वीडियो गैलरी
                </span>
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p
                className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                जहाँ हर वीडियो एक कहानी है, हर कहानी एक सच है
              </motion.p>
              
              {/* Decorative Line */}
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-6 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              />
            </div>
          </motion.div>

          {/* Sophisticated Category Filter */}
          <motion.div
            className="mb-16 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-2xl blur-xl"></div>
              
              <div className="relative bg-slate-900/60 backdrop-blur-xl p-3 rounded-2xl border border-slate-700/50 shadow-2xl">
                <div className="flex flex-wrap justify-center gap-3">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-500 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 scale-105'
                          : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/60 hover:text-slate-100 hover:scale-105 border border-slate-600/30'
                      }`}
                    >
                      {/* Active indicator */}
                      {selectedCategory === category && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl opacity-20"
                          layoutId="activeCategory"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      <span className="relative z-10">
                        {category === 'all' ? 'सभी' :
                         category === 'news' ? 'समाचार' :
                         category === 'report' ? 'रिपोर्ट' :
                         category === 'business' ? 'व्यापार' :
                         category === 'culture' ? 'संस्कृति' :
                         category === 'politics' ? 'राजनीति' : category}
                      </span>
                      
                      {/* Hover glow */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/10 group-hover:to-orange-500/10 transition-all duration-300"></div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cinematic Video Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            {/* Main Video Theater */}
            <motion.div
              className="xl:col-span-3"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {selectedVideo && (
                <div id="main-video-player" className="relative group">
                  
                  {/* Theater Frame */}
                  <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
                    
                    {/* Ambient Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    {/* Video Container */}
                    <div className="relative">
                      <div className="relative w-full aspect-video rounded-t-3xl overflow-hidden">
                        <iframe
                          src={getEmbedUrl(selectedVideo.embedUrl)}
                          title={selectedVideo.title}
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                        
                        {/* Video Overlay Effects */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none"></div>
                      </div>
                      
                      {/* Video Information Panel */}
                      <div className="relative p-8 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm">
                        
                        {/* Title with Cinematic Styling */}
                        <motion.h2
                          className="text-2xl md:text-3xl font-bold text-slate-100 mb-4 leading-tight"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1.5 }}
                        >
                          {selectedVideo.title}
                        </motion.h2>
                        
                        {/* Metadata Bar */}
                        <motion.div
                          className="flex flex-wrap items-center gap-4 mb-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.7 }}
                        >
                          <div className="flex items-center space-x-2 text-slate-400">
                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                            <span className="text-sm">{formatDate(selectedVideo.publishedAt)}</span>
                          </div>
                          
                          <div className="h-4 w-px bg-slate-600"></div>
                          
                          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 px-4 py-2 rounded-full border border-amber-500/30 backdrop-blur-sm">
                            <span className="text-sm font-medium">{formatViews(selectedVideo.views)}</span>
                          </div>
                          
                          <div className="h-4 w-px bg-slate-600"></div>
                          
                          <div className="bg-slate-800/60 text-slate-300 px-3 py-1 rounded-full text-xs uppercase tracking-wider border border-slate-700/50">
                            {selectedVideo.category}
                          </div>
                        </motion.div>
                        
                        {/* Description */}
                        <motion.p
                          className="text-slate-300 leading-relaxed text-base"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.9 }}
                        >
                          {selectedVideo.description}
                        </motion.p>
                        
                        {/* Decorative Bottom Line */}
                        <motion.div
                          className="mt-6 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: 2.1 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Elegant Playlist Sidebar */}
            <motion.div
              className="xl:col-span-1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <div className="sticky top-8">
                <div className="relative">
                  
                  {/* Playlist Header */}
                  <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
                    
                    {/* Header Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-amber-500/5 rounded-2xl"></div>
                    
                    <div className="relative p-6 border-b border-slate-700/30">
                      <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.6 }}
                      >
                        <h3 className="text-xl font-bold text-slate-100 flex items-center">
                          <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 animate-pulse"></span>
                          प्लेलिस्ट
                        </h3>
                        <div className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm font-medium border border-amber-500/30">
                          {filteredVideos.length}
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Playlist Items */}
                    <div className="relative max-h-[600px] overflow-y-auto scrollbar-hide">
                      <div className="p-4 space-y-2">
                        {filteredVideos.map((video, index) => (
                          <motion.div
                            key={video._id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                          >
                            <VideoItem
                              video={video}
                              isSelected={selectedVideo?._id === video._id}
                              onClick={() => setSelectedVideo(video)}
                            />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Fade Out Effect */}
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-800/90 to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPageClient;
