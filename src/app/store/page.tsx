'use client';

import { useState, useEffect } from 'react';
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
  User,
  UserPlus,
  LogIn,
  LogOut,
  Copy,
  Check,
  AlertTriangle,
  Phone,
  Mail,
  X,
  FileCode,
} from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';
import { useEnrollment } from './_enrollment/useEnrollment';
import { JourneyRail, type StageKey } from './_enrollment/JourneyRail';

const API_BASE_URL = 'https://ios-store-production.up.railway.app';

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
      ar: 'تطبيق آيفون مبرمج بلغة SwiftUI النقية، يمنحك تجربة سلسة تشبه App Store الرسمي لتصفح مئات تطبيقات البلس، الألعاب المهكرة، وتطبيقات الإنتاجية مع إدارة التنزيلات والتحديثات التلقائية للمشتركين.',
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
      title: 'متجر زمام ستور — حزمة v3.8',
      items: [
        { name: 'Instagram Rocket VIP', category: 'بلس وحماية', version: 'v320.0 (موقع)', size: '142 MB' },
        { name: 'WhatsApp Watusi 3 Pro', category: 'أدوات وإنتاجية', version: 'v24.5 (موقع)', size: '118 MB' },
        { name: 'PUBG Mobile Safe Radar', category: 'ألعاب معدلة', version: 'v3.2.0 (VIP)', size: '1.8 GB' },
        { name: 'TikTok Unicorn Pro Max', category: 'وسائط وتنزيل', version: 'v33.1 (موقع)', size: '165 MB' },
      ],
      status: 'الشهادة التوقيعية: نشطة ومحمية للمشتركين',
    }
  },
  {
    id: 'signing',
    title: { ar: 'محرك التوقيع السحابي المباشر (zsign Engine)', en: 'Real-time zsign Cloud Engine' },
    subtitle: { ar: 'توقيع فوري لملفات IPA السحابية وتوليد Manifest فوري', en: 'Instant on-demand IPA signing with developer certificates' },
    desc: {
      ar: 'خادم Node.js سحابي متطور مدمج بأداة zsign فائقة الأداء. يقوم بحقن ملف التعريف mobileprovision والشهادة التوقيعية P12 داخل حزمة الـ IPA وتوليد ملف XML Manifest لتثبيت التطبيق على أجهزة المشتركين المعتمدة.',
      en: 'High-performance Node.js signing pipeline utilizing zsign to inject mobileprovision and P12 enterprise certificates, generating instant itms-services OTA manifests for active subscribers.'
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
        { name: '1. استلام طلب التوقيع للمشترك', category: 'Subscription Verified', version: '200 OK', size: '0.1s' },
        { name: '2. فحص سعة الشهادة والـ UDID', category: 'Cert Match', version: 'موثق', size: '0.2s' },
        { name: '3. معالجة IPA وحقن zsign Bundle', category: 'Binary Signing', version: 'ناجح', size: '1.8s' },
        { name: '4. توليد رابط OTA وتجهيز التثبيت', category: 'R2 Manifest', version: 'جاهز', size: '0.4s' },
      ],
      status: 'حماية كاملة: التوقيع محصور بحسابات المشتركين فقط',
    }
  },
  {
    id: 'udid',
    title: { ar: 'التوثيق الآلي للأجهزة (UDID MobileConfig)', en: 'Zero-Touch UDID Auto Enrollment' },
    subtitle: { ar: 'ربط الآيفون بالشهادة التوقيعية للمشتركين المعتمدين', en: 'Automated Safari mobileconfig payload extraction' },
    desc: {
      ar: 'بروتوكول توثيق مشفر يستخرج معرّف الجهاز الفريد (UDID) عبر بروفايل مخصص للمشترك بعد تفعيل الكود، ليتم ربط الآيفون فورياً بحسابه وتخصيص مقعد له في شهادة المطورين المعتمدة دون الحاجة لكتابة أي رمز يدوي.',
      en: 'Effortless Safari profile pairing extracting hardware UDID securely for active subscribers, matching devices to authorized certificates in PostgreSQL.'
    },
    icon: QrCode,
    color: '#0891b2',
    zmamFeature: { ar: 'نظام توثيق آمن مع منع إنشاء المعرفات الوهمية', en: 'Strict zero-spoofing cryptographic identity validation' },
    specs: [
      { label: { ar: 'خطوات التوثيق', en: 'Steps Required' }, val: '3 خطوات بعد الاشتراك' },
      { label: { ar: 'سعة الشهادة', en: 'Cert Capacity' }, val: '100 جهاز / شهادة' },
      { label: { ar: 'أمان البيانات', en: 'Security' }, val: 'HMAC Signed Tokens' },
    ],
    previewUI: {
      badge: 'مخطط التوثيق الآلي',
      title: 'مسار تسجيل جهاز المشترك',
      items: [
        { name: 'الخطوة 01: تفعيل كود الاشتراك VIP', category: 'Auth Verification', version: 'كود معتمد', size: 'ناجح' },
        { name: 'الخطوة 02: تنزيل ملف التوثيق المخصص', category: 'Signed Profile', version: 'tokenized', size: '1 KB' },
        { name: 'الخطوة 03: ربط المعرف وتثبيت المتجر', category: 'Device Linked', version: 'مفعل ونشط', size: 'جاهز' },
      ],
      status: 'نظام آمن: التوثيق يتطلب كود اشتراك نشط',
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
      ar: 'ربط كامل مع شبكة Cloudflare R2 العالمية لتخزين ملفات التطبيقات الأصلية والموقعة، مما يضمن سرعة تنزيل فائقة للمشتركين بدون استهلاك نطاق ترددي باهظ، مع روابط تنزيل موقعة ومحمية بـ JWT Secret صارم.',
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
        { name: 'مستودع الحزم الموقعة الجاهزة (Signed Cache)', category: 'Instant Cache', version: 'للمشتركين', size: 'R2 Stream' },
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
    days: 30, // تُطابق `duration_days` في جدول plans — لا معرّفات مثبّتة
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
    days: 60, // تُطابق `duration_days` في جدول plans — لا معرّفات مثبّتة
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
    days: 150, // تُطابق `duration_days` في جدول plans — لا معرّفات مثبّتة
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
    days: 365, // تُطابق `duration_days` في جدول plans — لا معرّفات مثبّتة
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

  // Auth & UDID States
  const [capturedUdid, setCapturedUdid] = useState('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);
  const [activationResult, setActivationResult] = useState<{ isBound: boolean; tier?: string; message?: string }>({ isBound: false });
  const [certifiedAlert, setCertifiedAlert] = useState<{ active: boolean; name?: string; udid?: string }>({ active: false });

  // User state
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userDevice, setUserDevice] = useState<any>(null);
  const [userSubscription, setUserSubscription] = useState<any>(null);
  const [isCertifiedUser, setIsCertifiedUser] = useState(false);

  // PHASE-12: مرحلة المستخدم تأتي من الخادم (`/api/auth/me` → `journey`) — لا تُشتقّ هنا.
  // الاشتقاق المحلي (فحص بادئة `00008101-` وغيره) كان يسبّب انحرافاً بين الشاشة والواقع.
  const [journey, setJourney] = useState<any>(null);
  const [serverPlans, setServerPlans] = useState<any[]>([]);
  const [myOrders, setMyOrders] = useState<any[]>([]);
  const [orderPending, setOrderPending] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const { enrollment, start: startEnrollment, starting: enrollmentStarting } = useEnrollment(API_BASE_URL, authToken);

  // الجهاز موثّق إن أكّد الخادم ذلك، أو إن أنهت جلسة التوثيق الحالية الربط للتو.
  const hasRealDevice = Boolean(journey?.device_enrolled) || enrollment.status === 'bound';

  const isSubActive = Boolean(
    currentUser &&
    (currentUser.status === 'active' || userSubscription?.status === 'active')
  );

  // Registration form
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regUdid, setRegUdid] = useState('');
  const [regTerms, setRegTerms] = useState(true);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);

  // Login form
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Copy helper
  const [copiedUdid, setCopiedUdid] = useState(false);

  // Parse URL search params on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const urlUdid = params.get('udid') || '';
    const urlStatus = params.get('status') || '';
    const urlAction = params.get('action') || '';
    const urlName = params.get('name') || '';

    if (urlUdid) {
      setCapturedUdid(urlUdid);
      setRegUdid(urlUdid);
    }

    if (urlStatus === 'certified' && urlUdid && !urlUdid.startsWith('00008101-')) {
      setCertifiedAlert({ active: true, name: urlName, udid: urlUdid });
      setIsCertifiedUser(true);
    }

    if (urlAction === 'register') {
      setIsRegisterOpen(true);
    } else if (urlAction === 'login') {
      setIsLoginOpen(true);
    }

    // Check stored user session & verify with server
    const savedUser = localStorage.getItem('zmam_store_user');
    const savedToken = localStorage.getItem('zmam_store_token');
    const savedCertified = localStorage.getItem('zmam_store_certified');
    if (savedUser && savedToken) {
      try {
        setCurrentUser(JSON.parse(savedUser));
        setIsCertifiedUser(savedCertified === 'true');
      } catch (e) {}
    }

    if (savedToken) setAuthToken(savedToken);

    // باقات الخادم (لمطابقة plan_id) — لا نثبّت المعرّفات في الواجهة
    fetch(`${API_BASE_URL}/api/subscriptions/plans`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d) setServerPlans(Array.isArray(d) ? d : d.plans || []); })
      .catch(() => {});

    if (savedToken) {
      fetch(`${API_BASE_URL}/api/subscriptions/orders/mine`, {
        headers: { Authorization: `Bearer ${savedToken}` }
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => { if (d?.orders) setMyOrders(d.orders); })
        .catch(() => {});
    }

    if (savedToken) {
      fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${savedToken}` }
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.user) {
            setCurrentUser(data.user);
            setUserDevice(data.device);
            setUserSubscription(data.subscription);
            // مصدر الحقيقة الواحد — يُعرض كما هو ولا يُعاد حسابه هنا
            setJourney(data.journey || null);
            const hasRealDev = Boolean(data.has_real_device ?? data.journey?.device_enrolled);
            const isAct = Boolean(data.is_certified);
            setIsCertifiedUser(isAct);
            localStorage.setItem('zmam_store_user', JSON.stringify(data.user));
            localStorage.setItem('zmam_store_certified', String(isAct));
            if (isAct && hasRealDev) {
              setCertifiedAlert({
                active: true,
                name: data.user.full_name,
                udid: data.device?.udid
              });
            } else {
              setCertifiedAlert({ active: false, name: '', udid: '' });
            }
          }
        })
        .catch(() => {});
    }
  }, []);

  const copyToClipboard = (text: string) => {
    playClick();
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedUdid(true);
      setTimeout(() => setCopiedUdid(false), 2000);
    });
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setRegError(null);

    if (!regFullName.trim()) {
      setRegError(isRtl ? 'يرجى إدخال الاسم الكامل' : 'Full name is required');
      return;
    }
    if (!regPhone.trim()) {
      setRegError(isRtl ? 'يرجى إدخال رقم الهاتف' : 'Phone number is required');
      return;
    }
    if (!regEmail.trim()) {
      setRegError(isRtl ? 'يرجى إدخال البريد الإلكتروني' : 'Email is required');
      return;
    }
    if (regPassword.length < 8) {
      setRegError(isRtl ? 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' : 'Password must be at least 8 chars');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError(isRtl ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
      return;
    }
    if (!regTerms) {
      setRegError(isRtl ? 'يرجى الموافقة على شروط الخدمة وسياسة الخصوصية' : 'Please agree to terms');
      return;
    }

    setRegLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: regFullName,
          username: regUsername || undefined,
          phone: regPhone,
          email: regEmail,
          password: regPassword,
          udid: regUdid.trim() || undefined,
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      if (data.user && data.token) {
        localStorage.setItem('zmam_store_user', JSON.stringify(data.user));
        localStorage.setItem('zmam_store_token', data.token);
        setAuthToken(data.token); // يُمكّن الربط التلقائي لجلسة توثيق سابقة (claim)
        setCurrentUser(data.user);
      }
      if (regUdid.trim()) setCapturedUdid(regUdid.trim());

      setIsRegisterOpen(false);
      setIsSuccessModalOpen(true);
    } catch (err: any) {
      setRegError(err.message || 'حدث خطأ في التسجيل');
    } finally {
      setRegLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setLoginError(null);

    if (!loginIdentifier.trim() || !loginPassword) {
      setLoginError(isRtl ? 'يرجى إدخال البريد أو اسم المستخدم وكلمة المرور' : 'All fields required');
      return;
    }

    setLoginLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginIdentifier, password: loginPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('zmam_store_user', JSON.stringify(data.user));
      localStorage.setItem('zmam_store_token', data.token);
      setAuthToken(data.token); // يُمكّن الربط التلقائي لجلسة توثيق سابقة (claim)

      setCurrentUser(data.user);
      setUserDevice(data.device);
      setUserSubscription(data.subscription);
      setJourney(data.journey || null);

      // مصدر الحقيقة الواحد — الخادم يقرّر، والعميل يعرض
      const hasRealDev = Boolean(data.has_real_device ?? data.journey?.device_enrolled);
      const isAct = Boolean(data.is_certified);

      setIsCertifiedUser(isAct);
      localStorage.setItem('zmam_store_certified', String(isAct));

      if (isAct && hasRealDev) {
        setCertifiedAlert({
          active: true,
          name: data.user.full_name,
          udid: data.device?.udid
        });
      } else {
        setCertifiedAlert({ active: false, name: '', udid: '' });
      }

      if (hasRealDev && data.device?.udid) {
        setCapturedUdid(data.device.udid);
      }
      setIsLoginOpen(false);
    } catch (err: any) {
      setLoginError(err.message || 'حدث خطأ في تسجيل الدخول');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    playClick();
    localStorage.removeItem('zmam_store_user');
    localStorage.removeItem('zmam_store_token');
    setAuthToken(null);
    setJourney(null);
    setFlowNotice(null);
    localStorage.removeItem('zmam_store_certified');
    setCurrentUser(null);
    setUserDevice(null);
    setUserSubscription(null);
    setIsCertifiedUser(false);
    setCertifiedAlert({ active: false, name: '', udid: '' });
  };

  const generateTelegramUrl = (planName: string, planPrice: string) => {
    const name = currentUser?.full_name || regFullName || 'مشترك زمام ستور';
    const username = currentUser?.username || regUsername || '—';
    const email = currentUser?.email || regEmail || '—';
    const phone = currentUser?.phone || regPhone || '—';
    const udid = capturedUdid || regUdid || 'بانتظار التوثيق';

    const msg = `السلام عليكم
أرغب في الاشتراك في ${planName} لمتجر زمام ستور (${planPrice}).

بيانات المشترك:
- الاسم الكامل: ${name}
- اسم المستخدم: ${username}
- البريد الإلكتروني: ${email}
- رقم الهاتف: ${phone}
- معرّف الجهاز (UDID): ${udid}`;

    return `https://t.me/Jormunghandr?text=${encodeURIComponent(msg)}`;
  };

  // إشعار المسار: بديل `alert()` — يحمل دائماً سبباً وخطوة إنقاذ قابلة للنقر.
  const [flowNotice, setFlowNotice] = useState<{
    tone: 'info' | 'warn' | 'error' | 'success';
    text: string;
    action?: { label: string; run: () => void };
  } | null>(null);

  const [installingStore, setInstallingStore] = useState(false);
  const [installMsg, setInstallMsg] = useState<string | null>(null);

  const handleInstallStoreApp = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    playClick();

    // معرّف الجهاز يأتي من مصدر موثوق فقط: جلسة التوثيق المكتملة أو الجهاز الذي أكّده الخادم.
    const realUdid = enrollment.status === 'bound' && enrollment.udid
      ? enrollment.udid
      : (journey?.device_enrolled && userDevice?.udid ? userDevice.udid : '');

    if (!isCertifiedUser || !hasRealDevice || !realUdid) {
      // PHASE-12: صفر طرق مسدودة — السبب يأتي من الخادم، ومعه دائماً خطوة إنقاذ.
      const reason = journey?.blocked_reason
        || (isRtl
          ? 'يلزم توثيق معرّف جهازك (UDID) وربطه بشهادة توقيع قبل التثبيت.'
          : 'Your device UDID must be enrolled and bound to a signing certificate before installing.');
      const needsSubscription = Boolean(journey?.device_enrolled) && !journey?.subscription_active;
      setFlowNotice({
        tone: 'warn',
        text: reason,
        action: needsSubscription
          ? { label: isRtl ? 'تفعيل الاشتراك' : 'Activate subscription', run: () => { setActiveTab('plans'); } }
          : { label: isRtl ? 'توثيق جهازي الآن' : 'Enroll my device', run: () => triggerAutoUDIDEnrollment() }
      });
      return;
    }

    setInstallingStore(true);
    setInstallMsg(isRtl ? 'جاري فحص الشهادة وتجهيز رابط التثبيت المباشر...' : 'Preparing direct installation...');
    try {
      const token = localStorage.getItem('zmam_store_token') || '';
      const queryParams = new URLSearchParams();
      if (token) queryParams.set('token', token);
      if (realUdid) queryParams.set('udid', realUdid);
      queryParams.set('fresh', '1');
      queryParams.set('t', Date.now().toString());

      const url = `${API_BASE_URL}/api/ota/install-latest?${queryParams.toString()}`;

      // Try fetching manifest JSON first
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json' }
      });
      const data = await res.json();
      if (data.install_url) {
        setInstallMsg(isRtl ? 'تم تجهيز الرابط! جاري فتح نافذة التثبيت على جهازك...' : 'Opening install prompt...');
        window.location.href = data.install_url;
      } else {
        window.location.href = url;
      }
    } catch (err) {
      const token = localStorage.getItem('zmam_store_token') || '';
      window.location.href = `${API_BASE_URL}/api/ota/install-latest?token=${encodeURIComponent(token)}&udid=${encodeURIComponent(realUdid)}&fresh=1&t=${Date.now()}`;
    } finally {
      setTimeout(() => {
        setInstallingStore(false);
        setInstallMsg(null);
      }, 4000);
    }
  };

  // PHASE-09: كل نية شراء تُسجَّل كطلب برقم مرجعي **قبل** فتح تيليجرام.
  // سابقاً كان الزر يفتح محادثة برسالة مُعبّأة ولا يترك أي أثر في النظام،
  // فتبقى الفجوة بين "دفع" و"تفعيل" معتمدة على الذاكرة البشرية.
  const handlePlanCheckout = async (plan: { id: string; days: number; name: Record<string, string>; price: string; currency: Record<string, string> }) => {
    playClick();
    const planLabel = plan.name[lang];
    const planPrice = `${plan.price} ${plan.currency[lang]}`;

    if (!authToken) {
      setIsRegisterOpen(true);
      setFlowNotice({
        tone: 'info',
        text: isRtl
          ? 'أنشئ حسابك أولاً ليُربط طلبك ويُفعَّل اشتراكك تلقائياً فور تأكيد الدفع.'
          : 'Create your account first so your order is linked and activated automatically once payment is confirmed.'
      });
      return;
    }

    const matched = serverPlans.find((p: any) => Number(p.duration_days) === plan.days);
    setOrderPending(plan.id);
    try {
      let ref: string | null = null;
      if (matched?.id) {
        const res = await fetch(`${API_BASE_URL}/api/subscriptions/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
          body: JSON.stringify({ plan_id: matched.id, channel: 'telegram' })
        });
        const data = await res.json();
        if (res.ok) {
          ref = data.ref;
          setMyOrders((prev) => [data.order, ...prev.filter((o: any) => o?.id !== data.order?.id)]);
          setFlowNotice({
            tone: 'success',
            text: isRtl
              ? `تم تسجيل طلبك برقم ${ref}. أرسله مع إثبات الدفع، وسيُفعَّل اشتراكك فور التأكيد — بلا كود يدوي.`
              : `Order ${ref} recorded. Send it with your payment proof and your subscription activates on confirmation.`
          });
        }
      }

      // رسالة تيليجرام تحمل المرجع فيربط الأدمن الدفع بالحساب بلا تخمين
      const msg = [
        'السلام عليكم',
        `أرغب في الاشتراك في ${planLabel} لمتجر زمام ستور (${planPrice}).`,
        '',
        ref ? `رقم الطلب: ${ref}` : '',
        `الاسم: ${currentUser?.full_name || '—'}`,
        `البريد: ${currentUser?.email || '—'}`,
        enrollment.udid || capturedUdid ? `معرّف الجهاز: ${enrollment.udid || capturedUdid}` : ''
      ].filter(Boolean).join('\n');

      window.open(`https://t.me/Jormunghandr?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    } catch {
      setFlowNotice({
        tone: 'error',
        text: isRtl ? 'تعذّر تسجيل الطلب — أعد المحاولة.' : 'Could not record the order — please retry.',
        action: { label: isRtl ? 'إعادة المحاولة' : 'Retry', run: () => handlePlanCheckout(plan) }
      });
    } finally {
      setOrderPending(null);
    }
  };

  const currentModule = storeModules.find((m) => m.id === activeTab) || storeModules[0];

  // PHASE-08: التوثيق يبدأ بجلسة عمرها 24 ساعة — الضيف مسموح له أيضاً،
  // فالـ UDID يُحفظ في الجلسة ويُربط بحسابه تلقائياً فور تسجيله (بلا إعادة إدخال).
  const triggerAutoUDIDEnrollment = async () => {
    playClick();
    setFlowNotice(null);
    const url = await startEnrollment();
    if (url) {
      window.location.href = url;
      return;
    }
    setFlowNotice({
      tone: 'error',
      text: isRtl
        ? 'تعذّر بدء جلسة التوثيق. تحقق من اتصالك وأعد المحاولة.'
        : 'Could not start the enrollment session. Check your connection and retry.',
      action: { label: isRtl ? 'إعادة المحاولة' : 'Retry', run: () => triggerAutoUDIDEnrollment() }
    });
  };

  const handleRedeemVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    const code = voucherCode.trim();
    if (!code) {
      setVoucherStatus(isRtl ? 'يرجى إدخال كود التفعيل أولاً.' : 'Please enter a voucher code first.');
      return;
    }

    const token = localStorage.getItem('zmam_store_token');
    if (!token) {
      setIsLoginOpen(true);
      setVoucherStatus(
        isRtl
          ? 'يرجى تسجيل الدخول أو إنشاء حساب أولاً لربط كود التفعيل بحسابك.'
          : 'Please log in or create an account first to link the voucher to your profile.'
      );
      return;
    }

    setLoadingVoucher(true);
    setVoucherStatus(isRtl ? 'جاري التحقق من كود الاشتراك وتفعيله...' : 'Verifying and activating voucher...');

    try {
      const res = await fetch(`${API_BASE_URL}/api/subscriptions/redeem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || (isRtl ? 'كود التفعيل غير صالح' : 'Invalid voucher code'));

      // Fetch fresh /auth/me
      let isRealBound = false;
      try {
        const meRes = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (meRes.ok) {
          const meData = await meRes.json();
          setCurrentUser(meData.user);
          setUserDevice(meData.device);
          setUserSubscription(meData.subscription);
          setJourney(meData.journey || null);
          isRealBound = Boolean(meData.has_real_device ?? meData.journey?.device_enrolled);
          setIsCertifiedUser(isRealBound);
          if (isRealBound) {
            setCertifiedAlert({
              active: true,
              name: meData.user?.full_name,
              udid: meData.device?.udid
            });
            localStorage.setItem('zmam_store_certified', 'true');
          } else {
            setCertifiedAlert({ active: false, name: '', udid: '' });
            localStorage.setItem('zmam_store_certified', 'false');
          }
          localStorage.setItem('zmam_store_user', JSON.stringify(meData.user));
        }
      } catch (err) {
        setIsCertifiedUser(false);
        isRealBound = false;
      }

      setActivationResult({
        isBound: isRealBound,
        tier: data.tier || 'VIP',
        message: data.message
      });
      setIsActivationModalOpen(true);
      setVoucherCode('');
      setVoucherStatus(isRtl ? '🎉 تم تفعيل الاشتراك بنجاح!' : '🎉 Subscription activated successfully!');
    } catch (err: any) {
      setVoucherStatus(err.message || (isRtl ? 'فشل تفعيل الكود، يرجى التأكد من صحته' : 'Failed to redeem voucher'));
    } finally {
      setLoadingVoucher(false);
    }
  };

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto pb-24 pt-4">
        {/* PHASE-12: المسار الواحد — أين أنا، ما التالي، وماذا أفعل إن تعثّرت */}
        <JourneyRail
          isRtl={isRtl}
          signedIn={Boolean(currentUser)}
          deviceEnrolled={hasRealDevice}
          subscriptionActive={Boolean(journey?.subscription_active ?? isSubActive)}
          canInstall={Boolean(journey?.can_install ?? isCertifiedUser)}
          enrollmentStatus={enrollment.status}
          enrollmentUdid={enrollment.udid || capturedUdid || null}
          blockedReason={journey?.blocked_reason || null}
          onStageAction={(stage: StageKey) => {
            if (stage === 'account') setIsRegisterOpen(true);
            else if (stage === 'device') triggerAutoUDIDEnrollment();
            else if (stage === 'subscription') setActiveTab('plans');
            else handleInstallStoreApp();
          }}
        />

        {/* إشعار المسار: بديل alert() — سبب صريح + خطوة إنقاذ */}
        {flowNotice && (
          <div
            role="status"
            aria-live="polite"
            className={[
              'mb-6 flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between',
              flowNotice.tone === 'error'
                ? 'border-red-400/40 bg-red-400/10 text-red-200'
                : flowNotice.tone === 'warn'
                  ? 'border-amber-400/40 bg-amber-400/10 text-amber-200'
                  : flowNotice.tone === 'success'
                    ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200'
                    : 'border-sky-400/40 bg-sky-400/10 text-sky-200'
            ].join(' ')}
          >
            <p className="text-[13px] leading-relaxed">{flowNotice.text}</p>
            <div className="flex shrink-0 items-center gap-2">
              {flowNotice.action && (
                <button
                  type="button"
                  onClick={() => flowNotice.action?.run()}
                  disabled={enrollmentStarting}
                  className="min-h-[40px] rounded-xl bg-white/15 px-4 text-xs font-bold text-white transition-colors hover:bg-white/25 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  {enrollmentStarting ? (isRtl ? 'جارٍ التجهيز…' : 'Preparing…') : flowNotice.action.label}
                </button>
              )}
              <button
                type="button"
                onClick={() => setFlowNotice(null)}
                aria-label={isRtl ? 'إغلاق الإشعار' : 'Dismiss'}
                className="min-h-[40px] rounded-xl px-3 text-xs text-white/60 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* PHASE-09: حالة الطلب مرئية للمستخدم — لا انتظار في الظلام */}
        {myOrders.filter((o: any) => o && ['pending', 'paid'].includes(o.status)).length > 0 && (
          <div className="mb-6 rounded-3xl border border-sky-400/25 bg-sky-400/[0.07] p-5 backdrop-blur-xl">
            <h3 className="mb-3 text-sm font-bold text-sky-200">
              {isRtl ? 'طلباتك الجارية' : 'Your pending orders'}
            </h3>
            <ul className="space-y-2">
              {myOrders
                .filter((o: any) => o && ['pending', 'paid'].includes(o.status))
                .map((o: any) => (
                  <li
                    key={o.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/[0.04] px-4 py-3"
                  >
                    <span className="font-mono text-xs text-sky-100">{o.ref || `#${o.id}`}</span>
                    <span className="text-[11px] text-slate-300">{o.plan_name || ''}</span>
                    <span className="rounded-full bg-amber-400/15 px-3 py-1 text-[11px] font-bold text-amber-200">
                      {o.status_label || (o.status === 'paid'
                        ? (isRtl ? 'تم استلام الدفع — جارٍ التفعيل' : 'Paid — activating')
                        : (isRtl ? 'بانتظار تأكيد الدفع' : 'Awaiting payment confirmation'))}
                    </span>
                  </li>
                ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              {isRtl
                ? 'أرسل رقم الطلب مع إثبات الدفع عبر تيليجرام — يُفعَّل اشتراكك فور التأكيد تلقائياً وبلا كود يدوي.'
                : 'Send the order reference with your payment proof — activation is automatic on confirmation.'}
            </p>
          </div>
        )}

        {/* CERTIFIED USER PROMINENT BANNER (IF DETECTED WITH REAL DEVICE) */}
        {certifiedAlert.active && hasRealDevice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-900/30 via-teal-900/20 to-emerald-900/30 border-2 border-emerald-500/40 shadow-xl text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/30">
              <CheckCircle2 size={15} />
              <span>مشترك معتمد ومفعل مسبقاً في زمام ستور</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f] dark:text-white mb-2">
              🎉 أهلاً بك {certifiedAlert.name ? certifiedAlert.name : 'يا بطل'}! جهازك مربوط بشهادة توقيع نشطة
            </h2>
            <p className="text-xs sm:text-sm text-[#515154] dark:text-neutral-300 max-w-2xl mx-auto mb-6">
              تم التحقق من معرّف جهازك واشتراكك النشط. يمكنك الآن تحميل وتثبيت تطبيق زمام ستور مباشرة على جهازك بنقرة واحدة!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleInstallStoreApp}
                disabled={installingStore}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0f766e] text-white font-bold text-sm shadow-lg hover:bg-[#115e59] transition scale-105 disabled:opacity-60 cursor-pointer"
              >
                <Download size={16} />
                <span>{installingStore ? (installMsg || 'جاري تجهيز التثبيت...') : 'تحميل وتثبيت متجر زمام ستور فوراً (OTA)'}</span>
              </button>
              <a
                href="storeapp://"
                onClick={playClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-neutral-800 border border-black/10 text-xs font-bold text-[#1d1d1f] dark:text-white hover:bg-black/5"
              >
                <Smartphone size={15} className="text-[#0f766e]" />
                <span>فتح تطبيق المتجر</span>
              </a>
            </div>
          </motion.div>
        )}

        {/* PENDING UDID / CERTIFICATE ENROLLMENT BANNER (IF SUBSCRIBED BUT NO REAL BOUND DEVICE) */}
        {!certifiedAlert.active && isSubActive && !hasRealDevice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-600/15 to-amber-500/10 border-2 border-amber-500/40 shadow-xl text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3 border border-amber-500/30">
              <Sparkles size={15} />
              <span>اشتراكك نشط — يلزم توثيق معرّف الجهاز (UDID)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f] dark:text-white mb-2">
              👋 أهلاً بك {currentUser?.full_name || 'مشترك زمام'}! اشتراكك مفعل ومتبقي خطوة توثيق جهازك
            </h2>
            <p className="text-xs sm:text-sm text-[#515154] dark:text-neutral-300 max-w-2xl mx-auto mb-6">
              لتوقيع تطبيق المتجر خصيصاً لجهاز الآيفون الخاص بك، يلزم استخراج معرّف الـ UDID عبر تنزيل ملف التعريف من سفاري، أو إرسال الـ UDID لإدارة المتجر لربطه بالشهادة فوراً.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={triggerAutoUDIDEnrollment}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0f766e] text-white font-bold text-sm shadow-lg hover:bg-[#115e59] transition scale-105 cursor-pointer"
              >
                <Smartphone size={16} />
                <span>توثيق هذا الآيفون الآن عبر سفاري (UDID)</span>
              </button>
              <a
                href={generateTelegramUrl('تفعيل الشهادة للـ UDID', 'مشترك مفعل')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-neutral-800 border border-black/10 text-xs font-bold text-[#1d1d1f] dark:text-white hover:bg-black/5"
              >
                <Send size={15} className="text-[#0088cc]" />
                <span>إرسال الـ UDID للإدارة عبر تيليغرام</span>
              </a>
            </div>
          </motion.div>
        )}

        {/* HERO BANNER */}
        <section className="text-center mb-12">
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
            className="max-w-3xl mx-auto text-base sm:text-lg text-[#515154] leading-relaxed mb-10"
          >
            {isRtl
              ? 'المنظومة الرقمية الشاملة لتوقيع وتثبيت تطبيقات iOS وألعاب البلس الموقعة بدون جلبريك، مع توثيق آمن للأجهزة وتوزيع سحابي فائق السرعة عبر محرك zsign وCloudflare R2 للمشتركين.'
              : 'The comprehensive iOS signing ecosystem delivering jailbreak-free signed apps, automated UDID enrollment, and instant OTA installs powered by zsign and Cloudflare R2.'}
          </motion.p>

          {/* 🌟 3 VIP ONBOARDING & ACTION HUB CARDS 🌟 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 text-right mb-12"
          >
            {/* CARD 1: UDID PROFILE DOWNLOAD */}
            <div className="apple-studio-card p-6 bg-gradient-to-b from-teal-50/70 via-white to-white border-2 border-teal-600/30 flex flex-col justify-between shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0f766e] text-white flex items-center justify-center text-xl mb-4 shadow-md">
                  <QrCode size={24} />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-600/20 text-[10px] font-bold text-[#0f766e] mb-2">
                  <Sparkles size={11} />
                  <span>{hasRealDevice ? 'جهازك موثق' : 'الخطوة 01 الأساسية'}</span>
                </div>
                <h3 className="text-lg font-extrabold text-[#1d1d1f] mb-2">
                  {hasRealDevice ? 'معرّف الجهاز (UDID) موثّق' : 'تنزيل ملف توثيق الـ UDID'}
                </h3>
                <p className="text-xs text-[#515154] leading-relaxed mb-6">
                  {hasRealDevice
                    ? `جهازك موثق بنجاح بالمعرّف (${userDevice.udid.slice(0, 8)}...${userDevice.udid.slice(-6)})، يمكنك تثبيت التطبيقات فورياً.`
                    : 'حمّل ملف التعريف المباشر لجهازك لاستخراج الـ UDID والتوجيه التلقائي لإنشاء الحساب أو التثبيت المباشر.'}
                </p>
              </div>

              <div>
                {currentUser ? (
                  <button
                    onClick={triggerAutoUDIDEnrollment}
                    onMouseEnter={playHover}
                    className="w-full py-3.5 px-4 rounded-full bg-[#0f766e] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#115e59] transition shadow-md cursor-pointer"
                  >
                    <Download size={15} />
                    <span>{hasRealDevice ? 'تحديث ملف توثيق الجهاز' : 'بدء توثيق هذا الجهاز (Safari)'}</span>
                  </button>
                ) : (
                  <a
                    href={`${API_BASE_URL}/api/udid/guest-mobileconfig`}
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="w-full py-3.5 px-4 rounded-full bg-[#0f766e] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#115e59] transition shadow-md"
                  >
                    <Download size={15} />
                    <span>تنزيل ملف التوثيق (Safari)</span>
                  </a>
                )}
                <p className="text-[10px] text-center text-[#86868b] mt-2">
                  يفتح في الإعدادات لتثبيت البروفايل آلياً
                </p>
              </div>
            </div>

            {/* CARD 2: REGISTER ACCOUNT OR SUBSCRIBER STATUS */}
            <div className="apple-studio-card p-6 bg-white border border-black/10 flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#1d1d1f] text-white flex items-center justify-center text-xl mb-4 shadow-md">
                  {currentUser ? <ShieldCheck size={22} /> : <UserPlus size={22} />}
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 text-[10px] font-bold text-[#1d1d1f] mb-2">
                  <Key size={11} />
                  <span>{currentUser ? 'بيانات المشترك' : 'بدون كود تفعيل'}</span>
                </div>
                <h3 className="text-lg font-extrabold text-[#1d1d1f] mb-2">
                  {currentUser
                    ? `حساب: ${currentUser.full_name || currentUser.username || currentUser.email}`
                    : 'إنشاء حساب جديد'}
                </h3>
                <p className="text-xs text-[#515154] leading-relaxed mb-6">
                  {currentUser
                    ? (isSubActive
                        ? (hasRealDevice
                            ? 'اشتراكك وباقة جهازك نشطة بالكامل وتعمل بنجاح على هذا الآيفون.'
                            : 'اشتراكك مفعل ولكن يلزم ربط معرّف الجهاز (UDID) بالشهادة لبدء التوقيع.')
                        : 'حسابك مسجل في المنظومة، يمكنك اختيار الباقة وطلب التفعيل السريع.')
                    : 'سجل بياناتك مجاناً للحصول على معرّف حسابك، ثم اختر الباقة المناسبة واطلب التفعيل السريع عبر تيليغرام.'}
                </p>
              </div>

              <div>
                {currentUser ? (
                  isSubActive && !hasRealDevice ? (
                    <a
                      href={generateTelegramUrl('ربط شهادة المشترك', 'مفعل')}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      className="w-full py-3.5 px-4 rounded-full bg-[#0088cc] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#0077b5] transition shadow-sm"
                    >
                      <Send size={15} />
                      <span>إرسال الـ UDID للدعم الفني</span>
                    </a>
                  ) : (
                    <div className="text-center py-3 px-4 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                      {hasRealDevice ? '✅ الحساب والجهاز معتمدان' : '⚡ اشتراكك قيد المتابعة'}
                    </div>
                  )
                ) : (
                  <>
                    <button
                      onClick={() => {
                        playClick();
                        setIsRegisterOpen(true);
                      }}
                      onMouseEnter={playHover}
                      className="w-full py-3.5 px-4 rounded-full bg-[#1d1d1f] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-black transition shadow-sm cursor-pointer"
                    >
                      <UserPlus size={15} />
                      <span>إنشاء حساب مشترك جديد</span>
                    </button>
                    <p className="text-[10px] text-center text-[#86868b] mt-2">
                      يستغرق أقل من 30 ثانية
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* CARD 3: LOGIN & DIRECT STORE INSTALL */}
            <div className="apple-studio-card p-6 bg-gradient-to-b from-indigo-50/50 via-white to-white border border-indigo-200/60 flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#6366f1] text-white flex items-center justify-center text-xl mb-4 shadow-md">
                  <LogIn size={22} />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-[10px] font-bold text-[#6366f1] mb-2">
                  <ShieldCheck size={11} />
                  <span>المشتركون المعتمدون</span>
                </div>
                <h3 className="text-lg font-extrabold text-[#1d1d1f] mb-2">
                  {currentUser ? `أهلاً، ${currentUser.full_name || currentUser.email}` : 'تسجيل دخول المشتركين'}
                </h3>
                <p className="text-xs text-[#515154] leading-relaxed mb-6">
                  {currentUser
                    ? (isCertifiedUser && hasRealDevice
                      ? 'حسابك موثق ونشط! يمكنك تثبيت تطبيق المتجر فورياً على جهازك.'
                      : (isSubActive
                          ? 'اشتراكك نشط! يلزم توثيق جهاز الآيفون (UDID) للبدء بالتحميل المباشر.'
                          : 'حسابك مسجل ولكن بانتظار تفعيل باقة الاشتراك.'))
                    : 'سجل دخولك للتحقق من حالة اشتراكك وتثبيت المتجر مباشرة إذا كان جهازك مفعلاً.'}
                </p>
              </div>

              <div>
                {currentUser ? (
                  <div className="space-y-2">
                    {isCertifiedUser && hasRealDevice ? (
                      <button
                        onClick={handleInstallStoreApp}
                        disabled={installingStore}
                        className="w-full py-3.5 px-4 rounded-full bg-[#10b981] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#059669] transition shadow-md disabled:opacity-60 cursor-pointer"
                      >
                        <Download size={15} />
                        <span>{installingStore ? (installMsg || 'جاري تجهيز التثبيت...') : 'تحميل المتجر (StoreApp OTA)'}</span>
                      </button>
                    ) : isSubActive ? (
                      <button
                        onClick={triggerAutoUDIDEnrollment}
                        className="w-full py-3.5 px-4 rounded-full bg-[#0f766e] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#115e59] transition shadow-md cursor-pointer"
                      >
                        <Smartphone size={15} />
                        <span>توثيق هذا الجهاز (UDID)</span>
                      </button>
                    ) : (
                      <a
                        href="#pricing-section"
                        onClick={playClick}
                        className="w-full py-3 px-4 rounded-full bg-[#0f766e] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#115e59] transition"
                      >
                        <Ticket size={14} />
                        <span>طلب تفعيل باقة لاشتراكك</span>
                      </a>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 rounded-full border border-black/10 text-[11px] font-bold text-[#86868b] hover:bg-black/5 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <LogOut size={12} />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        playClick();
                        setIsLoginOpen(true);
                      }}
                      onMouseEnter={playHover}
                      className="w-full py-3.5 px-4 rounded-full bg-[#6366f1] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#4f46e5] transition shadow-md"
                    >
                      <LogIn size={15} />
                      <span>تسجيل الدخول والتثبيت</span>
                    </button>
                    <p className="text-[10px] text-center text-[#86868b] mt-2">
                      للمشتركين السابقين والمفعلين
                    </p>
                  </div>
                )}
              </div>
            </div>
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

        {/* HOW TO JOIN & ENROLL (3 STEPS) */}
        <section className="mb-24">
          <div className="apple-studio-card p-8 sm:p-12 bg-white border border-black/8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-black/8">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f766e] bg-teal-50 px-3 py-1 rounded-full border border-teal-600/20 mb-2">
                  <ShieldCheck size={14} />
                  {isRtl ? 'مسار الاشتراك والتوثيق الآمن' : 'Secure Subscription & Enrollment'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f]">
                  {isRtl ? 'كيف تشترك وتوثق جهازك بـ 3 خطوات بسيطة؟' : 'How to subscribe and activate in 3 steps'}
                </h2>
              </div>
              <a
                href="#pricing-section"
                onClick={playClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0f766e] text-white font-bold text-xs hover:bg-[#115e59] transition shadow-md shrink-0"
              >
                <Ticket size={15} />
                <span>{isRtl ? 'اختيار باقة الاشتراك' : 'Select Subscription Tier'}</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#f8fafc] border border-black/8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#0f766e] text-white flex items-center justify-center font-bold text-sm mb-4">
                    01
                  </div>
                  <h3 className="text-base font-extrabold text-[#1d1d1f] mb-2">
                    {isRtl ? 'الحصول على كود الاشتراك' : '1. Get Activation Code'}
                  </h3>
                  <p className="text-xs text-[#515154] leading-relaxed">
                    {isRtl
                      ? 'اختر الباقة المناسبة وتواصل مع الدعم الفني لاستلام كود التفعيل VIP الفوري المعتمد.'
                      : 'Choose your desired tier and receive your verified VIP voucher code from support.'}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#f8fafc] border border-black/8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#6366f1] text-white flex items-center justify-center font-bold text-sm mb-4">
                    02
                  </div>
                  <h3 className="text-base font-extrabold text-[#1d1d1f] mb-2">
                    {isRtl ? 'تفعيل الكود وتوثيق الـ UDID' : '2. Redeem & Link Device'}
                  </h3>
                  <p className="text-xs text-[#515154] leading-relaxed">
                    {isRtl
                      ? 'يتم تفعيل الكود وفتح مسار التوثيق المشفر لربط معرّف جهازك بالشهادة التوقيعية المخصصة لحسابك.'
                      : 'Redeem your code to generate the signed enrollment link that maps your hardware UDID securely.'}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#f8fafc] border border-black/8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#16a34a] text-white flex items-center justify-center font-bold text-sm mb-4">
                    03
                  </div>
                  <h3 className="text-base font-extrabold text-[#1d1d1f] mb-2">
                    {isRtl ? 'تثبيت المتجر والتطبيقات' : '3. Install Apps & Enjoy'}
                  </h3>
                  <p className="text-xs text-[#515154] leading-relaxed">
                    {isRtl
                      ? 'يصبح جهازك معتمداً لتثبيت تطبيق زمام ستور ومئات تطبيقات البلس والألعاب الموقعة بنقرة واحدة.'
                      : 'Your device is certified for instant 1-tap installs of signed plus apps and tweaked games.'}
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
                  ? 'إذا استلمت كود اشتراك من إدارة المتجر أو الدعم الفني، أدخله هنا للتحقق من صلاحيته وتفعيل باقتك.'
                  : 'Enter your voucher code received from support to verify and activate your VIP subscription.'}
              </p>

              {isSubActive && (
                <div className="mb-6 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-1">
                      <CheckCircle2 size={14} />
                      <span>اشتراكك نشط ({currentUser?.tier || userSubscription?.tier || 'VIP'})</span>
                    </div>
                    <p className="text-xs text-[#515154]">
                      {hasRealDevice
                        ? 'جهازك موثّق بالشهادة وجاهز لتثبيت المتجر فوراً.'
                        : 'اشتراكك مفعل ولكن يلزم توثيق جهازك بالـ UDID للبدء بتحميل المتجر.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {hasRealDevice && isCertifiedUser ? (
                      <button
                        onClick={handleInstallStoreApp}
                        disabled={installingStore}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0f766e] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#115e59] shadow-md transition whitespace-nowrap cursor-pointer"
                      >
                        <Download size={14} />
                        <span>{installingStore ? (installMsg || 'جاري التثبيت...') : 'تحميل المتجر (OTA)'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={triggerAutoUDIDEnrollment}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0066cc] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#0052a3] shadow-md transition whitespace-nowrap cursor-pointer"
                      >
                        <QrCode size={14} />
                        <span>توثيق الآيفون (UDID)</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

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
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0f766e] text-white font-bold text-xs hover:bg-[#115e59] transition shadow-md disabled:opacity-50 whitespace-nowrap cursor-pointer"
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
                {isRtl ? 'أبرز تطبيقات البلس والألعاب المتاحة للمشتركين' : 'Featured Signed Plus Apps & Games'}
              </h2>
            </div>
            <span className="mt-2 md:mt-0 text-xs font-bold text-[#86868b]">
              {isRtl ? 'متاحة حصرياً للمشتركين في الباقات' : 'Exclusive to Active VIP Subscribers'}
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
                    href="#pricing-section"
                    onClick={playClick}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0f766e] hover:underline"
                  >
                    <span>{isRtl ? 'متاح مع الاشتراك' : 'Included in VIP'}</span>
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
        <section id="pricing-section" className="mb-24">
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

                <button
                  type="button"
                  onClick={() => handlePlanCheckout(plan)}
                  onMouseEnter={playHover}
                  disabled={orderPending === plan.id}
                  className={`w-full min-h-[44px] py-3 rounded-full text-xs font-bold text-center transition flex items-center justify-center gap-2 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f766e] ${
                    plan.highlight
                      ? 'bg-[#0f766e] text-white hover:bg-[#115e59] shadow-md'
                      : 'bg-[#1d1d1f] text-white hover:bg-black'
                  }`}
                >
                  <Send size={13} />
                  <span>
                    {orderPending === plan.id
                      ? (isRtl ? 'جارٍ تسجيل طلبك…' : 'Recording your order…')
                      : (isRtl ? 'طلب التفعيل عبر تليغرام' : 'Activate via Telegram')}
                  </span>
                </button>
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
              {isRtl ? 'اشترك الآن في زمام ستور' : 'Subscribe to ZMAM Store Today'}
            </h2>
            <p className="max-w-xl mx-auto text-sm text-neutral-400 leading-relaxed mb-8">
              {isRtl
                ? 'احصل على كود التفعيل VIP الفوري وابدأ بالاستمتاع بمئات تطبيقات البلس والألعاب الموقعة مع ضمان كامل.'
                : 'Get your instant VIP voucher code and enjoy hundreds of signed apps with verified warranty.'}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://t.me/Jormunghandr"
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0f766e] text-white font-bold text-sm shadow-md hover:bg-[#115e59] transition"
              >
                <Send size={15} className="text-white" />
                <span>{isRtl ? 'طلب كود التفعيل عبر تليغرام' : 'Contact Telegram Support'}</span>
              </a>

              <a
                href="https://wa.me/9647767625001"
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-bold text-sm transition hover:bg-white/10"
              >
                <Smartphone size={15} className="text-emerald-400" />
                <span>{isRtl ? 'التواصل عبر الواتساب' : 'WhatsApp Support'}</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          MODAL 1: REGISTER NEW ACCOUNT (NO ACTIVATION CODE NEEDED)
          ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isRegisterOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-white dark:bg-[#161b22] rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10 dark:border-white/10 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => {
                  playClick();
                  setIsRegisterOpen(false);
                }}
                className="absolute top-5 left-5 w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#86868b] hover:text-black dark:hover:text-white"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#0f766e] text-white flex items-center justify-center shadow-md">
                  <UserPlus size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#1d1d1f] dark:text-white">
                    إنشاء حساب جديد في زمام ستور
                  </h3>
                  <p className="text-xs text-[#86868b]">
                    بدون كود تفعيل — فقط املأ بياناتك للانضمام فورياً
                  </p>
                </div>
              </div>

              {regError && (
                <div className="mb-4 p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                  <AlertTriangle size={15} />
                  <span>{regError}</span>
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] dark:text-neutral-200 mb-1">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      required
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="مثال: علي موفق"
                      className="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-neutral-50 dark:bg-neutral-800 text-sm font-bold text-[#1d1d1f] dark:text-white outline-none focus:border-[#0f766e]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] dark:text-neutral-200 mb-1">
                      اسم المستخدم (Username)
                    </label>
                    <input
                      type="text"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="مثال: alipro"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-neutral-50 dark:bg-neutral-800 text-sm font-bold text-[#1d1d1f] dark:text-white outline-none focus:border-[#0f766e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] dark:text-neutral-200 mb-1">
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="0770xxxxxxx"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-neutral-50 dark:bg-neutral-800 text-sm font-bold text-[#1d1d1f] dark:text-white outline-none focus:border-[#0f766e]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] dark:text-neutral-200 mb-1">
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@example.com"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-neutral-50 dark:bg-neutral-800 text-sm font-bold text-[#1d1d1f] dark:text-white outline-none focus:border-[#0f766e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] dark:text-neutral-200 mb-1">
                      كلمة المرور * (8 أحرف)
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-neutral-50 dark:bg-neutral-800 text-sm font-bold text-[#1d1d1f] dark:text-white outline-none focus:border-[#0f766e]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] dark:text-neutral-200 mb-1">
                      تأكيد كلمة المرور *
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-neutral-50 dark:bg-neutral-800 text-sm font-bold text-[#1d1d1f] dark:text-white outline-none focus:border-[#0f766e]"
                    />
                  </div>
                </div>

                {/* UDID Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-[#1d1d1f] dark:text-neutral-200">
                      معرّف الجهاز (UDID) — اختياري أو يتم التقاطه
                    </label>
                    {capturedUdid && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        ✓ تم التقاطه تلقائياً
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={regUdid}
                    onChange={(e) => setRegUdid(e.target.value)}
                    placeholder="00008101-000XXXXXXXXXXXXXXXX"
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-neutral-50 dark:bg-neutral-800 text-xs font-mono font-bold text-[#1d1d1f] dark:text-white outline-none focus:border-[#0f766e]"
                  />
                  <p className="text-[10px] text-[#86868b] mt-1">
                    إذا لم تكن تعرف الـ UDID، يمكنك تركه فارغاً وتنزيل ملف التوثيق من الصفحة الرئيسية لاحقاً.
                  </p>
                </div>

                {/* Terms Agreement */}
                <label className="flex items-start gap-2.5 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={regTerms}
                    onChange={(e) => setRegTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#0f766e] focus:ring-[#0f766e]"
                  />
                  <span className="text-xs text-[#515154] dark:text-neutral-300 leading-relaxed">
                    أوافق على{' '}
                    <Link href="/store/terms" className="text-[#0f766e] font-bold underline">شروط الخدمة</Link>
                    {' '}و{' '}
                    <Link href="/store/privacy" className="text-[#0f766e] font-bold underline">سياسة الخصوصية</Link>
                    {' '}لمنظومة زمام.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={regLoading}
                  className="w-full py-4 rounded-full bg-[#0f766e] text-white font-bold text-sm hover:bg-[#115e59] transition shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                >
                  <UserPlus size={16} />
                  <span>{regLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب واختيار الباقة'}</span>
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setIsRegisterOpen(false);
                      setIsLoginOpen(true);
                    }}
                    className="text-xs font-bold text-[#0f766e] hover:underline"
                  >
                    لديك حساب بالفعل؟ تسجيل الدخول
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          MODAL 2: SUBSCRIBER LOGIN
          ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-white dark:bg-[#161b22] rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10 dark:border-white/10 relative"
            >
              <button
                onClick={() => {
                  playClick();
                  setIsLoginOpen(false);
                }}
                className="absolute top-5 left-5 w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#86868b] hover:text-black dark:hover:text-white"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#6366f1] text-white flex items-center justify-center shadow-md">
                  <LogIn size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#1d1d1f] dark:text-white">
                    تسجيل الدخول للمشتركين
                  </h3>
                  <p className="text-xs text-[#86868b]">
                    التحقق من حالة اشتراكك وتثبيت المتجر
                  </p>
                </div>
              </div>

              {loginError && (
                <div className="mb-4 p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                  <AlertTriangle size={15} />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1d1d1f] dark:text-neutral-200 mb-1">
                    البريد الإلكتروني أو اسم المستخدم
                  </label>
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="name@example.com أو alipro"
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-neutral-50 dark:bg-neutral-800 text-sm font-bold text-[#1d1d1f] dark:text-white outline-none focus:border-[#6366f1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1d1d1f] dark:text-neutral-200 mb-1">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-neutral-50 dark:bg-neutral-800 text-sm font-bold text-[#1d1d1f] dark:text-white outline-none focus:border-[#6366f1]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-4 rounded-full bg-[#6366f1] text-white font-bold text-sm hover:bg-[#4f46e5] transition shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                >
                  <LogIn size={16} />
                  <span>{loginLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}</span>
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setIsLoginOpen(false);
                      setIsRegisterOpen(true);
                    }}
                    className="text-xs font-bold text-[#0f766e] hover:underline"
                  >
                    ليس لديك حساب؟ إنشاء حساب جديد بدون كود
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          MODAL 3: POST-REGISTRATION SUCCESS & TELEGRAM PLAN SELECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-xl bg-white dark:bg-[#161b22] rounded-3xl p-6 sm:p-8 shadow-2xl border border-teal-600/30 relative max-h-[92vh] overflow-y-auto"
            >
              <button
                onClick={() => {
                  playClick();
                  setIsSuccessModalOpen(false);
                }}
                className="absolute top-5 left-5 w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#86868b] hover:text-black dark:hover:text-white"
              >
                <X size={16} />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg">
                  🎉
                </div>
                <h3 className="text-2xl font-extrabold text-[#1d1d1f] dark:text-white mb-1">
                  تم إنشاء حسابك بنجاح!
                </h3>
                <p className="text-xs text-[#515154] dark:text-neutral-300 max-w-md mx-auto">
                  حسابك مسجل الآن. اختر باقة الاشتراك للتواصل فوراً مع الدعم الفني عبر تليغرام وتفعيل الشهادة التوقيعية لجهازك.
                </p>
              </div>

              {/* UDID Copyable Box */}
              {(capturedUdid || regUdid) && (
                <div className="mb-6 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-right">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#1d1d1f] dark:text-white flex items-center gap-1.5">
                      <QrCode size={14} className="text-[#0f766e]" />
                      <span>معرّف جهازك الخاص (UDID):</span>
                    </span>
                    <button
                      onClick={() => copyToClipboard(capturedUdid || regUdid)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition ${
                        copiedUdid ? 'bg-emerald-600 text-white' : 'bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white hover:bg-black/10'
                      }`}
                    >
                      {copiedUdid ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedUdid ? 'تم النسخ!' : 'نسخ الـ UDID'}</span>
                    </button>
                  </div>
                  <div className="text-xs font-mono font-bold text-[#0066cc] dark:text-[#38bdf8] break-all direction-ltr text-left select-all bg-white dark:bg-black/40 p-2.5 rounded-xl border border-black/5 dark:border-white/5">
                    {capturedUdid || regUdid}
                  </div>
                </div>
              )}

              {/* Plans Selection Grid */}
              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold text-[#86868b] uppercase tracking-wider">
                  اضغط على باقتك المطلوبة لفتح تليغرام بالطلب المجهز:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pricingPlans.map((plan) => (
                    <a
                      key={plan.id}
                      href={generateTelegramUrl(plan.name[lang], `${plan.price} ${plan.currency[lang]}`)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={playClick}
                      className={`p-4 rounded-2xl border flex flex-col justify-between transition hover:scale-[1.02] shadow-sm ${
                        plan.highlight
                          ? 'border-[#0f766e] bg-teal-50/40 dark:bg-teal-950/20'
                          : 'border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-extrabold text-[#1d1d1f] dark:text-white">
                            {plan.name[lang]}
                          </span>
                          <span className="text-xs font-bold text-[#0f766e]">
                            {plan.price} {plan.currency[lang]}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#86868b] mb-3">
                          {plan.period[lang]}
                        </div>
                      </div>

                      <div className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#0f766e] text-white text-[11px] font-bold">
                        <Send size={11} />
                        <span>طلب عبر تليغرام</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-center text-[11px] text-[#515154] dark:text-neutral-400">
                💡 فور إتمام الدفع مع الدعم الفني، سيتم تخصيص الشهادة التوقيعية لجهازك وإرسال كود التفعيل لتثبيت المتجر فورياً!
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          MODAL 4: POST-VOUCHER ACTIVATION CELEBRATION & DIRECT DOWNLOAD
          ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isActivationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-white dark:bg-[#161b22] rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-500/40 relative max-h-[92vh] overflow-y-auto text-center"
            >
              <button
                onClick={() => {
                  playClick();
                  setIsActivationModalOpen(false);
                }}
                className="absolute top-5 left-5 w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#86868b] hover:text-black dark:hover:text-white"
              >
                <X size={16} />
              </button>

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg">
                🎉
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-2">
                <CheckCircle2 size={13} />
                <span>تم تفعيل الاشتراك ({activationResult.tier || 'VIP'})</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#1d1d1f] dark:text-white mb-2">
                مبارك! اشتراكك نشط وجاهز
              </h3>
              <p className="text-xs sm:text-sm text-[#515154] dark:text-neutral-300 max-w-md mx-auto mb-6">
                {activationResult.isBound
                  ? 'تم ربط جهازك بالشهادة التوقيعية بنجاح. يمكنك الآن تنزيل وتثبيت تطبيق متجر زمام ستور فوراً!'
                  : 'تم تفعيل حسابك بنجاح! تفصلك خطوة أخيرة: تنزيل ملف التوثيق لربط معرّف الآيفون (UDID) بالشهادة التوقيعية لبدء التثبيت.'}
              </p>

              {activationResult.isBound ? (
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setIsActivationModalOpen(false);
                      handleInstallStoreApp();
                    }}
                    disabled={installingStore}
                    className="w-full py-4 px-6 rounded-full bg-[#0f766e] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#115e59] transition shadow-lg animate-pulse cursor-pointer"
                  >
                    <Download size={18} />
                    <span>{installingStore ? (installMsg || 'جاري تجهيز التثبيت...') : 'تحميل وتثبيت متجر زمام ستور فوراً (OTA)'}</span>
                  </button>
                  <a
                    href="storeapp://"
                    onClick={playClick}
                    className="w-full py-3 px-6 rounded-full bg-black/5 dark:bg-white/10 text-xs font-bold text-[#1d1d1f] dark:text-white flex items-center justify-center gap-2 hover:bg-black/10 transition"
                  >
                    <Smartphone size={15} className="text-[#0f766e]" />
                    <span>فتح التطبيق إذا كان مثبتاً</span>
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setIsActivationModalOpen(false);
                      triggerAutoUDIDEnrollment();
                    }}
                    className="w-full py-4 px-6 rounded-full bg-[#0066cc] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#0052a3] transition shadow-lg animate-pulse cursor-pointer"
                  >
                    <QrCode size={18} />
                    <span>توثيق جهاز الآيفون (تنزيل ملف التعريف) الآن</span>
                  </button>
                  <p className="text-[11px] text-[#86868b]">
                    سيتم تنزيل البروفايل عبر Safari، ثم الذهاب للإعدادات لتثبيته وسيبدأ التحميل تلقائياً.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
