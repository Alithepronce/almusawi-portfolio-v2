'use client';

import { createContext, useContext } from 'react';

export type Lang = 'ar' | 'en';

export const translations = {
  // Navigation
  home: { ar: 'الرئيسية', en: 'Home' },
  work: { ar: 'المشاريع', en: 'Projects' },
  cv: { ar: 'السيرة الذاتية', en: 'CV' },
  apps: { ar: 'التطبيقات', en: 'Apps' },
  zemam: { ar: 'مشروع زمام', en: 'Project ZMAM' },
  warraq: { ar: 'وراق', en: 'Warraq' },
  glamora: { ar: 'جلامورا', en: 'Glamora' },
  blog: { ar: 'المدونة', en: 'Blog' },
  contact: { ar: 'تواصل', en: 'Contact' },
  guestbook: { ar: 'سجل الزوار', en: 'Guestbook' },
  links: { ar: 'الروابط', en: 'Links' },

  // Hero
  heroGreeting: { ar: 'مرحباً، أنا', en: "Hi, I'm" },
  heroName: { ar: 'علي موفق', en: 'Ali Muwaffaq' },
  heroRole: { ar: 'معمار أنظمة ومؤسس مشروع زمام الرقمي', en: 'System Architect & Founder of Project ZMAM' },
  heroSlogan: { ar: 'نصنع تكنولوجيا موثوقة تحترم الإنسان وتدوم عبر الأجيال', en: 'Building trustworthy, human-centered technology that endures' },
  heroLocation: { ar: 'بابل، العراق', en: 'Babil, Iraq' },
  heroAvailable: { ar: 'متاح للمشاريع والتحول الرقمي', en: 'Available for architecture & projects' },

  // About & Services
  aboutTitle: { ar: 'عن المنظومة', en: 'About Ecosystem' },
  aboutDesc: {
    ar: 'مبادرة تقنية عراقية تهدف لبناء منتجات رقمية موثوقة، تعتمد البساطة المهيكلة، الخصوصية المطلقة، والتميز الهندسي.',
    en: 'An Iraqi technology initiative dedicated to building trustworthy digital products through structured simplicity, privacy, and engineering excellence.',
  },

  // Apps
  appsTitle: { ar: 'منتجات المنظومة الرقمية', en: 'ZMAM Digital Ecosystem' },
  appsDesc: {
    ar: 'حلول رقمية هندسية مصممة بعناية لتبسيط الحياة اليومية وتمكين المتاجر والمؤسسات',
    en: 'Engineered digital products crafted to simplify daily life and empower institutions',
  },

  // Contact
  contactTitle: { ar: 'تواصل معنا', en: "Let's Connect" },
  contactDesc: { ar: 'استفسر أو ناقش مشروعك القادم مع معمارية المنظومة مباشرة', en: 'Discuss your next digital system directly with our team' },
  sendWhatsApp: { ar: 'تواصل عبر واتساب', en: 'Connect on WhatsApp' },

  // Common Buttons
  scrollDown: { ar: 'مرّر للأسفل', en: 'Scroll Down' },
  backToTop: { ar: 'العودة للأعلى', en: 'Back to Top' },
  loading: { ar: 'جاري التحميل...', en: 'Loading...' },
  readMore: { ar: 'استكشف المزيد', en: 'Explore More' },
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

