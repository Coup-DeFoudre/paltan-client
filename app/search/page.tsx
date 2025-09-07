import { Suspense } from 'react';
import SearchResults from './SearchResults';

export const metadata = {
  title: 'Search - द पल्टन',
  description: 'Search articles and content on द पल्टन',
};

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={
          <div className="text-center py-12">
            <div className="animate-pulse text-slate-400">Searching...</div>
          </div>
        }>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}
