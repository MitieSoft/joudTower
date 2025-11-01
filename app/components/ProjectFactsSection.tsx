'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import heroImage1 from '../assets/images/Joud-Tower.png';
import { useLanguage } from '../contexts/LanguageContext';

export default function ProjectFactsSection() {
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

  const facts = [
    {
      label: 'Property Type',
      value: '1-4 BR Apartments | Townhouses | Penthouses',
    },
    {
      label: 'Starting Prices',
      value: 'AED 3,500,000',
    },
    {
      label: 'Payment Plan',
      value: '65% / 35%',
    },
    {
      label: 'Developer',
      value: 'Aldar Properties',
    },
    {
      label: 'Area Size',
      value: 'From 968 Sq. Ft',
    },
    {
      label: 'WHO CAN BUY',
      value: 'Freehold For All Nationalities',
    },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Joud Tower Image */}
          <div className={`w-full order-2 lg:order-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative w-full h-[600px] md:h-[700px] lg:h-[790px] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src={heroImage1}
                alt="Joud Tower"
                fill
                className="object-cover"
                quality={90}
              />
            </div>
          </div>

          {/* Right Column - Project Facts */}
          <div className={`w-full order-1 lg:order-2 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-10" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
              <span className="text-[#792f41]">Project</span>{' '}
              <span className="text-[#792f41]">Facts</span>
            </h2>

            <div className="space-y-4 md:space-y-5">
              {facts.map((fact, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-4 md:p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-[#792f41]/20 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${300 + index * 50}ms`, fontFamily: 'Univers, Arial, sans-serif' }}
                >
                  <div className="text-xs md:text-sm font-semibold text-[#9d552d] uppercase tracking-wide mb-1 md:mb-2">
                    {fact.label}
                  </div>
                  <div className="text-base md:text-lg font-bold text-[#792f41]">
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

