'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import PageShell from '@/components/ui/PageShell';
import { ChevronLeft, ArrowUpRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { allProjects } from '@/data/projects';

const caseStudiesContent: Record<string, {
  problem: { ar: string; en: string };
  solution: { ar: string; en: string };
  impact: { ar: string[]; en: string[] };
}> = {
  trado: {
    problem: {
      ar: 'حاجة مجتمع المتداولين لبيئة تعليمية تفاعلية تقدم إشارات وتحليلات مباشرة مع واجهة سريعة وموثوقة.',
      en: 'The trading community needed an interactive educational environment offering real-time signals with speed and accuracy.'
    },
    solution: {
      ar: 'بناء منصة متكاملة باستخدام Next.js و React Native و Supabase توفر تحليلات لحظية ولوحة تحكم متطورة.',
      en: 'Built an integrated platform using Next.js, React Native, and Supabase providing real-time analytics.'
    },
    impact: {
      ar: ['وصلت إلى 1,000 مستخدم نشط في الشهر الأول', 'تحسين سرعة معالجة البيانات بنسبة 60%', 'تقييم ممتاز من مجتمع المتداولين'],
      en: ['Reached 1,000 active users in the first month', 'Improved data processing speed by 60%', 'High rating from active traders']
    }
  },
  automation: {
    problem: {
      ar: 'استهلاك الوقت والجهد في المهام اليدوية الروتينية داخل الشركات الناشئة والمؤسسات المحلية.',
      en: 'Heavy manual drag in routine operations inside local businesses and remote startups.'
    },
    solution: {
      ar: 'تطوير خطوط أنابيب أتمتة بالذكاء الاصطناعي ترتبط بسلاسة مع Gemini و Claude و Supabase.',
      en: 'Engineered end-to-end AI automation pipelines seamlessly connected to Gemini, Claude, and Supabase.'
    },
    impact: {
      ar: ['تقليل وقت التنفيذ من أيام إلى دقائق معدودة', 'توفير تكاليف التشغيل بنسبة 45%', 'أتمتة كاملة لإصدار التقارير والدعم'],
      en: ['Reduced execution time from days to minutes', 'Saved 45% of operational costs', 'Full automation of reporting and support']
    }
  },
  prompt: {
    problem: {
      ar: 'صعوبة الحصول على مخرجات برمجية دقيقة ومتسقة من نماذج الذكاء الاصطناعي بدون أطر تنظيمية.',
      en: 'Difficulty in obtaining consistent code output from AI models without structured engineering frameworks.'
    },
    solution: {
      ar: 'ابتكار أطر هندسة أوامر (Prompt Frameworks) متقدمة تولد تطبيقات كاملة بدقة متناهية.',
      en: 'Designed advanced prompt engineering frameworks generating complete applications accurately.'
    },
    impact: {
      ar: ['تسريع عملية تطوير المنتجات بنسبة 3x', 'توليد كود نظيف مطابق لمعايير البرمجة', 'أتمتة كتابة التوثيق والاختبارات'],
      en: ['Accelerated product development speed by 3x', 'Generated clean production-ready code', 'Automated documentation and testing']
    }
  },
  robot: {
    problem: {
      ar: 'المخاطر والبطء في نقل الأدوية والعينات الطبية الحساسة بين أقسام المستشفيات.',
      en: 'Risks and delays in transporting sensitive medications between hospital departments.'
    },
    solution: {
      ar: 'تصميم روبوت ذكي يعتمد على Arduino والحساسات تحت الحمراء لنقل الأدوية أوتوماتيكياً.',
      en: 'Designed an IR line-following medical robot for autonomous drug transport inside hospitals.'
    },
    impact: {
      ar: ['دقة توجيه عالية وتفادي كامل للعوائق', 'تقليل زمن تسليم العلاج الحرج', 'مشروع تخرج تطبيقي ناجح في الفيزياء الطبّية'],
      en: ['High accuracy guidance avoiding obstacles', 'Reduced delivery time for critical drugs', 'Successful applied Medical Physics graduation project']
    }
  }
};

export default function CaseStudyClient() {
  const params = useParams();
  const slug = (params?.slug as string) || 'trado';
  const { lang } = useLang();
  const isRtl = lang === 'ar';

  const project = allProjects.find((p) => p.slug === slug) || allProjects[2];
  const content = caseStudiesContent[slug] || caseStudiesContent.trado;

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto pb-20">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-[var(--gold-light)] mb-8 transition hover:border-white/20"
        >
          <ChevronLeft size={16} />
          {isRtl ? 'العودة لجميع الأعمال' : 'Back to All Work'}
        </Link>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 sm:p-12 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
              {project.year}
            </span>
            <div className="flex gap-2">
              {project.tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-[var(--text-secondary)]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold mb-6">
            {isRtl ? project.title.ar : project.title.en}
          </h1>

          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10 border-b border-white/10 pb-8">
            {isRtl ? project.desc.ar : project.desc.en}
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-6 rounded-2xl border border-white/10 bg-black/20">
              <h3 className="text-xl font-bold mb-3 text-rose-400">
                {isRtl ? 'التحدي والمشكلة' : 'The Challenge'}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-7">
                {isRtl ? content.problem.ar : content.problem.en}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/20">
              <h3 className="text-xl font-bold mb-3 text-emerald-400">
                {isRtl ? 'الحل الهندسي' : 'The Solution'}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-7">
                {isRtl ? content.solution.ar : content.solution.en}
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0">
            <h3 className="text-xl font-bold mb-4 text-[var(--gold-light)] flex items-center gap-2">
              <Sparkles size={20} />
              {isRtl ? 'النتائج والأثر الملموس' : 'Tangible Impact'}
            </h3>
            <ul className="grid gap-3">
              {(isRtl ? content.impact.ar : content.impact.en).map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[var(--text)]">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
