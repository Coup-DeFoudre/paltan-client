import { client } from '@/lib/sanity';
import { allVideosQuery } from '@/lib/queries';
import VideoPageClient from './VideoPageClient';

// Force dynamic rendering - this page uses useSearchParams
export const dynamic = 'force-dynamic';

export default async function VideosPage() {
  try {
    // Use no-store cache to ensure fresh data every time, same as homepage
    const videos = await client.fetch(allVideosQuery, {}, { cache: 'no-store' });
    
    return <VideoPageClient initialVideos={videos} />;
  } catch (error) {
    return <VideoPageClient initialVideos={[]} error={error instanceof Error ? error.message : 'Failed to fetch videos'} />;
  }
}
