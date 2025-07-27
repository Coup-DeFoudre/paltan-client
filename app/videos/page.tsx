import { client } from '@/lib/sanity';
import { allVideosQuery } from '@/lib/queries';
import VideoPageClient from './VideoPageClient';

// Server-side data fetching (SSR)
export default async function VideosPage() {
  try {
    console.log('Server-side: Fetching videos...');
    const videos = await client.fetch(allVideosQuery);
    console.log('Server-side: Videos fetched successfully, count:', videos.length);
    
    return <VideoPageClient initialVideos={videos} />;
  } catch (error) {
    console.error('Server-side: Error fetching videos:', error);
    return <VideoPageClient initialVideos={[]} error={error instanceof Error ? error.message : 'Failed to fetch videos'} />;
  }
}
