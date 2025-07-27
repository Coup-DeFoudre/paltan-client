'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(
    initialVideos.length > 0 ? initialVideos[0] : null
  );
  const [videos] = useState<Video[]>(initialVideos);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">वीडियो लोड नहीं हो सके</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">कोई वीडियो उपलब्ध नहीं</h2>
          <p className="text-gray-500">वर्तमान में कोई वीडियो प्रकाशित नहीं है।</p>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">वीडियो गैलरी</h1>
          <p className="text-center mt-2 text-red-100">नवीनतम समाचार और वीडियो</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            {selectedVideo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative aspect-video">
                  <iframe
                    src={getEmbedUrl(selectedVideo.embedUrl)}
                    title={selectedVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedVideo.title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>{formatDate(selectedVideo.publishedAt)}</span>
                    {selectedVideo.views && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{formatViews(selectedVideo.views)}</span>
                      </>
                    )}
                  </div>
                  {selectedVideo.description && (
                    <p className="text-gray-700 leading-relaxed">
                      {selectedVideo.description}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Video List Sidebar */}
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">श्रेणी</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category === "all" ? "सभी" : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Video List */}
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-4 border-b">
                <h3 className="font-bold text-gray-800">अन्य वीडियो</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {filteredVideos.map((video) => {
                  const thumbnailUrl = video.thumbnail?.asset?.url || video.thumbnailUrl;
                  
                  return (
                    <motion.div
                      key={video._id}
                      whileHover={{ backgroundColor: "#f9fafb" }}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                        selectedVideo?._id === video._id ? 'bg-red-50' : ''
                      }`}
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          {thumbnailUrl ? (
                            <Image
                              src={thumbnailUrl}
                              alt={video.title}
                              width={80}
                              height={60}
                              className="rounded object-cover"
                            />
                          ) : (
                            <div className="w-20 h-15 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-gray-400 text-xs">No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
                            {video.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {formatDate(video.publishedAt)}
                          </p>
                          {video.views && (
                            <p className="text-xs text-gray-400">
                              {formatViews(video.views)}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPageClient;
