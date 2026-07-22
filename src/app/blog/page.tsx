'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import PageShell from '@/components/ui/PageShell';
import { BookOpen, Sparkles, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

const articles = [
  {
    slug: 'ai-automation-2026',
    title: { ar: 'كيف تسرّع أتمتة الذكاء الاصطناعي إنتاجية الشركات بنسبة 60%؟', en: 'How AI Automation Boosts Company Productivity by 60%' },
    desc: { ar: 'نظرة عميقة على كيفية ربط LLMs مثل Gemini و Claude مع قواعد البيانات المباشرة لأتمتة المهام اليومية.', en: 'A deep dive into connecting LLMs like Gemini & Claude with live databases to automate routine drag.' },
    date: '2026-07-15',
    readTime: { ar: '5 دقائق', en: '5 min read' }
  },
  {
    slug: 'swiftui-liquid-glass',
    title: { ar: 'أسرار تصميم واجهات Liquid Glass في تطبيق SwiftUI', en: 'Secrets of Building Liquid Glass Interfaces in SwiftUI' },
    desc: { ar: 'كيف بنينا واجهة تطبيق خُطى (GlassStep) بتأثيرات الزجاج السائل وتتبع الحركات بدون استهلاك البطارية.', en: 'How we engineered Khuta (GlassStep) app with liquid glass shaders and battery-friendly CoreMotion tracking.' },
    date: '2026-07-02',
    readTime: { ar: '7 دقائق', en: '7 min read' }
  }
];

export default function BlogPage() {
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
            <BookOpen size={14} />
            {isRtl ? 'مدونة الذكاء الاصطناعي والتطوير' : 'AI & Tech Blog'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold sm:text-5xl"
          >
            {isRtl ? 'المقالات والأفكار البرمجية' : 'Articles & Engineering Insights'}
          </motion.h1>
        </section>

        <div className="grid gap-6">
          {articles.map((article, index) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-xl transition hover:border-white/20"
            >
              <div className="flex items-center gap-4 text-xs font-semibold text-[var(--gold-light)] mb-3">
                <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {isRtl ? article.readTime.ar : article.readTime.en}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3">{isRtl ? article.title.ar : article.title.en}</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-7 mb-6">{isRtl ? article.desc.ar : article.desc.en}</p>
              <button onClick={playClick} onMouseEnter={playHover} className="inline-flex items-center gap-2 text-sm font-bold text-[var(--gold-light)]">
                {isRtl ? 'اقرأ المقال بالكامل' : 'Read Full Article'}
                <ArrowUpRight size={16} />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
