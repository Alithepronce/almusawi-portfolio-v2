'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Lang, LangContext } from '@/lib/i18n';

export default function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('app-lang') as Lang;
    if (saved === 'ar' || saved === 'en') {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('app-lang', l);
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <LangContext.Provider value={{ lang, setLang, dir }}>
      {children}
    </LangContext.Provider>
  );
}
