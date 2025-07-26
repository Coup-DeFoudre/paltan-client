"use client"
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 lg:pt-24 pb-32 flex items-center justify-center">
      <div className="max-w-md w-full px-4 py-8 bg-white shadow-md rounded-xl text-center">
        <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="h-8 w-8 text-yellow-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">RSS Feed Not Found</h1>
        <p className="text-gray-600 mb-6">
          We couldn&apos;t load the RSS feed data. The feed might be unavailable or there was an error processing the content.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link 
            href="/rss-feed" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </Link>
          <Link href="/" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
