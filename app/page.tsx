// app/page.tsx

import { client } from '@/lib/sanity';
import {
  trendingArticlesQuery,
  activeNoticesQuery,
  allArticlesQuery, // You'll need to create this query
  activeAdsQuery,
} from '@/lib/queries';
import HomePage from '../components/Homepage';

export default async function Page() {
  const [notices, trendingArticles, allArticles, ads] = await Promise.all([
    client.fetch(activeNoticesQuery),
    client.fetch(trendingArticlesQuery),
    client.fetch(allArticlesQuery), // New query for all articles
    client.fetch(activeAdsQuery),
  ]);

  return (
    <HomePage 
      notices={notices}
      trendingArticles={trendingArticles}
      allArticles={allArticles}
      ads={ads}
    />
  );
}