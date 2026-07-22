'use client';

// Self-contained layout for Khuta app module
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Activity, ShieldCheck, HelpCircle, FileText, Smartphone } from 'lucide-react';
import { Cairo } from 'next/font/google';

const cairoFont = Cairo({ 
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-cairo',
});

function KhutaNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-navbar" style={{ 
      background: 'rgba(255, 255, 255, 0.85)', 
      backdropFilter: 'blur(20px)', 
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(16, 185, 129, 0.12)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
    }}>
      <div className="w-container">
        <div className="w-navbar-inner">
          <Link href="/khuta" className="w-navbar-brand" style={{ gap: '12px', color: '#0F172A', fontWeight: 800 }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
              width: '38px', 
              height: '38px', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#FFF',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
            }}>
              <Activity size={22} />
            </div>
            <span style={{ fontSize: '20px', letterSpacing: '-0.3px' }}>
              تطبيق خُطى <span style={{ fontSize: '12px', color: '#059669', background: '#E6F4EA', padding: '3px 10px', borderRadius: '20px', fontWeight: 700 }}>GlassStep</span>
            </span>
          </Link>

          <div className={`w-navbar-links ${open ? 'open' : ''}`} style={{ background: open ? '#FFFFFF' : 'transparent' }}>
            {open && (
              <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 20, left: 20, background: 'none', border: 'none', color: '#0F172A', cursor: 'pointer' }}>
                <X size={28} />
              </button>
            )}
            <Link href="/khuta" className="w-navbar-link" style={{ color: '#334155', fontWeight: 600 }} onClick={() => setOpen(false)}>الرئيسية</Link>
            <Link href="/khuta#modes" className="w-navbar-link" style={{ color: '#334155', fontWeight: 600 }} onClick={() => setOpen(false)}>الأنماط الثلاثة</Link>
            <Link href="/khuta/support" className="w-navbar-link" style={{ color: '#334155', fontWeight: 600 }} onClick={() => setOpen(false)}>الدعم الفني</Link>
            <Link href="/khuta/privacy" className="w-navbar-link" style={{ color: '#334155', fontWeight: 600 }} onClick={() => setOpen(false)}>سياسة الخصوصية</Link>
            <Link href="/khuta/terms" className="w-navbar-link" style={{ color: '#334155', fontWeight: 600 }} onClick={() => setOpen(false)}>شروط الاستخدام</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '8px 18px', 
              borderRadius: '99px', 
              background: '#0F172A', 
              color: '#FFF', 
              fontSize: '13px', 
              fontWeight: 700,
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)'
            }}>
              <Smartphone size={15} style={{ color: '#10B981' }} /> App Store — قريباً
            </span>

            <button className="w-navbar-mobile-btn" onClick={() => setOpen(!open)} style={{ color: '#0F172A' }}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function KhutaFooter() {
  return (
    <footer className="w-footer" style={{ background: '#F8FAFC', borderTop: '1px solid rgba(16, 185, 129, 0.12)', color: '#475569' }}>
      <div className="w-container">
        <div className="w-footer-inner">
          <div className="w-footer-col" style={{ maxWidth: 320 }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0F172A', fontWeight: 800 }}>
              <Activity size={20} style={{ color: '#10B981' }} /> تطبيق خُطى (GlassStep)
            </h4>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7 }}>
              تطبيق آيفون فائق الدقة بتصميم زجاجي سائل ناعم لتتبع الخطوات اليومية، أنظمة الترطيب الطبي، ومؤشرات التعافي يعمل محلياً 100% بدون خوادم.
            </p>
          </div>
          <div className="w-footer-col">
            <h4 style={{ color: '#0F172A', fontWeight: 700 }}>روابط سريعة</h4>
            <Link href="/khuta" style={{ color: '#475569' }}>الرئيسية</Link>
            <Link href="/khuta#modes" style={{ color: '#475569' }}>الأنماط الحركية الثلاثة</Link>
            <Link href="/khuta/support" style={{ color: '#475569' }}>الدعم الفني والأسئلة</Link>
          </div>
          <div className="w-footer-col">
            <h4 style={{ color: '#0F172A', fontWeight: 700 }}>متطلبات Apple Legal</h4>
            <Link href="/khuta/privacy" style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={15} style={{ color: '#10B981' }} /> سياسة الخصوصية
            </Link>
            <Link href="/khuta/terms" style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
              <FileText size={15} style={{ color: '#10B981' }} /> شروط الاستخدام (EULA)
            </Link>
            <Link href="/khuta/support" style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
              <HelpCircle size={15} style={{ color: '#10B981' }} /> رابط دعم Apple App Store
            </Link>
          </div>
          <div className="w-footer-col">
            <h4 style={{ color: '#0F172A', fontWeight: 700 }}>معلومات المطور</h4>
            <a href="https://t.me/Jormunghandr" target="_blank" rel="noopener noreferrer" style={{ color: '#475569' }}>تيليغرام المطور</a>
            <a href="mailto:gamegdeo@gmail.com" style={{ color: '#475569' }}>البريد الإلكتروني للدعم</a>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>مصمم للـ iOS 17+ و Apple Health</span>
          </div>
        </div>
        <div className="w-footer-bottom" style={{ borderColor: 'rgba(0,0,0,0.06)', color: '#94A3B8' }}>
          © {new Date().getFullYear()} تطبيق خُطى (GlassStep) — جميع الحقوق محفوظة للمطور Al-Musawi.
        </div>
      </div>
    </footer>
  );
}

export default function KhutaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className={`warraq-site-root ${cairoFont.variable}`}
      style={{
        backgroundColor: '#F8FAFC',
        color: '#0F172A',
        fontFamily: 'var(--font-cairo), sans-serif',
        minHeight: '100vh',
        '--w-primary': '#10B981',
        '--w-primary-hover': '#059669',
      } as any}
    >
      <KhutaNavbar />
      <div style={{ minHeight: '80vh', paddingTop: '80px' }}>
        {children}
      </div>
      <KhutaFooter />
    </div>
  );
}
