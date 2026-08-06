'use client';

import PageShell from '@/components/ui/PageShell';
import { ShieldCheck, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';

export default function ZemamPrivacyPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto pb-24 pt-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-bold text-purple-300 mb-4 backdrop-blur-xl">
            <ShieldCheck size={14} />
            {isRtl ? 'حماية البيانات والخصوصية' : 'Data Protection & Privacy'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            {isRtl ? 'سياسة الخصوصية الرسمية' : 'Official Privacy Policy'}
          </h1>
          <p className="text-sm text-neutral-400">
            {isRtl ? 'منظومة مشروع زمام — علي موفق' : 'Project ZMAM Ecosystem — Ali Muwaffaq'}
          </p>
        </div>

        {/* Policy Body Container */}
        <div className="glass-card-apple p-8 sm:p-12 space-y-8 text-neutral-300 text-sm leading-relaxed">
          <section className="border-b border-white/10 pb-6">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Lock size={18} className="text-purple-400" />
              {isRtl ? '1. المبدأ الأساسي: الخصوصية المطلقة' : '1. Core Principle: Absolute Privacy'}
            </h2>
            <p>
              {isRtl
                ? 'تلتزم منظومة مشروع زمام بحماية خصوصية وأمان بياناتك الشخصية. جميع تطبيقاتنا تعمل بأسلوب المحافظة المحلية على البيانات (Local-First Architecture) ولا يتم جمع أو مشاركة أي بيانات شخصية أو حركية خارج جهازك.'
                : 'Project ZMAM Ecosystem is built on local-first architecture. We do not collect, monetize, or transmit user data to external servers.'}
            </p>
          </section>

          <section className="border-b border-white/10 pb-6">
            <h2 className="text-xl font-bold text-white mb-3">
              {isRtl ? '2. نوع البيانات وتخزينها' : '2. Data Types & Storage'}
            </h2>
            <p className="mb-3">
              {isRtl
                ? 'تُخزن جميع التفضيلات والإعدادات والسجلات محلياً على جهاز المستخدم مباشرة دون إرسالها إلى أي سيرفر خارجي.'
                : 'All settings, logs, and preferences are saved locally on the user device sandbox.'}
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-400">
              <li>{isRtl ? 'المصادقة الحيوية (Face ID / Touch ID) تتم محلياً 100% عبر أطر عمل Apple.' : 'Biometric authentication runs 100% locally via Apple Secure Enclave.'}</li>
              <li>{isRtl ? 'لا توجد أي أدوات تتبع (Trackers) أو إعلانات.' : 'No analytics, trackers, or advertising SDKs are present.'}</li>
            </ul>
          </section>

          <section className="border-b border-white/10 pb-6">
            <h2 className="text-xl font-bold text-white mb-3">
              {isRtl ? '3. التواصل والتواصل المباشر' : '3. Direct Contact'}
            </h2>
            <p>
              {isRtl
                ? 'لأي استفسار حول سياسة الخصوصية أو معايير الأمان، يمكنك التواصل مباشرة مع مؤسس ومعمار المنظومة (علي موفق) عبر البريد الإلكتروني:'
                : 'For privacy inquiries, contact the architecture team directly at:'}
            </p>
            <div className="mt-3 p-4 rounded-2xl bg-white/5 border border-white/10 inline-block font-mono text-purple-300 font-bold">
              gamegdeo@gmail.com
            </div>
          </section>

          <div className="pt-4 flex justify-between items-center text-xs text-neutral-400 flex-wrap gap-4">
            <Link href="/zemam" className="inline-flex items-center gap-2 text-purple-400 font-bold hover:underline">
              {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
              <span>{isRtl ? 'العودة لدستور زمام' : 'Back to ZMAM Doctrine'}</span>
            </Link>
            <span>{isRtl ? 'آخر تحديث: 2026' : 'Last updated: 2026'}</span>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
