'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HelpCircle, Mail, MessageSquare, ArrowRight, CheckCircle2, Send } from 'lucide-react';

const faqs = [
  {
    q: 'كيف يعمل تطبيق خُطى بدون استهلاك بطارية الآيفون؟',
    a: 'يقوم تطبيق خُطى بالقراءة المباشرة من شريحة الحركة المدمجة في معالجات الآيفون (CoreMotion Coprocessor) والتي تعمل كعبء طاقة شبه معدوم دون الحاجة لتشغيل الـ GPS.'
  },
  {
    q: 'لماذا يطلب التطبيق إذن الحركة والرياضة عند الفتح لأول مرة؟',
    a: 'هذا الإذن مخصص لتمكين حزمة أبل الرسمية CMPedometer من قراءة عدد خطواتك والمسافة. بدون هذا الإذن لن يتمكن التطبيق من قراءة الخطوات.'
  },
  {
    q: 'كيف يتم حساب هدف الترطيب السائل (شرب الماء)؟',
    a: 'يعتمد التطبيق خوارزمية الجمعية الأمريكية للطب الرياضي (ACSM) استناداً لوزنك وطولك والأنماط الحركية المختارة (الشارع، الجيم، الحديقة) لتقديم التوصية الطبية لتعويض المياه.'
  },
  {
    q: 'هل يتم نقل أو حفظ بياناتي على أي موقع أو سيرفر خارجي؟',
    a: 'لا نهائياً. تطبيق خُطى يعمل 100% بدون نت (Offline)، ولا يملك أي سيرفر خلفي. جميع بياناتك تبقى بأمان تام داخل جهازك فقط.'
  },
  {
    q: 'ماذا أفعل إذا توقف العداد عن احتساب الخطوات؟',
    a: 'تأكد من تفعيل خيار (Motion & Fitness) من إعدادات الآيفون الخاصة بالتطبيق: Settings -> Privacy & Security -> Motion & Fitness -> الخُطى.'
  }
];

export default function KhutaSupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '60px 20px 100px', color: '#0F172A' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <Link href="/khuta" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#059669', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>
          <ArrowRight size={16} /> العودة إلى تطبيق خُطى
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: '#E6F4EA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
            <HelpCircle size={24} />
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#0F172A', fontWeight: 800, margin: 0 }}>
            مركز الدعم والمساعدة — تطبيق خُطى
          </h1>
        </div>
        <p style={{ color: '#64748B', fontSize: '14px' }}>
          الصفحة الرسمية المعتمدة لدعم مستخدمي تطبيق خُطى (GlassStep) ومراجعي Apple App Store.
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '44px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <Mail size={28} style={{ color: '#059669', marginBottom: '12px' }} />
          <h3 style={{ color: '#0F172A', fontSize: '18px', fontWeight: 800, margin: '0 0 6px' }}>البريد الإلكتروني المباشر</h3>
          <p style={{ color: '#64748B', fontSize: '13px', margin: '0 0 12px' }}>فريق الدعم المباشر جاهز للرد على الاستفسارات.</p>
          <a href="mailto:gamegdeo@gmail.com" style={{ color: '#059669', fontWeight: 700, fontSize: '14px' }}>gamegdeo@gmail.com</a>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <MessageSquare size={28} style={{ color: '#2563EB', marginBottom: '12px' }} />
          <h3 style={{ color: '#0F172A', fontSize: '18px', fontWeight: 800, margin: '0 0 6px' }}>الدعم السريع عبر تيليغرام</h3>
          <p style={{ color: '#64748B', fontSize: '13px', margin: '0 0 12px' }}>تواصل مباشر مع مطور التطبيق لطلب المساعدة.</p>
          <a href="https://t.me/Jormunghandr" target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', fontWeight: 700, fontSize: '14px' }}>@Jormunghandr</a>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '22px', color: '#0F172A', fontWeight: 800, marginBottom: '20px' }}>
          الأسئلة الشائعة (FAQ)
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: '#FFFFFF', border: '1px solid rgba(16, 185, 129, 0.12)', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <h4 style={{ color: '#059669', fontSize: '16px', fontWeight: 800, margin: '0 0 8px' }}>
                • {faq.q}
              </h4>
              <p style={{ color: '#475569', fontSize: '14px', margin: 0, lineHeight: 1.7 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT FORM */}
      <div style={{ background: '#FFFFFF', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <h3 style={{ color: '#0F172A', fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>إرسال استفسار أو تذكرة دعم</h3>
        <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '24px' }}>تواصل معنا وسنقوم بمتابعة طلبك مباشرة.</p>

        {submitted ? (
          <div style={{ background: '#E6F4EA', border: '1px solid #10B981', padding: '20px', borderRadius: '16px', color: '#047857', textAlign: 'center', fontWeight: 700 }}>
            <CheckCircle2 size={32} style={{ margin: '0 auto 8px', display: 'block' }} />
            شكراً لك! تم استلام رسالتك بنجاح وسيتواصل معك فريق الدعم قريباً.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#334155', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>الاسم</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسمك"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#334155', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>البريد الإلكتروني</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#334155', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>رسالتك أو الاستفسار</label>
              <textarea 
                rows={4}
                required
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="اكتب استفسارك هنا..."
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', outline: 'none', resize: 'vertical' }}
              />
            </div>
            <button 
              type="submit"
              style={{
                padding: '14px 28px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: '#FFF',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Send size={16} /> إرسال الرسالة
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
