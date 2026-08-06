'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import PageShell from '@/components/ui/PageShell';
import { useLang } from '@/lib/i18n';
import {
  Printer,
  FileText,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

const warraqFeatures = [
  {
    title: { ar: 'إدارة طلبات الطباعة الفورية (Kanban)', en: 'Live Kanban Order Management' },
    desc: {
      ar: 'لوحة تحكم ذكية للمطابع لإدارة سحب الوثائق، خيارات التجليد والتغليف، وتتبع حالة التوصيل لحظة بلحظة.',
      en: 'Realtime order tracking for print shops, handling paper specs, binding choices, and delivery updates.'
    },
    icon: Printer,
    color: '#d97706',
  },
  {
    title: { ar: 'حساب التكلفة التلقائي وتحليل الملفات', en: 'Automated PDF Cost Engine' },
    desc: {
      ar: 'خوارزمية حساب أوتوماتيكية تقرأ عدد صفحات المستند (PDF) ونوع الورق وجهة الطباعة لتوليد الفاتورة فورياً.',
      en: 'Automatic page counting, color mode detection, and real-time instant quote computation.'
    },
    icon: FileText,
    color: '#0891b2',
  },
  {
    title: { ar: 'تداول المستندات الرسمية الموثوقة', en: 'Verified Document Logistics' },
    desc: {
      ar: 'نظام آمن لنقل المستندات بين الجامعات والطلاب والمطابع المعتمدة بخصوصية تامة وتشفير عالي.',
      en: 'Encrypted document sharing between academic institutions, students, and authorized print hubs.'
    },
    icon: ShieldCheck,
    color: '#6366f1',
  },
  {
    title: { ar: 'إشعارات الطلبات والفواتير المخصصة', en: 'Instant Notifications & PDF Receipts' },
    desc: {
      ar: 'توليد وصولات فواتير رسمية مخصصة برقم تسلسلي، وتنبيهات مباشرة للعميل عند جاهزية الطلب.',
      en: 'Generate serial-numbered PDF invoices and send instant notifications when orders are ready.'
    },
    icon: Zap,
    color: '#10b981',
  },
];

export default function WarraqPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto pb-24 pt-4">
        {/* HERO BANNER */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-bold text-[#1d1d1f] mb-6 shadow-sm"
          >
            <Printer size={14} className="text-[#d97706]" />
            {isRtl ? 'منصة النشر والطباعة الذكية | Warraq Ecosystem' : 'Smart Print & Document Logistics'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold sm:text-6xl tracking-tight text-[#1d1d1f] mb-6"
          >
            {isRtl ? 'منصة' : 'Platform'}{' '}
            <span className="text-[#d97706]">
              {isRtl ? 'الوَرَّاق (Warraq)' : 'Warraq Publishing'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-[#515154] leading-relaxed mb-8"
          >
            {isRtl
              ? 'المنظومة الرقمية الشاملة لإدارة المطابع الذكية، النشر، وتداول المستندات والوثائق الرسمية بسرية ودقة هندسية عالية.'
              : 'Complete digital ecosystem for smart print shops, academic publishing, and secure document logistics.'}
          </motion.p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/warraq/site"
              onClick={playClick}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1d1d1f] text-white font-bold text-sm shadow-md hover:bg-black transition"
            >
              <span>{isRtl ? 'دخول موقع وراق المستقل' : 'Enter Live Warraq Site'}</span>
              <ExternalLink size={16} />
            </Link>
            <Link
              href="/contact"
              onClick={playClick}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-black/15 bg-white text-[#1d1d1f] font-bold text-sm transition hover:bg-black/5"
            >
              <span>{isRtl ? 'ربط مطبعة جديدة' : 'Connect Your Print Shop'}</span>
            </Link>
          </div>
        </section>

        {/* FEATURES BENTO GRID */}
        <section className="mb-20">
          <div className="mb-10 pb-6 border-b border-black/10 text-center sm:text-right">
            <h2 className="text-3xl font-extrabold text-[#1d1d1f] tracking-tight mb-2">
              {isRtl ? 'خصائص ومميزات منصة وراق' : 'Warraq Engine Capabilities'}
            </h2>
            <p className="text-sm text-[#86868b]">
              {isRtl ? 'أدوات هندسية مصممة لأصحاب المطابع والمؤسسات التعليمية' : 'Architected for print shop owners and academic institutions'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {warraqFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={playHover}
                  className="apple-studio-card p-8 sm:p-10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl mb-6 bg-black/5 text-[#1d1d1f] border border-black/8">
                      <Icon size={24} style={{ color: f.color }} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3">{f.title[lang]}</h3>
                    <p className="text-sm text-[#515154] leading-relaxed mb-6">{f.desc[lang]}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                    <CheckCircle2 size={16} />
                    <span>{isRtl ? 'مستقر ومتكامل 100%' : 'Fully Integrated Core'}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* FOOTER ATTRIBUTION */}
        <section className="apple-studio-card p-10 text-center bg-white relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3">
              {isRtl ? 'جزء من منظومة مشروع زمام' : 'Part of Project ZMAM Ecosystem'}
            </h3>
            <p className="text-xs text-[#515154] leading-relaxed mb-6">
              {isRtl
                ? 'تم تصميم وبناء منصة الورّاق بواسطة علي موفق كإحدى الركائز التشغيلية لمنظومة زمام للحلول البرمجية.'
                : 'Warraq Platform was designed and built by Ali Muwaffaq as a primary operational pillar of ZMAM Ecosystem.'}
            </p>
            <Link href="/zemam" className="text-xs font-bold text-[#0066cc] hover:underline">
              {isRtl ? 'عرض ركائز دستور زمام ←' : 'View ZMAM Doctrine →'}
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
