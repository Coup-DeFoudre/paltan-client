// app/page.tsx

import { client } from '@/lib/sanity';
import {
  trendingArticlesQuery,
  activeNoticesQuery,
  activeAdsQuery,
  editorPickArticlesQuery,
  featuresQuery,
  articlesByCategory,
  allVideosQuery,
} from '@/lib/queries';
import EngagingHomepage from '../components/EngagingHomepage';

// Article interface from Homepage component
interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage?: { asset: { url: string } };
  publishedAt: string;
  excerpt?: string;
  category?: string;
  author?: string;
}

// Revalidate every 60 seconds in production to ensure fresh data
export const revalidate = 60;

export default async function Page() {
  try {
    // Define categories for fetching
    const categories = ['national', 'dharma', 'society', 'ground-reports', 'youth', 'voices', 'art-literature', 'local'];

    const [notices, trendingArticles, ads, editorPickArticles] = await Promise.all([
      client.fetch(activeNoticesQuery, {}, { cache: 'no-store' }),
      client.fetch(trendingArticlesQuery, {}, { cache: 'no-store' }),
      client.fetch(activeAdsQuery, {}, { cache: 'no-store' }),
      client.fetch(editorPickArticlesQuery, {}, { cache: 'no-store' }),
      client.fetch(featuresQuery, {}, { cache: 'no-store' }),
    ]);

    // Fetch articles by category
    const categoryArticlesPromises = categories.map(category =>
      client.fetch(articlesByCategory, { category }, { cache: 'no-store' })
    );
    const categoryArticlesResults = await Promise.all(categoryArticlesPromises);
    
    // Create categoryArticles object
    const categoryArticles: { [key: string]: Article[] } = {};
    categories.forEach((category, index) => {
      categoryArticles[category] = categoryArticlesResults[index] || [];
    });

    // Fetch videos for video section (show latest active videos)
    const categoryVideos = {
      videos: await client.fetch(allVideosQuery, {}, { cache: 'no-store' })
    };

    return (
      <EngagingHomepage 
        notices={notices || []}
        trendingArticles={trendingArticles || []}
        editorPickArticles={editorPickArticles || []}
        categoryArticles={categoryArticles}
        categoryVideos={categoryVideos}
        ads={ads || []}
      />
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    
    // Return EngagingHomepage with empty arrays as fallback
    return (
      <EngagingHomepage 
        notices={[]}
        trendingArticles={[]}
        editorPickArticles={[]}
        categoryArticles={{}}
        categoryVideos={{ videos: [] }}
        ads={[]}
      />
    );
  }
}