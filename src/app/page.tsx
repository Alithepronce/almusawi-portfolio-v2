'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import {
  Layers,
  Printer,
  Activity,
  Crown,
  Smartphone,
  Shield,
  Lock,
  Cpu,
  HeartHandshake,
  ArrowLeft,
  ArrowRight,
  Mail,
  Phone,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

const containerClass = 'mx-auto w-full max-w-[1240px] px-4 sm:px-8 lg:px-12';

const ecosystemPillars = [
  {
    slug: 'store',
    title: { ar: 'متجر زمام ستور', en: 'ZMAM Store for iOS' },
    subtitle: { ar: 'تطبيقات iOS الموقعة والتوزيع السحابي', en: 'Signed iOS Apps & Enterprise Signing' },
    desc: {
      ar: 'منظومة متطورة لتوقيع وتثبيت تطبيقات iOS الموقعة بدون جلبريك مع توثيق آلي للـ UDID وتوزيع سحابي عبر R2 ومحرك zsign.',
      en: 'Enterprise iOS signed apps store featuring zero-jailbreak installs, automated UDID enrollment, and Cloudflare R2 OTA distribution.',
    },
    color: '#0f766e',
    icon: Smartphone,
    href: '/store',
    tag: { ar: 'متجر الآيفون', en: 'iOS Store' },
  },
  {
    slug: 'zemam',
    title: { ar: 'منظومة زمام الذكية', en: 'ZMAM Intelligence Core' },
    subtitle: { ar: 'الذكاء الاصطناعي وهيكلية النواة', en: 'AI & Core Architecture' },
    desc: {
      ar: 'البنية التحتية المركزية الموزعة التي تؤتمت النظم المعقدة وتضمن استمرارية الذكاء المؤسسي.',
      en: 'Central distributed digital architecture orchestrating complex AI automation and institutional reliability.',
    },
    color: '#6366f1',
    icon: Layers,
    href: '/zemam',
    tag: { ar: 'النواة الرئيسية', en: 'Core Engine' },
  },
  {
    slug: 'warraq',
    title: { ar: 'منصة الوَرَّاق', en: 'Warraq Publishing' },
    subtitle: { ar: 'إدارة المستندات والطباعة الذكية', en: 'Smart Document & Print Logistics' },
    desc: {
      ar: 'منظومة شاملة تتيح للمطابع إدارة الطلبات عبر لوحات تفاعلية وتوليد الفواتير الفورية وتداول المستندات.',
      en: 'Complete digital ecosystem for smart print shops, publishing, and document logistics.',
    },
    color: '#d97706',
    icon: Printer,
    href: '/warraq',
    tag: { ar: 'منظومة الطباعة', en: 'Print Logistics' },
  },
  {
    slug: 'glamora',
    title: { ar: 'نظام جلامورا POS', en: 'Glamora POS & Inventory' },
    subtitle: { ar: 'إدارة المتاجر والمخزون الفاخر', en: 'Luxury Retail POS & HR Engine' },
    desc: {
      ar: 'نظام كاشير ومخزون فاخر لمحلات التجميل والكوزمتكس مع حماية بصمة الوجه Face ID وتزامن سحابي حي Supabase.',
      en: 'Luxury cosmetic POS & inventory system with Face ID authentication and real-time Supabase sync.',
    },
    color: '#e11d48',
    icon: Crown,
    href: '/glamora',
    tag: { ar: 'الكاشير الفاخر', en: 'Luxury POS' },
  },
];

const zdlBeliefs = [
  {
    icon: Shield,
    title: { ar: 'الثقة تُكتسب بالأفعال', en: 'Trust is Earned' },
    desc: { ar: 'تنشأ الثقة من خلال الموثوقية الشفافة والقرارات البرمجية والأخلاقية المستمرة.', en: 'Trust develops through reliable engineering and transparent decisions.' },
  },
  {
    icon: Lock,
    title: { ar: 'الخصوصية حق أساسي', en: 'Privacy is Fundamental' },
    desc: { ar: 'البيانات ملك للمستخدم. أنظمتنا تعمل محلياً بامتياز ودون جمع معلومات بلا مبرر.', en: 'Respecting user data is an ethical obligation, not a marketing feature.' },
  },
  {
    icon: Cpu,
    title: { ar: 'الجودة تبقى أطول من السرعة', en: 'Quality Outlives Speed' },
    desc: { ar: 'إطلاق البرمجيات بسرعة قيمة فقط عندما تضمن الهندسة العالية الجودة والاستمرارية.', en: 'Uncompromising engineering outlasts shortcuts and temporary popularity.' },
  },
  {
    icon: HeartHandshake,
    title: { ar: 'البساطة تتطلب انضباطاً', en: 'Simplicity Requires Discipline' },
    desc: { ar: 'التصميم البسيط هو أقصى درجات النضج الهندسي لتقليل الجهد الذهني على الإنسان.', en: 'Simple products reduce cognitive load through precise, disciplined engineering.' },
  },
];

export default function Home() {
  const { lang } = useLang();
  const { playHover, playClick } = useInteractiveSounds();
  const isArabic = lang === 'ar';

  return (
    <main className="relative overflow-x-hidden pb-24 pt-32 studio-grid-pattern">
      {/* HERO SECTION - APPLE STUDIO ARCHITECTURAL STYLE */}
      <section className={`${containerClass} relative z-10 mb-24`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center"
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          <div className="max-w-4xl flex flex-col items-center">
            {/* Status Pill */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-bold text-[#1d1d1f] shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#0066cc]" />
              <span>{isArabic ? 'منظومة مشروع زمام الرقمية | Project ZMAM' : 'Project ZMAM Digital Ecosystem'}</span>
            </motion.div>

            {/* Main Title */}
            <h1 className="studio-headline text-[clamp(2.8rem,7vw,5.6rem)] mb-6">
              {isArabic ? (
                <>
                  نصنع <span className="text-[#0066cc]">تكنولوجيا موثوقة</span> تحترم الإنسان
                </>
              ) : (
                <>
                  Crafting <span className="text-[#0066cc]">Trustworthy Technology</span> That Endures
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-base sm:text-xl text-[#515154] leading-relaxed mb-10">
              {isArabic
                ? 'منظومة رقمية متكاملة تعتمد البساطة المهيكلة، الخصوصية المطلقة، والتميز الهندسي لتطوير تطبيقات وحلول تدوم وتخدم الإنتاجية.'
                : 'An institutional digital ecosystem built on structured simplicity, absolute privacy, and engineering craftsmanship.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apps"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#1d1d1f] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-black shadow-lg"
              >
                <span>{isArabic ? 'استكشف منتجات المنظومة' : 'Explore Digital Apps'}</span>
                {isArabic ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </Link>
              <Link
                href="/zemam"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-black/15 bg-white px-8 py-3.5 text-sm font-bold text-[#1d1d1f] transition hover:bg-black/5 shadow-sm"
              >
                <span>{isArabic ? 'دستور وهيئة زمام' : 'ZMAM Constitution'}</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ECOSYSTEM SHOWCASE GRID */}
      <section className={`${containerClass} relative z-10 mb-28`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-black/10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0066cc] mb-1">
              {isArabic ? 'ركائز المنظومة' : 'ECOSYSTEM PILLARS'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
              {isArabic ? 'تطبيقات مصممة للتميز والاستمرارية' : 'Applications Engineered for Excellence'}
            </h2>
          </div>
          <Link href="/apps" className="mt-4 md:mt-0 text-xs font-bold text-[#0066cc] hover:underline flex items-center gap-1">
            <span>{isArabic ? 'عرض كتالوج المنتجات الكامل' : 'View Full Apps Catalog'}</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ecosystemPillars.map((app, index) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={app.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  href={app.href}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="apple-studio-card group block h-full p-8 sm:p-10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-[#1d1d1f] border border-black/8">
                        <Icon size={24} />
                      </div>
                      <span className="px-3.5 py-1 text-xs font-bold rounded-full bg-black/5 text-[#515154] border border-black/8">
                        {app.tag[lang]}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] mb-3 group-hover:text-[#0066cc] transition">
                      {app.title[lang]}
                    </h3>
                    <p className="text-sm text-[#515154] leading-relaxed mb-8">
                      {app.desc[lang]}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0066cc]">
                    <span>{isArabic ? 'عرض مواصفات التطبيق' : 'Explore Application Specs'}</span>
                    <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CORE BELIEFS GRID */}
      <section className={`${containerClass} relative z-10 mb-28`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="mb-12 pb-6 border-b border-black/10 text-center sm:text-right">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#86868b] mb-1">
            {isArabic ? 'الفلسفة والدستور' : 'CORE DOCTRINE'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
            {isArabic ? 'مبادئ راسخة يقاد بها العمل' : 'Principles Guiding Every Decision'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {zdlBeliefs.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="apple-studio-card p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 text-[#1d1d1f] mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-bold text-[#1d1d1f] mb-2">{b.title[lang]}</h3>
                <p className="text-xs text-[#515154] leading-relaxed">{b.desc[lang]}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className={`${containerClass} relative z-10`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="apple-studio-card p-10 sm:p-16 text-center bg-white relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight mb-4">
              {isArabic ? 'هل ترغب في بناء نظام رقمي موثوق؟' : 'Ready to Build an Enduring System?'}
            </h2>
            <p className="text-sm sm:text-base text-[#515154] leading-relaxed mb-8">
              {isArabic
                ? 'تواصل مباشرة مع معمارية المنظومة لتحديد المتطلبات وبناء أنظمة وتطبيقات تتوافق مع أعلى معايير الجودة والخصوصية.'
                : 'Connect directly with our architecture team to design and deploy software engineered for longevity.'}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/contact"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1d1d1f] text-white font-bold text-sm shadow-md hover:bg-black transition"
              >
                <Mail size={16} />
                <span>{isArabic ? 'تواصل معنا الآن' : 'Start a Conversation'}</span>
              </Link>
              <a
                href="https://wa.me/9647767625001"
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-black/15 bg-white text-[#1d1d1f] font-bold text-sm transition hover:bg-black/5"
              >
                <Phone size={16} />
                <span>WhatsApp Direct</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`${containerClass} relative z-10 mt-24`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="flex flex-col gap-4 border-t border-black/10 py-8 text-xs text-[#86868b] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} علي موفق · منظومة مشروع زمام (Project ZMAM Ecosystem)
          </p>
          <div className="flex items-center gap-6">
            <Link href="/zemam" className="transition hover:text-[#1d1d1f]">
              {isArabic ? 'دستور زمام' : 'ZMAM Doctrine'}
            </Link>
            <a href="https://github.com/Alithepronce" target="_blank" rel="noreferrer" className="transition hover:text-[#1d1d1f]">
              GitHub
            </a>
            <a href="https://wa.me/9647767625001" target="_blank" rel="noreferrer" className="transition hover:text-[#1d1d1f]">
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
