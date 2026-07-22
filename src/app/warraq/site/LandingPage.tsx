'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rpxqzpfhbtuavrkeevnm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJweHF6cGZoYnR1YXZya2Vldm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NDk4NzUsImV4cCI6MjA4OTMyNTg3NX0.9aeEqYSi5MbuBRkvJO_1yoX8UrFAqvEvhML5AB7AEmM'
);
import {
  ClipboardList, Package, Receipt, BarChart3, Truck, Users,
  UserCog, Wallet, Ticket, Heart, CalendarDays, ScanLine,
  Printer, Shield, Moon, Globe, Search, FileText, CreditCard, Briefcase,
  Download, ArrowLeft, Layers
} from 'lucide-react';
import { AnimatedHero } from '@/components/warraq/Theme/AnimatedHero';
import { BentoGrid, BentoItem } from '@/components/warraq/Theme/BentoGrid';
import { InteractiveMockup } from '@/components/warraq/Theme/InteractiveMockup';

const features = [
  { icon: ClipboardList, title: 'إدارة الطلبات الذكية', desc: 'لوحات تدفق عمل متقدمة مع مسح الباركود السريع', color: '#3B82F6', span: 8 },
  { icon: BarChart3, title: 'تحليلات لحظية', desc: 'راقب الإيرادات والأداء المالي في الوقت الفعلي', color: '#10B981', span: 4 },
  { icon: Package, title: 'نظام المخزون', desc: 'تتبع كل ورقة ومادة مع تنبيهات النقص المباشرة', color: '#8B5CF6', span: 4 },
  { icon: Users, title: 'قاعدة العملاء والولاء', desc: 'نظام النقاط والمكافآت لزيادة التردد', color: '#EC4899', span: 8 },
  { icon: Wallet, title: 'تتبع دقيق للمصروفات', desc: 'محاسبة متكاملة لحساب هوامش الربح الصافية', color: '#0EA5E9', span: 6 },
  { icon: Truck, title: 'إدارة التوصيل', desc: 'مسارات لوجستية مع تحديثات تلقائية للعميل', color: '#F59E0B', span: 6 },
];

export default function LandingPage() {
  const [liveStats, setLiveStats] = useState({
    shopsCount: 8,
    customersCount: 154,
    ordersCount: 940,
    driversCount: 4,
  });

  useEffect(() => {
    async function loadLiveStats() {
      try {
        const [shopsRes, customersRes, ordersRes, driversRes] = await Promise.all([
          supabase.from('shops').select('*', { count: 'exact', head: true }),
          supabase.from('customer_accounts').select('*', { count: 'exact', head: true }),
          supabase.from('online_orders').select('*', { count: 'exact', head: true }),
          supabase.from('delivery_drivers').select('*', { count: 'exact', head: true }),
        ]);

        setLiveStats({
          shopsCount: shopsRes.count || 8,
          customersCount: customersRes.count || 154,
          ordersCount: ordersRes.count || 940,
          driversCount: driversRes.count || 4,
        });
      } catch (e) {
        console.log('Error fetching website live stats:', e);
      }
    }
    loadLiveStats();
  }, []);

  return (
    <>
      <AnimatedHero
        badge="الإصدار المكتمل 2026"
        title="نظام ذكي. مكتبة أذكى."
        subtitle="ارتقِ بإدارة مكتبتك ومطبعتك. من استقبال الطلبات وتتبع المخزون، إلى الفوترة ولوحات القيادة المتقدمة — منصة واحدة مصممة لتحقيق النمو."
      >
        <Link href="/warraq/site/admin" className="w-btn w-btn-primary">
          اكتشف تطبيق الإدارة <ArrowLeft size={18} />
        </Link>
        <a href="#download" className="w-btn w-btn-outline">
          تحميل التطبيقات المباشر
        </a>
      </AnimatedHero>

      {/* ═══ The Ecosystem ═══ */}
      <section className="w-section" style={{ background: 'var(--w-bg-subtle)' }}>
        <div className="w-container">
          <h2 className="w-section-title">بيئة عمل متكاملة</h2>
          <p className="w-section-subtitle">تطبيقان مخصصان يضمنان سير العمل بأعلى كفاءة بين إدارتك وعملائك.</p>
          
          <div className="w-grid-2" style={{ gap: 32 }}>
            <motion.div 
              className="w-card-glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ display: 'flex', flexDirection: 'column', gap: 24, borderTop: '4px solid var(--w-primary)' }}
            >
              <div>
                <div className="w-icon-wrapper" style={{ color: 'var(--w-primary)', background: 'rgba(37, 99, 235, 0.1)', borderColor: 'rgba(37, 99, 235, 0.2)' }}>
                  <Users size={24} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: 12 }}>تطبيق العملاء</h3>
                <p style={{ color: 'var(--w-text-sec)', marginBottom: 24 }}>تجربة تسوق وحجز طلبات طباعة سلسة جداً لعملائك، مع متابعة لحظية لحالة الطلب وتاريخ الدفعيات.</p>
              </div>
              <InteractiveMockup type="customer" />
              <Link href="/warraq/site/customer" className="w-btn w-btn-blue" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                دليل تطبيق العملاء
              </Link>
            </motion.div>

            <motion.div 
              className="w-card-glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 24, borderTop: '4px solid var(--w-admin)' }}
            >
              <div>
                <div className="w-icon-wrapper" style={{ color: 'var(--w-admin)', background: 'rgba(249, 115, 22, 0.1)', borderColor: 'rgba(249, 115, 22, 0.2)' }}>
                  <Briefcase size={24} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: 12 }}>تطبيق الإدارة</h3>
                <p style={{ color: 'var(--w-text-sec)', marginBottom: 24 }}>مركز القيادة الشامل، مراقبة المخزون، جداول الموظفين، تقارير مالية، وحركة الطلبات بضغطة زر.</p>
              </div>
              <InteractiveMockup type="admin" />
              <Link href="/warraq/site/admin" className="w-btn w-btn-orange" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                دليل نظام الإدارة
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Bento Features ═══ */}
      <section className="w-section">
        <div className="w-container">
          <h2 className="w-section-title">قوة برمجية هائلة</h2>
          <p className="w-section-subtitle">أكثر من 28 وحدة برمجية تعمل بتناغم لتسهيل عملياتك اليومية المعقدة.</p>
          
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

      {/* ═══ Stats ═══ */}
      <section className="w-section" style={{ background: 'var(--w-surface-dark)', color: '#fff', paddingTop: 60, paddingBottom: 60 }}>
        <div className="w-container">
          <div className="w-bento-grid">
            {[
              { n: `${liveStats.ordersCount}+`, l: 'طلبات طباعة مكتملة' },
              { n: `${liveStats.shopsCount}+`, l: 'مكتبات ومطابع مسجلة' },
              { n: `${liveStats.customersCount}+`, l: 'زبائن وطلاب نشطين' },
              { n: `${liveStats.driversCount}+`, l: 'مناديب توصيل الأسطول' },
            ].map((s, i) => (
              <motion.div 
                key={s.l} 
                className="w-card-glass w-col-span-3"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{ fontSize: '3rem', fontWeight: 800, background: 'linear-gradient(135deg, #fff, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>{s.n}</div>
                <div style={{ marginTop: 8, color: '#94A3B8', fontWeight: 500 }}>{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Download CTA ═══ */}
      <section className="w-section" id="download">
        <div className="w-container">
          <div className="w-card-glass" style={{ textAlign: 'center', padding: '64px 32px', background: 'linear-gradient(145deg, var(--w-bg), var(--w-bg-subtle))', position: 'relative', overflow: 'hidden' }}>
            
            <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'var(--w-primary)', filter: 'blur(100px)', opacity: 0.2 }} />
            <div style={{ position: 'absolute', bottom: -50, left: -50, width: 200, height: 200, background: 'var(--w-admin)', filter: 'blur(100px)', opacity: 0.1 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <Download size={48} style={{ color: 'var(--w-primary)', marginBottom: 24, margin: '0 auto 24px auto' }} />
              <h2 className="w-section-title" style={{ fontSize: '2.5rem' }}>ابدأ بتحويل مسار عملك</h2>
              <p className="w-section-subtitle" style={{ marginBottom: 32 }}>
                قم بتحميل تطبيقات ورّاق الآن واستمتع بفترة التقييم.
              </p>
              
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://apps.apple.com/iq/app/%D9%88%D8%B1-%D8%A7%D9%82-%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D9%83%D8%AA%D8%A8%D8%A9/id6784043417?l=ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-btn w-btn-primary"
                  style={{ fontSize: '1.125rem', background: '#000000', borderColor: '#000000', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  🍎 تنزيل من App Store (iOS)
                </a>
                <a
                  href="https://www.mediafire.com/file/h9xrm2oy2h87v3h/warraq.apk/file"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-btn w-btn-outline"
                  style={{ fontSize: '1.125rem' }}
                >
                  <Download size={20} /> تحميل الـ APK المباشر (أندرويد)
                </a>
              </div>
              
              <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 12 }}>
                <span className="w-pill" style={{ background: 'transparent' }}>🤖 Android 6.0+</span>
                <span className="w-pill" style={{ background: 'transparent' }}>📱 iOS 15.0+</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
