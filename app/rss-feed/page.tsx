import { type RSSItem } from '@/lib/rssFeed';
import { fetchWithFallback } from '@/lib/rssFallback';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export const metadata = {
  title: 'RSS Feed | The Paltan',
  description: 'Latest news and updates from RSS feeds',
};

export default async function RSSFeedPage() {
  try {
    // Try to fetch with fallback mechanism
    const feed = await fetchWithFallback();

    if (!feed || feed.items.length === 0) {
      return notFound();
    }

    // Group the items by date
    const groupedItems: Record<string, RSSItem[]> = {};
    
    feed.items.forEach((item: RSSItem) => {
      // Parse the date more carefully to handle unusual formats
      let date;
      try {
        // First try to parse the pubDate field
        if (item.pubDate) {
          const pubDate = item.pubDate.replace(/[^\x00-\x7F]/g, '').trim();
          date = new Date(pubDate);
        }
        
        // Fallback for invalid dates - try to extract from description
        if (!date || isNaN(date.getTime())) {
          const timestampMatch = item.description.match(/([\d]{2})\/([\d]{2})\/([\d]{4})/);
          if (timestampMatch) {
            const [, day, month, year] = timestampMatch;
            date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          } else {
            date = new Date(); // Default to current date if parsing fails
          }
        }
      } catch {
        date = new Date(); // Default to current date if parsing fails
      }
      
      const dateString = date.toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' });
      
      if (!groupedItems[dateString]) {
        groupedItems[dateString] = [];
      }
      
      groupedItems[dateString].push(item);
    });

    return (
      <main className="min-h-screen bg-gray-50 py-16 lg:pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">RSS Feed</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Latest updates from {feed.title}
            </p>
            <div className="flex items-center justify-center mt-6 text-sm text-gray-500">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                Auto-refreshes every hour
              </span>
            </div>
          </div>

          {Object.keys(groupedItems).length > 0 ? (
            <div className="space-y-12">
              {Object.entries(groupedItems).map(([date, items]) => (
                <div key={date} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 bg-blue-600">
                    <h2 className="text-xl font-bold text-white">{date}</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {items.map((item) => {
                      // Try to extract an image URL from the content or enclosure
                      let imageUrl = '';
                      
                      if (item['media:content'] && item['media:content']['@_url']) {
                        imageUrl = item['media:content']['@_url'];
                      } else if (item.enclosure && item.enclosure['@_url'] && 
                                (item.enclosure['@_type']?.startsWith('image/') || 
                                 item.enclosure['@_url'].match(/\.(jpg|jpeg|png|gif|webp)$/i))) {
                        imageUrl = item.enclosure['@_url'];
                      } else {
                        // Try to extract image from description HTML
                        const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/i);
                        if (imgMatch && imgMatch[1]) {
                          imageUrl = imgMatch[1];
                        }
                      }

                      // Clean description (remove HTML tags and trailing dates)
                      const cleanDescription = item.description
                        .replace(/<[^>]*>/g, ' ')
                        .replace(/\s+/g, ' ')
                        .replace(/\s*-\s*([\d]{2})\/(?:[\d]{2})\/(?:[\d]{4})\s*$/, '') // Remove trailing date patterns like "- 22/07/2025"
                        .replace(/\s*([\d]{2})\/(?:[\d]{2})\/(?:[\d]{4})\s*$/, '') // Remove standalone trailing dates
                        .trim();

                      return (
                        <article key={item.guid || item.link} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {imageUrl && (
                              <div className="md:col-span-1">
                                <div className="relative h-48 w-full rounded-lg overflow-hidden bg-gray-100">
                                  <Image
                                    src={imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                      // Fallback if image fails to load
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                            <div className={`${imageUrl ? 'md:col-span-3' : 'md:col-span-4'} flex flex-col`}>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                <a 
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-blue-700 hover:underline"
                                >
                                  {item.title}
                                </a>
                              </h3>
                              <p className="text-gray-600 mb-4 line-clamp-3">
                                {cleanDescription}
                              </p>
                              <div className="mt-auto flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                  {/* Format date as string with error handling */}
                                  {(() => {
                                    try {
                                      // First try to parse the pubDate field
                                      const pubDate = item.pubDate ? item.pubDate.replace(/[^\x00-\x7F]/g, '').trim() : '';
                                      if (pubDate) {
                                        const date = new Date(pubDate);
                                        if (!isNaN(date.getTime())) {
                                          return date.toLocaleDateString('hi-IN', {
                                            year: 'numeric',
                                            month: 'long', 
                                            day: 'numeric'
                                          });
                                        }
                                      }
                                      
                                      // Fallback: try to extract date from description
                                      const dateMatch = item.description.match(/([\d]{2})\/(?:[\d]{2})\/(?:[\d]{4})/);
                                      if (dateMatch && dateMatch[0]) {
                                        // Parse the date in DD/MM/YYYY format
                                        const [day, month, year] = dateMatch[0].split('/');
                                        const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                                        return parsedDate.toLocaleDateString('hi-IN', {
                                          year: 'numeric',
                                          month: 'long', 
                                          day: 'numeric'
                                        });
                                      }
                                      
                                      // Final fallback to current date
                                      return new Date().toLocaleDateString('hi-IN');
                                    } catch {
                                      return new Date().toLocaleDateString('hi-IN');
                                    }
                                  })()}
                                </span>
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                >
                                  Read More →
                                </a>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 mx-auto text-gray-400 mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Feed Items Found</h3>
                <p className="text-gray-600">
                  We couldn&apos;t find any items in the RSS feed. Please check back later.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error in RSS Feed page:', error);
    return notFound();
  }
}
