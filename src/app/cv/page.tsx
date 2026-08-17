'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import PageShell from '@/components/ui/PageShell';
import { useLang } from '@/lib/i18n';
import { experienceTimeline } from '@/data/experience';
import {
  Briefcase,
  Download,
  MapPin,
  Mail,
  Phone,
  Code2,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  GraduationCap,
  Award,
  Globe,
  Layers,
  Smartphone,
  Cpu,
  ShieldCheck,
} from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

const coreSkills = [
  {
    category: { ar: 'تطوير وهندسة تطبيقات iOS & Mobile', en: 'iOS & Mobile Architecture' },
    skills: ['SwiftUI & SwiftData', 'Flutter & Dart', 'zsign & IPA Signing', 'Apple HIG Design', 'Face ID Biometrics'],
  },
  {
    category: { ar: 'الذكاء الاصطناعي وهندسة النظم', en: 'AI & Systems Engineering' },
    skills: ['Node.js & Express', 'Supabase Realtime & PostgreSQL', 'Python AI Automations', 'Cloudflare R2 & CDN', 'Local-First Architecture'],
  },
  {
    category: { ar: 'إدارة المنتجات والتجربة البصرية', en: 'Product & Visual Excellence' },
    skills: ['Apple Studio Aesthetic', 'Micro-Interactions & Motion', 'Design Systems & Tokens', 'Zero Cognitive Load UI', 'Full Lifecycle Execution'],
  },
];

const educationAndHonors = [
  {
    title: { ar: 'بكالوريوس فيزياء طبية — جامعة المستقبل', en: 'B.Sc. Medical Physics — Al-Mustaqbal University' },
    period: '2021 – 2025',
    desc: {
      ar: 'مشروع التخرج: روبوت طبي ذكي لنقل وتوصيل الأدوية والعينات الحساسة أوتوماتيكياً (Arduino & IR Sensors).',
      en: 'Graduation Project: Autonomous IR line-following medical robot for hospital drug delivery.',
    },
    icon: GraduationCap,
    color: '#16a34a',
  },
  {
    title: { ar: 'تأسيس وبناء منظومة مشروع زمام (Project ZMAM)', en: 'Founding & Architecting Project ZMAM' },
    period: '2024 – الحاضر',
    desc: {
      ar: 'بناء شبكة منتجات متكاملة (ZMAM Core, Warraq Publishing, Glamora POS, ZMAM Store) وفق دستور الأمانة الهندسية والخصوصية المطلقة.',
      en: 'Architecting an enduring software ecosystem comprising ZMAM Core, Warraq, Glamora POS, and ZMAM Store under strict privacy axioms.',
    },
    icon: Award,
    color: '#0066cc',
  },
];

export default function CVPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto pb-24 pt-4">
        {/* HERO HEADER CARD */}
        <section className="apple-studio-card p-8 sm:p-12 mb-12 bg-white border border-black/8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3.5 py-1 text-xs font-bold text-[#1d1d1f] mb-4">
                <Sparkles size={14} className="text-[#0066cc]" />
                <span>{isRtl ? 'السيرة الذاتية والمسار المهني' : 'Executive Resume'}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1d1d1f] tracking-tight mb-2">
                {isRtl ? 'علي موفق' : 'Ali Muwaffaq'}
              </h1>
              <p className="text-base text-[#0066cc] font-bold mb-4">
                {isRtl ? 'مؤسس ومعمار أنظمة — منظومة مشروع زمام' : 'Founder & System Architect — Project ZMAM Ecosystem'}
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-[#515154] font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#0066cc]" /> {isRtl ? 'بابل، العراق' : 'Babil, Iraq'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail size={14} className="text-[#0066cc]" /> gamegdeo@gmail.com
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone size={14} className="text-[#0066cc]" /> <span dir="ltr">+964 776 762 5001</span>
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <a
                href="mailto:gamegdeo@gmail.com?subject=طلب%20السيرة%20الذاتية%20—%20علي%20موفق"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1d1d1f] text-white font-bold text-xs hover:bg-black transition shadow-md"
              >
                <Download size={15} />
                <span>{isRtl ? 'طلب نسخة PDF مطبوعة' : 'Request Printable PDF'}</span>
              </a>
            </div>
          </div>
        </section>

        {/* CORE SKILLS MATRIX */}
        <section className="mb-14">
          <div className="mb-6 pb-3 border-b border-black/8">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0066cc] mb-1">
              {isRtl ? 'المهارات والكفاءات' : 'CORE COMPETENCIES'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
              {isRtl ? 'المهارات والخبرات التقنية' : 'Technical Skills & Architecture'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreSkills.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="apple-studio-card p-6 bg-white border border-black/8"
              >
                <h3 className="text-sm font-extrabold text-[#0066cc] mb-4 pb-2 border-b border-black/8">
                  {cat.category[lang]}
                </h3>
                <ul className="space-y-2.5 text-xs text-[#515154] font-semibold">
                  {cat.skills.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#16a34a] shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section className="mb-14">
          <div className="mb-6 pb-3 border-b border-black/8">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0066cc] mb-1">
              {isRtl ? 'سجل الأعمال' : 'CAREER TRAJECTORY'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
              {isRtl ? 'الخبرات والمسار المهني' : 'Professional Experience'}
            </h2>
          </div>

          <div className="space-y-5">
            {experienceTimeline.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <div key={index} className="apple-studio-card p-7 sm:p-8 bg-white border border-black/8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border border-black/8 shrink-0 shadow-sm"
                        style={{ background: `${exp.color}15`, color: exp.color }}
                      >
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-[#1d1d1f] mb-0.5">
                          {exp.title[lang]}
                        </h3>
                        <p className="text-xs text-[#515154] font-semibold">
                          {exp.company[lang]}
                        </p>
                      </div>
                    </div>
                    <span className="px-3.5 py-1 rounded-full border border-black/8 bg-black/5 text-xs text-[#515154] font-bold w-fit shrink-0">
                      {exp.year}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EDUCATION & INITIATIVES */}
        <section>
          <div className="mb-6 pb-3 border-b border-black/8">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0066cc] mb-1">
              {isRtl ? 'التعليم والمبادرات' : 'EDUCATION & MILESTONES'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
              {isRtl ? 'المؤهلات والمشاريع التأسيسية' : 'Education & Milestones'}
            </h2>
          </div>

          <div className="space-y-5">
            {educationAndHonors.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="apple-studio-card p-7 sm:p-8 bg-white border border-black/8">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border border-black/8 shrink-0 shadow-sm mt-0.5"
                      style={{ background: `${item.color}15`, color: item.color }}
                    >
                      <Icon size={22} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <h3 className="text-base sm:text-lg font-extrabold text-[#1d1d1f]">
                          {item.title[lang]}
                        </h3>
                        <span className="text-xs text-[#86868b] font-bold">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#515154] leading-relaxed">
                        {item.desc[lang]}
                      </p>
                    </div>
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
