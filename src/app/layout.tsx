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
  title: 'علي موفق | مشروع زمام (Project ZMAM)',
  description:
    'المنظومة الرقمية لمشروع زمام — علي موفق: معمار أنظمة ومطور حلول تقنية موثوقة من بابل، العراق.',
  keywords: [
    'Ali Muwaffaq',
    'علي موفق',
    'مشروع زمام',
    'Project ZMAM',
    'ZMAM Ecosystem',
    'Warraq',
    'Glamora',
    'Babil',
    'Iraq',
  ],
  openGraph: {
    title: 'علي موفق | منظومة مشروع زمام ZMAM Ecosystem',
    description: 'معمار أنظمة ومؤسس مشروع زمام — تكنولوجيا موثوقة تحترم الإنسان',
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
