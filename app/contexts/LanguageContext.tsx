'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  // Header
  header: {
    overview: string;
    floorPlans: string;
    pricing: string;
    gallery: string;
    contactUs: string;
  };
  // Hero
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  // Overview
  overview: {
    pricesStartFrom: string;
    downloadBrochure: string;
    getFreeConsultation: string;
    beyondLimits: string;
    spaceAwaits: string;
    description1: string;
    description2: string;
    description3: string;
    viewCatalogue: string;
  };
  // Amenities
  amenities: {
    title: string;
    functionalGym: string;
    sauna: string;
    swimmingPool: string;
    padelCourt: string;
    runningTrack: string;
    bbqArea: string;
    kidsPlayArea: string;
    multipurposeHall: string;
    cafe: string;
    prayerRoom: string;
    kindergarten: string;
    retailShop: string;
  };
  // Payment Plan
  paymentPlan: {
    title: string;
    downPayment: string;
    duringConstruction: string;
    onHandover: string;
    moreDetails: string;
    weAreHere: string;
    getFreeConsultation: string;
  };
  // Gallery
  gallery: {
    title: string;
    external: string;
    internal: string;
  };
  // Floor Plans
  floorPlans: {
    title: string;
  };
  // Contact
  contact: {
    title: string;
    name: string;
    email: string;
    phoneNumber: string;
    submitNow: string;
    description: string;
  };
  // Footer
  footer: {
    description: string;
    quickLinks: string;
    contactUs: string;
    address: string;
    phone: string;
    email: string;
    stayUpdated: string;
    newsletterDescription: string;
    enterEmail: string;
    subscribe: string;
    privacyPolicy: string;
    termsOfService: string;
    cookiePolicy: string;
    accessibility: string;
    legalNotice: string;
    copyright: string;
  };
  // Registration/Specification
  specification: {
    title: string;
    totalStoreys: string;
    structureDetails: string;
    residentialFloors: string;
    bedroom2: string;
    bedroom3: string;
    bedroom3Garden: string;
    bedroom4: string;
    bedroom4Garden: string;
    bedroom4Duplex: string;
    penthouse: string;
  };
  // Project Facts
  projectFacts: {
    title: string;
    project: string;
    facts: string;
    developer: string;
    developerValue: string;
    propertyType: string;
    propertyTypeValue: string;
    totalStoreys: string;
    totalStoreysValue: string;
    areaSize: string;
    areaSizeValue: string;
    startingPrices: string;
    startingPricesValue: string;
    paymentPlan: string;
    paymentPlanValue: string;
    expectedHandover: string;
    expectedHandoverValue: string;
    whoCanBuy: string;
    whoCanBuyValue: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    header: {
      overview: 'Overview',
      floorPlans: 'Floor Plans',
      pricing: 'Pricing',
      gallery: 'Gallery',
      contactUs: 'Contact Us',
    },
    hero: {
      title: 'JOUD TOWER',
      subtitle: 'A Dream Designed For You',
      description: 'Apartments, Penthouse &nbsp;|&nbsp; 1- 4 Bedrooms &nbsp;|&nbsp; Abu Dhabi ',
    },
    overview: {
      pricesStartFrom: 'Prices Starts From',
      downloadBrochure: 'Download Brochure',
      getFreeConsultation: 'Get A Free Consultation',
      beyondLimits: 'Beyond Limits,',
      spaceAwaits: 'Space Awaits.',
      description1: 'Joud Tower represents the pinnacle of luxury living in the heart of the city. This stunning residential tower offers unparalleled comfort, modern amenities, and breathtaking views of the skyline.',
      description2: 'Designed with meticulous attention to detail, Joud Tower combines contemporary architecture with premium finishes to create an exceptional living experience for discerning residents.',
      description3: 'Wake up to breathtaking panoramic views of the city skyline and coastline. Every apartment in Joud Tower is designed to maximize natural light and provide stunning vistas that change throughout the day. From sunrise to sunset, experience the beauty of the city from your own private sanctuary.',
      viewCatalogue: 'View Catalogue',
    },
    amenities: {
      title: 'Amenities & Facilities',
      functionalGym: 'Functional Gym',
      sauna: 'Sauna',
      swimmingPool: 'Swimming Pool',
      padelCourt: 'Padel Court',
      runningTrack: 'Running Track',
      bbqArea: 'BBQ Area',
      kidsPlayArea: 'Kids Play Area',
      multipurposeHall: 'Multipurpose Hall',
      cafe: 'Cafe',
      prayerRoom: 'Prayer Room',
      kindergarten: 'Kindergarten',
      retailShop: 'Retail Shop',
    },
    paymentPlan: {
      title: 'Payment Plan',
      downPayment: 'Down Payment',
      duringConstruction: 'During Construction',
      onHandover: 'On Handover',
      moreDetails: 'More Details About Payment Plan',
      weAreHere: 'We are here to answer all your inquiries',
      getFreeConsultation: 'Get A Free Consultation',
    },
    gallery: {
      title: 'Explore Our Galleries',
      external: 'Exterior',
      internal: 'Interior',
    },
    floorPlans: {
      title: 'Floor Plans',
    },
    contact: {
      title: "Don't Hesitate to Get in Touch with us",
      name: 'Name *',
      email: 'Email *',
      phoneNumber: 'Phone Number *',
      submitNow: 'SUBMIT NOW',
      description: "Joud Tower, with its unrivalled location, ultra-premium interiors, and luxurious amenities and facilities, is a lasting asset that will deliver steady capital growth. Enjoy the best of both worlds: a beautiful, luxurious home that also serves as a lifelong investment.",
    },
    footer: {
      description: 'Joud Tower represents the pinnacle of luxury living in the heart of the city. This stunning residential tower offers unparalleled comfort, modern amenities, and breathtaking views.',
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us',
      address: 'P.O. Box 1145- Sharjah, Floor 23, Albatha tower, Corniche Street, Sharjah, UAE',
      phone: '+971 4 371 1300',
      email: 'info@batha.ae',
      stayUpdated: 'Stay Updated',
      newsletterDescription: 'Subscribe to our newsletter for the latest news, project updates, and investment opportunities.',
      enterEmail: 'Enter your email address',
      subscribe: 'Subscribe',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      cookiePolicy: 'Cookie Policy',
      accessibility: 'Accessibility',
      legalNotice: 'Legal Notice',
      copyright: '© 2025 Joud Tower. All rights reserved.',
    },
    specification: {
      title: 'Joud Tower Specification',
      totalStoreys: 'Total of 55 Storeys',
      structureDetails: '1 Basement + Ground Floor + 5 Podium Levels for parking and services',
      residentialFloors: '48 floors residential at its highest point',
      bedroom2: '2-bedroom',
      bedroom3: '3-bedroom',
      bedroom3Garden: '3-bedroom + private garden at the podium level',
      bedroom4: '4-bedroom',
      bedroom4Garden: '4-bedroom + private garden at the podium level',
      bedroom4Duplex: '4-bedroom duplex on the floor from 45 upwards (skyvilla)',
      penthouse: 'Penthouse: 5 bedrooms, bespoke with private pool.',
    },
    projectFacts: {
      title: 'Project Facts',
      project: 'Project',
      facts: 'Facts',
      developer: 'Developer',
      developerValue: 'Albatha Real Estate',
      propertyType: 'Property Type',
      propertyTypeValue: '2-5 BR Apartments & Penthouses',
      totalStoreys: 'Total Storeys',
      totalStoreysValue: '55 Storeys',
      areaSize: 'Area Size',
      areaSizeValue: 'From 968 Sq. Ft',
      startingPrices: 'Starting Prices',
      startingPricesValue: 'AED 3,600,000',
      paymentPlan: 'Payment Plan',
      paymentPlanValue: '10% / 55% / 35%',
      expectedHandover: 'Expected Handover',
      expectedHandoverValue: 'Under Construction',
      whoCanBuy: 'WHO CAN BUY',
      whoCanBuyValue: 'Freehold For All Nationalities',
    },
  },
  ar: {
    header: {
      overview: 'نظرة عامة',
      floorPlans: 'المخططات',
      pricing: 'الأسعار',
      gallery: 'المعرض',
      contactUs: 'اتصل بنا',
    },
    hero: {
      title: 'برج الجود',
      subtitle: 'حلم مصمم خصيصاً لك',
      description: 'يقدم برج الجود من ألبتة العقارية منازل فاخرة تجمع كل ما ترغب فيه أنت وعائلتك في موقع مذهل في قلب المجتمعات النابضة بالحياة، مجهز بمرافق من الدرجة الأولى، يتميز بميزات صديقة للعائلة والاهتمام بالتفاصيل. اختبر حياة مليئة بالفرح والسعادة والراحة والراحة في مساحات حصرية مصممة خصيصاً لك.',
    },
    overview: {
      pricesStartFrom: 'تبدأ الأسعار من',
      downloadBrochure: 'تحميل الكتيب',
      getFreeConsultation: 'احصل على استشارة مجانية',
      beyondLimits: 'ما وراء الحدود،',
      spaceAwaits: 'المساحة في انتظارك.',
      description1: 'يمثل برج الجود قمة العيش الفاخر في قلب المدينة. يوفر هذا البرج السكني المذهل راحة لا مثيل لها ومرافق حديثة وإطلالات خلابة على الأفق.',
      description2: 'مصمم بعناية فائقة بالتفاصيل، يجمع برج الجود بين العمارة المعاصرة واللمسات النهائية الفاخرة لخلق تجربة معيشة استثنائية للسكان المميزين.',
      description3: 'استيقظ على إطلالات بانورامية خلابة على أفق المدينة والساحل. كل شقة في برج الجود مصممة لتعظيم الضوء الطبيعي وتوفير مناظر خلابة تتغير على مدار اليوم. من شروق الشمس إلى غروبها، اختبر جمال المدينة من ملاذك الخاص.',
      viewCatalogue: 'عرض الكتالوج',
    },
    amenities: {
      title: 'المرافق والخدمات',
      functionalGym: 'صالة ألعاب رياضية',
      sauna: 'ساونا',
      swimmingPool: 'حمام سباحة',
      padelCourt: 'ملعب بادل',
      runningTrack: 'مسار للجري',
      bbqArea: 'منطقة شواء',
      kidsPlayArea: 'منطقة لعب للأطفال',
      multipurposeHall: 'قاعة متعددة الأغراض',
      cafe: 'مقهى',
      prayerRoom: 'مصلى',
      kindergarten: 'روضة أطفال',
      retailShop: 'متجر تجزئة',
    },
    paymentPlan: {
      title: 'خطة الدفع',
      downPayment: 'دفعة أولى',
      duringConstruction: 'أثناء البناء',
      onHandover: 'عند التسليم',
      moreDetails: 'المزيد من التفاصيل حول خطة الدفع',
      weAreHere: 'نحن هنا للإجابة على جميع استفساراتك',
      getFreeConsultation: 'احصل على استشارة مجانية',
    },
    gallery: {
      title: 'معرض الوسائط',
      external: 'خارجي',
      internal: 'داخلي',
    },
    floorPlans: {
      title: 'المخططات',
    },
    contact: {
      title: 'لا تتردد في التواصل معنا',
      name: 'الاسم *',
      email: 'البريد الإلكتروني *',
      phoneNumber: 'رقم الهاتف *',
      submitNow: 'إرسال الآن',
      description: 'برج الجود، بموقعه الذي لا نظير له والمساحات الداخلية الفاخرة للغاية والمرافق الفاخرة، هو أصل دائم سيحقق نموًا رأس ماليًا مستقرًا. استمتع بأفضل ما في العالمين: منزل جميل وفاخر يعمل أيضًا كاستثمار مدى الحياة.',
    },
    footer: {
      description: 'يمثل برج الجود قمة العيش الفاخر في قلب المدينة. يوفر هذا البرج السكني المذهل راحة لا مثيل لها ومرافق حديثة وإطلالات خلابة.',
      quickLinks: 'روابط سريعة',
      contactUs: 'اتصل بنا',
      address: 'صندوق بريد 1145 - الشارقة، الطابق 23، برج ألبتة، شارع الكورنيش، الشارقة، الإمارات العربية المتحدة',
      phone: '971 4 371 1300+',
      email: 'info@batha.ae',
      stayUpdated: 'ابق على اطلاع',
      newsletterDescription: 'اشترك في نشرتنا الإخبارية للحصول على آخر الأخبار وتحديثات المشاريع وفرص الاستثمار.',
      enterEmail: 'أدخل عنوان بريدك الإلكتروني',
      subscribe: 'اشترك',
      privacyPolicy: 'سياسة الخصوصية',
      termsOfService: 'شروط الخدمة',
      cookiePolicy: 'سياسة ملفات تعريف الارتباط',
      accessibility: 'إمكانية الوصول',
      legalNotice: 'إشعار قانوني',
      copyright: '© 2025 برج الجود. جميع الحقوق محفوظة.',
    },
    specification: {
      title: 'مواصفات برج الجود',
      totalStoreys: 'إجمالي 55 طابق',
      structureDetails: '1 طابق سفلي + الطابق الأرضي + 5 مستويات منصة للوقوف والخدمات',
      residentialFloors: '48 طابق سكني في أعلى نقطة',
      bedroom2: 'شقة بغرفتين نوم',
      bedroom3: 'شقة بثلاث غرف نوم',
      bedroom3Garden: 'شقة بثلاث غرف نوم + حديقة خاصة على مستوى المنصة',
      bedroom4: 'شقة بأربع غرف نوم',
      bedroom4Garden: 'شقة بأربع غرف نوم + حديقة خاصة على مستوى المنصة',
      bedroom4Duplex: 'شقة دوبلكس بأربع غرف نوم من الطابق 45 فما فوق (سكاي فيلا)',
      penthouse: 'بنتهاوس: 5 غرف نوم، مخصص مع مسبح خاص.',
    },
    projectFacts: {
      title: 'حقائق المشروع',
      project: 'المشروع',
      facts: 'حقائق',
      developer: 'المطور',
      developerValue: 'ألبتة العقارية',
      propertyType: 'نوع العقار',
      propertyTypeValue: 'شقق 2-5 غرف نوم وبنتهاوس',
      totalStoreys: 'إجمالي الطوابق',
      totalStoreysValue: '55 طابق',
      areaSize: 'حجم المساحة',
      areaSizeValue: 'من 968 قدم مربع',
      startingPrices: 'الأسعار البدائية',
      startingPricesValue: '3,600,000 درهم إماراتي',
      paymentPlan: 'خطة الدفع',
      paymentPlanValue: '10% / 55% / 35%',
      expectedHandover: 'التسليم المتوقع',
      expectedHandoverValue: 'قيد الإنشاء',
      whoCanBuy: 'من يمكنه الشراء',
      whoCanBuyValue: 'ملكية حرة لجميع الجنسيات',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Apply RTL to document
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: language === 'ar',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

