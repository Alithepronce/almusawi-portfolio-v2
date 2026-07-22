'use client';

import Link from 'next/link';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';

export default function KhutaPrivacyPage() {
  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '60px 20px 100px', color: '#0F172A' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <Link href="/khuta" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#059669', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>
          <ArrowRight size={16} /> العودة إلى تطبيق خُطى
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: '#E6F4EA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
            <ShieldCheck size={24} />
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#0F172A', fontWeight: 800, margin: 0 }}>
            سياسة الخصوصية — تطبيق خُطى (GlassStep)
          </h1>
        </div>
        <p style={{ color: '#64748B', fontSize: '14px' }}>
          آخر تحديث: {new Date().toLocaleDateString('ar-SA')} | متوافقة مع متطلبات Apple App Store الخصوصية 100%.
        </p>
      </div>

      {/* Main Commitment */}
      <div style={{ background: '#E6F4EA', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '22px', padding: '24px 28px', marginBottom: '36px' }}>
        <h3 style={{ color: '#047857', fontSize: '18px', fontWeight: 800, margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Lock size={20} /> الخلاصة والتعهد بالخصوصية:
        </h3>
        <p style={{ color: '#065F46', fontSize: '15px', lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
          تطبيق <strong>خُطى (GlassStep)</strong> مصمم على مبدأ <strong>"الخصوصية المحلية المطلقة" (Offline & Local First)</strong>. لا نقوم بجمع أو تخزين أو نقل أو مشاركة أي بيانات شخصية أو حركية أو طبية نهائياً. كل بيانات خطواتك وسعراتك ومؤشراتك تبقى مخزنة محلياً على جهاز الآيفون الخاص بك فقط ولا تغادره تحت أي ظرف.
        </p>
      </div>

      {/* Detailed Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: '#334155', lineHeight: 1.8, fontSize: '15px' }}>
        
        <section style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.12)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <h3 style={{ color: '#0F172A', fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>1. نوع البيانات والمستشعرات المطلوبة</h3>
          <p style={{ margin: '0 0 10px' }}>
            يطلب التطبيق إذن الوصول لمستشعر الحركة والنشاط الرياضي في iOS (<code style={{ color: '#059669', fontWeight: 700 }}>NSMotionUsageDescription</code>). يتم استخدام هذا الإذن فقط لحساب عدد الخطوات والمسافة وسعرات الحرق عبر حزمة <code style={{ color: '#059669', fontWeight: 700 }}>CoreMotion / CMPedometer</code> الرسمية من أبل.
          </p>
          <ul style={{ paddingRight: '20px', margin: 0, color: '#64748B' }}>
            <li>عدد الخطوات اليومي والمسافة بالكيلومترات.</li>
            <li>بيانات الطول والوزن المعطاة خيارياً لحساب معادلة الترطيب السائل (ACSM).</li>
            <li>لا يتم الوصول نهائياً للموقع الجغرافي (GPS) أو الكاميرا أو الصور أو جهات الاتصال.</li>
          </ul>
        </section>

        <section style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.12)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <h3 style={{ color: '#0F172A', fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>2. عدم وجود خوادم خارجية (No External Servers)</h3>
          <p style={{ margin: 0 }}>
            لا يملك تطبيق "خُطى" أي خادم سحابي (Cloud Server) ولا يتطلب إنشاء حساب أو تسجيل دخول بالبريد الإلكتروني أو رقم الهاتف. لا يتم استخدام أي أدوات تتبع خارجية أو تحليلات طرف ثالث (No 3rd Party Analytics).
          </p>
        </section>

        <section style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.12)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <h3 style={{ color: '#0F172A', fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>3. التحكم بالبيانات وحذفها (Data Removal & Control)</h3>
          <p style={{ margin: '0 0 10px' }}>
            جميع بياناتك مخزنة 100% في التخزين المحلي لتطبيق الآيفون (<code style={{ color: '#059669', fontWeight: 700 }}>AppStorage / UserDefaults</code>). يمكنك مسح كافة بياناتك وسجلك بالكامل في أي وقت مجاناً وببساطة عبر:
          </p>
          <div style={{ background: '#FEF3C7', padding: '12px 16px', borderRadius: '12px', borderRight: '4px solid #D97706', color: '#92400E', fontSize: '14px', fontWeight: 600 }}>
            حذف تطبيق "خُطى" من جهازك الآيفون يزيل فوراً ودائماً كافة أوسمة وسجلات وأهداف الحركة الخاصة بك.
          </div>
        </section>

        <section style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.12)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <h3 style={{ color: '#0F172A', fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>4. التواصل والاستفسارات الخصوصية</h3>
          <p style={{ margin: 0 }}>
            إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية الخاصة بتطبيق خُطى، يرجى التواصل مباشرة مع المطور عبر البريد الإلكتروني: <a href="mailto:gamegdeo@gmail.com" style={{ color: '#059669', fontWeight: 700, textDecoration: 'underline' }}>gamegdeo@gmail.com</a>
          </p>
        </section>

      </div>

    </div>
  );
}
