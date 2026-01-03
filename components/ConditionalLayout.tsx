'use client';

import AppBar from './Appbar';
import ScrollProgress from './ScrollProgress';
import FloatingSocial from './FloatingSocial';
import Footer from './Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  // Always show layout elements - welcome gate has been removed
  return (
    <>
      <AppBar />
      <ScrollProgress />
      <FloatingSocial />
      
      {/* Main content */}
      <main className="pt-16 pb-32 lg:pt-16 lg:pb-0 min-h-screen">
        {children}
      </main>
      
      <Footer />
    </>
  );
}