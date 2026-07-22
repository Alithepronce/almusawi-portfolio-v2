'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Cairo } from 'next/font/google';

const cairoFont = Cairo({ 
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-cairo',
});

function GlamoraNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.9)', 
      backdropFilter: 'blur(20px)', 
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(225, 29, 72, 0.15)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      padding: '12px 20px'
    }}>
      <div style={{ maxWidth: '1150px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/glamora" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1C1917', fontWeight: 800, textDecoration: 'none' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)', 
            width: '38px', 
            height: '38px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#FFF',
            boxShadow: '0 4px 14px rgba(225, 29, 72, 0.35)'
          }}>
            <ShoppingBag size={22} />
          </div>
          <span style={{ fontSize: '20px', letterSpacing: '-0.3px' }}>
            تطبيق غلامورا <span style={{ fontSize: '12px', color: '#E11D48', background: '#FFF1F2', padding: '3px 10px', borderRadius: '20px', fontWeight: 700 }}>Glamora POS</span>
          </span>
        </Link>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '12px' }} className="hidden sm:flex">
            <Link href="/glamora" style={{ color: '#44403C', fontWeight: 600, textDecoration: 'none', fontSize: '14px' }}>الرئيسية</Link>
            <Link href="/glamora/privacy" style={{ color: '#44403C', fontWeight: 600, textDecoration: 'none', fontSize: '14px' }}>سياسة الخصوصية</Link>
            <Link href="/glamora/terms" style={{ color: '#44403C', fontWeight: 600, textDecoration: 'none', fontSize: '14px' }}>شروط الاستخدام</Link>
            <Link href="/glamora/support" style={{ color: '#44403C', fontWeight: 600, textDecoration: 'none', fontSize: '14px' }}>الدعم الفني</Link>
          </div>

          <Link href="/apps" style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 16px',
            borderRadius: '50px',
            background: '#FFF1F2',
            border: '1px solid rgba(225, 29, 72, 0.2)',
            color: '#E11D48',
            fontWeight: 700,
            fontSize: '13px',
            textDecoration: 'none',
          }}>
            العودة للتطبيقات ←
          </Link>
        </div>
      </div>
    </nav>
  );
}

function GlamoraFooter() {
  return (
    <footer style={{ background: '#FFFFFF', borderTop: '1px solid rgba(225, 29, 72, 0.1)', padding: '40px 20px', marginTop: '60px', textAlign: 'center' }}>
      <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
        <p style={{ color: '#78716C', fontSize: '14px', margin: '0 0 8px' }}>
          Glamora POS & Inventory Management System © 2026 Al-Musawi. جميع الحقوق محفوظة.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '13px', marginTop: '12px' }}>
          <Link href="/glamora/privacy" style={{ color: '#E11D48', textDecoration: 'none' }}>سياسة الخصوصية</Link>
          <Link href="/glamora/terms" style={{ color: '#E11D48', textDecoration: 'none' }}>شروط الاستخدام</Link>
          <Link href="/glamora/support" style={{ color: '#E11D48', textDecoration: 'none' }}>الدعم الفني</Link>
        </div>
      </div>
    </footer>
  );
}

export default function GlamoraLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cairoFont.variable} style={{ fontFamily: 'var(--font-cairo), sans-serif', background: '#FFF1F2', minHeight: '100vh', direction: 'rtl' }}>
      <GlamoraNavbar />
      <main style={{ paddingTop: '80px' }}>
        {children}
      </main>
      <GlamoraFooter />
    </div>
  );
}
