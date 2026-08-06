'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import PageShell from '@/components/ui/PageShell';
import { Shield, HeartHandshake, Lock, Cpu, Printer, Activity, Crown, Layers, ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

const corePillars = [
  {
    icon: Shield,
    title: { ar: 'الثقة والأمانة المستدامة', en: 'Trust & Long-Term Stewardship' },
    desc: {
      ar: 'الثقة ليست شعاراً تسويقياً؛ بل نتاج مئات القرارات الهندسية والأخلاقية المستمرة.',
      en: 'Trust is not a slogan; it is the outcome of hundreds of consistent engineering choices.',
    },
  },
  {
    icon: Lock,
    title: { ar: 'الخصوصية بحكم التصميم', en: 'Privacy by Architecture' },
    desc: {
      ar: 'البيانات ملك للمستخدم. أنظمتنا تعمل محلياً بامتياز وبشفافية دون جمع بلا مبرر.',
      en: 'Data belongs to users. Systems operate local-first with complete transparency.',
    },
  },
  {
    icon: Cpu,
    title: { ar: 'التميز الهندسي الهادئ', en: 'Quiet Engineering Excellence' },
    desc: {
      ar: 'إزالة التعقيد غير الضروري حتى تختفي التكنولوجيا خلف تجربة سلسة تمكّن الإنسان.',
      en: 'Removing unnecessary complexity so technology seamlessly empowers human capability.',
    },
  },
  {
    icon: HeartHandshake,
    title: { ar: 'البساطة المهيكلة', en: 'Structured Simplicity' },
    desc: {
      ar: 'البساطة تتطلب انضباطاً. كل مكون في النظام يجب أن يبرر وجوده بفائدة حقيقية.',
      en: 'Simplicity demands discipline. Every component must justify its existence with real value.',
    },
  },
];

const ecosystemApps = [
  {
    slug: 'zemam',
    title: { ar: 'منظومة زمام الذكية', en: 'ZMAM Intelligence Core' },
    tag: { ar: 'النواة والذكاء', en: 'Core & AI' },
    desc: {
      ar: 'المنظومة الرقمية الأم التي تدير بروتوكولات الأتمتة المعقدة والذكاء الاصطناعي وتضمن الاستمرارية.',
      en: 'The core digital architecture orchestrating complex AI automation and long-term continuity.',
    },
    href: '/apps',
  },
  {
    slug: 'warraq',
    title: { ar: 'منصة الوَرَّاق', en: 'Warraq Publishing' },
    tag: { ar: 'الطباعة والنشر', en: 'Document Ecosystem' },
    desc: {
      ar: 'منظومة رقمية شاملة لإدارة المطابع الذكية، النشر، وتداول المستندات والوثائق الرسمية بسرية ودقة.',
      en: 'Comprehensive digital ecosystem for smart printing, publishing, and secure document management.',
    },
    href: '/warraq',
  },

  {
    slug: 'glamora',
    title: { ar: 'نظام جلامورا POS', en: 'Glamora POS & HR' },
    tag: { ar: 'إدارة المتاجر الفاخرة', en: 'Luxury Retail & HR' },
    desc: {
      ar: 'نظام إدارة كاشير ومخزون فاخر لمحلات التجميل مع تزامن سحابي حقيقي وحماية بصمة الوجه Face ID.',
      en: 'Luxury POS & inventory system with real-time Supabase sync and Face ID authentication.',
    },
    href: '/glamora',
  },
];

export default function ZemamPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto pb-24 pt-4">
        {/* HERO SECTION */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-bold text-[#1d1d1f] mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#6366f1]" />
            {isRtl ? 'دستور وهيئة مشروع زمام' : 'Project ZMAM Constitution'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold sm:text-6xl tracking-tight text-[#1d1d1f] mb-6"
          >
            {isRtl ? 'منظومة' : 'Project'}{' '}
            <span className="text-[#6366f1]">{isRtl ? 'مشروع زمام' : 'ZMAM Ecosystem'}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-[#515154] leading-relaxed mb-8"
          >
            {isRtl
              ? 'مبادرة تقنية متكاملة تهدف لبناء بنية رقمية موثوقة تحترم الخصوصية والتصميم الإنساني البسيط وتدوم عبر الأجيال.'
              : 'An integrated technology initiative designed to build a trusted, human-first digital ecosystem that endures across generations.'}
          </motion.p>
        </section>

        {/* CORE PILLARS GRID */}
        <section className="mb-20">
          <div className="mb-10 pb-6 border-b border-black/10 text-center sm:text-right">
            <h2 className="text-3xl font-extrabold text-[#1d1d1f] tracking-tight mb-2">
              {isRtl ? 'المبادئ والأعمدة الإستراتيجية' : 'Strategic Pillars'}
            </h2>
            <p className="text-sm text-[#86868b]">
              {isRtl ? 'دستور يوجّه جميع القرارات الهندسية والبرمجية' : 'Guiding principles behind all engineering and architecture decisions'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {corePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="apple-studio-card p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-[#1d1d1f]">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1d1d1f]">{pillar.title[lang]}</h3>
                  </div>
                  <p className="text-sm text-[#515154] leading-relaxed">{pillar.desc[lang]}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ECOSYSTEM APPS SHOWCASE */}
        <section className="mb-20">
          <div className="mb-10 pb-6 border-b border-black/10 text-center sm:text-right">
            <h2 className="text-3xl font-extrabold text-[#1d1d1f] tracking-tight mb-2">
              {isRtl ? 'ركائز المنظومة الرقمية' : 'Ecosystem Digital Pillars'}
            </h2>
            <p className="text-sm text-[#86868b]">
              {isRtl ? 'تطبيقات تخدم أبعاد الحياة والعمل بتكامل تام' : 'Digital applications serving core operational and human needs'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ecosystemApps.map((app, i) => (
              <div key={app.slug} className="apple-studio-card p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-black/5 text-[#515154]">
                      {app.tag[lang]}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">{app.title[lang]}</h3>
                  <p className="text-sm text-[#515154] leading-relaxed mb-6">{app.desc[lang]}</p>
                </div>
                <Link
                  href={app.href}
                  onClick={playClick}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0066cc] hover:underline"
                >
                  <span>{isRtl ? 'استكشف الصفحة المخصصة' : 'Explore Dedicated Page'}</span>
                  {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FOUNDER'S DECLARATION QUOTE */}
        <section className="apple-studio-card p-10 text-center bg-white relative overflow-hidden">
          <div className="max-w-3xl mx-auto">
            <BookOpen size={36} className="mx-auto text-[#6366f1] mb-4" />
            <blockquote className="text-xl sm:text-2xl font-bold text-[#1d1d1f] leading-snug mb-6">
              {isRtl
                ? '«التكنولوجيا لا تكتسب قيمتها لمجرد استعراض القدرة الهندسية؛ بل تبدأ قيمتها عندما تحسّن حياة الإنسان بهدوء وبلا تشتيت.»'
                : '"Technology has no value when it exists merely to demonstrate technical capability. Its purpose begins only when it quietly improves human life."'}
            </blockquote>
            <cite className="not-italic text-xs font-bold text-[#515154]">
              {isRtl ? '— من الإعلان التأسيسي لدستور مشروع زمام (علي موفق)' : '— From Project ZMAM Founding Declaration (Ali Muwaffaq)'}
            </cite>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
