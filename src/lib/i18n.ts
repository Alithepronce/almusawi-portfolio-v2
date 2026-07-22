'use client';

import { createContext, useContext } from 'react';

export type Lang = 'ar' | 'en';

export const translations = {
  // Navigation
  home: { ar: 'الرئيسية', en: 'Home' },
  work: { ar: 'أعمالي', en: 'Work' },
  cv: { ar: 'السيرة الذاتية', en: 'CV' },
  office: { ar: 'مكتب الموسوي', en: 'Al-Musawi Office' },
  apps: { ar: 'التطبيقات', en: 'Apps' },
  blog: { ar: 'المدونة', en: 'Blog' },
  contact: { ar: 'تواصل', en: 'Contact' },
  guestbook: { ar: 'سجل الزوار', en: 'Guestbook' },
  links: { ar: 'الروابط', en: 'Links' },
  officeTitle: { ar: 'مكتب الموسوي للطباعة والحلول البرمجية', en: 'Al-Musawi Office for Printing & Software Solutions' },

  // Hero
  heroGreeting: { ar: 'مرحباً، أنا', en: "Hi, I'm" },
  heroName: { ar: 'علي الموسوي', en: 'Ali Al-Musawi' },
  heroRole: { ar: 'مطور أتمتة AI ومدير منتجات', en: 'AI Automation Developer & Product Manager' },
  heroLocation: { ar: 'بابل، العراق', en: 'Babil, Iraq' },
  heroAvailable: { ar: 'متاح للمشاريع والتعاون', en: 'Available for projects & collaboration' },

  // About & Services
  aboutTitle: { ar: 'من أنا', en: 'About Me' },
  aboutDesc: {
    ar: 'مطور متخصص في الأتمتة والذكاء الاصطناعي، أبني منتجات رقمية تحل مشاكل حقيقية وتزيد من السرعة والإنتاجية.',
    en: 'Developer specialized in automation & AI, building digital products that solve real problems and boost productivity.',
  },

  // Apps
  appsTitle: { ar: 'تطبيقاتنا والحلول البرمجية', en: 'Our Apps & Software Solutions' },
  appsDesc: {
    ar: 'مجموعة التطبيقات الاحترافية المصممة بعناية فائقة لتلبية احتياجات المتاجر والمستخدمين',
    en: 'A collection of professional apps designed with extreme precision for businesses and users',
  },

  // Contact
  contactTitle: { ar: 'لنعمل معاً!', en: "Let's Work Together!" },
  contactDesc: { ar: 'ابدأ محادثة حول مشروعك القادم عبر الواتساب أو البريد الإلكتروني', en: 'Start a conversation about your next project via WhatsApp or Email' },
  sendWhatsApp: { ar: 'إرسال عبر واتساب', en: 'Send via WhatsApp' },

  // Common Buttons
  scrollDown: { ar: 'مرّر للأسفل', en: 'Scroll Down' },
  backToTop: { ar: 'العودة للأعلى', en: 'Back to Top' },
  loading: { ar: 'جاري التحميل...', en: 'Loading...' },
  readMore: { ar: 'اقرأ المزيد', en: 'Read More' },
  downloadCV: { ar: 'تحميل السيرة الذاتية', en: 'Download CV' },
  switchLang: { ar: 'EN', en: 'عربي' },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  return translations[key]?.[lang] || key;
}

export interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  dir: 'rtl' | 'ltr';
}

export const LangContext = createContext<LangContextType>({
  lang: 'ar',
  setLang: () => {},
  dir: 'rtl',
});

export const useLang = () => useContext(LangContext);
