'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// TypeScript interfaces for type safety
interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  embedUrl: string;
  category: string;
  publishedAt: string;
  views: number;
}

// Sample video data - you can replace this with data from your backend
const sampleVideos: Video[] = [
  {
    id: "video1",
    title: "बिहार का अपना खबरी चैनल | पलटन न्यूज़",
    description: "बिहार और भारत के अन्य राज्यों से महत्वपूर्ण समाचार और अपडेट",
    thumbnailUrl: "https://via.placeholder.com/320x180?text=Paltan+News+1",
    embedUrl: "https://www.youtube.com/embed/nxnbZxb2TQw",
    category: "news",
    publishedAt: "2025-07-12T10:30:00",
    views: 1245
  },
  {
    id: "video2",
    title: "बिहार में बाढ़ की स्थिति पर विशेष रिपोर्ट",
    description: "बिहार के उत्तरी जिलों में बाढ़ की स्थिति का विस्तृत विश्लेषण",
    thumbnailUrl: "https://via.placeholder.com/320x180?text=Flood+Report",
    embedUrl: "https://www.youtube.com/embed/Smno_VJtV6Q",
    category: "report",
    publishedAt: "2025-07-10T14:15:00",
    views: 2890
  },
  {
    id: "video3",
    title: "पटना में नए स्टार्टअप्स का उदय",
    description: "पटना में हाल ही में शुरू हुए स्टार्टअप और उनके बारे में विशेष जानकारी",
    thumbnailUrl: "https://via.placeholder.com/320x180?text=Startup+Report",
    embedUrl: "https://www.youtube.com/embed/ZMsDib3wfuY",
    category: "business",
    publishedAt: "2025-07-08T09:45:00",
    views: 1589
  },
  {
    id: "video4",
    title: "बिहार की संस्कृति और परंपरा",
    description: "बिहार की समृद्ध सांस्कृतिक विरासत पर विशेष डॉक्युमेंट्री",
    thumbnailUrl: "https://via.placeholder.com/320x180?text=Bihar+Culture",
    embedUrl: "https://www.youtube.com/embed/j7Pb5DEbJGY",
    category: "culture",
    publishedAt: "2025-07-05T16:20:00",
    views: 3245
  },
  {
    id: "video5",
    title: "मधुबनी पेंटिंग: कला का एक अनूठा रूप",
    description: "बिहार की प्रसिद्ध मधुबनी पेंटिंग की कला और इतिहास",
    thumbnailUrl: "https://via.placeholder.com/320x180?text=Madhubani+Art",
    embedUrl: "https://www.youtube.com/embed/D6g_jsm_zYY",
    category: "culture",
    publishedAt: "2025-07-02T11:10:00",
    views: 2156
  },
  {
    id: "video6",
    title: "बिहार विधानसभा: विशेष रिपोर्ट",
    description: "बिहार विधानसभा के हालिया सत्र की विस्तृत रिपोर्ट",
    thumbnailUrl: "https://via.placeholder.com/320x180?text=Assembly+Report",
    embedUrl: "https://www.youtube.com/embed/jOyQSLPZjqI",
    category: "politics",
    publishedAt: "2025-06-30T13:40:00",
    views: 4578
  }
];

// Categories for filtering
const categories = ["all", ...Array.from(new Set(sampleVideos.map(video => video.category)))];

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
const formatViews = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M देखा गया`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K देखा गया`;
  } else {
    return `${count} देखा गया`;
  }
};

const VideoPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(sampleVideos[0]);
  
  // Filter videos based on selected category
  const filteredVideos = selectedCategory === "all" 
    ? sampleVideos 
    : sampleVideos.filter(video => video.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
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
                    src={selectedVideo.embedUrl}
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
                    key={video.id}
                    className={`cursor-pointer rounded-lg overflow-hidden group ${
                      selectedVideo?.id === video.id ? 'ring-2 ring-red-600' : ''
                    }`}
                    onClick={() => setSelectedVideo(video)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="h-20 w-36 object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity"></div>
                        {selectedVideo?.id === video.id && (
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
                          selectedVideo?.id === video.id ? 'text-red-600' : 'text-gray-900'
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
