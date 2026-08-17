'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import PageShell from '@/components/ui/PageShell';
import { useLang } from '@/lib/i18n';
import {
  Smartphone,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  Cpu,
  Lock,
  Download,
  QrCode,
  Ticket,
  Send,
  Cloud,
  Flame,
  Star,
  Activity,
  Terminal,
  Server,
  RefreshCw,
  Clock,
  Key,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

// Showcase apps catalog directly available in ZMAM Store
const showcaseAppsList = [
  {
    name: 'Instagram Rocket VIP',
    category: { ar: 'تطبيقات بلس وتنزيل', en: 'Plus & Media Download' },
    desc: { ar: 'حفظ الستوريات والفيديوهات بجودة أصلية، إخفاء الظهور وقراءة الرسائل، وإزالة الإعلانات.', en: 'Download stories & reels in original quality, ghost mode, and ad-free browsing.' },
    icon: '📸',
    version: 'v320.0',
    size: '142 MB',
    tag: { ar: 'توقيع معتمد', en: 'Signed' }
  },
  {
    name: 'WhatsApp Watusi 3 Pro',
    category: { ar: 'أدوات وخصوصية', en: 'Privacy & Tools' },
    desc: { ar: 'تجميد آخر ظهور، منع حذف الرسائل، إخفاء صحين القراءة، وقفل المحادثات بـ Face ID.', en: 'Freeze last seen, anti-delete messages, hide read receipts, and biometric chat lock.' },
    icon: '💬',
    version: 'v24.5',
    size: '118 MB',
    tag: { ar: 'توقيع معتمد', en: 'Signed' }
  },
  {
    name: 'PUBG Mobile Safe Radar VIP',
    category: { ar: 'ألعاب معدلة وحماية', en: 'Tweaked Games & Anti-Ban' },
    desc: { ar: 'كشف أماكن الخصوم (ESP Radar)، ثبات السلاح الآمن، وحماية مضادة للباند بنسبة 100%.', en: 'Safe ESP radar, weapon stability, and full anti-ban protection layer.' },
    icon: '🎯',
    version: 'v3.2.0',
    size: '1.8 GB',
    tag: { ar: 'VIP حصري', en: 'VIP Only' }
  },
  {
    name: 'TikTok Unicorn Pro Max',
    category: { ar: 'وسائط وترفيه', en: 'Social & Media' },
    desc: { ar: 'تنزيل الفيديوهات بدون علامة مائية بلمسة واحدة، تشغيل بالخلفية وتخطي القيود الجغرافية.', en: '1-tap watermark-free video downloads, background audio, and region bypass.' },
    icon: '🎵',
    version: 'v33.1',
    size: '165 MB',
    tag: { ar: 'توقيع معتمد', en: 'Signed' }
  },
  {
    name: 'YouTube Cercube Plus Max',
    category: { ar: 'فيديو وصوتيات', en: 'Video & Audio Tools' },
    desc: { ar: 'حجب كامل لجميع الإعلانات، تشغيل في الخلفية وفي صورة داخل صورة (PiP)، وتنزيل 4K.', en: 'Total ad blocking, background playback, PiP support, and 4K video downloads.' },
    icon: '▶️',
    version: 'v19.1',
    size: '130 MB',
    tag: { ar: 'توقيع معتمد', en: 'Signed' }
  },
  {
    name: 'Spotify++ Deluxe Audio',
    category: { ar: 'صوتيات وموسيقى', en: 'Music & Audio' },
    desc: { ar: 'تخطي غير محدود للأغاني، صوت فائق النقاء Extreme Quality، وبدون أي فواصل إعلانية.', en: 'Unlimited skips, extreme audio quality, and zero commercial interruptions.' },
    icon: '🎧',
    version: 'v8.9',
    size: '95 MB',
    tag: { ar: 'توقيع معتمد', en: 'Signed' }
  },
];

// Store Architecture Modules under ZMAM Standards
const storeModules = [
  {
    id: 'app',
    title: { ar: 'تطبيق زمام ستور الأصلي (Native SwiftUI)', en: 'Native SwiftUI StoreApp' },
    subtitle: { ar: 'واجهة iOS أصلية فائقة السرعة مع تثبيت فوري OTA', en: 'Ultra-fast native iOS client with 1-tap OTA installation' },
    desc: {
      ar: 'تطبيق آيفون مبرمج بلغة SwiftUI النقية، يمنحك تجربة سلسة تشبه App Store الرسمي لتصفح مئات تطبيقات البلس، الألعاب المهكرة، وتطبيقات الإنتاجية مع إدارة التنزيلات والتحديثات التلقائية.',
      en: 'Native SwiftUI iOS application offering an App Store-grade fluid experience for discovering hundreds of signed plus apps, tweaked games, and utilities.'
    },
    icon: Smartphone,
    color: '#0f766e',
    zmamFeature: { ar: 'مبني وفق مبادئ واجهات أبل السائلة والتفاعل الصامت (0ms Latency)', en: 'Crafted with Apple Fluid UI & Zero Cognitive Load' },
    specs: [
      { label: { ar: 'سرعة التحميل', en: 'OTA Speed' }, val: 'Cloudflare R2 CDN' },
      { label: { ar: 'دعم الجلبريك', en: 'Jailbreak Need' }, val: '0% (بدون جلبريك)' },
      { label: { ar: 'التوافق', en: 'Compatibility' }, val: 'iOS 15.0 – 18.x' },
    ],
    previewUI: {
      badge: 'واجهة التطبيق المباشرة',
      title: 'متجر زمام ستور — حزمة v2.7',
      items: [
        { name: 'Instagram Rocket VIP', category: 'بلس وحماية', version: 'v320.0 (موقع)', size: '142 MB' },
        { name: 'WhatsApp Watusi 3 Pro', category: 'أدوات وإنتاجية', version: 'v24.5 (موقع)', size: '118 MB' },
        { name: 'PUBG Mobile Safe Radar', category: 'ألعاب معدلة', version: 'v3.2.0 (VIP)', size: '1.8 GB' },
        { name: 'TikTok Unicorn Pro Max', category: 'وسائط وتنزيل', version: 'v33.1 (موقع)', size: '165 MB' },
      ],
      status: 'الشهادة التوقيعية: نشطة وموثوقة 100%',
    }
  },
  {
    id: 'signing',
    title: { ar: 'محرك التوقيع السحابي المباشر (zsign Engine)', en: 'Real-time zsign Cloud Engine' },
    subtitle: { ar: 'توقيع فوري لملفات IPA السحابية وتوليد Manifest فوري', en: 'Instant on-demand IPA signing with developer certificates' },
    desc: {
      ar: 'خادم Node.js سحابي متطور مدمج بأداة zsign فائقة الأداء. يقوم بحقن ملف التعريف mobileprovision والشهادة التوقيعية P12 داخل حزمة الـ IPA وتوليد ملف XML Manifest لتثبيت التطبيق على جهازك خلال ثوانٍ معدودة.',
      en: 'High-performance Node.js signing pipeline utilizing zsign to inject mobileprovision and P12 enterprise certificates, generating instant itms-services OTA manifests.'
    },
    icon: Cpu,
    color: '#6366f1',
    zmamFeature: { ar: 'توقيع آلي موثوق مع حماية كاملة للمفاتيح التوقيعية', en: 'Automated cryptographic signature with hardware safety' },
    specs: [
      { label: { ar: 'زمن التوقيع', en: 'Signing Latency' }, val: '< 3 ثوانٍ' },
      { label: { ar: 'بروتوكول التثبيت', en: 'Install Protocol' }, val: 'itms-services://' },
      { label: { ar: 'سلامة الحزمة', en: 'Binary Integrity' }, val: 'Zero Revoke Tech' },
    ],
    previewUI: {
      badge: 'سير عمليات التوقيع الحي',
      title: 'محطة التوقيع السحابي #01',
      items: [
        { name: '1. استلام طلب التوقيع للمستخدم', category: 'API Handshake', version: '200 OK', size: '0.1s' },
        { name: '2. فحص سعة الشهادة والـ UDID', category: 'Cert Match', version: 'موثق', size: '0.2s' },
        { name: '3. معالجة IPA وحقن zsign Bundle', category: 'Binary Signing', version: 'ناجح', size: '1.8s' },
        { name: '4. توليد رابط OTA وتجهيز التثبيت', category: 'R2 Manifest', version: 'جاهز', size: '0.4s' },
      ],
      status: 'زمن العملية الإجمالي: 2.5 ثانية فقط',
    }
  },
  {
    id: 'udid',
    title: { ar: 'التوثيق الآلي للأجهزة (UDID MobileConfig)', en: 'Zero-Touch UDID Auto Enrollment' },
    subtitle: { ar: 'ربط الآيفون بالشهادة التوقيعية بـ 3 خطوات فقط', en: 'Automated Safari mobileconfig payload extraction' },
    desc: {
      ar: 'بروتوكول توثيق مبتكر يستخرج معرّف الجهاز الفريد (UDID) عبر بروفايل مشفر يثبته المستخدم في Safari، ليتم ربط الآيفون فورياً بحساب المستخدم وتخصيص مقعد له في شهادة المطورين المعتمدة دون الحاجة لكتابة أو نسخ أي رمز يدوي.',
      en: 'Effortless Safari profile pairing extracting hardware UDID securely, matching devices to authorized certificates in PostgreSQL without tedious manual input.'
    },
    icon: QrCode,
    color: '#0891b2',
    zmamFeature: { ar: 'نظام توثيق آمن مع منع إنشاء المعرفات الوهمية', en: 'Strict zero-spoofing cryptographic identity validation' },
    specs: [
      { label: { ar: 'خطوات التوثيق', en: 'Steps Required' }, val: '3 خطوات فقط' },
      { label: { ar: 'سعة الشهادة', en: 'Cert Capacity' }, val: '100 جهاز / شهادة' },
      { label: { ar: 'تزامن الحساب', en: 'Account Sync' }, val: 'فوري (Realtime)' },
    ],
    previewUI: {
      badge: 'مخطط التوثيق الآلي',
      title: 'مسار تسجيل الجهاز بالستور',
      items: [
        { name: 'الخطوة 01: تنزيل ملف التوثيق من Safari', category: 'Profile Download', version: 'udid.mobileconfig', size: '1 KB' },
        { name: 'الخطوة 02: الضغط على تثبيت من الإعدادات', category: 'iOS Settings', version: 'Profile Installed', size: 'آمن' },
        { name: 'الخطوة 03: تفعيل الحساب وتثبيت المتجر', category: 'Device Linked', version: 'مفعل ونشط', size: 'جاهز' },
      ],
      status: 'حالة التوثيق: جهاز آيفون مسجل ومعتمد',
    }
  },
  {
    id: 'plans',
    title: { ar: 'باقات الاشتراك وأكواد التفعيل VIP', en: 'VIP Subscription & Voucher Architecture' },
    subtitle: { ar: 'نظام اشتراكات وضمان استبدال مع أكواد تفعيل فورية', en: 'Tiered subscription packages with automated code redemption' },
    desc: {
      ar: 'هيكلية مالية وتنظيمية تتيح تفعيل الاشتراكات عبر أكواد رقمية فريدة يولدها الأدمن، مع فترات ضمان حقيقية، تعويض فوري عند توقف الشهادات، ومتابعة دقيقة لصلاحية كل مستخدم عبر لوحة الإدارة.',
      en: 'Flexible multi-tier subscription engine with instant voucher code redemption, automated replacement guarantee periods, and real-time quota tracking.'
    },
    icon: Ticket,
    color: '#d97706',
    zmamFeature: { ar: 'نظام شفاف يضمن حقوق المشترك ويوثق العمليات في Audit Logs', en: 'Full audit log trail and guaranteed customer replacement' },
    specs: [
      { label: { ar: 'الباقات المتاحة', en: 'Tiers' }, val: '4 باقات سنوية وشهرية' },
      { label: { ar: 'نظام التفعيل', en: 'Redemption' }, val: 'أكواد Voucher فورية' },
      { label: { ar: 'الضمان والتعويض', en: 'Warranty' }, val: 'حتى 300 يوم استبدال' },
    ],
    previewUI: {
      badge: 'قائمة باقات الاشتراك الرسمية',
      title: 'باقات متجر زمام ستور (بالدينار العراقي)',
      items: [
        { name: 'الباقة الأساسية (30 يوم)', category: 'جهاز واحد', version: '7,500 د.ع', size: 'تطبيقات البلس' },
        { name: 'الباقة الفضية (60 يوم)', category: 'ضمان استبدال', version: '13,500 د.ع', size: 'توقيع غير محدود' },
        { name: 'الباقة الذهبية VIP (150 يوم)', category: 'الأكثر طلباً', version: '19,500 د.ع', size: 'ألعاب ورادار' },
        { name: 'الباقة الماسية (365 يوم)', category: 'سنة كاملة', version: '28,500 د.ع', size: 'VIP شامل' },
      ],
      status: 'التفعيل متاح فورياً عبر كود الاشتراك أو تيليغرام',
    }
  },
  {
    id: 'cloud',
    title: { ar: 'التخزين السحابي فائق السرعة (Cloudflare R2)', en: 'Cloudflare R2 High-Speed Distribution' },
    subtitle: { ar: 'تنزيل فوري للـ IPAs بدون قيود سرعة وبأعلى معايير الأمان', en: 'Zero egress fee cloud distribution with signed streaming URLs' },
    desc: {
      ar: 'ربط كامل مع شبكة Cloudflare R2 العالمية لتخزين ملفات التطبيقات الأصلية والموقعة، مما يضمن سرعة تنزيل فائقة في كافة الدول بدون استهلاك نطاق ترددي باهظ، مع روابط تنزيل موقعة ومحمية بـ JWT Secret صارم.',
      en: 'Seamless integration with Cloudflare R2 globally distributed object storage for fast IPA delivery, token-protected streaming, and zero data leakage.'
    },
    icon: Cloud,
    color: '#059669',
    zmamFeature: { ar: 'خصوصية مشددة بدون تتبع أو إعلانات مزعجة', en: 'High bandwidth without third-party tracking or ads' },
    specs: [
      { label: { ar: 'سرعة التنزيل', en: 'Download Bandwidth' }, val: 'Global Edge CDN' },
      { label: { ar: 'حماية الروابط', en: 'URL Signing' }, val: 'Tokenized Signed URLs' },
      { label: { ar: 'قاعدة البيانات', en: 'Database Engine' }, val: 'PostgreSQL Strict' },
    ],
    previewUI: {
      badge: 'شبكة التوزيع السحابي R2',
      title: 'مستودعات حزم التطبيقات',
      items: [
        { name: 'مستودع حزم التطبيقات الرسمية (Apps Repository)', category: 'Master IPA Storage', version: 'مشفر', size: 'R2 Bucket' },
        { name: 'مستودع الحزم الموقعة الجاهزة (Signed Cache)', category: 'Instant Cache', version: 'جاهز للتثبيت', size: 'R2 Stream' },
        { name: 'قاعدة بيانات المشتركين والأجهزة (PostgreSQL)', category: 'Relational DB', version: 'SSL Secured', size: 'Railway DB' },
      ],
      status: 'حالة خوادم التخزين والتوزيع: متصلة ونشطة بنسبة 99.9%',
    }
  }
];

// Interactive Pricing Plans Data
const pricingPlans = [
  {
    id: 'basic',
    name: { ar: 'الباقة الأساسية', en: 'Basic Tier' },
    period: { ar: '30 يوم', en: '30 Days' },
    price: '7,500',
    currency: { ar: 'د.ع', en: 'IQD' },
    badge: null,
    highlight: false,
    color: '#0f766e',
    features: [
      { ar: 'جهاز آيفون واحد (1 iOS Device)', en: '1 iOS Device Registered' },
      { ar: 'وصول لكافة تطبيقات البلس والأدوات', en: 'Full Plus Apps & Utilities' },
      { ar: 'سرعة تنزيل وتوقيع سريعة', en: 'Fast Cloud Signing & Download' },
      { ar: 'تثبيت بنقرة واحدة عبر تطبيق المتجر', en: '1-Tap Direct OTA Installs' },
    ],
    telegramText: 'مرحباً، أرغب في الاشتراك في الباقة الأساسية لمتجر زمام ستور (7,500 د.ع)',
  },
  {
    id: 'silver',
    name: { ar: 'الباقة الفضية', en: 'Silver Tier' },
    period: { ar: '60 يوم', en: '60 Days' },
    price: '13,500',
    currency: { ar: 'د.ع', en: 'IQD' },
    badge: { ar: 'ضمان استبدال', en: 'Replacement Guard' },
    highlight: false,
    color: '#6366f1',
    features: [
      { ar: 'جهاز واحد مع ضمان استبدال 60 يوم', en: '1 Device with 60-Day Warranty' },
      { ar: 'توقيع غير محدود لجميع التطبيقات والألعاب', en: 'Unlimited Signing for All Apps' },
      { ar: 'دعم فني مستمر وتحديثات سريعة', en: 'Continuous Tech Support' },
      { ar: 'أولوية في معالجة التوقيع السحابي', en: 'Priority Cloud Signing Queue' },
    ],
    telegramText: 'مرحباً، أرغب في الاشتراك في الباقة الفضية لمتجر زمام ستور (13,500 د.ع)',
  },
  {
    id: 'gold',
    name: { ar: 'الباقة الذهبية (VIP)', en: 'Gold VIP Tier' },
    period: { ar: '150 يوم', en: '150 Days' },
    price: '19,500',
    currency: { ar: 'د.ع', en: 'IQD' },
    badge: { ar: 'الأكثر طلباً', en: 'Most Popular' },
    highlight: true,
    color: '#0f766e',
    features: [
      { ar: 'ضمان حماية واستبدال 150 يوم كاملة', en: '150-Day Replacement Guarantee' },
      { ar: 'جميع تطبيقات البلس والألعاب المهكرة ورادار ببجي', en: 'All Tweaked Games & PUBG Radar' },
      { ar: 'أولوية قصوى في التوقيع السحابي المباشر', en: 'Maximum Priority Cloud Signing' },
      { ar: 'دعم فني مباشر وتحديثات فورية للألعاب', en: 'Dedicated Direct Support & Updates' },
    ],
    telegramText: 'مرحباً، أرغب في الاشتراك في الباقة الذهبية VIP لمتجر زمام ستور (19,500 د.ع)',
  },
  {
    id: 'diamond',
    name: { ar: 'الباقة الماسّية', en: 'Diamond Tier' },
    period: { ar: 'سنة كاملة (365 يوم)', en: '1 Full Year (365 Days)' },
    price: '28,500',
    currency: { ar: 'د.ع', en: 'IQD' },
    badge: { ar: 'أعلى قيمة وسنة كاملة', en: 'Best Value · 1 Year' },
    highlight: false,
    color: '#d97706',
    features: [
      { ar: 'ضمان سنة كاملة (300 يوم استبدال مجاني)', en: '1 Year Warranty (300-Day Free Swap)' },
      { ar: 'دعم فني VIP فوري وأولوية في التعويض', en: 'Instant VIP Technical Assistance' },
      { ar: 'وصول لكافة الميزات المتقدمة وتكرار التطبيقات', en: 'App Duplication & Custom IPAs' },
      { ar: 'تحديثات أسبوعية لأحدث حزم التطبيقات', en: 'Weekly IPA library drops' },
    ],
    telegramText: 'مرحباً، أرغب في الاشتراك في الباقة الماسية لمتجر زمام ستور (28,500 د.ع)',
  }
];

export default function StorePage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();
  const [activeTab, setActiveTab] = useState('app');
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherStatus, setVoucherStatus] = useState<string | null>(null);
  const [loadingVoucher, setLoadingVoucher] = useState(false);

  const currentModule = storeModules.find((m) => m.id === activeTab) || storeModules[0];

  const handleRedeemVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (!voucherCode.trim()) {
      setVoucherStatus(isRtl ? 'يرجى إدخال كود التفعيل أولاً.' : 'Please enter a voucher code first.');
      return;
    }
    setLoadingVoucher(true);
    setVoucherStatus(isRtl ? 'جاري التحقق من كود الاشتراك...' : 'Verifying voucher code...');
    setTimeout(() => {
      setLoadingVoucher(false);
      setVoucherStatus(
        isRtl
          ? 'تم التحقق! لتأكيد الربط بجهازك، يرجى توثيق الـ UDID أدناه وسيقوم النظام بتفعيل باقتك فوراً.'
          : 'Verified! Please complete UDID enrollment below to activate this device immediately.'
      );
    }, 1000);
  };

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto pb-24 pt-4">
        {/* HERO BANNER */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-600/20 bg-teal-50 px-4 py-1.5 text-xs font-bold text-teal-800 mb-6 shadow-sm"
          >
            <Smartphone size={14} className="text-[#0f766e]" />
            {isRtl ? 'منظومة زمام لتطبيقات iOS الموقعة | ZMAM Store Ecosystem' : 'Signed iOS Apps & Enterprise Signing'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold sm:text-6xl tracking-tight text-[#1d1d1f] mb-6"
          >
            {isRtl ? 'متجر' : 'Platform'}{' '}
            <span className="text-[#0f766e]">
              {isRtl ? 'زمام ستور (ZMAM Store)' : 'ZMAM Store for iOS'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-[#515154] leading-relaxed mb-8"
          >
            {isRtl
              ? 'المنظومة الرقمية الشاملة لتوقيع وتثبيت تطبيقات iOS وألعاب البلس الموقعة بدون جلبريك، مع توثيق آلي للـ UDID وتوزيع سحابي فائق السرعة عبر محرك zsign وCloudflare R2.'
              : 'The comprehensive iOS signing ecosystem delivering jailbreak-free signed apps, automated UDID enrollment, and instant OTA installs powered by zsign and Cloudflare R2.'}
          </motion.p>

          {/* ACTION BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {/* Primary Action: Direct UDID Profile Download */}
            <a
              href="https://ios-store-production.up.railway.app/api/udid/mobileconfig"
              onClick={playClick}
              onMouseEnter={playHover}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#0f766e] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#115e59] shadow-lg"
            >
              <QrCode size={17} />
              <span>{isRtl ? 'توثيق الجهاز وتنزيل البروفايل (UDID)' : 'Enroll iPhone (Download Profile)'}</span>
            </a>

            {/* Scroll to Voucher Redemption */}
            <a
              href="#voucher-section"
              onClick={playClick}
              onMouseEnter={playHover}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 text-sm font-bold text-[#1d1d1f] transition hover:bg-black/5 shadow-sm"
            >
              <Ticket size={16} className="text-[#0f766e]" />
              <span>{isRtl ? 'تفعيل كود اشتراك جاهز' : 'Redeem Voucher Code'}</span>
            </a>

            {/* Telegram Support & Activation Link */}
            <a
              href="https://t.me/Jormunghandr"
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 text-sm font-bold text-[#1d1d1f] transition hover:bg-black/5 shadow-sm"
            >
              <Send size={15} className="text-[#0088cc]" />
              <span>{isRtl ? 'الدعم والاشتراكات (@Jormunghandr)' : 'Telegram Support'}</span>
            </a>
          </motion.div>
        </section>

        {/* METRICS & KEY STATS HUD */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="apple-studio-card p-6 text-center bg-white border border-black/8">
              <div className="text-3xl font-extrabold text-[#0f766e] mb-1">100%</div>
              <div className="text-xs font-bold text-[#1d1d1f] mb-1">
                {isRtl ? 'بدون جلبريك إطلاقاً' : 'Zero Jailbreak Required'}
              </div>
              <p className="text-[11px] text-[#86868b]">
                {isRtl ? 'توقيع رسمي آمن معتمد من أبل' : 'Native Developer Signing'}
              </p>
            </div>

            <div className="apple-studio-card p-6 text-center bg-white border border-black/8">
              <div className="text-3xl font-extrabold text-[#6366f1] mb-1">&lt; 3s</div>
              <div className="text-xs font-bold text-[#1d1d1f] mb-1">
                {isRtl ? 'سرعة التوقيع السحابي' : 'Cloud Signing Latency'}
              </div>
              <p className="text-[11px] text-[#86868b]">
                {isRtl ? 'محرك zsign مدمج فائق السرعة' : 'zsign binary acceleration'}
              </p>
            </div>

            <div className="apple-studio-card p-6 text-center bg-white border border-black/8">
              <div className="text-3xl font-extrabold text-[#0891b2] mb-1">100</div>
              <div className="text-xs font-bold text-[#1d1d1f] mb-1">
                {isRtl ? 'سعة الشهادة الذكية' : 'Devices per Certificate'}
              </div>
              <p className="text-[11px] text-[#86868b]">
                {isRtl ? 'توزيع آلي وضمان استبدال' : 'Automated UDID Allocation'}
              </p>
            </div>

            <div className="apple-studio-card p-6 text-center bg-white border border-black/8">
              <div className="text-3xl font-extrabold text-[#d97706] mb-1">iOS 15–18+</div>
              <div className="text-xs font-bold text-[#1d1d1f] mb-1">
                {isRtl ? 'توافق كامل وشامل' : 'Full iOS Compatibility'}
              </div>
              <p className="text-[11px] text-[#86868b]">
                {isRtl ? 'كافة موديلات الآيفون والآيباد' : 'iPhone & iPad universal support'}
              </p>
            </div>
          </div>
        </section>

        {/* HOW UDID ENROLLMENT WORKS (3 STEPS) */}
        <section className="mb-24">
          <div className="apple-studio-card p-8 sm:p-12 bg-white border border-black/8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-black/8">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f766e] bg-teal-50 px-3 py-1 rounded-full border border-teal-600/20 mb-2">
                  <ShieldCheck size={14} />
                  {isRtl ? 'دليل توثيق الآيفون السريع' : 'Fast iPhone Enrollment Guide'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f]">
                  {isRtl ? 'كيف توثق جهازك الآيفون بـ 3 خطوات بسيطة؟' : 'How to enroll your iOS device in 3 steps'}
                </h2>
              </div>
              <a
                href="https://ios-store-production.up.railway.app/api/udid/mobileconfig"
                onClick={playClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0f766e] text-white font-bold text-xs hover:bg-[#115e59] transition shadow-md shrink-0"
              >
                <Download size={15} />
                <span>{isRtl ? 'بدء تنزيل ملف التوثيق' : 'Download MobileConfig Profile'}</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#f8fafc] border border-black/8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#0f766e] text-white flex items-center justify-center font-bold text-sm mb-4">
                    01
                  </div>
                  <h3 className="text-base font-extrabold text-[#1d1d1f] mb-2">
                    {isRtl ? 'تنزيل ملف التعريف' : '1. Download Profile'}
                  </h3>
                  <p className="text-xs text-[#515154] leading-relaxed">
                    {isRtl
                      ? 'اضغط على زر التوثيق عبر متصفح Safari واضغط "سماح" لتنزيل ملف التعريف الآمن لجهازك.'
                      : 'Tap the enroll button in Safari and allow downloading the encrypted configuration profile.'}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#f8fafc] border border-black/8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#6366f1] text-white flex items-center justify-center font-bold text-sm mb-4">
                    02
                  </div>
                  <h3 className="text-base font-extrabold text-[#1d1d1f] mb-2">
                    {isRtl ? 'التثبيت من الإعدادات' : '2. Install in Settings'}
                  </h3>
                  <p className="text-xs text-[#515154] leading-relaxed">
                    {isRtl
                      ? 'افتح "الإعدادات" في الآيفون واضغط على "تم تنزيل ملف التعريف" ثم اختر "تثبيت" لتأكيد المعرف.'
                      : 'Open iOS Settings, tap "Profile Downloaded" and confirm install to link hardware UDID.'}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#f8fafc] border border-black/8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#16a34a] text-white flex items-center justify-center font-bold text-sm mb-4">
                    03
                  </div>
                  <h3 className="text-base font-extrabold text-[#1d1d1f] mb-2">
                    {isRtl ? 'التفعيل وتثبيت المتجر' : '3. Activate & Install'}
                  </h3>
                  <p className="text-xs text-[#515154] leading-relaxed">
                    {isRtl
                      ? 'يُربط جهازك بالشهادة التوقيعية المعتمدة فورياً، ويصبح جاهزاً لتثبيت كافة التطبيقات والألعاب الموقعة.'
                      : 'Your device is paired with the enterprise certificate and ready for instant 1-tap app installs.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VOUCHER CODE REDEMPTION SECTION */}
        <section id="voucher-section" className="mb-24">
          <div className="apple-studio-card p-8 sm:p-12 bg-gradient-to-r from-teal-50/50 via-white to-emerald-50/50 border border-teal-600/20 shadow-sm">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#0f766e] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
                <Ticket size={28} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] mb-2">
                {isRtl ? 'تفعيل كود اشتراك زمام ستور' : 'Redeem ZMAM Voucher Code'}
              </h2>
              <p className="text-xs sm:text-sm text-[#515154] mb-8">
                {isRtl
                  ? 'إذا استلمت كود اشتراك من إدارة المتجر أو الدعم، أدخله هنا لتأكيد وتفعيل باقتك فورياً.'
                  : 'Enter your voucher code received from support to activate your VIP subscription instantly.'}
              </p>

              <form onSubmit={handleRedeemVoucher} className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  placeholder="ZMAM-XXXX-XXXX"
                  className="w-full flex-1 px-5 py-3.5 rounded-full border border-black/15 bg-white text-center sm:text-right font-mono text-sm font-bold text-[#1d1d1f] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-teal-600/20 shadow-sm"
                  dir="ltr"
                />
                <button
                  type="submit"
                  disabled={loadingVoucher}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0f766e] text-white font-bold text-xs hover:bg-[#115e59] transition shadow-md disabled:opacity-50 whitespace-nowrap"
                >
                  {loadingVoucher ? (isRtl ? 'جاري التحقق...' : 'Checking...') : (isRtl ? 'تفعيل الكود' : 'Redeem')}
                </button>
              </form>

              {voucherStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 rounded-2xl bg-white border border-teal-600/30 text-xs font-bold text-[#0f766e]"
                >
                  {voucherStatus}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* SHOWCASE APPS CATALOG GRID */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-black/10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0f766e] mb-1">
                {isRtl ? 'مكتبة التطبيقات الموقعة' : 'SIGNED APPS LIBRARY'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
                {isRtl ? 'أبرز تطبيقات البلس والألعاب المتاحة للتثبيت' : 'Featured Signed Plus Apps & Games'}
              </h2>
            </div>
            <span className="mt-2 md:mt-0 text-xs font-bold text-[#86868b]">
              {isRtl ? 'تثبيت مباشر OTA عبر الشهادة' : 'Direct OTA Signed Installs'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseAppsList.map((app, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                className="apple-studio-card p-6 bg-white border border-black/8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] border border-black/5 flex items-center justify-center text-2xl shadow-inner">
                        {app.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#1d1d1f]">{app.name}</h3>
                        <span className="text-[11px] font-bold text-[#0066cc]">{app.category[lang]}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#0f766e] bg-teal-50 border border-teal-600/20 px-2.5 py-0.5 rounded-full">
                      {app.tag[lang]}
                    </span>
                  </div>

                  <p className="text-xs text-[#515154] leading-relaxed mb-6">
                    {app.desc[lang]}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <span className="text-[11px] font-mono text-[#86868b]">{app.version} · {app.size}</span>
                  <a
                    href="https://ios-store-production.up.railway.app/api/udid/mobileconfig"
                    onClick={playClick}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0f766e] hover:underline"
                  >
                    <span>{isRtl ? 'توثيق وتثبيت' : 'Enroll to Install'}</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE ARCHITECTURE MODULES */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-black/10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0f766e] mb-1">
                {isRtl ? 'الهيكلية والأنظمة المدمجة' : 'SYSTEM ARCHITECTURE & CAPABILITIES'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
                {isRtl ? 'استعراض الركائز الهندسية لمتجر زمام' : 'Explore Core ZMAM Store Modules'}
              </h2>
            </div>
            <span className="mt-2 md:mt-0 text-xs font-bold text-[#86868b]">
              {isRtl ? 'اضغط لاختيار وتجربة المودول' : 'Select a module to inspect'}
            </span>
          </div>

          {/* Module Selector Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {storeModules.map((module) => {
              const Icon = module.icon;
              const isSelected = activeTab === module.id;
              return (
                <button
                  key={module.id}
                  onClick={() => {
                    playClick();
                    setActiveTab(module.id);
                  }}
                  onMouseEnter={playHover}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#1d1d1f] text-white shadow-md'
                      : 'bg-white border border-black/10 text-[#515154] hover:bg-black/5'
                  }`}
                >
                  <Icon size={16} style={{ color: isSelected ? '#fff' : module.color }} />
                  <span>{module.title[lang]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Module Detailed Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentModule.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="apple-studio-card p-8 sm:p-12 overflow-hidden relative bg-white border border-black/8 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Col: Specs & Description */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-black/5 text-[#515154] mb-4">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentModule.color }} />
                    <span>{currentModule.subtitle[lang]}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1d1d1f] mb-4">
                    {currentModule.title[lang]}
                  </h3>

                  <p className="text-sm sm:text-base text-[#515154] leading-relaxed mb-6">
                    {currentModule.desc[lang]}
                  </p>

                  {/* ZMAM Standard Feature Seal */}
                  <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/5 mb-8 flex items-start gap-3">
                    <ShieldCheck size={20} className="text-[#0f766e] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#1d1d1f] mb-0.5">
                        {isRtl ? 'معيار منظومة زمام الهندسي' : 'ZMAM Constitutional Guarantee'}
                      </div>
                      <div className="text-xs text-[#515154]">
                        {currentModule.zmamFeature[lang]}
                      </div>
                    </div>
                  </div>

                  {/* Specs Pill List */}
                  <div className="grid grid-cols-3 gap-3">
                    {currentModule.specs.map((s, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-white border border-black/8 text-center">
                        <div className="text-[10px] uppercase font-bold text-[#86868b] mb-1">
                          {s.label[lang]}
                        </div>
                        <div className="text-xs font-extrabold text-[#1d1d1f]">
                          {s.val}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Col: Live Interactive Mockup Simulator */}
                <div className="lg:col-span-5">
                  <div className="rounded-3xl border border-black/10 bg-[#1c1f24] text-white p-6 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        {currentModule.previewUI.badge}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-neutral-300 mb-4">
                      {currentModule.previewUI.title}
                    </div>

                    <div className="space-y-2.5 mb-6">
                      {currentModule.previewUI.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/10 transition"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                              {idx + 1}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white">{item.name}</div>
                              <div className="text-[10px] text-neutral-400">{item.category}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="inline-block text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              {item.version}
                            </span>
                            <div className="text-[10px] text-neutral-500 mt-0.5">{item.size}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-2xl bg-emerald-900/20 border border-emerald-500/30 text-center">
                      <div className="text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                        <CheckCircle2 size={13} />
                        <span>{currentModule.previewUI.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* PRICING & SUBSCRIPTION PACKAGES SECTION */}
        <section className="mb-24">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0f766e] mb-1">
              {isRtl ? 'الباقات والاشتراكات' : 'SUBSCRIPTION PACKAGES'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight mb-4">
              {isRtl ? 'اختر باقة الاشتراك المناسبة لجهازك' : 'Choose Your Store Subscription Plan'}
            </h2>
            <p className="text-sm text-[#515154] max-w-2xl mx-auto">
              {isRtl
                ? 'جميع الباقات تشمل تفعيل فوري لكافة تطبيقات البلس والألعاب الموقعة مع ضمان حقيقي واستبدال معتمد.'
                : 'All plans include direct activation, unlimited signed plus apps, and verified warranty replacement.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`apple-studio-card p-7 flex flex-col justify-between relative border border-black/8 ${
                  plan.highlight ? 'ring-2 ring-[#0f766e] bg-white shadow-xl' : 'bg-white'
                }`}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-3 right-6 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-sm ${
                      plan.highlight ? 'bg-[#0f766e]' : 'bg-[#1d1d1f]'
                    }`}
                  >
                    {plan.badge[lang]}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-extrabold text-[#1d1d1f] mb-1">
                    {plan.name[lang]}
                  </h3>
                  <div className="text-xs text-[#86868b] font-medium mb-4">
                    {plan.period[lang]}
                  </div>

                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-black/8">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs font-bold text-[#515154]">
                      {plan.currency[lang]}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#515154] leading-relaxed">
                        <CheckCircle2 size={15} className="text-[#0f766e] shrink-0 mt-0.5" />
                        <span>{feat[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://t.me/Jormunghandr?text=${encodeURIComponent(plan.telegramText)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className={`w-full py-3 rounded-full text-xs font-bold text-center transition flex items-center justify-center gap-2 ${
                    plan.highlight
                      ? 'bg-[#0f766e] text-white hover:bg-[#115e59] shadow-md'
                      : 'bg-[#1d1d1f] text-white hover:bg-black'
                  }`}
                >
                  <Send size={13} />
                  <span>{isRtl ? 'طلب التفعيل عبر تليغرام' : 'Activate via Telegram'}</span>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ZMAM CONSTITUTION SEAL */}
        <section className="mb-24">
          <div className="apple-studio-card p-8 sm:p-12 text-center bg-gradient-to-b from-white to-[#f7f7f5] border border-black/10 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-600/30 bg-teal-50 px-4 py-1 text-xs font-bold text-teal-800 mb-6">
              <ShieldCheck size={14} className="text-[#0f766e]" />
              <span>مبادرة أصيلة تحت مظلة منظومة زمام (Project ZMAM)</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] mb-4">
              {isRtl ? 'عقيدة الخصوصية والأمانة الهندسية' : 'Constitutional Engineering & Privacy'}
            </h3>

            <p className="max-w-2xl mx-auto text-sm text-[#515154] leading-relaxed mb-6">
              {isRtl
                ? 'هذا المشروع منسوج ومبني وفق مبادئ وعقيدة منظومة زمام (Project ZMAM) — حيث تلتقي الهندسة المتقدمة، الخصوصية المطلقة، والتصميم الفائق لتطوير تكنولوجيا تضع الإنسان في المقام الأول وتمنحه حرية التحكم التام بجهازه دون قيود تجارية تعسفية.'
                : 'Engineered in strict accordance with Project ZMAM constitution: prioritizing human dignity, absolute data privacy, and reliable software architecture that endures.'}
            </p>

            <Link
              href="/zemam"
              onClick={playClick}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f766e] hover:underline"
            >
              <span>{isRtl ? 'قراءة فصول الدستور الـ 48' : 'Explore ZMAM Constitution'}</span>
              {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </Link>
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="text-center">
          <div className="apple-studio-card p-10 sm:p-14 bg-[#1c1f24] text-white relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              {isRtl ? 'هل أنت مستعد لتوثيق جهازك وتثبيت المتجر؟' : 'Ready to Enroll & Install ZMAM Store?'}
            </h2>
            <p className="max-w-xl mx-auto text-sm text-neutral-400 leading-relaxed mb-8">
              {isRtl
                ? 'وثّق جهازك الآيفون بلمسة واحدة وابدأ بتصفح وتثبيت مئات التطبيقات الموقعة مباشرة.'
                : 'Enroll your iPhone in seconds and start downloading hundreds of signed apps directly.'}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://ios-store-production.up.railway.app/api/udid/mobileconfig"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0f766e] text-white font-bold text-sm shadow-md hover:bg-[#115e59] transition"
              >
                <QrCode size={16} />
                <span>{isRtl ? 'تنزيل بروفايل التوثيق الآلي' : 'Download UDID Profile'}</span>
              </a>

              <a
                href="https://t.me/Jormunghandr"
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-bold text-sm transition hover:bg-white/10"
              >
                <Send size={15} className="text-[#0088cc]" />
                <span>{isRtl ? 'محادثة الدعم والتفعيل (@Jormunghandr)' : 'Telegram Support'}</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
