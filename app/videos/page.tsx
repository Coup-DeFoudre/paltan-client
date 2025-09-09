import { client } from '@/lib/sanity';
import { allVideosQuery } from '@/lib/queries';
import VideoPageClient from './VideoPageClient';

// Force dynamic rendering and disable caching for fresh video data
export const revalidate = 0;
export const dynamic = 'force-dynamic';

// Server-side data fetching (SSR)
export default async function VideosPage() {
  try {
    console.log('Server-side: Fetching videos...');
    // Add a timestamp parameter to bust any potential query caching
    const timestamp = Date.now();
    console.log('Query timestamp:', timestamp);
    
    // Fetch with no-store to ensure fresh data
    const videos = await client.fetch(allVideosQuery, { timestamp }, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    console.log('Server-side: Videos fetched successfully, count:', videos.length);
    console.log('Server-side: Video IDs:', videos.map((v: any) => v._id));
    
    return <VideoPageClient initialVideos={videos} />;
  } catch (error) {
    console.error('Server-side: Error fetching videos:', error);
    return <VideoPageClient initialVideos={[]} error={error instanceof Error ? error.message : 'Failed to fetch videos'} />;
  }
}
