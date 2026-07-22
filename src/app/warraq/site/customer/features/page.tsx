'use client';

import { motion } from 'framer-motion';
import { 
  Smartphone, Zap, MapPin, CreditCard, 
  BellRing, Star, Clock, ShieldCheck, ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Zap,
    title: 'طلب فوري وبدون احتكاك',
    desc: 'واجهة مستخدم مدعومة بالذكاء الاصطناعي تفهم احتياجاتك. اطلب طباعة ملازمك وتغليفها بـ 3 نقرات فقط، مع نظام ذكي لحفظ تفضيلاتك السابقة للطلبات المتكررة.',
    color: '#2563EB'
  },
  {
    icon: MapPin,
    title: 'اكتشاف المكتبات الذكي',
    desc: 'خريطة تفاعلية تعرض أقرب المكتبات إليك، مع تقييمات حقيقية، أوقات العمل، ومعرفة حالة الازدحام في المكتبة قبل التوجه إليها.',
    color: '#0ea5e9'
  },
  {
    icon: Clock,
    title: 'تتبع الطلب الحي (Live Tracking)',
    desc: 'لا حاجة للانتظار في المكتبة. تابع تقدم طلبك خطوة بخطوة من التطبيق. من لحظة استلام الطلب حتى يجهز تماماً، مع إشعارات دفع لحظية.',
    color: '#8b5cf6'
  },
  {
    icon: CreditCard,
    title: 'دفع رقمي آمن',
    desc: 'محفظة مدمجة وخيارات دفع متعددة. ادفع عبر التطبيق مباشرة واستلم طلبك دون الحاجة لحمل المبالغ النقدية وتضييع الوقت.',
    color: '#10b981'
  },
  {
    icon: ShieldCheck,
    title: 'أمان البيانات المطلق',
    desc: 'كل مستنداتك وملفاتك مشفرة تشفيراً تاماً. تُحذف الملفات تلقائياً من خوادمنا بمجرد اكتمال طباعتها لضمان خصوصيتك الكاملة.',
    color: '#f59e0b'
  },
  {
    icon: Star,
    title: 'برنامج الولاء المكافئ',
    desc: 'اكسب النقاط مع كل طلب طباعة. استبدل نقاطك بخصومات ضخمة أو طباعة مجانية في مكتباتك المفضلة.',
    color: '#ec4899'
  }
];

export default function CustomerFeaturesPage() {
  return (
    <div className="w-container" style={{ paddingTop: 80, paddingBottom: 100 }}>
      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: 80, maxWidth: 800, margin: '0 auto 80px auto' }}
      >
        <div className="w-icon-wrapper" style={{ margin: '0 auto 24px auto', width: 80, height: 80, background: 'rgba(37,99,235,0.1)', color: '#2563EB' }}>
          <Smartphone size={40} />
        </div>
        <h1 className="w-section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.2, marginBottom: 24 }}>
          تجربة العميل، <span style={{ color: '#2563EB' }}>أُعيد ابتكارها.</span>
        </h1>
        <p className="w-section-subtitle" style={{ fontSize: '1.25rem', margin: '0 auto 40px auto' }}>
          تطبيق ورّاق للعملاء ليس مجرد وسيلة لطلب الطباعة. إنه مساعدك الشخصي الذكي، المصمم ليمنحك تجربة سلسة، سريعة، وفائقة التطور.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link href="/warraq/site/customer" className="w-btn" style={{ background: '#2563EB', color: '#fff' }}>
            العودة للتطبيق <ArrowRight size={18} style={{ marginRight: 8, transform: 'rotate(180deg)' }} />
          </Link>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="w-bento-grid">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div 
              key={i}
              className="w-card-glass w-col-span-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'column', padding: 40 }}
            >
              <div className="w-icon-wrapper" style={{ background: `${feature.color}15`, color: feature.color, marginBottom: 24, width: 56, height: 56 }}>
                <Icon size={28} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: 16 }}>{feature.title}</h3>
              <p style={{ color: 'var(--w-text-sec)', lineHeight: 1.8, fontSize: '1.0625rem' }}>
                {feature.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Massive CTA */}
      <motion.div 
        className="w-card-glass"
        style={{ marginTop: 80, padding: 60, textAlign: 'center', background: 'linear-gradient(135deg, rgba(37,99,235,0.05) 0%, rgba(37,99,235,0) 100%)', border: '1px solid rgba(37,99,235,0.2)' }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: 16 }}>مستعد لتغيير طريقتك في الطباعة؟</h2>
        <p style={{ color: 'var(--w-text-sec)', marginBottom: 32, fontSize: '1.25rem' }}>حمّل التطبيق الآن وانضم لآلاف المستخدمين الراضين.</p>
        <a href="https://www.mediafire.com/file/h9xrm2oy2h87v3h/warraq.apk/file" target="_blank" rel="noopener noreferrer" className="w-btn w-btn-primary" style={{ padding: '16px 32px', fontSize: '1.125rem' }}>
          حمل التطبيق مجاناً
        </a>
      </motion.div>
    </div>
  );
}
