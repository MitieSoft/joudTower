'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

export default function PaymentPlanSection() {
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
    <section ref={sectionRef} className="w-full bg-white pb-12 md:pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Title */}
        <div className={`text-center mb-8 md:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-[#792f41]">{t.paymentPlan.title}</span>
          </h2>
        </div>
      </div>

      {/* Payment Plan Banner - Full Width */}
      <div className="w-full px-6 md:px-8 lg:px-12 mb-8 md:mb-12">
        <div className="relative rounded-xl md:rounded-2xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=80"
              alt="Interior with large windows"
              fill
              className="object-cover blur-sm"
              quality={90}
              sizes="100vw"
            />
          </div>

          {/* Teal-blueish Overlay */}
          <div className="absolute inset-0 bg-[#792f41]/80"></div>

          {/* Content */}
          <div className="relative z-10 py-6 sm:py-8 md:py-12 lg:py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/30">
              {/* Left Section - Down Payment */}
              <div className={`flex flex-col items-center justify-center py-6 sm:py-8 md:py-0 text-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                  10%
                </div>
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium">
                  {t.paymentPlan.downPayment}
                </div>
              </div>

              {/* Middle Section - During Construction */}
              <div className={`flex flex-col items-center justify-center py-6 sm:py-8 md:py-0 text-center md:px-4 lg:px-8 xl:px-12 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                  55%
                </div>
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium">
                  {t.paymentPlan.duringConstruction}
                </div>
              </div>

              {/* Right Section - On Handover */}
              <div className={`flex flex-col items-center justify-center py-6 sm:py-8 md:py-0 text-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                  35%
                </div>
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium">
                  {t.paymentPlan.onHandover}
                </div>
              </div>
            </div>
            
            {/* Button inside overlay */}
            
          </div>
        </div>
      </div>
      <div className="text-center">
              <button className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 md:py-4 lg:py-5 bg-[#9d552d] hover:bg-[#8a4a26] text-white font-medium rounded-full transition-colors text-sm sm:text-base md:text-lg whitespace-nowrap">
                {t.paymentPlan.moreDetails}
              </button>
            </div>

      {/* Green Banner - Full Width */}
      {/* <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 mt-6 sm:mt-8 md:mt-10">
        <div className="bg-[#792f41] backdrop-blur-sm py-6 sm:py-8 md:py-10 lg:py-12 rounded-xl md:rounded-2xl overflow-hidden">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              <p className={`text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
                {t.paymentPlan.weAreHere}
              </p>
              <button className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2 sm:py-2.5 md:py-3 lg:py-4 xl:py-5 bg-[#9d552d] hover:bg-[#8a4a26] text-white font-medium rounded-full transition-colors text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap">
                {t.paymentPlan.getFreeConsultation}
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}

