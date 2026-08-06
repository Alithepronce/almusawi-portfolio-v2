'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import PageShell from '@/components/ui/PageShell';
import { useLang } from '@/lib/i18n';
import {
  Crown,
  ShoppingBag,
  QrCode,
  Users,
  Printer,
  Zap,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Shield,
  ArrowRight,
  ArrowLeft,
  FileText,
  Lock,
  Layers,
  Cpu,
  Smartphone,
  Server,
  Key,
  ShieldAlert,
  ArrowUpRight,
  Radio,
  BadgePercent,
  TrendingUp,
} from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

// Complete Glamora System Modules under ZMAM Architecture
const glamoraModules = [
  {
    id: 'pos',
    title: { ar: 'نقطة البيع الكاشير السريعة (POS Register)', en: 'Fast Cashier Register UI' },
    subtitle: { ar: 'واجهة البيع الفورية وإدارة السلة بكاميرا الباركود', en: 'High-speed checkout with camera barcode scanning' },
    desc: {
      ar: 'واجهة كاشير سائلة ومصممة بأسلوب أبل لمنع أي إرباك أو تأخير في كاشير محلات الكوزمتكس. تتضمن سلة بيع تفاعلية، تصنيف فورياً للماركات والمنتجات، تعليق الفواتير، ومسح الباركود عبر كاميرا الآيفون أو الماك أو القارئ الخارجي.',
      en: 'Fluid Apple-style cashier interface built for luxury beauty stores. Features interactive cart, brand filtering, bill holding, and camera barcode scanning.'
    },
    icon: ShoppingBag,
    color: '#e11d48',
    zmamFeature: { ar: 'مربوطة ببروتوكول ZMAM للإنتاجية المحلية السريعة (0ms latency)', en: 'Powered by ZMAM Local Zero-Latency Engine' },
    specs: [
      { label: { ar: 'سرعة إتمام الوصل', en: 'Checkout Speed' }, val: '< 2 ثانية' },
      { label: { ar: 'دعم الباركود', en: 'Barcode Engine' }, val: 'Camera + Hardware' },
      { label: { ar: 'تعليق السلة', en: 'Hold Queue' }, val: 'مفتوح (Multi-Customer)' },
    ],
    previewUI: {
      badge: 'واجهة الكاشير المباشرة',
      title: 'محطة البيع الكاشير رقم #01',
      items: [
        { name: 'سيروم عالي التركيز Hya-Rose 50ml', price: '45,000 د.ع', qty: 2 },
        { name: 'أحمر شفاه كوزمتكس ملوكي Velvet Red', price: '28,000 د.ع', qty: 1 },
        { name: 'ماسك تفتيح الوجه اللؤلؤي Luxe Glow', price: '35,000 د.ع', qty: 1 },
      ],
      total: '153,000 د.ع',
      discount: '5,000 د.ع (خصم خاص)',
      netTotal: '148,000 د.ع',
    }
  },
  {
    id: 'cloud',
    title: { ar: 'التزامن السحابي الحي (Supabase Realtime)', en: 'Supabase Realtime Sync' },
    subtitle: { ar: 'ربط كاشيرات المحل واقتران الأجهزة بـ QR Code', en: 'Real-time multi-device cloud synchronization' },
    desc: {
      ar: 'ربط ومزامنة كافة كاشيرات وأجهزة عمال المحل في الوقت الفعلي. أي عملية بيع أو تعديل في المخزون تتزامن فورياً خلال أقل من ثانية عبر خوادم Supabase المباشرة، مع اقتران الأجهزة الجديدة عبر رمز QR مشفر آمن.',
      en: 'Real-time synchronization across all staff devices and cashier desks. Instant sub-second stock updates via Supabase, with encrypted QR code device pairing.'
    },
    icon: QrCode,
    color: '#0284c7',
    zmamFeature: { ar: 'أمان وتشفير ZMAM Secure Cloud Bridge', en: 'ZMAM Encrypted Cloud Pipeline' },
    specs: [
      { label: { ar: 'زمن التزامن', en: 'Sync Latency' }, val: '< 300ms' },
      { label: { ar: 'اقتران الأجهزة', en: 'Device Pairing' }, val: 'QR Encrypted' },
      { label: { ar: 'العمل الأوفلاين', en: 'Offline Support' }, val: 'تلقائي (Local First)' },
    ],
    previewUI: {
      badge: 'شبكة الاقتران السحابي',
      title: 'الأجهزة المقترنة حالياً بالمتجر',
      items: [
        { name: 'MacBook Pro — الكاشير الرئيسي (المنصة الأوم)', status: 'نشط ومتزامن (0ms)' },
        { name: 'iPhone 15 Pro — كاشير الطابق الثاني', status: 'نشط ومتزامن (45ms)' },
        { name: 'iPad Air — جهاز مدير المخزون والجرد', status: 'نشط ومتزامن (12ms)' },
      ],
      total: '3 أجهزة نشطة',
      discount: 'حالة التشفير: ZMAM TLS 1.3 Strict',
      netTotal: 'متزامن 100%',
    }
  },
  {
    id: 'admin',
    title: { ar: 'لوحة الإدارة التنفيذية ببصمة الوجه (Face ID)', en: 'Executive Face ID Guard' },
    subtitle: { ar: 'حماية التقارير المالية والسيولة وأرباح الصافي', en: 'Biometric financial dashboard & profit reports' },
    desc: {
      ar: 'لوحة تنفيذية فاخرة مخصصة لصاحب المتجر. محمية ببصمة الوجه Apple Face ID لمنع أي موظف من الاطلاع على الأرقام الحساسة. تتضمن حساب صافي الأرباح، تقييم رأس المال المستثمر في البضاعة، وتشييك تقرير نهاية الشفت Z-Report.',
      en: 'Executive manager dashboard protected by Apple Face ID authentication. Prevents unauthorized staff access while tracking net profits, inventory capital valuation, and Z-Reports.'
    },
    icon: Crown,
    color: '#d97706',
    zmamFeature: { ar: 'حماية ZMAM Biometric Vault المتقدمة', en: 'ZMAM Biometric Vault Protection' },
    specs: [
      { label: { ar: 'طريقة القفل', en: 'Security Lock' }, val: 'Apple Face ID / PIN' },
      { label: { ar: 'تقرير الشفت', en: 'Shift Audit' }, val: 'Automated Z-Report' },
      { label: { ar: 'كشف الأرباح', en: 'Profit Engine' }, val: 'صافي حقيقي (Net)' },
    ],
    previewUI: {
      badge: 'الخزينة المحمية ببصمة الوجه',
      title: 'كشف الأرباح والسيولة اليومية',
      items: [
        { name: 'إجمالي المبيعات اليومية (Gross Revenue)', price: '2,450,000 د.ع', qty: '48 وصل' },
        { name: 'تكلفة البضاعة المباعة (Landed Cost)', price: '- 1,320,000 د.ع', qty: 'المخزون' },
        { name: 'صافي الربح الحقيقي للمتجر (Net Profit)', price: '+ 1,130,000 د.ع', qty: 'هامش 46%' },
      ],
      total: 'Z-Report: مطابق للصندوق',
      discount: 'تم التحقق ببصمة الوجه (Face ID Verified)',
      netTotal: 'الحالة: آمن ومغلق',
    }
  },
  {
    id: 'hr',
    title: { ar: 'إدارة الكادر والرواتب (HR Payroll Engine)', en: 'Staff HR & Payroll System' },
    desc: {
      ar: 'نظام إدارة موارد بشرية متكامل لحساب صافي الرواتب الشهرية تلقائياً. يتتبع ساعات التأخير، اقتطاعات الحضور، الحوافز التشجيعية، ونسب مبيعات الموظفين، مع إمكانية تجميد صلاحية أي موظف فورياً بلمسة زر.',
      en: 'Comprehensive HR & payroll system computing net salaries automatically. Tracks delay penalties, attendance deductions, sales commissions, and one-click remote credential freezing.'
    },
    icon: Users,
    color: '#9333ea',
    zmamFeature: { ar: 'إدارة الصلاحيات ZMAM Granular RBAC Engine', en: 'ZMAM Granular RBAC Engine' },
    specs: [
      { label: { ar: 'حساب الرواتب', en: 'Payroll Calc' }, val: 'تلقائي (Net Salary)' },
      { label: { ar: 'نسب المبيعات', en: 'Commissions' }, val: 'تتبع فردي للموظف' },
      { label: { ar: 'تجميد الحساب', en: 'Account Freeze' }, val: 'فوري بلمسة زر' },
    ],
    previewUI: {
      badge: 'وحدة HR والرواتب',
      title: 'سجل رواتب الكادر للشهر الحالي',
      items: [
        { name: 'سارة علي — مسؤولة الكاشير الرئيسي', price: '850,000 د.ع', qty: '+ 75,000 د.ع حوافز' },
        { name: 'مريم حسين — خبيرة التجميل والاستشارات', price: '720,000 د.ع', qty: '+ 50,000 د.ع مبيعات' },
        { name: 'نور الهدى — مساعدة المبيعات والجرد', price: '650,000 د.ع', qty: '- 10,000 د.ع تأخير' },
      ],
      total: 'إجمالي الرواتب: 2,335,000 د.ع',
      discount: 'تم تسديد الحوافز والنسب',
      netTotal: 'السيستم مكتمل',
    }
  },
  {
    id: 'receipts',
    title: { ar: 'تصدير وطباعة الوصولات (Instant Receipts)', en: 'Thermal & Digital Invoicing' },
    subtitle: { ar: 'طباعة حرارية وتوليد وصولات PDF/PNG وإرسالها للواتساب', en: 'Thermal Bluetooth print & instant WhatsApp receipt sharing' },
    desc: {
      ar: 'توليد وصولات فواتير فاخرة تحمل اسم وهاتف ولوغو متجرك برقم وصل تسلسلي رسمي (#1001). تدعم الطباعة الحرارية المباشرة عبر البلوتوث والـ Wi-Fi، بالإضافة إلى إرسال الوصل بنقرة واحدة إلى واتساب الزبون.',
      en: 'Generate serial-numbered invoice receipts with store logo, telephone, and invoice ID (#1001). Direct thermal Bluetooth/Wi-Fi printing and one-click WhatsApp receipt dispatch.'
    },
    icon: Printer,
    color: '#059669',
    zmamFeature: { ar: 'مكائن طباعة ZMAM Document Logistics Engine', en: 'ZMAM Document Logistics Engine' },
    specs: [
      { label: { ar: 'أنواع الطباعة', en: 'Printer Specs' }, val: 'Bluetooth + Thermal + Wi-Fi' },
      { label: { ar: 'المشاركة الرقمية', en: 'Digital Export' }, val: 'WhatsApp + PDF + PNG' },
      { label: { ar: 'الترقيم التسلسلي', en: 'Serial Number' }, val: 'تلقائي مؤمّن (#1000+)' },
    ],
    previewUI: {
      badge: 'وحدة الفواتير والوصولات',
      title: 'وصل مبيعات رسمي رقم #1084',
      items: [
        { name: 'متجر جلامورا الفاخر للكوزمتكس والتجميل', price: 'بغداد · الحارثية', qty: 'هاتف: 07767625001' },
        { name: 'تاريخ الوصل: 2026-08-06', price: '14:30', qty: 'الكاشير: سارة' },
        { name: 'طريقة الدفع: كاش نقد', price: 'المبلغ الإجمالي', qty: '148,000 د.ع' },
      ],
      total: 'حالة الطباعة: طُبع بنجاح',
      discount: 'تم إرسال نسخة للواتساب',
      netTotal: 'الوصل معتمد',
    }
  },
  {
    id: 'killswitch',
    title: { ar: 'مفتاح طوارئ نقاط البيع (POS Remote Kill Switch)', en: 'Emergency Security Lockdown' },
    subtitle: { ar: 'تجميد كلي لأجهزة الكاشير عن بعد لمنع السلب أو التلاعب', en: 'Remote freeze & database lock switch' },
    desc: {
      ar: 'أداة حماية استثنائية تمكّن صاحب المتجر من قفل وتجميد كافة نقاط البيع وأجهزة العمال عن بُعد فورياً في حال حدوث أي طارئ أو اشتباه بالتلاعب، ومنع إجراء أي عملية بيع أو استخراج للبيانات حتى فك التجميد بـ Face ID.',
      en: 'Emergency security switch empowering store owners to instantly lock and freeze all active POS terminals remotely during security incidents. Blocks all data access until unlocked by owner Face ID.'
    },
    icon: Zap,
    color: '#dc2626',
    zmamFeature: { ar: 'بروتوكول الأمان ZMAM Security Lockdown Override', en: 'ZMAM Security Lockdown Override' },
    specs: [
      { label: { ar: 'زمن التجميد', en: 'Freeze Speed' }, val: 'فوري (Realtime)' },
      { label: { ar: 'فك التجميد', en: 'Unlock Guard' }, val: 'Owner Face ID Only' },
      { label: { ar: 'التنبيهات', en: 'Notifications' }, val: 'SMS + Push Alert' },
    ],
    previewUI: {
      badge: 'نظام حماية الطوارئ',
      title: 'وضع تجميد الأجهزة (Kill Switch Active)',
      items: [
        { name: 'الكاشير الرئيسي (MacBook)', status: 'مجمد فورياً 🛑' },
        { name: 'كاشير الطابق الثاني (iPhone)', status: 'مجمد فورياً 🛑' },
        { name: 'جهاز الجرد (iPad)', status: 'مجمد فورياً 🛑' },
      ],
      total: 'حالة الأجهزة: قفل تام عن بُعد',
      discount: 'يتطلب بصمة مدير المتجر لفك القفل',
      netTotal: 'النظام مؤمّن 100%',
    }
  },
];

// ZMAM Integration Pillars
const zmamCoreIntegrations = [
  {
    icon: Layers,
    title: { ar: 'النواة الهندسية الموحدة لزمام (ZMAM Core)', en: 'Unified ZMAM Architecture' },
    desc: {
      ar: 'يعتمد جلامورا على البنية التحتية المركزية لمنظومة زمام لضمان استقرار التشغيل وتوفير أعلى مستويات الموثوقية.',
      en: 'Glamora runs on ZMAM central infrastructure ensuring continuous operation and institutional reliability.'
    }
  },
  {
    icon: Shield,
    title: { ar: 'الخصوصية والأمان المحلي (Local-First Privacy)', en: 'Local-First Data Integrity' },
    desc: {
      ar: 'جميع بيانات المبيعات والأرباح تُشفر وتحفظ محلياً على جهاز المتجر مع تزامن سحابي محمي بشرط موافقة المدير.',
      en: 'Sales data and net profit metrics remain encrypted locally with cloud sync controlled strictly by owner keys.'
    }
  },
  {
    icon: Cpu,
    title: { ar: 'الذكاء الاصطناعي للتنبؤ بالمخزون (ZMAM AI Stock Engine)', en: 'Predictive AI Stock Engine' },
    desc: {
      ar: 'خوارزمية ذكية داخل زمام تتنبأ بنفاذ منتجات الكوزمتكس الأكثر طلباً وتنبه المدير لطلب الشحنات قبل النفاذ.',
      en: 'Predictive analytics forecasting stock exhaustion for top cosmetics and alerting owners before depletion.'
    }
  },
  {
    icon: Server,
    title: { ar: 'الموثوقية والاستمرارية الأبدية (Zero-Downtime Guarantee)', en: 'Institutional Continuity' },
    desc: {
      ar: 'عمل كامل دون الحاجة لاتصال إنترنت دائم، مع إعادة المزامنة التلقائية عند عودة الشبكة دون فقدان أي فاتورة.',
      en: 'Complete offline capability with automatic cloud reconciliation ensuring zero invoice data loss.'
    }
  }
];

export default function GlamoraPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const activeModule = glamoraModules[selectedModuleIndex];

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto pb-24 pt-4">
        {/* HERO BANNER - APPLE STUDIO STYLING WITH ZMAM INTEGRATION */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-bold text-[#1d1d1f] mb-6 shadow-sm"
          >
            <Crown size={14} className="text-[#e11d48]" />
            <span>{isRtl ? 'إحدى ركائز منظومة مشروع زمام الرقمية | ZMAM Ecosystem' : 'Official ZMAM Ecosystem Core Product'}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold sm:text-6xl tracking-tight text-[#1d1d1f] mb-6"
          >
            {isRtl ? 'نظام' : 'App'}{' '}
            <span className="text-[#e11d48]">
              {isRtl ? 'جلامورا (Glamora POS)' : 'Glamora POS & HR'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-[#515154] leading-relaxed mb-8"
          >
            {isRtl
              ? 'حل برمجي فاخر ومتكامل من مشروع زمام، مصمم خصيصاً لإدارة محلات الكوزمتكس والتجميل الفاخرة. يجمع بين نقطة البيع السريعة، التزامن السحابي الحي عبر Supabase، إدارة الرواتب والكادر (HR)، وقفل الإدارة التنفيذية ببصمة الوجه (Face ID).'
              : 'Institutional luxury retail POS & HR ecosystem engineered under Project ZMAM. Combines high-speed cashier register, Supabase Realtime cloud sync, HR payroll engine, and Face ID executive security.'}
          </motion.p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              onClick={playClick}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1d1d1f] text-white font-bold text-sm shadow-md hover:bg-black transition"
            >
              <span>{isRtl ? 'طلب نسخة مخصصة لمتجرك' : 'Request Custom Setup'}</span>
              {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </Link>
            <Link
              href="/glamora/support"
              onClick={playClick}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-black/15 bg-white text-[#1d1d1f] font-bold text-sm transition hover:bg-black/5"
            >
              <PhoneCall size={16} />
              <span>{isRtl ? 'الدعم الفني والخدمات' : 'Technical Support'}</span>
            </Link>
          </div>
        </section>

        {/* ZMAM INTEGRATION HIGHLIGHT BOX */}
        <section className="mb-20">
          <div className="apple-studio-card p-8 sm:p-12 bg-white relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center sm:text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366f1]/10 text-[#6366f1] text-xs font-bold">
                  <Layers size={14} />
                  <span>{isRtl ? 'التكامل التام مع مشروع زمام' : 'Project ZMAM Core Integration'}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f]">
                  {isRtl ? 'كيف يعزز مشروع زمام أداء تطبيق جلامورا؟' : 'How ZMAM Architecture Powers Glamora'}
                </h2>
                <p className="text-sm text-[#515154] max-w-2xl leading-relaxed">
                  {isRtl
                    ? 'جلامورا ليس مجرد برنامج كاشير عادي؛ بل هو نظام تشغيلي متصل بنواة زمام للذكاء الاصطناعي والأمان الفائق، مما يضمن معالجة الفواتير وحماية السيولة المالية بموثوقية مؤسسية.'
                    : 'Glamora is directly wired into ZMAM Core AI and security protocols, ensuring maximum transactional speed, zero data loss, and absolute privacy.'}
                </p>
              </div>

              <div className="flex flex-col gap-3 shrink-0">
                <div className="px-5 py-2.5 rounded-2xl bg-black/5 border border-black/8 text-center text-xs font-bold text-[#1d1d1f]">
                  ⚡ {isRtl ? 'استجابة الكاشير: 0ms محلياً' : 'Cashier Latency: 0ms Local'}
                </div>
                <div className="px-5 py-2.5 rounded-2xl bg-black/5 border border-black/8 text-center text-xs font-bold text-[#1d1d1f]">
                  🔒 {isRtl ? 'الحماية: Apple Face ID Vault' : 'Security: Apple Face ID Vault'}
                </div>
                <div className="px-5 py-2.5 rounded-2xl bg-black/5 border border-black/8 text-center text-xs font-bold text-[#1d1d1f]">
                  🌐 {isRtl ? 'التزامن: Supabase Realtime' : 'Sync: Supabase Realtime'}
                </div>
              </div>
            </div>

            {/* ZMAM INTEGRATION PILLARS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 pt-10 border-t border-black/10">
              {zmamCoreIntegrations.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 text-[#1d1d1f] border border-black/8">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-[#1d1d1f]">{pillar.title[lang]}</h3>
                    <p className="text-xs text-[#515154] leading-relaxed">{pillar.desc[lang]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* INTERACTIVE OPERATIONAL MODULES SIMULATOR & MODULE SELECTOR */}
        <section className="mb-20">
          <div className="mb-10 pb-6 border-b border-black/10 text-center sm:text-right">
            <h2 className="text-3xl font-extrabold text-[#1d1d1f] tracking-tight mb-2">
              {isRtl ? 'أنظمة وموديلات جلامورا التشغيلية' : 'Glamora Core System Modules'}
            </h2>
            <p className="text-sm text-[#86868b]">
              {isRtl ? 'اختر أي وحدة للتعرف على الواجهة التفاعلية والمواصفات الهندسية' : 'Click a module to interact with live interface simulator'}
            </p>
          </div>

          {/* MODULE SELECTOR TABS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {glamoraModules.map((module, idx) => {
              const Icon = module.icon;
              const isSelected = idx === selectedModuleIndex;
              return (
                <div
                  key={module.id}
                  onClick={() => {
                    playClick();
                    setSelectedModuleIndex(idx);
                  }}
                  onMouseEnter={playHover}
                  className={`apple-studio-card p-6 cursor-pointer transition border ${
                    isSelected
                      ? 'border-[#e11d48] bg-[#e11d48]/5 shadow-md'
                      : 'border-black/8 hover:border-black/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 text-[#1d1d1f]">
                      <Icon size={20} style={{ color: module.color }} />
                    </div>
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-black/5 text-[#515154]">
                      الموديل #{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#1d1d1f] mb-1">{module.title[lang]}</h3>
                  <p className="text-xs text-[#515154] line-clamp-2 leading-relaxed">{module.subtitle ? module.subtitle[lang] : module.desc[lang]}</p>
                </div>
              );
            })}
          </div>

          {/* ACTIVE MODULE DISPLAY & SIMULATED LIVE UI PREVIEW */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="apple-studio-card p-8 sm:p-12 bg-white"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* LEFT DETAILS COLUMN */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 text-xs font-bold text-[#e11d48]">
                    <Sparkles size={14} />
                    <span>{activeModule.zmamFeature[lang]}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f]">
                    {activeModule.title[lang]}
                  </h3>

                  <p className="text-sm text-[#515154] leading-relaxed">
                    {activeModule.desc[lang]}
                  </p>

                  {/* SPECS GRID */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-black/8">
                    {activeModule.specs.map((spec, i) => (
                      <div key={i} className="bg-[#f5f5f7] p-4 rounded-2xl border border-black/8 text-center">
                        <div className="text-[11px] font-bold text-[#86868b] mb-1">{spec.label[lang]}</div>
                        <div className="text-xs font-extrabold text-[#1d1d1f]">{spec.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT SIMULATED LIVE UI CARD */}
                <div className="lg:col-span-5 border border-black/10 rounded-3xl p-6 bg-[#f5f5f7] flex flex-col justify-between shadow-inner">
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10">
                      <span className="text-xs font-bold text-[#e11d48]">{activeModule.previewUI.badge}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    <h4 className="text-sm font-extrabold text-[#1d1d1f] mb-4">
                      {activeModule.previewUI.title}
                    </h4>

                    <div className="space-y-2.5 mb-6">
                      {activeModule.previewUI.items.map((item: any, i: number) => (
                        <div key={i} className="bg-white p-3 rounded-xl border border-black/8 flex items-center justify-between text-xs">
                          <span className="font-bold text-[#1d1d1f]">{item.name}</span>
                          <span className="font-semibold text-[#515154]">{item.price || item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/10 space-y-2 text-xs font-bold">
                    <div className="flex justify-between text-[#515154]">
                      <span>{activeModule.previewUI.discount}</span>
                    </div>
                    <div className="flex justify-between text-[#1d1d1f] text-sm font-extrabold pt-1 border-t border-black/8">
                      <span>النتيجة الحية:</span>
                      <span className="text-[#0066cc]">{activeModule.previewUI.netTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* HARDWARE & SYSTEM COMPATIBILITY */}
        <section className="mb-20">
          <div className="apple-studio-card p-8 sm:p-12 bg-white text-center">
            <h2 className="text-3xl font-extrabold text-[#1d1d1f] mb-3">
              {isRtl ? 'التوافق التام مع أجهزة ومطابع المتجر' : 'Hardware & System Compatibility'}
            </h2>
            <p className="text-sm text-[#515154] max-w-2xl mx-auto mb-10">
              {isRtl
                ? 'يعمل جلامورا بسلاسة مطلقة على أجهزة أبل المعتمدة ويقترن أوتوماتيكياً مع معدات الكاشير والمطابع الحرارية.'
                : 'Runs seamlessly on macOS and iOS, automatically integrating with thermal receipt printers and hardware scanners.'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-black/8">
                <LaptopIcon className="mx-auto mb-2 text-[#1d1d1f]" />
                <div className="text-xs font-bold text-[#1d1d1f]">Mac & macOS</div>
                <div className="text-[11px] text-[#86868b]">{isRtl ? 'أجهزة الكاشير الرئيسية' : 'Primary Cashier Desks'}</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-black/8">
                <Smartphone size={24} className="mx-auto mb-2 text-[#1d1d1f]" />
                <div className="text-xs font-bold text-[#1d1d1f]">iPhone & iOS</div>
                <div className="text-[11px] text-[#86868b]">{isRtl ? 'أجهزة المبيعات والجوالة' : 'Mobile Cashier Terminals'}</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-black/8">
                <Printer size={24} className="mx-auto mb-2 text-[#1d1d1f]" />
                <div className="text-xs font-bold text-[#1d1d1f]">Thermal Printers</div>
                <div className="text-[11px] text-[#86868b]">{isRtl ? 'طباعة البلوتوث والشبكة' : 'Bluetooth & Wi-Fi Receipts'}</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-black/8">
                <QrCode size={24} className="mx-auto mb-2 text-[#1d1d1f]" />
                <div className="text-xs font-bold text-[#1d1d1f]">Barcode Scanners</div>
                <div className="text-[11px] text-[#86868b]">{isRtl ? 'كاميرا الجهاز أو القارئ' : 'Camera & USB/BT Scanners'}</div>
              </div>
            </div>
          </div>
        </section>

        {/* LEGAL & SUPPORT FOOTER */}
        <div className="flex justify-center gap-6 text-xs text-[#86868b] font-medium flex-wrap pt-8 border-t border-black/10">
          <Link href="/glamora/privacy" className="hover:text-[#1d1d1f] transition">
            {isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </Link>
          <span>•</span>
          <Link href="/glamora/support" className="hover:text-[#1d1d1f] transition">
            {isRtl ? 'الدعم الفني' : 'Technical Support'}
          </Link>
          <span>•</span>
          <Link href="/glamora/terms" className="hover:text-[#1d1d1f] transition">
            {isRtl ? 'شروط الخدمة' : 'Terms of Service'}
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

function LaptopIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55A1 1 0 0 1 20.36 20H3.64a1 1 0 0 1-.92-1.45L4 16" />
    </svg>
  );
}
