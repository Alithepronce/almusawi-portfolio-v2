'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang, t } from '@/lib/i18n';
import { featuredProjects as projects } from '@/data/projects';
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

const containerClass = 'mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12';

const metrics = {
  en: [
    { value: '1K+', label: 'active users launched in one month' },
    { value: '7-14', label: 'days to ship focused AI automations' },
    { value: '4', label: 'case studies with tangible outcomes' },
  ],
  ar: [
    { value: '+1K', label: 'مستخدم نشط خلال أول شهر إطلاق' },
    { value: '14-7', label: 'يومًا لتسليم أتمتة AI مركزة' },
    { value: '4', label: 'دراسات حالة بنتائج واضحة' },
  ],
} as const;

const services = {
  en: [
    {
      title: 'AI systems that remove manual drag',
      desc: 'Operational flows, support, content, and internal tools designed around measurable speed.',
      icon: Bot,
    },
    {
      title: 'Product design that feels deliberate',
      desc: 'Interfaces with stronger hierarchy, calmer typography, and a clearer point of view.',
      icon: Sparkles,
    },
    {
      title: 'Build execution from concept to launch',
      desc: 'From architecture to final delivery across web products, automations, and niche tools.',
      icon: BriefcaseBusiness,
    },
  ],
  ar: [
    {
      title: 'أنظمة AI تزيل الجهد اليدوي',
      desc: 'سير عمل ودعم ومحتوى وأدوات داخلية مبنية على سرعة قابلة للقياس.',
      icon: Bot,
    },
    {
      title: 'تصميم منتج بموقف بصري أوضح',
      desc: 'واجهات بهرمية أقوى وخطوط أهدأ وشخصية أكثر نضجًا.',
      icon: Sparkles,
    },
    {
      title: 'تنفيذ كامل من الفكرة إلى الإطلاق',
      desc: 'من المعمارية إلى التسليم النهائي عبر المنتجات الرقمية والأتمتة والأدوات المتخصصة.',
      icon: BriefcaseBusiness,
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
      ? 'أبني منتجات رقمية وأتمتة AI تبدو أحدث وتعمل بوضوح.'
      : 'I build digital products and AI automation that feel sharper and work harder.',
    body: isArabic
      ? 'أساعد الشركات والفرق الصغيرة على تحويل الفوضى التشغيلية إلى أنظمة أسرع، وواجهات أنظف، وتجارب أكثر إقناعًا من أول نظرة.'
      : 'I help businesses and small teams turn operational drag into faster systems, cleaner interfaces, and products that make a stronger first impression.',
    primary: isArabic ? 'ابدأ مشروعًا' : 'Start a Project',
    secondary: isArabic ? 'شاهد الأعمال' : 'See the Work',
    sectionTitle: isArabic ? 'مختارات حديثة' : 'Recent Selected Work',
    sectionBody: isArabic
      ? 'نماذج توضّح كيف أجمع بين التفكير المنتجّي والتنفيذ التقني والهوية البصرية الحادة.'
      : 'Examples that show how product thinking, technical delivery, and visual taste come together.',
    contactTitle: isArabic ? 'إذا كان الشكل الحالي لا يكفي، نبني نسخة أفضل.' : 'If the current experience is not enough, we build the better version.',
    contactBody: isArabic
      ? 'واجهة أو منتج أو نظام داخلي: المهم أن يكون أوضح، أسرع، وأجمل في الاستخدام.'
      : 'Interface, product, or internal system: the goal is the same, clearer, faster, and better to use.',
  };

  return (
    <main className="relative overflow-x-hidden pb-20 pt-28 text-[var(--text)]">
      {/* Glow Orbs Background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_top,rgba(202,180,139,0.18),transparent_42%),radial-gradient(circle_at_20%_30%,rgba(225,29,72,0.15),transparent_30%)]" />

      {/* HERO SECTION */}
      <section className={`${containerClass} relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center text-center"
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          <div className="max-w-4xl flex flex-col items-center">
            {/* Status Pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-[var(--text-secondary)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
              {isArabic ? 'مطوّر أتمتة AI ومدير منتجات' : 'AI Automation Developer and Product Manager'}
            </div>

            {/* Title */}
            <h1 className="text-[clamp(2.5rem,6.5vw,5.2rem)] font-extrabold leading-[1.08] text-center tracking-tight">
              {copy.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg text-center">
              {copy.body}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--gold)] px-7 py-3.5 text-sm font-bold text-[#1f1d19] transition hover:scale-105 shadow-lg shadow-[var(--gold)]/20"
              >
                {copy.primary}
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/work"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-bold text-[var(--text)] transition hover:border-white/30 hover:bg-white/10"
              >
                {copy.secondary}
              </Link>
            </div>

            {/* Metrics Grid */}
            <div className="mt-14 grid gap-6 sm:grid-cols-3 w-full max-w-3xl">
              {metrics[lang].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-xl"
                >
                  <div className="text-3xl font-extrabold text-[var(--gold-light)]">{item.value}</div>
                  <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section className={`${containerClass} relative z-10 mt-28`} dir={isArabic ? 'rtl' : 'ltr'}>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {services[lang].map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8 backdrop-blur-md shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)]/10 text-[var(--gold-light)] border border-[var(--gold)]/20">
                  <Icon size={22} />
                </div>
                <h2 className="mt-6 text-2xl font-bold leading-tight">{service.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{service.desc}</p>
              </article>
            );
          })}
        </motion.div>
      </section>

      {/* FEATURED WORK SECTION */}
      <section className={`${containerClass} relative z-10 mt-32`} dir={isArabic ? 'rtl' : 'ltr'}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65 }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--gold)]">{copy.sectionTitle}</p>
            <h2 className="mt-3 text-4xl font-extrabold">{isArabic ? 'أعمال تعكس الإبداع والاحترافية' : 'Work that reflects technical excellence'}</h2>
            <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">{copy.sectionBody}</p>
          </div>
          <Link
            href="/work"
            onClick={playClick}
            onMouseEnter={playHover}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-white/30 hover:bg-white/5"
          >
            {isArabic ? 'كل الأعمال' : 'All Projects'}
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
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <Link
                href={project.externalHref || `/work/${project.slug}`}
                onClick={playClick}
                onMouseEnter={playHover}
                className="group block h-full rounded-[28px] border border-white/10 bg-white/5 p-6 transition hover:border-white/25 hover:bg-white/10 shadow-xl"
              >
                <div
                  className="mb-6 rounded-[22px] p-6 transition group-hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(160deg, ${project.color}33, rgba(255,255,255,0.02))`,
                  }}
                >
                  <div className="text-xs font-semibold text-[var(--text-secondary)]">
                    {project.year ?? (isArabic ? 'حديث' : 'Recent')}
                  </div>
                  <h3 className="mt-8 text-2xl font-bold leading-tight">
                    {isArabic ? project.title.ar : project.title.en}
                  </h3>
                </div>

                <p className="text-sm leading-7 text-[var(--text-secondary)] line-clamp-3">
                  {isArabic ? project.desc.ar : project.desc.en}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--gold-light)]">
                  {isArabic ? 'استكشف التفاصيل والسياسات' : 'Explore Details & Showcase'}
                  <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:translate-y-[-1px]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA SECTION */}
      <section className={`${containerClass} relative z-10 mt-32`} dir={isArabic ? 'rtl' : 'ltr'}>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          className="grid gap-8 rounded-[36px] border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12 backdrop-blur-xl shadow-2xl"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--gold)]">
              {isArabic ? 'تواصل مباشر' : 'Direct Contact'}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl font-bold leading-tight">
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
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--gold)] px-7 py-3.5 text-sm font-bold text-[#1f1d19] transition hover:scale-105"
              >
                <Mail size={16} />
                {isArabic ? 'أرسل تفاصيل مشروعك' : 'Send Project Brief'}
              </Link>
              <a
                href="https://wa.me/9647767625001"
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold text-[var(--text)] transition hover:bg-white/10"
              >
                <Phone size={16} />
                WhatsApp Direct
              </a>
            </div>
          </div>

          <div className="grid gap-4 rounded-[28px] border border-white/10 bg-black/20 p-6 backdrop-blur-md">
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
            <div className="mt-4 border-t border-white/10 pt-4 text-xs leading-6 text-[var(--text-muted)]">
              {isArabic
                ? 'التركيز الحالي: أتمتة الأنظمة، تطوير تطبيقات iOS المتقدمة، وبناء تجارب مستخدم مبهرة.'
                : 'Current focus: Systems automation, advanced iOS apps, and building luxury user experiences.'}
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className={`${containerClass} relative z-10 mt-20`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {t('heroName', lang)} · {t('officeTitle', lang)}
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/Alithepronce" target="_blank" rel="noreferrer" className="transition hover:text-[var(--text)]">
              GitHub
            </a>
            <a href="https://wa.me/9647767625001" target="_blank" rel="noreferrer" className="transition hover:text-[var(--text)]">
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
