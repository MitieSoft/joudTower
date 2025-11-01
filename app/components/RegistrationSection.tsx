'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import arcImage from '../assets/images/joud-specification.png';
import image2 from '../assets/images/2.jpg';
import image5 from '../assets/images/5.png';
import { useLanguage } from '../contexts/LanguageContext';

export default function RegistrationSection() {
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
    <section ref={sectionRef} className="bg-[#decfca] transition-all duration-1000 ease-out">
        {/* Main Title - Outside Container */}
        <div className={`text-center py-8 bg-white transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#792f41]" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
            {t.specification.title}
          </h2>
        </div>
        <div className={`container mx-auto px-4 sm:px-12 md:px-16 lg:px-20 xl:px-24 pt-8 pb-8 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className={`text-3xl pt-4 sm:text-4xl md:text-5xl font-bold text-[#792f41] mb-4 ${isRTL ? 'text-right' : 'text-left'}`} style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
            {t.specification.totalStoreys}
          </h3>
        </div>
        {/* 3 Divs Layout - No Gaps */}
        <div className=" container mx-auto px-4 sm:px-12 md:px-16 lg:px-20 xl:px-24  pb-30" >
          <div className="grid grid-cols-1 lg:grid-cols-3 px-4 sm:px-4 md:px-0 lg:px-0">
          
          
          {/* Div 1 - Text + Image */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : isRTL ? 'opacity-0 translate-x-10' : 'opacity-0 -translate-x-10'} flex flex-col justify-between h-full`}>
            <div>
              <div className={`space-y-4 text-lg text-black pt-4 sm:pt-4 md:pt-6 lg:pt-8 ${isRTL ? 'text-right pl-8' : 'text-left pr-8'}`}>
                <p>{t.specification.structureDetails}</p>
                <p><strong>{t.specification.residentialFloors}</strong></p>
              </div>
            </div>

             <div className={`relative w-full h-80 mt-auto ${isRTL ? '-left-20' : '-right-20'} -bottom-20 z-20 hidden lg:block`}>
               <Image
                 src={image2.src}
                 alt="Joud Tower interior view"
                 fill
                 className="object-cover shadow-[0_30px_80px_rgba(0,0,0,0.5)] rounded-lg"
               />
             </div>
          </div>

          {/* Div 2 - Big Image Covering Whole Div */}
          <div 
      className={`relative min-h-[600px] transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      style={{
        backgroundImage: `url(${arcImage.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
          </div>

          {/* Div 3 - Image + Apartment List */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100' : isRTL ? 'opacity-0 -translate-x-10' : 'opacity-0 translate-x-10'}`}>
             <div className={`relative w-full h-64 mb-8 ${isRTL ? '-right-20' : '-left-20'} -top-20 z-20 hidden lg:block`}>
               <Image
                 src={image5.src}
                 alt="Joud Tower curved exterior"
                 fill
                 className="object-cover shadow-[0_30px_80px_rgba(0,0,0,0.5)] rounded-lg"
               />
             </div>

            <div className={`space-y-2 text-md text-black leading-relaxed pt-4 sm:pt-4 md:pt-0 lg:pt-0 ${isRTL ? 'text-right pr-2 sm:pr-2 md:pr-8 lg:pr-8' : 'text-left pl-2 sm:pl-2 md:pl-8 lg:pl-8'}`}>
              <p className="m-0" dir={isRTL ? 'rtl' : 'ltr'}>
                <span className={isRTL ? 'ml-2' : 'mr-2'}>•</span>
                {t.specification.bedroom2}
              </p>
              <p className="m-0" dir={isRTL ? 'rtl' : 'ltr'}>
                <span className={isRTL ? 'ml-2' : 'mr-2'}>•</span>
                {t.specification.bedroom3}
              </p>
              <p className="m-0" dir={isRTL ? 'rtl' : 'ltr'}>
                <span className={isRTL ? 'ml-2' : 'mr-2'}>•</span>
                {t.specification.bedroom3Garden}
              </p>
              <p className="m-0" dir={isRTL ? 'rtl' : 'ltr'}>
                <span className={isRTL ? 'ml-2' : 'mr-2'}>•</span>
                {t.specification.bedroom4}
              </p>
              <p className="m-0" dir={isRTL ? 'rtl' : 'ltr'}>
                <span className={isRTL ? 'ml-2' : 'mr-2'}>•</span>
                {t.specification.bedroom4Garden}
              </p>
              <p className="m-0" dir={isRTL ? 'rtl' : 'ltr'}>
                <span className={isRTL ? 'ml-2' : 'mr-2'}>•</span>
                {t.specification.bedroom4Duplex}
              </p>
              <p className="m-0" dir={isRTL ? 'rtl' : 'ltr'}>
                <span className={isRTL ? 'ml-2' : 'mr-2'}>•</span>
                {t.specification.penthouse}
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>
  );
}

