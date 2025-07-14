"use client";

import { useState, useEffect, ReactNode } from 'react';
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: ReactNode;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
}

const Carousel = ({
  children,
  autoplay = false,
  autoplayDelay = 5000,
  pauseOnHover = true,
  loop = true,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [items, setItems] = useState<ReactNode[]>([]);
  
  // Convert children to array
  useEffect(() => {
    const childrenArray = React.Children.toArray(children);
    setItems(childrenArray);
  }, [children]);
  
  const itemCount = items.length;

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prev) => (loop ? (prev + 1) % itemCount : Math.min(prev + 1, itemCount - 1)));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (loop ? (prev - 1 + itemCount) % itemCount : Math.max(prev - 1, 0)));
  };

  // Autoplay effect
  useEffect(() => {
    if (!autoplay || (pauseOnHover && isHovered) || itemCount <= 1) return;

    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, pauseOnHover, isHovered, currentIndex, itemCount]);

  if (itemCount === 0) {
    return null;
  }

  return (
    <div
      className="relative w-full max-w-full mx-auto overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[400px] sm:h-[450px] md:h-[500px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {itemCount > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!loop && currentIndex === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!loop && currentIndex === itemCount - 1}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-white scale-110 shadow-md' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;