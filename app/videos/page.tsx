import { client } from '@/lib/sanity';
import { allVideosQuery } from '@/lib/queries';
import VideoPageClient from './VideoPageClient';

// Revalidate every 30 seconds to ensure fresh video data
export const revalidate = 30;

export default async function VideosPage() {
  try {
    console.log('Server-side: Fetching videos...');
    
    // Use no-store cache to ensure fresh data every time, same as homepage
    const videos = await client.fetch(allVideosQuery, {}, { cache: 'no-store' });
    
    console.log('Server-side: Videos fetched successfully, count:', videos.length);
    
    return <VideoPageClient initialVideos={videos} />;
  } catch (error) {
    console.error('Server-side: Error fetching videos:', error);
    return <VideoPageClient initialVideos={[]} error={error instanceof Error ? error.message : 'Failed to fetch videos'} />;
  }
}
