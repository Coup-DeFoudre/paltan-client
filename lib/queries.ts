export const allArticlesQuery = `
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    coverImage {
      asset -> {
        url
      }
    },
    isTrending,
    category,
    body
  }
`;
export const trendingArticlesQuery = `
  *[_type == "article" && isTrending == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    coverImage {
      asset->{
        url
      }
    }
  }
`


export const activeNoticesQuery = `
  *[_type == "notice" && isActive == true] | order(order asc) {
    _id,
    message
  }
`

export const activeAdsQuery = `
  *[_type == "advertisement" && defined(placement) && startDate <= now()] {
    _id,
    title,
    adImage{ asset->{
        url
      }},
    link,
    placement,
    showOnHome,
    showOnArticlePage,
    duration,
    startDate
  }
`

export const allVideosQuery = `
  *[_type == "video"] | order(publishedAt desc) {
    _id,
    title,
    description,
    thumbnailUrl,
    embedUrl,
    category,
    publishedAt,
    views
  }
`

export const newspaperEditionsQuery = `
  *[_type == "edition"] | order(publishedAt desc) {
    _id,
    title,
    publishedAt,
    description,
    "pdfUrl": pdfFile.asset->url,
    "fileName": pdfFile.asset->originalFilename,
    "fileSize": pdfFile.asset->size
  }
`
export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    coverImage {
      asset->{url}
    },
    publishedAt,
    body,
    category,
    isTrending
  }
`


