'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/lib/i18n';
import PageShell from '@/components/ui/PageShell';
import { Phone, Mail, Globe, Github, Crown, Activity, Printer, ArrowUpRight } from 'lucide-react';
import { useInteractiveSounds } from '@/hooks/useInteractiveSounds';

const links = [
  { label: 'تطبيق غلامورا (Glamora POS)', href: '/glamora', icon: Crown, color: '#E11D48' },
  { label: 'تطبيق خُطى (GlassStep)', href: '/khuta', icon: Activity, color: '#06B6D4' },
  { label: 'منصة الوَرَّاق للطباعة', href: '/warraq', icon: Printer, color: '#D97706' },
  { label: 'موقع شركة الموسوي', href: '/office', icon: Globe, color: '#8B5CF6' },
  { label: 'حساب GitHub الرسمي', href: 'https://github.com/Alithepronce', icon: Github, color: '#10B981' },
  { label: 'تواصل مباشر عبر WhatsApp', href: 'https://wa.me/9647767625001', icon: Phone, color: '#25D366' },
];

export default function LinksPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useInteractiveSounds();

  return (
    <PageShell>
      <div className="max-w-md mx-auto text-center pb-24">
        <div className="relative h-24 w-24 mx-auto mb-4 overflow-hidden rounded-full border-2 border-[var(--gold)] shadow-xl">
          <Image src="/logo.png" alt="Ali Al-Musawi Logo" fill className="object-cover" />
        </div>

        <h1 className="text-2xl font-extrabold mb-1">{isRtl ? 'علي الموسوي' : 'Ali Al-Musawi'}</h1>
        <p className="text-xs font-semibold text-[var(--gold-light)] mb-8">
          {isRtl ? 'مطوّر أتمتة AI ومدير منتجات | شركة الموسوي' : 'AI Automation Developer & Product Manager'}
        </p>

        <div className="grid gap-3">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                onClick={playClick}
                onMouseEnter={playHover}
                className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition hover:scale-[1.02] hover:border-white/25 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${link.color}20`, color: link.color }}>
                    <Icon size={20} />
                  </div>
                  <span className="text-sm font-bold text-[var(--text)]">{link.label}</span>
                </div>
                <ArrowUpRight size={18} className="text-[var(--text-muted)]" />
              </a>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
