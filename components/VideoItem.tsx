'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
// Simple view count formatting
const formatViews = (count: number = 0): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M देखा गया`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K देखा गया`;
  } else {
    return `${count} देखा गया`;
  }
};

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

interface VideoItemProps {
  video: Video;
  isSelected: boolean;
  onClick: () => void;
}

export default function VideoItem({ video, isSelected, onClick }: VideoItemProps) {

  return (
    <motion.div
      className={`cursor-pointer rounded-xl overflow-hidden group transition-all duration-300 ${
        isSelected 
          ? 'ring-2 ring-amber-400 bg-amber-500/10 scale-105' 
          : 'hover:bg-slate-700/30 hover:scale-102'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="flex items-center space-x-3 p-3">
        <div className="relative flex-shrink-0">
          <Image
            src={video.thumbnail?.asset?.url || video.thumbnailUrl || '/placeholder-video.svg'}
            alt={video.title}
            width={144}
            height={80}
            className={`h-16 w-28 object-cover rounded-lg ${
              !video.thumbnail?.asset?.url && !video.thumbnailUrl 
                ? 'p-2 bg-slate-700' 
                : ''
            }`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-video.svg';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg"></div>
          {isSelected && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-amber-500 rounded-full p-1 shadow-lg">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.25 3L17.25 10L5.25 17V3Z"></path>
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium line-clamp-2 hindi-text ${
            isSelected ? 'text-amber-400' : 'text-slate-200'
          }`}>
            {video.title}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {formatViews(video.views)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
