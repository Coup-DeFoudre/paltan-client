'use server';

import { XMLParser } from 'fast-xml-parser';

export interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  guid?: string;
  enclosure?: {
    '@_url'?: string;
    '@_type'?: string;
  };
  'media:content'?: {
    '@_url'?: string;
    '@_medium'?: string;
    '@_type'?: string;
  };
}

export interface RSSFeed {
  title: string;
  link: string;
  description: string;
  lastBuildDate?: string;
  items: RSSItem[];
}

export async function fetchRSSFeed(url: string): Promise<RSSFeed> {
  try {
    // Add a cache-busting parameter to ensure fresh data
    const cacheBustUrl = url.includes('?') ? `${url}&t=${Date.now()}` : `${url}?t=${Date.now()}`;
    
    // Fetch the RSS feed XML
    const response = await fetch(cacheBustUrl, { 
      next: { revalidate: 60 }, // Revalidate every minute (60 seconds) for fresh content
      cache: 'no-store' // Force fresh fetch
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
    }
    
    const xml = await response.text();
    
    // Parse the XML
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      isArray: (name: string) => name === 'item',
    });
    
    const parsed = parser.parse(xml);
    const channel = parsed.rss?.channel;
    
    if (!channel) {
      throw new Error('Invalid RSS format');
    }
    
    return {
      title: channel.title || 'Unknown Feed',
      link: channel.link || '',
      description: channel.description || '',
      lastBuildDate: channel.lastBuildDate || '',
      items: channel.item?.map((item: Record<string, unknown>) => ({
        title: item.title || 'No Title',
        link: item.link || '',
        pubDate: item.pubDate || '',
        description: item.description || '',
        guid: item.guid && (typeof item.guid === 'string' ? item.guid : (item.guid as Record<string, unknown>)['#text']),
        enclosure: item.enclosure as RSSItem['enclosure'],
        'media:content': item['media:content'] as RSSItem['media:content']
      })) || [],
    };
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return {
      title: 'Error Loading Feed',
      link: '',
      description: 'There was an error loading the RSS feed.',
      items: [],
    };
  }
}

// Function to get a formatted date from RSS pubDate
export async function formatRSSDate(pubDate: string): Promise<string> {
  if (!pubDate) return '';
  
  try {
    const date = new Date(pubDate);
    if (isNaN(date.getTime())) return pubDate;
    
    return date.toLocaleDateString('hi-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return pubDate;
  }
}
