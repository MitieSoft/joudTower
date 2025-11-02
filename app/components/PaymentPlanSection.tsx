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

export default function PaymentPlanSection() {
  const { t, isRTL } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+971'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
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
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 md:py-4 lg:py-5 bg-[#9d552d] hover:bg-[#8a4a26] text-white font-medium rounded-full transition-colors text-sm sm:text-base md:text-lg whitespace-nowrap"
              >
                {t.paymentPlan.moreDetails}
              </button>
            </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Backdrop with animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-[#792f41]/40 backdrop-blur-md animate-backdropFade"></div>
          
          {/* Modal Content with unique styling and animations */}
          <div 
            className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl md:rounded-[2rem] shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border-2 border-[#792f41]/10 animate-modalSlideIn"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(121, 47, 65, 0.1)'
            }}
          >
            {/* Close Button with unique styling */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 z-10 shadow-lg hover:scale-110 hover:rotate-90"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Body */}
            <div className="p-6 md:p-8 pt-8 md:pt-10">
              {/* Title with unique styling */}
              <div className="mb-6 md:mb-8 pr-8 animate-slideDown">
                <h3 className="text-base md:text-lg font-bold text-[#792f41] uppercase mb-2 tracking-wide" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
                  Please fill out the form below
                </h3>
                <p className="text-sm md:text-base text-gray-600 font-medium" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
                  We will get in touch with you shortly.
                </p>
                {/* Decorative line under title */}
                <div className="mt-3 h-0.5 w-20 bg-gradient-to-r from-[#792f41] to-transparent"></div>
              </div>

              {/* Form */}
              <form 
                onSubmit={async (e) => {
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
                        formType: 'payment-plan',
                      }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                      setSubmitMessage({ type: 'success', text: data.message || 'Form submitted successfully!' });
                      setFormData({ name: '', email: '', phone: '', countryCode: '+971' });
                      setTimeout(() => {
                        setIsModalOpen(false);
                        setSubmitMessage(null);
                      }, 2000);
                    } else {
                      setSubmitMessage({ type: 'error', text: data.error || 'Failed to submit form. Please try again.' });
                    }
                  } catch (error) {
                    setSubmitMessage({ type: 'error', text: 'Network error. Please try again later.' });
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="space-y-4 md:space-y-5"
              >
                {/* Name Field with animation */}
                <div className="animate-slideInLeft" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#792f41]/30 focus:border-[#792f41] transition-all duration-300 text-base bg-gray-50 hover:bg-white hover:border-gray-300"
                    style={{ fontFamily: 'Univers, Arial, sans-serif' }}
                    required
                  />
                </div>

                {/* Email Field with animation */}
                <div className="animate-slideInLeft" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#792f41]/30 focus:border-[#792f41] transition-all duration-300 text-base bg-gray-50 hover:bg-white hover:border-gray-300"
                    style={{ fontFamily: 'Univers, Arial, sans-serif' }}
                    required
                  />
                </div>

                {/* Phone Number Field with Country Code Picker */}
                <div className="relative animate-slideInLeft" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
                    Phone Number
                  </label>
                  <div className="relative">
                    {/* Country Code Selector */}
                    <div ref={countryDropdownRef} className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="flex items-center gap-2 px-2 py-1.5 bg-transparent hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#792f41]/30"
                      >
                        <span className="text-xl">{selectedCountry.flag}</span>
                        <span className="text-sm font-medium text-gray-700">{selectedCountry.code}</span>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Country Dropdown */}
                      {isCountryDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50">
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
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-28 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#792f41]/30 focus:border-[#792f41] transition-all duration-300 text-base bg-gray-50 hover:bg-white hover:border-gray-300"
                      style={{ fontFamily: 'Univers, Arial, sans-serif' }}
                      required
                    />
                  </div>
                </div>

                {/* Submit Message */}
                {submitMessage && (
                  <div className={`p-3 rounded-lg text-sm ${
                    submitMessage.type === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {submitMessage.text}
                  </div>
                )}

                {/* Submit Button with unique styling and animation */}
                <div className="flex justify-end pt-4 animate-slideInUp" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 md:px-10 py-3 md:py-3.5 bg-[#9d552d] hover:bg-[#8a4a26] text-white font-bold rounded-xl uppercase tracking-wide transition-all duration-300 text-sm md:text-base shadow-lg hover:shadow-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                    style={{ fontFamily: 'Univers, Arial, sans-serif' }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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

