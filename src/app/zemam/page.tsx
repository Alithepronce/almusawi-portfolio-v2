'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import PageShell from '@/components/ui/PageShell';
import { useLang } from '@/lib/i18n';
import {
  Shield,
  HeartHandshake,
  Lock,
  Cpu,
  Printer,
  Activity,
  Crown,
  Layers,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Scale,
  Compass,
  Palette,
  Feather,
  Eye,
  Zap,
  Globe,
  Award,
  Sliders,
  BellOff,
  Volume2,
} from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

// Volume 1: Constitutional 12 Axioms
const volume1Axioms = [
  { num: '01', title: { ar: 'كرامة الإنسان أولاً', en: 'Human Dignity First' }, desc: { ar: 'التكنولوجيا وسيلة لخدمة وتمكين العقل البشري، وليست أداة للاستغلال أو توجيه السلوك.', en: 'Technology serves human capability, never exploiting attention.' } },
  { num: '02', title: { ar: 'الخصوصية المطلقة', en: 'Zero Data Exploitation' }, desc: { ar: 'البيانات ملك للمستخدم حتمياً؛ لا تُباع، لا تُستغل، ولا تُغادر الجهاز بدون إذن صريح.', en: 'User data is sacred, never sold or processed without consent.' } },
  { num: '03', title: { ar: 'الهندسة الهادئة', en: 'Quiet Engineering' }, desc: { ar: 'إزالة التشتيت والضوضاء البصرية لإظهار الفائدة والإنتاجية الصافية بهدوء.', en: 'Removing visual noise to deliver pure, distraction-free utility.' } },
  { num: '04', title: { ar: 'الأولوية للعمل المحلي', en: 'Local-First Priority' }, desc: { ar: 'البرمجيات تعمل محلياً بـ 0ms تأخير مع استمرارية كاملة دون الحاجة لشبكة دائمة.', en: 'Local-first architecture ensuring zero latency and offline longevity.' } },
  { num: '05', title: { ar: 'الموثوقية والاستمرارية', en: 'Institutional Continuity' }, desc: { ar: 'أنظمة تُصمم وتبنى لتدوم لعقود، تتجاوز الأفراد وتبنى وفق أصول هندسية.', en: 'Systems engineered to outlive founders and endure across decades.' } },
  { num: '06', title: { ar: 'الانضباط التصميمي', en: 'Structured Simplicity' }, desc: { ar: 'البساطة تتطلب انضباطاً تائماً. كل زر أو شاشة يجب أن يبرر وجوده بفائدة.', en: 'Simplicity requires discipline. Every UI element must justify itself.' } },
  { num: '07', title: { ar: 'الأمانة الهندسية', en: 'Stewardship & Ethics' }, desc: { ar: 'جميع القرارات البرمجية تحكمها الأمانة والأخلاق قبل الاعتبارات التجارية.', en: 'Engineering decisions strictly guided by ethics and stewardship.' } },
  { num: '08', title: { ar: 'النزاهة والشفافية', en: 'Transparent Code' }, desc: { ar: 'خلو المعايير البرمجية من الأبواب الخلفية أو الفخاخ البصرية أو الخدع.', en: 'Clean architecture completely free of dark patterns or hidden backdoors.' } },
  { num: '09', title: { ar: 'تمكين المجتمعات', en: 'Community Empowerment' }, desc: { ar: 'دعم المبدعين والشركات المحلية بحلول حقيقية ترفع مستوى الإنتاجية.', en: 'Empowering local creators and businesses with robust tooling.' } },
  { num: '10', title: { ar: 'الجودة فوق السرعة', en: 'Quality Outlives Speed' }, desc: { ar: 'التميز المعماري المتقن يتجاوز الحلول السريعة والتجارب المؤقتة.', en: 'Craftsmanship and structural integrity outlast shortcuts.' } },
  { num: '11', title: { ar: 'الاستمرارية بالتطوير', en: 'Continuous Evolution' }, desc: { ar: 'صيانة وتطوير البرمجيات بانتظام لضمان توافقها مع أحدث البيئات.', en: 'Disciplined, regular updates preserving stability over time.' } },
  { num: '12', title: { ar: 'عهد الأمانة الأبدي', en: 'Forever Commitment' }, desc: { ar: 'التزام مؤسسي أطول من حياة الأفراد لحماية وإعلاء هذه المبادئ.', en: 'An institutional oath to maintain and defend these principles.' } },
];

// Volume 2: Governance Pillars
const volume2Governance = [
  { icon: Crown, title: { ar: 'مكتب المؤسس (Office of the Founder)', en: 'Office of the Founder' }, desc: { ar: 'التوجيه الاستراتيجي وحماية الدستور وتحديد الرؤية طويلة المدى للمنظومة.', en: 'Strategic direction and constitutional guardianship.' } },
  { icon: Scale, title: { ar: 'لجنة حراسة الدستور (Stewardship Committee)', en: 'Constitutional Committee' }, desc: { ar: 'مراجعة وتقييم جميع القرارات الهندسية والتأكد من مطابقتها للدستور.', en: 'Auditing engineering choices against constitutional axioms.' } },
  { icon: Cpu, title: { ar: 'نقابة المطورين والمشاركين (Contributor Guild)', en: 'Contributor Guild' }, desc: { ar: 'تنظيم معايير كتابة الكود والمراجعات البرمجية وضمان جودة التطبيقات.', en: 'Organizing code standards and peer architecture reviews.' } },
  { icon: Shield, title: { ar: 'مجلس الأخلاق والخصوصية (Ethics & Privacy Council)', en: 'Ethics & Privacy Council' }, desc: { ar: 'ضمان حماية بيانات المستخدمين ومنع أي ثغرات أو استغلال للسلوك.', en: 'Securing user privacy and auditing data protocols.' } },
];

// Volume 3: Design & Engineering Axioms
const volume3Design = [
  { icon: Sparkles, title: { ar: 'البساطة المهيكلة', en: 'Structured Simplicity' }, desc: { ar: 'إزالة أي حشو بصري أو زوائد لا تخدم وظيفة مبسطة ومباشرة.', en: 'Eliminating clutter to focus on raw operational clarity.' } },
  { icon: Feather, title: { ar: 'الأداة الصامتة', en: 'Silent Utility' }, desc: { ar: 'التكنولوجيا التي تعمل بهدوء في الخلفية وتظهر فقط عند الحاجة.', en: 'Software that operates quietly in the background.' } },
  { icon: Eye, title: { ar: 'تقليل الجهد الذهني', en: 'Zero Cognitive Load' }, desc: { ar: 'تصميم الواجهات بوضوح يمنح المستخدم راحة ذهنية تامة.', en: 'Interfaces rendered for maximum human mental ease.' } },
  { icon: Compass, title: { ar: 'اللمسية والحس البصري', en: 'Tactile Craftsmanship' }, desc: { ar: 'استعمال تفجيرات بصرية ومؤثرات صوتية ناعمة تزيد متعة الاستخدام.', en: 'Subtle sound cues and micro-interactions.' } },
  { icon: Lock, title: { ar: 'الخزينة المحلية', en: 'Local-First Storage' }, desc: { ar: 'حفظ وتجهيز البيانات داخل جهازك سرعة بـ 0ms تأخير.', en: 'Sub-second local computing and data vault.' } },
  { icon: Award, title: { ar: 'تصميم تدوم قيمته', en: 'Long Lifespan Design' }, desc: { ar: 'واجهات كلاسيكية فاخرة لا تصبح قديمة مع مرور السنين.', en: 'Timeless visual layouts engineered to outlive trends.' } },
  { icon: BellOff, title: { ar: 'مناهضة الإدمان الرقمي', en: 'Anti-Addiction Philosophy' }, desc: { ar: 'خلو الأنظمة من الإشعارات الوهمية أو الفخاخ البصرية الجاذبة للانتباه.', en: 'Zero dark patterns or deceptive notification traps.' } },
  { icon: Sliders, title: { ar: 'التباين المعماري الفاخر', en: 'Apple Studio Contrast' }, desc: { ar: 'اعتماد نمط التحرير الناصع (#FBFBFD) والحدود النظيفة.', en: 'Crisp studio monochrome aesthetic with high readability.' } },
];

// Volume 4: Brand System Tokens
const volume4BrandTokens = [
  { name: 'ZMAM Deep Iris', hex: '#6366F1', role: { ar: 'اللون الرئيسي لنواة زمام والذكاء الاصطناعي', en: 'ZMAM Core & AI Accent' } },
  { name: 'Studio Alabaster', hex: '#FBFBFD', role: { ar: 'خلفية الاستوديو المعماري الناصع', en: 'Apple Studio Light Canvas' } },
  { name: 'Royal Rose', hex: '#E11D48', role: { ar: 'اللون المخصص لتجارة وكاشير جلامورا POS', en: 'Glamora POS Retail Red' } },
  { name: 'Cyber Amber', hex: '#D97706', role: { ar: 'اللون المخصص لمطابع ونشر الوَرَّاق', en: 'Warraq Print Ecosystem Amber' } },
];

export default function ZemamPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();
  const [activeVolumeTab, setActiveVolumeTab] = useState(0);

  const volumeTabs = [
    { title: { ar: 'المجلد I: الدستور والتأسيس', en: 'Vol I: Founding Constitution' }, badge: '48 فصلاً · 12 بنداً' },
    { title: { ar: 'المجلد II: هيئة المؤسس والحوكمة', en: 'Vol II: Governance Protocols' }, badge: '4 مجالس حوكمة' },
    { title: { ar: 'المجلد III: عقيدة التصميم والهندسة', en: 'Vol III: Design & Engineering' }, badge: '8 قواعد معمارية' },
    { title: { ar: 'المجلد IV: دليل الهوية البصرية', en: 'Vol IV: Brand System & Tokens' }, badge: 'System Style Guide' },
  ];

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto pb-24 pt-4">
        {/* HERO BANNER */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-bold text-[#1d1d1f] mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#6366f1]" />
            <span>{isRtl ? 'المجلدات والمثاقب المؤسسية الأربعة لزمام' : 'The Four ZMAM Institutional Quad-Volumes'}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold sm:text-6xl tracking-tight text-[#1d1d1f] mb-6"
          >
            {isRtl ? 'دستور وعقيدة' : 'Project'}{' '}
            <span className="text-[#6366f1]">{isRtl ? 'مشروع زمام' : 'ZMAM Doctrine'}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-[#515154] leading-relaxed mb-8"
          >
            {isRtl
              ? 'تستعرض هذه الصفحة الأبعاد والمجلدات الأربعة التي تشكل الهيكل التأسيسي، نظام الحوكمة، العقيدة الهندسية، ودليل الهوية لمنظومة مشروع زمام بطريقة تفاعلية بصرية حية.'
              : 'Explore the four core institutional volumes detailing ZMAM founding constitution, governance framework, human-centered engineering doctrine, and brand system tokens.'}
          </motion.p>
        </section>

        {/* INTERACTIVE QUAD-VOLUME TABS SWITCHER */}
        <section className="mb-20">
          {/* TAB BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {volumeTabs.map((tab, idx) => {
              const isSelected = idx === activeVolumeTab;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    playClick();
                    setActiveVolumeTab(idx);
                  }}
                  onMouseEnter={playHover}
                  className={`apple-studio-card p-5 cursor-pointer transition border text-center ${
                    isSelected
                      ? 'border-[#6366f1] bg-[#6366f1]/5 shadow-md'
                      : 'border-black/8 hover:border-black/20'
                  }`}
                >
                  <div className="text-[11px] font-extrabold text-[#6366f1] mb-1">{tab.badge}</div>
                  <h3 className="text-sm font-bold text-[#1d1d1f]">{tab.title[lang]}</h3>
                </div>
              );
            })}
          </div>

          {/* DYNAMIC VOLUME CONTENT CANVAS */}
          <AnimatePresence mode="wait">
            {/* VOLUME 1: CONSTITUTION */}
            {activeVolumeTab === 0 && (
              <motion.div
                key="vol1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="apple-studio-card p-8 sm:p-12 bg-white"
              >
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/10">
                  <div>
                    <span className="text-xs font-bold text-[#6366f1] block mb-1">المجلد الأول (Volume I)</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f]">
                      {isRtl ? 'الدستور والهيكل التأسيسي (Founding Constitution)' : 'Founding Constitution Axioms'}
                    </h2>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-black/5 text-xs font-bold text-[#515154]">
                    12 بنداً رئيساً
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {volume1Axioms.map((ax, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-[#f5f5f7] border border-black/8 flex flex-col justify-between hover:border-black/20 transition">
                      <div>
                        <div className="text-xs font-black text-[#6366f1] mb-2">{ax.num}</div>
                        <h3 className="text-base font-bold text-[#1d1d1f] mb-2">{ax.title[lang]}</h3>
                        <p className="text-xs text-[#515154] leading-relaxed">{ax.desc[lang]}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-black/8 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                        <CheckCircle2 size={14} />
                        <span>{isRtl ? 'بند دستوري موثق' : 'Ratified Axiom'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* VOLUME 2: GOVERNANCE */}
            {activeVolumeTab === 1 && (
              <motion.div
                key="vol2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="apple-studio-card p-8 sm:p-12 bg-white"
              >
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/10">
                  <div>
                    <span className="text-xs font-bold text-[#6366f1] block mb-1">المجلد الثاني (Volume II)</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f]">
                      {isRtl ? 'هيئة المؤسس ونظام الحوكمة (Governance Protocols)' : 'Governance & Founder Protocols'}
                    </h2>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-black/5 text-xs font-bold text-[#515154]">
                    4 مجالس تشغيلية
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {volume2Governance.map((gov, i) => {
                    const Icon = gov.icon;
                    return (
                      <div key={i} className="p-8 rounded-2xl bg-[#f5f5f7] border border-black/8 flex items-start gap-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-[#6366f1] border border-black/8 shrink-0">
                          <Icon size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">{gov.title[lang]}</h3>
                          <p className="text-xs text-[#515154] leading-relaxed">{gov.desc[lang]}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* VOLUME 3: DESIGN DOCTRINE */}
            {activeVolumeTab === 2 && (
              <motion.div
                key="vol3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="apple-studio-card p-8 sm:p-12 bg-white"
              >
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/10">
                  <div>
                    <span className="text-xs font-bold text-[#6366f1] block mb-1">المجلد الثالث (Volume III)</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f]">
                      {isRtl ? 'عقيدة التصميم والهندسة الإنسانية (Design Doctrine)' : 'Humanist Design Doctrine'}
                    </h2>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-black/5 text-xs font-bold text-[#515154]">
                    8 ركائز معمارية
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {volume3Design.map((d, i) => {
                    const Icon = d.icon;
                    return (
                      <div key={i} className="p-6 rounded-2xl bg-[#f5f5f7] border border-black/8">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 text-[#1d1d1f] mb-4">
                          <Icon size={20} />
                        </div>
                        <h3 className="text-base font-bold text-[#1d1d1f] mb-2">{d.title[lang]}</h3>
                        <p className="text-xs text-[#515154] leading-relaxed">{d.desc[lang]}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* VOLUME 4: BRAND SYSTEM TOKENS */}
            {activeVolumeTab === 3 && (
              <motion.div
                key="vol4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="apple-studio-card p-8 sm:p-12 bg-white"
              >
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/10">
                  <div>
                    <span className="text-xs font-bold text-[#6366f1] block mb-1">المجلد الرابع (Brand Book)</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f]">
                      {isRtl ? 'دليل الهوية البصرية (ZMAM Brand Tokens)' : 'ZMAM Brand System Tokens'}
                    </h2>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-black/5 text-xs font-bold text-[#515154]">
                    System Palette Tokens
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {volume4BrandTokens.map((token, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-[#f5f5f7] border border-black/8 flex flex-col justify-between">
                      <div>
                        <div
                          className="w-full h-16 rounded-xl mb-4 shadow-sm border border-black/10"
                          style={{ backgroundColor: token.hex }}
                        />
                        <h3 className="text-base font-bold text-[#1d1d1f] mb-1">{token.name}</h3>
                        <p className="text-xs font-mono text-[#86868b] mb-3">{token.hex}</p>
                        <p className="text-xs text-[#515154] leading-relaxed">{token.role[lang]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* FOUNDER'S DECLARATION QUOTE */}
        <section className="apple-studio-card p-10 sm:p-14 text-center bg-white relative overflow-hidden">
          <div className="max-w-3xl mx-auto">
            <BookOpen size={36} className="mx-auto text-[#6366f1] mb-4" />
            <blockquote className="text-xl sm:text-2xl font-bold text-[#1d1d1f] leading-snug mb-6">
              {isRtl
                ? '«التكنولوجيا لا تكتسب قيمتها لمجرد استعراض القدرة الهندسية؛ بل تبدأ قيمتها عندما تحسّن حياة الإنسان بهدوء وبلا تشتيت.»'
                : '"Technology has no value when it exists merely to demonstrate technical capability. Its purpose begins only when it quietly improves human life."'}
            </blockquote>
            <cite className="not-italic text-xs font-bold text-[#515154]">
              {isRtl ? '— من الإعلان التأسيسي لدستور مشروع زمام (علي موفق)' : '— From Project ZMAM Founding Declaration (Ali Muwaffaq)'}
            </cite>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
