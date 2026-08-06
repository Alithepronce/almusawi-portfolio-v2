'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import PageShell from '@/components/ui/PageShell';
import { Smartphone, ArrowUpRight, Crown, Activity, Layers, Printer } from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

const appsCatalog = [
  {
    slug: 'zemam',
    href: '/zemam',
    icon: Layers,
    name: { ar: 'منظومة زمام (ZMAM Core)', en: 'ZMAM Intelligence Core' },
    tagline: { ar: 'المنظومة الرقمية الأم والنواة الهندسية', en: 'Core Digital Architecture & AI Ecosystem' },
    desc: {
      ar: 'البنية التحتية المركزية الموزعة التي توحد المعايير البرمجية، وتدير أتمتة الذكاء الاصطناعي بدقة عالية.',
      en: 'Central distributed digital architecture unifying software standards and managing complex AI automation.'
    },
    color: '#6366f1',
    tags: ['Next.js', 'Supabase', 'Python', 'AI Engine']
  },
  {
    slug: 'warraq',
    href: '/warraq',
    icon: Printer,
    name: { ar: 'منصة الوَرَّاق (Warraq)', en: 'Warraq Printing Platform' },
    tagline: { ar: 'نظام إدارة المطابع الذكية والمستندات', en: 'Smart Print Shop & Document Logistics' },
    desc: {
      ar: 'منظومة شاملة تتيح للمطابع والمكتبات إدارة الطلبات عبر لوحات Kanban الفورية وتوليد فواتير PDF مخصصة.',
      en: 'Comprehensive ecosystem enabling print shops and libraries to manage orders via Kanban boards and PDF invoicing.'
    },
    color: '#d97706',
    tags: ['Flutter', 'Dart', 'Supabase', 'PDF Engine']
  },

  {
    slug: 'glamora',
    href: '/glamora',
    icon: Crown,
    name: { ar: 'تطبيق غلامورا (Glamora POS)', en: 'Glamora POS & Inventory' },
    tagline: { ar: 'نظام إدارة كاشير ومخزون محلات التجميل', en: 'Luxury Cosmetic POS & Inventory System' },
    desc: {
      ar: 'نظام متكامل يجمع بين الكاشير السريع، التزامن السحابي الحي عبر Supabase، إدارة الرواتب HR، وحماية بصمة الوجه Face ID.',
      en: 'Luxury POS & inventory system combining fast cashier features, Supabase Realtime sync, HR payroll engine, and Face ID security.'
    },
    color: '#e11d48',
    tags: ['SwiftUI', 'Supabase', 'Face ID', 'iOS']
  }
];

export default function AppsPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto pb-24 pt-4">
        <section className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-bold text-[#1d1d1f] mb-4 shadow-sm"
          >
            <Smartphone size={14} className="text-[#0066cc]" />
            {isRtl ? 'كتالوج المنتجات والحلول' : 'Apps & Solutions Catalog'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold sm:text-6xl tracking-tight text-[#1d1d1f] mb-4"
          >
            {isRtl ? 'منتجات منظومة زمام' : 'ZMAM Product Ecosystem'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-base text-[#515154] leading-relaxed"
          >
            {isRtl
              ? 'تصفح العروض التفاعلية، الخصائص الهندسية، ودليل التشغيل والسياسات لكافة تطبيقات المنظومة.'
              : 'Explore interactive showcases, architectural features, and official documentation for all ecosystem products.'}
          </motion.p>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {appsCatalog.map((app, index) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={app.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onMouseEnter={playHover}
                className="apple-studio-card p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-[#1d1d1f] border border-black/8">
                      <Icon size={24} />
                    </div>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      {app.tags.map((t) => (
                        <span key={t} className="px-2.5 py-0.5 rounded-full border border-black/8 bg-black/5 text-[11px] text-[#515154] font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1d1d1f] mb-1">
                    {isRtl ? app.name.ar : app.name.en}
                  </h3>
                  <p className="text-xs font-bold mb-4 text-[#0066cc]">
                    {isRtl ? app.tagline.ar : app.tagline.en}
                  </p>
                  <p className="text-sm text-[#515154] leading-relaxed mb-8">
                    {isRtl ? app.desc.ar : app.desc.en}
                  </p>
                </div>

                <Link
                  href={app.href}
                  onClick={playClick}
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-xs bg-[#1d1d1f] text-white hover:bg-black transition shadow-md"
                >
                  <span>{isRtl ? 'عرض المواصفات والواجهات' : 'Explore Specs & Interfaces'}</span>
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
