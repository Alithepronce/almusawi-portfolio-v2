export type Lang = 'en' | 'ar';

export interface Project {
  slug: string;
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
  tags: string[];
  color: string;
  year?: string;
  hasCase?: boolean;
  externalHref?: string;
}

/** Complete list of projects */
export const allProjects: Project[] = [
  {
    slug: 'glamora',
    title: { ar: 'تطبيق غلامورا / Glamora POS', en: 'Glamora POS & Inventory' },
    desc: { ar: 'نظام كاشير ومخزون فاخر لمحلات الكوزمتكس والتجميل مع تزامن سحابي حي Supabase وسرية بصمة الوجه Face ID وإدارة الرواتب HR', en: 'Luxury cosmetic POS & inventory system featuring Supabase Realtime sync, Face ID security, and HR payroll engine' },
    tags: ['SwiftUI', 'Supabase', 'SwiftData', 'iOS', 'Face ID'],
    color: '#E11D48',
    year: '2026',
    hasCase: true,
    externalHref: '/glamora',
  },
  {
    slug: 'khuta',
    title: { ar: 'تطبيق خُطى / GlassStep', en: 'Khuta / GlassStep App' },
    desc: { ar: 'تطبيق تتبع خطوات زجاجي فائق الدقة ويعمل محلياً 100% مع 3 أنظمة حركية وأوسمة إنجاز', en: 'Liquid glass step tracker operating 100% locally with 3 tactical movement modes and achievement badges' },
    tags: ['SwiftUI', 'CoreMotion', 'Apple Health', 'iOS'],
    color: '#06B6D4',
    year: '2026',
    hasCase: true,
    externalHref: '/khuta',
  },
  {
    slug: 'trado',
    title: { ar: 'منصة ترادو / ise.trading', en: 'Trado / ise.trading Platform' },
    desc: { ar: 'منصة مجتمع وتعليم تداول وصلت إلى 1,000 مستخدم نشط خلال الشهر الأول من الإطلاق', en: 'Community and trading education platform that reached 1,000 active users in the first month' },
    tags: ['Next.js', 'React Native', 'Supabase', 'PostgreSQL'],
    color: '#6366F1',
    year: '2024–2025',
    hasCase: true,
  },
  {
    slug: 'automation',
    title: { ar: 'أتمتة الذكاء الاصطناعي للأعمال', en: 'AI Automation for Businesses' },
    desc: { ar: 'خطوط أنابيب أتمتة AI من البداية للنهاية للشركات والشركات الناشئة عن بُعد لزيادة الإنتاجية', en: 'End-to-end AI automation pipelines for Iraqi businesses and remote startups' },
    tags: ['Python', 'Gemini', 'Claude', 'Supabase'],
    color: '#22C55E',
    year: '2024–2025',
    hasCase: true,
  },
  {
    slug: 'prompt',
    title: { ar: 'أنظمة Prompt المتقدمة', en: 'AI Prompt Engineering Systems' },
    desc: { ar: 'أطر هندسة prompt متقدمة تولّد تطبيقات كاملة وتؤتمت مهام التطوير المعقدة', en: 'Advanced prompt frameworks generating complete applications and automating development' },
    tags: ['Gemini', 'Claude', 'GPT-4', 'Cursor'],
    color: '#F59E0B',
    year: '2024',
    hasCase: true,
  },
  {
    slug: 'robot',
    title: { ar: 'روبوت توصيل الأدوية الطبي', en: 'Medical Drug-Delivery Robot' },
    desc: { ar: 'روبوت يتبع الخطوط بالأشعة تحت الحمراء لنقل الأدوية داخل المستشفيات أوتوماتيكياً', en: 'Arduino-based IR line-following robot for autonomous medication transport in hospitals' },
    tags: ['Arduino', 'C++', 'IR Sensors', 'Robotics'],
    color: '#EC4899',
    year: '2025',
    hasCase: true,
  },
  {
    slug: 'ise-next',
    title: { ar: 'منصة ise-next', en: 'ise-next Platform' },
    desc: { ar: 'لوحة تحكم تداول وإدارة محافظ مع إشارات وتحليلات بيانية سريعة', en: 'Trading & portfolio management dashboard with signals & analytics' },
    tags: ['Next.js', 'Supabase', 'PostgreSQL'],
    color: '#8B5CF6',
    year: '2025',
    hasCase: false,
  },
  {
    slug: 'rag-pipeline',
    title: { ar: 'نظام RAG المؤتمت', en: 'Automated RAG Pipeline' },
    desc: { ar: 'نظام استرجاع ذكي لمعالجة أكثر من 10,000 صفحة من البيانات الضخمة', en: 'Enterprise retrieval system for 10,000+ page datasets' },
    tags: ['Python', 'AI', 'LLM'],
    color: '#F97316',
    year: '2024',
    hasCase: false,
  },
  {
    slug: 'telegram-bot',
    title: { ar: 'روبوت تيليغرام الذكي', en: 'Telegram Smart Bot' },
    desc: { ar: 'روبوت ذكي لإدارة المجتمعات والأتمتة التفاعلية عبر تيليغرام', en: 'Smart community management & automation bot via Telegram' },
    tags: ['Grammy', 'Node.js', 'Supabase'],
    color: '#0EA5E9',
    year: '2024',
    hasCase: false,
  },
];

export const featuredProjects = allProjects.slice(0, 6);
