'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageShell from '@/components/ui/PageShell';
import { useLang } from '@/lib/i18n';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

export default function ContactPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setSubmitted(true);
  };

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto pb-24 pt-4">
        {/* HERO HEADER */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-bold text-[#1d1d1f] mb-6 shadow-sm"
          >
            <Mail size={14} className="text-[#0066cc]" />
            {isRtl ? 'التواصل المباشر والتنسيق' : 'Direct Communication & Booking'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold sm:text-6xl tracking-tight text-[#1d1d1f] mb-6"
          >
            {isRtl ? 'تواصل معنا لبناء مشروعك' : 'Build Your System With Us'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-[#515154] leading-relaxed"
          >
            {isRtl
              ? 'تواصل مباشرة مع معمارية المنظومة لتحديد المتطلبات وبناء أنظمة وتطبيقات تتوافق مع أعلى معايير الجودة والخصوصية.'
              : 'Connect directly with our architecture team to design and deploy software engineered for longevity.'}
          </motion.p>
        </section>

        {/* CONTACT TERMINAL & INFO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CONTACT DETAILS CARDS */}
          <div className="space-y-6">
            <div className="apple-studio-card p-7">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 text-[#1d1d1f] flex items-center justify-center border border-black/8">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1d1d1f]">{isRtl ? 'البريد الإلكتروني' : 'Direct Email'}</h3>
                  <p className="text-xs text-[#515154]">gamegdeo@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="apple-studio-card p-7">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 text-[#1d1d1f] flex items-center justify-center border border-black/8">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1d1d1f]">{isRtl ? 'واتساب المباشر' : 'WhatsApp Direct'}</h3>
                  <p className="text-xs text-[#515154]" dir="ltr">+964 776 762 5001</p>
                </div>
              </div>
            </div>

            <div className="apple-studio-card p-7">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 text-[#1d1d1f] flex items-center justify-center border border-black/8">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1d1d1f]">{isRtl ? 'الموقع الجغرافي' : 'Location'}</h3>
                  <p className="text-xs text-[#515154]">{isRtl ? 'بابل، العراق' : 'Babil, Iraq'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* BRIEF FORM TERMINAL */}
          <div className="lg:col-span-2 apple-studio-card p-8 sm:p-10 bg-white">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 size={48} className="mx-auto text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">{isRtl ? 'تم إرسال تفاصيل مشروعك بنجاح!' : 'Brief Received Successfully!'}</h3>
                <p className="text-sm text-[#515154] max-w-md mx-auto mb-6">
                  {isRtl ? 'شكراً لتواصلك. سيتم مراجعة المتطلبات والتواصل معك في أقرب وقت ممكن.' : 'Thank you. Our architecture team will review your brief and get back to you shortly.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#1d1d1f] text-white text-xs font-bold hover:bg-black transition"
                >
                  {isRtl ? 'إرسال رسالة جديدة' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#1d1d1f] mb-2">{isRtl ? 'الاسم الكريم' : 'Your Name'}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#f5f5f7] border border-black/8 text-[#1d1d1f] placeholder-[#86868b] text-sm focus:outline-none focus:border-[#0066cc] transition"
                    placeholder={isRtl ? 'مثال: علي أحمد' : 'e.g. Ali Ahmed'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1d1d1f] mb-2">{isRtl ? 'البريد الإلكتروني' : 'Your Email'}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#f5f5f7] border border-black/8 text-[#1d1d1f] placeholder-[#86868b] text-sm focus:outline-none focus:border-[#0066cc] transition"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1d1d1f] mb-2">{isRtl ? 'تفاصيل المشروع والمتطلبات' : 'Project Brief & Scope'}</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#f5f5f7] border border-black/8 text-[#1d1d1f] placeholder-[#86868b] text-sm focus:outline-none focus:border-[#0066cc] transition resize-none"
                    placeholder={isRtl ? 'اكتب ملخصاً سريعاً للمشروع أو النظام المطلوب...' : 'Describe your product requirements or timeline...'}
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={playHover}
                  className="w-full py-4 rounded-2xl bg-[#1d1d1f] text-white font-bold text-sm shadow-md hover:bg-black transition flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  <span>{isRtl ? 'إرسال تفاصيل المشروع' : 'Submit Project Brief'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
