'use client';

import { useState, useEffect } from 'react';
import { cookieUtils } from '@/lib/cookies';

export function useWelcome() {
  const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean | null>(null);

  useEffect(() => {
    // Check cookie on client side
    setHasSeenWelcome(cookieUtils.hasSeenWelcome());
  }, []);

  const markWelcomeSeen = () => {
    cookieUtils.setWelcomeSeen();
    setHasSeenWelcome(true);
  };

  const resetWelcome = () => {
    cookieUtils.clearWelcome();
    setHasSeenWelcome(false);
  };

  return {
    hasSeenWelcome,
    markWelcomeSeen,
    resetWelcome,
    isLoading: hasSeenWelcome === null
  };
}
