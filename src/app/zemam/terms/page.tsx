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
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-bold text-[#1d1d1f] mb-4 shadow-sm">
            <FileText size={14} className="text-[#0066cc]" />
            <span>{isRtl ? 'شروط الخدمة والاتفاقية' : 'Terms of Service'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1d1d1f] tracking-tight mb-3">
            {isRtl ? 'شروط الاستخدام والخدمة' : 'Terms & Conditions'}
          </h1>
          <p className="text-sm text-[#515154]">
            {isRtl ? 'منظومة مشروع زمام — علي موفق' : 'Project ZMAM Ecosystem — Ali Muwaffaq'}
          </p>
        </div>

        {/* Content */}
        <div className="apple-studio-card p-8 sm:p-12 space-y-8 bg-white border border-black/8 text-[#515154] text-sm leading-relaxed shadow-sm">
          <section className="border-b border-black/8 pb-6">
            <h2 className="text-xl font-bold text-[#1d1d1f] mb-3">
              {isRtl ? '1. القبول بالشروط' : '1. Acceptance of Terms'}
            </h2>
            <p>
              {isRtl
                ? 'باستخدامك لتطبيقات ومنتجات منظومة مشروع زمام، فإنك توافق على الالتزام بهذه الشروط والسياسات المعتمدة.'
                : 'By using Project ZMAM applications and services, you agree to comply with these terms.'}
            </p>
          </section>

          <section className="border-b border-black/8 pb-6">
            <h2 className="text-xl font-bold text-[#1d1d1f] mb-3">
              {isRtl ? '2. الملكية الفكرية' : '2. Intellectual Property'}
            </h2>
            <p>
              {isRtl
                ? 'جميع حقوق الملكية الفكرية، التصاميم، والشعارات والعلامات التجارية لـ "زمام"، "الوراق"، "ستور"، و "جلامورا" محفوظة لصالح علي موفق (Ali Muwaffaq).'
                : 'All intellectual property, code, trademarks, and design systems belong to Ali Muwaffaq.'}
            </p>
          </section>

          <div className="pt-4 flex justify-between items-center text-xs text-[#86868b] flex-wrap gap-4">
            <Link href="/zemam" className="inline-flex items-center gap-2 text-[#0066cc] font-bold hover:underline">
              {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
              <span>{isRtl ? 'العودة لدستور زمام' : 'Back to ZMAM Doctrine'}</span>
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
