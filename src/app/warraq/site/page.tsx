import { Metadata } from 'next';
import LandingPage from './LandingPage';

export const metadata: Metadata = {
  title: 'ورّاق — نظام إدارة المكتبات والطباعة',
  description: 'تطبيق متكامل لإدارة محلات الطباعة والقرطاسية. طلبات، مخزون، فواتير، تحليلات — 28+ ميزة مدمجة',
};

export default function Page() {
  return <LandingPage />;
}
