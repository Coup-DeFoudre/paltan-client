import { client } from '@/lib/sanity';
import { articleBySlugQuery, activeAdsQuery } from '@/lib/queries';
import { notFound } from 'next/navigation';
import ArticleContent from '@/components/ArticleContent';

interface Ad {
  _id: string;
  title: string;
  adImage?: { asset: { url: string } };
  link: string;
  placements: string[];
  startDate: string;
  duration: string;
}

interface Props {
  params: Promise<{ slug: string }>
}

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function ArticlePage({ params }: Props) {
  try {
    // Ensure params are awaited before using
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    // Fetch data with no-cache to get fresh content
    const [article, ads] = await Promise.all([
      client.fetch(articleBySlugQuery, { slug }, { 
        cache: 'no-store' 
      }),
      client.fetch(activeAdsQuery, {}, { 
        cache: 'no-store' 
      })
    ]);

    // Handle 404 if article not found or is deleted
    if (!article || !article._id) {
      return notFound();
    }

    // Filter ads for different article placements
    const filteredAds = {
      topAds: (ads || []).filter((ad: Ad) => ad.placements?.includes('article-top')),
      sideAds: (ads || []).filter((ad: Ad) => ad.placements?.includes('article-side')),
      footerAds: (ads || []).filter((ad: Ad) => ad.placements?.includes('article-footer'))
    };

    // Render the client component with data
    return <ArticleContent article={article} ads={filteredAds} />;
  } catch (error) {
    console.error('Error fetching article:', error);
    return notFound();
  }
}
