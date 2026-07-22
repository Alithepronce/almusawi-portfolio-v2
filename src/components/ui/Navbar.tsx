'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLang, t } from '@/lib/i18n';
import { Globe, Menu, X, Sun, Moon, Volume2, VolumeX, Crown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

const navItems = [
  { href: '/', labelKey: 'home' },
  { href: '/work', labelKey: 'work' },
  { href: '/apps', labelKey: 'apps' },
  { href: '/cv', labelKey: 'cv' },
  { href: '/office', labelKey: 'office' },
  { href: '/blog', labelKey: 'blog' },
  { href: '/guestbook', labelKey: 'guestbook' },
  { href: '/links', labelKey: 'links' },
  { href: '/contact', labelKey: 'contact' },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAudioEnabled = useStore((s: any) => s.isAudioEnabled);
  const toggleAudio = useStore((s: any) => s.toggleAudio);
  const { playClick, playHover, playTheme } = useInteractiveSounds();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  const toggleLanguage = () => {
    playClick();
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const handleAudioToggle = () => {
    playClick();
    toggleAudio();
  };

  const handleThemeToggle = () => {
    playTheme();
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-8 sm:py-4">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between rounded-full border border-[var(--gold)]/20 bg-black/60 px-6 py-3.5 backdrop-blur-2xl shadow-2xl">
        {/* BRAND LOGO */}
        <Link 
          href="/" 
          onClick={playClick}
          className="flex items-center gap-3 font-extrabold text-base tracking-tight text-[var(--text)] transition hover:opacity-90"
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[var(--gold)]/40 p-0.5 shadow-md">
            <Image src="/logo.png" alt="Ali Al-Musawi Logo" fill className="object-cover rounded-full" />
          </div>
          <span className="hidden sm:inline font-bold text-sm gold-luxury-text">
            {lang === 'ar' ? 'علي الموسوي' : 'Ali Al-Musawi'}
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={playClick}
                onMouseEnter={playHover}
                className={`relative px-3.5 py-1.5 text-xs font-bold transition-colors rounded-full ${
                  isActive ? 'text-[var(--gold-light)]' : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
                }`}
              >
                {t(item.labelKey, lang)}
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/25"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CONTROLS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Toggle */}
          <button
            onClick={handleAudioToggle}
            onMouseEnter={playHover}
            aria-label="Toggle Audio"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/20 bg-white/5 text-[var(--text-secondary)] transition hover:border-[var(--gold)]/40 hover:text-[var(--text)]"
          >
            {isAudioEnabled ? <Volume2 size={15} className="text-[var(--gold-light)]" /> : <VolumeX size={15} />}
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={handleThemeToggle}
              onMouseEnter={playHover}
              aria-label="Toggle Theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/20 bg-white/5 text-[var(--text-secondary)] transition hover:border-[var(--gold)]/40 hover:text-[var(--text)]"
            >
              {isDark ? <Sun size={15} className="text-amber-300" /> : <Moon size={15} className="text-indigo-300" />}
            </button>
          )}

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            onMouseEnter={playHover}
            className="flex items-center gap-1.5 rounded-full border border-[var(--gold)]/20 bg-white/5 px-3 py-1.5 text-xs font-bold text-[var(--text-secondary)] transition hover:border-[var(--gold)]/40 hover:text-[var(--text)]"
          >
            <Globe size={13} />
            <span>{t('switchLang', lang)}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/20 bg-white/5 text-[var(--text)] lg:hidden"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY NAVIGATION */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-3 rounded-3xl border border-[var(--gold)]/25 bg-black/95 p-6 backdrop-blur-2xl lg:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-xl p-3 text-sm font-bold transition ${
                    pathname === item.href ? 'bg-[var(--gold)]/15 text-[var(--gold-light)]' : 'text-[var(--text-secondary)] hover:bg-white/5'
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
