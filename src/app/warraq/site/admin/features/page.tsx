'use client';

import { motion } from 'framer-motion';
import { 
  Building2, LineChart, WifiOff, Users, 
  Printer, ScrollText, ShieldCheck, ArrowRight, Kanban 
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Kanban,
    title: 'نظام إدارة المهام (Kanban)',
    desc: 'ودّع الفوضى والأوراق المتناثرة. نظام سحب وإفلات تفاعلي لإدارة الطلبات من (جديد) إلى (قيد التنفيذ) ثم (جاهز للتسليم). كل شيء منظم في شاشة واحدة.',
    color: '#F97316'
  },
  {
    icon: LineChart,
    title: 'لوحة تحكم تحليلية (Bento Dashboard)',
    desc: 'احصل على نظرة شاملة لأداء مكتبتك. إيرادات اليوم، الطلبات المعلقة، أكثر الخدمات مبيعاً، وتحليلات أداء الموظفين. بيانات دقيقة لاتخاذ قرارات أذكى.',
    color: '#8b5cf6'
  },
  {
    icon: WifiOff,
    title: 'جاهزية (Offline-First)',
    desc: 'انقطع الإنترنت؟ لا مشكلة. استمر في تسجيل الطلبات وإدارة متجرك محلياً. سيقوم التطبيق بمزامنة كل البيانات تلقائياً وبصمت بمجرد عودة الاتصال.',
    color: '#10b981'
  },
  {
    icon: Users,
    title: 'إدارة الطاقم والصلاحيات',
    desc: 'أضف موظفيك وحدد صلاحية كل فرد بدقة. من يمكنه رؤية الإيرادات، ومن يقتصر دوره على تعديل حالة الطلبات. تحكم كامل بأمان متجرك.',
    color: '#3b82f6'
  },
  {
    icon: Printer,
    title: 'إدارة المخزون والمعدات',
    desc: 'راقب مستويات الحبر والورق. احصل على تنبيهات استباقية قبل نفاد المواد، وسجل صيانة المعدات لضمان عدم توقف العمل أبداً.',
    color: '#ef4444'
  },
  {
    icon: ScrollText,
    title: 'الفواتير والتقارير التلقائية',
    desc: 'توليد فواتير إلكترونية متوافقة ورسائل نصية للعملائك بضغطة زر. استخرج تقارير مالية يومية وشهرية دقيقة بصيغة PDF و Excel.',
    color: '#14b8a6'
  }
];

export default function AdminFeaturesPage() {
  return (
    <div className="w-container" style={{ paddingTop: 80, paddingBottom: 100 }}>
      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: 80, maxWidth: 800, margin: '0 auto 80px auto' }}
      >
        <div className="w-icon-wrapper" style={{ margin: '0 auto 24px auto', width: 80, height: 80, background: 'rgba(249,115,22,0.1)', color: '#F97316' }}>
          <Building2 size={40} />
        </div>
        <h1 className="w-section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.2, marginBottom: 24 }}>
          قمرة قيادة، <span style={{ color: '#F97316' }}>لمكتبتك.</span>
        </h1>
        <p className="w-section-subtitle" style={{ fontSize: '1.25rem', margin: '0 auto 40px auto' }}>
          أداة الإدارة الشاملة (B2B SaaS) المصممة خصيصاً لأصحاب المطابع والمكتبات. سيطر على العمليات التشغيلية، راقب الأداء، وزد من أرباحك.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link href="/warraq/site/admin" className="w-btn w-btn-orange">
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
        style={{ marginTop: 80, padding: 60, textAlign: 'center', background: 'linear-gradient(135deg, rgba(249,115,22,0.05) 0%, rgba(249,115,22,0) 100%)', border: '1px solid rgba(249,115,22,0.2)' }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: 16 }}>ارتقِ بتجارتك إلى المستوى التالي</h2>
        <p style={{ color: 'var(--w-text-sec)', marginBottom: 32, fontSize: '1.25rem' }}>سجل متجرك الآن واحصل على وصول حصري لنظامنا المتطور.</p>
        <a href="https://t.me/Jormunghandr" target="_blank" rel="noopener noreferrer" className="w-btn w-btn-orange" style={{ padding: '16px 32px', fontSize: '1.125rem' }}>
          تواصل مع المبيعات لتفعيل متجرك
        </a>
      </motion.div>
    </div>
  );
}
