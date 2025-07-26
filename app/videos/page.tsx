'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { client } from '@/lib/sanity';
import { allVideosQuery } from '@/lib/queries';

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

const VideoPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch videos from Sanity
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log('Starting to fetch videos...');
        setLoading(true);
        
        // Using the same approach as we did with editions
        const fetchedVideos = await client.fetch(allVideosQuery);
        console.log('Raw response from Sanity:', fetchedVideos);
        
        if (!Array.isArray(fetchedVideos)) {
          console.error('Unexpected response format:', fetchedVideos);
          throw new Error('Unexpected response format from Sanity');
        }
        
        if (fetchedVideos.length === 0) {
          console.log('No videos found in response');
        } else {
          console.log('First video details:', {
            title: fetchedVideos[0].title,
            embedUrl: fetchedVideos[0].embedUrl,
          });
        }
        
        setVideos(fetchedVideos);
        if (fetchedVideos.length > 0) {
          setSelectedVideo(fetchedVideos[0]);
        }
        setError(null);
        console.log('Successfully set videos, count:', fetchedVideos.length);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('वीडियो लोड करने में समस्या हुई है। कृपया बाद में पुनः प्रयास करें।');
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Categories for filtering
  const categories = ["all", ...Array.from(new Set(videos.map(video => video.category)))];
  
  // Filter videos based on selected category
  const filteredVideos = selectedCategory === "all" 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 pb-20 lg:pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">वीडियो लोड हो रहे हैं...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 pb-20 lg:pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-600 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">समस्या आई है</h2>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No videos state
  if (videos.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 pb-20 lg:pb-10">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            पलटन वीडियो गैलरी
          </motion.h1>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">🎥</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">कोई वीडियो उपलब्ध नहीं</h2>
              <p className="text-gray-600">अभी तक कोई वीडियो अपलोड नहीं किया गया है।</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 pb-20 lg:pb-10">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          पलटन वीडियो गैलरी
        </motion.h1>
        
        {/* Category Filter */}
        <motion.div 
          className="mb-8 overflow-x-auto pb-2 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category === 'all' ? 'सभी' : 
                 category === 'news' ? 'समाचार' :
                 category === 'report' ? 'रिपोर्ट' :
                 category === 'business' ? 'व्यापार' :
                 category === 'culture' ? 'संस्कृति' :
                 category === 'politics' ? 'राजनीति' : category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {selectedVideo && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={getEmbedUrl(selectedVideo.embedUrl)}
                    title={selectedVideo.title}
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {selectedVideo.title}
                  </h2>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{formatDate(selectedVideo.publishedAt)}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {formatViews(selectedVideo.views)}
                    </span>
                  </div>
                  <p className="text-gray-700">{selectedVideo.description}</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Video Playlist Section */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-4 h-full overflow-auto max-h-[800px]">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">
                {filteredVideos.length} वीडियोज़
              </h3>
              
              <div className="space-y-4">
                {filteredVideos.map((video) => (
                  <motion.div
                    key={video._id}
                    className={`cursor-pointer rounded-lg overflow-hidden group ${
                      selectedVideo?._id === video._id ? 'ring-2 ring-red-600' : ''
                    }`}
                    onClick={() => setSelectedVideo(video)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative flex-shrink-0">
                        <Image
                          src={video.thumbnail?.asset?.url || video.thumbnailUrl || '/placeholder-video.svg'}
                          alt={video.title}
                          width={144}
                          height={80}
                          className={`h-20 w-36 object-cover rounded ${!video.thumbnail?.asset?.url && !video.thumbnailUrl ? 'p-2 bg-gray-50' : ''}`}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-video.svg';
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity"></div>
                        {selectedVideo?._id === video._id && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-red-600 rounded-full p-1">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5.25 3L17.25 10L5.25 17V3Z"></path>
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium line-clamp-2 ${
                          selectedVideo?._id === video._id ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {video.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatViews(video.views)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
