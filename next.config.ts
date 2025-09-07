import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all https image sources
        port: '',
        pathname: '**',
      }
    ],
  },
  // Font optimization for production
  optimizeFonts: true,
  // Reduce bundle size
  swcMinify: true,
  // Better error handling in production
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@sanity/client'],
  },
};

export default nextConfig;
