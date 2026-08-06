'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import PageShell from '@/components/ui/PageShell';
import { BookOpen, Calendar, Clock, ArrowUpRight } from 'lucide-react';
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
    slug: 'glamora-pos-architecture',
    title: { ar: 'معمارية أنظمة نقاط البيع الفاخرة المعتمدة على بصمة الوجه Face ID', en: 'Architecture of Face ID Protected POS Systems' },
    desc: { ar: 'كيف بنينا معمارية تطبيق جلامورا POS المزودة بتزامن Supabase السحابي اللحظي وقفل الإدارة التنفيذية ببصمة الوجه.', en: 'How we engineered Glamora POS with real-time Supabase sync and Face ID executive lock.' },
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
      <div className="max-w-4xl mx-auto pb-24 pt-4">
        <section className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-bold text-[#1d1d1f] mb-4 shadow-sm"
          >
            <BookOpen size={14} className="text-[#0066cc]" />
            {isRtl ? 'مدونة الذكاء الاصطناعي والتطوير' : 'AI & Tech Blog'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold sm:text-5xl text-[#1d1d1f]"
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
              className="apple-studio-card p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 text-xs font-bold text-[#86868b] mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {isRtl ? article.readTime.ar : article.readTime.en}</span>
                </div>
                <h2 className="text-2xl font-bold text-[#1d1d1f] mb-3">{isRtl ? article.title.ar : article.title.en}</h2>
                <p className="text-sm text-[#515154] leading-relaxed mb-6">{isRtl ? article.desc.ar : article.desc.en}</p>
              </div>
              <button onClick={playClick} onMouseEnter={playHover} className="inline-flex items-center gap-2 text-xs font-bold text-[#0066cc] self-start">
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
