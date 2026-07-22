'use client';

import './warraq-site.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Cairo } from 'next/font/google';

const cairoFont = Cairo({ 
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-cairo',
});

function WarraqNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-navbar">
      <div className="w-container">
        <div className="w-navbar-inner">
          <Link href="/warraq/site" className="w-navbar-brand">
            <Image src="/warraq-logo.png" alt="ورّاق" width={36} height={36} style={{ borderRadius: 10 }} />
            ورّاق
          </Link>

          <div className={`w-navbar-links ${open ? 'open' : ''}`}>
            {open && (
              <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 20, left: 20, background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={28} />
              </button>
            )}
            <Link href="/warraq/site" className="w-navbar-link" onClick={() => setOpen(false)}>الرئيسية</Link>
            <Link href="/warraq/site/customer" className="w-navbar-link" onClick={() => setOpen(false)}>تطبيق العملاء</Link>
            <Link href="/warraq/site/admin" className="w-navbar-link" onClick={() => setOpen(false)}>تطبيق الإدارة</Link>
            <Link href="/warraq/site/delivery" className="w-navbar-link" onClick={() => setOpen(false)}>تطبيق التوصيل</Link>
            <Link href="/warraq/site/pricing" className="w-navbar-link" onClick={() => setOpen(false)}>الأسعار والاشتراك</Link>
            <Link href="/warraq/site/track" className="w-navbar-link" onClick={() => setOpen(false)}>تتبع الطلب</Link>
            <Link href="/warraq/site/support" className="w-navbar-link" onClick={() => setOpen(false)}>الدعم</Link>
          </div>

          <a href="https://www.mediafire.com/file/h9xrm2oy2h87v3h/warraq.apk/file" target="_blank" rel="noopener noreferrer" className="w-navbar-cta w-btn w-btn-primary" style={{ padding: '8px 20px', borderRadius: '99px' }}>
            <Download size={16} /> تحميل
          </a>

          <button className="w-navbar-mobile-btn" onClick={() => setOpen(!open)}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}

function WarraqFooter() {
  return (
    <footer className="w-footer">
      <div className="w-container">
        <div className="w-footer-inner">
          <div className="w-footer-col">
            <h4>ورّاق</h4>
            <p style={{ fontSize: 14, color: 'var(--w-text-sec)', lineHeight: 1.7, maxWidth: 260 }}>
              نظام متكامل لإدارة محلات الطباعة والمكتبات — 28+ ميزة
            </p>
          </div>
          <div className="w-footer-col">
            <h4>التطبيقات</h4>
            <Link href="/warraq/site/customer">تطبيق العملاء</Link>
            <Link href="/warraq/site/admin">تطبيق الإدارة</Link>
            <Link href="/warraq/site/delivery">تطبيق التوصيل</Link>
          </div>
          <div className="w-footer-col">
            <h4>صفحات</h4>
            <Link href="/warraq/site">الرئيسية</Link>
            <Link href="/warraq/site/pricing">الأسعار والاشتراك</Link>
            <Link href="/warraq/site/track">تتبع الطلب</Link>
            <Link href="/warraq/site/support">الدعم</Link>
          </div>
          <div className="w-footer-col">
            <h4>قانوني</h4>
            <Link href="/warraq/site/privacy">سياسة الخصوصية</Link>
            <Link href="/warraq/site/terms">شروط الاستخدام</Link>
          </div>
          <div className="w-footer-col">
            <h4>تواصل</h4>
            <a href="https://t.me/Jormunghandr" target="_blank" rel="noopener noreferrer">تيليغرام</a>
            <a href="mailto:gamegdeo@gmail.com">البريد الإلكتروني</a>
          </div>
        </div>
        <div className="w-footer-bottom">
          © {new Date().getFullYear()} ورّاق — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}

export default function WarraqSiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`warraq-site-root ${cairoFont.variable}`}>
      <WarraqNavbar />
      {children}
      <WarraqFooter />
    </div>
  );
}
