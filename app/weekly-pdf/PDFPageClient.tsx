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

  // Filter ads for PDF pages
  const pdfAds = ads.filter(ad => ad.placements.includes('pdf-page'));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">साप्ताहिक PDF</h1>
          <p className="text-xl text-red-100">समसामयिक समाचार पत्र डिजिटल संस्करण</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">श्रेणी चुनें</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEditions.map((edition, index) => (
                <motion.div
                  key={edition._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* PDF Preview/Icon */}
                  <div className="h-48 bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-red-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium">{edition.fileName}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {edition.category || 'सामान्य'}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(edition.publishedAt)}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      {edition.title}
                    </h3>

                    {edition.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {edition.description}
                      </p>
                    )}

                    {/* File Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>आकार: {formatFileSize(edition.fileSize)}</span>
                      <span className="flex items-center">
                        {edition.isActive ? (
                          <span className="text-green-600">उपलब्ध</span>
                        ) : (
                          <span className="text-yellow-600 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            अनुपलब्ध
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Download Button */}
                    <a
                      href={edition.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <FileDown className="w-4 h-4 mr-2" />
                      PDF डाउनलोड करें
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredEditions.length === 0 && (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">इस श्रेणी में कोई PDF नहीं मिली</h3>
                <p className="text-gray-500">कृपया दूसरी श्रेणी चुनें या बाद में प्रयास करें।</p>
              </div>
            )}
          </div>

          {/* Sidebar with Ads */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">कुल PDF</h3>
              <div className="text-3xl font-bold text-red-600">{editions.length}</div>
              <p className="text-sm text-gray-500">उपलब्ध दस्तावेज़</p>
            </div>

            {/* Ads */}
            {pdfAds.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">विज्ञापन</h3>
                {pdfAds.map((ad) => (
                  <motion.div
                    key={ad._id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    {ad.link ? (
                      <a href={ad.link} target="_blank" rel="noopener noreferrer">
                        <Image
                          src={ad.adImage.asset.url}
                          alt={ad.title}
                          width={300}
                          height={200}
                          className="w-full h-auto object-cover"
                        />
                      </a>
                    ) : (
                      <Image
                        src={ad.adImage.asset.url}
                        alt={ad.title}
                        width={300}
                        height={200}
                        className="w-full h-auto object-cover"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFPageClient;
