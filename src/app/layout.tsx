import type { Metadata } from 'next';
import { IBM_Plex_Sans_Arabic, Sora, Cairo } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/providers/ClientLayout';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sans',
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'Ali Al-Musawi | AI Automation Developer & Product Manager',
  description:
    'Portfolio of Ali Al-Musawi — AI Automation Developer & Product Manager from Babil, Iraq. شركة ومكتب الموسوي للحلول البرمجية.',
  keywords: [
    'Ali Al-Musawi',
    'علي الموسوي',
    'AI Developer',
    'Product Manager',
    'مكتب الموسوي',
    'Portfolio',
    'Babil',
    'Iraq',
  ],
  openGraph: {
    title: 'Ali Al-Musawi | AI Automation Developer',
    description: 'AI Automation Developer & Product Manager — Babil, Iraq',
    type: 'website',
    locale: 'ar_IQ',
    alternateLocale: 'en_US',
    url: 'https://alimuwaffaq.my',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${sora.variable} ${ibmPlexSansArabic.variable} ${cairo.variable}`}
    >
      <body className="noise-bg">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
