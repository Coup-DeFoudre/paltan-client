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
};

export default nextConfig;
