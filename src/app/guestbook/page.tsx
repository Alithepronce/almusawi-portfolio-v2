'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import PageShell from '@/components/ui/PageShell';
import { MessageSquare, Send, Sparkles, User, Heart } from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

interface Entry {
  id: string;
  name: string;
  message: string;
  date: string;
}

const defaultEntries: Entry[] = [
  { id: '1', name: 'أحمد الحلي', message: 'موقع فخم جداً وتطبيقات ممتازة! بالتوفيق أخ علي موفق.', date: '2026-07-20' },
  { id: '2', name: 'Sara K.', message: 'Stunning 3D design and incredibly fast performance. Great work!', date: '2026-07-18' },
  { id: '3', name: 'حسين الفتلاوي', message: 'تطبيق غلامورا وتطبيقات الكاشير غيرت طريقة عمل المحل كلياً.', date: '2026-07-10' },
];

export default function GuestbookPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();

  const [entries, setEntries] = useState<Entry[]>(defaultEntries);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    playClick();
    const newEntry: Entry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toISOString().split('T')[0]
    };
    setEntries([newEntry, ...entries]);
    setName('');
    setMessage('');
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
            <MessageSquare size={14} />
            {isRtl ? 'سجل الزوار والرسائل' : 'Visitor Guestbook'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold sm:text-5xl"
          >
            {isRtl ? 'سجل الزوار والتمنيات' : 'Guestbook & Words'}
          </motion.h1>
        </section>

        {/* INPUT FORM */}
        <form onSubmit={handleSubmit} className="mb-12 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-[var(--text-secondary)] mb-2">
              {isRtl ? 'اسمك الكريم' : 'Your Name'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isRtl ? 'اكتب اسمك هنا...' : 'Enter your name...'}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-sm text-[var(--text)] outline-none focus:border-[var(--gold)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--text-secondary)] mb-2">
              {isRtl ? 'رسالتك أو رأيك' : 'Your Message'}
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isRtl ? 'اترك كلمة طيبة أو رأيك في الأعمال...' : 'Leave a note or feedback on the work...'}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-sm text-[var(--text)] outline-none focus:border-[var(--gold)] resize-none"
            />
          </div>

          <button
            type="submit"
            onClick={playClick}
            onMouseEnter={playHover}
            className="inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--gold)] text-[#1f1d19] font-bold text-sm transition hover:scale-[1.02] shadow-lg"
          >
            <Send size={16} />
            {isRtl ? 'إضافة إلى سجل الزوار' : 'Post to Guestbook'}
          </button>
        </form>

        {/* ENTRIES LIST */}
        <div className="grid gap-4">
          {entries.map((entry) => (
            <div key={entry.id} className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <User size={16} className="text-[var(--gold-light)]" />
                  <span>{entry.name}</span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">{entry.date}</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-6">{entry.message}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
