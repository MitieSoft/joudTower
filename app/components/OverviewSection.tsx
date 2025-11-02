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
        } else {
          // Reset animation when scrolling up and out of view
          setIsVisible(false);
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
      <div className={`w-full border-b border-gray-200 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6 sm:py-6 flex flex-row items-center justify-between gap-2 sm:gap-4 bg-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
        <div className={`flex flex-row items-center gap-2 flex-shrink-0 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-5' : 'opacity-0 -translate-x-5'} ${isRTL ? 'text-right' : 'text-left'}`}>
          <span className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg font-medium whitespace-nowrap">
            {t.overview.pricesStartFrom}
          </span>
          <span className="text-[#792f41] text-sm sm:text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl font-bold whitespace-nowrap">
            AED 3,600,000
          </span>
        </div>
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 flex-shrink-0">
          <a 
            href="/Joud-Tower-Brochure.pdf" 
            download="Joud-Tower-Brochure.pdf"
            className={`px-2 sm:px-3 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-[#9d552d] hover:bg-[#8a4a26] text-white text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg font-medium rounded-full transition-all duration-1000 delay-200 whitespace-nowrap inline-block text-center ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
          >
            {t.overview.downloadBrochure}
          </a>
          <button className={`hidden sm:block px-2 sm:px-3 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-white hover:bg-[#9d552d] text-[#9d552d] hover:text-white text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg font-medium rounded-full transition-all duration-1000 delay-300 whitespace-nowrap shadow-md ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}>
            {t.overview.getFreeConsultation}
          </button>
        </div>
      </div>
      
      <div className="px-4 sm:px-6 md:px-8 lg:px-6 xl:px-10 2xl:px-10 py-12 sm:py-16 lg:py-24 max-w-[1600px] mx-auto">
        {/* Full width heading section */}
        <div className="mb-12 sm:mb-16 lg:mb-15">
          <div className="space-y-4 sm:space-y-6">
            <div className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className={`text-[clamp(2.5rem,8vw,8rem)] sm:text-[clamp(3rem,10vw,8rem)] md:text-[clamp(2.5rem,6vw,5rem)] lg:text-[clamp(2.5rem,7.8vw,7rem)] xl:text-[clamp(3rem,8vw,7.5rem)] 2xl:text-[clamp(3rem,10vw,8rem)] font-normal leading-[0.95] tracking-tight text-[#792f41] sm:whitespace-nowrap`}>
                {t.overview.beyondLimits}
              </h1>
              <p className={`text-[#555555] text-base leading-relaxed max-w-md mt-4 sm:mt-8 hidden md:block ${isRTL ? 'lg:mr-8 text-center sm:text-right' : 'lg:ml-8 lg:mr-6 xl:mr-24 2xl:mr-32 text-center'}`}>
                {t.overview.description1}
              </p>
            </div>
            <div className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className={`text-[#555555] text-base leading-relaxed max-w-md mt-4 sm:mt-8 hidden md:block ${isRTL ? 'lg:mr-8 text-center sm:text-right order-2 sm:order-1' : 'lg:ml-8 lg:mr-6 xl:mr-24 2xl:mr-32 text-center order-2 sm:order-1'}`}>
                {t.overview.description2}
              </p>
              <h1 className={`text-[clamp(2.5rem,8vw,8rem)] sm:text-[clamp(3rem,10vw,8rem)] md:text-[clamp(2.5rem,6vw,5rem)] lg:text-[clamp(2.5rem,7.8vw,7rem)] xl:text-[clamp(3rem,8vw,7.5rem)] 2xl:text-[clamp(3rem,10vw,8rem)] font-normal leading-[0.95] tracking-tight text-[#792f41] text-right ml-auto order-1 sm:order-2 sm:whitespace-nowrap`}>
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
