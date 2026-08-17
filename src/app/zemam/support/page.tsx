'use client';

import PageShell from '@/components/ui/PageShell';
import { HelpCircle, Mail, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';

export default function ZemamSupportPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto pb-24 pt-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-bold text-[#1d1d1f] mb-4 shadow-sm">
            <HelpCircle size={14} className="text-[#0066cc]" />
            <span>{isRtl ? 'مركز الدعم والخدمات' : 'Support & Assistance'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1d1d1f] tracking-tight mb-3">
            {isRtl ? 'الدعم الفني والتواصل' : 'Technical Support'}
          </h1>
          <p className="text-sm text-[#515154]">
            {isRtl ? 'منظومة مشروع زمام — علي موفق' : 'Project ZMAM Ecosystem — Ali Muwaffaq'}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="apple-studio-card p-8 text-center bg-white border border-black/8 shadow-sm">
            <Mail size={32} className="mx-auto text-[#0066cc] mb-4" />
            <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">{isRtl ? 'البريد الإلكتروني المباشر' : 'Direct Email Support'}</h3>
            <p className="text-xs text-[#515154] mb-4">{isRtl ? 'للاستفسارات والتقارير الفنية' : 'For inquiries and technical reports'}</p>
            <a href="mailto:gamegdeo@gmail.com" className="px-5 py-2.5 rounded-full bg-black/5 text-[#0066cc] text-xs font-bold border border-black/8 inline-block hover:bg-black/10 transition">
              gamegdeo@gmail.com
            </a>
          </div>

          <div className="apple-studio-card p-8 text-center bg-white border border-black/8 shadow-sm">
            <MessageSquare size={32} className="mx-auto text-[#16a34a] mb-4" />
            <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">{isRtl ? 'التواصل عبر الواتساب' : 'WhatsApp Direct'}</h3>
            <p className="text-xs text-[#515154] mb-4">{isRtl ? 'استجابة سريعة ومباشرة' : 'Fast and direct response'}</p>
            <a href="https://wa.me/9647767625001" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full bg-emerald-50 text-[#16a34a] text-xs font-bold border border-emerald-600/20 inline-block hover:bg-emerald-100 transition">
              +964 776 762 5001
            </a>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link href="/zemam" className="inline-flex items-center gap-2 text-[#0066cc] font-bold hover:underline text-sm">
            {isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <span>{isRtl ? 'العودة لدستور منظومة زمام' : 'Back to ZMAM Constitution'}</span>
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
