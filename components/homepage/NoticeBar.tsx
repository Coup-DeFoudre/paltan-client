// components/homepage/NoticeBar.tsx
'use client';

import { Notice } from './types';
import { memo } from 'react';

interface NoticeBarProps {
  notices: Notice[];
}

const NoticeBar: React.FC<NoticeBarProps> = ({ notices }) => {
  // Dummy data for demonstration when no data is available
  const dummyNotices = notices.length > 0 ? notices : [
    { _id: 'dummy1', message: 'नोटिस: दिल्ली पुलिस की फ्लीट में 300 से अधिक इलेक्ट्रिक वाहन, RTI सुझाती है' },
    { _id: 'dummy2', message: 'महत्वपूर्ण: आज रात से मध्य प्रदेश में बारिश की संभावना, मौसम विभाग की चेतावनी' }
  ];

  if (dummyNotices.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white py-3 shadow-xl border-b border-slate-600/50 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse"></div>
      
      <div className="overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex animate-marquee whitespace-nowrap">
          {dummyNotices.map((notice: Notice) => (
            <span key={notice._id} className="mx-6 flex items-center text-sm font-medium">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 rounded-full w-2 h-2 mr-3 animate-pulse shadow-lg"></span>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 rounded px-2 py-1 text-xs mr-3 font-semibold shadow-md">
                मुख्य खबरें
              </span>
              <span className="drop-shadow-sm">{notice.message}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(NoticeBar);
