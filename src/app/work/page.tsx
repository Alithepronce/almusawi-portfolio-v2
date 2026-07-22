'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLang, t } from '@/lib/i18n';
import { allProjects } from '@/data/projects';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import PageShell from '@/components/ui/PageShell';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

export default function WorkPage() {
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
          <Sparkles size={14} />
          {isRtl ? 'معرض الأعمال والأنظمة' : 'Projects & Systems Showcase'}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-extrabold sm:text-5xl"
        >
          {isRtl ? 'أبرز المشاريع والتطبيقات' : 'Featured Works & Applications'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-base text-[var(--text-secondary)]"
        >
          {isRtl
            ? 'تضم هذه القائمة حلول الأتمتة بالذكاء الاصطناعي، تطبيقات iOS الزجاجية، ونظم الكاشير والمخزون الاحترافية.'
            : 'A curated list of AI automation pipelines, liquid glass iOS apps, and professional POS systems.'}
        </motion.p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-24">
        {allProjects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
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
                  {project.year ?? (isRtl ? 'حديث' : 'Recent')}
                </div>
                <h3 className="mt-8 text-2xl font-bold leading-tight">
                  {isRtl ? project.title.ar : project.title.en}
                </h3>
              </div>

              <p className="text-sm leading-7 text-[var(--text-secondary)]">
                {isRtl ? project.desc.ar : project.desc.en}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--gold-light)]">
                {isRtl ? 'فتح الصفحة والتفاصيل' : 'Open Showcase Page'}
                <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:translate-y-[-1px]" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
