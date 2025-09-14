import { client } from '@/lib/sanity';
import { allVideosQuery } from '@/lib/queries';
import VideoPageClient from './VideoPageClient';

// Revalidate every 30 seconds to ensure fresh video data
export const revalidate = 30;

export default async function VideosPage() {
  try {
    // Use no-store cache to ensure fresh data every time, same as homepage
    const videos = await client.fetch(allVideosQuery, {}, { cache: 'no-store' });
    
    return <VideoPageClient initialVideos={videos} />;
  } catch (error) {
    return <VideoPageClient initialVideos={[]} error={error instanceof Error ? error.message : 'Failed to fetch videos'} />;
  }
}
