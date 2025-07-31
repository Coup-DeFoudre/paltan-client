// components/HomePage.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, TrendingUp } from 'lucide-react';
import Carousel from './Carousel';
import { useState } from 'react';

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage?: { asset: { url: string } };
  publishedAt: string;
  excerpt?: string;
  category?: string;
}

interface Ad {
  _id: string;
  title: string;
  adImage?: { asset: { url: string } };
  link: string;
  placements: string[];
  startDate: string;
  duration: string;
}

interface Notice {
  _id: string;
  message: string;
}

interface HomePageProps {
  notices: Notice[];
  trendingArticles: Article[];
  allArticles: Article[];
  ads: Ad[];
}

const categories = [
  { key: 'all', label: 'सभी' },
  { key: 'politics', label: 'राजनीति' },
  { key: 'sports', label: 'खेल' },
  { key: 'business', label: 'व्यापार' },
  { key: 'entertainment', label: 'मनोरंजन' },
  { key: 'technology', label: 'तकनीक' },
  { key: 'other', label: 'अन्य' },
];

const HomePage: React.FC<HomePageProps> = ({ 
  notices, 
  trendingArticles, 
  allArticles, 
  ads 
}) => {
  // Filter ads for different placements
  const homeBannerAds = ads.filter(ad => ad.placements.includes('home-top'));
  const middleAds = ads.filter(ad => ad.placements.includes('home-mid'));
  const footerAds = ads.filter(ad => ad.placements.includes('home-footer'));

  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter articles by category
  const filteredArticles = selectedCategory === 'all'
    ? allArticles
    : allArticles.filter(article => (article.category || 'other') === selectedCategory);

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
    <div className="min-h-screen bg-gray-50 font-sans pb-20 lg:pb-0">
      {/* Notice Bar */}
      {notices.length > 0 && (
        <div className="bg-slate-800 text-white py-3 shadow-md border-b border-slate-700">
          <div className="overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex animate-marquee whitespace-nowrap">
              {notices.map((notice: Notice) => (
                <span key={notice._id} className="mx-6 flex items-center text-sm font-medium">
                  <span className="bg-blue-500 rounded-full w-2 h-2 mr-3 animate-pulse"></span>
                  <span className="bg-slate-700 rounded px-2 py-1 text-xs mr-3 font-semibold">
                    Notice
                  </span>
                  {notice.message}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Banner Ads */}
        {homeBannerAds.length > 0 && (
          <section className="mb-10">
            <div className="grid gap-4">
              {homeBannerAds.map((ad: Ad) => (
                <a
                  key={ad._id}
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Image
                    src={ad.adImage?.asset?.url || 'https://via.placeholder.com/1200x400?text=Advertisement'}
                    alt={ad.title}
                    width={1200}
                    height={400}
                    className="w-full h-32 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold shadow-md">
                    विज्ञापन
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                    {ad.title}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Trending Articles Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                ट्रेंडिंग न्यूज़
              </h2>
            </div>
            <div className="w-16 h-1 bg-red-600 rounded-full"></div>
          </div>

          <div className="mb-4">
            <Carousel
              autoplay={true}
              pauseOnHover={true}
              loop={true}
              autoplayDelay={5000}
            >
              {trendingArticles.slice(0, 5).map((article) => (
                <Link key={article._id} href={`/articles/${article.slug.current}`} className="block w-full h-full">
                  <article className="relative w-full h-full overflow-hidden">
                    <Image
                      src={article.coverImage?.asset?.url || 'https://via.placeholder.com/800x450?text=No+Image'}
                      alt={article.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-lg">
                      <span className="animate-pulse">🔥</span> ट्रेंडिंग
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-white/80 text-sm sm:text-base mb-4 line-clamp-2 max-w-3xl">
                          {article.excerpt}
                        </p>
                      )}
                      {/* Removed date/time for trending articles */}
                    </div>
                  </article>
                </Link>
              ))}
            </Carousel>
          </div>
        </section>

        {/* Middle Ads */}
        {middleAds.length > 0 && (
          <section className="mb-12">
            <div className="grid sm:grid-cols-2 gap-4">
              {middleAds.map((ad: Ad) => (
                <a
                  key={ad._id}
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <Image
                    src={ad.adImage?.asset?.url || 'https://via.placeholder.com/600x300?text=Advertisement'}
                    alt={ad.title}
                    width={600}
                    height={300}
                    className="w-full h-28 sm:h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold shadow-md">
                    विज्ञापन
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                    {ad.title}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Category Tabs */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-colors duration-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${selectedCategory === cat.key ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-50'}`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* All Articles Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'सभी समाचार' : `${categories.find(c => c.key === selectedCategory)?.label} समाचार`}
            </h2>
            <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500 py-10">कोई समाचार नहीं मिला।</div>
            ) : (
              filteredArticles.map((article: Article) => (
                <Link key={article._id} href={`/articles/${article.slug.current}`} className="block h-full">
                  <article className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                    <div className="relative">
                      <Image
                        src={article.coverImage?.asset?.url || 'https://via.placeholder.com/800x450?text=No+Image'}
                        alt={article.title}
                        width={800}
                        height={450}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-100 w-fit px-3 py-1 rounded-full mt-auto">
                        <Clock className="w-3 h-3" />
                        <span>{formatArticleDate(article.publishedAt)}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Footer Ads */}
        {footerAds.length > 0 && (
          <section className="mb-10">
            <div className="grid gap-4">
              {footerAds.map((ad: Ad) => (
                <a
                  key={ad._id}
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <Image
                    src={ad.adImage?.asset?.url || 'https://via.placeholder.com/1200x200?text=Advertisement'}
                    alt={ad.title}
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
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HomePage;