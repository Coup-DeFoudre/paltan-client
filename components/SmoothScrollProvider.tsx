'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Optimized animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Prevent default wheel behavior on specific elements
    const preventDefaultWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.embla__container, .carousel-container')) {
        return; // Allow normal scrolling on carousels
      }
    };

    window.addEventListener('wheel', preventDefaultWheel, { passive: false });

    // Cleanup function
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('wheel', preventDefaultWheel);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
