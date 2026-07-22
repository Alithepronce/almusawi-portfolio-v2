'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Download, Smartphone, ShoppingBag, Star, MapPin, Bell,
  Heart, Truck, FileText, Shield, Search, Clock,
  CreditCard, Gift, ArrowRight, CheckCircle2, Sparkles, Layers
} from 'lucide-react';
import { AnimatedHero } from '@/components/warraq/Theme/AnimatedHero';
import { BentoGrid, BentoItem } from '@/components/warraq/Theme/BentoGrid';
import { InteractiveMockup } from '@/components/warraq/Theme/InteractiveMockup';

const features = [
  { icon: Search, title: 'اكتشف المكتبات', desc: 'تصفح واكتشف أفضل مكتبات الطباعة من حولك بسهولة', color: '#3B82F6', span: 8 },
  { icon: FileText, title: 'اطلب الطباعة بسهولة', desc: 'ارفق ملفاتك واختر التغليف بضغطة زر', color: '#8B5CF6', span: 4 },
  { icon: Layers, title: 'خيارات طباعة ذكية', desc: 'احفظ إعدادات وخيارات الطباعة المفضلة لديك لطلبها بسرعة فائقة', color: '#0EA5E9', span: 4 },
  { icon: Sparkles, title: 'ورّاق بريميوم 👑', desc: 'باقات مخصصة تمنحك أولوية طباعة قصوى وتثبيت شارة التميز وثيمات مظهر حصرية', color: '#FB923C', span: 8 },
  { icon: Clock, title: 'تتبع لحظي', desc: 'تحديثات مباشرة عن حالة طلبك وتنبيهات مستمرة', color: '#F59E0B', span: 4 },
  { icon: Heart, title: 'ألقاب ورتب تفاعلية', desc: 'ارتقِ برتبتك الدراسية مع كل طلب وافتح ثيمات مظهر حصرية للتطبيق', color: '#EC4899', span: 8 },
  { icon: Truck, title: 'توصيل لبابك', desc: 'توصيل مريح لباب منزلك أو جامعتك بأعلى سرعة من المندوبين', color: '#22C55E', span: 6 },
  { icon: Star, title: 'قيّم وشارك', desc: 'قيّم تجربتك مع المكتبات وساعد زملاءك في الاختيار', color: '#EF4444', span: 6 },
];

export default function CustomerAppPage() {
  return (
    <>
      <AnimatedHero
        badge="تطبيق العملاء"
        title="اطلب طباعتك من أقرب مكتبة إليك"
        subtitle="تطبيق ورّاق يربطك بمكتبات الطباعة القريبة. اطلب طباعة، تصوير، أو تغليف — وتتبع طلبك لحظة بلحظة ببساطة وأمان."
      >
        <a href="#download" className="w-btn w-btn-blue">
          <Download size={20} />
          تنزيل التطبيق
        </a>
        <Link href="/warraq/site" className="w-btn w-btn-outline">
          عودة للمنصة
          <ArrowRight size={16} />
        </Link>
      </AnimatedHero>

      {/* ═══ App Mockup ═══ */}
      <section className="w-section" style={{ background: 'var(--w-bg-subtle)' }}>
        <div className="w-container" style={{ textAlign: 'center' }}>
          <h2 className="w-section-title">تجربة مستخدم استثنائية</h2>
          <p className="w-section-subtitle">قمنا ببناء تطبيق العملاء ليكون الواجهة الأنظف والأسرع لأي عملية طباعة.</p>
          <div style={{ marginTop: 40 }}>
            <InteractiveMockup type="customer" />
          </div>
        </div>
      </section>

      {/* ═══ Core Features Bento ═══ */}
      <section className="w-section">
        <div className="w-container">
          <h2 className="w-section-title">ميزات التطبيق</h2>
          <BentoGrid>
            {features.map((f, i) => (
              <BentoItem key={i} colSpan={f.span as any} delay={i * 0.05}>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="w-icon-wrapper" style={{ color: f.color, background: `${f.color}15`, borderColor: `${f.color}25` }}>
                    <f.icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: 'var(--w-text-sec)' }}>{f.desc}</p>
                </div>
              </BentoItem>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* ═══ Download Section ═══ */}
      <section id="download" className="w-section" style={{ paddingBottom: 60 }}>
        <div className="w-container">
          <div className="w-card-glass" style={{
            textAlign: 'center', padding: '64px 32px',
            background: 'linear-gradient(145deg, var(--w-bg), var(--w-bg-subtle))',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'var(--w-primary)', filter: 'blur(100px)', opacity: 0.2 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <Download size={48} style={{ color: 'var(--w-primary)', marginBottom: 24, margin: '0 auto 24px auto' }} />
              <h2 className="w-section-title" style={{ fontSize: '2.5rem' }}>حمّل تطبيق ورّاق للعملاء</h2>
              <p className="w-section-subtitle" style={{ marginBottom: 32 }}>
                متاح على جميع الهواتف الذكية لتوفير الوقت والجهد.
              </p>

              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/warraq/site/customer/features" className="w-btn w-btn-outline">
                  استكشف كل المزايا بالتفصيل
                </Link>
                <a
                  href="https://www.mediafire.com/file/h9xrm2oy2h87v3h/warraq.apk/file"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-btn w-btn-primary"
                >
                  حمل النسخة التجريبية (APK)
                </a>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--w-text-muted)', marginTop: 24 }}>
                v2.0 • iOS 15+ / Android 8+
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
