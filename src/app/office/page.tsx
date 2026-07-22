'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import PageShell from '@/components/ui/PageShell';
import { Printer, Code, ShieldCheck, Sparkles, Phone, ArrowUpRight, BookOpen, Layers } from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

export default function OfficePage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto pb-24">
        <section className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-[var(--gold-light)] mb-4"
          >
            <Printer size={14} />
            {isRtl ? 'مكتب الموسوي للطباعة والحلول البرمجية' : 'Al-Musawi Printing & Software Solutions'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold sm:text-5xl"
          >
            {isRtl ? 'شركة ومكتب الموسوي' : 'Al-Musawi Office & Software'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-base text-[var(--text-secondary)]"
          >
            {isRtl
              ? 'نقدم خدمات الطباعة المدرسية والجامعية عالية الجودة، إضافة إلى تطوير النظم والحلول البرمجية وتطبيقات الهواتف المحمولة.'
              : 'Providing high-quality academic printing services alongside software solutions and mobile app engineering.'}
          </motion.p>
        </section>

        <div className="grid gap-8 sm:grid-cols-2 mb-12">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
              <Printer size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3">{isRtl ? 'قسم الطباعة المدرسية والجامعية' : 'Academic Printing Division'}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-7 mb-6">
              {isRtl
                ? 'طباعة الملازم والكتب المدرسية والبحوث الجامعية بأعلى جودة ورق وتجليد، مع إمكانية التوصيل السريع لجميع مناطق المحافظة.'
                : 'High-quality printing for study guides, books, and university research with fast local delivery.'}
            </p>
            <Link
              href="/warraq"
              onClick={playClick}
              onMouseEnter={playHover}
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--gold-light)]"
            >
              {isRtl ? 'استكشف منصة الوَرَّاق للطباعة' : 'Explore Warraq Printing Platform'}
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
            <div className="h-12 w-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-6">
              <Code size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3">{isRtl ? 'قسم الحلول البرمجية والتطبيقات' : 'Software & Apps Division'}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-7 mb-6">
              {isRtl
                ? 'تطوير تطبيقات iOS بنظام SwiftUI ونقاط البيع الكاشير (Glamora POS) مع أتمتة الأنظمة باستخدام الذكاء الاصطناعي.'
                : 'Developing custom iOS apps with SwiftUI, Glamora POS registers, and AI systems automation.'}
            </p>
            <Link
              href="/apps"
              onClick={playClick}
              onMouseEnter={playHover}
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--gold-light)]"
            >
              {isRtl ? 'عرض كتالوج التطبيقات والحلول' : 'Browse Apps & Solutions Catalog'}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
