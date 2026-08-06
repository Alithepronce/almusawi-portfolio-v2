'use client';

import PageShell from '@/components/ui/PageShell';
import { FileText } from 'lucide-react';

export default function GlamoraTermsPage() {
  return (
    <PageShell>
      <div className="max-w-4xl mx-auto pb-24 pt-4">
        <div className="apple-studio-card p-8 sm:p-12 bg-white">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-black/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-[#e11d48] border border-black/8">
              <FileText size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#1d1d1f]">شروط وأحكام الاستخدام (Glamora Terms of Service)</h1>
              <p className="text-xs text-[#86868b]">منظومة مشروع زمام · تاريخ التحديث: أغسطس 2026</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-[#515154] leading-relaxed">
            <p>
              باستخدامك لنظام <strong>جلامورا (Glamora POS)</strong>، فإنك توافق على الالتزام بالشروط والأحكام التالية المنظمة لاستخدام النظام في المتاجر.
            </p>

            <h3 className="text-base font-bold text-[#1d1d1f] pt-2">1. الترخيص والاستخدام</h3>
            <p>
              يُمنح متجرك ترخيصاً تشغيلياً مخصصاً لاستخدام نظام الكاشير وإدارة المخزون والرواتب على الأجهزة المصرح لها باقتران QR Code الخاص بمتجرك.
            </p>

            <h3 className="text-base font-bold text-[#1d1d1f] pt-2">2. حماية بصمة الوجه ورمز PIN التنفيذي</h3>
            <p>
              يتحمل مدير المتجر المسؤولية الكاملة عن تعيين وتأمين بصمة الوجه (Face ID) أو رمز PIN التنفيذي لمنع وصول الموظفين غير المصرح لهم للتقارير المالية الحساسة.
            </p>

            <h3 className="text-base font-bold text-[#1d1d1f] pt-2">3. مفتاح الطوارئ (Kill Switch)</h3>
            <p>
              يتضمن النظام خاصية تجميد الأجهزة عن بعد (Kill Switch) لحماية بيانتك في الحالات الطارئة، ويخضع استخدام هذه الخاصية لسلطة مدير المتجر المسجل فقط.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
