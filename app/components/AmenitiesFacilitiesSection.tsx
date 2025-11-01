'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import icon24 from '../assets/images/24.png';
import icon25 from '../assets/images/25.png';
import icon26 from '../assets/images/26.png';
import icon27 from '../assets/images/27.png';
import icon28 from '../assets/images/28.png';
import icon29 from '../assets/images/29.png';
import icon30 from '../assets/images/30.png';
import icon31 from '../assets/images/31.png';
import icon32 from '../assets/images/32.png';
import icon33 from '../assets/images/33.png';
import icon34 from '../assets/images/34.png';
import icon35 from '../assets/images/35.png';
import backgroundImage from '../assets/images/background_with_pattern.jpg';
import amenitiesImage from '../assets/images/amenities.png';
import { useLanguage } from '../contexts/LanguageContext';

export default function AmenitiesFacilitiesSection() {
  const { t } = useLanguage();
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
  
  const amenities = [
    {
      name: t.amenities.functionalGym,
      icon: icon24,
      alt: t.amenities.functionalGym,
    },
    {
      name: t.amenities.sauna,
      icon: icon25,
      alt: t.amenities.sauna,
    },
    {
      name: t.amenities.swimmingPool,
      icon: icon26,
      alt: t.amenities.swimmingPool,
    },
    {
      name: t.amenities.padelCourt,
      icon: icon27,
      alt: t.amenities.padelCourt,
    },
    {
      name: t.amenities.runningTrack,
      icon: icon28,
      alt: t.amenities.runningTrack,
    },
    {
      name: t.amenities.bbqArea,
      icon: icon29,
      alt: t.amenities.bbqArea,
    },
    {
      name: t.amenities.kidsPlayArea,
      icon: icon30,
      alt: t.amenities.kidsPlayArea,
    },
    {
      name: t.amenities.multipurposeHall,
      icon: icon31,
      alt: t.amenities.multipurposeHall,
    },
    {
      name: t.amenities.cafe,
      icon: icon32,
      alt: t.amenities.cafe,
    },
    {
      name: t.amenities.prayerRoom,
      icon: icon33,
      alt: t.amenities.prayerRoom,
    },
    {
      name: t.amenities.kindergarten,
      icon: icon34,
      alt: t.amenities.kindergarten,
    },
    {
      name: t.amenities.retailShop,
      icon: icon35,
      alt: t.amenities.retailShop,
    },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-[#decfca] transition-all duration-1000 ease-out relative overflow-x-hidden">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 w-full h-full opacity-20"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Content Container - Full Width */}
      <div className="relative z-10 w-full py-16">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#792f41] mb-8" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
              {t.amenities.title}
            </h2>
          </div>
          
          {/* Two Column Layout: Image on Left, Amenities on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-10">
            {/* Left Side - Image */}
            <div className={`w-full h-full flex items-center justify-center order-2 lg:order-1 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] rounded-lg overflow-hidden">
                <Image
                  src={amenitiesImage}
                  alt="Amenities"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* Right Side - Amenities Grid */}
            <div className={`w-full order-1 lg:order-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {amenities.map((amenity, index) => (
                  <div key={index} className={`text-center transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${400 + index * 50}ms` }}>
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 flex items-center justify-center">
                      <Image
                        src={amenity.icon.src}
                        alt={amenity.alt}
                        width={48}
                        height={48}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-[#792f41]" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
                      {amenity.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

