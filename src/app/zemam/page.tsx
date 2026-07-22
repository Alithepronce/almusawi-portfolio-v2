'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang, t } from '@/lib/i18n';
import { 
  ArrowDownToLine, Shield, Key, Sparkles, Code, RefreshCw, 
  Layers, Smartphone, Apple, Zap, CheckCircle2, Monitor, ArrowLeft, Download, Layers3
} from 'lucide-react';
import { AnimatedHero } from '@/components/warraq/Theme/AnimatedHero';
import { BentoGrid, BentoItem } from '@/components/warraq/Theme/BentoGrid';

export default function ZemamPage() {
  const { lang } = useLang();
  const isAr = lang === 'ar';
  const [activeScreenshot, setActiveScreenshot] = useState(1);

  const translate = (en: string, ar: string) => (isAr ? ar : en);

  const features = [
    { 
      icon: Layers, 
      title: translate('Windows Snap Layouts', 'تكامل كامل مع محاذاة ويندوز'), 
      desc: translate('Hovering over the maximize button shows native Windows 11 snap layouts. Fully responsive titlebar.', 'دعم كامل لمحاذاة النوافذ وتقسيم الشاشة بنقرة واحدة عند تمرير الماوس فوق زر التكبير.'), 
      color: '#3B82F6', 
      span: 8 
    },
    { 
      icon: Shield, 
      title: translate('iOS Face ID Protection', 'حماية بصمة الوجه للآيفون'), 
      desc: translate('Uses Apple native Face ID and Touch ID to secure your credentials, passwords, and private tabs.', 'تكامل كامل مع بصمة الوجه (Face ID) وبصمة الإصبع لحماية التبويبات الخاصة وكلمات المرور المشفرة.'), 
      color: '#EC4899', 
      span: 4 
    },
    { 
      icon: ArrowDownToLine, 
      title: translate('IDM Download Hijacker', 'تكامل مع برنامج IDM للتحميل'), 
      desc: translate('Automatically intercepts browser downloads and routes them directly to Internet Download Manager.', 'تحويل تلقائي وفوري للتحميلات لبرنامج Internet Download Manager الشهير لضمان أقصى سرعة تحميل.'), 
      color: '#10B981', 
      span: 4 
    },
    { 
      icon: Key, 
      title: translate('Secure Credentials Vault', 'خزنة كلمات المرور الآمنة'), 
      desc: translate('Uses native Windows DPAPI (safeStorage) and iOS Secure Enclave to strongly encrypt your user credentials.', 'حفظ وتسجيل كلمات المرور محلياً بتشفير عسكري باستخدام Windows DPAPI وخزنة التشفير في الآيفون.'), 
      color: '#F59E0B', 
      span: 8 
    },
    { 
      icon: Zap, 
      title: translate('Background Media Playback', 'تشغيل الوسائط في الخلفية'), 
      desc: translate('Fully supports audio and video background playback on iOS and Android. Keep music playing even when screen is locked.', 'دعم تشغيل مقاطع الفيديو والصوت في الخلفية وأثناء قفل الشاشة تماماً على هواتف الآيفون والأندرويد.'), 
      color: '#0EA5E9', 
      span: 6 
    },
    { 
      icon: Code, 
      title: translate('Built-in Developer Tools', 'أدوات المطورين مدمجة'), 
      desc: translate('Inspect pages, view console outputs, and debug web apps on the fly with a single click.', 'افتح أدوات المطورين والكونسول المدمج لأي صفحة لمراقبة الأخطاء البرمجية والشبكة بكل سهولة.'), 
      color: '#EF4444', 
      span: 6 
    },
  ];

  const tabBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: 600,
    background: active ? 'var(--w-text)' : 'transparent',
    border: '1px solid var(--w-border)',
    color: active ? 'var(--w-text-inverse)' : 'var(--w-text-sec)',
    cursor: 'pointer',
    borderRadius: '50px',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: 'inherit',
    boxShadow: active ? '0 8px 16px rgba(15, 23, 42, 0.1)' : 'none',
  });

  return (
    <>
      {/* ═══ Hero Section ═══ */}
      <AnimatedHero
        badge={translate('Version 2.0 • Cross-Platform Release', 'الإصدار 2.0 • تحديث الأجهزة المتعددة')}
        title={translate('Zemam Browser. Ultra Fast, Secure.', 'متصفح زِمام. سرعة وأمان.')}
        subtitle={translate(
          'A premium web browser built for Windows, Android, and iOS. Featuring a modern minimalist layout, native snap integrations, background audio playback, and biometrics.',
          'متصفح ويب فائق السرعة والأمان، بتصميم زجاجي فاخر وتوافق كامل مع أنظمة Windows و Android و iOS. مصمم خصيصاً ليمنحك تجربة تصفح تفاعلية مع حماية بيومترية متقدمة.'
        )}
      >
        <a href="#download" className="w-btn w-btn-primary" style={{ background: '#3B82F6', borderColor: '#3B82F6' }}>
          {translate('Get Download Links', 'مركز التحميل المباشر')} <ArrowDownToLine size={18} />
        </a>
        <a href="#features" className="w-btn w-btn-outline">
          {translate('Explore Features', 'اكتشف الميزات الاحترافية')}
        </a>
      </AnimatedHero>

      {/* ═══ Supported Platforms (Ecosystem Style) ═══ */}
      <section className="w-section" style={{ background: 'var(--w-bg-subtle)' }}>
        <div className="w-container">
          <h2 className="w-section-title">{translate('Supported Platforms', 'تكامل الأنظمة والأجهزة')}</h2>
          <p className="w-section-subtitle">{translate('Experience fluid browsing across your PC and mobile devices with secure sync.', 'تزامن كامل ومرن وسرعة انتقال بين حاسوبك المكتبي وجوالك مع أمان وحماية للبيانات.')}</p>
          
          <div className="w-grid-2" style={{ gap: 32 }}>
            {/* Desktop platform */}
            <motion.div 
              className="w-card-glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ display: 'flex', flexDirection: 'column', gap: 24, borderTop: '4px solid #3B82F6', padding: '32px' }}
            >
              <div>
                <div className="w-icon-wrapper" style={{ color: '#3B82F6', background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                  <Monitor size={24} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: 12, fontWeight: 700 }}>{translate('Desktop Browser (Windows)', 'متصفح زِمام للكمبيوتر')}</h3>
                <p style={{ color: 'var(--w-text-sec)', marginBottom: 24, fontSize: '14px', lineHeight: 1.7 }}>
                  {translate(
                    'Optimized desktop build supporting Windows 10/11 snap layouts, IDM downloads hijack, background upgrades check, and native DPAPI encryption.',
                    'نسخة الحاسوب المحسّنة بالكامل والمصممة لتمنحك كفاءة أداء مع محاذاة النوافذ في ويندوز، وتحويل التحميلات لـ IDM، وتشفير كلمات المرور.'
                  )}
                </p>
              </div>
              <img src="/zemam-screenshot1.png" alt="Zemam Desktop" style={{ width: '100%', borderRadius: '16px', border: '1px solid var(--w-border)', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }} />
            </motion.div>

            {/* iOS & Android platform */}
            <motion.div 
              className="w-card-glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 24, borderTop: '4px solid #EC4899', padding: '32px' }}
            >
              <div>
                <div className="w-icon-wrapper" style={{ color: '#EC4899', background: 'rgba(236, 72, 153, 0.1)', borderColor: 'rgba(236, 72, 153, 0.2)' }}>
                  <Smartphone size={24} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: 12, fontWeight: 700 }}>{translate('Mobile Browser (iOS / Android)', 'متصفح زِمام للهواتف المحمولة')}</h3>
                <p style={{ color: 'var(--w-text-sec)', marginBottom: 24, fontSize: '14px', lineHeight: 1.7 }}>
                  {translate(
                    'Mobile app carrying Apple Face ID lock security, background video/audio playback, swipe gestures, and real-time cloud synchronizer.',
                    'نسخة الهاتف المتميزة بقفل بصمة الوجه (Face ID) لحماية البيانات الحساسة، وتشغيل وسائط الفيديو بالخلفية وإيماءات السحب الذكية.'
                  )}
                </p>
              </div>
              
              {/* Interactive Phone Layout Mockup */}
              <div style={{ background: '#0F172A', borderRadius: '18px', padding: '24px 16px', textAlign: 'right', direction: 'rtl', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', marginBottom: '16px', direction: 'ltr', paddingInline: '8px' }}>
                  <span>14:34</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <span>📶</span>
                    <span>🔋 96%</span>
                  </div>
                </div>
                
                <div style={{ background: '#1e1e24', padding: '8px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '12px', color: '#10B981' }}>🔒</span>
                  <span style={{ fontSize: '12px', color: '#e4e4e7', flex: 1, textAlign: 'left', direction: 'ltr' }}>zemam-browser/secure</span>
                </div>

                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '14px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ color: '#EC4899', fontSize: '18px' }}>👤</span>
                    <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>بصمة الوجه (Face ID) نشطة</h5>
                  </div>
                  <p style={{ margin: 0, fontSize: '11px', color: '#94A3B8', lineHeight: 1.5 }}>
                    يتم إلغاء قفل كلمات المرور والتفاصيل المشفرة محلياً بمجرد فحص بصمتك.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Bento Features Grid ═══ */}
      <section id="features" className="w-section">
        <div className="w-container">
          <h2 className="w-section-title">{translate('Powerful Professional Utilities', 'قوة برمجية استثنائية')}</h2>
          <p className="w-section-subtitle">{translate('More than 12 specialized modules working together to elevate your browsing experience.', 'أكثر من 12 وحدة برمجية مخصصة ومدمجة تعمل بتناغم لتمنحك كفاءة تصفح متكاملة.')}</p>
          
          <BentoGrid>
            {features.map((f, i) => (
              <BentoItem key={i} colSpan={f.span as any} delay={i * 0.05}>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="w-icon-wrapper" style={{ color: f.color, background: `${f.color}15`, borderColor: `${f.color}25` }}>
                    <f.icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 8, fontWeight: 700 }}>{f.title}</h3>
                  <p style={{ color: 'var(--w-text-sec)', fontSize: '14px', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </BentoItem>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* ═══ Screenshot Showcase ═══ */}
      <section className="w-section" style={{ background: 'var(--w-bg-subtle)' }}>
        <div className="w-container" style={{ textAlign: 'center' }}>
          <h2 className="w-section-title">{translate('Explore The Interface', 'استكشف واجهة المستخدم')}</h2>
          <p className="w-section-subtitle" style={{ marginBottom: 40 }}>{translate('Premium frosted glass panels combined with Swiss minimalist inputs.', 'واجهات مستخدم زجاجية ممتازة ومريحة للعين تدعم الثيمات المتعددة وتكامل النوافذ.')}</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveScreenshot(1)} style={tabBtnStyle(activeScreenshot === 1)}>
              {translate('Desktop Homepage', 'شاشة البداية والتخصيص')}
            </button>
            <button onClick={() => setActiveScreenshot(2)} style={tabBtnStyle(activeScreenshot === 2)}>
              {translate('Solid Backgrounds', 'تأثيرات الألوان والتبويبات')}
            </button>
          </div>

          <motion.div
            key={activeScreenshot}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-card-glass"
            style={{ 
              padding: '16px', 
              maxWidth: '900px', 
              margin: '0 auto',
              background: '#FFFFFF',
              boxShadow: 'var(--w-shadow-hover)',
            }}
          >
            <img
              src={activeScreenshot === 1 ? '/zemam-screenshot1.png' : '/zemam-screenshot2.png'}
              alt="Zemam Browser Setup"
              style={{ width: '100%', height: 'auto', borderRadius: '14px', display: 'block', border: '1px solid var(--w-border)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ═══ Download CTA Section ═══ */}
      <section className="w-section" id="download">
        <div className="w-container">
          <div className="w-card-glass" style={{ 
            textAlign: 'center', padding: '64px 32px', 
            background: 'linear-gradient(145deg, var(--w-bg), var(--w-bg-subtle))', 
            position: 'relative', overflow: 'hidden' 
          }}>
            
            <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: '#3B82F6', filter: 'blur(100px)', opacity: 0.15 }} />
            <div style={{ position: 'absolute', bottom: -50, left: -50, width: 200, height: 200, background: '#EC4899', filter: 'blur(100px)', opacity: 0.1 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <Download size={48} style={{ color: '#3B82F6', marginBottom: 24, margin: '0 auto 24px auto' }} />
              <h2 className="w-section-title" style={{ fontSize: '2.5rem' }}>{translate('Download Center', 'مركز التحميل الموحد')}</h2>
              <p className="w-section-subtitle" style={{ marginBottom: 32 }}>
                {translate(
                  'Latest Stable Release v1.0.0 is now available for download across all platforms.',
                  'الإصدار الأخير المستقر v1.0.0 متوفر الآن للتحميل المباشر والتنصيب لكافة أجهزتك.'
                )}
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                {/* Windows Link */}
                <a 
                  href="https://github.com/Alithepronce/portfolio/releases/download/v1.0.0/Zemam-Browser-Setup-1.0.0.exe" 
                  className="w-btn w-btn-primary" 
                  style={{ background: '#3B82F6', borderColor: '#3B82F6', fontSize: '1.05rem', padding: '14px 28px' }}
                >
                  <Monitor size={18} /> {translate('Download for Windows (.exe)', 'تنزيل نسخة الويندوز (.exe)')}
                </a>

                {/* Android Link */}
                <a 
                  href="https://expo.dev/artifacts/eas/Fmqckhp3-MtWWFQ1PMrFxUyjwVFLi6Aurs5QI6-30qo.apk" 
                  className="w-btn w-btn-outline" 
                  style={{ fontSize: '1.05rem', padding: '14px 28px' }}
                >
                  <Smartphone size={18} /> {translate('Download for Android (.apk)', 'تحميل نسخة الأندرويد (.apk)')}
                </a>

                {/* iOS Link */}
                <a 
                  href="https://github.com/Alithepronce/portfolio/releases" 
                  className="w-btn w-btn-outline" 
                  style={{ fontSize: '1.05rem', padding: '14px 28px', color: '#EC4899', borderColor: 'rgba(236, 72, 153, 0.3)' }}
                >
                  <Apple size={18} /> {translate('Download IPA / TestFlight', 'تحميل نسخة الآيفون / تيست فلايت')}
                </a>
              </div>
              
              <p style={{ fontSize: '11px', color: 'var(--w-text-muted)', marginTop: 28 }}>
                {translate('Windows: ~78.6 MB • Android: ~28 MB • Requires iOS 15.0+', 'نسخة الويندوز: ~78.6 ميجابايت • نسخة الأندرويد: ~28 ميجابايت • يتطلب نظام iOS 15.0+')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Auto-Updater Info Section ═══ */}
      <section className="w-section" style={{ background: 'var(--w-bg-subtle)', paddingBottom: 80 }}>
        <div className="w-container">
          <div className="w-card-glass" style={{ padding: '40px', border: '1px solid var(--w-border)', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px', flexWrap: 'wrap' }}>
              <RefreshCw className="w-8 h-8 text-[#3B82F6]" />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--w-text)', margin: 0 }}>
                {translate('Automatic Background Updates & Cloud Sync', 'التحديثات التلقائية والتزامن السحابي')}
              </h3>
            </div>
            <p style={{ color: 'var(--w-text-sec)', fontSize: '14px', lineHeight: 1.8, marginBottom: '20px' }}>
              {translate(
                'Zemam Browser is equipped with a background update engine. The browser periodically queries our servers to check for version upgrades. Updates download silently, prompting a clean installation on reload. Your bookmarks, settings, and credentials sync securely across devices.',
                'متصفح زِمام مزوّد بنظام تحديث تلقائي متكامل. يتحقق المتصفح دورياً وصامتاً في الخلفية من وجود إصدارات ترقية جديدة ويقوم بتحميلها وتطبيقها تلقائياً عند إعادة التشغيل. كما يدعم مزامنة بيانات حسابك وسجل الزيارات والعلامات المرجعية بين نسختي الكمبيوتر وهواتف الآيفون بأمان تام.'
              )}
            </p>
            <div style={{ fontSize: '12px', color: 'var(--w-text-muted)', borderTop: '1px solid var(--w-border)', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={14} className="text-[#10B981]" />
              <span>{translate('Updates server location configured: alimuwaffaq.my/zemam-updates/.', 'موقع خادم التحديثات مهيأ بالكامل: alimuwaffaq.my/zemam-updates/.')}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
