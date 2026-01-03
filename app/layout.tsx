/**
 * @fileoverview Root layout component for Paltan Client
 * @description Main layout with metadata, fonts, and global providers
 * @version 1.0
 * @author Paltan Development Team
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Devanagari, Inter, Poppins } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConditionalLayout from "../components/ConditionalLayout";

/**
 * Font configuration for optimal rendering
 * Uses system fonts with Devanagari support for Hindi content
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Enhanced Hindi font configuration matching professional news sites
const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

// Inter font for better English text rendering
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

// Production URL for OG metadata
const getBaseUrl = () => {
  // Use explicit site URL if set
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  // Use Vercel production URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://thepaltann.vercel.app';
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "द पल्टन - Digital News Platform",
    template: "%s | द पल्टन"
  },
  description: "Modern Hindi news platform with multimedia content",
  keywords: ["hindi news", "news", "भारत", "समाचार", "पल्टन", "digital news"],
  authors: [{ name: "द पल्टन" }],
  creator: "द पल्टन",
  publisher: "द पल्टन",
  openGraph: {
    type: 'website',
    locale: 'hi_IN',
    url: '/',
    siteName: 'द पल्टन',
    title: 'द पल्टन - Digital News Platform',
    description: 'Modern Hindi news platform with multimedia content',
    images: [
      {
        url: '/logo.png', // metadataBase will make this absolute
        width: 1200,
        height: 630,
        alt: 'द पल्टन Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PaltanNews',
    creator: '@PaltanNews',
    title: 'द पल्टन - Digital News Platform',
    description: 'Modern Hindi news platform with multimedia content',
    images: ['/logo.png'], // metadataBase will make this absolute
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/logo.png' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: '/logo.png',
    apple: [
      { url: '/logo.png' },
      { url: '/logo.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/logo.png',
      },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="application-name" content="द पल्टन" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansDevanagari.variable} ${inter.variable} ${poppins.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <CookieConsent />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
