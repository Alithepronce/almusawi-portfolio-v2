'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/lib/i18n';
import {
  Download, Smartphone, ClipboardList, Package, Receipt,
  BarChart3, Truck, Users, Ticket, Heart, CreditCard, FileText,
  CalendarDays, ScanLine, Printer, Shield, Moon, Globe, Search,
  Briefcase, Star, Wallet, UserCog
} from 'lucide-react';
import PageShell from '@/components/ui/PageShell';

const features = [
  {
    icon: ClipboardList,
    title: { en: 'Order Management', ar: 'إدارة الطلبات' },
    desc: { en: 'Create, track, and manage orders with Kanban board, QR codes, and order templates', ar: 'إنشاء وتتبع وإدارة الطلبات مع لوحة Kanban ورموز QR وقوالب الطلبات' },
    color: '#DC143C',
  },
  {
    icon: Package,
    title: { en: 'Inventory & Stock', ar: 'المخزون والمواد' },
    desc: { en: 'Track paper, ink, and equipment stock with low-stock alerts and usage history', ar: 'تتبع مخزون الورق والحبر والمعدات مع تنبيهات النقص وسجل الاستخدام' },
    color: '#6366F1',
  },
  {
    icon: Receipt,
    title: { en: 'Invoicing & PDF', ar: 'الفوترة وملفات PDF' },
    desc: { en: 'Generate professional invoices, export to PDF, print and share directly', ar: 'إنشاء فواتير احترافية وتصديرها كـ PDF والطباعة والمشاركة مباشرة' },
    color: '#D4A853',
  },
  {
    icon: BarChart3,
    title: { en: 'Analytics Dashboard', ar: 'لوحة التحليلات' },
    desc: { en: 'Real-time charts for revenue, orders, expenses, and business performance', ar: 'رسوم بيانية لحظية للإيرادات والطلبات والمصروفات وأداء العمل' },
    color: '#22C55E',
  },
  {
    icon: Truck,
    title: { en: 'Delivery Tracking', ar: 'تتبع التوصيل' },
    desc: { en: 'Manage delivery routes, track order deliveries, and update statuses', ar: 'إدارة مسارات التوصيل وتتبع عمليات التسليم وتحديث الحالات' },
    color: '#F59E0B',
  },
  {
    icon: Users,
    title: { en: 'Customer Management', ar: 'إدارة العملاء' },
    desc: { en: 'Customer database with order history, contact info, and loyalty tracking', ar: 'قاعدة بيانات العملاء مع سجل الطلبات ومعلومات الاتصال وتتبع الولاء' },
    color: '#EC4899',
  },
  {
    icon: UserCog,
    title: { en: 'Employee Management', ar: 'إدارة الموظفين' },
    desc: { en: 'Manage staff, assign roles, track work schedules and performance', ar: 'إدارة الموظفين وتعيين الأدوار وتتبع جداول العمل والأداء' },
    color: '#8B5CF6',
  },
  {
    icon: Wallet,
    title: { en: 'Expenses & Balance', ar: 'المصروفات والرصيد' },
    desc: { en: 'Track business expenses, manage cash balance, and monitor profit margins', ar: 'تتبع مصروفات العمل وإدارة الرصيد النقدي ومراقبة هوامش الربح' },
    color: '#0EA5E9',
  },
  {
    icon: Ticket,
    title: { en: 'Coupons & Campaigns', ar: 'الكوبونات والحملات' },
    desc: { en: 'Create discount coupons, run marketing campaigns, and track usage', ar: 'إنشاء كوبونات خصم وإدارة الحملات التسويقية وتتبع الاستخدام' },
    color: '#F97316',
  },
  {
    icon: Heart,
    title: { en: 'Loyalty Program', ar: 'برنامج الولاء' },
    desc: { en: 'Reward repeat customers with points, tiers, and special offers', ar: 'مكافأة العملاء المتكررين بالنقاط والمستويات والعروض الخاصة' },
    color: '#EF4444',
  },
  {
    icon: CalendarDays,
    title: { en: 'Scheduling', ar: 'الجدولة' },
    desc: { en: 'Schedule orders, deliveries, and staff shifts with calendar view', ar: 'جدولة الطلبات والتوصيلات ونوبات الموظفين مع عرض التقويم' },
    color: '#14B8A6',
  },
  {
    icon: ScanLine,
    title: { en: 'QR & Barcode Scanning', ar: 'مسح QR والباركود' },
    desc: { en: 'Scan QR codes for instant order lookup and inventory tracking', ar: 'مسح رموز QR للبحث الفوري عن الطلبات وتتبع المخزون' },
    color: '#A855F7',
  },
];

const extraFeatures = [
  { icon: Printer, label: { en: 'PDF & Print Export', ar: 'تصدير PDF وطباعة' } },
  { icon: Shield, label: { en: 'Secure Auth & Roles', ar: 'مصادقة آمنة وأدوار' } },
  { icon: Moon, label: { en: 'Dark Mode', ar: 'الوضع الداكن' } },
  { icon: Globe, label: { en: 'Arabic & English', ar: 'عربي وإنجليزي' } },
  { icon: Search, label: { en: 'Global Search', ar: 'بحث شامل' } },
  { icon: FileText, label: { en: 'Reports & Export', ar: 'تقارير وتصدير' } },
  { icon: CreditCard, label: { en: 'Payment Tracking', ar: 'تتبع المدفوعات' } },
  { icon: Briefcase, label: { en: 'Multi-Branch Support', ar: 'دعم الفروع المتعددة' } },
];

export default function WarraqPage() {
  const { lang } = useLang();
  const l = lang;

  return (
    <PageShell maxWidth="1000px" backHref="/apps" backLabel={l === 'ar' ? 'التطبيقات' : 'Apps'}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ margin: '0 auto 32px auto', display: 'flex', justifyContent: 'center' }}
          >
            <Image
              src="/warraq-logo.png"
              alt="Warraq Logo"
              width={100}
              height={100}
              style={{
                borderRadius: '24px',
                boxShadow: '0 20px 60px rgba(212,165,116,0.2)',
              }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: "'Syne', 'Tajawal', sans-serif", fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}
          >
            <span className="gold-text">ورّاق</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '12px', fontFamily: "'Syne', 'Tajawal', sans-serif" }}
          >
            {l === 'ar' ? 'نظام إدارة المكتبات والطباعة' : 'Library & Printing Management System'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 40px auto', lineHeight: 1.8 }}
          >
            {l === 'ar'
              ? 'تطبيق متكامل لإدارة مكاتب الطباعة والقرطاسية — يشمل إدارة الطلبات والمخزون والفواتير والتوصيل والموظفين والعملاء والتحليلات المتقدمة، مع 28+ ميزة مدمجة.'
              : 'A comprehensive app for managing printing & stationery shops — including orders, inventory, invoices, delivery, employees, customers, and advanced analytics, with 28+ built-in features.'}
          </motion.p>

          {/* Download Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}
          >
            <Link
              href="/warraq/site"
              className="magnetic-btn"
              style={{ fontSize: '15px', padding: '16px 36px', background: 'linear-gradient(135deg, rgba(212,165,116,0.2), rgba(212,165,116,0.08))', border: '1px solid rgba(212,165,116,0.3)' }}
            >
              <Globe size={18} style={{ marginInlineEnd: '10px' }} />
              {l === 'ar' ? 'زيارة موقع التطبيق' : 'Visit App Website'}
            </Link>
            <a
              href="https://www.mediafire.com/file/h9xrm2oy2h87v3h/warraq.apk/file"
              target="_blank" rel="noopener noreferrer"
              className="magnetic-btn"
              style={{ fontSize: '15px', padding: '16px 36px', background: 'linear-gradient(135deg, rgba(212,165,116,0.15), rgba(212,165,116,0.05))', border: '1px solid rgba(212,165,116,0.25)' }}
            >
              <Download size={18} style={{ marginInlineEnd: '10px' }} />
              {l === 'ar' ? 'تحميل APK للأندرويد' : 'Download APK for Android'}
            </a>
          </motion.div>

          {/* Platform info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '20px', fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Smartphone size={12} /> Android</span>
            <span>•</span><span>Flutter + Supabase</span>
            <span>•</span><span>28+ {l === 'ar' ? 'ميزة' : 'Features'}</span>
            <span>•</span><span>{l === 'ar' ? 'عربي/إنجليزي' : 'AR/EN'}</span>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px', marginBottom: '64px' }}>
          {[
            { n: '28+', l: l === 'ar' ? 'ميزة مدمجة' : 'Built-in Features' },
            { n: '12', l: l === 'ar' ? 'وحدة رئيسية' : 'Core Modules' },
            { n: '2', l: l === 'ar' ? 'لغة مدعومة' : 'Languages' },
            { n: '∞', l: l === 'ar' ? 'طلبات' : 'Orders' },
          ].map((s) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
              <div className="gold-text" style={{ fontSize: '24px', fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>{s.n}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.l}</div>
            </motion.div>
          ))}
        </div>

        {/* Core Features */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '64px' }}>
          <h2 className="gold-text" style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '40px' }}>
            {l === 'ar' ? 'الميزات الأساسية' : 'CORE FEATURES'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card"
                style={{ padding: '24px' }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${f.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <f.icon size={18} style={{ color: f.color }} />
                </div>
                <h3 style={{ fontSize: '16px', fontFamily: "'Syne', 'Tajawal', sans-serif", fontWeight: 600, marginBottom: '6px' }}>{f.title[l]}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.desc[l]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Extra Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{ padding: '32px', marginBottom: '64px' }}
        >
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '20px', textAlign: 'center' }}>
            {l === 'ar' ? 'ميزات إضافية' : 'Additional Features'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
            {extraFeatures.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>
                <f.icon size={16} style={{ color: 'rgba(212,168,83,0.6)', flexShrink: 0 }} />
                {f.label[l]}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{ padding: '32px', textAlign: 'center', marginBottom: '64px' }}
        >
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
            {l === 'ar' ? 'التقنيات المستخدمة' : 'Built With'}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'Riverpod', 'GoRouter', 'Hive', 'PDF Generation', 'QR/Barcode Scanner', 'Printing API', 'Claymorphism UI'].map((tech) => (
              <span key={tech} style={{ padding: '6px 16px', borderRadius: '50px', border: '1px solid rgba(212,165,116,0.12)', fontSize: '12px', color: 'rgba(212,165,116,0.5)' }}>
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Download Section */}
        <motion.div
          id="download"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{ padding: '48px', textAlign: 'center', background: 'rgba(212,165,116,0.03)', border: '1px solid rgba(212,165,116,0.1)' }}
        >
          <Download size={32} style={{ color: '#D4A574', margin: '0 auto 20px auto', display: 'block' }} />
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontFamily: "'Syne', 'Tajawal', sans-serif", fontWeight: 700, marginBottom: '12px' }}>
            {l === 'ar' ? 'حمّل ورّاق الآن' : 'Download Warraq Now'}
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)', marginBottom: '28px', maxWidth: '400px', margin: '0 auto 28px auto' }}>
            {l === 'ar' ? 'ابدأ بإدارة مكتبتك باحترافية. التطبيق متاح للتحميل المباشر كملف APK.' : 'Start managing your stationery shop professionally. Available as a direct APK download.'}
          </p>
          <a
            href="https://www.mediafire.com/file/h9xrm2oy2h87v3h/warraq.apk/file"
            target="_blank" rel="noopener noreferrer"
            className="magnetic-btn"
            style={{ fontSize: '15px', padding: '16px 40px', background: 'linear-gradient(135deg, rgba(212,165,116,0.2), rgba(212,165,116,0.08))', border: '1px solid rgba(212,165,116,0.3)' }}
          >
            <Download size={18} style={{ marginInlineEnd: '10px' }} />
            {l === 'ar' ? 'تحميل Warraq APK' : 'Download Warraq APK'}
          </a>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.15)', marginTop: '16px' }}>
            v1.0.0 • Android 6.0+ • 33.8 MB
          </p>
        </motion.div>

        {/* Credits */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.12)' }}>
            {l === 'ar' ? 'من تطوير' : 'Developed by'}{' '}
            <Link href="/office" style={{ color: 'rgba(212,168,83,0.3)', textDecoration: 'none' }}>
              {l === 'ar' ? 'مكتب الموسوي' : 'Al-Musawi Office'}
            </Link>
          </p>
        </div>

      </div>
    </PageShell>
  );
}
