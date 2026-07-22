'use client';

import { ShieldCheck } from 'lucide-react';

export default function GlamoraPrivacyPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px 80px' }}>
      <div style={{ padding: '40px', background: '#FFFFFF', borderRadius: '32px', border: '1px solid rgba(225, 29, 72, 0.15)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <div style={{ padding: '12px', background: 'rgba(225, 29, 72, 0.1)', borderRadius: '16px', color: '#E11D48' }}>
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: '#1C1917' }}>سياسة الخصوصية وحماية البيانات (Privacy Policy)</h1>
            <p style={{ fontSize: '0.85rem', color: '#78716C', margin: 0 }}>تاريخ التحديث: يوليو 2026</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#44403C', lineHeight: 1.7, fontSize: '0.95rem' }}>
          <p>
            نحن في <strong>تطبيق غلامورا (Glamora)</strong> نلتزم بأعلى معايير الحماية والسرية التامة لبيانات محلك ومبيعاتك وقواعد بيانات الموظفين والمخزون.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#E11D48', margin: '10px 0 0' }}>1. جمع البيانات واستخدامها</h3>
          <p>
            تطبيق Glamora لا يقوم ببيع أو مشاركة أي من بيانات محلك، المبيعات، الفواتير، أو الرواتب مع أي طرف ثالث على الإطلاق. تُحفظ البيانات محلياً على جهازك باستخدام تقنية <code>SwiftData</code> وتتزامن سحابياً وبشكل مشفر حصرياً بين أجهزة محلك الخاصة عبر خوادم <code>Supabase Realtime</code>.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#E11D48', margin: '10px 0 0' }}>2. الأمان والحماية الحيوية (Face ID / Touch ID)</h3>
          <p>
            تُستخدم بصمة الوجه (Face ID) أو رمز PIN للتحقق المحلي من هوية المدير وصاحب المحل فقط داخل الجهاز، ولا يتم حفظ البيانات البيومترية خارج أجهزة أبل الرسمية.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#E11D48', margin: '10px 0 0' }}>3. صلاحيات الكاميرا والمعرض</h3>
          <p>
            تُطلب صلاحية الكاميرا حصرياً لمسح باركود المنتجات ورمز الـ QR الخاص باقتران أجهزة الموظفين، بينما تُطلب صلاحية الصور فقط عند اختيار شعار المحل.
          </p>
        </div>
      </div>
    </div>
  );
}
