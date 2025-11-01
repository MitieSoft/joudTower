'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import img1 from '../assets/images/1.jpg';
import joudTower from '../assets/images/Joud-Tower.png';
import img5 from '../assets/images/5.png';
import img7 from '../assets/images/7.png';
import img23 from '../assets/images/23.png';
import img6 from '../assets/images/6.png';
import img9 from '../assets/images/9.png';
import img12 from '../assets/images/12.png';
import img15 from '../assets/images/15.png';
import { useLanguage } from '../contexts/LanguageContext';

export default function DiscoverGalleriesSection() {
  const { t, isRTL } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const allGalleryImages = [
    img1.src,
    joudTower.src,
    img5.src,
    img7.src,
    img23.src,
    img6.src,
    img9.src,
    img12.src,
    img15.src
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Create extended array with duplicates for seamless infinite loop
  const extendedImages = [
    ...allGalleryImages.slice(-4), // Last 4 at start
    ...allGalleryImages,
    ...allGalleryImages.slice(0, 4) // First 4 at end
  ];
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev) => {
      // Allow sliding smoothly to the duplicate images at the end
      const newIndex = prev + 1;
      return newIndex;
    });
  };

  const prevImage = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        // Go back to show duplicate start position (same visual as end)
        setIsTransitioning(false);
        setCurrentIndex(allGalleryImages.length - 1);
        setTimeout(() => setIsTransitioning(true), 20);
        return allGalleryImages.length - 1;
      }
      return prev - 1;
    });
  };

  // Handle seamless reset after smoothly showing duplicate images at the end
  useEffect(() => {
    // When we reach the duplicate images position (allGalleryImages.length), 
    // wait for transition to complete, then reset seamlessly to start
    if (currentIndex === allGalleryImages.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0); // Reset to start (same visual position as duplicates)
        setTimeout(() => setIsTransitioning(true), 20);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, allGalleryImages.length]);

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    
    const handleTouchEnd = (e: React.TouchEvent) => {
      const touch = e.changedTouches[0];
      const endX = touch.clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextImage();
        } else {
          prevImage();
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd as any);
    };
    
    document.addEventListener('touchend', handleTouchEnd as any);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Function to get the four visible images
  const getVisibleImages = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentIndex + i) % allGalleryImages.length;
      visible.push(allGalleryImages[index]);
    }
    return visible;
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mb-8 md:mb-12 text-[#792f41] text-center">
           {t.gallery.title}
          </h2>
          {!isClient ? (
            <div className="flex items-center justify-center h-[400px] sm:h-[500px] lg:h-[500px] xl:h-[500px] 2xl:h-[700px]">
              <div className="animate-pulse bg-gray-300 rounded-xl w-full h-full"></div>
            </div>
          ) : (
            <>
              {/* Mobile Layout (single column) */}
              <div className="block lg:hidden">
                <div className="relative">
                  {/* Main Slideshow for Mobile */}
                  <div 
                    className="relative w-full h-[400px] sm:h-[500px] overflow-hidden rounded-xl bg-white shadow-lg"
                    onTouchStart={handleTouchStart}
                  >
                    <div className="relative overflow-hidden w-full h-full">
                      <div 
                        className="flex absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out"
                        style={{ 
                          transform: `translateX(-${currentIndex * 100}%)`,
                          direction: 'ltr'
                        }}
                      >
                        {allGalleryImages.map((image, index) => (
                          <div key={index} className="relative w-full h-full flex-shrink-0">
                            <Image
                              src={image}
                              alt="Gallery Image"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Navigation Arrows for Mobile */}
                    <button
                      onClick={prevImage}
                      className="absolute top-1/2 -translate-y-1/2 left-4 bg-gray-100 hover:bg-gray-200 p-2 sm:p-3 rounded-full transition-all duration-200 z-20"
                      aria-label="Previous slide"
                    >
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="#333333" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute top-1/2 -translate-y-1/2 right-4 bg-gray-100 hover:bg-gray-200 p-2 sm:p-3 rounded-full transition-all duration-200 z-20"
                      aria-label="Next slide"
                    >
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="#333333" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Pagination Dots for Mobile */}
                  <div className="flex justify-center mt-4 space-x-2">
                    {allGalleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                          currentIndex === index 
                            ? 'bg-black' 
                            : 'bg-gray-300 hover:bg-gray-500'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Desktop Layout (four equal columns) */}
              <div className="hidden lg:block">
                <div 
                  className="relative overflow-hidden rounded-2xl"
                  onTouchStart={handleTouchStart}
                >
                  {/* Single Slider Container with duplicates for seamless loop */}
                  <div 
                    className="flex"
                    style={{
                      transform: `translateX(calc(-${(currentIndex + 4)} * ((100% + 1rem) / 4)))`,
                      transition: isTransitioning ? 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                      gap: '1rem',
                      direction: 'ltr'
                    }}
                  >
                    {extendedImages.map((image, index) => (
                      <div 
                        key={`extended-${index}`}
                        className="relative flex-shrink-0 h-[500px] xl:h-[500px] 2xl:h-[700px] overflow-hidden rounded-2xl bg-white shadow-lg"
                        style={{
                          width: 'calc((100% - 3 * 1rem) / 4)'
                        }}
                      >
                        <Image
                          src={image}
                          alt="Gallery Image"
                          fill
                          className="object-cover"
                          priority={index >= 4 && index < 8}
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 -translate-y-1/2 left-4 lg:left-6 bg-gray-100 hover:bg-gray-200 p-2 lg:p-3 rounded-full transition-all duration-200 z-20"
                    aria-label="Previous slide"
                  >
                    <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="#333333" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-6 bg-gray-100 hover:bg-gray-200 p-2 lg:p-3 rounded-full transition-all duration-200 z-20"
                    aria-label="Next slide"
                  >
                    <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="#333333" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Pagination Dots for Desktop */}
                <div className="flex justify-center mt-6 space-x-2">
                  {allGalleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        currentIndex === index 
                          ? 'bg-[#792f41]' 
                          : 'bg-gray-300 hover:bg-gray-500'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
