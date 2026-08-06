'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import PageShell from '@/components/ui/PageShell';
import { useLang } from '@/lib/i18n';
import { featuredProjects as projects } from '@/data/projects';
import { Briefcase, ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

export default function WorkPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto pb-24 pt-4">
        {/* HERO SECTION */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 mb-6 backdrop-blur-xl"
          >
            <Briefcase size={14} />
            {isRtl ? 'المشاريع ودراسات الحالة' : 'Selected Case Studies & Engineering Projects'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold sm:text-6xl tracking-tight text-white mb-6"
          >
            {isRtl ? 'الأعمال والمشاريع' : 'Featured'}{' '}
            <span className="zmam-purple-text">{isRtl ? 'المختارة' : 'Projects'}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-neutral-400 leading-relaxed mb-8"
          >
            {isRtl
              ? 'مجموعة مختارة من المشاريع والحلول التقنية المبتكرة التي تم تنفيذها بأعلى معايير الجودة والتميز البصري.'
              : 'Selected engineering case studies showcasing product architecture, performance tuning, and clean execution.'}
          </motion.p>
        </section>

        {/* PROJECTS BENTO GRID */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onMouseEnter={playHover}
            >
              <Link
                href={project.externalHref || `/work/${project.slug}`}
                onClick={playClick}
                className="glass-card-apple group block h-full p-8 sm:p-10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-xs font-bold text-neutral-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {project.year || (isRtl ? 'حديث' : 'Recent')}
                    </span>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[11px] text-neutral-300 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-purple-300 transition">
                    {isRtl ? project.title.ar : project.title.en}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                    {isRtl ? project.desc.ar : project.desc.en}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 transition group-hover:translate-x-1">
                  <span>{isRtl ? 'عرض دراسة الحالة والتفاصيل' : 'Explore Case Study'}</span>
                  <ArrowUpRight size={16} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
