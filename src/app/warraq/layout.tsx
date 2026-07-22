import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تطبيق ورّاق | Warraq App — Ali Al-Musawi',
  description: 'ورّاق — نظام إدارة المكتبات والطباعة المتكامل مع 28+ ميزة. Warraq — comprehensive library and printing management system with 28+ features.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
