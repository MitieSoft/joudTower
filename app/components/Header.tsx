'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import logoWhite from '../assets/images/Logos/logo_white.png';
import albathaLogo from '../assets/images/Logos/albatha-final-logo.png';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', nativeName: 'English' },
    { code: 'ar', nativeName: 'العربية' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href === '#') {
      scrollToTop();
      return;
    }

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 80; // Adjust based on your header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <header
      className={`w-full transition-all duration-300 fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? 'bg-[#792f41]' : 'bg-[#792f41]'
      }`}
    >
      {/* Container for content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-3 lg:py-4 2xl:py-6 flex items-center justify-between relative">
        {/* Left - Logo */}
        <div className="flex items-center gap-2 md:gap-3 z-20">
          <button
            onClick={scrollToTop}
            className="relative h-8 sm:h-10 md:h-12 lg:h-14 w-auto hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Joud Tower Logo"
          >
            <Image
              src={logoWhite}
              alt="Joud Tower Logo"
              width={150}
              height={60}
              className="h-full w-auto object-contain"
              priority
            />
          </button>
        </div>

        {/* Center - Navigation Links (Desktop) */}
        <nav className={`absolute ${isRTL ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} hidden lg:flex items-center gap-8 2xl:gap-12`}>
          <a
            href="#overview"
            onClick={(e) => handleNavClick(e, '#overview')}
            className="text-white text-base md:text-base lg:text-sm xl:text-base 2xl:text-xl font-medium hover:opacity-80 transition-opacity cursor-pointer"
          >
            {t.header.overview}
          </a>
          <a
            href="#floor-plans"
            onClick={(e) => handleNavClick(e, '#floor-plans')}
            className="text-white text-base  md:text-base lg:text-sm xl:text-base 2xl:text-xl font-medium hover:opacity-80 transition-opacity cursor-pointer"
          >
            {t.header.floorPlans}
          </a>
          <a
            href="#pricing"
            onClick={(e) => handleNavClick(e, '#pricing')}
            className="text-white text-base  md:text-lg lg:text-sm xl:text-base 2xl:text-xl font-medium hover:opacity-80 transition-opacity cursor-pointer"
          >
            {t.header.pricing}
          </a>
          <a
            href="#gallery"
            onClick={(e) => handleNavClick(e, '#gallery')}
            className="text-white text-base md:text-lg lg:text-sm xl:text-base 2xl:text-xl font-medium hover:opacity-80 transition-opacity cursor-pointer"
          >
            {t.header.gallery}
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-white text-base md:text-lg lg:text-sm xl:text-base 2xl:text-xl font-medium hover:opacity-80 transition-opacity cursor-pointer"
          >
            {t.header.contactUs}
          </a>
          <a
            href="https://albatha.vercel.app/"
            
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Visit Albatha Real Estate"
          >
            <Image
              src={albathaLogo}
              alt="Albatha Real Estate Logo"
              width={100}
              height={40}
              className="h-6 sm:h-7 md:h-8 lg:h-9 w-auto object-contain"
              priority
            />
          </a>
        </nav>

        {/* Right - Language Toggle, Call Button & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3 z-20">
          {/* Language Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="text-white hover:bg-white/20 hover:text-white transition-all duration-200 rounded-md p-2 flex items-center justify-center"
              aria-label="Change language"
            >
              <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" className="w-4 h-4">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <title>globe</title>
                  <desc>Created with Sketch Beta.</desc>
                  <defs> </defs>
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Icon-Set" transform="translate(-204.000000, -671.000000)" fill="#ffffff">
                      <path d="M231.596,694.829 C229.681,694.192 227.622,693.716 225.455,693.408 C225.75,691.675 225.907,689.859 225.957,688 L233.962,688 C233.783,690.521 232.936,692.854 231.596,694.829 L231.596,694.829 Z M223.434,700.559 C224.1,698.95 224.645,697.211 225.064,695.379 C226.862,695.645 228.586,696.038 230.219,696.554 C228.415,698.477 226.073,699.892 223.434,700.559 L223.434,700.559 Z M220.971,700.951 C220.649,700.974 220.328,701 220,701 C219.672,701 219.352,700.974 219.029,700.951 C218.178,699.179 217.489,697.207 216.979,695.114 C217.973,695.027 218.98,694.976 220,694.976 C221.02,694.976 222.027,695.027 223.022,695.114 C222.511,697.207 221.822,699.179 220.971,700.951 L220.971,700.951 Z M209.781,696.554 C211.414,696.038 213.138,695.645 214.936,695.379 C215.355,697.211 215.9,698.95 216.566,700.559 C213.927,699.892 211.586,698.477 209.781,696.554 L209.781,696.554 Z M208.404,694.829 C207.064,692.854 206.217,690.521 206.038,688 L214.043,688 C214.093,689.859 214.25,691.675 214.545,693.408 C212.378,693.716 210.319,694.192 208.404,694.829 L208.404,694.829 Z M208.404,679.171 C210.319,679.808 212.378,680.285 214.545,680.592 C214.25,682.325 214.093,684.141 214.043,686 L206.038,686 C206.217,683.479 207.064,681.146 208.404,679.171 L208.404,679.171 Z M216.566,673.441 C215.9,675.05 215.355,676.789 214.936,678.621 C213.138,678.356 211.414,677.962 209.781,677.446 C211.586,675.523 213.927,674.108 216.566,673.441 L216.566,673.441 Z M219.029,673.049 C219.352,673.027 219.672,673 220,673 C220.328,673 220.649,673.027 220.971,673.049 C221.822,674.821 222.511,676.794 223.022,678.886 C222.027,678.973 221.02,679.024 220,679.024 C218.98,679.024 217.973,678.973 216.979,678.886 C217.489,676.794 218.178,674.821 219.029,673.049 L219.029,673.049 Z M223.954,688 C223.9,689.761 223.74,691.493 223.439,693.156 C222.313,693.058 221.168,693 220,693 C218.832,693 217.687,693.058 216.562,693.156 C216.26,691.493 216.1,689.761 216.047,688 L223.954,688 L223.954,688 Z M216.047,686 C216.1,684.239 216.26,682.507 216.562,680.844 C217.687,680.942 218.832,681 220,681 C221.168,681 222.313,680.942 223.438,680.844 C223.74,682.507 223.9,684.239 223.954,686 L216.047,686 L216.047,686 Z M230.219,677.446 C228.586,677.962 226.862,678.356 225.064,678.621 C224.645,676.789 224.1,675.05 223.434,673.441 C226.073,674.108 228.415,675.523 230.219,677.446 L230.219,677.446 Z M231.596,679.171 C232.936,681.146 233.783,683.479 233.962,686 L225.957,686 C225.907,684.141 225.75,682.325 225.455,680.592 C227.622,680.285 229.681,679.808 231.596,679.171 L231.596,679.171 Z M220,671 C211.164,671 204,678.163 204,687 C204,695.837 211.164,703 220,703 C228.836,703 236,695.837 236,687 C236,678.163 228.836,671 220,671 L220,671 Z" id="globe"> </path>
                    </g>
                  </g>
                </g>
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isLanguageDropdownOpen && (
              <div className="absolute top-full mt-2 bg-[#792f41] border border-white/20 rounded-lg shadow-lg py-2 min-w-[140px] z-50 right-0">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as 'en' | 'ar')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors duration-200 cursor-pointer ${
                      language === lang.code ? 'text-white font-medium' : 'text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{lang.nativeName}</span>
                      {language === lang.code && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Call Button - Hidden on very small screens, show icon only */}
          <a
            href="tel:80018888"
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 lg:px-5 py-1.5 sm:py-2 md:py-2.5 bg-white text-[#792f41] rounded-full hover:bg-gray-100 transition-colors font-medium text-xs sm:text-sm md:text-base shadow-md"
          >
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="hidden sm:inline">
              {language === 'ar' ? 'اتصل ٨٠٠ ١ ٨٨٨٨' : 'Call 800 1 8888'}
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 w-full bg-[#792f41] shadow-lg z-30">
            <nav className="flex flex-col py-4">
              <a
                href="#overview"
                onClick={(e) => handleNavClick(e, '#overview')}
                className={`text-white px-6 py-3 text-base font-medium hover:bg-[#8a3a51] transition-colors cursor-pointer ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t.header.overview}
              </a>
              <a
                href="#floor-plans"
                onClick={(e) => handleNavClick(e, '#floor-plans')}
                className={`text-white px-6 py-3 text-base font-medium hover:bg-[#8a3a51] transition-colors cursor-pointer ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t.header.floorPlans}
              </a>
              <a
                href="#pricing"
                onClick={(e) => handleNavClick(e, '#pricing')}
                className={`text-white px-6 py-3 text-base font-medium hover:bg-[#8a3a51] transition-colors cursor-pointer ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t.header.pricing}
              </a>
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, '#gallery')}
                className={`text-white px-6 py-3 text-base font-medium hover:bg-[#8a3a51] transition-colors cursor-pointer ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t.header.gallery}
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`text-white px-6 py-3 text-base font-medium hover:bg-[#8a3a51] transition-colors cursor-pointer ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t.header.contactUs}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

