import { client } from '@/lib/sanity';
import { newspaperEditionsQuery, activeAdsQuery } from '@/lib/queries';
import PDFPageClient from './PDFPageClient';

// Server-side data fetching (SSR)
export default async function WeeklyPDFPage() {
  try {
    console.log('Server-side: Fetching PDF editions and ads...');
    const [editions, ads] = await Promise.all([
      client.fetch(newspaperEditionsQuery),
      client.fetch(activeAdsQuery),
    ]);
    console.log('Server-side: Data fetched successfully. Editions:', editions.length, 'Ads:', ads.length);
    
    return <PDFPageClient initialEditions={editions} initialAds={ads} />;
  } catch (error) {
    console.error('Server-side: Error fetching PDF data:', error);
    return <PDFPageClient initialEditions={[]} initialAds={[]} error={error instanceof Error ? error.message : 'Failed to fetch PDF data'} />;
  }
}
