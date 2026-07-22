'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang, t } from '@/lib/i18n';
import { featuredProjects as projects } from '@/data/projects';
import {
  ArrowUpRight,
  Bot,
  Briefcase,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Crown,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

const containerClass = 'mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12';

const metrics = {
  en: [
    { value: '1K+', label: 'active users launched in first month' },
    { value: '7–14', label: 'days to ship end-to-end AI pipelines' },
    { value: '4', label: 'production apps with 100% reliability' },
  ],
  ar: [
    { value: '+1K', label: 'مستخدم نشط خلال الشهر الأول' },
    { value: '14–7', label: 'يومًا لتسليم أتمتة AI متكاملة' },
    { value: '4', label: 'تطبيقات فعلية باستقرار واستجابة 100%' },
  ],
} as const;

const services = {
  en: [
    {
      title: 'Autonomous AI Systems',
      desc: 'Operational flows, support chatbots, content engines, and internal tools engineered around measurable speed.',
      icon: Bot,
    },
    {
      title: 'Quiet Luxury UI/UX Design',
      desc: 'Digital products crafted with calmer typography, stronger hierarchy, and an unmistakable editorial identity.',
      icon: Sparkles,
    },
    {
      title: 'iOS & Web Architecture',
      desc: 'Full-stack delivery from concept to production across SwiftData, Next.js, and cloud backend infrastructure.',
      icon: Briefcase,
    },
  ],
  ar: [
    {
      title: 'أنظمة الذكاء الاصطناعي الذاتية',
      desc: 'سير عمل تشغيلي، أنظمة دعم، محركات محتوى، وأدوات برمجية مبنية على أقصى معدلات السرعة.',
      icon: Bot,
    },
    {
      title: 'تصميم الواجهات بروح الفخامة الهادئة',
      desc: 'واجهات رقمية تتميز بهرمية بصرية متزنة، خطوط راقية، وشخصية بصرية انطباعية مبهرة من اللمحة الأولى.',
      icon: Sparkles,
    },
    {
      title: 'معمارية تطبيقات iOS والويب',
      desc: 'تنفيذ شامل من الفكرة والإنشاء حتى البث والإنتاج عبر SwiftUI و Next.js و Supabase.',
      icon: Briefcase,
    },
  ],
} as const;

export default function Home() {
  const { lang } = useLang();
  const { playHover, playClick } = useInteractiveSounds();
  const isArabic = lang === 'ar';

  const copy = {
    label: isArabic ? 'علي الموسوي' : 'Ali Al-Musawi',
    title: isArabic
      ? 'نصمّم النقاء، ونبني أتمتة AI تعمل بهدوء وقوة.'
      : 'Crafting Pure Interfaces & Silent AI Automation.',
    body: isArabic
      ? 'أساعد الشركات والفرق الصغيرة على تحويل الفوضى التشغيلية إلى أنظمة أسرع، وواجهات أنظف، وتجارب رقمية ذات طابع ملوكي يترك أثراً دائماً.'
      : 'I help businesses and ambitious teams turn operational drag into silent systems, cleaner interfaces, and luxury digital products with lasting impact.',
    primary: isArabic ? 'ابدأ مشروعاً جديداً' : 'Start a Project',
    secondary: isArabic ? 'استكشف معرض الأعمال' : 'Explore Portfolio',
    sectionTitle: isArabic ? 'مختارات هادئة من الأعمال' : 'Selected Quiet Luxury Works',
    sectionBody: isArabic
      ? 'نماذج استثنائية تجسّد الاندماج بين التفكير الهندسي، الأتمتة المتقدمة، والتصميم الرفيع.'
      : 'Exceptional showcases embodying the convergence of product engineering, AI automation, and high taste.',
    contactTitle: isArabic ? 'إذا كان شكل الواجهة الحالي لا يكفي، نبني النسخة الفاخرة.' : 'If the current experience is not enough, we build the luxury version.',
    contactBody: isArabic
      ? 'تطبيق iOS، منصة سحابية، أو نظام أتمتة: الهدف واحد وهو الوضوح التام، السرعة، والجمال الفائق.'
      : 'iOS app, web platform, or AI pipeline: the goal is the same — absolute clarity, speed, and elegance.',
  };

  return (
    <main className="relative overflow-x-hidden pb-24 pt-32 text-[var(--text)] ambient-gold-glow">
      {/* HERO SECTION */}
      <section className={`${containerClass} relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center"
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          <div className="max-w-4xl flex flex-col items-center">
            {/* Status Pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-black/40 px-5 py-2 text-xs font-bold tracking-wide text-[var(--gold-light)] backdrop-blur-xl shadow-lg">
              <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-pulse" />
              {isArabic ? 'علي الموسوي · مطوّر أتمتة AI ومدير منتجات' : 'Ali Al-Musawi · AI Automation Developer'}
            </div>

            {/* Main Headline */}
            <h1 className="text-[clamp(2.6rem,6.8vw,5.5rem)] font-extrabold leading-[1.06] text-center tracking-tight gold-luxury-text">
              {copy.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg font-medium text-center">
              {copy.body}
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex min-h-13 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#F0DA8A] via-[#D4AF37] to-[#A3821A] px-8 py-4 text-sm font-extrabold text-[#0B0C0E] transition hover:scale-105 shadow-xl shadow-[var(--gold)]/20"
              >
                {copy.primary}
                <ArrowUpRight size={17} />
              </Link>
              <Link
                href="/work"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex min-h-13 items-center gap-2.5 rounded-full border border-[var(--gold)]/25 bg-white/5 px-8 py-4 text-sm font-bold text-[var(--text)] transition hover:border-[var(--gold)]/45 hover:bg-white/10 backdrop-blur-md"
              >
                {copy.secondary}
              </Link>
            </div>

            {/* Editorial Metrics Grid */}
            <div className="mt-16 grid gap-6 sm:grid-cols-3 w-full max-w-3xl">
              {metrics[lang as 'ar' | 'en'].map((item: { value: string; label: string }) => (
                <div
                  key={item.label}
                  className="luxury-card p-6 text-center"
                >
                  <div className="text-3xl font-extrabold gold-luxury-text">{item.value}</div>
                  <p className="mt-2 text-xs font-semibold leading-5 text-[var(--text-secondary)]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section className={`${containerClass} relative z-10 mt-32`} dir={isArabic ? 'rtl' : 'ltr'}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {services[lang as 'ar' | 'en'].map((service: any) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="luxury-card p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[var(--gold)]/10 text-[var(--gold-light)] border border-[var(--gold)]/20 mb-6">
                    <Icon size={24} />
                  </div>
                  <h2 className="text-2xl font-bold leading-tight mb-3">{service.title}</h2>
                  <p className="text-sm leading-7 text-[var(--text-secondary)]">{service.desc}</p>
                </div>
              </article>
            );
          })}
        </motion.div>
      </section>

      {/* FEATURED SHOWCASE SECTION */}
      <section className={`${containerClass} relative z-10 mt-36`} dir={isArabic ? 'rtl' : 'ltr'}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] font-extrabold text-[var(--gold)]">{copy.sectionTitle}</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold gold-luxury-text">{isArabic ? 'أعمال تتسم بالنقاء والجمال' : 'Pristine Digital Craftsmanship'}</h2>
            <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">{copy.sectionBody}</p>
          </div>
          <Link
            href="/work"
            onClick={playClick}
            onMouseEnter={playHover}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--gold)]/25 px-7 py-3.5 text-sm font-bold text-[var(--text)] transition hover:border-[var(--gold)]/45 hover:bg-white/5"
          >
            {isArabic ? 'استعراض كافة الأعمال' : 'All Projects'}
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <Link
                href={project.externalHref || `/work/${project.slug}`}
                onClick={playClick}
                onMouseEnter={playHover}
                className="group block h-full luxury-card p-7"
              >
                <div
                  className="mb-6 rounded-[22px] p-6 transition group-hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(160deg, ${project.color}25, rgba(212, 175, 55, 0.03))`,
                    border: `1px solid ${project.color}35`
                  }}
                >
                  <div className="text-xs font-bold tracking-wider text-[var(--gold)]">
                    {project.year ?? (isArabic ? 'حديث' : 'Recent')}
                  </div>
                  <h3 className="mt-8 text-2xl font-bold leading-tight">
                    {isArabic ? project.title.ar : project.title.en}
                  </h3>
                </div>

                <p className="text-sm leading-7 text-[var(--text-secondary)] line-clamp-3 mb-6">
                  {isArabic ? project.desc.ar : project.desc.en}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--gold)]/15 bg-white/5 px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wide text-[var(--gold-light)] uppercase">
                  {isArabic ? 'فتح الاستعراض والتفاصيل' : 'Open Case Study'}
                  <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:translate-y-[-1px]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA BANNER */}
      <section className={`${containerClass} relative z-10 mt-36`} dir={isArabic ? 'rtl' : 'ltr'}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="luxury-card grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12 shadow-2xl"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-extrabold text-[var(--gold)]">
              {isArabic ? 'تواصل مباشر وملوكي' : 'Direct Conversation'}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl font-extrabold leading-tight gold-luxury-text">
              {copy.contactTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
              {copy.contactBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#F0DA8A] via-[#D4AF37] to-[#A3821A] px-7 py-3.5 text-sm font-extrabold text-[#0B0C0E] transition hover:scale-105"
              >
                <Mail size={16} />
                {isArabic ? 'أرسل تفاصيل مشروعك' : 'Send Brief'}
              </Link>
              <a
                href="https://wa.me/9647767625001"
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-[var(--gold)]/25 px-7 py-3.5 text-sm font-bold text-[var(--text)] transition hover:bg-white/5"
              >
                <Phone size={16} />
                WhatsApp Direct
              </a>
            </div>
          </div>

          <div className="grid gap-4 rounded-[24px] border border-[var(--gold)]/15 bg-black/30 p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
              <MapPin size={18} className="text-[var(--gold-light)]" />
              <span>{isArabic ? 'بابل، العراق' : 'Babil, Iraq'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
              <Mail size={18} className="text-[var(--gold-light)]" />
              <span>gamegdeo@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
              <Phone size={18} className="text-[var(--gold-light)]" />
              <span dir="ltr">+964 776 762 5001</span>
            </div>
            <div className="mt-4 border-t border-[var(--gold)]/15 pt-4 text-xs leading-6 text-[var(--text-muted)]">
              {isArabic
                ? 'التركيز الحالي: أتمتة الأنظمة، تطوير تطبيقات iOS المتقدمة، وبناء تجارب مستخدم ملوكية.'
                : 'Current focus: Systems automation, advanced iOS apps, and quiet luxury experiences.'}
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className={`${containerClass} relative z-10 mt-24`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="flex flex-col gap-4 border-t border-[var(--gold)]/15 py-9 text-sm text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {t('heroName', lang)} · {t('officeTitle', lang)}
          </p>
          <div className="flex items-center gap-6 font-bold text-xs">
            <a href="https://github.com/Alithepronce" target="_blank" rel="noreferrer" className="transition hover:text-[var(--gold-light)]">
              GitHub
            </a>
            <a href="https://wa.me/9647767625001" target="_blank" rel="noreferrer" className="transition hover:text-[var(--gold-light)]">
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
