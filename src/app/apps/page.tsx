'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import PageShell from '@/components/ui/PageShell';
import { Smartphone, Sparkles, ArrowUpRight, Crown, Activity, Globe, FileText } from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

const appsCatalog = [
  {
    slug: 'glamora',
    href: '/glamora',
    icon: Crown,
    name: { ar: 'تطبيق غلامورا (Glamora POS)', en: 'Glamora POS & Inventory' },
    tagline: { ar: 'النظام الفاخر لإدارة محلات الكوزمتكس والتجميل', en: 'Luxury Cosmetic POS & Inventory System' },
    desc: {
      ar: 'نظام متكامل يجمع بين نقطة البيع الكاشير السريعة، التزامن السحابي الحي عبر Supabase، إدارة الرواتب HR، وحماية بصمة الوجه Face ID.',
      en: 'Integrated system combining fast cashier POS, Supabase Realtime cloud sync, HR payroll engine, and Face ID security.'
    },
    color: '#E11D48',
    tags: ['SwiftUI', 'Supabase', 'Face ID', 'iOS']
  },
  {
    slug: 'khuta',
    href: '/khuta',
    icon: Activity,
    name: { ar: 'تطبيق خُطى (GlassStep)', en: 'Khuta App (GlassStep)' },
    tagline: { ar: 'تطبيق تتبع الخطوات الزجاجي والتكتيكي', en: 'Tactical Liquid Glass Step Tracker' },
    desc: {
      ar: 'تطبيق أيفون فائق الدقة بتصميم زجاجي نقي لتتبع الخطوات، الأنشطة الحركية، أنظمة الترطيب، والأوسمة دون استهلاك البطارية ومع سرية مطلقة 100%.',
      en: 'Ultra-precise iOS step tracker featuring Liquid Glass design, tactical activity modes, hydration algorithms, and badges with 100% offline privacy.'
    },
    color: '#06B6D4',
    tags: ['SwiftUI', 'CoreMotion', 'Apple Health', 'iOS']
  },
  {
    slug: 'zemam',
    href: '/zemam',
    icon: Globe,
    name: { ar: 'متصفح زِمام (Zemam Browser)', en: 'Zemam Privacy Browser' },
    tagline: { ar: 'متصفح الخصوصية والتحكم السريع', en: 'Fast & Secure Privacy Browser' },
    desc: {
      ar: 'متصفح ويب سريع وآمن يوفر تجربة تصفح هادئة، منع التتبع، وتخصيص كامل لمحركات البحث والروابط السريعة.',
      en: 'Fast and secure web browser delivering smooth browsing, tracker blocking, and custom quick links.'
    },
    color: '#3B82F6',
    tags: ['SwiftUI', 'WebKit', 'Privacy', 'iOS']
  },
  {
    slug: 'warraq',
    href: '/warraq',
    icon: FileText,
    name: { ar: 'نظام الوَرَّاق (Warraq Printing System)', en: 'Warraq Printing Platform' },
    tagline: { ar: 'منصة الطباعة المدرسية والجامعية المباشرة', en: 'School & Academic Printing Platform' },
    desc: {
      ar: 'منصة طباعة شاملة تتيح للطلاب والأساتذة رفـع المستندات، حساب تكلفة الطباعة، ومتابعة التوصيل محلياً.',
      en: 'Comprehensive printing platform allowing students and instructors to upload docs, compute costs, and track delivery.'
    },
    color: '#D97706',
    tags: ['Next.js', 'Supabase', 'Printing', 'Web App']
  }
];

export default function AppsPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();

  return (
    <PageShell>
      <section className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-[var(--gold-light)] mb-4"
        >
          <Smartphone size={14} />
          {isRtl ? 'كتالوج التطبيقات والحلول' : 'Apps & Solutions Catalog'}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-extrabold sm:text-5xl"
        >
          {isRtl ? 'تطبيقاتنا المبتكرة' : 'Our Professional Apps'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-base text-[var(--text-secondary)]"
        >
          {isRtl
            ? 'تصفح العروض التفاعلية، السياسات الرسمية، والدعم الفني لكافة تطبيقاتنا المتاحة.'
            : 'Browse interactive showcases, official policies, and technical support for all our available applications.'}
        </motion.p>
      </section>

      <div className="grid gap-8 md:grid-cols-2 pb-24">
        {appsCatalog.map((app, index) => {
          const Icon = app.icon;
          return (
            <motion.div
              key={app.slug}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: `${app.color}20`, color: app.color, border: `1px solid ${app.color}40` }}
                  >
                    <Icon size={28} />
                  </div>
                  <div className="flex gap-2">
                    {app.tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-[var(--text-secondary)] font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2">
                  {isRtl ? app.name.ar : app.name.en}
                </h3>
                <p className="text-xs font-semibold mb-4 text-[var(--gold-light)]">
                  {isRtl ? app.tagline.ar : app.tagline.en}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-7 mb-6">
                  {isRtl ? app.desc.ar : app.desc.en}
                </p>
              </div>

              <Link
                href={app.href}
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-full font-bold text-sm text-white transition hover:scale-[1.02] shadow-lg"
                style={{ background: `linear-gradient(135deg, ${app.color} 0%, ${app.color}cc 100%)` }}
              >
                {isRtl ? 'عرض التطبيق والمزايا والسياسات' : 'Explore App & Features'}
                <ArrowUpRight size={18} />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </PageShell>
  );
}
