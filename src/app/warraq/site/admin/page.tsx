'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Download, Smartphone, ClipboardList, Package, Receipt,
  BarChart3, Truck, Users, Ticket, Heart, CreditCard,
  CalendarDays, ScanLine, UserCog, Wallet, Shield, Moon,
  Globe, FileText, Search, Briefcase, ArrowRight, Sparkles, Printer
} from 'lucide-react';
import { AnimatedHero } from '@/components/warraq/Theme/AnimatedHero';
import { BentoGrid, BentoItem } from '@/components/warraq/Theme/BentoGrid';
import { InteractiveMockup } from '@/components/warraq/Theme/InteractiveMockup';

const features = [
  { icon: ClipboardList, title: 'إدارة الطلبات', desc: 'لوحة Kanban ذكية لتتبع الطلبات من الاستلام حتى التسليم', color: '#DC143C', span: 8 },
  { icon: BarChart3, title: 'لوحة التحليلات', desc: 'رسوم بيانية لحظية للإيرادات والأداء', color: '#22C55E', span: 4 },
  { icon: Package, title: 'المخزون والمواد', desc: 'تتبع الورق والحبر والمعدات مع تنبيهات النقص', color: '#6366F1', span: 4 },
  { icon: Users, title: 'إدارة العملاء والولاء', desc: 'قاعدة بيانات متكاملة مع نظام مكافآت ونقاط', color: '#EC4899', span: 8 },
  { icon: Wallet, title: 'المصروفات والرصيد', desc: 'تتبع المصروفات وإدارة الرصيد النقدي', color: '#0EA5E9', span: 6 },
  { icon: Truck, title: 'تتبع التوصيل', desc: 'إدارة مسارات التوصيل وتحديث الحالات', color: '#F59E0B', span: 6 },
];

export default function AdminAppPage() {
  return (
    <>
      {/* ═══ Hero Section ═══ */}
      <AnimatedHero
        badge="تطبيق الإدارة"
        title="أدر مكتبتك باحترافية كاملة"
        subtitle="نظام متكامل لإدارة مكتبات الطباعة — من الطلبات والمخزون إلى الفواتير والتحليلات. أكثر من 28 ميزة مدمجة في تطبيق واحد."
      >
        <a href="#download" className="w-btn w-btn-orange">
          <Download size={20} />
          تنزيل التطبيق
        </a>
        <Link href="/warraq/site/customer" className="w-btn w-btn-outline">
          تطبيق العملاء
          <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
        </Link>
      </AnimatedHero>

      {/* ═══ The App Mockup ═══ */}
      <section className="w-section" style={{ background: 'var(--w-bg-subtle)' }}>
        <div className="w-container" style={{ textAlign: 'center' }}>
          <h2 className="w-section-title">واجهة تحكم متكاملة</h2>
          <p className="w-section-subtitle">صُمم ليكون بديلك عن كل الأنظمة المعقدة والورقية.</p>
          <div style={{ marginTop: 40 }}>
            <InteractiveMockup type="admin" />
          </div>
        </div>
      </section>

      {/* ═══ Core Features Bento ═══ */}
      <section className="w-section">
        <div className="w-container">
          <h2 className="w-section-title">الميزات الأساسية</h2>
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
            <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'var(--w-admin)', filter: 'blur(100px)', opacity: 0.2 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <Download size={48} style={{ color: 'var(--w-admin)', marginBottom: 24, margin: '0 auto 24px auto' }} />
              <h2 className="w-section-title" style={{ fontSize: '2.5rem' }}>ابدأ الإدارة الاحترافية</h2>
              <p className="w-section-subtitle" style={{ marginBottom: 32 }}>
                جميع الأدوات التي تحتاجها لنقل أعمالك ومكتبتك إلى مستوى آخر متوفرة مجاناً لأصحاب المكتبات المشتركين.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                <a
                  href="https://apps.apple.com/iq/app/%D9%88%D8%B1-%D8%A7%D9%82-%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D9%83%D8%AA%D8%A8%D8%A9/id6784043417?l=ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-btn w-btn-orange"
                  style={{ fontSize: '1.125rem', background: '#000000', borderColor: '#000000', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  🍎 تنزيل من App Store (iOS)
                </a>
                <a href="https://www.mediafire.com/file/h9xrm2oy2h87v3h/warraq.apk/file" target="_blank" rel="noopener noreferrer" className="w-btn w-btn-outline" style={{ fontSize: '1.125rem' }}>
                  <Download size={20} /> تحميل الـ APK المباشر (أندرويد)
                </a>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--w-text-muted)', marginTop: 24 }}>
                v2.0 • iOS 15.0+ / Android 8.0+
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
