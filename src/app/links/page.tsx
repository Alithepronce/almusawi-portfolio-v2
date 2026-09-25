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
  MessageSquare,
  ArrowUpRight,
} from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

// lucide-react dropped brand icons; this is the GitHub mark as a same-API component.
const Github = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

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
