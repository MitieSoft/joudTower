'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import floorPlan1 from '../assets/images/FloorPlan/A-13-(1)_LR.jpg';
import floorPlan2 from '../assets/images/FloorPlan/A-30_LR.jpg';
import floorPlan3 from '../assets/images/FloorPlan/A6_LR.jpg';
import floorPlan4 from '../assets/images/FloorPlan/A9_LR.jpg';
import floorPlan5 from '../assets/images/FloorPlan/B10_LR.jpg';
import floorPlan6 from '../assets/images/FloorPlan/B11_LR.jpg';
import floorPlan7 from '../assets/images/FloorPlan/B4_LR.jpg';
import floorPlan8 from '../assets/images/FloorPlan/B9_LR.jpg';
import { useLanguage } from '../contexts/LanguageContext';

export default function FloorPlansSection() {
  const { t, isRTL } = useLanguage();
  const floorPlans = [
    {
      id: 'a13',
      label: '3 BR -Type A13',
      image: floorPlan1,
      alt: 'Floor Plan A-13',
    },
    {
      id: 'a30',
      label: 'Duplex -Type A30',
      image: floorPlan2,
      alt: 'Floor Plan A-30',
    },
    {
      id: 'a6',
      label: '4 BR -Type A6',
      image: floorPlan3,
      alt: 'Floor Plan A6',
    },
    {
      id: 'a9',
      label: '3 BR -Type A9',
      image: floorPlan4,
      alt: 'Floor Plan A9',
    },
    {
      id: 'b10',
      label: '2 BR -Type B10',
      image: floorPlan5,
      alt: 'Floor Plan B10',
    },
    {
      id: 'b11',
      label: '2 BR -Type B11',
      image: floorPlan6,
      alt: 'Floor Plan B11',
    },
    {
      id: 'b4',
      label: '3 BR -Type B4',
      image: floorPlan7,
      alt: 'Floor Plan B4',
    },
    {
      id: 'b9',
      label: '2 BR -Type B9',
      image: floorPlan8,
      alt: 'Floor Plan B9',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const activePlan = floorPlans[currentIndex];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to move to next slide (internal, doesn't reset timer)
  const moveToNext = () => {
    setCurrentIndex((prev) => (prev === floorPlans.length - 1 ? 0 : prev + 1));
  };

  // Function to reset auto-play timer
  const resetAutoPlay = () => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Start new interval with 8 seconds
    intervalRef.current = setInterval(() => {
      moveToNext();
    }, 8000); // 8 seconds (8000ms)
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? floorPlans.length - 1 : prev - 1));
    // Reset auto-play timer when manually clicking previous
    resetAutoPlay();
  };

  const handleNext = () => {
    moveToNext();
    // Reset auto-play timer when manually clicking next
    resetAutoPlay();
  };

  const handlePlanSelect = (index: number) => {
    setCurrentIndex(index);
    // Reset auto-play timer when selecting a plan
    resetAutoPlay();
  };

  const handleDownload = () => {
    // Handle download functionality
    console.log('Downloading floor plans for:', activePlan.label);
    // You can implement actual download logic here
  };

  // Autoplay functionality
  useEffect(() => {
    // Clear existing interval before starting new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Start auto-play using moveToNext to avoid circular dependency
    intervalRef.current = setInterval(() => {
      moveToNext();
    }, 8000); // 8 seconds (8000ms)

    // Cleanup on unmount or when gallery changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [floorPlans.length]);

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-[#792f41]">{t.floorPlans.title}</span>
          </h2>
        </div>

        {/* Floor Plan Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-3 mb-6 sm:mb-8 md:mb-12 px-2">
          {floorPlans.map((plan, index) => (
            <button
              key={plan.id}
              onClick={() => handlePlanSelect(index)}
              className={`px-3 sm:px-4 md:px-4 lg:px-3 xl:px-4 2xl:px-4 py-1.5 sm:py-2 md:py-3 rounded-lg md:rounded-xl text-xs sm:text-sm md:text-xm lg:text-sm 2xl:text-sm font-medium transition-colors touch-manipulation ${
                index === currentIndex
                  ? 'bg-[#792f41] text-white border-2 border-[#792f41]'
                  : 'bg-[#8a4a26] text-white border-2 border-transparent hover:bg-[#9d552d] active:bg-[#9d552d]'
              }`}
            >
              {plan.label}
            </button>
          ))}
        </div>
      </div>

      {/* Floor Plan Slider - Container Width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg md:rounded-xl shadow-2xl">
          {/* Slider Container */}
          <div 
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
              direction: 'ltr'
            }}
          >
            {floorPlans.map((plan, index) => (
              <div 
                key={plan.id}
                className="min-w-full h-full relative flex-shrink-0"
              >
                <Image
                  src={plan.image.src}
                  alt={plan.alt}
                  fill
                  className="object-fit"
                  quality={90}
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
            
            {/* Navigation Arrows */}
            <div className={`absolute bottom-3 sm:bottom-6 ${isRTL ? 'right-3 sm:right-6' : 'left-3 sm:left-6'} flex gap-2 z-10`}>
              <button
                onClick={isRTL ? handleNext : handlePrevious}
                className="bg-black/80 hover:bg-black rounded-lg p-2.5 sm:p-3 text-white transition-colors touch-manipulation"
                aria-label={isRTL ? "Next floor plan" : "Previous floor plan"}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sm:w-6 sm:h-6"
                  style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={isRTL ? handlePrevious : handleNext}
                className="bg-black/80 hover:bg-black rounded-lg p-2.5 sm:p-3 text-white transition-colors touch-manipulation"
                aria-label={isRTL ? "Previous floor plan" : "Next floor plan"}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sm:w-6 sm:h-6"
                  style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Current Plan Label */}
            <div className={`absolute bottom-3 sm:bottom-6 ${isRTL ? 'left-3 sm:left-6' : 'right-3 sm:right-6'} bg-black/80 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 z-10`}>
              <span className="text-white text-xs sm:text-sm md:text-base font-medium">
                {activePlan.label}
              </span>
            </div>
          </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4 px-6">
          {floorPlans.map((_, index) => (
            <button
              key={index}
              onClick={() => handlePlanSelect(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-amber-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to floor plan ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

  