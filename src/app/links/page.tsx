'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import PageShell from '@/components/ui/PageShell';
import { useLang } from '@/lib/i18n';
import {
  Layers,
  Printer,
  Crown,
  Smartphone,
  Github,
  MessageSquare,
  ArrowUpRight,
} from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

const linkItems = [
  {
    title: { ar: 'متجر زمام ستور (ZMAM iOS Store)', en: 'ZMAM Store (Signed iOS Platform)' },
    subtitle: { ar: 'تطبيقات iOS الموقعة وتوثيق الـ UDID بدون جلبريك', en: 'Enterprise Signed iOS Store & UDID Engine' },
    href: '/store',
    color: '#0f766e',
    icon: Smartphone,
    isExternal: false,
  },
  {
    title: { ar: 'دستور مشروع زمام (ZMAM Doctrine)', en: 'Project ZMAM Constitution' },
    subtitle: { ar: 'الإعلان التأسيسي والأعمدة الاستراتيجية', en: 'Founding Declaration & Pillars' },
    href: '/zemam',
    color: '#6366f1',
    icon: Layers,
    isExternal: false,
  },
  {
    title: { ar: 'منصة الوَرَّاق (Warraq Publishing)', en: 'Warraq Print & Document Ecosystem' },
    subtitle: { ar: 'إدارة المطابع الذكية ونشر المستندات', en: 'Smart Print Shop & Document Logistics' },
    href: '/warraq',
    color: '#d97706',
    icon: Printer,
    isExternal: false,
  },
  {
    title: { ar: 'تطبيق جلامورا (Glamora POS)', en: 'Glamora POS & HR System' },
    subtitle: { ar: 'نظام إدارة كاشير ومخزون المحلات بـ Face ID', en: 'Luxury Retail POS & HR Engine' },
    href: '/glamora',
    color: '#e11d48',
    icon: Crown,
    isExternal: false,
  },
  {
    title: { ar: 'مستودع الكود (GitHub)', en: 'GitHub Repository' },
    subtitle: { ar: 'المشاريع الحرة وتجارب التطوير', en: 'Open Source Projects & Systems' },
    href: 'https://github.com/Alithepronce',
    color: '#0066cc',
    icon: Github,
    isExternal: true,
  },
  {
    title: { ar: 'المحادثات المباشرة (WhatsApp)', en: 'WhatsApp Direct Contact' },
    subtitle: { ar: 'تواصل مباشر وسريع', en: 'Direct Instant Messaging' },
    href: 'https://wa.me/9647767625001',
    color: '#10b981',
    icon: MessageSquare,
    isExternal: true,
  },
];

export default function LinksPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto pb-24 pt-4">
        {/* AVATAR & HEADER */}
        <section className="text-center mb-12">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-[#1d1d1f] text-white flex items-center justify-center shadow-lg font-black text-2xl">
            ZM
          </div>

          <h1 className="text-3xl font-extrabold text-[#1d1d1f] mb-1">
            {isRtl ? 'علي موفق' : 'Ali Muwaffaq'}
          </h1>
          <p className="text-sm text-[#0066cc] font-bold mb-2">
            {isRtl ? 'مؤسس ومعمار أنظمة — منظومة مشروع زمام' : 'Founder & System Architect — Project ZMAM Ecosystem'}
          </p>
          <p className="text-xs text-[#515154] max-w-md mx-auto">
            {isRtl ? 'بابل، العراق • تكنولوجيا موثوقة تحترم الإنسان' : 'Babil, Iraq • Building Trustworthy Technology'}
          </p>
        </section>

        {/* LINK CARDS */}
        <div className="space-y-4">
          {linkItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onMouseEnter={playHover}
              >
                {item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClick}
                    className="apple-studio-card p-5 flex items-center justify-between group transition"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center bg-black/5 text-[#1d1d1f] border border-black/8 shrink-0"
                      >
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#1d1d1f] group-hover:text-[#0066cc] transition">
                          {item.title[lang]}
                        </h3>
                        <p className="text-xs text-[#515154]">{item.subtitle[lang]}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-[#86868b] group-hover:text-[#0066cc] transition shrink-0" />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={playClick}
                    className="apple-studio-card p-5 flex items-center justify-between group transition"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center bg-black/5 text-[#1d1d1f] border border-black/8 shrink-0"
                      >
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#1d1d1f] group-hover:text-[#0066cc] transition">
                          {item.title[lang]}
                        </h3>
                        <p className="text-xs text-[#515154]">{item.subtitle[lang]}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-[#86868b] group-hover:text-[#0066cc] transition shrink-0" />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
