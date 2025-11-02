'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';
import joudTower from '../assets/images/Joud-Tower.png';
import img5 from '../assets/images/5.png';
import img7 from '../assets/images/7.png';
import img16 from '../assets/images/16.jpeg';
import img6 from '../assets/images/6.png';
import img9 from '../assets/images/9.png';
import img11 from '../assets/images/11.png';
import img12 from '../assets/images/12.png';
import img15 from '../assets/images/15.png';
import { useLanguage } from '../contexts/LanguageContext';

export default function DiscoverGalleriesSection() {
  const { t, isRTL } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'external' | 'internal'>('external');
  
  // Categorize images into External and Internal
  const externalImages = [
    joudTower.src,
    img5.src,
    img7.src,
    img6.src,
    
    
  ];

  const internalImages = [
    img11.src,
    img2.src,
    img16.src,
    img12.src,
    img15.src,
    img9.src,
  ];

  // Get current gallery images based on active tab
  const allGalleryImages = activeTab === 'external' ? externalImages : internalImages;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Reset index when tab changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  // Create extended array with duplicates for seamless infinite loop
  // Use useMemo to recalculate when allGalleryImages changes
  const extendedImages = React.useMemo(() => {
    if (allGalleryImages.length === 0) return [];
    const lastItems = allGalleryImages.length >= 2 
      ? allGalleryImages.slice(-2) 
      : allGalleryImages;
    const firstItems = allGalleryImages.length >= 2 
      ? allGalleryImages.slice(0, 2) 
      : allGalleryImages;
    return [
      ...lastItems,
      ...allGalleryImages,
      ...firstItems
    ];
  }, [allGalleryImages]);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to move to next image (internal, doesn't reset timer)
  const moveToNext = () => {
    if (allGalleryImages.length === 0) return;
    setCurrentIndex((prev) => {
      // Allow sliding smoothly to the duplicate images at the end
      const newIndex = prev + 1;
      // Wrap around if we exceed the array length
      return newIndex >= allGalleryImages.length ? 0 : newIndex;
    });
  };

  // Function to reset auto-play timer
  const resetAutoPlay = () => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Start new interval
    intervalRef.current = setInterval(() => {
      moveToNext();
    }, 5000);
  };

  const nextImage = () => {
    moveToNext();
    // Reset auto-play timer when manually clicking next
    resetAutoPlay();
  };

  const prevImage = () => {
    if (allGalleryImages.length === 0) return;
    setCurrentIndex((prev) => {
      if (prev === 0) {
        // Go back to show duplicate start position (same visual as end)
        setIsTransitioning(false);
        const newIndex = allGalleryImages.length - 1;
        setTimeout(() => setIsTransitioning(true), 20);
        return newIndex;
      }
      return prev - 1;
    });
    // Reset auto-play timer when manually clicking prev
    resetAutoPlay();
  };

  // Handle seamless reset after smoothly showing duplicate images at the end
  useEffect(() => {
    // When we reach the duplicate images position (allGalleryImages.length), 
    // wait for transition to complete, then reset seamlessly to start
    if (allGalleryImages.length > 0 && currentIndex === allGalleryImages.length) {
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
    // Reset auto-play timer when manually clicking pagination dots
    resetAutoPlay();
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
    // Clear existing interval before starting new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Start auto-play using moveToNext to avoid circular dependency
    intervalRef.current = setInterval(() => {
      moveToNext();
    }, 5000);

    // Cleanup on unmount or when gallery changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [allGalleryImages.length]); // Reset when gallery changes

  // Function to get the visible images (2 for desktop, 1 for mobile)
  const getVisibleImages = () => {
    const visible = [];
    const count = 2; // 2 images for desktop view
    for (let i = 0; i < count; i++) {
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
          
          {/* Tabs */}
          <div className="flex justify-start mb-4 md:mb-6 gap-4 md:gap-4">
            <button
              onClick={() => setActiveTab('external')}
              className={`relative px-4 md:px-8 lg:px-12 xl:px-12 2xl:px-12 py-2 md:py-3 font-medium text-base md:text-lg transition-all duration-300 text-center ${
                activeTab === 'external'
                  ? 'text-[#792f41]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              style={{ fontFamily: 'Univers, Arial, sans-serif' }}
            >
              {t.gallery.external}
              <span
                className={`absolute bottom-0 left-0 right-0 h-1  transition-all duration-300 ${
                  activeTab === 'external'
                    ? 'bg-[#792f41]'
                    : 'bg-gray-300'
                }`}
              />
            </button>
            <button
              onClick={() => setActiveTab('internal')}
              className={`relative px-4 md:px-8 lg:px-12 xl:px-12 2xl:px-12 py-2 md:py-3 font-medium text-base md:text-lg transition-all duration-300 text-center ${
                activeTab === 'internal'
                  ? 'text-[#792f41]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              style={{ fontFamily: 'Univers, Arial, sans-serif' }}
            >
              {t.gallery.internal}
              <span
                className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ${
                  activeTab === 'internal'
                    ? 'bg-[#792f41]'
                    : 'bg-gray-300'
                }`}
              />
            </button>
          </div>
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
                    className="relative w-full h-[400px] sm:h-[500px] overflow-hidden rounded-3xl bg-white shadow-lg"
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
                      className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} bg-[#cbcdc9] hover:bg-[#b8bab6] p-2 sm:p-3 rounded-lg transition-all duration-200 z-20`}
                      aria-label="Previous slide"
                    >
                      <svg className={`w-6 h-6 sm:w-8 sm:h-8 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="#333333" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'} bg-[#cbcdc9] hover:bg-[#b8bab6] p-2 sm:p-3 rounded-full transition-all duration-200 z-20`}
                      aria-label="Next slide"
                    >
                      <svg className={`w-6 h-6 sm:w-8 sm:h-8 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="#333333" strokeWidth="3" viewBox="0 0 24 24">
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
              
              {/* Desktop Layout (two equal columns) */}
              <div className="hidden lg:block">
                <div 
                  className="relative overflow-hidden rounded-3xl"
                  onTouchStart={handleTouchStart}
                >
                  {/* Single Slider Container with duplicates for seamless loop */}
                  <div 
                    className="flex"
                    style={{
                      transform: `translateX(calc(-${(currentIndex + Math.min(2, allGalleryImages.length))} * ((100% + 1 * 2rem) / 2)))`,
                      transition: isTransitioning ? 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                      gap: '2rem',
                      direction: 'ltr'
                    }}
                  >
                    {extendedImages.map((image, index) => (
                      <div 
                        key={`extended-${index}`}
                        className="relative flex-shrink-0 h-[400px] xl:h-[400px] 2xl:h-[400px] overflow-hidden rounded-3xl bg-white shadow-lg"
                        style={{
                          width: 'calc((100% - 1 * 2rem) / 2)'
                        }}
                      >
                        <Image
                          src={image}
                          alt="Gallery Image"
                          fill
                          className="object-cover"
                          priority={index >= Math.min(2, allGalleryImages.length) && index < Math.min(2, allGalleryImages.length) + 2}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Navigation Arrows - Bottom Right (Outside Image) */}
                <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'} mt-4 gap-2`} dir={isRTL ? 'rtl' : 'ltr'}>
                  <button
                    onClick={prevImage}
                    className="bg-[#cbcdc9] hover:bg-[#b8bab6] p-2 lg:p-3 rounded-full transition-all duration-200 shadow-lg"
                    aria-label="Previous slide"
                  >
                    <svg className={`w-8 h-8 lg:w-10 lg:h-10 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="#333333" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="bg-[#cbcdc9] hover:bg-[#b8bab6] p-2 lg:p-3 rounded-full transition-all duration-200 shadow-lg"
                    aria-label="Next slide"
                  >
                    <svg className={`w-8 h-8 lg:w-10 lg:h-10 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="#333333" strokeWidth="3" viewBox="0 0 24 24">
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
