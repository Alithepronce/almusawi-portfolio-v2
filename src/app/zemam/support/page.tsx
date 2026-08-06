'use client';

import PageShell from '@/components/ui/PageShell';
import { HelpCircle, Mail, Phone, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
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
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-bold text-purple-300 mb-4 backdrop-blur-xl">
            <HelpCircle size={14} />
            {isRtl ? 'مركز الدعم والخدمات' : 'Support & Assistance'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            {isRtl ? 'الدعم الفني والتواصل' : 'Technical Support'}
          </h1>
          <p className="text-sm text-neutral-400">
            {isRtl ? 'منظومة مشروع زمام — علي موفق' : 'Project ZMAM Ecosystem — Ali Muwaffaq'}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="glass-card-apple p-8 text-center bento-zmam">
            <Mail size={32} className="mx-auto text-purple-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">{isRtl ? 'البريد الإلكتروني المباشر' : 'Direct Email Support'}</h3>
            <p className="text-xs text-neutral-400 mb-4">{isRtl ? 'للاستفسارات والتقارير الفنية' : 'For inquiries and technical reports'}</p>
            <a href="mailto:gamegdeo@gmail.com" className="px-5 py-2.5 rounded-full bg-purple-600/30 text-purple-300 text-xs font-bold border border-purple-500/40 inline-block hover:bg-purple-600/50 transition">
              gamegdeo@gmail.com
            </a>
          </div>

          <div className="glass-card-apple p-8 text-center bento-warraq">
            <MessageSquare size={32} className="mx-auto text-amber-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">{isRtl ? 'التواصل عبر الواتساب' : 'WhatsApp Direct'}</h3>
            <p className="text-xs text-neutral-400 mb-4">{isRtl ? 'استجابة سريعة ومباشرة' : 'Fast and direct response'}</p>
            <a href="https://wa.me/9647767625001" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 inline-block hover:bg-amber-500/30 transition">
              +964 776 762 5001
            </a>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link href="/zemam" className="inline-flex items-center gap-2 text-purple-400 font-bold hover:underline text-sm">
            {isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <span>{isRtl ? 'العودة لدستور منظومة زمام' : 'Back to ZMAM Constitution'}</span>
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
