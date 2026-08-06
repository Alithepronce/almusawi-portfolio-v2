'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import PageShell from '@/components/ui/PageShell';
import { useLang } from '@/lib/i18n';
import { experienceTimeline } from '@/data/experience';
import { Briefcase, Download, MapPin, Mail, Phone, Code2, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

const coreSkills = [
  { category: { ar: 'تطوير الأجهزة المحمولة', en: 'Mobile Architecture' }, skills: ['iOS (SwiftUI)', 'Flutter & Dart', 'CoreMotion', 'Face ID Enclave'] },
  { category: { ar: 'الذكاء الاصطناعي والأتمتة', en: 'AI & Systems Automation' }, skills: ['Python Automations', 'Supabase Realtime', 'Local-First Privacy', 'REST & GraphQL'] },
  { category: { ar: 'التصميم وتجربة المستخدم', en: 'Product & HIG Design' }, skills: ['Apple HIG Standards', 'Liquid Glass UI', 'Bento Architecture', 'Framer Motion'] },
];

export default function CVPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto pb-24 pt-4">
        {/* HERO HEADER */}
        <section className="glass-card-apple p-8 sm:p-12 mb-12 bento-zmam">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-bold text-purple-300 mb-4">
                <Sparkles size={14} />
                <span>{isRtl ? 'السيرة الذاتية المهنية' : 'Executive Resume'}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                {isRtl ? 'علي موفق' : 'Ali Muwaffaq'}
              </h1>
              <p className="text-base text-purple-300 font-bold mb-4">
                {isRtl ? 'مؤسس ومعمار أنظمة — منظومة مشروع زمام' : 'Founder & System Architect — Project ZMAM Ecosystem'}
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-purple-400" /> {isRtl ? 'بابل، العراق' : 'Babil, Iraq'}</span>
                <span className="flex items-center gap-1.5"><Mail size={14} className="text-purple-400" /> gamegdeo@gmail.com</span>
                <span className="flex items-center gap-1.5"><Phone size={14} className="text-purple-400" /> <span dir="ltr">+964 776 762 5001</span></span>
              </div>
            </div>

            <div className="shrink-0">
              <a
                href="mailto:gamegdeo@gmail.com?subject=طلب%20السيرة%20الذاتية"
                onClick={playClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-purple-500/20 hover:scale-105 transition"
              >
                <Download size={16} />
                <span>{isRtl ? 'تواصل للحصول على النسخة المطبوعة' : 'Contact for Printable Resume'}</span>
              </a>
            </div>
          </div>
        </section>

        {/* SKILLS MATRIX */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-6">
            {isRtl ? 'المهارات والخبرات التقنية' : 'Core Competencies'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreSkills.map((cat, i) => (
              <div key={i} className="glass-card-apple p-6">
                <h3 className="text-sm font-bold text-purple-300 mb-4 pb-2 border-b border-white/10">{cat.category[lang]}</h3>
                <ul className="space-y-2 text-xs text-neutral-300 font-medium">
                  {cat.skills.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-6">
            {isRtl ? 'الخبرات والمسار المهني' : 'Professional Experience'}
          </h2>
          <div className="space-y-6">
            {experienceTimeline.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <div key={index} className="glass-card-apple p-8 bento-zmam">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 shrink-0"
                        style={{ background: `${exp.color}20`, color: exp.color }}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.title[lang]}</h3>
                        <p className="text-xs text-purple-300 font-semibold">{exp.company[lang]}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-neutral-400 font-semibold w-fit">
                      {exp.year}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
