'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

export default function ContactSection() {
  const { t, isRTL } = useLanguage();
  const countryCodeSelectRef = useRef<HTMLSelectElement>(null);
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
          ...formData,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

              {/* Phone Number Field */}
              <div className="relative">
                <div className={`absolute ${isRTL ? 'right-2' : 'left-2'} top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-10`}>
                  {/* UAE Flag Icon */}
                  <svg
                    className="w-5 h-5 flex-shrink-0 "
                    viewBox="0 0 6 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                  >
                    {/* Vertical red stripe on left */}
                    <rect width="1" height="4" fill="#FF0000" />
                    {/* Horizontal green stripe */}
                    <rect x="1" width="5" height="1.333" fill="#009639" />
                    {/* Horizontal white stripe */}
                    <rect x="1" y="1.333" width="5" height="1.333" fill="#FFFFFF" />
                    {/* Horizontal black stripe */}
                    <rect x="1" y="2.667" width="5" height="1.333" fill="#000000" />
                  </svg>
                  <select
                    ref={countryCodeSelectRef}
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="bg-transparent text-gray-800 text-xs md:text-sm font-semibold focus:outline-none cursor-pointer appearance-none border-none focus:ring-0  hover:text-[#792f41] transition-colors"
                    style={{
                      backgroundImage: 'none',
                    }}
                  >
                    <option value="+971">+971</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+966">+966</option>
                  </select>
                  
                </div>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 ${isRTL ? 'pr-20' : 'pl-20'} bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#792f41] focus:border-transparent text-gray-800 placeholder-gray-400 text-sm md:text-base transition-all`}
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

