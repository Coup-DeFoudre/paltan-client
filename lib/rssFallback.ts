'use server';

import { fetchRSSFeed } from '@/lib/rssFeed';

// RSS feed URLs - primary and backup
const RSS_FEED_URLS = [
  'https://mpinfo.org/RSSFeed/RSSFeed_News.xml', // Primary source
  'https://news.google.com/rss',                 // Google News backup
  'https://timesofindia.indiatimes.com/rssfeedstopstories.cms' // TOI backup
];

// This function will try to fetch from multiple URLs and return the first successful response
export async function fetchWithFallback() {
  let lastError: Error | null = null;
  let partialFeed = null;

  for (const url of RSS_FEED_URLS) {
    try {
      const feed = await fetchRSSFeed(url);
      
      // If we got items, return the feed
      if (feed.items && feed.items.length > 0) {
        console.log(`Successfully fetched feed from ${url} with ${feed.items.length} items`);
        return feed;
      }
      
      // Store partial feed if we have a title but no items
      if (!partialFeed && feed.title && feed.title !== 'Error Loading Feed') {
        partialFeed = feed;
      }
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
      lastError = error as Error;
      // Continue to the next URL
    }
  }

  // If we have a partial feed with title but no items, return that
  // rather than failing completely
  if (partialFeed) {
    console.log('Returning partial feed with title but no items');
    return partialFeed;
  }

  // If we get here, all URLs failed
  throw lastError || new Error('All RSS feed sources failed');
}
