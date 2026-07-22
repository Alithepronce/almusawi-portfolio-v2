'use client';

import { PhoneCall } from 'lucide-react';

export default function GlamoraSupportPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px 80px' }}>
      <div style={{ padding: '40px', background: '#FFFFFF', borderRadius: '32px', border: '1px solid rgba(225, 29, 72, 0.15)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', background: 'rgba(225, 29, 72, 0.1)', borderRadius: '20px', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <PhoneCall size={32} />
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 10px', color: '#1C1917' }}>مركز الدعم والمساعدة الفنية المباشرة</h1>
        <p style={{ fontSize: '1rem', color: '#78716C', maxWidth: '550px', margin: '0 auto 30px', lineHeight: 1.6 }}>
          نحن هنا لدعمك وتلبية جميع استفساراتك حول تشغيل تطبيق Glamora، ربط أجهزة الكاشير، وإدارة التزامن السحابي.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', textAlign: 'right' }}>
          <div style={{ padding: '20px', borderRadius: '20px', background: '#FFF1F2', border: '1px solid rgba(225, 29, 72, 0.15)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 6px', color: '#E11D48' }}>البريد الإلكتروني للدعم المباشر</h4>
            <p style={{ fontSize: '0.9rem', color: '#44403C', margin: 0 }}>gamegdeo@gmail.com</p>
          </div>

          <div style={{ padding: '20px', borderRadius: '20px', background: '#FFF1F2', border: '1px solid rgba(225, 29, 72, 0.15)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 6px', color: '#E11D48' }}>الاستفسارات والمساعدة</h4>
            <p style={{ fontSize: '0.9rem', color: '#44403C', margin: 0 }}>متاح 24/7 لمساعدة أصحاب المحلات</p>
          </div>
        </div>
      </div>
    </div>
  );
}
