'use client';

import { FileText } from 'lucide-react';

export default function GlamoraTermsPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px 80px' }}>
      <div style={{ padding: '40px', background: '#FFFFFF', borderRadius: '32px', border: '1px solid rgba(225, 29, 72, 0.15)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <div style={{ padding: '12px', background: 'rgba(217, 119, 6, 0.1)', borderRadius: '16px', color: '#D97706' }}>
            <FileText size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: '#1C1917' }}>سياسة الشروط والأحكام والاستخدام (Terms of Service)</h1>
            <p style={{ fontSize: '0.85rem', color: '#78716C', margin: 0 }}>تاريخ التحديث: يوليو 2026</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#44403C', lineHeight: 1.7, fontSize: '0.95rem' }}>
          <p>
            باستخدامك لتطبيق <strong>Glamora</strong>، فإنك توافق على الشروط والأحكام التنظيمية التالية الخاصة بالترخيص والاستخدام:
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#D97706', margin: '10px 0 0' }}>1. ترخيص الاستخدام التجاري</h3>
          <p>
            يُمنح تطبيق Glamora للمحلات التجارية والمتاجر لإدارة نقاط البيع والمخزون، ويتحمل المالك مسؤولية الحفاظ على رمز الـ PIN الخاص بالإدارة العميقة وعدم مشاركته مع غير المصرح لهم.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#D97706', margin: '10px 0 0' }}>2. أجهزة الموظفين واقتران الـ QR</h3>
          <p>
            يحق لصاحب المحل تجميد أو طرد أي جهاز كاشير مقترن عبر زر مفتاح الطوارئ (POS Kill Switch) أو إلغاء الصلاحية من لوحة التحكم، وتخضع جميع عمليات البيع لتدقيق المسجل المباشر.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#D97706', margin: '10px 0 0' }}>3. النسخ الاحتياطي واستعادة البيانات</h3>
          <p>
            يُنصح صاحب المحل بتصدير ملف النسخة الاحتياطية (JSON Backup) بانتظام من شاشة الإعدادات للحفاظ على نسخة احتياطية من كتالوج البضاعة.
          </p>
        </div>
      </div>
    </div>
  );
}
