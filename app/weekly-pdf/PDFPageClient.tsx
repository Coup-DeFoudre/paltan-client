'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, Calendar, FileText, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

// TypeScript interface for PDF edition
interface Edition {
  _id: string;
  title: string;
  publishedAt: string;
  description: string | null;
  category: string;
  isActive: boolean;
  pdfUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  slug: string;
}

interface Ad {
  _id: string;
  title: string;
  adImage: {
    asset: {
      url: string;
    };
  };
  link?: string;
  placements: string[];
}

interface PDFPageClientProps {
  initialEditions: Edition[];
  initialAds: Ad[];
  error?: string;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('hi-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatFileSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

const PDFPageClient: React.FC<PDFPageClientProps> = ({ initialEditions, initialAds, error }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editions] = useState<Edition[]>(initialEditions);
  const [ads] = useState<Ad[]>(initialAds);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">PDF लोड नहीं हो सके</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (editions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">कोई PDF उपलब्ध नहीं</h2>
          <p className="text-gray-500">वर्तमान में कोई PDF प्रकाशित नहीं है।</p>
        </div>
      </div>
    );
  }

  // Get unique categories
  const categories = ["all", ...new Set(editions.map(edition => edition.category).filter(Boolean))];

  // Filter editions based on category
  const filteredEditions = selectedCategory === "all" 
    ? editions 
    : editions.filter(edition => edition.category === selectedCategory);

  // Filter ads for weekly-banner placement
  const pdfAds = ads.filter((ad: Ad) =>
    ad.placements.includes('weekly-banner') || ad.placements.includes('weekly-pdf')
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 pb-20 lg:pb-10">
      <div className="max-w-5xl mx-auto">
        {/* Advertisement Banner */}
        {pdfAds.length > 0 && (
          <section className="mb-8">
            <div className="grid gap-4">
              {pdfAds.map((ad) => (
                <div key={ad._id} className="relative">
                  {ad.link ? (
                    <a
                      href={ad.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 block"
                    >
                      <Image
                        src={ad.adImage.asset.url}
                        alt={ad.title || 'Advertisement'}
                        width={1200}
                        height={400}
                        className="w-full h-32 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold shadow-md">
                        विज्ञापन
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                        {ad.title}
                      </div>
                    </a>
                  ) : (
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={ad.adImage.asset.url}
                        alt={ad.title || 'Advertisement'}
                        width={1200}
                        height={400}
                        className="w-full h-32 sm:h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold shadow-md">
                        विज्ञापन
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                        {ad.title}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          साप्ताहिक पलटन डिजिटल संस्करण
        </motion.h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {error}
            </p>
          </div>
        )}

        <div className="grid gap-6">
          {editions.map((edition) => (
            <motion.div
              key={edition._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {edition.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(edition.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {formatFileSize(edition.fileSize)}
                      </span>
                    </div>
                    {edition.description && (
                      <p className="text-gray-600 mb-4">
                        {edition.description}
                      </p>
                    )}
                  </div>
                  <a
                    href={edition.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium transition-all hover:bg-red-700 active:transform active:scale-95"
                  >
                    <FileDown className="w-5 h-5" />
                    डाउनलोड PDF
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PDFPageClient;
