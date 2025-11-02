'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logoWhite from '../assets/images/Logos/logo_white.png';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t, isRTL, language } = useLanguage();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription here
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const navigationLinks = {
    quickLinks: [
      { name: t.header.overview, href: '#overview' },
      { name: t.header.floorPlans, href: '#floor-plans' },
      { name: t.header.pricing, href: '#pricing' },
      { name: t.header.gallery, href: '#gallery' },
      { name: t.header.contactUs, href: '#contact' },
    ],
  };

  const footerNavLinks = [
    { name: t.header.overview, href: '#overview' },
    { name: t.header.floorPlans, href: '#floor-plans' },
    { name: t.header.pricing, href: '#pricing' },
    { name: t.header.gallery, href: '#gallery' },
    { name: t.header.contactUs, href: '#contact' },
  ];

  const legalLinks = [
    { name: t.footer.privacyPolicy, href: '#privacy-policy' },
    { name: t.footer.termsOfService, href: '#terms-of-service' },
    { name: t.footer.cookiePolicy, href: '#cookie-policy' },
    { name: t.footer.accessibility, href: '#accessibility' },
    { name: t.footer.legalNotice, href: '#legal-notice' },
  ];

  return (
    <footer className="bg-[#792f41] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-12 sm:py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className={`mb-6 sm:mb-8 ${isRTL ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
              <div className="mb-4">
                <div className="relative h-10 sm:h-12 md:h-14 lg:h-16 w-auto mx-auto md:mx-0 inline-block">
                  <Image
                    src={logoWhite}
                    alt="Joud Tower Logo"
                    width={200}
                    height={80}
                    className="h-full w-auto object-contain"
                    priority
                  />
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-md mx-auto md:mx-0 text-sm sm:text-base mt-4" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
                {t.footer.description}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {navigationLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
              {t.footer.contactUs}
            </h4>
            <div className="space-y-3 sm:space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0 mt-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
                  {t.footer.address}
                </span>
              </div>
              
              {/* Phone */}
              <div className="flex items-center gap-3 text-gray-300 text-sm sm:text-base">
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+97143711300" className="hover:text-white transition-colors" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
                  {language === 'ar' ? '+٩٧١ ٤ ٣٧١ ١٣٠٠' : t.footer.phone}
                </a>
              </div>
              
              {/* Email */}
              <div className="flex items-center gap-3 text-gray-300 text-sm sm:text-base">
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@batha.ae" className="hover:text-white transition-colors" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
                  {t.footer.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-[#792f41] rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-12 sm:mb-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
              {t.footer.stayUpdated}
            </h3>
            <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
              {t.footer.newsletterDescription}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.enterEmail}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#792f41] border border-purple-300/30 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors text-sm sm:text-base"
                required
              />
              <button 
                type="submit"
                className="bg-white text-[#792f41] hover:bg-gray-100 font-medium transition-all duration-300 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2"
                style={{ fontFamily: 'Univers, Arial, sans-serif' }}
              >
                {t.footer.subscribe}
                <svg
                  className="w-4 h-4"
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
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Copyright - Left */}
            <div className={`${isRTL ? 'text-center lg:text-right' : 'text-center lg:text-left'}`}>
              <span className="text-gray-300 text-xs sm:text-sm" style={{ fontFamily: 'Univers, Arial, sans-serif' }}>
                {t.footer.copyright}
              </span>
            </div>

            {/* Legal Links - Center */}
            <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 w-full md:w-auto">
              {legalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-300 whitespace-nowrap text-xs sm:text-sm"
                  style={{ fontFamily: 'Univers, Arial, sans-serif' }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Social Media Links - Right */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Facebook */}
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#8a4a66] hover:bg-[#9d5a76] flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.047 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Twitter */}
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#8a4a66] hover:bg-[#9d5a76] flex items-center justify-center transition-colors duration-300"
                aria-label="Twitter"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#8a4a66] hover:bg-[#9d5a76] flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 2H8a6 6 0 00-6 6v8a6 6 0 006 6h8a6 6 0 006-6V8a6 6 0 00-6-6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16.5 7.5h.01"
                  />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#8a4a66] hover:bg-[#9d5a76] flex items-center justify-center transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#8a4a66] hover:bg-[#9d5a76] flex items-center justify-center transition-colors duration-300"
                aria-label="YouTube"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
