'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AppBar from './Appbar';
import ScrollProgress from './ScrollProgress';
import FloatingSocial from './FloatingSocial';
import Footer from './Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean | null>(null);

  useEffect(() => {
    const welcomeSeen = Cookies.get('paltan_welcome_seen') === 'true';
    setHasSeenWelcome(welcomeSeen);
  }, []);

  // Show loading state while checking cookies
  if (hasSeenWelcome === null) {
    return children;
  }

  return (
    <>
      {/* Only show these fixed elements if welcome has been seen */}
      {hasSeenWelcome && (
        <>
          <AppBar />
          <ScrollProgress />
          <FloatingSocial />
        </>
      )}
      
      {/* Main content */}
      <main className={hasSeenWelcome ? "pt-16 pb-32 lg:pt-16 lg:pb-0 min-h-screen" : ""}>
        {children}
      </main>
      
      {/* Only show footer if welcome has been seen */}
      {hasSeenWelcome && <Footer />}
    </>
  );
}