import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Devanagari, Inter, Poppins } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/Appbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingSocial from "@/components/FloatingSocial";
import WelcomeGate from "@/components/WelcomeGate";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Enhanced Hindi font configuration matching Naidunia's approach
const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

// Inter font for better English text rendering (similar to what Naidunia uses)
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

export const metadata: Metadata = {
  title: "द पल्टन - Digital News Platform",
  description: "Modern Hindi news platform with multimedia content",
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansDevanagari.variable} ${inter.variable} ${poppins.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {/* Fixed Elements - Outside of scroll container */}
        <AppBar />
        <ScrollProgress />
        <FloatingSocial />
        
        {/* Scrollable Content */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <WelcomeGate>
            <main className="pt-16 pb-32 lg:pt-16 lg:pb-0 min-h-screen">
              {children}
            </main>
            <Footer />
          </WelcomeGate>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
