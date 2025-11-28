import { groq } from 'next-sanity';

export const allArticlesQuery = groq`
  *[_type == "article" && !(_id in path("drafts.**")) && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {
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
    body,
    excerpt,
    author
  }
`;

export const trendingArticlesQuery = groq`
  *[_type == "article" && !(_id in path("drafts.**")) && isTrending == true && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author,
    coverImage {
      asset->{
        url
      }
    }
  }
`;

export const editorPicksQuery = groq`
  *[_type == "editorPick" && isActive == true] | order(order asc) {
    _id,
    title,
    description,
    coverImage {
      asset -> {
        url
      }
    },
    linkedArticle -> {
      slug
    },
    externalLink,
    order
  }
`;

// New query for articles marked as editor picks
export const editorPickArticlesQuery = groq`
  *[_type == "article" && !(_id in path("drafts.**")) && isEditorPick == true && defined(slug.current) && defined(publishedAt)] | order(editorPickOrder asc, publishedAt desc) [0...4] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage {
      asset -> {
        url
      }
    },
    isEditorPick,
    editorPickOrder,
    category,
    author
  }
`;

export const featuresQuery = groq`
  *[_type == "feature" && isActive == true] | order(order asc) {
    _id,
    title,
    description,
    icon,
    featureImage {
      asset -> {
        url
      }
    },
    featureType,
    link,
    order
  }
`;

export const videosByCategory = groq`
  *[_type == "video" && isActive == true && category == $category] | order(publishedAt desc) [0...4] {
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
    views
  }
`;

export const articlesByCategory = groq`
  *[_type == "article" && !(_id in path("drafts.**")) && category == $category && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) [0...4] {
    _id,
    title,
    slug,
    publishedAt,
    coverImage {
      asset -> {
        url
      }
    },
    category,
    excerpt,
    author
  }
`;

export const activeNoticesQuery = groq`
  *[_type == "notice" && isActive == true] | order(order asc) {
    _id,
    message
  }
`;

export const activeAdsQuery = groq`
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

export const allVideosQuery = groq`
  *[_type == "video" && !(_id in path("drafts.**")) && isActive == true] | order(publishedAt desc) {
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
    isActive,
    _updatedAt
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
  *[_type == "article" && !(_id in path("drafts.**")) && slug.current == $slug && defined(publishedAt)][0]{
    _id,
    title,
    slug,
    coverImage {
      asset->{url}
    },
    publishedAt,
    body,
    category,
    subcategory,
    isTrending,
    author,
    excerpt,
    tags
  }
`;

export const categoryControlsQuery = groq`
  *[_type == "categoryControl" && isVisible == true] | order(displayOrder asc) {
    _id,
    categoryKey,
    displayName,
    displayNameHindi,
    description,
    icon,
    isVisible,
    displayOrder,
    maxArticles,
    gradientColor
  }
`;

// Event Queries
export const allEventsQuery = groq`
  *[_type == "event" && isPublished == true] | order(startDate asc) {
    _id,
    title,
    slug,
    description,
    detailedDescription,
    eventImage {
      asset -> {
        url
      }
    },
    category,
    startDate,
    endDate,
    isAllDay,
    venue {
      name,
      address,
      city,
      state,
      coordinates
    },
    organizer {
      name,
      contact,
      email,
      website
    },
    ticketInfo {
      isFree,
      price,
      bookingUrl,
      availableSeats
    },
    tags,
    priority,
    isFeatured,
    publishedAt
  }
`;

export const upcomingEventsQuery = groq`
  *[_type == "event" && isPublished == true && startDate > now()] | order(startDate asc) {
    _id,
    title,
    slug,
    description,
    eventImage {
      asset -> {
        url
      }
    },
    category,
    startDate,
    endDate,
    isAllDay,
    venue {
      name,
      city,
      state
    },
    organizer {
      name
    },
    ticketInfo {
      isFree,
      price
    },
    priority,
    isFeatured
  }
`;

export const featuredEventsQuery = groq`
  *[_type == "event" && isPublished == true && isFeatured == true] | order(startDate asc) {
    _id,
    title,
    slug,
    description,
    eventImage {
      asset -> {
        url
      }
    },
    category,
    startDate,
    endDate,
    venue {
      name,
      city,
      state
    },
    ticketInfo {
      isFree,
      price
    },
    priority
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    detailedDescription,
    eventImage {
      asset -> {
        url
      }
    },
    category,
    startDate,
    endDate,
    isAllDay,
    venue {
      name,
      address,
      city,
      state,
      coordinates
    },
    organizer {
      name,
      contact,
      email,
      website
    },
    ticketInfo {
      isFree,
      price,
      bookingUrl,
      availableSeats
    },
    tags,
    priority,
    publishedAt
  }
`;

// Testimonials Queries
export const testimonialsQuery = groq`
  *[_type == "testimonial" && !(_id in path("drafts.**")) && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    name,
    location,
    quote,
    category,
    rating,
    featured,
    publishedAt
  }
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && !(_id in path("drafts.**")) && featured == true && defined(publishedAt)] | order(publishedAt desc) [0...6] {
    _id,
    name,
    location,
    quote,
    category,
    rating,
    featured,
    publishedAt
  }
`;

// Enhanced Search Queries
export const searchQuery = groq`
  *[
    _type in ["article", "video", "event"] && 
    !(_id in path("drafts.**")) && 
    defined(slug.current) && 
    defined(publishedAt) &&
    (
      title match $searchTerm + "*" ||
      title match "*" + $searchTerm + "*" ||
      pt::text(body) match $searchTerm + "*" ||
      pt::text(body) match "*" + $searchTerm + "*" ||
      excerpt match $searchTerm + "*" ||
      excerpt match "*" + $searchTerm + "*" ||
      description match $searchTerm + "*" ||
      description match "*" + $searchTerm + "*" ||
      category match $searchTerm + "*" ||
      category match "*" + $searchTerm + "*" ||
      author match $searchTerm + "*" ||
      author match "*" + $searchTerm + "*" ||
      tags[] match $searchTerm + "*" ||
      tags[] match "*" + $searchTerm + "*"
    )
  ] | order(publishedAt desc) [$start...$end] {
    _type,
    _id,
    title,
    slug,
    excerpt,
    description,
    category,
    author,
    publishedAt,
    coverImage {
      asset -> {
        url
      }
    },
    thumbnail {
      asset -> {
        url
      }
    },
    thumbnailUrl,
    embedUrl,
    views,
    tags,
    startDate,
    endDate,
    venue {
      name,
      city,
      state
    }
  }
`;

// Debug search query - simpler version for testing
export const debugSearchQuery = groq`
  *[
    _type in ["article", "video", "event"] && 
    !(_id in path("drafts.**")) && 
    defined(slug.current) && 
    defined(publishedAt)
  ] | order(publishedAt desc) [0...10] {
    _type,
    _id,
    title,
    slug,
    category,
    publishedAt
  }
`;

export const searchSuggestionsQuery = groq`
  *[
    _type in ["article", "video", "event"] && 
    !(_id in path("drafts.**")) && 
    defined(slug.current) && 
    defined(publishedAt) &&
    (
      title match $searchTerm + "*" ||
      category match $searchTerm + "*" ||
      author match $searchTerm + "*"
    )
  ] | order(publishedAt desc) [0...5] {
    _type,
    _id,
    title,
    category,
    author
  }
`;

export const searchCountQuery = groq`
  count(*[
    _type in ["article", "video", "event"] && 
    !(_id in path("drafts.**")) && 
    defined(slug.current) && 
    defined(publishedAt) &&
    (
      title match $searchTerm + "*" ||
      pt::text(body) match $searchTerm + "*" ||
      excerpt match $searchTerm + "*" ||
      description match $searchTerm + "*" ||
      category match $searchTerm + "*" ||
      author match $searchTerm + "*" ||
      tags[] match $searchTerm + "*"
    )
  ])
`;

export const popularSearchesQuery = groq`
  *[_type == "searchAnalytics"] | order(count desc) [0...10] {
    searchTerm,
    count
  }
`;

// Related Articles Query - finds similar articles based on category, subcategory, and tags
export const relatedArticlesQuery = groq`
  *[
    _type == "article" && 
    !(_id in path("drafts.**")) && 
    _id != $currentArticleId &&
    defined(slug.current) && 
    defined(publishedAt) &&
    (
      category == $category ||
      subcategory == $subcategory ||
      count((tags[])[@ in $tags]) > 0
    )
  ] | order(
    select(
      category == $category => 3,
      subcategory == $subcategory => 2,
      count((tags[])[@ in $tags]) > 0 => 1,
      0
    ) desc,
    publishedAt desc
  ) [0...6] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    category,
    subcategory,
    author,
    coverImage {
      asset -> {
        url
      }
    },
    tags
  }
`;