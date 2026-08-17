'use client';

import PageShell from '@/components/ui/PageShell';
import { ShieldCheck } from 'lucide-react';

export default function StorePrivacyPage() {
  return (
    <PageShell>
      <div className="max-w-4xl mx-auto pb-24 pt-4">
        <div className="apple-studio-card p-8 sm:p-12 bg-white">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-black/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-[#0f766e] border border-black/8">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#1d1d1f]">سياسة الخصوصية وأمان الأجهزة — متجر زمام (ZMAM Store Privacy Policy)</h1>
              <p className="text-xs text-[#86868b]">منظومة مشروع زمام · تاريخ التحديث: أغسطس 2026</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-[#515154] leading-relaxed">
            <p>
              نحن في <strong>متجر زمام ستور (ZMAM Store)</strong> نلتزم بأعلى معايير الحماية والسرية التامة لبيانات المستخدمين ومعرفات الأجهزة.
            </p>

            <h3 className="text-base font-bold text-[#1d1d1f] pt-2">1. جمع معرف الجهاز (UDID)</h3>
            <p>
              يُجمع معرّف الجهاز الفريد (UDID) ونوع الجهاز حصرياً لتسجيل الجهاز ضمن شهادات Apple التوقيعية المعتمدة للمطورين وتمكين تثبيت التطبيقات بصيغة OTA. لا يتم جمع أو مشاركة أي بيانات شخصية، جهات اتصال، أو ملفات خاصة بك.
            </p>

            <h3 className="text-base font-bold text-[#1d1d1f] pt-2">2. حماية الروابط وحزم الـ IPA</h3>
            <p>
              تُخزّن حزم التطبيقات الموقعة في مستودعات Cloudflare R2 السحابية المشفّرة، وتُولّد روابط التثبيت المباشرة بـ Tokens موقعة ومحمية ببروتوكول JWT آمن.
            </p>

            <h3 className="text-base font-bold text-[#1d1d1f] pt-2">3. الشفافية ومنع الأبواب الخلفية</h3>
            <p>
              تخلو كافة التطبيقات والأدوات الموقعة عبر متجر زمام من أي برمجيات خبيثة أو فخاخ إعلانية، وتخضع للفحص المستمر وفق مبادئ ودستور منظومة زمام الرقمية.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
