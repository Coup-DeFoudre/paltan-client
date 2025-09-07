'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Eye, ArrowRight, Clock } from 'lucide-react';
import PremiumCard from './PremiumCard';

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

interface VideosSectionHomeProps {
  videos: Video[];
}

export default function VideosSectionHome({ videos }: VideosSectionHomeProps) {
  // const formatViews = (count: number = 0): string => {
  //   if (count >= 1000000) {
  //     return `${(count / 1000000).toFixed(1)}M`;
  //   } else if (count >= 1000) {
  //     return `${(count / 1000).toFixed(1)}K`;
  //   } else {
  //     return `${count || 0}`;
  //   }
  // };

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'कुछ समय पहले';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      
      if (isNaN(date.getTime())) return 'कुछ समय पहले';
      
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      if (diffInHours < 1) return 'अभी';
      if (diffInHours < 24) return `${diffInHours} घंटे पहले`;
      const days = Math.floor(diffInHours / 24);
      if (days <= 2) return `${days} दिन पहले`;
      return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    } catch {
      return 'कुछ समय पहले';
    }
  };

  const getDuration = (): string => {
    // You could implement actual duration calculation here
    // For now, using random durations for demo
    const durations = ['2:15', '5:42', '8:30', '3:45', '6:20', '4:10'];
    return durations[Math.floor(Math.random() * durations.length)];
  };

  // Enhanced error handling and fallback state
  if (!videos || videos.length === 0) {
    return (
      <section className="mb-16">
        <div className="mb-8">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
                Videos
              </h2>
            </div>
            <h3 className="text-lg text-slate-400 font-medium ml-7">वीडियो सेक्शन</h3>
          </div>
        </div>
        
        <div className="h-64 bg-slate-800/30 rounded-2xl border border-slate-700/30 flex items-center justify-center">
          <div className="text-center text-slate-400">
            <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">वीडियो कंटेंट जल्द ही आ रहे हैं</p>
            <p className="text-sm mt-2">बेहतरीन वीडियो स्टोरीज़ के लिए प्रतीक्षा करें</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="mb-8">
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
              Videos
            </h2>
          </div>
          <h3 className="text-lg text-slate-400 font-medium ml-7">वीडियो सेक्शन</h3>
        </div>
        <p className="text-slate-500 max-w-3xl leading-relaxed ml-7">
          Dekhiye, samjhiye, janiye – short aur deep dono formats mein. वीडियो कवरेज, डोक्युमेंट्री और आसान explainers – आपके लिए सीधे स्क्रीन पर।
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.slice(0, 6).map((video, index) => (
          <PremiumCard key={video._id} glowColor="amber" delay={index * 0.1}>
            <Link href={`/videos?focus=${video._id}`} className="block h-full">
              <article className="h-full flex flex-col group">
                <div className="relative mb-4">
                  <Image
                    src={video.thumbnail?.asset?.url || video.thumbnailUrl || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=200&fit=crop'}
                    alt={video.title}
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                      <Play className="w-6 h-6 text-slate-900 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                    {getDuration()}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h4 className="text-base sm:text-lg font-bold text-slate-100 mb-2 line-clamp-2 leading-tight group-hover:text-amber-400 transition-colors">
                    {video.title || 'वीडियो शीर्षक'}
                  </h4>
                  {video.description && (
                    <p className="text-xs sm:text-sm text-slate-400 mb-3 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs text-slate-500 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{video.views || 0} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(video.publishedAt)}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </article>
            </Link>
          </PremiumCard>
        ))}
      </div>

      {/* View More Link */}
      {videos.length > 6 && (
        <div className="text-center mt-8">
          <Link 
            href="/videos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-amber-400 rounded-full transition-all duration-300 border border-slate-600"
          >
            <span>सभी वीडियो देखें</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}
