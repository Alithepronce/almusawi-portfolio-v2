'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang, t } from '@/lib/i18n';
import { Globe, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

const mainNavItems = [
  { href: '/', labelKey: 'home' },
  { href: '/apps', labelKey: 'apps' },
  { href: '/zemam', labelKey: 'zemam' },
  { href: '/work', labelKey: 'work' },
  { href: '/cv', labelKey: 'cv' },
  { href: '/contact', labelKey: 'contact' },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { playClick, playHover } = useInteractiveSounds();

  const toggleLanguage = () => {
    playClick();
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-8 sm:py-4">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between flex-nowrap rounded-full border border-black/8 bg-white/80 px-5 py-2.5 backdrop-blur-2xl shadow-sm">
        
        {/* BRAND LOGO */}
        <Link 
          href="/" 
          onClick={playClick}
          className="flex items-center gap-2.5 font-bold text-sm sm:text-base tracking-tight text-[#1d1d1f] shrink-0 transition hover:opacity-80"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1d1d1f] text-white text-xs font-black">
            ZM
          </div>
          <span className="font-extrabold tracking-tight whitespace-nowrap text-[#1d1d1f]">
            {lang === 'ar' ? 'علي موفق' : 'Ali Muwaffaq'}
            <span className="mr-1.5 ml-1.5 text-xs font-normal text-[#86868b]">| زمام</span>
          </span>
        </Link>

        {/* DESKTOP NAV LINKS (Visible on xl screens >= 1280px) */}
        <nav className="hidden xl:flex items-center gap-1 shrink-0">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={playClick}
                onMouseEnter={playHover}
                className={`relative px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors rounded-full ${
                  isActive ? 'text-[#1d1d1f] font-extrabold bg-black/5' : 'text-[#515154] hover:text-[#1d1d1f] hover:bg-black/5'
                }`}
              >
                {t(item.labelKey, lang)}
              </Link>
            );
          })}
        </nav>

        {/* CONTROLS (Lang & Mobile Toggle) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            onMouseEnter={playHover}
            className="flex items-center gap-1.5 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-bold text-[#1d1d1f] transition hover:bg-black/10 whitespace-nowrap"
          >
            <Globe size={13} className="text-[#0066cc]" />
            <span>{t('switchLang', lang)}</span>
          </button>

          {/* Contact Direct CTA Button */}
          <Link
            href="/contact"
            onClick={playClick}
            className="hidden sm:inline-flex items-center gap-1 px-4 py-1 text-xs font-bold rounded-full bg-[#1d1d1f] text-white hover:bg-black transition"
          >
            <span>{lang === 'ar' ? 'تواصل' : 'Contact'}</span>
            <ArrowUpRight size={12} />
          </Link>

          {/* Mobile/Tablet Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-black/5 text-[#1d1d1f] xl:hidden"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY NAVIGATION */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-[1240px] rounded-3xl border border-black/10 bg-white/95 p-5 backdrop-blur-2xl xl:hidden shadow-xl"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-2xl p-3 text-sm font-bold text-center transition ${
                    pathname === item.href 
                      ? 'bg-[#1d1d1f] text-white shadow-md' 
                      : 'text-[#1d1d1f] hover:bg-black/5'
                  }`}
                >
                  {t(item.labelKey, lang)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
