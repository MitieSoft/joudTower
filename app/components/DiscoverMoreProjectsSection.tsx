'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

export default function DiscoverMoreProjectsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const projects = [
    {
      id: 1,
      name: 'Bashayer',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
      alt: 'Bashayer coastal development',
      propertyType: 'Villas',
      location: 'Hudayriyat Island, Abu Dhabi',
      price: 'From AED 6,100,000',
      bedrooms: '4-5 Bedroom',
    },
    {
      id: 2,
      name: 'Sky Tower',
      image: 'https://images.unsplash.com/photo-1496564203459-31c84b0cf0ba?w=1920&q=80',
      alt: 'Sky Tower modern skyscrapers',
      propertyType: 'Apartments, Penthouse, Residential, Studios',
      location: 'Al Reem Island | Abu Dhabi',
      price: 'From AED 2,000,000',
      bedrooms: 'Studios - 4 Bedrooms',
    },
    {
      id: 3,
      name: 'Al Nada',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
      alt: 'Al Nada apartments with waterway',
      propertyType: 'Apartments',
      location: 'Al Raha Beach, Abu Dhabi',
      price: 'From AED 1,500,000',
      bedrooms: '1-4 Bedrooms',
    },
    {
      id: 4,
      name: 'Al Sana',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80',
      alt: 'Al Sana modern apartment building',
      propertyType: 'Apartments',
      location: 'Al Raha Beach | Abu Dhabi',
      price: 'From AED 1,350,000',
      bedrooms: '1-2 Bedrooms',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll =
        direction === 'left'
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });

      // Update arrow visibility
      setTimeout(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } =
            scrollContainerRef.current;
          setShowLeftArrow(scrollLeft > 0);
          setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
      }, 300);
    }
  };

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Title and Navigation */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-[#2F7A7A]">Discover</span>{' '}
            <span className="text-gray-500">More Projects</span>
          </h2>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className={`p-2 md:p-3 rounded-lg transition-colors ${
                showLeftArrow
                  ? 'bg-[#2F7A7A] hover:bg-[#256666] text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!showLeftArrow}
              aria-label="Previous projects"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className={`p-2 md:p-3 rounded-lg transition-colors ${
                showRightArrow
                  ? 'bg-[#2F7A7A] hover:bg-[#256666] text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!showRightArrow}
              aria-label="Next projects"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Projects Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={() => {
            if (scrollContainerRef.current) {
              const { scrollLeft, scrollWidth, clientWidth } =
                scrollContainerRef.current;
              setShowLeftArrow(scrollLeft > 0);
              setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
            }
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[320px] md:w-[380px] lg:w-[400px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Project Image */}
              <div className="relative w-full h-[240px] md:h-[280px] lg:h-[300px]">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="object-cover"
                  quality={90}
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 380px, 400px"
                />
              </div>

              {/* Project Details */}
              <div className="p-5 md:p-6">
                {/* Project Name */}
                <h3 className="text-xl md:text-2xl font-bold text-[#2F7A7A] mb-4 md:mb-5">
                  {project.name}
                </h3>

                {/* Details List */}
                <div className="space-y-3 md:space-y-4 mb-6">
                  {/* Property Type */}
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#2F7A7A] mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span className="text-sm md:text-base text-gray-600">
                      {project.propertyType}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#2F7A7A] mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm md:text-base text-gray-600">
                      {project.location}
                    </span>
                  </div>

                  {/* Starting Price */}
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#2F7A7A] mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v-1m0 1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm md:text-base text-gray-600">
                      {project.price}
                    </span>
                  </div>

                  {/* Bedrooms */}
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#2F7A7A] mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span className="text-sm md:text-base text-gray-600">
                      {project.bedrooms}
                    </span>
                  </div>
                </div>

                {/* More Details Button */}
                <button className="w-full px-4 py-2 md:py-3 border-2 border-[#2F7A7A] text-[#2F7A7A] font-medium rounded-lg hover:bg-[#2F7A7A] hover:text-white transition-colors text-sm md:text-base">
                  More Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

