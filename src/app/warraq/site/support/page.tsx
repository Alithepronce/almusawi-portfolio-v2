'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle, Download, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqItems = [
  {
    q: 'ما هو تطبيق ورّاق؟',
    a: 'ورّاق هو تطبيق متكامل لإدارة محلات الطباعة والمكتبات والقرطاسية. يشمل إدارة الطلبات والمخزون والفواتير والعملاء والموظفين والتحليلات — كل ما تحتاجه في تطبيق واحد.'
  },
  {
    q: 'هل التطبيق مجاني؟',
    a: 'التطبيق يوفر فترة تجريبية مجانية، وبعدها يمكنك الاشتراك في إحدى خططنا المميزة (المبتدئ، الأساسي، الاحترافي، المؤسسات) المناسبة لحجم أعمالك. تصفح صفحة الأسعار والاشتراك لمعرفة التفاصيل.'
  },
  {
    q: 'كيف أحمّل التطبيق؟',
    a: 'تطبيق ورّاق لإدارة المكتبات (أدمن) متاح الآن رسمياً للتحميل من متجر App Store لهواتف الآيفون وأجهزة الآيباد. كما يتوفر التطبيق للأندرويد كملف APK للتحميل المباشر من هذا الموقع.'
  },
  {
    q: 'هل بياناتي آمنة؟',
    a: 'نعم. نستخدم خوادم Supabase المحمية بتشفير عالي. بياناتك مشفرة أثناء النقل والتخزين، ولا نشاركها مع أي طرف ثالث.'
  },
  {
    q: 'كيف يعمل نظام تتبع الطلبات بالـ QR؟',
    a: 'يمكنك إنشاء رمز QR لكل طلب ومشاركته مع الزبون عبر واتساب أو طباعته. عندما يمسح الزبون الرمز، يرى حالة طلبه لحظياً دون الحاجة لتحميل التطبيق.'
  },
  {
    q: 'ما هي بوابة الزبائن؟',
    a: 'بوابة الزبائن هي رابط فريد لكل زبون يمكنه من خلاله رؤية جميع طلباته وحالتها. تُنشئ البوابة من التطبيق وتُشارك مع الزبون.'
  },
  {
    q: 'هل يدعم التطبيق الوضع الداكن؟',
    a: 'نعم، التطبيق يدعم الوضع الفاتح والوضع الداكن، ويمكنك التبديل بينهما من الإعدادات.'
  },
  {
    q: 'هل يدعم اللغة الإنجليزية؟',
    a: 'نعم، التطبيق يدعم العربية والإنجليزية بالكامل.'
  },
  {
    q: 'كيف أبلغ عن مشكلة أو أقترح ميزة؟',
    a: 'يمكنك التواصل معنا مباشرة عبر تيليغرام. نرحب بكل الاقتراحات والملاحظات!'
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid var(--w-border)', overflow: 'hidden' }}>
      <button 
        onClick={() => setOpen(!open)}
        style={{ 
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'right', fontSize: '1.0625rem', fontWeight: 600, color: 'var(--w-text)'
        }}
      >
        <span>{q}</span>
        <ChevronDown size={20} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', color: 'var(--w-primary)', flexShrink: 0 }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ paddingBottom: '20px', color: 'var(--w-text-sec)', lineHeight: 1.7 }}>
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SupportPage() {
  return (
    <div className="w-container" style={{ padding: '80px 24px', maxWidth: 800 }}>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 60 }}
      >
        <div className="w-icon-wrapper" style={{ margin: '0 auto 20px auto', width: 64, height: 64, color: 'var(--w-primary)', background: 'rgba(37,99,235,0.1)' }}>
          <HelpCircle size={32} />
        </div>
        <h1 className="w-section-title" style={{ marginBottom: 16 }}>المساعدة والدعم</h1>
        <p className="w-section-subtitle" style={{ margin: '0 auto' }}>إجابات على أكثر الأسئلة شيوعاً للحصول على أقصى استفادة من منصتك.</p>
      </motion.div>

      {/* FAQ */}
      <motion.div 
        className="w-card-glass" 
        style={{ marginBottom: 40, padding: '12px 32px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {faqItems.map((item, i) => (
          <AccordionItem key={i} q={item.q} a={item.a} />
        ))}
      </motion.div>

      {/* Contact Grid */}
      <div className="w-bento-grid">
        <motion.div 
          className="w-card-glass w-col-span-6" 
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-icon-wrapper" style={{ color: 'var(--w-admin)', background: 'rgba(249,115,22,0.1)' }}>
            <MessageCircle size={24} />
          </div>
          <h3 style={{ marginBottom: 12, fontSize: '1.25rem' }}>لم تجد إجابتك؟</h3>
          <p style={{ color: 'var(--w-text-sec)', marginBottom: 24 }}>تواصل معنا مباشرة على تيليغرام وسنرد في أسرع وقت ممكن.</p>
          <a
            href="https://t.me/Jormunghandr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-btn w-btn-orange"
          >
            راسلنا على تيليغرام
          </a>
        </motion.div>

        <motion.div 
          className="w-card-glass w-col-span-6" 
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-icon-wrapper" style={{ color: 'var(--w-primary)', background: 'rgba(37,99,235,0.1)' }}>
            <Download size={24} />
          </div>
          <h3 style={{ marginBottom: 12, fontSize: '1.25rem' }}>لم تحمّل التطبيقات بعد؟</h3>
          <p style={{ color: 'var(--w-text-sec)', marginBottom: 24 }}>ابدأ ببناء مكتبتك الرقمية وحمل التطبيقات المخصصة الآن.</p>
          <a
            href="https://www.mediafire.com/file/h9xrm2oy2h87v3h/warraq.apk/file"
            target="_blank"
            rel="noopener noreferrer"
            className="w-btn w-btn-outline"
          >
            <Download size={18} /> تحميل الـ APK المباشر
          </a>
        </motion.div>
      </div>

    </div>
  );
}
