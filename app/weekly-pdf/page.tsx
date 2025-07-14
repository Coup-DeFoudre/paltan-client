'use client';

import React from 'react';
import { client } from '@/lib/sanity';
import { newspaperEditionsQuery } from '@/lib/queries';
import { motion } from 'framer-motion';
import { FileDown, Calendar, FileText, AlertTriangle } from 'lucide-react';

// TypeScript interface for PDF edition
interface Edition {
  _id: string;
  title: string;
  publishedAt: string;
  description: string | null;
  pdfFile: {
    asset: {
      url: string;
      originalFilename: string;
      size: number; // in bytes
    };
  };
}

// Sample data for development - replace with actual data from Sanity
const sampleEditions: Edition[] = [
  {
    _id: 'edition1',
    title: 'पलटन साप्ताहिक - जुलाई दूसरा सप्ताह',
    publishedAt: '2025-07-14T10:00:00.000Z',
    description: 'इस सप्ताह के अंक में बिहार की प्रमुख खबरें, विशेष रिपोर्ट और विश्लेषण',
    pdfFile: {
      asset: {
        url: 'https://example.com/sample.pdf',
        originalFilename: 'paltan-weekly-14-july-2025.pdf',
        size: 2457600 // 2.4 MB
      }
    }
  },
  {
    _id: 'edition2',
    title: 'पलटन साप्ताहिक - जुलाई पहला सप्ताह',
    publishedAt: '2025-07-07T10:00:00.000Z',
    description: 'बिहार में मानसून की स्थिति और किसानों की तैयारी पर विशेष रिपोर्ट',
    pdfFile: {
      asset: {
        url: 'https://example.com/sample2.pdf',
        originalFilename: 'paltan-weekly-07-july-2025.pdf',
        size: 3145728 // 3 MB
      }
    }
  },
  {
    _id: 'edition3',
    title: 'पलटन साप्ताहिक - जून अंतिम सप्ताह',
    publishedAt: '2025-06-30T10:00:00.000Z',
    description: 'शिक्षा व्यवस्था में सुधार और नई नीतियों पर विस्तृत रिपोर्ट',
    pdfFile: {
      asset: {
        url: 'https://example.com/sample3.pdf',
        originalFilename: 'paltan-weekly-30-june-2025.pdf',
        size: 2097152 // 2 MB
      }
    }
  }
];

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

export default function WeeklyPDFPage() {
  const [editions] = React.useState<Edition[]>(sampleEditions);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  // Function to handle PDF download
  const handleDownload = async (edition: Edition) => {
    try {
      setLoading(true);
      const response = await fetch(edition.pdfFile.asset.url);
      if (!response.ok) throw new Error('PDF डाउनलोड नहीं हो सका');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = edition.pdfFile.asset.originalFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('PDF डाउनलोड करने में समस्या हुई। कृपया बाद में पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  if (!editions.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">कोई संस्करण उपलब्ध नहीं है</h2>
        <p className="text-gray-600">वर्तमान में कोई साप्ताहिक संस्करण उपलब्ध नहीं है। कृपया बाद में पुनः देखें।</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
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
                        {formatFileSize(edition.pdfFile.asset.size)}
                      </span>
                    </div>
                    {edition.description && (
                      <p className="text-gray-600 mb-4">
                        {edition.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDownload(edition)}
                    disabled={loading}
                    className={`flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium transition-all 
                      ${loading 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-red-700 active:transform active:scale-95'
                      }`}
                  >
                    <FileDown className="w-5 h-5" />
                    डाउनलोड PDF
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
