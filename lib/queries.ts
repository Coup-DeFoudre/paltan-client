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
`;

export const activeNoticesQuery = `
  *[_type == "notice" && isActive == true] | order(order asc) {
    _id,
    message
  }
`;

export const activeAdsQuery = `
  *[
    _type == "advertisement" && 
    defined(placements) && 
    count(placements) > 0 &&
    startDate <= now() &&
    (
      (duration == "1d" && dateTime(startDate) >= dateTime(now()) - 60*60*24) ||
      (duration == "15d" && dateTime(startDate) >= dateTime(now()) - 60*60*24*15) ||
      (duration == "30d" && dateTime(startDate) >= dateTime(now()) - 60*60*24*30)
    )
  ] {
    _id,
    title,
    adImage {
      asset-> {
        url
      }
    },
    link,
    placements,
    startDate,
    duration
  }
`;

export const allVideosQuery = `
  *[_type == "video"] | order(publishedAt desc) {
    _id,
    title,
    description,
    thumbnail {
      asset-> {
        url
      }
    },
    thumbnailUrl,
    embedUrl,
    category,
    publishedAt,
    views,
    isActive
  }
`;

export const newspaperEditionsQuery = `
  *[_type == "edition" && defined(pdfFile)] | order(publishedAt desc) {
    _id,
    title,
    publishedAt,
    description,
    isActive,
    "pdfUrl": pdfFile.asset->url,
    "fileName": pdfFile.asset->originalFilename,
    "fileSize": pdfFile.asset->size,
    "mimeType": pdfFile.asset->mimeType,
    category,
    "slug": slug.current
  }
`;

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
`;
