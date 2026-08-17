import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'متجر زمام ستور | ZMAM Store for iOS',
  description: 'منظومة تطبيقات iOS الموقعة وتوثيق الـ UDID الآلي بدون جلبريك — منصة زمام للتوقيع السحابي والتوزيع الفوري.',
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
