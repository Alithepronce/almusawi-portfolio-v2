import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'دستور وهيئة منظومة زمام | Project ZMAM Constitution',
  description: 'الدستور الرسمي والركائز الرقمية لمنظومة مشروع زمام — علي موفق.',
};

export default function ZemamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
