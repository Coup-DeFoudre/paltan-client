import { client } from '@/lib/sanity';
import { articleBySlugQuery, activeAdsQuery, relatedArticlesQuery } from '@/lib/queries';
import { notFound } from 'next/navigation';
import ArticleContent from '@/components/ArticleContent';
import { Metadata } from 'next';
import imageUrlBuilder from '@sanity/image-url';
import { headers } from 'next/headers';

const builder = imageUrlBuilder(client);

interface ImageSource {
  asset?: {
    url?: string;
    _ref?: string;
  };
  _type?: string;
}

function urlFor(source: ImageSource) {
  if (!source?.asset) return '';
  try {
    // Use builder to get optimized image URL for OG sharing
    const url = builder.image(source).width(1200).height(630).fit('crop').auto('format').url();
    return url || source.asset.url || '';
  } catch {
    return source.asset.url || '';
  }
}

// Get production base URL for fallback images
const getProductionBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  return 'https://thepaltann.vercel.app';
};

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

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    const article = await client.fetch(articleBySlugQuery, { slug }, { 
      cache: 'no-store' 
    });

    if (!article || !article._id) {
      return {
        title: 'Article Not Found',
      };
    }

    // Get dynamic URL from request headers
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = headersList.get('x-forwarded-proto') || 
                    headersList.get('x-forwarded-scheme') || 
                    (host.includes('localhost') ? 'http' : 'https');
    const baseUrl = `${protocol}://${host}`;
    const currentUrl = `${baseUrl}/articles/${slug}`;

    // Get the primary image URL (coverImage first as it's more commonly used, then mainImage)
    const getImageUrl = () => {
      // Try coverImage first (most common)
      if (article.coverImage?.asset) {
        const optimizedUrl = urlFor(article.coverImage);
        if (optimizedUrl) return optimizedUrl;
        if (article.coverImage.asset.url) return article.coverImage.asset.url;
      }
      // Try mainImage as fallback
      if (article.mainImage?.asset) {
        const optimizedUrl = urlFor(article.mainImage);
        if (optimizedUrl) return optimizedUrl;
        if (article.mainImage.asset.url) return article.mainImage.asset.url;
      }
      // Final fallback to site logo with absolute URL
      return `${getProductionBaseUrl()}/logo.png`;
    };

    const imageUrl = getImageUrl();
    const description = article.excerpt || `पढ़ें: ${article.title}`;
    const title = `${article.title} | द पल्टन`;

    return {
      title: article.title,
      description: description,
      alternates: {
        canonical: currentUrl,
      },
      openGraph: {
        title: title,
        description: description,
        type: 'article',
        url: currentUrl,
        publishedTime: article.publishedAt,
        authors: article.author ? [article.author] : ['चेतन जोशी'],
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          }
        ],
        siteName: 'द पल्टन',
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        images: [imageUrl],
        creator: article.author || '@PaltanNews',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Article | द पल्टन',
      description: 'द पल्टन पर पढ़ें ताजा समाचार',
    };
  }
}

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

    // Fetch related articles based on category, subcategory, and tags
    const relatedArticles = await client.fetch(
      relatedArticlesQuery,
      {
        currentArticleId: article._id,
        category: article.category || '',
        subcategory: article.subcategory || '',
        tags: article.tags || []
      },
      { cache: 'no-store' }
    );

    // Filter ads for different article placements
    const filteredAds = {
      topAds: (ads || []).filter((ad: Ad) => ad.placements?.includes('article-top')),
      sideAds: (ads || []).filter((ad: Ad) => ad.placements?.includes('article-side')),
      footerAds: (ads || []).filter((ad: Ad) => ad.placements?.includes('article-footer'))
    };

    // Render the client component with data
    return <ArticleContent article={article} ads={filteredAds} relatedArticles={relatedArticles} />;
  } catch (error) {
    console.error('Error fetching article:', error);
    return notFound();
  }
}
