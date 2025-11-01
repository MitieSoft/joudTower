'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="w-full space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2F7A7A] leading-tight">
              Fahid Beach Residences
            </h2>

            <div className="space-y-5 md:space-y-6 text-gray-700 leading-relaxed">
              <p className="text-base md:text-lg">
                Aldar presents <strong>Fahid Beach Terraces</strong>, a refined
                waterfront collection designed by architect Koichi Takada on Fahid Island.
                Low-rise silhouettes step towards the water in a clean, light-filled design
                that blends island life with city proximity.
              </p>

              <p className="text-base md:text-lg">
                Deep terraces frame sea and sky. Generous glass panels invite breeze and
                daylight. A wide array of resident facilities await: rooftop and garden pools,
                wellness spa, gym, cinema, squash court, co-working lounges, splash zones for
                children, pet-care facilities, and a café-lined promenade of Coral Drive.
              </p>

              <p className="text-base md:text-lg">
                The project is committed to sustainability and well-being, earning Fitwel
                certification, LEED Platinum pre-status, and Estidama 3 Pearl rating. Well-being
                is sketched by the sea; and every glance reminds you of it.
              </p>
            </div>

            <button className="px-6 md:px-8 py-3 md:py-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors text-sm md:text-base">
              Get More Details
            </button>
          </div>

          {/* Right Column - Image */}
          <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
              alt="Fahid Beach Residences - Luxurious Residential Development"
              fill
              className="object-cover"
              quality={90}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

