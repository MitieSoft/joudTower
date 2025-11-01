'use client';

import React, { useState, useEffect } from 'react';
import heroImage1 from '../assets/images/Joud-Tower.jpg';
import heroImage2 from '../assets/images/11.jpg';
import heroImage3 from '../assets/images/7.jpg';
import { useLanguage } from '../contexts/LanguageContext';

export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const heroImages = [heroImage1, heroImage2, heroImage3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Trigger initial animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={`Joud Tower Hero Image ${index + 1}`}
              className={`object-cover w-full h-full transition-transform duration-[10000ms] ease-linear ${
                currentIndex === index ? 'scale-100' : 'scale-110'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[5]"></div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 relative z-10">
          <div className="flex justify-center">
            <div className="text-white text-center max-w-4xl w-full">
              <h1 className={`text-5xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-7xl 2xl:text-9xl ${isRTL ? 'font-extrabold' : 'font-medium'}  leading-tight px-4 sm:px-0 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} sm:whitespace-nowrap`} style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
                {t.hero.title}
              </h1>
              {/* <p className={`text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl text-white ${isRTL ? 'font-bold' : 'font-normal'} mb-4 sm:mb-6 md:mb-8 px-4 sm:px-0 transition-all duration-1000 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
                {t.hero.subtitle}
              </p> */}
              <p className={`text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white ${isRTL ? 'font-semibold' : 'font-normal'} leading-relaxed px-4 sm:px-0 transition-all duration-1000 delay-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: 'Univers, Arial, sans-serif' }} dangerouslySetInnerHTML={{ __html: t.hero.description }} />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white w-8 sm:w-10' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

