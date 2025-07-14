// app/article/[slug]/page.tsx

import { client } from '@/lib/sanity'
import { articleBySlugQuery } from '@/lib/queries'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import type { PortableTextBlock } from 'sanity'

interface Props {
  params: { slug: string }
}

type PageProps = Props

export default async function ArticlePage({ params }: Props) {
  const article = await client.fetch(articleBySlugQuery, { slug: params.slug })

  if (!article) return notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* 🖼️ Cover Image */}
      {article.coverImage?.asset?.url && (
        <img
          src={article.coverImage.asset.url}
          alt={article.title}
          className="w-full h-64 object-cover rounded-xl shadow mb-6"
        />
      )}

      {/* 📝 Title */}
      <h1 className="text-3xl font-bold mb-4 leading-tight">{article.title}</h1>

      {/* 📅 Meta Info */}
      <div className="text-sm text-gray-500 mb-8 flex flex-wrap gap-3">
        <span>🗓️ {new Date(article.publishedAt).toLocaleDateString('hi-IN')}</span>
        {article.category && (
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded">{article.category}</span>
        )}
        {article.isTrending && <span className="text-orange-600 font-semibold">🔥 ट्रेंडिंग</span>}
      </div>

      {/* 📖 Article Body (Rich Text) */}
      <div className="prose prose-sm sm:prose-base max-w-none prose-img:rounded-lg prose-img:shadow-md">
        <PortableText value={article.body as PortableTextBlock[]} />
      </div>
    </article>
  )
}
