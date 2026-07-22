'use client';

import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';

export default function KhutaTermsPage() {
  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '60px 20px 100px', color: '#0F172A' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <Link href="/khuta" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#059669', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>
          <ArrowRight size={16} /> العودة إلى تطبيق خُطى
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: '#E6F4EA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
            <FileText size={24} />
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#0F172A', fontWeight: 800, margin: 0 }}>
            شروط الاستخدام واتفاقية الترخيص (EULA)
          </h1>
        </div>
        <p style={{ color: '#64748B', fontSize: '14px' }}>
          آخر تحديث: {new Date().toLocaleDateString('ar-SA')} | اتفاقية ترخيص المستخدم النهائي القياسية لتطبيق خُطى (GlassStep).
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: '#334155', lineHeight: 1.8, fontSize: '15px' }}>
        
        <section style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.12)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <h3 style={{ color: '#0F172A', fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>1. القبول بالشروط</h3>
          <p style={{ margin: 0 }}>
            بتحميلك واستخدامك لتطبيق <strong>خُطى (GlassStep)</strong>، فإنك توافق على الالتزام بشروط الاستخدام هذه. إذا كنت لا توافق على أي جزء من هذه الاتفاقية، يرجى الامتناع عن استخدام التطبيق.
          </p>
        </section>

        <section style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.12)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <h3 style={{ color: '#0F172A', fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>2. التنويه الطبي والنشاط الرياضي</h3>
          <p style={{ margin: 0 }}>
            تطبيق "خُطى" يوفر إحصائيات ومعادلات ترطيب استرشادية بناءً على معايير رياضية عامة (مثل الكلية الأمريكية للطب الرياضي ACSM). التطبيق <strong>ليس بديلاً عن الاستشارة الطبية المتخصصة</strong>، وينبغي دائماً استشارة طبيبك قبل ممارسة تمارين مكثفة إذا كانت لديك أي حالة صحية سابقة.
          </p>
        </section>

        <section style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.12)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <h3 style={{ color: '#0F172A', fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>3. اتفاقية ترخيص المستخدم النهائي القياسية من أبل (Apple EULA)</h3>
          <p style={{ margin: '0 0 10px' }}>
            تخضع ممارسات الترخيص والاستخدام لتطبيق خُطى للاتفاقية القياسية لشركة أبل (Standard Apple Licensed Application End User License Agreement):
          </p>
          <a 
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: '#059669', textDecoration: 'underline', fontWeight: 700 }}
          >
            عرض اتفاقية Apple EULA الرسمية →
          </a>
        </section>

        <section style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.12)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <h3 style={{ color: '#0F172A', fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>4. حقوق الملكية الفكرية</h3>
          <p style={{ margin: 0 }}>
            جميع الحقوق والأكواد والشعارات والتصميم الزجاجي Liquid Glass المعتمد في تطبيق خُطى هي حقوق محفوظة حصرياً للمطور (Al-Musawi).
          </p>
        </section>

      </div>

    </div>
  );
}
