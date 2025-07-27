import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/Appbar";
import ScrollProgress from "@/components/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "द पल्टन - Digital News Platform",
  description: "Modern Hindi news platform with multimedia content",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansDevanagari.variable} antialiased font-hindi bg-gradient-to-br from-white to-blue-50 text-gray-900 transition-all duration-500`}
      >
        <ScrollProgress />
        <div className="mb-15">
          <AppBar />
        </div>

        {children}
      </body>
    </html>
  );
}
