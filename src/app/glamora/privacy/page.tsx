'use client';

import PageShell from '@/components/ui/PageShell';
import { ShieldCheck } from 'lucide-react';

export default function GlamoraPrivacyPage() {
  return (
    <PageShell>
      <div className="max-w-4xl mx-auto pb-24 pt-4">
        <div className="apple-studio-card p-8 sm:p-12 bg-white">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-black/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-[#e11d48] border border-black/8">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#1d1d1f]">سياسة الخصوصية وحماية البيانات (Glamora POS Privacy Policy)</h1>
              <p className="text-xs text-[#86868b]">منظومة مشروع زمام · تاريخ التحديث: أغسطس 2026</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-[#515154] leading-relaxed">
            <p>
              نحن في <strong>تطبيق جلامورا (Glamora POS)</strong> نلتزم بأعلى معايير الحماية والسرية التامة لبيانات محلك ومبيعاتك وقواعد بيانات الموظفين والمخزون.
            </p>

            <h3 className="text-base font-bold text-[#1d1d1f] pt-2">1. جمع البيانات واستخدامها</h3>
            <p>
              تطبيق Glamora لا يقوم ببيع أو مشاركة أي من بيانات محلك، المبيعات، الفواتير، أو الرواتب مع أي طرف ثالث على الإطلاق. تُحفظ البيانات محلياً على جهازك وتتزامن سحابياً وبشكل مشفر حصرياً بين أجهزة محلك الخاصة عبر خوادم Supabase Realtime.
            </p>

            <h3 className="text-base font-bold text-[#1d1d1f] pt-2">2. الأمان والحماية الحيوية (Face ID / PIN)</h3>
            <p>
              تُستخدم بصمة الوجه (Apple Face ID) أو رمز PIN للتحقق المحلي من هوية المدير وصاحب المحل فقط داخل الجهاز، ولا يتم حفظ البيانات البيومترية خارج أجهزة أبل الرسمية.
            </p>

            <h3 className="text-base font-bold text-[#1d1d1f] pt-2">3. صلاحيات الكاميرا والمعرض</h3>
            <p>
              تُطلب صلاحية الكاميرا حصرياً لمسح باركود المنتجات ورمز الـ QR الخاص باقتران أجهزة الموظفين، بينما تُطلب صلاحية الصور فقط عند اختيار شعار المحل.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
