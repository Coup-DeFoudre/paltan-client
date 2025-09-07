// Shared types for homepage components

export interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage?: { asset: { url: string } };
  publishedAt: string;
  excerpt?: string;
  category?: string;
  author?: string;
}

export interface Ad {
  _id: string;
  title: string;
  adImage?: { asset: { url: string } };
  link: string;
  placements: string[];
  startDate: string;
  duration: string;
}

export interface Notice {
  _id: string;
  message: string;
}

export interface EditorPick {
  _id: string;
  title: string;
  description: string;
  coverImage: { asset: { url: string } };
  linkedArticle?: { slug: { current: string } };
  externalLink?: string;
  order: number;
}

export interface Feature {
  _id: string;
  title: string;
  description: string;
  icon: string;
  featureImage: { asset: { url: string } };
  featureType: string;
  link?: string;
  order: number;
}

export interface Video {
  _id: string;
  title: string;
  description?: string;
  thumbnail?: { asset: { url: string } };
  thumbnailUrl?: string;
  embedUrl: string;
  category: string;
  publishedAt: string;
  views: number;
}
