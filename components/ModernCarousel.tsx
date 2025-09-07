'use client';

import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ModernCarouselProps {
  children: React.ReactNode[];
  options?: EmblaOptionsType;
  autoplay?: boolean;
  autoplayDelay?: number;
  showControls?: boolean;
  showDots?: boolean;
  className?: string;
}

export default function ModernCarousel({
  children,
  options = { loop: true },
  autoplay = true,
  autoplayDelay = 5000,
  // showControls = true,
  showDots = true,
  className = ''
}: ModernCarouselProps) {
  const plugins = autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })] : [];
  
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  // const scrollPrev = useCallback(() => {
  //   if (emblaApi) emblaApi.scrollPrev();
  // }, [emblaApi]);

  // const scrollNext = useCallback(() => {
  //   if (emblaApi) emblaApi.scrollNext();
  // }, [emblaApi]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={`relative`}>
      <div className={`overflow-hidden rounded-2xl ${className}`} ref={emblaRef}>
        <div className="flex h-full">
          {children.map((child, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 h-full">
              {child}
            </div>
          ))}
        </div>
        
        {/* Elegant Dot Indicators - Overlayed, not affecting slide height */}
        {showDots && scrollSnaps.length > 1 && (
          <div className="pointer-events-auto absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10">
            <div className="flex space-x-1.5 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`carousel-dot w-1 h-1 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? 'bg-amber-400 scale-150'
                      : 'bg-white/60 hover:bg-white/90 hover:scale-125'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
