'use client';

import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from 'sanity';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/sanity';

interface Ad {
  _id: string;
  title: string;
  adImage?: { asset: { url: string } };
  link: string;
  placements: string[];
  startDate: string;
  duration: string;
}

interface Article {
  title: string;
  body: PortableTextBlock[];
  mainImage?: { asset: { url: string } };
  coverImage?: { asset: { url: string } };
  excerpt?: string;
  publishedAt: string;
  author?: string;
}

interface ArticleContentProps {
  article: Article;
  ads: {
    topAds: Ad[];
    sideAds: Ad[];
    footerAds: Ad[];
  };
}

const builder = imageUrlBuilder(client);
function urlFor(source: object) {
  return builder.image(source).url();
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <div className="my-6 rounded-xl overflow-hidden shadow-md">
          <Image
            src={urlFor(value)}
            alt={value.alt || 'लेख छवि'}
            width={800}
            height={450}
            className="w-full h-auto object-cover"
          />
        </div>
      ) : null,
  },
};

export default function ArticleContent({ article, ads }: ArticleContentProps) {
  const { topAds, sideAds, footerAds } = ads;

  // Helper for date formatting
  const formatArticleDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    if (isNaN(date.getTime())) return '';
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return 'अभी';
    if (diffInHours < 24) return `${diffInHours} घंटे पहले`;
    const days = Math.floor(diffInHours / 24);
    if (days <= 2) return `${days} दिन पहले`;
    // Format date as DD-MM-YYYY in Hindi
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Article Content */}
        <article className="lg:col-span-3">
          {/* Top Ads */}
          {topAds.length > 0 && (
            <section className="mb-8">
              <div className="grid sm:grid-cols-2 gap-4">
                {topAds.map((ad: Ad) => (
                  <div key={ad._id} className="relative">
                    {ad.link ? (
                      <a
                        href={ad.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 block"
                      >
                        <Image
                          src={ad.adImage?.asset?.url || '/placeholder-ad.jpg'}
                          alt={ad.title || 'Advertisement'}
                          width={600}
                          height={300}
                          className="w-full h-28 sm:h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold shadow-md">
                          विज्ञापन
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                          {ad.title}
                        </div>
                      </a>
                    ) : (
                      <div className="relative overflow-hidden rounded-xl shadow-md">
                        <Image
                          src={ad.adImage?.asset?.url || '/placeholder-ad.jpg'}
                          alt={ad.title || 'Advertisement'}
                          width={600}
                          height={300}
                          className="w-full h-28 sm:h-36 object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            {/* Author and Published Date */}
            <div className="flex flex-wrap items-center gap-6 mb-4">
              <span className="text-base font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                लेखक: {article.author ? article.author : 'चेतन जोशी'}
              </span>
              <span className="text-base text-gray-600 bg-gray-100 px-3 py-1 rounded-full">प्रकाशित: {formatArticleDate(article.publishedAt)}</span>
            </div>
            <hr className="mb-8 border-gray-200" />
            {/* Add extra gap above description for separation */}
            {article.excerpt && (
              <p className="text-lg text-gray-600 mb-8 mt-2">
                {article.excerpt}
              </p>
            )}
            {article.mainImage && (
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  src={article.mainImage.asset.url}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </header>

          {/* Article Body */}
          <section className="prose prose-lg max-w-none mb-12">
            <PortableText value={article.body} components={portableTextComponents} />
            {/* Thumbnail image at the bottom */}
            {article.coverImage?.asset?.url && (
              <div className="mt-12 relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={article.coverImage.asset.url}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </section>

          {/* Footer Ads */}
          {footerAds.length > 0 && (
            <section className="mt-12">
              <div className="grid gap-4">
                {footerAds.map((ad: Ad) => (
                  <div key={ad._id} className="relative">
                    {ad.link ? (
                      <a
                        href={ad.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 block border border-gray-100"
                      >
                        <Image
                          src={ad.adImage?.asset?.url || '/placeholder-ad.jpg'}
                          alt={ad.title || 'Advertisement'}
                          width={1200}
                          height={200}
                          className="w-full h-24 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold shadow-md">
                          विज्ञापन
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                          {ad.title}
                        </div>
                      </a>
                    ) : (
                      <div className="relative overflow-hidden rounded-xl shadow-lg">
                        <Image
                          src={ad.adImage?.asset?.url || '/placeholder-ad.jpg'}
                          alt={ad.title || 'Advertisement'}
                          width={1200}
                          height={200}
                          className="w-full h-24 sm:h-32 object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Side Ads Column */}
        <div className="lg:col-span-1">
          {sideAds.length > 0 && (
            <div className="space-y-4 sticky top-4">
              {sideAds.map((ad: Ad) => (
                <div key={ad._id} className="relative">
                  {ad.link ? (
                    <a
                      href={ad.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 block"
                    >
                      <Image
                        src={ad.adImage?.asset?.url || '/placeholder-ad.jpg'}
                        alt={ad.title || 'Advertisement'}
                        width={400}
                        height={600}
                        className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold shadow-md">
                        विज्ञापन
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                        {ad.title}
                      </div>
                    </a>
                  ) : (
                    <div className="relative overflow-hidden rounded-xl shadow-md">
                      <Image
                        src={ad.adImage?.asset?.url || '/placeholder-ad.jpg'}
                        alt={ad.title || 'Advertisement'}
                        width={400}
                        height={600}
                        className="w-full h-[400px] object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
