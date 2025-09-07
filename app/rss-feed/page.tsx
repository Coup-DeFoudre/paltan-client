import { type RSSItem } from '@/lib/rssFeed';
import { fetchWithFallback } from '@/lib/rssFallback';
// import { notFound } from 'next/navigation';
import RSSFeedClient from './RSSFeedClient';

export const metadata = {
  title: 'RSS Feed | द पल्टन न्यूज़',
  description: 'Latest news and updates from RSS feeds',
};

export default async function RSSFeedPage() {
  try {
    const feed = await fetchWithFallback();

    if (!feed || feed.items.length === 0) {
      return (
        <RSSFeedClient 
          feed={null}
          groupedItems={{}}
        />
      );
    }

    // Group the items by date
    const groupedItems: Record<string, RSSItem[]> = {};
    
    feed.items.forEach((item: RSSItem) => {
      let date;
      try {
        if (item.pubDate) {
          const pubDate = item.pubDate.replace(/[^\x00-\x7F]/g, '').trim();
          date = new Date(pubDate);
        }
        
        if (!date || isNaN(date.getTime())) {
          const timestampMatch = item.description.match(/([\d]{2})\/([\d]{2})\/([\d]{4})/);
          if (timestampMatch) {
            const [, day, month, year] = timestampMatch;
            date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          } else {
            date = new Date();
          }
        }
      } catch {
        date = new Date();
      }
      
      const dateString = date.toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' });
      
      if (!groupedItems[dateString]) {
        groupedItems[dateString] = [];
      }
      
      groupedItems[dateString].push(item);
    });

    return (
      <RSSFeedClient 
        feed={feed}
        groupedItems={groupedItems}
      />
    );
  } catch (error) {
    console.error('Error in RSS Feed page:', error);
    return (
      <RSSFeedClient 
        feed={null}
        groupedItems={{}}
      />
    );
  }
}