'use client';

// Self-contained layout for Zemam app module
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Download, Globe } from 'lucide-react';
import { Cairo } from 'next/font/google';

const cairoFont = Cairo({ 
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-cairo',
});

function ZemamNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-navbar">
      <div className="w-container">
        <div className="w-navbar-inner">
          <Link href="/zemam" className="w-navbar-brand" style={{ gap: '10px' }}>
            <div style={{ background: '#3B82F6', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
              <Globe size={18} />
            </div>
            زِمام
          </Link>

          <div className={`w-navbar-links ${open ? 'open' : ''}`}>
            {open && (
              <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 20, left: 20, background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={28} />
              </button>
            )}
            <Link href="/zemam" className="w-navbar-link" onClick={() => setOpen(false)}>الرئيسية</Link>
            <Link href="/zemam/support" className="w-navbar-link" onClick={() => setOpen(false)}>الدعم الفني</Link>
            <Link href="/zemam/privacy" className="w-navbar-link" onClick={() => setOpen(false)}>سياسة الخصوصية</Link>
            <Link href="/zemam/terms" className="w-navbar-link" onClick={() => setOpen(false)}>شروط الاستخدام</Link>
          </div>

          <a href="#download" className="w-navbar-cta w-btn w-btn-primary" style={{ padding: '8px 20px', borderRadius: '99px', background: '#3B82F6', borderColor: '#3B82F6' }}>
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

function ZemamFooter() {
  return (
    <footer className="w-footer">
      <div className="w-container">
        <div className="w-footer-inner">
          <div className="w-footer-col">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={20} className="text-[#3B82F6]" /> زِمام
            </h4>
            <p style={{ fontSize: 14, color: 'var(--w-text-sec)', lineHeight: 1.7, maxWidth: 260 }}>
              متصفح ويب فائق السرعة والأمان مصمم بتأثيرات زجاجية ممتازة وتوافق كامل للأجهزة المتعددة.
            </p>
          </div>
          <div className="w-footer-col">
            <h4>روابط سريعة</h4>
            <Link href="/zemam">الرئيسية</Link>
            <Link href="/zemam/support">الدعم الفني</Link>
          </div>
          <div className="w-footer-col">
            <h4>قانوني</h4>
            <Link href="/zemam/privacy">سياسة الخصوصية</Link>
            <Link href="/zemam/terms">شروط الاستخدام</Link>
          </div>
          <div className="w-footer-col">
            <h4>تواصل معنا</h4>
            <a href="https://t.me/Jormunghandr" target="_blank" rel="noopener noreferrer">تيليغرام</a>
            <a href="mailto:gamegdeo@gmail.com">البريد الإلكتروني</a>
          </div>
        </div>
        <div className="w-footer-bottom">
          © {new Date().getFullYear()} متصفح زِمام — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}

export default function ZemamLayout({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className={`warraq-site-root ${cairoFont.variable}`}
      style={{
        backgroundColor: '#FFFFFF',
        color: '#0F172A',
        // Override Warraq theme variables to brand Zemam with blue/indigo tones
        '--w-primary': '#3B82F6',
        '--w-primary-hover': '#2563EB',
        '--w-admin': '#6366F1',
        '--w-admin-hover': '#4F46E5',
      } as any}
    >
      <ZemamNavbar />
      <div style={{ minHeight: '80vh', paddingTop: '80px' }}>
        {children}
      </div>
      <ZemamFooter />
    </div>
  );
}
