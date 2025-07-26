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

export default async function ArticlePage({ params }: Props) {
  // Ensure params are awaited before using
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Fetch data
  const [article, ads] = await Promise.all([
    client.fetch(articleBySlugQuery, { slug }),
    client.fetch(activeAdsQuery)
  ]);

  // Handle 404
  if (!article) return notFound();

  // Filter ads for different article placements
  const filteredAds = {
    topAds: ads.filter((ad: Ad) => ad.placements.includes('article-top')),
    sideAds: ads.filter((ad: Ad) => ad.placements.includes('article-side')),
    footerAds: ads.filter((ad: Ad) => ad.placements.includes('article-footer'))
  };

  // Render the client component with data
  return <ArticleContent article={article} ads={filteredAds} />;
}
