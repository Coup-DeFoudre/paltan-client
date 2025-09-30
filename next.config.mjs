/**
 * @fileoverview Next.js configuration for Paltan Client
 * @description Optimized configuration for performance and SEO
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization with specific trusted domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '**',
      }
    ],
    // Optimize images for better performance
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Enable compression
  compress: true,
  
  // Remove deprecated options - swcMinify and optimizeFonts are defaults in Next.js 15
  
  // Optimize build
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // TypeScript and ESLint settings
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig;
