'use client';

import PageShell from '@/components/ui/PageShell';
import { PhoneCall, Mail, MessageSquare } from 'lucide-react';

export default function GlamoraSupportPage() {
  return (
    <PageShell>
      <div className="max-w-4xl mx-auto pb-24 pt-4">
        <div className="apple-studio-card p-8 sm:p-12 bg-white text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/5 text-[#e11d48] border border-black/8 mx-auto mb-6">
            <PhoneCall size={28} />
          </div>

          <h1 className="text-3xl font-extrabold text-[#1d1d1f] mb-3">الدعم الفني والخدمات (Glamora Support)</h1>
          <p className="text-sm text-[#515154] max-w-xl mx-auto mb-10">
            فريق الدعم الفني متواجد لمساعدتك في إعداد وتكوين أجهزة الكاشير والمطابع الحرارية واقتران أجهزة الموظفين عبر الـ QR Code.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-right max-w-2xl mx-auto">
            <a
              href="https://wa.me/9647767625001"
              target="_blank"
              rel="noreferrer"
              className="apple-studio-card p-6 flex items-center gap-4 hover:border-[#0066cc] transition"
            >
              <div className="w-10 h-10 rounded-xl bg-black/5 text-[#10b981] flex items-center justify-center border border-black/8 shrink-0">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1d1d1f]">واتساب الدعم الفني</h3>
                <p className="text-xs text-[#515154]" dir="ltr">+964 776 762 5001</p>
              </div>
            </a>

            <a
              href="mailto:gamegdeo@gmail.com"
              className="apple-studio-card p-6 flex items-center gap-4 hover:border-[#0066cc] transition"
            >
              <div className="w-10 h-10 rounded-xl bg-black/5 text-[#0066cc] flex items-center justify-center border border-black/8 shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1d1d1f]">البريد الإلكتروني</h3>
                <p className="text-xs text-[#515154]">gamegdeo@gmail.com</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
