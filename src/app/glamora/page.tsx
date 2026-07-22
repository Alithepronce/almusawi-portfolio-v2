'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Zap, 
  Crown, 
  Users, 
  Printer, 
  Sparkles, 
  QrCode, 
  FileText,
  ChevronLeft,
  Apple,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

const appFeatures = [
  {
    id: 'pos',
    title: 'نقطة البيع الكاشير السريعة 🛒',
    subtitle: 'POS Cashier Register Desk',
    desc: 'واجهة بيع فائقة السرعة مخصصة للكاشير لإتمام المبيعات بلمحة عين مع سلة بيع تفاعلية، شريط بحث ذكي، ومسح الباركود بالكاميرا.',
    icon: ShoppingBag,
    color: '#E11D48',
    highlights: ['إضافة فورية بلمسة واحدة', 'سلة بيع فضائية مرنة', 'مسح باركود بالكاميرا المباشرة']
  },
  {
    id: 'cloud',
    title: 'التزامن السحابي المباشر ☁️',
    subtitle: 'Supabase Realtime Cloud Sync',
    desc: 'ربط ومزامنة كافة كاشيرات وأجهزة عمال المحل في الوقت الفعلي عبر سحابة Supabase، مع اقتران الأجهزة بـ QR مخصص لكل محل.',
    icon: QrCode,
    color: '#0284C7',
    highlights: ['مزامنة لحظية للمخزون والمبيعات', 'اقتران أجهزة العمال بـ QR', 'استرجاع الكتالوج لأي هاتف جديد']
  },
  {
    id: 'admin',
    title: 'لوحة الإدارة العميقة 👑',
    subtitle: 'Executive Face ID Dashboard',
    desc: 'واجهة تنفيدية ملوكية لصاحب المحل محمية ببصمة الوجه (Face ID) تتضمن تحليل الأرباح الصافية، رأس مال المخزون، وكشف Z-Report الشيفت.',
    icon: Crown,
    color: '#D97706',
    highlights: ['حماية أقتدارية بـ Face ID & PIN', 'كشف شيفت اليومية Z-Report', 'تقييم رأس مال البضاعة والأرباح']
  },
  {
    id: 'hr',
    title: 'إدارة الكادر والرواتب 👥',
    subtitle: 'HR & Staff Payroll Engine',
    desc: 'نظام إدارة موظفين كامل لحساب صافي الراتب المستحق تلقائياً، تتبع الحوافز (+) والخصومات والتأخيرات (-)، مع زر طرد وإلغاء الصلاحية.',
    icon: Users,
    color: '#9333EA',
    highlights: ['حساب أوتوماتيكي لصافي الراتب', 'تتبع الحوافز والتأخيرات والإجازات', 'إلغاء وتجميد صلاحية الموظف عن بُعد']
  },
  {
    id: 'receipts',
    title: 'تصدير وطباعة الوصولات 📄',
    subtitle: 'PNG & PDF Instant Receipts',
    desc: 'توليد وصولات فخمة فورية تتضمن اسم المحل، اسم البائع، نوع الجهاز، رقم الوصل التسلسلي (#1001)، وإمكانية المشاركة عبر WhatsApp.',
    icon: Printer,
    color: '#059669',
    highlights: ['ترقيم تسلسلي منظم (#1001)', 'طباعة اسم البائع والجهاز', 'تصدير صورة PNG و PDF للطباعة']
  },
  {
    id: 'killswitch',
    title: 'مفتاح طوارئ نقاط البيع ⚡️',
    subtitle: 'POS Remote Kill Switch',
    desc: 'زر إطفاء طارئ يتيح للمدير تجميد كافة نقاط البيع وأجهزة العمال عن بُعد فورياً ومنع أي عملية بيع عند الحاجة.',
    icon: Zap,
    color: '#DC2626',
    highlights: ['تجميد أجهزة الكاشير بلمسة زر', 'حظر فوري للبيع والتعديل', 'إعادة التفعيل السريع من صاحب المحل']
  }
];

export default function GlamoraPage() {
  const [activeFeatureId, setActiveFeatureId] = useState('pos');
  const selectedFeature = appFeatures.find(f => f.id === activeFeatureId) || appFeatures[0];

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '20px 20px 60px' }}>
      
      {/* HERO SECTION */}
      <section style={{ padding: '20px 0 60px', textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: 'rgba(225, 29, 72, 0.1)', color: '#E11D48', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '24px' }}
        >
          <Sparkles size={16} /> النظام القيادي الفاخر لمحلات الكوزمتكس والتجميل
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4.2rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '20px', color: '#1C1917' }}
        >
          تطبيق غلامورا (Glamora) <br />
          <span style={{ fontSize: '75%', fontWeight: 700, color: '#E11D48' }}>
            إدارة المخزون ونقاط البيع الكاشير الفاخرة
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1.1rem', color: '#57534E', maxWidth: '780px', margin: '0 auto 36px', lineHeight: 1.6 }}
        >
          حل برمجي متكامل مصمم خصيصاً لمتاجر الكوزمتكس والتجميل؛ يدمج بين نقطة البيع الكاشير السريعة، التزامن السحابي المباشر عبر Supabase، إدارة الرواتب وكادر العمال HR، وقفل الإدارة التنفيذية ببصمة الوجه (Face ID).
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a 
            href="#app-features" 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)', color: '#FFF', borderRadius: '99px', fontSize: '1rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 12px 24px -6px rgba(225, 29, 72, 0.4)' }}
          >
            <Apple size={20} /> استكشف مزايا التطبيق
          </a>
          
          <Link 
            href="/glamora/support"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 28px', background: 'rgba(255,255,255,0.9)', color: '#44403C', borderRadius: '99px', fontSize: '1rem', fontWeight: 700, border: '1px solid rgba(0,0,0,0.1)', textDecoration: 'none' }}
          >
            <PhoneCall size={18} /> التواصل والدعم الفني
          </Link>
        </motion.div>
      </section>

      {/* MODULE SELECTOR GRID */}
      <section id="app-features" style={{ padding: '0 0 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {appFeatures.map((feature) => {
            const Icon = feature.icon;
            const isSelected = feature.id === activeFeatureId;
            return (
              <div
                key={feature.id}
                onClick={() => setActiveFeatureId(feature.id)}
                style={{
                  padding: '24px',
                  borderRadius: '24px',
                  background: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                  border: isSelected ? `2px solid ${feature.color}` : '1px solid rgba(225, 29, 72, 0.1)',
                  boxShadow: isSelected ? '0 20px 30px -10px rgba(225, 29, 72, 0.15)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: `${feature.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: feature.color }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#1C1917' }}>{feature.title}</h3>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#A8A29E' }}>{feature.subtitle}</span>
                  </div>
                </div>
                
                <p style={{ fontSize: '0.9rem', color: '#78716C', lineHeight: 1.5, margin: '0 0 16px' }}>
                  {feature.desc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {feature.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 600, color: feature.color }}>
                      <CheckCircle2 size={14} /> {h}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* DETAILED FEATURE BANNER */}
        <div style={{ padding: '40px', borderRadius: '32px', background: 'linear-gradient(135deg, #1C1917 0%, #4C0519 100%)', color: '#FFF', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '12px', borderRadius: '16px', background: 'rgba(255,255,255,0.1)', color: '#FDA4AF' }}>
              <Sparkles size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#FFF' }}>تفاصيل نظام {selectedFeature.title}</h2>
              <p style={{ fontSize: '0.9rem', color: '#FECDD3', margin: 0 }}>مخصص لمحلات الكوزمتكس والتجميل الاحترافية</p>
            </div>
          </div>
          
          <p style={{ fontSize: '1.05rem', color: '#FFE4E6', lineHeight: 1.7, margin: 0 }}>
            {selectedFeature.desc} تم تنظيم كافة الوظائف لتمنحك أداءً فائقاً مع تزامن لحظي بين كافة كاشيرات المحل، مع حماية تامة بالـ PIN والـ Face ID لضمان سرية أرباح ورأس مال المحل.
          </p>
        </div>
      </section>
    </div>
  );
}
