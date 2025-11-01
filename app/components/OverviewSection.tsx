'use client';

import React, { useState, useEffect, useRef } from 'react';
import aboutUsImage from '../assets/images/About-us.jpg';
import { useLanguage } from '../contexts/LanguageContext';

export default function OverviewSection() {
  const { t, isRTL } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white">
      {/* Top Information Bar */}
      <div className={`w-full border-b border-gray-200 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`flex flex-col sm:flex-row items-center sm:items-center gap-2 ${isRTL ? 'text-center sm:text-right' : 'text-center sm:text-left'}`}>
          <span className="text-gray-700 text-sm sm:text-base md:text-lg font-medium">
            {t.overview.pricesStartFrom}
          </span>
          <span className="text-[#792f41] text-lg sm:text-xl md:text-2xl font-bold">
            AED 3,600,000
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center sm:items-center gap-2 sm:gap-3">
          <button className="px-3 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-[#9d552d] hover:bg-[#8a4a26] text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium rounded-full transition-colors whitespace-nowrap">
            {t.overview.downloadBrochure}
          </button>
          <button className="px-3 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-white hover:bg-[#9d552d] text-[#9d552d] hover:text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium rounded-full transition-colors whitespace-nowrap shadow-md">
            {t.overview.getFreeConsultation}
          </button>
        </div>
      </div>
      
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 lg:py-24 max-w-[1600px] mx-auto">
        {/* Full width heading section */}
        <div className="mb-12 sm:mb-16 lg:mb-15">
          <div className="space-y-4 sm:space-y-6">
            <div className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className={`text-[clamp(2.5rem,8vw,8rem)] sm:text-[clamp(3rem,10vw,8rem)] font-normal leading-[0.95] tracking-tight text-[#792f41]`}>
                {t.overview.beyondLimits}
              </h1>
              <p className={`text-[#555555] text-base leading-relaxed max-w-md mt-4 sm:mt-8 hidden md:block ${isRTL ? 'lg:mr-8 text-center sm:text-right' : 'lg:ml-8 lg:mr-32 text-center'}`}>
                {t.overview.description1}
              </p>
            </div>
            <div className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className={`text-[#555555] text-base leading-relaxed max-w-md mt-4 sm:mt-8 hidden md:block ${isRTL ? 'lg:mr-8 text-center sm:text-right order-2 sm:order-1' : 'lg:ml-8 lg:mr-32 text-center order-2 sm:order-1'}`}>
                {t.overview.description2}
              </p>
              <h1 className={`text-[clamp(2.5rem,8vw,8rem)] sm:text-[clamp(3rem,10vw,8rem)] font-normal leading-[0.95] tracking-tight text-[#792f41] text-right ml-auto order-1 sm:order-2 `}>
                {t.overview.spaceAwaits}
              </h1>
            </div>
          </div>
        </div>

        {/* Content section with Text and Image */}
        <div className={`grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-center ${isRTL ? 'lg:grid-cols-[1.3fr_1fr]' : ''}`}>
          {/* Left Column - Text */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-10' : 'opacity-0 -translate-x-10'} ${isRTL ? 'lg:order-2' : ''}`}>
            <p className="text-[#333333] text-lg leading-relaxed">
              {t.overview.description3}
            </p>

            <button className={`group bg-[#9d552d] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium flex items-center gap-3 hover:bg-[#8a4a26] transition-colors shadow-lg mt-8 sm:mt-12 md:mt-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {t.overview.viewCatalogue}
            </button>
          </div>

          {/* Right Column - Image */}
          <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 -translate-x-10' : 'opacity-0 translate-x-10'} ${isRTL ? 'lg:order-1' : ''}`}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={aboutUsImage.src}
                alt="Modern architectural rooftops"
                className="w-full h-[350px] lg:h-[300px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
