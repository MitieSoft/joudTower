'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

// Main countries with flags and dial codes
const countries = [
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+1', flag: '🇺🇸', name: 'USA' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+968', flag: '🇴🇲', name: 'Oman' },
  { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
  { code: '+962', flag: '🇯🇴', name: 'Jordan' },
  { code: '+20', flag: '🇪🇬', name: 'Egypt' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+86', flag: '🇨🇳', name: 'China' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+82', flag: '🇰🇷', name: 'South Korea' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
  { code: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
  { code: '+32', flag: '🇧🇪', name: 'Belgium' },
  { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
  { code: '+46', flag: '🇸🇪', name: 'Sweden' },
  { code: '+47', flag: '🇳🇴', name: 'Norway' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: '+90', flag: '🇹🇷', name: 'Turkey' },
  { code: '+7', flag: '🇷🇺', name: 'Russia' },
  { code: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: '+52', flag: '🇲🇽', name: 'Mexico' },
  { code: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: '+1', flag: '🇨🇦', name: 'Canada' },
];

export default function ContactSection() {
  const { t, isRTL } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+971',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

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

  // Close country dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };

    if (isCountryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCountryDropdownOpen]);

  const selectedCountry = countries.find(c => c.code === formData.countryCode) || countries[0];

  const handleCountrySelect = (code: string) => {
    setFormData({ ...formData, countryCode: code });
    setIsCountryDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode}${formData.phone}`,
          formType: 'contact',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: data.message || 'Form submitted successfully!' });
        setFormData({ name: '', email: '', phone: '', countryCode: '+971' });
        setTimeout(() => {
          setSubmitMessage(null);
        }, 3000);
      } else {
        setSubmitMessage({ type: 'error', text: data.error || 'Failed to submit form. Please try again.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Network error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {/* Left Panel - Informational Panel with Teal Overlay */}
          <div className={`relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[400px] rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-10' : 'opacity-0 -translate-x-10'}`}>
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
                alt="Modern residential complex"
                fill
                className="object-cover"
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Teal Overlay */}
            <div className="absolute inset-0 bg-[#792f41]/75"></div>
            {/* Text Overlay */}
            <div className={`relative z-10 h-full flex items-center p-6 md:p-8 lg:p-10 ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed font-normal">
                {t.contact.description}
              </p>
            </div>
          </div>

          {/* Right Panel - Contact Form */}
          <div className={`w-full bg-[#decfca] rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-5 sm:py-6 md:py-8 lg:py-10 h-[350px] sm:h-[400px] md:h-[450px] lg:h-[400px] flex flex-col justify-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 -translate-x-10' : 'opacity-0 translate-x-10'}`}>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#792f41] mb-3 sm:mb-4 md:mb-5 text-center">
              {t.contact.title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#792f41] focus:border-transparent text-gray-800 placeholder-gray-400 text-sm md:text-base"
                  placeholder={t.contact.name}
                />
              </div>

              {/* Email Field */}
              <div>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#792f41] focus:border-transparent text-gray-800 placeholder-gray-400 text-sm md:text-base"
                  placeholder={t.contact.email}
                />
              </div>

              {/* Phone Number Field with Country Code Picker */}
              <div className="relative">
                <div ref={countryDropdownRef} className={`absolute ${isRTL ? 'right-2' : 'left-2'} top-1/2 -translate-y-1/2 z-20`}>
                  <button
                    type="button"
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    className="flex items-center gap-1.5 px-2 py-1 bg-transparent hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#792f41]/30"
                  >
                    <span className="text-lg">{selectedCountry.flag}</span>
                    <span className="text-xs md:text-sm font-medium text-gray-700">{selectedCountry.code}</span>
                    <svg className={`w-3 h-3 text-gray-400 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Country Dropdown */}
                  {isCountryDropdownOpen && (
                    <div className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50`}>
                      <div className="py-1">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountrySelect(country.code)}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex items-center gap-3 ${
                              formData.countryCode === country.code ? 'bg-[#792f41]/10' : ''
                            }`}
                          >
                            <span className="text-xl">{country.flag}</span>
                            <span className="text-sm font-medium text-gray-700 flex-1">{country.code}</span>
                            <span className="text-xs text-gray-500">{country.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 ${isRTL ? 'pr-28' : 'pl-28'} bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#792f41] focus:border-transparent text-gray-800 placeholder-gray-400 text-sm md:text-base transition-all`}
                  placeholder={t.contact.phoneNumber}
                />
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <div className={`p-3 rounded-lg text-sm text-center ${
                  submitMessage.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {submitMessage.text}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center mt-2 md:mt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 md:px-10 py-2.5 md:py-3 bg-[#9d552d] hover:bg-[#8a4a26] text-white font-bold rounded-full transition-colors uppercase tracking-wide text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : t.contact.submitNow}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

