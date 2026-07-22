'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import PageShell from '@/components/ui/PageShell';
import { Download, Briefcase, GraduationCap, Award, MapPin, Mail, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { experienceTimeline } from '@/data/experience';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

export default function CVPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto pb-24">
        {/* HERO HEADER */}
        <section className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-[var(--gold-light)] mb-4"
          >
            <Sparkles size={14} />
            {isRtl ? 'السيرة الذاتية الرسمية' : 'Official Curriculum Vitae'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold sm:text-5xl"
          >
            {isRtl ? 'علي الموسوي' : 'Ali Al-Musawi'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-lg font-semibold text-[var(--gold-light)]"
          >
            {isRtl ? 'مطور أتمتة الذكاء الاصطناعي ومدير المنتجات' : 'AI Automation Developer & Product Manager'}
          </motion.p>

          {/* Download Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/cv-ar.pdf"
              download
              onClick={playClick}
              onMouseEnter={playHover}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--gold)] text-[#1f1d19] font-bold text-sm transition hover:scale-105 shadow-lg"
            >
              <Download size={18} />
              {isRtl ? 'تحميل السيرة الذاتية (عربي PDF)' : 'Download Arabic CV (PDF)'}
            </a>
            <a
              href="/cv-en.pdf"
              download
              onClick={playClick}
              onMouseEnter={playHover}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 bg-white/5 text-[var(--text)] font-bold text-sm transition hover:bg-white/10"
            >
              <Download size={18} />
              {isRtl ? 'تحميل السيرة الذاتية (English PDF)' : 'Download English CV (PDF)'}
            </a>
          </div>
        </section>

        {/* BIO & SUMMARY */}
        <section className="mb-10 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[var(--gold-light)]">
            <Briefcase size={22} />
            {isRtl ? 'الملخص المهني' : 'Professional Summary'}
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-8">
            {isRtl
              ? 'مطور أتمتة ذكاء اصطناعي ومدير منتجات من بابل، العراق. أتمتع بخبرة واسعة في بناء النظم البرمجية المعقدة، تطوير تطبيقات iOS بلغة SwiftUI، وتصميم خطوط أنابيب أتمتة AI تقلل الوقت والجهد اليدوي بنسب تتجاوز 60%.'
              : 'AI Automation Developer & Product Manager based in Babil, Iraq. Experienced in engineering complex software systems, iOS app development with SwiftUI, and designing AI automation pipelines reducing manual friction by over 60%.'}
          </p>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section className="mb-10 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-[var(--gold-light)]">
            <Award size={22} />
            {isRtl ? 'الخبرات والمناصب' : 'Experience & Leadership'}
          </h2>

          <div className="grid gap-6">
            {experienceTimeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex gap-4 p-5 rounded-2xl border border-white/10 bg-black/20">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: `${item.color}20`, color: item.color }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[var(--gold)]">{item.year}</span>
                    <h3 className="text-xl font-bold">{isRtl ? item.title.ar : item.title.en}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{isRtl ? item.company.ar : item.company.en}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[var(--gold-light)]">
            <GraduationCap size={22} />
            {isRtl ? 'التعليم الأكاديمي' : 'Education'}
          </h2>
          <div className="p-6 rounded-2xl border border-white/10 bg-black/20">
            <span className="text-xs font-bold text-emerald-400">2021 – 2025</span>
            <h3 className="text-xl font-bold mt-1">
              {isRtl ? 'بكالوريوس فيزياء طبية — جامعة المستقبل' : 'B.Sc. Medical Physics — Al-Mustaqbal University'}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              {isRtl ? 'المعدل: 70% | مشروع التخرج: روبوت توصيل الأدوية الطبي بالأشعة تحت الحمراء.' : 'GPA: 70% | Graduation Project: Autonomous Medical Drug Delivery IR Robot.'}
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
