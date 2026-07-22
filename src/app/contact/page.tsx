'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import PageShell from '@/components/ui/PageShell';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

export default function ContactPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();

  const [formData, setFormData] = useState({ name: '', email: '', project: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    const msg = encodeURIComponent(
      `مرحباً علي، أنا ${formData.name} (${formData.email}).\n\nتفاصيل المشروع:\n${formData.project}`
    );
    window.open(`https://wa.me/9647767625001?text=${msg}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto pb-24">
        <section className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-[var(--gold-light)] mb-4"
          >
            <Sparkles size={14} />
            {isRtl ? 'التواصل المباشر' : 'Direct Contact'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold sm:text-5xl"
          >
            {isRtl ? 'لنبدأ العمل معاً!' : "Let's Build Something Great!"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-base text-[var(--text-secondary)]"
          >
            {isRtl
              ? 'هل لديك فكرة تطبيق، نظام أتمتة AI، أو مشروع يحتاج تطوير؟ أرسل لي التفاصيل وسأتواصل معك مباشرة.'
              : 'Have an app idea, AI automation system, or project needing development? Send the brief and I will reach out directly.'}
          </motion.p>
        </section>

        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          {/* CONTACT INFO CARDS */}
          <div className="flex flex-col gap-4">
            <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[var(--text-secondary)]">{isRtl ? 'الهاتف والواتساب' : 'Phone & WhatsApp'}</h3>
                  <p className="text-base font-bold" dir="ltr">+964 776 762 5001</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[var(--text-secondary)]">{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</h3>
                  <p className="text-base font-bold">gamegdeo@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[var(--text-secondary)]">{isRtl ? 'الموقع' : 'Location'}</h3>
                  <p className="text-base font-bold">{isRtl ? 'بابل، العراق' : 'Babil, Iraq'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-[var(--text-secondary)] mb-2">
                {isRtl ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={isRtl ? 'علي الموسوي' : 'Ali Al-Musawi'}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-sm text-[var(--text)] outline-none focus:border-[var(--gold)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-secondary)] mb-2">
                {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-sm text-[var(--text)] outline-none focus:border-[var(--gold)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-secondary)] mb-2">
                {isRtl ? 'تفاصيل المشروع والطلب' : 'Project Details & Brief'}
              </label>
              <textarea
                required
                rows={4}
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                placeholder={isRtl ? 'صف فكرة تطبيقك، النظام المطلوبة، أو طريقة الأتمتة...' : 'Describe your app idea, required system, or automation...'}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-sm text-[var(--text)] outline-none focus:border-[var(--gold)] resize-none"
              />
            </div>

            <button
              type="submit"
              onClick={playClick}
              onMouseEnter={playHover}
              className="inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-[var(--gold)] text-[#1f1d19] font-bold text-sm transition hover:scale-[1.02] shadow-lg"
            >
              <Send size={18} />
              {isRtl ? 'إرسال مباشر عبر واتساب' : 'Send via WhatsApp Direct'}
            </button>

            {sent && (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 justify-center">
                <CheckCircle2 size={16} />
                {isRtl ? 'تم فتح واتساب ونقل التفاصيل بنجاح!' : 'WhatsApp opened with details successfully!'}
              </div>
            )}
          </form>
        </div>
      </div>
    </PageShell>
  );
}
