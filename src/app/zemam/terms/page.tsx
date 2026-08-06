'use client';

import PageShell from '@/components/ui/PageShell';
import { FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';

export default function ZemamTermsPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto pb-24 pt-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-bold text-purple-300 mb-4 backdrop-blur-xl">
            <FileText size={14} />
            {isRtl ? 'شروط الخدمة والاتفاقية' : 'Terms of Service'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            {isRtl ? 'شروط الاستخدام والخدمة' : 'Terms & Conditions'}
          </h1>
          <p className="text-sm text-neutral-400">
            {isRtl ? 'منظومة مشروع زمام — علي موفق' : 'Project ZMAM Ecosystem — Ali Muwaffaq'}
          </p>
        </div>

        {/* Content */}
        <div className="glass-card-apple p-8 sm:p-12 space-y-8 text-neutral-300 text-sm leading-relaxed">
          <section className="border-b border-white/10 pb-6">
            <h2 className="text-xl font-bold text-white mb-3">
              {isRtl ? '1. القبول بالشروط' : '1. Acceptance of Terms'}
            </h2>
            <p>
              {isRtl
                ? 'باستخدامك لتطبيقات ومنتجات منظومة مشروع زمام، فإنك توافق على الالتزام بهذه الشروط والسياسات المعتمدة.'
                : 'By using Project ZMAM applications and services, you agree to comply with these terms.'}
            </p>
          </section>

          <section className="border-b border-white/10 pb-6">
            <h2 className="text-xl font-bold text-white mb-3">
              {isRtl ? '2. الملكية الفكرية' : '2. Intellectual Property'}
            </h2>
            <p>
              {isRtl
                ? 'جميع حقوق الملكية الفكرية، التصاميم، والشعارات والعلامات التجارية لـ "زمام"، "الوراق"، "خُطى"، و "جلامورا" محفوظة لصالح علي موفق (Ali Muwaffaq).'
                : 'All intellectual property, code, trademarks, and design systems belong to Ali Muwaffaq.'}
            </p>
          </section>

          <div className="pt-4 flex justify-between items-center text-xs text-neutral-400 flex-wrap gap-4">
            <Link href="/zemam" className="inline-flex items-center gap-2 text-purple-400 font-bold hover:underline">
              {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
              <span>{isRtl ? 'العودة لدستور زمام' : 'Back to ZMAM Doctrine'}</span>
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
