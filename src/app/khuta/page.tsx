'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Activity, 
  ShieldCheck, 
  Zap, 
  Droplets, 
  Trophy, 
  Smartphone, 
  Sparkles, 
  Footprints, 
  Dumbbell, 
  Trees, 
  ChevronLeft,
  Apple,
  CheckCircle2
} from 'lucide-react';

const screenshots = [
  {
    id: 'photo_1',
    src: '/khuta/photo_1_2026-07-20_16-38-45.jpg',
    title: 'لوحة القيادة ونمط الحديقة',
    desc: 'حلقة التقدم الزجاجية السائلة مع نسبة الهدف اليومي ومؤشر الأكسجين والتعافي العضلي.',
    tag: 'الواجهة الرئيسية'
  },
  {
    id: 'photo_5',
    src: '/khuta/photo_5_2026-07-20_16-38-45.jpg',
    title: 'نمط الشارع والمدينة',
    desc: 'معدل السرعة والخطوة بالحضر مع إرشادات استراحة 5 دقائق لحماية المفاصل.',
    tag: 'الأنماط الحركية'
  },
  {
    id: 'photo_6',
    src: '/khuta/photo_6_2026-07-20_16-38-45.jpg',
    title: 'نمط الجيم والحديد',
    desc: 'مراقبة التمارين المكثفة وتوقيت الراحة التكتيكية 60-90 ثانية بين المجموعات.',
    tag: 'الأنماط الحركية'
  },
  {
    id: 'photo_2',
    src: '/khuta/photo_2_2026-07-20_16-38-45.jpg',
    title: 'التحديات الحركية اليومية',
    desc: 'تحدي الساعة الذهبية، المشي المستمر 15 دقيقة، وسلسلة الاستمرارية الزجاجية.',
    tag: 'التحديات'
  },
  {
    id: 'photo_3',
    src: '/khuta/photo_3_2026-07-20_16-38-45.jpg',
    title: 'الملف الشخصي و 18 وسام إنجاز',
    desc: 'نظام مستويات الـ XP وأوسمة الإنجازات المتنوعة للالتزام والنشاط.',
    tag: 'الإنجازات'
  },
  {
    id: 'photo_4',
    src: '/khuta/photo_4_2026-07-20_16-38-45.jpg',
    title: 'مركز التحكم والتخصيص',
    desc: 'ضبط معادلة الترطيب الطبي ACSM وأهداف السعرات والخطوات وتخصيص البطاقات.',
    tag: 'الإعدادات'
  },
  {
    id: 'photo_7',
    src: '/khuta/photo_7_2026-07-20_16-38-45.jpg',
    title: 'السجل الأسبوعي ومؤشر التعافي',
    desc: 'رسوم بيانية تفاعلية لمقارنة النشاط اليومي بالهدف مع مؤشر تجديد الطاقة.',
    tag: 'التقارير'
  }
];

const badgesList = [
  { name: 'الخطوة الأولى', desc: 'تسجيل أول 100 خطوة' },
  { name: 'شرارة الإرادة', desc: 'إكمال 5,000 خطوة يومياً' },
  { name: 'شعلة الاستمرار', desc: 'تحقيق الهدف 3 أيام متتالية' },
  { name: 'تاج الالتزام', desc: 'إكمال 10,000 خطوة يومياً' },
  { name: 'وحش الجيم', desc: 'تفعيل نمط التدريب المكثف' },
  { name: 'عاشق الطبيعة', desc: 'مشي 30 دقيقة في الحديقة' },
  { name: 'رفيق الماء', desc: 'تحقيق هدف الترطيب الطبي' },
  { name: 'أوسمة سرية', desc: '11 وسام إضافي يفتح مع التقدم' },
];

export default function KhutaPage() {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const activeScreen = screenshots[activeScreenIndex];

  return (
    <div style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #F0FDF4 50%, #FFFFFF 100%)', color: '#0F172A', overflow: 'hidden' }}>
      
      {/* Ambient Soft Mint Orbs */}
      <div style={{ position: 'absolute', top: '2%', right: '5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(90px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', left: '0%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(90px)', pointerEvents: 'none' }} />

      {/* HERO SECTION */}
      <section style={{ padding: '60px 20px 80px', maxWidth: '1150px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '6px 18px', 
            borderRadius: '50px', 
            background: '#E6F4EA', 
            border: '1px solid rgba(16, 185, 129, 0.25)', 
            color: '#059669', 
            fontSize: '13px', 
            fontWeight: 700, 
            marginBottom: '24px' 
          }}
        >
          <Sparkles size={15} /> تصميم زجاجي سائل ناعم • Liquid Glass Minimalist UI
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ 
            fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', 
            fontWeight: 800, 
            lineHeight: 1.15, 
            marginBottom: '20px',
            color: '#0F172A',
            letterSpacing: '-1px'
          }}
        >
          تطبيق خُطى <span style={{ color: '#059669', fontWeight: 800 }}>(GlassStep)</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
            color: '#475569', 
            maxWidth: '780px', 
            margin: '0 auto 40px', 
            lineHeight: 1.85,
            fontWeight: 400
          }}
        >
          تطبيق آيفون فائق الدقة بتصميم زجاجي سائل مخصص لتتبع الخطوات اليومية، أنظمة الترطيب الطبي، وتحديات الحركة ويعمل محلياً 100% بدون خوادم وبدون استهلاك للبطارية.
        </motion.p>

        {/* App Store Badge CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: '60px' }}
        >
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 28px',
              borderRadius: '18px',
              background: '#0F172A',
              color: '#FFFFFF',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.2)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <Apple size={28} />
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#94A3B8' }}>قريباً على متجر تطبيقات أبل</span>
              <span style={{ display: 'block', fontSize: '18px', fontWeight: 700, letterSpacing: '-0.3px' }}>App Store</span>
            </div>
          </div>

          <a
            href="#modes"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 26px',
              borderRadius: '18px',
              background: '#FFFFFF',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              color: '#059669',
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
            }}
          >
            استكشاف الأنماط الثلاثة <ChevronLeft size={18} />
          </a>
        </motion.div>

        {/* INTERACTIVE SCREENSHOT SHOWCASE */}
        <div style={{ marginTop: '20px' }}>
          
          {/* Navigation Pills */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
            {screenshots.map((screen, idx) => (
              <button
                key={screen.id}
                onClick={() => setActiveScreenIndex(idx)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '30px',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: activeScreenIndex === idx ? '1px solid #10B981' : '1px solid rgba(0,0,0,0.08)',
                  background: activeScreenIndex === idx ? '#10B981' : '#FFFFFF',
                  color: activeScreenIndex === idx ? '#FFFFFF' : '#475569',
                  cursor: 'pointer',
                  boxShadow: activeScreenIndex === idx ? '0 4px 14px rgba(16, 185, 129, 0.3)' : '0 2px 8px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s'
                }}
              >
                {screen.title}
              </button>
            ))}
          </div>

          {/* Light Frame Mockup */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <motion.div
              key={activeScreen.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '325px',
                height: '650px',
                borderRadius: '46px',
                padding: '10px',
                background: '#FFFFFF',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12), 0 0 30px rgba(16, 185, 129, 0.15)',
                border: '4px solid #E2E8F0',
                overflow: 'hidden'
              }}
            >
              <Image
                src={activeScreen.src}
                alt={activeScreen.title}
                fill
                style={{ objectFit: 'cover', borderRadius: '36px' }}
                priority
              />
            </motion.div>

            <div style={{ 
              maxWidth: '520px', 
              textAlign: 'center', 
              background: '#FFFFFF', 
              padding: '18px 24px', 
              borderRadius: '20px', 
              border: '1px solid rgba(16, 185, 129, 0.15)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
            }}>
              <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 800 }}>{activeScreen.tag}</span>
              <h3 style={{ fontSize: '18px', color: '#0F172A', fontWeight: 800, margin: '4px 0 6px' }}>{activeScreen.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748B', margin: 0, lineHeight: 1.6 }}>{activeScreen.desc}</p>
            </div>
          </div>
        </div>

      </section>

      {/* CORE PILLARS GRID */}
      <section style={{ padding: '80px 20px', background: '#FFFFFF', borderTop: '1px solid rgba(0, 0, 0, 0.05)', borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0F172A', fontWeight: 800, marginBottom: '14px' }}>
              لماذا تطبيق خُطى؟
            </h2>
            <p style={{ color: '#64748B', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
              مصمم ليكون الرفيق الحركي الأفضل والأكثر أماناً على جهاز الآيفون الخاص بك دون أي مساس بالخصوصية.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            
            {/* Pillar 1 */}
            <div style={{ padding: '32px', borderRadius: '24px', background: '#F8FAFC', border: '1px solid rgba(16, 185, 129, 0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#E6F4EA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669', marginBottom: '20px' }}>
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ color: '#0F172A', fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>خصوصية مطلقة 100%</h3>
              <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                تعديل وتتبع الأرقام يتم محلياً 100% على جهاز الآيفون. لا توجد خوادم ولا يتم جمع أو نقل بياناتك إطلاقاً خارج جهازك.
              </p>
            </div>

            {/* Pillar 2 */}
            <div style={{ padding: '32px', borderRadius: '24px', background: '#F8FAFC', border: '1px solid rgba(16, 185, 129, 0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706', marginBottom: '20px' }}>
                <Zap size={26} />
              </div>
              <h3 style={{ color: '#0F172A', fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>0% استهلاك بطارية إضافي</h3>
              <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                يعتمد التطبيق بشكل مباشر على مستشعرات <code style={{ color: '#D97706', fontWeight: 700 }}>CoreMotion</code> المدمجة بالأيفون بدون تشغيل GPS خلفي.
              </p>
            </div>

            {/* Pillar 3 */}
            <div style={{ padding: '32px', borderRadius: '24px', background: '#F8FAFC', border: '1px solid rgba(16, 185, 129, 0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', marginBottom: '20px' }}>
                <Droplets size={26} />
              </div>
              <h3 style={{ color: '#0F172A', fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>حساب الترطيب الطبي (ACSM)</h3>
              <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                حساب الاحتياج المائي اليومي وفق المعايير الطبية للكلية الأمريكية للطب الرياضي استناداً للوزن والطول ومعدل التعرق.
              </p>
            </div>

            {/* Pillar 4 */}
            <div style={{ padding: '32px', borderRadius: '24px', background: '#F8FAFC', border: '1px solid rgba(16, 185, 129, 0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA', marginBottom: '20px' }}>
                <Trophy size={26} />
              </div>
              <h3 style={{ color: '#0F172A', fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>تحديات و 18 وسام إنجاز</h3>
              <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                نظام تحفيزي يمنحك نقاط XP ومستويات متصاعدة وأوسمة متنوعة كـ "سلسلة الاستمرارية الزجاجية" وتحديات الساعة الذهبية.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3 TACTICAL MODES SHOWCASE */}
      <section id="modes" style={{ padding: '90px 20px', maxWidth: '1150px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: '#10B981', fontSize: '13px', fontWeight: 800 }}>التكيف مع بيئتك الحركية</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0F172A', fontWeight: 800, marginTop: '6px' }}>
            الأنماط الحركية الثلاثة
          </h2>
          <p style={{ color: '#64748B', fontSize: '16px', maxWidth: '650px', margin: '10px auto 0' }}>
            تغير واجهة التطبيق ألوانها وخوارزمياتها وتنبيهاتها بحسب المكان والنشاط!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          
          {/* Nature Mode */}
          <div style={{ background: '#FFFFFF', borderRadius: '26px', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '32px', boxShadow: '0 8px 30px rgba(16, 185, 129, 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                <Trees size={22} />
              </div>
              <h3 style={{ color: '#0F172A', fontSize: '22px', fontWeight: 800, margin: 0 }}>نمط الحديقة والطبيعة</h3>
            </div>
            <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
              مخصص لمشي المنتزهات والتعافي العضلي والمشي في الهواء الطلق لتصفية الذهن.
            </p>
            <div style={{ background: '#E6F4EA', padding: '12px 16px', borderRadius: '14px', borderRight: '4px solid #10B981', fontSize: '13px', color: '#047857', fontWeight: 700 }}>
              🍃 "المشي بين الأشجار يُحفّز التنفس العميق ويرفع نسبة التعافي العضلي."
            </div>
          </div>

          {/* Urban Street Mode */}
          <div style={{ background: '#FFFFFF', borderRadius: '26px', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '32px', boxShadow: '0 8px 30px rgba(6, 182, 212, 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: '#06B6D4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                <Footprints size={22} />
              </div>
              <h3 style={{ color: '#0F172A', fontSize: '22px', fontWeight: 800, margin: 0 }}>نمط الشارع والمدينة</h3>
            </div>
            <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
              مخصص لتنقلات الطرقات والحضر، ينسق الخطوة ويعطي تنبيهات لحماية المفاصل.
            </p>
            <div style={{ background: '#E0F2FE', padding: '12px 16px', borderRadius: '14px', borderRight: '4px solid #06B6D4', fontSize: '13px', color: '#0369A1', fontWeight: 700 }}>
              🚶‍♂️ "استرح 5 دقائق كل 30 دقيقة مشي متواصل لتقليل الإجهاد على المفاصل."
            </div>
          </div>

          {/* Gym Mode */}
          <div style={{ background: '#FFFFFF', borderRadius: '26px', border: '1px solid rgba(249, 115, 22, 0.2)', padding: '32px', boxShadow: '0 8px 30px rgba(249, 115, 22, 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                <Dumbbell size={22} />
              </div>
              <h3 style={{ color: '#0F172A', fontSize: '22px', fontWeight: 800, margin: 0 }}>نمط الجيم والحديد</h3>
            </div>
            <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
              مخصص للتمرين المكثف في الصالة الرياضية وتوقيت فترات الراحة التكتيكية.
            </p>
            <div style={{ background: '#FFEDD5', padding: '12px 16px', borderRadius: '14px', borderRight: '4px solid #F97316', fontSize: '13px', color: '#C2410C', fontWeight: 700 }}>
              🏋️ "خذ 60-90 ثانية راحة بين المجموعات. استراحة 3 دقائق كل 20 دقيقة تدريب."
            </div>
          </div>

        </div>
      </section>

      {/* BADGES SHOWCASE */}
      <section style={{ padding: '80px 20px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.4rem', color: '#0F172A', fontWeight: 800 }}>أوسمة الإنجاز ونظام الـ XP</h2>
            <p style={{ color: '#64748B', fontSize: '15px' }}>تحول خطواتك اليومية إلى رحلة تقدم تمنحك الأوسمة والنقاط عند تحقيق الأهداف.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '16px' }}>
            {badgesList.map((badge, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: '#F8FAFC', 
                  border: '1px solid rgba(16, 185, 129, 0.12)', 
                  padding: '20px', 
                  borderRadius: '20px', 
                  textAlign: 'center' 
                }}
              >
                <h4 style={{ color: '#0F172A', fontSize: '16px', fontWeight: 800, margin: '0 0 4px' }}>{badge.name}</h4>
                <p style={{ color: '#64748B', fontSize: '12px', margin: 0 }}>{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP STORE ANNOUNCEMENT */}
      <section style={{ padding: '90px 20px', maxWidth: '950px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
          borderRadius: '32px', 
          padding: '50px 24px', 
          color: '#FFFFFF',
          boxShadow: '0 20px 50px rgba(16, 185, 129, 0.25)' 
        }}>
          <Apple size={48} style={{ margin: '0 auto 16px', display: 'block' }} />
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            سيتم إطلاق تطبيق "خُطى" قريباً على App Store
          </h2>
          <p style={{ color: '#D1FAE5', fontSize: '16px', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.8 }}>
            سيتاح التطبيق لجميع أجهزة iPhone و Apple Watch عبر متجر تطبيقات أبل مباشرة.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', fontSize: '14px', fontWeight: 700, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '24px' }}>
            <Link href="/khuta/privacy" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>سياسة الخصوصية الرسمية</Link>
            •
            <Link href="/khuta/support" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>مركز الدعم والأسئلة الشائعة</Link>
            •
            <Link href="/khuta/terms" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>شروط الاستخدام (EULA)</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
