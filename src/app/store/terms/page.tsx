'use client';

import PageShell from '@/components/ui/PageShell';
import { FileText, Send, CheckCircle2 } from 'lucide-react';

export default function StoreTermsPage() {
  return (
    <PageShell>
      <div className="max-w-4xl mx-auto pb-24 pt-4">
        <div className="apple-studio-card p-8 sm:p-12 bg-white">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-black/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-[#0f766e] border border-black/8">
              <FileText size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#1d1d1f]">شروط الاستخدام والضمان (Terms of Service & Warranty)</h1>
              <p className="text-xs text-[#86868b]">متجر زمام ستور · تاريخ التحديث: أغسطس 2026</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-[#515154] leading-relaxed">
            <h3 className="text-base font-bold text-[#1d1d1f]">1. بنود الاشتراكات والضمان</h3>
            <p>
              يمنح كل كود اشتراك صلاحية تثبيت وتوقيع التطبيقات لجهاز واحد محدد بالـ UDID طوال فترة الباقة المحددة (30 أو 60 أو 150 أو 365 يوماً).
            </p>

            <h3 className="text-base font-bold text-[#1d1d1f]">2. سياسة التعويض واستبدال الشهادات</h3>
            <p>
              في حال إغلاق أو تعطيل الشهادة التوقيعية من قبل شركة Apple قبل انتهاء فترة الضمان المقررة في باقتك، يلتزم متجر زمام بتعويضك بشهادة جديدة وتفعيل جهازك دون أي رسوم إضافية.
            </p>

            <h3 className="text-base font-bold text-[#1d1d1f]">3. الدعم والتواصل الرسمي</h3>
            <p>
              يتم تقديم الدعم الفني وتحديثات التطبيقات حصرياً عبر قناة وحساب التليغرام الرسمي للمطور (@Jormunghandr).
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
